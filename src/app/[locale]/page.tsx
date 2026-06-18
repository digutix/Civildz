import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import type { Locale } from '@/i18n/routing';
import { pick } from '@/lib/i18n-content';
import {
  getArticles,
  getCategories,
  getExams,
  getServices,
  getSoftwareArticles,
  getTools,
} from '@/lib/queries';
import { SectionHeader, LinkCard, Badge } from '@/components/ui';
import { Icon } from '@/components/Icon';

export default async function HomePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const l = locale as Locale;
  const t = await getTranslations('home');
  const tc = await getTranslations('common');
  const tn = await getTranslations('nav');

  const [categories, tools, software, exams, services, tutorials, featured] = await Promise.all([
    getCategories(),
    getTools(),
    getSoftwareArticles(),
    getExams(3),
    getServices(),
    getArticles({ take: 3 }),
    getArticles({ featured: true, take: 3 }),
  ]);

  return (
    <>
      {/* ---- Hero --------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-geometric text-white">
        <div className="absolute inset-0 bg-facets" aria-hidden="true" />
        <div className="container-page relative grid gap-10 py-20 sm:py-28 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold-300 backdrop-blur">
              {t('hero.badge')}
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {t('hero.title')}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-slate-300">{t('hero.subtitle')}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/study" className="btn-gold px-6 py-3 text-base">
                <Icon name="book" width={18} height={18} />
                {t('hero.ctaStudy')}
              </Link>
              <Link href="/tools" className="btn px-6 py-3 text-base glass text-white hover:bg-white/10">
                <Icon name="calculator" width={18} height={18} />
                {t('hero.ctaTools')}
              </Link>
            </div>
          </div>

          {/* Geometric stat panel */}
          <div className="lg:col-span-5">
            <div className="glass rounded-3xl p-6">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '5', label: tn('study'), icon: 'beam' },
                  { value: '6', label: tn('tools'), icon: 'calculator' },
                  { value: '4', label: tn('software'), icon: 'monitor' },
                  { value: '3', label: tn('services'), icon: 'globe' },
                ].map((s, i) => (
                  <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-gold-400/15 text-gold-300">
                      <Icon name={s.icon} width={20} height={20} />
                    </span>
                    <div className="mt-3 text-2xl font-extrabold text-white">{s.value}</div>
                    <div className="text-xs text-slate-400">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container-page space-y-20 py-16">
        {/* ---- Study subjects ---------------------------------------------- */}
        <section>
          <SectionHeader
            title={t('tutorials.title')}
            subtitle={t('tutorials.subtitle')}
            viewAllHref="/study"
            viewAllLabel={tc('viewAll')}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.slice(0, 6).map((c) => (
              <LinkCard
                key={c.id}
                href={`/study/${c.slug}`}
                icon={c.icon}
                title={pick(c.title, l)}
                description={pick(c.description, l)}
              />
            ))}
          </div>
        </section>

        {/* ---- Engineering tools ------------------------------------------- */}
        <section>
          <SectionHeader
            title={t('tools.title')}
            subtitle={t('tools.subtitle')}
            viewAllHref="/tools"
            viewAllLabel={tc('viewAll')}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <LinkCard
                key={tool.id}
                href={tool.interactive ? `/tools/${tool.slug}` : '/tools'}
                icon={tool.icon}
                title={pick(tool.name, l)}
                description={pick(tool.description, l)}
                badge={
                  tool.interactive ? (
                    <Badge color="green">{tc('open')}</Badge>
                  ) : (
                    <Badge color="slate">{tc('comingSoon')}</Badge>
                  )
                }
              />
            ))}
          </div>
        </section>

        {/* ---- Engineering software ---------------------------------------- */}
        <section>
          <SectionHeader
            title={t('software.title')}
            subtitle={t('software.subtitle')}
            viewAllHref="/software"
            viewAllLabel={tc('viewAll')}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {software.map((s) => (
              <LinkCard
                key={s.id}
                href={`/software/${s.slug}`}
                icon="monitor"
                title={pick(s.title, l)}
                description={pick(s.excerpt, l)}
                badge={<Badge color="accent">{s.software}</Badge>}
              />
            ))}
          </div>
        </section>

        {/* ---- Exams ------------------------------------------------------- */}
        {exams.length > 0 && (
          <section>
            <SectionHeader
              title={t('exams.title')}
              subtitle={t('exams.subtitle')}
              viewAllHref="/study"
              viewAllLabel={tc('viewAll')}
            />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {exams.map((e) => (
                <LinkCard
                  key={e.id}
                  href={`/study/${e.category.slug}`}
                  icon="document"
                  title={pick(e.title, l)}
                  description={pick(e.description, l)}
                  badge={<Badge>{pick(e.category.title, l)}</Badge>}
                />
              ))}
            </div>
          </section>
        )}

        {/* ---- Website services banner ------------------------------------- */}
        <section className="relative overflow-hidden rounded-3xl bg-geometric p-8 text-white sm:p-12">
          <div className="absolute inset-0 bg-facets" aria-hidden="true" />
          <div className="relative flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="rule-gold mb-4" />
              <h2 className="text-2xl font-bold sm:text-3xl">{t('services.title')}</h2>
              <p className="mt-2 text-slate-300">{t('services.subtitle')}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {services.map((s) => (
                  <span
                    key={s.id}
                    className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-slate-200"
                  >
                    {pick(s.title, l)}
                  </span>
                ))}
              </div>
            </div>
            <Link href="/services/quote" className="btn-gold px-6 py-3 text-base">
              <Icon name="document" width={18} height={18} />
              {t('services.cta')}
            </Link>
          </div>
        </section>

        {/* ---- Featured articles ------------------------------------------- */}
        {featured.length > 0 && (
          <section>
            <SectionHeader title={t('featured.title')} subtitle={t('featured.subtitle')} />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((a) => (
                <LinkCard
                  key={a.id}
                  href={`/articles/${a.slug}`}
                  icon="book"
                  title={pick(a.title, l)}
                  description={pick(a.excerpt, l)}
                  badge={<Badge color="accent">★</Badge>}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
