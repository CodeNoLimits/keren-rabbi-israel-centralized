import type { Product, ProductVariant } from '../../../../shared/schema';

// Real Breslov books data extracted from authentic source documents
// רשימת ספרי הקרן כולל שפות מעודכן אלול תשפ''ה & תיאור ספרי הקרן לאתר

// halacha products (1 items)
export const halachaProducts: Record<string, Product> = {
  'likutei-halakhot': {
    id: 'likutei-halakhot',
    name: 'ליקוטי הלכות',
    nameEnglish: 'Likutei Halakhot',
    nameFrench: 'Recueil de Lois',
    nameSpanish: 'Colección de Leyes',
    nameRussian: 'Собрание Законов',
    description: 'חיבורו הגדול והמופלא של רבי נתן, תלמידו המובהק של רבינו נחמן מברסלב זיע"א, מכיל דרושים נפלאים בעבודת השם, מסודר על ארבעת חלקי שולחן-ערוך, מחולק לשמונה כרכים. רבי נתן התבטא: "העולם אומרים על ספר השל"ה הקדוש, שהוא השער לגן עדן, ואני אומר על ספרי ליקוטי הלכות – שהוא הגן עדן של השם יתברך בעצמו!"',
    descriptionEnglish: 'The great and wonderful work of Rabbi Nathan, the outstanding student of our teacher Rabbi Nachman of Breslov, containing wonderful discourses on divine service, arranged according to the four sections of the Shulchan Aruch.',
    descriptionFrench: 'L\'œuvre majestueuse et merveilleuse de Rabbi Nathan, le disciple éminent de notre maître Rabbi Nahman de Breslev, contenant des discours merveilleux sur le service divin, organisée selon les quatre sections du Choulhan Aroukh, divisée en huit volumes. Rabbi Nathan a déclaré : "Le monde dit du livre du Chela HaKadoch qu\'il est la porte du Jardin d\'Éden, et moi je dis de mon livre Likouté Halakhot qu\'il est le Jardin d\'Éden de Hachem Lui-même !"',
    descriptionSpanish: 'La gran y maravillosa obra del Rabino Nathan, el destacado estudiante de nuestro maestro Rabino Najman de Breslov, que contiene discursos maravillosos sobre el servicio divino, organizada según las cuatro secciones del Shulján Aruj, dividida en ocho volúmenes. El Rabino Nathan declaró: "El mundo dice del libro del Shela HaKadosh que es la puerta del Jardín del Edén, y yo digo de mi libro Likutei Halajot que es el Jardín del Edén de Hashem mismo!"',
    descriptionRussian: 'Великий и чудесный труд рабби Натана, выдающегося ученика нашего учителя рабби Нахмана из Брацлава, содержащий прекрасные рассуждения о служении Всевышнему, организованный согласно четырем разделам Шулхан Аруха, разделенный на восемь томов. Рабби Натан заявил: "Мир говорит о книге Шела ХаКадош, что она врата в Ган Эден, а я говорю о моей книге Ликутей Алахот, что она сам Ган Эден Всевышнего!"',
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
    featuresFrench: [
      'L\'œuvre majeure de Rabbi Nathan',
      'Organisé selon les 4 sections du Choulhan Aroukh',
      'Discours merveilleux sur le service divin',
      'Le Jardin d\'Éden de Hachem Lui-même',
      'Disponible en plusieurs éditions'
    ],
    featuresSpanish: [
      'La gran obra del Rabino Nathan',
      'Organizado según las 4 secciones del Shulján Aruj',
      'Discursos maravillosos sobre el servicio divino',
      'El Jardín del Edén de Hashem mismo',
      'Disponible en varias ediciones'
    ],
    featuresRussian: [
      'Великий труд рабби Натана',
      'Организован по 4 разделам Шулхан Аруха',
      'Чудесные рассуждения о служении Всевышнему',
      'Сам Ган Эден Всевышнего',
      'Доступно в нескольких изданиях'
    ],
    tags: ['הלכה', 'רבי נתן', 'שולחן ערוך', 'עבודת השם', 'דרושים'],
    isActive: true,
    isFeatured: true
  }
};
