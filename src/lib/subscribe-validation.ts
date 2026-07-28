// Shared validation + normalization for the subscribe endpoint.
// No external deps: matches the project's plain-validation style.

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const E164_REGEX = /^\+[1-9]\d{7,14}$/;
// A valid North American (NANP) 10-digit number: NXX-NXX-XXXX where the area
// code and exchange each start 2-9. Rejects all-zeros, 555-style fakes with a
// 0/1 exchange, and other malformed input.
const NANP_REGEX = /^[2-9]\d{2}[2-9]\d{6}$/;

// Countries Laylo can send SMS to and whose numbers use the +1 / NANP format.
export const SMS_COUNTRIES = new Set(["United States", "Canada"]);

export interface SubscriberInput {
  firstName: string;
  lastName: string;
  email: string;
  phoneE164: string; // E.164 for Laylo SMS; "" when not SMS-eligible (intl or none)
  phoneDisplay: string; // stored in Mailchimp's PHONE merge field; "" when none
  country: string;
  zipCode: string;
}

export type ValidationResult =
  | { ok: true; data: SubscriberInput }
  | { ok: false; field: "email" | "phone"; message: string };

export function sanitize(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

// Normalize a raw phone string to E.164. Bare numbers are assumed US/Canada
// (the audience default) and validated against the NANP rules, so a fan never
// needs to type "+1". An explicit "+<country code>" is honored for the rare
// international fan. Returns null when the input is not a valid phone number.
export function normalizePhoneE164(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  const hasPlus = trimmed.startsWith("+");
  const digits = trimmed.replace(/\D/g, "");
  if (!digits) return null;

  if (hasPlus) {
    // US/Canada explicitly: enforce a real 10-digit NANP number after the "1".
    if (digits.startsWith("1")) {
      const nanp = digits.slice(1);
      return NANP_REGEX.test(nanp) ? `+1${nanp}` : null;
    }
    // Other country code: accept a format-valid E.164 number as typed.
    const e164 = `+${digits}`;
    return E164_REGEX.test(e164) ? e164 : null;
  }

  // No country code typed: assume US/Canada and validate as NANP.
  let nanp: string | null = null;
  if (digits.length === 10) nanp = digits;
  else if (digits.length === 11 && digits.startsWith("1")) nanp = digits.slice(1);

  return nanp && NANP_REGEX.test(nanp) ? `+1${nanp}` : null;
}

// Format a US (+1) E.164 number as "(NXX) NXX-XXXX" for Mailchimp's
// US-format PHONE merge field. Non-US numbers fall back to the E.164 value.
export function toUsDisplay(e164: string): string {
  if (e164.startsWith("+1") && e164.length === 12) {
    const d = e164.slice(2);
    return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  }
  return e164;
}

// Validate + normalize the raw request body. Email is always required. Phone is
// required for US/Canada fans (Laylo can text them) and optional for everyone
// else, since Laylo cannot send SMS internationally -- an international fan can
// still join by email.
export function validateSubscriber(body: Record<string, unknown>): ValidationResult {
  const email = sanitize(body.email, 254).toLowerCase();
  if (!email || !EMAIL_REGEX.test(email)) {
    return { ok: false, field: "email", message: "Please enter a valid email address." };
  }

  const country = sanitize(body.country, 100);
  const rawPhone = sanitize(body.phone, 30);

  let phoneE164 = "";
  let phoneDisplay = "";

  if (SMS_COUNTRIES.has(country)) {
    // US/Canada: phone required and must be a valid North American number.
    if (!rawPhone) {
      return { ok: false, field: "phone", message: "Please enter a valid phone number." };
    }
    const normalized = normalizePhoneE164(rawPhone);
    if (!normalized) {
      return {
        ok: false,
        field: "phone",
        message: "Please enter a valid phone number including area code.",
      };
    }
    phoneE164 = normalized;
    phoneDisplay = toUsDisplay(normalized);
  } else if (rawPhone && /\d/.test(rawPhone)) {
    // International: phone optional, kept for Mailchimp only. phoneE164 stays ""
    // so the Laylo SMS call is skipped (Laylo cannot text non-NANP numbers).
    phoneDisplay = rawPhone;
  }

  return {
    ok: true,
    data: {
      firstName: sanitize(body.firstName, 100),
      lastName: sanitize(body.lastName, 100),
      email,
      phoneE164,
      phoneDisplay,
      country,
      zipCode: sanitize(body.zipCode, 20),
    },
  };
}
