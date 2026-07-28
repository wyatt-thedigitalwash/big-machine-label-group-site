"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { readConsent } from "./consent";

// Shown once, right after the cookie choice is made, so the arbitration /
// class-action-waiver notice is front and center instead of buried in the
// footer. Persists acknowledgement separately from cookie consent. This site
// has no splash gate, so the notice is purely a one-time post-consent backup.
const STORAGE_KEY = "bmlg-terms-gate";

function readAcknowledged(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return !!window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return false;
  }
}

function writeAcknowledged(): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, new Date().toISOString());
  } catch {
    /* storage unavailable -- notice will simply reappear next visit */
  }
}

export default function TermsGate() {
  const [show, setShow] = useState(false);

  const maybeShow = useCallback(() => {
    // Shown once ever, only after a cookie decision has been recorded so the
    // two prompts don't stack on a first-time visitor at the same moment.
    if (readAcknowledged()) {
      setShow(false);
      return;
    }
    setShow(!!readConsent());
  }, []);

  useEffect(() => {
    maybeShow();
    window.addEventListener("cookie-consent-decided", maybeShow);
    return () => window.removeEventListener("cookie-consent-decided", maybeShow);
  }, [maybeShow]);

  const dismiss = () => {
    writeAcknowledged();
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] p-4 sm:left-auto sm:right-4 sm:max-w-[420px]">
      <div className="border border-text-body/20 bg-background-alt/95 p-4 shadow-2xl backdrop-blur-sm sm:p-6">
        <p className="font-body text-[12.5px] leading-relaxed text-text-accent sm:text-sm">
          Your use of this website constitutes your consent to our{" "}
          <Link href="/legal/terms" className="font-semibold underline hover:opacity-70">
            Terms &amp; Conditions
          </Link>
          , which includes your agreement to{" "}
          <Link href="/legal/terms#section-17" className="font-semibold underline hover:opacity-70">
            arbitrate any claims
          </Link>{" "}
          as well as a{" "}
          <Link
            href="/legal/terms#class-action-waiver"
            className="font-semibold underline hover:opacity-70"
          >
            waiver of any class action rights
          </Link>
          .
        </p>
        <button type="button" onClick={dismiss} className="cc-btn cc-btn-primary mt-3 w-full sm:mt-5">
          Got It
        </button>
      </div>
    </div>
  );
}
