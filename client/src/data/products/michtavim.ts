import type { Product, ProductVariant } from '../../../../shared/schema';

// Real Breslov books data extracted from authentic source documents
// רשימת ספרי הקרן כולל שפות מעודכן אלול תשפ''ה & תיאור ספרי הקרן לאתר

// michtavim products (3 items)
export const michtavimProducts: Record<string, Product> = {
  'alim-letrufah': {
    id: 'alim-letrufah',
    name: 'עלים לתרופה',
    nameEnglish: 'Alim Letrufah',
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: 'מאות מכתביו של רבי נתן, ששלח לבניו ולתלמידיו עד סמוך לפטירתו. מכתבים אלו הם אוצר בלום של יראת שמים, התחזקות, שיחות קודש, עצות מאירות חיים, ורוויים בדביקות עזה ברבינו.',
    descriptionEnglish: 'Hundreds of letters from Rabbi Nathan, sent to his sons and students until close to his passing. These letters are a treasury of fear of Heaven, strengthening, holy conversations, and life-illuminating advice.',
    category: 'מכתבים וכתבים',
    subcategory: 'מכתבי רבי נתן',
    author: 'רבי נתן מברסלב',
    publisher: 'קרן רבי ישראל',
    language: 'עברית',
    languageGroupId: 'alim-letrufah-group',
    pages: 1088,
    isbn: '978-965-7023-13-4',
    images: [
      '/attached_assets/עלים לתרופה 1_1757275910546.jpg',
      '/attached_assets/עלים לתרופה 1_1757278339721.jpg',
      '/attached_assets/עלים לתרופה 1_1757281125910.jpg',
      '/attached_assets/עלים_1757281085507.jpg'
    ],
    variants: [
      {
        id: 'large-skai',
        format: 'סקאי',
        binding: 'קשה',
        size: 'גדול',
        dimensions: '24*17',
        volumes: 1,
        price: 40,
        inStock: true,
        stockQuantity: 25
      },
      {
        id: 'large-leather-pearl',
        format: 'דמוי עור לבן/פנינה',
        binding: 'קשה',
        size: 'גדול',
        dimensions: '24*17',
        volumes: 1,
        price: 50,
        inStock: true,
        stockQuantity: 15
      },
      {
        id: 'medium-skai-3vol',
        format: 'סקאי',
        binding: 'קשה',
        size: 'בינוני',
        dimensions: '17*12',
        volumes: 3,
        price: 90,
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
        price: 35,
        inStock: true,
        stockQuantity: 30
      }
    ],
    features: [
      'מכתבי קודש של רבי נתן',
      'אוצר של יראת שמים',
      'עצות מאירות חיים',
      'דביקות עזה ברבינו',
      'שיחות קודש והתחזקות'
    ],
    tags: ['מכתבים', 'רבי נתן', 'יראת שמים', 'התחזקות', 'עצות'],
    isActive: true,
    isFeatured: true
  },
  'mikhtavei-rabbi-natan-tiveria': {
    id: 'mikhtavei-rabbi-natan-tiveria',
    name: 'מכתבי רבי נתן מטבריה',
    nameEnglish: 'Mikhtavei Rabbi Natan MeTiveria',
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: 'ספר המכיל קרוב למאתיים מכתבים שכתב רבי נתן ב"ר יהודה מטבריה, מתלמידיו המובהקים של רבי נתן, לידידיו בארץ ובחו"ל. גדוש בשיחות ודיבורים נלהבים בגדולת רבינו ותלמידו רבי נתן, מעלת לימוד ספריהם, והתחזקות בעבודת השם.',
    descriptionEnglish: 'Book containing nearly two hundred letters written by Rabbi Nathan bar Yehuda of Tiberias, one of Rabbi Nathan\'s distinguished students, to friends in Israel and abroad. Full of enthusiastic conversations about the greatness of Rabbenu and Rabbi Nathan.',
    category: 'מכתבים',
    subcategory: 'מכתבי קודש',
    author: 'רבי נתן בר יהודה מטבריה',
    publisher: 'קרן רבי ישראל',
    language: 'עברית',
    pages: 380,
    isbn: '978-965-7023-53-0',
    images: [
      '/attached_assets/מכתבי ר נתן 1_1757281125910.jpg',
      '/attached_assets/מכתבי ר נתן_1757281003113.jpg'
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
        stockQuantity: 18
      }
    ],
    features: [
      'מאתיים מכתבים',
      'תלמיד רבי נתן',
      'מטבריה הקדושה',
      'התחזקות באמונה',
      'לימוד ספרי רבינו'
    ],
    tags: ['מכתבים', 'טבריה', 'תלמיד', 'התחזקות', 'אמונה'],
    isActive: true,
    isFeatured: false
  },
  'avi-hanachal': {
    id: 'avi-hanachal',
    name: 'אב\'י הנחל',
    nameEnglish: 'Avi HaNachal',
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: 'מכתביו הנפלאים של רבי ישראל דוב אודסר, בעיקר אלו שנשלחו לזלמן שזר. המכתבים מכילים דיבורים קדושים, מחזקים ומעודדים, מספרי רבינו ורבי נתן, לאמץ ברכיים כושלות ולחזק ידיים רפות. להחדיר בלב הקורא אמונה בה\' יתברך ובצדיק האמת.',
    descriptionEnglish: 'The wonderful letters of Rabbi Yisrael Dov Odesser, especially those sent to Zalman Shazar. The letters contain holy words, strengthening and encouraging, from Rabbenu and Rabbi Nathan\'s books, to strengthen weak knees and fortify drooping hands.',
    category: 'מכתבים',
    subcategory: 'מכתבי אודסר',
    author: 'רבי ישראל דוב אודסר',
    publisher: 'קרן רבי ישראל',
    language: 'עברית',
    pages: 280,
    isbn: '978-965-7023-56-1',
    images: [
      '/attached_assets/אבי הנחל_1757281003110.jpg',
      '/attached_assets/אבי הנחל באנגלית_1757280778284.jpg'
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
        id: 'large-leather-like-pearl',
        format: 'דמוי עור לבן/פנינה',
        binding: 'קשה',
        size: 'גדול',
        dimensions: '24*17',
        volumes: 1,
        price: 45,
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
        stockQuantity: 80
      },
      {
        id: 'french-medium-2vol',
        format: 'צרפתית',
        binding: 'קשה',
        size: 'בינוני',
        dimensions: '17*12',
        volumes: 2,
        price: 64,
        inStock: true,
        stockQuantity: 12
      }
    ],
    features: [
      'מכתבי אודסר הקדושים',
      'לזלמן שזר נכתבו',
      'חיזוק ועידוד',
      'אמונה בצדיק',
      'דיבורים קדושים'
    ],
    tags: ['אודסר', 'מכתבים', 'חיזוק', 'אמונה', 'צדיק'],
    isActive: true,
    isFeatured: true
  }
};
