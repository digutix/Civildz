/**
 * Shared types for the config-driven calculator system.
 *
 * Each engineering calculator is described by a `CalculatorDef`: a list of
 * input fields plus a pure `compute` function. The `CalculatorTemplate`
 * component renders the fields generically and runs `compute` live, so adding
 * a new calculator means adding one definition here + its labels in the
 * `calc.<slug>` namespace of the message JSON files — no new UI code.
 */

export type FieldType = 'number' | 'select';

export interface SelectOption {
  /** Stored/computed value. */
  value: string;
  /** Literal label shown in the dropdown (units/ratios are not translated). */
  label: string;
}

export interface FieldDef {
  /** Key used in the values object and as the label key `fields.<name>`. */
  name: string;
  type: FieldType;
  /** i18n unit key under the `calc.units` namespace, e.g. 'm', 'cm', 'mm'. */
  unit?: string;
  /** Default raw value (string, as it comes from an <input>). */
  default: string;
  min?: number;
  step?: number;
  /** Options for `type: 'select'`. */
  options?: SelectOption[];
  /** Render across both grid columns. */
  wide?: boolean;
}

export interface ResultRow {
  /** Label key resolved under `calc.<slug>.results.<key>`. */
  key: string;
  value: number;
  /** Unit key under `calc.units`. */
  unit?: string;
  /** Primary metric — rendered large in gold. */
  highlight?: boolean;
  /** Secondary muted line (e.g. "≈ 20 bags"). */
  note?: boolean;
  fractionDigits?: number;
}

/** Parsed field values passed to `compute` (numbers for number fields,
 *  strings for selects). */
export type CalcValues = Record<string, number | string>;

export interface CalculatorDef {
  /** Matches `Tool.slug` and the `calc.<slug>` i18n namespace. */
  slug: string;
  icon: string;
  fields: FieldDef[];
  /** Pure calculation. Return `null` when inputs are invalid. */
  compute: (values: CalcValues) => ResultRow[] | null;
  /** Show the "request a quote with this estimate" action. */
  quote?: boolean;
}
