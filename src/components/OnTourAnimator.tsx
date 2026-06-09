"use client";

import { useEffect, useRef } from "react";

export default function OnTourAnimator({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const items = container.querySelectorAll("[data-tour-animate]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = Number(el.dataset.tourDelay || 0);
            setTimeout(() => {
              el.style.transition =
                "opacity 500ms ease-out, transform 500ms ease-out";
              el.style.opacity = "1";
              el.style.transform = "translateY(0)";
            }, delay);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );

    items.forEach((item) => {
      const el = item as HTMLElement;
      el.style.opacity = "0";
      el.style.transform = "translateY(16px)";
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return <div ref={ref}>{children}</div>;
}
