import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Big Machine Records. General inquiries, press, A&R submissions, and partnership opportunities.",
};

const categories = [
  {
    title: "General Inquiries",
    email: "info@bigmachinerecords.com",
  },
  {
    title: "Press & Media",
    email: "press@bigmachinerecords.com",
  },
  {
    title: "A&R Submissions",
    email: "ar@bigmachinerecords.com",
  },
];

export default function ContactPage() {
  return (
    <div style={{ backgroundColor: "#0D0D0D" }}>
      {/* HERO */}
      <section
        className="w-full px-6 md:px-10"
        style={{
          backgroundColor: "#0D0D0D",
          paddingTop: 120,
          paddingBottom: 40,
        }}
      >
        <div className="md:pt-10 md:pb-6" style={{ paddingBottom: 24 }}>
          <span
            className="block font-[family-name:var(--font-body)] text-[13px] uppercase mb-4"
            style={{ letterSpacing: "0.2em", color: "#CA2125" }}
          >
            Contact
          </span>
          <h1 className="font-[family-name:var(--font-display)] text-[56px] md:text-[120px] uppercase text-white leading-[1]">
            Get In Touch.
          </h1>
        </div>
      </section>

      {/* CONTACT CATEGORIES */}
      <section
        className="w-full px-6 md:px-10"
        style={{ backgroundColor: "#0D0D0D" }}
      >
        {categories.map((cat, i) => (
          <div
            key={cat.email}
            className="group flex flex-col md:flex-row md:items-center md:justify-between py-10"
            style={{
              borderTop: "1px solid #333333",
              borderBottom:
                i === categories.length - 1 ? "1px solid #333333" : undefined,
            }}
          >
            <h2 className="font-[family-name:var(--font-display)] text-[36px] uppercase text-white leading-none transition-colors duration-300 ease-out group-hover:text-[#CA2125]">
              {cat.title}
            </h2>
            <a
              href={`mailto:${cat.email}`}
              className="font-[family-name:var(--font-body)] text-[15px] no-underline mt-2 md:mt-0"
              style={{ color: "#C8C7C8" }}
            >
              {cat.email}
            </a>
          </div>
        ))}
      </section>

      {/* CONTACT FORM */}
      <section
        className="w-full px-6 py-20 md:px-10"
        style={{ backgroundColor: "#0D0D0D" }}
      >
        <div className="max-w-[600px]">
          <SectionHeader title="Send a Message" />

          <ContactForm />
        </div>
      </section>
    </div>
  );
}
