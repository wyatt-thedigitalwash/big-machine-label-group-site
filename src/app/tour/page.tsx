import Link from "next/link";
import type { Metadata } from "next";
import { artists } from "@/lib/data/artists";
import { fetchAllTourDates, formatDateDisplay } from "@/lib/tourDates";
import SectionHeader from "@/components/SectionHeader";
import TourToggle from "@/components/TourToggle";

export const metadata: Metadata = {
  title: "Tour",
  description:
    "See all upcoming tour dates and buy tickets for Big Machine Records artists. Live shows across the United States.",
  openGraph: {
    title: "Tour | Big Machine Records",
    description:
      "See all upcoming tour dates and buy tickets for Big Machine Records artists. Live shows across the United States.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

function formatMonthLabel(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function getMonthKey(dateStr: string): string {
  return dateStr.slice(0, 7);
}

function renderDateRow(
  d: { date: string; venue: string; city: string; region: string; country: string; ticketUrl: string; artistName?: string; artistSlug?: string },
  i: number,
  isLast: boolean,
  showArtist: boolean,
  isFirst: boolean = false
) {
  const locationLine =
    d.country !== "US"
      ? `${d.city}, ${d.country}`
      : `${d.city}${d.region ? `, ${d.region}` : ""}`;

  return (
    <div
      key={`${d.date}-${d.venue}-${d.artistSlug ?? ""}-${i}`}
      className="flex flex-col md:flex-row md:items-center md:justify-between"
      style={{
        borderTop: isFirst ? undefined : "1px solid #1a1a1a",
        borderBottom: isLast ? "1px solid #1a1a1a" : undefined,
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

      <div className="flex-1 mt-1 md:mt-0 md:px-6">
        {showArtist && d.artistSlug ? (
          <Link
            href={`/artists/${d.artistSlug}`}
            className="block font-[family-name:var(--font-body)] text-[14px] text-white no-underline transition-colors duration-200 ease-out hover:text-[#CA2125]"
          >
            {d.artistName}
          </Link>
        ) : null}
        <span
          className={`block font-[family-name:var(--font-body)] text-[14px] ${showArtist ? "" : "text-white"}`}
          style={showArtist ? { color: "#717171" } : undefined}
        >
          {d.venue}
        </span>
        <span
          className="block font-[family-name:var(--font-body)] text-[13px] md:hidden"
          style={{ color: "#717171" }}
        >
          {locationLine}
        </span>
      </div>

      <span
        className="font-[family-name:var(--font-body)] text-[13px] flex-shrink-0 md:text-right hidden md:block"
        style={{ color: "#717171", minWidth: 120 }}
      >
        {locationLine}
      </span>

      {d.ticketUrl && (
        <a
          href={d.ticketUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-[family-name:var(--font-body)] text-[13px] uppercase no-underline md:ml-6 flex-shrink-0 transition-opacity duration-200 ease-out hover:opacity-70 hidden md:block"
          style={{ letterSpacing: "0.12em", color: "#CA2125" }}
        >
          Tickets
        </a>
      )}
    </div>
  );
}

export default async function TourPage() {
  const flatDates = await fetchAllTourDates(
    artists.map((a) => ({ name: a.name, slug: a.slug }))
  );

  // -- By Month grouping for By Date view --
  const byMonthMap = new Map<string, typeof flatDates>();
  for (const d of flatDates) {
    const key = getMonthKey(d.date);
    const existing = byMonthMap.get(key);
    if (existing) {
      existing.push(d);
    } else {
      byMonthMap.set(key, [d]);
    }
  }

  // -- By Artist: preserve roster order --
  const artistOrder = artists.map((a) => a.name);
  const byArtistMap = new Map<string, { slug: string; dates: typeof flatDates }>();
  for (const d of flatDates) {
    const existing = byArtistMap.get(d.artistName);
    if (existing) {
      existing.dates.push(d);
    } else {
      byArtistMap.set(d.artistName, { slug: d.artistSlug, dates: [d] });
    }
  }
  const orderedArtists = artistOrder
    .filter((name) => byArtistMap.has(name))
    .map((name) => ({ name, ...byArtistMap.get(name)! }));

  const emptyMessage = (
    <p
      className="font-[family-name:var(--font-body)] text-[14px]"
      style={{ color: "#717171" }}
    >
      No upcoming shows at this time.
    </p>
  );

  // ---- BY DATE VIEW (grouped by month) ----
  const byDateView = (
    <div>
      {byMonthMap.size === 0
        ? emptyMessage
        : Array.from(byMonthMap.entries()).map(([monthKey, dates]) => (
            <div key={monthKey}>
              <h3
                className="font-[family-name:var(--font-display)] text-[28px] uppercase text-white"
                style={{
                  borderBottom: "1px solid #1a1a1a",
                  paddingBottom: 8,
                  marginBottom: 0,
                  marginTop: 32,
                }}
              >
                {formatMonthLabel(dates[0].date)}
              </h3>
              {dates.map((d, i) => renderDateRow(d, i, i === dates.length - 1, true, i === 0))}
            </div>
          ))}
    </div>
  );

  // ---- BY ARTIST VIEW ----
  const byArtistView = (
    <div>
      {orderedArtists.length === 0
        ? emptyMessage
        : orderedArtists.map(({ name, slug, dates }) => (
            <div key={name}>
              <h3
                className="font-[family-name:var(--font-display)] text-[28px] uppercase text-white"
                style={{
                  borderBottom: "1px solid #1a1a1a",
                  paddingBottom: 8,
                  marginBottom: 0,
                  marginTop: 32,
                }}
              >
                <Link
                  href={`/artists/${slug}`}
                  className="text-white no-underline transition-colors duration-200 ease-out hover:text-[#CA2125]"
                >
                  {name}
                </Link>
              </h3>
              {dates.map((d, i) => renderDateRow(d, i, i === dates.length - 1, false, i === 0))}
            </div>
          ))}
    </div>
  );

  return (
    <section
      className="w-full min-h-screen pt-[100px] md:pt-[120px] px-8 md:px-20 pb-20"
      style={{ backgroundColor: "#000000" }}
    >
      <SectionHeader title="Tour" as="h1" />
      <TourToggle byDate={byDateView} byArtist={byArtistView} />
    </section>
  );
}
