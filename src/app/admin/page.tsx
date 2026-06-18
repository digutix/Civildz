import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { isAuthenticated } from '@/lib/admin-auth';
import { logout, updateStatus } from './actions';

// Always render fresh data (reads cookies + db).
export const dynamic = 'force-dynamic';

const STATUS_STYLES: Record<string, string> = {
  new: 'bg-amber-100 text-amber-800',
  contacted: 'bg-blue-100 text-blue-800',
  closed: 'bg-green-100 text-green-800',
};

function formatDate(d: Date) {
  return new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeStyle: 'short' }).format(d);
}

export default async function AdminDashboard() {
  if (!isAuthenticated()) redirect('/admin/login');

  const [quotes, grouped] = await Promise.all([
    prisma.quoteRequest.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.quoteRequest.groupBy({ by: ['status'], _count: { _all: true } }),
  ]);

  const counts = Object.fromEntries(grouped.map((g) => [g.status, g._count._all]));
  const stats = [
    { label: 'Total', value: quotes.length, key: 'total' },
    { label: 'New', value: counts.new ?? 0, key: 'new' },
    { label: 'Contacted', value: counts.contacted ?? 0, key: 'contacted' },
    { label: 'Closed', value: counts.closed ?? 0, key: 'closed' },
  ];

  return (
    <div>
      {/* Top bar */}
      <header className="border-b border-white/10 bg-geometric text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
          <div>
            <div className="rule-gold mb-2" />
            <h1 className="text-xl font-bold">Quote requests</h1>
            <p className="text-sm text-slate-300">Leads submitted through the website.</p>
          </div>
          <form action={logout}>
            <button className="btn border border-white/15 bg-white/5 text-white hover:bg-white/10">
              Sign out
            </button>
          </form>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.key} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="text-2xl font-extrabold text-slate-900">{s.value}</div>
              <div className="text-sm text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3 font-semibold">Contact</th>
                  <th className="px-4 py-3 font-semibold">Service</th>
                  <th className="px-4 py-3 font-semibold">Message</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {quotes.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-10 text-center text-slate-400">
                      No quote requests yet.
                    </td>
                  </tr>
                )}
                {quotes.map((q) => (
                  <tr key={q.id} className="align-top hover:bg-slate-50/60">
                    <td className="whitespace-nowrap px-4 py-3 text-slate-500">{formatDate(q.createdAt)}</td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-slate-900">{q.name}</div>
                      <a href={`mailto:${q.email}`} className="text-brand-700 hover:underline">
                        {q.email}
                      </a>
                      {q.phone && <div className="text-slate-500">{q.phone}</div>}
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-slate-700">{q.serviceType}</div>
                      {q.budget && <div className="text-xs text-slate-400">Budget: {q.budget}</div>}
                    </td>
                    <td className="max-w-xs px-4 py-3">
                      <p className="whitespace-pre-line text-slate-600">{q.message}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`mb-2 inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          STATUS_STYLES[q.status] ?? 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {q.status}
                      </span>
                      <form action={updateStatus} className="flex items-center gap-2">
                        <input type="hidden" name="id" value={q.id} />
                        <select
                          name="status"
                          defaultValue={q.status}
                          className="rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs outline-none focus:border-brand-600"
                        >
                          <option value="new">new</option>
                          <option value="contacted">contacted</option>
                          <option value="closed">closed</option>
                        </select>
                        <button className="rounded-lg bg-brand-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-brand-700">
                          Save
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
