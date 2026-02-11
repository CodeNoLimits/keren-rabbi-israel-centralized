import type { Product, ProductVariant } from '../../../../shared/schema';

// Real Breslov books data extracted from authentic source documents
// רשימת ספרי הקרן כולל שפות מעודכן אלול תשפ''ה & תיאור ספרי הקרן לאתר

// segulot products (1 items)
export const segulotProducts: Record<string, Product> = {
  'shemot-hatzadikim': {
    id: 'shemot-hatzadikim',
    name: 'שמות הצדיקים',
    nameEnglish: 'Shemot HaTzadikim',
    nameFrench: 'Noms des Justes',
    nameSpanish: 'Nombres de los Justos',
    nameRussian: 'Имена Праведников',
    description: 'שנלקט על ידי רבי נתן, שאמירתו מסוגלת לשנות את הטבע ולהמשיך ניסים, כדברי רבינו הקדוש. הספר מכיל רשימת שמות צדיקים וקדושים שאמירתם בדביקות ובכוונה יכולה להביא ישועות ורפואות.',
    descriptionEnglish: 'Compiled by Rabbi Nathan, whose recitation is capable of changing nature and drawing miracles, according to our holy Rabbenu. Contains a list of names of tzaddikim and holy ones whose recitation with devotion can bring salvation and healing.',
    descriptionFrench: 'Compilé par Rabbi Nathan, dont la récitation est capable de changer la nature et d\'attirer les miracles, selon notre saint Rabbénou. Contient une liste de noms de justes et de saints dont la récitation avec dévotion et intention peut apporter salut et guérison.',
    descriptionSpanish: 'Compilado por el Rabino Nathan, cuya recitación es capaz de cambiar la naturaleza y atraer milagros, según nuestro santo Rabenu. Contiene una lista de nombres de justos y santos cuya recitación con devoción e intención puede traer salvación y curación.',
    descriptionRussian: 'Составлено рабби Натаном, чтение которого способно изменить природу и привлечь чудеса, согласно нашему святому Рабейну. Содержит список имен праведников и святых, чтение которых с преданностью и намерением может принести спасение и исцеление.',
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
    featuresFrench: [
      'Compilation de Rabbi Nathan',
      'Changer la nature',
      'Attirer les miracles',
      'Salut et guérisons',
      'Récitation avec dévotion'
    ],
    featuresSpanish: [
      'Compilación del Rabino Nathan',
      'Cambiar la naturaleza',
      'Atraer milagros',
      'Salvación y curaciones',
      'Recitación con devoción'
    ],
    featuresRussian: [
      'Компиляция рабби Натана',
      'Изменение природы',
      'Привлечение чудес',
      'Спасение и исцеления',
      'Чтение с преданностью'
    ],
    tags: ['צדיקים', 'ישועות', 'ניסים', 'רפואות', 'סגולות'],
    isActive: true,
    isFeatured: false
  }
};
