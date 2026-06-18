'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import type { Locale } from '@/i18n/routing';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Icon } from './Icon';

const navItems = [
  { href: '/', key: 'home' },
  { href: '/study', key: 'study' },
  { href: '/tools', key: 'tools' },
  { href: '/software', key: 'software' },
  { href: '/jobs', key: 'jobs' },
  { href: '/services', key: 'services' },
] as const;

export function Header({ locale }: { locale: Locale }) {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Prevent the page scrolling behind the open mobile menu.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-extrabold text-brand-700">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-600 text-white">
            C
          </span>
          <span className="text-lg tracking-tight">Civildz</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                isActive(item.href)
                  ? 'bg-brand-50 text-brand-700'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/services/quote" className="btn-accent hidden px-4 py-2 sm:inline-flex">
            {t('getQuote')}
          </Link>
          <LanguageSwitcher />
          <button
            type="button"
            className="btn-outline p-2 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
          >
            <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="currentColor" strokeWidth={2}>
              {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-slate-200 bg-white lg:hidden">
          <div className="container-page flex flex-col gap-1 py-3">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-4 py-3 text-base font-medium ${
                  isActive(item.href) ? 'bg-brand-50 text-brand-700' : 'text-slate-700 active:bg-slate-100'
                }`}
              >
                {t(item.key)}
              </Link>
            ))}
            <Link
              href="/services/quote"
              onClick={() => setOpen(false)}
              className="btn-accent mt-2 w-full py-3"
            >
              <Icon name="document" width={18} height={18} />
              {t('getQuote')}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
