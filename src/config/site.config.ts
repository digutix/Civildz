/**
 * ───────────────────────────────────────────────────────────────────────────
 *  CIVILDZ — CENTRAL SITE CONFIGURATION
 * ───────────────────────────────────────────────────────────────────────────
 *  This is the single place to edit site-wide settings WITHOUT touching the
 *  design or page code. Change a value here and it updates everywhere.
 *
 *  ▸ Contact details (WhatsApp, email, phone)
 *  ▸ Business location (used for local SEO — e.g. "engineering services in Jijel")
 *  ▸ SEO keywords per language
 *
 *  Editable database content (service prices, lesson video links, articles…)
 *  lives in `src/content/` — see `src/content/README.md`.
 * ───────────────────────────────────────────────────────────────────────────
 */

import type { Locale } from '@/i18n/routing';

export const siteConfig = {
  /** Brand name shown in the header, footer and browser tab. */
  name: 'Civildz',

  /** Public production URL — used to build absolute SEO/Open-Graph links. */
  url: 'https://civildz.com',

  /** ── Contact details ──────────────────────────────────────────────── */
  contact: {
    // WhatsApp number in full international format (Algeria = 213).
    whatsapp: '213540884354',
    // Human-friendly version shown on the page.
    whatsappDisplay: '0540884354',
    email: 'contact@civildz.com',
  },

  /** ── Business location (drives local SEO) ─────────────────────────── */
  location: {
    city: 'Jijel',
    region: 'Jijel',
    country: 'Algeria',
    countryCode: 'DZ',
  },

  /**
   * ── SEO keywords per language ───────────────────────────────────────
   * Add or remove phrases your audience searches for. These are injected
   * into every page's <meta name="keywords"> and reinforced in titles.
   */
  keywords: {
    en: [
      'engineering services in Jijel',
      'engineering calculators',
      'civil engineering',
      'concrete calculator',
      'structural engineering Algeria',
      'engineering tools',
      'reinforced concrete',
      'website design for engineers',
    ],
    ar: [
      'خدمات هندسية في جيجل',
      'حاسبات هندسية',
      'الهندسة المدنية',
      'حاسبة الخرسانة',
      'أدوات هندسية',
      'تصميم مواقع للمهندسين',
    ],
    fr: [
      'services d’ingénierie à Jijel',
      'calculatrices d’ingénierie',
      'génie civil',
      'calculatrice de béton',
      'ingénierie structurale Algérie',
      'outils d’ingénierie',
      'création de site pour ingénieurs',
    ],
  } satisfies Record<Locale, string[]>,
} as const;

export type SiteConfig = typeof siteConfig;
