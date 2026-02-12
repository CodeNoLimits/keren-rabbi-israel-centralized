import type { Product, ProductVariant } from '../../../../shared/schema';

// Real Breslov books data extracted from authentic source documents
// רשימת ספרי הקרן כולל שפות מעודכן אלול תשפ''ה & תיאור ספרי הקרן לאתר

// sefarim-rabbenu products (2 items)
export const sefarimRabbenuProducts: Record<string, Product> = {
  'likutei-moharan': {
    id: 'likutei-moharan',
    name: 'ליקוטי מוהר"ן',
    nameEnglish: 'Likutei Moharan',
    nameFrench: 'Likouté Moharan',
    nameSpanish: 'Likutei Moharan',
    nameRussian: 'Ликутей Моаран',
    description: 'חיבורו הגדול, הקדוש והנורא, של רבינו רבי נחמן מברסלב. מכיל מאות "תורות" - מאמרי קודש שנאמרו על ידי רבינו בשבתות, בחגים ובמועדים שונים. חלקם נכתב על ידי רבינו עצמו, וחלקם הגדול על ידי סופרו ותלמידו הנאמן רבי נתן.',
    descriptionEnglish: 'The great, holy and awesome work of our teacher Rabbi Nachman of Breslov. Contains hundreds of "teachings" - holy discourses given by Rabbenu on Sabbaths, holidays and various occasions.',
    descriptionFrench: 'L\'œuvre majeure, sainte et redoutable, de notre maître Rabbi Nahman de Breslev. Contient des centaines de « enseignements » - discours sacrés prononcés par Rabbénou pendant les Chabbats, les fêtes et diverses occasions.',
    descriptionSpanish: 'La gran, santa e impresionante obra de nuestro maestro Rabí Najman de Breslov. Contiene cientos de "enseñanzas" - discursos sagrados dados por Rabenu en Shabat, festividades y diversas ocasiones.',
    descriptionRussian: 'Великий, святой и грозный труд нашего учителя Рабби Нахмана из Бреслова. Содержит сотни «учений» — священных речей, произнесенных Рабейну по субботам, праздникам и в различных случаях.',
    category: 'ספרי רבינו',
    subcategory: 'ליקוטי מוהר"ן',
    author: 'רבי נחמן מברסלב',
    publisher: 'קרן רבי ישראל',
    language: 'עברית',
    languageGroupId: 'likutei-moharan-group', // Groups all language versions together
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
    nameFrench: 'Kitsour Likouté Moharan',
    nameSpanish: 'Kitzur Likutei Moharan',
    nameRussian: 'Кицур Ликутей Моаран',
    description: 'פסקאות מקוצרות מתורותיו של רבינו רבי נחמן, הספר נערך בפקודתו על ידי תלמידו רבי נתן. על הספר כותב רבי ישראל קרדונר באחד ממכתביו: "והספר הזה היה יקר מאוד בעיני מורנו הרב הצדיק ר\' נתן זצ"ל ופקד וציווה לכל אנשיו לעסוק וללמוד בו בכל יום"',
    descriptionEnglish: 'Shortened passages from the teachings of Rabbenu Rabbi Nachman, compiled under his direction by his student Rabbi Nathan.',
    descriptionFrench: 'Passages abrégés des enseignements de Rabbénou Rabbi Nahman, compilés sous sa direction par son disciple Rabbi Nathan.',
    descriptionSpanish: 'Pasajes abreviados de las enseñanzas de Rabenu Rabí Najman, compilados bajo su dirección por su discípulo el Rabino Nathan.',
    descriptionRussian: 'Сокращенные отрывки из учений Рабейну Рабби Нахмана, составленные под его руководством его учеником рабби Натаном.',
    category: 'ספרי רבינו',
    subcategory: 'קיצורים',
    author: 'רבי נחמן מברסלב',
    publisher: 'קרן רבי ישראל',
    language: 'עברית',
    languageGroupId: 'kitzur-likutei-moharan-group',
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
  }
};
