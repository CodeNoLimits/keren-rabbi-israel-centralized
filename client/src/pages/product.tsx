import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useRoute, Link } from 'wouter';
import { Header } from '../components/Header';
import { useCart } from '../contexts/CartContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { getInterfaceDisplayTitle, getInterfaceDisplayDescription, getInterfaceCategoryName } from '../utils/bookTitleHelper';
import { convertImagePath } from '../utils/imagePathHelper';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Truck, Shield, RotateCcw, Star, Heart, ChevronLeft, ChevronRight, Share2, ShoppingCart, Minus, Plus, Check } from 'lucide-react';
import type { Product } from '../../../shared/schema';
import { motion, AnimatePresence } from 'framer-motion';

export default function Product() {
  const [match, params] = useRoute('/product/:id');
  const [selectedVariant, setSelectedVariant] = useState<string>('');
  const [linkCopied, setLinkCopied] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addItem } = useCart();
  const { toast } = useToast();
  const { currentLanguage, setLanguage } = useLanguage();

  if (!match || !params?.id) {
    return <div>{currentLanguage === 'he' ? 'מוצר לא נמצא' : 'Product not found'}</div>;
  }

  const product = realBreslovProducts[params.id];

  if (!product) {
    return <div>{currentLanguage === 'he' ? 'מוצר לא נמצא' : 'Product not found'}</div>;
  }

  // Task 26: Find products in the same language group (different language versions)
  const languageVersions = product.languageGroupId
    ? Object.values(realBreslovProducts).filter(p =>
        p.languageGroupId === product.languageGroupId && p.id !== product.id
      )
    : [];

  const availableLanguages = [
    { code: product.language || 'עברית', id: product.id, name: product.name },
    ...languageVersions.map(v => ({ code: v.language || 'עברית', id: v.id, name: v.name }))
  ];

  // Language display names for the tabs
  const languageLabels: Record<string, string> = {
    'עברית': currentLanguage === 'he' ? 'עברית' : currentLanguage === 'en' ? 'Hebrew' : currentLanguage === 'fr' ? 'Hébreu' : 'עברית',
    'אנגלית': currentLanguage === 'he' ? 'אנגלית' : currentLanguage === 'en' ? 'English' : currentLanguage === 'fr' ? 'Anglais' : 'English',
    'צרפתית': currentLanguage === 'he' ? 'צרפתית' : currentLanguage === 'en' ? 'French' : currentLanguage === 'fr' ? 'Français' : 'Français',
    'English': currentLanguage === 'he' ? 'אנגלית' : 'English',
    'French': currentLanguage === 'he' ? 'צרפתית' : 'Français',
    'Hebrew': currentLanguage === 'he' ? 'עברית' : 'Hebrew',
  };

  const variants = product.variants || [];
  const currentVariant = variants.find(v => v.id === selectedVariant) || variants[0];

  if (!currentVariant) {
    return <div>{currentLanguage === 'he' ? 'שגיאה: לא נמצאו גרסאות למוצר' : 'Error: No variants found'}</div>;
  }

  // Task 50: Calculate image scale based on variant size
  const getImageScaleForVariant = (size: string) => {
    const sizeMap: Record<string, number> = {
      'קטן': 0.75,      // Small: 75%
      'בינוני': 1.0,    // Medium: 100%
      'גדול': 1.25,     // Large: 125%
      'ענק': 1.5,       // Extra Large: 150%
      'small': 0.75,
      'medium': 1.0,
      'large': 1.25,
      'extra-large': 1.5,
    };
    return sizeMap[size.toLowerCase()] || 1.0;
  };

  const imageScale = getImageScaleForVariant(currentVariant.size);

  const displayTitle = getInterfaceDisplayTitle(product, currentLanguage);
  const displayDescription = getInterfaceDisplayDescription(product, currentLanguage);
  const displayCategory = getInterfaceCategoryName(product.category, currentLanguage);
  const isRTL = currentLanguage === 'he';

  // Build descriptive alt text including title, author, language, and format
  const productAuthor = product.author || (isRTL ? 'רבי נחמן מברסלב' : 'Rabbi Nachman of Breslov');
  const productLang = product.language || '';
  const descriptiveAlt = [displayTitle, productAuthor, productLang].filter(Boolean).join(' - ');

  // Translated navigation labels
  const navLabels = {
    home: isRTL ? 'דף הבית' : currentLanguage === 'en' ? 'Home' : currentLanguage === 'fr' ? 'Accueil' : currentLanguage === 'es' ? 'Inicio' : currentLanguage === 'ru' ? 'Главная' : 'Home',
    store: isRTL ? 'חנות' : currentLanguage === 'en' ? 'Store' : currentLanguage === 'fr' ? 'Boutique' : currentLanguage === 'es' ? 'Tienda' : currentLanguage === 'ru' ? 'Магазин' : 'Store',
    about: isRTL ? 'עלינו' : currentLanguage === 'en' ? 'About' : currentLanguage === 'fr' ? 'A propos' : currentLanguage === 'es' ? 'Acerca de' : currentLanguage === 'ru' ? 'О нас' : 'About',
    downloads: isRTL ? 'הורדות' : currentLanguage === 'en' ? 'Downloads' : currentLanguage === 'fr' ? 'Telechargements' : currentLanguage === 'es' ? 'Descargas' : currentLanguage === 'ru' ? 'Загрузки' : 'Downloads',
    contact: isRTL ? 'צור קשר' : currentLanguage === 'en' ? 'Contact' : currentLanguage === 'fr' ? 'Contact' : currentLanguage === 'es' ? 'Contacto' : currentLanguage === 'ru' ? 'Контакт' : 'Contact',
    freeShipping: isRTL ? 'משלוחים חינם החל מ- 399 ש"ח' : currentLanguage === 'en' ? 'Free shipping from 399 NIS' : currentLanguage === 'fr' ? 'Livraison gratuite a partir de 399 NIS' : currentLanguage === 'es' ? 'Envio gratis desde 399 NIS' : currentLanguage === 'ru' ? 'Бесплатная доставка от 399 шек.' : 'Free shipping from 399 NIS',
  };

  // Tab labels
  const tabLabels = {
    description: isRTL ? 'תיאור' : currentLanguage === 'fr' ? 'Description' : currentLanguage === 'es' ? 'Descripcion' : currentLanguage === 'ru' ? 'Описание' : 'Description',
    technicalDetails: isRTL ? 'פרטים טכניים' : currentLanguage === 'fr' ? 'Details techniques' : currentLanguage === 'es' ? 'Detalles tecnicos' : currentLanguage === 'ru' ? 'Технические детали' : 'Technical Details',
    reviews: isRTL ? 'ביקורות' : currentLanguage === 'fr' ? 'Avis' : currentLanguage === 'es' ? 'Resenas' : currentLanguage === 'ru' ? 'Отзывы' : 'Reviews',
  };

  // Reassurance labels
  const reassuranceLabels = {
    fastShipping: isRTL ? 'משלוח מהיר' : currentLanguage === 'fr' ? 'Livraison rapide' : currentLanguage === 'es' ? 'Envio rapido' : currentLanguage === 'ru' ? 'Быстрая доставка' : 'Fast shipping',
    securePayment: isRTL ? 'תשלום מאובטח' : currentLanguage === 'fr' ? 'Paiement securise' : currentLanguage === 'es' ? 'Pago seguro' : currentLanguage === 'ru' ? 'Безопасная оплата' : 'Secure payment',
    returnPolicy: isRTL ? 'החזרה 14 ימים' : currentLanguage === 'fr' ? 'Retour 14 jours' : currentLanguage === 'es' ? 'Devolucion 14 dias' : currentLanguage === 'ru' ? 'Возврат 14 дней' : '14-day returns',
  };

  // Share labels
  const shareLabels = {
    shareWhatsApp: isRTL ? 'שתף בוואטסאפ' : currentLanguage === 'fr' ? 'Partager sur WhatsApp' : currentLanguage === 'es' ? 'Compartir en WhatsApp' : currentLanguage === 'ru' ? 'Поделиться в WhatsApp' : 'Share on WhatsApp',
    shareFacebook: isRTL ? 'שתף בפייסבוק' : currentLanguage === 'fr' ? 'Partager sur Facebook' : currentLanguage === 'es' ? 'Compartir en Facebook' : currentLanguage === 'ru' ? 'Поделиться в Facebook' : 'Share on Facebook',
    copyLink: isRTL ? 'העתק קישור' : currentLanguage === 'fr' ? 'Copier le lien' : currentLanguage === 'es' ? 'Copiar enlace' : currentLanguage === 'ru' ? 'Скопировать ссылку' : 'Copy Link',
    linkCopied: isRTL ? 'הקישור הועתק!' : currentLanguage === 'fr' ? 'Lien copie !' : currentLanguage === 'es' ? 'Enlace copiado!' : currentLanguage === 'ru' ? 'Ссылка скопирована!' : 'Link copied!',
  };

  // Share handlers
  const productUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `${displayTitle} - ${currentVariant?.price || ''} \u20AA`;

  const handleCopyLink = useCallback(() => {
    navigator.clipboard.writeText(productUrl).then(() => {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    }).catch(() => {
      // fallback
      const input = document.createElement('input');
      input.value = productUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    });
  }, [productUrl]);

  // Image zoom handlers
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsZoomed(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsZoomed(false);
    setZoomPosition({ x: 50, y: 50 });
  }, []);

  const handleTouchToggle = useCallback(() => {
    setIsZoomed(prev => !prev);
    if (!isZoomed) {
      setZoomPosition({ x: 50, y: 50 });
    }
  }, [isZoomed]);

  // Technical details labels
  const detailLabels = {
    language: isRTL ? 'שפה' : currentLanguage === 'fr' ? 'Langue' : currentLanguage === 'es' ? 'Idioma' : currentLanguage === 'ru' ? 'Язык' : 'Language',
    publisher: isRTL ? 'הוצאה' : currentLanguage === 'fr' ? 'Editeur' : currentLanguage === 'es' ? 'Editorial' : currentLanguage === 'ru' ? 'Издатель' : 'Publisher',
    pages: isRTL ? 'עמודים' : currentLanguage === 'fr' ? 'Pages' : currentLanguage === 'es' ? 'Paginas' : currentLanguage === 'ru' ? 'Страниц' : 'Pages',
    volumes: isRTL ? 'כרכים' : currentLanguage === 'fr' ? 'Volumes' : currentLanguage === 'es' ? 'Volumenes' : currentLanguage === 'ru' ? 'Томов' : 'Volumes',
    dimensions: isRTL ? 'מידות' : currentLanguage === 'fr' ? 'Dimensions' : currentLanguage === 'es' ? 'Dimensiones' : currentLanguage === 'ru' ? 'Размеры' : 'Dimensions',
    binding: isRTL ? 'כריכה' : currentLanguage === 'fr' ? 'Reliure' : currentLanguage === 'es' ? 'Encuadernacion' : currentLanguage === 'ru' ? 'Переплет' : 'Binding',
    format: isRTL ? 'פורמט' : currentLanguage === 'fr' ? 'Format' : currentLanguage === 'es' ? 'Formato' : currentLanguage === 'ru' ? 'Формат' : 'Format',
    size: isRTL ? 'גודל' : currentLanguage === 'fr' ? 'Taille' : currentLanguage === 'es' ? 'Tamano' : currentLanguage === 'ru' ? 'Размер' : 'Size',
    noReviewsYet: isRTL ? 'אין עדיין ביקורות. היה הראשון לכתוב ביקורת!' : currentLanguage === 'fr' ? 'Pas encore d\'avis. Soyez le premier a donner votre avis !' : currentLanguage === 'es' ? 'Sin resenas aun. Sea el primero en opinar!' : currentLanguage === 'ru' ? 'Пока нет отзывов. Будьте первым!' : 'No reviews yet. Be the first to write a review!',
    writeReview: isRTL ? 'כתוב ביקורת' : currentLanguage === 'fr' ? 'Ecrire un avis' : currentLanguage === 'es' ? 'Escribir una resena' : currentLanguage === 'ru' ? 'Написать отзыв' : 'Write a review',
  };

  // Add to cart handler (shared between desktop and mobile sticky)
  const handleAddToCart = () => {
    if (currentVariant.inStock) {
      addItem({
        productId: product.id,
        variantId: currentVariant.id,
        name: displayTitle,
        nameEnglish: product.nameEnglish || product.name,
        image: product.images?.[0] || '',
        price: currentVariant.price,
        quantity: quantity,
        variant: {
          format: currentVariant.format,
          binding: currentVariant.binding,
          size: currentVariant.size
        }
      });
      toast({
        title: isRTL ? 'נוסף לסל הקניות!' : currentLanguage === 'en' ? 'Added to cart!' : currentLanguage === 'fr' ? 'Ajoute au panier !' : currentLanguage === 'es' ? 'Agregado al carrito!' : currentLanguage === 'ru' ? 'Добавлено в корзину!' : 'Added to cart!',
        description: isRTL ? `${displayTitle} נוסף בהצלחה לסל` : `${displayTitle} added successfully`,
      });
    }
  };

  const addToCartLabel = currentVariant.inStock
    ? (isRTL ? `הוספה לסל - ${(currentVariant.price * quantity).toFixed(2)} ₪` :
       currentLanguage === 'en' ? `Add to cart - ${(currentVariant.price * quantity).toFixed(2)} ₪` :
       currentLanguage === 'fr' ? `Ajouter au panier - ${(currentVariant.price * quantity).toFixed(2)} ₪` :
       currentLanguage === 'es' ? `Agregar al carrito - ${(currentVariant.price * quantity).toFixed(2)} ₪` :
       currentLanguage === 'ru' ? `В корзину - ${(currentVariant.price * quantity).toFixed(2)} ₪` :
       `Add to cart - ${(currentVariant.price * quantity).toFixed(2)} ₪`)
    : (isRTL ? 'אזל מהמלאי' : currentLanguage === 'en' ? 'Out of stock' : currentLanguage === 'fr' ? 'Rupture de stock' : currentLanguage === 'es' ? 'Agotado' : currentLanguage === 'ru' ? 'Нет в наличии' : 'Out of stock');

  // Track recently viewed products in localStorage
  useEffect(() => {
    if (!product) return;
    const key = 'recentlyViewed';
    const stored: string[] = JSON.parse(localStorage.getItem(key) || '[]');
    const updated = [product.id, ...stored.filter(id => id !== product.id)].slice(0, 10);
    localStorage.setItem(key, JSON.stringify(updated));
  }, [product?.id]);

  // Get recently viewed products (excluding current)
  const recentlyViewed: Product[] = useMemo(() => {
    const stored: string[] = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
    return stored
      .filter(id => id !== product?.id)
      .slice(0, 5)
      .map(id => realBreslovProducts[id])
      .filter((p): p is Product => Boolean(p));
  }, [product?.id]);

  // Task 14: Detect if product is part of a series and find related volumes
  const detectSeriesPattern = (productName: string): string | null => {
    // Common patterns for series detection
    const patterns = [
      /(.+?)\s+(?:חלק|כרך|חוברת)\s*(\d+)/,  // Hebrew: "ליקוטי מוהרן חלק 1"
      /(.+?)\s+(?:vol|volume|part)\s*\.?\s*(\d+)/i,  // English: "Likutei Moharan Vol 1"
      /(.+?)\s+(\d+)$/,  // Generic: "Name 1"
    ];

    for (const pattern of patterns) {
      const match = productName.match(pattern);
      if (match && match[1]) {
        return match[1].trim();
      }
    }
    return null;
  };

  const seriesBaseName = detectSeriesPattern(product.name);
  const relatedVolumes = seriesBaseName
    ? Object.values(realBreslovProducts).filter(p =>
        p.id !== product.id &&
        p.name.includes(seriesBaseName) &&
        detectSeriesPattern(p.name) === seriesBaseName
      )
    : [];

  // Calculate bundle discount (15% off when buying all volumes)
  const bundleDiscount = 0.15;
  const bundleProducts = [product, ...relatedVolumes];
  const bundleSubtotal = bundleProducts.reduce((sum, p) => sum + (p.variants?.[0]?.price || 0), 0);
  const bundlePrice = Math.round(bundleSubtotal * (1 - bundleDiscount));
  const bundleSavings = bundleSubtotal - bundlePrice;

  // Related products: prefer same category, then fill with others, show 4 total
  const allProducts = Object.values(realBreslovProducts).filter(p => p.id !== product.id);
  const sameCategoryProducts = allProducts.filter(p => p.category === product.category);
  const otherProducts = allProducts.filter(p => p.category !== product.category);
  const relatedProducts = [...sameCategoryProducts, ...otherProducts].slice(0, 4);

  return (
    <>
    <div className={isRTL ? 'rtl' : 'ltr'} style={{direction: isRTL ? 'rtl' : 'ltr', paddingBottom: '80px'}}>
      {/* pb-[80px] reserves space for sticky mobile bar */}

      {/* TOP BAR */}
      <section style={{background: '#FF6B00', color: 'white', padding: '8px 0'}}>
        <div style={{maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', textAlign: 'center'}}>
          <span style={{fontSize: '0.9rem', fontWeight: '500'}}>{navLabels.freeShipping}</span>
        </div>
      </section>

      <Header currentLanguage={currentLanguage} onLanguageChange={setLanguage} />

      {/* BREADCRUMBS */}
      <section style={{background: '#FFFFFF', padding: '1.5rem 0', borderBottom: '1px solid #f1f5f9'}}>
        <div className="container" style={{maxWidth: '1200px', margin: '0 auto', padding: '0 2rem'}}>
          <nav aria-label={isRTL ? 'שביל ניווט' : 'Breadcrumb'} style={{fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b'}}>
            <Link href="/" className="hover:text-[#FF6B00] transition-colors">{navLabels.home}</Link>
            <ChevronRight className={`w-3 h-3 ${isRTL ? 'rotate-180' : ''}`} />
            <Link href="/store" className="hover:text-[#FF6B00] transition-colors">{navLabels.store}</Link>
            <ChevronRight className={`w-3 h-3 ${isRTL ? 'rotate-180' : ''}`} />
            <span className="font-medium text-slate-900 truncate max-w-[200px]">{displayTitle}</span>
          </nav>
        </div>
      </section>

      {/* MAIN PRODUCT CONTENT */}
      <section style={{background: 'white', padding: '2rem 0'}}>
        <div className="container" style={{maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem'}}>
          <div className="grid grid-cols-1 md:grid-cols-2" style={{gap: '3rem', alignItems: 'start'}}>

            {/* PRODUCT IMAGES */}
            <div className="w-full">
              <div
                ref={imageContainerRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleTouchToggle}
                className="relative overflow-hidden bg-slate-50 rounded-2xl border border-slate-100 shadow-inner"
                style={{
                  marginBottom: '1rem',
                  aspectRatio: '1/1',
                  cursor: isZoomed ? 'zoom-out' : 'zoom-in',
                }}
              >
                <img loading="lazy"
                  decoding="async"
                  src={convertImagePath(product.images && product.images[selectedImage] || '')}
                  alt={descriptiveAlt}
                  draggable={false}
                  className="w-full h-full object-contain p-4"
                  style={{
                    transform: isZoomed ? 'scale(2)' : `scale(${imageScale})`,
                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    transition: isZoomed ? 'transform-origin 0.05s ease-out, transform 0.3s ease' : 'transform 0.3s ease-in-out',
                    pointerEvents: 'none',
                  }}
                />
                {/* Fullscreen button */}
                <button
                  onClick={(e) => { e.stopPropagation(); setLightboxOpen(true); }}
                  className="absolute bottom-4 right-4 bg-white/90 text-slate-700 p-3 rounded-full shadow-lg border border-slate-200 hover:bg-white transition-all hover:scale-110 active:scale-95"
                  aria-label="View fullscreen"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              {product.images && product.images.length > 1 && (
                <div style={{display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap'}}>
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${selectedImage === index ? 'border-[#FF6B00] ring-2 ring-orange-100 shadow-md' : 'border-slate-200 opacity-70 hover:opacity-100'}`}
                    >
                      <img loading="lazy"
                        decoding="async"
                        src={convertImagePath(image)}
                        alt={`${descriptiveAlt} - ${isRTL ? 'תמונה' : 'image'} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* PRODUCT INFO */}
            <div className="space-y-6">
              <div>
                <span className="bg-orange-100 text-[#FF6B00] px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase">
                  {displayCategory}
                </span>
              </div>

              <div className="flex items-start justify-between gap-4">
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                  {displayTitle}
                </h1>
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className={`p-3 rounded-full border transition-all ${isFavorite(product.id) ? 'bg-red-50 border-red-100 text-red-500 shadow-md' : 'bg-white border-slate-200 text-slate-400 hover:text-red-500'}`}
                  aria-label={isRTL ? 'הוסף למועדפים' : 'Add to favorites'}
                >
                  <Heart size={24} fill={isFavorite(product.id) ? 'currentColor' : 'none'} />
                </button>
              </div>

              {/* LANGUAGE SELECTOR - Task 26 */}
              {availableLanguages.length > 1 && (
                <div className="bg-slate-50 p-1.5 rounded-xl border border-slate-200 inline-flex flex-wrap gap-1">
                  {availableLanguages.map((lang) => (
                    <Link
                      key={lang.id}
                      href={`/product/${lang.id}`}
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${lang.id === product.id ? 'bg-white text-[#FF6B00] shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-white/50'}`}
                    >
                      {languageLabels[lang.code] || lang.code}
                    </Link>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-3">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                </div>
                <span className="text-slate-500 text-sm font-medium">
                  {isRTL ? '5.00 (23 ביקורות)' : '5.00 (23 reviews)'}
                </span>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-black text-[#FF6B00]">
                  {currentVariant.price} {'\u20AA'}
                </span>
                {currentVariant.originalPrice && (
                  <span className="text-xl text-slate-400 line-through">
                    {currentVariant.originalPrice} {'\u20AA'}
                  </span>
                )}
              </div>

              <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                {displayDescription}
              </p>

              {/* VARIANT SELECTION */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">
                  {isRTL ? 'בחר גודל וכריכה:' : 'Select Size & Binding:'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {variants.map((variant) => (
                    <label
                      key={variant.id}
                      className={`relative flex items-center p-4 rounded-2xl border-2 transition-all cursor-pointer ${selectedVariant === variant.id ? 'border-[#FF6B00] bg-orange-50/30' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                    >
                      <input
                        type="radio"
                        name="variant"
                        value={variant.id}
                        checked={selectedVariant === variant.id}
                        onChange={(e) => setSelectedVariant(e.target.value)}
                        disabled={!variant.inStock}
                        className="sr-only"
                      />
                      <div className="flex-1">
                        <div className="font-bold text-slate-900">{variant.format} {variant.binding}</div>
                        <div className="text-xs text-slate-500 font-medium">{variant.size} • {variant.dimensions}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-black text-[#FF6B00]">{variant.price}{'\u20AA'}</div>
                        {!variant.inStock && <div className="text-[10px] text-red-500 font-bold uppercase">{isRTL ? 'אזל' : 'Out'}</div>}
                      </div>
                      {selectedVariant === variant.id && (
                        <div className="absolute -top-2 -right-2 bg-[#FF6B00] text-white rounded-full p-1 shadow-lg">
                          <Check size={12} strokeWidth={4} />
                        </div>
                      )}
                    </label>
                  ))}
                </div>
              </div>

              {/* ACTION BUTTONS (Desktop) */}
              <div className="hidden md:flex gap-4 pt-4">
                <div className="flex items-center border-2 border-slate-200 rounded-xl px-2">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 hover:text-[#FF6B00] transition-colors"><Minus size={18} /></button>
                  <input type="number" value={quantity} readOnly className="w-12 text-center font-bold text-slate-900 border-none bg-transparent" />
                  <button onClick={() => setQuantity(quantity + 1)} className="p-2 hover:text-[#FF6B00] transition-colors"><Plus size={18} /></button>
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={!currentVariant.inStock}
                  className={`flex-1 py-4 rounded-xl font-black text-lg shadow-xl transition-all active:scale-95 ${currentVariant.inStock ? 'bg-[#FF6B00] text-white hover:bg-orange-600 shadow-orange-200' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
                >
                  {currentVariant.inStock ? addToCartLabel : reassuranceLabels.fastShipping}
                </button>
              </div>

              {/* SOCIAL SHARE BUTTONS */}
              <div className="flex flex-wrap gap-2 pt-4">
                <button onClick={handleCopyLink} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold border transition-all ${linkCopied ? 'bg-green-50 border-green-200 text-green-600' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                  {linkCopied ? <Check size={16} /> : <Share2 size={16} />}
                  {linkCopied ? shareLabels.linkCopied : shareLabels.copyLink}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TABS SECTION: Description / Technical Details / Reviews */}
      <section className="bg-slate-50 py-12 border-y border-slate-100">
        <div className="container max-w-4xl mx-auto px-6">
          <Tabs defaultValue="description" className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <TabsList className="w-full flex border-b border-slate-100 bg-slate-50/50 p-0 h-auto">
              <TabsTrigger value="description" className="flex-1 py-4 text-sm font-bold data-[state=active]:bg-white data-[state=active]:text-[#FF6B00] rounded-none border-r border-slate-100">{tabLabels.description}</TabsTrigger>
              <TabsTrigger value="technical" className="flex-1 py-4 text-sm font-bold data-[state=active]:bg-white data-[state=active]:text-[#FF6B00] rounded-none border-r border-slate-100">{tabLabels.technicalDetails}</TabsTrigger>
              <TabsTrigger value="reviews" className="flex-1 py-4 text-sm font-bold data-[state=active]:bg-white data-[state=active]:text-[#FF6B00] rounded-none">{tabLabels.reviews}</TabsTrigger>
            </TabsList>

            <div className="p-8">
              <TabsContent value="description" className="mt-0 space-y-6">
                <div className="prose prose-slate max-w-none">
                  <p className="text-slate-600 leading-relaxed text-lg">{displayDescription}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                    {(product.features || []).map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 bg-orange-50/50 p-4 rounded-2xl border border-orange-100/50">
                        <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0"><Check size={14} className="text-[#FF6B00]" /></div>
                        <span className="text-sm font-semibold text-slate-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="technical" className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: detailLabels.language, value: product.language },
                    { label: detailLabels.publisher, value: product.publisher },
                    { label: detailLabels.pages, value: product.pages },
                    { label: 'ISBN', value: product.isbn },
                    { label: detailLabels.format, value: currentVariant.format },
                    { label: detailLabels.binding, value: currentVariant.binding },
                    { label: detailLabels.size, value: currentVariant.size },
                    { label: detailLabels.dimensions, value: `${currentVariant.dimensions} cm` }
                  ].map((item, i) => item.value && (
                    <div key={i} className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">{item.label}</span>
                      <span className="text-sm font-black text-slate-900">{item.value}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-0 text-center py-12">
                <div className="mb-6"><Star size={48} className="mx-auto text-slate-200" /></div>
                <p className="text-slate-500 font-medium mb-6">{detailLabels.noReviewsYet}</p>
                <button className="bg-[#FF6B00] text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all">{detailLabels.writeReview}</button>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </section>

      {/* REASSURANCE SECTION */}
      <section className="py-12 bg-white">
        <div className="container max-w-4xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-3xl bg-slate-50 border border-slate-100">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-[#FF6B00]"><Truck /></div>
            <h4 className="font-bold text-slate-900">{reassuranceLabels.fastShipping}</h4>
            <p className="text-xs text-slate-500">Livraison express dans tout Israël</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-3xl bg-slate-50 border border-slate-100">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600"><Shield /></div>
            <h4 className="font-bold text-slate-900">{reassuranceLabels.securePayment}</h4>
            <p className="text-xs text-slate-500">Paiement 100% sécurisé via SSL</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-3xl bg-slate-50 border border-slate-100">
            <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center text-green-600"><RotateCcw /></div>
            <h4 className="font-bold text-slate-900">{reassuranceLabels.returnPolicy}</h4>
            <p className="text-xs text-slate-500">Garantie satisfait ou remboursé</p>
          </div>
        </div>
      </section>

      {/* RELATED PRODUCTS */}
      <section className="py-20 bg-slate-50">
        <div className="container max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-black text-slate-900 mb-12 text-center uppercase tracking-tighter">
            {isRTL ? 'מוצרים דומים' : 'You Might Also Like'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <Link key={p.id} href={`/product/${p.id}`} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 border border-slate-100 group">
                <div className="aspect-square overflow-hidden bg-slate-50">
                  <img src={convertImagePath(p.images?.[0] || '')} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-slate-900 line-clamp-1 group-hover:text-[#FF6B00] transition-colors">{getInterfaceDisplayTitle(p, currentLanguage)}</h3>
                  <div className="text-lg font-black text-[#FF6B00] mt-2">{p.variants?.[0]?.price} {'\u20AA'}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* STICKY ADD TO CART - MOBILE ONLY */}
      <div className="md:hidden fixed bottom-0 inset-x-0 bg-white/80 backdrop-blur-md border-t border-slate-200 p-4 z-50 shadow-2xl flex items-center gap-4">
        <div className="flex-shrink-0">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-0.5">{isRTL ? 'מחיר' : 'Price'}</div>
          <div className="text-xl font-black text-slate-900">{(currentVariant.price * quantity).toFixed(0)} {'\u20AA'}</div>
        </div>
        <button
          onClick={handleAddToCart}
          disabled={!currentVariant.inStock}
          className={`flex-1 py-4 rounded-2xl font-black text-sm uppercase tracking-wider transition-all active:scale-95 ${currentVariant.inStock ? 'bg-[#FF6B00] text-white shadow-lg shadow-orange-200' : 'bg-slate-200 text-slate-400'}`}
        >
          {addToCartLabel}
        </button>
      </div>
    </div>

    {/* Lightbox */}
    <AnimatePresence>
      {lightboxOpen && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
          onClick={() => setLightboxOpen(false)}
        >
          <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"><Plus size={40} className="rotate-45" /></button>
          <img src={convertImagePath(product.images?.[selectedImage] || '')} className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" alt={displayTitle} />
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}


              {/* BUNDLE SUGGESTION - Task 14 */}
              {currentVariant.volumes === 1 && (() => {
                // Find bundle variant (volumes > 1) for this product
                const bundleVariant = variants.find(v => v.volumes > 1 && v.inStock);

                if (!bundleVariant) return null;

                // Calculate savings: (single price × volumes) - bundle price
                const singleTotal = currentVariant.price * bundleVariant.volumes;
                const bundlePrice = bundleVariant.price;
                const savings = singleTotal - bundlePrice;
                const savingsPercent = Math.round((savings / singleTotal) * 100);

                if (savings <= 0) return null; // No savings, don't show

                return (
                  <div style={{
                    background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                    border: '2px solid #f59e0b',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    marginBottom: '2rem',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                  }}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem'}}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
                        <path d="M3 3h18v18H3z"/><path d="M8 12h8M12 8v8"/>
                      </svg>
                      <h4 style={{fontSize: '1.1rem', fontWeight: 'bold', color: '#92400e', margin: 0}}>
                        {isRTL ? '💰 חסוך עם הסט המלא!' :
                         currentLanguage === 'en' ? '💰 Save with Complete Set!' :
                         currentLanguage === 'fr' ? '💰 Économisez avec le Set Complet !' :
                         currentLanguage === 'es' ? '💰 ¡Ahorra con el Set Completo!' :
                         currentLanguage === 'ru' ? '💰 Экономь с полным набором!' :
                         '💰 Save with Complete Set!'}
                      </h4>
                    </div>

                    <p style={{fontSize: '0.95rem', color: '#78350f', marginBottom: '1rem', lineHeight: '1.5'}}>
                      {isRTL ?
                        `קנה ${bundleVariant.volumes} כרכים ביחד וחסוך ${savingsPercent}% (${savings.toFixed(0)} ₪)` :
                       currentLanguage === 'en' ?
                        `Buy ${bundleVariant.volumes} volumes together and save ${savingsPercent}% (${savings.toFixed(0)} ₪)` :
                       currentLanguage === 'fr' ?
                        `Achetez ${bundleVariant.volumes} volumes ensemble et économisez ${savingsPercent}% (${savings.toFixed(0)} ₪)` :
                       currentLanguage === 'es' ?
                        `Compra ${bundleVariant.volumes} volúmenes juntos y ahorra ${savingsPercent}% (${savings.toFixed(0)} ₪)` :
                       currentLanguage === 'ru' ?
                        `Купи ${bundleVariant.volumes} тома вместе и сэкономь ${savingsPercent}% (${savings.toFixed(0)} ₪)` :
                        `Buy ${bundleVariant.volumes} volumes together and save ${savingsPercent}% (${savings.toFixed(0)} ₪)`}
                    </p>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'white',
                      padding: '1rem',
                      borderRadius: '8px',
                      marginBottom: '1rem'
                    }}>
                      <div>
                        <div style={{fontSize: '0.85rem', color: '#6b7280', marginBottom: '0.25rem'}}>
                          {bundleVariant.format} {bundleVariant.binding}
                        </div>
                        <div style={{fontSize: '0.9rem', fontWeight: 'bold', color: '#333'}}>
                          {bundleVariant.volumes} {isRTL ? 'כרכים' : currentLanguage === 'ru' ? 'томов' : 'volumes'}
                        </div>
                      </div>
                      <div style={{textAlign: 'right'}}>
                        <div style={{fontSize: '0.75rem', color: '#9ca3af', textDecoration: 'line-through'}}>
                          {singleTotal.toFixed(0)} ₪
                        </div>
                        <div style={{fontSize: '1.3rem', fontWeight: 'bold', color: '#dc3545'}}>
                          {bundlePrice} ₪
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedVariant(bundleVariant.id);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1.5rem',
                        background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
                    >
                      {isRTL ? '🔥 בחר את הסט המלא' :
                       currentLanguage === 'en' ? '🔥 Select Complete Set' :
                       currentLanguage === 'fr' ? '🔥 Choisir le Set Complet' :
                       currentLanguage === 'es' ? '🔥 Seleccionar Set Completo' :
                       currentLanguage === 'ru' ? '🔥 Выбрать полный набор' :
                       '🔥 Select Complete Set'}
                    </button>
                  </div>
                );
              })()}

              {/* QUANTITY AND ADD TO CART */}
              <div style={{marginBottom: '2rem'}}>
                <div style={{display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem'}}>
                  <label style={{fontWeight: 'bold', color: '#333'}}>
                    {isRTL ? 'כמות:' : currentLanguage === 'en' ? 'Quantity:' : currentLanguage === 'fr' ? 'Quantite :' : currentLanguage === 'es' ? 'Cantidad:' : currentLanguage === 'ru' ? 'Количество:' : 'Quantity:'}
                  </label>
                  <div style={{display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '5px'}}>
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      style={{padding: '0.5rem 0.8rem', border: 'none', background: '#f8f9fa', cursor: 'pointer'}}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      style={{width: '60px', padding: '0.5rem', border: 'none', textAlign: 'center'}}
                      min="1"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      style={{padding: '0.5rem 0.8rem', border: 'none', background: '#f8f9fa', cursor: 'pointer'}}
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  style={{
                    background: currentVariant.inStock ? '#dc3545' : '#999',
                    color: 'white',
                    border: 'none',
                    padding: '1rem 2rem',
                    borderRadius: '8px',
                    cursor: currentVariant.inStock ? 'pointer' : 'not-allowed',
                    width: '100%',
                    fontSize: '1.2rem',
                    fontWeight: 'bold'
                  }}
                  disabled={!currentVariant.inStock}
                >
                  {addToCartLabel}
                </button>
              </div>

              {/* COMPLETE SET BUNDLE SUGGESTION - Task 14 */}
              {relatedVolumes.length > 0 && (
                <div style={{
                  marginBottom: '2rem',
                  padding: '1.5rem',
                  background: 'linear-gradient(135deg, #fff5f5 0%, #ffe5e5 100%)',
                  border: '2px solid #dc3545',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(220, 53, 69, 0.15)'
                }}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem'}}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#dc3545" strokeWidth="2">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                      <line x1="12" y1="7" x2="12" y2="13"></line>
                      <line x1="9" y1="10" x2="15" y2="10"></line>
                    </svg>
                    <h3 style={{fontSize: '1.3rem', fontWeight: 'bold', color: '#dc3545', margin: 0}}>
                      {isRTL ? 'מארז שלם - חסוך כסף!' :
                       currentLanguage === 'en' ? 'Complete Set - Save Money!' :
                       currentLanguage === 'fr' ? 'Collection Complète - Économisez!' :
                       currentLanguage === 'es' ? '¡Colección Completa - Ahorra!' :
                       currentLanguage === 'ru' ? 'Полный набор - Сэкономьте!' :
                       'Complete Set - Save Money!'}
                    </h3>
                  </div>

                  <p style={{fontSize: '1rem', color: '#666', marginBottom: '1rem', lineHeight: '1.5'}}>
                    {isRTL ? `קבל את כל הסדרה (${bundleProducts.length} כרכים) בהנחה של 15%!` :
                     currentLanguage === 'en' ? `Get the complete series (${bundleProducts.length} volumes) with 15% off!` :
                     currentLanguage === 'fr' ? `Obtenez la série complète (${bundleProducts.length} volumes) avec 15% de réduction!` :
                     currentLanguage === 'es' ? `¡Obtén la serie completa (${bundleProducts.length} volúmenes) con 15% de descuento!` :
                     currentLanguage === 'ru' ? `Получите полную серию (${bundleProducts.length} томов) со скидкой 15%!` :
                     `Get the complete series (${bundleProducts.length} volumes) with 15% off!`}
                  </p>

                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    marginBottom: '1rem',
                    padding: '1rem',
                    background: 'white',
                    borderRadius: '8px'
                  }}>
                    {bundleProducts.map((vol, index) => (
                      <div key={vol.id} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <span style={{fontSize: '0.9rem', color: '#333'}}>
                          {index + 1}. {getInterfaceDisplayTitle(vol, currentLanguage)}
                        </span>
                        <span style={{fontSize: '0.9rem', color: '#666', textDecoration: 'line-through'}}>
                          ₪{vol.variants?.[0]?.price || 0}
                        </span>
                      </div>
                    ))}
                    <div style={{borderTop: '2px solid #e5e7eb', paddingTop: '0.75rem', marginTop: '0.5rem'}}>
                      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <span style={{fontSize: '1rem', fontWeight: 'bold', color: '#333'}}>
                          {isRTL ? 'סך הכל:' : currentLanguage === 'en' ? 'Total:' : currentLanguage === 'fr' ? 'Total:' : currentLanguage === 'es' ? 'Total:' : currentLanguage === 'ru' ? 'Итого:' : 'Total:'}
                        </span>
                        <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                          <span style={{fontSize: '0.9rem', color: '#999', textDecoration: 'line-through'}}>₪{bundleSubtotal}</span>
                          <span style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#dc3545'}}>₪{bundlePrice}</span>
                        </div>
                      </div>
                      <div style={{textAlign: 'right', marginTop: '0.5rem'}}>
                        <span style={{fontSize: '0.9rem', color: '#28a745', fontWeight: 'bold'}}>
                          {isRTL ? `חיסכון של ₪${bundleSavings}` :
                           currentLanguage === 'en' ? `Save ₪${bundleSavings}` :
                           currentLanguage === 'fr' ? `Économisez ₪${bundleSavings}` :
                           currentLanguage === 'es' ? `Ahorre ₪${bundleSavings}` :
                           currentLanguage === 'ru' ? `Экономия ₪${bundleSavings}` :
                           `Save ₪${bundleSavings}`}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      // Add all bundle items to cart
                      bundleProducts.forEach(vol => {
                        const defaultVariant = vol.variants?.[0];
                        if (defaultVariant && defaultVariant.inStock) {
                          addItem({
                            productId: vol.id,
                            variantId: defaultVariant.id,
                            name: vol.name,
                            nameEnglish: vol.nameEnglish || vol.name,
                            image: vol.images?.[0] || '',
                            price: Math.round(defaultVariant.price * (1 - bundleDiscount)), // Apply bundle discount
                            quantity: 1,
                            variant: {
                              format: defaultVariant.format,
                              binding: defaultVariant.binding,
                              size: defaultVariant.size
                            }
                          });
                        }
                      });
                      toast({
                        title: isRTL ? 'המארז השלם נוסף לסל!' : currentLanguage === 'en' ? 'Complete set added to cart!' : 'Complete set added!',
                        description: isRTL ? `${bundleProducts.length} כרכים בהנחה של 15%` : `${bundleProducts.length} volumes with 15% discount`,
                      });
                    }}
                    style={{
                      background: '#28a745',
                      color: 'white',
                      border: 'none',
                      padding: '1rem 2rem',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      width: '100%',
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      boxShadow: '0 4px 8px rgba(40, 167, 69, 0.2)',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#218838'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = '#28a745'; e.currentTarget.style.transform = 'translateY(0)'; }}
                  >
                    {isRTL ? `הוסף מארז שלם - ₪${bundlePrice}` :
                     currentLanguage === 'en' ? `Add Complete Set - ₪${bundlePrice}` :
                     currentLanguage === 'fr' ? `Ajouter Collection - ₪${bundlePrice}` :
                     currentLanguage === 'es' ? `Agregar Colección - ₪${bundlePrice}` :
                     currentLanguage === 'ru' ? `Добавить набор - ₪${bundlePrice}` :
                     `Add Complete Set - ₪${bundlePrice}`}
                  </button>
                </div>
              )}

              {/* REASSURANCE ICONS */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1rem',
                padding: '1.5rem',
                background: '#f8f9fa',
                borderRadius: '10px',
                marginBottom: '2rem'
              }}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '0.5rem'}}>
                  <Truck size={28} color="#dc3545" strokeWidth={1.5} />
                  <span style={{fontSize: '0.85rem', fontWeight: '600', color: '#333'}}>{reassuranceLabels.fastShipping}</span>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '0.5rem'}}>
                  <Shield size={28} color="#dc3545" strokeWidth={1.5} />
                  <span style={{fontSize: '0.85rem', fontWeight: '600', color: '#333'}}>{reassuranceLabels.securePayment}</span>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '0.5rem'}}>
                  <RotateCcw size={28} color="#dc3545" strokeWidth={1.5} />
                  <span style={{fontSize: '0.85rem', fontWeight: '600', color: '#333'}}>{reassuranceLabels.returnPolicy}</span>
                </div>
              </div>

              {/* PRODUCT FEATURES (kept inline for quick glance) */}
              {(product.features || []).length > 0 && (
                <div style={{marginBottom: '2rem'}}>
                  <h3 style={{fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#333'}}>
                    {isRTL ? 'מאפיינים מיוחדים:' :
                     currentLanguage === 'en' ? 'Special Features:' :
                     currentLanguage === 'fr' ? 'Caracteristiques :' :
                     currentLanguage === 'es' ? 'Caracteristicas:' :
                     currentLanguage === 'ru' ? 'Особенности:' : 'Special Features:'}
                  </h3>
                  <ul style={{listStyle: 'none', padding: 0}}>
                    {(product.features || []).map((feature, index) => (
                      <li key={index} style={{marginBottom: '0.5rem', paddingRight: isRTL ? '1.5rem' : '0', paddingLeft: isRTL ? '0' : '1.5rem', position: 'relative'}}>
                        <span style={{position: 'absolute', ...(isRTL ? {right: 0} : {left: 0}), top: 0, color: '#dc3545', fontWeight: 'bold'}}>{'\u2713'}</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* TABS SECTION: Description / Technical Details / Reviews */}
      <section style={{background: 'white', padding: '0 0 3rem 0'}}>
        <div className="container" style={{maxWidth: '1200px', margin: '0 auto', padding: '0 2rem'}}>
          <Tabs defaultValue="description" dir={isRTL ? 'rtl' : 'ltr'}>
            <TabsList
              className="w-full justify-start rounded-none border-b bg-transparent p-0"
              style={{height: 'auto', gap: '0'}}
            >
              <TabsTrigger
                value="description"
                className="rounded-none border-b-2 border-transparent px-6 py-3 text-base font-semibold data-[state=active]:border-[#dc3545] data-[state=active]:text-[#dc3545] data-[state=active]:shadow-none"
              >
                {tabLabels.description}
              </TabsTrigger>
              <TabsTrigger
                value="technical"
                className="rounded-none border-b-2 border-transparent px-6 py-3 text-base font-semibold data-[state=active]:border-[#dc3545] data-[state=active]:text-[#dc3545] data-[state=active]:shadow-none"
              >
                {tabLabels.technicalDetails}
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="rounded-none border-b-2 border-transparent px-6 py-3 text-base font-semibold data-[state=active]:border-[#dc3545] data-[state=active]:text-[#dc3545] data-[state=active]:shadow-none"
              >
                {tabLabels.reviews}
              </TabsTrigger>
            </TabsList>

            {/* Tab: Description */}
            <TabsContent value="description" style={{padding: '2rem 0'}}>
              <div style={{fontSize: '1.05rem', color: '#555', lineHeight: '1.8', maxWidth: '800px'}}>
                <p>{displayDescription}</p>
                {(product.features || []).length > 0 && (
                  <ul style={{marginTop: '1.5rem', paddingLeft: isRTL ? '0' : '1.5rem', paddingRight: isRTL ? '1.5rem' : '0', listStyle: 'disc'}}>
                    {(product.features || []).map((feature, index) => (
                      <li key={index} style={{marginBottom: '0.5rem'}}>{feature}</li>
                    ))}
                  </ul>
                )}
              </div>
            </TabsContent>

            {/* Tab: Technical Details */}
            <TabsContent value="technical" style={{padding: '2rem 0'}}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1rem',
                maxWidth: '800px'
              }}>
                {/* General product info */}
                {product.language && (
                  <div style={{display: 'flex', justifyContent: 'space-between', padding: '0.75rem 1rem', background: '#f8f9fa', borderRadius: '6px'}}>
                    <span style={{fontWeight: '600', color: '#555'}}>{detailLabels.language}</span>
                    <span style={{color: '#333'}}>{product.language}</span>
                  </div>
                )}
                {product.publisher && (
                  <div style={{display: 'flex', justifyContent: 'space-between', padding: '0.75rem 1rem', background: '#f8f9fa', borderRadius: '6px'}}>
                    <span style={{fontWeight: '600', color: '#555'}}>{detailLabels.publisher}</span>
                    <span style={{color: '#333'}}>{product.publisher}</span>
                  </div>
                )}
                {product.pages && (
                  <div style={{display: 'flex', justifyContent: 'space-between', padding: '0.75rem 1rem', background: '#f8f9fa', borderRadius: '6px'}}>
                    <span style={{fontWeight: '600', color: '#555'}}>{detailLabels.pages}</span>
                    <span style={{color: '#333'}}>{product.pages}</span>
                  </div>
                )}
                {product.isbn && (
                  <div style={{display: 'flex', justifyContent: 'space-between', padding: '0.75rem 1rem', background: '#f8f9fa', borderRadius: '6px'}}>
                    <span style={{fontWeight: '600', color: '#555'}}>ISBN</span>
                    <span style={{color: '#333'}}>{product.isbn}</span>
                  </div>
                )}
                {/* Current variant details */}
                {currentVariant && (
                  <>
                    <div style={{display: 'flex', justifyContent: 'space-between', padding: '0.75rem 1rem', background: '#f8f9fa', borderRadius: '6px'}}>
                      <span style={{fontWeight: '600', color: '#555'}}>{detailLabels.format}</span>
                      <span style={{color: '#333'}}>{currentVariant.format}</span>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between', padding: '0.75rem 1rem', background: '#f8f9fa', borderRadius: '6px'}}>
                      <span style={{fontWeight: '600', color: '#555'}}>{detailLabels.binding}</span>
                      <span style={{color: '#333'}}>{currentVariant.binding}</span>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between', padding: '0.75rem 1rem', background: '#f8f9fa', borderRadius: '6px'}}>
                      <span style={{fontWeight: '600', color: '#555'}}>{detailLabels.size}</span>
                      <span style={{color: '#333'}}>{currentVariant.size}</span>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between', padding: '0.75rem 1rem', background: '#f8f9fa', borderRadius: '6px'}}>
                      <span style={{fontWeight: '600', color: '#555'}}>{detailLabels.dimensions}</span>
                      <span style={{color: '#333'}}>{currentVariant.dimensions} cm</span>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between', padding: '0.75rem 1rem', background: '#f8f9fa', borderRadius: '6px'}}>
                      <span style={{fontWeight: '600', color: '#555'}}>{detailLabels.volumes}</span>
                      <span style={{color: '#333'}}>{currentVariant.volumes}</span>
                    </div>
                  </>
                )}
              </div>
            </TabsContent>

            {/* Tab: Reviews (placeholder) */}
            <TabsContent value="reviews" style={{padding: '2rem 0'}}>
              <div style={{maxWidth: '800px'}}>
                {/* Placeholder review summary */}
                <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', padding: '1.5rem', background: '#f8f9fa', borderRadius: '10px'}}>
                  <div style={{textAlign: 'center'}}>
                    <div style={{fontSize: '3rem', fontWeight: 'bold', color: '#333'}}>5.0</div>
                    <div style={{color: '#ffc107', fontSize: '1.2rem'}}>{'\u2605\u2605\u2605\u2605\u2605'}</div>
                    <div style={{fontSize: '0.85rem', color: '#666', marginTop: '0.25rem'}}>
                      {isRTL ? '23 ביקורות' : currentLanguage === 'fr' ? '23 avis' : '23 reviews'}
                    </div>
                  </div>
                  <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: '0.3rem'}}>
                    {[5, 4, 3, 2, 1].map((stars) => (
                      <div key={stars} style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                        <span style={{fontSize: '0.8rem', width: '20px', textAlign: 'center', color: '#666'}}>{stars}</span>
                        <Star size={14} fill="#ffc107" color="#ffc107" />
                        <div style={{flex: 1, height: '8px', background: '#e9ecef', borderRadius: '4px', overflow: 'hidden'}}>
                          <div style={{height: '100%', background: '#ffc107', borderRadius: '4px', width: stars === 5 ? '100%' : '0%'}} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{textAlign: 'center', padding: '2rem', border: '2px dashed #ddd', borderRadius: '10px', color: '#6b7280'}}>
                  <p style={{fontSize: '1rem', marginBottom: '1rem'}}>{detailLabels.noReviewsYet}</p>
                  <button
                    style={{
                      background: '#dc3545',
                      color: 'white',
                      border: 'none',
                      padding: '0.75rem 2rem',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      fontSize: '1rem'
                    }}
                  >
                    {detailLabels.writeReview}
                  </button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* BUNDLE / COMPLETE SET - Task 14/17 */}
      {relatedVolumes.length > 0 && (
        <section style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '3rem 0', color: 'white'}}>
          <div className="container" style={{maxWidth: '1200px', margin: '0 auto', padding: '0 2rem'}}>
            <div style={{textAlign: 'center', marginBottom: '2rem'}}>
              <h2 style={{fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem', textShadow: '2px 2px 4px rgba(0,0,0,0.2)'}}>
                {isRTL ? '📚 סט שלם - חסוך 15%!' :
                 currentLanguage === 'en' ? '📚 Complete Set - Save 15%!' :
                 currentLanguage === 'fr' ? '📚 Collection Complete - 15% de Remise!' :
                 currentLanguage === 'es' ? '📚 Colección Completa - ¡Ahorra 15%!' :
                 currentLanguage === 'ru' ? '📚 Полный Комплект - Скидка 15%!' :
                 '📚 Complete Set - Save 15%!'}
              </h2>
              <p style={{fontSize: '1.1rem', opacity: 0.95}}>
                {isRTL ? `קנה את כל ${bundleProducts.length} הכרכים בחבילה אחת` :
                 currentLanguage === 'en' ? `Get all ${bundleProducts.length} volumes in one bundle` :
                 currentLanguage === 'fr' ? `Obtenez les ${bundleProducts.length} volumes en un seul pack` :
                 currentLanguage === 'es' ? `Consigue los ${bundleProducts.length} volúmenes en un pack` :
                 currentLanguage === 'ru' ? `Получите все ${bundleProducts.length} томов в одном наборе` :
                 `Get all ${bundleProducts.length} volumes in one bundle`}
              </p>
            </div>

            {/* Bundle card */}
            <div style={{background: 'white', borderRadius: '20px', padding: '2.5rem', maxWidth: '900px', margin: '0 auto', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', color: '#333'}}>
              {/* Products in bundle */}
              <div style={{marginBottom: '2rem'}}>
                <h3 style={{fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '1rem', color: '#667eea', direction: isRTL ? 'rtl' : 'ltr'}}>
                  {isRTL ? 'הכלול בסט:' :
                   currentLanguage === 'en' ? 'Included in Set:' :
                   currentLanguage === 'fr' ? 'Inclus dans le Pack:' :
                   currentLanguage === 'es' ? 'Incluido en el Pack:' :
                   currentLanguage === 'ru' ? 'Включено в набор:' :
                   'Included in Set:'}
                </h3>
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem'}}>
                  {bundleProducts.map((bp, index) => (
                    <div key={bp.id} style={{display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', background: '#f8f9fa', borderRadius: '10px', border: '2px solid #e9ecef'}}>
                      <div style={{background: '#667eea', color: 'white', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.9rem', flexShrink: 0}}>
                        {index + 1}
                      </div>
                      <div style={{flex: 1, minWidth: 0}}>
                        <div style={{fontSize: '0.9rem', fontWeight: '600', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', direction: isRTL ? 'rtl' : 'ltr'}}>
                          {getInterfaceDisplayTitle(bp, currentLanguage)}
                        </div>
                        <div style={{fontSize: '0.8rem', color: '#6b7280'}}>
                          {(bp.variants?.[0]?.price || 0)} ₪
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing */}
              <div style={{borderTop: '2px dashed #dee2e6', paddingTop: '1.5rem', marginBottom: '1.5rem'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', fontSize: '1.1rem', direction: isRTL ? 'rtl' : 'ltr'}}>
                  <span style={{color: '#6b7280'}}>
                    {isRTL ? 'מחיר רגיל:' :
                     currentLanguage === 'en' ? 'Regular Price:' :
                     currentLanguage === 'fr' ? 'Prix Normal:' :
                     currentLanguage === 'es' ? 'Precio Normal:' :
                     currentLanguage === 'ru' ? 'Обычная цена:' :
                     'Regular Price:'}
                  </span>
                  <span style={{textDecoration: 'line-through', color: '#999'}}>
                    {bundleSubtotal} ₪
                  </span>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', fontSize: '1.1rem', color: '#10b981', fontWeight: '600', direction: isRTL ? 'rtl' : 'ltr'}}>
                  <span>
                    {isRTL ? 'חיסכון:' :
                     currentLanguage === 'en' ? 'You Save:' :
                     currentLanguage === 'fr' ? 'Économie:' :
                     currentLanguage === 'es' ? 'Ahorro:' :
                     currentLanguage === 'ru' ? 'Экономия:' :
                     'You Save:'}
                  </span>
                  <span>
                    -{bundleSavings} ₪ (15%)
                  </span>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '1.8rem', fontWeight: 'bold', color: '#667eea', direction: isRTL ? 'rtl' : 'ltr'}}>
                  <span>
                    {isRTL ? 'מחיר הסט:' :
                     currentLanguage === 'en' ? 'Bundle Price:' :
                     currentLanguage === 'fr' ? 'Prix du Pack:' :
                     currentLanguage === 'es' ? 'Precio del Pack:' :
                     currentLanguage === 'ru' ? 'Цена набора:' :
                     'Bundle Price:'}
                  </span>
                  <span>
                    {bundlePrice} ₪
                  </span>
                </div>
              </div>

              {/* Add to cart button */}
              <button
                onClick={() => {
                  // Add all bundle products to cart
                  bundleProducts.forEach(bp => {
                    const variant = bp.variants?.[0];
                    if (variant && variant.inStock) {
                      addItem({
                        productId: bp.id,
                        variantId: variant.id,
                        name: getInterfaceDisplayTitle(bp, currentLanguage),
                        nameEnglish: bp.nameEnglish || bp.name,
                        image: bp.images?.[0] || '',
                        price: variant.price,
                        quantity: 1,
                        variant: {
                          format: variant.format,
                          size: variant.size,
                          binding: variant.binding,
                          volumes: variant.volumes || 1,
                        },
                      });
                    }
                  });
                  toast({
                    title: isRTL ? '✅ הסט השלם נוסף לסל!' :
                           currentLanguage === 'en' ? '✅ Complete set added to cart!' :
                           currentLanguage === 'fr' ? '✅ Pack complet ajouté au panier!' :
                           currentLanguage === 'es' ? '✅ ¡Pack completo agregado!' :
                           currentLanguage === 'ru' ? '✅ Набор добавлен в корзину!' :
                           '✅ Complete set added to cart!',
                    description: isRTL ? `${bundleProducts.length} ספרים נוספו בהנחה של 15%` :
                                 currentLanguage === 'en' ? `${bundleProducts.length} books added with 15% discount` :
                                 currentLanguage === 'fr' ? `${bundleProducts.length} livres ajoutés avec 15% de réduction` :
                                 currentLanguage === 'es' ? `${bundleProducts.length} libros agregados con 15% de descuento` :
                                 currentLanguage === 'ru' ? `${bundleProducts.length} книг добавлено со скидкой 15%` :
                                 `${bundleProducts.length} books added with 15% discount`,
                  });
                }}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '1.2rem 2rem',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontSize: '1.3rem',
                  fontWeight: 'bold',
                  boxShadow: '0 8px 20px rgba(102,126,234,0.4)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(102,126,234,0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(102,126,234,0.4)';
                }}
              >
                {isRTL ? '🛒 הוסף סט שלם לסל' :
                 currentLanguage === 'en' ? '🛒 Add Complete Set to Cart' :
                 currentLanguage === 'fr' ? '🛒 Ajouter le Pack au Panier' :
                 currentLanguage === 'es' ? '🛒 Agregar Pack al Carrito' :
                 currentLanguage === 'ru' ? '🛒 Добавить набор в корзину' :
                 '🛒 Add Complete Set to Cart'}
              </button>

              {/* Trust badges */}
              <div style={{display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '1.5rem', flexWrap: 'wrap'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280', fontSize: '0.9rem'}}>
                  <Truck style={{width: '1.2rem', height: '1.2rem'}} />
                  <span>{reassuranceLabels.fastShipping}</span>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280', fontSize: '0.9rem'}}>
                  <Shield style={{width: '1.2rem', height: '1.2rem'}} />
                  <span>{reassuranceLabels.securePayment}</span>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280', fontSize: '0.9rem'}}>
                  <RotateCcw style={{width: '1.2rem', height: '1.2rem'}} />
                  <span>{reassuranceLabels.returnPolicy}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* RELATED PRODUCTS - same category first, 4 items */}
      <section style={{background: '#f8f9fa', padding: '3rem 0'}}>
        <div className="container" style={{maxWidth: '1200px', margin: '0 auto', padding: '0 2rem'}}>
          <h2 style={{fontSize: '2rem', fontWeight: 'bold', color: '#333', marginBottom: '2rem', textAlign: 'center'}}>
            {isRTL ? 'מוצרים דומים' :
             currentLanguage === 'en' ? 'Related Products' :
             currentLanguage === 'fr' ? 'Produits Similaires' :
             currentLanguage === 'es' ? 'Productos Similares' :
             currentLanguage === 'ru' ? 'Похожие Товары' : 'Related Products'}
          </h2>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem'}}>
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} style={{background: 'white', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', transition: 'transform 0.2s ease'}}>
                <a href={`/product/${relatedProduct.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                  <img loading="lazy"
                    decoding="async"
                    width="220"
                    height="200"
                    src={convertImagePath(relatedProduct.images && relatedProduct.images[0] || '')}
                    alt={[getInterfaceDisplayTitle(relatedProduct, currentLanguage), relatedProduct.author || productAuthor, relatedProduct.language || ''].filter(Boolean).join(' - ')}
                    style={{width: '100%', height: '200px', objectFit: 'cover'}}
                  />
                  <div style={{padding: '1.25rem'}}>
                    <h3 style={{fontSize: '1.05rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#333', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                      {getInterfaceDisplayTitle(relatedProduct, currentLanguage)}
                    </h3>
                    <div style={{fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.5rem'}}>
                      {getInterfaceCategoryName(relatedProduct.category, currentLanguage)}
                    </div>
                    <div style={{fontSize: '1.1rem', fontWeight: 'bold', color: '#dc3545', marginBottom: '1rem'}}>
                      {(relatedProduct.variants && relatedProduct.variants[0] || {price: 0}).price} ₪
                    </div>
                    <button style={{background: '#dc3545', color: 'white', border: 'none', padding: '0.7rem 1rem', borderRadius: '5px', cursor: 'pointer', width: '100%', fontWeight: 'bold', fontSize: '0.9rem'}}>
                      {isRTL ? 'צפה במוצר' :
                       currentLanguage === 'en' ? 'View Product' :
                       currentLanguage === 'fr' ? 'Voir le Produit' :
                       currentLanguage === 'es' ? 'Ver Producto' :
                       currentLanguage === 'ru' ? 'Посмотреть' : 'View Product'}
                    </button>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RECENTLY VIEWED */}
      {recentlyViewed.length > 0 && (
        <section style={{background: 'white', padding: '2rem 0', borderTop: '1px solid #eee'}}>
          <div className="container" style={{maxWidth: '1200px', margin: '0 auto', padding: '0 2rem'}}>
            <h3 style={{fontSize: '1.3rem', fontWeight: '600', color: '#666', marginBottom: '1rem'}}>
              {isRTL ? 'צפית לאחרונה' :
               currentLanguage === 'fr' ? 'Vus Récemment' :
               currentLanguage === 'es' ? 'Vistos Recientemente' :
               currentLanguage === 'ru' ? 'Недавно Просмотренные' : 'Recently Viewed'}
            </h3>
            <div style={{display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem'}}>
              {recentlyViewed.map((p) => (
                <a key={p.id} href={`/product/${p.id}`} style={{textDecoration: 'none', color: 'inherit', flexShrink: 0, width: '140px'}}>
                  <img loading="lazy" decoding="async" width="140" height="140"
                    src={convertImagePath(p.images?.[0] || '')}
                    alt={[getInterfaceDisplayTitle(p, currentLanguage), p.author || productAuthor, p.language || ''].filter(Boolean).join(' - ')}
                    style={{width: '140px', height: '140px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #eee'}}
                  />
                  <div style={{fontSize: '0.8rem', fontWeight: '600', marginTop: '0.5rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                    {getInterfaceDisplayTitle(p, currentLanguage)}
                  </div>
                  <div style={{fontSize: '0.75rem', color: '#dc3545', fontWeight: 'bold'}}>
                    {(p.variants?.[0] || {price: 0}).price} ₪
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* STICKY ADD TO CART - MOBILE ONLY */}
      <div
        className="md:hidden"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'white',
          borderTop: '1px solid #ddd',
          padding: '0.75rem 1rem',
          zIndex: 50,
          boxShadow: '0 -4px 12px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}
      >
        <div style={{flex: '0 0 auto'}}>
          <span style={{fontSize: '1.25rem', fontWeight: 'bold', color: '#dc3545'}}>
            {(currentVariant.price * quantity).toFixed(0)} ₪
          </span>
        </div>
        <button
          onClick={handleAddToCart}
          disabled={!currentVariant.inStock}
          style={{
            flex: 1,
            background: currentVariant.inStock ? '#dc3545' : '#999',
            color: 'white',
            border: 'none',
            padding: '0.85rem 1rem',
            borderRadius: '8px',
            cursor: currentVariant.inStock ? 'pointer' : 'not-allowed',
            fontSize: '1rem',
            fontWeight: 'bold'
          }}
        >
          {currentVariant.inStock
            ? (isRTL ? 'הוספה לסל' :
               currentLanguage === 'fr' ? 'Ajouter au panier' :
               currentLanguage === 'es' ? 'Agregar al carrito' :
               currentLanguage === 'ru' ? 'В корзину' :
               'Add to cart')
            : (isRTL ? 'אזל מהמלאי' :
               currentLanguage === 'fr' ? 'Rupture de stock' :
               currentLanguage === 'es' ? 'Agotado' :
               currentLanguage === 'ru' ? 'Нет в наличии' :
               'Out of stock')
          }
        </button>
      </div>
    </div>

    {/* Lightbox / Fullscreen Image Viewer */}
    {lightboxOpen && product.images && (
      <div
        style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: 'rgba(0,0,0,0.92)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
        }}
        onClick={() => setLightboxOpen(false)}
      >
        {/* Close button */}
        <button
          onClick={() => setLightboxOpen(false)}
          style={{
            position: 'absolute', top: '20px', right: '20px',
            background: 'rgba(255,255,255,0.15)', border: 'none',
            color: 'white', fontSize: '28px', width: '44px', height: '44px',
            borderRadius: '50%', cursor: 'pointer', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
          }}
          aria-label="Close"
        >
          ✕
        </button>

        {/* Prev arrow */}
        {product.images.length > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); setSelectedImage(i => i > 0 ? i - 1 : product.images!.length - 1); }}
            style={{
              position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.15)', border: 'none',
              color: 'white', fontSize: '24px', width: '44px', height: '44px',
              borderRadius: '50%', cursor: 'pointer',
            }}
            aria-label="Previous image"
          >
            ‹
          </button>
        )}

        {/* Main image */}
        <img
          src={convertImagePath(product.images[selectedImage] || '')}
          alt={descriptiveAlt}
          onClick={(e) => e.stopPropagation()}
          style={{
            maxWidth: '90vw', maxHeight: '85vh',
            objectFit: 'contain', borderRadius: '8px',
            cursor: 'default',
          }}
        />

        {/* Next arrow */}
        {product.images.length > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); setSelectedImage(i => i < product.images!.length - 1 ? i + 1 : 0); }}
            style={{
              position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.15)', border: 'none',
              color: 'white', fontSize: '24px', width: '44px', height: '44px',
              borderRadius: '50%', cursor: 'pointer',
            }}
            aria-label="Next image"
          >
            ›
          </button>
        )}

        {/* Image counter */}
        {product.images.length > 1 && (
          <div style={{
            position: 'absolute', bottom: '20px',
            color: 'rgba(255,255,255,0.7)', fontSize: '14px',
          }}>
            {selectedImage + 1} / {product.images.length}
          </div>
        )}
      </div>
    )}
    </>
  );
}
