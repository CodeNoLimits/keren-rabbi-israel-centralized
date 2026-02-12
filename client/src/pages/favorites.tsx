import { useMemo, useState } from 'react';
import { Link } from 'wouter';
import { Header } from '../components/Header';
import { ProductVariantModal } from '../components/ProductVariantModal';
import { useFavorites } from '../contexts/FavoritesContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { realBreslovProducts } from '../data/products';
import { getInterfaceDisplayTitle, getInterfaceCategoryName } from '../utils/bookTitleHelper';
import { convertImagePath } from '../utils/imagePathHelper';
import { Heart, ShoppingCart, Trash2, ArrowRight, Share2, GitCompareArrows, X, Mail } from 'lucide-react';

export default function Favorites() {
  const { favorites, toggleFavorite } = useFavorites();
  const { currentLanguage } = useLanguage();
  const { addItem, setIsCartOpen } = useCart();
  const isRTL = currentLanguage === 'he';
  const [compareIds, setCompareIds] = useState<Set<string>>(new Set());
  const [showCompare, setShowCompare] = useState(false);
  const [variantModalProduct, setVariantModalProduct] = useState<any | null>(null);

  const favoriteProducts = useMemo(() => {
    return Array.from(favorites)
      .map(id => realBreslovProducts[id])
      .filter(Boolean);
  }, [favorites]);

  const toggleCompare = (id: string) => {
    setCompareIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); } else if (next.size < 3) { next.add(id); }
      return next;
    });
  };

  const compareProducts = useMemo(() =>
    Array.from(compareIds).map(id => realBreslovProducts[id]).filter(Boolean),
    [compareIds]
  );

  const t = {
    title: isRTL ? 'המועדפים שלי' : currentLanguage === 'fr' ? 'Mes Favoris' : currentLanguage === 'es' ? 'Mis Favoritos' : currentLanguage === 'ru' ? 'Мои Избранные' : 'My Favorites',
    empty: isRTL ? 'אין מוצרים מועדפים' : currentLanguage === 'fr' ? 'Aucun favori' : currentLanguage === 'es' ? 'Sin favoritos' : currentLanguage === 'ru' ? 'Нет избранных' : 'No favorites yet',
    emptyDesc: isRTL ? 'הוסיפו מוצרים למועדפים בלחיצה על הלב' : currentLanguage === 'fr' ? 'Ajoutez des produits en cliquant sur le cœur' : 'Add products by clicking the heart icon',
    browseStore: isRTL ? 'לחנות' : currentLanguage === 'fr' ? 'Voir la Boutique' : 'Browse Store',
    addToCart: isRTL ? 'הוסף לסל' : currentLanguage === 'fr' ? 'Ajouter au panier' : 'Add to Cart',
    remove: isRTL ? 'הסר' : currentLanguage === 'fr' ? 'Supprimer' : 'Remove',
    viewProduct: isRTL ? 'צפה במוצר' : currentLanguage === 'fr' ? 'Voir le produit' : 'View Product',
    itemCount: (n: number) => isRTL ? `${n} מוצרים` : `${n} items`,
    share: isRTL ? 'שתף מועדפים' : currentLanguage === 'fr' ? 'Partager les favoris' : 'Share Favorites',
    shareWhatsApp: isRTL ? 'שתף ב-WhatsApp' : currentLanguage === 'fr' ? 'Partager sur WhatsApp' : 'Share on WhatsApp',
    shareEmail: isRTL ? 'שתף באימייל' : currentLanguage === 'fr' ? 'Partager par email' : 'Share via Email',
    compare: isRTL ? 'השווה' : currentLanguage === 'fr' ? 'Comparer' : 'Compare',
    compareSelected: isRTL ? 'השווה נבחרים' : currentLanguage === 'fr' ? 'Comparer la sélection' : 'Compare Selected',
    selectToCompare: isRTL ? 'בחר עד 3 מוצרים להשוואה' : currentLanguage === 'fr' ? 'Sélectionnez jusqu\'à 3 produits' : 'Select up to 3 products to compare',
    price: isRTL ? 'מחיר' : currentLanguage === 'fr' ? 'Prix' : 'Price',
    category: isRTL ? 'קטגוריה' : currentLanguage === 'fr' ? 'Catégorie' : 'Category',
    variants: isRTL ? 'אפשרויות' : currentLanguage === 'fr' ? 'Variantes' : 'Variants',
    pages: isRTL ? 'עמודים' : currentLanguage === 'fr' ? 'Pages' : 'Pages',
    language: isRTL ? 'שפה' : currentLanguage === 'fr' ? 'Langue' : 'Language',
    close: isRTL ? 'סגור' : currentLanguage === 'fr' ? 'Fermer' : 'Close',
  };

  // Task 46: Share favorites via WhatsApp
  const handleShareFavorites = () => {
    const lines = favoriteProducts.map(p => {
      const title = getInterfaceDisplayTitle(p, currentLanguage);
      const price = p.variants?.[0]?.price ? `${p.variants[0].price}₪` : '';
      const url = `https://haesh-sheli-new.vercel.app/product/${p.id}`;
      return `${title} ${price}\n${url}`;
    });
    const header = isRTL ? '❤️ הספרים המועדפים שלי מהאש שלי:' : '❤️ My favorite books from HaEsh Sheli:';
    const text = `${header}\n\n${lines.join('\n\n')}`;
    const waUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
  };

  // Task 46: Share favorites via Email
  const handleEmailShare = () => {
    const lines = favoriteProducts.map(p => {
      const title = getInterfaceDisplayTitle(p, currentLanguage);
      const price = p.variants?.[0]?.price ? `${p.variants[0].price}₪` : '';
      const url = `https://haesh-sheli-new.vercel.app/product/${p.id}`;
      return `${title} - ${price}\n${url}`;
    });
    const subject = isRTL ? 'המלצת ספרים מהאש שלי' : 'Book recommendations from HaEsh Sheli';
    const header = isRTL ? '❤️ הספרים המועדפים שלי:' : '❤️ My favorite books:';
    const body = `${header}\n\n${lines.join('\n\n')}\n\n---\nהאש שלי - ספרי ברסלב\nhttps://haesh-sheli-new.vercel.app`;
    const mailto = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  };

  const handleAddToCart = (product: any) => {
    // Task 1.1: Always open variant selector modal on "Add to Cart" to ensure user chooses size
    setVariantModalProduct(product);
  };

  return (
    <div style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
      <Header currentLanguage={currentLanguage} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        {/* Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
          <Heart size={28} fill="#ef4444" stroke="#ef4444" />
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333' }}>{t.title}</h1>
          {favoriteProducts.length > 0 && (
            <>
              <span style={{ fontSize: '0.9rem', color: '#999', marginTop: '0.25rem' }}>
                ({t.itemCount(favoriteProducts.length)})
              </span>
              <div style={{ marginInlineStart: 'auto', display: 'flex', gap: '0.5rem' }}>
                <button onClick={handleShareFavorites} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#25D366', color: 'white', border: 'none', borderRadius: '8px', padding: '0.5rem 1rem', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '600' }} aria-label={t.shareWhatsApp} title={t.shareWhatsApp}>
                  <Share2 size={16} />
                  WhatsApp
                </button>
                <button onClick={handleEmailShare} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', padding: '0.5rem 1rem', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '600' }} aria-label={t.shareEmail} title={t.shareEmail}>
                  <Mail size={16} />
                  Email
                </button>
              </div>
              {favoriteProducts.length >= 2 && (
                <button
                  onClick={() => setShowCompare(!showCompare)}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: showCompare ? '#3b82f6' : 'white', color: showCompare ? 'white' : '#3b82f6', border: '2px solid #3b82f6', borderRadius: '8px', padding: '0.5rem 1rem', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '600', transition: 'all 0.2s' }}
                >
                  <GitCompareArrows size={16} />
                  {t.compare}
                  {compareIds.size > 0 && ` (${compareIds.size})`}
                </button>
              )}
            </>
          )}
        </div>

        {favoriteProducts.length === 0 ? (
          /* Empty state */
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            background: '#f9fafb',
            borderRadius: '12px',
            border: '2px dashed #e5e7eb',
          }}>
            <Heart size={64} stroke="#d1d5db" fill="none" style={{ margin: '0 auto 1rem' }} />
            <h2 style={{ fontSize: '1.3rem', color: '#6b7280', marginBottom: '0.5rem' }}>{t.empty}</h2>
            <p style={{ color: '#9ca3af', marginBottom: '1.5rem' }}>{t.emptyDesc}</p>
            <Link href="/store">
              <button style={{
                background: '#3b82f6',
                color: 'white',
                border: 'none',
                padding: '0.75rem 2rem',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}>
                {t.browseStore} <ArrowRight size={18} />
              </button>
            </Link>
          </div>
        ) : (
          <>
            {showCompare && (
              <div style={{ background: '#eff6ff', border: '2px solid #3b82f6', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem', textAlign: 'center' }}>
                <p style={{ color: '#1e40af', fontSize: '0.95rem', marginBottom: '0.5rem' }}>{t.selectToCompare}</p>
                {compareIds.size >= 2 && (
                  <button
                    onClick={() => { if (compareProducts.length >= 2) { /* modal will be added */ } }}
                    style={{ background: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', padding: '0.6rem 1.5rem', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    <GitCompareArrows size={16} />
                    {t.compareSelected} ({compareIds.size})
                  </button>
                )}
              </div>
            )}
            {/* Favorites grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '1.5rem',
            }}>
              {favoriteProducts.map((product) => (
                <div key={product.id} style={{
                  background: 'white',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  border: compareIds.has(product.id) ? '3px solid #3b82f6' : '1px solid #e5e7eb',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                }}>
                {showCompare && (
                  <div style={{ position: 'absolute', top: '0.5rem', insetInlineStart: '0.5rem', zIndex: 10 }}>
                    <input
                      type="checkbox"
                      checked={compareIds.has(product.id)}
                      onChange={() => toggleCompare(product.id)}
                      disabled={!compareIds.has(product.id) && compareIds.size >= 3}
                      style={{ width: '24px', height: '24px', cursor: 'pointer', accentColor: '#3b82f6' }}
                      aria-label={`${t.compare} ${getInterfaceDisplayTitle(product, currentLanguage)}`}
                    />
                  </div>
                )}
                <Link href={`/product/${product.id}`}>
                  <div style={{ position: 'relative', aspectRatio: '1', overflow: 'hidden', cursor: 'pointer' }}>
                    <img
                      loading="lazy"
                      src={convertImagePath(product.images?.[0] || '')}
                      alt={getInterfaceDisplayTitle(product, currentLanguage)}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                </Link>

                <div style={{ padding: '1rem' }}>
                  <Link href={`/product/${product.id}`}>
                    <h3 style={{
                      fontSize: '1rem', fontWeight: '600', color: '#333',
                      marginBottom: '0.25rem', cursor: 'pointer',
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>
                      {getInterfaceDisplayTitle(product, currentLanguage)}
                    </h3>
                  </Link>
                  <div style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                    {getInterfaceCategoryName(product.category, currentLanguage)}
                  </div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#2563eb', marginBottom: '0.75rem' }}>
                    {product.variants?.[0]?.price ? `${product.variants[0].price} ₪` : ''}
                    {product.variants && product.variants.length > 1 && (
                      <span style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: 'normal', marginInlineStart: '0.5rem' }}>
                        +{product.variants.length - 1} {isRTL ? 'אפשרויות' : 'more'}
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => handleAddToCart(product)}
                      style={{
                        flex: 1, background: '#2563eb', color: 'white', border: 'none',
                        padding: '0.6rem', borderRadius: '8px', cursor: 'pointer',
                        fontSize: '0.85rem', fontWeight: '600',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
                      }}
                    >
                      <ShoppingCart size={16} /> {t.addToCart}
                    </button>
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      style={{
                        background: '#fef2f2', color: '#ef4444', border: '1px solid #fecaca',
                        padding: '0.6rem 0.75rem', borderRadius: '8px', cursor: 'pointer',
                        display: 'flex', alignItems: 'center',
                      }}
                      title={t.remove}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            </div>
          </>
        )}

        {/* Task 47: Comparison Modal */}
        {compareProducts.length >= 2 && (
          <div
            style={{
              position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 50,
              display: compareProducts.length >= 2 && compareIds.size >= 2 ? 'flex' : 'none',
              alignItems: 'center', justifyContent: 'center', padding: '1rem',
            }}
            onClick={(e) => { if (e.target === e.currentTarget) setCompareIds(new Set()); }}
          >
            <div style={{
              background: 'white', borderRadius: '16px', maxWidth: '1000px', width: '100%',
              maxHeight: '90vh', overflow: 'auto', padding: '2rem', direction: isRTL ? 'rtl' : 'ltr',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333' }}>{t.compare}</h2>
                <button onClick={() => setCompareIds(new Set())} style={{ background: '#f3f4f6', border: 'none', borderRadius: '8px', padding: '0.5rem', cursor: 'pointer' }}>
                  <X size={20} />
                </button>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                      <th style={{ padding: '1rem', textAlign: isRTL ? 'right' : 'left', fontWeight: '600', color: '#6b7280' }}></th>
                      {compareProducts.map(p => (
                        <th key={p.id} style={{ padding: '1rem', textAlign: 'center', minWidth: '200px' }}>
                          <img src={convertImagePath(p.images?.[0] || '')} alt={getInterfaceDisplayTitle(p, currentLanguage)} style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '8px', marginBottom: '0.5rem' }} />
                          <div style={{ fontWeight: 'bold', color: '#333', fontSize: '0.95rem' }}>{getInterfaceDisplayTitle(p, currentLanguage)}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                      <td style={{ padding: '1rem', fontWeight: '600', color: '#6b7280' }}>{t.price}</td>
                      {compareProducts.map(p => (
                        <td key={p.id} style={{ padding: '1rem', textAlign: 'center', color: '#2563eb', fontWeight: 'bold' }}>
                          {p.variants?.[0]?.price ? `${p.variants[0].price} ₪` : '-'}
                        </td>
                      ))}
                    </tr>
                    <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                      <td style={{ padding: '1rem', fontWeight: '600', color: '#6b7280' }}>{t.category}</td>
                      {compareProducts.map(p => (
                        <td key={p.id} style={{ padding: '1rem', textAlign: 'center', color: '#333' }}>
                          {getInterfaceCategoryName(p.category, currentLanguage)}
                        </td>
                      ))}
                    </tr>
                    <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                      <td style={{ padding: '1rem', fontWeight: '600', color: '#6b7280' }}>{t.variants}</td>
                      {compareProducts.map(p => (
                        <td key={p.id} style={{ padding: '1rem', textAlign: 'center', color: '#333' }}>
                          {p.variants?.length || 0} {isRTL ? 'אפשרויות' : 'options'}
                        </td>
                      ))}
                    </tr>
                    <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                      <td style={{ padding: '1rem', fontWeight: '600', color: '#6b7280' }}>{t.pages}</td>
                      {compareProducts.map(p => (
                        <td key={p.id} style={{ padding: '1rem', textAlign: 'center', color: '#333' }}>
                          {p.pages || '-'}
                        </td>
                      ))}
                    </tr>
                    <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                      <td style={{ padding: '1rem', fontWeight: '600', color: '#6b7280' }}>{t.language}</td>
                      {compareProducts.map(p => (
                        <td key={p.id} style={{ padding: '1rem', textAlign: 'center', color: '#333' }}>
                          {p.language}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td style={{ padding: '1rem', fontWeight: '600', color: '#6b7280' }}></td>
                      {compareProducts.map(p => (
                        <td key={p.id} style={{ padding: '1rem', textAlign: 'center' }}>
                          <Link href={`/product/${p.id}`}>
                            <button style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600', width: '100%' }}>
                              {t.viewProduct}
                            </button>
                          </Link>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {variantModalProduct && (
        <ProductVariantModal 
          product={variantModalProduct} 
          isOpen={!!variantModalProduct} 
          onClose={() => setVariantModalProduct(null)} 
        />
      )}
    </div>
  );
}
