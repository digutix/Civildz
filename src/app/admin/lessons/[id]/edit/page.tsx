import { notFound, redirect } from 'next/navigation';
import { getLessonById, getCategories } from '@/lib/queries';
import { isAuthenticated } from '@/lib/admin-auth';
import { parseJson, pick } from '@/lib/i18n-content';
import { updateLesson } from '../../../actions';

export const dynamic = 'force-dynamic';

function localized(value: unknown) {
  return parseJson<Record<string, string>>(value) ?? {};
}

export default async function AdminLessonEditPage({ params }: { params: { id: string } }) {
  if (!isAuthenticated()) redirect('/admin/login');

  const [lesson, categories] = await Promise.all([getLessonById(params.id), getCategories()]);
  if (!lesson) notFound();

  const title = localized(lesson.title);
  const summary = localized(lesson.summary);
  const content = localized(lesson.content);

  return (
    <div>
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
          <div>
            <div className="rule-gold mb-2" />
            <h1 className="text-xl font-bold">Edit Lesson</h1>
            <p className="text-sm text-slate-500">Update the lesson content and metadata.</p>
          </div>
          <div className="flex items-center gap-3">
            <a href="/admin/lessons" className="btn btn-outline">Back to lessons</a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <form action={updateLesson} className="space-y-6">
            <input type="hidden" name="id" value={lesson.id} />

            <div className="grid gap-6 lg:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">Slug</span>
                <input name="slug" className="calc-input" defaultValue={lesson.slug} />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">Category</span>
                <select name="categoryId" className="calc-input" defaultValue={lesson.categoryId} required>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {pick(category.title, 'en')}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">Title (English)</span>
                <input name="titleEn" defaultValue={title.en ?? ''} required className="calc-input" />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">Title (Arabic)</span>
                <input name="titleAr" defaultValue={title.ar ?? ''} className="calc-input" />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">Title (French)</span>
                <input name="titleFr" defaultValue={title.fr ?? ''} className="calc-input" />
              </label>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">Summary (English)</span>
                <textarea name="summaryEn" rows={3} defaultValue={summary.en ?? ''} className="calc-input" />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">Summary (Arabic)</span>
                <textarea name="summaryAr" rows={3} defaultValue={summary.ar ?? ''} className="calc-input" />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">Summary (French)</span>
                <textarea name="summaryFr" rows={3} defaultValue={summary.fr ?? ''} className="calc-input" />
              </label>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">Content (English)</span>
                <textarea name="contentEn" rows={6} defaultValue={content.en ?? ''} className="calc-input" />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">Content (Arabic)</span>
                <textarea name="contentAr" rows={6} defaultValue={content.ar ?? ''} className="calc-input" />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">Content (French)</span>
                <textarea name="contentFr" rows={6} defaultValue={content.fr ?? ''} className="calc-input" />
              </label>
            </div>

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">Video URL</span>
              <input name="videoUrl" className="calc-input" defaultValue={lesson.videoUrl ?? ''} placeholder="https://youtube.com/..." />
            </label>

            <button type="submit" className="btn btn-primary">Save lesson</button>
          </form>
        </div>
      </main>
    </div>
  );
}
