import { redirect } from 'next/navigation';
import { deleteTool } from '../actions';
import { getTools } from '@/lib/queries';
import { isAuthenticated } from '@/lib/admin-auth';
import { pick } from '@/lib/i18n-content';

export const dynamic = 'force-dynamic';

export default async function AdminToolsPage() {
  if (!isAuthenticated()) redirect('/admin/login');

  const tools = await getTools();

  return (
    <div>
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
          <div>
            <div className="rule-gold mb-2" />
            <h1 className="text-xl font-bold">Engineering Tools</h1>
            <p className="text-sm text-slate-500">Manage tool listings and calculation links.</p>
          </div>
          <div className="flex items-center gap-3">
            <a href="/admin" className="btn btn-outline">Back to dashboard</a>
            <a href="/admin/tools/new" className="btn btn-primary">New tool</a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Link</th>
                  <th className="px-4 py-3 font-semibold">Interactive</th>
                  <th className="px-4 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tools.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-10 text-center text-slate-400">
                      No tools yet. Create a new tool to populate the tools page.
                    </td>
                  </tr>
                ) : (
                  tools.map((tool) => (
                    <tr key={tool.id} className="align-top hover:bg-slate-50/60">
                      <td className="px-4 py-3 text-slate-700">{pick(tool.name, 'en') || tool.slug}</td>
                      <td className="px-4 py-3 text-slate-500">{tool.link || '-'}</td>
                      <td className="px-4 py-3 text-slate-500">{tool.interactive ? 'Yes' : 'No'}</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-2">
                          <a href={`/admin/tools/${tool.id}/edit`} className="btn btn-outline px-3 py-2 text-xs">
                            Edit
                          </a>
                          <form action={deleteTool} className="inline-flex" method="post">
                            <input type="hidden" name="id" value={tool.id} />
                            <button type="submit" className="btn btn-accent px-3 py-2 text-xs">
                              Delete
                            </button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
