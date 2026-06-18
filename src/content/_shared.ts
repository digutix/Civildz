/**
 * Helpers for writing editable, multilingual content.
 *
 * Every translatable value is written as `tr(english, arabic, french)` and is
 * stored in the database as a JSON string. You only ever need to call `tr(...)`
 * / `trList(...)` — you never write raw JSON by hand.
 */

/** A single translatable text: tr('Hello', 'مرحبا', 'Bonjour'). */
export const tr = (en: string, ar: string, fr: string): string =>
  JSON.stringify({ en, ar, fr });

/** A translatable list of strings (e.g. a service's feature bullets). */
export const trList = (en: string[], ar: string[], fr: string[]): string =>
  JSON.stringify({ en, ar, fr });
