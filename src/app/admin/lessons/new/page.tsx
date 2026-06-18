import { redirect } from 'next/navigation';
import { createLesson } from '../../actions';
import { getCategories } from '@/lib/queries';
import { isAuthenticated } from '@/lib/admin-auth';
import { pick } from '@/lib/i18n-content';

export const dynamic = 'force-dynamic';

export default async function AdminLessonNewPage({ searchParams }: { searchParams: { error?: string } }) {
  if (!isAuthenticated()) redirect('/admin/login');

  const categories = await getCategories();

  return (
    <div>
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
          <div>
            <div className="rule-gold mb-2" />
            <h1 className="text-xl font-bold">New Lesson</h1>
            <p className="text-sm text-slate-500">Add a lesson with multilingual titles, summary, content and optional video.</p>
          </div>
          <a href="/admin/lessons" className="btn btn-outline">Back to lessons</a>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          {searchParams.error && (
            <p className="mb-4 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">Please enter a category and English title.</p>
          )}
          {categories.length === 0 ? (
            <p className="text-slate-600">Add categories in the database before creating lessons.</p>
          ) : (
            <form action={createLesson} className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-slate-700">Slug</span>
                  <input name="slug" className="calc-input" placeholder="optional custom slug" />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-slate-700">Category</span>
                  <select name="categoryId" className="calc-input" required>
                    <option value="">Select category</option>
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
                  <input name="titleEn" required className="calc-input" />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-slate-700">Title (Arabic)</span>
                  <input name="titleAr" className="calc-input" />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-slate-700">Title (French)</span>
                  <input name="titleFr" className="calc-input" />
                </label>
              </div>

              <div className="grid gap-6 lg:grid-cols-3">
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-slate-700">Summary (English)</span>
                  <textarea name="summaryEn" rows={3} className="calc-input" />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-slate-700">Summary (Arabic)</span>
                  <textarea name="summaryAr" rows={3} className="calc-input" />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-slate-700">Summary (French)</span>
                  <textarea name="summaryFr" rows={3} className="calc-input" />
                </label>
              </div>

              <div className="grid gap-6 lg:grid-cols-3">
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-slate-700">Content (English)</span>
                  <textarea name="contentEn" rows={6} className="calc-input" />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-slate-700">Content (Arabic)</span>
                  <textarea name="contentAr" rows={6} className="calc-input" />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-slate-700">Content (French)</span>
                  <textarea name="contentFr" rows={6} className="calc-input" />
                </label>
              </div>

              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">Video URL</span>
                <input name="videoUrl" className="calc-input" placeholder="https://youtube.com/..." />
              </label>

              <button type="submit" className="btn btn-primary">Create lesson</button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
