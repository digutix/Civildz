import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';

export default async function NotFound() {
  const t = await getTranslations('nav');
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="text-7xl font-extrabold text-brand-600">404</p>
      <p className="mt-4 text-lg text-slate-600">Page not found.</p>
      <Link href="/" className="btn-primary mt-6">
        {t('home')}
      </Link>
    </div>
  );
}
