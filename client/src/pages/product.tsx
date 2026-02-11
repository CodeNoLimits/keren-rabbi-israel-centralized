import { useState, useCallback, useRef } from 'react';
import { useRoute } from 'wouter';
import { realBreslovProducts } from '../data/realProducts';
import { useCart } from '../contexts/CartContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { getInterfaceDisplayTitle, getInterfaceDisplayDescription, getInterfaceCategoryName } from '../utils/bookTitleHelper';
import { convertImagePath } from '../utils/imagePathHelper';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Truck, Shield, RotateCcw, Star } from 'lucide-react';
import type { Product } from '../../../shared/schema';

export default function Product() {
  const [match, params] = useRoute('/product/:id');
  const [selectedVariant, setSelectedVariant] = useState<string>('');
  const [linkCopied, setLinkCopied] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();
  const { toast } = useToast();
  const { currentLanguage } = useLanguage();

  if (!match || !params?.id) {
    return <div>{currentLanguage === 'he' ? 'מוצר לא נמצא' : 'Product not found'}</div>;
  }

  const product = realBreslovProducts[params.id];

  if (!product) {
    return <div>{currentLanguage === 'he' ? 'מוצר לא נמצא' : 'Product not found'}</div>;
  }

  const variants = product.variants || [];
  const currentVariant = variants.find(v => v.id === selectedVariant) || variants[0];

  if (!currentVariant) {
    return <div>{currentLanguage === 'he' ? 'שגיאה: לא נמצאו גרסאות למוצר' : 'Error: No variants found'}</div>;
  }

  const displayTitle = getInterfaceDisplayTitle(product, currentLanguage);
  const displayDescription = getInterfaceDisplayDescription(product, currentLanguage);
  const displayCategory = getInterfaceCategoryName(product.category, currentLanguage);
  const isRTL = currentLanguage === 'he';

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

  // Related products: prefer same category, then fill with others, show 4 total
  const allProducts = Object.values(realBreslovProducts).filter(p => p.id !== product.id);
  const sameCategoryProducts = allProducts.filter(p => p.category === product.category);
  const otherProducts = allProducts.filter(p => p.category !== product.category);
  const relatedProducts = [...sameCategoryProducts, ...otherProducts].slice(0, 4);

  return (
    <div className={isRTL ? 'rtl' : 'ltr'} style={{direction: isRTL ? 'rtl' : 'ltr', paddingBottom: '80px'}}>
      {/* pb-[80px] reserves space for sticky mobile bar */}

      {/* TOP BAR */}
      <section className="elementor-section elementor-top-section elementor-element elementor-element-ba655d5 elementor-section-full_width elementor-hidden-tablet elementor-hidden-mobile elementor-section-height-default" style={{background: '#333', color: 'white', padding: '8px 0'}}>
        <div className="elementor-container elementor-column-gap-default">
          <div className="elementor-column elementor-col-33 elementor-top-column">
            <div className="elementor-widget-wrap elementor-element-populated">
              <div className="elementor-element elementor-icon-list--layout-inline elementor-align-left elementor-list-item-link-full_width elementor-widget elementor-widget-icon-list">
                <div className="elementor-widget-container">
                  <ul className="elementor-icon-list-items elementor-inline-items" style={{display: 'flex', gap: '1rem', listStyle: 'none', margin: 0, padding: 0}}>
                    <li className="elementor-icon-list-item elementor-inline-item" style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                      <span className="elementor-icon-list-text">{navLabels.freeShipping}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HEADER */}
      <section className="elementor-section elementor-top-section elementor-element elementor-element-ba655d5 elementor-section-full_width elementor-hidden-tablet elementor-hidden-mobile" style={{background: '#dc3545', padding: '1rem 0'}}>
        <div className="elementor-container elementor-column-gap-default" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div className="elementor-column elementor-col-25 elementor-top-column elementor-element elementor-element-8cf799f">
            <div className="elementor-widget-wrap elementor-element-populated">
              <div className="elementor-element elementor-widget elementor-widget-theme-site-logo elementor-widget-image">
                <div className="elementor-widget-container">
                  <a href="/">
                    <img loading="lazy"
                      width="185"
                      height="300"
                      src="https://www.haesh-sheli.co.il/wp-content/uploads/2021/12/cropped-%D7%A7%D7%A8%D7%95-%D7%A8%D7%91%D7%99-%D7%99%D7%A9%D7%A8%D7%90%D7%9C-%D7%91%D7%A8-%D7%90%D7%95%D7%93%D7%A1%D7%A8.d110a0.webp"
                      className="attachment-full size-full wp-image-27"
                      alt="האש שלי תוקף עד ביאת המשיח"
                      style={{height: '80px', width: 'auto'}}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="elementor-column elementor-col-33 elementor-top-column">
            <nav aria-label={isRTL ? 'תפריט' : 'Navigation'} style={{textAlign: 'center'}}>
              <ul style={{display: 'flex', gap: '1.5rem', listStyle: 'none', margin: 0, padding: 0, flexWrap: 'wrap'}}>
                <li><a href="/" style={{color: 'white', textDecoration: 'none', fontSize: '0.9rem'}}>{navLabels.home}</a></li>
                <li><a href="/store" style={{color: 'white', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 'bold'}}>{navLabels.store}</a></li>
                <li><a href="/about" style={{color: 'white', textDecoration: 'none', fontSize: '0.9rem'}}>{navLabels.about}</a></li>
                <li><a href="/downloads" style={{color: 'white', textDecoration: 'none', fontSize: '0.9rem'}}>{navLabels.downloads}</a></li>
                <li><a href="/contact" style={{color: 'white', textDecoration: 'none', fontSize: '0.9rem'}}>{navLabels.contact}</a></li>
              </ul>
            </nav>
          </div>

          <div className="elementor-column elementor-col-16" style={{maxWidth: '120px'}}>
            <div style={{textAlign: 'left'}}>
              <a href="#" style={{background: 'white', color: '#dc3545', padding: '0.3rem 0.6rem', borderRadius: '4px', textDecoration: 'none', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem'}}>
                <span>0.00 ₪</span>
                <span>0</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{width: '14px', height: '14px', fill: 'currentColor'}}>
                  <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* BREADCRUMBS */}
      <section style={{background: '#f8f9fa', padding: '1rem 0', borderBottom: '1px solid #ddd'}}>
        <div className="container" style={{maxWidth: '1200px', margin: '0 auto', padding: '0 2rem'}}>
          <nav style={{fontSize: '0.9rem', color: '#666'}}>
            <a href="/" style={{color: '#dc3545', textDecoration: 'none'}}>{navLabels.home}</a>
            <span style={{margin: '0 0.5rem'}}>{isRTL ? '\u2190' : '\u2192'}</span>
            <a href="/store" style={{color: '#dc3545', textDecoration: 'none'}}>{navLabels.store}</a>
            <span style={{margin: '0 0.5rem'}}>{isRTL ? '\u2190' : '\u2192'}</span>
            <span style={{color: '#999'}}>{displayTitle}</span>
          </nav>
        </div>
      </section>

      {/* MAIN PRODUCT CONTENT */}
      <section style={{background: 'white', padding: '3rem 0'}}>
        <div className="container" style={{maxWidth: '1200px', margin: '0 auto', padding: '0 2rem'}}>
          <div className="grid grid-cols-1 md:grid-cols-2" style={{gap: '4rem', alignItems: 'start'}}>

            {/* PRODUCT IMAGES */}
            <div>
              <div
                ref={imageContainerRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleTouchToggle}
                style={{
                  marginBottom: '1rem',
                  overflow: 'hidden',
                  borderRadius: '10px',
                  border: '1px solid #ddd',
                  cursor: isZoomed ? 'zoom-out' : 'zoom-in',
                  position: 'relative',
                }}
              >
                <img loading="lazy"
                  src={convertImagePath(product.images && product.images[selectedImage] || '')}
                  alt={displayTitle}
                  draggable={false}
                  style={{
                    width: '100%',
                    height: '500px',
                    objectFit: 'cover',
                    transform: isZoomed ? 'scale(2)' : 'scale(1)',
                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    transition: isZoomed ? 'transform-origin 0.05s ease-out, transform 0.3s ease' : 'transform 0.3s ease',
                    pointerEvents: 'none',
                  }}
                />
                {/* Zoom hint icon - hidden when zoomed */}
                {!isZoomed && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      right: '12px',
                      background: 'rgba(0,0,0,0.5)',
                      color: 'white',
                      borderRadius: '50%',
                      width: '36px',
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      pointerEvents: 'none',
                      transition: 'opacity 0.3s ease',
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      <line x1="11" y1="8" x2="11" y2="14" />
                      <line x1="8" y1="11" x2="14" y2="11" />
                    </svg>
                  </div>
                )}
              </div>

              {product.images && product.images.length > 1 && (
                <div style={{display: 'flex', gap: '0.5rem', justifyContent: 'center'}}>
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      style={{
                        border: selectedImage === index ? '2px solid #dc3545' : '1px solid #ddd',
                        borderRadius: '5px',
                        padding: '2px',
                        background: 'white',
                        cursor: 'pointer'
                      }}
                    >
                      <img loading="lazy"
                        src={convertImagePath(image)}
                        alt={`${displayTitle} ${index + 1}`}
                        style={{width: '60px', height: '60px', objectFit: 'cover', borderRadius: '3px'}}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* PRODUCT INFO */}
            <div>
              <div style={{marginBottom: '1rem'}}>
                <span style={{background: '#dc3545', color: 'white', padding: '0.3rem 0.8rem', borderRadius: '15px', fontSize: '0.8rem', fontWeight: 'bold'}}>
                  {displayCategory}
                </span>
              </div>

              <h1 style={{fontSize: '2.5rem', fontWeight: 'bold', color: '#333', marginBottom: '1rem'}}>
                {displayTitle}
              </h1>

              <div style={{display: 'flex', alignItems: 'center', marginBottom: '1rem'}}>
                <div style={{color: '#ffc107', fontSize: '1.2rem', marginLeft: '0.5rem'}}>
                  {'\u2605\u2605\u2605\u2605\u2605'}
                </div>
                <span style={{color: '#666', fontSize: '0.9rem'}}>
                  {isRTL ? 'דורג 5.00 מתוך 5 (23 ביקורות)' :
                   currentLanguage === 'en' ? 'Rated 5.00 out of 5 (23 reviews)' :
                   currentLanguage === 'fr' ? 'Note 5.00 sur 5 (23 avis)' :
                   currentLanguage === 'es' ? 'Calificado 5.00 de 5 (23 resenas)' :
                   currentLanguage === 'ru' ? 'Оценка 5.00 из 5 (23 отзыва)' : 'Rated 5.00 out of 5 (23 reviews)'}
                </span>
              </div>

              {/* SOCIAL SHARE BUTTONS */}
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                {/* WhatsApp Share */}
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + productUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    background: '#25D366',
                    color: 'white',
                    padding: '0.4rem 0.75rem',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    fontSize: '0.8rem',
                    fontWeight: '500',
                    transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  {shareLabels.shareWhatsApp}
                </a>

                {/* Facebook Share */}
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    background: '#1877F2',
                    color: 'white',
                    padding: '0.4rem 0.75rem',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    fontSize: '0.8rem',
                    fontWeight: '500',
                    transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  {shareLabels.shareFacebook}
                </a>

                {/* Copy Link */}
                <button
                  onClick={handleCopyLink}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    background: linkCopied ? '#10B981' : '#6b7280',
                    color: 'white',
                    padding: '0.4rem 0.75rem',
                    borderRadius: '6px',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    fontWeight: '500',
                    transition: 'background 0.2s, opacity 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {linkCopied ? (
                      <polyline points="20 6 9 17 4 12" />
                    ) : (
                      <>
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </>
                    )}
                  </svg>
                  {linkCopied ? shareLabels.linkCopied : shareLabels.copyLink}
                </button>
              </div>

              <div style={{fontSize: '2rem', fontWeight: 'bold', color: '#dc3545', marginBottom: '2rem', maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                <span style={{display: 'inline-block', verticalAlign: 'middle'}}>
                  {currentVariant.price} ₪
                </span>
                {currentVariant.originalPrice && (
                  <span style={{textDecoration: 'line-through', color: '#999', fontSize: '1.5rem', marginRight: '1rem', display: 'inline-block', verticalAlign: 'middle'}}>
                    {currentVariant.originalPrice} ₪
                  </span>
                )}
              </div>

              <p style={{fontSize: '1.1rem', color: '#666', lineHeight: '1.6', marginBottom: '2rem'}}>
                {displayDescription}
              </p>

              {/* VARIANT SELECTION */}
              <div style={{marginBottom: '2rem'}}>
                <h3 style={{fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#333'}}>
                  {isRTL ? 'בחר גודל וכריכה:' :
                   currentLanguage === 'en' ? 'Choose size and binding:' :
                   currentLanguage === 'fr' ? 'Choisir taille et reliure :' :
                   currentLanguage === 'es' ? 'Elegir tamano y encuadernacion:' :
                   currentLanguage === 'ru' ? 'Выберите размер и переплет:' : 'Choose size and binding:'}
                </h3>
                <div style={{display: 'grid', gap: '0.8rem'}}>
                  {variants.map((variant) => (
                    <label
                      key={variant.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        padding: '1rem',
                        border: selectedVariant === variant.id ? '2px solid #dc3545' : '1px solid #ddd',
                        borderRadius: '8px',
                        cursor: variant.inStock ? 'pointer' : 'not-allowed',
                        opacity: variant.inStock ? 1 : 0.6,
                        background: selectedVariant === variant.id ? '#fef2f2' : 'white'
                      }}
                    >
                      <input
                        type="radio"
                        name="variant"
                        value={variant.id}
                        checked={selectedVariant === variant.id}
                        onChange={(e) => setSelectedVariant(e.target.value)}
                        disabled={!variant.inStock}
                        style={{margin: 0}}
                      />
                      <div style={{flex: 1}}>
                        <div style={{fontWeight: 'bold', fontSize: '1rem'}}>
                          {variant.format} {variant.binding} - {variant.size}
                        </div>
                        <div style={{fontSize: '0.9rem', color: '#666'}}>
                          {variant.dimensions} {'\u2022'} {variant.volumes === 1
                            ? (isRTL ? 'חלק אחד' : currentLanguage === 'en' ? '1 volume' : currentLanguage === 'fr' ? '1 volume' : currentLanguage === 'es' ? '1 volumen' : currentLanguage === 'ru' ? '1 том' : '1 volume')
                            : (isRTL ? `${variant.volumes} כרכים` : `${variant.volumes} ${currentLanguage === 'ru' ? 'томов' : 'volumes'}`)}
                        </div>
                        <div style={{fontSize: '0.8rem', color: variant.inStock ? '#28a745' : '#dc3545'}}>
                          {variant.inStock
                            ? (isRTL ? 'במלאי' : currentLanguage === 'en' ? 'In stock' : currentLanguage === 'fr' ? 'En stock' : currentLanguage === 'es' ? 'En stock' : currentLanguage === 'ru' ? 'В наличии' : 'In stock')
                            : (isRTL ? 'אזל מהמלאי' : currentLanguage === 'en' ? 'Out of stock' : currentLanguage === 'fr' ? 'Rupture de stock' : currentLanguage === 'es' ? 'Agotado' : currentLanguage === 'ru' ? 'Нет в наличии' : 'Out of stock')}
                        </div>
                      </div>
                      <div style={{fontSize: '1.2rem', fontWeight: 'bold', color: '#dc3545', minWidth: '80px', textAlign: 'left', flexShrink: 0}}>
                        <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap'}}>
                          <span>{variant.price}{'\u20AA'}</span>
                          {variant.originalPrice && (
                            <span style={{textDecoration: 'line-through', color: '#999', fontSize: '0.9rem'}}>
                              {variant.originalPrice}{'\u20AA'}
                            </span>
                          )}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

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

                <div style={{textAlign: 'center', padding: '2rem', border: '2px dashed #ddd', borderRadius: '10px', color: '#999'}}>
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
                    src={convertImagePath(relatedProduct.images && relatedProduct.images[0] || '')}
                    alt={getInterfaceDisplayTitle(relatedProduct, currentLanguage)}
                    style={{width: '100%', height: '200px', objectFit: 'cover'}}
                  />
                  <div style={{padding: '1.25rem'}}>
                    <h3 style={{fontSize: '1.05rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#333', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                      {getInterfaceDisplayTitle(relatedProduct, currentLanguage)}
                    </h3>
                    <div style={{fontSize: '0.8rem', color: '#999', marginBottom: '0.5rem'}}>
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
  );
}
