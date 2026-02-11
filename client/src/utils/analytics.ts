// Task 92+93+95: Analytics utility - GA4 + Facebook Pixel + custom event tracking
// Set VITE_GA4_MEASUREMENT_ID and VITE_FB_PIXEL_ID in .env to enable

const GA4_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID as string | undefined;
const FB_PIXEL_ID = import.meta.env.VITE_FB_PIXEL_ID as string | undefined;
const CLARITY_ID = import.meta.env.VITE_CLARITY_ID as string | undefined;

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    fbq?: (...args: any[]) => void;
    _fbq?: any;
    clarity?: (...args: any[]) => void;
  }
}

// Initialize GA4 if tracking ID is provided
function initGA4() {
  if (!GA4_ID) {
    console.debug('[Analytics] GA4 not configured - set VITE_GA4_MEASUREMENT_ID');
    return;
  }

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer!.push(args);
  }
  gtag('js', new Date());
  gtag('config', GA4_ID, {
    send_page_view: true,
    currency: 'ILS',
  });
  window.gtag = gtag;

  console.debug('[Analytics] GA4 initialized:', GA4_ID);
}

// Task 93: Facebook Pixel - set VITE_FB_PIXEL_ID in .env to enable
function initFBPixel() {
  if (!FB_PIXEL_ID) {
    console.debug('[Analytics] FB Pixel not configured - set VITE_FB_PIXEL_ID');
    return;
  }

  const f = window as any;
  if (f.fbq) return;

  const n: any = f.fbq = function() {
    n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
  };
  if (!f._fbq) f._fbq = n;
  n.push = n;
  n.loaded = true;
  n.version = '2.0';
  n.queue = [];

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(script);

  f.fbq('init', FB_PIXEL_ID);
  f.fbq('track', 'PageView');

  console.debug('[Analytics] FB Pixel initialized:', FB_PIXEL_ID);
}

// Task 94: Microsoft Clarity - set VITE_CLARITY_ID in .env to enable
function initClarity() {
  if (!CLARITY_ID) return;

  const w = window as any;
  w.clarity = w.clarity || function() {
    (w.clarity.q = w.clarity.q || []).push(arguments);
  };

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${CLARITY_ID}`;
  document.head.appendChild(script);

  console.debug('[Analytics] Clarity initialized:', CLARITY_ID);
}

// Initialize all analytics
export function initAnalytics() {
  initGA4();
  initFBPixel();
  initClarity();
}

// Task 92: GA4 Enhanced E-commerce Functions
export function pageView(path: string, title?: string) {
  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title || document.title,
    });
  }
  if (window.fbq) {
    window.fbq('track', 'PageView');
  }
}

export function event(action: string, params?: Record<string, any>) {
  if (window.gtag) {
    window.gtag('event', action, params);
  }
}

export function purchase(orderId: string, value: number, items: any[]) {
  if (window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: orderId,
      value: value,
      currency: 'ILS',
      items: items,
    });
  }
  if (window.fbq) {
    window.fbq('track', 'Purchase', {
      value: value,
      currency: 'ILS',
    });
  }
}

export function addToCart(item: {
  id: string;
  name: string;
  price: number;
  quantity?: number;
  category?: string;
}) {
  if (window.gtag) {
    window.gtag('event', 'add_to_cart', {
      currency: 'ILS',
      value: item.price * (item.quantity || 1),
      items: [{
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
        item_category: item.category,
      }],
    });
  }
  if (window.fbq) {
    window.fbq('track', 'AddToCart', {
      content_ids: [item.id],
      content_name: item.name,
      content_type: 'product',
      value: item.price,
      currency: 'ILS',
    });
  }
}

export function removeFromCart(item: {
  id: string;
  name: string;
  price: number;
  quantity?: number;
}) {
  if (window.gtag) {
    window.gtag('event', 'remove_from_cart', {
      currency: 'ILS',
      value: item.price * (item.quantity || 1),
      items: [{
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
      }],
    });
  }
}

export function viewItem(item: {
  id: string;
  name: string;
  price: number;
  category?: string;
}) {
  if (window.gtag) {
    window.gtag('event', 'view_item', {
      currency: 'ILS',
      value: item.price,
      items: [{
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        item_category: item.category,
      }],
    });
  }
  if (window.fbq) {
    window.fbq('track', 'ViewContent', {
      content_ids: [item.id],
      content_name: item.name,
      content_type: 'product',
      value: item.price,
      currency: 'ILS',
    });
  }
}

// Track custom event (GA4 + FB Pixel)
export function trackEvent(eventName: string, params?: Record<string, any>) {
  if (import.meta.env.DEV) {
    console.debug(`[Analytics] ${eventName}`, params);
  }

  if (window.gtag) {
    window.gtag('event', eventName, params);
  }

  // FB Pixel standard event mapping
  if (window.fbq) {
    const fbMap: Record<string, string> = {
      view_item: 'ViewContent',
      add_to_cart: 'AddToCart',
      add_to_wishlist: 'AddToWishlist',
      search: 'Search',
      purchase: 'Purchase',
    };
    if (fbMap[eventName]) {
      window.fbq('track', fbMap[eventName], params);
    }
  }
}

// Task 95: Pre-defined custom events
export const Events = {
  viewProduct: (productId: string, title: string, price?: number, category?: string) =>
    viewItem({ id: productId, name: title, price: price || 0, category }),
  addToCart: (productId: string, title: string, price: number, category?: string, quantity?: number) =>
    addToCart({ id: productId, name: title, price, category, quantity }),
  removeFromCart: (productId: string, title: string, price: number, quantity?: number) =>
    removeFromCart({ id: productId, name: title, price, quantity }),
  addToFavorites: (productId: string, title: string) =>
    trackEvent('add_to_wishlist', { item_id: productId, item_name: title }),
  search: (query: string, resultsCount: number) =>
    trackEvent('search', { search_term: query, results_count: resultsCount }),
  languageChange: (lang: string) =>
    trackEvent('language_change', { language: lang }),
  filterUse: (filterType: string, value: string) =>
    trackEvent('filter_use', { filter_type: filterType, filter_value: value }),
  shareFavorites: (count: number) =>
    trackEvent('share', { method: 'whatsapp', content_type: 'favorites', item_count: count }),
  purchase: (orderId: string, value: number, items: any[]) =>
    purchase(orderId, value, items),
};
