import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const locales = ['en', 'ar', 'fr'] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: 'en',
  localePrefix: 'always',
});

// Locales that are written right-to-left.
export const rtlLocales: Locale[] = ['ar'];

export function isRtl(locale: string): boolean {
  return rtlLocales.includes(locale as Locale);
}

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
