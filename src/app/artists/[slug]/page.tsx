import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { artists } from "@/lib/data/artists";
import ArtistStreamingSocial from "@/components/ArtistStreamingSocial";
import ArtistTourDates from "@/components/ArtistTourDates";
import SectionHeader from "@/components/SectionHeader";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return artists.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const artist = artists.find((a) => a.slug === slug);
  if (!artist) return {};
  return {
    title: artist.name,
    description: artist.pressQuote,
  };
}

export default async function ArtistPage({ params }: PageProps) {
  const { slug } = await params;
  const artist = artists.find((a) => a.slug === slug);
  if (!artist) notFound();

  const showVideo = !artist.youtubeVideoId.startsWith("PLACEHOLDER");

  const placeholderNews = [
    {
      headline: `${artist.name} Headline Placeholder One`,
      date: "October 2025",
    },
    {
      headline: `${artist.name} Headline Placeholder Two`,
      date: "September 2025",
    },
    {
      headline: `${artist.name} Headline Placeholder Three`,
      date: "August 2025",
    },
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative flex items-end h-screen w-full bg-black">
        {/* Mobile: roster/grid image */}
        {artist.rosterImage && (
          <Image
            src={artist.rosterImage}
            alt={artist.name}
            fill
            className="object-cover md:hidden"
            style={{ objectPosition: "center top" }}
            sizes="100vw"
            priority
          />
        )}
        {/* Desktop: hero image */}
        {artist.heroImage ? (
          <Image
            src={artist.heroImage}
            alt={artist.name}
            fill
            className={`object-cover ${artist.rosterImage ? "hidden md:block" : ""}`}
            style={{ objectPosition: "center top" }}
            sizes="100vw"
            priority
          />
        ) : !artist.rosterImage ? (
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, #111111, #000000)",
            }}
          />
        ) : null}
        <div
          className="absolute inset-x-0 bottom-0 z-10 pointer-events-none"
          style={{
            height: "40%",
            background:
              "linear-gradient(to bottom, transparent, rgba(0,0,0,0.8))",
          }}
        />
        <div className="relative z-20 p-6 pb-12 md:p-12 md:pb-16">
          <h1 className="font-[family-name:var(--font-display)] text-[80px] md:text-[180px] uppercase text-white leading-[0.85]">
            {artist.name}
          </h1>
          <p
            className="font-[family-name:var(--font-body)] text-[14px] uppercase mt-3"
            style={{ letterSpacing: "0.15em", color: "#717171" }}
          >
            {artist.genre}
          </p>
        </div>
      </section>

      {/* STREAMING + SOCIAL */}
      <ArtistStreamingSocial artist={artist} />

      {/* BIO */}
      <section className="w-full bg-black px-6 py-12 md:px-10 md:py-20" style={{ borderTop: "1px solid #1a1a1a" }}>
        <SectionHeader title="About" />
        <p
          className="font-[family-name:var(--font-body)] text-[18px]"
          style={{ color: "#C8C7C8", lineHeight: 1.8 }}
        >
          {artist.bio || `Placeholder bio for ${artist.name}. Client to provide.`}
        </p>
      </section>

      {/* MUSIC VIDEO */}
      {showVideo && (
        <section className="w-full bg-black px-6 py-12 md:px-10 md:py-20" style={{ borderTop: "1px solid #1a1a1a" }}>
          <SectionHeader title="Watch" />
          <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${artist.youtubeVideoId}`}
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
              title={`${artist.name} music video`}
              loading="lazy"
            />
          </div>
        </section>
      )}

      {/* TOUR DATES */}
      <ArtistTourDates bandsintownId={artist.bandsintownId} nextShow={artist.nextShow} />

      {/* PRESS QUOTE */}
      <section className="w-full bg-black px-6 py-12 md:px-10 md:py-20" style={{ borderTop: "1px solid #1a1a1a" }}>
        <SectionHeader title="Press" />
        <div className="max-w-[700px] mx-auto text-center">
          <span
            className="block font-[family-name:var(--font-display)] text-[120px] leading-none select-none"
            style={{ color: "#CA2125", marginBottom: -40 }}
            aria-hidden="true"
          >
            &ldquo;
          </span>
          <p
            className="font-[family-name:var(--font-body)] text-[20px] md:text-[28px] italic"
            style={{ color: "#F2EDE8", lineHeight: 1.5 }}
          >
            {artist.pressQuote}
          </p>
          <span
            className="block font-[family-name:var(--font-body)] text-[13px] uppercase mt-6"
            style={{ letterSpacing: "0.15em", color: "#717171" }}
          >
            -- {artist.pressQuoteSource}
          </span>
        </div>
      </section>

      {/* RELATED NEWS */}
      <section className="w-full bg-black px-6 py-12 md:px-10 md:py-20" style={{ borderTop: "1px solid #1a1a1a" }}>
        <SectionHeader title="News" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {placeholderNews.map((article) => (
            <Link
              key={article.headline}
              href="/news"
              className="group block no-underline"
            >
              <div
                className="w-full"
                style={{ height: 240, backgroundColor: "#1a1a1a" }}
              />
              <p
                className="font-[family-name:var(--font-body)] text-[12px] mt-4"
                style={{ color: "#717171" }}
              >
                {article.date}
              </p>
              <h3
                className="font-[family-name:var(--font-display)] text-[28px] uppercase text-white mt-2 transition-colors duration-300 ease-out group-hover:text-[#CA2125]"
                style={{ lineHeight: 1.1 }}
              >
                {article.headline}
              </h3>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
