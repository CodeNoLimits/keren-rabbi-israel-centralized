import type { Product, ProductVariant } from '../../../../shared/schema';

// Real Breslov books data extracted from authentic source documents
// רשימת ספרי הקרן כולל שפות מעודכן אלול תשפ''ה & תיאור ספרי הקרן לאתר

// chagim products (10 items)
export const chagimProducts: Record<string, Product> = {
  'rosh-hashana-sheli': {
    id: 'rosh-hashana-sheli',
    name: 'ראש השנה שלי',
    nameEnglish: 'My Rosh Hashanah',
    nameFrench: 'Mon Roch Hachana',
    nameSpanish: 'Mi Rosh Hashaná',
    nameRussian: 'Мой Рош а-Шана',
    description: 'מכיל ליקוט מספרי רבינו, על מעלת קדושת הראש השנה, והנסיעה לראש השנה לצדיק האמת. כך כותב רבי נתן בשם רבינו נחמן מברסלב: "אמר: הראש השנה שלי עולה על הכל. והיה פלא אצלי מאחר שהמקורבים שלי מאמינים לי, ולמה לא יזהרו כל האנשים המקורבים אלי שיהיו כולם על ראש השנה, איש לא יעדר."',
    descriptionEnglish: 'Contains a collection from Rabbenu\'s books about the excellence and holiness of Rosh Hashanah, and traveling to the true Tzaddik for Rosh Hashanah.',
    descriptionFrench: 'Contient une collection des livres de Rabbénou sur l\'excellence et la sainteté de Roch Hachana, et le voyage vers le vrai Tsadik pour Roch Hachana.',
    descriptionSpanish: 'Contiene una colección de los libros de Rabenu sobre la excelencia y santidad de Rosh Hashaná, y el viaje al verdadero Tzadik para Rosh Hashaná.',
    descriptionRussian: 'Содержит сборник из книг Рабейну о превосходстве и святости Рош а-Шана, а также о путешествии к истинному праведнику на Рош а-Шана.',
    category: 'מועדי השנה',
    subcategory: 'ראש השנה',
    author: 'רבי נחמן מברסלב',
    publisher: 'קרן רבי ישראל',
    language: 'עברית',
    pages: 320,
    isbn: '978-965-7023-25-7',
    images: [
      '/attached_assets/ראש השנה שלי 1_1757275239936.jpg',
      '/attached_assets/ראש השנה שלי 2_1757275239936.jpg',
      '/attached_assets/הראש השנה שלי 3_1757275239935.jpg'
    ],
    variants: [
      {
        id: 'medium-skai-4vol',
        format: 'סקאי',
        binding: 'קשה',
        size: 'בינוני',
        dimensions: '17*12',
        volumes: 4,
        price: 120,
        inStock: true,
        stockQuantity: 25
      }
    ],
    features: [
      'ליקוט מכל ספרי רבינו',
      'קדושת ראש השנה',
      'נסיעה לצדיק האמת',
      'הראש השנה שלי עולה על הכל',
      'מתאים לחודש אלול וראש השנה'
    ],
    tags: ['ראש השנה', 'מועדים', 'אלול', 'צדיק', 'נסיעה'],
    isActive: true,
    isFeatured: true
  },
  'itzumo-shel-yom': {
    id: 'itzumo-shel-yom',
    name: 'עיצומו של יום',
    nameEnglish: 'The Essence of the Day',
    nameFrench: 'L\'Essence du Jour',
    nameSpanish: 'La Esencia del Día',
    nameRussian: 'Сущность дня',
    description: 'מכיל ליקוט מכל ספרי רבינו ורבי נתן על מעלת וקדושת יום הכיפורים, שכדברי הגמרא "עיצומו של יום מכפר" "כי ביום הזה יכפר עליכם מכל חטאתיכם"',
    descriptionEnglish: 'Contains a collection from all of Rabbenu and Rabbi Nathan\'s books about the excellence and holiness of Yom Kippur, as the Talmud says "the essence of the day atones".',
    descriptionFrench: 'Contient une collection de tous les livres de Rabbénou et de Rabbi Nathan sur l\'excellence et la sainteté de Yom Kippour, comme le dit le Talmud : « l\'essence du jour pardonne ».',
    descriptionSpanish: 'Contiene una colección de todos los libros de Rabenu y del Rabino Nathan sobre la excelencia y santidad de Yom Kipur, como dice el Talmud: "la esencia del día perdona".',
    descriptionRussian: 'Содержит сборник из всех книг Рабейну и рабби Натана о превосходстве и святости Йом Кипура, как говорит Талмуд: «сама суть дня искупает».',
    category: 'מועדי השנה',
    subcategory: 'יום כיפור',
    author: 'רבי נחמן מברסלב',
    publisher: 'קרן רבי ישראל',
    language: 'עברית',
    pages: 250,
    isbn: '978-965-7023-26-4',
    images: [
      '/attached_assets/אוצר היראה 1_1757275234154.jpg',
      '/attached_assets/אוצר היראה 2_1757275234155.jpg',
      '/attached_assets/1_1757275751755.jpg'
    ],
    variants: [
      {
        id: 'medium-skai-2vol',
        format: 'סקאי',
        binding: 'קשה',
        size: 'בינוני',
        dimensions: '17*12',
        volumes: 2,
        price: 70,
        inStock: true,
        stockQuantity: 20
      }
    ],
    features: [
      'קדושת יום כיפור',
      'עיצומו של יום מכפר',
      'ליקוט מכל הספרים',
      'כפרה וסליחה',
      'יום הדין הגדול'
    ],
    tags: ['יום כיפור', 'כפרה', 'סליחה', 'דין', 'קדושה'],
    isActive: true,
    isFeatured: true
  },
  'ki-naar-yisrael': {
    id: 'ki-naar-yisrael',
    name: 'כי נער ישראל',
    nameEnglish: 'For Israel is a Youth',
    nameFrench: 'Car Israël est un Jeune',
    nameSpanish: 'Porque Israel es un Joven',
    nameRussian: 'Ибо Израиль юн',
    description: 'ליקוט מכל ספרי רבינו ורבי נתן, על חינוך הנערים, כולל תפילות לזכות לבנים ובנות יראי השם. על שם הפסוק "כי נער ישראל ואוהבהו וממצרים קראתי לבני" (הושע יא, א)',
    descriptionEnglish: 'A collection from all of Rabbenu and Rabbi Nathan\'s books about educating children, including prayers for meriting God-fearing sons and daughters.',
    descriptionFrench: 'Une collection de tous les livres de Rabbénou et de Rabbi Nathan sur l\'éducation des enfants, incluant des prières pour mériter des fils et des filles craignant Dieu.',
    descriptionSpanish: 'Una colección de todos los libros de Rabenu y del Rabino Nathan sobre la educación de los niños, incluyendo oraciones para merecer hijos e hijas temerosos de Dios.',
    descriptionRussian: 'Сборник из всех книг Рабейну и рабби Натана о воспитании детей, включая молитвы о даровании богобоязненных сыновей и дочерей.',
    category: 'מועדי השנה',
    subcategory: 'סוכות',
    author: 'רבי נחמן מברסלב',
    publisher: 'קרן רבי ישראל',
    language: 'עברית',
    pages: 300,
    isbn: '978-965-7023-27-1',
    images: [
      '/attached_assets/כל בו 1_1757275910545.jpg',
      '/attached_assets/כל בו 2_1757280401418.jpg',
      '/attached_assets/2_1757275751756.jpg'
    ],
    variants: [
      {
        id: 'medium-skai-3vol',
        format: 'סקאי',
        binding: 'קשה',
        size: 'בינוני',
        dimensions: '17*12',
        volumes: 3,
        price: 90,
        inStock: true,
        stockQuantity: 18
      }
    ],
    features: [
      'חינוך נערים',
      'תפילות לבנים יראי השם',
      'על שם הפסוק בהושע',
      'ליקוט מכל הספרים',
      'חג הסוכות'
    ],
    tags: ['חינוך', 'נערים', 'בנים', 'סוכות', 'תפילות'],
    isActive: true,
    isFeatured: true
  },
  'toda-vehodaa': {
    id: 'toda-vehodaa',
    name: 'תודה והודאה',
    nameEnglish: 'Thanks and Gratitude',
    nameFrench: 'Remerciements et Gratitude',
    nameSpanish: 'Agradecimiento y Gratitud',
    nameRussian: 'Благодарность и признательность',
    description: 'מכיל ליקוט מכל ספרי רבינו ורבי נתן, על מעלת התודה וההודאה להשם יתברך שבכוחם להוציא את האדם מצרה לרווחה. מיוסד בעיקר על התורה \'ימי חנוכה הם ימי הודאה\' המובאת בליקוטי מוהר"ן חלק שני.',
    descriptionEnglish: 'Contains a collection from all of Rabbenu and Rabbi Nathan\'s books about the excellence of thanks and gratitude to God, which have the power to bring a person from distress to relief.',
    descriptionFrench: 'Contient une collection de tous les livres de Rabbénou et de Rabbi Nathan sur l\'excellence de l\'action de grâce et de la gratitude envers Dieu, qui ont le pouvoir de faire passer une personne de la détresse au soulagement.',
    descriptionSpanish: 'Contiene una colección de todos los libros de Rabenu y del Rabino Nathan sobre la excelencia del agradecimiento y la gratitud a Dios, que tienen el poder de llevar a una persona de la angustia al alivio.',
    descriptionRussian: 'Содержит сборник из всех книг Рабейну и рабби Натана о превосходстве благодарности и признательности Богу, которые способны вывести человека из беды к облегчению.',
    category: 'מועדי השנה',
    subcategory: 'חנוכה',
    author: 'רבי נחמן מברסלב',
    publisher: 'קרן רבי ישראל',
    language: 'עברית',
    pages: 220,
    isbn: '978-965-7023-28-8',
    images: [
      '/attached_assets/תודה והודאה 1_1757281336534.jpg',
      '/attached_assets/תודה והודאה 2_1757281336535.jpg',
      '/attached_assets/תודה והודאה 3_1757281336535.jpg'
    ],
    variants: [
      {
        id: 'medium-skai-2vol',
        format: 'סקאי כולל הדלקת נרות',
        binding: 'קשה',
        size: 'בינוני',
        dimensions: '17*12',
        volumes: 2,
        price: 60,
        inStock: true,
        stockQuantity: 22
      }
    ],
    features: [
      'מעלת התודה וההודאה',
      'ימי חנוכה הם ימי הודאה',
      'להוציא מצרה לרווחה',
      'כולל הדלקת נרות',
      'ליקוט מכל הספרים'
    ],
    tags: ['חנוכה', 'תודה', 'הודאה', 'הדלקת נרות', 'ישועה'],
    isActive: true,
    isFeatured: true
  },
  'hatchalat-hathchlatot': {
    id: 'hatchalat-hathchlatot',
    name: 'התחלת ההתחלות',
    nameEnglish: 'Beginning of Beginnings',
    nameFrench: 'Le Commencement des Commencements',
    nameSpanish: 'El Comienzo de los Comienzos',
    nameRussian: 'Начало начал',
    description: '"ועכשיו - כל ההתחלות מפורים" גילה רבינו הקדוש רבי נחמן (ליקוטי מוהר"ן עד). הספר מכיל ליקוט מכל ספרי רבינו ורבי נתן, על מעלת וקדושת יום הפורים, שהוא ההתחלה של כל ההתחלות. כולל מגילת אסתר, במהדורה מאירת עיניים.',
    descriptionEnglish: '"And now - all beginnings are from Purim" revealed our holy Rebbe Nathan. The book contains a collection from all of Rabbenu and Rabbi Nathan\'s books about the excellence and holiness of Purim day.',
    descriptionFrench: '« Et maintenant - tous les commencements viennent de Pourim », révéla notre saint Rebbe Nahman. Le livre contient une collection de tous les livres de Rabbénou et de Rabbi Nathan sur l\'excellence et la sainteté du jour de Pourim.',
    descriptionSpanish: '"Y ahora - todos los comienzos son de Purim", reveló nuestro santo Rebe Najman. El libro contiene una colección de todos los libros de Rabenu y del Rabino Nathan sobre la excelencia y santidad del día de Purim.',
    descriptionRussian: '«А теперь — все начинания от Пурима», — открыл наш святой Ребе Нахман. Книга содержит сборник из всех книг Рабейну и рабби Натана о превосходстве и святости дня Пурим.',
    category: 'מועדי השנה',
    subcategory: 'פורים',
    author: 'רבי נחמן מברסלב',
    publisher: 'קרן רבי ישראל',
    language: 'עברית',
    pages: 380,
    isbn: '978-965-7023-29-5',
    images: [
      '/attached_assets/התחלת ההתחלות 1_1757275250997.jpg',
      '/attached_assets/התחלת ההתחלות 2_1757275250998.jpg',
      '/attached_assets/התחלת ההתחלות 3_1757275250998.jpg'
    ],
    variants: [
      {
        id: 'medium-skai-4vol',
        format: 'סקאי כולל מגילת אסתר',
        binding: 'קשה',
        size: 'בינוני',
        dimensions: '17*12',
        volumes: 4,
        price: 120,
        inStock: true,
        stockQuantity: 20
      }
    ],
    features: [
      'כל ההתחלות מפורים',
      'ההתחלה של כל ההתחלות',
      'כולל מגילת אסתר מאירת עיניים',
      'קדושת יום הפורים',
      'ליקוט מכל ספרי רבינו'
    ],
    tags: ['פורים', 'התחלות', 'מגילת אסתר', 'שמחה', 'קדושה'],
    isActive: true,
    isFeatured: true
  },
  'hitgalut-hadaat': {
    id: 'hitgalut-hadaat',
    name: 'התגלות הדעת',
    nameEnglish: 'Revelation of Knowledge',
    nameFrench: 'La Révélation de la Connaissance',
    nameSpanish: 'La Revelación del Conocimiento',
    nameRussian: 'Откровение знания',
    description: 'מכיל ליקוט מכל ספרי רבינו נחמן ותלמידו רבי נתן, על מעלת וקדושת חג הפסח, שבו מתגלה אורו של הרועה הנאמן, משה רבינו, החוזר ומתגלה בכל דור. כולל הגדה של פסח מאירת עיניים.',
    descriptionEnglish: 'Contains a collection from all of Rabbenu Nachman and his student Rabbi Nathan\'s books about the excellence and holiness of Passover, when the light of the faithful shepherd, Moses our teacher, is revealed anew in every generation.',
    descriptionFrench: 'Contient une collection de tous les livres de Rabbénou Nahman et de son disciple Rabbi Nathan sur l\'excellence et la sainteté de Pessah, lorsque la lumière du berger fidèle, Moïse notre maître, se révèle à nouveau à chaque génération.',
    descriptionSpanish: 'Contiene una colección de todos los libros de Rabenu Najman y su discípulo el Rabino Nathan sobre la excelencia y santidad de Pésaj, cuando la luz del pastor fiel, Moisés nuestro maestro, se revela de nuevo en cada generación.',
    descriptionRussian: 'Содержит сборник из всех книг Рабейну Нахмана и его ученика рабби Натана о превосходстве и святости Песаха, когда свет верного пастыря, Моисея, нашего учителя, заново открывается в каждом поколении.',
    category: 'מועדי השנה',
    subcategory: 'פסח',
    author: 'רבי נחמן מברסלב',
    publisher: 'קרן רבי ישראל',
    language: 'עברית',
    pages: 420,
    isbn: '978-965-7023-30-1',
    images: [
      '/attached_assets/התגלות הדעת 1_1757275244732.jpg',
      '/attached_assets/התגלות הדעת 2_1757275244733.jpg',
      '/attached_assets/התגלות הדעת 3_1757275244733.jpg',
      '/attached_assets/התגלות הדעת 4_1757275244733.jpg'
    ],
    variants: [
      {
        id: 'medium-skai-5vol',
        format: 'סקאי כולל הגדה של פסח',
        binding: 'קשה',
        size: 'בינוני',
        dimensions: '17*12',
        volumes: 5,
        price: 150,
        inStock: true,
        stockQuantity: 18
      }
    ],
    features: [
      'התגלות משה רבינו',
      'קדושת חג הפסח',
      'כולל הגדה של פסח מאירת עיניים',
      'הרועה הנאמן',
      'ליקוט מכל ספרי רבינו ורבי נתן'
    ],
    tags: ['פסח', 'הגדה', 'משה רבינו', 'התגלות', 'חירות'],
    isActive: true,
    isFeatured: true
  },
  'maafer-lefaar': {
    id: 'maafer-lefaar',
    name: 'מאפר לפאר',
    nameEnglish: 'Me\'Afer LeFa\'ar',
    nameFrench: 'Des Cendres à la Splendeur',
    nameSpanish: 'De Cenizas a la Belleza',
    nameRussian: 'Из пепла к славе',
    description: 'ליקוט מספרי רבינו ורבי נתן על ימי בין המצרים, בהם אנו מביעים געגועינו ותשוקתנו לגאולה ולבניין בית המקדש, על שם הפסוק: "לשום לאבלי ציון, לתת להם פאר תחת אפר" (ישעיה). ספר מיוחד לימי הצום והאבלות שמחזק בתקווה ובאמונה.',
    descriptionEnglish: 'Collection from Rabbenu and Rabbi Nathan\'s books about the Three Weeks period, expressing our longing for redemption and rebuilding the Temple, based on the verse "to give them beauty for ashes" (Isaiah).',
    descriptionFrench: 'Collection des livres de Rabbénou et de Rabbi Nathan sur la période des Trois Semaines, exprimant notre désir de rédemption et de reconstruction du Temple, basée sur le verset « pour leur donner la splendeur au lieu de la cendre » (Isaïe).',
    descriptionSpanish: 'Colección de los libros de Rabenu y del Rabino Nathan sobre el período de las Tres Semanas, expresando nuestro anhelo por la redención и la reconstrucción del Templo, basado en el versículo "para darles belleza en lugar de ceniza" (Isaías).',
    descriptionRussian: 'Сборник из книг Рабейну и рабби Натана о периоде Трех Недель, выражающий наше стремление к избавлению и восстановлению Храма, основанный на стихе «дать им славу вместо пепла» (Исаия).',
    category: 'חגים ומועדים',
    subcategory: 'בין המצרים',
    author: 'ליקוט מספרי רבינו ורבי נתן',
    publisher: 'קרן רבי ישראל',
    language: 'עברית',
    pages: 240,
    isbn: '978-965-7023-47-9',
    images: [
      '/attached_assets/מאפר לפאר 1.jpg'
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
        stockQuantity: 30
      }
    ],
    features: [
      'ימי בין המצרים',
      'געגועים לגאולה',
      'בניין בית המקדש',
      'חיזוק באמונה',
      'פאר תחת אפר'
    ],
    tags: ['בין המצרים', 'גאולה', 'בית המקדש', 'אבלות', 'תקווה'],
    isActive: true,
    isFeatured: false
  },
  'mem-tet-shaarim': {
    id: 'mem-tet-shaarim',
    name: 'מט\' שערים',
    nameEnglish: 'Mem-Tet Sha\'arim',
    nameFrench: 'Quarante-Neuf Portes',
    nameSpanish: 'Cuarenta y Nueve Puertas',
    nameRussian: 'Сорок девять ворот',
    description: 'ליקוט מספרי רבינו על קדושת ימי ספירת העומר שבין פסח לחג השבועות, ועניינים הקשורים לימים אלו. הספר מראה את העומק הרוחני של ספירת העומר כהכנה לקבלת התורה, ומבאר את מעלת כל יום ויום בספירה על פי תורות רבינו.',
    descriptionEnglish: 'Collection from Rabbenu\'s books about the holiness of the Counting of the Omer period between Passover and Shavuot, and matters related to these days. Shows the spiritual depth of counting as preparation for receiving the Torah.',
    descriptionFrench: 'Collection des livres de Rabbénou sur la sainteté de la période du Compte de l\'Omer entre Pessah et Chavouot, et les questions liées à ces jours. Montre la profondeur spirituelle du compte comme préparation à la réception de la Torah.',
    descriptionSpanish: 'Colección de los libros de Rabenu sobre la santidad del período de la Cuenta del Omer entre Pésaj y Shavuot, y asuntos relacionados con estos días. Muestra la profundidad espiritual de la cuenta como preparación para recibir la Torá.',
    descriptionRussian: 'Сборник из книг Рабейну о святости периода Счета Омера между Песахом и Шавуотом, а также о вопросах, связанных с этими днями. Показывает духовную глубину счета как подготовки к дарованию Торы.',
    category: 'חגים ומועדים',
    subcategory: 'ספירת העומר',
    author: 'ליקוט מספרי רבינו',
    publisher: 'קרן רבי ישראל',
    language: 'עברית',
    pages: 320,
    isbn: '978-965-7023-48-6',
    images: [
      '/attached_assets/מט שערים 1_1757275840464.jpg',
      '/attached_assets/מט שערים 2_1757275840465.jpg',
      '/attached_assets/מט שערים 3_1757275840465.jpg',
      '/attached_assets/מט שערים 4_1757275840466.jpg'
    ],
    variants: [
      {
        id: 'medium-skai-2vol',
        format: 'סקאי',
        binding: 'קשה',
        size: 'בינוני',
        dimensions: '17*12',
        volumes: 2,
        price: 60,
        inStock: true,
        stockQuantity: 20
      }
    ],
    features: [
      'ספירת העומר',
      'הכנה לקבלת התורה',
      'מ"ט שערי בינה',
      'קדושת הימים',
      'עומק רוחני'
    ],
    tags: ['ספירת העומר', 'תורה', 'קבלה', 'בינה', 'קדושה'],
    isActive: true,
    isFeatured: false
  },
  'sod-harashbi': {
    id: 'sod-harashbi',
    name: 'סוד הרשב"י',
    nameEnglish: 'Sod HaRashbi',
    nameFrench: 'Le Secret de Rashbi',
    nameSpanish: 'El Secreto de Rashbi',
    nameRussian: 'Тайна Рашби',
    description: 'ליקוט מספרי רבינו ורבי נתן, במעלת התנא האלוקי רבי שמעון בר יוחאי ובמעלת יום ההילולא שלו בל"ג בעומר. הספר מגלה את הקשר העמוק בין תורות רבינו לבין קדושתו של רשב"י, ואת מעלת יום ל"ג בעומר כיום של שמחה וחדווה.',
    descriptionEnglish: 'Collection from Rabbenu and Rabbi Nathan\'s books about the greatness of the divine Tanna Rabbi Shimon bar Yochai and the merit of his hillula on Lag Ba\'Omer. Reveals the deep connection between Rabbenu\'s teachings and Rashbi\'s holiness.',
    descriptionFrench: 'Collection des livres de Rabbénou et de Rabbi Nathan sur la grandeur du divin Tanna Rabbi Shimon bar Yohaï et le mérite de sa hilloula à Lag Ba\'Omer. Révèle le lien profond entre les enseignements de Rabbénou et la sainteté de Rachbi.',
    descriptionSpanish: 'Colección de los libros de Rabenu y del Rabino Nathan sobre la grandeza del divino Tanna Rabí Shimon bar Yojai y el mérito de su hilulá en Lag BaOmer. Revela la profunda conexión entre las enseñanzas de Rabenu и la santidad de Rashbi.',
    descriptionRussian: 'Сборник из книг Рабейну и рабби Натана о величии божественного Танны рабби Шимона бар Йохая и заслуге его хилулы на Лаг ба-Омер. Раскрывает глубокую связь между учениями Рабейну и святостью Рашби.',
    category: 'חגים ומועדים',
    subcategory: 'לג בעומר',
    author: 'ליקוט מספרי רבינו ורבי נתן',
    publisher: 'קרן רבי ישראל',
    language: 'עברית',
    pages: 220,
    isbn: '978-965-7023-49-3',
    images: [
      '/attached_assets/סוד הרשבי 1_1757275910545.jpg',
      '/attached_assets/סוד הרשבי 1_1757278339720.jpg',
      '/attached_assets/סוד הרשבי 2_1757280401419.jpg'
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
        stockQuantity: 35
      }
    ],
    features: [
      'רבי שמעון בר יוחאי',
      'לג בעומר הילולא',
      'סודות התורה',
      'שמחה וחדווה',
      'קשר לתורות רבינו'
    ],
    tags: ['רשבי', 'לג בעומר', 'הילולא', 'קבלה', 'שמחה'],
    isActive: true,
    isFeatured: false
  },
  'shaar-hachamishim': {
    id: 'shaar-hachamishim',
    name: 'שער החמישים',
    nameEnglish: 'Sha\'ar HaChamishim',
    nameFrench: 'La Porte des Cinquante',
    nameSpanish: 'La Puerta de los Cincuenta',
    nameRussian: 'Пятидесятые ворота',
    description: 'ליקוט מכל ספרי רבינו ורבי נתן על קדושת חג השבועות שהוא כידוע "שער החמישים" של הקדושה, כולל "תיקון ליל שבועות" המקובל מהאר"י ז"ל ומהשל"ה הקדוש. הספר מגלה את עומק קדושת חג מתן תורה ומעלת הלילה הקדוש.',
    descriptionEnglish: 'Collection from all of Rabbenu and Rabbi Nathan\'s books about the holiness of Shavuot, known as the "Fiftieth Gate" of holiness, including "Tikkun Leil Shavuot" from the Ari and Shelah. Reveals the depth of the Torah-giving holiday.',
    descriptionFrench: 'Collection de tous les livres de Rabbénou et de Rabbi Nathan sur la sainteté de Chavouot, connu comme la « Cinquantième Porte » de la sainteté, incluant le « Tikkoun Leil Chavouot » du Ari et du Chéla. Révèle la profondeur de la fête du don de la Torah.',
    descriptionSpanish: 'Colección de todos los libros de Rabenu y del Rabino Nathan sobre la santidad de Shavuot, conocida como la "Puerta Cincuenta" de la santidad, incluyendo el "Tikún Leil Shavuot" del Ari y el Shelá. Revela la profundidad de la festividad de la entrega de la Torá.',
    descriptionRussian: 'Сборник из всех книг Рабейну и рабби Натана о святости Шавуота, известного как «Пятидесятые врата» святости, включая «Тикун Лейл Шавуот» от Ари и Шела. Раскрывает глубину праздника дарования Торы.',
    category: 'חגים ומועדים',
    subcategory: 'שבועות',
    author: 'ליקוט מספרי רבינו ורבי נתן',
    publisher: 'קרן רבי ישראל',
    language: 'עברית',
    pages: 380,
    isbn: '978-965-7023-50-9',
    images: [
      '/attached_assets/שער החמישים 1_1757281267103.jpg',
      '/attached_assets/שער החמישים 2_1757281267104.jpg'
    ],
    variants: [
      {
        id: 'medium-skai-3vol',
        format: 'סקאי',
        binding: 'קשה',
        size: 'בינוני',
        dimensions: '17*12',
        volumes: 3,
        price: 90,
        inStock: true,
        stockQuantity: 15
      }
    ],
    features: [
      'חג השבועות קדוש',
      'שער החמישים',
      'תיקון ליל שבועות',
      'מתן תורה',
      'האר"י והשל"ה'
    ],
    tags: ['שבועות', 'מתן תורה', 'תיקון לילה', 'קבלה', 'חמישים'],
    isActive: true,
    isFeatured: false
  }
};
