import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Admin · Civildz',
  // Keep the dashboard out of search engines.
  robots: { index: false, follow: false },
};

// The admin area is a self-contained, non-localized route tree, so it provides
// its own root <html>/<body> (separate from the public [locale] layout).
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <body className="bg-admin min-h-screen font-sans text-slate-200 antialiased">
        {children}
      </body>
    </html>
  );
}
