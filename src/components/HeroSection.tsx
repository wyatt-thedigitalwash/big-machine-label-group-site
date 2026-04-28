"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  {
    label: "Roster",
    href: "/artists",
    bg: "/images/hero/big-machine-riley-green-hero.webp",
  },
  {
    label: "About",
    href: "/about",
    bg: "/images/hero/big-machine-rascal-flatts-hero.webp",
  },
  {
    label: "News",
    href: "/news",
    bg: "/images/hero/big-machine-greyland-james-hero.webp",
  },
  {
    label: "Sync",
    href: "/sync",
    bg: "/images/hero/big-machine-caroline-jones-hero.webp",
  },
  {
    label: "Contact",
    href: "/contact",
    bg: "/images/hero/big-machine-mackenzie-carpenter-hero.webp",
  },
];

export default function HeroSection() {
  const [hoveredBg, setHoveredBg] = useState<string | null>(null);
  const [activeBg, setActiveBg] = useState<string | null>(null);
  const fadeOutTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = (bg: string) => {
    if (fadeOutTimer.current) {
      clearTimeout(fadeOutTimer.current);
      fadeOutTimer.current = null;
    }
    setActiveBg(bg);
    setHoveredBg(bg);
  };

  const handleMouseLeave = () => {
    setHoveredBg(null);
    fadeOutTimer.current = setTimeout(() => {
      setActiveBg(null);
    }, 600);
  };

  return (
    <section className="relative h-screen bg-black overflow-hidden flex flex-col items-center justify-center">
      {/* Background image on hover */}
      {activeBg && (
        <Image
          src={activeBg}
          alt=""
          fill
          className="object-cover object-center transition-opacity ease-out z-0"
          style={{
            opacity: hoveredBg ? 0.15 : 0,
            transitionDuration: hoveredBg ? "400ms" : "600ms",
          }}
          sizes="100vw"
          priority
        />
      )}

      {/* Content wrapper */}
      <div className="relative z-[1]" style={{ display: "contents" }}>
        {/* Logo */}
        <div
          style={{
            animation: "heroLogoIn 700ms ease-out both",
          }}
        >
          <Image
            src="/logos/big-machine-records-logo.png"
            alt="Big Machine Records"
            width={780}
            height={390}
            className="h-auto object-contain hero-logo"
            priority
          />
        </div>

        {/* Red divider */}
        <div className="flex-shrink-0 hero-rule-spacing">
          <div
            style={{
              height: 1,
              width: 0,
              backgroundColor: "#CA2125",
              animation: "heroRuleFullDraw 500ms ease-out 500ms both",
            }}
          />
        </div>

        {/* Nav links */}
        <nav className="hero-nav">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-[family-name:var(--font-display)] uppercase text-white no-underline transition-colors duration-[250ms] ease-out hover:text-[#CA2125] text-center hero-nav-link ${
                i === navLinks.length - 1 ? "hero-nav-link-last" : ""
              }`}
              style={{
                letterSpacing: "0.06em",
                animation: `heroNavIn 400ms ease-out ${800 + i * 60}ms both`,
              }}
              onMouseEnter={() => handleMouseEnter(link.bg)}
              onMouseLeave={handleMouseLeave}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Nashville, Tennessee */}
        <p
          className="font-[family-name:var(--font-body)] uppercase"
          style={{
            fontSize: 13,
            letterSpacing: "0.2em",
            color: "#717171",
            animation: "heroFadeIn 400ms ease-out 1200ms both",
          }}
        >
          Nashville, Tennessee
        </p>
      </div>
    </section>
  );
}
