/** Static site-wide configuration for Civildz. */
export const site = {
  name: 'Civildz',
  // WhatsApp contact number (Algeria). Used for the floating contact button.
  whatsapp: '213540884354',
  whatsappDisplay: '0540884354',
  email: 'contact@civildz.com',
} as const;

export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
