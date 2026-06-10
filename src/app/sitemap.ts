import { MetadataRoute } from "next";
import { artists } from "@/lib/data/artists";
import { articles } from "@/lib/data/news";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://bigmachinerecords.com";
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/artists`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/news`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/videos`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/tour`, changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/sync`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/contact`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/careers`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const artistPages: MetadataRoute.Sitemap = artists.map((a) => ({
    url: `${baseUrl}/artists/${a.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const newsPages: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${baseUrl}/news/${a.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...artistPages, ...newsPages].map((page) => ({
    ...page,
    lastModified: now,
  }));
}
