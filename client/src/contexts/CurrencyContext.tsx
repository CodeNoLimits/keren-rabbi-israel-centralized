import React, { createContext, useContext, useState, useEffect } from 'react';

export type CurrencyCode = 'NIS' | 'USD' | 'EUR';

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  formatPrice: (priceInNIS: number) => string;
  currencySymbol: string;
}

const EXCHANGE_RATES: Record<CurrencyCode, number> = {
  NIS: 1,
  USD: 0.27,
  EUR: 0.25,
};

const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  NIS: '₪',
  USD: '$',
  EUR: '€',
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>('NIS');

  useEffect(() => {
    const saved = localStorage.getItem('site-currency');
    if (saved && (saved === 'NIS' || saved === 'USD' || saved === 'EUR')) {
      setCurrencyState(saved as CurrencyCode);
    }
  }, []);

  const setCurrency = (newCurrency: CurrencyCode) => {
    setCurrencyState(newCurrency);
    localStorage.setItem('site-currency', newCurrency);
  };

  const formatPrice = (priceInNIS: number): string => {
    const converted = priceInNIS * EXCHANGE_RATES[currency];
    const symbol = CURRENCY_SYMBOLS[currency];
    return `${symbol}${converted.toFixed(2)}`;
  };

  const currencySymbol = CURRENCY_SYMBOLS[currency];

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, currencySymbol }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
