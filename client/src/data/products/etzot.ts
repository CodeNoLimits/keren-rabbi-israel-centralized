import type { Product, ProductVariant } from '../../../../shared/schema';

// Real Breslov books data extracted from authentic source documents
// רשימת ספרי הקרן כולל שפות מעודכן אלול תשפ''ה & תיאור ספרי הקרן לאתר

// etzot products (2 items)
export const etzotProducts: Record<string, Product> = {
  'likutei-etzot': {
    id: 'likutei-etzot',
    name: 'ליקוטי עצות',
    nameEnglish: 'Likutei Etzot',
    nameFrench: 'Recueil de Conseils',
    nameSpanish: 'Colección de Consejos',
    nameRussian: 'Сборник Советов',
    description: 'ספרו של רבי נתן מברסלב, מכיל עצות מעשיות לחיי היומיום המובאות מתוך ספרי רבינו. הספר מסודר לפי נושאים ומהווה מדריך פרקטי לעבודת השם.',
    descriptionEnglish: 'The book of Rabbi Nathan of Breslov, containing practical advice for daily life brought from Rabbenu\'s books. The book is organized by topics and serves as a practical guide for divine service.',
    category: 'עצות והדרכה',
    subcategory: 'עצות מעשיות',
    author: 'רבי נתן מברסלב',
    publisher: 'קרן רבי ישראל',
    language: 'עברית',
    languageGroupId: 'likutei-etzot-group',
    pages: 576,
    isbn: '978-965-7023-18-9',
    images: [
      '/attached_assets/ליקוטי עצות 1_1757275910545.jpg',
      '/attached_assets/ליקוטי עצות 1_1757278339720.jpg',
      '/attached_assets/ליקוטי עצות 1_1757281125909.jpg',
      '/attached_assets/ליקוטי עצות_1757281003113.jpg'
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
        stockQuantity: 30
      },
      {
        id: 'large-skai-with-commentary-2vol',
        format: 'סקאי כולל עצות המבוארות ומכתבי רבי שמשון',
        binding: 'קשה',
        size: 'גדול',
        dimensions: '24*17',
        volumes: 2,
        price: 80,
        inStock: true,
        stockQuantity: 15
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
        stockQuantity: 40
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
        stockQuantity: 60
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
        stockQuantity: 80
      }
    ],
    features: [
      'עצות מעשיות לחיי יומיום',
      'מסודר לפי נושאים',
      'מדריך פרקטי',
      'מליקוטי מוהר"ן',
      'זמין עם עצות המבוארות'
    ],
    tags: ['עצות', 'הדרכה', 'יומיומי', 'מעשי', 'רבי נתן'],
    isActive: true,
    isFeatured: true
  },
  'etzot-hamevuarot': {
    id: 'etzot-hamevuarot',
    name: 'עצות המבוארות',
    nameEnglish: 'Eitzos Mevu\'arot',
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: 'חובר על ידי רבי שמשון בארסקי נכד רבינו, במקור באידיש, השפה המדוברת באותן שנים. הספר הוא ביאור לספר \'ליקוטי עצות\' של רבי נתן, נכתב בסגנון פשוט וקולח המתאים לכל שכבות הציבור.',
    descriptionEnglish: 'Compiled by Rabbi Shimshon Barsky, grandson of Rabbenu, originally in Yiddish. The book is an explanation of Rabbi Nathan\'s \'Likutei Etzot\', written in a simple and flowing style suitable for all segments of the public.',
    category: 'עצות והדרכה',
    subcategory: 'ביאורים',
    author: 'רבי שמשון בארסקי',
    publisher: 'קרן רבי ישראל',
    language: 'עברית',
    languageGroupId: 'etzot-hamevuarot-group',
    pages: 384,
    isbn: '978-965-7023-19-6',
    images: [
      '/attached_assets/עצות המבוארות 1_1757275910546.jpg',
      '/attached_assets/עצות המבוארות 1_1757278339721.jpg',
      '/attached_assets/עצות המבוארות 1_1757281125911.jpg'
    ],
    variants: [
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
      }
    ],
    features: [
      'ביאור לליקוטי עצות',
      'נכד רבינו',
      'סגנון פשוט וקולח',
      'מתאים לכל שכבות הציבור',
      'תורגם מאידיש'
    ],
    tags: ['עצות', 'ביאור', 'נכד רבינו', 'פשוט', 'מבואר'],
    isActive: true,
    isFeatured: false
  }
};
