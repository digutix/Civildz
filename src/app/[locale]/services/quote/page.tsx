import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import { pick } from '@/lib/i18n-content';
import { getServices } from '@/lib/queries';
import { PageHero } from '@/components/ui';
import { QuoteForm } from '@/components/QuoteForm';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'seo.quote' });
  return buildMetadata({
    locale: locale as Locale,
    title: t('title'),
    description: t('description'),
    path: '/services/quote',
  });
}

export default async function QuotePage({
  params: { locale },
  searchParams,
}: {
  params: { locale: string };
  searchParams: { ref?: string; estimate?: string };
}) {
  setRequestLocale(locale);
  const l = locale as Locale;
  const t = await getTranslations('quote');
  const services = await getServices();

  const serviceOptions = services.map((s) => ({ value: s.slug, label: pick(s.title, l) }));

  // An estimate piped from a calculator is pre-filled into the message so the
  // request still flows through the existing /api/quote endpoint unchanged.
  const estimate = typeof searchParams.estimate === 'string' ? searchParams.estimate : '';
  const defaultMessage = estimate
    ? `${t('estimateHeading')}\n${estimate}\n\n`
    : '';

  return (
    <>
      <PageHero title={t('title')} subtitle={t('subtitle')} icon="document" />
      <div className="container-page max-w-3xl py-12">
        <QuoteForm serviceOptions={serviceOptions} defaultMessage={defaultMessage} />
      </div>
    </>
  );
}
