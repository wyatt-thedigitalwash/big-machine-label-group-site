// Campaign config for the Alabama vs. Tennessee signed football giveaway.
// Every value marked PLACEHOLDER is waiting on the client and must be replaced
// before launch. Search this file for "PLACEHOLDER" to find them all.

export type TeamPick = "alabama" | "tennessee";

export const TEAMS: Record<TeamPick, { name: string; color: string }> = {
  alabama: { name: "Alabama", color: "#BB3638" },
  tennessee: { name: "Tennessee", color: "#DD742E" },
};

export const CAMPAIGN = {
  slug: "alabama-vs-tennessee",
  path: "/giveaways/alabama-vs-tennessee",
  rulesPath: "/giveaways/alabama-vs-tennessee/rules",

  title: "Alabama vs. Tennessee",
  artist: "Riley Green",
  featuring: "Peyton Manning",

  // Entry window. ISO strings with the offset so the server check is
  // unambiguous regardless of where it runs. Opens at midnight Eastern on
  // October 27 (EDT) and closes at noon Eastern on November 13 (EST).
  opensAt: "2026-10-27T00:00:00-04:00",
  closesAt: "2026-11-13T12:00:00-05:00",
  drawingOn: "November 13, 2026",
  entryWindowDisplay: "October 27, 2026 through November 13, 2026 at 12:00 p.m. ET",

  prize: {
    name: "One official football signed by Riley Green and Peyton Manning",
    arv: "$50.00",
    quantity: 1,
  },

  sponsor: {
    name: "Borchetta Entertainment Group, LLC",
    address: "c/o Wiles + Taylor & Co., P.C., 4011 Armory Oaks Drive, Nashville, TN 37204",
  },

  // Per the Official Rules: 18+, except 19 in Alabama and Nebraska and 21 in
  // Mississippi (or the age of majority where older).
  eligibility: {
    minimumAge: 18,
    residency: "legal residents of the fifty (50) United States and the District of Columbia",
    ageText: "18 or older (19 in Alabama and Nebraska, 21 in Mississippi)",
    short: "18+ (19+ in AL and NE, 21+ in MS)",
  },

  // PLACEHOLDER: the rules direct questions to "the contact email address
  // identified on the Website". Confirm the address with the client.
  contactEmail: "info@bigmachinerecords.com",

  streamUrl: "https://rileygreen.ffm.to/alabamavstennesse.OWE",

  // Set to a path under /public once the client sends the mobile video,
  // e.g. "/videos/alabama-vs-tennessee-mobile.mp4". Null falls back to the still.
  heroVideoSrc: null as string | null,

  // Set once a photo of the signed football exists. Null falls back to the
  // Riley and Peyton still.
  prizeImageSrc: null as string | null,

  // Promotional partner credited on the page.
  partner: {
    name: "Audacy",
    logo: "/images/giveaways/partners/audacy-logo-cream.png",
    logoWidth: 325,
    logoHeight: 67,
  },

  images: {
    still: "/images/giveaways/alabama-vs-tennessee-riley-green-peyton-manning.webp",
    lockup: "/images/giveaways/alabama-vs-tennessee-lockup.png",
    artistLockup: "/images/giveaways/alabama-vs-tennessee-artist-lockup.png",
    og: "/images/giveaways/alabama-vs-tennessee-og.jpg",
  },
} as const;

export function isEntryWindowOpen(now = new Date()): boolean {
  return now >= new Date(CAMPAIGN.opensAt) && now <= new Date(CAMPAIGN.closesAt);
}

// The exact consent copy shown next to the optional checkbox. Mirrors the
// "Use of Personal Information" section of the Official Rules: opt-in is
// separate from entry, optional, and unsubscribing never affects the entry.
// Stored with each entry so there is a record of what the fan agreed to.
export const MARKETING_CONSENT_TEXT =
  "Yes, send me marketing emails and text messages from Riley Green and Big Machine Records at the email address and phone number I provided. This is optional and is not required to enter or win. I can unsubscribe at any time, and unsubscribing will not affect my entry or eligibility to win. Message frequency varies. Message and data rates may apply. Reply STOP to cancel, HELP for help.";
