import Link from "next/link";
import { artists } from "@/lib/data/artists";
import { fetchTourDates, formatDateDisplay } from "@/lib/tourDates";
import SectionHeader from "@/components/SectionHeader";
import OnTourAnimator from "@/components/OnTourAnimator";

interface TourRow {
  slug: string;
  name: string;
  nextDate: string;
  venue: string;
  city: string;
  ticketUrl: string;
}

export default async function OnTourSection() {
  const artistsWithTour = artists.filter(
    (a) => a.tourSource.platform !== "none"
  );

  const results = await Promise.all(
    artistsWithTour.map(async (a) => {
      const dates = await fetchTourDates(a);
      if (dates.length === 0) return null;
      const next = dates[0];
      return {
        slug: a.slug,
        name: a.name,
        nextDate: next.date,
        venue: next.venue,
        city: `${next.city}${next.region ? `, ${next.region}` : ""}`,
        ticketUrl: next.ticketUrl,
      } as TourRow;
    })
  );

  const rows = results.filter((r): r is TourRow => r !== null);

  if (rows.length === 0) return null;

  return (
    <section className="w-full bg-black px-8 py-12 md:px-20 md:py-20">
      <SectionHeader title="On Tour" />

      <OnTourAnimator>
        {rows.map((row, i) => (
          <div
            key={row.slug}
            className="flex flex-col md:flex-row md:items-center py-5 transition-colors duration-200 ease-out hover:bg-[#0D0D0D]"
            style={{
              borderTop: "1px solid #1a1a1a",
              borderBottom:
                i === rows.length - 1 ? "1px solid #1a1a1a" : undefined,
            }}
            data-tour-animate
            data-tour-delay={String(i * 40)}
          >
            <Link
              href={`/artists/${row.slug}`}
              className="font-[family-name:var(--font-display)] text-[28px] uppercase text-white leading-none no-underline transition-colors duration-300 ease-out hover:text-[#CA2125] md:w-[280px] md:flex-shrink-0"
            >
              {row.name}
            </Link>

            <div className="flex flex-col mt-2 md:mt-0 md:flex-1 md:flex-row md:items-center md:justify-center">
              <span
                className="font-[family-name:var(--font-body)] text-[14px]"
                style={{ color: "#C8C7C8" }}
              >
                {formatDateDisplay(row.nextDate)}
              </span>
              <span
                className="hidden md:inline font-[family-name:var(--font-body)] text-[14px] mx-2"
                style={{ color: "#717171" }}
              >
                &middot;
              </span>
              <span
                className="font-[family-name:var(--font-body)] text-[14px]"
                style={{ color: "#717171" }}
              >
                {row.venue}
              </span>
              <span
                className="hidden md:inline font-[family-name:var(--font-body)] text-[14px] mx-2"
                style={{ color: "#717171" }}
              >
                &middot;
              </span>
              <span
                className="font-[family-name:var(--font-body)] text-[14px]"
                style={{ color: "#717171" }}
              >
                {row.city}
              </span>
            </div>

            {row.ticketUrl && (
              <a
                href={row.ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-[family-name:var(--font-body)] text-[13px] uppercase no-underline mt-2 md:mt-0 md:w-[120px] md:text-right md:flex-shrink-0 transition-opacity duration-200 ease-out hover:opacity-70"
                style={{ letterSpacing: "0.1em", color: "#CA2125" }}
              >
                Tickets
              </a>
            )}
          </div>
        ))}
      </OnTourAnimator>
    </section>
  );
}
