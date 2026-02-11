import type { Product, ProductVariant } from '../../../../shared/schema';

// Real Breslov books data extracted from authentic source documents
// רשימת ספרי הקרן כולל שפות מעודכן אלול תשפ''ה & תיאור ספרי הקרן לאתר

// toldot products (2 items)
export const toldotProducts: Record<string, Product> = {
  'chayei-moharan': {
    id: 'chayei-moharan',
    name: 'חיי מוהר"ן',
    nameEnglish: 'Chayei Moharan',
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: 'בחיבור זה, העלה רבי נתן על הכתב מאמרים ודיבורים ששמע מפי רבינו, בהם מתגלה טפח מגדולתו העצומה של רבינו. מחולק לפי נושאים: שיחות השייכות לתורות, מאמרים בעבודת ה\', בגדולת רבינו, במעלת תורתו ובמעלת אנשיו ומקורביו.',
    descriptionEnglish: 'In this work, Rabbi Nathan put to writing statements and speeches he heard from Rabbenu, revealing a glimpse of Rabbenu\'s enormous greatness. Divided by topics: conversations related to teachings, articles on divine service, on Rabbenu\'s greatness.',
    category: 'תולדות וחיים',
    subcategory: 'חיי רבינו',
    author: 'רבי נתן מברסלב',
    publisher: 'קרן רבי ישראל',
    language: 'עברית',
    languageGroupId: 'chayei-moharan-group',
    pages: 640,
    isbn: '978-965-7023-21-9',
    images: [
      '/attached_assets/חיי מוהרן 1_1757275910544.jpg',
      '/attached_assets/חיי מוהרן 1_1757278339719.jpg',
      '/attached_assets/חיי מוהרן 2_1757280401417.jpg'
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
        id: 'small-laminated-soft',
        format: 'למנציה רך',
        binding: 'רך',
        size: 'קטן',
        dimensions: '12*8',
        volumes: 1,
        price: 10,
        inStock: false,
        stockQuantity: 0
      }
    ],
    features: [
      'דיבורים שנשמעו מפי רבינו',
      'טפח מגדולת רבינו',
      'מחולק לפי נושאים',
      'גדולת רבינו ותורתו',
      'מעלת אנשיו ומקורביו'
    ],
    tags: ['חיי רבינו', 'תולדות', 'דיבורים', 'גדולה', 'רבי נתן'],
    isActive: true,
    isFeatured: true
  },
  'yimei-maharanat': {
    id: 'yimei-maharanat',
    name: 'ימי מוהרנ"ת',
    nameEnglish: 'Yimei Maharnat',
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: 'יומנו הנפלא של התלמיד המובהק והנאמן רבי נתן. בו גולל את קורות חייו מהתקרבותו לרבינו ועד לאחר נסיעתו לארץ ישראל. הרדיפות, הביזיונות, הקשיים והמניעות, לצד העשייה הבלתי פוסקת להנחלת מורשתו של רבי נחמן לדורות עולם.',
    descriptionEnglish: 'The wonderful diary of the outstanding and faithful student Rabbi Nathan. In it he unfolds the events of his life from his approach to Rabbenu until after his journey to the Land of Israel.',
    category: 'תולדות וחיים',
    subcategory: 'ימי רבי נתן',
    author: 'רבי נתן מברסלב',
    publisher: 'קרן רבי ישראל',
    language: 'עברית',
    languageGroupId: 'yimei-maharanat-group',
    pages: 512,
    isbn: '978-965-7023-22-6',
    images: [
      '/attached_assets/ימי מוהרנת 1_1757275910544.jpg',
      '/attached_assets/ימי מוהרנת 1_1757278339719.jpg',
      '/attached_assets/ימי מוהרנת 2_1757280401418.jpg'
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
        stockQuantity: 20
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
        stockQuantity: 30
      },
      {
        id: 'small-laminated',
        format: 'למנציה',
        binding: 'רך',
        size: 'קטן',
        dimensions: '12*8',
        volumes: 1,
        price: 20,
        inStock: true,
        stockQuantity: 40
      }
    ],
    features: [
      'יומנו של רבי נתן',
      'מהתקרבות לרבינו',
      'נסיעה לארץ ישראל',
      'רדיפות וקשיים',
      'הנחלת המורשת'
    ],
    tags: ['יומן', 'רבי נתן', 'ארץ ישראל', 'רדיפות', 'מורשת'],
    isActive: true,
    isFeatured: true
  }
};
