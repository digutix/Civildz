import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import type { Locale } from '@/i18n/routing';
import { pick } from '@/lib/i18n-content';
import { getArticleBySlug } from '@/lib/queries';
import { Icon } from '@/components/Icon';

export default async function ArticlePage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  setRequestLocale(locale);
  const l = locale as Locale;
  const tc = await getTranslations('common');

  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const date = new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(article.publishedAt);

  return (
    <article className="container-page max-w-3xl py-10">
      <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-brand-700">
        <Icon name="arrow" width={16} height={16} className="rotate-180 rtl:rotate-0" />
        {tc('back')}
      </Link>
      <p className="text-sm text-slate-500">{date}</p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        {pick(article.title, l)}
      </h1>
      <p className="mt-3 text-lg text-slate-600">{pick(article.excerpt, l)}</p>
      <div className="rule-gold my-6 !bg-gradient-to-r !from-gold-400 !to-amber-200" />
      <div
        className="prose-content"
        dangerouslySetInnerHTML={{ __html: pick(article.content, l) }}
      />
    </article>
  );
}
