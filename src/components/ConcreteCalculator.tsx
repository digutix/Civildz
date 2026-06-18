'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Icon } from './Icon';

// Typical dry-volume factor for concrete (wet -> dry materials) and material
// densities used to convert volumes to masses.
const DRY_FACTOR = 1.54;
const CEMENT_DENSITY = 1440; // kg/m³
const SAND_DENSITY = 1600; // kg/m³
const GRAVEL_DENSITY = 1450; // kg/m³
const CEMENT_BAG_KG = 50;

interface Result {
  volume: number;
  cementKg: number;
  cementBags: number;
  sandKg: number;
  gravelKg: number;
}

export function ConcreteCalculator() {
  const t = useTranslations('tools.concrete');

  const [length, setLength] = useState('5');
  const [width, setWidth] = useState('4');
  const [depth, setDepth] = useState('0.15');
  const [ratio, setRatio] = useState('1:2:4');
  const [wastage, setWastage] = useState('5');
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState('');

  function calculate() {
    const L = parseFloat(length);
    const W = parseFloat(width);
    const D = parseFloat(depth);
    const waste = parseFloat(wastage) || 0;
    const parts = ratio.split(':').map((p) => parseFloat(p.trim()));

    if ([L, W, D].some((n) => !Number.isFinite(n) || n <= 0) || parts.some((p) => !Number.isFinite(p) || p <= 0)) {
      setError(t('errorPositive'));
      setResult(null);
      return;
    }
    setError('');

    const wetVolume = L * W * D * (1 + waste / 100);
    const dryVolume = wetVolume * DRY_FACTOR;
    const sum = parts[0] + parts[1] + parts[2];

    const cementVol = (dryVolume * parts[0]) / sum;
    const sandVol = (dryVolume * parts[1]) / sum;
    const gravelVol = (dryVolume * parts[2]) / sum;

    const cementKg = cementVol * CEMENT_DENSITY;
    setResult({
      volume: wetVolume,
      cementKg,
      cementBags: cementKg / CEMENT_BAG_KG,
      sandKg: sandVol * SAND_DENSITY,
      gravelKg: gravelVol * GRAVEL_DENSITY,
    });
  }

  function reset() {
    setLength('5');
    setWidth('4');
    setDepth('0.15');
    setRatio('1:2:4');
    setWastage('5');
    setResult(null);
    setError('');
  }

  const fmt = (n: number) => n.toLocaleString(undefined, { maximumFractionDigits: 2 });

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Inputs */}
      <div className="card p-6 lg:col-span-3">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label={`${t('length')} (${t('meters')})`}>
            <input type="number" value={length} onChange={(e) => setLength(e.target.value)} className="input" min="0" step="0.01" />
          </Field>
          <Field label={`${t('width')} (${t('meters')})`}>
            <input type="number" value={width} onChange={(e) => setWidth(e.target.value)} className="input" min="0" step="0.01" />
          </Field>
          <Field label={`${t('depth')} (${t('meters')})`}>
            <input type="number" value={depth} onChange={(e) => setDepth(e.target.value)} className="input" min="0" step="0.01" />
          </Field>
          <Field label={`${t('wastage')} (%)`}>
            <input type="number" value={wastage} onChange={(e) => setWastage(e.target.value)} className="input" min="0" step="1" />
          </Field>
          <div className="sm:col-span-2">
            <Field label={t('mix')}>
              <select value={ratio} onChange={(e) => setRatio(e.target.value)} className="input">
                <option value="1:1.5:3">1 : 1.5 : 3 (M20)</option>
                <option value="1:2:4">1 : 2 : 4 (M15)</option>
                <option value="1:3:6">1 : 3 : 6 (M10)</option>
                <option value="1:1:2">1 : 1 : 2 (M25)</option>
              </select>
            </Field>
          </div>
        </div>

        {error && <p className="mt-4 text-sm font-medium text-red-600">{error}</p>}

        <div className="mt-6 flex gap-3">
          <button type="button" onClick={calculate} className="btn-primary">
            <Icon name="calculator" width={18} height={18} />
            {t('calculate')}
          </button>
          <button type="button" onClick={reset} className="btn-outline">
            {t('reset')}
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="lg:col-span-2">
        <div className="rounded-2xl border border-gold-400/30 bg-gradient-to-br from-navy-900 to-navy-800 p-6 text-white">
          <h3 className="flex items-center gap-2 font-bold text-gold-300">
            <Icon name="cube" width={20} height={20} />
            {t('results')}
          </h3>
          <div className="rule-gold my-3" />
          {result ? (
            <dl className="space-y-3">
              <Row label={t('volume')} value={`${fmt(result.volume)} ${t('cubicMeters')}`} highlight />
              <Row label={t('cement')} value={`${fmt(result.cementKg)} ${t('kg')}`} />
              <Row label="" value={`≈ ${fmt(result.cementBags)} ${t('bags')}`} muted />
              <Row label={t('sand')} value={`${fmt(result.sandKg)} ${t('kg')}`} />
              <Row label={t('gravel')} value={`${fmt(result.gravelKg)} ${t('kg')}`} />
            </dl>
          ) : (
            <p className="text-sm text-slate-400">—</p>
          )}
        </div>
      </div>

      <style>{`
        .input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid rgb(203 213 225);
          background: white;
          padding: 0.625rem 0.875rem;
          font-size: 0.95rem;
          color: rgb(15 23 42);
          outline: none;
        }
        .input:focus { border-color: rgb(29 78 216); box-shadow: 0 0 0 3px rgba(29,78,216,0.15); }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700">{label}</span>
      {children}
    </label>
  );
}

function Row({
  label,
  value,
  highlight,
  muted,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  muted?: boolean;
}) {
  return (
    <div className={`flex items-baseline justify-between gap-3 ${highlight ? 'border-b border-white/10 pb-3' : ''}`}>
      {label && <dt className="text-sm text-slate-300">{label}</dt>}
      <dd
        className={`font-bold ${
          highlight ? 'text-xl text-gold-300' : muted ? 'ms-auto text-xs font-medium text-slate-400' : 'text-white'
        }`}
      >
        {value}
      </dd>
    </div>
  );
}
