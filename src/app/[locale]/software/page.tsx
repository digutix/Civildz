import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import { pick } from '@/lib/i18n-content';
import { getSoftwareArticles } from '@/lib/queries';
import { PageHero, LinkCard, Badge } from '@/components/ui';
import { Icon } from '@/components/Icon';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'seo.software' });
  return buildMetadata({
    locale: locale as Locale,
    title: t('title'),
    description: t('description'),
    path: '/software',
  });
}

export default async function SoftwarePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const l = locale as Locale;
  const t = await getTranslations('software');
  const articles = await getSoftwareArticles();

  return (
    <>
      <PageHero title={t('title')} subtitle={t('subtitle')} icon="monitor" />
      <div className="container-page py-12">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <LinkCard
              key={a.id}
              href={`/software/${a.slug}`}
              icon="monitor"
              title={pick(a.title, l)}
              description={pick(a.excerpt, l)}
              badge={<Badge color="accent">{a.software}</Badge>}
            />
          ))}
        </div>

        {/* Legal disclaimer */}
        <div className="mt-10 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">
          <Icon name="document" width={20} height={20} className="mt-0.5 shrink-0" />
          <p>{t('disclaimer')}</p>
        </div>
      </div>
    </>
  );
}
