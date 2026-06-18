import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import type { Locale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import { PageHero } from '@/components/ui';
import { ConcreteCalculator } from '@/components/ConcreteCalculator';
import { Icon } from '@/components/Icon';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'seo.concrete' });
  return buildMetadata({
    locale: locale as Locale,
    title: t('title'),
    description: t('description'),
    path: '/tools/concrete-calculator',
  });
}

export default async function ConcreteCalculatorPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations('tools.concrete');
  const tc = await getTranslations('common');

  return (
    <>
      <PageHero title={t('title')} subtitle={t('intro')} icon="cube" />
      <div className="container-page py-12">
        <Link href="/tools" className="btn-outline mb-8">
          <Icon name="arrow" width={16} height={16} className="rotate-180 rtl:rotate-0" />
          {tc('back')}
        </Link>
        <ConcreteCalculator />
      </div>
    </>
  );
}
