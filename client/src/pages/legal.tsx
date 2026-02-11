import { Header } from '../components/Header';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'wouter';

type LegalPage = 'privacy' | 'terms' | 'returns';

const content = {
  he: {
    privacy: {
      title: 'מדיניות פרטיות',
      lastUpdated: 'עדכון אחרון: פברואר 2026',
      sections: [
        { heading: 'איסוף מידע', body: 'אנו אוספים מידע אישי שתספקו לנו בעת ביצוע הזמנה, לרבות: שם, כתובת דוא"ל, מספר טלפון, כתובת למשלוח ופרטי תשלום. אנו משתמשים בעוגיות (Cookies) ואחסון מקומי (localStorage) לשמירת העדפות שפה ותוכן עגלת הקניות.' },
        { heading: 'שימוש במידע', body: 'המידע שנאסף משמש לצורך: עיבוד ומשלוח הזמנות, שירות לקוחות, שיפור האתר והחוויה, ושליחת עדכונים (בהסכמתכם בלבד). איננו מוכרים או משתפים מידע אישי עם צדדים שלישיים למטרות שיווק.' },
        { heading: 'אבטחת מידע', body: 'אנו נוקטים באמצעי אבטחה סבירים להגנה על המידע שלכם. תשלומים מעובדים באמצעות Stripe, שירות תשלומים מאובטח העומד בתקני PCI DSS. איננו שומרים פרטי כרטיס אשראי מלאים בשרתים שלנו.' },
        { heading: 'זכויותיכם (GDPR)', body: 'בהתאם לחוקי הגנת הפרטיות הישראליים ותקנות GDPR האירופיות, יש לכם זכות לבקש: גישה למידע האישי שלכם, תיקון מידע שגוי, מחיקת המידע שלכם, והעברת המידע לשירות אחר. לבקשות אלו, פנו אלינו בדוא"ל.' },
        { heading: 'עוגיות', body: 'האתר משתמש באחסון מקומי (localStorage) לשמירת העדפות שפה, מטבע ותוכן עגלת הקניות. מידע זה נשמר במכשיר שלכם בלבד ואינו נשלח לשרתים חיצוניים.' },
        { heading: 'יצירת קשר', body: 'לשאלות בנושא פרטיות, ניתן לפנות אלינו בוואטסאפ: 058-4921492 או בדוא"ל: info@haesh-sheli.co.il' },
      ],
    },
    terms: {
      title: 'תנאי שימוש',
      lastUpdated: 'עדכון אחרון: פברואר 2026',
      sections: [
        { heading: 'כללי', body: 'ברוכים הבאים לאתר קרן רבי ישראל - האש שלי. השימוש באתר ובשירותים שלנו כפוף לתנאים אלו. השימוש באתר מהווה הסכמה לתנאים.' },
        { heading: 'מוצרים ומחירים', body: 'אנו משתדלים להציג מידע מדויק על מוצרים ומחירים. עם זאת, אנו שומרים לעצמנו את הזכות לתקן טעויות במחירים או בתיאורי מוצרים. המחירים כוללים מע"מ אלא אם צוין אחרת.' },
        { heading: 'הזמנות ותשלום', body: 'הזמנה מאושרת רק לאחר קבלת אישור תשלום. אנו מקבלים תשלום בכרטיסי אשראי באמצעות Stripe. משלוח חינם על הזמנות מעל 399 ₪. זמן אספקה: 3-7 ימי עסקים.' },
        { heading: 'ביטול עסקה', body: 'בהתאם לחוק הגנת הצרכן הישראלי, ניתן לבטל עסקה תוך 14 יום מקבלת המוצר, בתנאי שהמוצר לא נפגם ולא נעשה בו שימוש. דמי ביטול: 5% מערך העסקה או 100 ₪, הנמוך מביניהם.' },
        { heading: 'קניין רוחני', body: 'כל התוכן באתר, לרבות עיצוב, תמונות וטקסטים, הם בבעלות קרן רבי ישראל. אין להעתיק, להפיץ או לעשות שימוש מסחרי ללא אישור בכתב. תוכן תורני משותף ברוח הפצת תורת רבי נחמן מברסלב.' },
        { heading: 'הגבלת אחריות', body: 'האתר מסופק "כמות שהוא" (AS IS). איננו אחראים לנזקים עקיפים הנובעים משימוש באתר. אחריותנו מוגבלת לערך המוצר שנרכש.' },
      ],
    },
    returns: {
      title: 'מדיניות החזרות והחלפות',
      lastUpdated: 'עדכון אחרון: פברואר 2026',
      sections: [
        { heading: 'זכות ביטול', body: 'בהתאם לחוק הגנת הצרכן, זכותכם לבטל רכישה תוך 14 ימים מקבלת המוצר. עליכם להודיע לנו על הביטול בכתב (וואטסאפ, דוא"ל או טופס יצירת קשר באתר).' },
        { heading: 'תנאי החזרה', body: 'המוצר חייב להיות במצב חדש, ללא פגמים ובאריזתו המקורית. ספרים שנקראו או נפגמו אינם ניתנים להחזרה. סטים מלאים ניתנים להחזרה רק כיחידה שלמה.' },
        { heading: 'החלפת מוצר', body: 'ניתן להחליף מוצר בגודל אחר או במהדורה אחרת בתוך 14 יום, בכפוף לזמינות. עלויות משלוח ההחלפה על חשבוננו.' },
        { heading: 'מוצר פגום', body: 'אם קיבלתם מוצר פגום, נחליף אותו מיד ללא עלות. אנא צרו קשר תוך 48 שעות מקבלת המשלוח עם תמונות של הפגם.' },
        { heading: 'החזר כספי', body: 'החזר כספי יבוצע באמצעי התשלום המקורי תוך 14 ימי עסקים. דמי ביטול (5% או 100 ₪, הנמוך מביניהם) ינוכו מסכום ההחזר, למעט במקרה של מוצר פגום.' },
        { heading: 'יצירת קשר', body: 'להחזרות והחלפות: וואטסאפ 058-4921492 | דוא"ל: info@haesh-sheli.co.il | טופס צור קשר באתר' },
      ],
    },
  },
  en: {
    privacy: {
      title: 'Privacy Policy',
      lastUpdated: 'Last updated: February 2026',
      sections: [
        { heading: 'Information Collection', body: 'We collect personal information you provide when placing an order, including: name, email address, phone number, shipping address, and payment details. We use cookies and localStorage to save language preferences and shopping cart contents.' },
        { heading: 'Use of Information', body: 'Information collected is used for: processing and shipping orders, customer service, improving the website and experience, and sending updates (with your consent only). We do not sell or share personal information with third parties for marketing purposes.' },
        { heading: 'Data Security', body: 'We take reasonable security measures to protect your information. Payments are processed through Stripe, a secure payment service that complies with PCI DSS standards. We do not store full credit card details on our servers.' },
        { heading: 'Your Rights (GDPR)', body: 'Under Israeli privacy laws and European GDPR regulations, you have the right to request: access to your personal data, correction of inaccurate data, deletion of your data, and data portability. For such requests, contact us by email.' },
        { heading: 'Cookies', body: 'The site uses localStorage to save language, currency preferences, and shopping cart contents. This information is stored on your device only and is not sent to external servers.' },
        { heading: 'Contact', body: 'For privacy questions, contact us on WhatsApp: 058-4921492 or email: info@haesh-sheli.co.il' },
      ],
    },
    terms: {
      title: 'Terms of Service',
      lastUpdated: 'Last updated: February 2026',
      sections: [
        { heading: 'General', body: 'Welcome to the Rabbi Israel Foundation - HaEsh Sheli website. Use of the site and our services is subject to these terms. Using the site constitutes acceptance of these terms.' },
        { heading: 'Products & Prices', body: 'We strive to display accurate product and pricing information. However, we reserve the right to correct errors in prices or product descriptions. Prices include VAT unless stated otherwise.' },
        { heading: 'Orders & Payment', body: 'An order is confirmed only after payment confirmation is received. We accept credit card payment through Stripe. Free shipping on orders over 399 NIS. Delivery time: 3-7 business days.' },
        { heading: 'Cancellation', body: 'Under Israeli Consumer Protection Law, you may cancel a transaction within 14 days of receiving the product, provided it is undamaged and unused. Cancellation fee: 5% of the transaction value or 100 NIS, whichever is lower.' },
        { heading: 'Intellectual Property', body: 'All content on the site, including design, images, and text, is owned by the Rabbi Israel Foundation. No copying, distribution, or commercial use without written permission. Torah content is shared in the spirit of spreading Rabbi Nachman of Breslov\'s teachings.' },
        { heading: 'Limitation of Liability', body: 'The site is provided "AS IS". We are not responsible for indirect damages resulting from use of the site. Our liability is limited to the value of the purchased product.' },
      ],
    },
    returns: {
      title: 'Return & Refund Policy',
      lastUpdated: 'Last updated: February 2026',
      sections: [
        { heading: 'Right of Cancellation', body: 'Under the Consumer Protection Act, you have the right to cancel a purchase within 14 days of receiving the product. You must notify us in writing (WhatsApp, email, or contact form on the site).' },
        { heading: 'Return Conditions', body: 'The product must be in new condition, without damage, and in its original packaging. Books that have been read or damaged cannot be returned. Complete sets can only be returned as a whole unit.' },
        { heading: 'Product Exchange', body: 'Products can be exchanged for a different size or edition within 14 days, subject to availability. Exchange shipping costs are on us.' },
        { heading: 'Defective Product', body: 'If you receive a defective product, we will replace it immediately at no cost. Please contact us within 48 hours of delivery with photos of the defect.' },
        { heading: 'Refund', body: 'Refunds will be processed via the original payment method within 14 business days. Cancellation fees (5% or 100 NIS, whichever is lower) will be deducted, except for defective products.' },
        { heading: 'Contact', body: 'For returns and exchanges: WhatsApp 058-4921492 | Email: info@haesh-sheli.co.il | Contact form on the site' },
      ],
    },
  },
  fr: {
    privacy: {
      title: 'Politique de Confidentialite',
      lastUpdated: 'Derniere mise a jour : Fevrier 2026',
      sections: [
        { heading: 'Collecte d\'informations', body: 'Nous collectons les informations personnelles que vous fournissez lors d\'une commande : nom, email, telephone, adresse de livraison et details de paiement. Nous utilisons le stockage local (localStorage) pour sauvegarder vos preferences.' },
        { heading: 'Utilisation des donnees', body: 'Les informations collectees servent a : traiter les commandes, le service client, ameliorer le site, et envoyer des mises a jour (avec votre consentement). Nous ne vendons pas vos donnees a des tiers.' },
        { heading: 'Securite', body: 'Les paiements sont traites par Stripe, conforme aux normes PCI DSS. Nous ne stockons pas les numeros de carte de credit complets.' },
        { heading: 'Vos droits (RGPD)', body: 'Vous avez le droit de demander : l\'acces, la rectification, la suppression ou la portabilite de vos donnees personnelles. Contactez-nous par email pour exercer ces droits.' },
        { heading: 'Cookies', body: 'Le site utilise le localStorage pour les preferences de langue, devise et panier. Ces donnees restent sur votre appareil.' },
        { heading: 'Contact', body: 'Questions de confidentialite : WhatsApp 058-4921492 | Email : info@haesh-sheli.co.il' },
      ],
    },
    terms: {
      title: 'Conditions Generales',
      lastUpdated: 'Derniere mise a jour : Fevrier 2026',
      sections: [
        { heading: 'General', body: 'L\'utilisation du site est soumise a ces conditions. En utilisant le site, vous acceptez ces conditions.' },
        { heading: 'Produits et prix', body: 'Nous nous efforcons d\'afficher des informations precises. Les prix incluent la TVA sauf mention contraire.' },
        { heading: 'Commandes et paiement', body: 'Paiement par carte via Stripe. Livraison gratuite a partir de 399 NIS. Delai : 3-7 jours ouvrables.' },
        { heading: 'Annulation', body: 'Annulation possible sous 14 jours. Frais d\'annulation : 5% ou 100 NIS (le plus bas).' },
        { heading: 'Propriete intellectuelle', body: 'Tout le contenu du site appartient a la Fondation Rabbi Israel. Le contenu de Torah est partage dans l\'esprit de la diffusion de Rabbi Nachman.' },
        { heading: 'Responsabilite', body: 'Le site est fourni "tel quel". Notre responsabilite est limitee a la valeur du produit achete.' },
      ],
    },
    returns: {
      title: 'Politique de Retours',
      lastUpdated: 'Derniere mise a jour : Fevrier 2026',
      sections: [
        { heading: 'Droit de retractation', body: 'Retour possible sous 14 jours apres reception. Notifiez-nous par WhatsApp, email ou formulaire de contact.' },
        { heading: 'Conditions', body: 'Le produit doit etre neuf, non endommage et dans son emballage d\'origine. Les livres lus ou endommages ne sont pas retournables.' },
        { heading: 'Echange', body: 'Echange possible sous 14 jours selon disponibilite. Frais de port a notre charge.' },
        { heading: 'Produit defectueux', body: 'Remplacement immediat gratuit. Contactez-nous sous 48h avec photos du defaut.' },
        { heading: 'Remboursement', body: 'Sous 14 jours ouvrables via le moyen de paiement original. Frais d\'annulation deduits sauf produit defectueux.' },
        { heading: 'Contact', body: 'WhatsApp 058-4921492 | Email : info@haesh-sheli.co.il' },
      ],
    },
  },
};

export default function Legal({ page = 'privacy' }: { page?: LegalPage }) {
  const { currentLanguage } = useLanguage();
  const isRTL = currentLanguage === 'he';
  const lang = (currentLanguage === 'he' || currentLanguage === 'en' || currentLanguage === 'fr') ? currentLanguage : 'en';
  const pageContent = content[lang][page];

  const navLabels = {
    he: { privacy: 'פרטיות', terms: 'תנאי שימוש', returns: 'החזרות' },
    en: { privacy: 'Privacy', terms: 'Terms', returns: 'Returns' },
    fr: { privacy: 'Confidentialite', terms: 'Conditions', returns: 'Retours' },
  };

  return (
    <div style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
      <Header />

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        {/* Tab navigation */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {(['privacy', 'terms', 'returns'] as LegalPage[]).map((p) => (
            <Link key={p} href={`/${p}`}>
              <button style={{
                padding: '0.5rem 1.25rem',
                borderRadius: '8px',
                border: p === page ? '2px solid #2563eb' : '1px solid #d1d5db',
                background: p === page ? '#eff6ff' : 'white',
                color: p === page ? '#2563eb' : '#6b7280',
                fontWeight: p === page ? '600' : '400',
                fontSize: '0.9rem',
                cursor: 'pointer',
              }}>
                {navLabels[lang][p]}
              </button>
            </Link>
          ))}
        </div>

        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#111', marginBottom: '0.5rem' }}>
          {pageContent.title}
        </h1>
        <p style={{ fontSize: '0.85rem', color: '#9ca3af', marginBottom: '2rem' }}>
          {pageContent.lastUpdated}
        </p>

        {pageContent.sections.map((section, i) => (
          <div key={i} style={{ marginBottom: '1.5rem' }}>
            <h2 style={{
              fontSize: '1.15rem',
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: '0.5rem',
              paddingBottom: '0.25rem',
              borderBottom: '1px solid #f3f4f6',
            }}>
              {section.heading}
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#4b5563', lineHeight: '1.7' }}>
              {section.body}
            </p>
          </div>
        ))}

        <div style={{
          marginTop: '3rem',
          padding: '1.25rem',
          background: '#f9fafb',
          borderRadius: '8px',
          textAlign: 'center',
          fontSize: '0.85rem',
          color: '#6b7280',
        }}>
          {isRTL ? 'קרן רבי ישראל - האש שלי | כל הזכויות שמורות © 2026' :
           lang === 'fr' ? 'Fondation Rabbi Israel - HaEsh Sheli | Tous droits reserves © 2026' :
           'Rabbi Israel Foundation - HaEsh Sheli | All rights reserved © 2026'}
        </div>
      </div>
    </div>
  );
}
