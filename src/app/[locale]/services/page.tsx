import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import type { Locale } from '@/i18n/routing';
import { pick, pickList } from '@/lib/i18n-content';
import { getServices } from '@/lib/queries';
import { PageHero } from '@/components/ui';
import { Icon } from '@/components/Icon';

export default async function ServicesPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const l = locale as Locale;
  const t = await getTranslations('services');
  const services = await getServices();

  return (
    <>
      <PageHero title={t('title')} subtitle={t('subtitle')} icon="globe" />
      <div className="container-page py-12">
        <div className="grid gap-6 lg:grid-cols-3">
          {services.map((s) => {
            const features = pickList(s.features, l);
            return (
              <div key={s.id} className="card flex flex-col p-6">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-navy-900 to-navy-800 text-gold-300">
                  <Icon name={s.icon} width={24} height={24} />
                </span>
                <h3 className="mt-4 text-lg font-bold text-slate-900">{pick(s.title, l)}</h3>
                <p className="mt-1 text-sm text-slate-600">{pick(s.description, l)}</p>

                {features.length > 0 && (
                  <ul className="mt-4 space-y-2 text-sm text-slate-700">
                    {features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1 text-gold-500">
                          <Icon name="arrow" width={14} height={14} className="rtl:rotate-180" />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                  {s.priceFrom ? (
                    <div className="text-sm">
                      <span className="text-slate-500">{t('startingFrom')}</span>
                      <div className="font-bold text-slate-900">
                        {s.priceFrom.toLocaleString()} {t('currency')}
                      </div>
                    </div>
                  ) : (
                    <span />
                  )}
                  <Link href="/services/quote" className="btn-primary px-4 py-2 text-sm">
                    {t('requestQuote')}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
