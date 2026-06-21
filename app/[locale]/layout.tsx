import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';

import { routing, getDirection, type Locale } from '@/i18n/routing';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'CivilDZ — Engineering Platform',
  description:
    'A luxurious command center for civil engineering teams: projects, analytics and compliance in one place.',
};

// Pre-render every supported locale at build time.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Reject unknown locales.
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  // Enable static rendering for this locale.
  setRequestLocale(locale);

  const messages = await getMessages();
  const dir = getDirection(locale);

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body className={`${inter.variable} font-sans bg-ambient min-h-screen`}>
        <NextIntlClientProvider messages={messages}>
          {/* App shell: fixed-height viewport with an independently scrolling main area */}
          <div className="flex h-screen overflow-hidden">
            <Sidebar />

            <div className="flex min-w-0 flex-1 flex-col">
              <Header />
              <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
                {children}
              </main>
            </div>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
