import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { isAuthenticated } from '@/lib/admin-auth';
import { Icon } from '@/components/Icon';
import { logout, updateStatus } from './actions';

// Always render fresh data (reads cookies + db).
export const dynamic = 'force-dynamic';

// Dark glass status pills.
const STATUS_STYLES: Record<string, string> = {
  new: 'bg-amber-400/15 text-amber-300 ring-1 ring-inset ring-amber-400/30',
  contacted: 'bg-brand-400/15 text-brand-300 ring-1 ring-inset ring-brand-400/30',
  closed: 'bg-emerald-400/15 text-emerald-300 ring-1 ring-inset ring-emerald-400/30',
};

// Per-stat icon + accent, applied to the glass stat cards.
const STAT_META: Record<
  string,
  { icon: string; ring: string; text: string; glow: string }
> = {
  total: { icon: 'document', ring: 'from-brand-500/30 to-brand-400/10', text: 'text-brand-300', glow: 'glow-blue' },
  new: { icon: 'arrow', ring: 'from-gold-400/30 to-gold-300/10', text: 'text-gold-300', glow: 'glow-gold' },
  contacted: { icon: 'globe', ring: 'from-brand-400/30 to-brand-300/10', text: 'text-brand-300', glow: 'glow-blue' },
  closed: { icon: 'cube', ring: 'from-emerald-500/30 to-emerald-400/10', text: 'text-emerald-300', glow: '' },
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

  const navCards = [
    { href: '/admin/lessons', icon: 'book', title: 'Lessons', desc: 'Manage study lessons' },
    { href: '/admin/tools', icon: 'ruler', title: 'Tools', desc: 'Manage engineering tools' },
    { href: '/admin', icon: 'document', title: 'Requests', desc: 'View quote requests' },
  ];

  return (
    <div className="relative">
      {/* Top bar */}
      <header className="sticky top-0 z-10 border-b border-white/10 bg-white/[0.03] backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-6">
          <div>
            <div className="rule-gold mb-2" />
            <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-sm text-slate-400">
              Manage quote requests, lessons, tools and website content.
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <a
              href="/admin/lessons"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-white/20 hover:text-white"
            >
              <Icon name="book" width={16} height={16} /> Lessons
            </a>
            <a
              href="/admin/tools"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-white/20 hover:text-white"
            >
              <Icon name="ruler" width={16} height={16} /> Tools
            </a>
            <form action={logout}>
              <button className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-300 transition hover:border-rose-400/30 hover:bg-rose-500/10 hover:text-rose-300">
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {/* Quick navigation */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {navCards.map((c) => (
            <a
              key={c.title}
              href={c.href}
              className="glass-panel group flex items-center gap-4 p-5 transition duration-300 hover:border-white/20 hover:glow-blue"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-500/30 to-brand-400/10 text-brand-300 ring-1 ring-inset ring-white/10">
                <Icon name={c.icon} />
              </span>
              <span>
                <span className="block text-lg font-bold text-white">{c.title}</span>
                <span className="mt-0.5 block text-sm text-slate-400">{c.desc}</span>
              </span>
            </a>
          ))}
        </div>

        {/* Stats overview */}
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((s) => {
            const meta = STAT_META[s.key];
            return (
              <div key={s.key} className={`glass-panel p-5 ${meta.glow}`}>
                <span
                  className={`mb-4 grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${meta.ring} ${meta.text} ring-1 ring-inset ring-white/10`}
                >
                  <Icon name={meta.icon} />
                </span>
                <div className="text-3xl font-extrabold tracking-tight text-white">{s.value}</div>
                <div className="mt-1 text-sm font-medium text-slate-400">{s.label}</div>
              </div>
            );
          })}
        </div>

        {/* Quote requests table */}
        <div className="glass-panel mt-8 overflow-hidden">
          <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4">
            <div>
              <h2 className="text-base font-semibold text-white">Quote Requests</h2>
              <p className="mt-0.5 text-sm text-slate-400">Latest submissions from the website</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-left text-sm">
              <thead className="text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-5 py-3 font-medium">Date</th>
                  <th className="px-5 py-3 font-medium">Contact</th>
                  <th className="px-5 py-3 font-medium">Service</th>
                  <th className="px-5 py-3 font-medium">Message</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {quotes.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-5 py-12 text-center text-slate-500">
                      No quote requests yet.
                    </td>
                  </tr>
                )}
                {quotes.map((q) => (
                  <tr key={q.id} className="align-top transition-colors duration-200 hover:bg-white/5">
                    <td className="whitespace-nowrap px-5 py-4 text-slate-400">{formatDate(q.createdAt)}</td>
                    <td className="px-5 py-4">
                      <div className="font-medium text-white">{q.name}</div>
                      <a href={`mailto:${q.email}`} className="text-brand-300 hover:underline">
                        {q.email}
                      </a>
                      {q.phone && <div className="text-slate-500">{q.phone}</div>}
                    </td>
                    <td className="px-5 py-4">
                      <div className="text-slate-300">{q.serviceType}</div>
                      {q.budget && <div className="text-xs text-slate-500">Budget: {q.budget}</div>}
                    </td>
                    <td className="max-w-xs px-5 py-4">
                      <p className="whitespace-pre-line text-slate-400">{q.message}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`mb-2 inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          STATUS_STYLES[q.status] ?? 'bg-white/10 text-slate-300'
                        }`}
                      >
                        {q.status}
                      </span>
                      <form action={updateStatus} className="flex items-center gap-2">
                        <input type="hidden" name="id" value={q.id} />
                        <select
                          name="status"
                          defaultValue={q.status}
                          className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs text-slate-200 outline-none transition focus:border-brand-400/50 [&>option]:bg-navy-900"
                        >
                          <option value="new">new</option>
                          <option value="contacted">contacted</option>
                          <option value="closed">closed</option>
                        </select>
                        <button className="rounded-lg bg-brand-600 px-2.5 py-1 text-xs font-semibold text-white transition hover:bg-brand-500">
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
