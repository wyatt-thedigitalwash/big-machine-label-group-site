import Link from "next/link";
import Image from "next/image";
import { artists } from "@/lib/data/artists";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Artists",
  description:
    "The Big Machine Records roster. Riley Green, Rascal Flatts, Aaron Lewis, Motley Crue, and more.",
};

export default function ArtistsPage() {
  return (
    <section className="w-full bg-black px-8 pt-32 pb-20 md:px-20 md:pt-40 md:pb-24">
      <div className="mb-16">
        <span
          className="block font-[family-name:var(--font-body)] text-[13px] uppercase mb-4"
          style={{ letterSpacing: "0.2em", color: "#CA2125" }}
        >
          Artists
        </span>
        <h1 className="font-[family-name:var(--font-display)] text-[56px] md:text-[120px] uppercase text-white leading-[1]">
          The Roster.
        </h1>
      </div>

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
              className="font-[family-name:var(--font-body)] text-[12px] uppercase mt-1"
              style={{ letterSpacing: "0.1em", color: "#717171" }}
            >
              {artist.genre}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
