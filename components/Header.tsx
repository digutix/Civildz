'use client';

import { useTranslations } from 'next-intl';
import { Search, Bell, ChevronDown } from 'lucide-react';

export default function Header() {
  const t = useTranslations('Header');

  return (
    <header className="glass sticky top-0 z-10 flex h-20 items-center gap-4 rounded-none border-x-0 border-t-0 px-4 sm:px-6">
      {/* Search */}
      <div className="relative hidden flex-1 md:block">
        <Search className="pointer-events-none absolute start-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
        <input
          type="search"
          placeholder={t('searchPlaceholder')}
          className="h-11 w-full max-w-md rounded-xl border border-white/10 bg-white/5 ps-10 pe-4 text-sm text-slate-200 placeholder:text-slate-500 outline-none transition-all duration-200 focus:border-brand-glow/50 focus:bg-white/10 focus:shadow-glow-blue"
        />
      </div>

      <div className="flex flex-1 items-center justify-end gap-2 sm:gap-3 md:flex-none">
        {/* Notifications */}
        <button
          aria-label={t('notifications')}
          className="relative grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-all duration-200 hover:border-white/20 hover:text-white"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute end-2.5 top-2.5 flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-pulse-glow rounded-full bg-gold opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-gold-soft" />
          </span>
        </button>

        {/* Profile */}
        <button className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-1.5 ps-3 transition-all duration-200 hover:border-white/20">
          <div className="hidden text-end sm:block">
            <p className="text-sm font-medium leading-tight text-white">
              Yacine B.
            </p>
            <p className="text-xs leading-tight text-slate-400">{t('role')}</p>
          </div>
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-gold to-gold-soft text-sm font-semibold text-navy-950 shadow-glow-gold">
            YB
          </div>
          <ChevronDown className="hidden h-4 w-4 text-slate-400 sm:block" />
        </button>
      </div>
    </header>
  );
}
