import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

import StatsOverview from '@/components/StatsOverview';
import RecentActivity from '@/components/RecentActivity';
import InsightsPanel from '@/components/InsightsPanel';

export default function DashboardPage({
  params,
}: {
  params: { locale: string };
}) {
  // Keep this route statically renderable for each locale.
  setRequestLocale(params.locale);

  const t = useTranslations('Dashboard');

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      {/* Page heading */}
      <header className="animate-fade-up">
        <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          {t('greeting')}
        </h1>
        <p className="mt-1 text-sm text-slate-400">{t('subtitle')}</p>
      </header>

      {/* Stats overview */}
      <StatsOverview />

      {/* Responsive 3-column grid: activity spans 2 cols, insights take the third */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
        <div className="lg:col-span-1">
          <InsightsPanel />
        </div>
      </div>
    </div>
  );
}
