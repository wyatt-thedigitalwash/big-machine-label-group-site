"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const photos = [
  { src: "/images/hero/big-machine-riley-green-hero.webp", alt: "Riley Green" },
  {
    src: "/images/hero/big-machine-rascal-flatts-hero.webp",
    alt: "Rascal Flatts",
  },
  {
    src: "/images/hero/big-machine-mackenzie-carpenter-hero.webp",
    alt: "Mackenzie Carpenter",
  },
  {
    src: "/images/hero/big-machine-greyland-james-hero.webp",
    alt: "Greyland James",
  },
  {
    src: "/images/hero/big-machine-caroline-jones-hero.webp",
    alt: "Caroline Jones",
  },
  {
    src: "/images/hero/big-machine-cole-goodwin-hero.webp",
    alt: "Cole Goodwin",
  },
  {
    src: "/images/hero/big-machine-jack-wharff-band-hero.webp",
    alt: "The Jack Wharff Band",
  },
  { src: "/images/hero/big-machine-shaylen-hero.webp", alt: "Shaylen" },
];

const navLinks = [
  { label: "Roster", href: "/artists" },
  { label: "About", href: "/about" },
  { label: "News", href: "/news" },
  { label: "Sync", href: "/sync" },
  { label: "Contact", href: "/contact" },
];

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % photos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const textLines = (color: string) => (
    <>
      <span
        className="font-[family-name:var(--font-display)] uppercase leading-[1] whitespace-nowrap"
        style={{
          fontSize: "clamp(72px, 24vw, 320px)",
          color,
          letterSpacing: "-0.01em",
        }}
      >
        Big Machine
      </span>
      <span
        className="font-[family-name:var(--font-display)] uppercase leading-[1] whitespace-nowrap"
        style={{
          fontSize: "clamp(72px, 24vw, 320px)",
          color,
          letterSpacing: "-0.01em",
        }}
      >
        Records
      </span>
    </>
  );

  return (
    <section
      className="relative w-full overflow-hidden flex items-center justify-center"
      style={{ height: "100vh", background: "#000000" }}
    >
      {/* LAYER 1 — Red text behind image */}
      <div
        className="absolute inset-0 z-[1] flex flex-col items-center justify-center"
        style={{
          gap: 0,
          opacity: mounted ? 1 : 0,
          transition: "opacity 800ms ease-out",
        }}
      >
        {textLines("#FFFFFF")}
      </div>

      {/* LAYER 2 — Rotating photo */}
      <div
        className="absolute z-[2] w-[260px] h-[340px] md:w-[580px] md:h-[680px] overflow-hidden"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: mounted ? 1 : 0,
          transition: "opacity 800ms ease-out 300ms",
        }}
      >
        {photos.map((photo, i) => (
          <Image
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            fill
            className="object-cover object-center"
            style={{
              filter: "grayscale(100%)",
              opacity: i === activeIndex ? 1 : 0,
              transition: "opacity 800ms ease-in-out",
              animation:
                i === activeIndex ? "heroKenBurns 4000ms ease-out forwards" : "none",
            }}
            sizes="(max-width: 768px) 260px, 580px"
            priority={i === 0}
          />
        ))}
      </div>

      {/* LAYER 3 — Black text mask above image */}
      <div
        className="absolute z-[3] w-[260px] h-[340px] md:w-[580px] md:h-[680px] overflow-hidden pointer-events-none"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "transparent",
          opacity: mounted ? 1 : 0,
          transition: "opacity 800ms ease-out 300ms",
        }}
      >
        <div
          className="absolute flex flex-col items-center justify-center"
          style={{
            width: "100vw",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {textLines("#000000")}
        </div>
      </div>

      {/* BOTTOM ELEMENTS */}
      <div
        className="absolute z-[4] bottom-6 md:bottom-10 left-1/2 flex flex-col items-center"
        style={{
          transform: mounted ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(12px)",
          opacity: mounted ? 1 : 0,
          transition: "opacity 500ms ease-out 900ms, transform 500ms ease-out 900ms",
        }}
      >
        <span
          className="font-[family-name:var(--font-body)] uppercase"
          style={{
            fontSize: 12,
            color: "#717171",
            letterSpacing: "0.2em",
          }}
        >
          Nashville, Tennessee
        </span>

        <nav
          className="flex items-center mt-4"
          style={{ gap: "clamp(20px, 4vw, 40px)" }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-[family-name:var(--font-display)] uppercase text-white no-underline transition-colors duration-[250ms] ease-out hover:text-[#CA2125]"
              style={{ fontSize: "clamp(22px, 3vw, 28px)" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
