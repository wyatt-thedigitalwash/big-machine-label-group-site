import SectionHeader from "@/components/SectionHeader";
import { fetchTourDates, formatDateDisplay } from "@/lib/tourDates";
import type { Artist } from "@/lib/data/artists";

export default async function ArtistTourDates({
  artist,
}: {
  artist: Artist;
}) {
  if (artist.tourSource.platform === "none") return null;

  const dates = await fetchTourDates(artist);

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
        <ul className="list-none p-0 m-0">
          {dates.map((d, i) => (
            <li
              key={`${d.date}-${d.venue}`}
              className="flex flex-col md:flex-row md:items-center md:justify-between"
              style={{
                borderTop: "1px solid #1a1a1a",
                borderBottom:
                  i === dates.length - 1 ? "1px solid #1a1a1a" : undefined,
                padding: "20px 0",
              }}
            >
              {/* Date */}
              <span
                className="font-[family-name:var(--font-body)] text-[14px] md:w-[140px] md:flex-shrink-0"
                style={{ color: "#C8C7C8" }}
              >
                {formatDateDisplay(d.date)}
              </span>

              {/* Venue + City */}
              <div className="flex-1 mt-1 md:mt-0 md:px-6">
                <span className="block font-[family-name:var(--font-body)] text-[14px] text-white">
                  {d.venue}
                </span>
                <span
                  className="block font-[family-name:var(--font-body)] text-[13px]"
                  style={{ color: "#717171" }}
                >
                  {d.city}
                  {d.region ? `, ${d.region}` : ""}
                </span>
              </div>

              {/* Tickets + RSVP */}
              <div className="flex gap-4 mt-2 md:mt-0 flex-shrink-0">
                {d.ticketUrl && (
                  <a
                    href={d.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-[family-name:var(--font-body)] text-[12px] uppercase no-underline transition-opacity duration-200 ease-out hover:opacity-70"
                    style={{ letterSpacing: "0.15em", color: "#CA2125" }}
                  >
                    Tickets
                  </a>
                )}
                {d.rsvpUrl && d.rsvpUrl !== d.ticketUrl && (
                  <a
                    href={d.rsvpUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-[family-name:var(--font-body)] text-[12px] uppercase no-underline transition-colors duration-200 ease-out hover:text-[#C8C7C8]"
                    style={{ letterSpacing: "0.15em", color: "#717171" }}
                  >
                    RSVP
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
