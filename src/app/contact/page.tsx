import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Big Machine Records in Nashville. General inquiries, press, A&R submissions, and partnership opportunities.",
  openGraph: {
    title: "Contact | Big Machine Records",
    description:
      "Contact Big Machine Records in Nashville. General inquiries, press, A&R submissions, and partnership opportunities.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
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
    <div style={{ backgroundColor: "#000000" }}>
      {/* TWO-COLUMN: CATEGORIES + FORM */}
      <section
        className="w-full grid grid-cols-1 md:grid-cols-2 items-start px-8 pt-[100px] pb-20 md:px-20 md:pt-[120px] md:pb-20"
        style={{
          backgroundColor: "#000000",
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
                borderTop: i > 0 ? "1px solid #1a1a1a" : undefined,
                borderBottom:
                  i === categories.length - 1
                    ? "1px solid #1a1a1a"
                    : undefined,
                padding: "40px 0",
              }}
            >
              <h2 className="font-[family-name:var(--font-display)] text-[28px] md:text-[48px] uppercase text-white leading-none mb-3">
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
        <div className="mt-12 md:mt-0">
          <SectionHeader title="Send a Message" />
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
