import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { pick } from '@/lib/i18n-content';
import { getCategories } from '@/lib/queries';
import { PageHero, LinkCard } from '@/components/ui';

export default async function StudyPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const l = locale as Locale;
  const t = await getTranslations('study');
  const categories = await getCategories();

  return (
    <>
      <PageHero title={t('title')} subtitle={t('subtitle')} icon="book" />
      <div className="container-page py-12">
        <h2 className="section-title mb-6">{t('categories')}</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <LinkCard
              key={c.id}
              href={`/study/${c.slug}`}
              icon={c.icon}
              title={pick(c.title, l)}
              description={pick(c.description, l)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
