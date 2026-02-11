import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCurrency } from '@/hooks/useCurrency';
import { Trash2, Plus, Minus, Truck } from 'lucide-react';

const FREE_SHIPPING_THRESHOLD = 200;

const shippingStrings: Record<string, { progress: (amount: string) => string; achieved: string; cartTitle: string; cartEmpty: string; total: string; checkout: string }> = {
  he: { progress: (amount) => `משלוח חינם ב-${amount}\u20AA נוספים!`, achieved: '\uD83C\uDF89 משלוח חינם!', cartTitle: 'סל קניות', cartEmpty: 'הסל ריק', total: 'סה"כ:', checkout: 'המשך לתשלום' },
  en: { progress: (amount) => `Free shipping in \u20AA${amount} more!`, achieved: '\uD83C\uDF89 Free shipping!', cartTitle: 'Shopping Cart', cartEmpty: 'Cart is empty', total: 'Total:', checkout: 'Proceed to Checkout' },
  fr: { progress: (amount) => `Livraison gratuite dans ${amount}\u20AA de plus!`, achieved: '\uD83C\uDF89 Livraison gratuite!', cartTitle: 'Panier', cartEmpty: 'Le panier est vide', total: 'Total:', checkout: 'Passer la commande' },
  es: { progress: (amount) => `Env\u00EDo gratis en ${amount}\u20AA m\u00E1s!`, achieved: '\uD83C\uDF89 Env\u00EDo gratis!', cartTitle: 'Carrito', cartEmpty: 'El carrito est\u00E1 vac\u00EDo', total: 'Total:', checkout: 'Finalizar compra' },
  ru: { progress: (amount) => `\u0411\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u0430\u044F \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0430 \u0447\u0435\u0440\u0435\u0437 ${amount}\u20AA!`, achieved: '\uD83C\uDF89 \u0411\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u0430\u044F \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0430!', cartTitle: '\u041A\u043E\u0440\u0437\u0438\u043D\u0430', cartEmpty: '\u041A\u043E\u0440\u0437\u0438\u043D\u0430 \u043F\u0443\u0441\u0442\u0430', total: '\u0418\u0442\u043E\u0433\u043E:', checkout: '\u041E\u0444\u043E\u0440\u043C\u0438\u0442\u044C \u0437\u0430\u043A\u0430\u0437' },
};

function getStrings(lang: string) { return shippingStrings[lang] || shippingStrings.he; }

export const CartWidget: React.FC = () => {
  const { items, totalItems, totalPrice, subtotalPrice, removeItem, updateQuantity, isCartOpen, setIsCartOpen } = useCart();
  const { currentLanguage } = useLanguage();
  const { formatPrice } = useCurrency();
  const strings = getStrings(currentLanguage);
  const [visible, setVisible] = useState(false);
  const [animating, setAnimating] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const isRtl = currentLanguage === 'he';

  // Task 97: Focus trap - trap Tab key inside the cart panel when open
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') { setIsCartOpen(false); return; }
    if (e.key !== 'Tab' || !panelRef.current) return;
    const focusableElements = panelRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusableElements.length === 0) return;
    const firstEl = focusableElements[0];
    const lastEl = focusableElements[focusableElements.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === firstEl) { e.preventDefault(); lastEl.focus(); }
    } else {
      if (document.activeElement === lastEl) { e.preventDefault(); firstEl.focus(); }
    }
  }, [setIsCartOpen]);

  useEffect(() => {
    if (isCartOpen) {
      setVisible(true);
      requestAnimationFrame(() => { requestAnimationFrame(() => { setAnimating(true); }); });
      // Focus the close button when cart opens
      setTimeout(() => {
        const closeBtn = panelRef.current?.querySelector<HTMLElement>('button');
        closeBtn?.focus();
      }, 50);
      document.addEventListener('keydown', handleKeyDown);
    } else {
      setAnimating(false);
      timeoutRef.current = setTimeout(() => { setVisible(false); }, 300);
      document.removeEventListener('keydown', handleKeyDown);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCartOpen, handleKeyDown]);

  if (!visible) return null;

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotalPrice);
  const progress = Math.min(100, (subtotalPrice / FREE_SHIPPING_THRESHOLD) * 100);
  const hasFreeShipping = subtotalPrice >= FREE_SHIPPING_THRESHOLD;

  return (
    <div className="fixed inset-0 z-50">
      <div className={`absolute inset-0 bg-black transition-opacity duration-300 ease-in-out ${animating ? 'opacity-50' : 'opacity-0'}`} onClick={() => setIsCartOpen(false)} />
      <div
        ref={panelRef}
        className={`fixed top-0 h-full w-96 max-w-[90vw] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${isRtl ? 'left-0' : 'right-0'} ${animating ? 'translate-x-0' : isRtl ? '-translate-x-full' : 'translate-x-full'}`}
        onClick={(e) => e.stopPropagation()}
        dir={isRtl ? 'rtl' : 'ltr'}
        role="dialog"
        aria-label={strings.cartTitle}
        aria-modal="true"
      >
        <div className="p-4 border-b border-border bg-primary text-primary-foreground flex-shrink-0">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">{strings.cartTitle}</h2>
            <button onClick={() => setIsCartOpen(false)} className="text-white hover:text-gray-200 transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500" aria-label={isRtl ? 'סגור סל קניות' : 'Close cart'}>
              <span className="text-xl leading-none" aria-hidden="true">&times;</span>
            </button>
          </div>
          <p className="text-sm mt-1">{isRtl ? `${totalItems} \u05E4\u05E8\u05D9\u05D8\u05D9\u05DD \u2022 ${formatPrice(totalPrice)}` : `${totalItems} items \u2022 ${formatPrice(totalPrice)}`}</p>
        </div>

        {items.length > 0 && (
          <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 flex-shrink-0">
            <div className="flex items-center gap-2 mb-2">
              <Truck size={16} className={hasFreeShipping ? 'text-green-600' : 'text-orange-500'} />
              <span className={`text-sm font-medium ${hasFreeShipping ? 'text-green-700' : 'text-gray-700'}`}>{hasFreeShipping ? strings.achieved : strings.progress(remaining.toFixed(0))}</span>
            </div>
            <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
              <div className={`h-full rounded-full transition-all duration-500 ease-out ${hasFreeShipping ? 'bg-gradient-to-r from-green-400 to-green-600' : 'bg-gradient-to-r from-orange-400 to-orange-600'}`} style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="text-center py-8 text-gray-500"><p>{strings.cartEmpty}</p></div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex gap-3">
                    <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                      <img loading="lazy" decoding="async" width="64" height="64" src={item.image || '/placeholder-book.jpg'} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm text-gray-900 truncate">{currentLanguage === 'he' ? item.name : item.nameEnglish}</h4>
                      {item.variant && (<p className="text-xs text-gray-600 mt-1">{item.variant.format} {'\u2022'} {item.variant.binding} {'\u2022'} {item.variant.size}</p>)}
                      <p className="text-sm font-bold text-red-600 mt-1">{formatPrice(item.price)}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500" aria-label={isRtl ? 'הפחת כמות' : 'Decrease quantity'}><Minus size={12} aria-hidden="true" /></button>
                          <span className="text-sm font-medium min-w-[2rem] text-center" aria-label={isRtl ? `כמות: ${item.quantity}` : `Quantity: ${item.quantity}`}>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500" aria-label={isRtl ? 'הוסף כמות' : 'Increase quantity'}><Plus size={12} aria-hidden="true" /></button>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="text-red-600 hover:text-red-700 p-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded" aria-label={isRtl ? `הסר ${item.name}` : `Remove ${item.nameEnglish || item.name}`}><Trash2 size={14} aria-hidden="true" /></button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-gray-200 p-4 bg-gray-50 flex-shrink-0">
            <div className="mb-4"><div className="flex justify-between items-center text-lg font-bold"><span>{strings.total}</span><span className="text-red-600">{formatPrice(totalPrice)}</span></div></div>
            <a href="/checkout?fromCart=true" className="block w-full btn-breslov-primary text-white font-bold py-3 px-4 rounded-lg text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500">{strings.checkout}</a>
          </div>
        )}
      </div>
    </div>
  );
};
