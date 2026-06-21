import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

import DashboardStats from '@/components/DashboardStats';
import RecentActivity from '@/components/RecentActivity';
import InsightsPanel from '@/components/InsightsPanel';

// NOTE: <Sidebar /> and <Header /> are intentionally NOT imported here.
// They live in the shell at app/[locale]/layout.tsx, which wraps every page.
// This page only renders the CONTENT that goes inside the layout's <main>.
// Adding <Sidebar /> here would render a second, duplicate sidebar.

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

      {/* Stats overview — 4 glass stat cards with Lucide icons */}
      <DashboardStats />

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
