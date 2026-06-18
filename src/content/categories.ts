import { tr } from './_shared';

/**
 * STUDY SUBJECTS
 * Edit a title/description here, then run `npm run db:reset` to apply.
 * `slug` is used in the URL (/study/<slug>) — keep it lowercase-with-dashes.
 * `icon` options: beam, cube, ruler, dig, book, calculator.
 */
export const categories = [
  {
    slug: 'strength-of-materials',
    icon: 'beam',
    order: 1,
    title: tr('Strength of Materials', 'مقاومة المواد', 'Résistance des matériaux'),
    description: tr(
      'Stress, strain, bending, shear and the behaviour of structural members under load.',
      'الإجهاد والانفعال والانحناء والقص وسلوك العناصر الإنشائية تحت الأحمال.',
      'Contraintes, déformations, flexion, cisaillement et comportement des éléments sous charge.',
    ),
  },
  {
    slug: 'reinforced-concrete',
    icon: 'cube',
    order: 2,
    title: tr('Reinforced Concrete', 'الخرسانة المسلّحة', 'Béton armé'),
    description: tr(
      'Design of beams, slabs, columns and foundations in reinforced concrete.',
      'تصميم الكمرات والبلاطات والأعمدة والأساسات من الخرسانة المسلّحة.',
      'Calcul des poutres, dalles, poteaux et fondations en béton armé.',
    ),
  },
  {
    slug: 'steel',
    icon: 'beam',
    order: 3,
    title: tr('Steel Structures', 'المنشآت المعدنية', 'Charpente métallique'),
    description: tr(
      'Design and verification of steel members, connections and frames.',
      'تصميم وتحقّق العناصر المعدنية والوصلات والأطر.',
      'Conception et vérification des éléments, assemblages et ossatures en acier.',
    ),
  },
  {
    slug: 'topography',
    icon: 'ruler',
    order: 4,
    title: tr('Topography', 'الطوبوغرافيا', 'Topographie'),
    description: tr(
      'Surveying, levelling, traverses and setting-out on site.',
      'المساحة والتسوية والمضلّعات والتوقيع في الموقع.',
      'Levés, nivellement, cheminements et implantation sur chantier.',
    ),
  },
  {
    slug: 'soil-mechanics',
    icon: 'dig',
    order: 5,
    title: tr('Soil Mechanics', 'ميكانيكا التربة', 'Mécanique des sols'),
    description: tr(
      'Soil properties, consolidation, bearing capacity and earth pressure.',
      'خصائص التربة والانضغاط وقدرة التحمّل وضغط التربة.',
      'Propriétés des sols, consolidation, portance et poussée des terres.',
    ),
  },
];
