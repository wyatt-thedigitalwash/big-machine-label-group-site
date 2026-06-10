import Link from "next/link";
import Image from "next/image";
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

const leftArtists = artists.slice(0, 7);
const rightArtists = artists.slice(7, 14);

export default function Footer() {
  return (
    <footer className="w-full" style={{ backgroundColor: "#000000" }}>
      {/* Top rule */}
      <div className="w-full h-px" style={{ backgroundColor: "#CA2125" }} />

      {/* Main footer body */}
      <div
        className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] gap-12 md:gap-16 px-8 py-12 md:px-20 md:py-16"
      >
        {/* Column 1 -- Navigate */}
        <div>
          <span
            className="block font-[family-name:var(--font-body)] uppercase"
            style={{
              fontSize: 13,
              color: "#717171",
              letterSpacing: "0.2em",
              marginBottom: 20,
            }}
          >
            Navigate
          </span>
          <nav className="flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-[family-name:var(--font-body)] text-white no-underline transition-colors duration-200 ease-out hover:text-[#CA2125]"
                style={{ fontSize: 14, lineHeight: 2.2 }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Column 2 -- Artists */}
        <div>
          <span
            className="block font-[family-name:var(--font-body)] uppercase"
            style={{
              fontSize: 13,
              color: "#717171",
              letterSpacing: "0.2em",
              marginBottom: 20,
            }}
          >
            Artists
          </span>
          {/* Desktop: two-column sub-grid */}
          <div className="hidden md:grid" style={{ gridTemplateColumns: "1fr 1fr", columnGap: 24 }}>
            <div className="flex flex-col">
              {leftArtists.map((artist) => (
                <Link
                  key={artist.slug}
                  href={`/artists/${artist.slug}`}
                  className="font-[family-name:var(--font-body)] text-white no-underline transition-colors duration-200 ease-out hover:text-[#CA2125]"
                  style={{ fontSize: 14, lineHeight: 2.2 }}
                >
                  {artist.name}
                </Link>
              ))}
            </div>
            <div className="flex flex-col">
              {rightArtists.map((artist) => (
                <Link
                  key={artist.slug}
                  href={`/artists/${artist.slug}`}
                  className="font-[family-name:var(--font-body)] text-white no-underline transition-colors duration-200 ease-out hover:text-[#CA2125]"
                  style={{ fontSize: 14, lineHeight: 2.2 }}
                >
                  {artist.name}
                </Link>
              ))}
            </div>
          </div>
          {/* Mobile: single column */}
          <div className="flex flex-col md:hidden">
            {artists.map((artist) => (
              <Link
                key={artist.slug}
                href={`/artists/${artist.slug}`}
                className="font-[family-name:var(--font-body)] text-white no-underline transition-colors duration-200 ease-out hover:text-[#CA2125]"
                style={{ fontSize: 14, lineHeight: 2.2 }}
              >
                {artist.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Column 3 -- Connect */}
        <div>
          <span
            className="block font-[family-name:var(--font-body)] uppercase"
            style={{
              fontSize: 13,
              color: "#717171",
              letterSpacing: "0.2em",
              marginBottom: 20,
            }}
          >
            Connect
          </span>
          <p
            className="font-[family-name:var(--font-body)]"
            style={{ fontSize: 14, color: "#717171", marginBottom: 20 }}
          >
            Nashville, Tennessee
          </p>
          <div className="flex flex-col" style={{ gap: 12 }}>
            <a
              href="https://www.instagram.com/bigmachinelabelgroup/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center no-underline group"
              style={{ gap: 10 }}
            >
              <svg
                aria-hidden="true"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white transition-colors duration-200 ease-out group-hover:text-[#CA2125]"
              >
                <rect x="2" y="2" width="20" height="20" rx="0" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
              <span
                className="font-[family-name:var(--font-body)] text-white transition-colors duration-200 ease-out group-hover:text-[#CA2125]"
                style={{ fontSize: 14 }}
              >
                Instagram
              </span>
            </a>
            <a
              href="https://x.com/BigMachine"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center no-underline group"
              style={{ gap: 10 }}
            >
              <svg
                aria-hidden="true"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-white transition-colors duration-200 ease-out group-hover:text-[#CA2125]"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span
                className="font-[family-name:var(--font-body)] text-white transition-colors duration-200 ease-out group-hover:text-[#CA2125]"
                style={{ fontSize: 14 }}
              >
                X
              </span>
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61572109297818"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center no-underline group"
              style={{ gap: 10 }}
            >
              <svg
                aria-hidden="true"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-white transition-colors duration-200 ease-out group-hover:text-[#CA2125]"
              >
                <path d="M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 5.99 4.388 10.954 10.125 11.854V15.47H7.078V12h3.047V9.356c0-3.007 1.792-4.668 4.533-4.668 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.875V12h3.328l-.532 3.47h-2.796v8.385C19.612 22.954 24 17.99 24 12z" />
              </svg>
              <span
                className="font-[family-name:var(--font-body)] text-white transition-colors duration-200 ease-out group-hover:text-[#CA2125]"
                style={{ fontSize: 14 }}
              >
                Facebook
              </span>
            </a>
            <a
              href="https://www.linkedin.com/company/bigmachinerecords/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center no-underline group"
              style={{ gap: 10 }}
            >
              <svg
                aria-hidden="true"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-white transition-colors duration-200 ease-out group-hover:text-[#CA2125]"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span
                className="font-[family-name:var(--font-body)] text-white transition-colors duration-200 ease-out group-hover:text-[#CA2125]"
                style={{ fontSize: 14 }}
              >
                LinkedIn
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Logos */}
      <div
        className="flex items-center justify-center gap-10 md:gap-16 px-8 py-10 md:px-20"
        style={{ borderTop: "1px solid #111111" }}
      >
        <Image
          src="/logos/big-machine-records-nav-logo-new.png"
          alt="Big Machine Records"
          width={120}
          height={60}
          className="object-contain"
        />
        <Image
          src="/logos/NashvilleHarbour_Logo.png"
          alt="Nashville Harbour Records"
          width={120}
          height={60}
          className="object-contain"
        />
        <Image
          src="/logos/BEG_Logo.png"
          alt="Borchetta Entertainment Group"
          width={120}
          height={60}
          className="object-contain"
        />
      </div>

      {/* Bottom bar */}
      <div
        className="flex flex-col items-center gap-4 md:flex-row md:justify-between md:items-center px-8 py-5 md:px-20 md:py-6"
        style={{ borderTop: "1px solid #111111" }}
      >
        <span
          className="font-[family-name:var(--font-body)]"
          style={{ fontSize: 13, color: "#717171" }}
        >
          &copy; Borchetta Entertainment Group, LLC d/b/a Big Machine Records.
        </span>
        <div className="flex items-center gap-6">
          <Link
            href="/privacy"
            className="font-[family-name:var(--font-body)] no-underline transition-opacity duration-200 ease-out hover:opacity-60"
            style={{ fontSize: 13, color: "#717171" }}
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="font-[family-name:var(--font-body)] no-underline transition-opacity duration-200 ease-out hover:opacity-60"
            style={{ fontSize: 13, color: "#717171" }}
          >
            Terms
          </Link>
          <Link
            href="/privacy#cookies"
            className="font-[family-name:var(--font-body)] no-underline transition-opacity duration-200 ease-out hover:opacity-60"
            style={{ fontSize: 13, color: "#717171" }}
          >
            Cookies
          </Link>
          <Link
            href="/privacy#10.2"
            className="font-[family-name:var(--font-body)] no-underline transition-opacity duration-200 ease-out hover:opacity-60"
            style={{ fontSize: 13, color: "#717171" }}
          >
            Do Not Sell My Personal Information
          </Link>
        </div>
      </div>
    </footer>
  );
}
