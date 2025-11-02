import { useState } from 'react';
import { useRoute } from 'wouter';
import { realBreslovProducts } from '../data/realProducts';
import { useCart } from '../contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { getBookDisplayTitle, getInterfaceDisplayTitle } from '../utils/bookTitleHelper';
import { convertImagePath } from '../utils/imagePathHelper';
import { useLanguage } from '../contexts/LanguageContext';
import { Header } from '../components/Header';
import type { Product } from '../../../shared/schema';

export default function Product() {
  const [match, params] = useRoute('/product/:id');
  const [selectedVariant, setSelectedVariant] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem } = useCart();
  const { toast } = useToast();
  const { currentLanguage, setLanguage, t } = useLanguage();

  if (!match || !params?.id) {
    return <div>{t('error')}: {t('noResults')}</div>;
  }

  const product = realBreslovProducts[params.id];
  
  if (!product) {
    return <div>{t('error')}: {t('noResults')}</div>;
  }

  const variants = product.variants || [];
  const currentVariant = variants.find(v => v.id === selectedVariant) || variants[0];
  
  if (!currentVariant) {
    return <div>{t('error')}: Variant not found</div>;
  }

  return (
    <div className="product-page page-template-default" style={{direction: currentLanguage === 'he' ? 'rtl' : 'ltr'}}>
      <section style={{background: '#333', color: 'white', padding: '8px 0'}}>
        <div style={{maxWidth: '1400px', margin: '0 auto', padding: '0 2rem'}}>
          <span>{t('shippingBanner')}</span>
        </div>
      </section>

      <Header currentLanguage={currentLanguage} onLanguageChange={setLanguage} />

      {/* BREADCRUMBS */}
      <section style={{background: '#f8f9fa', padding: '1rem 0', borderBottom: '1px solid #ddd'}}>
        <div className="container" style={{maxWidth: '1200px', margin: '0 auto', padding: '0 2rem'}}>
          <nav style={{fontSize: '0.9rem', color: '#666'}}>
            <a href="/" style={{color: '#dc3545', textDecoration: 'none'}}>{t('home')}</a>
            <span style={{margin: '0 0.5rem'}}>←</span>
            <a href="/store" style={{color: '#dc3545', textDecoration: 'none'}}>{t('store')}</a>
            <span style={{margin: '0 0.5rem'}}>←</span>
            <span style={{color: '#999'}}>{getInterfaceDisplayTitle(product, currentLanguage)}</span>
          </nav>
        </div>
      </section>

      {/* MAIN PRODUCT CONTENT */}
      <section style={{background: 'white', padding: '3rem 0'}}>
        <div className="container" style={{maxWidth: '1200px', margin: '0 auto', padding: '0 2rem'}}>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start'}}>
            
            {/* PRODUCT IMAGES */}
            <div>
              <div style={{marginBottom: '1rem'}}>
                <img 
                  src={convertImagePath(product.images && product.images[selectedImage] || '')} 
                  alt={getBookDisplayTitle(product)}
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
                      <img 
                        src={convertImagePath(image)} 
                        alt={`${getBookDisplayTitle(product)} ${index + 1}`}
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
                  {product.category}
                </span>
              </div>

              <h1 style={{fontSize: '2.5rem', fontWeight: '700', color: '#1a1a1a', marginBottom: '1rem', lineHeight: '1.3'}}>
                {getInterfaceDisplayTitle(product, currentLanguage)}
              </h1>

              <div style={{display: 'flex', alignItems: 'center', marginBottom: '1.5rem', gap: '0.8rem'}}>
                <div style={{color: '#ffc107', fontSize: '1.3rem'}}>
                  ★★★★★
                </div>
                <span style={{color: '#555', fontSize: '1rem', fontWeight: '500'}}>{t('ratedOutOf')} (23 {currentLanguage === 'fr' ? 'avis' : currentLanguage === 'en' ? 'reviews' : 'ביקורות'})</span>
              </div>

              <div style={{fontSize: '2.3rem', fontWeight: '700', color: '#dc3545', marginBottom: '2rem', maxWidth: '100%'}}>
                <span style={{display: 'inline-block', verticalAlign: 'middle'}}>
                  {currentVariant.price} ₪
                </span>
                {currentVariant.originalPrice && (
                  <span style={{textDecoration: 'line-through', color: '#999', fontSize: '1.6rem', marginRight: '1rem', display: 'inline-block', verticalAlign: 'middle'}}>
                    {currentVariant.originalPrice} ₪
                  </span>
                )}
              </div>

              <p style={{fontSize: '1.15rem', color: '#333', lineHeight: '1.8', marginBottom: '2rem', fontWeight: '500'}}>
                {product.description}
              </p>

              {/* VARIANT SELECTION */}
              <div style={{marginBottom: '2rem'}}>
                <h3 style={{fontSize: '1.3rem', fontWeight: '700', marginBottom: '1.2rem', color: '#222', letterSpacing: '-0.3px'}}>
                  {currentLanguage === 'fr' ? 'Choisissez la taille et la reliure:' :
                   currentLanguage === 'en' ? 'Choose size and binding:' :
                   currentLanguage === 'es' ? 'Elija tamaño y encuadernación:' :
                   currentLanguage === 'ru' ? 'Выберите размер и переплет:' :
                   'בחר גודל וכריכה:'}
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
                        <div style={{fontWeight: '700', fontSize: '1.1rem', color: '#222', marginBottom: '0.3rem'}}>
                          {variant.format} {variant.binding} - {variant.size}
                        </div>
                        <div style={{fontSize: '1rem', color: '#555', lineHeight: '1.5', marginBottom: '0.3rem'}}>
                          {variant.dimensions} • {variant.volumes === 1 ?
                            (currentLanguage === 'fr' ? '1 volume' : currentLanguage === 'en' ? '1 volume' : 'חלק אחד') :
                            `${variant.volumes} ${currentLanguage === 'fr' ? 'volumes' : currentLanguage === 'en' ? 'volumes' : 'כרכים'}`}
                        </div>
                        <div style={{fontSize: '0.95rem', fontWeight: '600', color: variant.inStock ? '#28a745' : '#dc3545'}}>
                          {variant.inStock ?
                            (currentLanguage === 'fr' ? 'En stock' : currentLanguage === 'en' ? 'In stock' : 'במלאי') :
                            (currentLanguage === 'fr' ? 'Rupture de stock' : currentLanguage === 'en' ? 'Out of stock' : 'אזל מהמלאי')}
                        </div>
                      </div>
                      <div style={{fontSize: '1.2rem', fontWeight: 'bold', color: '#dc3545', minWidth: '80px', textAlign: 'left', flexShrink: 0}}>
                        <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap'}}>
                          <span>{variant.price}₪</span>
                          {variant.originalPrice && (
                            <span style={{textDecoration: 'line-through', color: '#999', fontSize: '0.9rem'}}>
                              {variant.originalPrice}₪
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
                  <label style={{fontWeight: '700', color: '#222', fontSize: '1.05rem'}}>
                    {currentLanguage === 'fr' ? 'Quantité:' : currentLanguage === 'en' ? 'Quantity:' : currentLanguage === 'es' ? 'Cantidad:' : currentLanguage === 'ru' ? 'Количество:' : 'כמות:'}
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
                        name: getInterfaceDisplayTitle(product, currentLanguage),
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
                        title: currentLanguage === 'fr' ? "Ajouté au panier !" : currentLanguage === 'en' ? "Added to cart!" : "נוסף לסל הקניות!",
                        description: `${getInterfaceDisplayTitle(product, currentLanguage)} ${currentLanguage === 'fr' ? 'ajouté avec succès au panier' : currentLanguage === 'en' ? 'successfully added to cart' : 'נוסף בהצלחה לסל'}`,
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
                  {currentVariant.inStock ? 
                    (currentLanguage === 'fr' ? `Ajouter au panier - ${(currentVariant.price * quantity).toFixed(2)} ₪` :
                     currentLanguage === 'en' ? `Add to cart - ${(currentVariant.price * quantity).toFixed(2)} ₪` :
                     `הוספה לסל - ${(currentVariant.price * quantity).toFixed(2)} ₪`) : 
                    (currentLanguage === 'fr' ? 'Rupture de stock' : currentLanguage === 'en' ? 'Out of stock' : 'אזל מהמלאי')
                  }
                </button>
              </div>

              {/* PRODUCT FEATURES */}
              <div style={{marginBottom: '2rem'}}>
                <h3 style={{fontSize: '1.4rem', fontWeight: '700', marginBottom: '1.5rem', color: '#222', letterSpacing: '-0.3px'}}>
                  {currentLanguage === 'fr' ? 'Caractéristiques spéciales:' :
                   currentLanguage === 'en' ? 'Special features:' :
                   currentLanguage === 'es' ? 'Características especiales:' :
                   currentLanguage === 'ru' ? 'Особые характеристики:' :
                   'מאפיינים מיוחדים:'}
                </h3>
                <ul style={{listStyle: 'none', padding: 0}}>
                  {(product.features || []).map((feature, index) => (
                    <li key={index} style={{marginBottom: '0.8rem', paddingRight: '2rem', position: 'relative', fontSize: '1.05rem', color: '#333', lineHeight: '1.6', fontWeight: '500'}}>
                      <span style={{position: 'absolute', right: 0, top: '0.2rem', color: '#dc3545', fontWeight: 'bold', fontSize: '1.3rem'}}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* PRODUCT DETAILS */}
              <div style={{background: '#f8f9fa', padding: '2rem', borderRadius: '8px', border: '1px solid #e5e7eb'}}>
                <h3 style={{fontSize: '1.4rem', fontWeight: '700', marginBottom: '1.5rem', color: '#222', letterSpacing: '-0.3px'}}>
                  {currentLanguage === 'fr' ? 'Détails du produit:' :
                   currentLanguage === 'en' ? 'Product details:' :
                   currentLanguage === 'es' ? 'Detalles del producto:' :
                   currentLanguage === 'ru' ? 'Детали продукта:' :
                   'פרטי המוצר:'}
                </h3>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem', fontSize: '1.02rem', lineHeight: '1.8', color: '#333'}}>
                  <div><strong style={{fontWeight: '600', color: '#222'}}>{currentLanguage === 'fr' ? 'Langue:' : currentLanguage === 'en' ? 'Language:' : currentLanguage === 'es' ? 'Idioma:' : currentLanguage === 'ru' ? 'Язык:' : 'שפה:'}</strong> {product.language}</div>
                  <div><strong style={{fontWeight: '600', color: '#222'}}>{currentLanguage === 'fr' ? 'Éditeur:' : currentLanguage === 'en' ? 'Publisher:' : currentLanguage === 'es' ? 'Editor:' : currentLanguage === 'ru' ? 'Издатель:' : 'הוצאה:'}</strong> {product.publisher}</div>
                  {product.pages && <div><strong style={{fontWeight: '600', color: '#222'}}>{currentLanguage === 'fr' ? 'Pages:' : currentLanguage === 'en' ? 'Pages:' : currentLanguage === 'es' ? 'Páginas:' : currentLanguage === 'ru' ? 'Страницы:' : 'עמודים:'}</strong> {product.pages}</div>}
                  {product.isbn && <div><strong style={{fontWeight: '600', color: '#222'}}>ISBN:</strong> {product.isbn}</div>}
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
            {currentLanguage === 'fr' ? 'Produits similaires' :
             currentLanguage === 'en' ? 'Similar products' :
             currentLanguage === 'es' ? 'Productos similares' :
             currentLanguage === 'ru' ? 'Похожие продукты' :
             'מוצרים דומים'}
          </h2>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem'}}>
            {Object.values(realBreslovProducts).filter(p => p.id !== product.id).slice(0, 3).map((relatedProduct) => (
              <div key={relatedProduct.id} style={{background: 'white', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.1)'}}>
                <img 
                  src={(relatedProduct.images && relatedProduct.images[0] || '').replace('@assets/', '/attached_assets/')} 
                  alt={relatedProduct.name}
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
                      {t('viewProduct')}
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
