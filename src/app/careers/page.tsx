import type { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join the Big Machine Records team. View open positions and internship opportunities.",
};

const jobs = [
  { title: "Marketing Coordinator", department: "Marketing" },
  { title: "A&R Assistant", department: "A&R" },
];

const semesters = [
  {
    name: "Summer 2026 Semester",
    open: false,
    text: "This application period is now closed.",
  },
  {
    name: "Fall 2026 Semester",
    open: true,
    text: "Applications open April 28th to June 15th, 2026",
  },
  {
    name: "Spring 2027 Semester",
    open: true,
    text: "Applications open August 11th to October 2nd, 2026",
  },
  {
    name: "Summer 2027 Semester",
    open: true,
    text: "Applications open February 2nd to March 26th, 2027",
  },
];

const linkedinUrl = "https://www.linkedin.com/company/big-machine-records";

export default function CareersPage() {
  return (
    <section
      className="w-full min-h-screen pt-[100px] md:pt-[120px]"
      style={{ backgroundColor: "#000000" }}
    >
      {/* Header */}
      <div className="px-8 md:px-20">
        <SectionHeader title="Careers" />
      </div>

      {/* Open Positions */}
      <div className="px-8 pb-16 md:px-20 md:pb-20">
        <p
          className="font-[family-name:var(--font-body)]"
          style={{
            fontSize: 16,
            color: "#C8C7C8",
            marginBottom: 40,
          }}
        >
          Join one of the most storied independent labels in Nashville. View our
          current openings on LinkedIn.
        </p>

        <div>
          {jobs.map((job, i) => (
            <div
              key={job.title}
              className="flex flex-col md:flex-row md:items-center"
              style={{
                borderTop: "1px solid #1a1a1a",
                borderBottom:
                  i === jobs.length - 1 ? "1px solid #1a1a1a" : undefined,
                padding: "28px 0",
              }}
            >
              <div className="md:flex-1">
                <h3
                  className="font-[family-name:var(--font-display)] text-white uppercase"
                  style={{ fontSize: 28, lineHeight: 1.1 }}
                >
                  {job.title}
                </h3>
                <span
                  className="block font-[family-name:var(--font-body)] uppercase mt-1"
                  style={{
                    fontSize: 13,
                    color: "#717171",
                    letterSpacing: "0.15em",
                  }}
                >
                  {job.department}
                </span>
              </div>

              <div className="md:flex-1 mt-2 md:mt-0 md:flex md:items-center">
                <span
                  className="font-[family-name:var(--font-body)]"
                  style={{ fontSize: 14, color: "#C8C7C8" }}
                >
                  Nashville, TN
                </span>
                <span
                  className="font-[family-name:var(--font-body)] ml-0 md:ml-auto"
                  style={{ fontSize: 13, color: "#717171", display: "block" }}
                >
                  Full Time
                </span>
              </div>

              <div className="mt-2 md:mt-0 md:w-[160px] md:text-right md:flex-shrink-0">
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-[family-name:var(--font-body)] uppercase no-underline transition-opacity duration-200 ease-out hover:opacity-70"
                  style={{
                    fontSize: 13,
                    color: "#CA2125",
                    letterSpacing: "0.15em",
                  }}
                >
                  View on LinkedIn
                </a>
              </div>
            </div>
          ))}
        </div>

        <p
          className="font-[family-name:var(--font-body)] mt-6"
          style={{ fontSize: 13, color: "#717171" }}
        >
          For all open positions, visit Big Machine Records on{" "}
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline transition-opacity duration-200 ease-out hover:opacity-70"
            style={{ color: "#CA2125" }}
          >
            LinkedIn
          </a>
          .
        </p>
      </div>

      {/* Internships */}
      <div
        className="px-8 pb-16 md:px-20 md:pb-20"
        style={{ borderTop: "1px solid #1a1a1a" }}
      >
        <div className="pt-12 md:pt-12 mb-10">
          <div className="flex items-center gap-6 mb-10">
            <h2
              className="font-[family-name:var(--font-display)] text-[28px] md:text-[36px] uppercase text-white leading-none whitespace-nowrap"
            >
              Internships
            </h2>
            <div
              className="flex-1 h-px"
              style={{ backgroundColor: "#222222" }}
            />
          </div>
        </div>

        <h3
          className="font-[family-name:var(--font-display)] text-white uppercase"
          style={{ fontSize: 28, marginBottom: 16 }}
        >
          BMLG Accelerator Program
        </h3>

        <p
          className="font-[family-name:var(--font-body)]"
          style={{
            fontSize: 16,
            color: "#C8C7C8",
            lineHeight: 1.8,
            marginBottom: 40,
          }}
        >
          Big Machine Label Group offers an excellent opportunity for college
          students to learn about the music business.
        </p>

        {semesters.map((sem) => (
          <div key={sem.name} style={{ marginBottom: 32 }}>
            <h4
              className="font-[family-name:var(--font-display)] text-white uppercase"
              style={{ fontSize: 20, marginBottom: 8 }}
            >
              {sem.name}
            </h4>
            {sem.open ? (
              <p
                className="font-[family-name:var(--font-body)]"
                style={{ fontSize: 15, color: "#C8C7C8" }}
              >
                {sem.text}
              </p>
            ) : (
              <p
                className="font-[family-name:var(--font-body)] italic"
                style={{ fontSize: 14, color: "#717171" }}
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
