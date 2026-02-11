import type { Product } from '../../../../shared/schema';

// Lazy-loaded product chunks
import { chagimProducts } from './chagim';
import { etzotProducts } from './etzot';
import { halachaProducts } from './halacha';
import { likutimProducts } from './likutim';
import { michtavimProducts } from './michtavim';
import { musarProducts } from './musar';
import { sefarimRabbenuProducts } from './sefarim-rabbenu';
import { sefarimTalmidimProducts } from './sefarim-talmidim';
import { segulotProducts } from './segulot';
import { sichotProducts } from './sichot';
import { sipurimProducts } from './sipurim';
import { tanachProducts } from './tanach';
import { tefilotProducts } from './tefilot';
import { toldotProducts } from './toldot';

// Combine all products
const allProducts: Record<string, Product> = {
  ...chagimProducts,
  ...etzotProducts,
  ...halachaProducts,
  ...likutimProducts,
  ...michtavimProducts,
  ...musarProducts,
  ...sefarimRabbenuProducts,
  ...sefarimTalmidimProducts,
  ...segulotProducts,
  ...sichotProducts,
  ...sipurimProducts,
  ...tanachProducts,
  ...tefilotProducts,
  ...toldotProducts,
};

/**
 * Get a product by ID
 * @param id - Product ID
 * @returns Product or undefined
 */
export function getProduct(id: string): Product | undefined {
  return allProducts[id];
}

/**
 * Get all products
 * @returns All products as a Record
 */
export function getAllProducts(): Record<string, Product> {
  return allProducts;
}

/**
 * Get products by category
 * @param category - Category name
 * @returns Array of products in that category
 */
export function getProductsByCategory(category: string): Product[] {
  return Object.values(allProducts).filter(product => product.category === category);
}

/**
 * Get featured products
 * @returns Array of featured products
 */
export function getFeaturedProducts(): Product[] {
  return Object.values(allProducts).filter(product => product.isFeatured);
}

/**
 * Get all products grouped by category
 * @returns Products grouped by category
 */
export function getProductsByCategoryMap(): Record<string, Product[]> {
  return Object.values(allProducts).reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, Product[]>);
}

// Export for backward compatibility
export const realBreslovProducts = allProducts;
export const featuredProducts = getFeaturedProducts();
export const productsByCategory = getProductsByCategoryMap();

// Export individual chunks for tree-shaking
export {
  chagimProducts,
  etzotProducts,
  halachaProducts,
  likutimProducts,
  michtavimProducts,
  musarProducts,
  sefarimRabbenuProducts,
  sefarimTalmidimProducts,
  segulotProducts,
  sichotProducts,
  sipurimProducts,
  tanachProducts,
  tefilotProducts,
  toldotProducts
};
