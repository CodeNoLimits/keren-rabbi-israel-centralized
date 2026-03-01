import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../hooks/useAuth';
import { CartWidget } from './CartWidget';
import { SearchAutocomplete } from './SearchAutocomplete';
import { Menu, X, LogIn, LogOut, User, Heart, ShoppingCart, ChevronDown } from 'lucide-react';
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
    welcome: 'שלום',
    donate: 'תרומות',
    selectLang: 'בחר שפה',
    favorites: 'מועדפים',
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
    welcome: 'Welcome',
    donate: 'Donate',
    selectLang: 'Select Language',
    favorites: 'Favorites',
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
    welcome: 'Bienvenue',
    donate: 'Faire un Don',
    selectLang: 'Choisir la langue',
    favorites: 'Favoris',
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
    welcome: 'Bienvenido',
    donate: 'Donar',
    selectLang: 'Seleccionar idioma',
    favorites: 'Favoritos',
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
    welcome: 'Добро пожаловать',
    donate: 'Пожертвовать',
    selectLang: 'Выбрать язык',
    favorites: 'Избранное',
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
  const isRTL = currentLanguage === 'he';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);
  
  const languageFlags: Record<string, string> = {
    he: '🇮🇱',
    en: '🇺🇸',
    fr: '🇫🇷',
    es: '🇪🇸',
    ru: '🇷🇺'
  };

  const navLinks = [
    { href: '/', label: t.home },
    { href: '/store', label: t.books },
    { href: '/about', label: t.about },
    { href: '/blog', label: t.blog },
    { href: '/contact', label: t.contact }
  ];

  const mobileLinks = [
    { href: '/', label: t.home },
    { href: '/store', label: t.books },
    { href: '/donate', label: t.donate, icon: '❤️' },
    { href: '/favorites', label: t.favorites, badge: favorites.size },
    { href: '/about', label: t.about },
    { href: '/blog', label: t.blog },
    { href: '/contact', label: t.contact }
  ];

  return (
    <>
      {/* Spacer for fixed header */}
      <div className={`transition-all duration-500 ${isScrolled ? 'h-16' : 'h-20'}`} />

      <header
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-500 ease-out
          ${isScrolled
            ? 'bg-[#0A0A0B]/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-2 border-b border-white/5'
            : 'bg-[#0A0A0B] py-4'
          }
        `}
        data-testid="main-header"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-8">
          {/* LOGO */}
          <div className="flex-shrink-0">
            <a href="/" data-testid="link-home" className="block transition-all duration-300">
              <img
                fetchPriority="high"
                decoding="async"
                width="185"
                height="300"
                src="/images/logo.webp"
                alt="Haesh Sheli"
                className={`w-auto object-contain transition-all duration-300 brightness-0 invert opacity-90 hover:opacity-100 ${isScrolled ? 'h-10' : 'h-14'}`}
              />
            </a>
          </div>

          {/* PRIMARY NAVIGATION — Oz VeHadar Style */}
          <nav className="hidden lg:flex flex-grow justify-center" data-testid="nav-main">
            <ul className="flex items-center gap-10">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`
                      text-[13px] font-semibold tracking-wide uppercase
                      transition-all duration-300 relative
                      after:absolute after:bottom-[-4px] after:left-0 after:right-0
                      after:h-[2px] after:bg-[#D4AF37] after:rounded-full
                      after:scale-x-0 after:origin-center hover:after:scale-x-100
                      after:transition-transform after:duration-300
                      ${location === link.href
                        ? 'text-[#D4AF37] after:scale-x-100'
                        : 'text-slate-300 hover:text-[#D4AF37]'
                      }
                    `}
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
              {/* Language Codes — Minimalist */}
              <div className="hidden sm:flex gap-3 mr-2">
                {Object.keys(languageFlags).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`
                      text-[10px] font-black tracking-widest uppercase transition-all duration-200
                      ${currentLanguage === lang
                        ? 'text-[#D4AF37]'
                        : 'text-slate-500 hover:text-[#D4AF37]'
                      }
                    `}
                  >
                    {lang}
                  </button>
                ))}
              </div>

              {/* Donate Button — Solid Orange, No Gradient */}
              <a
                href="/donate"
                className="
                  hidden lg:inline-flex items-center gap-2
                  bg-transparent border border-[#D4AF37]/50 text-[#D4AF37] px-5 py-2.5
                  rounded-sm text-sm font-semibold
                  hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]
                  transition-all duration-300
                  mx-2
                "
              >
                <Heart size={16} />
                {t.donate}
              </a>

              {/* Favorites Heart Icon */}
              <a href="/favorites"
                className="p-2 text-slate-300 hover:text-[#D4AF37] transition-colors duration-200 relative"
                aria-label={t.favorites}
              >
                <Heart size={20} />
                {favorites.size > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {favorites.size}
                  </span>
                )}
              </a>

              {/* Cart Icon */}
              <button onClick={() => setLocation('/cart')}
                className="p-2 text-slate-300 hover:text-[#D4AF37] transition-colors duration-200 relative"
                aria-label="Shopping Cart"
              >
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 bg-primary text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile Toggle */}
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-slate-300 hover:text-[#D4AF37] transition-colors"
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE OVERLAY */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-keren-blue/50 backdrop-blur-sm z-[999] lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* MOBILE NAVIGATION — Oz VeHadar Slide Panel */}
      <nav
        id="mobile-navigation"
        className={`
          fixed top-0 bottom-0 z-[1000] w-[280px]
          bg-white shadow-[-4px_0_20px_rgba(0,0,0,0.1)]
          overflow-y-auto
          transition-transform duration-300 ease-out
          lg:hidden
          ${isRTL ? 'right-0' : 'left-0'}
          ${mobileMenuOpen
            ? 'translate-x-0'
            : isRTL ? 'translate-x-full' : '-translate-x-full'
          }
        `}
        data-testid="nav-mobile"
        role="navigation"
        aria-label={isRTL ? 'תפריט נייד' : 'Mobile navigation'}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        {/* Close button */}
        <div className={`p-3 ${isRTL ? 'text-left' : 'text-right'}`}>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 text-keren-blue hover:text-primary transition-colors min-w-[44px] min-h-[44px] inline-flex items-center justify-center"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Primary nav links */}
        <ul className={`flex flex-col px-4 gap-1 ${isRTL ? 'text-right' : 'text-left'}`}>
          {mobileLinks.map((link: any) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`
                  flex items-center gap-2.5 px-3 py-3 rounded-xl
                  text-[1.05rem] font-bold transition-colors duration-200
                  ${location === link.href
                    ? 'text-primary bg-primary/5'
                    : link.icon
                      ? 'text-orange-600 hover:bg-orange-50'
                      : 'text-keren-blue hover:bg-gray-50 hover:text-primary'
                  }
                `}
              >
                {link.icon && <span className="text-xl">{link.icon}</span>}
                {link.label}
                {link.badge > 0 && (
                  <span className="bg-red-500 text-white text-[10px] font-bold rounded-full px-2 py-0.5 min-w-[18px] text-center">
                    {link.badge}
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* Divider */}
        <div className="mx-4 my-6 border-t border-gray-100" />

        {/* Language flags in mobile menu */}
        <div className="px-4 pb-6">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
            {t.selectLang}
          </h4>
          <div className="flex gap-2 flex-wrap" role="group">
            {Object.entries(languageFlags).map(([lang, flag]) => (
              <button
                key={lang}
                onClick={() => { setLanguage(lang); setMobileMenuOpen(false); }}
                className={`
                  flex items-center gap-2 px-4 py-2.5 rounded-xl
                  text-sm font-bold transition-all duration-200
                  flex-1 min-w-[100px] border
                  ${currentLanguage === lang
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-gray-200 text-gray-500 hover:border-primary/30'
                  }
                `}
              >
                <span>{flag}</span>
                <span>{lang.toUpperCase()}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <CartWidget />
    </>
  );
}
