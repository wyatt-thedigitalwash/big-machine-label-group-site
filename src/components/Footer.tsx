import Link from "next/link";
import { artists } from "@/lib/data/artists";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "News", href: "/news" },
  { label: "Videos", href: "/videos" },
  { label: "Sync", href: "/sync" },
  { label: "Contact", href: "/contact" },
  { label: "Careers", href: "/careers" },
  { label: "Terms & Conditions", href: "/terms" },
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
              fontSize: 11,
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
              fontSize: 11,
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
              fontSize: 11,
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
              href="https://www.instagram.com/bigmachinerecords/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center no-underline group"
              style={{ gap: 10 }}
            >
              <svg
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
              href="https://open.spotify.com/artist/bigmachinerecords"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center no-underline group"
              style={{ gap: 10 }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-white transition-colors duration-200 ease-out group-hover:text-[#CA2125]"
              >
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.482 17.308a.75.75 0 01-1.03.257c-2.82-1.724-6.37-2.114-10.553-1.158a.75.75 0 11-.334-1.462c4.572-1.045 8.496-.595 11.66 1.333a.75.75 0 01.257 1.03zm1.463-3.26a.937.937 0 01-1.287.308c-3.228-1.984-8.148-2.56-11.964-1.4a.937.937 0 11-.544-1.793c4.36-1.325 9.778-.682 13.487 1.597a.937.937 0 01.308 1.288zm.126-3.397C15.612 8.39 9.072 8.18 5.285 9.33a1.125 1.125 0 11-.653-2.153c4.35-1.32 11.58-1.065 16.152 1.587a1.125 1.125 0 01-1.713 1.187z" />
              </svg>
              <span
                className="font-[family-name:var(--font-body)] text-white transition-colors duration-200 ease-out group-hover:text-[#CA2125]"
                style={{ fontSize: 14 }}
              >
                Spotify
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="flex flex-col items-center gap-2 md:flex-row md:justify-between md:items-center px-8 py-5 md:px-20 md:py-6"
        style={{ borderTop: "1px solid #111111" }}
      >
        <Link
          href="/"
          className="font-[family-name:var(--font-display)] text-white no-underline uppercase"
          style={{ fontSize: 16, letterSpacing: "0.15em" }}
        >
          Big Machine Records
        </Link>
        <span
          className="font-[family-name:var(--font-body)]"
          style={{ fontSize: 12, color: "#717171" }}
        >
          &copy; 2025 Big Machine Records. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
