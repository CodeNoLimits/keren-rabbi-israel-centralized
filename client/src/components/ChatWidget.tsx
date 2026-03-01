import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { realBreslovProducts } from '../data/products';
import { getInterfaceDisplayTitle } from '../utils/bookTitleHelper';
import { convertImagePath } from '../utils/imagePathHelper';
import type { Product } from '../../../shared/schema';

// ─── Chat Widget Translations ─────────────────────────────────────────────────

const chatTranslations = {
  he: {
    title: 'יועץ ספרי ברסלב',
    subtitle: 'מה תרצה ללמוד היום?',
    placeholder: 'שאל על נושא, ספר, או בעיה...',
    send: 'שלח',
    greeting: 'שלום! אני כאן לעזור לך למצוא את הספר המושלם. בחר נושא או שאל שאלה:',
    topicPrompt: 'נושאים נפוצים:',
    noResults: 'לא מצאתי ספרים מתאימים. נסה לנסח אחרת, או בחר מהנושאים למעלה.',
    viewProduct: 'צפה בספר',
    fromPrice: 'החל מ-',
    botName: 'יועץ ברסלב',
    thinking: 'חושב...',
    openChat: 'יועץ ספרים',
    suggestedTopics: 'נושאים מוצעים',
    foundBooks: 'מצאתי את הספרים הבאים:',
    moreHelp: 'רוצה לשאול על נושא נוסף?',
  },
  en: {
    title: 'Breslov Book Advisor',
    subtitle: 'What would you like to learn today?',
    placeholder: 'Ask about a topic, book, or issue...',
    send: 'Send',
    greeting: 'Hello! I\'m here to help you find the perfect book. Choose a topic or ask a question:',
    topicPrompt: 'Popular topics:',
    noResults: 'I couldn\'t find matching books. Try rephrasing, or choose from the topics above.',
    viewProduct: 'View Book',
    fromPrice: 'From ',
    botName: 'Breslov Advisor',
    thinking: 'Thinking...',
    openChat: 'Book Advisor',
    suggestedTopics: 'Suggested Topics',
    foundBooks: 'I found these books for you:',
    moreHelp: 'Would you like to ask about another topic?',
  },
  fr: {
    title: 'Conseiller Livres Breslov',
    subtitle: 'Que souhaitez-vous etudier aujourd\'hui ?',
    placeholder: 'Demandez un sujet, un livre ou un probleme...',
    send: 'Envoyer',
    greeting: 'Bonjour ! Je suis la pour vous aider a trouver le livre parfait. Choisissez un sujet ou posez une question :',
    topicPrompt: 'Sujets populaires :',
    noResults: 'Je n\'ai pas trouve de livres correspondants. Essayez de reformuler, ou choisissez parmi les sujets ci-dessus.',
    viewProduct: 'Voir le livre',
    fromPrice: 'A partir de ',
    botName: 'Conseiller Breslov',
    thinking: 'Reflexion...',
    openChat: 'Conseiller livres',
    suggestedTopics: 'Sujets suggeres',
    foundBooks: 'J\'ai trouve ces livres pour vous :',
    moreHelp: 'Souhaitez-vous poser une autre question ?',
  },
  es: {
    title: 'Asesor de Libros Breslov',
    subtitle: 'Que te gustaria aprender hoy?',
    placeholder: 'Pregunta sobre un tema, libro o problema...',
    send: 'Enviar',
    greeting: 'Hola! Estoy aqui para ayudarte a encontrar el libro perfecto. Elige un tema o haz una pregunta:',
    topicPrompt: 'Temas populares:',
    noResults: 'No encontre libros que coincidan. Intenta reformular, o elige de los temas de arriba.',
    viewProduct: 'Ver libro',
    fromPrice: 'Desde ',
    botName: 'Asesor Breslov',
    thinking: 'Pensando...',
    openChat: 'Asesor de libros',
    suggestedTopics: 'Temas sugeridos',
    foundBooks: 'Encontre estos libros para ti:',
    moreHelp: 'Te gustaria preguntar sobre otro tema?',
  },
  ru: {
    title: 'Советник по книгам Бреслов',
    subtitle: 'Что вы хотите изучить сегодня?',
    placeholder: 'Спросите о теме, книге или проблеме...',
    send: 'Отправить',
    greeting: 'Здравствуйте! Я здесь, чтобы помочь вам найти идеальную книгу. Выберите тему или задайте вопрос:',
    topicPrompt: 'Популярные темы:',
    noResults: 'Я не нашел подходящих книг. Попробуйте переформулировать или выберите из тем выше.',
    viewProduct: 'Смотреть книгу',
    fromPrice: 'От ',
    botName: 'Советник Бреслов',
    thinking: 'Думаю...',
    openChat: 'Советник по книгам',
    suggestedTopics: 'Рекомендуемые темы',
    foundBooks: 'Я нашел эти книги для вас:',
    moreHelp: 'Хотите спросить о другой теме?',
  },
};

// ─── Topic Suggestions (multi-language) ───────────────────────────────────────

interface TopicSuggestion {
  id: string;
  emoji: string;
  labels: Record<string, string>;
}

const topicSuggestions: TopicSuggestion[] = [
  {
    id: 'livelihood',
    emoji: '💰',
    labels: { he: 'פרנסה', en: 'Livelihood', fr: 'Subsistance', es: 'Sustento', ru: 'Заработок' },
  },
  {
    id: 'peace_home',
    emoji: '🏠',
    labels: { he: 'שלום בית', en: 'Peace at Home', fr: 'Paix du foyer', es: 'Paz del hogar', ru: 'Мир в доме' },
  },
  {
    id: 'healing',
    emoji: '💚',
    labels: { he: 'רפואה', en: 'Healing', fr: 'Guerison', es: 'Curacion', ru: 'Исцеление' },
  },
  {
    id: 'repentance',
    emoji: '🔄',
    labels: { he: 'תשובה', en: 'Repentance', fr: 'Repentir', es: 'Arrepentimiento', ru: 'Раскаяние' },
  },
  {
    id: 'joy',
    emoji: '😊',
    labels: { he: 'שמחה', en: 'Joy', fr: 'Joie', es: 'Alegria', ru: 'Радость' },
  },
  {
    id: 'prayer',
    emoji: '🙏',
    labels: { he: 'תפילה', en: 'Prayer', fr: 'Priere', es: 'Oracion', ru: 'Молитва' },
  },
  {
    id: 'faith',
    emoji: '✨',
    labels: { he: 'אמונה', en: 'Faith', fr: 'Foi', es: 'Fe', ru: 'Вера' },
  },
  {
    id: 'sadness',
    emoji: '🌧️',
    labels: { he: 'עצבות', en: 'Sadness', fr: 'Tristesse', es: 'Tristeza', ru: 'Грусть' },
  },
];

// ─── Breslov Knowledge Base ───────────────────────────────────────────────────
// Maps topics to recommended product IDs with explanations per language

interface TopicRecommendation {
  productIds: string[];
  response: Record<string, string>;
}

const breslovKnowledgeBase: Record<string, TopicRecommendation> = {
  livelihood: {
    productIds: ['likutei-moharan', 'likutei-tefilot', 'likutei-etzot', 'kol-bo-leyeshuot', 'shemot-hatzadikim'],
    response: {
      he: 'רבי נחמן מלמד שפרנסה קשורה לאמונה ולתפילה. הנה ספרים שיעזרו לך:',
      en: 'Rabbi Nachman teaches that livelihood is connected to faith and prayer. Here are books to help you:',
      fr: 'Rabbi Na\'hman enseigne que la subsistance est liee a la foi et a la priere. Voici des livres pour vous aider :',
      es: 'Rabi Najman ensena que el sustento esta conectado con la fe y la oracion. Aqui hay libros para ayudarte:',
      ru: 'Рабби Нахман учит, что заработок связан с верой и молитвой. Вот книги, которые помогут:',
    },
  },
  peace_home: {
    productIds: ['likutei-moharan', 'likutei-etzot', 'likutei-tefilot', 'kol-bo-leyeshuot', 'alim-letrufah'],
    response: {
      he: 'שלום בית הוא יסוד גדול בתורת ברסלב. רבי נחמן מדבר רבות על הרמוניה במשפחה:',
      en: 'Peace at home is a fundamental principle in Breslov teachings. Rabbi Nachman speaks extensively about family harmony:',
      fr: 'La paix du foyer est un principe fondamental dans les enseignements de Breslov. Rabbi Na\'hman parle beaucoup de l\'harmonie familiale :',
      es: 'La paz en el hogar es un principio fundamental en las ensenanzas de Breslov. Rabi Najman habla extensamente sobre la armonia familiar:',
      ru: 'Мир в доме - основной принцип в учении Бреслова. Рабби Нахман много говорит о семейной гармонии:',
    },
  },
  healing: {
    productIds: ['likutei-tefilot', 'kol-bo-leyeshuot', 'tikkun-haklali', 'shemot-hatzadikim', 'likutei-moharan'],
    response: {
      he: 'רבי נחמן מלמד שתפילה ותיקון הכללי הם כלים עוצמתיים לרפואה. הנה ספרים מומלצים:',
      en: 'Rabbi Nachman teaches that prayer and Tikkun HaKlali are powerful tools for healing. Here are recommended books:',
      fr: 'Rabbi Na\'hman enseigne que la priere et le Tikoun HaKlali sont des outils puissants de guerison. Voici les livres recommandes :',
      es: 'Rabi Najman ensena que la oracion y el Tikun HaKlali son herramientas poderosas para la curacion. Aqui los libros recomendados:',
      ru: 'Рабби Нахман учит, что молитва и Тикун а-Клали - мощные инструменты исцеления. Рекомендованные книги:',
    },
  },
  repentance: {
    productIds: ['likutei-moharan', 'likutei-tefilot', 'likutei-etzot', 'hishtapchut-hanefesh', 'tehilim'],
    response: {
      he: 'רבי נחמן אומר: "אם אתה מאמין שיכולים לקלקל, תאמין שיכולים לתקן". הנה ספרים על תשובה:',
      en: 'Rabbi Nachman says: "If you believe you can damage, believe you can fix." Here are books on repentance:',
      fr: 'Rabbi Na\'hman dit : "Si tu crois que l\'on peut detruire, crois que l\'on peut reparer." Voici des livres sur le repentir :',
      es: 'Rabi Najman dice: "Si crees que puedes destruir, cree que puedes reparar." Aqui hay libros sobre arrepentimiento:',
      ru: 'Рабби Нахман говорит: "Если веришь, что можно разрушить - верь, что можно исправить." Книги о раскаянии:',
    },
  },
  joy: {
    productIds: ['likutei-moharan', 'likutei-etzot', 'kochvei-ohr', 'sichos-haran', 'hatchalat-hathchlatot'],
    response: {
      he: '"מצווה גדולה להיות בשמחה תמיד!" - רבי נחמן מלמד עצות מעשיות לשמחה:',
      en: '"It is a great mitzvah to always be happy!" - Rabbi Nachman teaches practical advice for joy:',
      fr: '"C\'est une grande mitsva d\'etre toujours joyeux !" - Rabbi Na\'hman enseigne des conseils pratiques pour la joie :',
      es: '"Es una gran mitsva estar siempre feliz!" - Rabi Najman ensena consejos practicos para la alegria:',
      ru: '"Великая заповедь - всегда быть в радости!" - Рабби Нахман учит практическим советам для радости:',
    },
  },
  prayer: {
    productIds: ['likutei-tefilot', 'hishtapchut-hanefesh', 'tehilim', 'tikkun-haklali', 'shema-yisrael'],
    response: {
      he: 'התפילה היא הכלי המרכזי בתורת ברסלב. רבי נתן חיבר תפילות מופלאות על כל תורה:',
      en: 'Prayer is the central tool in Breslov teachings. Rabbi Nathan composed wonderful prayers for every teaching:',
      fr: 'La priere est l\'outil central des enseignements de Breslov. Rabbi Nathan a compose de merveilleuses prieres :',
      es: 'La oracion es la herramienta central en las ensenanzas de Breslov. Rabi Natan compuso oraciones maravillosas:',
      ru: 'Молитва - центральный инструмент в учении Бреслова. Рабби Натан составил замечательные молитвы:',
    },
  },
  faith: {
    productIds: ['likutei-moharan', 'likutei-etzot', 'sefer-hamidot', 'sichos-haran', 'emunat-itecha'],
    response: {
      he: 'אמונה היא היסוד של הכל בתורת רבי נחמן. "אין שום ייאוש בעולם כלל!":',
      en: 'Faith is the foundation of everything in Rabbi Nachman\'s teachings. "There is no despair in the world at all!":',
      fr: 'La foi est le fondement de tout dans les enseignements de Rabbi Na\'hman. "Il n\'y a aucun desespoir dans le monde !" :',
      es: 'La fe es el fundamento de todo en las ensenanzas de Rabi Najman. "No hay desesperacion en el mundo!":',
      ru: 'Вера - основа всего в учении Рабби Нахмана. "Нет никакого отчаяния в мире вообще!":',
    },
  },
  sadness: {
    productIds: ['likutei-moharan', 'likutei-etzot', 'kochvei-ohr', 'sichos-haran', 'hishtapchut-hanefesh'],
    response: {
      he: 'רבי נחמן מלמד: "אזמרה" - תמיד למצוא את הנקודות הטובות! העצה נגד עצבות:',
      en: 'Rabbi Nachman teaches "Azamra" - always find the good points! The advice against sadness:',
      fr: 'Rabbi Na\'hman enseigne "Azamra" - trouvez toujours les bons points ! Le conseil contre la tristesse :',
      es: 'Rabi Najman ensena "Azamra" - siempre encuentra los puntos buenos! El consejo contra la tristeza:',
      ru: 'Рабби Нахман учит "Азамра" - всегда находи хорошие точки! Совет против грусти:',
    },
  },
  // Additional semantic topics
  children: {
    productIds: ['siporei-masiyot', 'likutei-etzot', 'ki-naar-yisrael', 'kol-bo-leyeshuot', 'likutei-tefilot'],
    response: {
      he: 'רבי נחמן דיבר רבות על חינוך ילדים ועל כוח הסיפורים. הנה ספרים מומלצים:',
      en: 'Rabbi Nachman spoke extensively about educating children and the power of stories:',
      fr: 'Rabbi Na\'hman a beaucoup parle de l\'education des enfants et du pouvoir des histoires :',
      es: 'Rabi Najman hablo extensamente sobre la educacion de los ninos y el poder de las historias:',
      ru: 'Рабби Нахман много говорил о воспитании детей и силе историй:',
    },
  },
  stories: {
    productIds: ['siporei-masiyot', 'kochvei-ohr', 'chayei-moharan', 'sichos-haran', 'nachal-novea'],
    response: {
      he: 'סיפורי מעשיות של רבי נחמן הם "מדרש הנסתר" - מלאים סודות עמוקים:',
      en: 'Rabbi Nachman\'s tales are the "hidden Midrash" - full of deep secrets:',
      fr: 'Les contes de Rabbi Na\'hman sont le "Midrash cache" - pleins de secrets profonds :',
      es: 'Los cuentos de Rabi Najman son el "Midrash oculto" - llenos de secretos profundos:',
      ru: 'Сказки Рабби Нахмана - "скрытый Мидраш" - полны глубоких тайн:',
    },
  },
  meditation: {
    productIds: ['hishtapchut-hanefesh', 'likutei-tefilot', 'likutei-etzot', 'likutei-moharan', 'tehilim'],
    response: {
      he: 'התבודדות - שיחה בינך לבין הבורא - היא העצה המרכזית של רבי נחמן:',
      en: 'Hitbodedut - personal conversation with G-d - is Rabbi Nachman\'s central advice:',
      fr: 'Hitbodedout - conversation personnelle avec D. - est le conseil central de Rabbi Na\'hman :',
      es: 'Hitbodedut - conversacion personal con D-os - es el consejo central de Rabi Najman:',
      ru: 'Итбодедут - личная беседа с Б-гом - центральный совет Рабби Нахмана:',
    },
  },
  holidays: {
    productIds: ['rosh-hashana-sheli', 'itzumo-shel-yom', 'yareach-haeitanim', 'yekara-deshabbata', 'toda-vehodaa'],
    response: {
      he: 'רבי נחמן אמר: "ראש השנה שלי עולה על הכל!" הנה ספרים על חגים ומועדים:',
      en: 'Rabbi Nachman said: "My Rosh Hashana surpasses everything!" Here are books about holidays:',
      fr: 'Rabbi Na\'hman a dit : "Mon Roch Hachana surpasse tout !" Voici des livres sur les fetes :',
      es: 'Rabi Najman dijo: "Mi Rosh Hashana supera todo!" Aqui hay libros sobre festividades:',
      ru: 'Рабби Нахман сказал: "Мой Рош а-Шана превосходит все!" Книги о праздниках:',
    },
  },
  halacha: {
    productIds: ['likutei-halakhot', 'chumash-likutei-halakhot', 'etzot-hamevuarot', 'otzer-hayirah', 'likutei-even'],
    response: {
      he: 'ליקוטי הלכות הוא חיבורו הגדול של רבי נתן - עומק אין סופי בהלכה:',
      en: 'Likutei Halakhot is Rabbi Nathan\'s great work - infinite depth in halacha:',
      fr: 'Likoutei Halakhot est la grande oeuvre de Rabbi Nathan - une profondeur infinie dans la halakha :',
      es: 'Likutei Halajot es la gran obra de Rabi Natan - profundidad infinita en la halaja:',
      ru: 'Ликутей Алахот - великое произведение Рабби Натана - бесконечная глубина в алахе:',
    },
  },
  tikkun: {
    productIds: ['tikkun-haklali', 'likutei-tefilot', 'tehilim', 'hishtapchut-hanefesh', 'kol-bo-leyeshuot'],
    response: {
      he: 'תיקון הכללי - עשרה מזמורי תהילים שגילה רבי נחמן - סגולה עצומה:',
      en: 'Tikkun HaKlali - ten Psalms revealed by Rabbi Nachman - a tremendous remedy:',
      fr: 'Tikoun HaKlali - dix Psaumes reveles par Rabbi Na\'hman - un remede formidable :',
      es: 'Tikun HaKlali - diez Salmos revelados por Rabi Najman - un remedio tremendo:',
      ru: 'Тикун а-Клали - десять псалмов, открытых Рабби Нахманом - огромное исцеление:',
    },
  },
  beginners: {
    productIds: ['kitzur-likutei-moharan', 'likutei-etzot', 'sichos-haran', 'sefer-hamidot', 'hatchalat-hathchlatot'],
    response: {
      he: 'מתחילים? מצוין! הנה ספרים מומלצים במיוחד למתחילים בתורת ברסלב:',
      en: 'Just starting? Excellent! Here are books especially recommended for beginners in Breslov:',
      fr: 'Vous debutez ? Excellent ! Voici des livres specialement recommandes pour les debutants en Breslov :',
      es: 'Recien empezando? Excelente! Aqui hay libros especialmente recomendados para principiantes en Breslov:',
      ru: 'Начинаете? Отлично! Вот книги, особенно рекомендуемые для начинающих в Бреслове:',
    },
  },
};

// ─── Semantic Keyword Mapping ─────────────────────────────────────────────────
// Maps user keywords (in any language) to knowledge base topic IDs

const semanticKeywords: Record<string, string[]> = {
  livelihood: [
    'פרנסה', 'כסף', 'עבודה', 'עסקים', 'עוני', 'עושר', 'משכורת',
    'livelihood', 'money', 'income', 'work', 'business', 'poverty', 'wealth', 'salary', 'job', 'financial',
    'argent', 'travail', 'revenus', 'affaires', 'salaire',
    'dinero', 'trabajo', 'ingresos', 'negocios',
    'деньги', 'работа', 'доход', 'бизнес', 'зарплата',
  ],
  peace_home: [
    'שלום בית', 'זוגיות', 'נישואין', 'שידוך', 'משפחה', 'אישה', 'בעל', 'זיווג', 'חתונה',
    'peace', 'home', 'marriage', 'shidduch', 'family', 'wife', 'husband', 'couple', 'relationship', 'wedding', 'shalom bayit',
    'mariage', 'famille', 'couple', 'femme', 'mari', 'foyer',
    'matrimonio', 'familia', 'pareja', 'esposa', 'esposo', 'hogar',
    'семья', 'брак', 'жена', 'муж', 'дом', 'пара',
  ],
  healing: [
    'רפואה', 'חולה', 'חולי', 'בריאות', 'רופא', 'מחלה', 'כאב',
    'healing', 'health', 'sick', 'illness', 'disease', 'pain', 'medicine', 'cure', 'doctor', 'refua',
    'guerison', 'sante', 'malade', 'maladie', 'douleur',
    'curacion', 'salud', 'enfermo', 'enfermedad', 'dolor',
    'исцеление', 'здоровье', 'болезнь', 'боль', 'лекарство',
  ],
  repentance: [
    'תשובה', 'חטא', 'עבירה', 'חרטה', 'וידוי', 'כפרה', 'סליחה',
    'repentance', 'sin', 'teshuva', 'teshuvah', 'forgiveness', 'atonement', 'regret',
    'repentir', 'peche', 'pardon', 'expiation',
    'arrepentimiento', 'pecado', 'perdon',
    'раскаяние', 'грех', 'прощение', 'покаяние',
  ],
  joy: [
    'שמחה', 'עליזות', 'ריקוד', 'שירה', 'אושר', 'חדווה',
    'joy', 'happiness', 'happy', 'dance', 'singing', 'simcha', 'simha', 'cheerful', 'rejoice',
    'joie', 'bonheur', 'heureux', 'danse', 'chanson',
    'alegria', 'felicidad', 'feliz', 'baile',
    'радость', 'счастье', 'танец', 'песня',
  ],
  prayer: [
    'תפילה', 'תפלה', 'דאווענען', 'ברכה', 'עמידה', 'שחרית', 'מנחה', 'ערבית',
    'prayer', 'praying', 'tefila', 'tefilah', 'davening', 'blessing', 'amida',
    'priere', 'prier', 'benediction',
    'oracion', 'rezar', 'bendicion',
    'молитва', 'молиться', 'благословение',
  ],
  faith: [
    'אמונה', 'בטחון', 'ייאוש', 'כפירה', 'ספק', 'אפיקורס',
    'faith', 'belief', 'trust', 'emuna', 'despair', 'doubt', 'heresy', 'bitachon',
    'foi', 'confiance', 'croyance', 'desespoir', 'doute',
    'fe', 'confianza', 'creencia', 'desesperacion', 'duda',
    'вера', 'доверие', 'отчаяние', 'сомнение',
  ],
  sadness: [
    'עצבות', 'עצב', 'דיכאון', 'ייאוש', 'מרירות', 'בדידות', 'צער',
    'sadness', 'sad', 'depression', 'despair', 'loneliness', 'grief', 'sorrow', 'melancholy', 'azamra',
    'tristesse', 'triste', 'depression', 'desespoir', 'solitude',
    'tristeza', 'triste', 'depresion', 'desesperacion', 'soledad',
    'грусть', 'печаль', 'депрессия', 'отчаяние', 'одиночество',
  ],
  children: [
    'ילדים', 'ילד', 'בנים', 'בנות', 'חינוך', 'הורות', 'תינוק',
    'children', 'child', 'kids', 'education', 'parenting', 'baby', 'son', 'daughter',
    'enfants', 'enfant', 'education', 'parentalite', 'bebe',
    'ninos', 'nino', 'educacion', 'crianza', 'bebe',
    'дети', 'ребенок', 'воспитание', 'образование',
  ],
  stories: [
    'סיפור', 'סיפורים', 'מעשיות', 'מעשה', 'אגדה',
    'stories', 'story', 'tales', 'tale', 'fable', 'narrative',
    'histoires', 'histoire', 'contes', 'conte',
    'historias', 'historia', 'cuentos', 'cuento',
    'рассказы', 'рассказ', 'сказки', 'сказка',
  ],
  meditation: [
    'התבודדות', 'מדיטציה', 'שקט', 'ריכוז', 'יער',
    'meditation', 'hitbodedut', 'solitude', 'quiet', 'focus', 'concentration', 'personal prayer',
    'meditation', 'solitude', 'calme', 'concentration',
    'meditacion', 'soledad', 'calma', 'concentracion',
    'медитация', 'уединение', 'тишина', 'сосредоточение',
  ],
  holidays: [
    'חגים', 'חג', 'ראש השנה', 'יום כיפור', 'סוכות', 'פסח', 'שבועות', 'חנוכה', 'פורים', 'שבת',
    'holidays', 'holiday', 'rosh hashana', 'yom kippur', 'sukkot', 'passover', 'shavuot', 'hanukkah', 'purim', 'shabbat', 'sabbath',
    'fetes', 'fete', 'sabbat', 'paques',
    'fiestas', 'fiesta', 'sabado',
    'праздники', 'праздник', 'суббота',
  ],
  halacha: [
    'הלכה', 'הלכות', 'מצוות', 'דין', 'שולחן ערוך',
    'halacha', 'halakha', 'law', 'commandment', 'mitzvah', 'mitzva', 'shulchan aruch',
    'halakha', 'loi', 'commandement', 'mitsva',
    'halaja', 'ley', 'mandamiento', 'mitsva',
    'алаха', 'закон', 'заповедь', 'мицва',
  ],
  tikkun: [
    'תיקון', 'תקון', 'תיקון הכללי', 'עשרה מזמורים',
    'tikkun', 'tikun', 'tikkun haklali', 'general remedy', 'ten psalms', 'rectification',
    'tikoun', 'reparation', 'rectification',
    'tikun', 'reparacion', 'rectificacion',
    'тикун', 'исправление',
  ],
  beginners: [
    'מתחיל', 'מתחילים', 'התחלה', 'ראשוני', 'בסיסי',
    'beginner', 'beginners', 'start', 'starting', 'new', 'introduction', 'basics', 'first',
    'debutant', 'debutants', 'commencer', 'debut', 'introduction',
    'principiante', 'principiantes', 'comenzar', 'inicio', 'basico',
    'начинающий', 'начало', 'введение', 'основы',
  ],
};

// ─── Phonetic Normalization ───────────────────────────────────────────────────
// Handles transliteration variants: likutey/likutei, moharan/mohran, etc.

const phoneticReplacements: [RegExp, string][] = [
  // Hebrew transliteration variants
  [/likute[iy]/gi, 'likutei'],
  [/likout[eé]/gi, 'likutei'],
  [/likoute[iy]/gi, 'likutei'],
  [/moha?r[ae]?n/gi, 'moharan'],
  [/bre[sz]l[oe]v/gi, 'breslov'],
  [/na[hck]h?man/gi, 'nachman'],
  [/na['']?[hk]man/gi, 'nachman'],
  [/na[hk]a?man/gi, 'nachman'],
  [/nat[h]?an/gi, 'nathan'],
  [/t[e']?fil[ol]t/gi, 'tefilot'],
  [/t[e']?filo[st]/gi, 'tefilot'],
  [/halak?h?[oa]t/gi, 'halakhot'],
  [/hala[ck]h?ot/gi, 'halakhot'],
  [/tik+un/gi, 'tikun'],
  [/tik+oun/gi, 'tikun'],
  [/te?hill?im/gi, 'tehilim'],
  [/sipure[iy]/gi, 'siporei'],
  [/sipore[iy]/gi, 'siporei'],
  [/mas[iy]yot/gi, 'masiyot'],
  [/maa?si?yot/gi, 'masiyot'],
  [/si[ck]h?os/gi, 'sichos'],
  [/si[ck]h?ot/gi, 'sichos'],
  [/h?itbodedut/gi, 'hitbodedut'],
  [/hitbod[eé]dout/gi, 'hitbodedut'],
  [/hish?tapchut/gi, 'hishtapchut'],
  [/hishtap[ck]h?ut/gi, 'hishtapchut'],
  [/h?anefesh/gi, 'hanefesh'],
  [/et[sz]ot/gi, 'etzot'],
  [/h?amid+ot/gi, 'hamidot'],
  [/kitz?ur/gi, 'kitzur'],
  [/kit[sz]our/gi, 'kitzur'],
  [/h?a[ck]lali/gi, 'haklali'],
  [/rab+[ei]nu/gi, 'rabenu'],
  [/rab+[ie]/gi, 'rabi'],
  [/uman/gi, 'uman'],
  [/ouman/gi, 'uman'],
];

function normalizePhonetic(text: string): string {
  let normalized = text.toLowerCase().trim();
  for (const [pattern, replacement] of phoneticReplacements) {
    normalized = normalized.replace(pattern, replacement);
  }
  // Remove diacritics, apostrophes, hyphens for fuzzy matching
  normalized = normalized
    .replace(/[''`\-_]/g, '')
    .replace(/\s+/g, ' ');
  return normalized;
}

// ─── Message Types ────────────────────────────────────────────────────────────

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  products?: Product[];
  timestamp: Date;
}

// ─── Product Card Sub-component ───────────────────────────────────────────────

function ProductCard({
  product,
  lang,
  isRTL,
  viewLabel,
  pricePrefix,
}: {
  product: Product;
  lang: string;
  isRTL: boolean;
  viewLabel: string;
  pricePrefix: string;
}) {
  const title = getInterfaceDisplayTitle(product, lang);
  const minPrice = product.variants
    ? Math.min(...product.variants.map((v) => v.price))
    : 0;
  const firstImage =
    product.images && product.images.length > 0
      ? convertImagePath(product.images[0])
      : null;

  return (
    <a
      href={`/product/${product.id}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '8px 10px',
        borderRadius: '10px',
        background: '#FFF7ED',
        border: '1px solid #FDBA74',
        textDecoration: 'none',
        color: 'inherit',
        transition: 'background 0.15s, box-shadow 0.15s',
        direction: isRTL ? 'rtl' : 'ltr',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = '#FFEDD5';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(255,107,0,0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = '#FFF7ED';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Thumbnail */}
      <div
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '8px',
          overflow: 'hidden',
          flexShrink: 0,
          background: '#FED7AA',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {firstImage ? (
          <img
            src={firstImage}
            alt=""
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C2410C" strokeWidth="2">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
        )}
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: '13px',
            fontWeight: 600,
            color: '#1e3a5f',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {title}
        </div>
        <div style={{ fontSize: '11px', color: '#9a3412', fontWeight: 500 }}>
          {pricePrefix}{minPrice}{'\u20AA'}
        </div>
      </div>

      {/* Arrow */}
      <div
        style={{
          flexShrink: 0,
          fontSize: '11px',
          color: '#FF6B00',
          fontWeight: 600,
          whiteSpace: 'nowrap',
        }}
      >
        {viewLabel} {isRTL ? '\u2190' : '\u2192'}
      </div>
    </a>
  );
}

// ─── Main ChatWidget Component ────────────────────────────────────────────────

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Voice features state
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const recognitionRef = useRef<any>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { currentLanguage } = useLanguage();

  const isRTL = currentLanguage === 'he';
  const t =
    chatTranslations[currentLanguage as keyof typeof chatTranslations] ||
    chatTranslations.he;

  const allProducts = useMemo(() => Object.values(realBreslovProducts), []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Add greeting message on first open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 'greeting',
          sender: 'bot',
          text: t.greeting,
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      // Stop speech when closing
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      }
      if (isListening && recognitionRef.current) {
        recognitionRef.current.stop();
        setIsListening(false);
      }
    }
  }, [isOpen, isListening]);

  // ─── Voice Features (TTS & STT) ───────────────────────────────────────────

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = true;
        
        recognitionRef.current.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map((result: any) => result[0].transcript)
            .join('');
          setInputValue(transcript);
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error("Speech recognition error:", event.error);
          setIsListening(false);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }
  }, []);

  useEffect(() => {
    if (recognitionRef.current) {
      const langMap: Record<string, string> = { he: 'he-IL', en: 'en-US', fr: 'fr-FR', es: 'es-ES', ru: 'ru-RU' };
      recognitionRef.current.lang = langMap[currentLanguage] || 'he-IL';
    }
  }, [currentLanguage]);

  const toggleListening = useCallback(() => {
    if (!recognitionRef.current) {
      alert(currentLanguage === 'he' ? 'הדפדפן שלך אינו תומך בהקלטה קולית' : 'Your browser does not support voice input');
      return;
    }
    
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setInputValue('');
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        console.error(e);
      }
    }
  }, [isListening, currentLanguage]);

  const speakText = useCallback((text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    
    // Quick heuristic to filter out UI specific instructions like emojis in text
    const cleanText = text.replace(/[^\p{L}\p{N}\s.,!?]/gu, '');
    
    const utterance = new SpeechSynthesisUtterance(cleanText);
    const langMap: Record<string, string> = { he: 'he-IL', en: 'en-US', fr: 'fr-FR', es: 'es-ES', ru: 'ru-RU' };
    utterance.lang = langMap[currentLanguage] || 'he-IL';
    
    // Tweak to sound slightly more pleasant
    utterance.pitch = 1.05;
    utterance.rate = 1.0;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  }, [currentLanguage]);

  // ─── Search Logic ─────────────────────────────────────────────────────────

  const findTopicByKeywords = useCallback(
    (query: string): string | null => {
      const normalizedQuery = normalizePhonetic(query);
      const words = normalizedQuery.split(/\s+/);

      let bestTopic: string | null = null;
      let bestScore = 0;

      for (const [topicId, keywords] of Object.entries(semanticKeywords)) {
        let score = 0;
        for (const keyword of keywords) {
          const normalizedKeyword = normalizePhonetic(keyword);
          // Exact word match
          if (words.includes(normalizedKeyword)) {
            score += 10;
          }
          // Partial / contains match
          else if (normalizedQuery.includes(normalizedKeyword)) {
            score += 5;
          }
          // Reverse: keyword contains one of the query words
          else {
            for (const word of words) {
              if (word.length >= 3 && normalizedKeyword.includes(word)) {
                score += 3;
              }
            }
          }
        }
        if (score > bestScore) {
          bestScore = score;
          bestTopic = topicId;
        }
      }

      return bestScore >= 3 ? bestTopic : null;
    },
    [],
  );

  const searchProductsByName = useCallback(
    (query: string): Product[] => {
      const normalizedQuery = normalizePhonetic(query);

      const scored = allProducts
        .map((product) => {
          let score = 0;
          const fields = [
            product.name,
            product.nameEnglish || '',
            product.nameFrench || '',
            product.nameSpanish || '',
            product.nameRussian || '',
            product.description || '',
            ...(product.tags || []),
          ];

          for (const field of fields) {
            const normalizedField = normalizePhonetic(field);
            if (normalizedField.includes(normalizedQuery)) {
              score += 10;
            }
            // Check individual query words
            const words = normalizedQuery.split(/\s+/);
            for (const word of words) {
              if (word.length >= 2 && normalizedField.includes(word)) {
                score += 3;
              }
            }
          }
          return { product, score };
        })
        .filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 5)
        .map((item) => item.product);

      return scored;
    },
    [allProducts],
  );

  // ─── Handle Send ──────────────────────────────────────────────────────────

  const handleSend = useCallback(
    (text: string) => {
      if (!text.trim()) return;

      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        sender: 'user',
        text: text.trim(),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);
      setInputValue('');
      setIsTyping(true);
      
      // Stop current speech if speaking
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      }
      if (isListening && recognitionRef.current) {
        recognitionRef.current.stop();
        setIsListening(false);
      }

      // Simulate a short "thinking" delay for natural feel
      setTimeout(() => {
        let botText: string;
        let products: Product[] = [];

        // 1. Try matching a known topic by keywords
        const topicId = findTopicByKeywords(text);
        if (topicId && breslovKnowledgeBase[topicId]) {
          const recommendation = breslovKnowledgeBase[topicId];
          botText = recommendation.response[currentLanguage] || recommendation.response.he;
          products = recommendation.productIds
            .map((id) => realBreslovProducts[id])
            .filter(Boolean) as Product[];
        } else {
          // 2. Try direct product name search (with phonetic normalization)
          products = searchProductsByName(text);
          if (products.length > 0) {
            botText = t.foundBooks;
          } else {
            botText = t.noResults;
          }
        }

        const botMessage: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: botText,
          products: products.length > 0 ? products : undefined,
          timestamp: new Date(),
        };

        setIsTyping(false);
        setMessages((prev) => [...prev, botMessage]);
        
        // Speak out the bot's response
        speakText(botText);
      }, 600 + Math.random() * 400);
    },
    [currentLanguage, findTopicByKeywords, searchProductsByName, t, speakText, isListening],
  );

  const handleTopicClick = useCallback(
    (topicId: string) => {
      const topic = topicSuggestions.find((ts) => ts.id === topicId);
      if (!topic) return;
      const label = topic.labels[currentLanguage] || topic.labels.he;
      handleSend(label);
    },
    [currentLanguage, handleSend],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend(inputValue);
      }
    },
    [handleSend, inputValue],
  );

  // ─── Toggle ───────────────────────────────────────────────────────────────

  const toggleChat = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <>
      {/* ── Chat Window ────────────────────────────────────────────── */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '90px',
            right: isRTL ? 'auto' : '16px',
            left: isRTL ? '16px' : 'auto',
            width: '370px',
            maxWidth: 'calc(100vw - 32px)',
            height: '520px',
            maxHeight: 'calc(100vh - 120px)',
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            borderRadius: '24px',
            boxShadow: '0 12px 48px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.04)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            zIndex: 9998,
            direction: isRTL ? 'rtl' : 'ltr',
            animation: 'chatSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* ── Header ──────────────────────────────────────────────── */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(255,107,0,0.95) 0%, rgba(255,140,51,0.95) 100%)',
              padding: '16px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              flexShrink: 0,
            }}
          >
            {/* Bot avatar */}
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.25)',
                boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                fontSize: '20px',
                position: 'relative'
              }}
            >
              {isSpeaking && (
                <span style={{
                  position: 'absolute',
                  inset: -4,
                  border: '2px solid rgba(255,255,255,0.8)',
                  borderRadius: '50%',
                  animation: 'pulse 1.5s infinite ease-out'
                }} />
              )}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '16px',
                  letterSpacing: '0.3px',
                  lineHeight: 1.2,
                }}
              >
                {t.title}
              </div>
              <div
                style={{
                  color: 'rgba(255,255,255,0.85)',
                  fontSize: '12px',
                  fontWeight: 500,
                  lineHeight: 1.3,
                  marginTop: '2px'
                }}
              >
                {t.subtitle} {isSpeaking && (currentLanguage === 'he' ? ' (מדבר...)' : ' (Speaking...)')}
              </div>
            </div>
            {/* Close button */}
            <button
              onClick={toggleChat}
              aria-label="Close chat"
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background 0.2s, transform 0.1s',
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.35)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* ── Messages Area ───────────────────────────────────────── */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px 14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              background: 'transparent',
            }}
          >
            {messages.map((msg) => (
              <div key={msg.id}>
                {/* Message bubble */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  }}
                >
                  <div
                    style={{
                      maxWidth: '85%',
                      padding: '10px 14px',
                      borderRadius:
                        msg.sender === 'user'
                          ? isRTL
                            ? '14px 14px 14px 4px'
                            : '14px 14px 4px 14px'
                          : isRTL
                            ? '14px 14px 4px 14px'
                            : '14px 14px 14px 4px',
                      background:
                        msg.sender === 'user'
                          ? 'linear-gradient(135deg, #FF6B00, #FF8C33)'
                          : 'white',
                      color: msg.sender === 'user' ? 'white' : '#1e3a5f',
                      fontSize: '14px',
                      lineHeight: 1.5,
                      boxShadow:
                        msg.sender === 'bot'
                          ? '0 1px 3px rgba(0,0,0,0.08)'
                          : 'none',
                    }}
                  >
                    {msg.text}
                  </div>
                </div>

                {/* Product cards */}
                {msg.products && msg.products.length > 0 && (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                      marginTop: '8px',
                      paddingLeft: isRTL ? '0' : '8px',
                      paddingRight: isRTL ? '8px' : '0',
                    }}
                  >
                    {msg.products.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        lang={currentLanguage}
                        isRTL={isRTL}
                        viewLabel={t.viewProduct}
                        pricePrefix={t.fromPrice}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Topic suggestions after greeting or noResults */}
            {messages.length <= 1 && messages[0]?.sender === 'bot' && (
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '6px',
                  marginTop: '4px',
                }}
              >
                {topicSuggestions.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => handleTopicClick(topic.id)}
                    style={{
                      background: 'white',
                      border: '1px solid #FDBA74',
                      borderRadius: '20px',
                      padding: '6px 12px',
                      fontSize: '13px',
                      color: '#9a3412',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                      whiteSpace: 'nowrap',
                      fontWeight: 500,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#FFF7ED';
                      e.currentTarget.style.borderColor = '#FF6B00';
                      e.currentTarget.style.color = '#FF6B00';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'white';
                      e.currentTarget.style.borderColor = '#FDBA74';
                      e.currentTarget.style.color = '#9a3412';
                    }}
                  >
                    {topic.emoji}{' '}
                    {topic.labels[currentLanguage] || topic.labels.he}
                  </button>
                ))}
              </div>
            )}

            {/* Typing indicator */}
            {isTyping && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div
                  style={{
                    background: 'white',
                    padding: '10px 16px',
                    borderRadius: '14px 14px 14px 4px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                    display: 'flex',
                    gap: '4px',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ animation: 'chatDot 1.4s infinite', animationDelay: '0s', width: '7px', height: '7px', borderRadius: '50%', background: '#FF6B00', display: 'inline-block' }} />
                  <span style={{ animation: 'chatDot 1.4s infinite', animationDelay: '0.2s', width: '7px', height: '7px', borderRadius: '50%', background: '#FF6B00', display: 'inline-block' }} />
                  <span style={{ animation: 'chatDot 1.4s infinite', animationDelay: '0.4s', width: '7px', height: '7px', borderRadius: '50%', background: '#FF6B00', display: 'inline-block' }} />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* ── Quick Topic Bar (always visible) ────────────────────── */}
          {messages.length > 1 && (
            <div
              style={{
                padding: '6px 10px',
                borderTop: '1px solid #F3F4F6',
                display: 'flex',
                gap: '4px',
                overflowX: 'auto',
                flexShrink: 0,
                background: 'white',
              }}
            >
              {topicSuggestions.slice(0, 5).map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => handleTopicClick(topic.id)}
                  style={{
                    background: '#FFF7ED',
                    border: '1px solid #FED7AA',
                    borderRadius: '16px',
                    padding: '4px 10px',
                    fontSize: '11px',
                    color: '#9a3412',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'background 0.15s',
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#FFEDD5';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#FFF7ED';
                  }}
                >
                  {topic.emoji} {topic.labels[currentLanguage] || topic.labels.he}
                </button>
              ))}
            </div>
          )}

          {/* ── Input Area ──────────────────────────────────────────── */}
          <div
            style={{
              padding: '12px',
              borderTop: '1px solid rgba(0,0,0,0.06)',
              display: 'flex',
              gap: '8px',
              alignItems: 'center',
              flexShrink: 0,
              background: 'rgba(255, 255, 255, 0.6)',
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isListening ? (currentLanguage === 'he' ? 'מקשיב...' : 'Listening...') : t.placeholder}
              dir="auto"
              style={{
                flex: 1,
                border: '0',
                borderRadius: '24px',
                padding: '12px 16px',
                fontSize: '14.5px',
                outline: 'none',
                transition: 'box-shadow 0.2s',
                background: 'rgba(255, 255, 255, 0.9)',
                minHeight: '44px',
                boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)'
              }}
              onFocus={(e) => {
                e.currentTarget.style.boxShadow = 'inset 0 1px 3px rgba(0,0,0,0.06), 0 0 0 2px rgba(255,107,0,0.3)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.boxShadow = 'inset 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)';
              }}
            />
            {/* Mic button */}
            <button
              onClick={toggleListening}
              aria-label="Voice input"
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                border: 'none',
                background: isListening ? '#EF4444' : 'rgba(255,255,255,0.9)',
                color: isListening ? 'white' : '#6B7280',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
                flexShrink: 0,
                boxShadow: isListening ? '0 4px 12px rgba(239, 68, 68, 0.4)' : '0 2px 6px rgba(0,0,0,0.08)',
                animation: isListening ? 'pulse 1.5s infinite ease-out' : 'none'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill={isListening ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" x2="12" y1="19" y2="22" />
              </svg>
            </button>
            {/* Send button */}
            <button
              onClick={() => handleSend(inputValue)}
              disabled={!inputValue.trim()}
              aria-label={t.send}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                border: 'none',
                background: inputValue.trim()
                  ? 'linear-gradient(135deg, #FF6B00, #FF8C33)'
                  : 'rgba(255,255,255,0.7)',
                color: inputValue.trim() ? 'white' : '#9CA3AF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: inputValue.trim() ? 'pointer' : 'default',
                transition: 'all 0.2s cubic-bezier(0.18, 0.89, 0.32, 1.28)',
                flexShrink: 0,
                boxShadow: inputValue.trim() ? '0 4px 12px rgba(255,107,0,0.3)' : '0 2px 6px rgba(0,0,0,0.04)',
              }}
              onMouseEnter={(e) => {
                if (inputValue.trim()) {
                  e.currentTarget.style.transform = 'scale(1.1) rotate(-5deg)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) rotate(0)';
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  transform: isRTL ? 'rotate(180deg) translateX(-2px)' : 'translateX(2px)',
                }}
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* ── Floating Chat Button ──────────────────────────────────── */}
      <button
        onClick={toggleChat}
        aria-label={t.openChat}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: isRTL ? 'auto' : '90px',
          left: isRTL ? '90px' : 'auto',
          zIndex: 9999,
          width: isOpen ? '48px' : '56px',
          height: isOpen ? '48px' : '56px',
          borderRadius: '50%',
          border: 'none',
          background: isOpen
            ? '#E5E7EB'
            : 'linear-gradient(135deg, #FF6B00 0%, #FF8C33 100%)',
          color: isOpen ? '#6B7280' : 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: isOpen
            ? '0 2px 8px rgba(0,0,0,0.1)'
            : '0 4px 16px rgba(255,107,0,0.4)',
          transition: 'all 0.25s ease',
        }}
        onMouseEnter={(e) => {
          if (!isOpen) {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.boxShadow = '0 6px 24px rgba(255,107,0,0.5)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          if (!isOpen) {
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(255,107,0,0.4)';
          }
        }}
      >
        {isOpen ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {/* ── CSS Animations (injected once) ────────────────────────── */}
      <style>{`
        @keyframes chatSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
          100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }
        @keyframes chatDot {
          0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.4;
          }
          30% {
            transform: translateY(-6px);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
