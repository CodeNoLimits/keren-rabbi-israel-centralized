import { useState } from 'react';
import { useRoute } from 'wouter';
import { realBreslovProducts } from '../data/realProducts';
import { useCart } from '../contexts/CartContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { getInterfaceDisplayTitle, getInterfaceDisplayDescription, getInterfaceCategoryName } from '../utils/bookTitleHelper';
import { convertImagePath } from '../utils/imagePathHelper';
import type { Product } from '../../../shared/schema';

export default function Product() {
  const [match, params] = useRoute('/product/:id');
  const [selectedVariant, setSelectedVariant] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
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

  return (
    <div className={isRTL ? 'rtl' : 'ltr'} style={{direction: isRTL ? 'rtl' : 'ltr'}}>
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
              <div style={{marginBottom: '1rem'}}>
                <img loading="lazy"
                  src={convertImagePath(product.images && product.images[selectedImage] || '')}
                  alt={displayTitle}
                  style={{width: '100%', height: '500px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #ddd'}}
                />
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

              <div style={{display: 'flex', alignItems: 'center', marginBottom: '1.5rem'}}>
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
                  onClick={() => {
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
                  }}
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
                  {currentVariant.inStock
                    ? (isRTL ? `הוספה לסל - ${(currentVariant.price * quantity).toFixed(2)} ₪` :
                       currentLanguage === 'en' ? `Add to cart - ${(currentVariant.price * quantity).toFixed(2)} ₪` :
                       currentLanguage === 'fr' ? `Ajouter au panier - ${(currentVariant.price * quantity).toFixed(2)} ₪` :
                       currentLanguage === 'es' ? `Agregar al carrito - ${(currentVariant.price * quantity).toFixed(2)} ₪` :
                       currentLanguage === 'ru' ? `В корзину - ${(currentVariant.price * quantity).toFixed(2)} ₪` :
                       `Add to cart - ${(currentVariant.price * quantity).toFixed(2)} ₪`)
                    : (isRTL ? 'אזל מהמלאי' : currentLanguage === 'en' ? 'Out of stock' : currentLanguage === 'fr' ? 'Rupture de stock' : currentLanguage === 'es' ? 'Agotado' : currentLanguage === 'ru' ? 'Нет в наличии' : 'Out of stock')
                  }
                </button>
              </div>

              {/* PRODUCT FEATURES */}
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

              {/* PRODUCT DETAILS */}
              <div style={{background: '#f8f9fa', padding: '1.5rem', borderRadius: '8px'}}>
                <h3 style={{fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#333'}}>
                  {isRTL ? 'פרטי המוצר:' :
                   currentLanguage === 'en' ? 'Product Details:' :
                   currentLanguage === 'fr' ? 'Details du produit :' :
                   currentLanguage === 'es' ? 'Detalles del producto:' :
                   currentLanguage === 'ru' ? 'Детали продукта:' : 'Product Details:'}
                </h3>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', fontSize: '0.9rem'}}>
                  <div><strong>{isRTL ? 'שפה:' : currentLanguage === 'en' ? 'Language:' : currentLanguage === 'fr' ? 'Langue :' : currentLanguage === 'es' ? 'Idioma:' : currentLanguage === 'ru' ? 'Язык:' : 'Language:'}</strong> {product.language}</div>
                  <div><strong>{isRTL ? 'הוצאה:' : currentLanguage === 'en' ? 'Publisher:' : currentLanguage === 'fr' ? 'Editeur :' : currentLanguage === 'es' ? 'Editorial:' : currentLanguage === 'ru' ? 'Издатель:' : 'Publisher:'}</strong> {product.publisher}</div>
                  {product.pages && <div><strong>{isRTL ? 'עמודים:' : currentLanguage === 'en' ? 'Pages:' : currentLanguage === 'fr' ? 'Pages :' : currentLanguage === 'es' ? 'Paginas:' : currentLanguage === 'ru' ? 'Страниц:' : 'Pages:'}</strong> {product.pages}</div>}
                  {product.isbn && <div><strong>ISBN:</strong> {product.isbn}</div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED PRODUCTS */}
      <section style={{background: '#f8f9fa', padding: '3rem 0'}}>
        <div className="container" style={{maxWidth: '1200px', margin: '0 auto', padding: '0 2rem'}}>
          <h2 style={{fontSize: '2rem', fontWeight: 'bold', color: '#333', marginBottom: '2rem', textAlign: 'center'}}>
            {isRTL ? 'מוצרים דומים' :
             currentLanguage === 'en' ? 'Related Products' :
             currentLanguage === 'fr' ? 'Produits Similaires' :
             currentLanguage === 'es' ? 'Productos Similares' :
             currentLanguage === 'ru' ? 'Похожие Товары' : 'Related Products'}
          </h2>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem'}}>
            {Object.values(realBreslovProducts).filter(p => p.id !== product.id).slice(0, 3).map((relatedProduct) => (
              <div key={relatedProduct.id} style={{background: 'white', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.1)'}}>
                <img loading="lazy"
                  src={(relatedProduct.images && relatedProduct.images[0] || '').replace('@assets/', '/attached_assets/')}
                  alt={getInterfaceDisplayTitle(relatedProduct, currentLanguage)}
                  style={{width: '100%', height: '200px', objectFit: 'cover'}}
                />
                <div style={{padding: '1.5rem'}}>
                  <h3 style={{fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#333'}}>
                    {getInterfaceDisplayTitle(relatedProduct, currentLanguage)}
                  </h3>
                  <div style={{fontSize: '1.1rem', fontWeight: 'bold', color: '#dc3545', marginBottom: '1rem'}}>
                    {(relatedProduct.variants && relatedProduct.variants[0] || {price: 0}).price} ₪
                  </div>
                  <a href={`/product/${relatedProduct.id}`} style={{textDecoration: 'none'}}>
                    <button style={{background: '#dc3545', color: 'white', border: 'none', padding: '0.8rem 1rem', borderRadius: '5px', cursor: 'pointer', width: '100%', fontWeight: 'bold'}}>
                      {isRTL ? 'צפה במוצר' :
                       currentLanguage === 'en' ? 'View Product' :
                       currentLanguage === 'fr' ? 'Voir le Produit' :
                       currentLanguage === 'es' ? 'Ver Producto' :
                       currentLanguage === 'ru' ? 'Посмотреть' : 'View Product'}
                    </button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}