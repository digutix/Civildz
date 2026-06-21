import { type LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

export type StatCardProps = {
  label: string;
  value: string;
  delta: number;
  caption: string;
  icon: LucideIcon;
  accent?: 'blue' | 'gold' | 'emerald' | 'violet';
};

const ACCENTS: Record<NonNullable<StatCardProps['accent']>, string> = {
  blue: 'from-brand-blue/30 to-brand-glow/10 text-brand-glow',
  gold: 'from-gold/30 to-gold-soft/10 text-gold-soft',
  emerald: 'from-emerald-500/30 to-emerald-400/10 text-emerald-300',
  violet: 'from-violet-500/30 to-violet-400/10 text-violet-300',
};

export default function StatCard({
  label,
  value,
  delta,
  caption,
  icon: Icon,
  accent = 'blue',
}: StatCardProps) {
  const positive = delta >= 0;
  const Trend = positive ? TrendingUp : TrendingDown;

  return (
    <div className="glass glass-hover group animate-fade-up rounded-2xl p-5">
      <div className="flex items-start justify-between">
        <div
          className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${ACCENTS[accent]} ring-accent`}
        >
          <Icon className="h-6 w-6" />
        </div>

        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
            positive
              ? 'bg-emerald-500/10 text-emerald-300'
              : 'bg-rose-500/10 text-rose-300'
          }`}
        >
          <Trend className="h-3.5 w-3.5" />
          {positive ? '+' : ''}
          {delta}%
        </span>
      </div>

      <p className="mt-5 text-3xl font-semibold tracking-tight text-white">
        {value}
      </p>
      <p className="mt-1 text-sm font-medium text-slate-300">{label}</p>
      <p className="mt-3 text-xs text-slate-500">{caption}</p>
    </div>
  );
}
