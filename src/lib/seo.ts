import type { Metadata } from 'next';
import { siteConfig } from '@/config/site.config';
import { routing, type Locale } from '@/i18n/routing';

interface BuildMetadataOptions {
  locale: Locale;
  /** Page-specific title (the brand name is appended automatically). */
  title: string;
  description: string;
  /** Path without the locale prefix, e.g. '/tools' or '/study/steel'. */
  path?: string;
  /** Extra page-specific keywords, merged with the site-wide ones. */
  keywords?: string[];
}

/**
 * Builds a complete, SEO-friendly Metadata object for a page:
 * localized title/description, keywords (incl. the site-wide ones such as
 * "engineering services in Jijel" / "engineering calculators"), a canonical
 * URL, hreflang alternates for every language, and Open-Graph/Twitter tags.
 */
export function buildMetadata({
  locale,
  title,
  description,
  path = '',
  keywords = [],
}: BuildMetadataOptions): Metadata {
  const url = `${siteConfig.url}/${locale}${path}`;
  const allKeywords = Array.from(new Set([...keywords, ...siteConfig.keywords[locale]]));

  // hreflang alternates — one absolute URL per supported language.
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `${siteConfig.url}/${l}${path}`]),
  );

  return {
    // Absolute title (with brand) so every page is consistent, including the
    // homepage — the parent layout's title template only covers child segments.
    title: { absolute: `${title} · ${siteConfig.name}` },
    description,
    keywords: allKeywords,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title: `${title} · ${siteConfig.name}`,
      description,
      url,
      siteName: siteConfig.name,
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} · ${siteConfig.name}`,
      description,
    },
  };
}
