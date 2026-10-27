import type { SubscriberInput } from "./subscribe-validation";

// Laylo only stores an email/phone identifier. It returns a Boolean and, per
// GraphQL, reports errors as HTTP 200 with an `errors` array -- so we must
// inspect the body, not just the HTTP status. These functions NEVER throw.
export type LayloResult =
  | { ok: true; note?: string }
  | { ok: false; error: string };

// One identifier (email or phone). `retryable` separates a temporary problem
// (rate limit, outage, timeout) from Laylo rejecting the identifier itself.
export type LayloIdentifierResult =
  | { ok: true }
  | { ok: false; retryable: boolean; error: string };

const LAYLO_URL = "https://laylo.com/api/graphql";
const MUTATION =
  "mutation($email: String, $phoneNumber: String){ subscribeToUser(email: $email, phoneNumber: $phoneNumber) }";
const TRANSIENT_MESSAGE = /rate|limit|too many|timeout|timed out|unavailable|internal|try again/i;
// Auth failures mean the key is wrong or gone, not that this fan's identifier
// is bad. Laylo reports a bad key as HTTP 400 "Context creation failed: The
// user is not authorized to perform this action", so the message is checked
// too. The sync job pauses the lane instead of spending the entry's retries.
const AUTH_STATUSES = new Set([401, 403]);
const AUTH_MESSAGE = /not authori[sz]ed|unauthori[sz]ed|forbidden|context creation failed|api key|invalid token/i;

function redactIdentifiers(message: string): string {
  return message
    .replace(/[^\s"'<>()]+@[^\s"'<>()]+/g, "[email]")
    .replace(/\+?\d[\d\s().-]{6,}\d/g, "[phone]");
}

export async function subscribeLayloIdentifier(
  variables: { email: string } | { phoneNumber: string }
): Promise<LayloIdentifierResult> {
  const apiKey = process.env.LAYLO_API_KEY;
  if (!apiKey) {
    console.error("[Laylo] Missing LAYLO_API_KEY");
    return { ok: false, retryable: true, error: "not_configured" };
  }
  const field = "email" in variables ? "email" : "phone";

  try {
    const res = await fetch(LAYLO_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      // A hung request must never hold a caller (or the giveaway sync job) open.
      signal: AbortSignal.timeout(10_000),
      body: JSON.stringify({ query: MUTATION, variables }),
    });
    const json = await res.json().catch(() => null);
    if (res.ok && !json?.errors && json?.data?.subscribeToUser === true) return { ok: true };

    // Log the status and Laylo's messages only, never the identifier. Laylo
    // may echo the value back in its message, so anything that looks like an
    // email or a phone number is redacted first.
    const messages: string[] = Array.isArray(json?.errors)
      ? json.errors.map((e: { message?: string }) => redactIdentifiers(String(e?.message ?? "")))
      : [];
    console.error("[Laylo] subscribeToUser failed", field, res.status, messages.join(" | ").slice(0, 300));

    const auth = AUTH_STATUSES.has(res.status) || messages.some((m) => AUTH_MESSAGE.test(m));
    if (auth) return { ok: false, retryable: true, error: `${field}_auth` };
    const retryable =
      res.status === 429 || res.status >= 500 || json === null || messages.some((m) => TRANSIENT_MESSAGE.test(m));
    return { ok: false, retryable, error: res.ok ? `${field}_rejected` : `${field}_http_${res.status}` };
  } catch (err) {
    console.error("[Laylo] Network error", field, err instanceof Error ? err.name : "unknown");
    return { ok: false, retryable: true, error: `${field}_network` };
  }
}

// Subscribe the fan into Laylo as TWO independent calls: one email-only, one
// phone-only. This is the proven-working shape -- the dedicated phone-only call
// is what triggers Laylo's SMS opt-in confirmation text, and a rejected phone
// can never drop the email. (A single combined email+phone call does NOT create
// a fan reliably, so do not merge these.) Idempotent: a known identifier no-ops.
// The giveaway sync calls subscribeLayloIdentifier directly so it can pace and
// retry each half on its own.
export async function subscribeToLaylo(data: SubscriberInput): Promise<LayloResult> {
  // Sequential (not parallel) to respect Laylo's prudent ~1 req/sec cap.
  const email = await subscribeLayloIdentifier({ email: data.email });

  // No SMS-eligible phone (international fan or none): email is the only path.
  if (!data.phoneE164) {
    return email.ok ? { ok: true } : { ok: false, error: "email_failed" };
  }

  const phone = await subscribeLayloIdentifier({ phoneNumber: data.phoneE164 });
  if (email.ok && phone.ok) return { ok: true };
  // The email is the durable identifier; a captured email is still a success.
  if (email.ok) return { ok: true, note: "phone_rejected" };
  if (phone.ok) return { ok: true, note: "email_rejected" };
  return { ok: false, error: "both_failed" };
}
