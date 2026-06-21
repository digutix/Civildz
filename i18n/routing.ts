import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // Supported locales — Arabic (RTL) and English/French (LTR).
  locales: ['en', 'ar', 'fr'],
  defaultLocale: 'en',
});

export type Locale = (typeof routing.locales)[number];

// Locales that render right-to-left.
export const rtlLocales: Locale[] = ['ar'];

export const getDirection = (locale: string): 'rtl' | 'ltr' =>
  rtlLocales.includes(locale as Locale) ? 'rtl' : 'ltr';
