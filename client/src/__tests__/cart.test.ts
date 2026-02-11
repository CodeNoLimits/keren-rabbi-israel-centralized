/**
 * Cart logic unit tests for Keren Rabbi Israel store.
 *
 * These tests exercise the pure cart logic (add, remove, update, totals,
 * free-shipping threshold) WITHOUT rendering React components, so they
 * run fast and do not depend on a DOM environment.
 */
import { describe, it, expect, beforeEach } from 'vitest';

// ---------------------------------------------------------------------------
// Types mirroring CartContext.tsx
// ---------------------------------------------------------------------------
interface CartItem {
  id: string;
  productId: string;
  variantId: string;
  name: string;
  nameEnglish: string;
  image: string;
  price: number;   // in agorot (1 shekel = 100 agorot)
  quantity: number;
  variant?: {
    format: string;
    binding: string;
    size: string;
  };
}

// ---------------------------------------------------------------------------
// Pure cart helpers (mirrors CartProvider logic)
// ---------------------------------------------------------------------------
const FREE_SHIPPING_THRESHOLD = 20000; // 200 NIS in agorot

function addItem(
  items: CartItem[],
  newItem: Omit<CartItem, 'id'>,
): CartItem[] {
  const existingIndex = items.findIndex(
    (item) =>
      item.productId === newItem.productId &&
      item.variantId === newItem.variantId,
  );

  if (existingIndex >= 0) {
    const updated = [...items];
    updated[existingIndex] = {
      ...updated[existingIndex],
      quantity: updated[existingIndex].quantity + newItem.quantity,
    };
    return updated;
  }

  return [
    ...items,
    {
      ...newItem,
      id: `${newItem.productId}-${newItem.variantId}-${Date.now()}`,
    },
  ];
}

function removeItem(items: CartItem[], itemId: string): CartItem[] {
  return items.filter((item) => item.id !== itemId);
}

function updateQuantity(
  items: CartItem[],
  itemId: string,
  quantity: number,
): CartItem[] {
  if (quantity <= 0) {
    return removeItem(items, itemId);
  }
  return items.map((item) =>
    item.id === itemId ? { ...item, quantity } : item,
  );
}

function totalItems(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

function totalPrice(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function qualifiesForFreeShipping(items: CartItem[]): boolean {
  return totalPrice(items) >= FREE_SHIPPING_THRESHOLD;
}

// ---------------------------------------------------------------------------
// Test fixtures
// ---------------------------------------------------------------------------
function makeItem(overrides: Partial<CartItem> = {}): CartItem {
  return {
    id: 'likutei-moharan-giant-skai-123',
    productId: 'likutei-moharan',
    variantId: 'giant-skai',
    name: 'ליקוטי מוהר"ן',
    nameEnglish: 'Likutei Moharan',
    image: '/images/likutei.jpg',
    price: 5500, // 55 NIS
    quantity: 1,
    variant: { format: 'סקאי', binding: 'קשה', size: 'ענק' },
    ...overrides,
  };
}

function makeNewItem(overrides: Partial<Omit<CartItem, 'id'>> = {}): Omit<CartItem, 'id'> {
  return {
    productId: 'likutei-tefilot',
    variantId: 'large-skai',
    name: 'ליקוטי תפילות',
    nameEnglish: 'Likutei Tefilot',
    image: '/images/tefilot.jpg',
    price: 3500, // 35 NIS
    quantity: 1,
    variant: { format: 'סקאי', binding: 'קשה', size: 'גדול' },
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe('Cart - addItem', () => {
  let items: CartItem[];

  beforeEach(() => {
    items = [];
  });

  it('adds a new item to an empty cart', () => {
    const result = addItem(items, makeNewItem());
    expect(result).toHaveLength(1);
    expect(result[0].productId).toBe('likutei-tefilot');
    expect(result[0].quantity).toBe(1);
  });

  it('adds multiple different items', () => {
    let result = addItem(items, makeNewItem());
    result = addItem(result, makeNewItem({ productId: 'sefer-hamidot', variantId: 'small' }));
    expect(result).toHaveLength(2);
  });

  it('increments quantity when adding the same product+variant', () => {
    let result = addItem(items, makeNewItem({ quantity: 2 }));
    result = addItem(result, makeNewItem({ quantity: 3 }));
    expect(result).toHaveLength(1);
    expect(result[0].quantity).toBe(5);
  });

  it('treats different variants of the same product as separate items', () => {
    let result = addItem(items, makeNewItem({ variantId: 'large-skai' }));
    result = addItem(result, makeNewItem({ variantId: 'medium-leather' }));
    expect(result).toHaveLength(2);
  });
});

describe('Cart - removeItem', () => {
  it('removes an item by id', () => {
    const items: CartItem[] = [
      makeItem({ id: 'item-1' }),
      makeItem({ id: 'item-2', productId: 'other-book' }),
    ];
    const result = removeItem(items, 'item-1');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('item-2');
  });

  it('returns unchanged array when id is not found', () => {
    const items: CartItem[] = [makeItem({ id: 'item-1' })];
    const result = removeItem(items, 'nonexistent');
    expect(result).toHaveLength(1);
  });

  it('returns empty array when removing the last item', () => {
    const items: CartItem[] = [makeItem({ id: 'item-1' })];
    const result = removeItem(items, 'item-1');
    expect(result).toHaveLength(0);
  });
});

describe('Cart - updateQuantity', () => {
  it('updates quantity for a specific item', () => {
    const items: CartItem[] = [makeItem({ id: 'item-1', quantity: 1 })];
    const result = updateQuantity(items, 'item-1', 5);
    expect(result[0].quantity).toBe(5);
  });

  it('removes item when quantity is set to 0', () => {
    const items: CartItem[] = [makeItem({ id: 'item-1', quantity: 3 })];
    const result = updateQuantity(items, 'item-1', 0);
    expect(result).toHaveLength(0);
  });

  it('removes item when quantity is negative', () => {
    const items: CartItem[] = [makeItem({ id: 'item-1', quantity: 2 })];
    const result = updateQuantity(items, 'item-1', -1);
    expect(result).toHaveLength(0);
  });

  it('does not affect other items', () => {
    const items: CartItem[] = [
      makeItem({ id: 'item-1', quantity: 1 }),
      makeItem({ id: 'item-2', productId: 'other', quantity: 3 }),
    ];
    const result = updateQuantity(items, 'item-1', 10);
    expect(result[0].quantity).toBe(10);
    expect(result[1].quantity).toBe(3);
  });
});

describe('Cart - totalPrice calculation', () => {
  it('returns 0 for an empty cart', () => {
    expect(totalPrice([])).toBe(0);
  });

  it('calculates total for a single item', () => {
    const items: CartItem[] = [makeItem({ price: 5500, quantity: 2 })];
    // 55 NIS * 2 = 110 NIS = 11000 agorot
    expect(totalPrice(items)).toBe(11000);
  });

  it('calculates total for multiple items', () => {
    const items: CartItem[] = [
      makeItem({ id: 'a', price: 5500, quantity: 1 }),
      makeItem({ id: 'b', productId: 'b', price: 3500, quantity: 3 }),
    ];
    // 5500 + (3500 * 3) = 5500 + 10500 = 16000
    expect(totalPrice(items)).toBe(16000);
  });
});

describe('Cart - totalItems count', () => {
  it('returns 0 for an empty cart', () => {
    expect(totalItems([])).toBe(0);
  });

  it('sums quantities across all items', () => {
    const items: CartItem[] = [
      makeItem({ id: 'a', quantity: 2 }),
      makeItem({ id: 'b', quantity: 5 }),
    ];
    expect(totalItems(items)).toBe(7);
  });
});

describe('Cart - free shipping threshold (200 NIS)', () => {
  it('does NOT qualify when total is below 200 NIS (20000 agorot)', () => {
    const items: CartItem[] = [makeItem({ price: 9900, quantity: 1 })];
    // 99 NIS < 200 NIS
    expect(qualifiesForFreeShipping(items)).toBe(false);
  });

  it('qualifies when total equals exactly 200 NIS', () => {
    const items: CartItem[] = [makeItem({ price: 10000, quantity: 2 })];
    // 100 NIS * 2 = 200 NIS = 20000 agorot
    expect(qualifiesForFreeShipping(items)).toBe(true);
  });

  it('qualifies when total exceeds 200 NIS', () => {
    const items: CartItem[] = [makeItem({ price: 5500, quantity: 4 })];
    // 55 NIS * 4 = 220 NIS = 22000 agorot > 20000
    expect(qualifiesForFreeShipping(items)).toBe(true);
  });

  it('does NOT qualify for empty cart', () => {
    expect(qualifiesForFreeShipping([])).toBe(false);
  });

  it('recalculates correctly after removing an item that drops below threshold', () => {
    let items: CartItem[] = [
      makeItem({ id: 'a', price: 15000, quantity: 1 }),
      makeItem({ id: 'b', productId: 'b', price: 6000, quantity: 1 }),
    ];
    // 150 + 60 = 210 NIS -> qualifies
    expect(qualifiesForFreeShipping(items)).toBe(true);

    // Remove the 60 NIS item
    items = removeItem(items, 'b');
    // 150 NIS -> does not qualify
    expect(qualifiesForFreeShipping(items)).toBe(false);
  });
});
