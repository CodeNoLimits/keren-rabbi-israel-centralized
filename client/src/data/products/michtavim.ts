import type { Product, ProductVariant } from '../../../../shared/schema';

// Real Breslov books data extracted from authentic source documents
// רשימת ספרי הקרן כולל שפות מעודכן אלול תשפ''ה & תיאור ספרי הקרן לאתר

// michtavim products (3 items)
export const michtavimProducts: Record<string, Product> = {
  'alim-letrufah': {
    id: 'alim-letrufah',
    name: 'עלים לתרופה',
    nameEnglish: 'Alim Letrufah',
    nameFrench: 'Feuilles de Guérison',
    nameSpanish: 'Hojas de Curación',
    nameRussian: 'Листья Исцеления',
    description: 'מאות מכתביו של רבי נתן, ששלח לבניו ולתלמידיו עד סמוך לפטירתו. מכתבים אלו הם אוצר בלום של יראת שמים, התחזקות, שיחות קודש, עצות מאירות חיים, ורוויים בדביקות עזה ברבינו.',
    descriptionEnglish: 'Hundreds of letters from Rabbi Nathan, sent to his sons and students until close to his passing. These letters are a treasury of fear of Heaven, strengthening, holy conversations, and life-illuminating advice.',
    descriptionFrench: 'Des centaines de lettres de Rabbi Nathan, envoyées à ses fils et ses disciples jusqu\'à peu avant son décès. Ces lettres sont un trésor inestimable de crainte du Ciel, de renforcement, de conversations saintes, de conseils illuminant la vie, et imprégnées d\'un attachement intense à Rabbénou.',
    descriptionSpanish: 'Cientos de cartas del Rabino Nathan, enviadas a sus hijos y discípulos hasta cerca de su fallecimiento. Estas cartas son un tesoro invaluable de temor del Cielo, fortalecimiento, conversaciones santas, consejos que iluminan la vida, e impregnadas de un apego intenso a Rabenu.',
    descriptionRussian: 'Сотни писем рабби Натана, отправленных его сыновьям и ученикам вплоть до времени близкого к его кончине. Эти письма являются бесценной сокровищницей трепета перед Небесами, укрепления, святых бесед, советов, освещающих жизнь, и пропитаны сильной привязанностью к Рабейну.',
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
    featuresFrench: [
      'Lettres saintes de Rabbi Nathan',
      'Trésor de crainte du Ciel',
      'Conseils illuminant la vie',
      'Attachement intense à Rabbénou',
      'Conversations saintes et renforcement'
    ],
    featuresSpanish: [
      'Cartas santas del Rabino Nathan',
      'Tesoro de temor del Cielo',
      'Consejos que iluminan la vida',
      'Apego intenso a Rabenu',
      'Conversaciones santas y fortalecimiento'
    ],
    featuresRussian: [
      'Святые письма рабби Натана',
      'Сокровищница трепета перед Небесами',
      'Советы, освещающие жизнь',
      'Сильная привязанность к Рабейну',
      'Святые беседы и укрепление'
    ],
    tags: ['מכתבים', 'רבי נתן', 'יראת שמים', 'התחזקות', 'עצות'],
    isActive: true,
    isFeatured: true
  },
  'mikhtavei-rabbi-natan-tiveria': {
    id: 'mikhtavei-rabbi-natan-tiveria',
    name: 'מכתבי רבי נתן מטבריה',
    nameEnglish: 'Mikhtavei Rabbi Natan MeTiveria',
    nameFrench: 'Lettres de Rabbi Nathan de Tibériade',
    nameSpanish: 'Cartas del Rabino Nathan de Tiberíades',
    nameRussian: 'Письма рабби Натана из Тверии',
    description: 'ספר המכיל קרוב למאתיים מכתבים שכתב רבי נתן ב"ר יהודה מטבריה, מתלמידיו המובהקים של רבי נתן, לידידיו בארץ ובחו"ל. גדוש בשיחות ודיבורים נלהבים בגדולת רבינו ותלמידו רבי נתן, מעלת לימוד ספריהם, והתחזקות בעבודת השם.',
    descriptionEnglish: 'Book containing nearly two hundred letters written by Rabbi Nathan bar Yehuda of Tiberias, one of Rabbi Nathan\'s distinguished students, to friends in Israel and abroad. Full of enthusiastic conversations about the greatness of Rabbenu and Rabbi Nathan.',
    descriptionFrench: 'Livre contenant près de deux cents lettres écrites par Rabbi Nathan bar Yéhouda de Tibériade, l\'un des disciples distingués de Rabbi Nathan, à des amis en Israël et à l\'étranger. Rempli de conversations enthousiastes sur la grandeur de Rabbénou et de son disciple Rabbi Nathan, la valeur de l\'étude de leurs livres, et le renforcement dans le service divin.',
    descriptionSpanish: 'Libro que contiene casi doscientas cartas escritas por el Rabino Nathan bar Yehuda de Tiberíades, uno de los discípulos distinguidos del Rabino Nathan, a amigos en Israel y en el extranjero. Lleno de conversaciones entusiastas sobre la grandeza de Rabenu y de su discípulo Rabino Nathan, el valor del estudio de sus libros, y el fortalecimiento en el servicio divino.',
    descriptionRussian: 'Книга, содержащая почти двести писем, написанных рабби Натаном бар Иегудой из Тверии, одним из выдающихся учеников рабби Натана, друзьям в Израиле и за рубежом. Полна восторженных бесед о величии Рабейну и его ученика рабби Натана, ценности изучения их книг и укрепления в служении Всевышнему.',
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
    featuresFrench: [
      'Deux cents lettres',
      'Disciple de Rabbi Nathan',
      'De la sainte Tibériade',
      'Renforcement dans la foi',
      'Étude des livres de Rabbénou'
    ],
    featuresSpanish: [
      'Doscientas cartas',
      'Discípulo del Rabino Nathan',
      'De la santa Tiberíades',
      'Fortalecimiento en la fe',
      'Estudio de los libros de Rabenu'
    ],
    featuresRussian: [
      'Двести писем',
      'Ученик рабби Натана',
      'Из святой Тверии',
      'Укрепление в вере',
      'Изучение книг Рабейну'
    ],
    tags: ['מכתבים', 'טבריה', 'תלמיד', 'התחזקות', 'אמונה'],
    isActive: true,
    isFeatured: false
  },
  'avi-hanachal': {
    id: 'avi-hanachal',
    name: 'אב\'י הנחל',
    nameEnglish: 'Avi HaNachal',
    nameFrench: 'Mon Père du Ruisseau',
    nameSpanish: 'Mi Padre del Arroyo',
    nameRussian: 'Мой Отец Ручья',
    description: 'מכתביו הנפלאים של רבי ישראל דוב אודסר, בעיקר אלו שנשלחו לזלמן שזר. המכתבים מכילים דיבורים קדושים, מחזקים ומעודדים, מספרי רבינו ורבי נתן, לאמץ ברכיים כושלות ולחזק ידיים רפות. להחדיר בלב הקורא אמונה בה\' יתברך ובצדיק האמת.',
    descriptionEnglish: 'The wonderful letters of Rabbi Yisrael Dov Odesser, especially those sent to Zalman Shazar. The letters contain holy words, strengthening and encouraging, from Rabbenu and Rabbi Nathan\'s books, to strengthen weak knees and fortify drooping hands.',
    descriptionFrench: 'Les lettres merveilleuses de Rabbi Israël Dov Odesser, principalement celles envoyées à Zalman Shazar. Les lettres contiennent des paroles saintes, renforçantes et encourageantes, tirées des livres de notre Maître et de Rabbi Nathan, pour affermir les genoux chancelants et fortifier les mains faibles. Pour insuffler dans le cœur du lecteur la foi en l\'Éternel, béni soit-Il, et au Tsadik véritable.',
    descriptionSpanish: 'Las maravillosas cartas del Rabino Yisrael Dov Odesser, especialmente las enviadas a Zalman Shazar. Las cartas contienen palabras santas, fortalecedoras y alentadoras, de los libros de nuestro Maestro y del Rabino Natán, para fortalecer las rodillas débiles y fortificar las manos caídas. Para inculcar en el corazón del lector la fe en Dios, bendito sea, y en el verdadero Tzadik.',
    descriptionRussian: 'Чудесные письма рабби Исраэля Дова Одессера, особенно те, которые были отправлены Залману Шазару. Письма содержат святые слова, укрепляющие и ободряющие, из книг нашего Учителя и рабби Натана, чтобы укрепить ослабевшие колени и поддержать опустившиеся руки. Чтобы вселить в сердце читателя веру в Благословенного Бога и истинного Цадика.',
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
