import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../hooks/useAuth';
import { CartWidget } from './CartWidget';
import { Menu, X, LogIn, LogOut, User } from 'lucide-react';

interface HeaderProps {
  currentLanguage?: string;
  onLanguageChange?: (lang: string) => void;
}

const translations = {
  he: {
    home: 'דף הבית',
    store: 'חנות',
    about: 'אודות',
    contact: 'צור קשר',
    magazine: 'המגזין',
    join: 'הצטרפות',
    downloads: 'הורדות',
    subscription: 'הוראת קבע',
    breslovVideos: 'קרן סגנון',
    haeshHype: '🔥 האש הייפ',
    chat: '💬 צ\'אט ברסלבי',
    whatsapp: '💬 דבר איתנו',
    fire: '🔥 האש שלי',
    login: 'כניסה',
    logout: 'יציאה',
    welcome: 'שלום'
  },
  en: {
    home: 'Home',
    store: 'Store', 
    about: 'About',
    contact: 'Contact',
    magazine: 'Magazine',
    join: 'Join',
    downloads: 'Downloads',
    subscription: 'Subscription',
    breslovVideos: 'Keren Style',
    haeshHype: '🔥 HaEsh Hype',
    chat: '💬 Breslov Chat',
    whatsapp: '💬 Talk to Us',
    fire: '🔥 My Fire',
    login: 'Login',
    logout: 'Logout',
    welcome: 'Welcome'
  },
  fr: {
    home: 'Accueil',
    store: 'Boutique',
    about: 'À propos',
    contact: 'Contact',
    magazine: 'Magazine',
    join: 'Rejoindre',
    downloads: 'Téléchargements',
    subscription: 'Abonnement',
    breslovVideos: 'Style Keren',
    haeshHype: '🔥 HaEsh Hype',
    chat: '💬 Chat Breslov',
    whatsapp: '💬 Parlez-nous',
    fire: '🔥 Mon Feu',
    login: 'Connexion',
    logout: 'Déconnexion',
    welcome: 'Bienvenue'
  },
  es: {
    home: 'Inicio',
    store: 'Tienda',
    about: 'Acerca de',
    contact: 'Contacto', 
    magazine: 'Revista',
    join: 'Unirse',
    downloads: 'Descargas',
    subscription: 'Suscripción',
    breslovVideos: 'Estilo Keren',
    haeshHype: '🔥 HaEsh Hype',
    chat: '💬 Chat Breslov',
    whatsapp: '💬 Habla con Nosotros',
    fire: '🔥 Mi Fuego',
    login: 'Iniciar Sesión',
    logout: 'Cerrar Sesión',
    welcome: 'Bienvenido'
  },
  ru: {
    home: 'Главная',
    store: 'Магазин',
    about: 'О нас',
    contact: 'Контакт',
    magazine: 'Журнал',
    join: 'Присоединиться',
    downloads: 'Загрузки',
    subscription: 'Подписка',
    breslovVideos: 'Керен Стиль',
    haeshHype: '🔥 ХаЭш Хайп',
    chat: '💬 Брeslов Чат',
    whatsapp: '💬 Поговорить с Нами',
    fire: '🔥 Мой Огонь',
    login: 'Войти',
    logout: 'Выйти',
    welcome: 'Добро пожаловать'
  }
};

export function Header({ currentLanguage = 'he', onLanguageChange }: HeaderProps) {
  const [location] = useLocation();
  const { totalItems, totalPrice, setIsCartOpen } = useCart();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[currentLanguage as keyof typeof translations] || translations.he;
  
  const languageFlags = {
    he: '🇮🇱',
    en: '🇺🇸', 
    fr: '🇫🇷',
    es: '🇪🇸',
    ru: '🇷🇺'
  };

  return (
    <header className="site-header" data-testid="main-header" dir={currentLanguage === 'he' ? 'rtl' : 'ltr'}>
      {/* TOP ROW - Logo + Special Links */}
      <div className="header-container-top">
        {/* LOGO */}
        <div className="header-logo">
          <a href="/" data-testid="link-home" className="transition-all duration-500 hover:scale-110 hover:rotate-2 hover:drop-shadow-2xl inline-block hover:-translate-y-2">
            <img 
              src="https://www.haesh-sheli.co.il/wp-content/uploads/2021/12/cropped-%D7%A7%D7%A8%D7%95-%D7%A8%D7%91%D7%99-%D7%99%D7%A9%D7%A8%D7%90%D7%9C-%D7%91%D7%A8-%D7%90%D7%95%D7%93%D7%A1%D7%A8.d110a0.webp" 
              alt="האש שלי תוקף עד ביאת המשיח"
              data-testid="img-logo"
              className="transition-all duration-500 hover:brightness-110 hover:contrast-110"
            />
          </a>
        </div>

        {/* SPECIAL NAVIGATION - TOP ROW */}
        <nav className="header-nav-special" data-testid="nav-special">
          <ul className="nav-menu-special">
            <li className={location === '/chat' ? 'current-menu-item' : ''}>
              <a href="/chat" data-testid="link-chat" style={{color: '#10B981', fontWeight: 'bold'}} className="px-3 py-1 rounded-lg transition-all duration-300 hover:scale-125 hover:text-white hover:bg-green-500 hover:shadow-xl hover:-translate-y-2 inline-block">{t.chat}</a>
            </li>
            <li className={location === '/subscription' ? 'current-menu-item' : ''}>
              <a href="/subscription" data-testid="link-subscription" style={{color: '#FFD700', fontWeight: 'bold'}} className="px-3 py-1 rounded-lg transition-all duration-300 hover:scale-125 hover:text-white hover:bg-yellow-500 hover:shadow-xl hover:-translate-y-2 inline-block">👑 {t.subscription}</a>
            </li>
            <li className={location === '/keren-style' ? 'current-menu-item' : ''}>
              <a href="/keren-style" data-testid="link-keren-style" style={{color: '#FF6B35', fontWeight: 'bold'}} className="px-3 py-1 rounded-lg transition-all duration-300 hover:scale-125 hover:text-white hover:bg-orange-500 hover:shadow-xl hover:-translate-y-2 inline-block">🎥 {t.breslovVideos}</a>
            </li>
            <li className={location === '/haesh-hype' ? 'current-menu-item' : ''}>
              <a href="/haesh-hype" data-testid="link-haesh-hype" style={{color: '#EF4444', fontWeight: 'bold'}} className="px-3 py-1 rounded-lg transition-all duration-300 hover:scale-125 hover:text-white hover:bg-red-500 hover:shadow-xl hover:-translate-y-2 inline-block">{t.haeshHype}</a>
            </li>
            <li className={location === '/yaaakov' ? 'current-menu-item' : ''}>
              <a href="/yaaakov" data-testid="link-yaaakov" className="px-3 py-1 rounded-lg transition-all duration-300 hover:scale-110 hover:text-yellow-300 hover:drop-shadow-lg inline-block hover:-translate-y-1">
                {currentLanguage === 'he' ? 'יעקב' : currentLanguage === 'en' ? 'Yaaakov' : currentLanguage === 'fr' ? 'Yaaakov' : currentLanguage === 'es' ? 'Yaaakov' : currentLanguage === 'ru' ? 'Яааков' : 'יעקב'}
              </a>
            </li>
          </ul>
        </nav>

        {/* MOBILE MENU TOGGLE */}
        <button 
          className="mobile-menu-toggle transition-all duration-300 hover:scale-125 hover:bg-white hover:text-red-600 hover:shadow-xl hover:rotate-90"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          data-testid="button-mobile-menu"
          aria-label="Toggle mobile menu"
        >
          <span className="transition-all duration-300">
            {mobileMenuOpen ? <X /> : <Menu />}
          </span>
        </button>
      </div>

      {/* BOTTOM ROW - Basic Navigation + User Actions */}
      <div className="header-container-bottom">
        {/* BASIC NAVIGATION */}
        <nav className="header-nav" data-testid="nav-main">
          <ul className="nav-menu">
            <li className={location === '/' ? 'current-menu-item' : ''}>
              <a href="/" data-testid="link-home" className="transition-all duration-300 hover:scale-110 hover:text-yellow-300 hover:drop-shadow-lg inline-block hover:-translate-y-1">{t.home}</a>
            </li>
            <li className={location === '/store' ? 'current-menu-item' : ''}>
              <a href="/store" data-testid="link-store" className="transition-all duration-300 hover:scale-110 hover:text-yellow-300 hover:drop-shadow-lg inline-block hover:-translate-y-1">{t.store}</a>
            </li>
            <li className={location === '/about' ? 'current-menu-item' : ''}>
              <a href="/about" data-testid="link-about" className="transition-all duration-300 hover:scale-110 hover:text-yellow-300 hover:drop-shadow-lg inline-block hover:-translate-y-1">{t.about}</a>
            </li>
            <li className={location === '/contact' ? 'current-menu-item' : ''}>
              <a href="/contact" data-testid="link-contact" className="transition-all duration-300 hover:scale-110 hover:text-yellow-300 hover:drop-shadow-lg inline-block hover:-translate-y-1">{t.contact}</a>
            </li>
            <li className={location === '/magazine' ? 'current-menu-item' : ''}>
              <a href="/magazine" data-testid="link-magazine" className="transition-all duration-300 hover:scale-110 hover:text-yellow-300 hover:drop-shadow-lg inline-block hover:-translate-y-1">{t.magazine}</a>
            </li>
            <li className={location === '/join' ? 'current-menu-item' : ''}>
              <a href="/join" data-testid="link-join" className="transition-all duration-300 hover:scale-110 hover:text-yellow-300 hover:drop-shadow-lg inline-block hover:-translate-y-1">{t.join}</a>
            </li>
            <li className={location === '/downloads' ? 'current-menu-item' : ''}>
              <a href="/downloads" data-testid="link-downloads" className="transition-all duration-300 hover:scale-110 hover:text-yellow-300 hover:drop-shadow-lg inline-block hover:-translate-y-1">{t.downloads}</a>
            </li>
          </ul>
        </nav>

        {/* USER ACTIONS */}
        <div className="header-actions">
          {/* WhatsApp Button */}
          <a 
            href="https://wa.me/972501234567?text=שלום, אני מעוניין לשמוע עוד על הספרים והמנויים שלכם" 
            target="_blank" 
            rel="noopener noreferrer"
            className="whatsapp-widget transition-all duration-300 hover:scale-110 hover:bg-green-500 hover:text-white hover:shadow-xl hover:-translate-y-1 cursor-pointer flex items-center px-3 py-2 rounded-lg bg-white bg-opacity-20 text-white border border-white border-opacity-30" 
            data-testid="button-whatsapp"
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

          {/* Cart Widget */}
          <div 
            className="cart-widget transition-all duration-300 hover:scale-110 hover:bg-white hover:text-red-600 hover:shadow-xl hover:-translate-y-1 cursor-pointer" 
            onClick={() => setIsCartOpen(true)}
            data-testid="button-cart"
          >
            <div className="cart-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/>
                <path d="M9 8V17H11V8H9ZM13 8V17H15V8H13Z"/>
              </svg>
              {totalItems > 0 && (
                <span className="cart-badge" key={totalItems} data-testid="cart-badge">
                  {totalItems}
                </span>
              )}
            </div>
            <span className="cart-total" data-testid="cart-total">
              ₪{totalPrice.toFixed(2)}
            </span>
          </div>
          
          {/* Fire Logo */}
          <h2 className="fire-logo transition-all duration-500 hover:scale-125 hover:text-orange-400 hover:drop-shadow-lg hover:-translate-y-1 hover:rotate-12" data-testid="text-fire-logo">
            {t.fire}
          </h2>

          {/* LANGUAGE SELECTOR */}
          <div className="language-selector" data-testid="language-selector">
            {Object.entries(languageFlags).map(([lang, flag]) => (
              <button
                key={lang}
                onClick={() => onLanguageChange?.(lang)}
                className={`language-btn ${currentLanguage === lang ? 'active' : ''} transition-all duration-300 hover:scale-125 hover:bg-white hover:text-blue-600 hover:shadow-xl hover:-translate-y-1 hover:rotate-3`}
                data-testid={`button-language-${lang}`}
              >
                <span className="transition-all duration-300 hover:scale-125">{flag}</span>
                <span className="transition-all duration-300">{lang.toUpperCase()}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* MOBILE NAVIGATION */}
      <nav className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`} data-testid="nav-mobile">
        <ul className="nav-menu">
          <li className={location === '/' ? 'current-menu-item' : ''}>
            <a href="/" onClick={() => setMobileMenuOpen(false)} data-testid="mobile-link-home">{t.home}</a>
          </li>
          <li className={location === '/store' ? 'current-menu-item' : ''}>
            <a href="/store" onClick={() => setMobileMenuOpen(false)} data-testid="mobile-link-store">{t.store}</a>
          </li>
          <li className={location === '/about' ? 'current-menu-item' : ''}>
            <a href="/about" onClick={() => setMobileMenuOpen(false)} data-testid="mobile-link-about">{t.about}</a>
          </li>
          <li className={location === '/contact' ? 'current-menu-item' : ''}>
            <a href="/contact" onClick={() => setMobileMenuOpen(false)} data-testid="mobile-link-contact">{t.contact}</a>
          </li>
          <li className={location === '/magazine' ? 'current-menu-item' : ''}>
            <a href="/magazine" onClick={() => setMobileMenuOpen(false)} data-testid="mobile-link-magazine">{t.magazine}</a>
          </li>
          <li className={location === '/join' ? 'current-menu-item' : ''}>
            <a href="/join" onClick={() => setMobileMenuOpen(false)} data-testid="mobile-link-join">{t.join}</a>
          </li>
          <li className={location === '/downloads' ? 'current-menu-item' : ''}>
            <a href="/downloads" onClick={() => setMobileMenuOpen(false)} data-testid="mobile-link-downloads">{t.downloads}</a>
          </li>
          <li>
            <a 
              href="https://wa.me/972501234567?text=שלום, אני מעוניין לשמוע עוד על הספרים והמנויים שלכם" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)} 
              data-testid="mobile-link-whatsapp" 
              style={{color: '#25D366', fontWeight: 'bold'}}
            >
              {t.whatsapp}
            </a>
          </li>
          <li className={location === '/subscription' ? 'current-menu-item' : ''}>
            <a href="/subscription" onClick={() => setMobileMenuOpen(false)} data-testid="mobile-link-subscription" style={{color: '#FFD700', fontWeight: 'bold'}}>👑 {t.subscription}</a>
          </li>
          <li className={location === '/keren-style' ? 'current-menu-item' : ''}>
            <a href="/keren-style" onClick={() => setMobileMenuOpen(false)} data-testid="mobile-link-keren-style" style={{color: '#FF6B35', fontWeight: 'bold'}}>🎥 {t.breslovVideos}</a>
          </li>
          <li className={location === '/haesh-hype' ? 'current-menu-item' : ''}>
            <a href="/haesh-hype" onClick={() => setMobileMenuOpen(false)} data-testid="mobile-link-haesh-hype" style={{color: '#EF4444', fontWeight: 'bold'}}>{t.haeshHype}</a>
          </li>
          <li className={location === '/yaaakov' ? 'current-menu-item' : ''}>
            <a href="/yaaakov" onClick={() => setMobileMenuOpen(false)} data-testid="mobile-link-yaaakov">
              {currentLanguage === 'he' ? 'יעקב' : currentLanguage === 'en' ? 'Yaaakov' : currentLanguage === 'fr' ? 'Yaaakov' : currentLanguage === 'es' ? 'Yaaakov' : currentLanguage === 'ru' ? 'Яааков' : 'יעקב'}
            </a>
          </li>
        </ul>
      </nav>

      <CartWidget />
    </header>
  );
}