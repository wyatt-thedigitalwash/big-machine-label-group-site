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
        className="w-full px-8 pt-[100px] pb-10 md:px-20 md:pt-[120px] md:pb-[60px]"
        style={{ backgroundColor: "#0D0D0D" }}
      >
        <span
          className="block font-[family-name:var(--font-body)] text-[13px] uppercase mb-4"
          style={{ letterSpacing: "0.2em", color: "#CA2125" }}
        >
          Contact
        </span>
        <h1 className="font-[family-name:var(--font-display)] text-[56px] md:text-[96px] uppercase text-white leading-[1]">
          Get In Touch.
        </h1>
      </section>

      {/* TWO-COLUMN: CATEGORIES + FORM */}
      <section
        className="w-full grid grid-cols-1 md:grid-cols-2 items-start px-8 pb-20 md:px-20 md:pb-20"
        style={{
          backgroundColor: "#0D0D0D",
          columnGap: 80,
        }}
      >
        {/* LEFT — Contact Categories */}
        <div>
          {categories.map((cat, i) => (
            <div
              key={cat.email}
              className="group"
              style={{
                borderTop: "1px solid #1a1a1a",
                borderBottom:
                  i === categories.length - 1
                    ? "1px solid #1a1a1a"
                    : undefined,
                padding: "40px 0",
              }}
            >
              <h2 className="font-[family-name:var(--font-display)] text-[48px] uppercase text-white leading-none mb-3">
                {cat.title}
              </h2>
              <a
                href={`mailto:${cat.email}`}
                className="font-[family-name:var(--font-body)] text-[16px] no-underline transition-colors duration-300 ease-out hover:text-[#CA2125]"
                style={{ color: "#C8C7C8" }}
              >
                {cat.email}
              </a>
            </div>
          ))}
        </div>

        {/* RIGHT — Contact Form */}
        <div
          className="mt-12 md:mt-0"
          style={{
            borderTop: "1px solid #1a1a1a",
            paddingTop: 40,
          }}
        >
          <SectionHeader title="Send a Message" />
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
