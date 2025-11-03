import React, { createContext, useContext, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../hooks/useAuth';

export interface CartItem {
  id: string;
  productId: string;
  variantId: string;
  name: string;
  nameEnglish: string;
  image: string;
  price: number;
  quantity: number;
  variant?: {
    format: string;
    binding: string;
    size: string;
  };
}

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  subtotalPrice: number;
  discount: number;
  isSubscriber: boolean;
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

const CART_STORAGE_KEY_BASE = 'breslov-cart';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();
  
  // Generate user-specific cart key or use guest key
  const cartStorageKey = isAuthenticated && user?.id ? `${CART_STORAGE_KEY_BASE}-${user.id}` : `${CART_STORAGE_KEY_BASE}-guest`;

  // Fetch user subscription status for authenticated users only
  const { data: userSubscription } = useQuery({
    queryKey: ['/api/user/subscription'],
    retry: false,
    refetchOnWindowFocus: false,
    enabled: isAuthenticated,
  });

  const isSubscriber = (userSubscription as any)?.user?.isSubscriber || false;

  // Load cart from localStorage when cartStorageKey changes (user login/logout)
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(cartStorageKey);
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setItems(parsedCart);
      } else {
        // No cart found for this user, start with empty cart
        setItems([]);
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      setItems([]);
    }
  }, [cartStorageKey]); // Re-load cart when storage key changes (user changes)

  // Save cart to localStorage whenever items change
  useEffect(() => {
    try {
      localStorage.setItem(cartStorageKey, JSON.stringify(items));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [items, cartStorageKey]);

  const addItem = (newItem: Omit<CartItem, 'id'>) => {
    setItems(currentItems => {
      // Check if item with same product and variant already exists
      const existingItemIndex = currentItems.findIndex(
        item => item.productId === newItem.productId && item.variantId === newItem.variantId
      );

      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        const updatedItems = [...currentItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + newItem.quantity
        };
        return updatedItems;
      } else {
        // New item, add to cart
        const itemWithId: CartItem = {
          ...newItem,
          id: `${newItem.productId}-${newItem.variantId}-${Date.now()}`
        };
        return [...currentItems, itemWithId];
      }
    });
  };

  const removeItem = (itemId: string) => {
    setItems(currentItems => currentItems.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }

    setItems(currentItems =>
      currentItems.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Apply 5% discount for subscribers
  const discount = isSubscriber ? subtotalPrice * 0.05 : 0;
  const totalPrice = subtotalPrice - discount;

  const value: CartContextType = {
    items,
    totalItems,
    totalPrice,
    subtotalPrice,
    discount,
    isSubscriber,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isCartOpen,
    setIsCartOpen
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};