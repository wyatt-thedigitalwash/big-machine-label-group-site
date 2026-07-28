import type { SubscriberInput } from "./subscribe-validation";

// Laylo only stores an email/phone identifier. It returns a Boolean and, per
// GraphQL, reports errors as HTTP 200 with an `errors` array -- so we must
// inspect the body, not just the HTTP status. This function NEVER throws.
export type LayloResult =
  | { ok: true; note?: string }
  | { ok: false; error: string };

const LAYLO_URL = "https://laylo.com/api/graphql";
const MUTATION =
  "mutation($email: String, $phoneNumber: String){ subscribeToUser(email: $email, phoneNumber: $phoneNumber) }";

async function subscribeIdentifier(
  auth: string,
  variables: { email?: string; phoneNumber?: string }
): Promise<boolean> {
  const res = await fetch(LAYLO_URL, {
    method: "POST",
    headers: { Authorization: auth, "Content-Type": "application/json" },
    body: JSON.stringify({ query: MUTATION, variables }),
  });

  const json = await res.json().catch(() => null);
  const success = res.ok && !json?.errors && json?.data?.subscribeToUser === true;

  if (!success) {
    console.error(
      "[Laylo] subscribeToUser failed",
      res.status,
      JSON.stringify(json?.errors ?? json)
    );
  }
  return success;
}

// Subscribe the fan into Laylo as TWO independent calls: one email-only, one
// phone-only. This is the proven-working shape -- the dedicated phone-only call
// is what triggers Laylo's SMS opt-in confirmation text, and a rejected phone
// can never drop the email. (A single combined email+phone call does NOT create
// a fan reliably, so do not merge these.) Idempotent: a known identifier no-ops.
export async function subscribeToLaylo(data: SubscriberInput): Promise<LayloResult> {
  const apiKey = process.env.LAYLO_API_KEY;
  if (!apiKey) {
    console.error("[Laylo] Missing LAYLO_API_KEY");
    return { ok: false, error: "not_configured" };
  }
  const auth = `Bearer ${apiKey}`;

  try {
    // Sequential (not parallel) to respect Laylo's prudent ~1 req/sec cap.
    const emailOk = await subscribeIdentifier(auth, { email: data.email });

    // No SMS-eligible phone (international fan or none): email is the only path.
    if (!data.phoneE164) {
      return emailOk ? { ok: true } : { ok: false, error: "email_failed" };
    }

    const phoneOk = await subscribeIdentifier(auth, { phoneNumber: data.phoneE164 });
    if (emailOk && phoneOk) return { ok: true };
    // The email is the durable identifier; a captured email is still a success.
    if (emailOk) return { ok: true, note: "phone_rejected" };
    if (phoneOk) return { ok: true, note: "email_rejected" };
    return { ok: false, error: "both_failed" };
  } catch (err) {
    console.error("[Laylo] Network/unexpected error", err);
    return { ok: false, error: "network" };
  }
}
