import { Header } from '../components/Header';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'wouter';

type LegalPage = 'privacy' | 'terms' | 'returns' | 'shipping';

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
    shipping: {
      title: 'מדיניות משלוחים',
      lastUpdated: 'עדכון אחרון: פברואר 2026',
      sections: [
        { heading: 'משלוח חינם', body: 'משלוח חינם על כל הזמנה מעל 399 ₪. עבור הזמנות מתחת לסכום זה, דמי משלוח בסך 29 ₪.' },
        { heading: 'זמני אספקה', body: 'זמן אספקה רגיל: 3-7 ימי עסקים. אזורים מרוחקים (יו"ש, אילת): עד 10 ימי עסקים. ימי שישי ושבת אינם נספרים.' },
        { heading: 'שיטות משלוח', body: 'משלוח רגיל בדואר שליחים עד הבית. ניתן גם לאסוף מנקודת איסוף לפי בחירה. לסטים מלאים ומשלוחים גדולים - תיאום מראש.' },
        { heading: 'מעקב משלוח', body: 'לאחר שליחת ההזמנה, תקבלו מספר מעקב בדוא"ל ו/או ב-SMS. ניתן לעקוב אחרי סטטוס המשלוח בכל עת.' },
        { heading: 'משלוח בינלאומי', body: 'אנו שולחים לחו"ל! זמני אספקה למשלוח בינלאומי: 10-21 ימי עסקים. עלויות משלוח מחושבות לפי משקל ויעד. פנו אלינו לפרטים.' },
        { heading: 'יצירת קשר', body: 'לשאלות על משלוחים: וואטסאפ 058-4921492 | דוא"ל: info@haesh-sheli.co.il' },
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
    shipping: {
      title: 'Shipping Policy',
      lastUpdated: 'Last updated: February 2026',
      sections: [
        { heading: 'Free Shipping', body: 'Free shipping on all orders over 399 NIS. For orders below this amount, shipping costs 29 NIS.' },
        { heading: 'Delivery Times', body: 'Standard delivery: 3-7 business days. Remote areas: up to 10 business days. Fridays and Saturdays are not counted.' },
        { heading: 'Shipping Methods', body: 'Standard courier delivery to your door. Pickup points also available. For complete sets and large shipments - advance coordination required.' },
        { heading: 'Tracking', body: 'After your order ships, you will receive a tracking number by email and/or SMS. You can track your shipment status at any time.' },
        { heading: 'International Shipping', body: 'We ship worldwide! International delivery: 10-21 business days. Shipping costs calculated by weight and destination. Contact us for details.' },
        { heading: 'Contact', body: 'Shipping questions: WhatsApp 058-4921492 | Email: info@haesh-sheli.co.il' },
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
    shipping: {
      title: 'Politique de Livraison',
      lastUpdated: 'Derniere mise a jour : Fevrier 2026',
      sections: [
        { heading: 'Livraison gratuite', body: 'Livraison gratuite pour toute commande superieure a 399 NIS. En dessous : 29 NIS de frais de port.' },
        { heading: 'Delais', body: 'Livraison standard : 3-7 jours ouvrables. Zones eloignees : jusqu\'a 10 jours. Les vendredis et samedis ne sont pas comptes.' },
        { heading: 'Methodes', body: 'Livraison par coursier a domicile. Points relais egalement disponibles. Pour les sets complets - coordination prealable.' },
        { heading: 'Suivi', body: 'Apres expedition, vous recevrez un numero de suivi par email et/ou SMS.' },
        { heading: 'Livraison internationale', body: 'Nous livrons dans le monde entier ! Delai : 10-21 jours ouvrables. Frais selon poids et destination. Contactez-nous.' },
        { heading: 'Contact', body: 'WhatsApp 058-4921492 | Email : info@haesh-sheli.co.il' },
      ],
    },
  },
  es: {
    privacy: {
      title: 'Politica de Privacidad',
      lastUpdated: 'Ultima actualizacion: Febrero 2026',
      sections: [
        { heading: 'Recopilacion de Informacion', body: 'Recopilamos informacion personal que usted proporciona al realizar un pedido: nombre, correo electronico, telefono, direccion de envio y detalles de pago. Utilizamos localStorage para guardar preferencias de idioma y contenido del carrito.' },
        { heading: 'Uso de la Informacion', body: 'La informacion se utiliza para: procesar pedidos, servicio al cliente, mejorar el sitio y enviar actualizaciones (solo con su consentimiento). No vendemos sus datos a terceros.' },
        { heading: 'Seguridad', body: 'Los pagos se procesan a traves de Stripe, conforme a los estandares PCI DSS. No almacenamos numeros completos de tarjetas de credito.' },
        { heading: 'Sus Derechos (GDPR)', body: 'Tiene derecho a solicitar: acceso, rectificacion, eliminacion o portabilidad de sus datos personales. Contactenos por email para ejercer estos derechos.' },
        { heading: 'Cookies', body: 'El sitio usa localStorage para preferencias de idioma, moneda y carrito. Estos datos permanecen en su dispositivo.' },
        { heading: 'Contacto', body: 'Preguntas de privacidad: WhatsApp 058-4921492 | Email: info@haesh-sheli.co.il' },
      ],
    },
    terms: {
      title: 'Terminos de Servicio',
      lastUpdated: 'Ultima actualizacion: Febrero 2026',
      sections: [
        { heading: 'General', body: 'El uso del sitio esta sujeto a estos terminos. Al usar el sitio, acepta estos terminos.' },
        { heading: 'Productos y Precios', body: 'Nos esforzamos por mostrar informacion precisa. Los precios incluyen IVA a menos que se indique lo contrario.' },
        { heading: 'Pedidos y Pago', body: 'Pago con tarjeta via Stripe. Envio gratis en pedidos superiores a 399 NIS. Plazo: 3-7 dias habiles.' },
        { heading: 'Cancelacion', body: 'Cancelacion posible dentro de 14 dias. Tarifa de cancelacion: 5% o 100 NIS (el mas bajo).' },
        { heading: 'Propiedad Intelectual', body: 'Todo el contenido del sitio pertenece a la Fundacion Rabbi Israel. El contenido de Torah se comparte en el espiritu de difundir las ensenanzas de Rabbi Nachman.' },
        { heading: 'Limitacion de Responsabilidad', body: 'El sitio se proporciona "tal cual". Nuestra responsabilidad esta limitada al valor del producto comprado.' },
      ],
    },
    returns: {
      title: 'Politica de Devoluciones',
      lastUpdated: 'Ultima actualizacion: Febrero 2026',
      sections: [
        { heading: 'Derecho de Cancelacion', body: 'Devolucion posible dentro de 14 dias despues de la recepcion. Notifiquenos por WhatsApp, email o formulario de contacto.' },
        { heading: 'Condiciones', body: 'El producto debe estar nuevo, sin danos y en su embalaje original. Los libros leidos o danados no son retornables.' },
        { heading: 'Intercambio', body: 'Intercambio posible dentro de 14 dias segun disponibilidad. Gastos de envio a nuestro cargo.' },
        { heading: 'Producto Defectuoso', body: 'Reemplazo inmediato gratuito. Contactenos dentro de 48h con fotos del defecto.' },
        { heading: 'Reembolso', body: 'Dentro de 14 dias habiles via el metodo de pago original. Tarifas de cancelacion deducidas excepto productos defectuosos.' },
        { heading: 'Contacto', body: 'WhatsApp 058-4921492 | Email: info@haesh-sheli.co.il' },
      ],
    },
    shipping: {
      title: 'Politica de Envios',
      lastUpdated: 'Ultima actualizacion: Febrero 2026',
      sections: [
        { heading: 'Envio Gratuito', body: 'Envio gratis en todos los pedidos superiores a 399 NIS. Por debajo: 29 NIS de gastos de envio.' },
        { heading: 'Plazos', body: 'Entrega estandar: 3-7 dias habiles. Zonas remotas: hasta 10 dias. Los viernes y sabados no se cuentan.' },
        { heading: 'Metodos', body: 'Entrega por mensajeria a domicilio. Puntos de recogida tambien disponibles. Para sets completos - coordinacion previa.' },
        { heading: 'Seguimiento', body: 'Despues del envio, recibira un numero de seguimiento por email y/o SMS.' },
        { heading: 'Envio Internacional', body: 'Enviamos a todo el mundo! Plazo: 10-21 dias habiles. Costos segun peso y destino. Contactenos.' },
        { heading: 'Contacto', body: 'WhatsApp 058-4921492 | Email: info@haesh-sheli.co.il' },
      ],
    },
  },
  ru: {
    privacy: {
      title: 'Политика Конфиденциальности',
      lastUpdated: 'Последнее обновление: Февраль 2026',
      sections: [
        { heading: 'Сбор Информации', body: 'Мы собираем личную информацию при оформлении заказа: имя, email, телефон, адрес доставки и платежные данные. Мы используем localStorage для сохранения языковых предпочтений и содержимого корзины.' },
        { heading: 'Использование Данных', body: 'Информация используется для: обработки заказов, обслуживания клиентов, улучшения сайта и отправки обновлений (только с вашего согласия). Мы не продаем ваши данные третьим лицам.' },
        { heading: 'Безопасность', body: 'Платежи обрабатываются через Stripe, соответствующий стандартам PCI DSS. Мы не храним полные номера кредитных карт.' },
        { heading: 'Ваши Права (GDPR)', body: 'Вы имеете право запросить: доступ, исправление, удаление или перенос ваших личных данных. Свяжитесь с нами по email для реализации этих прав.' },
        { heading: 'Cookies', body: 'Сайт использует localStorage для предпочтений языка, валюты и корзины. Эти данные остаются на вашем устройстве.' },
        { heading: 'Контакт', body: 'Вопросы конфиденциальности: WhatsApp 058-4921492 | Email: info@haesh-sheli.co.il' },
      ],
    },
    terms: {
      title: 'Условия Обслуживания',
      lastUpdated: 'Последнее обновление: Февраль 2026',
      sections: [
        { heading: 'Общее', body: 'Использование сайта регулируется этими условиями. Используя сайт, вы принимаете эти условия.' },
        { heading: 'Товары и Цены', body: 'Мы стремимся отображать точную информацию. Цены включают НДС, если не указано иное.' },
        { heading: 'Заказы и Оплата', body: 'Оплата картой через Stripe. Бесплатная доставка при заказе от 399 NIS. Срок: 3-7 рабочих дней.' },
        { heading: 'Отмена', body: 'Отмена возможна в течение 14 дней. Комиссия за отмену: 5% или 100 NIS (меньшее).' },
        { heading: 'Интеллектуальная Собственность', body: 'Весь контент сайта принадлежит Фонду Рабби Израиль. Содержание Торы распространяется в духе учений Рабби Нахмана.' },
        { heading: 'Ограничение Ответственности', body: 'Сайт предоставляется "как есть". Наша ответственность ограничена стоимостью приобретенного товара.' },
      ],
    },
    returns: {
      title: 'Политика Возвратов',
      lastUpdated: 'Последнее обновление: Февраль 2026',
      sections: [
        { heading: 'Право на Отмену', body: 'Возврат возможен в течение 14 дней после получения. Уведомите нас через WhatsApp, email или контактную форму.' },
        { heading: 'Условия', body: 'Товар должен быть новым, без повреждений и в оригинальной упаковке. Прочитанные или поврежденные книги не подлежат возврату.' },
        { heading: 'Обмен', body: 'Обмен возможен в течение 14 дней при наличии. Расходы на доставку за наш счет.' },
        { heading: 'Дефектный Товар', body: 'Немедленная бесплатная замена. Свяжитесь с нами в течение 48 часов с фотографиями дефекта.' },
        { heading: 'Возврат Средств', body: 'В течение 14 рабочих дней через исходный способ оплаты. Комиссия за отмену вычитается, кроме дефектных товаров.' },
        { heading: 'Контакт', body: 'WhatsApp 058-4921492 | Email: info@haesh-sheli.co.il' },
      ],
    },
    shipping: {
      title: 'Политика Доставки',
      lastUpdated: 'Последнее обновление: Февраль 2026',
      sections: [
        { heading: 'Бесплатная Доставка', body: 'Бесплатная доставка при заказе от 399 NIS. Ниже этой суммы: 29 NIS стоимость доставки.' },
        { heading: 'Сроки', body: 'Стандартная доставка: 3-7 рабочих дней. Отдаленные районы: до 10 дней. Пятница и суббота не учитываются.' },
        { heading: 'Методы', body: 'Курьерская доставка до двери. Также доступны пункты выдачи. Для полных наборов - предварительная координация.' },
        { heading: 'Отслеживание', body: 'После отправки вы получите номер отслеживания по email и/или SMS.' },
        { heading: 'Международная Доставка', body: 'Мы доставляем по всему миру! Срок: 10-21 рабочий день. Стоимость по весу и направлению. Свяжитесь с нами.' },
        { heading: 'Контакт', body: 'WhatsApp 058-4921492 | Email: info@haesh-sheli.co.il' },
      ],
    },
  },
  ar: {
    privacy: {
      title: 'سياسة الخصوصية',
      lastUpdated: 'آخر تحديث: فبراير 2026',
      sections: [
        { heading: 'جمع المعلومات', body: 'نقوم بجمع المعلومات الشخصية عند تقديم طلب: الاسم، البريد الإلكتروني، الهاتف، عنوان الشحن وتفاصيل الدفع. نستخدم localStorage لحفظ تفضيلات اللغة ومحتويات السلة.' },
        { heading: 'استخدام البيانات', body: 'تُستخدم المعلومات لـ: معالجة الطلبات، خدمة العملاء، تحسين الموقع وإرسال التحديثات (بموافقتك فقط). لا نبيع بياناتك لأطراف ثالثة.' },
        { heading: 'الأمان', body: 'تتم معالجة المدفوعات عبر Stripe المتوافق مع معايير PCI DSS. لا نقوم بتخزين أرقام بطاقات الائتمان الكاملة.' },
        { heading: 'حقوقك (GDPR)', body: 'لديك الحق في طلب: الوصول، التصحيح، الحذف أو نقل بياناتك الشخصية. اتصل بنا عبر البريد الإلكتروني لممارسة هذه الحقوق.' },
        { heading: 'Cookies', body: 'يستخدم الموقع localStorage لتفضيلات اللغة والعملة والسلة. تبقى هذه البيانات على جهازك.' },
        { heading: 'اتصل بنا', body: 'أسئلة الخصوصية: WhatsApp 058-4921492 | Email: info@haesh-sheli.co.il' },
      ],
    },
    terms: {
      title: 'شروط الخدمة',
      lastUpdated: 'آخر تحديث: فبراير 2026',
      sections: [
        { heading: 'عام', body: 'استخدام الموقع يخضع لهذه الشروط. باستخدام الموقع، فإنك تقبل هذه الشروط.' },
        { heading: 'المنتجات والأسعار', body: 'نسعى لعرض معلومات دقيقة. الأسعار تشمل ضريبة القيمة المضافة ما لم يُذكر خلاف ذلك.' },
        { heading: 'الطلبات والدفع', body: 'الدفع بالبطاقة عبر Stripe. شحن مجاني للطلبات فوق 399 شيكل. المدة: 3-7 أيام عمل.' },
        { heading: 'الإلغاء', body: 'الإلغاء ممكن خلال 14 يوماً. رسوم الإلغاء: 5% أو 100 شيكل (الأقل).' },
        { heading: 'الملكية الفكرية', body: 'جميع محتويات الموقع ملك لمؤسسة الحاخام إسرائيل. يتم مشاركة محتوى التوراة بروح تعاليم الحاخام ناحمان.' },
        { heading: 'حدود المسؤولية', body: 'يتم توفير الموقع "كما هو". مسؤوليتنا محدودة بقيمة المنتج المشترى.' },
      ],
    },
    returns: {
      title: 'سياسة الإرجاع',
      lastUpdated: 'آخر تحديث: فبراير 2026',
      sections: [
        { heading: 'حق الإلغاء', body: 'الإرجاع ممكن خلال 14 يوماً بعد الاستلام. أخبرنا عبر WhatsApp أو البريد الإلكتروني أو نموذج الاتصال.' },
        { heading: 'الشروط', body: 'يجب أن يكون المنتج جديداً، بدون تلف وفي عبوته الأصلية. الكتب المقروءة أو التالفة غير قابلة للإرجاع.' },
        { heading: 'التبديل', body: 'التبديل ممكن خلال 14 يوماً حسب التوفر. تكاليف الشحن علينا.' },
        { heading: 'منتج معيب', body: 'استبدال فوري مجاني. اتصل بنا خلال 48 ساعة مع صور للعيب.' },
        { heading: 'استرداد الأموال', body: 'خلال 14 يوم عمل عبر طريقة الدفع الأصلية. يتم خصم رسوم الإلغاء عدا المنتجات المعيبة.' },
        { heading: 'اتصل بنا', body: 'WhatsApp 058-4921492 | Email: info@haesh-sheli.co.il' },
      ],
    },
    shipping: {
      title: 'سياسة الشحن',
      lastUpdated: 'آخر تحديث: فبراير 2026',
      sections: [
        { heading: 'شحن مجاني', body: 'شحن مجاني على جميع الطلبات فوق 399 شيكل. تحته: 29 شيكل تكلفة شحن.' },
        { heading: 'المدة', body: 'التسليم القياسي: 3-7 أيام عمل. المناطق النائية: حتى 10 أيام. الجمعة والسبت لا يُحسبان.' },
        { heading: 'الطرق', body: 'التوصيل بالبريد السريع للمنزل. نقاط الاستلام متاحة أيضاً. للمجموعات الكاملة - تنسيق مسبق.' },
        { heading: 'التتبع', body: 'بعد الشحن، ستتلقى رقم تتبع عبر البريد الإلكتروني و/أو SMS.' },
        { heading: 'الشحن الدولي', body: 'نشحن في جميع أنحاء العالم! المدة: 10-21 يوم عمل. التكاليف حسب الوزن والوجهة. اتصل بنا.' },
        { heading: 'اتصل بنا', body: 'WhatsApp 058-4921492 | Email: info@haesh-sheli.co.il' },
      ],
    },
  },
};

export default function Legal({ page = 'privacy' }: { page?: LegalPage }) {
  const { currentLanguage } = useLanguage();
  const isRTL = currentLanguage === 'he' || currentLanguage === 'ar';
  const lang = (['he', 'en', 'fr', 'es', 'ru', 'ar'].includes(currentLanguage)) ? currentLanguage : 'en';
  const pageContent = content[lang as keyof typeof content][page];

  const navLabels = {
    he: { privacy: 'פרטיות', terms: 'תנאי שימוש', returns: 'החזרות', shipping: 'משלוחים' },
    en: { privacy: 'Privacy', terms: 'Terms', returns: 'Returns', shipping: 'Shipping' },
    fr: { privacy: 'Confidentialite', terms: 'Conditions', returns: 'Retours', shipping: 'Livraison' },
    es: { privacy: 'Privacidad', terms: 'Terminos', returns: 'Devoluciones', shipping: 'Envios' },
    ru: { privacy: 'Конфиденциальность', terms: 'Условия', returns: 'Возвраты', shipping: 'Доставка' },
    ar: { privacy: 'الخصوصية', terms: 'الشروط', returns: 'الإرجاع', shipping: 'الشحن' },
  };

  return (
    <div style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
      <Header />

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        {/* Tab navigation */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {(['privacy', 'terms', 'returns', 'shipping'] as LegalPage[]).map((p) => (
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
                {navLabels[lang as keyof typeof navLabels][p]}
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
