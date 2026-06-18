import { tr, trList } from './_shared';

/**
 * ───────────────────────────────────────────────────────────────────────────
 *  WEBSITE-DEVELOPMENT SERVICES & PRICES
 * ───────────────────────────────────────────────────────────────────────────
 *  ▸ To change a PRICE: edit the `priceFrom` number (Algerian dinار, DZD).
 *    Set it to `null` to hide the price and show only the "Request a quote" button.
 *  ▸ To change a TITLE/DESCRIPTION: edit the `tr(...)` texts (EN, AR, FR).
 *  ▸ To change the FEATURE bullets: edit the `trList(...)` arrays.
 *  After editing, run `npm run db:reset` to apply the changes.
 * ───────────────────────────────────────────────────────────────────────────
 */
export const services = [
  {
    slug: 'consulting-firm-website',
    icon: 'globe',
    order: 1,
    priceFrom: 60000, // ← starting price in DZD
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
    priceFrom: 90000, // ← starting price in DZD
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
    priceFrom: 15000, // ← starting price in DZD (per month)
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
