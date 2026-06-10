import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import { fetchArtistTourDates, formatDateDisplay } from "@/lib/tourDates";
import type { Artist } from "@/lib/data/artists";

export default async function ArtistTourDates({
  artist,
}: {
  artist: Artist;
}) {
  const dates = await fetchArtistTourDates(artist.name);

  return (
    <section className="w-full bg-black px-8 py-12 md:px-20 md:py-20">
      <SectionHeader title="On Tour" />

      {dates.length === 0 ? (
        <p
          className="font-[family-name:var(--font-body)] text-[14px]"
          style={{ color: "#717171" }}
        >
          No upcoming shows at this time.
        </p>
      ) : (
        <>
          <ul className="list-none p-0 m-0">
            {dates.map((d, i) => {
              const locationLine =
                d.country !== "US"
                  ? `${d.city}, ${d.country}`
                  : `${d.city}${d.region ? `, ${d.region}` : ""}`;

              return (
                <li
                  key={`${d.date}-${d.venue}-${i}`}
                  className="flex flex-col md:flex-row md:items-center md:justify-between"
                  style={{
                    borderTop: "1px solid #1a1a1a",
                    borderBottom:
                      i === dates.length - 1 ? "1px solid #1a1a1a" : undefined,
                    padding: "20px 0",
                  }}
                >
                  <div className="flex items-baseline gap-4 md:contents">
                    <span
                      className="font-[family-name:var(--font-body)] text-[14px] flex-shrink-0"
                      style={{ color: "#C8C7C8", minWidth: 140 }}
                    >
                      {formatDateDisplay(d.date)}
                    </span>

                    {d.ticketUrl && (
                      <a
                        href={d.ticketUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-[family-name:var(--font-body)] text-[13px] uppercase no-underline flex-shrink-0 transition-opacity duration-200 ease-out hover:opacity-70 md:hidden ml-auto"
                        style={{ letterSpacing: "0.12em", color: "#CA2125" }}
                      >
                        Tickets
                      </a>
                    )}
                  </div>

                  <div
                    className="flex-1 mt-1 md:mt-0 md:px-6"
                  >
                    <span className="block font-[family-name:var(--font-body)] text-[14px] text-white">
                      {d.venue}
                    </span>
                    <span
                      className="block font-[family-name:var(--font-body)] text-[13px]"
                      style={{ color: "#717171" }}
                    >
                      {locationLine}
                    </span>
                  </div>

                  {d.ticketUrl && (
                    <a
                      href={d.ticketUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-[family-name:var(--font-body)] text-[13px] uppercase no-underline flex-shrink-0 transition-opacity duration-200 ease-out hover:opacity-70 hidden md:block"
                      style={{ letterSpacing: "0.12em", color: "#CA2125" }}
                    >
                      Tickets
                    </a>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="flex gap-6" style={{ marginTop: 24 }}>
            <Link
              href="/tour"
              className="font-[family-name:var(--font-body)] text-[13px] uppercase no-underline transition-opacity duration-200 ease-out hover:opacity-60"
              style={{
                color: "#717171",
                letterSpacing: "0.12em",
                borderBottom: "1px solid #717171",
                paddingBottom: 2,
              }}
            >
              View All Dates
            </Link>
            {dates[0]?.ticketUrl && (
              <a
                href={dates[0].ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-[family-name:var(--font-body)] text-[13px] uppercase no-underline transition-opacity duration-200 ease-out hover:opacity-60"
                style={{
                  color: "#717171",
                  letterSpacing: "0.12em",
                  borderBottom: "1px solid #717171",
                  paddingBottom: 2,
                }}
              >
                Get Tickets
              </a>
            )}
          </div>
        </>
      )}
    </section>
  );
}
