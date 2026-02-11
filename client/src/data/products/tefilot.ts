import type { Product, ProductVariant } from '../../../../shared/schema';

// Real Breslov books data extracted from authentic source documents
// רשימת ספרי הקרן כולל שפות מעודכן אלול תשפ''ה & תיאור ספרי הקרן לאתר

// tefilot products (6 items)
export const tefilotProducts: Record<string, Product> = {
  'likutei-tefilot': {
    id: 'likutei-tefilot',
    name: 'ליקוטי תפילות',
    nameEnglish: 'Likutei Tefilot',
    nameFrench: 'Likouté Téfilot',
    nameSpanish: 'Likutei Tefilot',
    nameRussian: 'Ликутей Тфилот',
    description: 'תפילותיו הנפלאות של רבי נתן, שחוברו על בסיס תורות רבי נחמן מליקוטי מוהר"ן. עליהם אמר רבינו: "תפילות הנעשות מהתורות - מעלות שעשועים למעלה שמעולם לא עלו!"',
    descriptionEnglish: 'The wonderful prayers of Rabbi Nathan, composed based on Rabbi Nachman\'s teachings from Likutei Moharan. About them Rabbenu said: "Prayers made from the teachings - cause delights above that never existed before!"',
    category: 'תפילות',
    subcategory: 'ליקוטי תפילות',
    author: 'רבי נתן מברסלב',
    publisher: 'קרן רבי ישראל',
    language: 'עברית',
    languageGroupId: 'likutei-tefilot-group',
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
  'hishtapchut-hanefesh': {
    id: 'hishtapchut-hanefesh',
    name: 'השתפכות הנפש ומשיבת נפש',
    nameEnglish: 'Outpouring of the Soul',
    nameFrench: 'Epanchement de l\'Ame',
    nameSpanish: 'Efusión del Alma',
    nameRussian: 'Излияние души',
    description: 'לקט שיחות ודיבורים נפלאים במעלת ההתבודדות והשיחה של היהודי בינו לבין קונו - העצה העיקרית והמרכזית של רבינו הקדוש רבי נחמן, שהתבטא: "מקטן ועד גדול, אי אפשר להיות יהודי כשר, כי אם על ידי התבודדות"',
    descriptionEnglish: 'A collection of wonderful conversations and speeches about the excellence of seclusion and the conversation of the Jew between him and his Creator - the main and central advice of our holy Rebbe Nachman.',
    category: 'התבודדות ותפילה',
    subcategory: 'השתפכות הנפש',
    author: 'רבי נחמן מברסלב',
    publisher: 'קרן רבי ישראל',
    language: 'עברית',
    languageGroupId: 'hishtapchut-hanefesh-group',
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
  'tehilim': {
    id: 'tehilim',
    name: 'תהילים',
    nameEnglish: 'Tehilim (Psalms)',
    nameFrench: 'Tehilim (Psaumes)',
    nameSpanish: 'Tehilim (Salmos)',
    nameRussian: 'Теилим (Псалмы)',
    description: '"מי שרוצה לזכות לתשובה - יהיה רגיל באמירת תהלים, כי אמירת תהלים מסוגל לתשובה" מגלה רבינו הקדוש רבי נחמן (ליקוטי מוהר"ן עג) מהדורה מיוחדת, באותיות גדולות ומאירות עיניים, עם ליקוטי הלכות מרבי נתן, על הדף, לפי סדר המזמורים.',
    descriptionEnglish: '"Whoever wants to merit repentance - should be regular in saying Tehilim, for saying Tehilim is conducive to repentance" reveals our holy Rebbe Nachman. Special edition with large, clear letters, with Likutei Halakhot from Rabbi Nathan on the page.',
    category: 'תנ"ך ותפילה',
    subcategory: 'תהילים',
    author: 'דוד המלך',
    publisher: 'קרן רבי ישראל',
    language: 'עברית',
    languageGroupId: 'tehilim-group',
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
  'kol-bo-leyeshuot': {
    id: 'kol-bo-leyeshuot',
    name: 'כל בו לישועות',
    nameEnglish: 'Kol Bo Leyeshuot',
    nameFrench: 'Recueil complet de prières de salut',
    nameSpanish: 'Compendio de oraciones de salvación',
    nameRussian: 'Полное собрание молитв о спасении',
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
    nameFrench: 'Le Remède Général',
    nameSpanish: 'El Remedio General',
    nameRussian: 'Всеобщее исправление',
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
  'shema-yisrael': {
    id: 'shema-yisrael',
    name: 'שמע ישראל',
    nameEnglish: 'Shema Yisrael',
    nameFrench: 'Chema Israël',
    nameSpanish: 'Shema Israel',
    nameRussian: 'Шма Исраэль',
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
  }
};
