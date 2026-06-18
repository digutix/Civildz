import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link, routing } from '@/i18n/routing';
import type { Locale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import {
  getCalculator,
  interactiveCalculatorSlugs,
} from '@/lib/calculators/registry';
import { PageHero } from '@/components/ui';
import { CalculatorTemplate } from '@/components/calculators/CalculatorTemplate';
import { UnitConverter } from '@/components/calculators/UnitConverter';
import { Icon } from '@/components/Icon';

/** Pre-render every interactive calculator in every locale. */
export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    interactiveCalculatorSlugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  if (!interactiveCalculatorSlugs.includes(slug)) return {};
  const t = await getTranslations({ locale, namespace: `calc.${slug}` });
  return buildMetadata({
    locale: locale as Locale,
    title: t('title'),
    description: t('intro'),
    path: `/tools/${slug}`,
  });
}

export default async function CalculatorPage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  setRequestLocale(locale);
  if (!interactiveCalculatorSlugs.includes(slug)) notFound();

  const t = await getTranslations(`calc.${slug}`);
  const tc = await getTranslations('common');
  const def = getCalculator(slug);
  const icon = def?.icon ?? 'swap';

  return (
    <>
      <PageHero title={t('title')} subtitle={t('intro')} icon={icon} />
      <div className="container-page py-12">
        <Link href="/tools" className="btn-outline mb-8">
          <Icon name="arrow" width={16} height={16} className="rotate-180 rtl:rotate-0" />
          {tc('back')}
        </Link>

        {slug === 'unit-converter' ? (
          <UnitConverter />
        ) : def ? (
          <CalculatorTemplate slug={slug} />
        ) : null}
      </div>
    </>
  );
}
