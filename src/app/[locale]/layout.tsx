import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { routing, isRtl, type Locale } from '@/i18n/routing';
import { siteConfig } from '@/config/site.config';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import '../globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0b1220',
};

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = params.locale as Locale;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: t('title'),
      template: `%s · Civildz`,
    },
    description: t('description'),
    keywords: siteConfig.keywords[locale] ?? siteConfig.keywords.en,
    applicationName: siteConfig.name,
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(routing.locales.map((l) => [l, `/${l}`])),
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `/${locale}`,
      siteName: siteConfig.name,
      locale,
      type: 'website',
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = isRtl(locale) ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir}>
      <body className="flex min-h-screen flex-col">
        <NextIntlClientProvider messages={messages}>
          <Header locale={locale as Locale} />
          <main className="flex-1">{children}</main>
          <Footer locale={locale as Locale} />
          <WhatsAppButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
