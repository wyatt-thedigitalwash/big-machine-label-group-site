import type { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Explore internship opportunities at Borchetta Entertainment Group and Big Machine Records in Nashville, Tennessee.",
  openGraph: {
    title: "Careers | Big Machine Records",
    description:
      "Explore internship opportunities at Borchetta Entertainment Group and Big Machine Records in Nashville, Tennessee.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

type Semester = {
  name: string;
  text?: string;
  apply?: { href: string };
  note?: string;
};

const begSemesters: Semester[] = [
  {
    name: "Spring 2027 Semester",
    apply: {
      href: "https://forms.monday.com/forms/d0ba49bd40a182e1289870b16f75604f?r=use1",
    },
    note: "This window will close and the link will be removed on October 30th, 2026.",
  },
  {
    name: "Summer 2027 Semester",
    text: "Applications open February 2nd, 2027.",
  },
  {
    name: "Fall 2027 Semester",
    text: "Applications open April 27th, 2027.",
  },
];


export default function CareersPage() {
  return (
    <section
      className="w-full min-h-screen pt-[100px] md:pt-[120px]"
      style={{ backgroundColor: "#000000" }}
    >
      {/* BEG Internship Program */}
      <div className="px-8 pb-16 md:px-20 md:pb-20">
        <SectionHeader title="BEG Internship Program" as="h1" />

        <p
          className="font-[family-name:var(--font-body)]"
          style={{
            fontSize: 16,
            color: "#C8C7C8",
            lineHeight: 1.8,
            marginBottom: 40,
          }}
        >
          With record labels including Big Machine Records and Nashville Harbor
          Records and Entertainment, as well as an artist management division,
          Borchetta Entertainment Group offers an excellent opportunity for
          students to learn about the music business.
        </p>

        {begSemesters.map((sem) => (
          <div key={sem.name} style={{ marginBottom: 32 }}>
            <h4
              className="font-[family-name:var(--font-display)] text-white uppercase"
              style={{ fontSize: 24, marginBottom: 8 }}
            >
              {sem.name}
            </h4>
            {sem.apply ? (
              <>
                <p
                  className="font-[family-name:var(--font-body)]"
                  style={{ fontSize: 15, color: "#C8C7C8" }}
                >
                  NOW ACCEPTING APPLICATIONS:{" "}
                  <a
                    href={sem.apply.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold underline underline-offset-4 transition-colors duration-400 ease-out hover:text-white"
                    style={{ color: "#CA2125" }}
                  >
                    APPLY HERE
                  </a>
                </p>
                {sem.note && (
                  <p
                    className="font-[family-name:var(--font-body)]"
                    style={{ fontSize: 13, color: "#717171", marginTop: 6 }}
                  >
                    {sem.note}
                  </p>
                )}
              </>
            ) : (
              <p
                className="font-[family-name:var(--font-body)]"
                style={{ fontSize: 15, color: "#C8C7C8" }}
              >
                {sem.text}
              </p>
            )}
          </div>
        ))}

        <p
          className="font-[family-name:var(--font-body)] italic"
          style={{ fontSize: 13, color: "#717171", marginTop: 8 }}
        >
          Please note: Department needs and availability differs from one
          semester to another. The available departments to apply for an
          internship will be listed in the application form for that given
          semester.
        </p>
      </div>
    </section>
  );
}
