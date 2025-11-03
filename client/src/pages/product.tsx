import { useState } from 'react';
import { useRoute } from 'wouter';
import { realBreslovProducts } from '../data/realProducts';
import { useCart } from '../contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { getBookDisplayTitle } from '../utils/bookTitleHelper';
import { convertImagePath } from '../utils/imagePathHelper';
import type { Product } from '../../../shared/schema';

export default function Product() {
  const [match, params] = useRoute('/product/:id');
  const [selectedVariant, setSelectedVariant] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem } = useCart();
  const { toast } = useToast();

  if (!match || !params?.id) {
    return <div>מוצר לא נמצא</div>;
  }

  const product = realBreslovProducts[params.id];
  
  if (!product) {
    return <div>מוצר לא נמצא</div>;
  }

  const variants = product.variants || [];
  const currentVariant = variants.find(v => v.id === selectedVariant) || variants[0];
  
  if (!currentVariant) {
    return <div>שגיאה: לא נמצאו גרסאות למוצר</div>;
  }

  return (
    <div className="rtl product-page page-template-default">
      {/* TOP BAR */}
      <section className="elementor-section elementor-top-section elementor-element elementor-element-ba655d5 elementor-section-full_width elementor-hidden-tablet elementor-hidden-mobile elementor-section-height-default" style={{background: '#333', color: 'white', padding: '8px 0'}}>
        <div className="elementor-container elementor-column-gap-default">
          <div className="elementor-column elementor-col-33 elementor-top-column">
            <div className="elementor-widget-wrap elementor-element-populated">
              <div className="elementor-element elementor-icon-list--layout-inline elementor-align-left elementor-list-item-link-full_width elementor-widget elementor-widget-icon-list">
                <div className="elementor-widget-container">
                  <ul className="elementor-icon-list-items elementor-inline-items" style={{display: 'flex', gap: '1rem', listStyle: 'none', margin: 0, padding: 0}}>
                    <li className="elementor-icon-list-item elementor-inline-item" style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                      <span className="elementor-icon-list-text">משלוחים חינם החל מ- 399 ש"ח</span>
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
                    <img 
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
            <nav aria-label="תפריט" style={{textAlign: 'center'}}>
              <ul style={{display: 'flex', gap: '1.5rem', listStyle: 'none', margin: 0, padding: 0, flexWrap: 'wrap'}}>
                <li><a href="/" style={{color: 'white', textDecoration: 'none', fontSize: '0.9rem'}}>דף הבית</a></li>
                <li><a href="/store" style={{color: 'white', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 'bold'}}>חנות</a></li>
                <li><a href="/about" style={{color: 'white', textDecoration: 'none', fontSize: '0.9rem'}}>עלינו</a></li>
                <li><a href="/downloads" style={{color: 'white', textDecoration: 'none', fontSize: '0.9rem'}}>הורדות</a></li>
                <li><a href="/contact" style={{color: 'white', textDecoration: 'none', fontSize: '0.9rem'}}>צור קשר</a></li>
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
            <a href="/" style={{color: '#dc3545', textDecoration: 'none'}}>דף הבית</a>
            <span style={{margin: '0 0.5rem'}}>←</span>
            <a href="/store" style={{color: '#dc3545', textDecoration: 'none'}}>חנות</a>
            <span style={{margin: '0 0.5rem'}}>←</span>
            <span style={{color: '#999'}}>{getBookDisplayTitle(product)}</span>
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

              <h1 style={{fontSize: '2.5rem', fontWeight: 'bold', color: '#333', marginBottom: '1rem'}}>
                {getBookDisplayTitle(product)}
              </h1>

              <div style={{display: 'flex', alignItems: 'center', marginBottom: '1.5rem'}}>
                <div style={{color: '#ffc107', fontSize: '1.2rem', marginLeft: '0.5rem'}}>
                  ★★★★★
                </div>
                <span style={{color: '#666', fontSize: '0.9rem'}}>דורג 5.00 מתוך 5 (23 ביקורות)</span>
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
                {product.description}
              </p>

              {/* VARIANT SELECTION */}
              <div style={{marginBottom: '2rem'}}>
                <h3 style={{fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#333'}}>
                  בחר גודל וכריכה:
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
                          {variant.dimensions} • {variant.volumes === 1 ? 'חלק אחד' : `${variant.volumes} כרכים`}
                        </div>
                        <div style={{fontSize: '0.8rem', color: variant.inStock ? '#28a745' : '#dc3545'}}>
                          {variant.inStock ? 'במלאי' : 'אזל מהמלאי'}
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
                  <label style={{fontWeight: 'bold', color: '#333'}}>כמות:</label>
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
                        name: getBookDisplayTitle(product),
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
                        title: "נוסף לסל הקניות!",
                        description: `${getBookDisplayTitle(product)} נוסף בהצלחה לסל`,
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
                    `הוספה לסל - ${(currentVariant.price * quantity).toFixed(2)} ₪` : 
                    'אזל מהמלאי'
                  }
                </button>
              </div>

              {/* PRODUCT FEATURES */}
              <div style={{marginBottom: '2rem'}}>
                <h3 style={{fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#333'}}>
                  מאפיינים מיוחדים:
                </h3>
                <ul style={{listStyle: 'none', padding: 0}}>
                  {(product.features || []).map((feature, index) => (
                    <li key={index} style={{marginBottom: '0.5rem', paddingRight: '1.5rem', position: 'relative'}}>
                      <span style={{position: 'absolute', right: 0, top: 0, color: '#dc3545', fontWeight: 'bold'}}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* PRODUCT DETAILS */}
              <div style={{background: '#f8f9fa', padding: '1.5rem', borderRadius: '8px'}}>
                <h3 style={{fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#333'}}>
                  פרטי המוצר:
                </h3>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', fontSize: '0.9rem'}}>
                  <div><strong>שפה:</strong> {product.language}</div>
                  <div><strong>הוצאה:</strong> {product.publisher}</div>
                  {product.pages && <div><strong>עמודים:</strong> {product.pages}</div>}
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
            מוצרים דומים
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
                    {relatedProduct.name}
                  </h3>
                  <div style={{fontSize: '1.1rem', fontWeight: 'bold', color: '#dc3545', marginBottom: '1rem'}}>
                    {(relatedProduct.variants && relatedProduct.variants[0] || {price: 0}).price} ₪
                  </div>
                  <a href={`/product/${relatedProduct.id}`} style={{textDecoration: 'none'}}>
                    <button style={{background: '#dc3545', color: 'white', border: 'none', padding: '0.8rem 1rem', borderRadius: '5px', cursor: 'pointer', width: '100%', fontWeight: 'bold'}}>
                      צפה במוצר
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