import crypto from "crypto";
import type { SubscriberInput } from "./subscribe-validation";

// Result of a Mailchimp subscribe attempt. These functions NEVER throw so the
// Laylo path can run fully independently.
export type MailchimpResult =
  | { ok: true; note?: string }
  | { ok: false; kind: "compliance" | "invalid_email" | "error"; error: string };

const TAG_NAME = "Big Machine Records";
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

export async function subscribeToMailchimp(data: SubscriberInput): Promise<MailchimpResult> {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const server = process.env.MAILCHIMP_SERVER_PREFIX;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

  if (!apiKey || !server || !audienceId) {
    console.error("[Mailchimp] Missing environment variables");
    return { ok: false, kind: "error", error: "not_configured" };
  }

  const auth = `Basic ${Buffer.from(`anystring:${apiKey}`).toString("base64")}`;
  const hash = subscriberHash(data.email);
  const base = `https://${server}.api.mailchimp.com/3.0/lists/${audienceId}/members/${hash}`;

  try {
    // Idempotent upsert. status_if_new only applies to brand-new members, so an
    // existing member is a clean no-op update. We deliberately never send a
    // top-level `status` (that would clobber state / hit compliance blocks).
    // skip_merge_validation protects a real submission from audience config drift.
    const res = await fetch(`${base}?skip_merge_validation=true`, {
      method: "PUT",
      headers: { Authorization: auth, "Content-Type": "application/json" },
      body: JSON.stringify({
        email_address: data.email,
        status_if_new: "subscribed",
        merge_fields: buildMergeFields(data),
      }),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => null);
      const title: string = body?.title || "";
      const detail: string = body?.detail || "";
      console.error("[Mailchimp] Upsert failed", res.status, JSON.stringify(body));

      // Previously unsubscribed / cleaned. Mailchimp forbids API re-subscribe.
      // This is an expected, non-fatal outcome for a real person.
      if (res.status === 400 && /compliance state/i.test(`${title} ${detail}`)) {
        return { ok: false, kind: "compliance", error: "compliance_state" };
      }
      // Any other 400 means Mailchimp rejected the request itself. Because we
      // skip merge validation and always send a present email_address, the only
      // realistic cause is Mailchimp flagging the email address as fake/invalid
      // (Omnivore) -- so ask the user to fix their email rather than 502.
      if (res.status === 400) {
        return { ok: false, kind: "invalid_email", error: "invalid_email" };
      }
      return { ok: false, kind: "error", error: `http_${res.status}` };
    }

    // Member is captured. The tag is a separate, non-fatal call.
    const tagRes = await fetch(`${base}/tags`, {
      method: "POST",
      headers: { Authorization: auth, "Content-Type": "application/json" },
      body: JSON.stringify({ tags: [{ name: TAG_NAME, status: "active" }] }),
    });

    if (!tagRes.ok) {
      const tagBody = await tagRes.json().catch(() => null);
      console.error("[Mailchimp] Tag failed", tagRes.status, JSON.stringify(tagBody));
      // Member is still subscribed; do not fail the whole request over a tag.
      return { ok: true, note: "tag_failed" };
    }

    return { ok: true };
  } catch (err) {
    console.error("[Mailchimp] Network/unexpected error", err);
    return { ok: false, kind: "error", error: "network" };
  }
}
