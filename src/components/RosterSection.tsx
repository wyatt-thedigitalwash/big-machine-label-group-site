"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { artists } from "@/lib/data/artists";

export default function RosterSection() {
  const namesRef = useRef<(HTMLSpanElement | null)[]>([]);
  const blocksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const mobileImagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Check mobile on mount and resize
  useEffect(() => {
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [checkMobile]);

  // Desktop: name slide-up on enter (threshold 0.2)
  useEffect(() => {
    if (isMobile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.animation =
              "rosterSlideUp 600ms ease-out forwards";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    namesRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isMobile]);

  // Mobile: block scale entrance + name fade in
  useEffect(() => {
    if (!isMobile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const block = entry.target as HTMLElement;
            block.style.transition = "transform 600ms ease-out";
            block.style.transform = "scale(1)";

            // Trigger name slide-up animation (same as desktop)
            const nameEl = block.querySelector(
              "[data-mobile-name]"
            ) as HTMLElement | null;
            if (nameEl) {
              nameEl.style.animation =
                "rosterSlideUp 600ms ease-out forwards";
            }

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    blocksRef.current.forEach((el) => {
      if (el) {
        el.style.transform = "scale(0.97)";
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [isMobile]);

  // Mobile: parallax on scroll
  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      const vh = window.innerHeight;
      blocksRef.current.forEach((block, i) => {
        if (!block) return;
        const imgWrapper = mobileImagesRef.current[i];
        if (!imgWrapper) return;

        const rect = block.getBoundingClientRect();
        // progress: 0 when block enters bottom, 1 when it exits top
        const progress = 1 - (rect.bottom / (vh + rect.height));
        // Map to -40px to 40px range
        const translateY = (progress - 0.5) * 80;
        const clamped = Math.max(-40, Math.min(40, translateY));
        imgWrapper.style.transform = `translateY(${clamped}px)`;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  return (
    <section>
      {artists.map((artist, i) => {
        const isOdd = i % 2 === 0;

        return (
          <Link
            key={artist.slug}
            href={`/artists/${artist.slug}`}
            ref={(el) => {
              blocksRef.current[i] = el;
            }}
            className="group relative block h-[90vh] w-full overflow-hidden cursor-pointer"
          >
            {/* Mobile roster image with parallax wrapper */}
            {artist.rosterImage && (
              <div
                ref={(el) => {
                  mobileImagesRef.current[i] = el;
                }}
                className="absolute inset-[-40px_0] md:hidden"
              >
                <Image
                  src={artist.rosterImage}
                  alt={artist.name}
                  fill
                  className="object-cover object-center transition-[filter] duration-700 ease-out group-hover:brightness-[1.08]"
                  sizes="100vw"
                  priority={i < 3}
                />
              </div>
            )}

            {/* Desktop hero image */}
            {artist.heroImage ? (
              <Image
                src={artist.heroImage}
                alt={artist.name}
                fill
                className={`object-cover object-center transition-[filter] duration-700 ease-out group-hover:brightness-[1.08] ${artist.rosterImage ? "hidden md:block" : ""}`}
                sizes="100vw"
                priority={i < 3}
              />
            ) : !artist.rosterImage ? (
              <div
                className="absolute inset-0 transition-[filter] duration-700 ease-out group-hover:brightness-[1.08]"
                style={{
                  background: "linear-gradient(to bottom, #000000, #1a1a1a)",
                }}
              />
            ) : null}

            {/* Mobile vignette overlay */}
            <div
              className="absolute inset-0 z-[5] pointer-events-none md:hidden"
              style={{
                background:
                  "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
              }}
            />

            {/* Dark gradient overlay */}
            <div
              className="absolute inset-x-0 bottom-0 z-10 pointer-events-none"
              style={{
                height: "35%",
                background:
                  "linear-gradient(to top, #000000 0%, transparent 100%)",
              }}
            />

            {/* Artist name + mobile enhancements */}
            <div
              className={`absolute z-20 ${
                isOdd
                  ? "bottom-12 left-6 md:left-12"
                  : "bottom-12 right-6 md:right-12 text-right"
              }`}
            >
              <span
                ref={(el) => {
                  namesRef.current[i] = el;
                }}
                data-mobile-name
                className="block font-[family-name:var(--font-display)] text-[48px] md:text-[96px] uppercase leading-none text-white transition-colors duration-[400ms] ease-out group-hover:text-[#CA2125]"
                style={{ opacity: 0 }}
              >
                {artist.name}
              </span>
            </div>
          </Link>
        );
      })}
    </section>
  );
}
