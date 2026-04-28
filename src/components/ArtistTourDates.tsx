import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";

interface BandsintownEvent {
  id: string;
  datetime: string;
  venue: {
    name: string;
    city: string;
    region: string;
    country: string;
  };
  offers: { type: string; url: string; status: string }[];
}

interface NextShow {
  date: string;
  venue: string;
  city: string;
  ticketUrl: string;
}

async function fetchEvents(
  bandsintownId: string
): Promise<BandsintownEvent[]> {
  const appId = process.env.BANDSINTOWN_APP_ID;
  if (!appId || appId === "your_app_id_here") return [];

  try {
    const res = await fetch(
      `https://rest.bandsintown.com/artists/${encodeURIComponent(bandsintownId)}/events?app_id=${appId}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

function formatDate(datetime: string): string {
  const d = new Date(datetime);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function ArtistTourDates({
  bandsintownId,
  nextShow,
}: {
  bandsintownId: string;
  nextShow: NextShow | null;
}) {
  const events = await fetchEvents(bandsintownId);

  // Bandsintown has results -- render the full list
  if (events.length > 0) {
    return (
      <section className="w-full bg-black px-6 py-12 md:px-10 md:py-20" style={{ borderTop: "1px solid #1a1a1a" }}>
        <SectionHeader title="On Tour" />
        <ul className="list-none p-0 m-0">
          {events.map((event) => {
            const ticketUrl = event.offers?.[0]?.url;
            return (
              <li
                key={event.id}
                className="flex flex-col md:flex-row md:items-center md:justify-between py-4"
                style={{ borderBottom: "1px solid #333333" }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:gap-8">
                  <span className="font-[family-name:var(--font-body)] text-[14px] text-white">
                    {formatDate(event.datetime)}
                  </span>
                  <span
                    className="font-[family-name:var(--font-body)] text-[14px]"
                    style={{ color: "#C8C7C8" }}
                  >
                    {event.venue.name} -- {event.venue.city},{" "}
                    {event.venue.region || event.venue.country}
                  </span>
                </div>
                {ticketUrl && (
                  <a
                    href={ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-[family-name:var(--font-body)] text-[14px] mt-2 md:mt-0 no-underline"
                    style={{ color: "#CA2125" }}
                  >
                    Tickets
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </section>
    );
  }

  // No Bandsintown results -- fall back to nextShow
  if (!nextShow) return null;

  return (
    <section className="w-full bg-black px-6 py-12 md:px-10 md:py-20" style={{ borderTop: "1px solid #1a1a1a" }}>
      <SectionHeader title="On Tour" />
      <div
        className="flex flex-col md:flex-row md:items-center md:justify-between py-5"
        style={{
          borderTop: "1px solid #1a1a1a",
          borderBottom: "1px solid #1a1a1a",
        }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:gap-8">
          <span className="font-[family-name:var(--font-body)] text-[14px] text-white">
            {nextShow.date}
          </span>
          <span
            className="font-[family-name:var(--font-body)] text-[14px]"
            style={{ color: "#C8C7C8" }}
          >
            {nextShow.venue} &middot; {nextShow.city}
          </span>
        </div>
        <a
          href={nextShow.ticketUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-[family-name:var(--font-body)] text-[13px] uppercase no-underline mt-2 md:mt-0 transition-opacity duration-200 ease-out hover:opacity-70"
          style={{ letterSpacing: "0.1em", color: "#CA2125" }}
        >
          Tickets
        </a>
      </div>

      <p
        className="font-[family-name:var(--font-body)] text-[12px] mt-4"
        style={{ color: "#717171" }}
      >
        More dates coming soon. Check back for updates.
      </p>
    </section>
  );
}
