import { useLanguage } from '../contexts/LanguageContext';

const footerTranslations = {
  he: {
    mission: 'הפצת תורת רבי נחמן מברסלב',
    missionDesc: 'קרן רבי ישראל - האש שלי פועלת להפצת ספרי רבינו נחמן מברסלב בעברית, אנגלית, צרפתית, ספרדית ורוסית.',
    quickLinks: 'קישורים מהירים',
    home: 'דף הבית',
    store: 'חנות',
    about: 'אודות',
    contact: 'צור קשר',
    downloads: 'הורדות',
    blog: 'תורה יומית',
    customerService: 'שירות לקוחות',
    shippingPolicy: 'מדיניות משלוחים',
    returns: 'החזרות והחלפות',
    faq: 'שאלות נפוצות',
    whatsappSupport: 'תמיכה בוואטסאפ',
    followUs: 'עקבו אחרינו',
    copyright: '\u00A9 2026 קרן רבי ישראל - האש שלי. כל הזכויות שמורות.',
    privacy: 'מדיניות פרטיות',
    terms: 'תנאי שימוש',
  },
  en: {
    mission: 'Spreading the Torah of Rabbi Nachman of Breslov',
    missionDesc: 'Keren Rabbi Israel - HaEsh Sheli works to spread the books of Rabbi Nachman of Breslov in Hebrew, English, French, Spanish and Russian.',
    quickLinks: 'Quick Links',
    home: 'Home',
    store: 'Store',
    about: 'About',
    contact: 'Contact',
    downloads: 'Downloads',
    blog: 'Daily Torah',
    customerService: 'Customer Service',
    shippingPolicy: 'Shipping Policy',
    returns: 'Returns & Exchanges',
    faq: 'FAQ',
    whatsappSupport: 'WhatsApp Support',
    followUs: 'Follow Us',
    copyright: '\u00A9 2026 Keren Rabbi Israel - HaEsh Sheli. All rights reserved.',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
  },
  fr: {
    mission: 'Diffusion de la Torah de Rabbi Nahman de Breslev',
    missionDesc: 'Keren Rabbi Israel - HaEsh Sheli oeuvre pour diffuser les livres de Rabbi Nahman de Breslev en hebreu, anglais, francais, espagnol et russe.',
    quickLinks: 'Liens Rapides',
    home: 'Accueil',
    store: 'Boutique',
    about: 'A propos',
    contact: 'Contact',
    downloads: 'Telechargements',
    blog: 'Torah du Jour',
    customerService: 'Service Client',
    shippingPolicy: 'Politique de Livraison',
    returns: 'Retours et Echanges',
    faq: 'FAQ',
    whatsappSupport: 'Support WhatsApp',
    followUs: 'Suivez-nous',
    copyright: '\u00A9 2026 Keren Rabbi Israel - HaEsh Sheli. Tous droits reserves.',
    privacy: 'Confidentialite',
    terms: 'Conditions',
  },
  es: {
    mission: 'Difusion de la Tora de Rabi Najman de Breslov',
    missionDesc: 'Keren Rabbi Israel - HaEsh Sheli trabaja para difundir los libros de Rabi Najman de Breslov en hebreo, ingles, frances, espanol y ruso.',
    quickLinks: 'Enlaces Rapidos',
    home: 'Inicio',
    store: 'Tienda',
    about: 'Acerca de',
    contact: 'Contacto',
    downloads: 'Descargas',
    blog: 'Torah Diaria',
    customerService: 'Servicio al Cliente',
    shippingPolicy: 'Politica de Envio',
    returns: 'Devoluciones y Cambios',
    faq: 'Preguntas Frecuentes',
    whatsappSupport: 'Soporte WhatsApp',
    followUs: 'Siguenos',
    copyright: '\u00A9 2026 Keren Rabbi Israel - HaEsh Sheli. Todos los derechos reservados.',
    privacy: 'Privacidad',
    terms: 'Terminos',
  },
  ru: {
    mission: 'Распространение Торы Рабби Нахмана из Бреслова',
    missionDesc: 'Керен Рабби Исраэль - ХаЭш Шели работает над распространением книг Рабби Нахмана из Бреслова на иврите, английском, французском, испанском и русском.',
    quickLinks: 'Быстрые Ссылки',
    home: 'Главная',
    store: 'Магазин',
    about: 'О нас',
    contact: 'Контакт',
    downloads: 'Загрузки',
    blog: 'Ежедневная Тора',
    customerService: 'Обслуживание Клиентов',
    shippingPolicy: 'Политика Доставки',
    returns: 'Возвраты и Обмены',
    faq: 'Частые Вопросы',
    whatsappSupport: 'Поддержка WhatsApp',
    followUs: 'Подписывайтесь',
    copyright: '\u00A9 2026 Керен Рабби Исраэль - ХаЭш Шели. Все права защищены.',
    privacy: 'Конфиденциальность',
    terms: 'Условия',
  },
};

export function Footer() {
  const { currentLanguage } = useLanguage();
  const t = footerTranslations[currentLanguage as keyof typeof footerTranslations] || footerTranslations.he;
  const isRTL = currentLanguage === 'he' || currentLanguage === 'ar';

  const quickLinks = [
    { label: t.home, href: '/' },
    { label: t.store, href: '/store' },
    { label: t.about, href: '/about' },
    { label: t.contact, href: '/contact' },
    { label: t.downloads, href: '/downloads' },
    { label: t.blog, href: '/blog' },
  ];

  const serviceLinks = [
    { label: t.shippingPolicy, href: '/shipping' },
    { label: t.returns, href: '/returns' },
    { label: t.faq, href: '/contact' },
  ];

  const socials = [
    {
      label: 'WhatsApp',
      href: 'https://wa.me/972584921492?text=%D7%A9%D7%9C%D7%95%D7%9D%2C%20%D7%90%D7%A0%D7%99%20%D7%A6%D7%A8%D7%99%D7%9A%20%D7%A2%D7%96%D7%A8%D7%94',
      color: 'bg-green-500',
      svg: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z',
    },
    {
      label: 'Facebook',
      href: 'https://www.facebook.com/haesh.sheli',
      color: 'bg-blue-600',
      svg: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
    },
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/haesh.sheli/',
      color: 'bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600',
      svg: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
    },
    {
      label: 'YouTube',
      href: 'https://www.youtube.com/@haesh-sheli',
      color: 'bg-red-600',
      svg: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
    },
  ];

  return (
    <footer className="bg-keren-surface border-t border-gray-100" dir={isRTL ? 'rtl' : 'ltr'} role="contentinfo" aria-label={isRTL ? 'תחתית האתר' : 'Site footer'}>
      <div className="container mx-auto px-6 max-w-6xl py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Logo + Mission */}
          <div className="lg:col-span-1">
            <a href="/" className="inline-block mb-4">
              <img
                loading="lazy"
                decoding="async"
                width="37"
                height="60"
                src="/images/logo.webp"
                alt="קרן רבי ישראל - האש שלי"
                className="h-16 w-auto"
              />
            </a>
            <p className="text-primary font-bold text-sm mb-2">{t.mission}</p>
            <p className="text-gray-400 text-sm leading-relaxed">{t.missionDesc}</p>
          </div>

          {/* Column 2: Quick Links */}
          <nav aria-label={t.quickLinks}>
            <h3 className="text-keren-blue font-bold text-sm uppercase tracking-wider mb-4">{t.quickLinks}</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-gray-400 hover:text-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3: Customer Service */}
          <nav aria-label={t.customerService}>
            <h3 className="text-keren-blue font-bold text-sm uppercase tracking-wider mb-4">{t.customerService}</h3>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-gray-400 hover:text-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="https://wa.me/972584921492?text=%D7%A9%D7%9C%D7%95%D7%9D%2C%20%D7%90%D7%A0%D7%99%20%D7%A6%D7%A8%D7%99%D7%9A%20%D7%A2%D7%96%D7%A8%D7%94"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-green-600 font-medium hover:text-green-700 transition-colors"
                >
                  {t.whatsappSupport}
                </a>
              </li>
            </ul>
          </nav>

          {/* Column 4: Social */}
          <div>
            <h3 className="text-keren-blue font-bold text-sm uppercase tracking-wider mb-4">{t.followUs}</h3>
            <div className="flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`
                    w-10 h-10 rounded-xl ${social.color}
                    shadow-[0_2px_6px_rgba(0,0,0,0.08)]
                    flex items-center justify-center
                    hover:scale-110 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)]
                    transition-all duration-300
                  `}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                    <path d={social.svg} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4 text-xs text-gray-400">
          <p>{t.copyright}</p>
          <div className="flex gap-4 flex-wrap">
            <a href="/privacy" className="hover:text-primary transition-colors">{t.privacy}</a>
            <a href="/terms" className="hover:text-primary transition-colors">{t.terms}</a>
            <a href="/returns" className="hover:text-primary transition-colors">{t.returns}</a>
            <a href="/shipping" className="hover:text-primary transition-colors">{t.shippingPolicy}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
