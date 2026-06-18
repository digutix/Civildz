import { siteConfig } from '@/config/site.config';

/**
 * Convenience accessor for site-wide settings.
 * Edit the actual values in `src/config/site.config.ts`.
 */
export const site = {
  name: siteConfig.name,
  url: siteConfig.url,
  whatsapp: siteConfig.contact.whatsapp,
  whatsappDisplay: siteConfig.contact.whatsappDisplay,
  email: siteConfig.contact.email,
  city: siteConfig.location.city,
} as const;

export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
