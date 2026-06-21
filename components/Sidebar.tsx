'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  LayoutDashboard,
  FolderKanban,
  LineChart,
  FileText,
  Users,
  Settings,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  HardHat,
} from 'lucide-react';

type NavItem = {
  key: string;
  icon: typeof LayoutDashboard;
  active?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { key: 'overview', icon: LayoutDashboard, active: true },
  { key: 'projects', icon: FolderKanban },
  { key: 'analytics', icon: LineChart },
  { key: 'documents', icon: FileText },
  { key: 'team', icon: Users },
  { key: 'settings', icon: Settings },
];

export default function Sidebar() {
  const t = useTranslations('Nav');
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`glass relative z-20 flex shrink-0 flex-col rounded-none border-y-0 border-s-0 transition-[width] duration-300 ease-in-out ${
        collapsed ? 'w-20' : 'w-72'
      }`}
    >
      {/* Brand */}
      <div className="flex h-20 items-center gap-3 px-5">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-blue to-brand-glow shadow-glow-blue">
          <HardHat className="h-5 w-5 text-white" />
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ${
            collapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
          }`}
        >
          <p className="whitespace-nowrap text-lg font-semibold tracking-tight text-white">
            {t('brand')}
          </p>
          <p className="whitespace-nowrap text-xs text-slate-400">
            {t('tagline')}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-4 flex-1 space-y-1.5 px-3">
        {NAV_ITEMS.map(({ key, icon: Icon, active }) => (
          <button
            key={key}
            title={collapsed ? t(key) : undefined}
            className={`group relative flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 ${
              active
                ? 'bg-white/10 text-white shadow-glow-blue ring-accent'
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            {/* Active marker */}
            <span
              className={`absolute inset-y-2 start-0 w-1 rounded-full bg-gradient-to-b from-brand-glow to-brand-blue transition-opacity ${
                active ? 'opacity-100' : 'opacity-0'
              }`}
            />
            <Icon className="h-5 w-5 shrink-0" />
            <span
              className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${
                collapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
              }`}
            >
              {t(key)}
            </span>
          </button>
        ))}
      </nav>

      {/* Footer actions */}
      <div className="space-y-2 p-3">
        <button
          className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-400 transition-all duration-200 hover:bg-rose-500/10 hover:text-rose-300`}
        >
          <LogOut className="h-5 w-5 shrink-0" />
          <span
            className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${
              collapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
            }`}
          >
            {t('logout')}
          </span>
        </button>

        <button
          onClick={() => setCollapsed((v) => !v)}
          aria-label="Toggle sidebar"
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 px-3 py-2.5 text-slate-400 transition-all duration-200 hover:border-white/20 hover:text-white"
        >
          {collapsed ? (
            <PanelLeftOpen className="h-5 w-5 rtl:-scale-x-100" />
          ) : (
            <PanelLeftClose className="h-5 w-5 rtl:-scale-x-100" />
          )}
        </button>
      </div>
    </aside>
  );
}
