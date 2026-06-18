import { PrismaClient } from '@prisma/client';
import { categories } from '../src/content/categories';
import { lessons } from '../src/content/lessons';
import { exams } from '../src/content/exams';
import { tools } from '../src/content/tools';
import { software } from '../src/content/software';
import { articles } from '../src/content/articles';
import { jobs } from '../src/content/jobs';
import { services } from '../src/content/services';

const prisma = new PrismaClient();

/**
 * Seeds the database from the editable content modules in `src/content/`.
 * To change site content, edit those files and re-run `npm run db:reset`.
 */
async function main() {
  console.log('Seeding Civildz database from src/content/ …');

  // Wipe (idempotent) so the seed reflects the content files exactly.
  await prisma.exercise.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.exam.deleteMany();
  await prisma.category.deleteMany();
  await prisma.tool.deleteMany();
  await prisma.softwareArticle.deleteMany();
  await prisma.article.deleteMany();
  await prisma.jobPosting.deleteMany();
  await prisma.service.deleteMany();

  // ── Categories ──────────────────────────────────────────────────────
  const categoryIdBySlug: Record<string, string> = {};
  for (const c of categories) {
    const created = await prisma.category.create({ data: c });
    categoryIdBySlug[c.slug] = created.id;
  }

  // ── Lessons (+ nested exercises) ────────────────────────────────────
  for (const { categorySlug, exercises, ...lesson } of lessons) {
    await prisma.lesson.create({
      data: {
        ...lesson,
        categoryId: categoryIdBySlug[categorySlug],
        exercises: { create: exercises },
      },
    });
  }

  // ── Exams ───────────────────────────────────────────────────────────
  for (const { categorySlug, questions, solutions, ...exam } of exams) {
    await prisma.exam.create({
      data: {
        ...exam,
        categoryId: categoryIdBySlug[categorySlug],
        content: JSON.stringify({ questions, solutions }),
      },
    });
  }

  // ── Tools ───────────────────────────────────────────────────────────
  for (const t of tools) await prisma.tool.create({ data: t });

  // ── Software guides ─────────────────────────────────────────────────
  for (const s of software) await prisma.softwareArticle.create({ data: s });

  // ── Articles ────────────────────────────────────────────────────────
  for (const a of articles) await prisma.article.create({ data: a });

  // ── Jobs ────────────────────────────────────────────────────────────
  for (const { deadline, ...job } of jobs) {
    await prisma.jobPosting.create({
      data: { ...job, deadline: deadline ? new Date(deadline) : null },
    });
  }

  // ── Services ────────────────────────────────────────────────────────
  for (const s of services) await prisma.service.create({ data: s });

  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
