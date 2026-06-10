"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, useCallback, createContext, useContext } from "react";

const TransitionContext = createContext<(href: string) => void>(() => {});

export function usePageTransition() {
  return useContext(TransitionContext);
}

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [opacity, setOpacity] = useState(1);
  const isTransitioning = useRef(false);

  // Called before navigation to fade out current page
  const navigateWithTransition = useCallback(
    (href: string) => {
      if (isTransitioning.current) return;
      if (href === pathname) return;
      isTransitioning.current = true;

      // Fade out current page
      setOpacity(0);

      // After fade completes, navigate
      setTimeout(() => {
        window.scrollTo(0, 0);
        router.push(href);
      }, 450);
    },
    [router, pathname]
  );

  // When pathname changes (new page loaded), fade in
  useEffect(() => {
    if (!isTransitioning.current) return;

    // Small delay to let new page render
    const t = setTimeout(() => {
      setOpacity(1);
      setTimeout(() => {
        isTransitioning.current = false;
      }, 500);
    }, 50);

    return () => clearTimeout(t);
  }, [pathname]);

  // Intercept all internal link clicks
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Skip external links, hash links, new tab links
      if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      if (anchor.target === "_blank") return;
      if (e.metaKey || e.ctrlKey || e.shiftKey) return;

      // Skip hash-only links on same page
      if (href.startsWith("#")) return;

      // Skip if same page
      const cleanHref = href.split("#")[0] || "/";
      if (cleanHref === pathname) return;

      e.preventDefault();
      navigateWithTransition(cleanHref);
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [pathname, navigateWithTransition]);

  return (
    <TransitionContext.Provider value={navigateWithTransition}>
      <div
        className="page-transition-content"
        style={{
          opacity,
          transition: "opacity 450ms ease-in-out",
        }}
      >
        {children}
      </div>
    </TransitionContext.Provider>
  );
}
