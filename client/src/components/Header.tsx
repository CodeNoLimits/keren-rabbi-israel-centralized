import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../hooks/useAuth';
import { CartWidget } from './CartWidget';
import { SearchAutocomplete } from './SearchAutocomplete';
import { Menu, X, LogIn, LogOut, User, Heart, ShoppingCart } from 'lucide-react';
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
  const { currentLanguage, setLanguage } = useLanguage();
  const [location, setLocation] = useLocation();
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
    <header className={`site-header sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 shadow-md backdrop-blur-sm' : 'bg-white'}`} data-testid="main-header" dir={currentLanguage === 'he' ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
        {/* LOGO */}
        <div className="flex-shrink-0">
          <a href="/" data-testid="link-home" className="block transition-transform hover:scale-105">
            <img
              fetchPriority="high"
              decoding="async"
              width="185"
              height="300"
              src="/images/logo.webp"
              alt="Haesh Sheli"
              className="h-14 w-auto object-contain"
            />
          </a>
        </div>

        {/* PRIMARY NAVIGATION - Minimal Apple Style */}
        <nav className="hidden lg:flex flex-grow justify-center" data-testid="nav-main">
          <ul className="flex items-center gap-10">
            {[
              { href: '/', label: t.home },
              { href: '/store', label: t.books },
              { href: '/about', label: t.about },
              { href: '/blog', label: t.blog },
              { href: '/contact', label: t.contact }
            ].map((link) => (
              <li key={link.href}>
                <a 
                  href={link.href} 
                  className={`text-sm font-bold tracking-tight uppercase transition-colors hover:text-orange-600 ${location === link.href ? 'text-orange-600' : 'text-gray-600'}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* ACTIONS */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <div className="hidden sm:block w-48 xl:w-64">
            <SearchAutocomplete onNavigate={(productId) => setLocation(`/product/${productId}`)} />
          </div>
          
          <div className="h-6 w-px bg-gray-200 hidden sm:block mx-2" />

          <div className="flex items-center gap-2">
            {/* Language Codes - Minimalist */}
            <div className="hidden sm:flex gap-3">
              {Object.keys(languageFlags).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`text-[10px] font-black tracking-widest uppercase transition-all ${currentLanguage === lang ? 'text-orange-600' : 'text-gray-400 hover:text-gray-900'}`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Favorites Heart Icon */}
            <a
              href="/favorites"
              className="p-2 text-gray-700 hover:text-red-500 transition-colors relative"
              aria-label={currentLanguage === 'he' ? 'מועדפים' : 'Favorites'}
            >
              <Heart size={20} />
              {favorites.size > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {favorites.size}
                </span>
              )}
            </a>

            {/* Cart Icon */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-gray-700 hover:text-orange-600 transition-colors relative"
              aria-label="Shopping Cart"
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-orange-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="lg:hidden p-2 text-gray-700"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
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
          background: '#FFFFFF',
          boxShadow: '-4px 0 20px rgba(0,0,0,0.1)',
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
            style={{background: 'transparent', border: 'none', color: '#1e3a5f', cursor: 'pointer', padding: '0.5rem', minWidth: '44px', minHeight: '44px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center'}}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Primary nav links */}
        <ul className="nav-menu" style={{flexDirection: 'column', padding: '0 1rem', gap: '0.25rem', textAlign: currentLanguage === 'he' ? 'right' : 'left'}}>
          {[
            { href: '/', label: t.home },
            { href: '/store', label: t.books },
            { href: '/favorites', label: currentLanguage === 'he' ? '\u05DE\u05D5\u05E2\u05D3\u05E4\u05D9\u05DD' : currentLanguage === 'fr' ? 'Favoris' : currentLanguage === 'es' ? 'Favoritos' : currentLanguage === 'ru' ? '\u0418\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u0435' : 'Favorites', badge: favorites.size },
            { href: '/about', label: t.about },
            { href: '/blog', label: t.blog },
            { href: '/contact', label: t.contact }
          ].map((link: any) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{fontSize: '1.1rem', fontWeight: '700', padding: '0.75rem 0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: location === link.href ? '#FF6B00' : '#1e3a5f', transition: 'color 0.2s'}}
              >
                {link.label}
                {link.badge > 0 && (
                  <span style={{background: '#ef4444', color: 'white', fontSize: '0.65rem', fontWeight: '700', borderRadius: '9999px', padding: '0.1rem 0.4rem', minWidth: '18px', textAlign: 'center' as const}}>
                    {link.badge}
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* Divider */}
        <div style={{margin: '1.5rem 1rem', borderTop: '1px solid #f1f5f9'}} />

        {/* Language flags in mobile menu */}
        <div style={{padding: '0 1rem'}}>
          <h4 style={{fontSize: '0.75rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '0.05em'}}>
            {currentLanguage === 'he' ? 'בחר שפה' : 'Select Language'}
          </h4>
          <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}} role="group">
            {Object.entries(languageFlags).map(([lang, flag]) => (
              <button
                key={lang}
                onClick={() => { setLanguage(lang); setMobileMenuOpen(false); }}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  border: '1px solid',
                  borderColor: currentLanguage === lang ? '#FF6B00' : '#e2e8f0',
                  background: currentLanguage === lang ? '#fff7ed' : '#ffffff',
                  color: currentLanguage === lang ? '#FF6B00' : '#64748b',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  flex: '1 1 calc(50% - 0.5rem)',
                  minWidth: '100px'
                }}
              >
                <span>{flag}</span>
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
            background: 'rgba(15, 23, 42, 0.5)',
            backdropFilter: 'blur(4px)',
            zIndex: 999,
          }}
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <CartWidget />
    </header>
  );
}
