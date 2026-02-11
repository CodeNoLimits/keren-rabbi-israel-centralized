import type { Product, ProductVariant } from '../../../../shared/schema';

// Real Breslov books data extracted from authentic source documents
// רשימת ספרי הקרן כולל שפות מעודכן אלול תשפ''ה & תיאור ספרי הקרן לאתר

// halacha products (1 items)
export const halachaProducts: Record<string, Product> = {
  'likutei-halakhot': {
    id: 'likutei-halakhot',
    name: 'ליקוטי הלכות',
    nameEnglish: 'Likutei Halakhot',
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: 'חיבורו הגדול והמופלא של רבי נתן, תלמידו המובהק של רבינו נחמן מברסלב זיע"א, מכיל דרושים נפלאים בעבודת השם, מסודר על ארבעת חלקי שולחן-ערוך, מחולק לשמונה כרכים. רבי נתן התבטא: "העולם אומרים על ספר השל"ה הקדוש, שהוא השער לגן עדן, ואני אומר על ספרי ליקוטי הלכות – שהוא הגן עדן של השם יתברך בעצמו!"',
    descriptionEnglish: 'The great and wonderful work of Rabbi Nathan, the outstanding student of our teacher Rabbi Nachman of Breslov, containing wonderful discourses on divine service, arranged according to the four sections of the Shulchan Aruch.',
    category: 'הלכה ועבודה',
    subcategory: 'ליקוטי הלכות',
    author: 'רבי נתן מברסלב',
    publisher: 'קרן רבי ישראל',
    language: 'עברית',
    languageGroupId: 'likutei-halakhot-group',
    pages: 2800,
    isbn: '978-965-7023-17-2',
    images: [
      '/attached_assets/ליקוטי הלכות 1_1757280778288.jpg',
      '/attached_assets/ליקוטי הלכות 2_1757280778288.jpg',
      '/attached_assets/ליקוטי הלכות 3_1757280778288.jpg'
    ],
    variants: [
      {
        id: 'large-8vol-illuminated',
        format: 'סקאי מאירת עיניים',
        binding: 'קשה',
        size: 'גדול',
        dimensions: '24*17',
        volumes: 8,
        price: 380,
        inStock: true,
        stockQuantity: 5
      },
      {
        id: 'large-8vol-standard',
        format: 'סקאי',
        binding: 'קשה',
        size: 'גדול',
        dimensions: '25*17',
        volumes: 8,
        price: 280,
        inStock: true,
        stockQuantity: 8
      },
      {
        id: 'medium-20vol',
        format: 'סקאי',
        binding: 'קשה',
        size: 'בינוני',
        dimensions: '17*12',
        volumes: 20,
        price: 480,
        inStock: true,
        stockQuantity: 3
      },
      {
        id: 'giant-8vol',
        format: 'סקאי',
        binding: 'קשה',
        size: 'ענק',
        dimensions: '32*22',
        volumes: 8,
        price: 420,
        inStock: true,
        stockQuantity: 4
      }
    ],
    features: [
      'חיבורו הגדול של רבי נתן',
      'מסודר על ד\' חלקי שו"ע',
      'דרושים נפלאים בעבודת השם',
      'הגן עדן של השם יתברך',
      'זמין במספר מהדורות'
    ],
    tags: ['הלכה', 'רבי נתן', 'שולחן ערוך', 'עבודת השם', 'דרושים'],
    isActive: true,
    isFeatured: true
  }
};
