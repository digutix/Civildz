import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';

type StatusKey = 'active' | 'review' | 'completed' | 'delayed';

type Row = {
  project: string;
  ref: string;
  owner: string;
  initials: string;
  status: StatusKey;
  progress: number;
  updated: string;
};

const ROWS: Row[] = [
  {
    project: 'Algiers Metro Extension',
    ref: 'CVZ-2041',
    owner: 'Amina K.',
    initials: 'AK',
    status: 'active',
    progress: 64,
    updated: '2h ago',
  },
  {
    project: 'Oran Coastal Bridge',
    ref: 'CVZ-1987',
    owner: 'Karim D.',
    initials: 'KD',
    status: 'review',
    progress: 88,
    updated: '5h ago',
  },
  {
    project: 'Constantine Water Grid',
    ref: 'CVZ-2103',
    owner: 'Sofia M.',
    initials: 'SM',
    status: 'completed',
    progress: 100,
    updated: '1d ago',
  },
  {
    project: 'Sahara Solar Substation',
    ref: 'CVZ-2150',
    owner: 'Yanis T.',
    initials: 'YT',
    status: 'delayed',
    progress: 32,
    updated: '2d ago',
  },
];

const STATUS_STYLES: Record<StatusKey, string> = {
  active: 'bg-brand-blue/15 text-brand-glow ring-brand-glow/30',
  review: 'bg-gold/15 text-gold-soft ring-gold/30',
  completed: 'bg-emerald-500/15 text-emerald-300 ring-emerald-400/30',
  delayed: 'bg-rose-500/15 text-rose-300 ring-rose-400/30',
};

const PROGRESS_STYLES: Record<StatusKey, string> = {
  active: 'from-brand-blue to-brand-glow',
  review: 'from-gold to-gold-soft',
  completed: 'from-emerald-500 to-emerald-400',
  delayed: 'from-rose-500 to-rose-400',
};

export default function RecentActivity() {
  const t = useTranslations('Dashboard.activity');
  const ts = useTranslations('Dashboard.status');

  return (
    <section className="glass animate-fade-up overflow-hidden rounded-2xl">
      {/* Section header */}
      <div className="flex items-center justify-between gap-4 border-b border-white/10 p-5">
        <div>
          <h2 className="text-base font-semibold text-white">{t('title')}</h2>
          <p className="mt-0.5 text-sm text-slate-400">{t('subtitle')}</p>
        </div>
        <button className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-sm font-medium text-slate-300 transition-all duration-200 hover:border-white/20 hover:text-white">
          {t('viewAll')}
          <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-start text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-wider text-slate-500">
              <th className="px-5 py-3 text-start font-medium">{t('project')}</th>
              <th className="px-5 py-3 text-start font-medium">{t('owner')}</th>
              <th className="px-5 py-3 text-start font-medium">{t('status')}</th>
              <th className="px-5 py-3 text-start font-medium">{t('progress')}</th>
              <th className="px-5 py-3 text-end font-medium">{t('updated')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {ROWS.map((row) => (
              <tr
                key={row.ref}
                className="transition-colors duration-200 hover:bg-white/5"
              >
                <td className="px-5 py-4">
                  <p className="font-medium text-white">{row.project}</p>
                  <p className="text-xs text-slate-500">{row.ref}</p>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2.5">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-xs font-semibold text-slate-200">
                      {row.initials}
                    </span>
                    <span className="text-slate-300">{row.owner}</span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${STATUS_STYLES[row.status]}`}
                  >
                    {ts(row.status)}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2.5">
                    <div className="h-1.5 w-24 overflow-hidden rounded-full bg-white/10">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${PROGRESS_STYLES[row.status]}`}
                        style={{ width: `${row.progress}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-slate-400">
                      {row.progress}%
                    </span>
                  </div>
                </td>
                <td className="px-5 py-4 text-end text-slate-400">
                  {row.updated}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
