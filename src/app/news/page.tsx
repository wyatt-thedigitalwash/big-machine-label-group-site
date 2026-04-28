import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "News",
  description:
    "The latest news, releases, and announcements from Big Machine Records and its artists.",
};

const articles = [
  {
    slug: "riley-green-fall-tour",
    headline: "Riley Green Announces Headlining Fall Tour",
    date: "April 2025",
    category: "Tour",
    excerpt:
      "Multi-platinum singer-songwriter Riley Green is hitting the road this fall with a headlining run across North America.",
    image: "/images/news/big-machine-riley-green-news.webp",
  },
  {
    slug: "motley-crue-las-vegas",
    headline: "Motley Crue Returns to Las Vegas for Exclusive Residency",
    date: "March 2025",
    category: "News",
    excerpt:
      "The legendary rock band brings their catalog to life with a limited run of shows at Dolby Live at Park MGM.",
    image: "/images/news/big-machine-motley-crue-news.webp",
  },
  {
    slug: "caroline-jones-good-omen",
    headline: "Caroline Jones Releases New Album Good Omen",
    date: "February 2025",
    category: "Release",
    excerpt:
      "The singer-songwriter and Zac Brown Band member delivers her most personal record to date on Nashville Harbor Records.",
    image: "/images/news/big-machine-savana-santos-news.webp",
  },
];

export default function NewsPage() {
  return (
    <section className="w-full bg-black px-6 pt-32 pb-12 md:px-10 md:pt-[120px] md:pb-20">
      <SectionHeader title="News" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-12">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/news/${article.slug}`}
            className="group block no-underline"
          >
            <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9", backgroundColor: "#1a1a1a" }}>
              <Image
                src={article.image}
                alt={article.headline}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <span
              className="block font-[family-name:var(--font-body)] text-[11px] uppercase mt-5"
              style={{ letterSpacing: "0.2em", color: "#CA2125" }}
            >
              {article.category}
            </span>

            <p
              className="font-[family-name:var(--font-body)] text-[12px] mt-1"
              style={{ color: "#717171" }}
            >
              {article.date}
            </p>

            <h2
              className="font-[family-name:var(--font-display)] text-[36px] uppercase text-white mt-2 transition-colors duration-300 ease-out group-hover:text-[#CA2125]"
              style={{ lineHeight: 1.1 }}
            >
              {article.headline}
            </h2>

            <p
              className="font-[family-name:var(--font-body)] text-[15px] mt-3"
              style={{ color: "#C8C7C8", lineHeight: 1.6 }}
            >
              {article.excerpt}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
