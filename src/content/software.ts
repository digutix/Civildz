import { tr } from './_shared';

/**
 * ENGINEERING SOFTWARE guides (educational, legal explanations only).
 * `software` is the badge label (AutoCAD | SAP2000 | ETABS | MATLAB | …).
 * `content` accepts simple HTML (<h2>, <p>, <ul>, <code>…).
 */
export const software = [
  {
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
