import type { Product, ProductVariant } from '../../../../shared/schema';

// Real Breslov books data extracted from authentic source documents
// רשימת ספרי הקרן כולל שפות מעודכן אלול תשפ''ה & תיאור ספרי הקרן לאתר

// segulot products (1 items)
export const segulotProducts: Record<string, Product> = {
  'shemot-hatzadikim': {
    id: 'shemot-hatzadikim',
    name: 'שמות הצדיקים',
    nameEnglish: 'Shemot HaTzadikim',
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: 'שנלקט על ידי רבי נתן, שאמירתו מסוגלת לשנות את הטבע ולהמשיך ניסים, כדברי רבינו הקדוש. הספר מכיל רשימת שמות צדיקים וקדושים שאמירתם בדביקות ובכוונה יכולה להביא ישועות ורפואות.',
    descriptionEnglish: 'Compiled by Rabbi Nathan, whose recitation is capable of changing nature and drawing miracles, according to our holy Rabbenu. Contains a list of names of tzaddikim and holy ones whose recitation with devotion can bring salvation and healing.',
    category: 'סגולות וישועות',
    subcategory: 'שמות קדושים',
    author: 'רבי נתן מברסלב',
    publisher: 'קרן רבי ישראל',
    language: 'עברית',
    pages: 120,
    isbn: '978-965-7023-59-2',
    images: [
      '/attached_assets/שמות הצדיקים 2_1757280885981.jpg',
      '/attached_assets/שמות הצדיקים_1757280885981.jpg'
    ],
    variants: [
      {
        id: 'medium-skai-divided-12vol',
        format: 'מחולק',
        binding: 'קשה',
        size: 'בינוני',
        dimensions: '17*12',
        volumes: 12,
        price: 45,
        inStock: true,
        stockQuantity: 25
      },
      {
        id: 'small-soft-nylon',
        format: 'לנילון רך',
        binding: 'רך',
        size: 'קטן',
        dimensions: '12*8',
        volumes: 1,
        price: 10,
        inStock: true,
        stockQuantity: 100
      },
      {
        id: 'medium-french',
        format: 'צרפתית',
        binding: 'קשה',
        size: 'בינוני',
        dimensions: '17*12',
        volumes: 1,
        price: 32,
        inStock: true,
        stockQuantity: 18
      }
    ],
    features: [
      'לקט רבי נתן',
      'שינוי הטבע',
      'המשכת ניסים',
      'ישועות ורפואות',
      'אמירה בדביקות'
    ],
    tags: ['צדיקים', 'ישועות', 'ניסים', 'רפואות', 'סגולות'],
    isActive: true,
    isFeatured: false
  }
};
