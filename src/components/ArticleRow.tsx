import Link from "next/link";
import type { Article } from "@/lib/data/news";

interface ArticleRowProps {
  article: Article;
  showArtist?: boolean;
}

export default function ArticleRow({ article, showArtist = false }: ArticleRowProps) {
  return (
    <Link
      href={`/news/${article.slug}`}
      className="group block no-underline cursor-pointer transition-colors duration-200 ease-out hover:bg-[#0D0D0D] px-8 md:px-20"
      style={{
        borderTop: "1px solid #111111",
        paddingTop: 24,
        paddingBottom: 24,
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-[160px_1fr_200px] md:gap-8">
        {/* Left column */}
        <div className="mb-2 md:mb-0 md:pt-1">
          <span
            className="block font-[family-name:var(--font-body)]"
            style={{ fontSize: 13, color: "#717171", marginBottom: 8 }}
          >
            {article.date}
          </span>
          <span
            className="block font-[family-name:var(--font-body)] uppercase"
            style={{
              fontSize: 13,
              color: "#CA2125",
              letterSpacing: "0.2em",
            }}
          >
            {article.category}
          </span>
        </div>

        {/* Center column */}
        <div>
          <h3
            className="font-[family-name:var(--font-display)] text-white uppercase transition-colors duration-200 ease-out group-hover:text-[#CA2125]"
            style={{
              fontSize: 28,
              lineHeight: 1.05,
              marginBottom: 10,
            }}
          >
            {article.headline}
          </h3>
          <p
            className="font-[family-name:var(--font-body)]"
            style={{
              fontSize: 15,
              color: "#C8C7C8",
              lineHeight: 1.6,
              maxWidth: 680,
            }}
          >
            {article.excerpt}
          </p>
        </div>

        {/* Right column -- desktop only */}
        <div className="hidden md:flex flex-col items-end justify-center">
          {showArtist && article.artist && (
            <span
              className="font-[family-name:var(--font-body)] uppercase"
              style={{
                fontSize: 13,
                color: "#717171",
                letterSpacing: "0.15em",
                marginBottom: 8,
              }}
            >
              {article.artist}
            </span>
          )}
          <span
            className="font-[family-name:var(--font-body)] uppercase text-white transition-colors duration-200 ease-out group-hover:text-[#CA2125]"
            style={{
              fontSize: 13,
              letterSpacing: "0.15em",
            }}
          >
            Read &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
}
