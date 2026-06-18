'use client';

import { useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import type { ResultRow } from '@/lib/calculators/types';
import { getCalculator } from '@/lib/calculators/registry';
import { Icon } from '../Icon';
import { ResultsPanel, type DisplayRow } from './ResultsPanel';

/**
 * Renders any `CalculatorDef` from a localized field schema.
 *
 * - Field labels come from the `calc.<slug>` message namespace; units from the
 *   shared `calc.units` namespace — so no copy is hard-coded here.
 * - Results recompute live (useMemo) as the user types.
 * - RTL: the layout uses logical Tailwind utilities (ps/pe/ms/me, justify-between)
 *   and inherits `dir` from <html>; numeric `<input>`s carry `inputMode="decimal"`
 *   and digits stay LTR within the RTL form, which is the expected Arabic UX.
 */
export function CalculatorTemplate({ slug }: { slug: string }) {
  // Resolve the definition on the client so the `compute` function never has
  // to cross the server → client boundary (functions aren't serialisable).
  const def = getCalculator(slug)!;

  const locale = useLocale();
  const t = useTranslations(`calc.${def.slug}`);
  const tu = useTranslations('calc.units');
  const tc = useTranslations('calc.common');

  // One piece of state per field, seeded from the schema defaults.
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(def.fields.map((f) => [f.name, f.default])),
  );

  const setField = (name: string, value: string) =>
    setValues((prev) => ({ ...prev, [name]: value }));

  const reset = () =>
    setValues(Object.fromEntries(def.fields.map((f) => [f.name, f.default])));

  const result = useMemo(() => def.compute(values), [def, values]);

  const fmt = (value: number, digits = 2) =>
    value.toLocaleString(locale, { maximumFractionDigits: digits });

  const unitLabel = (unit?: string) => (unit ? tu(unit) : '');

  const formatRow = (r: ResultRow): DisplayRow => {
    const num = fmt(r.value, r.fractionDigits ?? 2);
    const value = `${r.note ? '≈ ' : ''}${num}${r.unit ? ` ${unitLabel(r.unit)}` : ''}`;
    return { label: t(`results.${r.key}`), value, highlight: r.highlight, note: r.note };
  };

  const rows: DisplayRow[] = result ? result.map(formatRow) : [];

  // Plain-text summary used for "copy" and for pre-filling the quote form.
  const summary = useMemo(() => {
    if (!result) return '';
    const lines = result
      .filter((r) => !r.note)
      .map((r) => `- ${t(`results.${r.key}`)}: ${fmt(r.value, r.fractionDigits ?? 2)}${r.unit ? ' ' + unitLabel(r.unit) : ''}`);
    return `${t('title')}\n${lines.join('\n')}`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result, locale]);

  // Pipe the estimate into the existing quote API via the quote form.
  const quoteHref =
    def.quote && result
      ? `/services/quote?ref=${encodeURIComponent(def.slug)}&estimate=${encodeURIComponent(summary)}`
      : undefined;

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Inputs */}
      <div className="card p-6 lg:col-span-3">
        <div className="grid gap-5 sm:grid-cols-2">
          {def.fields.map((f) => {
            const label = `${t(`fields.${f.name}`)}${f.unit ? ` (${unitLabel(f.unit)})` : ''}`;
            return (
              <label key={f.name} className={`block ${f.wide ? 'sm:col-span-2' : ''}`}>
                <span className="mb-1.5 block text-sm font-medium text-slate-700">{label}</span>
                {f.type === 'select' ? (
                  <select
                    value={values[f.name]}
                    onChange={(e) => setField(f.name, e.target.value)}
                    className="calc-input"
                  >
                    {f.options?.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="number"
                    value={values[f.name]}
                    onChange={(e) => setField(f.name, e.target.value)}
                    className="calc-input"
                    min={f.min}
                    step={f.step}
                    inputMode="decimal"
                  />
                )}
              </label>
            );
          })}
        </div>

        {!result && <p className="mt-4 text-sm font-medium text-red-600">{tc('errorPositive')}</p>}

        <div className="mt-6">
          <button type="button" onClick={reset} className="btn-outline w-full sm:w-auto">
            <Icon name="swap" width={16} height={16} />
            {tc('reset')}
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="lg:col-span-2">
        <ResultsPanel rows={rows} summary={summary} quoteHref={quoteHref} title={tc('results')} />
      </div>
    </div>
  );
}
