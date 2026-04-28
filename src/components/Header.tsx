"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { artists } from "@/lib/data/artists";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "News", href: "/news" },
  { label: "Sync", href: "/sync" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const [hoveredArtist, setHoveredArtist] = useState<string | null>(null);
  const [pastHero, setPastHero] = useState(false);

  const closeNav = useCallback(() => setNavOpen(false), []);

  useEffect(() => {
    const handleScroll = () => {
      setPastHero(window.scrollY >= window.innerHeight);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!navOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeNav();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [navOpen, closeNav]);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50">
        <div
          className="absolute inset-x-0 top-0 pointer-events-none"
          style={{
            height: 140,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)",
          }}
        />
        <div className="relative flex items-center justify-between px-6 py-4 md:px-10 md:py-5">
          <Link
            href="/"
            aria-label="Big Machine Records home"
            className="transition-opacity duration-300 ease-out"
            style={{
              opacity: pastHero ? 1 : 0,
              pointerEvents: pastHero ? "auto" : "none",
            }}
          >
            <Image
              src="/logos/big-machine-records-nav-logo.png"
              alt="Big Machine Records"
              width={133}
              height={40}
              className="h-8 w-auto md:h-10"
              priority
            />
          </Link>
          <button
            onClick={() => setNavOpen(true)}
            aria-label="Open navigation"
            className="relative flex flex-col justify-center items-center gap-[6px] p-2 bg-transparent border-none cursor-pointer z-50"
          >
            <span className="block w-6 h-[2px] bg-white" />
            <span className="block w-6 h-[2px] bg-white" />
            <span className="block w-6 h-[2px] bg-white" />
          </button>
        </div>
      </header>

      {navOpen && (
        <nav
          className="fixed inset-0 z-[100] flex flex-col"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.97)",
            animation: "fadeIn 300ms ease-out forwards",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeNav();
          }}
        >
          <div className="flex justify-end px-6 py-4 md:px-10 md:py-5">
            <button
              onClick={closeNav}
              aria-label="Close navigation"
              className="relative w-8 h-8 bg-transparent border-none cursor-pointer"
            >
              <span
                className="absolute top-1/2 left-1/2 block w-8 h-[2px] bg-white"
                style={{ transform: "translate(-50%, -50%) rotate(45deg)" }}
              />
              <span
                className="absolute top-1/2 left-1/2 block w-8 h-[2px] bg-white"
                style={{ transform: "translate(-50%, -50%) rotate(-45deg)" }}
              />
            </button>
          </div>

          <div className="flex-1 flex flex-col md:flex-row px-6 md:px-10 overflow-y-auto">
            <div className="md:w-[60%] flex flex-col justify-center py-8">
              <ul className="list-none p-0 m-0 space-y-1">
                {artists.map((artist, i) => (
                  <li
                    key={artist.slug}
                    style={{
                      animation: `slideInLeft 400ms ease-out ${i * 40}ms forwards`,
                      opacity: 0,
                    }}
                  >
                    <Link
                      href={`/artists/${artist.slug}`}
                      className="block font-[family-name:var(--font-display)] text-[32px] md:text-[48px] leading-none uppercase text-white no-underline transition-colors duration-300 ease-out hover:text-[#CA2125]"
                      onClick={closeNav}
                      onMouseEnter={() => setHoveredArtist(artist.slug)}
                      onMouseLeave={() => setHoveredArtist(null)}
                    >
                      {artist.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="flex gap-6 mt-10">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="font-[family-name:var(--font-body)] text-[14px] uppercase tracking-[0.15em] text-white no-underline transition-colors duration-300 ease-out hover:text-[#CA2125]"
                    onClick={closeNav}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="hidden md:block md:w-[40%] relative">
              {artists.map((artist) =>
                artist.rosterImage ? (
                  <div
                    key={artist.slug}
                    className="absolute inset-0 transition-opacity duration-200 ease-out"
                    style={{
                      opacity: hoveredArtist === artist.slug ? 1 : 0,
                    }}
                  >
                    <Image
                      src={artist.rosterImage}
                      alt={artist.name}
                      fill
                      className="object-cover"
                      sizes="40vw"
                    />
                  </div>
                ) : null
              )}
              {!hoveredArtist && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-[family-name:var(--font-body)] text-[14px] text-[#717171] uppercase tracking-[0.15em]">
                    Hover an artist
                  </span>
                </div>
              )}
            </div>
          </div>
        </nav>
      )}

    </>
  );
}
