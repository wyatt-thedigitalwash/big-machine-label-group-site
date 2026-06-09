import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { articles } from "@/lib/data/news";
import { artists } from "@/lib/data/artists";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};
  return {
    title: `${article.headline} | Big Machine Records`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  const artistSlug = article.artist
    ? artists.find((a) => a.name === article.artist)?.slug
    : null;

  const pullQuoteSet = new Set(article.pullQuotes);

  return (
    <article
      className="min-h-screen pt-[100px] md:pt-[120px] pb-20"
      style={{ backgroundColor: "#000000" }}
    >
      <div
        className="mx-auto px-8 md:px-20"
        style={{ maxWidth: 860 }}
      >
        {/* Breadcrumb */}
        <div className="flex items-center gap-2" style={{ marginBottom: 32 }}>
          <Link
            href="/news"
            className="font-[family-name:var(--font-body)] no-underline transition-colors duration-200 ease-out hover:text-[#CA2125]"
            style={{ fontSize: 12, color: "#717171" }}
          >
            News
          </Link>
          <span
            className="font-[family-name:var(--font-body)]"
            style={{ fontSize: 12, color: "#333333" }}
          >
            /
          </span>
          <span
            className="font-[family-name:var(--font-body)] truncate"
            style={{ fontSize: 12, color: "#717171", maxWidth: "40ch" }}
          >
            {article.headline.length > 40
              ? article.headline.slice(0, 40) + "..."
              : article.headline}
          </span>
        </div>

        {/* Header */}
        <span
          className="block font-[family-name:var(--font-body)] uppercase"
          style={{
            fontSize: 12,
            color: "#CA2125",
            letterSpacing: "0.2em",
            marginBottom: 8,
          }}
        >
          {article.category}
        </span>
        <span
          className="block font-[family-name:var(--font-body)]"
          style={{ fontSize: 12, color: "#717171", marginBottom: 32 }}
        >
          {article.date}
        </span>
        <h1
          className="font-[family-name:var(--font-display)] text-white uppercase"
          style={{
            fontSize: "clamp(44px, 6vw, 80px)",
            lineHeight: 0.95,
            letterSpacing: "-0.01em",
            marginBottom: 24,
          }}
        >
          {article.headline}
        </h1>
        {article.artist && (
          <p
            className="font-[family-name:var(--font-body)] uppercase"
            style={{
              fontSize: 15,
              color: "#C8C7C8",
              letterSpacing: "0.15em",
              marginBottom: 48,
            }}
          >
            {article.artist}
          </p>
        )}
        <div
          className="w-full h-px"
          style={{ backgroundColor: "#222222", marginBottom: 48 }}
        />

        {/* Body */}
        {article.paragraphs.map((p, i) => {
          const trimmed = p.trim();
          const isQuote =
            trimmed.startsWith('"') &&
            trimmed.endsWith('"') &&
            pullQuoteSet.has(trimmed.slice(1, -1));

          if (isQuote) {
            return (
              <blockquote
                key={i}
                className="font-[family-name:var(--font-body)] italic"
                style={{
                  fontSize: "clamp(20px, 3vw, 26px)",
                  color: "#F2EDE8",
                  borderLeft: "3px solid #CA2125",
                  paddingLeft: 24,
                  margin: "48px 0",
                  lineHeight: 1.5,
                }}
              >
                {trimmed}
              </blockquote>
            );
          }

          // Check if entire paragraph is a pull quote (without wrapping quotes)
          if (pullQuoteSet.has(trimmed)) {
            return (
              <blockquote
                key={i}
                className="font-[family-name:var(--font-body)] italic"
                style={{
                  fontSize: "clamp(20px, 3vw, 26px)",
                  color: "#F2EDE8",
                  borderLeft: "3px solid #CA2125",
                  paddingLeft: 24,
                  margin: "48px 0",
                  lineHeight: 1.5,
                }}
              >
                &ldquo;{trimmed}&rdquo;
              </blockquote>
            );
          }

          return (
            <p
              key={i}
              className="font-[family-name:var(--font-body)]"
              style={{
                fontSize: 16,
                color: "#C8C7C8",
                lineHeight: 1.9,
                marginBottom: 24,
              }}
            >
              {p}
            </p>
          );
        })}

        {/* Press Quotes */}
        {article.pressQuotes.length > 0 && (
          <div style={{ marginTop: 64 }}>
            <div className="flex items-center gap-6 mb-8">
              <h2
                className="font-[family-name:var(--font-display)] text-[28px] md:text-[36px] uppercase text-white leading-none whitespace-nowrap"
              >
                Press
              </h2>
              <div className="flex-1 h-px" style={{ backgroundColor: "#222222" }} />
            </div>
            {article.pressQuotes.map((pq, i) => (
              <div key={i} style={{ marginBottom: 32 }}>
                <p
                  className="font-[family-name:var(--font-body)] italic"
                  style={{ fontSize: 16, color: "#C8C7C8", marginBottom: 8 }}
                >
                  &ldquo;{pq.quote}&rdquo;
                </p>
                <span
                  className="font-[family-name:var(--font-body)] uppercase"
                  style={{
                    fontSize: 12,
                    color: "#717171",
                    letterSpacing: "0.15em",
                  }}
                >
                  -- {pq.source}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Track List */}
        {article.trackList.length > 0 && (
          <div style={{ marginTop: 64 }}>
            <div className="flex items-center gap-6 mb-8">
              <h2
                className="font-[family-name:var(--font-display)] text-[28px] md:text-[36px] uppercase text-white leading-none whitespace-nowrap"
              >
                Track List
              </h2>
              <div className="flex-1 h-px" style={{ backgroundColor: "#222222" }} />
            </div>
            <ol className="list-none p-0 m-0">
              {article.trackList.map((track, i) => (
                <li
                  key={i}
                  className="font-[family-name:var(--font-body)] text-white flex items-baseline gap-3"
                  style={{ fontSize: 16, lineHeight: 2.2 }}
                >
                  <span
                    className="font-[family-name:var(--font-display)]"
                    style={{ fontSize: 16, color: "#CA2125" }}
                  >
                    {i + 1}
                  </span>
                  {track}
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Tour Dates */}
        {article.tourDates.length > 0 && (
          <div style={{ marginTop: 64 }}>
            <div className="flex items-center gap-6 mb-8">
              <h2
                className="font-[family-name:var(--font-display)] text-[28px] md:text-[36px] uppercase text-white leading-none whitespace-nowrap"
              >
                Tour Dates
              </h2>
              <div className="flex-1 h-px" style={{ backgroundColor: "#222222" }} />
            </div>
            <div>
              {article.tourDates.map((td, i) => (
                <div
                  key={i}
                  className="flex flex-col md:flex-row md:items-center py-3"
                  style={{
                    borderTop: "1px solid #1a1a1a",
                    borderBottom:
                      i === article.tourDates.length - 1
                        ? "1px solid #1a1a1a"
                        : undefined,
                  }}
                >
                  <span
                    className="font-[family-name:var(--font-body)]"
                    style={{ fontSize: 14, color: "#C8C7C8" }}
                  >
                    {td.date}
                  </span>
                  <span
                    className="hidden md:inline font-[family-name:var(--font-body)] mx-2"
                    style={{ fontSize: 14, color: "#717171" }}
                  >
                    &middot;
                  </span>
                  <span
                    className="font-[family-name:var(--font-body)]"
                    style={{ fontSize: 14, color: "#717171" }}
                  >
                    {td.venue}
                  </span>
                  <span
                    className="hidden md:inline font-[family-name:var(--font-body)] mx-2"
                    style={{ fontSize: 14, color: "#717171" }}
                  >
                    &middot;
                  </span>
                  <span
                    className="font-[family-name:var(--font-body)]"
                    style={{ fontSize: 14, color: "#717171" }}
                  >
                    {td.city}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer links */}
        <div
          className="w-full h-px"
          style={{ backgroundColor: "#222222", marginTop: 64, marginBottom: 40 }}
        />
        <div className="flex justify-between items-center">
          <Link
            href="/news"
            className="font-[family-name:var(--font-body)] uppercase text-white no-underline transition-colors duration-200 ease-out hover:text-[#CA2125]"
            style={{ fontSize: 13, letterSpacing: "0.15em" }}
          >
            &larr; Back to News
          </Link>
          {article.artist && artistSlug && (
            <Link
              href={`/artists/${artistSlug}`}
              className="font-[family-name:var(--font-body)] uppercase text-white no-underline transition-colors duration-200 ease-out hover:text-[#CA2125]"
              style={{ fontSize: 13, letterSpacing: "0.15em" }}
            >
              More from {article.artist} &rarr;
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
