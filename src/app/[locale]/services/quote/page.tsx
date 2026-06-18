import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { pick } from '@/lib/i18n-content';
import { getServices } from '@/lib/queries';
import { PageHero } from '@/components/ui';
import { QuoteForm } from '@/components/QuoteForm';

export default async function QuotePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const l = locale as Locale;
  const t = await getTranslations('quote');
  const services = await getServices();

  const serviceOptions = services.map((s) => ({ value: s.slug, label: pick(s.title, l) }));

  return (
    <>
      <PageHero title={t('title')} subtitle={t('subtitle')} icon="document" />
      <div className="container-page max-w-3xl py-12">
        <QuoteForm serviceOptions={serviceOptions} />
      </div>
    </>
  );
}
