import type { Product, ProductVariant } from '../../../../shared/schema';

// Real Breslov books data extracted from authentic source documents
// רשימת ספרי הקרן כולל שפות מעודכן אלול תשפ''ה & תיאור ספרי הקרן לאתר

// sefarim-talmidim products (9 items)
export const sefarimTalmidimProducts: Record<string, Product> = {
  'yekara-deshabbata': {
    id: 'yekara-deshabbata',
    name: 'יקרא דשבתא',
    nameEnglish: 'Yekara DeShabbata',
    nameFrench: 'La Préciosité du Chabbat',
    nameSpanish: 'La Preciosidad del Shabat',
    nameRussian: 'Драгоценность Шаббата',
    description: 'חובר על ידי רבי נחמן מטשעהרין תלמיד רבי נתן. תוכן הספר: גילוי הקשר בין מאמרי רבינו הקדוש ב"ליקוטי מוהר"ן", "סיפורי מעשיות" ו"שיחות הר"ן", ליקרת קדושת שבת. המחבר מציין: "שמעתי בשם גדולי הצדיקים קדמונים שהיו מפליגין מאוד בקדושת תורתו ומאמריו הקדושים של רבינו ואמרו עליהם בפירוש שהם בבחינת קדושת שבת"',
    descriptionEnglish: 'Composed by Rabbi Nachman of Tchehrin, student of Rabbi Nathan. The book reveals the connection between Rabbenu\'s teachings in Likutei Moharan, Tales, and Sichos HaRan to the holiness of Shabbat.',
    descriptionFrench: 'Composé par Rabbi Nahman de Tcherin, disciple de Rabbi Nathan. Le livre révèle le lien entre les enseignements de Rabbénou dans Likouté Moharan, les Contes et Sihot HaRane, et la sainteté du Chabbat. L\'auteur note : "J\'ai entendu au nom des grands tsadikim anciens qu\'ils exaltaient grandement la sainteté de la Torah et des enseignements sacrés de Rabbénou, et ils disaient explicitement qu\'ils sont de l\'aspect de la sainteté du Chabbat"',
    descriptionSpanish: 'Compuesto por el Rabino Najman de Tcherin, discípulo del Rabino Nathan. El libro revela la conexión entre las enseñanzas de Rabenu en Likutei Moharan, los Cuentos y Sijot HaRan, y la santidad del Shabat. El autor nota: "Escuché en nombre de los grandes tsadikim antiguos que exaltaban grandemente la santidad de la Torá y las enseñanzas sagradas de Rabenu, y dijeron explícitamente que son del aspecto de la santidad del Shabat"',
    descriptionRussian: 'Составлено рабби Нахманом из Черина, учеником рабби Натана. Книга раскрывает связь между учениями Рабейну в Ликутей Моаран, Рассказами и Сихот аРан, и святостью Шаббата. Автор отмечает: "Я слышал от имени великих праведников древности, что они чрезвычайно восхваляли святость Торы и священных учений Рабейну, и говорили явно, что они из аспекта святости Шаббата"',
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
    featuresFrench: [
      'Lien des enseignements de Rabbénou au Chabbat saint',
      'Innovations sur la sainteté du Chabbat',
      'Basé sur tous les livres de Rabbénou',
      'Auteur disciple de Rabbi Nathan',
      'Révélation de la profondeur des enseignements'
    ],
    featuresSpanish: [
      'Conexión de las enseñanzas de Rabenu al Shabat santo',
      'Innovaciones sobre la santidad del Shabat',
      'Basado en todos los libros de Rabenu',
      'Autor discípulo del Rabino Nathan',
      'Revelación de la profundidad de las enseñanzas'
    ],
    featuresRussian: [
      'Связь учений Рабейну со святым Шаббатом',
      'Новшества о святости Шаббата',
      'Основано на всех книгах Рабейну',
      'Автор ученик рабби Натана',
      'Раскрытие глубины учений'
    ],
    tags: ['שבת', 'קדושה', 'תורות', 'חגים', 'מטשעהרין'],
    isActive: true,
    isFeatured: true
  },
  'yareach-haeitanim': {
    id: 'yareach-haeitanim',
    name: 'ירח האיתנים',
    nameEnglish: 'Yareach HaEitanim',
    nameFrench: 'Yaréakh HaEitanim',
    nameSpanish: 'Yareaj HaEitanim',
    nameRussian: 'Яреах а-Эйтаним',
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
  'nachal-novea': {
    id: 'nachal-novea',
    name: 'נחל נובע',
    nameEnglish: 'Nachal Novea',
    nameFrench: 'Fleuve Jaillissant',
    nameSpanish: 'Manantial que Fluye',
    nameRussian: 'Нахаль Новеа',
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
    nameFrench: 'Entretiens et Éveil',
    nameSpanish: 'Conversaciones y Despertar',
    nameRussian: 'Беседы и Пробуждение',
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
  'parparaot-al-hashas': {
    id: 'parparaot-al-hashas',
    name: 'פרפראות על הש"ס',
    nameEnglish: 'Parparaot Al HaShas',
    nameFrench: 'Parparaot sur le Chasse',
    nameSpanish: 'Parparaot sobre el Shas',
    nameRussian: 'Парпараот на Шас',
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
    nameFrench: 'Likouté Even',
    nameSpanish: 'Likutei Even',
    nameRussian: 'Ликутей Эвен',
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
  'yisrael-saba': {
    id: 'yisrael-saba',
    name: 'ישראל סבא',
    nameEnglish: 'Yisrael Saba',
    nameFrench: 'Israël Saba',
    nameSpanish: 'Israel Saba',
    nameRussian: 'Исраэль Саба',
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
    nameFrench: 'La Source de Force',
    nameSpanish: 'Manantial Fortalecedor',
    nameRussian: 'Мааян а-Митгабер',
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
  'emunat-itecha': {
    id: 'emunat-itecha',
    name: 'אמונת עתיך',
    nameEnglish: 'Emunat Itecha',
    nameFrench: 'Emounat Itékha',
    nameSpanish: 'Emunat Iteja',
    nameRussian: 'Эмунат Итеха',
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
  }
};
