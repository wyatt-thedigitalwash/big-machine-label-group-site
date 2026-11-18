// Privacy plumbing shared by the cookie consent manager (identical on every
// label artist site):
//
//  - When a visitor withdraws a category, expire the first-party cookies that
//    category's tags set. The consent manager reloads the page afterwards so the
//    scripts themselves are gone too.
//  - A Global Privacy Control (GPC) signal is a legally binding opt-out of the
//    sale/sharing of personal information (CCPA/CPRA and other state laws).
//    Advertising tags are "sharing", so with GPC on the Advertising category is
//    forced off (see enforceGpc / readConsent in consent.ts), and the page-load
//    scrub below clears any advertising cookies left from an earlier visit.

import type { Consent } from "./consent";

// Prefix matches: "_ga" covers "_ga_<id>", "_gcl_" covers every Google Ads cookie.
export const CATEGORY_COOKIES = {
  analytics: ["_ga", "_gid", "_gat"],
  advertising: ["_gcl_", "_gac_", "_fbp", "_fbc", "_ttp", "_tt_enable_cookie", "ttcsid"],
} as const;

/**
 * Expire first-party cookies whose names start with any of the given prefixes.
 * Tags usually set them on the registrable domain (".example.com"), so each
 * parent domain of the current host is tried as well as the bare host.
 */
export function clearCookies(prefixes: readonly string[]): void {
  if (typeof document === "undefined") return;
  const names = document.cookie
    .split(";")
    .map((c) => c.split("=")[0].trim())
    .filter((name) => name && prefixes.some((p) => name.startsWith(p)));
  if (names.length === 0) return;

  const parts = window.location.hostname.split(".");
  const domains = [""];
  for (let i = 0; i < parts.length - 1; i++) domains.push(`; domain=.${parts.slice(i).join(".")}`);

  for (const name of names) {
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain}`;
    }
  }
}

/**
 * Clear the cookies of every category that was granted in `prev` but not in
 * `next`. Google tags are first told to stop writing cookies (Consent Mode),
 * otherwise GA4 rewrites its session cookie as the page unloads.
 */
export function revokeConsent(prev: Consent, next: Consent): void {
  const w = window as Window & { gtag?: (...args: unknown[]) => void };
  const ads = next.advertising ? "granted" : "denied";
  w.gtag?.("consent", "update", {
    ad_storage: ads,
    ad_user_data: ads,
    ad_personalization: ads,
    analytics_storage: next.analytics ? "granted" : "denied",
  });
  if (prev.analytics && !next.analytics) clearCookies(CATEGORY_COOKIES.analytics);
  if (prev.advertising && !next.advertising) clearCookies(CATEGORY_COOKIES.advertising);
}

/**
 * Run on every page load: expire the cookies of every category the visitor has
 * not granted (all of them while undecided). This catches cookies a tag wrote
 * just before a withdrawal reload, and advertising cookies from before a GPC
 * signal was turned on (readConsent already forces Advertising off under GPC).
 */
export function scrubDeniedCookies(consent: Consent | null): void {
  if (!consent?.analytics) clearCookies(CATEGORY_COOKIES.analytics);
  if (!consent?.advertising) clearCookies(CATEGORY_COOKIES.advertising);
}

let consentModeSet = false;

/**
 * Google Consent Mode v2: tell every Google tag (GA4, Ads, GTM) exactly what
 * the visitor granted. Call before any Google tag loads. Without it, GA4 on an
 * analytics-only (or GPC) visit still sends Google Signals data to
 * doubleclick.net for ad personalization.
 */
export function setGoogleConsentMode(consent: Consent): void {
  const w = window as Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };
  w.dataLayer = w.dataLayer ?? [];
  if (!w.gtag) {
    // gtag.js only reads Arguments objects off the dataLayer, not arrays.
    w.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      w.dataLayer!.push(arguments);
    };
  }
  const ads = consent.advertising ? "granted" : "denied";
  w.gtag("consent", consentModeSet ? "update" : "default", {
    ad_storage: ads,
    ad_user_data: ads,
    ad_personalization: ads,
    analytics_storage: consent.analytics ? "granted" : "denied",
  });
  consentModeSet = true;
}
