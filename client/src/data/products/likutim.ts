import type { Product, ProductVariant } from '../../../../shared/schema';

// Real Breslov books data extracted from authentic source documents
// רשימת ספרי הקרן כולל שפות מעודכן אלול תשפ''ה & תיאור ספרי הקרן לאתר

// likutim products (1 items)
export const likutimProducts: Record<string, Product> = {
  'otzer-hayirah': {
    id: 'otzer-hayirah',
    name: 'אוצר היראה',
    nameEnglish: 'Treasury of Fear of Heaven',
    nameFrench: 'Trésor de la Crainte Céleste',
    nameSpanish: 'Tesoro del Temor Celestial',
    nameRussian: 'Сокровищница Трепета перед Небесами',
    description: 'נקרא במקור: ליקוטי עצות חדש. תוכן הספר: ליקוט וקיצור מספרי \'ליקוטי הלכות\' לרבי נתן זצ"ל, להוציא מהם את כל העצות המתבארים בדרושיו הארוכים לעובדה ולמעשה. הספר מחולק לארבעה חלקים: אמת וצדק. כנסת קהל צבאות. תשובת השנה. עצת שלום.',
    descriptionEnglish: 'Originally called: New Likutei Etzot. A collection and summary from Rabbi Nathan\'s "Likutei Halakhot" books, extracting all the practical advice from his lengthy discourses.',
    descriptionFrench: 'Originellement appelé : Nouveau Likouté Étsot. Contenu du livre : recueil et résumé des livres "Likouté Halakhot" de Rabbi Nathan, extrayant tous les conseils pratiques de ses longs discours pour l\'action et la pratique. Le livre est divisé en quatre parties : Vérité et Justice, Assemblée de la Congrégation des Armées, Téchouva de l\'Année, Conseil de Paix.',
    descriptionSpanish: 'Originalmente llamado: Nuevo Likutei Etzot. Contenido del libro: recopilación y resumen de los libros "Likutei Halajot" del Rabino Nathan, extrayendo todos los consejos prácticos de sus largos discursos para la acción y la práctica. El libro está dividido en cuatro partes: Verdad y Justicia, Asamblea de la Congregación de los Ejércitos, Teshuvá del Año, Consejo de Paz.',
    descriptionRussian: 'Первоначально называлось: Новый Ликутей Эцот. Содержание книги: сборник и краткое изложение книг "Ликутей Алахот" рабби Натана, извлекающее все практические советы из его длинных рассуждений для действия и практики. Книга разделена на четыре части: Истина и Справедливость, Собрание Общины Воинств, Тшува Года, Совет Мира.',
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
    featuresFrench: [
      'Nouveau Likouté Étsot',
      'Des livres Likouté Halakhot',
      'Conseils pratiques pour l\'action',
      'Quatre parties principales',
      'Compilé par Rabbi Nahman de Tcherin'
    ],
    featuresSpanish: [
      'Nuevo Likutei Etzot',
      'De los libros Likutei Halajot',
      'Consejos prácticos para la acción',
      'Cuatro partes principales',
      'Compilado por el Rabino Najman de Tcherin'
    ],
    featuresRussian: [
      'Новый Ликутей Эцот',
      'Из книг Ликутей Алахот',
      'Практические советы для действия',
      'Четыре основные части',
      'Составлено рабби Нахманом из Черина'
    ],
    tags: ['יראת שמים', 'עצות', 'ליקוטים', 'רבי נתן', 'הלכות'],
    isActive: true,
    isFeatured: true
  }
};
