import type { Artist, TourSource } from "@/lib/data/artists";

export type TourDate = {
  date: string;
  venue: string;
  city: string;
  region: string;
  country: string;
  ticketUrl: string;
};

const REVALIDATE_SECONDS = 3600;

function isPast(dateStr: string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(dateStr + "T00:00:00") < today;
}

export function formatDateDisplay(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function normalizeCountry(country: string): string {
  return country === "United States" || country === "USA" || !country
    ? "US"
    : country;
}

type BandsintownEvent = {
  datetime?: string;
  title?: string;
  url?: string;
  venue?: { name?: string; city?: string; region?: string; country?: string };
  offers?: { type?: string; url?: string }[];
};

// Bandsintown emits "Presale" during presale windows and "Free" for no-cost
// shows. All three carry the ticket link, general on-sale preferred.
const TICKET_OFFER_TYPES = ["Tickets", "Presale", "Free"];

async function fetchBandsintown(
  source: Extract<TourSource, { source: "bandsintown" }>
): Promise<TourDate[]> {
  const url = `https://rest.bandsintown.com/artists/id_${source.artistId}/events?app_id=${encodeURIComponent(source.appId)}&date=upcoming`;
  const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
  if (!res.ok) return [];
  const events: unknown = await res.json();
  if (!Array.isArray(events)) return [];

  return (events as BandsintownEvent[])
    .filter((ev) => ev.datetime)
    .map((ev) => {
      const offer = TICKET_OFFER_TYPES.map((type) =>
        ev.offers?.find((o) => o.type === type && o.url)
      ).find(Boolean);
      return {
        date: ev.datetime!.slice(0, 10),
        venue: (ev.venue?.name || ev.title || "").trim(),
        city: ev.venue?.city ?? "",
        region: ev.venue?.region ?? "",
        country: normalizeCountry(ev.venue?.country ?? ""),
        ticketUrl: offer?.url ?? ev.url ?? "",
      };
    });
}

type SeatedResponse = {
  included?: {
    id: string;
    type: string;
    attributes: {
      "starts-at-date-local"?: string;
      "venue-name"?: string;
      "formatted-address"?: string;
    };
  }[];
};

async function fetchSeated(
  source: Extract<TourSource, { source: "seated" }>
): Promise<TourDate[]> {
  const url = `https://cdn.seated.com/api/tour/${source.artistId}?include=tour-events`;
  const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
  if (!res.ok) return [];
  const json: SeatedResponse = await res.json();

  return (json.included ?? [])
    .filter((item) => item.type === "tour-events")
    .map((item) => {
      const attrs = item.attributes;
      // "Indio, CA" for US shows, "London, United Kingdom" abroad.
      const parts = (attrs["formatted-address"] ?? "").split(", ");
      const last = parts.length > 1 ? parts[parts.length - 1] : "";
      const isUsState = /^[A-Z]{2}$/.test(last);
      return {
        date: attrs["starts-at-date-local"] ?? "",
        venue: attrs["venue-name"] ?? "",
        city: parts.length > 1 ? parts.slice(0, -1).join(", ") : parts[0],
        region: isUsState ? last : "",
        country: isUsState ? "US" : normalizeCountry(last),
        ticketUrl: `https://link.seated.com/${item.id}`,
      };
    });
}

export async function fetchArtistTourDates(
  artist: Pick<Artist, "name" | "tour">
): Promise<TourDate[]> {
  try {
    const { tour } = artist;
    const dates =
      tour.source === "bandsintown"
        ? await fetchBandsintown(tour)
        : tour.source === "seated"
          ? await fetchSeated(tour)
          : tour.dates;

    return dates
      .filter((d) => d.date && !isPast(d.date))
      .sort((a, b) => a.date.localeCompare(b.date));
  } catch (err) {
    console.error(`[tourDates] Failed to fetch for ${artist.name}:`, err);
    return [];
  }
}

export async function fetchAllTourDates(
  artistList: Pick<Artist, "name" | "slug" | "tour">[]
): Promise<(TourDate & { artistName: string; artistSlug: string })[]> {
  const results = await Promise.all(
    artistList.map(async (artist) => {
      const dates = await fetchArtistTourDates(artist);
      return dates.map((d) => ({
        ...d,
        artistName: artist.name,
        artistSlug: artist.slug,
      }));
    })
  );
  return results.flat().sort((a, b) => a.date.localeCompare(b.date));
}
