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
    <section className="w-full bg-black px-6 pt-32 pb-20 md:px-10 md:pt-40 md:pb-24">
      <div className="mb-16">
        <span
          className="block font-[family-name:var(--font-body)] text-[12px] uppercase mb-4"
          style={{ letterSpacing: "0.2em", color: "#CA2125" }}
        >
          The Roster
        </span>
        <div
          className="h-px"
          style={{ width: 80, backgroundColor: "#CA2125" }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-0.5 gap-y-14">
        {artists.map((artist, i) => {
          const isEven = i % 2 === 1;
          const aspectRatio = isEven ? "4/5" : "3/4";
          return (
            <Link
              key={artist.slug}
              href={`/artists/${artist.slug}`}
              className="group block no-underline"
            >
              <div
                className="relative overflow-hidden w-full"
                style={{ aspectRatio }}
              >
                {artist.rosterImage ? (
                  <Image
                    src={artist.rosterImage}
                    alt={artist.name}
                    fill
                    className="object-cover object-top transition-transform duration-[600ms] ease-out group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div
                    className="absolute inset-0 transition-transform duration-[600ms] ease-out group-hover:scale-[1.03]"
                    style={{ backgroundColor: "#1a1a1a" }}
                  />
                )}
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
          );
        })}
      </div>
    </section>
  );
}
