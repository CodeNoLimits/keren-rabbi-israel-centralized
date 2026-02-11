# Product Data - Code-Split Structure

## Overview

This directory contains the product catalog split into category-based chunks for better performance and maintainability.

**Original file**: `../realProducts.ts` (2,797 lines) - **Now deprecated**
**New structure**: 14 category files + 1 index file (2,927 total lines)

## File Structure

```
products/
├── index.ts              # Main entry point with helper functions
├── chagim.ts            # Holidays (10 products, 457 lines)
├── etzot.ts             # Advice (2 products, 145 lines)
├── halacha.ts           # Jewish Law (1 product, 87 lines)
├── likutim.ts           # Collections (1 product, 54 lines)
├── michtavim.ts         # Letters (3 products, 220 lines)
├── musar.ts             # Ethics (1 product, 77 lines)
├── sefarim-rabbenu.ts   # Books of Rebbe Nachman (2 products, 212 lines)
├── sefarim-talmidim.ts  # Books of Students (9 products, 437 lines)
├── segulot.ts           # Remedies (1 product, 74 lines)
├── sichot.ts            # Conversations (1 product, 86 lines)
├── sipurim.ts           # Stories (2 products, 199 lines)
├── tanach.ts            # Torah/Bible (1 product, 86 lines)
├── tefilot.ts           # Prayers (6 products, 543 lines)
└── toldot.ts            # Biographies (2 products, 144 lines)
```

## Category Mappings

Products are grouped by Hebrew categories into English file names:

| Hebrew Categories | File Name | Products |
|-------------------|-----------|----------|
| ספרי רבינו | sefarim-rabbenu.ts | 2 |
| תפילות, ליקוטי תפילות, תפילות וישועות, תפילות יומיות, אוסף תפילות, השתפכות הנפש, התבודדות ותפילה, תנ"ך ותפילה | tefilot.ts | 6 |
| סיפורים ומעשיות, סיפורי רבינו, שיחות וסיפורים | sipurim.ts | 2 |
| שיחות, שיחות ודיבורים, שיחות רבינו, שיחות אודסר | sichot.ts | 1 |
| ספרי התלמידים | sefarim-talmidim.ts | 9 |
| מכתבים, מכתבים וכתבים, מכתבי קודש, מכתבי רבי נתן, מכתבי אודסר | michtavim.ts | 3 |
| חגים ומועדים, מועדי השנה, ראש השנה, יום כיפור, סוכות, חנוכה, פורים, פסח, ספירת העומר, לג בעומר, שבועות, בין המצרים | chagim.ts | 10 |
| תולדות, תולדות וחיים, חיי רבינו, ימי רבי נתן | toldot.ts | 2 |
| הלכה ועבודה, הלכה ותלמוד, ליקוטי הלכות | halacha.ts | 1 |
| עצות, עצות והדרכה, עצות מעשיות | etzot.ts | 2 |
| חומשים ותנ"ך, חומש עם פירושים, תהילים | tanach.ts | 1 |
| מוסר והדרכה, עבודת השם, מידות טובות | musar.ts | 1 |
| ליקוטים, קיצורים, ליקוטי מוהר"ן | likutim.ts | 1 |
| סגולות וישועות, תיקון הכללי, שמות קדושים | segulot.ts | 1 |
| ביאורים, פירושים, כוכבי אור | biurim.ts | 0 |

## Usage

### Import the Main Index

```typescript
// Import everything (backward compatible)
import { realBreslovProducts } from '@/data/products';

// Import helper functions
import {
  getProduct,
  getAllProducts,
  getProductsByCategory,
  getFeaturedProducts,
  getProductsByCategoryMap
} from '@/data/products';
```

### Helper Functions

#### `getProduct(id: string): Product | undefined`
Get a single product by ID.

```typescript
const product = getProduct('likutei-moharan');
```

#### `getAllProducts(): Record<string, Product>`
Get all products as a Record.

```typescript
const allProducts = getAllProducts();
```

#### `getProductsByCategory(category: string): Product[]`
Get all products in a specific category.

```typescript
const prayers = getProductsByCategory('תפילות');
```

#### `getFeaturedProducts(): Product[]`
Get all featured products.

```typescript
const featured = getFeaturedProducts();
```

#### `getProductsByCategoryMap(): Record<string, Product[]>`
Get all products grouped by category.

```typescript
const byCategory = getProductsByCategoryMap();
```

### Import Specific Categories (Tree-Shaking)

For optimal bundle size, import only the categories you need:

```typescript
import { tefilotProducts } from '@/data/products/tefilot';
import { chagimProducts } from '@/data/products/chagim';
```

## Backward Compatibility

All existing imports continue to work:

```typescript
// Old import (still works)
import { realBreslovProducts } from '@/data/realProducts';

// New import (same result)
import { realBreslovProducts } from '@/data/products';
```

The following exports are maintained for compatibility:
- `realBreslovProducts` - All products as Record
- `featuredProducts` - Array of featured products
- `productsByCategory` - Products grouped by category

## Performance Benefits

1. **Smaller chunks**: Maximum file size reduced from 2,797 lines to 543 lines
2. **Better tree-shaking**: Vite can exclude unused categories from bundles
3. **Easier maintenance**: Each category is self-contained
4. **Faster parsing**: TypeScript processes smaller files faster
5. **Better developer experience**: Easier to find and edit products

## Migration Notes

All imports in the following files have been updated:

- ✅ `client/src/pages/store.tsx`
- ✅ `client/src/pages/product.tsx`
- ✅ `client/src/pages/favorites.tsx`
- ✅ `client/src/pages/home.tsx`
- ✅ `client/src/pages/admin.tsx`
- ✅ `client/src/components/SearchAutocomplete.tsx`
- ✅ `client/src/components/ChatWidget.tsx`

No breaking changes - all functionality preserved.

## Adding New Products

To add a new product:

1. Determine the appropriate category file
2. Add the product to that file's exported Record
3. Follow the existing product structure
4. The index.ts will automatically include it

Example:

```typescript
// In client/src/data/products/tefilot.ts
export const tefilotProducts: Record<string, Product> = {
  // ... existing products
  'new-prayer-book': {
    id: 'new-prayer-book',
    name: 'ספר תפילות חדש',
    // ... rest of product data
  }
};
```

## Build Verification

✅ Build completed successfully
✅ All imports resolved correctly
✅ Type checking passed
✅ No breaking changes detected

Total products: **42**
Total categories: **14**
Largest file: **tefilot.ts** (543 lines)
Smallest file: **likutim.ts** (54 lines)
