import { EMAIL_REGEX, normalizePhoneE164, sanitize } from "@/lib/subscribe-validation";
import type { TeamPick } from "./alabama-vs-tennessee";

export interface GiveawayEntryInput {
  firstName: string;
  lastName: string;
  email: string;
  phoneE164: string;
  teamPick: TeamPick;
  marketingOptIn: boolean;
  utm: { source: string; medium: string; campaign: string; content: string };
  referrer: string;
}

export type GiveawayField = "firstName" | "lastName" | "email" | "phone" | "teamPick" | "agreeRules";

export type GiveawayValidation =
  | { ok: true; data: GiveawayEntryInput }
  | { ok: false; field: GiveawayField; message: string };

const NAME_REGEX = /^[\p{L}\p{M}' .-]{1,100}$/u;

export function validateGiveawayEntry(body: Record<string, unknown>): GiveawayValidation {
  const firstName = sanitize(body.firstName, 100);
  if (!firstName || !NAME_REGEX.test(firstName)) {
    return { ok: false, field: "firstName", message: "Please enter your first name." };
  }
  const lastName = sanitize(body.lastName, 100);
  if (!lastName || !NAME_REGEX.test(lastName)) {
    return { ok: false, field: "lastName", message: "Please enter your last name." };
  }

  const email = sanitize(body.email, 254).toLowerCase();
  if (!email || !EMAIL_REGEX.test(email)) {
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
      phoneE164,
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
