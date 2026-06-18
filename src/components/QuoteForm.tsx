'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { whatsappLink } from '@/lib/site';
import { Icon } from './Icon';

export function QuoteForm({ serviceOptions }: { serviceOptions: { value: string; label: string }[] }) {
  const t = useTranslations('quote');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="card p-8 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-green-100 text-green-600">
          <Icon name="arrow" width={26} height={26} />
        </span>
        <p className="mt-4 text-lg font-semibold text-slate-900">{t('success')}</p>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline mt-6"
        >
          <Icon name="whatsapp" width={18} height={18} />
          {t('orWhatsApp')}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card space-y-5 p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t('name')} required>
          <input name="name" required className="input" />
        </Field>
        <Field label={t('email')} required>
          <input name="email" type="email" required className="input" />
        </Field>
        <Field label={t('phone')}>
          <input name="phone" type="tel" className="input" />
        </Field>
        <Field label={t('budget')}>
          <input name="budget" className="input" />
        </Field>
      </div>

      <Field label={t('serviceType')} required>
        <select name="serviceType" required defaultValue="" className="input">
          <option value="" disabled>
            {t('selectService')}
          </option>
          {serviceOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </Field>

      <Field label={t('message')} required>
        <textarea name="message" required rows={5} className="input" />
      </Field>

      {status === 'error' && <p className="text-sm font-medium text-red-600">{t('error')}</p>}

      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" disabled={status === 'submitting'} className="btn-gold px-6 py-3 disabled:opacity-60">
          <Icon name="document" width={18} height={18} />
          {status === 'submitting' ? t('submitting') : t('submit')}
        </button>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-green-600 hover:text-green-700"
        >
          <Icon name="whatsapp" width={18} height={18} />
          {t('orWhatsApp')}
        </a>
      </div>

      <style>{`
        .input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid rgb(203 213 225);
          background: white;
          padding: 0.625rem 0.875rem;
          font-size: 0.95rem;
          color: rgb(15 23 42);
          outline: none;
        }
        .input:focus { border-color: rgb(29 78 216); box-shadow: 0 0 0 3px rgba(29,78,216,0.15); }
      `}</style>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      {children}
    </label>
  );
}
