"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  CATEGORY_META,
  type Category,
  type Consent,
  emptyConsent,
  readConsent,
  writeConsent,
} from "./consent";
import { applyConsent } from "./injectScripts";

const NON_NECESSARY: Category[] = ["analytics", "advertising", "functional", "social"];

// A stable timestamp source. Date.now() is fine in the browser here.
function now() {
  return new Date().toISOString();
}

export default function CookieConsent() {
  const [decided, setDecided] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [draft, setDraft] = useState<Consent>(() => emptyConsent(false));
  const applied = useRef<Consent | null>(null);

  // On mount: load any saved choice and inject the consented scripts. A
  // first-time visitor (no saved choice) sees the banner right away -- this
  // site has no splash gate to wait on.
  useEffect(() => {
    const saved = readConsent();
    if (saved) {
      applyConsent(saved);
      applied.current = saved;
      setDraft(saved);
      setDecided(true);
    } else {
      setShowBanner(true);
    }
  }, []);

  const openModal = useCallback(() => {
    setDraft(readConsent() ?? applied.current ?? emptyConsent(false));
    setShowModal(true);
  }, []);

  // Allow the footer link and the in-policy "cookie consent tool" link to open it.
  useEffect(() => {
    window.addEventListener("open-cookie-preferences", openModal);
    return () => window.removeEventListener("open-cookie-preferences", openModal);
  }, [openModal]);

  const closeModal = useCallback(() => {
    setShowModal(false);
    // Closing without choosing must not count as consent -- send a first-time
    // visitor back to the banner so they still make a choice.
    if (!decided) setShowBanner(true);
  }, [decided]);

  // Escape to close + lock background scroll while the modal is open.
  useEffect(() => {
    if (!showModal) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [showModal, closeModal]);

  const commit = useCallback((consent: Consent) => {
    writeConsent(consent);
    // If the user turned OFF a category that was already injected this session,
    // a reload is required to clear those scripts/cookies.
    const prev = applied.current;
    const removed = prev ? NON_NECESSARY.some((c) => prev[c] && !consent[c]) : false;
    setShowBanner(false);
    setShowModal(false);
    setDecided(true);
    window.dispatchEvent(new Event("cookie-consent-decided"));
    if (removed) {
      window.location.reload();
      return;
    }
    applyConsent(consent);
    applied.current = consent;
  }, []);

  const acceptAll = () => commit({ ...emptyConsent(true), decidedAt: now() });
  const rejectAll = () => commit({ ...emptyConsent(false), decidedAt: now() });
  const savePreferences = () => commit({ ...draft, necessary: true, decidedAt: now() });

  const toggle = (c: Category) => setDraft((d) => ({ ...d, [c]: !d[c] }));

  // "Unsaved changes" = the draft differs from what's actually applied/saved.
  const base = applied.current ?? emptyConsent(false);
  const dirty = NON_NECESSARY.some((c) => base[c] !== draft[c]);

  return (
    <>
      {/* ── Consent banner (first visit) ── */}
      {showBanner && !showModal && (
        <div className="fixed inset-x-0 bottom-0 z-[60] p-4 sm:left-auto sm:right-4 sm:max-w-[420px]">
          <div className="border border-text-body/20 bg-background-alt/95 p-4 shadow-2xl backdrop-blur-sm sm:p-6">
            <p className="font-display text-[15px] text-text-accent sm:text-[18px]">We value your privacy</p>
            <p className="mt-2 font-body text-[12.5px] leading-relaxed text-text-accent sm:mt-3 sm:text-sm">
              We use cookies to run this site, analyse traffic, and support advertising. You can accept all,
              reject non-essential cookies, or choose what to allow. See our{" "}
              <Link href="/legal/privacy#cookies-policy" className="underline hover:text-text-header">
                Cookies Policy
              </Link>
              .
            </p>
            <div className="mt-3 flex flex-col gap-2 sm:mt-5">
              <button type="button" onClick={acceptAll} className="cc-btn cc-btn-primary">
                Accept All
              </button>
              <div className="flex gap-2">
                <button type="button" onClick={rejectAll} className="cc-btn cc-btn-ghost flex-1">
                  Reject All
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDraft(emptyConsent(false));
                    setShowBanner(false);
                    setShowModal(true);
                  }}
                  className="cc-btn cc-btn-ghost flex-1"
                >
                  Manage
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Preferences modal ── */}
      {showModal && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Cookie preferences"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="relative max-h-[88vh] w-full max-w-[540px] overflow-y-auto border border-text-body/20 bg-background-alt p-6 shadow-2xl sm:p-8">
            {/* Close */}
            <button
              type="button"
              onClick={closeModal}
              aria-label="Close cookie preferences"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-text-accent/70 transition-colors hover:bg-white/10 hover:text-text-accent"
            >
              <span aria-hidden="true" className="text-xl leading-none">
                &times;
              </span>
            </button>

            <p className="pr-8 font-display text-[22px] text-text-accent">Cookie Preferences</p>
            <p className="mt-2 font-body text-sm text-text-accent/80">
              Choose which categories of cookies to allow, then click Save Preferences. Read more in our{" "}
              <Link href="/legal/privacy#cookies-policy" className="underline hover:text-text-header">
                Cookies Policy
              </Link>
              .
            </p>

            <ul className="mt-5 flex flex-col divide-y divide-text-body/15">
              {CATEGORY_META.map((cat) => (
                <li key={cat.key} className="flex items-start justify-between gap-4 py-4">
                  <div>
                    <p className="font-body font-semibold text-text-accent">{cat.label}</p>
                    <p className="mt-1 font-body text-xs leading-relaxed text-text-accent/70">
                      {cat.description}
                    </p>
                  </div>
                  {cat.locked ? (
                    <span className="mt-1 shrink-0 font-body text-xs uppercase tracking-wide text-text-accent/60">
                      Always on
                    </span>
                  ) : (
                    <button
                      type="button"
                      role="switch"
                      aria-checked={draft[cat.key]}
                      aria-label={cat.label}
                      onClick={() => toggle(cat.key)}
                      className={`mt-1 flex h-6 w-11 shrink-0 items-center rounded-full px-0.5 transition-colors ${
                        draft[cat.key] ? "bg-[#CA2125] justify-end" : "bg-white/25 justify-start"
                      }`}
                    >
                      <span
                        className="h-5 w-5 rounded-full bg-white"
                      />
                    </button>
                  )}
                </li>
              ))}
            </ul>

            {/* Unsaved-changes reminder */}
            <div className="mt-6 min-h-[20px]">
              {dirty && (
                <p className="flex items-center gap-2 font-body text-xs text-text-accent">
                  <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-white" />
                  You have unsaved changes -- click Save Preferences to apply them.
                </p>
              )}
            </div>

            <div className="mt-2 flex flex-col gap-2">
              <button type="button" onClick={savePreferences} className="cc-btn cc-btn-primary">
                Save Preferences
              </button>
              <div className="flex gap-2">
                <button type="button" onClick={rejectAll} className="cc-btn cc-btn-ghost flex-1">
                  Reject All
                </button>
                <button type="button" onClick={acceptAll} className="cc-btn cc-btn-ghost flex-1">
                  Accept All
                </button>
              </div>
              <p className="mt-1 text-center font-body text-[11px] text-text-accent/50">
                Reject All and Accept All apply immediately.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── Floating pill (after a choice is made) ── */}
      {decided && !showModal && (
        <button
          type="button"
          onClick={openModal}
          aria-label="Cookie choices"
          className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full border border-text-body/25 bg-background-alt/95 px-4 py-2 font-body text-xs text-text-accent shadow-lg backdrop-blur-sm transition-colors hover:border-text-body/50 hover:text-text-header"
        >
          <svg
            viewBox="0 0 24 24"
            width="15"
            height="15"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="shrink-0"
          >
            <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
            <path d="M8.5 8.5v.01" />
            <path d="M16 15.5v.01" />
            <path d="M12 12v.01" />
            <path d="M11 17v.01" />
            <path d="M7 14v.01" />
          </svg>
          Cookie Choices
        </button>
      )}
    </>
  );
}
