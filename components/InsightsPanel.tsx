import { useTranslations } from 'next-intl';
import { Activity, CalendarClock, ShieldCheck } from 'lucide-react';

export default function InsightsPanel() {
  const t = useTranslations('Dashboard');

  const items = [
    {
      icon: ShieldCheck,
      title: 'Compliance score',
      value: '96%',
      tint: 'text-emerald-300',
    },
    {
      icon: CalendarClock,
      title: 'Upcoming deadlines',
      value: '7',
      tint: 'text-gold-soft',
    },
    {
      icon: Activity,
      title: 'Site inspections',
      value: '13',
      tint: 'text-brand-glow',
    },
  ];

  return (
    <section className="glass animate-fade-up flex flex-col gap-4 rounded-2xl p-5">
      <div>
        <h2 className="text-base font-semibold text-white">{t('greeting')}</h2>
        <p className="mt-0.5 text-sm text-slate-400">{t('subtitle')}</p>
      </div>

      <div className="space-y-3">
        {items.map(({ icon: Icon, title, value, tint }) => (
          <div
            key={title}
            className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3.5 transition-all duration-200 hover:border-white/20"
          >
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-white/5 ring-accent">
              <Icon className={`h-5 w-5 ${tint}`} />
            </span>
            <span className="flex-1 text-sm text-slate-300">{title}</span>
            <span className="text-lg font-semibold text-white">{value}</span>
          </div>
        ))}
      </div>

      {/* Decorative gradient footer */}
      <div className="relative mt-1 overflow-hidden rounded-xl bg-gradient-to-br from-brand-blue/20 via-navy-800 to-gold/10 p-4 ring-accent">
        <div className="absolute -end-6 -top-6 h-20 w-20 rounded-full bg-brand-glow/20 blur-2xl" />
        <p className="relative text-sm font-medium text-white">
          CivilDZ Pro
        </p>
        <p className="relative mt-1 text-xs text-slate-300">
          Unlock advanced BIM analytics &amp; unlimited storage.
        </p>
      </div>
    </section>
  );
}
