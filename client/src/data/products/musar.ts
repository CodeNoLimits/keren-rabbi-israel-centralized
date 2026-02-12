import type { Product, ProductVariant } from '../../../../shared/schema';

// Real Breslov books data extracted from authentic source documents
// רשימת ספרי הקרן כולל שפות מעודכן אלול תשפ''ה & תיאור ספרי הקרן לאתר

// musar products (1 items)
export const musarProducts: Record<string, Product> = {
  'sefer-hamidot': {
    id: 'sefer-hamidot',
    name: 'ספר המידות',
    nameEnglish: 'Sefer Hamidot',
    nameFrench: 'Livre des Traits de Caractère',
    nameSpanish: 'Libro de los Rasgos de Carácter',
    nameRussian: 'Книга Качеств',
    description: 'מכיל פסקאות קצרות ותמציתיות במעלת המידות הטובות ובחובת ההתרחקות ממידות רעות, הספר נכתב על ידי רבינו עוד בילדותו, רובו נלקט ממאמרי חז"ל וחלקו הינו השגות של רבינו עצמו. רבינו התבטא עליו "הספר הזה - עשה אותי יהודי"',
    descriptionEnglish: 'Contains short and concise passages about the excellence of good character traits and the obligation to distance oneself from bad ones. Written by Rabbenu in his youth, mostly collected from the sayings of our Sages.',
    descriptionFrench: 'Contient des passages courts et concis sur l\'excellence des bons traits de caractère et l\'obligation de s\'éloigner des mauvais. Le livre a été écrit par notre Maître dès son enfance, la majeure partie a été recueillie des paroles de nos Sages et une partie provient des perceptions de notre Maître lui-même. Notre Maître a dit à son sujet : "Ce livre a fait de moi un Juif".',
    descriptionSpanish: 'Contiene pasajes breves y concisos sobre la excelencia de los buenos rasgos de carácter y la obligación de alejarse de los malos. El libro fue escrito por nuestro Maestro en su infancia, en su mayoría recopilado de los dichos de nuestros Sabios y una parte proviene de las percepciones del propio Maestro. Nuestro Maestro dijo sobre él: "Este libro me hizo judío".',
    descriptionRussian: 'Содержит короткие и сжатые отрывки о превосходстве хороших черт характера и обязанности отдаляться от плохих. Книга была написана нашим Учителем еще в детстве, большая часть ее собрана из высказываний наших Мудрецов, а часть является постижениями самого Учителя. Наш Учитель сказал о ней: «Эта книга сделала меня евреем».',
    category: 'מוסר והדרכה',
    subcategory: 'מידות טובות',
    author: 'רבי נחמן מברסלב',
    publisher: 'קרן רבי ישראל',
    language: 'עברית',
    languageGroupId: 'sefer-hamidot-group',
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
  }
};
