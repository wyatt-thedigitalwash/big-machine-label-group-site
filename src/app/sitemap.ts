import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://DOMAIN.com';
  return [
    { url: baseUrl, changeFrequency: 'weekly' as const, priority: 1.0 },
  ].map(page => ({ ...page, lastModified: new Date() }));
}
