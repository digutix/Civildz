import { tr } from './_shared';

/**
 * JOB OPPORTUNITIES.
 * `type` is one of: training | competition | tip | job (controls the badge).
 * `deadline` is an ISO date 'YYYY-MM-DD' or null. `location` is optional text.
 */
export const jobs = [
  {
    slug: 'site-engineer-training',
    type: 'training',
    location: 'Jijel',
    deadline: null as string | null,
    title: tr('Site Engineer Training Programme', 'برنامج تدريب مهندس موقع', 'Formation ingénieur de chantier'),
    excerpt: tr('A 3-month hands-on programme covering site management basics.', 'برنامج عملي مدته 3 أشهر يغطي أساسيات إدارة الموقع.', 'Programme pratique de 3 mois sur la gestion de chantier.'),
    content: tr('<p>Covers setting-out, quality control, quantity take-off and coordination with subcontractors. Certificate on completion.</p>', '<p>يغطّي التوقيع ومراقبة الجودة وحصر الكميات والتنسيق مع المقاولين. شهادة عند الإتمام.</p>', '<p>Implantation, contrôle qualité, métré et coordination des sous-traitants. Certificat à la fin.</p>'),
  },
  {
    slug: 'public-works-competition-2026',
    type: 'competition',
    location: null as string | null,
    deadline: '2026-09-30',
    title: tr('Public Works Engineering Competition', 'مسابقة هندسة الأشغال العمومية', 'Concours ingénieur travaux publics'),
    excerpt: tr('National recruitment competition for civil engineers.', 'مسابقة توظيف وطنية لمهندسي البناء.', 'Concours national de recrutement d\'ingénieurs civils.'),
    content: tr('<p>Written tests in structures and hydraulics followed by an interview. Prepare with our study section and past papers.</p>', '<p>اختبارات كتابية في الإنشاءات والهيدروليك يليها مقابلة. استعد عبر قسم الدراسة والامتحانات السابقة.</p>', '<p>Épreuves écrites en structures et hydraulique suivies d\'un entretien. Préparez-vous avec notre section études.</p>'),
  },
  {
    slug: 'interview-tip-star-method',
    type: 'tip',
    location: null as string | null,
    deadline: null as string | null,
    title: tr('Ace Interviews with the STAR Method', 'انجح في المقابلات بطريقة STAR', 'Réussir l\'entretien avec la méthode STAR'),
    excerpt: tr('Structure your answers: Situation, Task, Action, Result.', 'رتّب إجاباتك: الموقف، المهمة، الإجراء، النتيجة.', 'Structurez vos réponses : Situation, Tâche, Action, Résultat.'),
    content: tr('<p>For each behavioural question, describe the <strong>Situation</strong>, the <strong>Task</strong>, the <strong>Action</strong> you took and the measurable <strong>Result</strong>.</p>', '<p>لكل سؤال سلوكي، صف <strong>الموقف</strong> و<strong>المهمة</strong> و<strong>الإجراء</strong> الذي اتخذته و<strong>النتيجة</strong> القابلة للقياس.</p>', '<p>Pour chaque question, décrivez la <strong>Situation</strong>, la <strong>Tâche</strong>, l\'<strong>Action</strong> menée et le <strong>Résultat</strong> mesurable.</p>'),
  },
];
