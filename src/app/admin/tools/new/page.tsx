import { redirect } from 'next/navigation';
import { createTool } from '../../actions';
import { isAuthenticated } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

export default async function AdminToolNewPage({ searchParams }: { searchParams: { error?: string } }) {
  if (!isAuthenticated()) redirect('/admin/login');

  return (
    <div>
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
          <div>
            <div className="rule-gold mb-2" />
            <h1 className="text-xl font-bold">New Tool</h1>
            <p className="text-sm text-slate-500">Create a tool listing for the /tools page.</p>
          </div>
          <a href="/admin/tools" className="btn btn-outline">Back to tools</a>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          {searchParams.error && (
            <p className="mb-4 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">Please enter a slug and a name.</p>
          )}
          <form action={createTool} className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">Slug</span>
                <input name="slug" required className="calc-input" placeholder="concrete-calculator" />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">Icon</span>
                <input name="icon" className="calc-input" placeholder="calculator" />
              </label>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">Name (English)</span>
                <input name="nameEn" required className="calc-input" />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">Name (Arabic)</span>
                <input name="nameAr" className="calc-input" />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">Name (French)</span>
                <input name="nameFr" className="calc-input" />
              </label>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">Description (English)</span>
                <textarea name="descriptionEn" rows={3} className="calc-input" />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">Description (Arabic)</span>
                <textarea name="descriptionAr" rows={3} className="calc-input" />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">Description (French)</span>
                <textarea name="descriptionFr" rows={3} className="calc-input" />
              </label>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">Link / calculation URL</span>
                <input name="link" className="calc-input" placeholder="/tools/concrete-calculator or external URL" />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">Interactive</span>
                <select name="interactive" className="calc-input" defaultValue="false">
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </label>
            </div>

            <button type="submit" className="btn btn-primary">Create tool</button>
          </form>
        </div>
      </main>
    </div>
  );
}
