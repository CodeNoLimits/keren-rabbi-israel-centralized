import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'wouter';
import { Header } from '../components/Header';
import { useLanguage } from '../contexts/LanguageContext';
import { useCurrency } from '../hooks/useCurrency';
import { useCart } from '../contexts/CartContext';
import { realBreslovProducts } from '../data/realProducts';
import { getInterfaceDisplayTitle } from '../utils/bookTitleHelper';
import { convertImagePath } from '../utils/imagePathHelper';
import type { Product } from '../../../shared/schema';

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
    const defaultVariant = product.variants?.[0];
    if (!defaultVariant) return;
    addItem({
      productId: product.id,
      variantId: defaultVariant.id,
      name: product.name,
      nameEnglish: product.nameEnglish || product.name,
      image: product.images?.[0] || '',
      price: defaultVariant.price,
      quantity: 1,
      variant: {
        format: defaultVariant.format || '',
        binding: defaultVariant.binding || '',
        size: defaultVariant.size || '',
      },
    });
    setIsCartOpen(true);
    if (quickAddTimerRef.current) clearTimeout(quickAddTimerRef.current);
    quickAddTimerRef.current = setTimeout(() => setIsCartOpen(false), 2000);
  }, [addItem, setIsCartOpen]);

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
    <div className="rtl home page-template-default page page-id-13" style={{direction: isRTL ? 'rtl' : 'ltr', background: '#FFFFFF'}}>
      {/* TOP BAR */}
      <section style={{background: 'hsl(210, 85%, 45%)', color: 'white', padding: '8px 0'}}>
        <div style={{maxWidth: '1200px', margin: '0 auto', padding: '0 2rem'}}>
          <ul style={{display: 'flex', gap: '1rem', listStyle: 'none', margin: 0, padding: 0, justifyContent: 'center'}}>
            <li style={{display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem'}}>
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
      {/* HERO SECTION - Clean white, Oz VeHadar style  */}
      {/* ============================================ */}
      <section style={{
        background: '#FFFFFF',
        padding: '0',
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid #f0f0f0',
      }}>

        <div style={{maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem', width: '100%', position: 'relative', zIndex: 1}}>
          <div className="hero-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '3rem',
            alignItems: 'center',
          }}>
            {/* Text content */}
            <div style={{
              textAlign: isRTL ? 'right' : 'left',
              order: isRTL ? 1 : 0,
            }}>
              <h1 style={{
                fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
                fontWeight: '800',
                marginBottom: '1rem',
                lineHeight: '1.15',
                color: '#0F172A',
                fontFamily: isRTL ? 'var(--font-hebrew)' : 'var(--font-latin)',
                letterSpacing: '-0.01em',
              }}>
                {ml(currentLanguage, {
                  he: '\u05D4\u05D0\u05E9 \u05E9\u05DC\u05D9 - \u05D4\u05E4\u05E6\u05EA \u05E1\u05E4\u05E8\u05D9 \u05D1\u05E8\u05E1\u05DC\u05D1',
                  en: 'My Fire - Spreading Breslov Books',
                  fr: 'Mon Feu - Diffusion des Livres Breslov',
                  es: 'Mi Fuego - Difusi\u00F3n de Libros Breslov',
                  ru: '\u041C\u043E\u0439 \u041E\u0433\u043E\u043D\u044C - \u0420\u0430\u0441\u043F\u0440\u043E\u0441\u0442\u0440\u0430\u043D\u0435\u043D\u0438\u0435 \u041A\u043D\u0438\u0433 \u0411\u0440\u0435\u0441\u043B\u043E\u0432',
                })}
              </h1>
              <h2 style={{
                fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                fontWeight: '400',
                marginBottom: '1.5rem',
                color: 'hsl(210, 15%, 45%)',
                lineHeight: '1.5',
                fontFamily: isRTL ? 'var(--font-hebrew)' : 'var(--font-serif)',
              }}>
                {ml(currentLanguage, {
                  he: '\u05D7\u05E0\u05D5\u05EA \u05D4\u05E1\u05E4\u05E8\u05D9\u05DD \u05D4\u05DE\u05D5\u05D1\u05D9\u05DC\u05D4 \u05E9\u05DC \u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1',
                  en: 'The leading bookstore of Rabbi Nachman of Breslov',
                  fr: 'La librairie de r\u00E9f\u00E9rence de Rabbi Nachman de Breslov',
                  es: 'La librer\u00EDa l\u00EDder de Rab\u00ED Nachman de Breslov',
                  ru: '\u0412\u0435\u0434\u0443\u0449\u0438\u0439 \u043A\u043D\u0438\u0436\u043D\u044B\u0439 \u043C\u0430\u0433\u0430\u0437\u0438\u043D \u0420\u0430\u0431\u0431\u0438 \u041D\u0430\u0445\u043C\u0430\u043D\u0430 \u0438\u0437 \u0411\u0440\u0435\u0441\u043B\u043E\u0432',
                })}
              </h2>
              <p style={{
                marginBottom: '2rem',
                fontStyle: 'italic',
                color: 'hsl(210, 12%, 50%)',
                fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)',
                lineHeight: '1.7',
                maxWidth: '500px',
              }}>
                {ml(currentLanguage, {
                  he: "''\u05E8\u05E7 \u05EA\u05E0\u05D5 \u05DC\u05D9 \u05D0\u05EA \u05DC\u05D9\u05D1\u05DB\u05DD \u05D5\u05D0\u05D5\u05DC\u05D9\u05DA \u05D0\u05EA\u05DB\u05DD \u05D1\u05D3\u05E8\u05DA \u05D7\u05D3\u05E9\u05D4..'' (\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF)",
                  en: '"Just give me your hearts and I will lead you on a new path..." (Rabbi Nachman)',
                  fr: '"Donnez-moi simplement vos c\u0153urs et je vous m\u00E8nerai sur un nouveau chemin..." (Rabbi Nachman)',
                  es: '"Solo denme sus corazones y los guiar\u00E9 por un camino nuevo..." (Rabino Nachman)',
                  ru: '"\u041F\u0440\u043E\u0441\u0442\u043E \u0434\u0430\u0439\u0442\u0435 \u043C\u043D\u0435 \u0432\u0430\u0448\u0438 \u0441\u0435\u0440\u0434\u0446\u0430 \u0438 \u044F \u043F\u043E\u0432\u0435\u0434\u0443 \u0432\u0430\u0441 \u043D\u043E\u0432\u044B\u043C \u043F\u0443\u0442\u0435\u043C..." (\u0420\u0430\u0431\u0431\u0438 \u041D\u0430\u0445\u043C\u0430\u043D)',
                })}
              </p>
              <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center'}}>
                <a href="/store" style={{textDecoration: 'none'}}>
                  <button data-testid="button-enter-store" style={{
                    background: '#FF6B00',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '1rem 2.5rem',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontSize: '1.05rem',
                    fontWeight: '700',
                    boxShadow: '0 4px 14px rgba(255,107,53,0.35)',
                    transition: 'all 0.2s ease',
                  }}>
                    {ml(currentLanguage, {
                      he: '\u05DB\u05E0\u05E1 \u05DC\u05D7\u05E0\u05D5\u05EA',
                      en: 'Enter Store',
                      fr: 'Entrer dans la Boutique',
                      es: 'Entrar a la Tienda',
                      ru: '\u0412\u043E\u0439\u0442\u0438 \u0432 \u041C\u0430\u0433\u0430\u0437\u0438\u043D',
                    })}
                  </button>
                </a>
                <a href="/join" style={{textDecoration: 'none'}}>
                  <button data-testid="button-discover-activities" style={{
                    background: 'transparent',
                    color: '#FF6B00',
                    border: '1.5px solid #FF6B00',
                    padding: '1rem 2.5rem',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontSize: '1.05rem',
                    fontWeight: '600',
                    transition: 'all 0.2s ease',
                  }}>
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
            </div>

            {/* Hero image - clean book composition */}
            <div style={{
              order: isRTL ? 0 : 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              minHeight: '320px',
            }}>
              <img
                src="/images/book-1.webp"
                alt={ml(currentLanguage, {he: 'ספרי רבי נחמן', en: 'Rabbi Nachman Books', fr: 'Livres de Rabbi Nachman', es: 'Libros de Rabí Nachman', ru: 'Книги Рабби Нахмана'})}
                style={{
                  maxWidth: '280px',
                  width: '100%',
                  height: 'auto',
                  borderRadius: '12px',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
                }}
              />
            </div>
          </div>
        </div>

        {/* Responsive: stack on mobile */}
        <style>{`
          @media (max-width: 768px) {
            .hero-grid {
              grid-template-columns: 1fr !important;
            }
            .hero-grid > div:last-child {
              min-height: 200px !important;
            }
          }
        `}</style>
      </section>

      {/* ============================================ */}
      {/* NOUVEAUTES CAROUSEL                          */}
      {/* ============================================ */}
      <section style={{background: '#FFFFFF', padding: '5rem 0'}}>
        <div style={{maxWidth: '1200px', margin: '0 auto', padding: '0 2rem'}}>
          {/* Section title */}
          <div style={{textAlign: 'center', marginBottom: '2.5rem'}}>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              fontWeight: '700',
              color: 'hsl(210, 25%, 20%)',
              marginBottom: '0.5rem',
              fontFamily: isRTL ? 'var(--font-hebrew)' : 'var(--font-serif)',
            }}>
              {ml(currentLanguage, {
                he: '\u05D7\u05D3\u05E9 \u05D1\u05D7\u05E0\u05D5\u05EA',
                en: 'New Arrivals',
                fr: 'Nouveaut\u00E9s',
                es: 'Novedades',
                ru: '\u041D\u043E\u0432\u0438\u043D\u043A\u0438',
              })}
            </h2>
            <div style={{width: '60px', height: '3px', background: '#FF6B00', margin: '1rem auto 0', borderRadius: '2px'}} />
          </div>

          {/* Carousel container */}
          <div style={{position: 'relative'}}
            onMouseEnter={pauseAutoScroll}
            onMouseLeave={resumeAutoScroll}
          >
            {/* Prev arrow */}
            <button
              onClick={() => scrollCarousel('left')}
              disabled={!canScrollLeft}
              aria-label="Previous"
              style={{
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                left: isRTL ? 'auto' : '-16px',
                right: isRTL ? '-16px' : 'auto',
                zIndex: 10,
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: '#FFFFFF',
                border: '1px solid hsl(210, 20%, 90%)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                cursor: canScrollLeft ? 'pointer' : 'default',
                opacity: canScrollLeft ? 1 : 0.3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'opacity 0.2s, box-shadow 0.2s',
                fontSize: '1.2rem',
                color: 'hsl(210, 25%, 30%)',
              }}
            >
              {isRTL ? '\u203A' : '\u2039'}
            </button>

            {/* Next arrow */}
            <button
              onClick={() => scrollCarousel('right')}
              disabled={!canScrollRight}
              aria-label="Next"
              style={{
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                right: isRTL ? 'auto' : '-16px',
                left: isRTL ? '-16px' : 'auto',
                zIndex: 10,
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: '#FFFFFF',
                border: '1px solid hsl(210, 20%, 90%)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                cursor: canScrollRight ? 'pointer' : 'default',
                opacity: canScrollRight ? 1 : 0.3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'opacity 0.2s, box-shadow 0.2s',
                fontSize: '1.2rem',
                color: 'hsl(210, 25%, 30%)',
              }}
            >
              {isRTL ? '\u2039' : '\u203A'}
            </button>

            {/* Scrollable row */}
            <div
              ref={carouselRef}
              className="nouveautes-scroll"
              style={{
                display: 'flex',
                gap: '1rem',
                overflowX: 'auto',
                scrollSnapType: 'x mandatory',
                scrollBehavior: 'smooth',
                padding: '0.5rem 0 1rem',
                msOverflowStyle: 'none',
                scrollbarWidth: 'none',
              }}
            >
              <style>{`
                .nouveautes-scroll::-webkit-scrollbar { display: none; }
              `}</style>
              {nouveautesProducts.map((product) => {
                const imgSrc = product.images?.[0] ? convertImagePath(product.images[0]) : '';
                const title = getInterfaceDisplayTitle(product as Product, currentLanguage);
                const price = getLowestPrice(product as Product);
                return (
                  <div
                    key={product.id}
                    data-carousel-card
                    style={{
                      flex: '0 0 calc(25% - 0.75rem)',
                      minWidth: '220px',
                      scrollSnapAlign: 'start',
                      background: '#FFFFFF',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)';
                    }}
                  >
                    <Link href={`/product/${product.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                      <div style={{width: '100%', height: '200px', overflow: 'hidden', background: 'hsl(210, 30%, 97%)'}}>
                        {imgSrc ? (
                          <img
                            loading="lazy"
                            decoding="async"
                            width="220"
                            height="200"
                            src={imgSrc}
                            alt={title}
                            style={{width: '100%', height: '100%', objectFit: 'cover'}}
                            onError={(e) => { e.currentTarget.outerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:3rem;background:#f3f4f6;color:#9ca3af">📖</div>`; }}
                          />
                        ) : (
                          <div style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem'}}>
                            &#128214;
                          </div>
                        )}
                      </div>
                      <div style={{padding: '1rem'}}>
                        <h3 style={{
                          fontSize: '0.95rem',
                          fontWeight: '600',
                          color: 'hsl(210, 25%, 20%)',
                          marginBottom: '0.4rem',
                          lineHeight: '1.3',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}>
                          {title}
                        </h3>
                        {price && (
                          <p style={{
                            fontSize: '0.9rem',
                            fontWeight: '700',
                            color: '#FF6B00',
                            marginBottom: '0.75rem',
                          }}>
                            {ml(currentLanguage, { he: '\u05D4\u05D7\u05DC \u05DE-', en: 'From ', fr: '\u00C0 partir de ', es: 'Desde ', ru: '\u041E\u0442 ' })}{price}
                          </p>
                        )}
                      </div>
                    </Link>
                    {/* Quick Add button */}
                    {product.variants && product.variants.length > 0 && (
                      <div style={{padding: '0 1rem 1rem'}}>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleQuickAdd(product as Product);
                          }}
                          style={{
                            width: '100%',
                            background: '#FF6B00',
                            color: '#FFFFFF',
                            border: 'none',
                            padding: '0.6rem',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                            fontWeight: '600',
                            transition: 'background 0.2s ease',
                          }}
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
                  </div>
                );
              })}
            </div>
          </div>

          {/* Responsive: 2 cards on mobile */}
          <style>{`
            @media (max-width: 768px) {
              [data-carousel-card] {
                flex: 0 0 calc(50% - 0.5rem) !important;
                min-width: 160px !important;
              }
            }
          `}</style>
        </div>
      </section>

      {/* ============================================ */}
      {/* BEST-SELLERS SECTION                         */}
      {/* ============================================ */}
      <section style={{background: 'hsl(30, 40%, 98%)', padding: '5rem 0'}}>
        <div style={{maxWidth: '1200px', margin: '0 auto', padding: '0 2rem'}}>
          {/* Section title */}
          <div style={{textAlign: 'center', marginBottom: '3rem'}}>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              fontWeight: '700',
              color: 'hsl(210, 25%, 20%)',
              marginBottom: '0.5rem',
              fontFamily: isRTL ? 'var(--font-hebrew)' : 'var(--font-serif)',
            }}>
              {ml(currentLanguage, {
                he: '\u05D4\u05E0\u05DE\u05DB\u05E8\u05D9\u05DD \u05D1\u05D9\u05D5\u05EA\u05E8',
                en: 'Best Sellers',
                fr: 'Meilleures Ventes',
                es: 'M\u00E1s Vendidos',
                ru: '\u0411\u0435\u0441\u0442\u0441\u0435\u043B\u043B\u0435\u0440\u044B',
              })}
            </h2>
            <div style={{width: '60px', height: '3px', background: '#FF6B00', margin: '1rem auto 0', borderRadius: '2px'}} />
          </div>

          {/* Products grid: 4 columns desktop, 2 columns mobile */}
          <div className="bestseller-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.5rem',
          }}>
            <style>{`
              @media (max-width: 768px) {
                .bestseller-grid {
                  grid-template-columns: repeat(2, 1fr) !important;
                }
              }
            `}</style>
            {bestSellers.map((product) => {
              const imgSrc = product.images?.[0] ? convertImagePath(product.images[0]) : '';
              const title = getInterfaceDisplayTitle(product as Product, currentLanguage);
              const price = getLowestPrice(product as Product);
              return (
                <div
                  key={product.id}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: '14px',
                    overflow: 'hidden',
                    boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,0.06)';
                  }}
                >
                  <Link href={`/product/${product.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                    <div style={{width: '100%', height: '240px', overflow: 'hidden', background: 'hsl(210, 30%, 97%)'}}>
                      {imgSrc ? (
                        <img
                          loading="lazy"
                          decoding="async"
                          width="280"
                          height="240"
                          src={imgSrc}
                          alt={title}
                          style={{width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease'}}
                          onError={(e) => { e.currentTarget.outerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:3rem;background:#f3f4f6;color:#9ca3af">📖</div>`; }}
                        />
                      ) : (
                        <div style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3.5rem'}}>
                          &#128214;
                        </div>
                      )}
                    </div>
                    <div style={{padding: '1.25rem'}}>
                      <h3 style={{
                        fontSize: '1.05rem',
                        fontWeight: '600',
                        color: 'hsl(210, 25%, 20%)',
                        marginBottom: '0.5rem',
                        lineHeight: '1.3',
                      }}>
                        {title}
                      </h3>
                      {price && (
                        <p style={{
                          fontSize: '1rem',
                          fontWeight: '700',
                          color: '#FF6B00',
                          marginBottom: '0.75rem',
                        }}>
                          {ml(currentLanguage, { he: '\u05D4\u05D7\u05DC \u05DE-', en: 'From ', fr: '\u00C0 partir de ', es: 'Desde ', ru: '\u041E\u0442 ' })}{price}
                        </p>
                      )}
                      <span style={{
                        display: 'inline-block',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        color: 'hsl(210, 85%, 45%)',
                        borderBottom: '1px solid hsl(210, 85%, 45%)',
                        paddingBottom: '1px',
                        transition: 'color 0.2s',
                      }}>
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
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LEADING BOOKS SECTION - White background, generous spacing */}
      <section style={{background: '#FFFFFF', padding: '5rem 0'}}>
        <div style={{maxWidth: '1200px', margin: '0 auto', padding: '0 2rem'}}>
          <div style={{textAlign: 'center', marginBottom: '3.5rem'}}>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              fontWeight: '700',
              color: 'hsl(210, 25%, 20%)',
              marginBottom: '0.5rem',
              fontFamily: currentLanguage === 'he' ? 'var(--font-hebrew)' : 'var(--font-serif)'
            }}>
              {currentLanguage === 'he' ? '\u05E1\u05E4\u05E8\u05D9 \u05E8\u05D1\u05E0\u05D5 \u05D4\u05DE\u05D5\u05D1\u05D9\u05DC\u05D9\u05DD' :
               currentLanguage === 'en' ? 'Leading Books of Our Master' :
               currentLanguage === 'fr' ? 'Livres Principaux de Notre Ma\u00EEtre' :
               currentLanguage === 'es' ? 'Libros Principales de Nuestro Maestro' :
               currentLanguage === 'ru' ? '\u0412\u0435\u0434\u0443\u0449\u0438\u0435 \u041A\u043D\u0438\u0433\u0438 \u041D\u0430\u0448\u0435\u0433\u043E \u0423\u0447\u0438\u0442\u0435\u043B\u044F' : '\u05E1\u05E4\u05E8\u05D9 \u05E8\u05D1\u05E0\u05D5 \u05D4\u05DE\u05D5\u05D1\u05D9\u05DC\u05D9\u05DD'}
            </h2>
            <div style={{width: '60px', height: '3px', background: 'hsl(210, 85%, 45%)', margin: '1rem auto 0', borderRadius: '2px'}} />
          </div>

          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem'}}>
            {[
              { title: '\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05DE\u05D5\u05D4\u05E8\u05DF', titleEn: 'Likutei Moharan', image: '/images/book-6.webp', href: '/product/likutei-moharan' },
              { title: '\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05EA\u05E4\u05D9\u05DC\u05D5\u05EA', titleEn: 'Likutei Tefilot', image: '/images/book-3.webp', href: '/product/likutei-tefilot' },
              { title: '\u05D7\u05D5\u05DE\u05E9 \u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05D4\u05DC\u05DB\u05D5\u05EA', titleEn: 'Chumash Likutei Halachos', image: '/images/book-5.webp', href: '/product/chumash-likutei-halakhot' },
              { title: '\u05DC\u05D9\u05E7\u05D5\u05D8\u05D9 \u05D4\u05DC\u05DB\u05D5\u05EA', titleEn: 'Likutei Halachos', image: '/images/book-2.webp', href: '/product/likutei-halakhot' },
              { title: '\u05E1\u05D9\u05E4\u05D5\u05E8\u05D9 \u05DE\u05E2\u05E9\u05D9\u05D5\u05EA', titleEn: 'Tales of Ancient Times', image: '/images/book-product-3.webp', href: '/product/siporei-masiyot' },
              { title: '\u05DB\u05DC \u05D1\u05D5 \u05DC\u05D9\u05E9\u05D5\u05E2\u05D5\u05EA', titleEn: 'Complete Guide to Salvation', image: '/images/book-1.webp', href: '/product/kol-bo-leyeshuot' }
            ].map((book, index) => (
              <a key={index} href={book.href} style={{textDecoration: 'none', color: 'inherit'}}>
                <div style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  background: '#FFFFFF',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)';
                  }}>
                  <div style={{height: '240px', overflow: 'hidden'}}>
                    <img loading="lazy" decoding="async" width="280" height="240" src={book.image} alt={book.title} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                  </div>
                  <div style={{padding: '1.25rem', textAlign: 'center'}}>
                    <h3 style={{fontSize: '1.1rem', fontWeight: '600', color: 'hsl(210, 25%, 25%)', margin: 0}}>
                      {currentLanguage === 'he' ? book.title : book.titleEn}
                    </h3>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* RABBI NATHAN QUOTE SECTION */}
      <section style={{background: 'hsl(210, 30%, 97%)', padding: '5rem 0'}}>
        <div style={{maxWidth: '700px', margin: '0 auto', padding: '0 2rem', textAlign: 'center'}}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            padding: '3rem 2.5rem',
            boxShadow: '0 2px 20px rgba(0,0,0,0.04)',
          }}>
            <h2 style={{
              fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
              fontWeight: '600',
              marginBottom: '0.75rem',
              color: 'hsl(210, 25%, 20%)',
            }}>
              {currentLanguage === 'he' ? '\u05D3\u05E3 \u05D0\u05D7\u05D3 \u05DE\u05E1\u05E4\u05E8\u05D9 \u05E8\u05D1\u05E0\u05D5' :
               currentLanguage === 'en' ? 'One Page from Our Master\'s Books' :
               currentLanguage === 'fr' ? 'Une Page des Livres de Notre Ma\u00EEtre' :
               currentLanguage === 'es' ? 'Una P\u00E1gina de los Libros de Nuestro Maestro' :
               currentLanguage === 'ru' ? '\u041E\u0434\u043D\u0430 \u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430 \u0438\u0437 \u041A\u043D\u0438\u0433 \u041D\u0430\u0448\u0435\u0433\u043E \u0423\u0447\u0438\u0442\u0435\u043B\u044F' : '\u05D3\u05E3 \u05D0\u05D7\u05D3 \u05DE\u05E1\u05E4\u05E8\u05D9 \u05E8\u05D1\u05E0\u05D5'}
            </h2>
            <h3 style={{
              fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
              fontWeight: '400',
              marginBottom: '1rem',
              color: 'hsl(210, 85%, 45%)',
            }}>
              {currentLanguage === 'he' ? '\u05D9\u05D4\u05D9\u05D4 \u05EA\u05D9\u05E7\u05D5\u05DF \u05E2\u05DC \u05D4\u05DB\u05DC!' :
               currentLanguage === 'en' ? 'There will be rectification for everything!' :
               currentLanguage === 'fr' ? 'Il y aura une rectification pour tout!' :
               currentLanguage === 'es' ? '\u00A1Habr\u00E1 rectificaci\u00F3n para todo!' :
               currentLanguage === 'ru' ? '\u0411\u0443\u0434\u0435\u0442 \u0438\u0441\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0434\u043B\u044F \u0432\u0441\u0435\u0433\u043E!' : '\u05D9\u05D4\u05D9\u05D4 \u05EA\u05D9\u05E7\u05D5\u05DF \u05E2\u05DC \u05D4\u05DB\u05DC!'}
            </h3>
            <p style={{fontSize: '0.95rem', fontStyle: 'italic', color: 'hsl(210, 12%, 50%)', margin: 0}}>
              {currentLanguage === 'he' ? '\u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1' :
               currentLanguage === 'en' ? 'Rabbi Nathan of Breslov' :
               currentLanguage === 'fr' ? 'Rabbi Nathan de Breslov' :
               currentLanguage === 'es' ? 'Rabino Nathan de Breslov' :
               currentLanguage === 'ru' ? '\u0420\u0430\u0431\u0431\u0438 \u041D\u0430\u0442\u0430\u043D \u0438\u0437 \u0411\u0440\u0435\u0441\u043B\u043E\u0432' : '\u05E8\u05D1\u05D9 \u05E0\u05EA\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1'}
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section style={{background: '#FFFFFF', padding: '5rem 0'}}>
        <div style={{maxWidth: '1100px', margin: '0 auto', padding: '0 2rem'}}>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem'}}>
            {[
              { icon: '\uD83D\uDE9A', titleHe: '\u05DE\u05E9\u05DC\u05D5\u05D7 \u05DE\u05D4\u05D9\u05E8 \u05E2\u05D3 \u05D4\u05D1\u05D9\u05EA \u05D7\u05D9\u05E0\u05DD', titleEn: 'Fast Free Home Delivery', titleFr: 'Livraison Rapide Gratuite \u00E0 Domicile', titleEs: 'Entrega R\u00E1pida Gratuita a Domicilio', titleRu: '\u0411\u044B\u0441\u0442\u0440\u0430\u044F \u0411\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u0430\u044F \u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430 \u043D\u0430 \u0414\u043E\u043C', descHe: '\u05D1\u05E8\u05DB\u05D9\u05E9\u05D4 \u05DE\u05E2\u05DC 299 \u20AA \u05DE\u05D4\u05D7\u05E0\u05D5\u05EA', descEn: 'On purchases over 299 \u20AA from the store', descFr: 'Sur les achats de plus de 299 \u20AA du magasin', descEs: 'En compras mayores a 299 \u20AA de la tienda', descRu: '\u041F\u0440\u0438 \u043F\u043E\u043A\u0443\u043F\u043A\u0430\u0445 \u0441\u0432\u044B\u0448\u0435 299 \u20AA \u0438\u0437 \u043C\u0430\u0433\u0430\u0437\u0438\u043D\u0430' },
              { icon: '\uD83D\uDD12', titleHe: '\u05E8\u05DB\u05D9\u05E9\u05D4 \u05DE\u05D0\u05D5\u05D1\u05D8\u05D7\u05EA', titleEn: 'Secure Purchase', titleFr: 'Achat S\u00E9curis\u00E9', titleEs: 'Compra Segura', titleRu: '\u0411\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u0430\u044F \u041F\u043E\u043A\u0443\u043F\u043A\u0430', descHe: '\u05D1\u05D0\u05DE\u05E6\u05E2\u05D5\u05EA \u05EA\u05E2\u05D5\u05D3\u05EA SSL \u05D5\u05D1\u05EA\u05E7\u05E0\u05D9\u05DD \u05D4\u05DE\u05D7\u05DE\u05D9\u05E8\u05D9\u05DD \u05D1\u05D9\u05D5\u05EA\u05E8', descEn: 'Using SSL certificate and the most stringent standards', descFr: 'En utilisant un certificat SSL et les normes les plus strictes', descEs: 'Utilizando certificado SSL y los est\u00E1ndares m\u00E1s estrictos', descRu: '\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435 SSL-\u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u0430 \u0438 \u0441\u0430\u043C\u044B\u0445 \u0441\u0442\u0440\u043E\u0433\u0438\u0445 \u0441\u0442\u0430\u043D\u0434\u0430\u0440\u0442\u043E\u0432' },
              { icon: '\uD83D\uDCDA', titleHe: '\u05D7\u05E0\u05D5\u05EA \u05D4\u05E1\u05E4\u05E8\u05D9\u05DD \u05D4\u05D2\u05D3\u05D5\u05DC\u05D4 \u05D1\u05D9\u05D5\u05EA\u05E8 \u05DC\u05E1\u05E4\u05E8\u05D9 \u05E8\u05D1\u05E0\u05D5 \u05D0\u05D5\u05E0\u05DC\u05D9\u05D9\u05DF', titleEn: 'Largest Online Bookstore for Our Master\'s Books', titleFr: 'Plus Grande Librairie en Ligne', titleEs: 'Librer\u00EDa en L\u00EDnea M\u00E1s Grande', titleRu: '\u041A\u0440\u0443\u043F\u043D\u0435\u0439\u0448\u0438\u0439 \u0418\u043D\u0442\u0435\u0440\u043D\u0435\u0442-\u041A\u043D\u0438\u0436\u043D\u044B\u0439 \u041C\u0430\u0433\u0430\u0437\u0438\u043D', descHe: '\u05DE\u05E9\u05DC\u05D5\u05D7\u05D9\u05DD \u05DC\u05DB\u05DC \u05D4\u05D0\u05E8\u05E5', descEn: 'Shipping throughout the country', descFr: 'Exp\u00E9dition dans tout le pays', descEs: 'Env\u00EDo por todo el pa\u00EDs', descRu: '\u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430 \u043F\u043E \u0432\u0441\u0435\u0439 \u0441\u0442\u0440\u0430\u043D\u0435' },
              { icon: '\uD83C\uDFA7', titleHe: '\u05E9\u05D9\u05E8\u05D5\u05EA \u05DC\u05E7\u05D5\u05D7\u05D5\u05EA \u05DE\u05E2\u05D5\u05DC\u05D4 \u05D5\u05D6\u05DE\u05D9\u05DF \u05EA\u05DE\u05D9\u05D3 \u05DC\u05E9\u05D9\u05E8\u05D5\u05EA\u05DB\u05DD', titleEn: 'Excellent Customer Service Always Available', titleFr: 'Excellent Service Client Toujours Disponible', titleEs: 'Excelente Servicio al Cliente Siempre Disponible', titleRu: '\u041E\u0442\u043B\u0438\u0447\u043D\u043E\u0435 \u041E\u0431\u0441\u043B\u0443\u0436\u0438\u0432\u0430\u043D\u0438\u0435 \u041A\u043B\u0438\u0435\u043D\u0442\u043E\u0432 \u0412\u0441\u0435\u0433\u0434\u0430 \u0414\u043E\u0441\u0442\u0443\u043F\u043D\u043E', descHe: '\u05E2\u05D3 12 \u05EA\u05E9\u05DC\u05D5\u05DE\u05D9\u05DD \u05DC\u05DC\u05D0 \u05E8\u05D9\u05D1\u05D9\u05EA', descEn: 'Up to 12 payments without interest', descFr: 'Jusqu\'\u00E0 12 paiements sans int\u00E9r\u00EAt', descEs: 'Hasta 12 pagos sin inter\u00E9s', descRu: '\u0414\u043E 12 \u043F\u043B\u0430\u0442\u0435\u0436\u0435\u0439 \u0431\u0435\u0437 \u043F\u0440\u043E\u0446\u0435\u043D\u0442\u043E\u0432' },
            ].map((service, index) => (
              <div key={index} style={{
                background: '#FFFFFF', padding: '2rem 1.5rem', borderRadius: '12px',
                boxShadow: '0 1px 8px rgba(0,0,0,0.05)', textAlign: 'center', transition: 'box-shadow 0.3s ease',
              }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)'}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 1px 8px rgba(0,0,0,0.05)'}
              >
                <div style={{fontSize: '2.5rem', marginBottom: '1rem'}}>{service.icon}</div>
                <h3 style={{fontSize: '1.05rem', fontWeight: '600', color: 'hsl(210, 25%, 25%)', marginBottom: '0.75rem', lineHeight: '1.4'}}>
                  {currentLanguage === 'he' ? service.titleHe : currentLanguage === 'en' ? service.titleEn : currentLanguage === 'fr' ? service.titleFr : currentLanguage === 'es' ? service.titleEs : currentLanguage === 'ru' ? service.titleRu : service.titleHe}
                </h3>
                <p style={{color: 'hsl(210, 10%, 55%)', fontSize: '0.88rem', margin: 0, lineHeight: '1.5'}}>
                  {currentLanguage === 'he' ? service.descHe : currentLanguage === 'en' ? service.descEn : currentLanguage === 'fr' ? service.descFr : currentLanguage === 'es' ? service.descEs : currentLanguage === 'ru' ? service.descRu : service.descHe}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section style={{background: 'hsl(210, 30%, 97%)', padding: '5rem 0'}}>
        <div style={{maxWidth: '1000px', margin: '0 auto', padding: '0 2rem'}}>
          <div style={{textAlign: 'center', marginBottom: '3rem'}}>
            <h2 style={{fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: '700', color: 'hsl(210, 25%, 20%)', marginBottom: '0.5rem'}}>
              {ml(currentLanguage, { he: '\u05D4\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D5\u05EA \u05D1\u05D7\u05E0\u05D5\u05EA', en: 'Store Categories', fr: 'Cat\u00E9gories du Magasin', es: 'Categor\u00EDas de la Tienda', ru: '\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438 \u041C\u0430\u0433\u0430\u0437\u0438\u043D\u0430' })}
            </h2>
            <div style={{width: '60px', height: '3px', background: 'hsl(210, 85%, 45%)', margin: '1rem auto 0', borderRadius: '2px'}} />
          </div>

          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem'}}>
            {[
              { he: '\u05DB\u05DC \u05D7\u05D9\u05D1\u05D5\u05E8\u05D9 \u05E8\u05D1\u05E0\u05D5 \u05D4\u05E7\u05D3\u05D5\u05E9', en: 'All Holy Compositions of Our Master', fr: 'Toutes les Compositions Saintes de Notre Ma\u00EEtre', es: 'Todas las Composiciones Sagradas de Nuestro Maestro', ru: '\u0412\u0441\u0435 \u0421\u0432\u044F\u0442\u044B\u0435 \u0421\u043E\u0447\u0438\u043D\u0435\u043D\u0438\u044F \u041D\u0430\u0448\u0435\u0433\u043E \u0423\u0447\u0438\u0442\u0435\u043B\u044F' },
              { he: '\u05DB\u05DC \u05E1\u05E4\u05E8\u05D9 \u05E8\u05D1\u05D9 \u05D9\u05E9\u05E8\u05D0\u05DC', en: 'All Books of Rabbi Israel', fr: 'Tous les Livres de Rabbi Israel', es: 'Todos los Libros del Rabino Israel', ru: '\u0412\u0441\u0435 \u041A\u043D\u0438\u0433\u0438 \u0420\u0430\u0431\u0431\u0438 \u0418\u0437\u0440\u0430\u044D\u043B\u044F' },
            ].map((cat, index) => (
              <div key={index} style={{background: '#FFFFFF', padding: '2.5rem 2rem', borderRadius: '12px', textAlign: 'center', boxShadow: '0 1px 8px rgba(0,0,0,0.05)'}}>
                <h3 style={{fontSize: '1.2rem', fontWeight: '600', marginBottom: '1.25rem', color: 'hsl(210, 25%, 25%)'}}>
                  {ml(currentLanguage, cat)}
                </h3>
                <a href="/store" style={{textDecoration: 'none'}}>
                  <button style={{background: 'hsl(210, 85%, 45%)', color: 'white', border: 'none', padding: '0.8rem 2rem', borderRadius: '8px', cursor: 'pointer', fontSize: '1rem', fontWeight: '600', boxShadow: '0 2px 8px hsla(210, 85%, 45%, 0.25)', transition: 'all 0.2s ease'}}>
                    {ml(currentLanguage, { he: '\u05DC\u05D7\u05E6\u05D5 \u05DB\u05D0\u05DF', en: 'Click Here', fr: 'Cliquez Ici', es: 'Haga Clic Aqu\u00ED', ru: '\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \u0417\u0434\u0435\u0441\u044C' })}
                  </button>
                </a>
              </div>
            ))}
          </div>

          <div style={{textAlign: 'center'}}>
            <a href="/store" style={{textDecoration: 'none'}}>
              <button style={{background: '#FFFFFF', color: 'hsl(210, 85%, 45%)', border: '1.5px solid hsl(210, 85%, 45%)', padding: '0.8rem 2rem', borderRadius: '8px', cursor: 'pointer', fontSize: '1rem', fontWeight: '600', transition: 'all 0.2s ease'}}>
                {ml(currentLanguage, { he: '\u05DC\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D5\u05EA \u05E0\u05D5\u05E1\u05E4\u05D5\u05EA \u05DC\u05D7\u05E6\u05D5 \u05DB\u05D0\u05DF', en: 'For additional categories click here', fr: 'Pour des cat\u00E9gories suppl\u00E9mentaires cliquez ici', es: 'Para categor\u00EDas adicionales haga clic aqu\u00ED', ru: '\u0414\u043B\u044F \u0434\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0445 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0439 \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \u0437\u0434\u0435\u0441\u044C' })}
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* NEWSLETTER SECTION */}
      <section style={{background: '#FFFFFF', padding: '5rem 0'}}>
        <div style={{maxWidth: '700px', margin: '0 auto', padding: '0 2rem', textAlign: 'center'}}>
          <h2 style={{fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: '700', color: 'hsl(210, 25%, 20%)', marginBottom: '0.75rem'}}>
            {ml(currentLanguage, { he: '\u05D4\u05E6\u05D8\u05E8\u05E4\u05D5 \u05E2\u05DB\u05E9\u05D9\u05D5 \u05DC\u05E8\u05E9\u05D9\u05DE\u05EA \u05EA\u05E4\u05D5\u05E6\u05D4', en: 'Join Our Mailing List Now', fr: 'Rejoignez Notre Liste de Diffusion Maintenant', es: '\u00DAnete a Nuestra Lista de Correo Ahora', ru: '\u041F\u0440\u0438\u0441\u043E\u0435\u0434\u0438\u043D\u044F\u0439\u0442\u0435\u0441\u044C \u043A \u041D\u0430\u0448\u0435\u043C\u0443 \u0421\u043F\u0438\u0441\u043A\u0443 \u0420\u0430\u0441\u0441\u044B\u043B\u043A\u0438 \u0421\u0435\u0439\u0447\u0430\u0441' })}
          </h2>
          <p style={{fontSize: '1.05rem', color: 'hsl(210, 15%, 50%)', marginBottom: '2rem'}}>
            {ml(currentLanguage, { he: '\u05D5\u05E7\u05D1\u05DC\u05D5 10% \u05D4\u05E0\u05D7\u05E0\u05D4 \u05D1\u05E8\u05DB\u05D9\u05E9\u05D4 \u05E8\u05D0\u05E9\u05D5\u05E0\u05D4 \u05D1\u05D0\u05EA\u05E8', en: 'And get 10% discount on your first purchase on the site', fr: 'Et obtenez 10% de r\u00E9duction sur votre premier achat sur le site', es: 'Y obt\u00E9n 10% de descuento en tu primera compra en el sitio', ru: '\u0418 \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u0435 \u0441\u043A\u0438\u0434\u043A\u0443 10% \u043D\u0430 \u043F\u0435\u0440\u0432\u0443\u044E \u043F\u043E\u043A\u0443\u043F\u043A\u0443 \u043D\u0430 \u0441\u0430\u0439\u0442\u0435' })}
          </p>

          <div style={{display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '3.5rem', flexWrap: 'wrap'}}>
            <input type="email" placeholder={isRTL ? '\u05D4\u05DB\u05E0\u05D9\u05E1\u05D5 \u05DB\u05EA\u05D5\u05D1\u05EA \u05D0\u05D9\u05DE\u05D9\u05D9\u05DC' : 'Enter email address'} style={{padding: '0.9rem 1.25rem', borderRadius: '8px', border: '1.5px solid hsl(210, 20%, 85%)', fontSize: '0.95rem', minWidth: 'min(280px, calc(100vw - 6rem))', textAlign: isRTL ? 'right' : 'left', outline: 'none', transition: 'border-color 0.2s ease'}} />
            <button style={{background: 'hsl(210, 85%, 45%)', color: 'white', border: 'none', padding: '0.9rem 1.75rem', borderRadius: '8px', cursor: 'pointer', fontSize: '0.95rem', fontWeight: '600', boxShadow: '0 2px 8px hsla(210, 85%, 45%, 0.25)', transition: 'all 0.2s ease'}}>
              {ml(currentLanguage, { he: '\u05D4\u05E6\u05D8\u05E8\u05E4\u05D5 \u05E2\u05DB\u05E9\u05D9\u05D5', en: 'Join Now', fr: 'Rejoignez Maintenant', es: '\u00DAnete Ahora', ru: '\u041F\u0440\u0438\u0441\u043E\u0435\u0434\u0438\u043D\u044F\u0439\u0442\u0435\u0441\u044C \u0421\u0435\u0439\u0447\u0430\u0441' })}
            </button>
          </div>

          <div>
            <h3 style={{fontSize: '1.3rem', fontWeight: '600', color: 'hsl(210, 25%, 20%)', marginBottom: '0.75rem'}}>
              {ml(currentLanguage, { he: '\u05D4\u05E6\u05D8\u05E8\u05E4\u05D5 \u05DC\u05E7\u05D1\u05D5\u05E6\u05D5\u05EA \u05D4\u05D5\u05D5\u05D0\u05D8\u05E1\u05D0\u05E4 \u05E9\u05DC\u05E0\u05D5', en: 'Join Our WhatsApp Groups', fr: 'Rejoignez Nos Groupes WhatsApp', es: '\u00DAnete a Nuestros Grupos de WhatsApp', ru: '\u041F\u0440\u0438\u0441\u043E\u0435\u0434\u0438\u043D\u044F\u0439\u0442\u0435\u0441\u044C \u043A \u041D\u0430\u0448\u0438\u043C \u0413\u0440\u0443\u043F\u043F\u0430\u043C WhatsApp' })}
            </h3>
            <p style={{fontSize: '0.95rem', color: 'hsl(210, 15%, 50%)', marginBottom: '1.5rem'}}>
              {ml(currentLanguage, { he: '\u05E7\u05D1\u05DC\u05D5 \u05E2\u05D3\u05DB\u05D5\u05E0\u05D9\u05DD \u05D9\u05D5\u05DE\u05D9\u05D9\u05DD, \u05D7\u05D5\u05D5\u05D9\u05D5\u05EA \u05DE\u05E8\u05D2\u05E9\u05D5\u05EA \u05D5\u05D7\u05D9\u05D6\u05D5\u05E7 \u05E8\u05D5\u05D7\u05E0\u05D9', en: 'Receive daily updates, exciting experiences and spiritual strengthening', fr: 'Recevez des mises \u00E0 jour quotidiennes, des exp\u00E9riences passionnantes et un renforcement spirituel', es: 'Recibe actualizaciones diarias, experiencias emocionantes y fortalecimiento espiritual', ru: '\u041F\u043E\u043B\u0443\u0447\u0430\u0439\u0442\u0435 \u0435\u0436\u0435\u0434\u043D\u0435\u0432\u043D\u044B\u0435 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F, \u0437\u0430\u0445\u0432\u0430\u0442\u044B\u0432\u0430\u044E\u0449\u0438\u0435 \u0432\u043F\u0435\u0447\u0430\u0442\u043B\u0435\u043D\u0438\u044F \u0438 \u0434\u0443\u0445\u043E\u0432\u043D\u043E\u0435 \u0443\u043A\u0440\u0435\u043F\u043B\u0435\u043D\u0438\u0435' })}
            </p>
            <div style={{display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap'}}>
              {[
                {flag: '\uD83D\uDCF1', lang: '\u05E2\u05D1\u05E8\u05D9\u05EA', phone: '972587308000'},
                {flag: '\uD83C\uDF0D', lang: 'English', phone: '972587308001'},
                {flag: '\uD83C\uDDF7\uD83C\uDDFA', lang: '\u0420\u0443\u0441\u0441\u043A\u0438\u0439', phone: '972587308002'},
                {flag: '\uD83C\uDDEA\uD83C\uDDF8', lang: 'Espa\u00F1ol', phone: '972587308003'},
                {flag: '\uD83C\uDDEB\uD83C\uDDF7', lang: 'Fran\u00E7ais', phone: '972587308004'}
              ].map((item, index) => (
                <a key={index} href={`https://wa.me/${item.phone}`} target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none'}}>
                  <button style={{background: 'hsl(150, 55%, 45%)', color: 'white', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.4rem', transition: 'all 0.2s ease', boxShadow: '0 2px 6px hsla(150, 55%, 45%, 0.25)'}}>
                    {item.flag} {item.lang}
                  </button>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* JOIN / CTA SECTION */}
      <section style={{background: 'hsl(210, 30%, 97%)', padding: '5rem 0'}}>
        <div style={{maxWidth: '800px', margin: '0 auto', padding: '0 2rem', textAlign: 'center'}}>
          <h2 style={{fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: '700', marginBottom: '0.75rem', color: 'hsl(210, 25%, 20%)'}}>
            {ml(currentLanguage, { he: '\u05D4\u05E6\u05D8\u05E8\u05E4\u05D5 \u05E2\u05DB\u05E9\u05D9\u05D5 \u05DC\u05E4\u05E8\u05E1\u05D5\u05DD \u05D5\u05D4\u05E4\u05E6\u05EA \u05E1\u05E4\u05E8\u05D9 \u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05D1\u05E2\u05D5\u05DC\u05DD', en: 'Join Now to Promote and Spread Rabbi Nachman\'s Books Worldwide', fr: 'Rejoignez Maintenant pour Promouvoir et Diffuser les Livres de Rabbi Nachman dans le Monde', es: '\u00DAnete Ahora para Promover y Difundir los Libros del Rabino Nachman en el Mundo', ru: '\u041F\u0440\u0438\u0441\u043E\u0435\u0434\u0438\u043D\u044F\u0439\u0442\u0435\u0441\u044C \u0421\u0435\u0439\u0447\u0430\u0441 \u043A \u041F\u0440\u043E\u0434\u0432\u0438\u0436\u0435\u043D\u0438\u044E \u0438 \u0420\u0430\u0441\u043F\u0440\u043E\u0441\u0442\u0440\u0430\u043D\u0435\u043D\u0438\u044E \u041A\u043D\u0438\u0433 \u0420\u0430\u0431\u0431\u0438 \u041D\u0430\u0445\u043C\u0430\u043D\u0430 \u043F\u043E \u0412\u0441\u0435\u043C\u0443 \u041C\u0438\u0440\u0443' })}
          </h2>
          <p style={{fontSize: '1.05rem', fontWeight: '300', marginBottom: '2.5rem', color: 'hsl(210, 15%, 50%)', lineHeight: '1.6'}}>
            {ml(currentLanguage, { he: '\u05D4\u05D4\u05D6\u05D3\u05DE\u05E0\u05D5\u05EA \u05E9\u05DC\u05DB\u05DD \u05DC\u05E2\u05D6\u05D5\u05E8 \u05D5\u05DC\u05EA\u05EA \u05D9\u05D3 \u05DC\u05E4\u05E8\u05E1\u05D5\u05DD \u05E9\u05DD \u05D4\u05E6\u05D3\u05D9\u05E7 \u05D1\u05E2\u05D5\u05DC\u05DD', en: 'Your opportunity to help and lend a hand in spreading the name of the Tzaddik in the world', fr: 'Votre opportunit\u00E9 d\'aider et de donner un coup de main \u00E0 la diffusion du nom du Tzaddik dans le monde', es: 'Tu oportunidad de ayudar y dar una mano en difundir el nombre del Tzaddik en el mundo', ru: '\u0412\u0430\u0448\u0430 \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0441\u0442\u044C \u043F\u043E\u043C\u043E\u0447\u044C \u0438 \u043F\u0440\u0438\u043B\u043E\u0436\u0438\u0442\u044C \u0440\u0443\u043A\u0443 \u043A \u0440\u0430\u0441\u043F\u0440\u043E\u0441\u0442\u0440\u0430\u043D\u0435\u043D\u0438\u044E \u0438\u043C\u0435\u043D\u0438 \u0426\u0430\u0434\u0438\u043A\u0430 \u0432 \u043C\u0438\u0440\u0435' })}
          </p>
          <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}>
            <a href="/join" style={{textDecoration: 'none'}}>
              <button style={{background: 'hsl(210, 85%, 45%)', color: 'white', border: 'none', padding: '1rem 2.5rem', borderRadius: '10px', cursor: 'pointer', fontSize: '1.05rem', fontWeight: '600', boxShadow: '0 4px 14px hsla(210, 85%, 45%, 0.3)', transition: 'all 0.2s ease'}}>
                {ml(currentLanguage, { he: '\u05D4\u05E6\u05D8\u05E8\u05E4\u05D5 \u05D0\u05DC\u05D9\u05E0\u05D5', en: 'Join Us', fr: 'Rejoignez-nous', es: '\u00DAnete a Nosotros', ru: '\u041F\u0440\u0438\u0441\u043E\u0435\u0434\u0438\u043D\u044F\u0439\u0442\u0435\u0441\u044C \u043A \u041D\u0430\u043C' })}
              </button>
            </a>
            <a href="/contact" style={{textDecoration: 'none'}}>
              <button style={{background: '#FFFFFF', color: 'hsl(210, 85%, 45%)', border: '1.5px solid hsl(210, 85%, 45%)', padding: '1rem 2.5rem', borderRadius: '10px', cursor: 'pointer', fontSize: '1.05rem', fontWeight: '600', transition: 'all 0.2s ease'}}>
                {ml(currentLanguage, { he: '\u05E6\u05E8\u05D5 \u05E7\u05E9\u05E8 \u05DC\u05EA\u05E8\u05D5\u05DE\u05D4', en: 'Contact for Donation', fr: 'Contactez pour Don', es: 'Contacto para Donaci\u00F3n', ru: '\u0421\u0432\u044F\u0437\u0430\u0442\u044C\u0441\u044F \u0434\u043B\u044F \u041F\u043E\u0436\u0435\u0440\u0442\u0432\u043E\u0432\u0430\u043D\u0438\u044F' })}
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="main-footer" style={{background: 'hsl(210, 20%, 18%)', color: 'white', padding: '2.5rem 0 2rem'}}>
        <div style={{maxWidth: '1200px', margin: '0 auto', padding: '0 2rem'}}>
          <div style={{textAlign: 'center'}}>
            <div style={{color: 'hsl(210, 10%, 60%)', fontSize: '0.85rem'}}>
              <p style={{marginBottom: '0.4rem'}}>
                {ml(currentLanguage, { he: '\u05DB\u05DC \u05D4\u05D6\u05DB\u05D9\u05D5\u05EA \u05E9\u05DE\u05D5\u05E8\u05D5\u05EA 2025 \u00A9 \u05E7\u05E8\u05DF \u05E8\u05D1\u05D9 \u05D9\u05E9\u05E8\u05D0\u05DC \u05D3\u05D1 \u05D0\u05D5\u05D3\u05E1\u05E8 \u05D6\u05E6"\u05DC', en: 'All rights reserved 2025 \u00A9 Rabbi Israel Dov Odesser Foundation', fr: 'Tous droits r\u00E9serv\u00E9s 2025 \u00A9 Fondation Rabbi Israel Dov Odesser', es: 'Todos los derechos reservados 2025 \u00A9 Fundaci\u00F3n Rabino Israel Dov Odesser', ru: '\u0412\u0441\u0435 \u043F\u0440\u0430\u0432\u0430 \u0437\u0430\u0449\u0438\u0449\u0435\u043D\u044B 2025 \u00A9 \u0424\u043E\u043D\u0434 \u0420\u0430\u0431\u0431\u0438 \u0418\u0437\u0440\u0430\u044D\u043B\u044F \u0414\u043E\u0432\u0430 \u041E\u0434\u0435\u0441\u0441\u0435\u0440\u0430' })}
              </p>
              <p style={{margin: 0}}>
                {ml(currentLanguage, { he: '\u05D4\u05D0\u05EA\u05E8 \u05E0\u05D1\u05E0\u05D4 \u05E2"\u05D9 \u05DE\u05D3\u05D9\u05D4 \u05DE\u05D0\u05E1\u05D8\u05E8', en: 'Website built by Media Master', fr: 'Site web construit par Media Master', es: 'Sitio web construido por Media Master', ru: '\u0421\u0430\u0439\u0442 \u0441\u043E\u0437\u0434\u0430\u043D Media Master' })}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
