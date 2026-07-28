// Cookie consent model + storage. The category names mirror the five buckets
// described in the Cookies Policy (Necessary, Analytics, Advertising,
// Functional, Social media). Tracking scripts are only injected once the user
// grants the matching category -- nothing non-essential fires before consent.

export type Category = "necessary" | "analytics" | "advertising" | "functional" | "social";

export type Consent = {
  necessary: true; // always on
  analytics: boolean;
  advertising: boolean;
  functional: boolean;
  social: boolean;
  // ISO-ish timestamp string of when the choice was made (empty = not decided)
  decidedAt: string;
};

export const CATEGORY_META: { key: Category; label: string; locked?: boolean; description: string }[] = [
  {
    key: "necessary",
    label: "Necessary",
    locked: true,
    description:
      "Essential for the site to function, such as remembering your cookie choices. These are always on.",
  },
  {
    key: "analytics",
    label: "Analytics",
    description: "Help us understand how the site is used so we can measure and improve performance.",
  },
  {
    key: "advertising",
    label: "Advertising",
    description: "Let us and our partners measure and serve advertising that may be relevant to you.",
  },
  {
    key: "functional",
    label: "Functional",
    description: "Remember choices you make (such as language or preferences) for a more personalised experience.",
  },
  {
    key: "social",
    label: "Social media",
    description: "Enable sharing and content from social media platforms such as Facebook, Instagram, X and YouTube.",
  },
];

export const STORAGE_KEY = "bmlg-cookie-consent";

export function emptyConsent(value: boolean): Consent {
  return {
    necessary: true,
    analytics: value,
    advertising: value,
    functional: value,
    social: value,
    decidedAt: "",
  };
}

export function readConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Consent>;
    if (!parsed || !parsed.decidedAt) return null;
    return {
      necessary: true,
      analytics: !!parsed.analytics,
      advertising: !!parsed.advertising,
      functional: !!parsed.functional,
      social: !!parsed.social,
      decidedAt: parsed.decidedAt,
    };
  } catch {
    return null;
  }
}

export function writeConsent(consent: Consent): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  } catch {
    /* storage unavailable -- consent simply won't persist */
  }
}
