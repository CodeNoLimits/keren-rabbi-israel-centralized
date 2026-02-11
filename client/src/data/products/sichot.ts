import type { Product, ProductVariant } from '../../../../shared/schema';

// Real Breslov books data extracted from authentic source documents
// רשימת ספרי הקרן כולל שפות מעודכן אלול תשפ''ה & תיאור ספרי הקרן לאתר

// sichot products (1 items)
export const sichotProducts: Record<string, Product> = {
  'sichos-haran': {
    id: 'sichos-haran',
    name: 'שיחות הר"ן',
    nameEnglish: 'Sichos Haran',
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: '"בתחילה סבור הייתי שרק את תורותיו של רבינו צריך לכתוב", סיפר רבי נתן, "אולם לימים הבנתי שכל שיחה שלו, צריך להעלות על הכתב". הספר \'שיחות הר"ן\' מכיל שיחות שנאמרו על ידי רבינו בנסיעות ובדרכים, ובהזדמנויות שונות, לאו דווקא בשולחן השבת או בציבור חסידים.',
    descriptionEnglish: '"At first I thought only Rabbenu\'s teachings needed to be written," Rabbi Nathan said, "but later I understood that every conversation of his needs to be put in writing." Sichos Haran contains conversations said by Rabbenu during travels and journeys.',
    category: 'שיחות ודיבורים',
    subcategory: 'שיחות רבינו',
    author: 'רבי נחמן מברסלב',
    publisher: 'קרן רבי ישראל',
    language: 'עברית',
    languageGroupId: 'sichos-haran-group',
    pages: 446,
    isbn: '978-965-7023-20-2',
    images: [
      '/attached_assets/שיחות הרן 1_1757281125911.jpg',
      '/attached_assets/שיחות הרן_1757281085509.jpg'
    ],
    variants: [
      {
        id: 'large-skai',
        format: 'סקאי',
        binding: 'קשה',
        size: 'גדול',
        dimensions: '24*17',
        volumes: 1,
        price: 35,
        inStock: true,
        stockQuantity: 25
      },
      {
        id: 'medium-skai',
        format: 'סקאי',
        binding: 'קשה',
        size: 'בינוני',
        dimensions: '17*12',
        volumes: 1,
        price: 30,
        inStock: true,
        stockQuantity: 35
      },
      {
        id: 'small-laminated',
        format: 'למנציה',
        binding: 'רך',
        size: 'קטן',
        dimensions: '12*8',
        volumes: 1,
        price: 25,
        inStock: true,
        stockQuantity: 50
      },
      {
        id: 'small-laminated-soft',
        format: 'למנציה רך',
        binding: 'רך',
        size: 'קטן',
        dimensions: '12*8',
        volumes: 1,
        price: 10,
        inStock: true,
        stockQuantity: 70
      }
    ],
    features: [
      'שיחות בנסיעות ודרכים',
      'כל שיחה של רבינו חשובה',
      'דיבורים יומיומיים',
      'נרשם על ידי רבי נתן',
      'שיחות לדרך ולחיים'
    ],
    tags: ['שיחות', 'דיבורים', 'נסיעות', 'יומיום', 'רבי נתן'],
    isActive: true,
    isFeatured: true
  }
};
