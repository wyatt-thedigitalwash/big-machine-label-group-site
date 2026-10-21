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

  // PLACEHOLDER: entry window, Central Time. ISO strings with the offset so
  // the server check is unambiguous regardless of where it runs.
  opensAt: "2026-10-20T00:00:00-05:00",
  closesAt: "2026-11-30T23:59:59-06:00",
  drawingOn: "December 1, 2026", // PLACEHOLDER
  entryWindowDisplay: "October 20, 2026 through November 30, 2026", // PLACEHOLDER

  prize: {
    name: "One official football signed by Riley Green and Peyton Manning",
    arv: "$[ARV]", // PLACEHOLDER: approximate retail value
    quantity: 1,
  },

  sponsor: {
    name: "Borchetta Entertainment Group, LLC", // PLACEHOLDER: confirm legal entity
    address: "[Street Address], Nashville, TN [ZIP]", // PLACEHOLDER
  },

  // PLACEHOLDER: 18+ US residents is the default. Change if the client wants
  // 21+ or a state restriction.
  eligibility: {
    minimumAge: 18,
    residency: "legal residents of the fifty (50) United States and the District of Columbia",
  },

  streamUrl: "https://rileygreen.lnk.to/alabamavstennessee", // PLACEHOLDER: confirm smart link

  // Set to a path under /public once the client sends the mobile video,
  // e.g. "/videos/alabama-vs-tennessee-mobile.mp4". Null falls back to the still.
  heroVideoSrc: null as string | null,

  // Set once a photo of the signed football exists. Null falls back to the
  // Riley and Peyton still.
  prizeImageSrc: null as string | null,

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

// The exact consent copy shown next to the optional checkbox. Stored with each
// entry so there is a record of what the fan agreed to.
export const MARKETING_CONSENT_TEXT =
  "Yes, send me email and text updates from Riley Green and Big Machine Records. By checking this box I agree to receive recurring automated marketing messages at the number provided. Consent is not a condition of entry. Message and data rates may apply. Reply STOP to cancel, HELP for help.";

export const RULES_CONSENT_TEXT = `I am ${CAMPAIGN.eligibility.minimumAge} or older, a legal resident of the United States, and I agree to the Official Rules and Privacy Policy.`;
