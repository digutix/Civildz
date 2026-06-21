import { useTranslations } from 'next-intl';
import { FolderKanban, Gauge, Wallet, Users } from 'lucide-react';
import StatCard, { type StatCardProps } from './StatCard';

export default function StatsOverview() {
  const t = useTranslations('Dashboard');

  const stats: StatCardProps[] = [
    {
      label: t('stats.activeProjects'),
      value: '24',
      delta: 12,
      caption: t('trendUp'),
      icon: FolderKanban,
      accent: 'blue',
    },
    {
      label: t('stats.completion'),
      value: '78%',
      delta: 5,
      caption: t('trendUp'),
      icon: Gauge,
      accent: 'emerald',
    },
    {
      label: t('stats.revenue'),
      value: '$1.2M',
      delta: 8,
      caption: t('trendUp'),
      icon: Wallet,
      accent: 'gold',
    },
    {
      label: t('stats.team'),
      value: '46',
      delta: -2,
      caption: t('trendUp'),
      icon: Users,
      accent: 'violet',
    },
  ];

  return (
    <section
      aria-label={t('greeting')}
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </section>
  );
}
