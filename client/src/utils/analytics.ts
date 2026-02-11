// Task 92+95: Analytics utility - GA4 + custom event tracking
// Set VITE_GA4_ID in .env to enable Google Analytics 4

const GA4_ID = import.meta.env.VITE_GA4_ID as string | undefined;

// Initialize GA4 if tracking ID is provided
export function initAnalytics() {
  if (!GA4_ID) return;
  // Load gtag.js
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
  document.head.appendChild(script);
  // Initialize dataLayer
  (window as any).dataLayer = (window as any).dataLayer || [];
  function gtag(...args: any[]) { (window as any).dataLayer.push(args); }
  gtag('js', new Date());
  gtag('config', GA4_ID, { send_page_view: true });
  (window as any).gtag = gtag;
}

// Track custom event
export function trackEvent(eventName: string, params?: Record<string, any>) {
  if (import.meta.env.DEV) {
    console.debug(`[Analytics] ${eventName}`, params);
  }
  if ((window as any).gtag) {
    (window as any).gtag('event', eventName, params);
  }
}

// Task 95: Pre-defined custom events
export const Events = {
  viewProduct: (productId: string, title: string) =>
    trackEvent('view_item', { item_id: productId, item_name: title }),
  addToCart: (productId: string, title: string, price: number) =>
    trackEvent('add_to_cart', { item_id: productId, item_name: title, value: price, currency: 'ILS' }),
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
};
