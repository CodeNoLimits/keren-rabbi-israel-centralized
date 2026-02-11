import { Header } from '../components/Header';
import { useLanguage } from '../contexts/LanguageContext';

const shippingTranslations = {
  he: {
    title: 'מדיניות משלוחים',
    subtitle: 'כל מה שצריך לדעת על המשלוחים שלנו',
    freeShippingTitle: 'משלוח חינם',
    freeShippingDesc: 'משלוח חינם בהזמנות מעל 399 ש"ח בכל רחבי ישראל. הזמנות מתחת לסכום זה יחויבו בדמי משלוח של 30 ש"ח.',
    deliveryTimeTitle: 'זמני אספקה',
    deliveryTimeDesc: 'זמן האספקה הרגיל הוא 3-7 ימי עסקים מרגע ביצוע ההזמנה. במקרים מיוחדים (חגים, מבצעים גדולים) זמן האספקה עשוי להתארך.',
    domesticTitle: 'משלוחים בארץ',
    domesticItems: [
      'משלוח רגיל: 3-7 ימי עסקים - 30 ש"ח (חינם מעל 399 ש"ח)',
      'משלוח מהיר: 1-3 ימי עסקים - 50 ש"ח',
      'איסוף עצמי: ללא עלות - ניתן לאסוף מהמשרדים שלנו בתיאום מראש',
      'משלוחים מבוצעים דרך דואר ישראל ושירותי שליחויות',
    ],
    internationalTitle: 'משלוחים בינלאומיים',
    internationalItems: [
      'אירופה: 7-14 ימי עסקים - 60-120 ש"ח בהתאם למשקל',
      'צפון אמריקה: 10-21 ימי עסקים - 80-150 ש"ח בהתאם למשקל',
      'שאר העולם: 14-30 ימי עסקים - יש ליצור קשר לקבלת הצעת מחיר',
      'משלוחים בינלאומיים מבוצעים דרך דואר ישראל (רשום / EMS)',
    ],
    trackingTitle: 'מעקב אחר משלוחים',
    trackingDesc: 'לאחר שליחת ההזמנה, תקבלו מספר מעקב באימייל ובוואטסאפ. ניתן לעקוב אחר המשלוח דרך אתר דואר ישראל או דרך חברת השליחויות.',
    packagingTitle: 'אריזה',
    packagingDesc: 'כל הספרים נארזים בקפידה באריזות מגן כדי להבטיח שיגיעו אליכם במצב מושלם. ספרים יקרי ערך נארזים באריזה מוקפדת במיוחד.',
    issuesTitle: 'בעיות במשלוח?',
    issuesDesc: 'אם לא קיבלתם את ההזמנה בזמן, או אם המשלוח הגיע פגום, אנא צרו קשר איתנו מיד דרך וואטסאפ או טלפון ונדאג לפתרון מהיר.',
    contactCTA: 'צרו קשר לשאלות נוספות',
  },
  en: {
    title: 'Shipping Policy',
    subtitle: 'Everything you need to know about our shipping',
    freeShippingTitle: 'Free Shipping',
    freeShippingDesc: 'Free shipping on orders over 399 NIS throughout Israel. Orders below this amount will be charged a shipping fee of 30 NIS.',
    deliveryTimeTitle: 'Delivery Times',
    deliveryTimeDesc: 'Standard delivery time is 3-7 business days from the time the order is placed. In special cases (holidays, major sales) delivery time may be longer.',
    domesticTitle: 'Domestic Shipping (Israel)',
    domesticItems: [
      'Standard shipping: 3-7 business days - 30 NIS (free over 399 NIS)',
      'Express shipping: 1-3 business days - 50 NIS',
      'Self pickup: Free - available at our offices by appointment',
      'Shipments are made through Israel Post and courier services',
    ],
    internationalTitle: 'International Shipping',
    internationalItems: [
      'Europe: 7-14 business days - 60-120 NIS depending on weight',
      'North America: 10-21 business days - 80-150 NIS depending on weight',
      'Rest of the world: 14-30 business days - contact us for a quote',
      'International shipments are sent via Israel Post (registered / EMS)',
    ],
    trackingTitle: 'Shipment Tracking',
    trackingDesc: 'After your order is shipped, you will receive a tracking number via email and WhatsApp. You can track your shipment through the Israel Post website or the courier company.',
    packagingTitle: 'Packaging',
    packagingDesc: 'All books are carefully packed in protective packaging to ensure they arrive in perfect condition. Valuable books receive extra-careful packaging.',
    issuesTitle: 'Shipping Issues?',
    issuesDesc: 'If you have not received your order on time, or if the shipment arrived damaged, please contact us immediately via WhatsApp or phone and we will provide a quick solution.',
    contactCTA: 'Contact us for more questions',
  },
  fr: {
    title: 'Politique de Livraison',
    subtitle: 'Tout ce que vous devez savoir sur nos livraisons',
    freeShippingTitle: 'Livraison Gratuite',
    freeShippingDesc: 'Livraison gratuite pour les commandes de plus de 399 NIS dans tout Israel. Les commandes inferieures seront facturees 30 NIS de frais de livraison.',
    deliveryTimeTitle: 'Delais de Livraison',
    deliveryTimeDesc: 'Le delai de livraison standard est de 3 a 7 jours ouvrables. En periodes speciales (fetes, soldes), le delai peut etre plus long.',
    domesticTitle: 'Livraison en Israel',
    domesticItems: [
      'Livraison standard : 3-7 jours ouvrables - 30 NIS (gratuit au-dessus de 399 NIS)',
      'Livraison express : 1-3 jours ouvrables - 50 NIS',
      'Retrait sur place : Gratuit - disponible sur rendez-vous',
      'Les envois sont effectues via la Poste israelienne et des services de messagerie',
    ],
    internationalTitle: 'Livraison Internationale',
    internationalItems: [
      'Europe : 7-14 jours ouvrables - 60-120 NIS selon le poids',
      'Amerique du Nord : 10-21 jours ouvrables - 80-150 NIS selon le poids',
      'Reste du monde : 14-30 jours ouvrables - contactez-nous pour un devis',
      'Les envois internationaux sont effectues via la Poste israelienne (recommande / EMS)',
    ],
    trackingTitle: 'Suivi des Envois',
    trackingDesc: 'Apres l\'expedition de votre commande, vous recevrez un numero de suivi par email et WhatsApp. Vous pourrez suivre votre colis sur le site de la Poste israelienne.',
    packagingTitle: 'Emballage',
    packagingDesc: 'Tous les livres sont soigneusement emballes dans des protections adaptees pour arriver en parfait etat. Les livres precieux beneficient d\'un emballage renforce.',
    issuesTitle: 'Probleme de Livraison ?',
    issuesDesc: 'Si vous n\'avez pas recu votre commande a temps ou si le colis est arrive endommage, contactez-nous immediatement par WhatsApp ou telephone.',
    contactCTA: 'Contactez-nous pour plus de questions',
  },
  es: {
    title: 'Politica de Envio',
    subtitle: 'Todo lo que necesitas saber sobre nuestros envios',
    freeShippingTitle: 'Envio Gratuito',
    freeShippingDesc: 'Envio gratuito en pedidos superiores a 399 NIS en todo Israel. Los pedidos inferiores tendran un cargo de envio de 30 NIS.',
    deliveryTimeTitle: 'Tiempos de Entrega',
    deliveryTimeDesc: 'El tiempo de entrega estandar es de 3-7 dias habiles. En casos especiales (festivos, grandes ventas), el tiempo de entrega puede ser mayor.',
    domesticTitle: 'Envios Nacionales (Israel)',
    domesticItems: [
      'Envio estandar: 3-7 dias habiles - 30 NIS (gratis en pedidos de mas de 399 NIS)',
      'Envio express: 1-3 dias habiles - 50 NIS',
      'Recogida en persona: Gratis - disponible con cita previa',
      'Los envios se realizan a traves de Correos de Israel y servicios de mensajeria',
    ],
    internationalTitle: 'Envios Internacionales',
    internationalItems: [
      'Europa: 7-14 dias habiles - 60-120 NIS segun peso',
      'Norteamerica: 10-21 dias habiles - 80-150 NIS segun peso',
      'Resto del mundo: 14-30 dias habiles - contactenos para cotizacion',
      'Los envios internacionales se realizan via Correos de Israel (certificado / EMS)',
    ],
    trackingTitle: 'Seguimiento de Envios',
    trackingDesc: 'Despues de enviar su pedido, recibira un numero de seguimiento por email y WhatsApp. Puede rastrear su envio en el sitio de Correos de Israel.',
    packagingTitle: 'Embalaje',
    packagingDesc: 'Todos los libros se embalan cuidadosamente en empaques protectores para asegurar que lleguen en perfecto estado.',
    issuesTitle: 'Problemas con el Envio?',
    issuesDesc: 'Si no ha recibido su pedido a tiempo o si el paquete llego danado, contactenos inmediatamente por WhatsApp o telefono.',
    contactCTA: 'Contactenos para mas preguntas',
  },
  ru: {
    title: 'Политика Доставки',
    subtitle: 'Все, что вам нужно знать о нашей доставке',
    freeShippingTitle: 'Бесплатная Доставка',
    freeShippingDesc: 'Бесплатная доставка при заказе от 399 шек. по всему Израилю. Заказы ниже этой суммы облагаются стоимостью доставки 30 шек.',
    deliveryTimeTitle: 'Сроки Доставки',
    deliveryTimeDesc: 'Стандартный срок доставки составляет 3-7 рабочих дней. В особых случаях (праздники, большие распродажи) срок может быть дольше.',
    domesticTitle: 'Доставка по Израилю',
    domesticItems: [
      'Стандартная доставка: 3-7 рабочих дней - 30 шек. (бесплатно от 399 шек.)',
      'Экспресс-доставка: 1-3 рабочих дня - 50 шек.',
      'Самовывоз: Бесплатно - по предварительной договоренности',
      'Доставка осуществляется через Почту Израиля и курьерские службы',
    ],
    internationalTitle: 'Международная Доставка',
    internationalItems: [
      'Европа: 7-14 рабочих дней - 60-120 шек. в зависимости от веса',
      'Северная Америка: 10-21 рабочий день - 80-150 шек. в зависимости от веса',
      'Остальной мир: 14-30 рабочих дней - свяжитесь с нами для расчета стоимости',
      'Международные отправления через Почту Израиля (заказное / EMS)',
    ],
    trackingTitle: 'Отслеживание Посылок',
    trackingDesc: 'После отправки заказа вы получите номер отслеживания по email и WhatsApp. Вы можете отслеживать посылку на сайте Почты Израиля.',
    packagingTitle: 'Упаковка',
    packagingDesc: 'Все книги тщательно упакованы в защитную упаковку для обеспечения идеального состояния при доставке.',
    issuesTitle: 'Проблемы с Доставкой?',
    issuesDesc: 'Если вы не получили заказ вовремя или посылка пришла поврежденной, свяжитесь с нами немедленно через WhatsApp или по телефону.',
    contactCTA: 'Свяжитесь с нами для дополнительных вопросов',
  },
};

export default function Shipping() {
  const { currentLanguage, setLanguage } = useLanguage();
  const t = shippingTranslations[currentLanguage as keyof typeof shippingTranslations] || shippingTranslations.he;
  const isRTL = currentLanguage === 'he';

  return (
    <div style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
      {/* Top bar */}
      <section style={{ background: '#333', color: 'white', padding: '8px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <span>{isRTL ? 'משלוחים חינם החל מ- 399 ש"ח' : 'Free shipping from 399 NIS'}</span>
        </div>
      </section>

      <Header currentLanguage={currentLanguage} onLanguageChange={setLanguage} />

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 2rem' }}>
        {/* Page Title */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            fontWeight: '700',
            color: '#1e3a5f',
            marginBottom: '0.75rem',
          }}>
            {t.title}
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#6b7280' }}>
            {t.subtitle}
          </p>
          <div style={{ width: '60px', height: '3px', background: '#FF6B00', margin: '1.5rem auto 0', borderRadius: '2px' }} />
        </div>

        {/* Free Shipping Section */}
        <section style={{
          background: '#f0fdf4',
          border: '2px solid #86efac',
          borderRadius: '12px',
          padding: '2rem',
          marginBottom: '2rem',
        }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#166534', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.5rem' }}>&#x1F69A;</span> {t.freeShippingTitle}
          </h2>
          <p style={{ fontSize: '1rem', color: '#15803d', lineHeight: '1.7' }}>
            {t.freeShippingDesc}
          </p>
        </section>

        {/* Delivery Times */}
        <section style={{
          background: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
        }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: '700', color: '#1e3a5f', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.3rem' }}>&#x23F0;</span> {t.deliveryTimeTitle}
          </h2>
          <p style={{ fontSize: '1rem', color: '#4b5563', lineHeight: '1.7' }}>
            {t.deliveryTimeDesc}
          </p>
        </section>

        {/* Domestic Shipping */}
        <section style={{
          background: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
        }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: '700', color: '#1e3a5f', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.3rem' }}>&#x1F3E0;</span> {t.domesticTitle}
          </h2>
          <ul style={{ margin: 0, padding: isRTL ? '0 1.5rem 0 0' : '0 0 0 1.5rem', listStyleType: 'disc' }}>
            {t.domesticItems.map((item, i) => (
              <li key={i} style={{ fontSize: '1rem', color: '#4b5563', lineHeight: '1.8', marginBottom: '0.5rem' }}>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* International Shipping */}
        <section style={{
          background: '#eff6ff',
          border: '1px solid #bfdbfe',
          borderRadius: '12px',
          padding: '2rem',
          marginBottom: '2rem',
        }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: '700', color: '#1e40af', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.3rem' }}>&#x1F30D;</span> {t.internationalTitle}
          </h2>
          <ul style={{ margin: 0, padding: isRTL ? '0 1.5rem 0 0' : '0 0 0 1.5rem', listStyleType: 'disc' }}>
            {t.internationalItems.map((item, i) => (
              <li key={i} style={{ fontSize: '1rem', color: '#1e40af', lineHeight: '1.8', marginBottom: '0.5rem' }}>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Tracking */}
        <section style={{
          background: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
        }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: '700', color: '#1e3a5f', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.3rem' }}>&#x1F4E6;</span> {t.trackingTitle}
          </h2>
          <p style={{ fontSize: '1rem', color: '#4b5563', lineHeight: '1.7' }}>
            {t.trackingDesc}
          </p>
        </section>

        {/* Packaging */}
        <section style={{
          background: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
        }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: '700', color: '#1e3a5f', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.3rem' }}>&#x1F4E6;</span> {t.packagingTitle}
          </h2>
          <p style={{ fontSize: '1rem', color: '#4b5563', lineHeight: '1.7' }}>
            {t.packagingDesc}
          </p>
        </section>

        {/* Issues */}
        <section style={{
          background: '#fef3c7',
          border: '1px solid #fbbf24',
          borderRadius: '12px',
          padding: '2rem',
          marginBottom: '2rem',
        }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: '700', color: '#92400e', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.3rem' }}>&#x26A0;&#xFE0F;</span> {t.issuesTitle}
          </h2>
          <p style={{ fontSize: '1rem', color: '#92400e', lineHeight: '1.7' }}>
            {t.issuesDesc}
          </p>
        </section>

        {/* Contact CTA */}
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <a
            href="/contact"
            style={{
              display: 'inline-block',
              background: '#FF6B00',
              color: 'white',
              padding: '1rem 2.5rem',
              borderRadius: '10px',
              textDecoration: 'none',
              fontWeight: '700',
              fontSize: '1.05rem',
              boxShadow: '0 4px 14px rgba(255,107,0,0.35)',
              transition: 'background 0.2s ease',
            }}
          >
            {t.contactCTA}
          </a>
        </div>
      </main>
    </div>
  );
}
