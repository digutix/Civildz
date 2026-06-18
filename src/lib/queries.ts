import { prisma } from './db';

// Centralised data-access helpers used by server components.

export function getCategories() {
  return prisma.category.findMany({ orderBy: { order: 'asc' } });
}

export function getCategoryBySlug(slug: string) {
  return prisma.category.findUnique({
    where: { slug },
    include: {
      lessons: { orderBy: { order: 'asc' } },
      exams: { orderBy: { order: 'asc' } },
    },
  });
}

export function getLessonBySlug(slug: string) {
  return prisma.lesson.findUnique({
    where: { slug },
    include: {
      category: true,
      exercises: { orderBy: { order: 'asc' } },
    },
  });
}

export function getLessonById(id: string) {
  return prisma.lesson.findUnique({
    where: { id },
    include: { category: true },
  });
}

export function getLessons() {
  return prisma.lesson.findMany({
    orderBy: { order: 'asc' },
    include: { category: true },
  });
}

export function getTools() {
  return prisma.tool.findMany({ orderBy: { order: 'asc' } });
}

export function getToolById(id: string) {
  return prisma.tool.findUnique({ where: { id } });
}

export function getSoftwareArticles() {
  return prisma.softwareArticle.findMany({ orderBy: { order: 'asc' } });
}

export function getSoftwareArticleBySlug(slug: string) {
  return prisma.softwareArticle.findUnique({ where: { slug } });
}

export function getArticles(opts?: { featured?: boolean; take?: number }) {
  return prisma.article.findMany({
    where: opts?.featured ? { featured: true } : undefined,
    orderBy: { publishedAt: 'desc' },
    take: opts?.take,
  });
}

export function getArticleBySlug(slug: string) {
  return prisma.article.findUnique({ where: { slug } });
}

export function getJobs() {
  return prisma.jobPosting.findMany({ orderBy: { createdAt: 'desc' } });
}

export function getServices() {
  return prisma.service.findMany({ orderBy: { order: 'asc' } });
}

export function getExams(take?: number) {
  return prisma.exam.findMany({
    orderBy: { order: 'asc' },
    take,
    include: { category: true },
  });
}
