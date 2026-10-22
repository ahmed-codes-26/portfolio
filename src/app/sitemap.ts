import type { MetadataRoute } from 'next';
import { projects, siteUrl } from '@/lib/content';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap { return [{ url: siteUrl, changeFrequency: 'monthly', priority: 1 }, ...projects.map(p => ({ url: `${siteUrl}/work/${p.slug}/`, changeFrequency: 'monthly' as const, priority: .8 }))]; }
