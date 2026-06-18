import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/admin-auth';
import { login } from '../actions';

export default function AdminLoginPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  if (isAuthenticated()) redirect('/admin');

  return (
    <main className="grid min-h-screen place-items-center bg-geometric p-4">
      <div className="w-full max-w-sm rounded-2xl border border-gold-400/30 bg-white p-8 shadow-xl">
        <div className="mb-6 flex items-center gap-2 font-extrabold text-brand-700">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-600 text-white">C</span>
          <span className="text-lg">Civildz Admin</span>
        </div>
        <h1 className="text-xl font-bold text-slate-900">Sign in</h1>
        <p className="mt-1 text-sm text-slate-500">Enter the admin password to continue.</p>

        <form action={login} className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-700">Password</span>
            <input
              type="password"
              name="password"
              required
              autoFocus
              className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-slate-900 outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/15"
            />
          </label>

          {searchParams.error && (
            <p className="text-sm font-medium text-red-600">Incorrect password. Please try again.</p>
          )}

          <button type="submit" className="btn-primary w-full py-3">
            Sign in
          </button>
        </form>
      </div>
    </main>
  );
}
