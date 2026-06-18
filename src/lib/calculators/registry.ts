import type { CalcValues, CalculatorDef, ResultRow } from './types';

/** Read a numeric field as a finite number, or NaN. */
const n = (v: CalcValues, key: string): number => {
  const x = typeof v[key] === 'number' ? (v[key] as number) : parseFloat(String(v[key]));
  return Number.isFinite(x) ? x : NaN;
};
const allPositive = (...xs: number[]) => xs.every((x) => Number.isFinite(x) && x > 0);

// ── Concrete material constants ───────────────────────────────────────────
const DRY_FACTOR = 1.54; // wet -> dry volume
const CEMENT_DENSITY = 1440; // kg/m³
const SAND_DENSITY = 1600; // kg/m³
const GRAVEL_DENSITY = 1450; // kg/m³
const CEMENT_BAG_KG = 50;

/**
 * 1) CONCRETE — volume + cement/sand/gravel from a mix ratio.
 */
const concrete: CalculatorDef = {
  slug: 'concrete-calculator',
  icon: 'cube',
  quote: true,
  fields: [
    { name: 'length', type: 'number', unit: 'm', default: '5', min: 0, step: 0.01 },
    { name: 'width', type: 'number', unit: 'm', default: '4', min: 0, step: 0.01 },
    { name: 'depth', type: 'number', unit: 'm', default: '0.15', min: 0, step: 0.01 },
    { name: 'wastage', type: 'number', unit: 'percent', default: '5', min: 0, step: 1 },
    {
      name: 'mix',
      type: 'select',
      wide: true,
      default: '1:2:4',
      options: [
        { value: '1:1.5:3', label: '1 : 1.5 : 3 (M20)' },
        { value: '1:2:4', label: '1 : 2 : 4 (M15)' },
        { value: '1:3:6', label: '1 : 3 : 6 (M10)' },
        { value: '1:1:2', label: '1 : 1 : 2 (M25)' },
      ],
    },
  ],
  compute: (v) => {
    const L = n(v, 'length'), W = n(v, 'width'), D = n(v, 'depth');
    const waste = Number.isFinite(n(v, 'wastage')) ? n(v, 'wastage') : 0;
    const parts = String(v.mix).split(':').map((p) => parseFloat(p));
    if (!allPositive(L, W, D) || parts.length !== 3 || !allPositive(...parts)) return null;

    const wet = L * W * D * (1 + waste / 100);
    const dry = wet * DRY_FACTOR;
    const sum = parts[0] + parts[1] + parts[2];
    const cementKg = ((dry * parts[0]) / sum) * CEMENT_DENSITY;
    return [
      { key: 'volume', value: wet, unit: 'm3', highlight: true },
      { key: 'cement', value: cementKg, unit: 'kg' },
      { key: 'bags', value: cementKg / CEMENT_BAG_KG, unit: 'bags', note: true, fractionDigits: 1 },
      { key: 'sand', value: ((dry * parts[1]) / sum) * SAND_DENSITY, unit: 'kg' },
      { key: 'gravel', value: ((dry * parts[2]) / sum) * GRAVEL_DENSITY, unit: 'kg' },
    ];
  },
};

/**
 * 2) STEEL — reinforcement weight from a rebar schedule.
 * Unit weight of a round bar = d²/162 (kg/m, d in mm).
 */
const steel: CalculatorDef = {
  slug: 'steel-calculator',
  icon: 'beam',
  quote: true,
  fields: [
    {
      name: 'diameter',
      type: 'select',
      unit: 'mm',
      default: '12',
      options: ['6', '8', '10', '12', '14', '16', '20', '25', '32'].map((d) => ({
        value: d,
        label: `Ø ${d} mm`,
      })),
    },
    { name: 'barLength', type: 'number', unit: 'm', default: '12', min: 0, step: 0.1 },
    { name: 'quantity', type: 'number', unit: 'pcs', default: '50', min: 0, step: 1 },
  ],
  compute: (v) => {
    const d = n(v, 'diameter'), len = n(v, 'barLength'), qty = n(v, 'quantity');
    if (!allPositive(d, len) || !(qty > 0)) return null;
    const kgPerM = (d * d) / 162;
    const perBar = kgPerM * len;
    return [
      { key: 'totalWeight', value: perBar * qty, unit: 'kg', highlight: true },
      { key: 'perBar', value: perBar, unit: 'kg' },
      { key: 'totalLength', value: len * qty, unit: 'm' },
      { key: 'unitWeight', value: kgPerM, unit: 'kgm', note: true, fractionDigits: 3 },
    ];
  },
};

/**
 * 3) BRICK — number of bricks for a wall (incl. mortar joint + wastage).
 */
const brick: CalculatorDef = {
  slug: 'brick-calculator',
  icon: 'bricks',
  quote: true,
  fields: [
    { name: 'wallLength', type: 'number', unit: 'm', default: '5', min: 0, step: 0.1 },
    { name: 'wallHeight', type: 'number', unit: 'm', default: '3', min: 0, step: 0.1 },
    { name: 'brickLength', type: 'number', unit: 'cm', default: '20', min: 0, step: 0.5 },
    { name: 'brickHeight', type: 'number', unit: 'cm', default: '10', min: 0, step: 0.5 },
    { name: 'joint', type: 'number', unit: 'cm', default: '1', min: 0, step: 0.5 },
    { name: 'wastage', type: 'number', unit: 'percent', default: '5', min: 0, step: 1 },
  ],
  compute: (v) => {
    const L = n(v, 'wallLength'), H = n(v, 'wallHeight');
    const bl = n(v, 'brickLength'), bh = n(v, 'brickHeight');
    const j = Number.isFinite(n(v, 'joint')) ? n(v, 'joint') : 0;
    const waste = Number.isFinite(n(v, 'wastage')) ? n(v, 'wastage') : 0;
    if (!allPositive(L, H, bl, bh)) return null;

    const wallArea = L * H; // m²
    const faceArea = ((bl + j) / 100) * ((bh + j) / 100); // m² per brick incl. joint
    if (!(faceArea > 0)) return null;
    const bricks = Math.ceil((wallArea / faceArea) * (1 + waste / 100));
    return [
      { key: 'bricks', value: bricks, unit: 'pcs', highlight: true, fractionDigits: 0 },
      { key: 'wallArea', value: wallArea, unit: 'm2' },
    ];
  },
};

/**
 * 4) EXCAVATION — earthwork volume incl. soil swell (bulking).
 */
const excavation: CalculatorDef = {
  slug: 'excavation-volume',
  icon: 'dig',
  quote: true,
  fields: [
    { name: 'length', type: 'number', unit: 'm', default: '10', min: 0, step: 0.1 },
    { name: 'width', type: 'number', unit: 'm', default: '2', min: 0, step: 0.1 },
    { name: 'depth', type: 'number', unit: 'm', default: '1.5', min: 0, step: 0.1 },
    { name: 'count', type: 'number', unit: 'pcs', default: '1', min: 1, step: 1 },
    { name: 'swell', type: 'number', unit: 'percent', default: '25', min: 0, step: 1 },
  ],
  compute: (v) => {
    const L = n(v, 'length'), W = n(v, 'width'), D = n(v, 'depth');
    const count = Number.isFinite(n(v, 'count')) ? n(v, 'count') : 1;
    const swell = Number.isFinite(n(v, 'swell')) ? n(v, 'swell') : 0;
    if (!allPositive(L, W, D) || !(count > 0)) return null;
    const bank = L * W * D * count;
    return [
      { key: 'bankVolume', value: bank, unit: 'm3', highlight: true },
      { key: 'looseVolume', value: bank * (1 + swell / 100), unit: 'm3' },
    ];
  },
};

/**
 * 5) CONSTRUCTION COST — quick budget from built area × unit cost.
 */
const cost: CalculatorDef = {
  slug: 'construction-cost',
  icon: 'calculator',
  quote: true,
  fields: [
    { name: 'area', type: 'number', unit: 'm2', default: '120', min: 0, step: 1 },
    { name: 'floors', type: 'number', unit: 'pcs', default: '1', min: 1, step: 1 },
    { name: 'unitCost', type: 'number', unit: 'dzd', default: '35000', min: 0, step: 500 },
  ],
  compute: (v) => {
    const area = n(v, 'area'), unit = n(v, 'unitCost');
    const floors = Number.isFinite(n(v, 'floors')) ? n(v, 'floors') : 1;
    if (!allPositive(area, unit) || !(floors > 0)) return null;
    const total = area * floors * unit;
    return [
      { key: 'total', value: total, unit: 'dzd', highlight: true, fractionDigits: 0 },
      { key: 'builtArea', value: area * floors, unit: 'm2' },
    ];
  },
};

/** All formula calculators handled by the generic CalculatorTemplate. */
export const calculators: CalculatorDef[] = [concrete, steel, brick, excavation, cost];

/** Slugs that use a bespoke component instead of the generic template. */
export const customCalculatorSlugs = ['unit-converter'];

/** Every interactive tool slug (for routing / static generation). */
export const interactiveCalculatorSlugs = [
  ...calculators.map((c) => c.slug),
  ...customCalculatorSlugs,
];

export function getCalculator(slug: string): CalculatorDef | undefined {
  return calculators.find((c) => c.slug === slug);
}
