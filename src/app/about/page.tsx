import Link from "next/link";
import type { Metadata } from "next";
import AboutHero from "@/components/AboutHero";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "About",
  description:
    "Big Machine Records is an independent Nashville label founded in 2005. Home to some of the most enduring artists in American music.",
  openGraph: {
    title: "About | Big Machine Records",
    description:
      "Big Machine Records is an independent Nashville label founded in 2005. Home to some of the most enduring artists in American music.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />

      {/* LABEL STORY */}
      <section id="our-story" className="w-full bg-black px-8 py-16 md:py-[120px] md:px-20">
        <SectionHeader title="Our Story" />

        <div
          className="font-[family-name:var(--font-body)] text-[16px] space-y-6"
          style={{ color: "#C8C7C8", lineHeight: 1.8 }}
        >
          <p>
            Big Machine Records was founded in Nashville, Tennessee in 2005 by
            Scott Borchetta with a single conviction: that the right artist,
            given the right support, could change the culture. What started as
            an independent label built on instinct and belief became one of the
            most significant forces in American music.
          </p>
          <p>
            From the beginning, Big Machine operated differently. While major
            labels chased trends, Big Machine chased truth -- signing artists
            whose voices had something real to say and giving them the room to
            say it. The results spoke for themselves. Chart-topping records.
            Grammy nominations. Sold-out arenas. Artists who didn't just have
            hits, but careers.
          </p>
          <p>
            Over two decades, the roster has grown to include some of the most
            enduring names in country, rock, and Americana. Artists who have
            sold hundreds of millions of records worldwide. Artists who have
            headlined the biggest stages on earth. Artists who are just getting
            started.
          </p>
          <p>
            The label has never lost sight of what it was built on.
            Independence means making decisions for the right reasons.
            Uncompromising means never letting commerce outrun conviction.
            Nashville means understanding that great music comes from a place
            -- a culture, a community, a way of seeing the world.
          </p>
          <p>
            Big Machine Records is not just a label. It is a belief system. And
            it is just getting started.
          </p>
        </div>

      </section>

      {/* ROSTER TEASER */}
      <section className="w-full bg-black px-8 py-20 md:px-20">
        <SectionHeader title="The Roster" />

        <h2 className="font-[family-name:var(--font-display)] text-[48px] uppercase text-white leading-none">
          12 Artists. One Label.
        </h2>

        <p
          className="font-[family-name:var(--font-body)] text-[16px] mt-4"
          style={{ color: "#C8C7C8" }}
        >
          Meet the artists who call Big Machine home.
        </p>

        <Link
          href="/artists"
          className="inline-block font-[family-name:var(--font-body)] text-[14px] text-white mt-6 no-underline transition-colors duration-300 ease-out hover:text-[#CA2125] hover:underline"
        >
          View All Artists
        </Link>
      </section>
    </>
  );
}
