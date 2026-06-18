import { tr } from './_shared';

/**
 * ARTICLES — tutorials and featured posts.
 * `featured: true` makes an article appear in the homepage "Featured" row.
 * `type` is 'tutorial' or 'featured' (used for labelling/filtering).
 */
export const articles = [
  {
    slug: 'reading-a-reinforcement-drawing',
    type: 'tutorial',
    featured: true,
    title: tr('How to Read a Reinforcement Drawing', 'كيف تقرأ مخطط التسليح', 'Lire un plan de ferraillage'),
    excerpt: tr(
      'Bar marks, spacing notation and section views explained step by step.',
      'علامات القضبان ورموز التباعد والمقاطع مشروحة خطوة بخطوة.',
      'Repères, notation d\'espacement et coupes expliqués pas à pas.',
    ),
    content: tr(
      '<p>Reinforcement drawings use a compact notation. <code>T12@150</code> means 12&nbsp;mm bars every 150&nbsp;mm. This guide walks through bar marks, bending schedules and how plan and section views relate.</p>',
      '<p>تستخدم مخططات التسليح ترميزًا مختصرًا. <code>T12@150</code> تعني قضبان 12 مم كل 150 مم. يشرح هذا الدليل علامات القضبان وجداول الثني وكيفية ارتباط المسقط بالمقطع.</p>',
      '<p>Les plans de ferraillage utilisent une notation compacte. <code>T12@150</code> signifie des barres de 12&nbsp;mm tous les 150&nbsp;mm. Ce guide explique les repères, les nomenclatures et la relation plan/coupe.</p>',
    ),
  },
  {
    slug: 'five-site-safety-rules',
    type: 'featured',
    featured: true,
    title: tr('Five Essential Site Safety Rules', 'خمس قواعد أساسية لسلامة الموقع', 'Cinq règles de sécurité de chantier'),
    excerpt: tr(
      'Simple habits that prevent the most common construction accidents.',
      'عادات بسيطة تمنع أكثر حوادث البناء شيوعًا.',
      'Des habitudes simples qui évitent les accidents les plus courants.',
    ),
    content: tr(
      '<ol><li>Always wear PPE.</li><li>Keep walkways clear.</li><li>Inspect scaffolding daily.</li><li>Barricade open excavations.</li><li>Brief the team before risky operations.</li></ol>',
      '<ol><li>ارتدِ معدات الوقاية دائمًا.</li><li>أبقِ الممرّات خالية.</li><li>افحص السقالات يوميًا.</li><li>سيّج الحفريات المفتوحة.</li><li>اشرح للفريق قبل العمليات الخطرة.</li></ol>',
      '<ol><li>Portez toujours les EPI.</li><li>Dégagez les passages.</li><li>Inspectez les échafaudages chaque jour.</li><li>Barricadez les fouilles ouvertes.</li><li>Briefez l\'équipe avant les opérations à risque.</li></ol>',
    ),
  },
];
