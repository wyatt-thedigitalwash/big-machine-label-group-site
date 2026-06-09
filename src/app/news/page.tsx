"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import { articles } from "@/lib/data/news";

export default function NewsPage() {
  const rowRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );

    rowRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="w-full min-h-screen pt-[100px] md:pt-[120px]"
      style={{ backgroundColor: "#000000" }}
    >
      <div className="px-8 md:px-20">
        <SectionHeader title="News" />
      </div>

      <div>
        {articles.map((article, i) => (
          <Link
            key={article.slug}
            ref={(el) => { rowRefs.current[i] = el; }}
            href={`/news/${article.slug}`}
            className="group block no-underline cursor-pointer transition-colors duration-200 ease-out hover:bg-[#0D0D0D] px-8 md:px-20"
            style={{
              borderTop: "1px solid #111111",
              paddingTop: 24,
              paddingBottom: 24,
              opacity: 0,
              transform: "translateY(12px)",
              transition:
                "opacity 500ms ease-out, transform 500ms ease-out, background-color 200ms ease-out",
              transitionDelay: `${i * 60}ms`,
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-[160px_1fr_200px] md:gap-8">
              {/* Left column */}
              <div className="mb-2 md:mb-0 md:pt-1">
                <span
                  className="block font-[family-name:var(--font-body)]"
                  style={{ fontSize: 12, color: "#717171", marginBottom: 8 }}
                >
                  {article.date}
                </span>
                <span
                  className="block font-[family-name:var(--font-body)] uppercase"
                  style={{
                    fontSize: 12,
                    color: "#CA2125",
                    letterSpacing: "0.2em",
                  }}
                >
                  {article.category}
                </span>
              </div>

              {/* Center column */}
              <div>
                <h2
                  className="font-[family-name:var(--font-display)] text-white uppercase transition-colors duration-200 ease-out group-hover:text-[#CA2125]"
                  style={{
                    fontSize: 40,
                    lineHeight: 1.05,
                    marginBottom: 10,
                  }}
                >
                  {article.headline}
                </h2>
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
                {article.artist && (
                  <span
                    className="font-[family-name:var(--font-body)] uppercase"
                    style={{
                      fontSize: 12,
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
        ))}
        {/* Bottom border */}
        <div style={{ borderTop: "1px solid #111111" }} />
      </div>
    </section>
  );
}
