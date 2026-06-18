import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { pick } from '@/lib/i18n-content';
import { getTools } from '@/lib/queries';
import { PageHero, LinkCard, Badge } from '@/components/ui';

export default async function ToolsPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const l = locale as Locale;
  const t = await getTranslations('tools');
  const tc = await getTranslations('common');
  const tools = await getTools();

  return (
    <>
      <PageHero title={t('title')} subtitle={t('subtitle')} icon="calculator" />
      <div className="container-page py-12">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <LinkCard
              key={tool.id}
              href={tool.interactive ? `/tools/${tool.slug}` : '/tools'}
              icon={tool.icon}
              title={pick(tool.name, l)}
              description={pick(tool.description, l)}
              badge={
                tool.interactive ? (
                  <Badge color="green">{tc('open')}</Badge>
                ) : (
                  <Badge color="slate">{tc('comingSoon')}</Badge>
                )
              }
            />
          ))}
        </div>
      </div>
    </>
  );
}
