import Link from "next/link";
import type { Metadata } from "next";
import AboutHero from "@/components/AboutHero";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "About",
  description:
    "Big Machine Records is an independent Nashville label founded in 2005. Home to some of the most enduring artists in American music.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />

      {/* LABEL STORY */}
      <section className="w-full bg-black px-6 py-16 md:py-[120px] md:pl-[10%] md:pr-10">
        <div className="max-w-[720px]">
          <SectionHeader title="Our Story" />

          <p
            className="font-[family-name:var(--font-body)] text-[18px]"
            style={{ color: "#C8C7C8", lineHeight: 1.8 }}
          >
            Big Machine Records was founded in Nashville, Tennessee in 2005 by
            Scott Borchetta. What started as an independent label built on
            instinct and belief in artists became one of the most significant
            forces in American music. Placeholder copy -- client to provide full
            label history.
          </p>

          <h2
            className="font-[family-name:var(--font-display)] text-[40px] md:text-[72px] uppercase text-white mt-16 leading-[1.05] max-w-[700px]"
          >
            Independent. Uncompromising.
          </h2>
        </div>
      </section>

      {/* ROSTER TEASER */}
      <section className="w-full bg-black px-6 py-20 md:px-10">
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
