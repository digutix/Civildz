import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import type { Locale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import { pick } from '@/lib/i18n-content';
import { getLessonBySlug } from '@/lib/queries';
import { Icon } from '@/components/Icon';

export async function generateMetadata({
  params: { locale, category, lesson },
}: {
  params: { locale: string; category: string; lesson: string };
}): Promise<Metadata> {
  const l = locale as Locale;
  const data = await getLessonBySlug(lesson);
  if (!data) return {};
  return buildMetadata({
    locale: l,
    title: pick(data.title, l),
    description: pick(data.summary, l).replace(/\n/g, ' ').slice(0, 160),
    path: `/study/${category}/${lesson}`,
  });
}

/** Convert a YouTube watch/share URL into an embeddable URL. */
function toEmbed(url: string): string {
  const yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]+)/);
  return yt ? `https://www.youtube.com/embed/${yt[1]}` : url;
}

export default async function LessonPage({
  params: { locale, category, lesson },
}: {
  params: { locale: string; category: string; lesson: string };
}) {
  setRequestLocale(locale);
  const l = locale as Locale;
  const t = await getTranslations('study');
  const tc = await getTranslations('common');

  const data = await getLessonBySlug(lesson);
  if (!data || data.category.slug !== category) notFound();

  return (
    <article className="container-page py-10">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-slate-500">
        <Link href="/study" className="hover:text-brand-700">
          {t('title')}
        </Link>
        <span>/</span>
        <Link href={`/study/${category}`} className="hover:text-brand-700">
          {pick(data.category.title, l)}
        </Link>
      </nav>

      <header className="mb-8">
        <div className="rule-gold mb-4 !bg-gradient-to-r !from-gold-400 !to-amber-200" />
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          {pick(data.title, l)}
        </h1>
      </header>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          {/* Lesson body */}
          <section className="card p-6">
            <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-slate-900">
              <Icon name="book" width={20} height={20} className="text-brand-600" />
              {t('lesson')}
            </h2>
            <div
              className="prose-content"
              dangerouslySetInnerHTML={{ __html: pick(data.content, l) }}
            />
          </section>

          {/* Video */}
          {data.videoUrl && (
            <section className="card p-6">
              <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-slate-900">
                <Icon name="play" width={20} height={20} className="text-brand-600" />
                {t('video')}
              </h2>
              <div className="aspect-video overflow-hidden rounded-xl bg-slate-900">
                <iframe
                  src={toEmbed(data.videoUrl)}
                  title={pick(data.title, l)}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </section>
          )}

          {/* Solved exercises */}
          {data.exercises.length > 0 && (
            <section>
              <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
                <Icon name="calculator" width={20} height={20} className="text-brand-600" />
                {t('exercises')}
              </h2>
              <div className="space-y-4">
                {data.exercises.map((ex, i) => (
                  <div key={ex.id} className="card p-5">
                    <h3 className="font-semibold text-slate-900">
                      {t('exercise')} {i + 1} — {pick(ex.title, l)}
                    </h3>
                    <div className="mt-3 rounded-xl bg-slate-50 p-4">
                      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                        {t('problem')}
                      </p>
                      <div className="prose-content mt-1 whitespace-pre-line text-sm">
                        {pick(ex.problem, l)}
                      </div>
                    </div>
                    <details className="mt-3 rounded-xl border border-green-200 bg-green-50 p-4">
                      <summary className="cursor-pointer text-sm font-bold uppercase tracking-wide text-green-700">
                        {t('solution')}
                      </summary>
                      <div className="prose-content mt-2 whitespace-pre-line text-sm">
                        {pick(ex.solution, l)}
                      </div>
                    </details>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Summary sidebar */}
        <aside className="lg:col-span-1">
          <div className="sticky top-20 rounded-2xl border border-gold-400/30 bg-gradient-to-br from-navy-900 to-navy-800 p-6 text-white">
            <h2 className="flex items-center gap-2 text-lg font-bold text-gold-300">
              <Icon name="document" width={20} height={20} />
              {t('summary')}
            </h2>
            <div className="rule-gold my-3" />
            <div className="prose-content !text-slate-200 whitespace-pre-line text-sm [&_*]:!text-slate-200">
              {pick(data.summary, l)}
            </div>
            {data.videoUrl && (
              <a
                href="#"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold-300 hover:text-gold-400"
              >
                <Icon name="play" width={16} height={16} />
                {t('watchVideo')}
              </a>
            )}
          </div>
        </aside>
      </div>

      <div className="mt-10">
        <Link href={`/study/${category}`} className="btn-outline">
          <Icon name="arrow" width={16} height={16} className="rotate-180 rtl:rotate-0" />
          {tc('back')}
        </Link>
      </div>
    </article>
  );
}
