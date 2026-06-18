import type { ReactNode } from 'react';
import { Link } from '@/i18n/routing';
import { Icon } from './Icon';

/** A titled page/section header with optional subtitle and "view all" link. */
export function SectionHeader({
  title,
  subtitle,
  viewAllHref,
  viewAllLabel,
}: {
  title: string;
  subtitle?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 className="section-title">{title}</h2>
        {subtitle && <p className="mt-1 text-slate-600">{subtitle}</p>}
      </div>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-800"
        >
          {viewAllLabel}
          <Icon name="arrow" width={16} height={16} className="rtl:rotate-180" />
        </Link>
      )}
    </div>
  );
}

/** Page hero/banner used at the top of section pages. */
export function PageHero({
  title,
  subtitle,
  icon,
}: {
  title: string;
  subtitle?: string;
  icon?: string;
}) {
  return (
    <div className="relative overflow-hidden bg-geometric text-white">
      <div className="absolute inset-0 bg-facets" aria-hidden="true" />
      <div className="container-page relative py-14 sm:py-20">
        {icon && (
          <span className="mb-5 inline-grid h-12 w-12 place-items-center rounded-xl border border-gold-400/30 bg-white/5 text-gold-300 backdrop-blur">
            <Icon name={icon} width={26} height={26} />
          </span>
        )}
        <div className="rule-gold mb-4" />
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-3 max-w-2xl text-slate-300">{subtitle}</p>}
      </div>
    </div>
  );
}

/** A coloured tag/badge. */
export function Badge({ children, color = 'brand' }: { children: ReactNode; color?: string }) {
  const colors: Record<string, string> = {
    brand: 'bg-brand-50 text-brand-700',
    accent: 'bg-amber-50 text-amber-700',
    green: 'bg-green-50 text-green-700',
    slate: 'bg-slate-100 text-slate-600',
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
        colors[color] ?? colors.brand
      }`}
    >
      {children}
    </span>
  );
}

/** A clickable card linking somewhere, with an icon, title and description. */
export function LinkCard({
  href,
  icon,
  title,
  description,
  badge,
  external,
}: {
  href: string;
  icon?: string;
  title: string;
  description?: string;
  badge?: ReactNode;
  external?: boolean;
}) {
  const inner = (
    <>
      <div className="flex items-start justify-between gap-3">
        {icon && (
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700">
            <Icon name={icon} width={22} height={22} />
          </span>
        )}
        {badge}
      </div>
      <h3 className="mt-4 font-semibold text-slate-900 group-hover:text-brand-700">{title}</h3>
      {description && <p className="mt-1 line-clamp-3 text-sm text-slate-600">{description}</p>}
    </>
  );

  const className = 'card group flex flex-col p-5';

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {inner}
    </Link>
  );
}
