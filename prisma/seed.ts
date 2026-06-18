import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Helpers to keep localized content terse. Stored as JSON strings because
// SQLite has no native JSON type.
const tr = (en: string, ar: string, fr: string) => JSON.stringify({ en, ar, fr });
const trList = (en: string[], ar: string[], fr: string[]) =>
  JSON.stringify({ en, ar, fr });

async function main() {
  console.log('Seeding Civildz database…');

  // Wipe (dev only) so the seed is idempotent.
  await prisma.exercise.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.exam.deleteMany();
  await prisma.category.deleteMany();
  await prisma.tool.deleteMany();
  await prisma.softwareArticle.deleteMany();
  await prisma.article.deleteMany();
  await prisma.jobPosting.deleteMany();
  await prisma.service.deleteMany();

  // ---- Study categories --------------------------------------------------
  const categories = [
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

  const categoryBySlug: Record<string, string> = {};
  for (const c of categories) {
    const created = await prisma.category.create({ data: c });
    categoryBySlug[c.slug] = created.id;
  }

  // ---- A fully-built lesson (Strength of Materials) ----------------------
  const lesson = await prisma.lesson.create({
    data: {
      slug: 'normal-stress-and-strain',
      order: 1,
      categoryId: categoryBySlug['strength-of-materials'],
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
      exercises: {
        create: [
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
    },
  });
  console.log('Lesson created:', lesson.slug);

  // ---- An exam with solutions -------------------------------------------
  await prisma.exam.create({
    data: {
      slug: 'som-midterm-axial',
      order: 1,
      durationMin: 90,
      categoryId: categoryBySlug['strength-of-materials'],
      title: tr('Midterm — Axial Loading', 'امتحان نصفي — التحميل المحوري', 'Partiel — Sollicitation axiale'),
      description: tr(
        'Two exercises on normal stress, strain and thermal effects.',
        'تمرينان حول الإجهاد العادي والانفعال والتأثيرات الحرارية.',
        'Deux exercices sur la contrainte normale, la déformation et les effets thermiques.',
      ),
      content: JSON.stringify({
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
      }),
    },
  });

  // ---- Engineering tools -------------------------------------------------
  const tools = [
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
  for (const t of tools) await prisma.tool.create({ data: t });

  // ---- Engineering software guides --------------------------------------
  await prisma.softwareArticle.create({
    data: {
      slug: 'autocad-getting-started',
      software: 'AutoCAD',
      order: 1,
      title: tr('Getting Started with AutoCAD', 'البدء مع أوتوكاد', 'Débuter avec AutoCAD'),
      excerpt: tr(
        'The interface, essential drawing and editing commands for civil drawings.',
        'الواجهة وأوامر الرسم والتعديل الأساسية للمخططات.',
        'L\'interface et les commandes essentielles de dessin et d\'édition.',
      ),
      content: tr(
        `<h2>The workspace</h2><p>AutoCAD's drawing area, command line and ribbon are your three main tools. Type commands directly in the command line for speed.</p><h2>Essential commands</h2><ul><li><code>LINE (L)</code> — draw straight segments.</li><li><code>OFFSET (O)</code> — parallel copies at a set distance.</li><li><code>TRIM (TR)</code> / <code>EXTEND (EX)</code> — clean up intersections.</li><li><code>DIM</code> — add dimensions.</li></ul><h2>Good practice</h2><p>Work in real-world units, organise entities on layers, and save templates (.dwt) for repeated project setups.</p>`,
        `<h2>مساحة العمل</h2><p>منطقة الرسم وسطر الأوامر والشريط هي أدواتك الرئيسية الثلاث. اكتب الأوامر مباشرة في سطر الأوامر للسرعة.</p><h2>الأوامر الأساسية</h2><ul><li><code>LINE (L)</code> — رسم خطوط مستقيمة.</li><li><code>OFFSET (O)</code> — نسخ متوازية بمسافة محدّدة.</li><li><code>TRIM (TR)</code> / <code>EXTEND (EX)</code> — تنظيف التقاطعات.</li><li><code>DIM</code> — إضافة الأبعاد.</li></ul><h2>ممارسات جيدة</h2><p>اعمل بالوحدات الحقيقية، ونظّم العناصر على طبقات، واحفظ قوالب (.dwt) للمشاريع المتكرّرة.</p>`,
        `<h2>L'espace de travail</h2><p>La zone de dessin, la ligne de commande et le ruban sont vos trois outils principaux. Saisissez les commandes directement pour gagner du temps.</p><h2>Commandes essentielles</h2><ul><li><code>LINE (L)</code> — tracer des segments.</li><li><code>OFFSET (O)</code> — copies parallèles à distance fixe.</li><li><code>TRIM (TR)</code> / <code>EXTEND (EX)</code> — nettoyer les intersections.</li><li><code>DIM</code> — ajouter des cotes.</li></ul><h2>Bonnes pratiques</h2><p>Travaillez en unités réelles, organisez par calques et enregistrez des gabarits (.dwt).</p>`,
      ),
    },
  });

  const otherSoftware = [
    {
      slug: 'sap2000-overview',
      software: 'SAP2000',
      order: 2,
      title: tr('SAP2000 for Structural Analysis', 'SAP2000 للتحليل الإنشائي', 'SAP2000 pour l\'analyse structurale'),
      excerpt: tr('Modelling frames, loads and reading analysis results.', 'نمذجة الأطر والأحمال وقراءة النتائج.', 'Modéliser ossatures, charges et lire les résultats.'),
      content: tr('<p>An educational overview of building a model, defining materials and load cases, and interpreting forces and displacements in SAP2000.</p>', '<p>نظرة تعليمية حول بناء نموذج وتعريف المواد وحالات التحميل وتفسير القوى والإزاحات في SAP2000.</p>', '<p>Aperçu pédagogique : construire un modèle, définir matériaux et cas de charge, interpréter efforts et déplacements dans SAP2000.</p>'),
    },
    {
      slug: 'etabs-overview',
      software: 'ETABS',
      order: 3,
      title: tr('ETABS for Buildings', 'ETABS للمباني', 'ETABS pour les bâtiments'),
      excerpt: tr('Storey modelling, seismic loads and design checks.', 'نمذجة الطوابق والأحمال الزلزالية وفحوص التصميم.', 'Modélisation par étages, charges sismiques et vérifications.'),
      content: tr('<p>An educational introduction to multi-storey modelling, defining diaphragms, applying seismic loads, and running concrete/steel design checks in ETABS.</p>', '<p>مقدمة تعليمية لنمذجة المباني متعددة الطوابق وتعريف الدايافرام وتطبيق الأحمال الزلزالية وإجراء فحوص التصميم في ETABS.</p>', '<p>Introduction pédagogique : modélisation multi-étages, diaphragmes, charges sismiques et vérifications béton/acier dans ETABS.</p>'),
    },
    {
      slug: 'matlab-for-engineers',
      software: 'MATLAB',
      order: 4,
      title: tr('MATLAB for Engineers', 'MATLAB للمهندسين', 'MATLAB pour les ingénieurs'),
      excerpt: tr('Matrices, plotting and solving engineering problems.', 'المصفوفات والرسوم وحل المسائل الهندسية.', 'Matrices, tracés et résolution de problèmes.'),
      content: tr('<p>An educational primer on vectors and matrices, plotting results, and writing simple scripts to solve structural and numerical problems in MATLAB.</p>', '<p>تمهيد تعليمي حول المتجهات والمصفوفات ورسم النتائج وكتابة برامج بسيطة لحل المسائل الإنشائية والعددية في MATLAB.</p>', '<p>Initiation pédagogique : vecteurs et matrices, tracés et scripts simples pour résoudre des problèmes numériques dans MATLAB.</p>'),
    },
  ];
  for (const s of otherSoftware) await prisma.softwareArticle.create({ data: s });

  // ---- Articles (tutorials + featured) ----------------------------------
  await prisma.article.create({
    data: {
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
  });

  await prisma.article.create({
    data: {
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
  });

  // ---- Job opportunities -------------------------------------------------
  const jobs = [
    {
      slug: 'site-engineer-training',
      type: 'training',
      location: 'Algiers',
      title: tr('Site Engineer Training Programme', 'برنامج تدريب مهندس موقع', 'Formation ingénieur de chantier'),
      excerpt: tr('A 3-month hands-on programme covering site management basics.', 'برنامج عملي مدته 3 أشهر يغطي أساسيات إدارة الموقع.', 'Programme pratique de 3 mois sur la gestion de chantier.'),
      content: tr('<p>Covers setting-out, quality control, quantity take-off and coordination with subcontractors. Certificate on completion.</p>', '<p>يغطّي التوقيع ومراقبة الجودة وحصر الكميات والتنسيق مع المقاولين. شهادة عند الإتمام.</p>', '<p>Implantation, contrôle qualité, métré et coordination des sous-traitants. Certificat à la fin.</p>'),
    },
    {
      slug: 'public-works-competition-2026',
      type: 'competition',
      deadline: new Date('2026-09-30'),
      title: tr('Public Works Engineering Competition', 'مسابقة هندسة الأشغال العمومية', 'Concours ingénieur travaux publics'),
      excerpt: tr('National recruitment competition for civil engineers.', 'مسابقة توظيف وطنية لمهندسي البناء.', 'Concours national de recrutement d\'ingénieurs civils.'),
      content: tr('<p>Written tests in structures and hydraulics followed by an interview. Prepare with our study section and past papers.</p>', '<p>اختبارات كتابية في الإنشاءات والهيدروليك يليها مقابلة. استعد عبر قسم الدراسة والامتحانات السابقة.</p>', '<p>Épreuves écrites en structures et hydraulique suivies d\'un entretien. Préparez-vous avec notre section études.</p>'),
    },
    {
      slug: 'interview-tip-star-method',
      type: 'tip',
      title: tr('Ace Interviews with the STAR Method', 'انجح في المقابلات بطريقة STAR', 'Réussir l\'entretien avec la méthode STAR'),
      excerpt: tr('Structure your answers: Situation, Task, Action, Result.', 'رتّب إجاباتك: الموقف، المهمة، الإجراء، النتيجة.', 'Structurez vos réponses : Situation, Tâche, Action, Résultat.'),
      content: tr('<p>For each behavioural question, describe the <strong>Situation</strong>, the <strong>Task</strong>, the <strong>Action</strong> you took and the measurable <strong>Result</strong>.</p>', '<p>لكل سؤال سلوكي، صف <strong>الموقف</strong> و<strong>المهمة</strong> و<strong>الإجراء</strong> الذي اتخذته و<strong>النتيجة</strong> القابلة للقياس.</p>', '<p>Pour chaque question, décrivez la <strong>Situation</strong>, la <strong>Tâche</strong>, l\'<strong>Action</strong> menée et le <strong>Résultat</strong> mesurable.</p>'),
    },
  ];
  for (const j of jobs) await prisma.jobPosting.create({ data: j });

  // ---- Website development services -------------------------------------
  const services = [
    {
      slug: 'consulting-firm-website',
      icon: 'globe',
      order: 1,
      priceFrom: 60000,
      title: tr('Consulting Firm Websites', 'مواقع المكاتب الاستشارية', 'Sites pour bureaux d\'études'),
      description: tr(
        'Professional, fast websites that showcase your projects and services.',
        'مواقع احترافية وسريعة تعرض مشاريعك وخدماتك.',
        'Des sites professionnels et rapides qui valorisent vos projets.',
      ),
      features: trList(
        ['Up to 6 pages', 'Project portfolio', 'Contact & quote form', 'Mobile-friendly'],
        ['حتى 6 صفحات', 'معرض مشاريع', 'نموذج تواصل وعرض سعر', 'متوافق مع الجوال'],
        ['Jusqu\'à 6 pages', 'Portfolio de projets', 'Formulaire de contact', 'Responsive mobile'],
      ),
    },
    {
      slug: 'online-store',
      icon: 'bricks',
      order: 2,
      priceFrom: 90000,
      title: tr('Online Stores', 'المتاجر الإلكترونية', 'Boutiques en ligne'),
      description: tr(
        'Sell building materials and equipment online with a simple store.',
        'بِع مواد البناء والمعدات عبر متجر بسيط.',
        'Vendez matériaux et équipements via une boutique simple.',
      ),
      features: trList(
        ['Product catalogue', 'Cart & checkout', 'Order management', 'Payment options'],
        ['كتالوج منتجات', 'سلة ودفع', 'إدارة الطلبات', 'خيارات الدفع'],
        ['Catalogue produits', 'Panier et paiement', 'Gestion des commandes', 'Options de paiement'],
      ),
    },
    {
      slug: 'seo-maintenance',
      icon: 'swap',
      order: 3,
      priceFrom: 15000,
      title: tr('SEO, Maintenance & Updates', 'تحسين محركات البحث والصيانة', 'SEO, maintenance et mises à jour'),
      description: tr(
        'Keep your site fast, secure, and ranking on search engines.',
        'حافظ على موقعك سريعًا وآمنًا ومتصدّرًا في محركات البحث.',
        'Gardez votre site rapide, sécurisé et bien référencé.',
      ),
      features: trList(
        ['Monthly updates', 'Security & backups', 'On-page SEO', 'Performance tuning'],
        ['تحديثات شهرية', 'أمان ونسخ احتياطي', 'تحسين داخلي', 'تحسين الأداء'],
        ['Mises à jour mensuelles', 'Sécurité et sauvegardes', 'SEO on-page', 'Optimisation des performances'],
      ),
    },
  ];
  for (const s of services) await prisma.service.create({ data: s });

  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
