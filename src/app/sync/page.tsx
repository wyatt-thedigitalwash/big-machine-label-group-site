import type { Metadata } from "next";
import SyncForm from "@/components/SyncForm";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Sync & Licensing",
  description:
    "License music from the Big Machine Records catalog for film, television, advertising, and gaming. Submit sync inquiries.",
  openGraph: {
    title: "Sync & Licensing | Big Machine Records",
    description:
      "License music from the Big Machine Records catalog for film, television, advertising, and gaming. Submit sync inquiries.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

const syncCategories = [
  {
    title: "Film & Television",
    description:
      "Place chart-topping country, rock, and Americana recordings in your next project. Our catalog includes hits that audiences already know and emerging tracks that set the tone.",
  },
  {
    title: "Advertising & Brand",
    description:
      "Songs that carry cultural weight and immediate recognition. License music that connects with your audience and elevates your brand story.",
  },
  {
    title: "Gaming & Digital",
    description:
      "A deep library of recordings built for interactive and digital-first experiences. From high-energy anthems to atmospheric instrumentals.",
  },
];

export default function SyncPage() {
  return (
    <div style={{ backgroundColor: "#000000" }}>
      {/* TWO-COLUMN: INFO + FORM */}
      <section
        className="w-full grid grid-cols-1 md:grid-cols-2 items-start px-8 pt-[100px] pb-20 md:px-20 md:pt-[120px] md:pb-20"
        style={{
          backgroundColor: "#000000",
          columnGap: 80,
        }}
      >
        {/* LEFT — Catalog Info */}
        <div>
          <SectionHeader title="The Music" />

          <p
            className="font-[family-name:var(--font-body)] text-[16px]"
            style={{ color: "#C8C7C8", lineHeight: 1.8 }}
          >
            Big Machine Records and its affiliated labels represent one of
            the most recognized catalogs in American music. With over two
            decades of chart-topping recordings spanning country, rock, and
            Americana, our library offers songs that audiences already know
            and love alongside a growing roster of new voices. We work with
            music supervisors, agencies, and brands to find the right
            placement for every project.
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
                <h3 className="font-[family-name:var(--font-display)] text-[28px] md:text-[36px] uppercase text-white leading-none mb-2">
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
        <div className="mt-12 md:mt-0">
          <SectionHeader title="Submit an Inquiry" />
          <SyncForm />
        </div>
      </section>
    </div>
  );
}
