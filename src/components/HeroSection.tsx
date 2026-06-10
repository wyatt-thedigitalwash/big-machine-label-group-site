import Image from "next/image";
import Link from "next/link";

const desktopLinks = [
  { label: "ROSTER", href: "/artists" },
  { label: "ABOUT", href: "/about" },
  { label: "NEWS", href: "/news" },
  { label: "VIDEOS", href: "/videos" },
  { label: "SYNC", href: "/sync" },
  { label: "CONTACT", href: "/contact" },
  { label: "CAREERS", href: "/careers" },
];

const mobileRow1 = [
  { label: "ROSTER", href: "/artists" },
  { label: "NEWS", href: "/news" },
  { label: "VIDEOS", href: "/videos" },
];

const mobileRow2 = [
  { label: "ABOUT", href: "/about" },
  { label: "SYNC", href: "/sync" },
  { label: "CONTACT", href: "/contact" },
  { label: "CAREERS", href: "/careers" },
];

export default function HeroSection() {
  return (
    <section
      className="relative w-full overflow-hidden flex flex-col items-center justify-center"
      style={{ height: "100svh", backgroundColor: "#000000" }}
    >
      {/* Logo */}
      <Image
        src="/logos/big-machine-records-logo.png"
        alt="Big Machine Records"
        width={560}
        height={280}
        className="w-[85vw] md:w-[min(800px,65vw)] h-auto object-contain"
        style={{
          animation: "heroLogoFade 700ms ease-out both",
        }}
        priority
      />

      {/* Desktop nav */}
      <nav
        className="hero-nav absolute left-1/2 hidden md:flex"
        style={{
          bottom: 48,
          transform: "translateX(-50%)",
        }}
      >
        {desktopLinks.map((link, i) => (
          <Link
            key={link.href}
            href={link.href}
            className="font-[family-name:var(--font-display)] uppercase text-white no-underline whitespace-nowrap transition-colors duration-250 ease-out hover:text-[#CA2125]"
            style={{
              letterSpacing: "0.15em",
              animation: `heroNavFade 400ms ease-out ${800 + i * 60}ms both`,
            }}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Mobile nav */}
      <div
        className="absolute left-1/2 flex flex-col items-center md:hidden"
        style={{
          bottom: 32,
          transform: "translateX(-50%)",
          gap: 16,
        }}
      >
        <div className="flex items-center justify-center" style={{ gap: 20 }}>
          {mobileRow1.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-[family-name:var(--font-display)] uppercase text-white no-underline whitespace-nowrap transition-colors duration-250 ease-out hover:text-[#CA2125]"
              style={{
                fontSize: 22,
                letterSpacing: "0.15em",
                animation: `heroNavFade 400ms ease-out ${800 + i * 60}ms both`,
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center justify-center" style={{ gap: 20 }}>
          {mobileRow2.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-[family-name:var(--font-display)] uppercase text-white no-underline whitespace-nowrap transition-colors duration-250 ease-out hover:text-[#CA2125]"
              style={{
                fontSize: 22,
                letterSpacing: "0.15em",
                animation: `heroNavFade 400ms ease-out ${1040 + i * 60}ms both`,
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
