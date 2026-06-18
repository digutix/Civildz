'use client';

import { useTranslations } from 'next-intl';
import { whatsappLink } from '@/lib/site';
import { Icon } from './Icon';

export function WhatsAppButton() {
  const t = useTranslations('common');
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('chatOnWhatsApp')}
      className="fixed bottom-5 end-5 z-50 inline-flex items-center gap-2 rounded-full bg-green-500 px-4 py-3 text-white shadow-lg transition hover:bg-green-600 hover:shadow-xl"
    >
      <Icon name="whatsapp" width={24} height={24} />
      <span className="hidden text-sm font-semibold sm:inline">{t('chatOnWhatsApp')}</span>
    </a>
  );
}
