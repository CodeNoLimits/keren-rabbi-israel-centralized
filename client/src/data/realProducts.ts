import type { Product, ProductVariant } from '../../../shared/schema';

// Real Breslov books data extracted from authentic source documents
// רשימת ספרי הקרן כולל שפות מעודכן אלול תשפ''ה & תיאור ספרי הקרן לאתר
export const realBreslovProducts: Record<string, Product> = {
  'likutei-moharan': {
    id: 'likutei-moharan',
    name: 'ליקוטי מוהר"ן',
    nameEnglish: 'Likutei Moharan',
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: 'חיבורו הגדול, הקדוש והנורא, של רבינו רבי נחמן מברסלב. מכיל מאות "תורות" - מאמרי קודש שנאמרו על ידי רבינו בשבתות, בחגים ובמועדים שונים. חלקם נכתב על ידי רבינו עצמו, וחלקם הגדול על ידי סופרו ותלמידו הנאמן רבי נתן.',
    descriptionEnglish: 'The great, holy and awesome work of our teacher Rabbi Nachman of Breslov. Contains hundreds of "teachings" - holy discourses given by Rabbenu on Sabbaths, holidays and various occasions.',
    category: 'ספרי רבינו',
    subcategory: 'ליקוטי מוהר"ן',
    author: 'רבי נחמן מברסלב',
    publisher: 'קרן רבי ישראל',
    language: 'עברית',
    pages: 960,
    isbn: '978-965-7023-01-1',
    images: [
      '/attached_assets/ליקוטי מוהרן 1_1757275910545.jpg',
      '/attached_assets/ליקוטי מוהרן 1_1757278339720.jpg',
      '/attached_assets/ליקוטי מוהרן 1_1757281125909.jpg',
      '/attached_assets/ליקוטי מוהרן 2_1757280401419.jpg'
    ],
    variants: [
      {
        id: 'giant-skai-with-commentaries',
        format: 'סקאי עם מפרשים',
        binding: 'קשה',
        size: 'ענק',
        dimensions: '32*22',
        volumes: 1,
        price: 95,
        inStock: true,
        stockQuantity: 15
      },
      {
        id: 'giant-skai',
        format: 'סקאי',
        binding: 'קשה',
        size: 'ענק',
        dimensions: '32*22',
        volumes: 1,
        price: 55,
        inStock: true,
        stockQuantity: 20
      },
      {
        id: 'large-skai-with-commentaries',
        format: 'סקאי עם מפרשים',
        binding: 'קשה',
        size: 'גדול',
        dimensions: '24*17',
        volumes: 1,
        price: 55,
        inStock: true,
        stockQuantity: 12
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
        stockQuantity: 40
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
        stockQuantity: 50
      },
      {
        id: 'medium-leather-pearl',
        format: 'דמוי עור לבן/פנינה',
        binding: 'קשה',
        size: 'בינוני',
        dimensions: '17*12',
        volumes: 1,
        price: 45,
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
        price: 25,
        inStock: true,
        stockQuantity: 60
      },
      {
        id: 'small-nylon-3vol',
        format: 'רך נילון',
        binding: 'רך',
        size: 'קטן',
        dimensions: '12*8',
        volumes: 3,
        price: 40,
        inStock: true,
        stockQuantity: 30
      },
      {
        id: 'english-large-3vol',
        format: 'סקאי אנגלית',
        binding: 'קשה',
        size: 'גדול',
        dimensions: '24*17',
        volumes: 3,
        price: 165,
        inStock: true,
        stockQuantity: 8
      },
      {
        id: 'english-giant',
        format: 'סקאי אנגלית',
        binding: 'קשה',
        size: 'ענק',
        dimensions: '32*22',
        volumes: 1,
        price: 160,
        inStock: true,
        stockQuantity: 6
      }
    ],
    features: [
      'חיבורו הגדול של רבי נחמן',
      'מאות תורות קדושות',
      'נדפס עוד בחיי רבינו',
      'בסיס לכל חסידות ברסלב',
      'זמין במגוון גדלים וכריכות'
    ],
    tags: ['ליקוטי מוהר"ן', 'תורות', 'רבי נחמן', 'יסוד', 'קדושה'],
    isActive: true,
    isFeatured: true
  },

  'kitzur-likutei-moharan': {
    id: 'kitzur-likutei-moharan',
    name: 'קיצור ליקוטי מוהר"ן',
    nameEnglish: 'Kitzur Likutei Moharan',
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: 'פסקאות מקוצרות מתורותיו של רבינו רבי נחמן, הספר נערך בפקודתו על ידי תלמידו רבי נתן. על הספר כותב רבי ישראל קרדונר באחד ממכתביו: "והספר הזה היה יקר מאוד בעיני מורנו הרב הצדיק ר\' נתן זצ"ל ופקד וציווה לכל אנשיו לעסוק וללמוד בו בכל יום"',
    descriptionEnglish: 'Shortened passages from the teachings of Rabbenu Rabbi Nachman, compiled under his direction by his student Rabbi Nathan.',
    category: 'ספרי רבינו',
    subcategory: 'קיצורים',
    author: 'רבי נחמן מברסלב',
    publisher: 'קרן רבי ישראל',
    language: 'עברית',
    pages: 416,
    isbn: '978-965-7023-02-8',
    images: [
      '/attached_assets/קיצור ליקומ 1_1757275910546.jpg',
      '/attached_assets/קיצור ליקומ 1_1757278339721.jpg',
      '/attached_assets/קיצור ליקומ 1_1757281125911.jpg',
      '/attached_assets/קיצור ליקומ_1757281085509.jpg'
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
      'פסקאות מקוצרות',
      'נערך בפקודת רבינו',
      'ליקוט מהתורות הקדושות',
      'מתאים ללימוד יומיומי',
      'יקר בעיני רבי נתן'
    ],
    tags: ['קיצור', 'ליקוטי מוהר"ן', 'לימוד יומיומי', 'רבי נתן'],
    isActive: true,
    isFeatured: true
  },

  'likutei-tefilot': {
    id: 'likutei-tefilot',
    name: 'ליקוטי תפילות',
    nameEnglish: 'Likutei Tefilot',
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: 'תפילותיו הנפלאות של רבי נתן, שחוברו על בסיס תורות רבי נחמן מליקוטי מוהר"ן. עליהם אמר רבינו: "תפילות הנעשות מהתורות - מעלות שעשועים למעלה שמעולם לא עלו!"',
    descriptionEnglish: 'The wonderful prayers of Rabbi Nathan, composed based on Rabbi Nachman\'s teachings from Likutei Moharan. About them Rabbenu said: "Prayers made from the teachings - cause delights above that never existed before!"',
    category: 'תפילות',
    subcategory: 'ליקוטי תפילות',
    author: 'רבי נתן מברסלב',
    publisher: 'קרן רבי ישראל',
    language: 'עברית',
    pages: 1152,
    isbn: '978-965-7023-12-7',
    images: [
      '/attached_assets/ליקוטי תפילות 1_1757275910545.jpg',
      '/attached_assets/ליקוטי תפילות 1_1757278339720.jpg',
      '/attached_assets/ליקוטי תפילות 1_1757281125910.jpg',
      '/attached_assets/ליקוטי תפילות 2_1757280401419.jpg'
    ],
    variants: [
      {
        id: 'large-leather',
        format: 'עור',
        binding: 'קשה',
        size: 'גדול',
        dimensions: '24*17',
        volumes: 1,
        price: 120,
        inStock: true,
        stockQuantity: 15
      },
      {
        id: 'large-skai-with-prayers-2vol',
        format: 'סקאי עם תפילות ותחנונים',
        binding: 'קשה',
        size: 'גדול',
        dimensions: '24*17',
        volumes: 2,
        price: 80,
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
        price: 40,
        inStock: true,
        stockQuantity: 35
      },
      {
        id: 'medium-skai-with-prayers-3vol',
        format: 'סקאי עם תפילות ותחנונים',
        binding: 'קשה',
        size: 'בינוני',
        dimensions: '17*12',
        volumes: 3,
        price: 90,
        inStock: true,
        stockQuantity: 18
      },
      {
        id: 'medium-leather-like',
        format: 'דמוי עור',
        binding: 'קשה',
        size: 'בינוני',
        dimensions: '17*12',
        volumes: 1,
        price: 50,
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
        price: 35,
        inStock: true,
        stockQuantity: 40
      },
      {
        id: 'small-leather-like',
        format: 'דמוי עור',
        binding: 'רך',
        size: 'קטן',
        dimensions: '12*8',
        volumes: 1,
        price: 55,
        inStock: true,
        stockQuantity: 20
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
        stockQuantity: 60
      },
      {
        id: 'small-laminated-3vol',
        format: 'למנציה רך',
        binding: 'רך',
        size: 'קטן',
        dimensions: '12*8',
        volumes: 3,
        price: 40,
        inStock: true,
        stockQuantity: 35
      },
      {
        id: 'medium-laminated-12vol',
        format: 'למנציה רך',
        binding: 'רך',
        size: 'בינוני',
        dimensions: '17*12',
        volumes: 12,
        price: 60,
        inStock: true,
        stockQuantity: 15
      }
    ],
    features: [
      'תפילות מיוסדות על תורות רבי נחמן',
      'חיבורו הנפלא של רבי נתן',
      'מעלה שעשועים למעלה',
      'זמין במגוון כריכות וגדלים',
      'איכות הדפסה מעולה'
    ],
    tags: ['תפילות', 'רבי נתן', 'ליקוטי תפילות', 'תחנונים', 'קדושה'],
    isActive: true,
    isFeatured: true
  },

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

  'siporei-masiyot': {
    id: 'siporei-masiyot',
    name: 'סיפורי מעשיות',
    nameEnglish: 'Stories of Rabbi Nachman',
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: 'שלוש עשרה מעשיות, בתוספת סיפורים קצרים, שסיפר רבי נחמן בארבע שנות חייו האחרונות. נרשמו על ידי תלמידו רבי נתן בשפת האידיש כפי שסופרו על ידי רבינו ואף תורגמו על ידו ללשון הקודש.',
    descriptionEnglish: 'Thirteen tales, plus short stories, told by Rabbi Nachman in the last four years of his life. Recorded by his student Rabbi Nathan in Yiddish as told by Rabbenu and translated by him into Hebrew.',
    category: 'סיפורים ומעשיות',
    subcategory: 'סיפורי רבינו',
    author: 'רבי נחמן מברסלב',
    publisher: 'קרן רבי ישראל',
    language: 'עברית',
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

  'sefer-hamidot': {
    id: 'sefer-hamidot',
    name: 'ספר המידות',
    nameEnglish: 'Sefer Hamidot',
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: 'מכיל פסקאות קצרות ותמציתיות במעלת המידות הטובות ובחובת ההתרחקות ממידות רעות, הספר נכתב על ידי רבינו עוד בילדותו, רובו נלקט ממאמרי חז"ל וחלקו הינו השגות של רבינו עצמו. רבינו התבטא עליו "הספר הזה - עשה אותי יהודי"',
    descriptionEnglish: 'Contains short and concise passages about the excellence of good character traits and the obligation to distance oneself from bad ones. Written by Rabbenu in his youth, mostly collected from the sayings of our Sages.',
    category: 'מוסר והדרכה',
    subcategory: 'מידות טובות',
    author: 'רבי נחמן מברסלב',
    publisher: 'קרן רבי ישראל',
    language: 'עברית',
    pages: 320,
    isbn: '978-965-7023-15-8',
    images: [
      '/attached_assets/ספר המידות 1_1757275910546.jpg',
      '/attached_assets/ספר המידות 1_1757278339721.jpg',
      '/attached_assets/ספר המידות 1_1757281125910.jpg',
      '/attached_assets/ספר המידות 2_1757280401419.jpg'
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
      'נכתב בילדות רבינו',
      'מידות טובות ורעות',
      'פסקאות קצרות וחדות',
      'בסיס למוסר יהודי',
      'הספר שעשה את רבינו יהודי'
    ],
    tags: ['מידות', 'מוסר', 'ילדות רבינו', 'חז"ל', 'אלף בית'],
    isActive: true,
    isFeatured: true
  },

  'hishtapchut-hanefesh': {
    id: 'hishtapchut-hanefesh',
    name: 'השתפכות הנפש ומשיבת נפש',
    nameEnglish: 'Outpouring of the Soul',
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: 'לקט שיחות ודיבורים נפלאים במעלת ההתבודדות והשיחה של היהודי בינו לבין קונו - העצה העיקרית והמרכזית של רבינו הקדוש רבי נחמן, שהתבטא: "מקטן ועד גדול, אי אפשר להיות יהודי כשר, כי אם על ידי התבודדות"',
    descriptionEnglish: 'A collection of wonderful conversations and speeches about the excellence of seclusion and the conversation of the Jew between him and his Creator - the main and central advice of our holy Rebbe Nachman.',
    category: 'התבודדות ותפילה',
    subcategory: 'השתפכות הנפש',
    author: 'רבי נחמן מברסלב',
    publisher: 'קרן רבי ישראל',
    language: 'עברית',
    pages: 242,
    isbn: '978-965-7023-16-5',
    images: [
      '/attached_assets/השתפכות 1_1757275910544.jpg',
      '/attached_assets/השתפכות 1_1757278339719.jpg',
      '/attached_assets/השתפכות 2_1757275875791.jpg',
      '/attached_assets/השתפכות_1757281003111.jpg'
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
        price: 20,
        inStock: true,
        stockQuantity: 50
      }
    ],
    features: [
      'העצה המרכזית של רבינו',
      'התבודדות יומיומית',
      'שיחה בינו לבין קונו',
      'ליקוט נפלא מכל הספרים',
      'הדרכה מעשית'
    ],
    tags: ['התבודדות', 'תפילה', 'השתפכות', 'משיבת נפש', 'עצה מרכזית'],
    isActive: true,
    isFeatured: true
  },

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
  },

  'likutei-etzot': {
    id: 'likutei-etzot',
    name: 'ליקוטי עצות',
    nameEnglish: 'Likutei Etzot',
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: 'ספרו של רבי נתן מברסלב, מכיל עצות מעשיות לחיי היומיום המובאות מתוך ספרי רבינו. הספר מסודר לפי נושאים ומהווה מדריך פרקטי לעבודת השם.',
    descriptionEnglish: 'The book of Rabbi Nathan of Breslov, containing practical advice for daily life brought from Rabbenu\'s books. The book is organized by topics and serves as a practical guide for divine service.',
    category: 'עצות והדרכה',
    subcategory: 'עצות מעשיות',
    author: 'רבי נתן מברסלב',
    publisher: 'קרן רבי ישראל',
    language: 'עברית',
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
  },

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
  },

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
  },

  'tehilim': {
    id: 'tehilim',
    name: 'תהילים',
    nameEnglish: 'Tehilim (Psalms)',
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: '"מי שרוצה לזכות לתשובה - יהיה רגיל באמירת תהלים, כי אמירת תהלים מסוגל לתשובה" מגלה רבינו הקדוש רבי נחמן (ליקוטי מוהר"ן עג) מהדורה מיוחדת, באותיות גדולות ומאירות עיניים, עם ליקוטי הלכות מרבי נתן, על הדף, לפי סדר המזמורים.',
    descriptionEnglish: '"Whoever wants to merit repentance - should be regular in saying Tehilim, for saying Tehilim is conducive to repentance" reveals our holy Rebbe Nachman. Special edition with large, clear letters, with Likutei Halakhot from Rabbi Nathan on the page.',
    category: 'תנ"ך ותפילה',
    subcategory: 'תהילים',
    author: 'דוד המלך',
    publisher: 'קרן רבי ישראל',
    language: 'עברית',
    pages: 350,
    isbn: '978-965-7023-24-0',
    images: [
      '/attached_assets/תהילים 1_1757275910547.jpg',
      '/attached_assets/תהילים 1_1757278339722.jpg',
      '/attached_assets/תהילים 1_1757281125911.jpg'
    ],
    variants: [
      {
        id: 'large-skai-with-halakhot',
        format: 'סקאי עם ליקוטי הלכות',
        binding: 'קשה',
        size: 'גדול',
        dimensions: '24*17',
        volumes: 1,
        price: 35,
        inStock: true,
        stockQuantity: 25
      },
      {
        id: 'medium-skai-with-tzadikim',
        format: 'סקאי עם שמות הצדיקים',
        binding: 'קשה',
        size: 'בינוני',
        dimensions: '17*12',
        volumes: 1,
        price: 30,
        inStock: true,
        stockQuantity: 30
      },
      {
        id: 'medium-leather-pearl',
        format: 'דמוי עור לבן/פנינה',
        binding: 'קשה',
        size: 'בינוני',
        dimensions: '17*12',
        volumes: 1,
        price: 40,
        inStock: true,
        stockQuantity: 20
      },
      {
        id: 'small-laminated-tzadikim',
        format: 'למנציה עם שמות הצדיקים',
        binding: 'רך',
        size: 'קטן',
        dimensions: '12*8',
        volumes: 1,
        price: 20,
        inStock: true,
        stockQuantity: 50
      }
    ],
    features: [
      'אותיות גדולות ומאירות עיניים',
      'עם ליקוטי הלכות על הדף',
      'מסוגל לתשובה',
      'לפי סדר המזמורים',
      'דברי רבינו על התהילים'
    ],
    tags: ['תהילים', 'תשובה', 'תפילה', 'ליקוטי הלכות', 'מזמורים'],
    isActive: true,
    isFeatured: true
  },

  'rosh-hashana-sheli': {
    id: 'rosh-hashana-sheli',
    name: 'ראש השנה שלי',
    nameEnglish: 'My Rosh Hashanah',
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: 'מכיל ליקוט מספרי רבינו, על מעלת קדושת הראש השנה, והנסיעה לראש השנה לצדיק האמת. כך כותב רבי נתן בשם רבינו נחמן מברסלב: "אמר: הראש השנה שלי עולה על הכל. והיה פלא אצלי מאחר שהמקורבים שלי מאמינים לי, ולמה לא יזהרו כל האנשים המקורבים אלי שיהיו כולם על ראש השנה, איש לא יעדר."',
    descriptionEnglish: 'Contains a collection from Rabbenu\'s books about the excellence and holiness of Rosh Hashanah, and traveling to the true Tzaddik for Rosh Hashanah.',
    category: 'מועדי השנה',
    subcategory: 'ראש השנה',
    author: 'רבי נחמן מברסלב',
    publisher: 'קרן רבי ישראל',
    language: 'עברית',
    pages: 320,
    isbn: '978-965-7023-25-7',
    images: [
      '/attached_assets/ראש השנה שלי 1_1757275239936.jpg',
      '/attached_assets/ראש השנה שלי 2_1757275239936.jpg',
      '/attached_assets/הראש השנה שלי 3_1757275239935.jpg'
    ],
    variants: [
      {
        id: 'medium-skai-4vol',
        format: 'סקאי',
        binding: 'קשה',
        size: 'בינוני',
        dimensions: '17*12',
        volumes: 4,
        price: 120,
        inStock: true,
        stockQuantity: 25
      }
    ],
    features: [
      'ליקוט מכל ספרי רבינו',
      'קדושת ראש השנה',
      'נסיעה לצדיק האמת',
      'הראש השנה שלי עולה על הכל',
      'מתאים לחודש אלול וראש השנה'
    ],
    tags: ['ראש השנה', 'מועדים', 'אלול', 'צדיק', 'נסיעה'],
    isActive: true,
    isFeatured: true
  },

  'itzumo-shel-yom': {
    id: 'itzumo-shel-yom',
    name: 'עיצומו של יום',
    nameEnglish: 'The Essence of the Day',
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: 'מכיל ליקוט מכל ספרי רבינו ורבי נתן על מעלת וקדושת יום הכיפורים, שכדברי הגמרא "עיצומו של יום מכפר" "כי ביום הזה יכפר עליכם מכל חטאתיכם"',
    descriptionEnglish: 'Contains a collection from all of Rabbenu and Rabbi Nathan\'s books about the excellence and holiness of Yom Kippur, as the Talmud says "the essence of the day atones".',
    category: 'מועדי השנה',
    subcategory: 'יום כיפור',
    author: 'רבי נחמן מברסלב',
    publisher: 'קרן רבי ישראל',
    language: 'עברית',
    pages: 250,
    isbn: '978-965-7023-26-4',
    images: [
      '/attached_assets/אוצר היראה 1_1757275234154.jpg',
      '/attached_assets/אוצר היראה 2_1757275234155.jpg',
      '/attached_assets/1_1757275751755.jpg'
    ],
    variants: [
      {
        id: 'medium-skai-2vol',
        format: 'סקאי',
        binding: 'קשה',
        size: 'בינוני',
        dimensions: '17*12',
        volumes: 2,
        price: 70,
        inStock: true,
        stockQuantity: 20
      }
    ],
    features: [
      'קדושת יום כיפור',
      'עיצומו של יום מכפר',
      'ליקוט מכל הספרים',
      'כפרה וסליחה',
      'יום הדין הגדול'
    ],
    tags: ['יום כיפור', 'כפרה', 'סליחה', 'דין', 'קדושה'],
    isActive: true,
    isFeatured: true
  },

  'ki-naar-yisrael': {
    id: 'ki-naar-yisrael',
    name: 'כי נער ישראל',
    nameEnglish: 'For Israel is a Youth',
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: 'ליקוט מכל ספרי רבינו ורבי נתן, על חינוך הנערים, כולל תפילות לזכות לבנים ובנות יראי השם. על שם הפסוק "כי נער ישראל ואוהבהו וממצרים קראתי לבני" (הושע יא, א)',
    descriptionEnglish: 'A collection from all of Rabbenu and Rabbi Nathan\'s books about educating children, including prayers for meriting God-fearing sons and daughters.',
    category: 'מועדי השנה',
    subcategory: 'סוכות',
    author: 'רבי נחמן מברסלב',
    publisher: 'קרן רבי ישראל',
    language: 'עברית',
    pages: 300,
    isbn: '978-965-7023-27-1',
    images: [
      '/attached_assets/כל בו 1_1757275910545.jpg',
      '/attached_assets/כל בו 2_1757280401418.jpg',
      '/attached_assets/2_1757275751756.jpg'
    ],
    variants: [
      {
        id: 'medium-skai-3vol',
        format: 'סקאי',
        binding: 'קשה',
        size: 'בינוני',
        dimensions: '17*12',
        volumes: 3,
        price: 90,
        inStock: true,
        stockQuantity: 18
      }
    ],
    features: [
      'חינוך נערים',
      'תפילות לבנים יראי השם',
      'על שם הפסוק בהושע',
      'ליקוט מכל הספרים',
      'חג הסוכות'
    ],
    tags: ['חינוך', 'נערים', 'בנים', 'סוכות', 'תפילות'],
    isActive: true,
    isFeatured: true
  },

  'toda-vehodaa': {
    id: 'toda-vehodaa',
    name: 'תודה והודאה',
    nameEnglish: 'Thanks and Gratitude',
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: 'מכיל ליקוט מכל ספרי רבינו ורבי נתן, על מעלת התודה וההודאה להשם יתברך שבכוחם להוציא את האדם מצרה לרווחה. מיוסד בעיקר על התורה \'ימי חנוכה הם ימי הודאה\' המובאת בליקוטי מוהר"ן חלק שני.',
    descriptionEnglish: 'Contains a collection from all of Rabbenu and Rabbi Nathan\'s books about the excellence of thanks and gratitude to God, which have the power to bring a person from distress to relief.',
    category: 'מועדי השנה',
    subcategory: 'חנוכה',
    author: 'רבי נחמן מברסלב',
    publisher: 'קרן רבי ישראל',
    language: 'עברית',
    pages: 220,
    isbn: '978-965-7023-28-8',
    images: [
      '/attached_assets/תודה והודאה 1_1757281336534.jpg',
      '/attached_assets/תודה והודאה 2_1757281336535.jpg',
      '/attached_assets/תודה והודאה 3_1757281336535.jpg'
    ],
    variants: [
      {
        id: 'medium-skai-2vol',
        format: 'סקאי כולל הדלקת נרות',
        binding: 'קשה',
        size: 'בינוני',
        dimensions: '17*12',
        volumes: 2,
        price: 60,
        inStock: true,
        stockQuantity: 22
      }
    ],
    features: [
      'מעלת התודה וההודאה',
      'ימי חנוכה הם ימי הודאה',
      'להוציא מצרה לרווחה',
      'כולל הדלקת נרות',
      'ליקוט מכל הספרים'
    ],
    tags: ['חנוכה', 'תודה', 'הודאה', 'הדלקת נרות', 'ישועה'],
    isActive: true,
    isFeatured: true
  },

  'hatchalat-hathchlatot': {
    id: 'hatchalat-hathchlatot',
    name: 'התחלת ההתחלות',
    nameEnglish: 'Beginning of Beginnings',
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: '"ועכשיו - כל ההתחלות מפורים" גילה רבינו הקדוש רבי נחמן (ליקוטי מוהר"ן עד). הספר מכיל ליקוט מכל ספרי רבינו ורבי נתן, על מעלת וקדושת יום הפורים, שהוא ההתחלה של כל ההתחלות. כולל מגילת אסתר, במהדורה מאירת עיניים.',
    descriptionEnglish: '"And now - all beginnings are from Purim" revealed our holy Rebbe Nachman. The book contains a collection from all of Rabbenu and Rabbi Nathan\'s books about the excellence and holiness of Purim day.',
    category: 'מועדי השנה',
    subcategory: 'פורים',
    author: 'רבי נחמן מברסלב',
    publisher: 'קרן רבי ישראל',
    language: 'עברית',
    pages: 380,
    isbn: '978-965-7023-29-5',
    images: [
      '/attached_assets/התחלת ההתחלות 1_1757275250997.jpg',
      '/attached_assets/התחלת ההתחלות 2_1757275250998.jpg',
      '/attached_assets/התחלת ההתחלות 3_1757275250998.jpg'
    ],
    variants: [
      {
        id: 'medium-skai-4vol',
        format: 'סקאי כולל מגילת אסתר',
        binding: 'קשה',
        size: 'בינוני',
        dimensions: '17*12',
        volumes: 4,
        price: 120,
        inStock: true,
        stockQuantity: 20
      }
    ],
    features: [
      'כל ההתחלות מפורים',
      'ההתחלה של כל ההתחלות',
      'כולל מגילת אסתר מאירת עיניים',
      'קדושת יום הפורים',
      'ליקוט מכל ספרי רבינו'
    ],
    tags: ['פורים', 'התחלות', 'מגילת אסתר', 'שמחה', 'קדושה'],
    isActive: true,
    isFeatured: true
  },

  'hitgalut-hadaat': {
    id: 'hitgalut-hadaat',
    name: 'התגלות הדעת',
    nameEnglish: 'Revelation of Knowledge',
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: 'מכיל ליקוט מכל ספרי רבינו נחמן ותלמידו רבי נתן, על מעלת וקדושת חג הפסח, שבו מתגלה אורו של הרועה הנאמן, משה רבינו, החוזר ומתגלה בכל דור. כולל הגדה של פסח מאירת עיניים.',
    descriptionEnglish: 'Contains a collection from all of Rabbenu Nachman and his student Rabbi Nathan\'s books about the excellence and holiness of Passover, when the light of the faithful shepherd, Moses our teacher, is revealed anew in every generation.',
    category: 'מועדי השנה',
    subcategory: 'פסח',
    author: 'רבי נחמן מברסלב',
    publisher: 'קרן רבי ישראל',
    language: 'עברית',
    pages: 420,
    isbn: '978-965-7023-30-1',
    images: [
      '/attached_assets/התגלות הדעת 1_1757275244732.jpg',
      '/attached_assets/התגלות הדעת 2_1757275244733.jpg',
      '/attached_assets/התגלות הדעת 3_1757275244733.jpg',
      '/attached_assets/התגלות הדעת 4_1757275244733.jpg'
    ],
    variants: [
      {
        id: 'medium-skai-5vol',
        format: 'סקאי כולל הגדה של פסח',
        binding: 'קשה',
        size: 'בינוני',
        dimensions: '17*12',
        volumes: 5,
        price: 150,
        inStock: true,
        stockQuantity: 18
      }
    ],
    features: [
      'התגלות משה רבינו',
      'קדושת חג הפסח',
      'כולל הגדה של פסח מאירת עיניים',
      'הרועה הנאמן',
      'ליקוט מכל ספרי רבינו ורבי נתן'
    ],
    tags: ['פסח', 'הגדה', 'משה רבינו', 'התגלות', 'חירות'],
    isActive: true,
    isFeatured: true
  },

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
  },

  'chumash-likutei-halakhot': {
    id: 'chumash-likutei-halakhot',
    name: 'חומש עם ליקוטי הלכות',
    nameEnglish: 'Pentateuch with Likutei Halakhot',
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: 'סט חמישה חומשי תורה באותיות מאירות עיניים, כולל בתוכו תרגום אונקלוס ופירוש רש"י, בתוספת ליקוט נפלא ממשנתו של רבינו נחמן מברסלב זיע"א על הפרשה, מספר ליקוטי הלכות לרבי נתן מברסלב זצ"ל. ערוך ומסודר על הדף, בצורה נוחה וקלה ללמידה.',
    descriptionEnglish: 'Set of five Torah volumes with illuminating letters, including Onkelos translation and Rashi commentary, plus a wonderful collection from Rabbi Nachman\'s teachings on the weekly portion, from Likutei Halakhot by Rabbi Nathan.',
    category: 'חומשים ותנ"ך',
    subcategory: 'חומש עם פירושים',
    author: 'רבי נתן מברסלב',
    publisher: 'קרן רבי ישראל',
    language: 'עברית',
    pages: 1250,
    isbn: '978-965-7023-32-5',
    images: [
      '/attached_assets/חומש עם ליקוטי הלכות בינוני 1_1757275732701.jpg',
      '/attached_assets/חומש עם ליקוטי הלכות בינוני 2_1757275732701.jpg',
      '/attached_assets/חומש עם ליקוטי הלכות בינוני 3_1757275732702.jpg'
    ],
    variants: [
      {
        id: 'large-skai-5vol',
        format: 'סקאי',
        binding: 'קשה',
        size: 'גדול',
        dimensions: '24*17',
        volumes: 5,
        price: 175,
        inStock: true,
        stockQuantity: 12
      },
      {
        id: 'large-leather-5vol',
        format: 'דמוי עור חום',
        binding: 'קשה',
        size: 'גדול',
        dimensions: '24*17',
        volumes: 5,
        price: 225,
        inStock: true,
        stockQuantity: 8
      },
      {
        id: 'medium-skai-5vol',
        format: 'סקאי עם תפילות שבת',
        binding: 'קשה',
        size: 'בינוני',
        dimensions: '17*12',
        volumes: 5,
        price: 150,
        inStock: true,
        stockQuantity: 15
      },
      {
        id: 'medium-leather-5vol',
        format: 'דמוי עור',
        binding: 'קשה',
        size: 'בינוני',
        dimensions: '17*12',
        volumes: 5,
        price: 175,
        inStock: true,
        stockQuantity: 10
      }
    ],
    features: [
      'חמישה חומשי תורה',
      'אותיות מאירות עיניים',
      'תרגום אונקלוס ורש"י',
      'ליקוטי הלכות על הפרשה',
      'ערוך ומסודר בנוחות'
    ],
    tags: ['חומש', 'תורה', 'ליקוטי הלכות', 'רש"י', 'פרשה'],
    isActive: true,
    isFeatured: true
  },

  'kol-bo-leyeshuot': {
    id: 'kol-bo-leyeshuot',
    name: 'כל בו לישועות',
    nameEnglish: 'Kol Bo Leyeshuot',
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: 'כשמו כן הוא. מכיל: תיקון הכללי, תיקון חצות, מנחה וערבית, שיר השירים, אמירות לישועות, אור סגולות, תפילות לקברי צדיקים, ועוד. בהוצאה מהודרת ומפוארת בכריכת עור אמיתי משובח.',
    descriptionEnglish: 'As its name suggests, it contains everything for salvation: Tikkun HaKlali, Tikkun Chatzot, afternoon and evening prayers, Song of Songs, recitations for salvation, segulot, prayers for graves of tzaddikim, and more.',
    category: 'תפילות וישועות',
    subcategory: 'אוסף תפילות',
    author: 'רבי נחמן מברסלב',
    publisher: 'קרן רבי ישראל',
    language: 'עברית',
    pages: 400,
    isbn: '978-965-7023-33-2',
    images: [
      '/attached_assets/כל בו 1_1757275910545.jpg',
      '/attached_assets/כל בו 1_1757278339720.jpg',
      '/attached_assets/כל בו 2_1757280401418.jpg'
    ],
    variants: [
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
      },
      {
        id: 'medium-genuine-leather',
        format: 'עור אמיתי',
        binding: 'קשה',
        size: 'בינוני',
        dimensions: '17*12',
        volumes: 1,
        price: 80,
        inStock: true,
        stockQuantity: 15
      },
      {
        id: 'medium-leather-like',
        format: 'דמוי עור',
        binding: 'קשה',
        size: 'בינוני',
        dimensions: '17*12',
        volumes: 1,
        price: 50,
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
        stockQuantity: 50
      },
      {
        id: 'small-nylon',
        format: 'רך נילון',
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
      'כל מה שצריך לישועות',
      'תיקון הכללי ותיקון חצות',
      'תפילות לקברי צדיקים',
      'אמירות וסגולות',
      'כריכת עור אמיתי משובח'
    ],
    tags: ['ישועות', 'תיקון', 'תפילות', 'סגולות', 'צדיקים'],
    isActive: true,
    isFeatured: true
  },

  'tikkun-haklali': {
    id: 'tikkun-haklali',
    name: 'תיקון הכללי',
    nameEnglish: 'Tikkun HaKlali',
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: 'עשרת המזמורים שגילה רבינו הקדוש רבי נחמן לתיקון הברית. במהדורת הקרן מופיע כל פסוק בפני עצמו בגודל מאיר עיניים, לפי הוראתו ורצונו של רבי ישראל דוב אודסר זצ"ל. קיים בשלושה גדלים, לפי בחירה.',
    descriptionEnglish: 'The ten psalms that our holy Rebbe Nachman revealed for rectifying the covenant. In the Keren edition, each verse appears separately in illuminating size, according to the instruction and wish of Rabbi Israel Dov Odesser.',
    category: 'תפילות וישועות',
    subcategory: 'תיקון הכללי',
    author: 'רבי נחמן מברסלב',
    publisher: 'קרן רבי ישראל',
    language: 'עברית',
    pages: 80,
    isbn: '978-965-7023-34-9',
    images: [
      '/attached_assets/תיקון הכללי_1757281158220.jpg'
    ],
    variants: [
      {
        id: 'large-laminated-soft',
        format: 'למנציה רך',
        binding: 'רך',
        size: 'גדול',
        dimensions: '24*17',
        volumes: 1,
        price: 3,
        inStock: true,
        stockQuantity: 100
      },
      {
        id: 'medium-laminated-soft',
        format: 'למנציה רך',
        binding: 'רך',
        size: 'בינוני',
        dimensions: '17*12',
        volumes: 1,
        price: 2,
        inStock: true,
        stockQuantity: 150
      },
      {
        id: 'small-laminated-soft',
        format: 'למנציה רך',
        binding: 'רך',
        size: 'קטן',
        dimensions: '12*8',
        volumes: 1,
        price: 1,
        inStock: true,
        stockQuantity: 200
      },
      {
        id: 'small-gold-laminated',
        format: 'למנציה זהב אל תירא',
        binding: 'רך',
        size: 'קטן',
        dimensions: '12*8',
        volumes: 1,
        price: 2,
        inStock: true,
        stockQuantity: 100
      },
      {
        id: 'small-soft-leather',
        format: 'עור רך',
        binding: 'רך',
        size: 'קטן',
        dimensions: '12*8',
        volumes: 1,
        price: 18,
        inStock: true,
        stockQuantity: 40
      }
    ],
    features: [
      'עשרת המזמורים הקדושים',
      'תיקון הברית',
      'כל פסוק בפני עצמו',
      'אותיות מאירות עיניים',
      'לפי רצון רבי ישראל דוב אודסר'
    ],
    tags: ['תיקון', 'מזמורים', 'ברית', 'קדושה', 'אודסר'],
    isActive: true,
    isFeatured: true
  },

  'yekara-deshabbata': {
    id: 'yekara-deshabbata',
    name: 'יקרא דשבתא',
    nameEnglish: 'Yekara DeShabbata',
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: 'חובר על ידי רבי נחמן מטשעהרין תלמיד רבי נתן. תוכן הספר: גילוי הקשר בין מאמרי רבינו הקדוש ב"ליקוטי מוהר"ן", "סיפורי מעשיות" ו"שיחות הר"ן", ליקרת קדושת שבת. המחבר מציין: "שמעתי בשם גדולי הצדיקים קדמונים שהיו מפליגין מאוד בקדושת תורתו ומאמריו הקדושים של רבינו ואמרו עליהם בפירוש שהם בבחינת קדושת שבת"',
    descriptionEnglish: 'Composed by Rabbi Nachman of Tchehrin, student of Rabbi Nathan. The book reveals the connection between Rabbenu\'s teachings in Likutei Moharan, Tales, and Sichos HaRan to the holiness of Shabbat.',
    category: 'ספרי התלמידים',
    subcategory: 'חגים ומועדים',
    author: 'רבי נחמן מטשעהרין',
    publisher: 'קרן רבי ישראל',
    language: 'עברית',
    pages: 320,
    isbn: '978-965-7023-45-5',
    images: [
      '/attached_assets/יקרא דשבתא 1_1757281125909.jpg',
      '/attached_assets/יקרא דשבתא 2_1757281003112.jpg'
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
      }
    ],
    features: [
      'קשר תורות רבינו לשבת קודש',
      'חידושים על קדושת שבת',
      'מבוסס על כל ספרי רבינו',
      'מחבר תלמיד רבי נתן',
      'גילוי עומק התורות'
    ],
    tags: ['שבת', 'קדושה', 'תורות', 'חגים', 'מטשעהרין'],
    isActive: true,
    isFeatured: true
  },

  'yareach-haeitanim': {
    id: 'yareach-haeitanim',
    name: 'ירח האיתנים',
    nameEnglish: 'Yareach HaEitanim',
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: 'חובר על ידי רבי נחמן מטשעהרין תלמיד רבי נתן. בספר הוא מראה כיצד בכל תורותיו של רבינו כלול ענין ראש השנה, יום הכיפורים, סוכות ושמיני עצרת. השם "ירח האיתנים" הוא כינוי לחודש תשרי בגמרא, על שם שהוא "איתן במצוות". הספר נדפס על ידי נכד המחבר רבי אברהם שטרנהארץ כוכב-לב.',
    descriptionEnglish: 'Composed by Rabbi Nachman of Tchehrin. Shows how all of Rabbenu\'s teachings contain the concepts of Rosh Hashana, Yom Kippur, Sukkot and Shemini Atzeret. "Yareach HaEitanim" refers to the month of Tishrei.',
    category: 'ספרי התלמידים',
    subcategory: 'חגים ומועדים',
    author: 'רבי נחמן מטשעהרין',
    publisher: 'קרן רבי ישראל',
    language: 'עברית',
    pages: 280,
    isbn: '978-965-7023-46-2',
    images: [
      '/attached_assets/3_1757275751756.jpg',
      '/attached_assets/הראש השנה שלי 3_1757275239935.jpg',
      '/attached_assets/אוירה_1757280778285.jpg'
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
        stockQuantity: 25
      }
    ],
    features: [
      'חודש תשרי המקודש',
      'ראש השנה ויום כיפור',
      'סוכות ושמיני עצרת',
      'איתן במצוות',
      'תורות רבינו על החגים'
    ],
    tags: ['תשרי', 'חגים', 'ראש השנה', 'יום כיפור', 'מועדים'],
    isActive: true,
    isFeatured: false
  },

  'maafer-lefaar': {
    id: 'maafer-lefaar',
    name: 'מאפר לפאר',
    nameEnglish: 'Me\'Afer LeFa\'ar',
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: 'ליקוט מספרי רבינו ורבי נתן על ימי בין המצרים, בהם אנו מביעים געגועינו ותשוקתנו לגאולה ולבניין בית המקדש, על שם הפסוק: "לשום לאבלי ציון, לתת להם פאר תחת אפר" (ישעיה). ספר מיוחד לימי הצום והאבלות שמחזק בתקווה ובאמונה.',
    descriptionEnglish: 'Collection from Rabbenu and Rabbi Nathan\'s books about the Three Weeks period, expressing our longing for redemption and rebuilding the Temple, based on the verse "to give them beauty for ashes" (Isaiah).',
    category: 'חגים ומועדים',
    subcategory: 'בין המצרים',
    author: 'ליקוט מספרי רבינו ורבי נתן',
    publisher: 'קרן רבי ישראל',
    language: 'עברית',
    pages: 240,
    isbn: '978-965-7023-47-9',
    images: [
      '/attached_assets/מאפר לפאר 1.jpg'
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
        stockQuantity: 30
      }
    ],
    features: [
      'ימי בין המצרים',
      'געגועים לגאולה',
      'בניין בית המקדש',
      'חיזוק באמונה',
      'פאר תחת אפר'
    ],
    tags: ['בין המצרים', 'גאולה', 'בית המקדש', 'אבלות', 'תקווה'],
    isActive: true,
    isFeatured: false
  },

  'mem-tet-shaarim': {
    id: 'mem-tet-shaarim',
    name: 'מט\' שערים',
    nameEnglish: 'Mem-Tet Sha\'arim',
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: 'ליקוט מספרי רבינו על קדושת ימי ספירת העומר שבין פסח לחג השבועות, ועניינים הקשורים לימים אלו. הספר מראה את העומק הרוחני של ספירת העומר כהכנה לקבלת התורה, ומבאר את מעלת כל יום ויום בספירה על פי תורות רבינו.',
    descriptionEnglish: 'Collection from Rabbenu\'s books about the holiness of the Counting of the Omer period between Passover and Shavuot, and matters related to these days. Shows the spiritual depth of counting as preparation for receiving the Torah.',
    category: 'חגים ומועדים',
    subcategory: 'ספירת העומר',
    author: 'ליקוט מספרי רבינו',
    publisher: 'קרן רבי ישראל',
    language: 'עברית',
    pages: 320,
    isbn: '978-965-7023-48-6',
    images: [
      '/attached_assets/מט שערים 1_1757275840464.jpg',
      '/attached_assets/מט שערים 2_1757275840465.jpg',
      '/attached_assets/מט שערים 3_1757275840465.jpg',
      '/attached_assets/מט שערים 4_1757275840466.jpg'
    ],
    variants: [
      {
        id: 'medium-skai-2vol',
        format: 'סקאי',
        binding: 'קשה',
        size: 'בינוני',
        dimensions: '17*12',
        volumes: 2,
        price: 60,
        inStock: true,
        stockQuantity: 20
      }
    ],
    features: [
      'ספירת העומר',
      'הכנה לקבלת התורה',
      'מ"ט שערי בינה',
      'קדושת הימים',
      'עומק רוחני'
    ],
    tags: ['ספירת העומר', 'תורה', 'קבלה', 'בינה', 'קדושה'],
    isActive: true,
    isFeatured: false
  },

  'sod-harashbi': {
    id: 'sod-harashbi',
    name: 'סוד הרשב"י',
    nameEnglish: 'Sod HaRashbi',
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: 'ליקוט מספרי רבינו ורבי נתן, במעלת התנא האלוקי רבי שמעון בר יוחאי ובמעלת יום ההילולא שלו בל"ג בעומר. הספר מגלה את הקשר העמוק בין תורות רבינו לבין קדושתו של רשב"י, ואת מעלת יום ל"ג בעומר כיום של שמחה וחדווה.',
    descriptionEnglish: 'Collection from Rabbenu and Rabbi Nathan\'s books about the greatness of the divine Tanna Rabbi Shimon bar Yochai and the merit of his hillula on Lag Ba\'Omer. Reveals the deep connection between Rabbenu\'s teachings and Rashbi\'s holiness.',
    category: 'חגים ומועדים',
    subcategory: 'לג בעומר',
    author: 'ליקוט מספרי רבינו ורבי נתן',
    publisher: 'קרן רבי ישראל',
    language: 'עברית',
    pages: 220,
    isbn: '978-965-7023-49-3',
    images: [
      '/attached_assets/סוד הרשבי 1_1757275910545.jpg',
      '/attached_assets/סוד הרשבי 1_1757278339720.jpg',
      '/attached_assets/סוד הרשבי 2_1757280401419.jpg'
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
      'רבי שמעון בר יוחאי',
      'לג בעומר הילולא',
      'סודות התורה',
      'שמחה וחדווה',
      'קשר לתורות רבינו'
    ],
    tags: ['רשבי', 'לג בעומר', 'הילולא', 'קבלה', 'שמחה'],
    isActive: true,
    isFeatured: false
  },

  'shaar-hachamishim': {
    id: 'shaar-hachamishim',
    name: 'שער החמישים',
    nameEnglish: 'Sha\'ar HaChamishim',
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: 'ליקוט מכל ספרי רבינו ורבי נתן על קדושת חג השבועות שהוא כידוע "שער החמישים" של הקדושה, כולל "תיקון ליל שבועות" המקובל מהאר"י ז"ל ומהשל"ה הקדוש. הספר מגלה את עומק קדושת חג מתן תורה ומעלת הלילה הקדוש.',
    descriptionEnglish: 'Collection from all of Rabbenu and Rabbi Nathan\'s books about the holiness of Shavuot, known as the "Fiftieth Gate" of holiness, including "Tikkun Leil Shavuot" from the Ari and Shelah. Reveals the depth of the Torah-giving holiday.',
    category: 'חגים ומועדים',
    subcategory: 'שבועות',
    author: 'ליקוט מספרי רבינו ורבי נתן',
    publisher: 'קרן רבי ישראל',
    language: 'עברית',
    pages: 380,
    isbn: '978-965-7023-50-9',
    images: [
      '/attached_assets/שער החמישים 1_1757281267103.jpg',
      '/attached_assets/שער החמישים 2_1757281267104.jpg'
    ],
    variants: [
      {
        id: 'medium-skai-3vol',
        format: 'סקאי',
        binding: 'קשה',
        size: 'בינוני',
        dimensions: '17*12',
        volumes: 3,
        price: 90,
        inStock: true,
        stockQuantity: 15
      }
    ],
    features: [
      'חג השבועות קדוש',
      'שער החמישים',
      'תיקון ליל שבועות',
      'מתן תורה',
      'האר"י והשל"ה'
    ],
    tags: ['שבועות', 'מתן תורה', 'תיקון לילה', 'קבלה', 'חמישים'],
    isActive: true,
    isFeatured: false
  },

  'nachal-novea': {
    id: 'nachal-novea',
    name: 'נחל נובע',
    nameEnglish: 'Nachal Novea',
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: 'פרקים בתולדות חייו של רבינו, בצירוף שיחות וסיפורים שסופרו על ידי רבינו ותלמידיו. יצא לאור בשנת תשכ"א על ידי שריד השואה ר\' יצחק אייזיק זילברמן, תלמידו של רבי ישראל דוב אודסר. הספר מכיל חומר נדיר על חיי רבינו ומסורות אמיתיות.',
    descriptionEnglish: 'Chapters in the life story of Rabbenu, with conversations and stories told by Rabbenu and his students. Published in 1961 by Holocaust survivor R. Yitzchak Eizik Zilberman, student of R. Yisrael Dov Odesser. Contains rare material about Rabbenu\'s life.',
    category: 'ספרי התלמידים',
    subcategory: 'תולדות',
    author: 'ר\' יצחק אייזיק זילברמן',
    publisher: 'קרן רבי ישראל',
    language: 'עברית',
    pages: 320,
    isbn: '978-965-7023-51-6',
    images: [
      '/attached_assets/נג\'ל נובע_1757280778289.jpg'
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
        id: 'spanish',
        format: 'ספרדית',
        binding: 'קשה',
        size: 'גדול',
        dimensions: '24*17',
        volumes: 1,
        price: 35,
        inStock: true,
        stockQuantity: 12
      }
    ],
    features: [
      'תולדות רבינו',
      'סיפורים נדירים',
      'מסורות אמיתיות',
      'שריד השואה',
      'תלמיד אודסר'
    ],
    tags: ['תולדות', 'סיפורים', 'אודסר', 'זילברמן', 'נדיר'],
    isActive: true,
    isFeatured: false
  },

  'sichos-vehitorerut': {
    id: 'sichos-vehitorerut',
    name: 'שיחות והתעוררות',
    nameEnglish: 'Sichos VeHit\'orrerut',
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: 'מכיל את השיחות והסיפורים ודברי ההתעוררות השייכים לכל מאמר ומאמר שבספר ליקוטי מוהר"ן, המובאים בספרים "חיי ושיחות מוהר"ן" "ימי מוהרנ"ת" "עלים לתרופה". נסדר ונלקט על ידי רבי שמואל הורביץ. ספר יסוד להבנת עומק התורות.',
    descriptionEnglish: 'Contains the conversations, stories and words of awakening related to each teaching in Likutei Moharan, taken from "Chayei Moharan," "Yemei Maharanat," and "Alim LeTerufah." Compiled by Rabbi Shmuel Horowitz. Fundamental for understanding the depth of the teachings.',
    category: 'ספרי התלמידים',
    subcategory: 'שיחות',
    author: 'רבי שמואל הורביץ',
    publisher: 'קרן רבי ישראל',
    language: 'עברית',
    pages: 450,
    isbn: '978-965-7023-52-3',
    images: [
      '/attached_assets/שיחות הרן 1_1757281125911.jpg'
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
      }
    ],
    features: [
      'שיחות לכל תורה',
      'סיפורים מקשרים',
      'התעוררות רוחנית',
      'מליקוטי מוהר"ן',
      'הורביץ לקט'
    ],
    tags: ['שיחות', 'התעוררות', 'תורות', 'הורביץ', 'לקט'],
    isActive: true,
    isFeatured: false
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

  'parparaot-al-hashas': {
    id: 'parparaot-al-hashas',
    name: 'פרפראות על הש"ס',
    nameEnglish: 'Parparaot Al HaShas',
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: 'חובר על ידי רבי נחמן מטשעהרין תלמיד רבי נתן, מכיל חידושים עמוקים ונפלאים המקשרים את דברי הגמרא ליסודות המובאים בתורותיו של רבינו שבספר "ליקוטי מוהר"ן". אליו נוסף הספר "טובות זיכרונות" מנכד המחבר, רבי אברהם שטרנהארץ - כוכב לב, המכיל סיפורים מתולדות חיו של סבו רבי נתן.',
    descriptionEnglish: 'Composed by Rabbi Nachman of Tchehrin, student of Rabbi Nathan. Contains deep and wondrous insights connecting the words of the Talmud to the foundations in Rabbenu\'s teachings in Likutei Moharan. Includes "Tovot Zichronot" with stories about Rabbi Nathan.',
    category: 'ספרי התלמידים',
    subcategory: 'הלכה ותלמוד',
    author: 'רבי נחמן מטשעהרין',
    publisher: 'קרן רבי ישראל',
    language: 'עברית',
    pages: 420,
    isbn: '978-965-7023-54-7',
    images: [
      '/attached_assets/4_1757275751756.jpg',
      '/attached_assets/ליקוטי עצות בנפרד_1757280401419.jpg',
      '/attached_assets/כל בו לבן 2_1757280401418.jpg'
    ],
    variants: [
      {
        id: 'large-skai-2vol',
        format: 'סקאי',
        binding: 'קשה',
        size: 'גדול',
        dimensions: '24*17',
        volumes: 2,
        price: 75,
        inStock: true,
        stockQuantity: 15
      }
    ],
    features: [
      'חידושים על הגמרא',
      'קשר לליקוטי מוהר"ן',
      'עומק רוחני',
      'טובות זיכרונות',
      'מטשעהרין חיבר'
    ],
    tags: ['גמרא', 'הלכה', 'חידושים', 'מטשעהרין', 'תלמוד'],
    isActive: true,
    isFeatured: false
  },

  'likutei-even': {
    id: 'likutei-even',
    name: 'ליקוטי אבן',
    nameEnglish: 'Likutei Even',
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: 'ארבעה ספרים בכרך אחד: ליקוטי אבן - חיבורו של רבי אפרים בן רבי נפתלי, תלמיד רבי נתן, מיוסד על תורות רבינו ועל חלק "אורח חיים" בשולחן ערוך. תפילות הבוקר - תפילות שנכתבו על ידי רבי אפרים. אמונת עתיך - ספרו של רבי אלטר מטפליק במעלת ניצול הזמן לעבודת ה\'. עצות ישרות - הוספות לספר ליקוטי עצות.',
    descriptionEnglish: 'Four books in one volume: Likutei Even by Rabbi Ephraim ben Rabbi Naftali based on Rabbenu\'s teachings and Orach Chaim; Morning Prayers; Emunat Itecha about utilizing time for divine service; and Etzot Yesharot - additions to Likutei Etzot.',
    category: 'ספרי התלמידים',
    subcategory: 'הלכה ועבודה',
    author: 'רבי אפרים בן נפתלי וחב"ר',
    publisher: 'קרן רבי ישראל',
    language: 'עברית',
    pages: 350,
    isbn: '978-965-7023-55-4',
    images: [
      '/attached_assets/5_1757275751756.jpg',
      '/attached_assets/אבי הנחל_1757281003110.jpg',
      '/attached_assets/ליקוטי עצות_1757281003113.jpg'
    ],
    variants: [
      {
        id: 'large-skai-with-additions',
        format: 'כולל אמונת עתיך ועצות ישרות',
        binding: 'קשה',
        size: 'גדול',
        dimensions: '24*17',
        volumes: 1,
        price: 35,
        inStock: true,
        stockQuantity: 22
      }
    ],
    features: [
      'ארבעה ספרים בכרך',
      'מיוסד על אורח חיים',
      'תפילות הבוקר',
      'אמונת עתיך',
      'עצות ישרות'
    ],
    tags: ['הלכה', 'תפילות', 'עבודה', 'זמן', 'עצות'],
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
  },

  'yisrael-saba': {
    id: 'yisrael-saba',
    name: 'ישראל סבא',
    nameEnglish: 'Yisrael Saba',
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: 'שיחותיו היוקדות והנלהבות של רבי ישראל דוב אודסר, מתקופת חייו האחרונה. נערך על פי קלטות בהן הוקלטו דיבוריו על ידי מקורביו. השיחות מלאות בהתחזקות, יראת שמים, אהבת ה\' יתברך, אהבת הצדיק ואהבת ישראל. ודיבורים במעלת ההתקרבות לרבינו רבי נחמן, לימוד ספריו והפצתם בקרב עם ישראל.',
    descriptionEnglish: 'The fiery and enthusiastic conversations of Rabbi Yisrael Dov Odesser from his later years. Compiled from recordings made by his close associates. Full of strengthening, fear of Heaven, love of God, love of the tzaddik and love of Israel.',
    category: 'ספרי התלמידים',
    subcategory: 'שיחות אודסר',
    author: 'רבי ישראל דוב אודסר',
    publisher: 'קרן רבי ישראל',
    language: 'עברית',
    pages: 320,
    isbn: '978-965-7023-57-8',
    images: [
      '/attached_assets/ישראל סבא_1757281003112.jpg',
      '/attached_assets/סבא ישראל לילדים_1757280885979.jpg'
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
        stockQuantity: 20
      },
      {
        id: 'french-medium',
        format: 'צרפתית',
        binding: 'קשה',
        size: 'בינוני',
        dimensions: '17*12',
        volumes: 1,
        price: 32,
        inStock: true,
        stockQuantity: 15
      }
    ],
    features: [
      'שיחות אודסר האחרונות',
      'קלטות מקוריות',
      'התחזקות ויראה',
      'אהבת הצדיק',
      'הפצת תורת רבינו'
    ],
    tags: ['אודסר', 'שיחות', 'התחזקות', 'אהבה', 'הפצה'],
    isActive: true,
    isFeatured: true
  },

  'maayen-hamitgaber': {
    id: 'maayen-hamitgaber',
    name: 'מעין המתגבר',
    nameEnglish: 'Ma\'ayan HaMitgaber',
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: 'חידושים עמוקים ונפלאים על הספר הקדוש "ליקוטי מוהר"ן", שהועלו על הכתב בידי רבי עמרם יוסף הורביץ, נכדו של רבי ישראל דוב אודסר. הספר מגלה רבדים נוספים בתורות רבינו ומעמיק בהבנת הנושאים הרוחניים שבהם.',
    descriptionEnglish: 'Deep and wondrous insights on the holy book "Likutei Moharan," written by Rabbi Amram Yosef Horowitz, grandson of Rabbi Yisrael Dov Odesser. The book reveals additional layers in Rabbenu\'s teachings and deepens understanding of spiritual matters.',
    category: 'ספרי התלמידים',
    subcategory: 'פירושים',
    author: 'רבי עמרם יוסף הורביץ',
    publisher: 'קרן רבי ישראל',
    language: 'עברית',
    pages: 380,
    isbn: '978-965-7023-58-5',
    images: [
      '/attached_assets/מעין המתגבר 1_1757281125910.jpg',
      '/attached_assets/מעין המתגבר_1757281003114.jpg'
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
      'חידושים על ליקוטי מוהר"ן',
      'נכד אודסר חיבר',
      'רבדים נוספים',
      'עומק רוחני',
      'הבנה מעמיקה'
    ],
    tags: ['פירוש', 'ליקוטי מוהר"ן', 'אודסר', 'חידושים', 'עומק'],
    isActive: true,
    isFeatured: false
  },

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
  },

  'shema-yisrael': {
    id: 'shema-yisrael',
    name: 'שמע ישראל',
    nameEnglish: 'Shema Yisrael',
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: 'ספר קטן וחשוב המכיל את הקריאת שמע וברכותיה, עם כוונות והסברים מתורות רבינו. מיועד לנשיאה בכיס ולאמירה בכל עת ומקום, במיוחד בשעת צרה או לפני שינה.',
    descriptionEnglish: 'Small but important book containing the Shema prayer and its blessings, with intentions and explanations from Rabbenu\'s teachings. Designed for carrying in pocket and recitation at any time and place, especially in times of trouble or before sleep.',
    category: 'תפילות',
    subcategory: 'תפילות יומיות',
    author: 'קרן רבי ישראל',
    publisher: 'קרן רבי ישראל',
    language: 'עברית',
    pages: 64,
    isbn: '978-965-7023-60-8',
    images: [
      '/attached_assets/שמע ישראל צרפתית_1757280885982.jpg'
    ],
    variants: [
      {
        id: 'medium-skai',
        format: 'סקאי',
        binding: 'קשה',
        size: 'בינוני',
        dimensions: '12*17',
        volumes: 1,
        price: 20,
        inStock: true,
        stockQuantity: 50
      },
      {
        id: 'medium-skai-english',
        format: 'אנגלית',
        binding: 'קשה',
        size: 'בינוני',
        dimensions: '17*12',
        volumes: 1,
        price: 20,
        inStock: true,
        stockQuantity: 30
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
        stockQuantity: 25
      }
    ],
    features: [
      'קריאת שמע וברכותיה',
      'כוונות מתורות רבינו',
      'נשיאה בכיס',
      'לכל עת ומקום',
      'שעת צרה ושינה'
    ],
    tags: ['שמע ישראל', 'תפילה', 'כוונות', 'כיס', 'יומי'],
    isActive: true,
    isFeatured: false
  },

  'emunat-itecha': {
    id: 'emunat-itecha',
    name: 'אמונת עתיך',
    nameEnglish: 'Emunat Itecha',
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: 'ספרו של רבי אלטר מטפליק במעלת ניצול הזמן לעבודת ה\'. הספר מלמד כיצד להקדיש כל רגע ורגע לעבודת הבורא, ואיך להפוך את חיי היום-יום לעבודה רוחנית מתמדת. מבוסס על תורות רבינו בענין זמן וזכירת הבורא.',
    descriptionEnglish: 'Book by Rabbi Alter of Teplik about the virtue of utilizing time for divine service. Teaches how to dedicate every moment to serving the Creator and transform daily life into continuous spiritual work. Based on Rabbenu\'s teachings about time and remembering the Creator.',
    category: 'ספרי התלמידים',
    subcategory: 'עבודת השם',
    author: 'רבי אלטר מטפליק',
    publisher: 'קרן רבי ישראל',
    language: 'עברית',
    pages: 160,
    isbn: '978-965-7023-61-5',
    images: [
      '/attached_assets/אמונת עיתך צרפתית_1757280778286.jpg'
    ],
    variants: [
      {
        id: 'medium-skai',
        format: 'סקאי',
        binding: 'קשה',
        size: 'בינוני',
        dimensions: '12*17',
        volumes: 1,
        price: 20,
        inStock: true,
        stockQuantity: 40
      },
      {
        id: 'medium-french-booklet',
        format: 'קונטרס צרפתית',
        binding: 'רך',
        size: 'בינוני',
        dimensions: '17*12',
        volumes: 1,
        price: 6,
        inStock: true,
        stockQuantity: 60
      }
    ],
    features: [
      'ניצול הזמן הקדוש',
      'עבודת ה\' תמידית',
      'חיי יום-יום רוחניים',
      'זכירת הבורא',
      'רבי אלטר חיבר'
    ],
    tags: ['זמן', 'עבודה', 'רוחניות', 'טפליק', 'יום יום'],
    isActive: true,
    isFeatured: false
  },

  'rabbenu-hakadosh': {
    id: 'rabbenu-hakadosh',
    name: 'רבינו הקדוש',
    nameEnglish: 'Rabbenu HaKadosh',
    nameFrench: null,
    nameSpanish: null,
    nameRussian: null,
    description: 'כל קורות חייו הקדושים של רבינו רבי נחמן מברסלב, הנפרשים על פני קרוב לארבעים שנות חיים, ערוכים בארבעה כרכים מושקעים - סדרה מלוקטת מספרי רבינו ותלמידיו בתוספת מסורות בעל פה שעברו מדור לדור בין זקני החסידים. סדרה מקיפה ומפורטת על חיי רבינו.',
    descriptionEnglish: 'The complete life story of our holy Rabbenu Rabbi Nachman of Breslov, spanning nearly forty years of life, arranged in four elaborate volumes - a series collected from Rabbenu and his students\' books plus oral traditions passed down through generations of elderly Chassidim.',
    category: 'תולדות',
    subcategory: 'חיי רבינו',
    author: 'ליקוט מספרי רבינו ותלמידיו',
    publisher: 'קרן רבי ישראל',
    language: 'עברית',
    pages: 1200,
    isbn: '978-965-7023-62-2',
    images: [
      '/attached_assets/רבינו הקדוש 1_1757281260204.jpg',
      '/attached_assets/רבינו הקדוש 2_1757281260206.jpg',
      '/attached_assets/רבינו הקדוש 3_1757281260206.jpg',
      '/attached_assets/רבינו הקדוש 4_1757281260206.jpg'
    ],
    variants: [
      {
        id: 'large-laminated-4vol',
        format: 'למנציה',
        binding: 'קשה',
        size: 'גדול',
        dimensions: '24*17',
        volumes: 4,
        price: 150,
        inStock: true,
        stockQuantity: 12
      }
    ],
    features: [
      'ארבעים שנות חיים',
      'ארבעה כרכים מושקעים',
      'מסורות בעל פה',
      'זקני החסידים',
      'סדרה מקיפה ומפורטת'
    ],
    tags: ['תולדות', 'חיים', 'מסורת', 'חסידים', 'מקיף'],
    isActive: true,
    isFeatured: true
  }
};

// Export individual product arrays for easier access
export const featuredProducts = Object.values(realBreslovProducts).filter(product => product.isFeatured);
export const productsByCategory = Object.values(realBreslovProducts).reduce((acc, product) => {
  if (!acc[product.category]) {
    acc[product.category] = [];
  }
  acc[product.category].push(product);
  return acc;
}, {} as Record<string, Product[]>);