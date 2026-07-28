"use client";

import { useCallback, useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Fixes same-page hash navigation for internal links (e.g. the legal pages'
 * "Section 17" / class-action-waiver anchors, and the Terms notice links).
 *
 * Neither the browser nor Next's <Link> reliably scrolls when only the hash
 * changes on the current route:
 *  - jumping from #section-17 to #class-action-waiver on /legal/terms, or
 *  - clicking a bare link back to /legal/terms while a hash is still active.
 *
 * Cross-page navigations are left untouched -- Next handles the route change
 * and the destination page (LegalArticle) scrolls to its own hash on mount.
 * Bare "#..." anchors are also left to the browser, which scrolls them
 * natively and respects each target's scroll-margin-top (the sticky-header
 * offset). This only steps in for full-path internal links on the same route.
 */
export default function AnchorScroll() {
  const pathname = usePathname();

  const handleClick = useCallback(
    (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Only internal route links. Leave external, hash-only, new-tab, and
      // modified (cmd/ctrl/shift) clicks to their native behavior.
      if (
        !href.startsWith("/") ||
        anchor.target === "_blank" ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey
      )
        return;

      const hashIndex = href.indexOf("#");
      const hrefPath = hashIndex === -1 ? href : href.slice(0, hashIndex);
      const hrefId = hashIndex === -1 ? "" : href.slice(hashIndex + 1);

      // Only same-route links need special handling; let Next handle the rest.
      if (hrefPath !== pathname) return;

      if (hrefId) {
        const target = document.getElementById(hrefId);
        if (target) {
          e.preventDefault();
          history.pushState(null, "", href);
          target.scrollIntoView({ behavior: "instant", block: "start" });
        }
      } else if (window.location.hash) {
        // Bare link back to this route while a hash is active: clear it and
        // return to the top instead of silently doing nothing.
        e.preventDefault();
        history.pushState(null, "", hrefPath);
        window.scrollTo(0, 0);
      }
    },
    [pathname]
  );

  useEffect(() => {
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [handleClick]);

  return null;
}
