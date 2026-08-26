import { MetadataRoute } from 'next';
import { products } from '@/content/products';
import { collections } from '@/content/collections';
import { journalArticles } from '@/content/journal';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://bidricrafts.com';

  const productUrls = products.map((p) => ({
    url: `${baseUrl}/product/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const collectionUrls = collections.map((c) => ({
    url: `${baseUrl}/collections/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const journalUrls = journalArticles.map((j) => ({
    url: `${baseUrl}/journal/${j.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const staticUrls = [
    '',
    '/collections',
    '/craft',
    '/artisans',
    '/heritage',
    '/bespoke',
    '/gifting',
    '/authenticity',
    '/journal',
    '/about',
    '/contact',
    '/faq',
    '/care-guide',
    '/shipping',
    '/returns',
    '/privacy',
    '/terms',
    '/account',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  return [...staticUrls, ...collectionUrls, ...productUrls, ...journalUrls];
}
