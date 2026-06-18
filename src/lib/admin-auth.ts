import { cookies } from 'next/headers';

/**
 * Minimal password/token auth for the admin dashboard.
 *
 * A correct password (env `ADMIN_TOKEN`) sets an httpOnly cookie whose value is
 * the token; every protected request re-checks the cookie against the env var.
 * This is intentionally simple for v1 and can be upgraded to real sessions /
 * hashed credentials later without touching the dashboard UI.
 */
export const ADMIN_COOKIE = 'civildz_admin';
const SESSION_HOURS = 8;

export function adminToken(): string {
  return process.env.ADMIN_TOKEN ?? '';
}

/** Whether the current request carries a valid admin cookie. */
export function isAuthenticated(): boolean {
  const token = adminToken();
  if (!token) return false; // no token configured → locked down
  return cookies().get(ADMIN_COOKIE)?.value === token;
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
  path: '/admin',
  maxAge: SESSION_HOURS * 60 * 60,
};
