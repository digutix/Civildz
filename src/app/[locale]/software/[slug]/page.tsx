import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import type { Locale } from '@/i18n/routing';
import { pick } from '@/lib/i18n-content';
import { getSoftwareArticleBySlug } from '@/lib/queries';
import { Badge } from '@/components/ui';
import { Icon } from '@/components/Icon';

export default async function SoftwareArticlePage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  setRequestLocale(locale);
  const l = locale as Locale;
  const t = await getTranslations('software');
  const tc = await getTranslations('common');

  const article = await getSoftwareArticleBySlug(slug);
  if (!article) notFound();

  return (
    <article className="container-page max-w-3xl py-10">
      <nav className="mb-6 flex items-center gap-2 text-sm text-slate-500">
        <Link href="/software" className="hover:text-brand-700">
          {t('title')}
        </Link>
        <span>/</span>
        <span>{article.software}</span>
      </nav>

      <Badge color="accent">{article.software}</Badge>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        {pick(article.title, l)}
      </h1>
      <p className="mt-3 text-lg text-slate-600">{pick(article.excerpt, l)}</p>
      <div className="rule-gold my-6 !bg-gradient-to-r !from-gold-400 !to-amber-200" />

      <div
        className="prose-content"
        dangerouslySetInnerHTML={{ __html: pick(article.content, l) }}
      />

      <div className="mt-8 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">
        <Icon name="document" width={20} height={20} className="mt-0.5 shrink-0" />
        <p>{t('disclaimer')}</p>
      </div>

      <div className="mt-8">
        <Link href="/software" className="btn-outline">
          <Icon name="arrow" width={16} height={16} className="rotate-180 rtl:rotate-0" />
          {tc('back')}
        </Link>
      </div>
    </article>
  );
}
