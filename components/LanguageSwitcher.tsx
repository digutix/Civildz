'use client';

import { useState, useRef, useEffect, useTransition } from 'react';
import { useLocale } from 'next-intl';
import { Globe, Check, ChevronDown } from 'lucide-react';

import { usePathname, useRouter } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';

// Display metadata for each supported locale.
const LOCALE_META: Record<Locale, { label: string; native: string; flag: string }> = {
  en: { label: 'English', native: 'English', flag: '🇬🇧' },
  ar: { label: 'Arabic', native: 'العربية', flag: '🇩🇿' },
  fr: { label: 'French', native: 'Français', flag: '🇫🇷' },
};

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close the menu when clicking outside.
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
    if (next === locale) return;
    // Replace the path with the same route under the new locale — keeps the
    // user on the page they were viewing.
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        disabled={isPending}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Change language"
        className="flex h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 text-sm font-medium text-slate-300 transition-all duration-200 hover:border-white/20 hover:text-white disabled:opacity-60"
      >
        <Globe className={`h-5 w-5 ${isPending ? 'animate-pulse-glow' : ''}`} />
        <span className="hidden uppercase sm:inline">{locale}</span>
        <ChevronDown
          className={`hidden h-4 w-4 text-slate-400 transition-transform duration-200 sm:inline ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="glass animate-fade-up absolute end-0 top-full z-30 mt-2 w-44 overflow-hidden rounded-xl p-1.5"
        >
          {routing.locales.map((l) => {
            const meta = LOCALE_META[l];
            const selected = l === locale;
            return (
              <li key={l}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => switchTo(l)}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm transition-colors duration-150 ${
                    selected
                      ? 'bg-white/10 text-white'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span className="text-base leading-none">{meta.flag}</span>
                  <span className="flex-1 text-start">{meta.native}</span>
                  {selected && <Check className="h-4 w-4 text-brand-glow" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
