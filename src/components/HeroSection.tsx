"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Roster", href: "/artists" },
  { label: "About", href: "/about" },
  { label: "News", href: "/news" },
  { label: "Sync", href: "/sync" },
  { label: "Contact", href: "/contact" },
];

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden flex items-center justify-center"
      style={{ height: "100dvh", background: "#000000" }}
    >
      {/* LOGO — centered */}
      <div
        className="relative z-[1] flex flex-col items-center"
        style={{
          opacity: mounted ? 1 : 0,
          transition: "opacity 800ms ease-out",
        }}
      >
        <Image
          src="/logos/big-machine-records-logo.png"
          alt="Big Machine Records"
          width={900}
          height={450}
          className="w-[85vw] md:w-[min(700px,60vw)] h-auto object-contain"
          priority
        />
      </div>

      {/* MOBILE — Bottom elements (absolute) */}
      <div
        className="absolute z-[4] left-1/2 flex flex-col items-center md:hidden"
        style={{
          bottom: "calc(16px + env(safe-area-inset-bottom, 0px))",
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
          style={{ gap: 20 }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-[family-name:var(--font-display)] uppercase text-white no-underline transition-colors duration-[250ms] ease-out hover:text-[#CA2125]"
              style={{ fontSize: 22 }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* DESKTOP — Bottom elements */}
      <div
        className="absolute z-[4] left-1/2 hidden md:flex flex-col items-center"
        style={{
          bottom: 40,
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
          style={{ gap: 40 }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-[family-name:var(--font-display)] uppercase text-white no-underline transition-colors duration-[250ms] ease-out hover:text-[#CA2125]"
              style={{ fontSize: 28 }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
