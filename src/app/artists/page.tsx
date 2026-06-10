import Link from "next/link";
import Image from "next/image";
import { artists } from "@/lib/data/artists";
import type { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Artists",
  description:
    "The Big Machine Records roster. Riley Green, The Band Perry, Rascal Flatts, Aaron Lewis, Mackenzie Carpenter, and more.",
  openGraph: {
    title: "Artists | Big Machine Records",
    description:
      "The Big Machine Records roster. Riley Green, The Band Perry, Rascal Flatts, Aaron Lewis, Mackenzie Carpenter, and more.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function ArtistsPage() {
  return (
    <section
      className="w-full min-h-screen pt-[100px] md:pt-[120px]"
      style={{ backgroundColor: "#000000" }}
    >
      <div className="px-8 md:px-20">
        <SectionHeader title="The Roster" as="h1" />
      </div>

      <div className="px-8 pb-20 md:px-20 md:pb-24">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-14">
        {artists.map((artist) => (
          <Link
            key={artist.slug}
            href={`/artists/${artist.slug}`}
            className="group block no-underline"
          >
            <div
              className="relative overflow-hidden w-full"
              style={{ aspectRatio: "3/4" }}
            >
              <Image
                src={artist.rosterImage || artist.heroImage}
                alt={artist.name}
                fill
                className="object-cover object-top transition-transform duration-[600ms] ease-out group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-[48px] uppercase text-white mt-4 leading-none transition-colors duration-300 ease-out group-hover:text-[#CA2125]">
              {artist.name}
            </h2>
            <p
              className="font-[family-name:var(--font-body)] text-[13px] uppercase mt-1"
              style={{ letterSpacing: "0.1em", color: "#717171" }}
            >
              {artist.genre}
            </p>
          </Link>
        ))}
      </div>
      </div>
    </section>
  );
}
