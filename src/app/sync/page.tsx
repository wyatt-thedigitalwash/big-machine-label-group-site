import type { Metadata } from "next";
import SyncForm from "@/components/SyncForm";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Sync & Licensing",
  description:
    "Submit sync and licensing inquiries for the Big Machine Records catalog. Music for film, television, advertising, and beyond.",
};

const syncCategories = [
  {
    title: "Film & Television",
    description:
      "From country anthems to rock classics, our catalog spans genre and generation.",
  },
  {
    title: "Advertising & Brand",
    description:
      "Iconic songs that carry cultural weight and immediate recognition.",
  },
  {
    title: "Gaming & Digital",
    description:
      "A growing library of music built for modern media and interactive experiences.",
  },
];

export default function SyncPage() {
  return (
    <div style={{ backgroundColor: "#0D0D0D" }}>
      {/* HERO */}
      <section
        className="w-full px-8 pt-[100px] pb-10 md:px-20 md:pt-[140px] md:pb-[60px]"
        style={{ backgroundColor: "#0D0D0D" }}
      >
        <span
          className="block font-[family-name:var(--font-body)] text-[13px] uppercase mb-4"
          style={{ letterSpacing: "0.2em", color: "#CA2125" }}
        >
          Sync &amp; Licensing
        </span>
        <h1 className="font-[family-name:var(--font-display)] text-[56px] md:text-[120px] uppercase text-white leading-[1]">
          The Catalog.
        </h1>
      </section>

      {/* TWO-COLUMN: INFO + FORM */}
      <section
        className="w-full grid grid-cols-1 md:grid-cols-2 items-start px-8 pb-20 md:px-20 md:pb-20"
        style={{
          backgroundColor: "#0D0D0D",
          columnGap: 80,
        }}
      >
        {/* LEFT — Catalog Info */}
        <div
          style={{
            borderTop: "1px solid #1a1a1a",
            paddingTop: 40,
          }}
        >
          <SectionHeader title="The Music" />

          <p
            className="font-[family-name:var(--font-body)] text-[17px]"
            style={{ color: "#C8C7C8", lineHeight: 1.8 }}
          >
            Big Machine Records represents one of the most storied catalogs in
            American music. From country radio staples to rock anthems, our
            roster spans genre and generation. Placeholder -- client to provide
            catalog description.
          </p>

          <div className="mt-8">
            {syncCategories.map((cat, i) => (
              <div
                key={cat.title}
                style={{
                  borderTop: "1px solid #1a1a1a",
                  borderBottom:
                    i === syncCategories.length - 1
                      ? "1px solid #1a1a1a"
                      : undefined,
                  padding: "32px 0",
                }}
              >
                <h3 className="font-[family-name:var(--font-display)] text-[36px] uppercase text-white leading-none mb-2">
                  {cat.title}
                </h3>
                <p
                  className="font-[family-name:var(--font-body)] text-[14px]"
                  style={{ color: "#717171" }}
                >
                  {cat.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Inquiry Form */}
        <div
          className="mt-12 md:mt-0"
          style={{
            borderTop: "1px solid #1a1a1a",
            paddingTop: 40,
          }}
        >
          <SectionHeader title="Submit an Inquiry" />
          <SyncForm />
        </div>
      </section>
    </div>
  );
}
