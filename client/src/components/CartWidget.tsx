import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Trash2, Plus, Minus } from 'lucide-react';

export const CartWidget: React.FC = () => {
  const { items, totalItems, totalPrice, removeItem, updateQuantity, isCartOpen, setIsCartOpen } = useCart();
  const { currentLanguage } = useLanguage();

  if (!isCartOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black bg-opacity-50" 
      onClick={() => setIsCartOpen(false)}
    >
      <div 
        className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        dir={currentLanguage === 'he' ? 'rtl' : 'ltr'}
      >
        {/* Header */}
        <div className="p-4 border-b border-border bg-primary text-primary-foreground">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">
              {currentLanguage === 'he' ? 'סל קניות' : 'Shopping Cart'}
            </h2>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="text-white hover:text-gray-200"
            >
              ✕
            </button>
          </div>
          <p className="text-sm mt-1">
            {currentLanguage === 'he' 
              ? `${totalItems} פריטים • ${totalPrice.toFixed(2)} ₪`
              : `${totalItems} items • ₪${totalPrice.toFixed(2)}`
            }
          </p>
        </div>

        {/* Cart Items */}
        <div className="p-4">
          {items.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>{currentLanguage === 'he' ? 'הסל ריק' : 'Cart is empty'}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex gap-3">
                    {/* Product Image */}
                    <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image || '/placeholder-book.jpg'} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm text-gray-900 truncate">
                        {currentLanguage === 'he' ? item.name : item.nameEnglish}
                      </h4>
                      {item.variant && (
                        <p className="text-xs text-gray-600 mt-1">
                          {item.variant.format} • {item.variant.binding} • {item.variant.size}
                        </p>
                      )}
                      <p className="text-sm font-bold text-red-600 mt-1">
                        {item.price.toFixed(2)} ₪
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-sm font-medium min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-700 p-1"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with Checkout Button */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <div className="mb-4">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>{currentLanguage === 'he' ? 'סה"כ:' : 'Total:'}</span>
                <span className="text-red-600">{totalPrice.toFixed(2)} ₪</span>
              </div>
            </div>
            
            <a 
              href={`/checkout?fromCart=true`}
              className="block w-full btn-breslov-primary text-white font-bold py-3 px-4 rounded-lg text-center transition-colors"
            >
              {currentLanguage === 'he' ? 'המשך לתשלום' : 'Proceed to Checkout'}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};