import { notFound, redirect } from 'next/navigation';
import { getToolById } from '@/lib/queries';
import { isAuthenticated } from '@/lib/admin-auth';
import { parseJson, pick } from '@/lib/i18n-content';
import { updateTool } from '../../../actions';

export const dynamic = 'force-dynamic';

function localized(value: unknown) {
  return parseJson<Record<string, string>>(value) ?? {};
}

export default async function AdminToolEditPage({ params }: { params: { id: string } }) {
  if (!isAuthenticated()) redirect('/admin/login');

  const tool = await getToolById(params.id);
  if (!tool) notFound();

  const name = localized(tool.name);
  const description = localized(tool.description);

  return (
    <div>
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
          <div>
            <div className="rule-gold mb-2" />
            <h1 className="text-xl font-bold">Edit Tool</h1>
            <p className="text-sm text-slate-500">Update the tool listing and link.</p>
          </div>
          <a href="/admin/tools" className="btn btn-outline">Back to tools</a>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <form action={updateTool} className="space-y-6">
            <input type="hidden" name="id" value={tool.id} />

            <div className="grid gap-6 lg:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">Slug</span>
                <input name="slug" defaultValue={tool.slug} className="calc-input" />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">Icon</span>
                <input name="icon" defaultValue={tool.icon} className="calc-input" />
              </label>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">Name (English)</span>
                <input name="nameEn" required defaultValue={name.en ?? ''} className="calc-input" />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">Name (Arabic)</span>
                <input name="nameAr" defaultValue={name.ar ?? ''} className="calc-input" />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">Name (French)</span>
                <input name="nameFr" defaultValue={name.fr ?? ''} className="calc-input" />
              </label>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">Description (English)</span>
                <textarea name="descriptionEn" rows={3} defaultValue={description.en ?? ''} className="calc-input" />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">Description (Arabic)</span>
                <textarea name="descriptionAr" rows={3} defaultValue={description.ar ?? ''} className="calc-input" />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">Description (French)</span>
                <textarea name="descriptionFr" rows={3} defaultValue={description.fr ?? ''} className="calc-input" />
              </label>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">Link</span>
                <input name="link" defaultValue={tool.link ?? ''} className="calc-input" placeholder="/tools/concrete-calculator" />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">Interactive</span>
                <select name="interactive" defaultValue={String(tool.interactive)} className="calc-input">
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </label>
            </div>

            <button type="submit" className="btn btn-primary">Save tool</button>
          </form>
        </div>
      </main>
    </div>
  );
}
