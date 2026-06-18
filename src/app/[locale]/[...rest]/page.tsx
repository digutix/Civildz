import { notFound } from 'next/navigation';

// Any unmatched path under a locale falls through to the localized not-found,
// which renders inside the [locale] layout (header, footer, correct dir/lang).
export default function CatchAllPage() {
  notFound();
}
