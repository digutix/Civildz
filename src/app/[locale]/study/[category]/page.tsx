import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import type { Locale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import { pick, parseJson } from '@/lib/i18n-content';
import { getCategoryBySlug } from '@/lib/queries';
import { PageHero, Badge } from '@/components/ui';
import { Icon } from '@/components/Icon';

export async function generateMetadata({
  params: { locale, category },
}: {
  params: { locale: string; category: string };
}): Promise<Metadata> {
  const l = locale as Locale;
  const cat = await getCategoryBySlug(category);
  if (!cat) return {};
  return buildMetadata({
    locale: l,
    title: pick(cat.title, l),
    description: pick(cat.description, l),
    path: `/study/${category}`,
  });
}

export default async function CategoryPage({
  params: { locale, category },
}: {
  params: { locale: string; category: string };
}) {
  setRequestLocale(locale);
  const l = locale as Locale;
  const t = await getTranslations('study');
  const tc = await getTranslations('common');
  const useMinutes = tc('minutes');

  const cat = await getCategoryBySlug(category);
  if (!cat) notFound();

  return (
    <>
      <PageHero title={pick(cat.title, l)} subtitle={pick(cat.description, l)} icon={cat.icon} />
      <div className="container-page space-y-12 py-12">
        {/* Lessons */}
        <section>
          <h2 className="section-title mb-6">{t('lessons')}</h2>
          {cat.lessons.length === 0 ? (
            <p className="text-slate-600">{t('noLessons')}</p>
          ) : (
            <div className="grid gap-4">
              {cat.lessons.map((lesson, i) => (
                <Link
                  key={lesson.id}
                  href={`/study/${cat.slug}/${lesson.slug}`}
                  className="card group flex items-center gap-4 p-5"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 font-bold text-brand-700">
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-slate-900 group-hover:text-brand-700">
                      {pick(lesson.title, l)}
                    </h3>
                    <p className="line-clamp-1 text-sm text-slate-600">{pick(lesson.summary, l)}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    {lesson.videoUrl && (
                      <span className="hidden text-slate-400 sm:block">
                        <Icon name="play" width={16} height={16} />
                      </span>
                    )}
                    <Icon name="arrow" width={18} height={18} className="text-slate-400 rtl:rotate-180" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Exams */}
        {cat.exams.length > 0 && (
          <section>
            <h2 className="section-title mb-6">{t('exams')}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {cat.exams.map((exam) => {
                const examContent = parseJson<{ questions?: unknown; solutions?: unknown }>(
                  exam.content,
                );
                return (
                <div key={exam.id} className="card p-5">
                  <Badge color="accent">
                    {exam.durationMin} {useMinutes}
                  </Badge>
                  <h3 className="mt-2 font-semibold text-slate-900">{pick(exam.title, l)}</h3>
                  <p className="mt-1 text-sm text-slate-600">{pick(exam.description, l)}</p>
                  <details className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <summary className="cursor-pointer text-sm font-semibold text-brand-700">
                      {t('problem')}
                    </summary>
                    <div className="prose-content mt-3 whitespace-pre-line text-sm">
                      {pick(examContent.questions, l)}
                    </div>
                  </details>
                  <details className="mt-2 rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <summary className="cursor-pointer text-sm font-semibold text-green-700">
                      {t('solution')}
                    </summary>
                    <div className="prose-content mt-3 whitespace-pre-line text-sm">
                      {pick(examContent.solutions, l)}
                    </div>
                  </details>
                </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
