import type { Product, ProductVariant } from '../../../../shared/schema';

// Real Breslov books data extracted from authentic source documents
// רשימת ספרי הקרן כולל שפות מעודכן אלול תשפ''ה & תיאור ספרי הקרן לאתר

// likutim products (1 items)
export const likutimProducts: Record<string, Product> = {
  'otzer-hayirah': {
    id: 'otzer-hayirah',
    name: 'אוצר היראה',
    nameEnglish: 'Treasury of Fear of Heaven',
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: 'נקרא במקור: ליקוטי עצות חדש. תוכן הספר: ליקוט וקיצור מספרי \'ליקוטי הלכות\' לרבי נתן זצ"ל, להוציא מהם את כל העצות המתבארים בדרושיו הארוכים לעובדה ולמעשה. הספר מחולק לארבעה חלקים: אמת וצדק. כנסת קהל צבאות. תשובת השנה. עצת שלום.',
    descriptionEnglish: 'Originally called: New Likutei Etzot. A collection and summary from Rabbi Nathan\'s "Likutei Halakhot" books, extracting all the practical advice from his lengthy discourses.',
    category: 'ליקוטים',
    subcategory: 'עצות',
    author: 'רבי נחמן מטשעהרין',
    publisher: 'קרן רבי ישראל',
    language: 'עברית',
    pages: 850,
    isbn: '978-965-7023-31-8',
    images: [
      '/attached_assets/אוצר היראה 1_1757275234154.jpg',
      '/attached_assets/אוצר היראה 2_1757275234155.jpg',
      '/attached_assets/אוצר היראה 3_1757275234155.jpg',
      '/attached_assets/אוצר היראה 4_1757275234156.jpg'
    ],
    variants: [
      {
        id: 'large-skai-5vol',
        format: 'סקאי',
        binding: 'קשה',
        size: 'גדול',
        dimensions: '24*17',
        volumes: 5,
        price: 200,
        inStock: true,
        stockQuantity: 10
      }
    ],
    features: [
      'ליקוטי עצות חדש',
      'מספרי ליקוטי הלכות',
      'עצות מעשיות לעובדה',
      'ארבעה חלקים עיקריים',
      'חובר על ידי רבי נחמן מטשעהרין'
    ],
    tags: ['יראת שמים', 'עצות', 'ליקוטים', 'רבי נתן', 'הלכות'],
    isActive: true,
    isFeatured: true
  }
};
