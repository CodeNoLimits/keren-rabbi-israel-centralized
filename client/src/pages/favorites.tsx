import { useMemo } from 'react';
import { Link } from 'wouter';
import { Header } from '../components/Header';
import { useFavorites } from '../contexts/FavoritesContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { realBreslovProducts } from '../data/realProducts';
import { getInterfaceDisplayTitle, getInterfaceCategoryName } from '../utils/bookTitleHelper';
import { convertImagePath } from '../utils/imagePathHelper';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';

export default function Favorites() {
  const { favorites, toggleFavorite } = useFavorites();
  const { currentLanguage } = useLanguage();
  const { addItem, setIsCartOpen } = useCart();
  const isRTL = currentLanguage === 'he';

  const favoriteProducts = useMemo(() => {
    return Array.from(favorites)
      .map(id => realBreslovProducts[id])
      .filter(Boolean);
  }, [favorites]);

  const t = {
    title: isRTL ? 'המועדפים שלי' : currentLanguage === 'fr' ? 'Mes Favoris' : currentLanguage === 'es' ? 'Mis Favoritos' : currentLanguage === 'ru' ? 'Мои Избранные' : 'My Favorites',
    empty: isRTL ? 'אין מוצרים מועדפים' : currentLanguage === 'fr' ? 'Aucun favori' : currentLanguage === 'es' ? 'Sin favoritos' : currentLanguage === 'ru' ? 'Нет избранных' : 'No favorites yet',
    emptyDesc: isRTL ? 'הוסיפו מוצרים למועדפים בלחיצה על הלב' : currentLanguage === 'fr' ? 'Ajoutez des produits en cliquant sur le cœur' : 'Add products by clicking the heart icon',
    browseStore: isRTL ? 'לחנות' : currentLanguage === 'fr' ? 'Voir la Boutique' : 'Browse Store',
    addToCart: isRTL ? 'הוסף לסל' : currentLanguage === 'fr' ? 'Ajouter au panier' : 'Add to Cart',
    remove: isRTL ? 'הסר' : currentLanguage === 'fr' ? 'Supprimer' : 'Remove',
    viewProduct: isRTL ? 'צפה במוצר' : currentLanguage === 'fr' ? 'Voir le produit' : 'View Product',
    itemCount: (n: number) => isRTL ? `${n} מוצרים` : `${n} items`,
  };

  const handleAddToCart = (product: any) => {
    if (product.variants?.length > 0) {
      const defaultVariant = product.variants[0];
      addItem({
        productId: product.id,
        variantId: defaultVariant.id || `${product.id}-default`,
        name: product.name,
        nameEnglish: product.nameEnglish || product.name,
        variant: {
          format: defaultVariant.format || '',
          binding: defaultVariant.binding || '',
          size: defaultVariant.size || '',
        },
        price: defaultVariant.price,
        quantity: 1,
        image: product.images?.[0] || '',
      });
      setIsCartOpen(true);
    }
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
            <span style={{ fontSize: '0.9rem', color: '#999', marginTop: '0.25rem' }}>
              ({t.itemCount(favoriteProducts.length)})
            </span>
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
          /* Favorites grid */
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
                border: '1px solid #e5e7eb',
                transition: 'all 0.2s ease',
              }}>
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
        )}
      </div>
    </div>
  );
}
