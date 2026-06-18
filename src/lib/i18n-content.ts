import { locales, type Locale } from '@/i18n/routing';

/**
 * A piece of database content translated into every supported locale.
 * Stored in the DB as a JSON *string* (SQLite has no native JSON type),
 * e.g. '{"en":"...","ar":"...","fr":"..."}'.
 */
export type LocalizedText = Partial<Record<Locale, string>>;
export type LocalizedList = Partial<Record<Locale, string[]>>;

/** Parse a value that may be a JSON string or an already-parsed object. */
export function parseJson<T = unknown>(value: unknown): T {
  if (typeof value === 'string') {
    try {
      return JSON.parse(value) as T;
    } catch {
      // Plain (non-JSON) string — return as-is so callers still get text.
      return value as unknown as T;
    }
  }
  return (value ?? {}) as T;
}

function resolve<T>(map: Partial<Record<Locale, T>>, locale: Locale, fallback: T): T {
  if (map[locale] !== undefined) return map[locale] as T;
  if (map.en !== undefined) return map.en as T;
  for (const l of locales) {
    if (map[l] !== undefined) return map[l] as T;
  }
  return fallback;
}

/**
 * Resolve a localized value, falling back to English and then to any
 * available locale so the UI never renders an empty string.
 */
export function pick(value: unknown, locale: Locale): string {
  return resolve(parseJson<LocalizedText>(value), locale, '');
}

/** Same as {@link pick} but for a list of strings (e.g. service features). */
export function pickList(value: unknown, locale: Locale): string[] {
  return resolve(parseJson<LocalizedList>(value), locale, []);
}
