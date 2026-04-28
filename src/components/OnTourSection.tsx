"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { artists } from "@/lib/data/artists";
import SectionHeader from "@/components/SectionHeader";

const artistsWithShows = artists.filter((a) => a.nextShow !== null);

export default function OnTourSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items = section.querySelectorAll("[data-tour-animate]");

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

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  if (artistsWithShows.length === 0) return null;

  return (
    <section className="w-full bg-black px-6 py-12 md:px-10 md:py-20" ref={sectionRef}>
      <div
        data-tour-animate
        data-tour-delay="0"
        style={{ opacity: 0, transform: "translateY(16px)" }}
      >
        <SectionHeader title="On Tour" />
      </div>

      <div>
        {artistsWithShows.map((artist, i) => (
          <div
            key={artist.slug}
            className="flex flex-col md:flex-row md:items-center py-5 transition-colors duration-200 ease-out hover:bg-[#0D0D0D]"
            style={{
              borderTop: "1px solid #1a1a1a",
              borderBottom:
                i === artistsWithShows.length - 1
                  ? "1px solid #1a1a1a"
                  : undefined,
              opacity: 0,
              transform: "translateY(16px)",
            }}
            data-tour-animate
            data-tour-delay={String((i + 1) * 40)}
          >
            <Link
              href={`/artists/${artist.slug}`}
              className="font-[family-name:var(--font-display)] text-[28px] uppercase text-white leading-none no-underline transition-colors duration-300 ease-out hover:text-[#CA2125] md:w-[280px] md:flex-shrink-0"
            >
              {artist.name}
            </Link>

            <div className="flex flex-col mt-2 md:mt-0 md:flex-1 md:flex-row md:items-center md:justify-center">
              <span
                className="font-[family-name:var(--font-body)] text-[14px]"
                style={{ color: "#C8C7C8" }}
              >
                {artist.nextShow!.date}
              </span>
              <span
                className="hidden md:inline font-[family-name:var(--font-body)] text-[14px] mx-2"
                style={{ color: "#717171" }}
              >
                &middot;
              </span>
              <span
                className="font-[family-name:var(--font-body)] text-[14px]"
                style={{ color: "#717171" }}
              >
                {artist.nextShow!.venue}
              </span>
              <span
                className="hidden md:inline font-[family-name:var(--font-body)] text-[14px] mx-2"
                style={{ color: "#717171" }}
              >
                &middot;
              </span>
              <span
                className="font-[family-name:var(--font-body)] text-[14px]"
                style={{ color: "#717171" }}
              >
                {artist.nextShow!.city}
              </span>
            </div>

            <a
              href={artist.nextShow!.ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-[family-name:var(--font-body)] text-[13px] uppercase no-underline mt-2 md:mt-0 md:w-[120px] md:text-right md:flex-shrink-0 transition-opacity duration-200 ease-out hover:opacity-70"
              style={{ letterSpacing: "0.1em", color: "#CA2125" }}
            >
              Tickets
            </a>
          </div>
        ))}
      </div>

      <p
        className="font-[family-name:var(--font-body)] text-[13px] text-center mt-8"
        style={{ color: "#717171" }}
      >
        Show dates are subject to change. Visit each artist page for full tour
        schedules.
      </p>
    </section>
  );
}
