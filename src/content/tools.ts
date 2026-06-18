import { tr } from './_shared';

/**
 * ENGINEERING TOOLS shown in the /tools section.
 * Set `interactive: true` once a calculator UI exists for that slug
 * (currently only the Concrete Calculator). `icon` options:
 * cube, beam, bricks, swap, dig, calculator.
 */
export const tools = [
  {
    slug: 'concrete-calculator',
    icon: 'cube',
    order: 1,
    interactive: true,
    name: tr('Concrete Calculator', 'حاسبة الخرسانة', 'Calculatrice de béton'),
    description: tr(
      'Volume of concrete plus cement, sand and gravel quantities.',
      'حجم الخرسانة وكميات الإسمنت والرمل والحصى.',
      'Volume de béton et quantités de ciment, sable et gravier.',
    ),
  },
  {
    slug: 'steel-calculator',
    icon: 'beam',
    order: 2,
    interactive: false,
    name: tr('Steel Calculator', 'حاسبة الحديد', 'Calculatrice d\'acier'),
    description: tr(
      'Reinforcement weight and bar quantities from rebar schedules.',
      'وزن التسليح وكميات القضبان من جداول الحديد.',
      'Poids des armatures et quantités de barres.',
    ),
  },
  {
    slug: 'brick-calculator',
    icon: 'bricks',
    order: 3,
    interactive: false,
    name: tr('Brick Calculator', 'حاسبة الطوب', 'Calculatrice de briques'),
    description: tr(
      'Number of bricks and mortar for a wall area.',
      'عدد الطوب والمونة لمساحة جدار.',
      'Nombre de briques et de mortier pour un mur.',
    ),
  },
  {
    slug: 'unit-converter',
    icon: 'swap',
    order: 4,
    interactive: false,
    name: tr('Unit Converter', 'محوّل الوحدات', 'Convertisseur d\'unités'),
    description: tr(
      'Convert length, area, volume, force and pressure units.',
      'تحويل وحدات الطول والمساحة والحجم والقوة والضغط.',
      'Conversion des unités de longueur, surface, volume, force et pression.',
    ),
  },
  {
    slug: 'excavation-volume',
    icon: 'dig',
    order: 5,
    interactive: false,
    name: tr('Excavation Volume', 'حجم الحفر', 'Volume de terrassement'),
    description: tr(
      'Earthwork volume for trenches and pits.',
      'حجم الأعمال الترابية للخنادق والحفر.',
      'Volume des terrassements pour tranchées et fouilles.',
    ),
  },
  {
    slug: 'construction-cost',
    icon: 'calculator',
    order: 6,
    interactive: false,
    name: tr('Construction Cost', 'تكلفة البناء', 'Coût de construction'),
    description: tr(
      'Quick budget estimate from area and unit cost.',
      'تقدير سريع للميزانية من المساحة وتكلفة الوحدة.',
      'Estimation rapide du budget à partir de la surface et du coût unitaire.',
    ),
  },
];
