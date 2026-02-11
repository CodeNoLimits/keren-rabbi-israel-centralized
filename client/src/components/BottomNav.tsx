import React from 'react';
import { Link, useLocation } from 'wouter';
import { Home, ShoppingBag, ShoppingCart, Heart, Menu } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useLanguage } from '@/contexts/LanguageContext';

// Task 79: Fixed bottom navigation bar for mobile
export const BottomNav: React.FC = () => {
  const [location] = useLocation();
  const { totalItems, setIsCartOpen } = useCart();
  const { favoritesCount } = useFavorites();
  const { currentLanguage } = useLanguage();

  const isActive = (path: string) => location === path;

  const navItems = [
    { path: '/', icon: Home, label: currentLanguage === 'he' ? '\u05D1\u05D9\u05EA' : 'Home', isLink: true },
    { path: '/store', icon: ShoppingBag, label: currentLanguage === 'he' ? '\u05D7\u05E0\u05D5\u05EA' : 'Store', isLink: true },
    { path: '#cart', icon: ShoppingCart, label: currentLanguage === 'he' ? '\u05E1\u05DC' : 'Cart', isLink: false, badge: totalItems },
    { path: '/favorites', icon: Heart, label: currentLanguage === 'he' ? '\u05DE\u05D5\u05E2\u05D3\u05E4\u05D9\u05DD' : 'Favorites', isLink: true, badge: favoritesCount },
    { path: '#menu', icon: Menu, label: currentLanguage === 'he' ? '\u05EA\u05E4\u05E8\u05D9\u05D8' : 'Menu', isLink: false },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] md:hidden"
      style={{ height: '56px' }}
      aria-label={currentLanguage === 'he' ? '\u05E0\u05D9\u05D5\u05D5\u05D8 \u05EA\u05D7\u05EA\u05D5\u05DF' : 'Bottom navigation'}
      role="navigation"
    >
      <div className="flex items-center justify-around h-full max-w-lg mx-auto px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = item.isLink ? isActive(item.path) : false;

          if (item.isLink) {
            return (
              <Link key={item.path} href={item.path}>
                <button
                  className={`flex flex-col items-center justify-center w-14 h-full gap-0.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded ${active ? 'text-orange-500' : 'text-gray-500 hover:text-gray-700'}`}
                  aria-label={item.label}
                  aria-current={active ? 'page' : undefined}
                >
                  <div className="relative">
                    <Icon size={22} strokeWidth={active ? 2.5 : 1.5} />
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="absolute -top-1.5 -right-2 bg-orange-500 text-white text-[9px] font-bold min-w-[16px] h-4 flex items-center justify-center rounded-full px-1">{item.badge > 99 ? '99+' : item.badge}</span>
                    )}
                  </div>
                  <span className={`text-[10px] leading-tight ${active ? 'font-semibold' : 'font-normal'}`}>{item.label}</span>
                </button>
              </Link>
            );
          }

          // Cart button (opens cart drawer) and Menu (scrolls to top for now)
          return (
            <button
              key={item.path}
              onClick={() => {
                if (item.path === '#cart') { setIsCartOpen(true); }
                // Menu could open a drawer - for now just scroll to top where header is
                if (item.path === '#menu') { window.scrollTo({ top: 0, behavior: 'smooth' }); }
              }}
              className={`flex flex-col items-center justify-center w-14 h-full gap-0.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded text-gray-500 hover:text-gray-700`}
              aria-label={item.label}
            >
              <div className="relative">
                <Icon size={22} strokeWidth={1.5} />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-orange-500 text-white text-[9px] font-bold min-w-[16px] h-4 flex items-center justify-center rounded-full px-1">{item.badge > 99 ? '99+' : item.badge}</span>
                )}
              </div>
              <span className="text-[10px] leading-tight font-normal">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
