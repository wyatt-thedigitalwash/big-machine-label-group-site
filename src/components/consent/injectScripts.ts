// Injects analytics / advertising tags ONLY after the user consents to the
// matching category. Injection is idempotent: a category is only ever added
// once per page load, and nothing non-essential fires before consent.
//
// This site currently loads NO third-party analytics or advertising scripts,
// so the loaders below are intentionally empty. The consent categories are
// still recorded (see consent.ts) so the framework is ready the moment Hunter
// Flynn's site adds tags: drop the tag bootstrap into loadAnalytics() /
// loadAdvertising() and it will only run after the matching consent is granted.

import type { Consent } from "./consent";

const injected = new Set<string>();

// Reserved helper for when real tags are added, so future scripts inject
// exactly once per page load.
function once(id: string, run: () => void) {
  if (injected.has(id) || document.getElementById(id)) return;
  injected.add(id);
  run();
}

function loadAnalytics() {
  // No analytics scripts on this site yet.
  once("hf-analytics", () => {});
}

function loadAdvertising() {
  // No advertising scripts on this site yet.
  once("hf-advertising", () => {});
}

/** Inject scripts for every category the user has consented to. Additive only. */
export function applyConsent(consent: Consent) {
  if (consent.analytics) loadAnalytics();
  if (consent.advertising) loadAdvertising();
  // Functional and Social categories have no active third-party scripts on this
  // site yet; they are reserved so the choice is recorded for future use.
}
