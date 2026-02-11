import type { Product, ProductVariant } from '../../../../shared/schema';

// Real Breslov books data extracted from authentic source documents
// רשימת ספרי הקרן כולל שפות מעודכן אלול תשפ''ה & תיאור ספרי הקרן לאתר

// sipurim products (2 items)
export const sipurimProducts: Record<string, Product> = {
  'siporei-masiyot': {
    id: 'siporei-masiyot',
    name: 'סיפורי מעשיות',
    nameEnglish: 'Stories of Rabbi Nachman',
    nameFrench: 'Contes mystiques',
    nameSpanish: 'Cuentos místicos',
    nameRussian: 'Мистические рассказы',
    description: 'שלוש עשרה מעשיות, בתוספת סיפורים קצרים, שסיפר רבי נחמן בארבע שנות חייו האחרונות. נרשמו על ידי תלמידו רבי נתן בשפת האידיש כפי שסופרו על ידי רבינו ואף תורגמו על ידו ללשון הקודש.',
    descriptionEnglish: 'Thirteen tales, plus short stories, told by Rabbi Nachman in the last four years of his life. Recorded by his student Rabbi Nathan in Yiddish as told by Rabbenu and translated by him into Hebrew.',
    category: 'סיפורים ומעשיות',
    subcategory: 'סיפורי רבינו',
    author: 'רבי נחמן מברסלב',
    publisher: 'קרן רבי ישראל',
    language: 'עברית',
    languageGroupId: 'siporei-masiyot-group',
    pages: 448,
    isbn: '978-965-7023-14-1',
    images: [
      '/attached_assets/סיפורי מעשיות 1_1757275910546.jpg',
      '/attached_assets/סיפורי מעשיות 1_1757278339721.jpg',
      '/attached_assets/סיפורי מעשיות 2_1757280401419.jpg'
    ],
    variants: [
      {
        id: 'large-skai-with-hints',
        format: 'סקאי עם רמזי המעשיות',
        binding: 'קשה',
        size: 'גדול',
        dimensions: '24*17',
        volumes: 1,
        price: 35,
        inStock: true,
        stockQuantity: 20
      },
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
        id: 'medium-skai-with-hints',
        format: 'סקאי עם רמזי המעשיות',
        binding: 'קשה',
        size: 'בינוני',
        dimensions: '17*12',
        volumes: 1,
        price: 30,
        inStock: true,
        stockQuantity: 30
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
        id: 'small-soft-leather',
        format: 'עור רך',
        binding: 'רך',
        size: 'קטן',
        dimensions: '12*8',
        volumes: 1,
        price: 25,
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
      'י"ג מעשיות קדושות',
      'נרשם על ידי רבי נתן',
      'סגולה לפקידת עקרות',
      'סיפורי קודש עמוקים',
      'זמין עם רמזי המעשיות'
    ],
    tags: ['מעשיות', 'סיפורים', 'קדושה', 'רמזים', 'סגולות'],
    isActive: true,
    isFeatured: true
  },
  'kochvei-ohr': {
    id: 'kochvei-ohr',
    name: 'כוכבי אור',
    nameEnglish: 'Kochvei Ohr',
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: 'ספרו של רבי אברהם חזן, בנו של רבי נחמן מטולטשין תלמיד רבי נתן. מכיל ארבעה חלקים: \'אנשי מוהר"ן\' –סיפורים על רבינו ותלמידיו, \'אמת ואמונה\' – שיחות במעלת האמונה, \'חכמה ובינה\' רמזים וסודות בגדולת רבינו, \'ששון ושמחה\' – שיחות ותפילות על מעלת השמחה.',
    descriptionEnglish: 'The book of Rabbi Avraham Chazan, son of Rabbi Nachman of Tulchyn, student of Rabbi Nathan. Contains four parts: \'People of Moharan\' - stories about Rabbenu and his students, \'Truth and Faith\' - conversations about the excellence of faith.',
    category: 'שיחות וסיפורים',
    subcategory: 'כוכבי אור',
    author: 'רבי אברהם חזן',
    publisher: 'קרן רבי ישראל',
    language: 'עברית',
    languageGroupId: 'kochvei-ohr-group',
    pages: 480,
    isbn: '978-965-7023-23-3',
    images: [
      '/attached_assets/כוכבי אור 1_1757275910545.jpg',
      '/attached_assets/כוכבי אור 1_1757278339720.jpg',
      '/attached_assets/כוכבי אור 2_1757280401418.jpg'
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
        stockQuantity: 25
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
        inStock: true,
        stockQuantity: 50
      }
    ],
    features: [
      'ארבעה חלקים נפלאים',
      'סיפורים על רבינו ותלמידיו',
      'שיחות באמונה ושמחה',
      'רמזים וסודות',
      'בן רבי נחמן מטולטשין'
    ],
    tags: ['סיפורים', 'אמונה', 'שמחה', 'רמזים', 'תלמידים'],
    isActive: true,
    isFeatured: true
  }
};
