import { useState, useEffect, useRef, useCallback, type ReactNode } from 'react';
import { Link } from 'wouter';
import { Header } from '../components/Header';
import { GoldDivider } from '../components/GoldDivider';
import { rtlFont } from '../lib/utils';
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
  const isRTL = currentLanguage === 'he' || currentLanguage === 'ar';

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
      <section className="bg-slate-100 text-slate-800 py-2 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-8">
          <ul className="flex gap-4 justify-center m-0 p-0 text-sm font-medium tracking-wide">
            <li className="flex items-center gap-2">
              <span className="opacity-80">&#x1F69A;</span>
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
      {/* HERO SECTION - Sacred Luxury Overhaul        */}
      {/* ============================================ */}
      {/* ============================================ */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-slate-50">
        {/* Deep rich background gradient with subtle glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-slate-100 z-0" />
        
        {/* Subtle radial glow in the center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto px-8 w-full relative z-10 py-20">
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-16 items-center ${isRTL ? 'md:grid-cols-[1.1fr_1fr]' : 'md:grid-cols-[1.2fr_1fr]'}`}>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className={isRTL ? 'order-2 md:order-2' : 'order-1 md:order-1'}>
              
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 1 }} className="flex items-center gap-4 mb-6">
                <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#D4AF37]" />
                <span className="uppercase tracking-[0.2em] text-[#D4AF37] text-xs md:text-sm font-semibold">
                  {ml(currentLanguage, {
                    he: 'הוצאת הספרים המרכזית',
                    en: 'The Central Publishing House',
                    fr: 'La Maison d\'Édition Centrale',
                    es: 'La Editorial Central',
                    ru: 'Центральное издательство',
                  })}
                </span>
                <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#D4AF37]" />
              </motion.div>

              <h1 className={`mb-6 leading-tight text-slate-900 tracking-tight ${isRTL ? 'font-hebrew font-black' : 'font-serif font-bold'}`} style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', textShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                {ml(currentLanguage, {
                  he: 'האש שלי',
                  en: 'My Fire',
                  fr: 'Mon Feu',
                  es: 'Mi Fuego',
                  ru: 'Мой Огонь',
                })}
                <span className={`block text-transparent bg-clip-text bg-gradient-to-r from-[#E5C158] via-[#FFF3B0] to-[#E5C158] mt-2 ${isRTL ? 'font-hebrew font-bold' : 'font-serif font-medium'}`} style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', textShadow: 'none' }}>
                  {ml(currentLanguage, {
                    he: 'הפצת ספרי רבי נחמן מברסלב',
                    en: 'Spreading Rabbi Nachman\'s Books',
                    fr: 'Diffusion des Livres de Rabbi Nachman',
                    es: 'Difusión de Libros de Rabí Nachman',
                    ru: 'Распространение Книг Рабби Нахмана',
                  })}
                </span>
              </h1>
              
              <p className={`text-lg md:text-xl mb-12 text-slate-700 leading-relaxed max-w-xl font-light ${isRTL ? 'font-hebrew' : 'font-sans'}`}>
                {ml(currentLanguage, {
                  he: 'גלה את מקור התורות של רבי נחמן מברסלב, מתורגמות בדיוק המרבי ומוגשות בספרים בהוצאה מוקפדת ויוקרתית.',
                  en: 'Discover the source of Rabbi Nachman of Breslov\'s teachings, translated with the utmost precision and presented in meticulously crafted, premium editions.',
                  fr: 'Découvrez la source des enseignements de Rabbi Nachman de Breslev, traduits avec la plus haute précision et présentés dans des ouvrages d\'exception.',
                  es: 'Descubre la fuente de las enseñanzas del Rabino Nachman de Breslov, traducidas con la mayor precisión y presentadas en ediciones premium meticulosamente elaboradas.',
                  ru: 'Откройте для себя источник учений Рабби Нахмана из Бреслова, переведенных с высочайшей точностью и представленных в премиальных изданиях.',
                })}
              </p>

              <div className="flex gap-5 flex-wrap items-center">
                <a href="/store" className="no-underline group">
                  <button data-testid="button-enter-store" className="relative overflow-hidden bg-gradient-to-r from-[#D4AF37] to-[#B5912B] text-slate-900 border-0 py-4 px-10 rounded-[2px] cursor-pointer text-lg font-bold shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:-translate-y-1">
                    <span className="relative z-10 flex items-center gap-2">
                      {ml(currentLanguage, {
                        he: 'לכל הספרים',
                        en: 'Discover Our Books',
                        fr: 'Découvrir Nos Livres',
                        es: 'Descubrir Nuestros Libros',
                        ru: 'Откройте Наши Книги',
                      })}
                      {isRTL ? '←' : '→'}
                    </span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  </button>
                </a>
                
                <a href="/join" className="no-underline group">
                  <button data-testid="button-our-story" className="bg-transparent text-[#D4AF37] border border-[#D4AF37]/30 hover:bg-[#D4AF37]/10 py-4 px-10 rounded-[2px] cursor-pointer text-lg font-medium transition-all">
                    {ml(currentLanguage, {
                      he: 'הסיפור שלנו',
                      en: 'Our Story',
                      fr: 'Notre Histoire',
                      es: 'Nuestra Historia',
                      ru: 'Наша История',
                    })}
                  </button>
                </a>
              </div>
            </motion.div>

            {/* Hero image - Premium framing */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }} className={`flex justify-center items-center relative min-h-[400px] md:min-h-[500px] ${isRTL ? 'order-1 md:order-1' : 'order-2 md:order-2'}`}>
              <div className="relative z-10 w-full max-w-[380px]">
                {/* Decorative majestic frame behind image */}
                <div className="absolute inset-0 border border-[#D4AF37]/30 translate-x-4 translate-y-4 rounded-[2px] -z-10" />
                <div className="absolute inset-0 border border-[#D4AF37]/10 -translate-x-4 -translate-y-4 rounded-[2px] -z-10" />
                
                <img
                  src="/images/book-1.webp"
                  alt={ml(currentLanguage, {he: 'ספרי רבי נחמן', en: 'Rabbi Nachman Books', fr: 'Livres de Rabbi Nachman', es: 'Libros de Rabí Nachman', ru: 'Книги Рабби Нахмана'})}
                  width="380"
                  height="380"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-auto rounded-[2px] shadow-[0_30px_60px_rgba(0,0,0,0.15)] border border-slate-200"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* STORY SECTION - Rabbi Israel Ber Odesser     */}
      {/* ============================================ */}
      <section className="bg-white py-24 relative overflow-hidden border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
           <div className={`flex flex-col lg:flex-row items-center gap-16 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
             
             {/* Text Content */}
             <motion.div 
               initial={{ opacity: 0, x: isRTL ? 40 : -40 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 0.8 }}
               className="flex-1"
             >
               <h2 className={`text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 leading-tight ${rtlFont(isRTL)}`}>
                 {ml(currentLanguage, {
                   he: 'האש שלי תוקד עד ביאת המשיח',
                   en: 'My fire will burn until the coming of Messiah',
                   fr: 'Mon feu brûlera jusqu\'à la venue du Messie',
                   es: 'Mi fuego arderá hasta la venida del Mesías',
                   ru: 'Мой огонь будет гореть до прихода Машиаха'
                 })}
               </h2>
               
               <div className="h-1 w-20 bg-gradient-to-r from-[#D4AF37] to-[#B5912B] mb-8" />
               
               <p className="text-lg md:text-xl text-slate-600 mb-6 leading-relaxed font-light">
                 {ml(currentLanguage, {
                   he: 'קרן ההדפסה הוקמה על ידי סבא ישראל בער אודסר בעצמו, כדי להדפיס ולהפיץ את ספרי הקודש של רבי נחמן מברסלב בכל העולם. זוהי ההוצאה המרכזית והמדויקת ביותר.',
                   en: 'The printing fund was established by Saba Israel Ber Odesser himself, to print and distribute the holy books of Rabbi Nachman of Breslov worldwide. This is the central and most accurate publishing house.',
                   fr: 'Le fonds d\'impression a été créé par Saba Israël Ber Odesser lui-même, pour imprimer et distribuer les livres saints de Rabbi Nachman de Breslev dans le monde entier.',
                   es: 'El fondo de impresión fue establecido por el propio Saba Israel Ber Odesser, para imprimir y distribuir los libros sagrados del Rabino Nachman de Breslov.',
                   ru: 'Фонд печати был основан самим Сабой Исраэлем Бер Одессером для печати и распространения святых книг Рабби Нахмана из Бреслова по всему миру.'
                 })}
               </p>
               
               <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed font-light">
                 {ml(currentLanguage, {
                   he: 'כל רכישה באתר היא תרומה ישירה להמשך מפעל חייו - הפצת האור של רבי נחמן לכל נשמה המחפשת תיקון, שמחה ואמונה.',
                   en: 'Every purchase on the site is a direct contribution to continuing his life\'s work - spreading Rabbi Nachman\'s light to every soul seeking rectification, joy, and faith.',
                   fr: 'Chaque achat sur le site est une contribution directe à la poursuite de l\'œuvre de sa vie - diffuser la lumière de Rabbi Nachman à chaque âme qui cherche la joie et la foi.',
                   es: 'Cada compra en el sitio es una contribución directa para continuar la obra de su vida: difundir la luz del Rabino Nachman.',
                   ru: 'Каждая покупка на сайте - это прямой вклад в продолжение дела его жизни - нести свет Рабби Нахмана каждой душе.'
                 })}
               </p>

               <a href="/about" className="inline-flex items-center gap-2 text-[#B5912B] font-bold text-lg hover:text-orange-600 transition-colors group">
                 {ml(currentLanguage, {
                   he: 'קראו את המכתב המלא',
                   en: 'Read the full letter',
                   fr: 'Lire la lettre complète',
                   es: 'Lee la carta completa',
                   ru: 'Прочитать полное письмо'
                 })}
                 <span className={`transform transition-transform ${isRTL ? 'group-hover:-translate-x-2' : 'group-hover:translate-x-2'}`}>{isRTL ? '←' : '→'}</span>
               </a>
             </motion.div>

             {/* Image/Visual Content */}
             <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 0.8, delay: 0.2 }}
               className="flex-1 relative w-full"
             >
               <div className="relative aspect-[4/5] max-w-md mx-auto">
                 {/* Gold Frame effect */}
                 <div className={`absolute inset-0 bg-gradient-to-tr from-[#D4AF37] to-[#FFF3B0] rounded-sm transform translate-y-6 opacity-30 ${isRTL ? '-translate-x-6' : 'translate-x-6'}`} />
                 
                 <div className="absolute inset-0 bg-white rounded-sm overflow-hidden flex items-center justify-center border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
                    <img src="/images/histoire.webp" alt="Rabbi Israel Ber Odesser" 
                         className="w-full h-full object-cover opacity-90 transition-opacity hover:opacity-100"
                         onError={(e) => {
                           e.currentTarget.style.display = 'none';
                           e.currentTarget.nextElementSibling?.classList.remove('hidden');
                         }}
                    />
                    <div className="hidden absolute inset-0 bg-white flex-col items-center justify-center text-[#D4AF37] p-8 text-center border-2 border-[#D4AF37]/20 m-3">
                      <span className="text-6xl mb-4">🔥</span>
                      <h3 className="font-hebrew text-3xl font-bold mb-2">נ נח נחמ נחמן מאומן</h3>
                      <div className="h-px w-16 bg-[#D4AF37]/50 my-4" />
                      <p className="text-sm opacity-80 uppercase tracking-widest font-semibold text-slate-900">קרן הדפסה</p>
                    </div>
                 </div>
               </div>
             </motion.div>
             
           </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* NOUVEAUTES CAROUSEL                          */}
      {/* ============================================ */}
      <section className="bg-[#F8FAFC] py-16 md:py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative">
          {/* Section title */}
          <div className="text-center mb-10">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className={`text-3xl md:text-5xl font-bold text-slate-800 mb-2 ${rtlFont(isRTL)}`}>
              {ml(currentLanguage, {
                he: '\u05D7\u05D3\u05E9 \u05D1\u05D7\u05E0\u05D5\u05EA',
                en: 'New Arrivals',
                fr: 'Nouveaut\u00E9s',
                es: 'Novedades',
                ru: '\u041D\u043E\u0432\u0438\u043D\u043A\u0438',
              })}
            </motion.h2>
            <motion.div initial={{ width: 0 }} whileInView={{ width: 60 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="h-1 bg-gradient-to-r from-[#D4AF37] to-[#B5912B] mx-auto mt-4 rounded-full" />
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
                    className="flex-none w-[220px] sm:w-[260px] snap-start bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] border border-slate-100 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col group relative"
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
                          <p className="text-[14px] sm:text-[15px] font-bold text-[#B5912B] mt-2">
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
                          className="w-full bg-[#D4AF37]/10 hover:bg-[#D4AF37] text-[#B5912B] hover:text-white border-0 py-2.5 rounded-lg cursor-pointer text-sm font-bold transition-all duration-200 active:scale-95"
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
      <section className="dark:bg-[#0A0A0B] bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section title */}
          <div className="text-center mb-12">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className={`text-3xl md:text-5xl font-bold dark:text-white text-slate-800 mb-2 ${rtlFont(isRTL)}`}>
              {ml(currentLanguage, {
                he: '\u05D4\u05E0\u05DE\u05DB\u05E8\u05D9\u05DD \u05D1\u05D9\u05D5\u05EA\u05E8',
                en: 'Best Sellers',
                fr: 'Meilleures Ventes',
                es: 'M\u00E1s Vendidos',
                ru: '\u0411\u0435\u0441\u0442\u0441\u0435\u043B\u043B\u0435\u0440\u044B',
              })}
            </motion.h2>
            <motion.div initial={{ width: 0 }} whileInView={{ width: 60 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="h-1 bg-gradient-to-r from-[#D4AF37] to-[#B5912B] mx-auto mt-4 rounded-full" />
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
                  className="group bg-white dark:bg-[#1A1C23] rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] border dark:border-white/5 border-slate-100/50 transition-all duration-300 hover:-translate-y-2 cursor-pointer flex flex-col"
                >
                  <Link href={`/product/${product.id}`} className="no-underline text-inherit flex-1 flex flex-col">
                    <div className="w-full h-[220px] md:h-[280px] overflow-hidden bg-slate-50 dark:bg-[#0A0A0B] bg-[url('/images/jerusalem-skyline.svg')] bg-cover bg-bottom flex items-center justify-center relative">
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
                      <h3 className="text-base md:text-lg font-bold dark:text-white text-slate-800 mb-2 leading-snug">
                        {title}
                      </h3>
                      {price && (
                        <p className="text-base md:text-[17px] font-bold text-[#B5912B] mb-4">
                          {ml(currentLanguage, { he: '\u05D4\u05D7\u05DC \u05DE-', en: 'From ', fr: '\u00C0 partir de ', es: 'Desde ', ru: '\u041E\u0442 ' })}{price}
                        </p>
                      )}
                      <span className="inline-block text-[13px] md:text-[14px] font-semibold text-[#B5912B] border-b-2 border-[#D4AF37]/30 group-hover:border-[#D4AF37] transition-colors self-start mb-4">
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
                        className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B5912B] hover:from-[#B5912B] hover:to-[#9E7A1C] text-white border-0 py-3 rounded-xl cursor-pointer text-[14px] md:text-[15px] font-bold transition-all shadow-[0_4px_12px_rgba(212,175,55,0.2)] hover:shadow-[0_6px_16px_rgba(212,175,55,0.3)] hover:-translate-y-0.5 active:translate-y-0"
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

      {/* ============================================ */}
      {/* LEADING BOOKS SECTION                        */}
      {/* ============================================ */}
      <section className="dark:bg-[#0A0A0B] bg-slate-50 py-24 relative overflow-hidden border-y dark:border-white/5 border-slate-200">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center mb-16">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className={`text-3xl md:text-5xl font-bold dark:text-white text-slate-900 mb-2 ${currentLanguage === 'he' ? 'font-hebrew' : 'font-serif'}`}>
              {currentLanguage === 'he' ? '\u05E1\u05E4\u05E8\u05D9 \u05E8\u05D1\u05E0\u05D5 \u05D4\u05DE\u05D5\u05D1\u05D9\u05DC\u05D9\u05DD' :
               currentLanguage === 'en' ? 'Leading Books of Our Master' :
               currentLanguage === 'fr' ? 'Livres Principaux de Notre Ma\u00EEtre' :
               currentLanguage === 'es' ? 'Libros Principales de Nuestro Maestro' :
               currentLanguage === 'ru' ? '\u0412\u0435\u0434\u0443\u0449\u0438\u0435 \u041A\u043D\u0438\u0433\u0438 \u041D\u0430\u0448\u0435\u0433\u043E \u0423\u0447\u0438\u0442\u0435\u043B\u044F' : '\u05E1\u05E4\u05E8\u05D9 \u05E8\u05D1\u05E0\u05D5 \u05D4\u05DE\u05D5\u05D1\u05D9\u05DC\u05D9\u05DD'}
            </motion.h2>
            <motion.div initial={{ width: 0 }} whileInView={{ width: 60 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="h-1 bg-gradient-to-r from-[#D4AF37] to-[#B5912B] mx-auto mt-4 rounded-full" />
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
                <div className="dark:bg-[#111318] bg-white rounded-2xl overflow-hidden border dark:border-white/5 border-slate-200 shadow-xl transition-all duration-300 hover:shadow-[0_8px_30px_rgba(212,175,55,0.15)] hover:-translate-y-1 hover:border-[#D4AF37]/50 cursor-pointer group">
                  <div className="h-[200px] md:h-[240px] overflow-hidden dark:bg-[#0A0A0B] bg-slate-100 flex justify-center items-center relative">
                    <div className="absolute inset-0 bg-[url('/images/jerusalem-skyline.svg')] opacity-5 bg-cover bg-bottom mix-blend-screen" />
                    <img loading="lazy" decoding="async" src={book.image} alt={book.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 z-10 brightness-90 group-hover:brightness-100" />
                  </div>
                  <div className="p-4 text-center border-t dark:border-white/5 border-slate-100">
                    <h3 className="text-[15px] md:text-[1.1rem] font-semibold dark:text-white text-slate-800 m-0 leading-snug">
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
      <section className="dark:bg-[#0A0A0B] bg-white py-24 px-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="dark:bg-[#0A0A0B] bg-slate-50 rounded-2xl p-10 md:p-16 shadow-2xl relative overflow-hidden border border-[#D4AF37]/20"
          >
            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#D4AF37]/50 rounded-tl-xl m-4 opacity-50" />
            <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#D4AF37]/50 rounded-tr-xl m-4 opacity-50" />
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[#D4AF37]/50 rounded-bl-xl m-4 opacity-50" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#D4AF37]/50 rounded-br-xl m-4 opacity-50" />
            
            <h2 className="text-xl md:text-2xl font-medium mb-4 text-[#D4AF37] tracking-widest uppercase text-sm">
              {currentLanguage === 'he' ? '\u05D3\u05E3 \u05D0\u05D7\u05D3 \u05DE\u05E1\u05E4\u05E8\u05D9 \u05E8\u05D1\u05E0\u05D5' :
               currentLanguage === 'en' ? 'ONE PAGE FROM OUR MASTER\'S BOOKS' :
               currentLanguage === 'fr' ? 'UNE PAGE DES LIVRES DE NOTRE MA\u00CETRE' :
               currentLanguage === 'es' ? 'UNA P\u00C1GINA DE LOS LIBROS DE NUESTRO MAESTRO' :
               currentLanguage === 'ru' ? '\u041E\u0414\u041D\u0410 \u0421\u0422\u0420\u0410\u041D\u0418\u0426\u0410 \u0418\u0417 \u041A\u041D\u0418\u0413 \u041D\u0410\u0428\u0415\u0413\u041E \u0423\u0427\u0418\u0422\u0415\u041B\u042F' : '\u05D3\u05E3 \u05D0\u05D7\u05D3 \u05DE\u05E1\u05E4\u05E8\u05D9 \u05E8\u05D1\u05E0\u05D5'}
            </h2>
            
            <div className="flex justify-center mb-6 text-[#D4AF37] opacity-60">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
              </svg>
            </div>

            <h3 className={`text-3xl md:text-5xl lg:text-6xl font-black mb-8 dark:text-white text-slate-800 leading-tight ${rtlFont(isRTL)}`}>
              {currentLanguage === 'he' ? '\u05D9\u05D4\u05D9\u05D4 \u05EA\u05D9\u05E7\u05D5\u05DF \u05E2\u05DC \u05D4\u05DB\u05DC!' :
               currentLanguage === 'en' ? 'There will be rectification for everything!' :
               currentLanguage === 'fr' ? 'Il y aura une rectification pour tout!' :
               currentLanguage === 'es' ? '\u00A1Habr\u00E1 rectificaci\u00F3n para todo!' :
               currentLanguage === 'ru' ? '\u0411\u0443\u0434\u0435\u0442 \u0438\u0441\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0434\u043B\u044F \u0432\u0441\u0435\u0433\u043E!' : '\u05D9\u05D4\u05D9\u05D4 \u05EA\u05D9\u05E7\u05D5\u05DF \u05E2\u05DC \u05D4\u05DB\u05DC!'}
            </h3>
            <p className="text-lg md:text-xl text-slate-400 italic font-light m-0">
              &mdash; {currentLanguage === 'he' ? '\u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1' :
               currentLanguage === 'en' ? 'Rabbi Nathan of Breslov' :
               currentLanguage === 'fr' ? 'Rabbi Nathan de Breslov' :
               currentLanguage === 'es' ? 'Rabino Nathan de Breslov' :
               currentLanguage === 'ru' ? '\u0420\u0430\u0431\u0431\u0438 \u041D\u0430\u0442\u0430\u043D \u0438\u0437 \u0411\u0440\u0435\u0441\u043B\u043E\u0432' : '\u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="bg-white dark:bg-[#111318] py-20 px-4 border-b dark:border-white/5 border-slate-100">
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
                className="bg-white dark:bg-[#1A1C23] p-8 rounded-2xl shadow-[0_1px_8px_rgba(0,0,0,0.05)] text-center transition-shadow duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] border dark:border-white/5 border-transparent"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-base md:text-[1.05rem] font-semibold dark:text-white text-slate-800 mb-3 leading-snug">
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
      <section className="bg-[#F9F8F6] dark:bg-[#0A0A0B] py-24 px-4 border-y dark:border-white/5 border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className={`text-3xl md:text-4xl lg:text-5xl font-bold dark:text-white text-slate-800 mb-2 ${rtlFont(isRTL)}`}>
              {ml(currentLanguage, {
                he: 'מה אומרים הלקוחות שלנו',
                en: 'What Our Customers Say',
                fr: 'Ce que disent nos clients',
                es: 'Lo que dicen nuestros clientes',
                ru: 'Что говорят наши клиенты',
              })}
            </motion.h2>
            <motion.div initial={{ width: 0 }} whileInView={{ width: 60 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="h-1 bg-gradient-to-r from-[#D4AF37] to-[#B5912B] mx-auto mt-4 rounded-full" />
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
                className="bg-white dark:bg-[#1A1C23] border dark:border-white/5 border-transparent p-8 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
              >
                {/* Stars */}
                <div className="text-[#D4AF37] text-[1.4rem] tracking-[0.2em] mb-4">
                  {'★'.repeat(review.stars)}{'☆'.repeat(5 - review.stars)}
                </div>
                {/* Review text */}
                <p className="text-slate-600 text-[1rem] leading-relaxed mb-6 italic font-light">
                  &ldquo;{currentLanguage === 'he' ? review.textHe : currentLanguage === 'en' ? review.textEn : currentLanguage === 'fr' ? review.textFr : currentLanguage === 'es' ? review.textEs : currentLanguage === 'ru' ? review.textRu : review.textHe}&rdquo;
                </p>
                {/* Reviewer name */}
                <p className="dark:text-white text-slate-900 font-bold uppercase tracking-wider text-[0.85rem]">
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
      <section className="bg-slate-100 dark:bg-[#111318] py-20 px-4 border-b dark:border-white/5 border-transparent">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className={`text-3xl md:text-5xl font-bold dark:text-white text-slate-800 mb-2 ${rtlFont(isRTL)}`}>
              {ml(currentLanguage, { he: '\u05D4\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D5\u05EA \u05D1\u05D7\u05E0\u05D5\u05EA', en: 'Store Categories', fr: 'Cat\u00E9gories du Magasin', es: 'Categor\u00EDas de la Tienda', ru: '\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438 \u041C\u0430\u0433\u0430\u0437\u0438\u043D\u0430' })}
            </motion.h2>
            <motion.div initial={{ width: 0 }} whileInView={{ width: 60 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="h-1 bg-gradient-to-r from-[#D4AF37] to-[#B5912B] mx-auto mt-4 rounded-full" />
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
                className="bg-white dark:bg-[#1A1C23] p-10 rounded-2xl text-center shadow-[0_1px_8px_rgba(0,0,0,0.05)] border dark:border-white/5 border-transparent hover:border-orange-100 dark:hover:border-[#D4AF37]/50 transition-all duration-300"
              >
                <h3 className="text-xl md:text-2xl font-semibold mb-6 dark:text-white text-slate-800">
                  {ml(currentLanguage, cat)}
                </h3>
                <a href="/store" className="inline-block no-underline">
                  <button className="bg-white text-slate-800 border-2 border-[#D4AF37]/50 hover:border-[#D4AF37] py-3 px-8 rounded-xl cursor-pointer text-base font-semibold hover:shadow-[0_4px_14px_rgba(212,175,55,0.2)] transition-all duration-300">
                    {ml(currentLanguage, { he: 'לחנות', en: 'Browse', fr: 'Parcourir', es: 'Explorar', ru: 'Перейти' })}
                  </button>
                </a>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <a href="/store" className="inline-block no-underline">
              <button className="bg-[#111318] hover:bg-[#0A0A0B] text-white border-0 py-3 px-8 rounded-xl cursor-pointer text-base font-semibold transition-colors duration-200 shadow-md">
                {ml(currentLanguage, { he: '\u05DC\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D5\u05EA \u05E0\u05D5\u05E1\u05E4\u05D5\u05EA \u05DC\u05D7\u05E6\u05D5 \u05DB\u05D0\u05DF', en: 'For additional categories click here', fr: 'Pour des cat\u00E9gories suppl\u00E9mentaires cliquez ici', es: 'Para categor\u00EDas adicionales haga clic aqu\u00ED', ru: '\u0414\u043B\u044F \u0434\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0445 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0439 \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \u0437\u0434\u0435\u0441\u044C' })}
              </button>
            </a>
          </div>
        </div>
      </section>

      </LazySection>

      {/* ============================================ */}
      {/* BLOG / ARTICLES PREVIEW                      */}
      {/* ============================================ */}
      <LazySection>
      <section className="bg-white dark:bg-[#0A0A0B] py-24 px-4 border-b dark:border-white/5 border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className={`text-3xl md:text-5xl font-bold dark:text-white text-slate-900 mb-2 ${rtlFont(isRTL)}`}>
              {ml(currentLanguage, { he: 'מאמרים ותורות', en: 'Articles & Teachings', fr: 'Articles & Enseignements', es: 'Artículos y Enseñanzas', ru: 'Статьи и учения' })}
            </motion.h2>
            <motion.div initial={{ width: 0 }} whileInView={{ width: 60 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="h-1 bg-gradient-to-r from-[#D4AF37] to-[#B5912B] mx-auto mt-4 rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'מעלת ההתבודדות', titleEn: 'The Power of Hitbodedut', img: '/images/book-4.webp' },
              { title: 'סוד השמחה', titleEn: 'The Secret of Joy', img: '/images/book-1.webp' },
              { title: 'תיקון הכללי', titleEn: 'Tikkun HaKlali', img: '/images/book-5.webp' }
            ].map((article, i) => (
              <motion.article 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.5, delay: i * 0.1 }}
                 key={i}
                 className="group cursor-pointer"
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-slate-100 dark:bg-[#0A0A0B]">
                  <img src={article.img} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" alt={article.titleEn} onError={(e) => { e.currentTarget.outerHTML = `<div class="w-full h-full flex items-center justify-center text-5xl text-slate-700 bg-slate-900 border border-white/5">📖</div>`; }} />
                  <div className="absolute inset-0 bg-gradient-to-t dark:from-[#0A0A0B] from-white via-transparent to-transparent opacity-80" />
                </div>
                <h3 className={`text-xl font-bold dark:text-white text-slate-800 mb-3 group-hover:text-[#B5912B] transition-colors ${rtlFont(isRTL)}`}>
                  {isRTL ? article.title : article.titleEn}
                </h3>
                <p className="text-slate-500 font-light mb-4 line-clamp-2">
                  {ml(currentLanguage, { 
                    he: 'גלה את העומק והיופי בתורותיו של רבי נחמן מברסלב במאמר מרתק זה.',
                    en: 'Discover the depth and beauty of Rabbi Nachman of Breslov\'s teachings in this fascinating article.',
                    fr: 'Découvrez la profondeur et la beauté des enseignements de Rabbi Nachman dans cet article.',
                    es: 'Descubre la profundidad y belleza de las enseñanzas...',
                    ru: 'Откройте для себя глубину учений...'
                  })}
                </p>
                <a href="/blog" className="no-underline text-inherit">
                  <span className="text-[#B5912B] font-semibold text-sm tracking-wider uppercase flex items-center gap-2">
                    {ml(currentLanguage, { he: 'קרא עוד', en: 'READ MORE', fr: 'LIRE LA SUITE', es: 'LEER MÁS', ru: 'ЧИТАТЬ' })}
                    <span className={`transform transition-transform ${isRTL ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`}>
                      {isRTL ? '←' : '→'}
                    </span>
                  </span>
                </a>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
      </LazySection>

      {/* NEWSLETTER SECTION */}
      <LazySection>
      <section className="dark:bg-[#0A0A0B] bg-slate-900 py-24 px-4 relative overflow-hidden">
        {/* Subtle geometric background */}
        <div className="absolute inset-0 bg-[url('/images/jerusalem-skyline.svg')] opacity-[0.02] mix-blend-screen" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 ${rtlFont(isRTL)}`}>
            {ml(currentLanguage, { he: '\u05D4\u05E6\u05D8\u05E8\u05E4\u05D5 \u05E2\u05DB\u05E9\u05D9\u05D5 \u05DC\u05E8\u05E9\u05D9\u05DE\u05EA \u05EA\u05E4\u05D5\u05E6\u05D4', en: 'Join Our Mailing List Now', fr: 'Rejoignez Notre Liste de Diffusion Maintenant', es: '\u00DAnete a Nuestra Lista de Correo Ahora', ru: '\u041F\u0440\u0438\u0441\u043E\u0435\u0434\u0438\u043D\u044F\u0439\u0442\u0435\u0441\u044C \u043A \u041D\u0430\u0448\u0435\u043C\u0443 \u0421\u043F\u0438\u0441\u043A\u0443 \u0420\u0430\u0441\u0441\u044B\u043B\u043A\u0438 \u0421\u0435\u0439\u0447\u0430\u0441' })}
          </h2>
          <p className="text-base md:text-lg text-slate-400 mb-10 font-light">
            {ml(currentLanguage, { he: '\u05D5\u05E7\u05D1\u05DC\u05D5 10% \u05D4\u05E0\u05D7\u05E0\u05D4 \u05D1\u05E8\u05DB\u05D9\u05E9\u05D4 \u05E8\u05D0\u05E9\u05D5\u05E0\u05D4 \u05D1\u05D0\u05EA\u05E8', en: 'And get 10% discount on your first purchase on the site', fr: 'Et obtenez 10% de r\u00E9duction sur votre premier achat sur le site', es: 'Y obt\u00E9n 10% de descuento en tu primera compra en el sitio', ru: '\u0418 \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u0435 \u0441\u043A\u0438\u0434\u043A\u0443 10% \u043D\u0430 \u043F\u0435\u0440\u0432\u0443\u044E \u043F\u043E\u043A\u0443\u043F\u043A\u0443 \u043D\u0430 \u0441\u0430\u0439\u0442\u0435' })}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 mb-16">
            <input type="email" placeholder={isRTL ? '\u05D4\u05DB\u05E0\u05D9\u05E1\u05D5 \u05DB\u05EA\u05D5\u05D1\u05EA \u05D0\u05D9\u05DE\u05D9\u05D9\u05DC' : 'Enter email address'} className={`px-5 py-4 rounded-xl border border-white/10 bg-white/5 text-white text-base min-w-0 sm:min-w-[320px] outline-none focus:border-[#D4AF37] focus:bg-white/10 transition-all duration-300 ${isRTL ? 'text-right' : 'text-left'}`} />
            <button className="bg-gradient-to-r from-[#D4AF37] to-[#B5912B] hover:from-[#B5912B] hover:to-[#9E7A1C] text-white font-semibold px-8 py-4 rounded-xl transition-all shadow-[0_4px_14px_rgba(212,175,55,0.3)] hover:-translate-y-0.5 duration-200 cursor-pointer border-none text-base tracking-wide uppercase">
              {ml(currentLanguage, { he: '\u05D4\u05E6\u05D8\u05E8\u05E4\u05D5 \u05E2\u05DB\u05E9\u05D9\u05D5', en: 'Join Now', fr: 'Rejoignez Maintenant', es: '\u00DAnete Ahora', ru: '\u041F\u0440\u0438\u0441\u043E\u0435\u0434\u0438\u043D\u044F\u0439\u0442\u0435\u0441\u044C \u0421\u0435\u0439\u0447\u0430\u0441' })}
            </button>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3">
              {ml(currentLanguage, { he: '\u05D4\u05E6\u05D8\u05E8\u05E4\u05D5 \u05DC\u05E7\u05D1\u05D5\u05E6\u05D5\u05EA \u05D4\u05D5\u05D5\u05D0\u05D8\u05E1\u05D0\u05E4 \u05E9\u05DC\u05E0\u05D5', en: 'Join Our WhatsApp Groups', fr: 'Rejoignez Nos Groupes WhatsApp', es: '\u00DAnete a Nuestros Grupos de WhatsApp', ru: '\u041F\u0440\u0438\u0441\u043E\u0435\u0434\u0438\u043D\u044F\u0439\u0442\u0435\u0441\u044C \u043A \u041D\u0430\u0448\u0438\u043C \u0413\u0440\u0443\u043F\u043F\u0430\u043C WhatsApp' })}
            </h3>
            <p className="text-slate-400 mb-8 font-light">
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
      <section className="bg-slate-50 dark:bg-[#111318] py-20 px-4 border-t dark:border-white/5 border-slate-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold dark:text-white text-slate-800 mb-4">
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
              <button className="w-full sm:w-auto bg-white dark:bg-[#1A1C23] hover:bg-slate-50 dark:hover:bg-[#1A1C23]/80 text-orange-500 border-2 border-orange-500 py-4 px-10 rounded-xl cursor-pointer text-lg font-semibold transition-colors duration-200">
                {ml(currentLanguage, { he: '\u05E6\u05E8\u05D5 \u05E7\u05E9\u05E8 \u05DC\u05EA\u05E8\u05D5\u05DE\u05D4', en: 'Contact for Donation', fr: 'Contactez pour Don', es: 'Contacto para Donaci\u00F3n', ru: '\u0421\u0432\u044F\u0437\u0430\u0442\u044C\u0441\u044F \u0434\u043B\u044F \u041F\u043E\u0436\u0435\u0440\u0442\u0432\u043E\u0432\u0430\u043D\u0438\u044F' })}
              </button>
            </a>
          </div>
        </div>
      </section>

      </LazySection>

      {/* FOOTER */}
      <footer className="dark:bg-[#0A0A0B] bg-slate-900 text-slate-400 py-16 border-t dark:border-white/5 border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#D4AF37]/5 z-0" />
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          {/* Logo in footer */}
          <div className="mb-8 flex justify-center">
            <img src="/images/logo.webp" alt="Keren Rabbi Israel" className="h-16 w-auto brightness-0 invert opacity-60" />
          </div>
          <p className="mb-4 text-[1rem] tracking-widest uppercase font-semibold text-slate-400">
            {ml(currentLanguage, { he: '\u05E7\u05E8\u05DF \u05E8\u05D1\u05D9 \u05D9\u05E9\u05E8\u05D0\u05DC \u05D3\u05D1 \u05D0\u05D5\u05D3\u05E1\u05E8 \u05D6\u05E6"\u05DC', en: 'Rabbi Israel Dov Odesser Foundation', fr: 'Fondation Rabbi Israel Dov Odesser', es: 'Fundaci\u00F3n Rabino Israel Dov Odesser', ru: '\u0424\u043E\u043D\u0434 \u0420\u0430\u0431\u0431\u0438 \u0418\u0437\u0440\u0430\u044D\u043B\u044F \u0414\u043E\u0432\u0430 \u041E\u0434\u0435\u0441\u0441\u0435\u0440\u0430' })}
          </p>
          <p className="mb-2 text-[0.85rem] tracking-wide opacity-80">
            © 2025 All Rights Reserved
          </p>
          <div className="h-px w-24 bg-white/10 mx-auto my-6" />
          <p className="text-[0.75rem] font-medium tracking-widest text-[#D4AF37]/80 uppercase">
            {ml(currentLanguage, { he: '\u05D4\u05D0\u05EA\u05E8 \u05E0\u05D1\u05E0\u05D4 \u05E2"\u05D9 \u05DE\u05D3\u05D9\u05D4 \u05DE\u05D0\u05E1\u05D8\u05E8', en: 'Website engineered by Media Master', fr: 'Site con\u00E7u par Media Master', es: 'Sitio dise\u00F1ado por Media Master', ru: '\u0421\u0430\u0439\u0442 \u0441\u043E\u0437\u0434\u0430\u043D Media Master' })}
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
