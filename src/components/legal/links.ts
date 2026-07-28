// Shared contact addresses and mailto helpers for the legal policy pages.
// Subject lines come from the client's Word-document comments (Jason Turner /
// KTAG Law). The email addresses in the source docs were wrapped in editorial
// [ ] brackets; those are stripped here so the real address is used.

export const OPTOUT_EMAIL = "optout@bigmachinemail.com";
export const LEGAL_EMAIL = "legal@bigmachinemail.com";

/** Build a mailto: href with an optional prefilled subject line and body. */
export function mailto(address: string, subject?: string, body?: string): string {
  const params: string[] = [];
  if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  return params.length ? `mailto:${address}?${params.join("&")}` : `mailto:${address}`;
}

// Prefilled message bodies so every email link opens with a template the user
// just fills in. Each is tailored to the purpose of that link.
export const BODIES = {
  newsletterUnsubscribe:
    "Full name:\nEmail address:\nMailing list to unsubscribe from (label or artist name):\n",
  euComplaint: "Full name:\nEmail address:\nCountry of residence:\n\nNature of complaint:\n",
  caDelete: "Full name:\nEmail address:\nPostal address:\n\nRequest:\n",
  sensitiveInfo: "Full name:\nEmail address:\nPostal address:\n",
  dmcaNotice:
    "Full name:\nMailing address:\nTelephone:\nEmail:\n\nCopyrighted work(s) claimed to be infringed:\nLocation (URL) of the infringing material:\n\nStatement of good-faith belief:\nStatement of accuracy and authority (under penalty of perjury):\n\nSignature:\n",
  consentWithdrawal:
    "Full name:\nEmail address:\n\nRequest: I would like to withdraw my consent to receive electronic communications.\n",
  tcpaOptOut:
    "Full name:\nPhone number:\nEmail address:\n\nRequest: Please remove me from marketing calls and text messages.\n",
  cookiesInquiry: "Full name:\nEmail address:\n\nMy question about cookies:\n",
  generalContact: "Full name:\nEmail address:\n\nMessage:\n",
} as const;

// Prefilled subject lines, keyed to where each link appears (per doc comments).
export const SUBJECTS = {
  newsletterUnsubscribe: "unsubscribe/consent withdrawal",
  euComplaint: "EU complaint inquiry",
  caDelete: "CA resident request to delete info",
  sensitiveInfo: "Sensitive Personal Info Unsubscribe",
  cookiesInquiry: "Cookies inquiry",
  dmcaNotice: "DMCA Notice",
  consentWithdrawal: "Consent withdrawal",
  optOut: "Opt-out request",
} as const;
