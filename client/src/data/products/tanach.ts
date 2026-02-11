import type { Product, ProductVariant } from '../../../../shared/schema';

// Real Breslov books data extracted from authentic source documents
// רשימת ספרי הקרן כולל שפות מעודכן אלול תשפ''ה & תיאור ספרי הקרן לאתר

// tanach products (1 items)
export const tanachProducts: Record<string, Product> = {
  'chumash-likutei-halakhot': {
    id: 'chumash-likutei-halakhot',
    name: 'חומש עם ליקוטי הלכות',
    nameEnglish: 'Pentateuch with Likutei Halakhot',
    nameFrench: 'Pentateuque avec Likouté Halakhot',
    nameSpanish: 'Pentateuco con Likutei Halajot',
    nameRussian: 'Пятикнижие с Ликутей Алахот',
    description: 'סט חמישה חומשי תורה באותיות מאירות עיניים, כולל בתוכו תרגום אונקלוס ופירוש רש"י, בתוספת ליקוט נפלא ממשנתו של רבינו נחמן מברסלב זיע"א על הפרשה, מספר ליקוטי הלכות לרבי נתן מברסלב זצ"ל. ערוך ומסודר על הדף, בצורה נוחה וקלה ללמידה.',
    descriptionEnglish: 'Set of five Torah volumes with illuminating letters, including Onkelos translation and Rashi commentary, plus a wonderful collection from Rabbi Nachman\'s teachings on the weekly portion, from Likutei Halakhot by Rabbi Nathan.',
    descriptionFrench: 'Ensemble de cinq volumes de la Torah avec des lettres illuminantes, incluant la traduction d\'Onkelos et le commentaire de Rachi, plus une merveilleuse collection des enseignements de Rabbi Nahman sur la portion hebdomadaire, tirée du Likouté Halakhot de Rabbi Nathan. Organisé et disposé sur la page, de manière confortable et facile pour l\'étude.',
    descriptionSpanish: 'Conjunto de cinco volúmenes de la Torá con letras iluminadoras, incluyendo la traducción de Onkelos y el comentario de Rashí, más una maravillosa colección de las enseñanzas del Rabino Najman sobre la porción semanal, del Likutei Halajot del Rabino Nathan. Organizado y dispuesto en la página, de manera cómoda y fácil para el estudio.',
    descriptionRussian: 'Набор из пяти томов Торы с освещающими буквами, включая перевод Онкелоса и комментарий Раши, плюс прекрасная коллекция учений рабби Нахмана о недельной главе из Ликутей Алахот рабби Натана. Организовано и расположено на странице, удобным и легким для изучения способом.',
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
    featuresFrench: [
      'Cinq volumes de la Torah',
      'Lettres illuminantes',
      'Traduction d\'Onkelos et Rachi',
      'Likouté Halakhot sur la portion',
      'Organisé et disposé confortablement'
    ],
    featuresSpanish: [
      'Cinco volúmenes de la Torá',
      'Letras iluminadoras',
      'Traducción de Onkelos y Rashí',
      'Likutei Halajot sobre la porción',
      'Organizado y dispuesto cómodamente'
    ],
    featuresRussian: [
      'Пять томов Торы',
      'Освещающие буквы',
      'Перевод Онкелоса и Раши',
      'Ликутей Алахот о главе',
      'Организовано и расположено удобно'
    ],
    tags: ['חומש', 'תורה', 'ליקוטי הלכות', 'רש"י', 'פרשה'],
    isActive: true,
    isFeatured: true
  }
};
