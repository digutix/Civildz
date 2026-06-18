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

  // ── Reinforced Concrete ─────────────────────────────────────────────────
  {
    slug: 'singly-reinforced-beam',
    categorySlug: 'reinforced-concrete',
    order: 1,
    videoUrl: 'https://www.youtube.com/watch?v=Q3Hg5p8Nf6g',
    title: tr('Singly Reinforced Beam Design', 'تصميم كمرة مسلّحة بسيطة', 'Calcul d\'une poutre simplement armée'),
    summary: tr(
      'ULS bending of a rectangular section.\nLever arm: z ≈ 0.9 d.\nSteel area: As = M / (0.87 · fy · z).\nAlways check As,min ≤ As ≤ As,max.',
      'الانحناء عند الحالة الحدية القصوى لمقطع مستطيل.\nذراع العزم: z ≈ 0.9 d.\nمساحة الحديد: As = M / (0.87 · fy · z).\nتحقّق دائمًا As,min ≤ As ≤ As,max.',
      'Flexion à l\'ELU d\'une section rectangulaire.\nBras de levier : z ≈ 0,9 d.\nSection d\'acier : As = M / (0,87 · fy · z).\nVérifier toujours As,min ≤ As ≤ As,max.',
    ),
    content: tr(
      `<h2>Behaviour in bending</h2><p>At the ultimate limit state (ULS) the concrete in compression and the steel in tension form a couple that resists the applied moment <code>M</code>. The internal forces are separated by the <strong>lever arm</strong> <code>z</code>.</p><h2>Required steel area</h2><p>For an under-reinforced section the steel yields, and a safe first estimate of the tension steel is:</p><ul><li><code>z ≈ 0.9 · d</code></li><li><code>As = M / (0.87 · fy · z)</code></li></ul><p>where <strong>d</strong> is the effective depth and <strong>fy</strong> the steel yield strength.</p><h2>Detailing checks</h2><p>The chosen bars must satisfy the minimum and maximum steel ratios and the bar spacing rules of the design code (e.g. Eurocode 2 / BAEL).</p>`,
      `<h2>السلوك في الانحناء</h2><p>عند الحالة الحدية القصوى، تشكّل الخرسانة المضغوطة والحديد المشدود مزدوجة تقاوم العزم المطبّق <code>M</code>. تفصل بين القوتين الداخليتين <strong>ذراع العزم</strong> <code>z</code>.</p><h2>مساحة الحديد المطلوبة</h2><p>في المقطع قليل التسليح يخضع الحديد، وأول تقدير آمن لحديد الشد هو:</p><ul><li><code>z ≈ 0.9 · d</code></li><li><code>As = M / (0.87 · fy · z)</code></li></ul><p>حيث <strong>d</strong> العمق الفعّال و<strong>fy</strong> حدّ خضوع الحديد.</p><h2>تحقّقات التفصيل</h2><p>يجب أن تحقّق القضبان المختارة النسب الدنيا والقصوى للحديد وقواعد التباعد في الكود (مثل اليوروكود 2 / BAEL).</p>`,
      `<h2>Comportement en flexion</h2><p>À l\'état limite ultime (ELU), le béton comprimé et l\'acier tendu forment un couple qui résiste au moment appliqué <code>M</code>. Les efforts internes sont séparés par le <strong>bras de levier</strong> <code>z</code>.</p><h2>Section d\'acier nécessaire</h2><p>Pour une section sous-armée, l\'acier plastifie et une première estimation sûre est :</p><ul><li><code>z ≈ 0,9 · d</code></li><li><code>As = M / (0,87 · fy · z)</code></li></ul><p>où <strong>d</strong> est la hauteur utile et <strong>fy</strong> la limite d\'élasticité de l\'acier.</p><h2>Vérifications de ferraillage</h2><p>Les barres choisies doivent respecter les pourcentages d\'acier minimal et maximal et les règles d\'espacement du code (Eurocode 2 / BAEL).</p>`,
    ),
    exercises: [
      {
        order: 1,
        title: tr('Required tension steel', 'حديد الشد المطلوب', 'Acier tendu nécessaire'),
        problem: tr(
          'A beam carries a design moment M = 150 kN·m. The effective depth d = 450 mm and fy = 500 MPa. Estimate the required tension steel area As (take z = 0.9 d).',
          'كمرة تتعرّض لعزم تصميمي M = 150 كيلونيوتن·م. العمق الفعّال d = 450 مم وfy = 500 ميجاباسكال. قدّر مساحة حديد الشد As (خذ z = 0.9 d).',
          'Une poutre supporte un moment de calcul M = 150 kN·m. La hauteur utile d = 450 mm et fy = 500 MPa. Estimer la section d\'acier tendu As (prendre z = 0,9 d).',
        ),
        solution: tr(
          'z = 0.9 × 450 = 405 mm.\nAs = M / (0.87 · fy · z) = 150×10⁶ / (0.87 × 500 × 405) = 851 mm².\nProvide e.g. 3 Ø20 (943 mm²).',
          'z = 0.9 × 450 = 405 مم.\nAs = M / (0.87 · fy · z) = 150×10⁶ / (0.87 × 500 × 405) = 851 مم².\nاستخدم مثلاً 3 Ø20 (943 مم²).',
          'z = 0,9 × 450 = 405 mm.\nAs = M / (0,87 · fy · z) = 150×10⁶ / (0,87 × 500 × 405) = 851 mm².\nPrévoir p. ex. 3 Ø20 (943 mm²).',
        ),
      },
    ],
  },

  // ── Steel Structures ────────────────────────────────────────────────────
  {
    slug: 'steel-tension-member',
    categorySlug: 'steel',
    order: 1,
    videoUrl: 'https://www.youtube.com/watch?v=l2gEZ9oYjvk',
    title: tr('Tension Member Design', 'تصميم عنصر مشدود', 'Calcul d\'une barre tendue'),
    summary: tr(
      'Yielding of the gross section governs ductile design.\nDesign resistance: Nt,Rd = A · fy / γM0 (γM0 = 1.0).\nAlso check net-section rupture at bolt holes.',
      'خضوع المقطع الكامل يحكم التصميم المطيل.\nمقاومة التصميم: Nt,Rd = A · fy / γM0 (γM0 = 1.0).\nتحقّق أيضًا من تمزّق المقطع الصافي عند ثقوب البراغي.',
      'La plastification de la section brute gouverne le calcul ductile.\nRésistance : Nt,Rd = A · fy / γM0 (γM0 = 1,0).\nVérifier aussi la rupture de la section nette aux trous de boulons.',
    ),
    content: tr(
      `<h2>Design resistance</h2><p>A member in axial tension is verified against the <strong>plastic resistance of the gross cross-section</strong>:</p><ul><li><code>Nt,Rd = A · fy / γM0</code></li></ul><p>with <strong>A</strong> the gross area, <strong>fy</strong> the yield strength and <strong>γM0 = 1.0</strong> (Eurocode 3).</p><h2>Net section</h2><p>Where bolt holes reduce the area, a second check on the <strong>ultimate resistance of the net section</strong> <code>Nu,Rd = 0.9 · Anet · fu / γM2</code> must also be satisfied. The lower of the two governs.</p><h2>Verification</h2><p>The design is adequate when <code>NEd ≤ Nt,Rd</code>.</p>`,
      `<h2>مقاومة التصميم</h2><p>يُتحقّق من العنصر المعرّض للشد المحوري مقابل <strong>المقاومة اللدنة للمقطع الكامل</strong>:</p><ul><li><code>Nt,Rd = A · fy / γM0</code></li></ul><p>حيث <strong>A</strong> المساحة الكاملة، و<strong>fy</strong> حدّ الخضوع، و<strong>γM0 = 1.0</strong> (اليوروكود 3).</p><h2>المقطع الصافي</h2><p>عندما تقلّل ثقوب البراغي المساحة، يجب أيضًا تحقيق <strong>المقاومة القصوى للمقطع الصافي</strong> <code>Nu,Rd = 0.9 · Anet · fu / γM2</code>. والأصغر منهما هو الحاكم.</p><h2>التحقّق</h2><p>يكون التصميم كافيًا عندما <code>NEd ≤ Nt,Rd</code>.</p>`,
      `<h2>Résistance de calcul</h2><p>Une barre en traction axiale est vérifiée vis-à-vis de la <strong>résistance plastique de la section brute</strong> :</p><ul><li><code>Nt,Rd = A · fy / γM0</code></li></ul><p>avec <strong>A</strong> l\'aire brute, <strong>fy</strong> la limite d\'élasticité et <strong>γM0 = 1,0</strong> (Eurocode 3).</p><h2>Section nette</h2><p>Lorsque des trous de boulons réduisent l\'aire, une seconde vérification de la <strong>résistance ultime de la section nette</strong> <code>Nu,Rd = 0,9 · Anet · fu / γM2</code> est requise. La plus faible gouverne.</p><h2>Vérification</h2><p>Le calcul est satisfaisant lorsque <code>NEd ≤ Nt,Rd</code>.</p>`,
    ),
    exercises: [
      {
        order: 1,
        title: tr('Resistance of a flat bar', 'مقاومة شريحة مسطّحة', 'Résistance d\'un plat'),
        problem: tr(
          'A steel flat 100 × 10 mm in S275 (fy = 275 MPa) carries an axial tension NEd = 220 kN. Check the gross-section resistance (γM0 = 1.0).',
          'شريحة فولاذية 100 × 10 مم من نوع S275 (fy = 275 ميجاباسكال) تحمل شدًّا محوريًا NEd = 220 كيلونيوتن. تحقّق من مقاومة المقطع الكامل (γM0 = 1.0).',
          'Un plat acier 100 × 10 mm en S275 (fy = 275 MPa) supporte une traction NEd = 220 kN. Vérifier la résistance de la section brute (γM0 = 1,0).',
        ),
        solution: tr(
          'A = 100 × 10 = 1000 mm².\nNt,Rd = A · fy / γM0 = 1000 × 275 / 1.0 = 275 000 N = 275 kN.\n220 kN ≤ 275 kN → OK.',
          'A = 100 × 10 = 1000 مم².\nNt,Rd = A · fy / γM0 = 1000 × 275 / 1.0 = 275000 ن = 275 كيلونيوتن.\n220 ≤ 275 → مقبول.',
          'A = 100 × 10 = 1000 mm².\nNt,Rd = A · fy / γM0 = 1000 × 275 / 1,0 = 275 000 N = 275 kN.\n220 kN ≤ 275 kN → OK.',
        ),
      },
    ],
  },

  // ── Topography ──────────────────────────────────────────────────────────
  {
    slug: 'differential-leveling',
    categorySlug: 'topography',
    order: 1,
    videoUrl: 'https://www.youtube.com/watch?v=Gf2pVgr5ahg',
    title: tr('Differential Leveling', 'التسوية التفاضلية', 'Nivellement différentiel'),
    summary: tr(
      'Height of instrument (HI) method.\nHI = RL_known + BS.\nRL_new = HI − FS.\nArithmetic check: ΣBS − ΣFS = last RL − first RL.',
      'طريقة ارتفاع الجهاز (HI).\nHI = RL_معلوم + BS.\nRL_جديد = HI − FS.\nالتحقّق الحسابي: ΣBS − ΣFS = آخر RL − أول RL.',
      'Méthode de la hauteur de l\'appareil (HI).\nHI = RL_connu + BS.\nRL_nouveau = HI − FS.\nContrôle : ΣBS − ΣFS = dernier RL − premier RL.',
    ),
    content: tr(
      `<h2>Principle</h2><p>Differential levelling transfers a known <strong>reduced level (RL)</strong> from a benchmark to new points using a level and a staff. A <strong>back-sight (BS)</strong> is read on a point of known level, a <strong>fore-sight (FS)</strong> on the point whose level is sought.</p><h2>Height of instrument method</h2><ul><li><code>HI = RL_known + BS</code></li><li><code>RL_new = HI − FS</code></li></ul><h2>Arithmetic check</h2><p>For a correct set of readings: <code>ΣBS − ΣFS = RL_last − RL_first</code>. This catches booking errors before leaving site.</p>`,
      `<h2>المبدأ</h2><p>تنقل التسوية التفاضلية <strong>منسوبًا معلومًا (RL)</strong> من نقطة مرجعية إلى نقاط جديدة باستخدام جهاز التسوية والقامة. تُقرأ <strong>قراءة خلفية (BS)</strong> على نقطة معلومة المنسوب، و<strong>قراءة أمامية (FS)</strong> على النقطة المطلوب منسوبها.</p><h2>طريقة ارتفاع الجهاز</h2><ul><li><code>HI = RL_معلوم + BS</code></li><li><code>RL_جديد = HI − FS</code></li></ul><h2>التحقّق الحسابي</h2><p>لمجموعة قراءات صحيحة: <code>ΣBS − ΣFS = آخر RL − أول RL</code>. يكشف هذا أخطاء التدوين قبل مغادرة الموقع.</p>`,
      `<h2>Principe</h2><p>Le nivellement différentiel transfère un <strong>niveau (RL)</strong> connu d\'un repère vers de nouveaux points à l\'aide d\'un niveau et d\'une mire. Une <strong>lecture arrière (BS)</strong> est faite sur un point de niveau connu, une <strong>lecture avant (FS)</strong> sur le point cherché.</p><h2>Méthode de la hauteur de l\'appareil</h2><ul><li><code>HI = RL_connu + BS</code></li><li><code>RL_nouveau = HI − FS</code></li></ul><h2>Contrôle arithmétique</h2><p>Pour des lectures correctes : <code>ΣBS − ΣFS = RL_dernier − RL_premier</code>. Cela détecte les erreurs avant de quitter le chantier.</p>`,
    ),
    exercises: [
      {
        order: 1,
        title: tr('Find the reduced level', 'إيجاد المنسوب', 'Trouver le niveau'),
        problem: tr(
          'A benchmark has RL = 100.000 m. The back-sight on it is 1.250 m and the fore-sight on point B is 2.100 m. Find the RL of B.',
          'نقطة مرجعية منسوبها RL = 100.000 م. القراءة الخلفية عليها 1.250 م والقراءة الأمامية على النقطة B هي 2.100 م. أوجد منسوب B.',
          'Un repère a RL = 100,000 m. La lecture arrière vaut 1,250 m et la lecture avant sur le point B vaut 2,100 m. Trouver le RL de B.',
        ),
        solution: tr(
          'HI = 100.000 + 1.250 = 101.250 m.\nRL_B = HI − FS = 101.250 − 2.100 = 99.150 m.',
          'HI = 100.000 + 1.250 = 101.250 م.\nRL_B = HI − FS = 101.250 − 2.100 = 99.150 م.',
          'HI = 100,000 + 1,250 = 101,250 m.\nRL_B = HI − FS = 101,250 − 2,100 = 99,150 m.',
        ),
      },
    ],
  },

  // ── Soil Mechanics ──────────────────────────────────────────────────────
  {
    slug: 'effective-stress',
    categorySlug: 'soil-mechanics',
    order: 1,
    videoUrl: 'https://www.youtube.com/watch?v=2t9zJ8b4Q0k',
    title: tr('Effective Stress', 'الإجهاد الفعّال', 'Contrainte effective'),
    summary: tr(
      'Terzaghi: σ\' = σ − u.\nTotal stress σ = Σ(γ · h).\nPore pressure u = γw · hw.\nEffective stress controls strength and settlement.',
      'ترزاغي: σ\' = σ − u.\nالإجهاد الكلي σ = Σ(γ · h).\nضغط الماء المسامي u = γw · hw.\nالإجهاد الفعّال يتحكّم في المقاومة والهبوط.',
      'Terzaghi : σ\' = σ − u.\nContrainte totale σ = Σ(γ · h).\nPression interstitielle u = γw · hw.\nLa contrainte effective gouverne résistance et tassement.',
    ),
    content: tr(
      `<h2>Terzaghi's principle</h2><p>The strength and compressibility of a soil are governed not by the total stress but by the <strong>effective stress</strong> carried by the soil skeleton:</p><ul><li><code>σ' = σ − u</code></li></ul><h2>Computing the terms</h2><p>The <strong>total vertical stress</strong> at depth is the weight of everything above: <code>σ = Σ(γ · h)</code>. The <strong>pore-water pressure</strong> below the water table is <code>u = γw · hw</code>, with <code>γw ≈ 9.81 kN/m³</code>.</p><h2>Why it matters</h2><p>Lowering the water table raises <code>σ'</code> and can cause settlement; rapid loading raises <code>u</code> and temporarily lowers <code>σ'</code>, reducing strength.</p>`,
      `<h2>مبدأ ترزاغي</h2><p>لا تتحكّم في مقاومة التربة وقابليتها للانضغاط الإجهادُ الكلي بل <strong>الإجهاد الفعّال</strong> الذي يحمله الهيكل الحبيبي للتربة:</p><ul><li><code>σ' = σ − u</code></li></ul><h2>حساب الحدود</h2><p>الإجهاد <strong>الرأسي الكلي</strong> عند عمق ما هو وزن كل ما فوقه: <code>σ = Σ(γ · h)</code>. و<strong>ضغط ماء المسام</strong> تحت منسوب الماء هو <code>u = γw · hw</code> حيث <code>γw ≈ 9.81 كيلونيوتن/م³</code>.</p><h2>أهمية ذلك</h2><p>خفض منسوب الماء يرفع <code>σ'</code> وقد يسبّب هبوطًا؛ والتحميل السريع يرفع <code>u</code> ويخفض <code>σ'</code> مؤقتًا فتقلّ المقاومة.</p>`,
      `<h2>Principe de Terzaghi</h2><p>La résistance et la compressibilité d\'un sol ne sont pas régies par la contrainte totale mais par la <strong>contrainte effective</strong> reprise par le squelette du sol :</p><ul><li><code>σ' = σ − u</code></li></ul><h2>Calcul des termes</h2><p>La <strong>contrainte verticale totale</strong> à une profondeur est le poids de tout ce qui est au-dessus : <code>σ = Σ(γ · h)</code>. La <strong>pression interstitielle</strong> sous la nappe est <code>u = γw · hw</code>, avec <code>γw ≈ 9,81 kN/m³</code>.</p><h2>Importance</h2><p>Rabattre la nappe augmente <code>σ'</code> et peut provoquer un tassement ; un chargement rapide augmente <code>u</code> et abaisse temporairement <code>σ'</code>, réduisant la résistance.</p>`,
    ),
    exercises: [
      {
        order: 1,
        title: tr('Effective stress at depth', 'الإجهاد الفعّال عند عمق', 'Contrainte effective en profondeur'),
        problem: tr(
          'A uniform sand has γ = 19 kN/m³ and the water table is at the surface. Find the effective vertical stress at a depth of 5 m (γw = 9.81 kN/m³).',
          'رمل متجانس γ = 19 كيلونيوتن/م³ ومنسوب الماء عند السطح. أوجد الإجهاد الرأسي الفعّال عند عمق 5 م (γw = 9.81 كيلونيوتن/م³).',
          'Un sable homogène a γ = 19 kN/m³ et la nappe est en surface. Trouver la contrainte verticale effective à 5 m de profondeur (γw = 9,81 kN/m³).',
        ),
        solution: tr(
          'σ = 19 × 5 = 95 kPa.\nu = 9.81 × 5 = 49.05 kPa.\nσ\' = σ − u = 95 − 49.05 = 45.95 kPa.',
          'σ = 19 × 5 = 95 كيلوباسكال.\nu = 9.81 × 5 = 49.05 كيلوباسكال.\nσ\' = σ − u = 95 − 49.05 = 45.95 كيلوباسكال.',
          'σ = 19 × 5 = 95 kPa.\nu = 9,81 × 5 = 49,05 kPa.\nσ\' = σ − u = 95 − 49,05 = 45,95 kPa.',
        ),
      },
    ],
  },
];
