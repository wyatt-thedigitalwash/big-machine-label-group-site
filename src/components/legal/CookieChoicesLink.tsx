"use client";

/**
 * Opens the cookie-preferences tool. Dispatches a window event that the cookie
 * consent component listens for, so the same trigger works from the footer and
 * from the "cookie consent tool" link inside the Cookies Policy.
 */
export default function CookieChoicesLink({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent("open-cookie-preferences"))}
      className={className}
    >
      Cookie Choices
    </button>
  );
}
