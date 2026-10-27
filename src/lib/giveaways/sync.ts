import "server-only";
import { randomUUID } from "node:crypto";
import { getSupabaseAdmin } from "@/lib/supabase";
import { subscribeToMailchimp, type MailchimpResult } from "@/lib/mailchimp";
import { subscribeLayloIdentifier, type LayloIdentifierResult } from "@/lib/laylo";
import { toUsDisplay, type SubscriberInput } from "@/lib/subscribe-validation";

// Background delivery of opted-in giveaway entries to Mailchimp and Laylo.
//
// The entry API only marks an opt-in as pending, so fans get an instant
// response no matter how busy the outside services are. This job runs every
// minute (pg_cron calls /api/giveaway/sync). Each service has its own queue,
// claim and backoff, so a slow or failing service never holds the other back:
//   - Mailchimp: a few calls at a time (the account allows 10 simultaneous
//     connections, shared with the site's signup bar).
//   - Laylo: one call per second by default (LAYLO_MAX_RPS to change), and a
//     single runner at a time via a database lock so the pace holds globally.
//     Email and phone are separate Laylo calls and are tracked separately, so a
//     retry only re-sends the half that has not gone through.
// Temporary failures retry with backoff (about a day in total); permanent ones
// stop. A run of consecutive temporary failures pauses that service until the
// next minute without spending the remaining entries' attempts.

// The function may run 120s (see the route). New work starts only inside the
// budget; the slowest single entry (three 10s calls) still ends well before.
const RUN_BUDGET_MS = 50_000;
const LOCK_SECONDS = 125;
const CLAIM_LEASE_SECONDS = 180;
const MAILCHIMP_BATCH = 300;
const MAILCHIMP_CONCURRENCY = 5;
const MAX_ATTEMPTS = 12;
const BACKOFF_MINUTES = [1, 2, 5, 10, 15, 30, 60, 120, 240, 360, 480]; // about 22 hours
const OUTAGE_STREAK = 5; // consecutive temporary failures that pause a service
export const MAILCHIMP_CAMPAIGN_TAG = "Alabama vs. Tennessee Giveaway";

type Service = "mailchimp" | "laylo";
type Outcome =
  | { kind: "synced"; note?: string }
  | { kind: "retry"; error: string }
  | { kind: "failed"; error: string };
type Tally = { synced: number; retrying: number; failed: number };

interface QueueRow {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_e164: string | null;
  mailchimp_attempts: number;
  laylo_attempts: number;
  laylo_email_result: "ok" | "rejected" | null;
  laylo_phone_result: "ok" | "rejected" | null;
}

interface Providers {
  mailchimp(s: SubscriberInput): Promise<MailchimpResult>;
  layloIdentifier(v: { email: string } | { phoneNumber: string }): Promise<LayloIdentifierResult>;
}

export interface SyncSummary {
  ran: boolean;
  reason?: string;
  dryRun: boolean;
  mailchimp: Tally & { claimed: number; paused: boolean };
  laylo: Tally & { claimed: number; paused: boolean };
  durationMs: number;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const realProviders: Providers = {
  mailchimp: (s) => subscribeToMailchimp(s, { tags: [MAILCHIMP_CAMPAIGN_TAG], requireTags: true }),
  layloIdentifier: subscribeLayloIdentifier,
};

// Development-only stand-ins with realistic latency, used to exercise the
// queue (claiming, pacing, retries) without touching the real services. Dry
// runs only ever claim @loadtest.invalid rows (see giveaway_sync_claim).
function simulatedProviders(failRate: number): Providers {
  const fails = () => Math.random() < failRate;
  return {
    async mailchimp() {
      await sleep(300);
      return fails() ? { ok: false, kind: "error", error: "simulated_failure" } : { ok: true, memberStatus: "subscribed" };
    },
    async layloIdentifier() {
      await sleep(250);
      return fails() ? { ok: false, retryable: true, error: "simulated_failure" } : { ok: true };
    },
  };
}

function toSubscriber(row: QueueRow): SubscriberInput {
  const phone = row.phone_e164 ?? "";
  return {
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email,
    phoneE164: phone,
    phoneDisplay: phone ? toUsDisplay(phone) : "",
    country: "United States",
    zipCode: "",
  };
}

function layloMsPerCall(): number {
  const rps = Number(process.env.LAYLO_MAX_RPS);
  return Math.ceil(1000 / (rps > 0 ? rps : 1));
}

function mailchimpOutcome(r: MailchimpResult): Outcome {
  if (r.ok) {
    // Already unsubscribed or cleaned: their record is updated and tagged, but
    // Mailchimp keeps them unsubscribed. Noted so the count is honest.
    const s = r.memberStatus;
    const note = s && s !== "subscribed" ? `member_${s}` : r.note;
    return { kind: "synced", note };
  }
  if (r.kind === "compliance" || r.kind === "invalid_email") return { kind: "failed", error: r.kind };
  return { kind: "retry", error: r.error };
}

async function record(service: Service, row: QueueRow, outcome: Outcome, extra: Record<string, unknown> = {}) {
  const attempts = row[`${service}_attempts`] + 1;
  const now = new Date();
  let patch: Record<string, unknown>;
  if (outcome.kind === "synced") {
    patch = {
      [`${service}_status`]: "synced",
      [`${service}_synced_at`]: now.toISOString(),
      [`${service}_error`]: outcome.note ?? null,
    };
  } else if (outcome.kind === "failed" || attempts >= MAX_ATTEMPTS) {
    patch = { [`${service}_status`]: "failed", [`${service}_error`]: outcome.error };
  } else {
    const waitMin = BACKOFF_MINUTES[Math.min(attempts - 1, BACKOFF_MINUTES.length - 1)];
    patch = {
      [`${service}_error`]: outcome.error,
      [`${service}_next_at`]: new Date(now.getTime() + waitMin * 60_000).toISOString(),
    };
  }
  patch = { ...patch, ...extra, [`${service}_attempts`]: attempts, [`${service}_claimed_until`]: null };
  const { error } = await getSupabaseAdmin().from("giveaway_entries").update(patch).eq("id", row.id);
  if (error) console.error("[GiveawaySync] Could not record result", service, row.id, error.message);
  return outcome.kind === "synced" ? "synced" : patch[`${service}_status`] === "failed" ? "failed" : "retrying";
}

async function claim(service: Service, limit: number, testOnly: boolean): Promise<QueueRow[]> {
  const { data, error } = await getSupabaseAdmin().rpc("giveaway_sync_claim", {
    p_service: service,
    p_limit: limit,
    p_lease_seconds: CLAIM_LEASE_SECONDS,
    p_test_only: testOnly,
  });
  if (error) throw new Error(`${service} claim failed: ${error.message}`);
  return (data ?? []) as QueueRow[];
}

async function release(service: Service, ids: string[]) {
  if (!ids.length) return;
  const { error } = await getSupabaseAdmin().rpc("giveaway_sync_release", { p_service: service, p_ids: ids });
  if (error) console.error("[GiveawaySync] Could not release claims", service, error.message);
}

// Mailchimp: a small pool of parallel workers over this run's claim.
async function runMailchimp(rows: QueueRow[], providers: Providers, deadline: number, summary: SyncSummary) {
  const lane = summary.mailchimp;
  let next = 0;
  let streak = 0;
  await Promise.all(
    Array.from({ length: MAILCHIMP_CONCURRENCY }, async () => {
      while (next < rows.length && Date.now() < deadline && streak < OUTAGE_STREAK) {
        const row = rows[next++];
        const outcome = mailchimpOutcome(await providers.mailchimp(toSubscriber(row)));
        streak = outcome.kind === "retry" ? streak + 1 : 0;
        lane[await record("mailchimp", row, outcome)]++;
      }
    })
  );
  lane.paused = streak >= OUTAGE_STREAK;
}

// Laylo: strictly one call at a time, each call spaced by the pace limit.
async function runLaylo(rows: QueueRow[], providers: Providers, deadline: number, summary: SyncSummary) {
  const lane = summary.laylo;
  const msPerCall = layloMsPerCall();
  let lastCallAt = 0;
  let streak = 0;
  const paced = async (v: { email: string } | { phoneNumber: string }) => {
    const wait = lastCallAt + msPerCall - Date.now();
    if (wait > 0) await sleep(wait);
    lastCallAt = Date.now();
    return providers.layloIdentifier(v);
  };

  for (const row of rows) {
    if (Date.now() >= deadline || streak >= OUTAGE_STREAK) break;
    let emailResult = row.laylo_email_result;
    let phoneResult = row.phone_e164 ? row.laylo_phone_result : "rejected";
    let retryError = "";

    for (const half of ["email", "phone"] as const) {
      if ((half === "email" ? emailResult : phoneResult) !== null) continue;
      const r = await paced(half === "email" ? { email: row.email } : { phoneNumber: row.phone_e164! });
      if (r.ok) {
        if (half === "email") emailResult = "ok";
        else phoneResult = "ok";
      } else if (!r.retryable) {
        if (half === "email") emailResult = "rejected";
        else phoneResult = "rejected";
      } else {
        retryError = r.error;
        break; // keep the call order email then phone; try again on the next attempt
      }
    }

    let outcome: Outcome;
    if (retryError) outcome = { kind: "retry", error: retryError };
    else if (emailResult === "ok" && phoneResult === "ok") outcome = { kind: "synced" };
    else if (emailResult === "ok") outcome = { kind: "synced", note: row.phone_e164 ? "phone_rejected" : undefined };
    else if (phoneResult === "ok") outcome = { kind: "synced", note: "email_rejected" };
    else outcome = { kind: "failed", error: "both_rejected" };
    streak = outcome.kind === "retry" ? streak + 1 : 0;

    lane[
      await record("laylo", row, outcome, {
        laylo_email_result: emailResult,
        laylo_phone_result: row.phone_e164 ? phoneResult : null,
      })
    ]++;
  }
  lane.paused = streak >= OUTAGE_STREAK;
}

export async function runGiveawaySync(opts: { dryRun?: boolean; failRate?: number } = {}): Promise<SyncSummary> {
  const started = Date.now();
  const deadline = started + RUN_BUDGET_MS;
  const dryRun = Boolean(opts.dryRun);
  const providers = dryRun ? simulatedProviders(opts.failRate ?? 0) : realProviders;
  const empty = () => ({ claimed: 0, synced: 0, retrying: 0, failed: 0, paused: false });
  const summary: SyncSummary = { ran: false, dryRun, mailchimp: empty(), laylo: empty(), durationMs: 0 };
  const db = getSupabaseAdmin();
  const owner = randomUUID();

  const { data: locked, error: lockError } = await db.rpc("giveaway_sync_try_lock", {
    p_seconds: LOCK_SECONDS,
    p_owner: owner,
  });
  if (lockError) throw new Error(`lock failed: ${lockError.message}`);
  if (!locked) {
    summary.reason = "another run is in progress";
    summary.durationMs = Date.now() - started;
    return summary;
  }

  let mailchimpRows: QueueRow[] = [];
  let layloRows: QueueRow[] = [];
  try {
    // Claim only what Laylo can work through in this run's budget.
    const layloBatch = Math.max(1, Math.floor(RUN_BUDGET_MS / (2 * layloMsPerCall())));
    [mailchimpRows, layloRows] = await Promise.all([
      claim("mailchimp", MAILCHIMP_BATCH, dryRun),
      claim("laylo", layloBatch, dryRun),
    ]);
    summary.ran = true;
    summary.mailchimp.claimed = mailchimpRows.length;
    summary.laylo.claimed = layloRows.length;

    await Promise.all([
      runMailchimp(mailchimpRows, providers, deadline, summary),
      runLaylo(layloRows, providers, deadline, summary),
    ]);
  } finally {
    // Hand back anything this run claimed but did not get to (recorded rows
    // already cleared their own claim), so leftovers go out next minute.
    await Promise.all([
      release("mailchimp", mailchimpRows.map((r) => r.id)),
      release("laylo", layloRows.map((r) => r.id)),
    ]);
    await db.rpc("giveaway_sync_unlock", { p_owner: owner });
    summary.durationMs = Date.now() - started;
  }
  return summary;
}
