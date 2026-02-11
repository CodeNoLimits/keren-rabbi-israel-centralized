import React, { useState, useEffect } from 'react';
import { X, ShoppingCart, Minus, Plus, Check } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { convertImagePath } from '../utils/imagePathHelper';
import { getBookDisplayTitle } from '../utils/bookTitleHelper';
import type { Product, ProductVariant } from '../../../shared/schema';

interface ProductVariantModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const modalTranslations = {
  he: {
    selectVariant: 'בחר גודל וכריכה',
    size: 'גודל',
    format: 'כריכה',
    price: 'מחיר',
    quantity: 'כמות',
    addToCart: 'הוספה לסל',
    addedToCart: 'נוסף לסל!',
    addedDesc: 'נוסף בהצלחה לסל הקניות',
    outOfStock: 'אזל מהמלאי',
    inStock: 'במלאי',
    volumes: 'כרכים',
    volume: 'חלק אחד',
    dimensions: 'מידות',
    total: 'סה"כ',
    close: 'סגור',
  },
  en: {
    selectVariant: 'Select Size & Binding',
    size: 'Size',
    format: 'Binding',
    price: 'Price',
    quantity: 'Quantity',
    addToCart: 'Add to Cart',
    addedToCart: 'Added to Cart!',
    addedDesc: 'Successfully added to your cart',
    outOfStock: 'Out of Stock',
    inStock: 'In Stock',
    volumes: 'volumes',
    volume: 'single volume',
    dimensions: 'Dimensions',
    total: 'Total',
    close: 'Close',
  },
  fr: {
    selectVariant: 'Choisir Taille et Reliure',
    size: 'Taille',
    format: 'Reliure',
    price: 'Prix',
    quantity: 'Quantite',
    addToCart: 'Ajouter au Panier',
    addedToCart: 'Ajoute au Panier!',
    addedDesc: 'Ajoute avec succes a votre panier',
    outOfStock: 'Rupture de Stock',
    inStock: 'En Stock',
    volumes: 'volumes',
    volume: 'volume unique',
    dimensions: 'Dimensions',
    total: 'Total',
    close: 'Fermer',
  },
  es: {
    selectVariant: 'Seleccionar Tamano y Encuadernacion',
    size: 'Tamano',
    format: 'Encuadernacion',
    price: 'Precio',
    quantity: 'Cantidad',
    addToCart: 'Agregar al Carrito',
    addedToCart: 'Agregado al Carrito!',
    addedDesc: 'Agregado exitosamente a su carrito',
    outOfStock: 'Agotado',
    inStock: 'En Stock',
    volumes: 'volumenes',
    volume: 'volumen unico',
    dimensions: 'Dimensiones',
    total: 'Total',
    close: 'Cerrar',
  },
  ru: {
    selectVariant: 'Vybrat Razmer i Pereplet',
    size: 'Razmer',
    format: 'Pereplet',
    price: 'Tsena',
    quantity: 'Kolichestvo',
    addToCart: 'Dobavit v Korzinu',
    addedToCart: 'Dobavleno v Korzinu!',
    addedDesc: 'Uspeshno dobavleno v vashu korzinu',
    outOfStock: 'Net v nalichii',
    inStock: 'V nalichii',
    volumes: 'tomov',
    volume: 'odin tom',
    dimensions: 'Razmery',
    total: 'Itogo',
    close: 'Zakryt',
  },
};

// Group variants by size for Temu-style selection
function groupVariantsBySize(variants: ProductVariant[]): Record<string, ProductVariant[]> {
  const groups: Record<string, ProductVariant[]> = {};
  variants.forEach(v => {
    const size = v.size || 'default';
    if (!groups[size]) groups[size] = [];
    groups[size].push(v);
  });
  return groups;
}

// Get unique sizes preserving order
function getUniqueSizes(variants: ProductVariant[]): string[] {
  const seen = new Set<string>();
  const sizes: string[] = [];
  variants.forEach(v => {
    const size = v.size || 'default';
    if (!seen.has(size)) {
      seen.add(size);
      sizes.push(size);
    }
  });
  return sizes;
}

// Get unique formats for a given size
function getFormatsForSize(variants: ProductVariant[], size: string): ProductVariant[] {
  return variants.filter(v => (v.size || 'default') === size);
}

export function ProductVariantModal({ product, isOpen, onClose }: ProductVariantModalProps) {
  const { addItem, setIsCartOpen } = useCart();
  const { currentLanguage } = useLanguage();
  const { toast } = useToast();

  const t = modalTranslations[currentLanguage as keyof typeof modalTranslations] || modalTranslations.he;
  const isRTL = currentLanguage === 'he';

  const variants = product.variants || [];
  const sizes = getUniqueSizes(variants);

  const [selectedSize, setSelectedSize] = useState<string>(sizes[0] || '');
  const [selectedVariantId, setSelectedVariantId] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedSize(sizes[0] || '');
      setQuantity(1);
      setJustAdded(false);
      setSelectedImage(0);
    }
  }, [isOpen]);

  // Auto-select first format when size changes
  useEffect(() => {
    if (selectedSize) {
      const formatsForSize = getFormatsForSize(variants, selectedSize);
      if (formatsForSize.length > 0) {
        setSelectedVariantId(formatsForSize[0].id);
      }
    }
  }, [selectedSize, variants]);

  if (!isOpen) return null;

  const formatsForSelectedSize = getFormatsForSize(variants, selectedSize);
  const currentVariant = variants.find(v => v.id === selectedVariantId) || formatsForSelectedSize[0];

  if (!currentVariant) return null;

  const totalPrice = currentVariant.price * quantity;
  const displayTitle = getBookDisplayTitle(product);

  const handleAddToCart = () => {
    if (!currentVariant.inStock) return;

    addItem({
      productId: product.id,
      variantId: currentVariant.id,
      name: displayTitle,
      nameEnglish: product.nameEnglish || product.name,
      image: product.images?.[0] ? convertImagePath(product.images[0]) : '',
      price: currentVariant.price,
      quantity: quantity,
      variant: {
        format: currentVariant.format,
        binding: currentVariant.binding,
        size: currentVariant.size
      }
    });

    setJustAdded(true);
    toast({
      title: t.addedToCart,
      description: `${displayTitle} - ${t.addedDesc}`,
    });

    setTimeout(() => {
      setJustAdded(false);
      onClose();
      setIsCartOpen(true);
    }, 800);
  };

  // Size chip colors
  const sizeColors: Record<string, string> = {
    'default': 'bg-gray-100 text-gray-800 border-gray-300',
  };
  const getSizeColor = (size: string, isSelected: boolean) => {
    if (isSelected) return 'bg-red-600 text-white border-red-600 shadow-lg scale-105';
    return 'bg-white text-gray-800 border-gray-300 hover:border-red-400 hover:bg-red-50';
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center"
      onClick={onClose}
      dir={isRTL ? 'rtl' : 'ltr'}
      role="dialog"
      aria-modal="true"
      aria-labelledby="variant-modal-title"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />

      {/* Modal - slides up on mobile, centered on desktop */}
      <div
        className="relative z-10 w-full max-w-xl bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/90 hover:bg-gray-100 shadow-md transition-all duration-200 hover:scale-110"
          aria-label={t.close}
        >
          <X className="h-5 w-5 text-gray-600" />
        </button>

        {/* Product header with image */}
        <div className="flex gap-4 p-4 pb-2 border-b border-gray-100">
          {/* Thumbnail image */}
          <div className="flex-shrink-0 w-28 h-28 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shadow-sm">
            {product.images && product.images.length > 0 ? (
              <img
                loading="lazy"
                decoding="async"
                src={convertImagePath(product.images[selectedImage] || product.images[0])}
                alt={displayTitle}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-3xl">
                <span>&#128214;</span>
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="flex-1 min-w-0 pt-1">
            <h3 id="variant-modal-title" className="font-bold text-lg text-gray-900 line-clamp-2 mb-1">
              {displayTitle}
            </h3>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-2xl font-bold text-red-600">
                {currentVariant.price} <span className="text-base">{'\u20AA'}</span>
              </span>
              {currentVariant.originalPrice && (
                <span className="text-sm line-through text-gray-400">
                  {currentVariant.originalPrice} {'\u20AA'}
                </span>
              )}
            </div>
            <div className="text-xs text-gray-500">
              {currentVariant.dimensions && `${t.dimensions}: ${currentVariant.dimensions}`}
              {currentVariant.volumes && currentVariant.volumes > 1
                ? ` | ${currentVariant.volumes} ${t.volumes}`
                : currentVariant.volumes === 1 ? ` | ${t.volume}` : ''}
            </div>
            <div className={`text-xs font-medium mt-1 ${currentVariant.inStock ? 'text-green-600' : 'text-red-500'}`}>
              {currentVariant.inStock ? t.inStock : t.outOfStock}
            </div>
          </div>
        </div>

        {/* Quick View Content - Description and Features */}
        <div className="px-4 py-3 bg-gray-50/50 border-b border-gray-100">
          <p className="text-sm text-gray-600 line-clamp-3 mb-2 italic">
            {currentLanguage === 'en' ? product.descriptionEnglish :
             currentLanguage === 'fr' ? product.descriptionFrench :
             currentLanguage === 'es' ? product.descriptionSpanish :
             currentLanguage === 'ru' ? product.descriptionRussian : product.description}
          </p>
          {product.features && product.features.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {product.features.slice(0, 3).map((f, i) => (
                <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-medium border border-blue-100">
                  <Check className="w-2.5 h-2.5" />
                  {f}
                </span>
              ))}
            </div>
          )}
          <div className="mt-3">
            <a 
              href={`/product/${product.id}`}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 underline transition-colors"
              onClick={onClose}
            >
              {currentLanguage === 'he' ? 'צפייה בפרטים המלאים' : 'View full details'}
            </a>
          </div>
        </div>

        {/* Size Selection - Temu-style chips */}
        {sizes.length > 1 && (
          <div className="px-4 pt-4 pb-2">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">{t.size}</h4>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => {
                const isSelected = selectedSize === size;
                const sizeVariants = getFormatsForSize(variants, size);
                const minPrice = Math.min(...sizeVariants.map(v => v.price));
                const hasStock = sizeVariants.some(v => v.inStock);

                return (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    disabled={!hasStock}
                    className={`
                      relative px-4 py-2 rounded-lg border-2 text-sm font-medium
                      transition-all duration-200
                      ${getSizeColor(size, isSelected)}
                      ${!hasStock ? 'opacity-40 cursor-not-allowed line-through' : 'cursor-pointer'}
                    `}
                  >
                    <div className="flex items-center gap-1">
                      {isSelected && <Check className="h-3.5 w-3.5" />}
                      <span>{size}</span>
                    </div>
                    <div className="text-xs opacity-75 mt-0.5">{minPrice} {'\u20AA'}</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Format/Binding Selection - Temu-style chips */}
        {formatsForSelectedSize.length > 1 && (
          <div className="px-4 pt-2 pb-2">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">{t.format}</h4>
            <div className="flex flex-wrap gap-2">
              {formatsForSelectedSize.map((variant) => {
                const isSelected = selectedVariantId === variant.id;
                return (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariantId(variant.id)}
                    disabled={!variant.inStock}
                    className={`
                      relative px-4 py-2 rounded-lg border-2 text-sm font-medium
                      transition-all duration-200
                      ${isSelected
                        ? 'bg-red-600 text-white border-red-600 shadow-lg scale-105'
                        : 'bg-white text-gray-800 border-gray-300 hover:border-red-400 hover:bg-red-50'}
                      ${!variant.inStock ? 'opacity-40 cursor-not-allowed line-through' : 'cursor-pointer'}
                    `}
                  >
                    <div className="flex items-center gap-1">
                      {isSelected && <Check className="h-3.5 w-3.5" />}
                      <span>{variant.format}</span>
                    </div>
                    <div className="text-xs opacity-75 mt-0.5">{variant.price} {'\u20AA'}</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* If only one variant, show its details */}
        {sizes.length <= 1 && formatsForSelectedSize.length <= 1 && (
          <div className="px-4 pt-3 pb-1">
            <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600">
              <span className="font-medium">{currentVariant.format}</span>
              {' - '}
              <span>{currentVariant.binding}</span>
              {' - '}
              <span>{currentVariant.size}</span>
            </div>
          </div>
        )}

        {/* Quantity selector */}
        <div className="px-4 pt-3 pb-2">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">{t.quantity}</h4>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-red-400 hover:bg-red-50 transition-all duration-200 active:scale-90"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-12 text-center text-xl font-bold text-gray-900">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-red-400 hover:bg-red-50 transition-all duration-200 active:scale-90"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Add to Cart Button - sticky at bottom */}
        <div className="sticky bottom-0 p-4 bg-white border-t border-gray-100 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
          <button
            onClick={handleAddToCart}
            disabled={!currentVariant.inStock || justAdded}
            className={`
              w-full py-3.5 rounded-xl font-bold text-lg flex items-center justify-center gap-2
              transition-all duration-300
              ${justAdded
                ? 'bg-green-500 text-white scale-95'
                : currentVariant.inStock
                  ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl active:scale-95'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
            `}
          >
            {justAdded ? (
              <>
                <Check className="h-5 w-5" />
                {t.addedToCart}
              </>
            ) : (
              <>
                <ShoppingCart className="h-5 w-5" />
                {currentVariant.inStock
                  ? `${t.addToCart} - ${totalPrice} \u20AA`
                  : t.outOfStock}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
