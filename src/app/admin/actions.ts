'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';
import { ADMIN_COOKIE, adminToken, isAuthenticated, sessionCookieOptions } from '@/lib/admin-auth';

const STATUSES = ['new', 'contacted', 'closed'] as const;

/** Validate the password and open an admin session. */
export async function login(formData: FormData) {
  const password = String(formData.get('password') ?? '');
  if (!adminToken() || password !== adminToken()) {
    redirect('/admin/login?error=1');
  }
  cookies().set(ADMIN_COOKIE, adminToken(), sessionCookieOptions);
  redirect('/admin');
}

/** End the admin session. */
export async function logout() {
  cookies().delete(ADMIN_COOKIE);
  redirect('/admin/login');
}

/** Update the status of a single quote request. */
export async function updateStatus(formData: FormData) {
  if (!isAuthenticated()) redirect('/admin/login');
  const id = String(formData.get('id') ?? '');
  const status = String(formData.get('status') ?? '');
  if (!id || !STATUSES.includes(status as (typeof STATUSES)[number])) return;
  await prisma.quoteRequest.update({ where: { id }, data: { status } });
  revalidatePath('/admin');
}
