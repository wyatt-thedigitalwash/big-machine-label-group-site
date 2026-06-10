"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { artists } from "@/lib/data/artists";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Roster", href: "/artists" },
  { label: "About", href: "/about" },
  { label: "News", href: "/news" },
  { label: "Videos", href: "/videos" },
  { label: "Tour", href: "/tour" },
  { label: "Sync", href: "/sync" },
  { label: "Contact", href: "/contact" },
  { label: "Careers", href: "/careers" },
];

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const [navFading, setNavFading] = useState(false);
  const [hoveredArtist, setHoveredArtist] = useState<string | null>(null);
  const [pastHero, setPastHero] = useState(false);

  const pathname = usePathname();
  const isHome = pathname === "/";
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);

  const closeNav = useCallback(() => {
    setNavOpen(false);
    setNavFading(false);
    setTimeout(() => openButtonRef.current?.focus(), 100);
  }, []);

  // Fade nav content out before navigating
  const handleNavLinkClick = useCallback(() => {
    setNavFading(true);
    // After fade, close nav -- the page transition handles the rest
    setTimeout(() => {
      setNavOpen(false);
      setNavFading(false);
    }, 400);
  }, []);

  // Close nav when pathname changes (navigation completed)
  useEffect(() => {
    setNavOpen(false);
    setNavFading(false);
  }, [pathname]);

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

    setTimeout(() => closeButtonRef.current?.focus(), 100);

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeNav();

      if (e.key === "Tab" && navRef.current) {
        const focusable = navRef.current.querySelectorAll<HTMLElement>(
          'a[href], button, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
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
          aria-hidden="true"
        />
        <div className="relative flex items-center justify-between px-6 py-4 md:px-10 md:py-5">
          <Link
            href="/"
            aria-label="Big Machine Records home"
            className="transition-opacity duration-300 ease-out"
            style={{
              opacity: isHome && !pastHero ? 0 : 1,
              pointerEvents: isHome && !pastHero ? "none" : "auto",
            }}
          >
            <Image
              src="/logos/big-machine-records-nav-logo-new.png"
              alt="Big Machine Records"
              width={166}
              height={50}
              className="h-10 w-auto md:h-12"
              priority
            />
          </Link>
          <button
            ref={openButtonRef}
            onClick={() => setNavOpen(true)}
            aria-label="Open navigation"
            aria-expanded={navOpen}
            className="relative flex flex-col justify-center items-center gap-[6px] w-11 h-11 bg-transparent border-none cursor-pointer z-50"
          >
            <span className="block w-6 h-[2px] bg-white" aria-hidden="true" />
            <span className="block w-6 h-[2px] bg-white" aria-hidden="true" />
            <span className="block w-6 h-[2px] bg-white" aria-hidden="true" />
          </button>
        </div>
      </header>

      {navOpen && (
        <nav
          ref={navRef}
          role="dialog"
          aria-modal="true"
          aria-label="Main navigation"
          className="fixed inset-0 z-[100] flex flex-col"
          style={{
            backgroundColor: "#000000",
            animation: navFading ? undefined : "fadeIn 300ms ease-out forwards",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeNav();
          }}
        >
          {/* Nav content fades out when a link is clicked */}
          <div
            style={{
              opacity: navFading ? 0 : 1,
              transition: "opacity 350ms ease-in",
              display: "flex",
              flexDirection: "column",
              flex: 1,
            }}
          >
            <div className="flex justify-end px-6 py-4 md:px-10 md:py-5">
              <button
                ref={closeButtonRef}
                onClick={closeNav}
                aria-label="Close navigation"
                className="relative w-11 h-11 bg-transparent border-none cursor-pointer flex items-center justify-center"
              >
                <span
                  className="absolute block w-8 h-[2px] bg-white"
                  style={{ transform: "rotate(45deg)" }}
                  aria-hidden="true"
                />
                <span
                  className="absolute block w-8 h-[2px] bg-white"
                  style={{ transform: "rotate(-45deg)" }}
                  aria-hidden="true"
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
                        animation: navFading
                          ? undefined
                          : `slideInLeft 400ms ease-out ${i * 40}ms forwards`,
                        opacity: navFading ? undefined : 0,
                      }}
                    >
                      <Link
                        href={`/artists/${artist.slug}`}
                        className="block font-[family-name:var(--font-display)] text-[40px] md:text-[48px] leading-none uppercase text-white no-underline transition-colors duration-300 ease-out hover:text-[#CA2125]"
                        onClick={handleNavLinkClick}
                        onMouseEnter={() => setHoveredArtist(artist.slug)}
                        onMouseLeave={() => setHoveredArtist(null)}
                      >
                        {artist.name}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-x-6 gap-y-3 mt-10">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="font-[family-name:var(--font-body)] text-[14px] font-semibold uppercase text-white no-underline transition-colors duration-300 ease-out hover:text-[#CA2125]"
                      onClick={handleNavLinkClick}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                {/* Social links -- mobile only */}
                <div className="flex gap-6 mt-8 md:hidden">
                  <a
                    href="https://www.instagram.com/bigmachinelabelgroup/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="transition-opacity duration-200 ease-out hover:opacity-60"
                  >
                    <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="#FFFFFF">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </a>
                  <a
                    href="https://x.com/BigMachine"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X"
                    className="transition-opacity duration-200 ease-out hover:opacity-60"
                  >
                    <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="#FFFFFF">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.facebook.com/profile.php?id=61572109297818"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="transition-opacity duration-200 ease-out hover:opacity-60"
                  >
                    <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="#FFFFFF">
                      <path d="M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 5.99 4.388 10.954 10.125 11.854V15.47H7.078V12h3.047V9.356c0-3.007 1.792-4.668 4.533-4.668 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.875V12h3.328l-.532 3.47h-2.796v8.385C19.612 22.954 24 17.99 24 12z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.linkedin.com/company/bigmachinerecords/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="transition-opacity duration-200 ease-out hover:opacity-60"
                  >
                    <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="#FFFFFF">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="hidden md:block md:w-[40%] relative" aria-hidden="true">
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
                        alt=""
                        fill
                        className="object-cover"
                        sizes="40vw"
                      />
                    </div>
                  ) : null
                )}
                {!hoveredArtist && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-[family-name:var(--font-body)] text-[14px] text-[#717171] uppercase">
                      Hover an artist
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}
