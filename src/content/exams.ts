import { tr } from './_shared';

/**
 * EXAMS (with full solutions). `questions` and `solutions` are shown in
 * collapsible boxes on the subject page. `durationMin` is the time shown on
 * the badge. Set `categorySlug` to a subject from `categories.ts`.
 */
export const exams = [
  {
    slug: 'som-midterm-axial',
    categorySlug: 'strength-of-materials',
    order: 1,
    durationMin: 90,
    title: tr('Midterm — Axial Loading', 'امتحان نصفي — التحميل المحوري', 'Partiel — Sollicitation axiale'),
    description: tr(
      'Two exercises on normal stress, strain and thermal effects.',
      'تمرينان حول الإجهاد العادي والانفعال والتأثيرات الحرارية.',
      'Deux exercices sur la contrainte normale, la déformation et les effets thermiques.',
    ),
    questions: tr(
      'Ex.1 — A bronze rod (E = 100 GPa, A = 300 mm², L = 1.5 m) carries 30 kN. Find σ and ΔL.\nEx.2 — The same rod is heated by ΔT = 40 °C (α = 18×10⁻⁶ /°C). Find the free thermal elongation.',
      'تمرين 1 — قضيب برونزي (E = 100 جيجا، A = 300 مم²، L = 1.5 م) يحمل 30 كيلونيوتن. أوجد σ وΔL.\nتمرين 2 — يُسخّن القضيب نفسه بمقدار ΔT = 40 °م (α = 18×10⁻⁶). أوجد الاستطالة الحرارية الحرة.',
      'Ex.1 — Une barre en bronze (E = 100 GPa, A = 300 mm², L = 1,5 m) supporte 30 kN. Calculer σ et ΔL.\nEx.2 — La même barre est chauffée de ΔT = 40 °C (α = 18×10⁻⁶ /°C). Calculer l\'allongement thermique libre.',
    ),
    solutions: tr(
      'Ex.1 — σ = 30 000 / 300 = 100 MPa ; ΔL = 30 000 × 1500 / (300 × 100 000) = 1.5 mm.\nEx.2 — ΔL_T = α·ΔT·L = 18×10⁻⁶ × 40 × 1500 = 1.08 mm.',
      'تمرين 1 — σ = 30000 / 300 = 100 ميجا؛ ΔL = 30000 × 1500 / (300 × 100000) = 1.5 مم.\nتمرين 2 — ΔL_T = α·ΔT·L = 18×10⁻⁶ × 40 × 1500 = 1.08 مم.',
      'Ex.1 — σ = 30 000 / 300 = 100 MPa ; ΔL = 30 000 × 1500 / (300 × 100 000) = 1,5 mm.\nEx.2 — ΔL_T = α·ΔT·L = 18×10⁻⁶ × 40 × 1500 = 1,08 mm.',
    ),
  },
];
