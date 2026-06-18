import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site.config';
import { routing } from '@/i18n/routing';
import { prisma } from '@/lib/db';

/**
 * Generates the sitemap for every locale: static section pages plus all
 * database-driven content (subjects, lessons, software guides, articles).
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, lessons, software, articles] = await Promise.all([
    prisma.category.findMany({ select: { slug: true } }),
    prisma.lesson.findMany({ select: { slug: true, category: { select: { slug: true } } } }),
    prisma.softwareArticle.findMany({ select: { slug: true } }),
    prisma.article.findMany({ select: { slug: true } }),
  ]);

  // Locale-agnostic paths; each is expanded across all languages below.
  const paths = [
    '',
    '/study',
    '/tools',
    '/tools/concrete-calculator',
    '/software',
    '/jobs',
    '/services',
    '/services/quote',
    ...categories.map((c) => `/study/${c.slug}`),
    ...lessons.map((l) => `/study/${l.category.slug}/${l.slug}`),
    ...software.map((s) => `/software/${s.slug}`),
    ...articles.map((a) => `/articles/${a.slug}`),
  ];

  const now = new Date();
  return paths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: `${siteConfig.url}/${locale}${path}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${siteConfig.url}/${l}${path}`]),
        ),
      },
    })),
  );
}
