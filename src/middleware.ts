import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - API routes
  // - the admin dashboard (its own non-localized route tree)
  // - Next.js internals (_next)
  // - static files (those containing a dot)
  matcher: ['/((?!api|admin|_next|_vercel|.*\\..*).*)'],
};
