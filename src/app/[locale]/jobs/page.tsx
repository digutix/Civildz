import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import { pick } from '@/lib/i18n-content';
import { getJobs } from '@/lib/queries';
import { PageHero, Badge } from '@/components/ui';
import { Icon } from '@/components/Icon';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'seo.jobs' });
  return buildMetadata({
    locale: locale as Locale,
    title: t('title'),
    description: t('description'),
    path: '/jobs',
  });
}

const typeColor: Record<string, string> = {
  training: 'green',
  competition: 'accent',
  tip: 'brand',
  job: 'slate',
};

export default async function JobsPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const l = locale as Locale;
  const t = await getTranslations('jobs');
  const jobs = await getJobs();

  const fmtDate = (d: Date) =>
    new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(d);

  return (
    <>
      <PageHero title={t('title')} subtitle={t('subtitle')} icon="briefcase" />
      <div className="container-page py-12">
        <div className="grid gap-5">
          {jobs.map((job) => (
            <div key={job.id} className="card p-6">
              <div className="flex flex-wrap items-center gap-2">
                <Badge color={typeColor[job.type] ?? 'brand'}>{t(job.type as any)}</Badge>
                {job.location && (
                  <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                    <Icon name="globe" width={14} height={14} />
                    {job.location}
                  </span>
                )}
                {job.deadline && (
                  <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                    <Icon name="document" width={14} height={14} />
                    {t('deadline')}: {fmtDate(job.deadline)}
                  </span>
                )}
              </div>
              <h3 className="mt-3 text-lg font-bold text-slate-900">{pick(job.title, l)}</h3>
              <p className="mt-1 text-slate-600">{pick(job.excerpt, l)}</p>
              <div
                className="prose-content mt-4 border-t border-slate-100 pt-4 text-sm"
                dangerouslySetInnerHTML={{ __html: pick(job.content, l) }}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
