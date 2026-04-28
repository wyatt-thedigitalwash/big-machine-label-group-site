import Link from "next/link";
import Image from "next/image";
import SectionHeader from "@/components/SectionHeader";

const articles = [
  {
    headline: "Riley Green Announces Fall Tour Dates",
    date: "October 2025",
    image: "/images/news/big-machine-riley-green-news.webp",
  },
  {
    headline: "Motley Crue Returns to the Stage",
    date: "September 2025",
    image: "/images/news/big-machine-motley-crue-news.webp",
  },
  {
    headline: "Big Machine Signs Savana Santos",
    date: "August 2025",
    image: "/images/news/big-machine-savana-santos-news.webp",
  },
];

export default function NewsTeaserSection() {
  return (
    <section className="w-full bg-black px-6 py-20 md:px-10 md:py-20">
      <SectionHeader title="Latest News" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {articles.map((article) => (
          <Link
            key={article.headline}
            href="/news"
            className="group block no-underline"
          >
            <div
              className="relative w-full overflow-hidden"
              style={{ height: 240, backgroundColor: "#111111" }}
            >
              <Image
                src={article.image}
                alt={article.headline}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>

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
  );
}
