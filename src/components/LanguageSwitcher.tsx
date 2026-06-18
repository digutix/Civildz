'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { locales, type Locale } from '@/i18n/routing';
import { Icon } from './Icon';

const labels: Record<Locale, string> = {
  en: 'English',
  ar: 'العربية',
  fr: 'Français',
};

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  function switchTo(next: Locale) {
    setOpen(false);
    router.replace(pathname, { locale: next });
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="btn-outline px-3 py-2 text-sm"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <Icon name="globe" width={16} height={16} />
        <span className="hidden sm:inline">{labels[locale]}</span>
        <span className="sm:hidden">{locale.toUpperCase()}</span>
      </button>
      {open && (
        <ul
          className="absolute end-0 z-50 mt-2 w-40 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg"
          role="listbox"
        >
          {locales.map((l) => (
            <li key={l}>
              <button
                type="button"
                onClick={() => switchTo(l)}
                className={`flex w-full items-center px-4 py-2 text-sm hover:bg-slate-50 ${
                  l === locale ? 'font-semibold text-brand-700' : 'text-slate-700'
                }`}
                role="option"
                aria-selected={l === locale}
              >
                {labels[l]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
