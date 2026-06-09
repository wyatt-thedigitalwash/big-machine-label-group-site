import type { Artist } from "@/lib/data/artists";

export type TourDate = {
  date: string;
  venue: string;
  city: string;
  region: string;
  country: string;
  ticketUrl: string;
  rsvpUrl?: string;
};

function isPast(dateStr: string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d = new Date(dateStr);
  return d < today;
}

function formatDateDisplay(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

async function fetchBandsintown(
  artistId: string,
  appId: string
): Promise<TourDate[]> {
  const res = await fetch(
    `https://rest.bandsintown.com/artists/${encodeURIComponent(artistId)}/events?app_id=${appId}&date=upcoming`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) return [];

  const events = await res.json();
  if (!Array.isArray(events)) return [];

  return events
    .map((event: Record<string, unknown>) => {
      const venue = event.venue as Record<string, string> | undefined;
      const offers = event.offers as
        | { type: string; url: string; status: string }[]
        | undefined;
      const rawDate =
        typeof event.datetime === "string"
          ? event.datetime.split("T")[0]
          : "";
      return {
        date: rawDate,
        venue: venue?.name ?? "",
        city: venue?.city ?? "",
        region: venue?.region ?? "",
        country: venue?.country ?? "",
        ticketUrl:
          offers?.[0]?.url ?? (typeof event.url === "string" ? event.url : ""),
        rsvpUrl: typeof event.url === "string" ? event.url : "",
      };
    })
    .filter((d: TourDate) => d.date && !isPast(d.date))
    .sort((a: TourDate, b: TourDate) => a.date.localeCompare(b.date));
}

async function fetchSeated(artistId: string): Promise<TourDate[]> {
  const res = await fetch(
    `https://api.seated.com/api/v2/artists/${artistId}/events?include=venue`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) return [];

  const json = await res.json();
  const data = json.data as Record<string, unknown>[] | undefined;
  const included = json.included as Record<string, unknown>[] | undefined;

  if (!Array.isArray(data)) return [];

  return data
    .map((event) => {
      const attrs = event.attributes as Record<string, string> | undefined;
      const rels = event.relationships as Record<
        string,
        { data?: { id?: string; type?: string } }
      > | undefined;

      // Find venue from included
      let venueName = attrs?.["venue-name"] ?? "";
      if (included && rels?.venue?.data?.id) {
        const venueRecord = included.find(
          (inc) =>
            (inc.type as string) === "venues" &&
            (inc.id as string) === rels.venue.data!.id
        );
        if (venueRecord) {
          const venueAttrs = venueRecord.attributes as Record<string, string>;
          venueName = venueAttrs?.name ?? venueName;
        }
      }

      const rawDate = attrs?.["start-date"] ?? "";
      return {
        date: rawDate,
        venue: venueName,
        city: attrs?.["venue-city"] ?? "",
        region: attrs?.["venue-state"] ?? "",
        country: attrs?.["venue-country"] ?? "United States",
        ticketUrl: attrs?.["ticket-link"] ?? attrs?.["event-link"] ?? "",
        rsvpUrl: attrs?.["event-link"] ?? "",
      };
    })
    .filter((d: TourDate) => d.date && !isPast(d.date))
    .sort((a: TourDate, b: TourDate) => a.date.localeCompare(b.date));
}

export async function fetchTourDates(artist: Artist): Promise<TourDate[]> {
  const { platform, artistId, appId } = artist.tourSource;

  if (platform === "none") return [];

  try {
    if (platform === "bandsintown") {
      return await fetchBandsintown(artistId, appId ?? "");
    }
    if (platform === "seated") {
      return await fetchSeated(artistId);
    }
    return [];
  } catch {
    return [];
  }
}

export { formatDateDisplay };
