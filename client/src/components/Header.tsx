import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../hooks/useAuth';
import { CartWidget } from './CartWidget';
import { SearchAutocomplete } from './SearchAutocomplete';
import { Menu, X, LogIn, LogOut, User, Heart } from 'lucide-react';
import { useFavorites } from '../contexts/FavoritesContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useCurrency, type CurrencyCode } from '../hooks/useCurrency';

interface HeaderProps {
  currentLanguage?: string;
  onLanguageChange?: (lang: string) => void;
}

const translations = {
  he: {
    home: 'דף הבית',
    store: 'חנות',
    books: 'ספרים',
    judaica: 'יודאיקה',
    newArrivals: 'חדשים',
    promotions: 'מבצעים',
    about: 'אודות',
    contact: 'צור קשר',
    magazine: 'המגזין',
    join: 'הצטרפות',
    downloads: 'הורדות',
    subscription: 'הוראת קבע',
    breslovVideos: 'קרן סגנון',
    haeshHype: '🔥 האש הייפ',
    chat: '💬 צ\'אט ברסלבי',
    blog: 'תורה יומית',
    whatsapp: '💬 דבר איתנו',
    fire: '🔥 האש שלי',
    login: 'כניסה',
    logout: 'יציאה',
    welcome: 'שלום'
  },
  en: {
    home: 'Home',
    store: 'Store',
    books: 'Books',
    judaica: 'Judaica',
    newArrivals: 'New Arrivals',
    promotions: 'Promotions',
    about: 'About',
    contact: 'Contact',
    magazine: 'Magazine',
    join: 'Join',
    downloads: 'Downloads',
    subscription: 'Subscription',
    breslovVideos: 'Keren Style',
    haeshHype: '🔥 HaEsh Hype',
    chat: '💬 Breslov Chat',
    blog: 'Daily Torah',
    whatsapp: '💬 Talk to Us',
    fire: '🔥 My Fire',
    login: 'Login',
    logout: 'Logout',
    welcome: 'Welcome'
  },
  fr: {
    home: 'Accueil',
    store: 'Boutique',
    books: 'Livres',
    judaica: 'Judaica',
    newArrivals: 'Nouveautés',
    promotions: 'Promotions',
    about: 'À propos',
    contact: 'Contact',
    magazine: 'Magazine',
    join: 'Rejoindre',
    downloads: 'Téléchargements',
    subscription: 'Abonnement',
    breslovVideos: 'Style Keren',
    haeshHype: '🔥 HaEsh Hype',
    chat: '💬 Chat Breslov',
    blog: 'Torah du Jour',
    whatsapp: '💬 Parlez-nous',
    fire: '🔥 Mon Feu',
    login: 'Connexion',
    logout: 'Déconnexion',
    welcome: 'Bienvenue'
  },
  es: {
    home: 'Inicio',
    store: 'Tienda',
    books: 'Libros',
    judaica: 'Judaica',
    newArrivals: 'Novedades',
    promotions: 'Promociones',
    about: 'Acerca de',
    contact: 'Contacto',
    magazine: 'Revista',
    join: 'Unirse',
    downloads: 'Descargas',
    subscription: 'Suscripción',
    breslovVideos: 'Estilo Keren',
    haeshHype: '🔥 HaEsh Hype',
    chat: '💬 Chat Breslov',
    blog: 'Torah Diaria',
    whatsapp: '💬 Habla con Nosotros',
    fire: '🔥 Mi Fuego',
    login: 'Iniciar Sesión',
    logout: 'Cerrar Sesión',
    welcome: 'Bienvenido'
  },
  ru: {
    home: 'Главная',
    store: 'Магазин',
    books: 'Книги',
    judaica: 'Иудаика',
    newArrivals: 'Новинки',
    promotions: 'Акции',
    about: 'О нас',
    contact: 'Контакт',
    magazine: 'Журнал',
    join: 'Присоединиться',
    downloads: 'Загрузки',
    subscription: 'Подписка',
    breslovVideos: 'Керен Стиль',
    haeshHype: '🔥 ХаЭш Хайп',
    chat: '💬 Брeslов Чат',
    blog: 'Ежедневная Тора',
    whatsapp: '💬 Поговорить с Нами',
    fire: '🔥 Мой Огонь',
    login: 'Войти',
    logout: 'Выйти',
    welcome: 'Добро пожаловать'
  }
};

export function Header({ currentLanguage: _propLang, onLanguageChange: _propOnChange }: HeaderProps) {
  // Always use context directly - fixes language selector on ALL pages
  const { currentLanguage, setLanguage } = useLanguage();
  const [location] = useLocation();
  const { totalItems, totalPrice, setIsCartOpen } = useCart();
  const { favorites } = useFavorites();
  const { user, isAuthenticated, isLoading } = useAuth();
  const { currency, setCurrency, formatPrice } = useCurrency();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const t = translations[currentLanguage as keyof typeof translations] || translations.he;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const languageFlags = {
    he: '🇮🇱',
    en: '🇺🇸', 
    fr: '🇫🇷',
    es: '🇪🇸',
    ru: '🇷🇺'
  };

  return (
    <header className={`site-header sticky top-0 z-50 backdrop-blur-md transition-shadow duration-300 ${isScrolled ? 'shadow-md' : ''}`} data-testid="main-header" dir={currentLanguage === 'he' ? 'rtl' : 'ltr'}>
      {/* TOP ROW - Logo + Special Links */}
      <div className="header-container-top">
        {/* LOGO */}
        <div className="header-logo">
          <a href="/" data-testid="link-home" className="transition-all duration-500 hover:scale-110 hover:rotate-2 hover:drop-shadow-2xl inline-block hover:-translate-y-2">
            <img loading="lazy"
              decoding="async"
              width="185"
              height="300"
              src="/images/logo.webp"
              alt="האש שלי תוקף עד ביאת המשיח"
              data-testid="img-logo"
              className="transition-all duration-500 hover:brightness-110 hover:contrast-110"
            />
          </a>
        </div>

        {/* SPECIAL NAVIGATION - TOP ROW (subtle, smaller) */}
        <nav className="header-nav-special" data-testid="nav-special" role="navigation" aria-label={currentLanguage === 'he' ? 'ניווט מיוחד' : 'Special navigation'}>
          <ul className="nav-menu-special" style={{fontSize: '0.78rem', gap: '0.6rem', opacity: 0.85}}>
            <li className={location === '/chat' ? 'current-menu-item' : ''}>
              <a href="/chat" data-testid="link-chat" style={{color: '#10B981', fontWeight: '500', fontSize: '0.78rem'}} className="px-2 py-0.5 rounded transition-all duration-300 hover:scale-110 hover:text-white hover:bg-green-500 hover:shadow-md inline-block">{t.chat}</a>
            </li>
            <li className={location === '/subscription' ? 'current-menu-item' : ''}>
              <a href="/subscription" data-testid="link-subscription" style={{color: '#FFD700', fontWeight: '500', fontSize: '0.78rem'}} className="px-2 py-0.5 rounded transition-all duration-300 hover:scale-110 hover:text-white hover:bg-yellow-500 hover:shadow-md inline-block">{t.subscription}</a>
            </li>
            <li className={location === '/keren-style' ? 'current-menu-item' : ''}>
              <a href="/keren-style" data-testid="link-keren-style" style={{color: '#FF6B35', fontWeight: '500', fontSize: '0.78rem'}} className="px-2 py-0.5 rounded transition-all duration-300 hover:scale-110 hover:text-white hover:bg-orange-500 hover:shadow-md inline-block">{t.breslovVideos}</a>
            </li>
            <li className={location === '/haesh-hype' ? 'current-menu-item' : ''}>
              <a href="/haesh-hype" data-testid="link-haesh-hype" style={{color: '#EF4444', fontWeight: '500', fontSize: '0.78rem'}} className="px-2 py-0.5 rounded transition-all duration-300 hover:scale-110 hover:text-white hover:bg-red-500 hover:shadow-md inline-block">{t.haeshHype}</a>
            </li>
            <li className={location === '/yaaakov' ? 'current-menu-item' : ''}>
              <a href="/yaaakov" data-testid="link-yaaakov" style={{fontWeight: '500', fontSize: '0.78rem'}} className="px-2 py-0.5 rounded transition-all duration-300 hover:scale-110 hover:text-yellow-300 hover:drop-shadow-lg inline-block">
                {currentLanguage === 'he' ? 'יעקב' : currentLanguage === 'en' ? 'Yaaakov' : currentLanguage === 'fr' ? 'Yaaakov' : currentLanguage === 'es' ? 'Yaaakov' : currentLanguage === 'ru' ? 'Яааков' : 'יעקב'}
              </a>
            </li>
          </ul>
        </nav>

        {/* MOBILE MENU TOGGLE */}
        <button
          className="mobile-menu-toggle transition-all duration-300 hover:scale-110 hover:bg-white hover:text-red-600 hover:shadow-xl"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          data-testid="button-mobile-menu"
          aria-label={mobileMenuOpen ? (currentLanguage === 'he' ? 'סגור תפריט' : 'Close menu') : (currentLanguage === 'he' ? 'פתח תפריט' : 'Open menu')}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          style={{minWidth: '44px', minHeight: '44px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center'}}
        >
          <span className="transition-all duration-300">
            {mobileMenuOpen ? <X /> : <Menu />}
          </span>
        </button>
      </div>

      {/* BOTTOM ROW - Basic Navigation + User Actions */}
      <div className="header-container-bottom">
        {/* BASIC NAVIGATION - Simple clean categories */}
        <nav className="header-nav" data-testid="nav-main" role="navigation" aria-label={currentLanguage === 'he' ? 'ניווט ראשי' : 'Main navigation'}>
          <ul className="nav-menu" style={{gap: '1.5rem'}}>
            <li className={location === '/' ? 'current-menu-item' : ''}>
              <a href="/" data-testid="link-home" style={{fontSize: '1.05rem', fontWeight: '600'}} className="transition-all duration-300 hover:scale-110 hover:text-yellow-300 hover:drop-shadow-lg inline-block hover:-translate-y-1">{t.home}</a>
            </li>
            <li className={location === '/store' ? 'current-menu-item' : ''}>
              <a href="/store" data-testid="link-books" style={{fontSize: '1.05rem', fontWeight: '600'}} className="transition-all duration-300 hover:scale-110 hover:text-yellow-300 hover:drop-shadow-lg inline-block hover:-translate-y-1">{t.books}</a>
            </li>
            <li className={location === '/store?category=judaica' ? 'current-menu-item' : ''}>
              <a href="/store?category=judaica" data-testid="link-judaica" style={{fontSize: '1.05rem', fontWeight: '600'}} className="transition-all duration-300 hover:scale-110 hover:text-yellow-300 hover:drop-shadow-lg inline-block hover:-translate-y-1">{t.judaica}</a>
            </li>
            <li className={location === '/store?sort=new' ? 'current-menu-item' : ''}>
              <a href="/store?sort=new" data-testid="link-new-arrivals" style={{fontSize: '1.05rem', fontWeight: '600'}} className="transition-all duration-300 hover:scale-110 hover:text-yellow-300 hover:drop-shadow-lg inline-block hover:-translate-y-1">{t.newArrivals}</a>
            </li>
            <li className={location === '/store?promotions=true' ? 'current-menu-item' : ''}>
              <a href="/store?promotions=true" data-testid="link-promotions" style={{fontSize: '1.05rem', fontWeight: '600', color: '#FFD700'}} className="transition-all duration-300 hover:scale-110 hover:text-yellow-200 hover:drop-shadow-lg inline-block hover:-translate-y-1">{t.promotions}</a>
            </li>
            <li className={location === '/about' ? 'current-menu-item' : ''}>
              <a href="/about" data-testid="link-about" style={{fontSize: '1.05rem', fontWeight: '600'}} className="transition-all duration-300 hover:scale-110 hover:text-yellow-300 hover:drop-shadow-lg inline-block hover:-translate-y-1">{t.about}</a>
            </li>
            <li className={location === '/contact' ? 'current-menu-item' : ''}>
              <a href="/contact" data-testid="link-contact" style={{fontSize: '1.05rem', fontWeight: '600'}} className="transition-all duration-300 hover:scale-110 hover:text-yellow-300 hover:drop-shadow-lg inline-block hover:-translate-y-1">{t.contact}</a>
            </li>
            <li className={location === '/blog' ? 'current-menu-item' : ''}>
              <a href="/blog" data-testid="link-blog" style={{fontSize: '1.05rem', fontWeight: '600'}} className="transition-all duration-300 hover:scale-110 hover:text-yellow-300 hover:drop-shadow-lg inline-block hover:-translate-y-1">{t.blog}</a>
            </li>
          </ul>
        </nav>

        {/* SEARCH AUTOCOMPLETE - Task #3: Added onNavigate for SPA navigation */}
        <div className="header-search" data-testid="header-search" style={{flex: '0 1 340px', margin: '0 12px'}}>
          <SearchAutocomplete onNavigate={(productId) => setLocation(`/product/${productId}`)} />
        </div>

        {/* USER ACTIONS */}
        <div className="header-actions">
          {/* WhatsApp Button */}
          <a
            href="https://wa.me/972501234567?text=שלום, אני מעוניין לשמוע עוד על הספרים והמנויים שלכם"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-widget transition-all duration-300 hover:scale-110 hover:bg-green-500 hover:text-white hover:shadow-xl hover:-translate-y-1 cursor-pointer flex items-center px-3 py-2 rounded-lg bg-white bg-opacity-20 text-white border border-white border-opacity-30"
            data-testid="button-whatsapp"
            aria-label={currentLanguage === 'he' ? 'שלח הודעה בוואטסאפ' : 'Send WhatsApp message'}
            style={{marginRight: currentLanguage === 'he' ? '10px' : '0', marginLeft: currentLanguage !== 'he' ? '10px' : '0'}}
          >
            <span className="text-sm">{t.whatsapp}</span>
          </a>

          {/* Authentication Button */}
          <div className="auth-widget" data-testid="auth-widget" style={{marginRight: currentLanguage === 'he' ? '10px' : '0', marginLeft: currentLanguage !== 'he' ? '10px' : '0'}}>
            {isLoading ? (
              <div className="auth-loading flex items-center px-3 py-2 rounded-lg bg-white bg-opacity-20 text-white border border-white border-opacity-30">
                <span className="text-sm">...</span>
              </div>
            ) : isAuthenticated && user ? (
              <div className="auth-user flex items-center space-x-2" style={{direction: currentLanguage === 'he' ? 'rtl' : 'ltr'}}>
                <div className="flex items-center px-3 py-2 rounded-lg bg-white bg-opacity-20 text-white border border-white border-opacity-30">
                  <User size={16} className="mr-2" style={{marginRight: currentLanguage === 'he' ? '0' : '8px', marginLeft: currentLanguage === 'he' ? '8px' : '0'}} />
                  <span className="text-sm">{t.welcome} {user.firstName || user.email}</span>
                </div>
                <a
                  href="/api/logout"
                  className="logout-btn transition-all duration-300 hover:scale-110 hover:bg-red-500 hover:text-white hover:shadow-xl hover:-translate-y-1 cursor-pointer flex items-center px-3 py-2 rounded-lg bg-white bg-opacity-20 text-white border border-white border-opacity-30"
                  data-testid="button-logout"
                >
                  <LogOut size={16} className="mr-1" style={{marginRight: currentLanguage === 'he' ? '0' : '4px', marginLeft: currentLanguage === 'he' ? '4px' : '0'}} />
                  <span className="text-sm">{t.logout}</span>
                </a>
              </div>
            ) : (
              <a
                href="/api/login"
                className="login-btn transition-all duration-300 hover:scale-110 hover:bg-blue-500 hover:text-white hover:shadow-xl hover:-translate-y-1 cursor-pointer flex items-center px-3 py-2 rounded-lg bg-white bg-opacity-20 text-white border border-white border-opacity-30"
                data-testid="button-login"
              >
                <LogIn size={16} className="mr-1" style={{marginRight: currentLanguage === 'he' ? '0' : '4px', marginLeft: currentLanguage === 'he' ? '4px' : '0'}} />
                <span className="text-sm">{t.login}</span>
              </a>
            )}
          </div>

          {/* User Profile Icon */}
          <a
            href="#"
            className="user-profile-icon transition-all duration-300 hover:scale-110 hover:bg-white hover:bg-opacity-20 hover:shadow-xl hover:-translate-y-1 cursor-pointer flex items-center justify-center rounded-lg p-2"
            data-testid="button-user-profile"
            aria-label="User profile"
            title={currentLanguage === 'he' ? 'פרופיל' : 'Profile'}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="8" r="4" />
              <path d="M20 21a8 8 0 0 0-16 0" />
            </svg>
          </a>

          {/* Favorites Heart */}
          <a
            href="/favorites"
            className="relative p-2 rounded-full transition-all duration-200 hover:scale-110 hover:bg-white/20"
            data-testid="button-favorites"
            aria-label="Favorites"
          >
            <Heart size={22} className="text-white" fill={favorites.size > 0 ? 'currentColor' : 'none'} />
            {favorites.size > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {favorites.size}
              </span>
            )}
          </a>

          {/* Cart Widget */}
          <div
            className="cart-widget transition-all duration-300 hover:scale-110 hover:bg-white hover:text-red-600 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
            onClick={() => setIsCartOpen(true)}
            data-testid="button-cart"
            role="button"
            tabIndex={0}
            aria-label={currentLanguage === 'he' ? `סל קניות, ${totalItems} פריטים` : `Shopping cart, ${totalItems} items`}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setIsCartOpen(true); } }}
          >
            <div className="cart-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/>
                <path d="M9 8V17H11V8H9ZM13 8V17H15V8H13Z"/>
              </svg>
              {totalItems > 0 && (
                <span className="cart-badge" key={totalItems} data-testid="cart-badge" aria-live="polite" aria-atomic="true">
                  {totalItems}
                </span>
              )}
            </div>
            <span className="cart-total" data-testid="cart-total">
              {formatPrice(totalPrice)}
            </span>
          </div>
          
          {/* Fire Logo */}
          <h2 className="fire-logo transition-all duration-500 hover:scale-125 hover:text-orange-400 hover:drop-shadow-lg hover:-translate-y-1 hover:rotate-12" data-testid="text-fire-logo">
            {t.fire}
          </h2>

          {/* CURRENCY SELECTOR */}
          <div className="language-selector" data-testid="currency-selector" role="group" aria-label={currentLanguage === 'he' ? 'בחירת מטבע' : 'Currency selector'} style={{marginRight: currentLanguage === 'he' ? '8px' : '0', marginLeft: currentLanguage !== 'he' ? '8px' : '0'}}>
            {(['NIS', 'USD', 'EUR'] as CurrencyCode[]).map((cur) => {
              const labels: Record<CurrencyCode, string> = { NIS: '₪ NIS', USD: '$ USD', EUR: '€ EUR' };
              return (
                <button
                  key={cur}
                  onClick={() => setCurrency(cur)}
                  className={`language-btn ${currency === cur ? 'active' : ''} transition-all duration-300 hover:scale-125 hover:bg-white hover:text-blue-600 hover:shadow-xl hover:-translate-y-1 hover:rotate-3`}
                  data-testid={`button-currency-${cur.toLowerCase()}`}
                  aria-label={`${cur === 'NIS' ? 'Israeli Shekel' : cur === 'USD' ? 'US Dollar' : 'Euro'}`}
                  aria-pressed={currency === cur}
                >
                  <span className="transition-all duration-300">{labels[cur]}</span>
                </button>
              );
            })}
          </div>

          {/* LANGUAGE SELECTOR */}
          <div className="language-selector" data-testid="language-selector" role="group" aria-label={currentLanguage === 'he' ? 'בחירת שפה' : 'Language selector'}>
            {Object.entries(languageFlags).map(([lang, flag]) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`language-btn ${currentLanguage === lang ? 'active' : ''} transition-all duration-300 hover:scale-125 hover:bg-white hover:text-blue-600 hover:shadow-xl hover:-translate-y-1 hover:rotate-3`}
                data-testid={`button-language-${lang}`}
                aria-label={`${lang === 'he' ? 'Hebrew' : lang === 'en' ? 'English' : lang === 'fr' ? 'French' : lang === 'es' ? 'Spanish' : 'Russian'}`}
                aria-pressed={currentLanguage === lang}
              >
                <span className="transition-all duration-300 hover:scale-125" aria-hidden="true">{flag}</span>
                <span className="transition-all duration-300">{lang.toUpperCase()}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* MOBILE NAVIGATION - RTL-friendly slide panel */}
      <nav
        id="mobile-navigation"
        className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}
        data-testid="nav-mobile"
        role="navigation"
        aria-label={currentLanguage === 'he' ? 'תפריט נייד' : 'Mobile navigation'}
        dir={currentLanguage === 'he' ? 'rtl' : 'ltr'}
        style={{
          transform: mobileMenuOpen ? 'translateX(0)' : (currentLanguage === 'he' ? 'translateX(100%)' : 'translateX(-100%)'),
          transition: 'transform 0.3s ease-in-out',
          position: 'fixed',
          top: 0,
          bottom: 0,
          width: '280px',
          ...(currentLanguage === 'he' ? { right: 0 } : { left: 0 }),
          background: 'var(--primary-blue)',
          zIndex: 1000,
          overflowY: 'auto',
          display: 'block',
          paddingTop: '1rem',
        }}
      >
        {/* Close button */}
        <div style={{padding: '0.5rem 1rem', textAlign: currentLanguage === 'he' ? 'left' : 'right'}}>
          <button
            onClick={() => setMobileMenuOpen(false)}
            style={{background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', padding: '0.5rem', minWidth: '44px', minHeight: '44px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center'}}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Primary nav links - simple clean categories with 44px min touch targets */}
        <ul className="nav-menu" style={{flexDirection: 'column', padding: '0 1rem', gap: '0.25rem', textAlign: currentLanguage === 'he' ? 'right' : 'left'}}>
          <li className={location === '/' ? 'current-menu-item' : ''}>
            <a href="/" onClick={() => setMobileMenuOpen(false)} data-testid="mobile-link-home" style={{fontSize: '1.1rem', fontWeight: '600', padding: '0.75rem 0.5rem', display: 'block', minHeight: '44px', lineHeight: '1.5'}}>{t.home}</a>
          </li>
          <li className={location === '/store' ? 'current-menu-item' : ''}>
            <a href="/store" onClick={() => setMobileMenuOpen(false)} data-testid="mobile-link-books" style={{fontSize: '1.1rem', fontWeight: '600', padding: '0.75rem 0.5rem', display: 'block', minHeight: '44px', lineHeight: '1.5'}}>{t.books}</a>
          </li>
          <li>
            <a href="/store?category=judaica" onClick={() => setMobileMenuOpen(false)} data-testid="mobile-link-judaica" style={{fontSize: '1.1rem', fontWeight: '600', padding: '0.75rem 0.5rem', display: 'block', minHeight: '44px', lineHeight: '1.5'}}>{t.judaica}</a>
          </li>
          <li>
            <a href="/store?sort=new" onClick={() => setMobileMenuOpen(false)} data-testid="mobile-link-new-arrivals" style={{fontSize: '1.1rem', fontWeight: '600', padding: '0.75rem 0.5rem', display: 'block', minHeight: '44px', lineHeight: '1.5'}}>{t.newArrivals}</a>
          </li>
          <li>
            <a href="/store?promotions=true" onClick={() => setMobileMenuOpen(false)} data-testid="mobile-link-promotions" style={{fontSize: '1.1rem', fontWeight: '600', padding: '0.75rem 0.5rem', display: 'block', color: '#FFD700', minHeight: '44px', lineHeight: '1.5'}}>{t.promotions}</a>
          </li>
          <li className={location === '/about' ? 'current-menu-item' : ''}>
            <a href="/about" onClick={() => setMobileMenuOpen(false)} data-testid="mobile-link-about" style={{fontSize: '1.1rem', fontWeight: '600', padding: '0.75rem 0.5rem', display: 'block', minHeight: '44px', lineHeight: '1.5'}}>{t.about}</a>
          </li>
          <li className={location === '/contact' ? 'current-menu-item' : ''}>
            <a href="/contact" onClick={() => setMobileMenuOpen(false)} data-testid="mobile-link-contact" style={{fontSize: '1.1rem', fontWeight: '600', padding: '0.75rem 0.5rem', display: 'block', minHeight: '44px', lineHeight: '1.5'}}>{t.contact}</a>
          </li>
          <li className={location === '/blog' ? 'current-menu-item' : ''}>
            <a href="/blog" onClick={() => setMobileMenuOpen(false)} data-testid="mobile-link-blog" style={{fontSize: '1.1rem', fontWeight: '600', padding: '0.75rem 0.5rem', display: 'block', minHeight: '44px', lineHeight: '1.5'}}>{t.blog}</a>
          </li>
        </ul>

        {/* Divider */}
        <div style={{margin: '0.75rem 1rem', borderTop: '1px solid rgba(255,255,255,0.15)'}} />

        {/* Secondary nav links - smaller */}
        <ul className="nav-menu" style={{flexDirection: 'column', padding: '0 1rem', gap: '0.1rem', textAlign: currentLanguage === 'he' ? 'right' : 'left'}}>
          <li className={location === '/magazine' ? 'current-menu-item' : ''}>
            <a href="/magazine" onClick={() => setMobileMenuOpen(false)} data-testid="mobile-link-magazine" style={{fontSize: '0.9rem', padding: '0.5rem 0.5rem', display: 'block'}}>{t.magazine}</a>
          </li>
          <li className={location === '/join' ? 'current-menu-item' : ''}>
            <a href="/join" onClick={() => setMobileMenuOpen(false)} data-testid="mobile-link-join" style={{fontSize: '0.9rem', padding: '0.5rem 0.5rem', display: 'block'}}>{t.join}</a>
          </li>
          <li className={location === '/downloads' ? 'current-menu-item' : ''}>
            <a href="/downloads" onClick={() => setMobileMenuOpen(false)} data-testid="mobile-link-downloads" style={{fontSize: '0.9rem', padding: '0.5rem 0.5rem', display: 'block'}}>{t.downloads}</a>
          </li>
          <li>
            <a
              href="https://wa.me/972501234567?text=שלום, אני מעוניין לשמוע עוד על הספרים והמנויים שלכם"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              data-testid="mobile-link-whatsapp"
              style={{color: '#25D366', fontWeight: '600', fontSize: '0.9rem', padding: '0.5rem 0.5rem', display: 'block'}}
            >
              {t.whatsapp}
            </a>
          </li>
        </ul>

        {/* Divider */}
        <div style={{margin: '0.75rem 1rem', borderTop: '1px solid rgba(255,255,255,0.15)'}} />

        {/* Special links - subtle */}
        <ul className="nav-menu" style={{flexDirection: 'column', padding: '0 1rem', gap: '0.1rem', textAlign: currentLanguage === 'he' ? 'right' : 'left'}}>
          <li className={location === '/subscription' ? 'current-menu-item' : ''}>
            <a href="/subscription" onClick={() => setMobileMenuOpen(false)} data-testid="mobile-link-subscription" style={{color: '#FFD700', fontWeight: '500', fontSize: '0.85rem', padding: '0.4rem 0.5rem', display: 'block'}}>{t.subscription}</a>
          </li>
          <li className={location === '/keren-style' ? 'current-menu-item' : ''}>
            <a href="/keren-style" onClick={() => setMobileMenuOpen(false)} data-testid="mobile-link-keren-style" style={{color: '#FF6B35', fontWeight: '500', fontSize: '0.85rem', padding: '0.4rem 0.5rem', display: 'block'}}>{t.breslovVideos}</a>
          </li>
          <li className={location === '/haesh-hype' ? 'current-menu-item' : ''}>
            <a href="/haesh-hype" onClick={() => setMobileMenuOpen(false)} data-testid="mobile-link-haesh-hype" style={{color: '#EF4444', fontWeight: '500', fontSize: '0.85rem', padding: '0.4rem 0.5rem', display: 'block'}}>{t.haeshHype}</a>
          </li>
          <li className={location === '/yaaakov' ? 'current-menu-item' : ''}>
            <a href="/yaaakov" onClick={() => setMobileMenuOpen(false)} data-testid="mobile-link-yaaakov" style={{fontWeight: '500', fontSize: '0.85rem', padding: '0.4rem 0.5rem', display: 'block'}}>
              {currentLanguage === 'he' ? 'יעקב' : currentLanguage === 'en' ? 'Yaaakov' : currentLanguage === 'fr' ? 'Yaaakov' : currentLanguage === 'es' ? 'Yaaakov' : currentLanguage === 'ru' ? 'Яааков' : 'יעקב'}
            </a>
          </li>
        </ul>

        {/* Language flags in mobile menu */}
        <div style={{margin: '1rem', borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '1rem'}}>
          <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center'}} role="group" aria-label={currentLanguage === 'he' ? 'בחירת שפה' : 'Language selector'}>
            {Object.entries(languageFlags).map(([lang, flag]) => (
              <button
                key={lang}
                onClick={() => { setLanguage(lang); setMobileMenuOpen(false); }}
                className={`language-btn ${currentLanguage === lang ? 'active' : ''}`}
                style={{minWidth: '44px', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem', padding: '0.5rem 0.75rem'}}
                data-testid={`mobile-button-language-${lang}`}
                aria-label={`${lang === 'he' ? 'Hebrew' : lang === 'en' ? 'English' : lang === 'fr' ? 'French' : lang === 'es' ? 'Spanish' : 'Russian'}`}
                aria-pressed={currentLanguage === lang}
              >
                <span aria-hidden="true">{flag}</span>
                <span>{lang.toUpperCase()}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile nav overlay */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 999,
          }}
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <CartWidget />
    </header>
  );
}