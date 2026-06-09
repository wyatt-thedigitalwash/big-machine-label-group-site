import Link from "next/link";
import { artists } from "@/lib/data/artists";
import SectionHeader from "@/components/SectionHeader";
import OnTourAnimator from "@/components/OnTourAnimator";

export default function OnTourSection() {
  if (artists.length === 0) return null;

  return (
    <section className="w-full bg-black px-8 py-12 md:px-20 md:py-20">
      <SectionHeader title="On Tour" />

      <OnTourAnimator>
        {artists.map((artist, i) => (
          <div
            key={artist.slug}
            className="flex items-center justify-between py-5 transition-colors duration-200 ease-out hover:bg-[#0D0D0D]"
            style={{
              borderTop: "1px solid #1a1a1a",
              borderBottom:
                i === artists.length - 1 ? "1px solid #1a1a1a" : undefined,
            }}
            data-tour-animate
            data-tour-delay={String(i * 40)}
          >
            <Link
              href={`/artists/${artist.slug}`}
              className="font-[family-name:var(--font-display)] text-[28px] uppercase text-white leading-none no-underline transition-colors duration-300 ease-out hover:text-[#CA2125]"
            >
              {artist.name}
            </Link>

            <Link
              href={`/artists/${artist.slug}#tour`}
              className="font-[family-name:var(--font-body)] text-[13px] uppercase no-underline flex-shrink-0 transition-opacity duration-200 ease-out hover:opacity-70"
              style={{ letterSpacing: "0.1em", color: "#CA2125" }}
            >
              View Shows
            </Link>
          </div>
        ))}
      </OnTourAnimator>
    </section>
  );
}
