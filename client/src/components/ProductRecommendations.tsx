/**
 * ProductRecommendations Component - Site Keren Rabbi Israel
 *
 * Affiche des produits recommandés basés sur le produit actuel
 * Types de recommandations:
 * - 'related': Produits similaires (même catégorie)
 * - 'frequently-bought': Produits souvent achetés ensemble
 *
 * Features:
 * - Grid responsive (2 cols mobile, 4 desktop)
 * - Carousel swipeable mobile (embla-carousel)
 * - Integration avec useCart pour ajout au panier
 * - Support RTL pour l'hébreu
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { ShoppingCart, Heart } from 'lucide-react';
import { useToast } from './ui/use-toast';
import useEmblaCarousel from 'embla-carousel-react';

// Types
export interface Product {
  id: string;
  name: string;
  nameEnglish?: string;
  images: string[];
  variants: ProductVariant[];
  category: string;
}

export interface ProductVariant {
  id: string;
  format: string;
  size: string;
  price: number;
  originalPrice?: number;
  inStock: boolean;
}

export interface ProductRecommendationsProps {
  /** Produit actuel pour lequel afficher les recommandations */
  currentProduct: Product;
  /** Type de recommandations */
  type: 'related' | 'frequently-bought';
}

/**
 * Hook pour récupérer les recommandations
 */
function useRecommendations(productId: string, type: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/products/recommendations?productId=${productId}&type=${type}&limit=4`
        );

        if (!response.ok) throw new Error('Failed to fetch');

        const data = await response.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error('Recommendations fetch error:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchRecommendations();
  }, [productId, type]);

  return { products, loading };
}

/**
 * Composant ProductCard individuel
 */
function ProductCard({ product }: { product: Product }) {
  const { toast } = useToast();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants[0] || null
  );

  // Get cart from localStorage (simple version)
  const addToCart = (product: Product, variant: ProductVariant) => {
    try {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');

      const existingItem = cart.find(
        (item: any) => item.productId === product.id && item.variantId === variant.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          productId: product.id,
          variantId: variant.id,
          productName: product.name,
          variantDetails: variant,
          quantity: 1,
          price: variant.price,
        });
      }

      localStorage.setItem('cart', JSON.stringify(cart));

      // Dispatch event for cart update
      window.dispatchEvent(new Event('cartUpdated'));

      toast({
        title: '✅ Ajouté au panier',
        description: `${product.name} - ${variant.format}`,
        duration: 2000,
      });
    } catch (error) {
      console.error('Add to cart error:', error);
      toast({
        title: '❌ Erreur',
        description: 'Impossible d\'ajouter au panier',
        variant: 'destructive',
      });
    }
  };

  const handleAddToCart = () => {
    if (!selectedVariant) return;
    addToCart(product, selectedVariant);
  };

  const imageUrl = product.images[0] || '/placeholder-book.jpg';
  const price = selectedVariant?.price || 0;
  const originalPrice = selectedVariant?.originalPrice;
  const hasDiscount = originalPrice && originalPrice > price;

  return (
    <Card className="group overflow-hidden h-full flex flex-col">
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <img
          src={imageUrl}
          alt={product.name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {hasDiscount && (
          <div className="absolute top-2 start-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {Math.round(((originalPrice - price) / originalPrice) * 100)}% OFF
          </div>
        )}
      </div>

      <CardContent className="flex-1 p-4">
        {/* Title */}
        <h4 className="font-semibold text-sm line-clamp-2 mb-2">
          {product.name}
        </h4>

        {/* Variant selector */}
        {product.variants.length > 1 && (
          <div className="mb-2">
            <select
              value={selectedVariant?.id}
              onChange={(e) => {
                const variant = product.variants.find(v => v.id === e.target.value);
                setSelectedVariant(variant || null);
              }}
              className="w-full text-xs border rounded px-2 py-1"
            >
              {product.variants.map(variant => (
                <option key={variant.id} value={variant.id}>
                  {variant.format} - {variant.size}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg">
            ₪{price}
          </span>
          {hasDiscount && (
            <span className="text-sm text-muted-foreground line-through">
              ₪{originalPrice}
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleAddToCart}
          disabled={!selectedVariant?.inStock}
          className="w-full"
          size="sm"
        >
          {selectedVariant?.inStock ? (
            <>
              <ShoppingCart className="w-4 h-4 me-2" />
              הוסף לסל
            </>
          ) : (
            'אזל מהמלאי'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

/**
 * Composant principal ProductRecommendations
 */
export default function ProductRecommendations({
  currentProduct,
  type,
}: ProductRecommendationsProps) {
  const { products, loading } = useRecommendations(currentProduct.id, type);
  const [emblaRef] = useEmblaCarousel({
    direction: 'rtl',
    align: 'start',
    containScroll: 'trimSnaps',
  });

  // Title based on type
  const title = type === 'related'
    ? 'מוצרים דומים'
    : 'נרכשו יחד לעתים קרובות';

  if (loading) {
    return (
      <div className="py-8">
        <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="aspect-[3/4] bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>

      {/* Desktop: Grid */}
      <div className="hidden md:grid grid-cols-4 gap-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Mobile: Carousel */}
      <div className="md:hidden overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4 ps-4">
          {products.map(product => (
            <div key={product.id} className="flex-[0_0_50%] min-w-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
