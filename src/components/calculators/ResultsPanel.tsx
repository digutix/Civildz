'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Icon } from '../Icon';

export interface DisplayRow {
  label: string;
  /** Pre-formatted, localized value string (incl. unit). */
  value: string;
  highlight?: boolean;
  note?: boolean;
}

/**
 * The gold "Results" panel shared by every calculator. It owns the
 * copy-to-clipboard state and the optional "request a quote" action, so the
 * calculator components only need to hand it formatted rows + a summary.
 *
 * RTL: the panel inherits `dir` from <html>; labels and values sit at the
 * inline-start / inline-end via `justify-between`, so it mirrors automatically
 * for Arabic. Numeric values keep a left-to-right reading inside their span.
 */
export function ResultsPanel({
  rows,
  summary,
  quoteHref,
  title,
}: {
  rows: DisplayRow[];
  summary: string;
  quoteHref?: string;
  title?: string;
}) {
  const t = useTranslations('calc.common');
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable (insecure context) — ignore */
    }
  }

  return (
    <div className="rounded-2xl border border-gold-400/30 bg-gradient-to-br from-navy-900 to-navy-800 p-6 text-white">
      <h3 className="flex items-center gap-2 font-bold text-gold-300">
        <Icon name="cube" width={20} height={20} />
        {title ?? t('results')}
      </h3>
      <div className="rule-gold my-3" />

      {rows.length > 0 ? (
        <>
          <dl className="space-y-3">
            {rows.map((r, i) => (
              <div
                key={i}
                className={`flex items-baseline justify-between gap-3 ${
                  r.highlight ? 'border-b border-white/10 pb-3' : ''
                }`}
              >
                {!r.note && <dt className="text-sm text-slate-300">{r.label}</dt>}
                <dd
                  className={`font-bold ${
                    r.highlight
                      ? 'text-xl text-gold-300'
                      : r.note
                        ? 'ms-auto text-xs font-medium text-slate-400'
                        : 'text-white'
                  }`}
                  dir="ltr"
                >
                  {r.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-5 space-y-2">
            <button type="button" onClick={copy} className="btn-gold w-full" aria-live="polite">
              <Icon name={copied ? 'arrow' : 'document'} width={18} height={18} />
              {copied ? t('copied') : t('copy')}
            </button>
            {quoteHref && (
              <Link
                href={quoteHref}
                className="btn w-full border border-white/15 bg-white/5 text-white hover:bg-white/10"
              >
                <Icon name="document" width={18} height={18} />
                {t('requestQuote')}
              </Link>
            )}
          </div>
        </>
      ) : (
        <p className="text-sm text-slate-400">{t('fillFields')}</p>
      )}
    </div>
  );
}
