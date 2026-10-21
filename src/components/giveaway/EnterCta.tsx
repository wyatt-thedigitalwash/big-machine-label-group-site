"use client";

import { smoothScrollTo } from "@/lib/smooth-scroll";

export default function EnterCta() {
  return (
    <a
      href="#enter"
      onClick={(e) => {
        const el = document.getElementById("enter");
        if (!el) return;
        e.preventDefault();
        smoothScrollTo(el, { duration: 1200 });
      }}
      className="inline-block bg-[var(--gv-cream)] text-[var(--gv-charcoal)] gv-sub uppercase text-[15px] md:text-[17px] px-10 py-4 transition-colors duration-[400ms] ease-out hover:bg-[var(--gv-orange)] hover:text-[var(--gv-cream)]"
    >
      Enter to win
    </a>
  );
}
