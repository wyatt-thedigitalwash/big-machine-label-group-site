export type TourDate = {
  date: string;
  venue: string;
  city: string;
  region: string;
  country: string;
  ticketUrl: string;
};

function isPast(dateStr: string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(dateStr) < today;
}

export function formatDateDisplay(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export async function fetchArtistTourDates(
  artistName: string
): Promise<TourDate[]> {
  try {
    const url = `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${encodeURIComponent(artistName)}&classificationName=music&countryCode=US&size=20&sort=date,asc&apikey=${process.env.TICKETMASTER_API_KEY}`;

    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return [];

    const json = await res.json();
    const events = json._embedded?.events;
    if (!Array.isArray(events)) return [];

    return events
      .map((event: Record<string, unknown>) => {
        const dates = event.dates as Record<string, Record<string, string>> | undefined;
        const embedded = event._embedded as Record<string, unknown[]> | undefined;
        const venue = embedded?.venues?.[0] as Record<string, unknown> | undefined;
        const venueCity = venue?.city as Record<string, string> | undefined;
        const venueState = venue?.state as Record<string, string> | undefined;
        const venueCountry = venue?.country as Record<string, string> | undefined;

        return {
          date: dates?.start?.localDate ?? "",
          venue: (venue?.name as string) ?? "",
          city: venueCity?.name ?? "",
          region: venueState?.stateCode ?? "",
          country: venueCountry?.countryCode ?? "US",
          ticketUrl: (event.url as string) ?? "",
        };
      })
      .filter((d: TourDate) => d.date && !isPast(d.date))
      .sort((a: TourDate, b: TourDate) => a.date.localeCompare(b.date));
  } catch (err) {
    console.error(`[tourDates] Failed to fetch for ${artistName}:`, err);
    return [];
  }
}

export async function fetchAllTourDates(
  artistList: { name: string; slug: string }[]
): Promise<(TourDate & { artistName: string; artistSlug: string })[]> {
  const results = await Promise.all(
    artistList.map(async ({ name, slug }) => {
      const dates = await fetchArtistTourDates(name);
      return dates.map((d) => ({ ...d, artistName: name, artistSlug: slug }));
    })
  );
  return results.flat().sort((a, b) => a.date.localeCompare(b.date));
}
