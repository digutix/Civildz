import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import type { Locale } from '@/i18n/routing';
import { site, whatsappLink } from '@/lib/site';
import { Icon } from './Icon';

const sectionLinks = [
  { href: '/study', key: 'study' },
  { href: '/tools', key: 'tools' },
  { href: '/software', key: 'software' },
  { href: '/jobs', key: 'jobs' },
  { href: '/services', key: 'services' },
] as const;

export function Footer({ locale }: { locale: Locale }) {
  const t = useTranslations();

  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="container-page grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-2">
          <div className="flex items-center gap-2 font-extrabold text-brand-700">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-600 text-white">
              C
            </span>
            <span className="text-lg">Civildz</span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-slate-600">{t('footer.tagline')}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-900">{t('footer.sections')}</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {sectionLinks.map((l) => (
              <li key={l.key}>
                <Link href={l.href} className="text-slate-600 hover:text-brand-700">
                  {t(`nav.${l.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-900">{t('footer.contact')}</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-slate-600 hover:text-green-600"
              >
                <Icon name="whatsapp" width={16} height={16} />
                {site.whatsappDisplay}
              </a>
            </li>
            <li className="text-slate-600">{site.email}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-100">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-4 text-xs text-slate-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Civildz. {t('footer.rights')}
          </p>
          <p>{t('footer.builtWith')}</p>
        </div>
      </div>
    </footer>
  );
}
