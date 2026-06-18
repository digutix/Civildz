import { tr } from './_shared';

/**
 * LESSONS (lesson body + summary + video link + solved exercises)
 *
 * To add a lesson: copy a block, change `slug`, set `categorySlug` to one of the
 * subjects in `categories.ts`, and edit the texts.
 *
 * ▸ `videoUrl` — paste any YouTube link here (watch/share/embed all work).
 *   Set it to an empty string '' to hide the video.
 */
export const lessons = [
  {
    slug: 'normal-stress-and-strain',
    categorySlug: 'strength-of-materials',
    order: 1,
    videoUrl: 'https://www.youtube.com/watch?v=aQf6Q8t1FQE',
    title: tr('Normal Stress and Strain', 'الإجهاد والانفعال العادي', 'Contrainte et déformation normales'),
    summary: tr(
      'Stress σ = N / A.\nStrain ε = ΔL / L.\nHooke\'s law: σ = E · ε.\nElongation: ΔL = N·L / (A·E).',
      'الإجهاد σ = N / A.\nالانفعال ε = ΔL / L.\nقانون هوك: σ = E · ε.\nالاستطالة: ΔL = N·L / (A·E).',
      'Contrainte σ = N / A.\nDéformation ε = ΔL / L.\nLoi de Hooke : σ = E · ε.\nAllongement : ΔL = N·L / (A·E).',
    ),
    content: tr(
      `<h2>Definition</h2><p>Normal stress is the internal force per unit area acting perpendicular to a cross-section: <code>σ = N / A</code>, where <strong>N</strong> is the axial force and <strong>A</strong> the cross-sectional area.</p><h2>Normal strain</h2><p>Strain measures the relative change in length: <code>ε = ΔL / L</code>. It is dimensionless.</p><h2>Hooke's law</h2><p>Within the elastic range, stress is proportional to strain: <code>σ = E · ε</code>, where <strong>E</strong> is Young's modulus. Combining the relations gives the elongation of a bar:</p><ul><li><code>ΔL = N · L / (A · E)</code></li></ul><p>Typical values of E: steel ≈ 210 GPa, concrete ≈ 30 GPa, aluminium ≈ 70 GPa.</p>`,
      `<h2>التعريف</h2><p>الإجهاد العادي هو القوة الداخلية لكل وحدة مساحة العمودية على المقطع: <code>σ = N / A</code>، حيث <strong>N</strong> القوة المحورية و<strong>A</strong> مساحة المقطع.</p><h2>الانفعال العادي</h2><p>يقيس الانفعال التغيّر النسبي في الطول: <code>ε = ΔL / L</code>، وهو بلا وحدة.</p><h2>قانون هوك</h2><p>ضمن المجال المرن، يتناسب الإجهاد مع الانفعال: <code>σ = E · ε</code>، حيث <strong>E</strong> معامل يونغ. وبدمج العلاقات نحصل على استطالة العنصر:</p><ul><li><code>ΔL = N · L / (A · E)</code></li></ul><p>قيم نموذجية لـ E: الفولاذ ≈ 210 جيجاباسكال، الخرسانة ≈ 30، الألمنيوم ≈ 70.</p>`,
      `<h2>Définition</h2><p>La contrainte normale est l'effort interne par unité de surface perpendiculaire à la section : <code>σ = N / A</code>, où <strong>N</strong> est l'effort axial et <strong>A</strong> l'aire de la section.</p><h2>Déformation normale</h2><p>La déformation mesure la variation relative de longueur : <code>ε = ΔL / L</code>. Elle est sans dimension.</p><h2>Loi de Hooke</h2><p>Dans le domaine élastique, la contrainte est proportionnelle à la déformation : <code>σ = E · ε</code>, où <strong>E</strong> est le module de Young. En combinant, on obtient l'allongement :</p><ul><li><code>ΔL = N · L / (A · E)</code></li></ul><p>Valeurs typiques de E : acier ≈ 210 GPa, béton ≈ 30 GPa, aluminium ≈ 70 GPa.</p>`,
    ),
    exercises: [
      {
        order: 1,
        title: tr('Steel bar under tension', 'قضيب فولاذي تحت الشد', 'Barre d\'acier en traction'),
        problem: tr(
          'A steel bar of length L = 2 m and cross-section A = 500 mm² carries an axial tensile force N = 50 kN. Take E = 210 GPa. Find the normal stress σ and the elongation ΔL.',
          'قضيب فولاذي طوله L = 2 م ومقطعه A = 500 مم² يحمل قوة شد محورية N = 50 كيلونيوتن. خذ E = 210 جيجاباسكال. أوجد الإجهاد σ والاستطالة ΔL.',
          'Une barre d\'acier de longueur L = 2 m et de section A = 500 mm² supporte un effort de traction N = 50 kN. Prendre E = 210 GPa. Calculer la contrainte σ et l\'allongement ΔL.',
        ),
        solution: tr(
          'σ = N / A = 50 000 N / 500 mm² = 100 MPa.\nΔL = N·L / (A·E) = (50 000 × 2000) / (500 × 210 000) = 0.952 mm.',
          'σ = N / A = 50000 ن / 500 مم² = 100 ميجاباسكال.\nΔL = N·L / (A·E) = (50000 × 2000) / (500 × 210000) = 0.952 مم.',
          'σ = N / A = 50 000 N / 500 mm² = 100 MPa.\nΔL = N·L / (A·E) = (50 000 × 2000) / (500 × 210 000) = 0,952 mm.',
        ),
      },
      {
        order: 2,
        title: tr('Allowable load', 'الحمل المسموح', 'Charge admissible'),
        problem: tr(
          'For the same bar (A = 500 mm²), the allowable stress is σ_adm = 160 MPa. What is the maximum axial force?',
          'لنفس القضيب (A = 500 مم²)، الإجهاد المسموح σ_adm = 160 ميجاباسكال. ما أقصى قوة محورية؟',
          'Pour la même barre (A = 500 mm²), la contrainte admissible est σ_adm = 160 MPa. Quel est l\'effort axial maximal ?',
        ),
        solution: tr(
          'N_max = σ_adm · A = 160 × 500 = 80 000 N = 80 kN.',
          'N_max = σ_adm · A = 160 × 500 = 80000 ن = 80 كيلونيوتن.',
          'N_max = σ_adm · A = 160 × 500 = 80 000 N = 80 kN.',
        ),
      },
    ],
  },
];
