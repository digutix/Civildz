'use client';

import { useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { ResultsPanel, type DisplayRow } from './ResultsPanel';

// Conversion factors expressed in each category's SI base unit.
const FACTORS: Record<string, Record<string, number>> = {
  length: { m: 1, km: 1000, cm: 0.01, mm: 0.001, ft: 0.3048, in: 0.0254, yd: 0.9144 },
  area: { 'm²': 1, 'cm²': 0.0001, ha: 10000, 'ft²': 0.092903, acre: 4046.8564 },
  volume: { 'm³': 1, L: 0.001, 'cm³': 1e-6, 'ft³': 0.0283168 },
  mass: { kg: 1, g: 0.001, t: 1000, lb: 0.4535924 },
  force: { N: 1, kN: 1000, kgf: 9.80665 },
  pressure: { Pa: 1, kPa: 1000, MPa: 1e6, bar: 1e5, psi: 6894.757 },
};

const CATEGORIES = Object.keys(FACTORS);

/**
 * Unit Converter — a bespoke calculator (dependent from/to dropdowns) that
 * reuses the shared {@link ResultsPanel} for a consistent luxe look + RTL.
 */
export function UnitConverter() {
  const locale = useLocale();
  const t = useTranslations('calc.unit-converter');
  const tc = useTranslations('calc.common');

  const [category, setCategory] = useState('length');
  const [value, setValue] = useState('1');
  const [from, setFrom] = useState('m');
  const [to, setTo] = useState('cm');

  const units = Object.keys(FACTORS[category]);

  // When the category changes, reset from/to to that category's first two units.
  function changeCategory(next: string) {
    setCategory(next);
    const u = Object.keys(FACTORS[next]);
    setFrom(u[0]);
    setTo(u[1] ?? u[0]);
  }

  const converted = useMemo(() => {
    const v = parseFloat(value);
    if (!Number.isFinite(v)) return null;
    const f = FACTORS[category][from];
    const tt = FACTORS[category][to];
    if (!f || !tt) return null;
    return (v * f) / tt;
  }, [value, from, to, category]);

  const fmt = (x: number) => x.toLocaleString(locale, { maximumFractionDigits: 6 });

  const rows: DisplayRow[] =
    converted === null
      ? []
      : [
          { label: `${value || '0'} ${from} =`, value: `${fmt(converted)} ${to}`, highlight: true },
        ];

  const summary =
    converted === null ? '' : `${t('title')}\n${value} ${from} = ${fmt(converted)} ${to}`;

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="card p-6 lg:col-span-3">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-sm font-medium text-slate-700">{t('fields.category')}</span>
            <select value={category} onChange={(e) => changeCategory(e.target.value)} className="calc-input">
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {t(`categories.${c}`)}
                </option>
              ))}
            </select>
          </label>

          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-sm font-medium text-slate-700">{t('fields.value')}</span>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="calc-input"
              inputMode="decimal"
              step="any"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-700">{t('fields.from')}</span>
            <select value={from} onChange={(e) => setFrom(e.target.value)} className="calc-input">
              {units.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-700">{t('fields.to')}</span>
            <select value={to} onChange={(e) => setTo(e.target.value)} className="calc-input">
              {units.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </label>
        </div>

        {converted === null && (
          <p className="mt-4 text-sm font-medium text-red-600">{tc('errorPositive')}</p>
        )}
      </div>

      <div className="lg:col-span-2">
        <ResultsPanel rows={rows} summary={summary} title={tc('results')} />
      </div>
    </div>
  );
}
