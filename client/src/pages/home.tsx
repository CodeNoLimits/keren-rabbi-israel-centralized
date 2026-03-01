import { useState, useEffect, useRef, useCallback, type ReactNode } from 'react';
import { Link } from 'wouter';
import { Header } from '../components/Header';
import { ProductVariantModal } from '../components/ProductVariantModal';
import { useLanguage } from '../contexts/LanguageContext';
import { useCurrency } from '../hooks/useCurrency';
import { useCart } from '../contexts/CartContext';
import { realBreslovProducts } from '../data/products';
import { getInterfaceDisplayTitle } from '../utils/bookTitleHelper';
import { convertImagePath } from '../utils/imagePathHelper';
import type { Product } from '../../../shared/schema';
import { motion, AnimatePresence } from 'framer-motion';

// Lazy section: renders children only when near viewport
function LazySection({ children, rootMargin = '200px' }: { children: ReactNode; rootMargin?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);
  return <div ref={ref}>{visible ? children : <div style={{ minHeight: '200px' }} />}</div>;
}

// Multi-language text helper
function ml(lang: string, texts: { he: string; en: string; fr: string; es?: string; ru?: string }) {
  switch (lang) {
    case 'en': return texts.en;
    case 'fr': return texts.fr;
    case 'es': return texts.es || texts.en;
    case 'ru': return texts.ru || texts.en;
    default: return texts.he;
  }
}

export default function Home() {
  const { currentLanguage, setLanguage } = useLanguage();
  const { formatPrice } = useCurrency();
  const { addItem, setIsCartOpen } = useCart();
  const isRTL = currentLanguage === 'he';

  // --- Product data for Nouveautes & Best-sellers ---
  const allProducts = Object.values(realBreslovProducts);
  // Nouveautes: last 8 products (most recently added in the data)
  const nouveautesProducts = allProducts.slice(-8);
  // Best-sellers: first 4 products (most prominent)
  const bestSellers = allProducts.slice(0, 4);

  // --- Carousel state ---
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [variantModalProduct, setVariantModalProduct] = useState<Product | null>(null);
  const autoScrollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const quickAddTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateScrollButtons = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    const tolerance = 2;
    setCanScrollLeft(el.scrollLeft > tolerance);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - tolerance);
  }, []);

  const scrollCarousel = useCallback((direction: 'left' | 'right') => {
    const el = carouselRef.current;
    if (!el) return;
    const cardWidth = el.querySelector<HTMLElement>('[data-carousel-card]')?.offsetWidth || 280;
    const scrollAmount = direction === 'left' ? -cardWidth - 16 : cardWidth + 16;
    el.scrollBy({ left: isRTL ? -scrollAmount : scrollAmount, behavior: 'smooth' });
  }, [isRTL]);

  // Auto-scroll every 5 seconds
  useEffect(() => {
    autoScrollRef.current = setInterval(() => {
      const el = carouselRef.current;
      if (!el) return;
      const atEnd = isRTL
        ? el.scrollLeft <= -(el.scrollWidth - el.clientWidth) + 2
        : el.scrollLeft >= el.scrollWidth - el.clientWidth - 2;
      if (atEnd) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollCarousel('right');
      }
    }, 5000);
    return () => { if (autoScrollRef.current) clearInterval(autoScrollRef.current); };
  }, [scrollCarousel, isRTL]);

  // Update buttons on scroll
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScrollButtons, { passive: true });
    updateScrollButtons();
    return () => el.removeEventListener('scroll', updateScrollButtons);
  }, [updateScrollButtons]);

  // Pause auto-scroll on hover
  const pauseAutoScroll = () => { if (autoScrollRef.current) clearInterval(autoScrollRef.current); };
  const resumeAutoScroll = () => {
    pauseAutoScroll();
    autoScrollRef.current = setInterval(() => {
      const el = carouselRef.current;
      if (!el) return;
      const atEnd = isRTL
        ? el.scrollLeft <= -(el.scrollWidth - el.clientWidth) + 2
        : el.scrollLeft >= el.scrollWidth - el.clientWidth - 2;
      if (atEnd) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollCarousel('right');
      }
    }, 5000);
  };

  // Quick add handler
  const handleQuickAdd = useCallback((product: Product) => {
    // Task 1.1: Always open variant selector modal on "Quick Add" to ensure user chooses size
    setVariantModalProduct(product);
  }, []);

  useEffect(() => {
    return () => { if (quickAddTimerRef.current) clearTimeout(quickAddTimerRef.current); };
  }, []);

  // Price display helper
  const getLowestPrice = (product: Product): string => {
    if (!product.variants || product.variants.length === 0) return '';
    const min = Math.min(...product.variants.map(v => v.price));
    return formatPrice(min);
  };

  return (
    <main className="rtl home page-template-default page page-id-13" style={{direction: isRTL ? 'rtl' : 'ltr', background: '#FFFFFF'}}>
      {/* TOP BAR */}
      <section className="bg-orange-500 text-white py-2">
        <div className="max-w-7xl mx-auto px-8">
          <ul className="flex gap-4 justify-center m-0 p-0 text-sm">
            <li className="flex items-center gap-2">
              <span>&#x1F69A;</span>
              <span>
                {ml(currentLanguage, {
                  he: 'משלוחים חינם החל מ- 399 ש"ח',
                  en: 'Free shipping from 399 \u20AA',
                  fr: 'Livraison gratuite \u00E0 partir de 399 \u20AA',
                  es: 'Env\u00EDo gratis desde 399 \u20AA',
                  ru: '\u0411\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u0430\u044F \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0430 \u043E\u0442 399 \u20AA'
                })}
              </span>
            </li>
          </ul>
        </div>
      </section>

      <Header currentLanguage={currentLanguage} onLanguageChange={setLanguage} />

      {/* ============================================ */}
      {/* HERO SECTION - Minimalist & Powerful         */}
      {/* Task 53: Jerusalem/Kotel Background Elements */}
      {/* ============================================ */}
      <section className="bg-white bg-[url('/images/jerusalem-skyline.svg')] bg-[length:contain] bg-bottom bg-no-repeat py-24 min-h-[60vh] flex items-center relative overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 to-white/40 z-0" />
        <div className="max-w-7xl mx-auto px-8 w-full relative z-10">
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-16 items-center ${isRTL ? 'md:grid-cols-[1fr_1.2fr]' : 'md:grid-cols-[1.2fr_1fr]'}`}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className={isRTL ? 'order-2 md:order-2' : 'order-1 md:order-1'}>
              <h1 className={`text-clamp-hero font-black mb-6 leading-tight text-slate-900 tracking-tight ${isRTL ? 'font-hebrew' : 'font-latin'}`} style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
                {ml(currentLanguage, {
                  he: '\u05D4\u05D0\u05E9 \u05E9\u05DC\u05D9',
                  en: 'My Fire',
                  fr: 'Mon Feu',
                  es: 'Mi Fuego',
                  ru: '\u041C\u043E\u0439 \u041E\u0433\u043E\u043D\u044C',
                })}
                <span className="block text-orange-500 text-[0.6em] mt-2">
                  {ml(currentLanguage, {
                    he: '\u05D4\u05E4\u05E6\u05EA \u05E1\u05E4\u05E8\u05D9 \u05D1\u05E8\u05E1\u05DC\u05D1',
                    en: 'Spreading Breslov Books',
                    fr: 'Diffusion des Livres Breslov',
                    es: 'Difusi\u00F3n de Libros Breslov',
                    ru: '\u0420\u0430\u0441\u043F\u0440\u043E\u0441\u0442\u0440\u0430\u043D\u0435\u043D\u0438\u0435 \u041A\u043D\u0438\u0433 \u0411\u0440\u0435\u0441\u043B\u043E\u0432',
                  })}
                </span>
              </h1>
              <p className={`text-clamp-base mb-10 text-slate-600 leading-relaxed max-w-xl ${isRTL ? 'font-hebrew' : 'font-serif'}`}>
                {ml(currentLanguage, {
                  he: '\u05D7\u05E0\u05D5\u05EA \u05D4\u05E1\u05E4\u05E8\u05D9\u05DD \u05D4\u05DE\u05D5\u05D1\u05D9\u05DC\u05D4 \u05E9\u05DC \u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1. \u05DE\u05E7\u05D5\u05DD \u05E9\u05D1\u05D5 \u05DB\u05DC \u05E0\u05E9\u05DE\u05D4 \u05DE\u05D5\u05E6\u05D0\u05EA \u05D0\u05EA \u05D4\u05D3\u05E8\u05DA \u05E9\u05DC\u05D4.',
                  en: 'The leading bookstore of Rabbi Nachman of Breslov. A place where every soul finds its way.',
                  fr: 'La librairie de r\u00E9f\u00E9rence de Rabbi Nachman de Breslov. Un lieu o\u00F9 chaque \u00E2me trouve son chemin.',
                  es: 'La librer\u00EDa l\u00EDder de Rab\u00ED Nachman de Breslov. Un lugar donde cada alma encuentra su camino.',
                  ru: '\u0412\u0435\u0434\u0443\u0449\u0438\u0439 \u043A\u043D\u0438\u0436\u043D\u044B\u0439 \u043C\u0430\u0433\u0430\u0437\u0438\u043D \u0420\u0430\u0431\u0431\u0438 \u041D\u0430\u0445\u043C\u0430\u043D\u0430. \u041C\u0435\u0441\u0442\u043E, \u0433\u0434\u0435 \u043A\u0430\u0436\u0434\u0430\u044F \u0434\u0443\u0448\u0430 \u043D\u0430\u0445\u043E\u0434\u0438\u0442 \u0441\u0432\u043E\u0439 \u043F\u0443\u0442\u044C.',
                })}
              </p>
              <div className="flex gap-6 flex-wrap items-center">
                <a href="/store" className="no-underline">
                  <button data-testid="button-enter-store" className="bg-orange-500 hover:bg-orange-600 text-white border-0 py-4 px-12 rounded-xl cursor-pointer text-lg font-bold shadow-[0_6px_20px_rgba(255,107,0,0.3)] transition-all hover:-translate-y-1">
                    {ml(currentLanguage, {
                      he: '\u05DB\u05E0\u05E1 \u05DC\u05D7\u05E0\u05D5\u05EA',
                      en: 'Enter Store',
                      fr: 'Entrer dans la Boutique',
                      es: 'Entrar a la Tienda',
                      ru: '\u0412\u043E\u0439\u0442\u0438 \u0432 \u041C\u0430\u0433\u0430\u0437\u0438\u043D',
                    })}
                  </button>
                </a>
                <a href="/join" className="no-underline">
                  <button data-testid="button-discover-activities" className="bg-transparent text-orange-500 border-2 border-orange-500 hover:bg-orange-50 py-4 px-12 rounded-xl cursor-pointer text-lg font-bold transition-all">
                    {ml(currentLanguage, {
                      he: '\u05EA\u05E8\u05D5\u05DE\u05D4 \u05DC\u05E7\u05E8\u05DF',
                      en: 'Donate to the Fund',
                      fr: 'Don \u00E0 la Fondation',
                      es: 'Donar a la Fundaci\u00F3n',
                      ru: '\u041F\u043E\u0436\u0435\u0440\u0442\u0432\u043E\u0432\u0430\u0442\u044C \u0432 \u0424\u043E\u043D\u0434',
                    })}
                  </button>
                </a>
              </div>
            </motion.div>

            {/* Hero image - clean book composition */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className={`flex justify-center items-center relative min-h-[300px] md:min-h-[400px] ${isRTL ? 'order-1 md:order-1' : 'order-2 md:order-2'}`}>
              <img
                src="/images/book-1.webp"
                alt={ml(currentLanguage, {he: 'ספרי רבי נחמן', en: 'Rabbi Nachman Books', fr: 'Livres de Rabbi Nachman', es: 'Libros de Rabí Nachman', ru: 'Книги Рабби Нахмана'})}
                width="380"
                height="380"
                fetchPriority="high"
                decoding="async"
                className="max-w-[380px] w-full h-auto rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.15)]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* NOUVEAUTES CAROUSEL                          */}
      {/* ============================================ */}
      <section className="bg-slate-50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative">
          {/* Section title */}
          <div className="text-center mb-10">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className={`text-3xl md:text-5xl font-bold text-slate-800 mb-2 ${isRTL ? 'font-hebrew' : 'font-serif'}`}>
              {ml(currentLanguage, {
                he: '\u05D7\u05D3\u05E9 \u05D1\u05D7\u05E0\u05D5\u05EA',
                en: 'New Arrivals',
                fr: 'Nouveaut\u00E9s',
                es: 'Novedades',
                ru: '\u041D\u043E\u0432\u0438\u043D\u043A\u0438',
              })}
            </motion.h2>
            <motion.div initial={{ width: 0 }} whileInView={{ width: 60 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="h-1 bg-orange-500 mx-auto mt-4 rounded-full" />
          </div>

          {/* Carousel container */}
          <div className="relative group/carousel w-full"
            onMouseEnter={pauseAutoScroll}
            onMouseLeave={resumeAutoScroll}
          >
            {/* Prev arrow */}
            <button
              onClick={() => scrollCarousel('left')}
              disabled={!canScrollLeft}
              aria-label="Previous"
              className={`absolute top-[45%] -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-2xl text-slate-700 transition-all ${canScrollLeft ? 'opacity-100 cursor-pointer hover:bg-slate-50' : 'opacity-0 pointer-events-none'} ${isRTL ? '-right-6' : '-left-6'} hidden md:flex`}
            >
              {isRTL ? '\u203A' : '\u2039'}
            </button>

            {/* Next arrow */}
            <button
              onClick={() => scrollCarousel('right')}
              disabled={!canScrollRight}
              aria-label="Next"
              className={`absolute top-[45%] -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-2xl text-slate-700 transition-all ${canScrollRight ? 'opacity-100 cursor-pointer hover:bg-slate-50' : 'opacity-0 pointer-events-none'} ${isRTL ? '-left-6' : '-right-6'} hidden md:flex`}
            >
              {isRTL ? '\u2039' : '\u203A'}
            </button>

            {/* Scrollable row */}
            <div
              ref={carouselRef}
              className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-6 pt-2 hide-scrollbar ps-2 pe-2"
            >
              {nouveautesProducts.map((product, idx) => {
                const imgSrc = product.images?.[0] ? convertImagePath(product.images[0]) : '';
                const title = getInterfaceDisplayTitle(product as Product, currentLanguage);
                const price = getLowestPrice(product as Product);
                const author = product.author || (isRTL ? 'רבי נחמן מברסלב' : 'Rabbi Nachman of Breslov');
                const lang = product.language || '';
                const descriptiveAlt = [title, author, lang].filter(Boolean).join(' - ');
                return (
                  <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    key={product.id}
                    data-carousel-card
                    className="flex-none w-[220px] sm:w-[260px] snap-start bg-white rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col group relative"
                  >
                    <Link href={`/product/${product.id}`} className="no-underline text-inherit flex-1 flex flex-col">
                      <div className="w-full h-[220px] sm:h-[260px] overflow-hidden bg-slate-50 bg-[url('/images/jerusalem-skyline.svg')] bg-cover bg-bottom flex items-center justify-center relative select-none">
                        {imgSrc ? (
                          <img
                            loading="lazy"
                            decoding="async"
                            src={imgSrc}
                            alt={descriptiveAlt}
                            className="w-full h-full object-cover mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                            onError={(e) => { e.currentTarget.outerHTML = `<div class="w-full h-full flex items-center justify-center text-5xl bg-slate-100 text-slate-300">📖</div>`; }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-5xl relative z-10">&#128214;</div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                      </div>
                      <div className="p-4 flex flex-col flex-1">
                        <h3 className="text-[15px] sm:text-[16px] font-semibold text-slate-800 mb-1 leading-snug line-clamp-2">
                          {title}
                        </h3>
                        {price && (
                          <p className="text-[14px] sm:text-[15px] font-bold text-orange-600 mt-2">
                            {ml(currentLanguage, { he: '\u05D4\u05D7\u05DC \u05DE-', en: 'From ', fr: '\u00C0 partir de ', es: 'Desde ', ru: '\u041E\u0442 ' })}{price}
                          </p>
                        )}
                      </div>
                    </Link>
                    {/* Quick Add button */}
                    {product.variants && product.variants.length > 0 && (
                      <div className="px-4 pb-4 mt-auto">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleQuickAdd(product as Product);
                          }}
                          className="w-full bg-orange-100 hover:bg-orange-500 text-orange-600 hover:text-white border-0 py-2.5 rounded-lg cursor-pointer text-sm font-bold transition-all duration-200 active:scale-95"
                        >
                          {ml(currentLanguage, {
                            he: '\u05D4\u05D5\u05E1\u05E3 \u05DE\u05D4\u05D9\u05E8',
                            en: 'Quick Add',
                            fr: 'Ajout rapide',
                            es: 'A\u00F1adir r\u00E1pido',
                            ru: '\u0411\u044B\u0441\u0442\u0440\u043E \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C',
                          })}
                        </button>
                      </div>
                    )}
                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>
        <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; } .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
      </section>

      {/* ============================================ */}
      {/* BEST-SELLERS SECTION                         */}
      {/* ============================================ */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section title */}
          <div className="text-center mb-12">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className={`text-3xl md:text-5xl font-bold text-slate-800 mb-2 ${isRTL ? 'font-hebrew' : 'font-serif'}`}>
              {ml(currentLanguage, {
                he: '\u05D4\u05E0\u05DE\u05DB\u05E8\u05D9\u05DD \u05D1\u05D9\u05D5\u05EA\u05E8',
                en: 'Best Sellers',
                fr: 'Meilleures Ventes',
                es: 'M\u00E1s Vendidos',
                ru: '\u0411\u0435\u0441\u0442\u0441\u0435\u043B\u043B\u0435\u0440\u044B',
              })}
            </motion.h2>
            <motion.div initial={{ width: 0 }} whileInView={{ width: 60 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="h-1 bg-orange-500 mx-auto mt-4 rounded-full" />
          </div>

          {/* Products grid: 4 columns desktop, 2 columns mobile */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {bestSellers.map((product, idx) => {
              const imgSrc = product.images?.[0] ? convertImagePath(product.images[0]) : '';
              const title = getInterfaceDisplayTitle(product as Product, currentLanguage);
              const price = getLowestPrice(product as Product);
              const bsAuthor = product.author || (isRTL ? 'רבי נחמן מברסלב' : 'Rabbi Nachman of Breslov');
              const bsLang = product.language || '';
              const bsAlt = [title, bsAuthor, bsLang].filter(Boolean).join(' - ');
              return (
                <motion.article
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  key={product.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-2 cursor-pointer flex flex-col"
                >
                  <Link href={`/product/${product.id}`} className="no-underline text-inherit flex-1 flex flex-col">
                    <div className="w-full h-[220px] md:h-[280px] overflow-hidden bg-slate-50 bg-[url('/images/jerusalem-skyline.svg')] bg-cover bg-bottom flex items-center justify-center relative">
                      {imgSrc ? (
                        <img
                          loading="lazy"
                          decoding="async"
                          src={imgSrc}
                          alt={bsAlt}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 mix-blend-multiply"
                          onError={(e) => { e.currentTarget.outerHTML = `<div class="w-full h-full flex items-center justify-center text-5xl bg-slate-100 text-slate-300">📖</div>`; }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-5xl relative z-10">&#128214;</div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                    </div>
                    <div className="p-4 md:p-6 flex flex-col flex-1">
                      <h3 className="text-base md:text-lg font-bold text-slate-800 mb-2 leading-snug">
                        {title}
                      </h3>
                      {price && (
                        <p className="text-base md:text-[17px] font-bold text-orange-600 mb-4">
                          {ml(currentLanguage, { he: '\u05D4\u05D7\u05DC \u05DE-', en: 'From ', fr: '\u00C0 partir de ', es: 'Desde ', ru: '\u041E\u0442 ' })}{price}
                        </p>
                      )}
                      <span className="inline-block text-[13px] md:text-[14px] font-semibold text-orange-500 border-b-2 border-orange-200 group-hover:border-orange-500 transition-colors self-start mb-4">
                        {ml(currentLanguage, {
                          he: '\u05E6\u05E4\u05D9\u05D9\u05D4 \u05D1\u05DE\u05D5\u05E6\u05E8',
                          en: 'View Product',
                          fr: 'Voir le produit',
                          es: 'Ver producto',
                          ru: '\u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435',
                        })}
                      </span>
                    </div>
                  </Link>
                  {/* Quick Add button - Task 1.1 */}
                  {product.variants && product.variants.length > 0 && (
                    <div className="px-4 md:px-6 pb-4 md:pb-6 mt-auto">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleQuickAdd(product as Product);
                        }}
                        className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white border-0 py-3 rounded-xl cursor-pointer text-[14px] md:text-[15px] font-bold transition-all shadow-[0_4px_12px_rgba(255,107,0,0.2)] hover:shadow-[0_6px_16px_rgba(255,107,0,0.3)] hover:-translate-y-0.5 active:translate-y-0"
                      >
                        {ml(currentLanguage, {
                          he: '\u05D4\u05D5\u05E1\u05E3 \u05DC\u05E1\u05DC',
                          en: 'Add to Cart',
                          fr: 'Ajouter au Panier',
                          es: 'A\u00F1adir al Carrito',
                          ru: '\u0412 \u043A\u043E\u0440\u0437\u0438\u043D\u0443',
                        })}
                      </button>
                    </div>
                  )}
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* LEADING BOOKS SECTION - White background, generous spacing */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-14">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className={`text-3xl md:text-5xl font-bold text-slate-800 mb-2 ${currentLanguage === 'he' ? 'font-hebrew' : 'font-serif'}`}>
              {currentLanguage === 'he' ? '\u05E1\u05E4\u05E8\u05D9 \u05E8\u05D1\u05E0\u05D5 \u05D4\u05DE\u05D5\u05D1\u05D9\u05DC\u05D9\u05DD' :
               currentLanguage === 'en' ? 'Leading Books of Our Master' :
               currentLanguage === 'fr' ? 'Livres Principaux de Notre Ma\u00EEtre' :
               currentLanguage === 'es' ? 'Libros Principales de Nuestro Maestro' :
               currentLanguage === 'ru' ? '\u0412\u0435\u0434\u0443\u0449\u0438\u0435 \u041A\u043D\u0438\u0433\u0438 \u041D\u0430\u0448\u0435\u0433\u043E \u0423\u0447\u0438\u0442\u0435\u043B\u044F' : '\u05E1\u05E4\u05E8\u05D9 \u05E8\u05D1\u05E0\u05D5 \u05D4\u05DE\u05D5\u05D1\u05D9\u05DC\u05D9\u05DD'}
            </motion.h2>
            <motion.div initial={{ width: 0 }} whileInView={{ width: 60 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="h-1 bg-orange-500 mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {[
              { title: '\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05DE\u05D5\u05D4\u05E8\u05DF', titleEn: 'Likutei Moharan', image: '/images/book-6.webp', href: '/product/likutei-moharan' },
              { title: '\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05EA\u05E4\u05D9\u05DC\u05D5\u05EA', titleEn: 'Likutei Tefilot', image: '/images/book-3.webp', href: '/product/likutei-tefilot' },
              { title: '\u05D7\u05D5\u05DE\u05E9 \u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05D4\u05DC\u05DB\u05D5\u05EA', titleEn: 'Chumash Likutei Halachos', image: '/images/book-5.webp', href: '/product/chumash-likutei-halakhot' },
              { title: '\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05D4\u05DC\u05DB\u05D5\u05EA', titleEn: 'Likutei Halachos', image: '/images/book-2.webp', href: '/product/likutei-halakhot' },
              { title: '\u05E1\u05D9\u05E4\u05D5\u05E8\u05D9 \u05DE\u05E2\u05E9\u05D9\u05D5\u05EA', titleEn: 'Tales of Ancient Times', image: '/images/book-product-3.webp', href: '/product/siporei-masiyot' },
              { title: '\u05DB\u05DC \u05D1\u05D5 \u05DC\u05D9\u05E9\u05D5\u05E2\u05D5\u05EA', titleEn: 'Complete Guide to Salvation', image: '/images/book-1.webp', href: '/product/kol-bo-leyeshuot' }
            ].map((book, index) => (
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                key={index}
                href={book.href}
                className="no-underline text-inherit block"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                  <div className="h-[200px] md:h-[240px] overflow-hidden bg-slate-50 bg-[url('/images/jerusalem-skyline.svg')] bg-cover bg-bottom flex justify-center items-center">
                    <img loading="lazy" decoding="async" src={book.image} alt={book.title} className="w-full h-full object-cover mix-blend-multiply transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-[15px] md:text-[1.1rem] font-semibold text-slate-800 m-0 leading-snug">
                      {currentLanguage === 'he' ? book.title : book.titleEn}
                    </h3>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* RABBI NATHAN QUOTE SECTION */}
      <section className="bg-orange-50 py-20 px-4 mt-8">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_2px_20px_rgba(0,0,0,0.04)]"
          >
            <h2 className="text-xl md:text-2xl font-semibold mb-3 text-slate-800">
              {currentLanguage === 'he' ? '\u05D3\u05E3 \u05D0\u05D7\u05D3 \u05DE\u05E1\u05E4\u05E8\u05D9 \u05E8\u05D1\u05E0\u05D5' :
               currentLanguage === 'en' ? 'One Page from Our Master\'s Books' :
               currentLanguage === 'fr' ? 'Une Page des Livres de Notre Ma\u00EEtre' :
               currentLanguage === 'es' ? 'Una P\u00E1gina de los Libros de Nuestro Maestro' :
               currentLanguage === 'ru' ? '\u041E\u0434\u043D\u0430 \u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430 \u0438\u0437 \u041A\u043D\u0438\u0433 \u041D\u0430\u0448\u0435\u0433\u043E \u0423\u0447\u0438\u0442\u0435\u043B\u044F' : '\u05D3\u05E3 \u05D0\u05D7\u05D3 \u05DE\u05E1\u05E4\u05E8\u05D9 \u05E8\u05D1\u05E0\u05D5'}
            </h2>
            <h3 className={`text-2xl md:text-4xl font-bold mb-6 text-orange-500 leading-tight ${isRTL ? 'font-hebrew' : ''}`}>
              {currentLanguage === 'he' ? '\u05D9\u05D4\u05D9\u05D4 \u05EA\u05D9\u05E7\u05D5\u05DF \u05E2\u05DC \u05D4\u05DB\u05DC!' :
               currentLanguage === 'en' ? 'There will be rectification for everything!' :
               currentLanguage === 'fr' ? 'Il y aura une rectification pour tout!' :
               currentLanguage === 'es' ? '\u00A1Habr\u00E1 rectificaci\u00F3n para todo!' :
               currentLanguage === 'ru' ? '\u0411\u0443\u0434\u0435\u0442 \u0438\u0441\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0434\u043B\u044F \u0432\u0441\u0435\u0433\u043E!' : '\u05D9\u05D4\u05D9\u05D4 \u05EA\u05D9\u05E7\u05D5\u05DF \u05E2\u05DC \u05D4\u05DB\u05DC!'}
            </h3>
            <p className="text-base md:text-lg text-slate-500 italic m-0">
              {currentLanguage === 'he' ? '\u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1' :
               currentLanguage === 'en' ? 'Rabbi Nathan of Breslov' :
               currentLanguage === 'fr' ? 'Rabbi Nathan de Breslov' :
               currentLanguage === 'es' ? 'Rabino Nathan de Breslov' :
               currentLanguage === 'ru' ? '\u0420\u0430\u0431\u0431\u0438 \u041D\u0430\u0442\u0430\u043D \u0438\u0437 \u0411\u0440\u0435\u0441\u043B\u043E\u0432' : '\u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="bg-white py-20 px-4 border-b border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '\uD83D\uDE9A', titleHe: '\u05DE\u05E9\u05DC\u05D5\u05D7 \u05DE\u05D4\u05D9\u05E8 \u05E2\u05D3 \u05D4\u05D1\u05D9\u05EA \u05D7\u05D9\u05E0\u05DD', titleEn: 'Fast Free Home Delivery', titleFr: 'Livraison Rapide Gratuite \u00E0 Domicile', titleEs: 'Entrega R\u00E1pida Gratuita a Domicilio', titleRu: '\u0411\u044B\u0441\u0442\u0440\u0430\u044F \u0411\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u0430\u044F \u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430 \u043D\u0430 \u0414\u043E\u043C', descHe: '\u05D1\u05E8\u05DB\u05D9\u05E9\u05D4 \u05DE\u05E2\u05DC 299 \u20AA \u05DE\u05D4\u05D7\u05E0\u05D5\u05EA', descEn: 'On purchases over 299 \u20AA from the store', descFr: 'Sur les achats de plus de 299 \u20AA du magasin', descEs: 'En compras mayores a 299 \u20AA de la tienda', descRu: '\u041F\u0440\u0438 \u043F\u043E\u043A\u0443\u043F\u043A\u0430\u0445 \u0441\u0432\u044B\u0448\u0435 299 \u20AA \u0438\u0437 \u043C\u0430\u0433\u0430\u0437\u0438\u043D\u0430' },
              { icon: '\uD83D\uDD12', titleHe: '\u05E8\u05DB\u05D9\u05E9\u05D4 \u05DE\u05D0\u05D5\u05D1\u05D8\u05D7\u05EA', titleEn: 'Secure Purchase', titleFr: 'Achat S\u00E9curis\u00E9', titleEs: 'Compra Segura', titleRu: '\u0411\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u0430\u044F \u041F\u043E\u043A\u0443\u043F\u043A\u0430', descHe: '\u05D1\u05D0\u05DE\u05E6\u05E2\u05D5\u05EA \u05EA\u05E2\u05D5\u05D3\u05EA SSL \u05D5\u05D1\u05EA\u05E7\u05E0\u05D9\u05DD \u05D4\u05DE\u05D7\u05DE\u05D9\u05E8\u05D9\u05DD \u05D1\u05D9\u05D5\u05EA\u05E8', descEn: 'Using SSL certificate and the most stringent standards', descFr: 'En utilisant un certificat SSL et les normes les plus strictes', descEs: 'Utilizando certificado SSL y los est\u00E1ndares m\u00E1s estrictos', descRu: '\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435 SSL-\u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u0430 \u0438 \u0441\u0430\u043C\u044B\u0445 \u0441\u0442\u0440\u043E\u0433\u0438\u0445 \u0441\u0442\u0430\u043D\u0434\u0430\u0440\u0442\u043E\u0432' },
              { icon: '\uD83D\uDCDA', titleHe: '\u05D7\u05E0\u05D5\u05EA \u05D4\u05E1\u05E4\u05E8\u05D9\u05DD \u05D4\u05D2\u05D3\u05D5\u05DC\u05D4 \u05D1\u05D9\u05D5\u05EA\u05E8 \u05DC\u05E1\u05E4\u05E8\u05D9 \u05E8\u05D1\u05E0\u05D5 \u05D0\u05D5\u05E0\u05DC\u05D9\u05D9\u05DF', titleEn: 'Largest Online Bookstore for Our Master\'s Books', titleFr: 'Plus Grande Librairie en Ligne', titleEs: 'Librer\u00EDa en L\u00EDnea M\u00E1s Grande', titleRu: '\u041A\u0440\u0443\u043F\u043D\u0435\u0439\u0448\u0438\u0439 \u0418\u043D\u0442\u0435\u0440\u043D\u0435\u0442-\u041A\u043D\u0438\u0436\u043D\u044B\u0439 \u041C\u0430\u0433\u0430\u0437\u0438\u043D', descHe: '\u05DE\u05E9\u05DC\u05D5\u05D7\u05D9\u05DD \u05DC\u05DB\u05DC \u05D4\u05D0\u05E8\u05E5', descEn: 'Shipping throughout the country', descFr: 'Exp\u00E9dition dans tout le pays', descEs: 'Env\u00EDo por todo el pa\u00EDs', descRu: '\u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430 \u043F\u043E \u0432\u0441\u0435\u0439 \u0441\u0442\u0440\u0430\u043D\u0435' },
              { icon: '\uD83C\uDFA7', titleHe: '\u05E9\u05D9\u05E8\u05D5\u05EA \u05DC\u05E7\u05D5\u05D7\u05D5\u05EA \u05DE\u05E2\u05D5\u05D4 \u05D5\u05D6\u05DE\u05D9\u05DF \u05EA\u05DE\u05D9\u05D3 \u05DC\u05E9\u05D9\u05E8\u05D5\u05EA\u05DB\u05DD', titleEn: 'Excellent Customer Service Always Available', titleFr: 'Excellent Service Client Toujours Disponible', titleEs: 'Excelente Servicio al Cliente Siempre Disponible', titleRu: '\u041E\u0442\u043B\u0438\u0447\u043D\u043E\u0435 \u041E\u0431\u0441\u043B\u0443\u0436\u0438\u0432\u0430\u043D\u0438\u0435 \u041A\u043B\u0438\u0435\u043D\u0442\u043E\u0432 \u0412\u0441\u0435\u0433\u0434\u0430 \u0414\u043E\u0441\u0442\u0443\u043F\u043D\u043E', descHe: '\u05E2\u05D3 12 \u05EA\u05E9\u05DC\u05D5\u05DE\u05D9\u05DD \u05DC\u05DC\u05D0 \u05E8\u05D9\u05D1\u05D9\u05EA', descEn: 'Up to 12 payments without interest', descFr: 'Jusqu\'\u00E0 12 paiements sans int\u00E9r\u00EAt', descEs: 'Hasta 12 pagos sin inter\u00E9s', descRu: '\u0414\u043E 12 \u043F\u043B\u0430\u0442\u0435\u0436\u0435\u0439 \u0431\u0435\u0437 \u043F\u0440\u043E\u0446\u0435\u043D\u0442\u043E\u0432' },
            ].map((service, index) => (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                key={index}
                className="bg-white p-8 rounded-2xl shadow-[0_1px_8px_rgba(0,0,0,0.05)] text-center transition-shadow duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-base md:text-[1.05rem] font-semibold text-slate-800 mb-3 leading-snug">
                  {currentLanguage === 'he' ? service.titleHe : currentLanguage === 'en' ? service.titleEn : currentLanguage === 'fr' ? service.titleFr : currentLanguage === 'es' ? service.titleEs : currentLanguage === 'ru' ? service.titleRu : service.titleHe}
                </h3>
                <p className="text-slate-500 text-[0.88rem] leading-relaxed">
                  {currentLanguage === 'he' ? service.descHe : currentLanguage === 'en' ? service.descEn : currentLanguage === 'fr' ? service.descFr : currentLanguage === 'es' ? service.descEs : currentLanguage === 'ru' ? service.descRu : service.descHe}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <LazySection>
      <section className="bg-slate-50 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className={`text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-2 ${isRTL ? 'font-hebrew' : 'font-serif'}`}>
              {ml(currentLanguage, {
                he: 'מה אומרים הלקוחות שלנו',
                en: 'What Our Customers Say',
                fr: 'Ce que disent nos clients',
                es: 'Lo que dicen nuestros clientes',
                ru: 'Что говорят наши клиенты',
              })}
            </motion.h2>
            <motion.div initial={{ width: 0 }} whileInView={{ width: 60 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="h-1 bg-orange-500 mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                nameHe: 'יעקב כ.', nameEn: 'Yaakov K.', nameFr: 'Yaakov K.', nameEs: 'Yaakov K.', nameRu: 'Яаков К.',
                textHe: 'שירות מעולה ומשלוח מהיר! הספרים הגיעו באריזה מושלמת. ממליץ בחום על החנות.',
                textEn: 'Excellent service and fast shipping! The books arrived in perfect packaging. Highly recommend this store.',
                textFr: 'Service excellent et livraison rapide ! Les livres sont arrivés dans un emballage parfait.',
                textEs: 'Excelente servicio y envío rápido. Los libros llegaron en un empaque perfecto.',
                textRu: 'Отличный сервис и быстрая доставка! Книги пришли в идеальной упаковке.',
                stars: 5,
              },
              {
                nameHe: 'שרה ל.', nameEn: 'Sarah L.', nameFr: 'Sarah L.', nameEs: 'Sarah L.', nameRu: 'Сара Л.',
                textHe: 'מבחר ענק של ספרי ברסלב! מצאתי כאן ספרים שלא מצאתי בשום מקום אחר. תודה רבה!',
                textEn: 'Huge selection of Breslov books! I found books here that I couldn\'t find anywhere else. Thank you!',
                textFr: 'Énorme sélection de livres Breslov ! J\'ai trouvé des livres ici que je n\'ai trouvés nulle part ailleurs.',
                textEs: '¡Gran selección de libros Breslov! Encontré libros aquí que no encontré en ningún otro lugar.',
                textRu: 'Огромный выбор книг Бреслова! Нашла здесь книги, которые не могла найти нигде.',
                stars: 5,
              },
              {
                nameHe: 'משה ד.', nameEn: 'Moshe D.', nameFr: 'Moshe D.', nameEs: 'Moshe D.', nameRu: 'Моше Д.',
                textHe: 'קניתי סט שלם של ליקוטי מוהר"ן. איכות הדפוס והכריכה מדהימה. חנות אמינה ומקצועית.',
                textEn: 'I bought a complete set of Likutei Moharan. The print quality and binding are amazing. Reliable and professional store.',
                textFr: 'J\'ai acheté un ensemble complet de Likutei Moharan. La qualité d\'impression est incroyable.',
                textEs: 'Compré un set completo de Likutei Moharan. La calidad de impresión es increíble.',
                textRu: 'Купил полный набор Ликутей Моаран. Качество печати и переплёта потрясающее.',
                stars: 5,
              },
            ].map((review, index) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                key={index}
                className="bg-white p-8 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
              >
                {/* Stars */}
                <div className="text-orange-500 text-lg tracking-widest mb-3">
                  {'★'.repeat(review.stars)}{'☆'.repeat(5 - review.stars)}
                </div>
                {/* Review text */}
                <p className="text-slate-600 text-[0.95rem] leading-relaxed mb-4 italic">
                  &ldquo;{currentLanguage === 'he' ? review.textHe : currentLanguage === 'en' ? review.textEn : currentLanguage === 'fr' ? review.textFr : currentLanguage === 'es' ? review.textEs : currentLanguage === 'ru' ? review.textRu : review.textHe}&rdquo;
                </p>
                {/* Reviewer name */}
                <p className="text-slate-800 font-semibold text-[0.9rem]">
                  &mdash; {currentLanguage === 'he' ? review.nameHe : currentLanguage === 'en' ? review.nameEn : currentLanguage === 'fr' ? review.nameFr : currentLanguage === 'es' ? review.nameEs : currentLanguage === 'ru' ? review.nameRu : review.nameHe}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      </LazySection>

      {/* CATEGORIES SECTION */}
      <LazySection>
      <section className="bg-slate-100 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-3xl md:text-5xl font-bold text-slate-800 mb-2">
              {ml(currentLanguage, { he: '\u05D4\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D5\u05EA \u05D1\u05D7\u05E0\u05D5\u05EA', en: 'Store Categories', fr: 'Cat\u00E9gories du Magasin', es: 'Categor\u00EDas de la Tienda', ru: '\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438 \u041C\u0430\u0433\u0430\u0437\u0438\u043D\u0430' })}
            </motion.h2>
            <motion.div initial={{ width: 0 }} whileInView={{ width: 60 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="h-1 bg-orange-500 mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {[
              { he: '\u05DB\u05DC \u05D7\u05D9\u05D1\u05D5\u05E8\u05D9 \u05E8\u05D1\u05E0\u05D5 \u05D4\u05E7\u05D3\u05D5\u05E9', en: 'All Holy Compositions of Our Master', fr: 'Toutes les Compositions Saintes de Notre Ma\u00EEtre', es: 'Todas las Composiciones Sagradas de Nuestro Maestro', ru: '\u0412\u0441\u0435 \u0421\u0432\u044F\u0442\u044B\u0435 \u0421\u043E\u0447\u0438\u043D\u0435\u043D\u0438\u044F \u041D\u0430\u0448\u0435\u0433\u043E \u0423\u0447\u0438\u0442\u0435\u043B\u044F' },
              { he: '\u05DB\u05DC \u05E1\u05E4\u05E8\u05D9 \u05E8\u05D1\u05D9 \u05D9\u05E9\u05E8\u05D0\u05DC', en: 'All Books of Rabbi Israel', fr: 'Tous les Livres de Rabbi Israel', es: 'Todos los Libros del Rabino Israel', ru: '\u0412\u0441\u0435 \u041A\u043D\u0438\u0433\u0438 \u0420\u0430\u0431\u0431\u0438 \u0418\u0437\u0440\u0430\u044D\u043B\u044F' },
            ].map((cat, index) => (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                key={index}
                className="bg-white p-10 rounded-2xl text-center shadow-[0_1px_8px_rgba(0,0,0,0.05)] border border-transparent hover:border-orange-100 transition-all duration-300"
              >
                <h3 className="text-xl md:text-2xl font-semibold mb-6 text-slate-800">
                  {ml(currentLanguage, cat)}
                </h3>
                <a href="/store" className="inline-block no-underline">
                  <button className="bg-orange-500 hover:bg-orange-600 text-white border-0 py-3 px-8 rounded-xl cursor-pointer text-base font-semibold shadow-[0_4px_14px_rgba(255,107,0,0.3)] transition-colors duration-200">
                    {ml(currentLanguage, { he: 'לחנות', en: 'Browse', fr: 'Parcourir', es: 'Explorar', ru: 'Перейти' })}
                  </button>
                </a>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <a href="/store" className="inline-block no-underline">
              <button className="bg-white hover:bg-slate-50 text-orange-500 border-2 border-orange-500 py-3 px-8 rounded-xl cursor-pointer text-base font-semibold transition-colors duration-200">
                {ml(currentLanguage, { he: '\u05DC\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D5\u05EA \u05E0\u05D5\u05E1\u05E4\u05D5\u05EA \u05DC\u05D7\u05E6\u05D5 \u05DB\u05D0\u05DF', en: 'For additional categories click here', fr: 'Pour des cat\u00E9gories suppl\u00E9mentaires cliquez ici', es: 'Para categor\u00EDas adicionales haga clic aqu\u00ED', ru: '\u0414\u043B\u044F \u0434\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0445 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0439 \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \u0437\u0434\u0435\u0441\u044C' })}
              </button>
            </a>
          </div>
        </div>
      </section>

      </LazySection>

      {/* NEWSLETTER SECTION */}
      <LazySection>
      <section className="bg-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-800 mb-3">
            {ml(currentLanguage, { he: '\u05D4\u05E6\u05D8\u05E8\u05E4\u05D5 \u05E2\u05DB\u05E9\u05D9\u05D5 \u05DC\u05E8\u05E9\u05D9\u05DE\u05EA \u05EA\u05E4\u05D5\u05E6\u05D4', en: 'Join Our Mailing List Now', fr: 'Rejoignez Notre Liste de Diffusion Maintenant', es: '\u00DAnete a Nuestra Lista de Correo Ahora', ru: '\u041F\u0440\u0438\u0441\u043E\u0435\u0434\u0438\u043D\u044F\u0439\u0442\u0435\u0441\u044C \u043A \u041D\u0430\u0448\u0435\u043C\u0443 \u0421\u043F\u0438\u0441\u043A\u0443 \u0420\u0430\u0441\u0441\u044B\u043B\u043A\u0438 \u0421\u0435\u0439\u0447\u0430\u0441' })}
          </h2>
          <p className="text-base md:text-lg text-slate-500 mb-8">
            {ml(currentLanguage, { he: '\u05D5\u05E7\u05D1\u05DC\u05D5 10% \u05D4\u05E0\u05D7\u05E0\u05D4 \u05D1\u05E8\u05DB\u05D9\u05E9\u05D4 \u05E8\u05D0\u05E9\u05D5\u05E0\u05D4 \u05D1\u05D0\u05EA\u05E8', en: 'And get 10% discount on your first purchase on the site', fr: 'Et obtenez 10% de r\u00E9duction sur votre premier achat sur le site', es: 'Y obt\u00E9n 10% de descuento en tu primera compra en el sitio', ru: '\u0418 \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u0435 \u0441\u043A\u0438\u0434\u043A\u0443 10% \u043D\u0430 \u043F\u0435\u0440\u0432\u0443\u044E \u043F\u043E\u043A\u0443\u043F\u043A\u0443 \u043D\u0430 \u0441\u0430\u0439\u0442\u0435' })}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 mb-14">
            <input type="email" placeholder={isRTL ? '\u05D4\u05DB\u05E0\u05D9\u05E1\u05D5 \u05DB\u05EA\u05D5\u05D1\u05EA \u05D0\u05D9\u05DE\u05D9\u05D9\u05DC' : 'Enter email address'} className={`px-5 py-3.5 rounded-xl border-2 border-slate-200 text-base min-w-0 sm:min-w-[300px] outline-none focus:border-orange-500 transition-colors duration-200 ${isRTL ? 'text-right' : 'text-left'}`} />
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors shadow-[0_4px_14px_rgba(255,107,0,0.3)] duration-200 cursor-pointer border-none text-base">
              {ml(currentLanguage, { he: '\u05D4\u05E6\u05D8\u05E8\u05E4\u05D5 \u05E2\u05DB\u05E9\u05D9\u05D5', en: 'Join Now', fr: 'Rejoignez Maintenant', es: '\u00DAnete Ahora', ru: '\u041F\u0440\u0438\u0441\u043E\u0435\u0434\u0438\u043D\u044F\u0439\u0442\u0435\u0441\u044C \u0421\u0435\u0439\u0447\u0430\u0441' })}
            </button>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-slate-800 mb-3">
              {ml(currentLanguage, { he: '\u05D4\u05E6\u05D8\u05E8\u05E4\u05D5 \u05DC\u05E7\u05D1\u05D5\u05E6\u05D5\u05EA \u05D4\u05D5\u05D5\u05D0\u05D8\u05E1\u05D0\u05E4 \u05E9\u05DC\u05E0\u05D5', en: 'Join Our WhatsApp Groups', fr: 'Rejoignez Nos Groupes WhatsApp', es: '\u00DAnete a Nuestros Grupos de WhatsApp', ru: '\u041F\u0440\u0438\u0441\u043E\u0435\u0434\u0438\u043D\u044F\u0439\u0442\u0435\u0441\u044C \u043A \u041D\u0430\u0448\u0438\u043C \u0413\u0440\u0443\u043F\u043F\u0430\u043C WhatsApp' })}
            </h3>
            <p className="text-slate-500 mb-6">
              {ml(currentLanguage, { he: '\u05E7\u05D1\u05DC\u05D5 \u05E2\u05D3\u05DB\u05D5\u05E0\u05D9\u05DD \u05D9\u05D5\u05DE\u05D9\u05D9\u05DD, \u05D7\u05D5\u05D5\u05D9\u05D5\u05EA \u05DE\u05E8\u05D2\u05E9\u05D5\u05EA \u05D5\u05D7\u05D9\u05D6\u05D5\u05E7 \u05E8\u05D5\u05D7\u05E0\u05D9', en: 'Receive daily updates, exciting experiences and spiritual strengthening', fr: 'Recevez des mises \u00E0 jour quotidiennes, des exp\u00E9riences passionnantes et un renforcement spirituel', es: 'Recibe actualizaciones diarias, experiencias emocionantes y fortalecimiento espiritual', ru: '\u041F\u043E\u043B\u0443\u0447\u0430\u0439\u0442\u0435 \u0435\u0436\u0435\u0434\u043D\u0435\u0432\u043D\u044B\u0435 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F, \u0437\u0430\u0445\u0432\u0430\u0442\u044B\u0432\u0430\u044E\u0449\u0438\u0435 \u0432\u043F\u0435\u0447\u0430\u0442\u043B\u0435\u043D\u0438\u044F \u0438 \u0434\u0443\u0445\u043E\u0432\u043D\u043E\u0435 \u0443\u043A\u0440\u0435\u043F\u043B\u0435\u043D\u0438\u0435' })}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                {flag: '\uD83D\uDCF1', lang: '\u05E2\u05D1\u05E8\u05D9\u05EA', phone: '972587308000'},
                {flag: '\uD83C\uDF0D', lang: 'English', phone: '972587308001'},
                {flag: '\uD83C\uDDF7\uD83C\uDDFA', lang: '\u0420\u0443\u0441\u0441\u043A\u0438\u0439', phone: '972587308002'},
                {flag: '\uD83C\uDDEA\uD83C\uDDF8', lang: 'Espa\u00F1ol', phone: '972587308003'},
                {flag: '\uD83C\uDDEB\uD83C\uDDF7', lang: 'Fran\u00E7ais', phone: '972587308004'}
              ].map((item, index) => (
                <a key={index} href={`https://wa.me/${item.phone}`} target="_blank" rel="noopener noreferrer" className="no-underline">
                  <button className="bg-[#25D366] hover:bg-[#128C7E] text-white border-none py-2.5 px-4 rounded-lg cursor-pointer text-sm font-semibold flex items-center gap-2 transition-colors shadow-[0_2px_8px_rgba(37,211,102,0.3)]">
                    {item.flag} {item.lang}
                  </button>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      </LazySection>

      {/* JOIN / CTA SECTION */}
      <LazySection>
      <section className="bg-slate-50 py-20 px-4 border-t border-slate-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
            {ml(currentLanguage, { he: '\u05D4\u05E6\u05D8\u05E8\u05E4\u05D5 \u05E2\u05DB\u05E9\u05D9\u05D5 \u05DC\u05E4\u05E8\u05E1\u05D5\u05DD \u05D5\u05D4\u05E4\u05E6\u05EA \u05E1\u05E4\u05E8\u05D9 \u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05D1\u05E2\u05D5\u05DC\u05DD', en: 'Join Now to Promote and Spread Rabbi Nachman\'s Books Worldwide', fr: 'Rejoignez Maintenant pour Promouvoir et Diffuser les Livres de Rabbi Nachman dans le Monde', es: '\u00DAnete Ahora para Promover y Difundir los Libros del Rabino Nachman en el Mundo', ru: '\u041F\u0440\u0438\u0441\u043E\u0435\u0434\u0438\u043D\u044F\u0439\u0442\u0435\u0441\u044C \u0421\u0435\u0439\u0447\u0430\u0441 \u043A \u041F\u0440\u043E\u0434\u0432\u0438\u0436\u0435\u043D\u0438\u044E \u0438 \u0420\u0430\u0441\u043F\u0440\u043E\u0441\u0442\u0440\u0430\u043D\u0435\u043D\u0438\u044E \u041A\u043D\u0438\u0433 \u0420\u0430\u0431\u0431\u0438 \u041D\u0430\u0445\u043C\u0430\u043D\u0430 \u043F\u043E \u0412\u0441\u0435\u043C\u0443 \u041C\u0438\u0440\u0443' })}
          </h2>
          <p className="text-base md:text-lg text-slate-500 mb-10 font-light leading-relaxed">
            {ml(currentLanguage, { he: '\u05D4\u05D4\u05D6\u05D3\u05DE\u05E0\u05D5\u05EA \u05E9\u05DC\u05DB\u05DD \u05DC\u05E2\u05D6\u05D5\u05E8 \u05D5\u05DC\u05EA\u05EA \u05D9\u05D3 \u05DC\u05E4\u05E8\u05E1\u05D5\u05DD \u05E9\u05DD \u05D4\u05E6\u05D3\u05D9\u05E7 \u05D1\u05E2\u05D5\u05DC\u05DD', en: 'Your opportunity to help and lend a hand in spreading the name of the Tzaddik in the world', fr: 'Votre opportunit\u00E9 d\'aider et de donner un coup de main \u00E0 la diffusion du nom du Tzaddik dans le monde', es: 'Tu oportunidad de ayudar y dar una mano en difundir el nombre del Tzaddik en el mundo', ru: '\u0412\u0430\u0448\u0430 \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0441\u0442\u044C \u043F\u043E\u043C\u043E\u0447\u044C \u0438 \u043F\u0440\u0438\u043B\u043E\u0436\u0438\u0442\u044C \u0440\u0443\u043A\u0443 \u043A \u0440\u0430\u0441\u043F\u0440\u043E\u0441\u0442\u0440\u0430\u043D\u0435\u043D\u0438\u044E \u0438\u043C\u0435\u043D\u0438 \u0426\u0430\u0434\u0438\u043A\u0430 \u0432 \u043C\u0438\u0440\u0435' })}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/join" className="no-underline">
              <button className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white border-none py-4 px-10 rounded-xl cursor-pointer text-lg font-semibold shadow-[0_4px_14px_rgba(255,107,0,0.3)] transition-colors duration-200">
                {ml(currentLanguage, { he: '\u05D4\u05E6\u05D8\u05E8\u05E4\u05D5 \u05D0\u05DC\u05D9\u05E0\u05D5', en: 'Join Us', fr: 'Rejoignez-nous', es: '\u00DAnete a Nosotros', ru: '\u041F\u0440\u0438\u0441\u043E\u0435\u0434\u0438\u043D\u044F\u0439\u0442\u0435\u0441\u044C \u043A \u041D\u0430\u043C' })}
              </button>
            </a>
            <a href="/contact" className="no-underline">
              <button className="w-full sm:w-auto bg-white hover:bg-slate-50 text-orange-500 border-2 border-orange-500 py-4 px-10 rounded-xl cursor-pointer text-lg font-semibold transition-colors duration-200">
                {ml(currentLanguage, { he: '\u05E6\u05E8\u05D5 \u05E7\u05E9\u05E8 \u05DC\u05EA\u05E8\u05D5\u05DE\u05D4', en: 'Contact for Donation', fr: 'Contactez pour Don', es: 'Contacto para Donaci\u00F3n', ru: '\u0421\u0432\u044F\u0437\u0430\u0442\u044C\u0441\u044F \u0434\u043B\u044F \u041F\u043E\u0436\u0435\u0440\u0442\u0432\u043E\u0432\u0430\u043D\u0438\u044F' })}
              </button>
            </a>
          </div>
        </div>
      </section>

      </LazySection>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="mb-2 text-sm tracking-wide">
            {ml(currentLanguage, { he: '\u05DB\u05DC \u05D4\u05D6\u05DB\u05D9\u05D5\u05EA \u05E9\u05DE\u05D5\u05E8\u05D5\u05EA 2025 \u00A9 \u05E7\u05E8\u05DF \u05E8\u05D1\u05D9 \u05D9\u05E9\u05E8\u05D0\u05DC \u05D3\u05D1 \u05D0\u05D5\u05D3\u05E1\u05E8 \u05D6\u05E6"\u05DC', en: 'All rights reserved 2025 \u00A9 Rabbi Israel Dov Odesser Foundation', fr: 'Tous droits r\u00E9serv\u00E9s 2025 \u00A9 Fondation Rabbi Israel Dov Odesser', es: 'Todos los derechos reservados 2025 \u00A9 Fundaci\u00F3n Rabino Israel Dov Odesser', ru: '\u0412\u0441\u0435 \u043F\u0440\u0430\u0432\u0430 \u0437\u0430\u0449\u0438\u0449\u0435\u043D\u044B 2025 \u00A9 \u0424\u043E\u043D\u0434 \u0420\u0430\u0431\u0431\u0438 \u0418\u0437\u0440\u0430\u044D\u043B\u044F \u0414\u043E\u0432\u0430 \u041E\u0434\u0435\u0441\u0441\u0435\u0440\u0430' })}
          </p>
          <p className="text-sm">
            {ml(currentLanguage, { he: '\u05D4\u05D0\u05EA\u05E8 \u05E0\u05D1\u05E0\u05D4 \u05E2"\u05D9 \u05DE\u05D3\u05D9\u05D4 \u05DE\u05D0\u05E1\u05D8\u05E8', en: 'Website built by Media Master', fr: 'Site web construit par Media Master', es: 'Sitio web construido por Media Master', ru: '\u0421\u0430\u0439\u0442 \u0441\u043E\u0437\u0434\u0430\u043D Media Master' })}
          </p>
        </div>
      </footer>

      {variantModalProduct && (
        <ProductVariantModal 
          product={variantModalProduct} 
          isOpen={!!variantModalProduct} 
          onClose={() => setVariantModalProduct(null)} 
        />
      )}
    </main>
  );
}
