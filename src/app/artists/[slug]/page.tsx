import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { artists } from "@/lib/data/artists";
import { articles as allArticles } from "@/lib/data/news";
import ArtistStreamingSocial from "@/components/ArtistStreamingSocial";
import ArtistTourDates from "@/components/ArtistTourDates";
import ArtistWatchSection from "@/components/ArtistWatchSection";
import ArticleRow from "@/components/ArticleRow";
import SectionHeader from "@/components/SectionHeader";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

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
    description: artist.pressQuote || `${artist.name} on Big Machine Records. ${artist.genre} artist from Nashville.`,
    openGraph: {
      title: `${artist.name} | Big Machine Records`,
      description: artist.pressQuote || `${artist.name} on Big Machine Records.`,
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
  };
}

export default async function ArtistPage({ params }: PageProps) {
  const { slug } = await params;
  const artist = artists.find((a) => a.slug === slug);
  if (!artist) notFound();

  const newsForArtist = allArticles.filter((a) => a.artist === artist.name);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Artists", href: "/artists" },
          { name: artist.name, href: `/artists/${artist.slug}` },
        ]}
      />
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
      <section className="w-full bg-black px-8 py-12 md:px-20 md:py-20">
        <SectionHeader title="About" />
        <p
          className="font-[family-name:var(--font-body)] text-[16px]"
          style={{ color: "#C8C7C8", lineHeight: 1.8 }}
        >
          {artist.bio || `Placeholder bio for ${artist.name}. Client to provide.`}
        </p>
      </section>

      {/* WATCH */}
      <ArtistWatchSection videos={artist.videos} />

      {/* TOUR DATES */}
      <div id="tour">
        <Suspense fallback={null}>
          <ArtistTourDates artist={artist} />
        </Suspense>
      </div>

      {/* RELATED NEWS */}
      {newsForArtist.length > 0 && (
        <section className="w-full bg-black py-12 md:py-20">
          <div className="px-8 md:px-20">
            <SectionHeader title="News" />
          </div>
          <div>
            {newsForArtist.map((article) => (
              <ArticleRow key={article.slug} article={article} />
            ))}
            <div style={{ borderTop: "1px solid #111111" }} />
          </div>
        </section>
      )}
    </>
  );
}
