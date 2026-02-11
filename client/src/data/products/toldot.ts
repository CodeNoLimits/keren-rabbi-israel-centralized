import type { Product, ProductVariant } from '../../../../shared/schema';

// Real Breslov books data extracted from authentic source documents
// רשימת ספרי הקרן כולל שפות מעודכן אלול תשפ''ה & תיאור ספרי הקרן לאתר

// toldot products (2 items)
export const toldotProducts: Record<string, Product> = {
  'chayei-moharan': {
    id: 'chayei-moharan',
    name: 'חיי מוהר"ן',
    nameEnglish: 'Chayei Moharan',
    nameFrench: 'La Vie de Moharane',
    nameSpanish: 'La Vida de Moharán',
    nameRussian: 'Жизнь Моарана',
    description: 'בחיבור זה, העלה רבי נתן על הכתב מאמרים ודיבורים ששמע מפי רבינו, בהם מתגלה טפח מגדולתו העצומה של רבינו. מחולק לפי נושאים: שיחות השייכות לתורות, מאמרים בעבודת ה\', בגדולת רבינו, במעלת תורתו ובמעלת אנשיו ומקורביו.',
    descriptionEnglish: 'In this work, Rabbi Nathan put to writing statements and speeches he heard from Rabbenu, revealing a glimpse of Rabbenu\'s enormous greatness. Divided by topics: conversations related to teachings, articles on divine service, on Rabbenu\'s greatness.',
    descriptionFrench: 'Dans cet ouvrage, Rabbi Nathan a mis par écrit les déclarations et discours qu\'il a entendus de la bouche de Rabbénou, révélant un aperçu de l\'immense grandeur de Rabbénou. Divisé par sujets : conversations liées aux enseignements, articles sur le service divin, sur la grandeur de Rabbénou, sur la valeur de son enseignement et sur la valeur de ses disciples et proches.',
    descriptionSpanish: 'En esta obra, el Rabino Nathan puso por escrito las declaraciones y discursos que escuchó de la boca de Rabenu, revelando un vistazo de la enorme grandeza de Rabenu. Dividido por temas: conversaciones relacionadas con las enseñanzas, artículos sobre el servicio divino, sobre la grandeza de Rabenu, sobre el valor de su enseñanza y sobre el valor de sus discípulos y cercanos.',
    descriptionRussian: 'В этом труде рабби Натан записал высказывания и речи, которые он слышал из уст Рабейну, раскрывающие проблеск огромного величия Рабейну. Разделено по темам: беседы, связанные с учениями, статьи о служении Всевышнему, о величии Рабейну, о ценности его учения и о ценности его учеников и близких.',
    category: 'תולדות וחיים',
    subcategory: 'חיי רבינו',
    author: 'רבי נתן מברסלב',
    publisher: 'קרן רבי ישראל',
    language: 'עברית',
    languageGroupId: 'chayei-moharan-group',
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
    featuresFrench: [
      'Discours entendus de la bouche de Rabbénou',
      'Aperçu de la grandeur de Rabbénou',
      'Divisé par sujets',
      'Grandeur de Rabbénou et de son enseignement',
      'Valeur de ses disciples et proches'
    ],
    featuresSpanish: [
      'Discursos escuchados de la boca de Rabenu',
      'Vistazo de la grandeza de Rabenu',
      'Dividido por temas',
      'Grandeza de Rabenu y su enseñanza',
      'Valor de sus discípulos y cercanos'
    ],
    featuresRussian: [
      'Речи, услышанные из уст Рабейну',
      'Проблеск величия Рабейну',
      'Разделено по темам',
      'Величие Рабейну и его учения',
      'Ценность его учеников и близких'
    ],
    tags: ['חיי רבינו', 'תולדות', 'דיבורים', 'גדולה', 'רבי נתן'],
    isActive: true,
    isFeatured: true
  },
  'yimei-maharanat': {
    id: 'yimei-maharanat',
    name: 'ימי מוהרנ"ת',
    nameEnglish: 'Yimei Maharnat',
    nameFrench: 'Les Jours de Maharnat',
    nameSpanish: 'Los Días de Maharnat',
    nameRussian: 'Дни Маараната',
    description: 'יומנו הנפלא של התלמיד המובהק והנאמן רבי נתן. בו גולל את קורות חייו מהתקרבותו לרבינו ועד לאחר נסיעתו לארץ ישראל. הרדיפות, הביזיונות, הקשיים והמניעות, לצד העשייה הבלתי פוסקת להנחלת מורשתו של רבי נחמן לדורות עולם.',
    descriptionEnglish: 'The wonderful diary of the outstanding and faithful student Rabbi Nathan. In it he unfolds the events of his life from his approach to Rabbenu until after his journey to the Land of Israel.',
    descriptionFrench: 'Le merveilleux journal du disciple éminent et fidèle Rabbi Nathan. Il y déroule les événements de sa vie depuis son approche de Rabbénou jusqu\'après son voyage en Terre d\'Israël. Les persécutions, les humiliations, les difficultés et les obstacles, aux côtés de l\'action incessante pour transmettre l\'héritage de Rabbi Nahman aux générations futures.',
    descriptionSpanish: 'El maravilloso diario del discípulo eminente y fiel Rabino Nathan. En él despliega los eventos de su vida desde su acercamiento a Rabenu hasta después de su viaje a la Tierra de Israel. Las persecuciones, las humillaciones, las dificultades y los obstáculos, junto con la acción incesante para transmitir el legado del Rabino Najman a las generaciones futuras.',
    descriptionRussian: 'Замечательный дневник выдающегося и верного ученика рабби Натана. В нем он разворачивает события своей жизни от приближения к Рабейну до времени после его путешествия в Землю Израиля. Преследования, унижения, трудности и препятствия, наряду с непрекращающейся деятельностью по передаче наследия рабби Нахмана будущим поколениям.',
    category: 'תולדות וחיים',
    subcategory: 'ימי רבי נתן',
    author: 'רבי נתן מברסלב',
    publisher: 'קרן רבי ישראל',
    language: 'עברית',
    languageGroupId: 'yimei-maharanat-group',
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
    featuresFrench: [
      'Journal de Rabbi Nathan',
      'Depuis l\'approche de Rabbénou',
      'Voyage en Terre d\'Israël',
      'Persécutions et difficultés',
      'Transmission de l\'héritage'
    ],
    featuresSpanish: [
      'Diario del Rabino Nathan',
      'Desde el acercamiento a Rabenu',
      'Viaje a la Tierra de Israel',
      'Persecuciones y dificultades',
      'Transmisión del legado'
    ],
    featuresRussian: [
      'Дневник рабби Натана',
      'От приближения к Рабейну',
      'Путешествие в Землю Израиля',
      'Преследования и трудности',
      'Передача наследия'
    ],
    tags: ['יומן', 'רבי נתן', 'ארץ ישראל', 'רדיפות', 'מורשת'],
    isActive: true,
    isFeatured: true
  }
};
