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

function buildLocalizedValue(formData: FormData, field: string) {
  return JSON.stringify({
    en: String(formData.get(`${field}En`) ?? '').trim(),
    ar: String(formData.get(`${field}Ar`) ?? '').trim(),
    fr: String(formData.get(`${field}Fr`) ?? '').trim(),
  });
}

function slugifyValue(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 200);
}

export async function createLesson(formData: FormData) {
  if (!isAuthenticated()) redirect('/admin/login');

  const titleEn = String(formData.get('titleEn') ?? '').trim();
  const titleAr = String(formData.get('titleAr') ?? '').trim();
  const titleFr = String(formData.get('titleFr') ?? '').trim();
  const summaryEn = String(formData.get('summaryEn') ?? '').trim();
  const summaryAr = String(formData.get('summaryAr') ?? '').trim();
  const summaryFr = String(formData.get('summaryFr') ?? '').trim();
  const contentEn = String(formData.get('contentEn') ?? '').trim();
  const contentAr = String(formData.get('contentAr') ?? '').trim();
  const contentFr = String(formData.get('contentFr') ?? '').trim();
  const videoUrl = String(formData.get('videoUrl') ?? '').trim();
  const categoryId = String(formData.get('categoryId') ?? '').trim();
  let slug = String(formData.get('slug') ?? '').trim();

  if (!categoryId || !titleEn) redirect('/admin/lessons/new?error=1');
  if (!slug) slug = slugifyValue(titleEn);
  if (!slug) redirect('/admin/lessons/new?error=1');

  await prisma.lesson.create({
    data: {
      slug,
      title: buildLocalizedValue(formData, 'title'),
      summary: buildLocalizedValue(formData, 'summary'),
      content: buildLocalizedValue(formData, 'content'),
      videoUrl: videoUrl || null,
      categoryId,
    },
  });

  revalidatePath('/admin/lessons');
  redirect('/admin/lessons');
}

export async function updateLesson(formData: FormData) {
  if (!isAuthenticated()) redirect('/admin/login');

  const id = String(formData.get('id') ?? '').trim();
  const titleEn = String(formData.get('titleEn') ?? '').trim();
  const videoUrl = String(formData.get('videoUrl') ?? '').trim();
  const categoryId = String(formData.get('categoryId') ?? '').trim();
  const slug = String(formData.get('slug') ?? '').trim();

  if (!id || !titleEn || !categoryId) return;

  const data: Record<string, unknown> = {
    title: buildLocalizedValue(formData, 'title'),
    summary: buildLocalizedValue(formData, 'summary'),
    content: buildLocalizedValue(formData, 'content'),
    videoUrl: videoUrl || null,
    categoryId,
  };

  data.slug = slug || slugifyValue(titleEn);

  await prisma.lesson.update({ where: { id }, data });

  revalidatePath('/admin/lessons');
  redirect('/admin/lessons');
}

export async function deleteLesson(formData: FormData) {
  if (!isAuthenticated()) redirect('/admin/login');
  const id = String(formData.get('id') ?? '').trim();
  if (!id) return;
  await prisma.lesson.delete({ where: { id } });
  revalidatePath('/admin/lessons');
  redirect('/admin/lessons');
}

export async function createTool(formData: FormData) {
  if (!isAuthenticated()) redirect('/admin/login');

  const slug = String(formData.get('slug') ?? '').trim();
  const icon = String(formData.get('icon') ?? 'calculator').trim() || 'calculator';
  const interactive = String(formData.get('interactive') ?? 'false') === 'true';
  const link = String(formData.get('link') ?? '').trim();

  if (!slug) redirect('/admin/tools/new?error=1');

  await prisma.tool.create({
    data: {
      slug,
      name: buildLocalizedValue(formData, 'name'),
      description: buildLocalizedValue(formData, 'description'),
      icon,
      interactive,
      link: link || null,
    },
  });

  revalidatePath('/admin/tools');
  redirect('/admin/tools');
}

export async function updateTool(formData: FormData) {
  if (!isAuthenticated()) redirect('/admin/login');

  const id = String(formData.get('id') ?? '').trim();
  const slug = String(formData.get('slug') ?? '').trim();
  const icon = String(formData.get('icon') ?? 'calculator').trim() || 'calculator';
  const interactive = String(formData.get('interactive') ?? 'false') === 'true';
  const link = String(formData.get('link') ?? '').trim();

  if (!id) return;

  const data: Record<string, unknown> = {
    name: buildLocalizedValue(formData, 'name'),
    description: buildLocalizedValue(formData, 'description'),
    icon,
    interactive,
    link: link || null,
  };

  if (slug) data.slug = slug;

  await prisma.tool.update({ where: { id }, data });

  revalidatePath('/admin/tools');
  redirect('/admin/tools');
}

export async function deleteTool(formData: FormData) {
  if (!isAuthenticated()) redirect('/admin/login');
  const id = String(formData.get('id') ?? '').trim();
  if (!id) return;
  await prisma.tool.delete({ where: { id } });
  revalidatePath('/admin/tools');
  redirect('/admin/tools');
}
