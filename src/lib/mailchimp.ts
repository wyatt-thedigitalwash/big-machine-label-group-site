import crypto from "crypto";
import type { SubscriberInput } from "./subscribe-validation";

// Result of a Mailchimp subscribe attempt. These functions NEVER throw so the
// Laylo path can run fully independently.
export type MailchimpResult =
  | { ok: true; note?: string; memberStatus?: string }
  | { ok: false; kind: "compliance" | "invalid_email" | "error"; error: string };

const TAG_NAME = "Big Machine Records";
// A hung request must never hold a caller (or the giveaway sync job) open.
const REQUEST_TIMEOUT_MS = 10_000;
const ACQUISITION_CHANNEL = "bigmachinerecords.com";

function subscriberHash(email: string): string {
  // Mailchimp keys members on md5 of the lowercased email. Callers pass an
  // already-lowercased email, but hash defensively to be safe.
  return crypto.createHash("md5").update(email.toLowerCase()).digest("hex");
}

// Build merge_fields, omitting any empty value so we never send "" (which can
// trip validation) and always stamping the acquisition channel (MMERGE9).
function buildMergeFields(data: SubscriberInput): Record<string, string> {
  const merge: Record<string, string> = { MMERGE9: ACQUISITION_CHANNEL };
  if (data.firstName) merge.FNAME = data.firstName;
  if (data.lastName) merge.LNAME = data.lastName;
  if (data.phoneDisplay) merge.PHONE = data.phoneDisplay;
  if (data.country) merge.MMERGE12 = data.country;
  if (data.zipCode) merge.MMERGE14 = data.zipCode;
  return merge;
}

// Mailchimp's temporary anti-abuse block for an address that joined many lists
// recently. It clears on its own, so it is a retry, not a bad address.
const TEMPORARY_BLOCK = /signed up to a lot of lists|too many recent signup/i;

// A Mailchimp account + audience to write to. The default is Big Machine's
// (MAILCHIMP_*). Others, like Riley Green's own account, are passed in by the
// caller and only receive the merge fields their audience actually has.
export interface MailchimpAccount {
  label: string;
  apiKey: string;
  server: string;
  audienceId: string;
  siteTag: string | null; // tag every member gets in this audience
  bigMachineFields: boolean; // MMERGE9/12/14 exist only in Big Machine's audience
}

function bigMachineAccount(): MailchimpAccount | null {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const server = process.env.MAILCHIMP_SERVER_PREFIX;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
  if (!apiKey || !server || !audienceId) return null;
  return { label: "big-machine", apiKey, server, audienceId, siteTag: TAG_NAME, bigMachineFields: true };
}

// Riley Green's own Mailchimp. The data center is the suffix of the API key
// ("...-us21"), so only the key and the audience id need to be set.
export function rileyMailchimpAccount(): MailchimpAccount | null {
  const apiKey = process.env.RILEY_MAILCHIMP_API_KEY?.trim();
  const audienceId = process.env.RILEY_MAILCHIMP_AUDIENCE_ID?.trim();
  const server = apiKey?.split("-").pop();
  if (!apiKey || !audienceId || !server || server === apiKey) return null;
  return { label: "riley", apiKey, server, audienceId, siteTag: null, bigMachineFields: false };
}

// Merge field tags an audience has, looked up once per server instance.
// Sending a tag the audience lacks would make Mailchimp reject the member.
const audienceTags = new Map<string, Promise<Set<string> | null>>();

async function fetchAudienceTags(account: MailchimpAccount, auth: string): Promise<Set<string> | null> {
  try {
    const res = await fetch(
      `https://${account.server}.api.mailchimp.com/3.0/lists/${account.audienceId}/merge-fields?count=100&fields=merge_fields.tag`,
      { headers: { Authorization: auth }, signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) }
    );
    if (!res.ok) {
      logFailure(`Merge field lookup failed (${account.label})`, res.status, await res.json().catch(() => null));
      return null;
    }
    const body = await res.json();
    return new Set((body?.merge_fields ?? []).map((f: { tag: string }) => f.tag));
  } catch {
    return null;
  }
}

async function mergeFieldsFor(
  account: MailchimpAccount,
  auth: string,
  data: SubscriberInput
): Promise<Record<string, string> | null> {
  const all = buildMergeFields(data);
  if (account.bigMachineFields) return all;
  let pending = audienceTags.get(account.audienceId);
  if (!pending) {
    pending = fetchAudienceTags(account, auth);
    audienceTags.set(account.audienceId, pending);
  }
  const tags = await pending;
  if (!tags) {
    audienceTags.delete(account.audienceId); // look again next time
    return null;
  }
  const merge: Record<string, string> = {};
  for (const tag of ["FNAME", "LNAME", "PHONE"]) {
    if (all[tag] && tags.has(tag)) merge[tag] = all[tag];
  }
  return merge;
}

// Log Mailchimp's error title only: its `detail` often contains the email.
function logFailure(label: string, status: number, body: { title?: string } | null): void {
  console.error(`[Mailchimp] ${label}`, status, body?.title ?? "");
}

// opts.tags adds tags beyond the account's site-wide one. opts.requireTags
// makes a failed tag call a retryable error instead of a soft success (the
// giveaway sync uses it so every entrant ends up tagged). opts.account picks
// the Mailchimp account; Big Machine's by default.
export async function subscribeToMailchimp(
  data: SubscriberInput,
  opts: { tags?: string[]; requireTags?: boolean; account?: MailchimpAccount } = {}
): Promise<MailchimpResult> {
  const account = opts.account ?? bigMachineAccount();
  if (!account) {
    console.error("[Mailchimp] Missing environment variables");
    return { ok: false, kind: "error", error: "not_configured" };
  }

  const auth = `Basic ${Buffer.from(`anystring:${account.apiKey}`).toString("base64")}`;
  const hash = subscriberHash(data.email);
  const base = `https://${account.server}.api.mailchimp.com/3.0/lists/${account.audienceId}/members/${hash}`;

  try {
    const mergeFields = await mergeFieldsFor(account, auth, data);
    if (!mergeFields) return { ok: false, kind: "error", error: "merge_fields_unavailable" };

    // Idempotent upsert. status_if_new only applies to brand-new members, so an
    // existing member is a clean no-op update. We deliberately never send a
    // top-level `status` (that would clobber state / hit compliance blocks).
    // skip_merge_validation protects a real submission from audience config drift.
    const res = await fetch(`${base}?skip_merge_validation=true`, {
      method: "PUT",
      headers: { Authorization: auth, "Content-Type": "application/json" },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      body: JSON.stringify({
        email_address: data.email,
        status_if_new: "subscribed",
        merge_fields: mergeFields,
      }),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => null);
      const title: string = body?.title || "";
      const detail: string = body?.detail || "";
      logFailure("Upsert failed", res.status, body);

      // Previously unsubscribed / cleaned. Mailchimp forbids API re-subscribe.
      // This is an expected, non-fatal outcome for a real person.
      if (res.status === 400 && /compliance state/i.test(`${title} ${detail}`)) {
        return { ok: false, kind: "compliance", error: "compliance_state" };
      }
      // Any other 400 means Mailchimp rejected the request itself. Because we
      // skip merge validation and always send a present email_address, the only
      // realistic cause is Mailchimp flagging the email address as fake/invalid
      // (Omnivore) -- so ask the user to fix their email rather than 502.
      if (res.status === 400 && TEMPORARY_BLOCK.test(`${title} ${detail}`)) {
        return { ok: false, kind: "error", error: "temporary_block" };
      }
      if (res.status === 400) {
        return { ok: false, kind: "invalid_email", error: "invalid_email" };
      }
      return { ok: false, kind: "error", error: `http_${res.status}` };
    }

    // An existing member keeps their status (status_if_new only applies to new
    // members). Transactional-only and archived contacts are re-subscribed,
    // since they just opted in here; Mailchimp itself refuses this for anyone
    // who unsubscribed (that comes back as an error and is left alone).
    // Unsubscribed and cleaned members are never touched.
    const member = await res.json().catch(() => null);
    let memberStatus: string | undefined = member?.status;
    if (memberStatus === "transactional" || memberStatus === "archived") {
      const upgrade = await fetch(base, {
        method: "PATCH",
        headers: { Authorization: auth, "Content-Type": "application/json" },
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
        body: JSON.stringify({ status: "subscribed" }),
      });
      if (upgrade.ok) memberStatus = "subscribed";
      else logFailure("Status upgrade failed", upgrade.status, await upgrade.json().catch(() => null));
    }

    // Member is captured. The tag is a separate call.
    const tagNames = [...(account.siteTag ? [account.siteTag] : []), ...(opts.tags ?? [])];
    const tagRes = await fetch(`${base}/tags`, {
      method: "POST",
      headers: { Authorization: auth, "Content-Type": "application/json" },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      body: JSON.stringify({ tags: tagNames.map((name) => ({ name, status: "active" })) }),
    });

    if (!tagRes.ok) {
      logFailure("Tag failed", tagRes.status, await tagRes.json().catch(() => null));
      if (opts.requireTags) return { ok: false, kind: "error", error: "tag_failed" };
      // Member is still subscribed; do not fail the whole request over a tag.
      return { ok: true, note: "tag_failed", memberStatus };
    }

    return { ok: true, memberStatus };
  } catch (err) {
    console.error("[Mailchimp] Network/unexpected error", err instanceof Error ? err.name : "unknown");
    return { ok: false, kind: "error", error: "network" };
  }
}
