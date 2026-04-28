import type { Metadata } from "next";
import SyncForm from "@/components/SyncForm";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Sync & Licensing",
  description:
    "Submit sync and licensing inquiries for the Big Machine Records catalog. Music for film, television, advertising, and beyond.",
};

export default function SyncPage() {
  return (
    <div style={{ backgroundColor: "#0D0D0D" }}>
      {/* HERO */}
      <section
        className="flex items-center justify-center h-screen pt-[120px]"
        style={{ backgroundColor: "#0D0D0D" }}
      >
        <div className="flex flex-col items-center text-center px-6">
          <span
            className="font-[family-name:var(--font-body)] text-[13px] uppercase mb-4"
            style={{ letterSpacing: "0.2em", color: "#CA2125" }}
          >
            Sync &amp; Licensing
          </span>

          <h1 className="font-[family-name:var(--font-display)] text-[64px] md:text-[140px] uppercase text-white leading-[1]">
            The Catalog.
          </h1>

          <p
            className="font-[family-name:var(--font-body)] text-[16px] mt-6"
            style={{ color: "#717171" }}
          >
            Music for film, television, advertising, and beyond.
          </p>
        </div>
      </section>

      {/* CATALOG INTRO */}
      <section
        className="w-full px-6 py-20 md:px-10"
        style={{ backgroundColor: "#0D0D0D" }}
      >
        <div className="max-w-[720px] mx-auto text-center">
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
        </div>
      </section>

      {/* INQUIRY FORM */}
      <section
        className="w-full px-6 py-20 md:px-10"
        style={{ backgroundColor: "#0D0D0D" }}
      >
        <div className="max-w-[600px] mx-auto">
          <SectionHeader title="Submit an Inquiry" />

          <SyncForm />
        </div>
      </section>
    </div>
  );
}
