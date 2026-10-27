import { EMAIL_REGEX, normalizePhoneE164, sanitize } from "@/lib/subscribe-validation";
import type { TeamPick } from "./alabama-vs-tennessee";

export interface GiveawayEntryInput {
  firstName: string;
  lastName: string;
  email: string;
  emailNormalized: string; // duplicate-check key, see normalizeEmail
  phoneE164: string;
  birthdate: string; // YYYY-MM-DD
  teamPick: TeamPick;
  marketingOptIn: boolean;
  utm: { source: string; medium: string; campaign: string; content: string };
  referrer: string;
}

export type GiveawayField = "firstName" | "lastName" | "email" | "phone" | "birthdate" | "teamPick" | "agreeRules";

export type GiveawayValidation =
  | { ok: true; data: GiveawayEntryInput }
  | { ok: false; field: GiveawayField; message: string };

const MINIMUM_AGE = 18;

// Duplicate-check key for "one entry per person". Strips "+tag" aliases for
// every provider and dots for Gmail, which ignores them, so variations of one
// inbox count as one entrant. The typed address is still what gets stored and
// sent to Mailchimp.
export function normalizeEmail(email: string): string {
  const at = email.lastIndexOf("@");
  if (at < 1) return email.toLowerCase();
  let local = email.slice(0, at).toLowerCase().split("+")[0];
  let domain = email.slice(at + 1).toLowerCase();
  if (domain === "googlemail.com") domain = "gmail.com";
  if (domain === "gmail.com") local = local.replace(/\./g, "");
  return `${local}@${domain}`;
}

// Whole years between a YYYY-MM-DD date and `today`, or null if invalid.
function ageOn(value: string, today: Date): number | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!m) return null;
  const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const dob = new Date(Date.UTC(y, mo - 1, d));
  if (dob.getUTCFullYear() !== y || dob.getUTCMonth() !== mo - 1 || dob.getUTCDate() !== d) return null;
  let age = today.getUTCFullYear() - y;
  const beforeBirthday =
    today.getUTCMonth() < mo - 1 || (today.getUTCMonth() === mo - 1 && today.getUTCDate() < d);
  if (beforeBirthday) age -= 1;
  return age < 0 ? null : age;
}

// Letters, marks, spaces and the punctuation real names use ("O'Neal",
// "Smith-Jones", "Smith, Jr."), with at least one letter.
const NAME_REGEX = /^(?=.*\p{L})[\p{L}\p{M}' .,-]{1,100}$/u;
// iOS Smart Punctuation types a curly apostrophe; store the plain one.
const APOSTROPHES = /[\u2018\u2019\u02BC\u0060\u00B4]/g;
// Printable ASCII only: blocks invisible characters (zero-width spaces and
// the like) that would make one inbox look like several.
const EMAIL_CHARS = /^[\x21-\x7E]+$/;

function cleanName(value: unknown): string {
  return sanitize(value, 100).replace(APOSTROPHES, "'").replace(/\s+/g, " ");
}

// Today's date where the sponsor is (Central Time), so an age check never
// moves a birthday forward by a UTC evening.
function todayInCentral(now = new Date()): Date {
  const ymd = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
  return new Date(`${ymd}T00:00:00Z`);
}

export function validateGiveawayEntry(body: Record<string, unknown>): GiveawayValidation {
  const firstName = cleanName(body.firstName);
  if (!firstName || !NAME_REGEX.test(firstName)) {
    return { ok: false, field: "firstName", message: "Please enter your first name." };
  }
  const lastName = cleanName(body.lastName);
  if (!lastName || !NAME_REGEX.test(lastName)) {
    return { ok: false, field: "lastName", message: "Please enter your last name." };
  }

  const email = sanitize(body.email, 254).toLowerCase();
  if (!email || !EMAIL_CHARS.test(email) || !EMAIL_REGEX.test(email)) {
    return { ok: false, field: "email", message: "Please enter a valid email address." };
  }

  const phoneE164 = normalizePhoneE164(sanitize(body.phone, 30));
  if (!phoneE164 || !phoneE164.startsWith("+1")) {
    return {
      ok: false,
      field: "phone",
      message: "Please enter a valid US phone number including area code.",
    };
  }

  // The rules collect a birthdate. The server enforces the national minimum
  // of 18; the higher state ages (19 AL/NE, 21 MS) are confirmed by the
  // eligibility checkbox and verified at winner selection per the rules.
  const birthdate = sanitize(body.birthdate, 10);
  const age = ageOn(birthdate, todayInCentral());
  if (age === null || age > 120) {
    return { ok: false, field: "birthdate", message: "Please enter your date of birth." };
  }
  if (age < MINIMUM_AGE) {
    return {
      ok: false,
      field: "birthdate",
      message: "You must be at least 18 years old to enter (19 in Alabama and Nebraska, 21 in Mississippi).",
    };
  }

  const teamPick = body.teamPick;
  if (teamPick !== "alabama" && teamPick !== "tennessee") {
    return { ok: false, field: "teamPick", message: "Pick a side to enter." };
  }

  if (body.agreeRules !== true) {
    return {
      ok: false,
      field: "agreeRules",
      message: "You must confirm your eligibility and accept the Official Rules to enter.",
    };
  }

  return {
    ok: true,
    data: {
      firstName,
      lastName,
      email,
      emailNormalized: normalizeEmail(email),
      phoneE164,
      birthdate,
      teamPick,
      marketingOptIn: body.marketingOptIn === true,
      utm: {
        source: sanitize(body.utmSource, 100),
        medium: sanitize(body.utmMedium, 100),
        campaign: sanitize(body.utmCampaign, 100),
        content: sanitize(body.utmContent, 100),
      },
      referrer: sanitize(body.referrer, 500),
    },
  };
}
