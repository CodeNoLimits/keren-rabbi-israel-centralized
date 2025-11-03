import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, Heart, Book, Lightbulb, Quote, Mountain, Music, Flame, 
  Sun, Moon, Target, Compass, Crown, Sparkles, Globe, Users,
  Clock, TreePine, Flower, Wind, Eye, Shield, Zap, Diamond,
  ChevronDown, ChevronUp, Play, Volume2, VolumeX, Youtube
} from 'lucide-react';

const translations = {
  he: {
    // SEO et Meta
    title: 'קרן סגנון - העמקה בחכמת רבי נחמן מברסלב',
    description: 'גלו את העומק הרוחני של תורת רבי נחמן מברסלב דרך מאמרים, הרצאות וחכמה עתיקה המותאמת לעולם המודרני',
    
    // Hero Section
    heroTitle: 'קרן סגנון',
    heroSubtitle: 'מעיינות החכמה הברסלבית',
    heroDescription: 'מסע עמוק אל תוך אוצרות הנשמה של רבי נחמן מברסלב זצ״ל - תורה, חסידות ואמונה פשוטה המאירה את הדרך לכל דור',
    heroQuote: '"מִצְוָה גְּדוֹלָה לִהְיוֹת בְּשִׂמְחָה תָּמִיד" - רבי נחמן מברסלב',
    
    // Navigation Sections
    navTeachings: 'תורות עיקריות',
    navArticles: 'מאמרים רוחניים',
    navQuotes: 'פנינים יומיות',
    navPractices: 'עבודה מעשית',
    navBooks: 'ספרי יסוד',
    navWisdom: 'חכמת הדורות',
    
    // Main Teachings
    teachingsTitle: 'התורות היסודיות של רבי נחמן',
    teachingsSubtitle: 'אבני היסוד לחיים רוחניים מעמיקים',
    
    // Articles
    articlesTitle: 'מאמרים ומקורות לעיון',
    articlesSubtitle: 'חכמה עתיקה לחיים מודרניים',
    
    // Daily Wisdom
    dailyWisdomTitle: 'פנינות יומיות מאוצר רבי נחמן',
    dailyWisdomSubtitle: 'חכמה לכל יום ויום',
    
    // Practical Work
    practicalTitle: 'עבודה רוחנית מעשית',
    practicalSubtitle: 'כלים וטכניקות לחיזוק הנשמה',
    
    // Footer
    footerQuote: 'אֵין שׁוּם יֵאוּשׁ בָּעוֹלָם כְּלָל',
    footerAttribution: 'רבי נחמן מברסלב זצ״ל'
  },
  en: {
    title: 'Keren Style - Deepening in Rabbi Nachman\'s Wisdom',
    description: 'Discover the spiritual depth of Rabbi Nachman of Breslov\'s teachings through articles, lectures and ancient wisdom adapted for the modern world',
    
    heroTitle: 'Keren Style',
    heroSubtitle: 'Springs of Breslov Wisdom',
    heroDescription: 'A deep journey into the soul treasures of Rabbi Nachman of Breslov - Torah, Chassidus and simple faith that illuminates the path for every generation',
    heroQuote: '"It is a great mitzvah to always be happy" - Rabbi Nachman of Breslov',
    
    navTeachings: 'Core Teachings',
    navArticles: 'Spiritual Articles',
    navQuotes: 'Daily Pearls',
    navPractices: 'Practical Work',
    navBooks: 'Essential Books',
    navWisdom: 'Generational Wisdom',
    
    teachingsTitle: 'The Fundamental Teachings of Rabbi Nachman',
    teachingsSubtitle: 'Foundation stones for deep spiritual life',
    
    articlesTitle: 'Articles and Sources for Study',
    articlesSubtitle: 'Ancient wisdom for modern life',
    
    dailyWisdomTitle: 'Daily Pearls from Rabbi Nachman\'s Treasury',
    dailyWisdomSubtitle: 'Wisdom for each and every day',
    
    practicalTitle: 'Practical Spiritual Work',
    practicalSubtitle: 'Tools and techniques for strengthening the soul',
    
    footerQuote: 'There is no despair in the world at all',
    footerAttribution: 'Rabbi Nachman of Breslov'
  },
  fr: {
    title: 'Style Keren - Approfondissement de la Sagesse de Rabbi Nachman',
    description: 'Découvrez la profondeur spirituelle des enseignements de Rabbi Nachman de Breslov à travers articles, conférences et sagesse ancienne adaptée au monde moderne',
    
    heroTitle: 'Style Keren',
    heroSubtitle: 'Sources de la Sagesse de Breslov',
    heroDescription: 'Un voyage profond dans les trésors de l\'âme de Rabbi Nachman de Breslov - Torah, Hassidisme et foi simple qui illumine le chemin pour chaque génération',
    heroQuote: '"C\'est une grande mitsva d\'être toujours heureux" - Rabbi Nachman de Breslov',
    
    navTeachings: 'Enseignements Fondamentaux',
    navArticles: 'Articles Spirituels', 
    navQuotes: 'Perles Quotidiennes',
    navPractices: 'Travail Pratique',
    navBooks: 'Livres Essentiels',
    navWisdom: 'Sagesse Générationnelle',
    
    teachingsTitle: 'Les Enseignements Fondamentaux de Rabbi Nachman',
    teachingsSubtitle: 'Pierres de fondation pour une vie spirituelle profonde',
    
    articlesTitle: 'Articles et Sources d\'Étude',
    articlesSubtitle: 'Sagesse ancienne pour la vie moderne',
    
    dailyWisdomTitle: 'Perles Quotidiennes du Trésor de Rabbi Nachman',
    dailyWisdomSubtitle: 'Sagesse pour chaque jour',
    
    practicalTitle: 'Travail Spirituel Pratique',
    practicalSubtitle: 'Outils et techniques pour renforcer l\'âme',
    
    footerQuote: 'Il n\'y a aucun désespoir au monde du tout',
    footerAttribution: 'Rabbi Nachman de Breslov'
  }
};

export default function KerenStyle() {
  const { currentLanguage, setLanguage } = useLanguage();
  const [activeSection, setActiveSection] = useState('teachings');
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [expandedTeaching, setExpandedTeaching] = useState<string | null>(null);
  const [ambientMusicEnabled, setAmbientMusicEnabled] = useState(false);
  
  const t = translations[currentLanguage as keyof typeof translations] || translations.he;

  // תורות יסודיות של רבי נחמן מברסלב
  const coreTeachings = [
    {
      id: 'simcha',
      title: 'מצוה גדולה להיות בשמחה תמיד',
      titleEn: 'The Great Mitzvah of Eternal Joy',
      titleFr: 'La Grande Mitsva de la Joie Éternelle',
      icon: <Heart className="w-8 h-8 text-red-500" />,
      content: `"מִצְוָה גְּדוֹלָה לִהְיוֹת בְּשִׂמְחָה תָּמִיד"`,
      source: 'ליקוטי מוהר״ן תנינא, תורה כ״ד',
      description: `זוהי התורה המפורסמת ביותר של רבי נחמן על השמחה הנצחית. רבינו הקדוש מגלה כאן שהשמחה אינה רק "מצב רוח נחמד" אלא מצווה ממש - וכלי רפואי חזק לנפש ולגוף. 

כל מחלה באה מקלקול השמחה, ולכן השמחה היא רפואה גדולה. זה לא פשטנות - זה חכמה עמוקה על הקשר בין הרגש לבריאות. השמחה פותחת את הלב, מחזקת את החיים, ומקרבת לה'.

רבי נחמן מלמד שגם כשקשה לנו - אנחנו יכולים ליצור שמחה מלאכותית, ואז באה השמחה הטבעית. זהו סוד פסיכולוגי עמוק שעובד בפועל.`,
      practicalTips: [
        'התחל כל יום בהכרת הטוב - מצא משהו טוב בחיים שלך',
        'כשאתה עצוב, שיר שיר או עשה משהו שמשמח אותך',
        'זכור שהשמחה היא בחירה, לא מצב שתלוי בנסיבות חיצוניות',
        'חבר עם אנשים שמחים וחיוביים'
      ]
    },
    {
      id: 'hitbodedut',
      title: 'התבודדות - השיחה הנשגבת עם הבורא',
      titleEn: 'Hitbodedut - Sacred Conversation with the Creator',
      titleFr: 'Hitbodedut - Conversation Sacrée avec le Créateur',
      icon: <Mountain className="w-8 h-8 text-blue-500" />,
      content: `ע"פ דברי רבינו: צריך לקבוע זמן בכל יום להתבודדות ולהרחבת השיחה בלשון אשכנז לפני ה' יתברך`,
      source: 'ליקוטי מוהר״ן חלק א, תורה כ״ה',
      description: `זוהי התורה המיוחדת של רבי נחמן על ההתבודדות - התפילה האישית בלשון שלנו. רבינו מלמד שצריך לקבוע זמן קבוע מדי יום לשיחה פרטית עם ה', דוקא בשפת האם כדי לשפוך את הלב כמים.

זו עבודה יותר חשובה מהתפילות הקבועות - זו השיחה האמיתית והאישית עם הבורא, שכל אדם יכול לעשות בכל מקום ובכל זמן. התבודדות בטבע מועילה במיוחד, כי כל העשבים מסייעים לתפילה.

רבי נחמן מגלה שבהתבודדות אפשר לדבר על הכל - חלומות, פחדים, תקוות, חטאים, שמחות. הקדוש ברוך הוא רוצה לשמוע את האדם האמיתי.`,
      practicalTips: [
        'קבע זמן קבוע מדי יום, אפילו 10 דקות',
        'בחר מקום שקט ונעים - בטבע אם אפשר',
        'דבר בשפה שלך, לא חייב להיות בעברית',
        'ספר לה\' על היום שלך, הרגשות שלך, הקשיים והשמחות'
      ]
    },
    {
      id: 'faith',
      title: 'אמונה פשוטה - יסוד כל היסודות',
      titleEn: 'Simple Faith - Foundation of All Foundations',
      titleFr: 'Foi Simple - Fondation de Toutes les Fondations',
      icon: <Star className="w-8 h-8 text-yellow-500" />,
      content: `ע"פ דברי רבינו: העיקר לילך באמונה פשוטה תמימה בלי חכמות כלל, כי "תם תהיה עם ה' אלהיך"`,
      source: 'ליקוטי מוהר"ן תנינא, סימן לג',
      description: `רבינו הקדוש מגלה כאן את הסוד הנעלם של האמונה האמיתית. בעולם שבו כולם רוצים להבין הכל בשכל, רבי נחמן מלמד אותנו שהאמונה האמיתית היא דוקא בפשטות.

כל מי שמנסה "להסביר" את האמונה בחכמות נופל לכפירה, כי הוא מנסה להכניס את האין סוף לתוך המוח הקטן. האמונה הפשוטה - כמו של ילד קטן - היא הדרך היחידה לחיבור אמיתי עם הבורא.

זוהי מהפכה רוחנית: לא החכם הגדול מתקרב לה', אלא הפשוט והתמים. האמונה הפשוטה נותנת שקט נפשי, ביטחון ושמחה שאין כמותם.`,
      practicalTips: [
        'אל תנסה להבין הכל - קבל שיש דברים שהם מעבר להבנה',
        'סמוך על ה\' גם כשלא מבין מה קורה',
        'למד להיות כמו ילד קטן - פשוט ותמים',
        'תפסיק לחפש הוכחות לכל דבר - לפעמים צריך פשוט להאמין'
      ]
    },
    {
      id: 'despair',
      title: 'אין שום יאוש בעולם כלל',
      titleEn: 'No Despair in the World at All',
      titleFr: 'Aucun Désespoir au Monde du Tout',
      icon: <Compass className="w-8 h-8 text-green-500" />,
      content: `"וְהָעִקָּר – לְחַזֵּק עַצְמוֹ בְּכָל מַה שֶּׁאֶפְשָׁר, כִּי אֵין שׁוּם יֵאוּשׁ בָּעוֹלָם כְּלָל"`,
      source: 'ליקוטי מוהר״ן תנינא, תורה ע״ח',
      description: `זוהי אולי התורה החזקה ביותר שאמר רבינו הקדוש - המסר שמציל מיליוני נשמות מייאוש. רבי נחמן מגלה כאן את הסוד: הייאוש עצמו הוא תחבולת השטן!

העיקר הוא תמיד לחזק את עצמנו בכל מה שאפשר, כי באמת אין שום דבר כזה יאוש בעולם כלל. זהו מסר התקווה הנצחי שמאיר בחושך הגדול ביותר - הקדוש ברוך הוא תמיד מחכה לתשובה, ותמיד יש תקווה.

אפילו במצב הכי נורא, הכי קשה, הכי חסר תקווה - תמיד אפשר לתקן הכל. זה לא מוטיבציה זולה, זה חוק רוחני אמיתי.`,
      practicalTips: [
        'בכל רגע של ייאוש - זכור "אין שום יאוש בעולם כלל"',
        'חפש דבר אחד קטן שאתה יכול לשפר עכשיו',
        'תמיד יש מישהו במצב יותר קשה שהצליח להתגבר',
        'כל התחלה חדשה יקרה לה\' - לא משנה כמה פעמים נפלת'
      ]
    },
    {
      id: 'bridge',
      title: 'כל העולם כולו גשר צר מאד',
      titleEn: 'The Whole World is a Very Narrow Bridge',
      titleFr: 'Le Monde Entier est un Pont Très Étroit',
      icon: <TreePine className="w-8 h-8 text-purple-500" />,
      content: `ע"פ דברי רבינו: "כל העולם כולו גשר צר מאד, והעיקר לא לפחד כלל"`,
      source: 'ליקוטי מוהר״ן תנינא, תורה מ״ח',
      description: `זוהי המטפורה הגאונית של רבי נחמן על החיים האנושיים. כל החיים הם "גשר צר מאד מאד" - לא רק הרגעים הקשים, אלא כל רגע בחיים. אנחנו הולכים על גשר בין העולם הזה לעולם הבא.

"הגשר הצר" הוא מטפורה לכל המצבים שבהם אנחנו מרגישים שאנחנו צריכים "לא לפול". זה יכול להיות החלטה מוסרית, בחירה קשה, מצב של לחץ, או פשוט הצורך לפרנס את המשפחה.

רבינו מלמד שבכל המצבים האלה, הדרך היחידה לעבור בשלום היא "שלא יפחד כלל". הפחד עצמו - לא המצב - הוא מה שמפיל אותנו! כשאנחנו בשמחה ובביטחון, אנחנו עוברים על הגשר הצר בקלות.`,
      practicalTips: [
        'בכל מצב מלחיץ - זכור שהפחד הוא האויב, לא המצב עצמו',
        'עבור למצב של שמחה וביטחון במקום להילחם במציאות',
        'תתרכז במה שאתה יכול לשלוט עליו, לא במה שאתה לא יכול',
        'הליכה איטית ויציבה על הגשר עדיפה מריצה מפוחדת'
      ]
    },
    {
      id: 'humility',
      title: 'ענווה אמיתית - מי באמת גדול',
      titleEn: 'True Humility - Who is Truly Great',
      titleFr: 'Vraie Humilité - Qui est Vraiment Grand',
      icon: <Flower className="w-8 h-8 text-pink-500" />,
      content: `ע"פ דברי רבינו: הענווה האמיתית היא לדעת את מקום האדם - לא גאווה כשיש לו מעלות, לא עצבות כשאין לו. הכל מן השם יתברך`,
      source: 'שיחות הר"ן אות ז',
      description: `רבינו הקדוש מגלה כאן את האמת הפנימית על הענווה. רבים חושבים שענווה פירושה להיות "שפל ונכנע", אבל רבי נחמן מלמד שזו אינה ענווה אלא עצבות!

הענווה האמיתית היא לדעת את המקום האמיתי שלי - לא גאווה כשיש לי כישרונות, לא עצבות כשאין לי. הכל מן השמים. משה רבנו היה הכי ענוו והכי מנהיג גדול.

הענווה האמיתית נותנת כח לעבוד את ה' בכל הכחות, תמיד להתקדם, בלי גאווה ובלי עצבות. זוהי הדרך האמיתית לגדלות רוחנית - לא להתפחד מלהיות גדול, אבל לזכור תמיד מאיפה זה מגיע.`,
      practicalTips: [
        'אל תתבייש מהכישרונות שלך - רק תזכור שהם מתנה מה\'',
        'אל תתעצב על מה שאין לך - כל אחד מקבל בדיוק מה שהוא צריך',
        'תודה לה\' על הטוב שלך, ואל תשווה את עצמך לאחרים',
        'ענווה אמיתית = להכיר את המקום שלך בעולם ולעבוד משם'
      ]
    }
  ];

  // מאמרים רוחניים עמיקים
  const spiritualArticles = [
    {
      id: 'modern-hitbodedut',
      title: 'התבודדות בעידן הדיגיטלי',
      titleEn: 'Hitbodedut in the Digital Age',
      category: 'עבודת ה\'',
      author: 'קרן רבי ישראל',
      readTime: '12 דקות',
      excerpt: 'איך לשמור על שיחה אישית עם הבורא בעולם מלא הפרעות דיגיטליות...',
      content: `בעולם של הודעות, התראות וסמארטפונים, איך אפשר לקיים התבודדות אמיתית? רבי נחמן מברסלב, שהדגיש את חשיבות השיחה האישית עם הבורא, לא יכול היה לדמיין את האתגרים שהטכנולוגיה המודרנית מציבה בפנינו.

ובכל זאת, דברי רבינו הקדושים רלוונטיים עכשיו יותר מתמיד. התבודדות היא לא רק עבודה רוחנית - זו צורך נפשי בסיסי שהעולם המודרני מנסה לקחת מאיתנו.

אז איך עושים התבודדות בעידן הדיגיטלי?

**1. ניתוק מודע**
הדבר הראשון והחשוב ביותר: כבה את הטלפון. לא "שקט" - כבה לגמרי. רבי נחמן אמר שההתבודדות צריכה להיות בשקט מוחלט, והטלפון שלנו הוא הרעש הכי גדול שיש.

**2. מקום קדוש**
רבינו המליץ על התבודדות בטבע, אבל אם אין אפשרות - תיצור פינה קדושה בבית. זה יכול להיות הפינה הכי קטנה, אבל שתהיה רק בשביל השיחה עם ה'.

**3. שפת האמת**
דבר בשפה שלך, לא בעברית אם זה לא הטבעי עבורך. רבי נחמן הדגיש "לשון אשכנז" - השפה שבה אתה הכי נוח לביטוי עמוק.

**4. לוח זמנים דיגיטלי קדוש**
תקבע בלוח הזמנים הדיגיטלי שלך זמן קבוע להתבודדות, בדיוק כמו פגישה חשובה עם הבוס. כי זה באמת הפגישה הכי חשובה שלך ביום.

היופי של ההתבודדות בעידן הדיגיטלי הוא שאנחנו יכולים לחזור אליה תוך שנייה. כל פעם שאנחנו מרגישים מוצפים מההודעות וההתראות - אפשר לקחת רגע של שקט ולדבר עם ה'.

זה לא בריחה מהעולם המודרני - זה הדרך להישאר שפויים בו.`
    },
    {
      id: 'joy-therapy',
      title: 'השמחה כטיפול נפשי',
      titleEn: 'Joy as Psychological Therapy',
      category: 'בריאות נפשית',
      author: 'קרן רבי ישראל',
      readTime: '15 דקות',
      excerpt: 'המדע המודרני מוכיח את דברי רבי נחמן על השמחה כרפואה לנפש ולגוף...',
      content: `"מצוה גדולה להיות בשמחה תמיד" - המילים הפשוטות האלה של רבי נחמן מברסלב הן לא רק עצה רוחנית, אלא טיפול פסיכולוגי מתקדם שהמדע המודרני רק עכשיו מתחיל להבין.

**המדע מוכיח את רבי נחמן**

מחקרים עדכניים בפסיכולוגיה ובנוירו-מדע מראים שרגשות חיוביים:
- מחזקים את המערכת החיסונית
- מפחיתים דלקות בגוף
- מאריכים חיים
- משפרים תפקוד קוגניטיבי
- מגבירים יצירתיות ופתרון בעיות

זה בדיוק מה שרבי נחמן אמר לפני 200 שנה: "כל מחלה באה מקלקול השמחה".

**השמחה המלאכותית שהופכת לטבעית**

רבינו גילה סוד פסיכולוגי עמוק: "יעשה עצמו שמח בעל כרחו". המדע קורא לזה "Fake it till you make it" - ורבי נחמן הבין את זה הרבה לפני שהפסיכולוגים גילו שמעצב הפנים משפיע על הרגש.

כשאנחנו "מעמידים פנים" ששמחים (חיוך, עמידה זקופה, טון קול חיובי), המוח שלנו מתחיל לייצר הורמונים של שמחה. זה לא רמאות - זה פיזיולוגיה.

**התרגיל המעשי של רבי נחמן**

1. **זיהוי נקודות טובות**: מצא דבר טוב אחד בעצמך מדי יום
2. **שמחה מלאכותית**: כשאתה עצוב, חייך למשך דקה שלמה
3. **מוזיקה וריקוד**: רבי נחמן הדגיש ניגונים קדושים
4. **חברה טובה**: הקף את עצמך באנשים חיוביים

**השמחה כהגנה נפשית**

בעולם מלא חרדות, דיכאון ולחצים, השמחה של רבי נחמן היא לא "פוזיטיביות רדודה" - זו הגנה רוחנית אמיתית. זו דרך להישאר בריא נפשית גם במציאות קשה.

השמחה אינה תלויה בנסיבות חיצוניות - זו החלטה פנימית שאפשר לקבל בכל רגע. זה מה שהופך את תורת רבי נחמן למהפכנית: השמחה היא לא תוצאה של חיים טובים - השמחה היא הדרך לחיים טובים.`
    },
    {
      id: 'faith-vs-science',
      title: 'אמונה פשוטה מול מדע מורכב',
      titleEn: 'Simple Faith vs Complex Science',
      category: 'פילוסופיה',
      author: 'קרן רבי ישראל',
      readTime: '18 דקות',
      excerpt: 'איך האמונה הפשוטה של רבי נחמן מתמודדת עם האתגרים המדעיים של המאה ה-21...',
      content: `בעידן שבו המדע מגיע להישגים מדהימים ומסביר תופעות שנראו פעם כמופלאות, האם יש עוד מקום לאמונה פשוטה? רבי נחמן מברסלב, שהדגיש "אמונה פשוטה בלי חכמות כלל", האם היה מתמודד עם האתגרים המדעיים של היום?

התשובה מפתיעה: דברי רבי נחמן רלוונטיים עכשיו יותר מתמיד.

**המדע והפחד מהלא נודע**

המדע המודרני, למרות הישגיו המרשימים, גם יצר פחדים חדשים:
- קרינה קוסמית שיכולה לחסל את החיים
- שינויי אקלים שיכולים להרוס את הפלנטה
- בינה מלאכותית שיכולה להחליף אותנו
- מחלות שהמדע עדיין לא יודע לרפא

האמונה הפשוטה של רבי נחמן מציעה תרופה: "תם תהיה עם ה' אלהיך". זה לא אומר להתעלם מהמדע - זה אומר לא לחיות בפחד מהדברים שאנחנו לא יכולים לשלוט עליהם.

**הגבול של השכל האנושי**

רבי נחמן הבין משהו עמוק: השכל האנושי מוגבל. המדע המודרני מוכיח את זה:
- יש יותר דברים שאנחנו לא יודעים מאשר דברים שאנחנו יודעים
- כל גילוי מדעי פותח עשר שאלות חדשות
- הרבה מהמציאות (חומר אפל, אנרגיה אפלה) נשאר תעלומה

האמונה הפשוטה אומרת: בסדר לא לדעת הכל. בסדר להאמין שיש כח עליון שמנהל את העולם גם כשאנחנו לא מבינים איך.

**מדע ואמונה כשותפים**

רבי נחמן לא היה מתנגד למדע - הוא היה מתנגד להפיכת המדע לדת חדשה. המדע הוא כלי נפלא להבין את העולם, אבל הוא לא יכול לענות על השאלות הגדולות:
- למה אנחנו כאן?
- מה המשמעות של החיים?
- איך צריך לחיות?
- מה קורה אחרי המוות?

על השאלות האלה רק האמונה יכולה לענות.

**החירות של האמונה הפשוטה**

בעולם שבו כולם מנסים להיות "שכלתנים" ולהסביר הכל, האמונה הפשוטה היא חירות אמיתית. זו החירות להגיד "אני לא יודע הכל, ואני לא צריך לדעת הכל. אני מאמין שיש מישהו שכן יודע".

זה לא בורות - זה חכמה. זה להכיר בגבולות של השכל האנושי ולהיות בשלום עם זה.

**המסר לעידן שלנו**

רבי נחמן מלמד אותנו שאפשר להעריך את המדע מבלי להפוך אותו לאלוהים. אפשר להשתמש בטכנולוgiה מבלי להאמין שהיא תפתור את כל הבעיות. אפשר לחיות בעולם מדעי מבלי לאבד את האמונה הפשוטה שנותנת משמעות לחיים.

האמונה הפשוטה היא לא נחיתות מול המדע - זו השלמה מושלמת שלו.`
    }
  ];

  // פנינות יומיות מרבי נחמן
  const dailyPearls = [
    {
      text: `"דע לך, שצריך לחפש ולמצוא בעצמו איזה דבר טוב ומעלה, להשתעשע עמה ולשמח עצמו עמה"`,
      source: 'ליקוטי מוהר״ן חלק א׳, תורה רפ״ב',
      explanation: 'מצא נקודה טובה אחת בעצמך מדי יום ותתרכז בה',
      theme: 'נקודות טובות'
    },
    {
      text: `"אל יפול אדם מעצמו אם רואה שאינו מתפלל כמו שצריך"`,
      source: 'ליקוטי מוהר״ן חלק ב׳, תורה ט״ז',
      explanation: 'גם תפילה "לא מוצלחת" יקרה בעיני ה\'',
      theme: 'תפילה'
    },
    {
      text: `"יודע אני כמה קשה לאדם לעבוד את השם יתברך בזמן הזה"`,
      source: 'ליקוטי מוהר״ן חלק ב׳, תורה נ״ח',
      explanation: 'רבי נחמן מבין את הקשיים של הדור שלנו',
      theme: 'עידוד'
    },
    {
      text: `"העיקר הכל להיות אמיתי, לדבר אמת ולחיות אמת"`,
      source: 'שיחות הר"ן אות יב',
      explanation: 'האמת היא הבסיס לכל עבודת ה\'',
      theme: 'אמת'
    },
    {
      text: `"צדיק יסוד עולם - זה מי שמוצא את הטוב בכל דבר"`,
      source: 'ליקוטי מוהר״ן חלק א׳, תורה ל״ב',
      explanation: 'הכח למצוא טוב בכל מצב הוא יסוד הצדקות',
      theme: 'ראיית הטוב'
    }
  ];

  // עבודה רוחנית מעשית
  const practicalExercises = [
    {
      title: 'תרגיל הכרת הטוב היומי',
      titleEn: 'Daily Gratitude Exercise',
      duration: '5 דקות',
      difficulty: 'קל',
      description: 'כל בוקר כתוב 3 דברים שאתה אסיר תודה עליהם',
      steps: [
        'פתח מחברת או פתק קטן',
        'כתוב תאריך',
        'רשום 3 דברים טובים שקרו אתמול',
        'תודה לה\' על כל אחד מהם',
        'התחל את היום בשמחה'
      ],
      benefits: ['שיפור מצב הרוח', 'יותר אופטימיות', 'קירבה לה\'']
    },
    {
      title: 'התבודדות מודרנית',
      titleEn: 'Modern Hitbodedut',
      duration: '15 דקות',
      difficulty: 'בינוני',
      description: 'שיחה אישית עם ה\' בלי הפרעות דיגיטליות',
      steps: [
        'כבה את הטלפון לחלוטין',
        'בחר מקום שקט (בטבע אם אפשר)',
        'דבר עם ה\' בשפה שלך',
        'ספר על היום, הרגשות, הקשיים',
        'בקש עזרה ותודה על הטוב'
      ],
      benefits: ['שקט נפשי', 'בהירות מחשבה', 'חיבור עמוק לה\'']
    },
    {
      title: 'מדיטציית השמחה',
      titleEn: 'Joy Meditation',
      duration: '10 דקות',
      difficulty: 'קל',
      description: 'יצירת שמחה פנימית על פי תורת רבי נחמן',
      steps: [
        'שב במקום נוח ונשום עמוק',
        'זכור רגע שמח מהעבר',
        'הרגש את השמחה הזאת בגוף',
        'חייך למשך דקה שלמה',
        'תרגל "מצוה גדולה להיות בשמחה תמיד"'
      ],
      benefits: ['שיפור מצב רוח', 'אנרגיה חיובית', 'בריאות נפשית']
    }
  ];

  // ספרי יסוד ברסלב
  const essentialBooks = [
    {
      title: 'ליקוטי מוהר״ן',
      titleEn: 'Likutei Moharan',
      description: 'התורות והחידושים של רבי נחמן מברסלב',
      difficulty: 'מתקדם',
      pages: '800+',
      themes: ['תורות עמוקות', 'פילוסופיה יהודית', 'עבודת ה\''],
      recommendation: 'הספר המרכזי - התחל מתורות קצרות'
    },
    {
      title: 'שיחות הר״ן',
      titleEn: 'Sichot HaRan',
      description: 'דברי חיזוק ועצות מעשיות',
      difficulty: 'קל',
      pages: '200',
      themes: ['עצות יומיות', 'חיזוק נפשי', 'אמונה פשוטה'],
      recommendation: 'מושלם למתחילים'
    },
    {
      title: 'ספר המידות',
      titleEn: 'Sefer HaMiddot',
      description: 'עצות קצרות לכל תחומי החיים',
      difficulty: 'קל',
      pages: '150',
      themes: ['מידות טובות', 'עצות מעשיות', 'חיים יומיומיים'],
      recommendation: 'לעיון מהיר וחיזוק יומי'
    },
    {
      title: 'סיפורי מעשיות',
      titleEn: 'Sipurei Maasiyot',
      description: '13 סיפורים קדושים של רבי נחמן',
      difficulty: 'בינוני',
      pages: '300',
      themes: ['סיפורים', 'רמזים עמוקים', 'חכמה נסתרת'],
      recommendation: 'לגילוי עומקי הנשמה'
    }
  ];

  // פונקציות עזר
  const getCurrentQuote = () => dailyPearls[currentQuoteIndex];
  
  const nextQuote = () => {
    setCurrentQuoteIndex((prev) => (prev + 1) % dailyPearls.length);
  };

  const prevQuote = () => {
    setCurrentQuoteIndex((prev) => (prev - 1 + dailyPearls.length) % dailyPearls.length);
  };

  const toggleTeaching = (id: string) => {
    setExpandedTeaching(expandedTeaching === id ? null : id);
  };

  const getTitle = (item: any) => {
    switch(currentLanguage) {
      case 'en': return item.titleEn || item.title;
      case 'fr': return item.titleFr || item.title;
      default: return item.title;
    }
  };

  // אפקט לסחרור ציטוטים
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % dailyPearls.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700" dir={currentLanguage === 'he' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <Header currentLanguage={currentLanguage} onLanguageChange={setLanguage} />

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative overflow-hidden py-20 px-4"
        style={{
          background: `linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(251,146,60,0.1) 50%, rgba(239,68,68,0.1) 100%)`,
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-red-600/10"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="mb-8"
          >
            <Crown className="w-32 h-32 mx-auto text-orange-500 mb-6 animate-pulse" data-testid="icon-crown" />
            <h1 className="text-7xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-purple-600 bg-clip-text text-transparent mb-6" data-testid="text-main-title">
              {t.heroTitle}
            </h1>
            <h2 className="text-3xl text-gray-700 dark:text-gray-300 mb-8 font-light" data-testid="text-subtitle">
              {t.heroSubtitle}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-4xl mx-auto leading-relaxed" data-testid="text-description">
              {t.heroDescription}
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border-r-4 border-orange-500 max-w-2xl mx-auto mb-8"
            >
              <Quote className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <p className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2" dir="rtl">
                {t.heroQuote}
              </p>
            </motion.div>
          </motion.div>
          
          {/* Music Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setAmbientMusicEnabled(!ambientMusicEnabled)}
            className={`inline-flex items-center px-6 py-3 rounded-full transition-all duration-300 ${
              ambientMusicEnabled 
                ? 'bg-orange-500 text-white shadow-lg' 
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-md'
            }`}
            data-testid="button-ambient-music"
          >
            {ambientMusicEnabled ? <Volume2 className="w-5 h-5 mr-2" /> : <VolumeX className="w-5 h-5 mr-2" />}
            {currentLanguage === 'he' ? 'מוזיקת רקע רוחנית' : currentLanguage === 'en' ? 'Spiritual Background Music' : 'Musique Spirituelle'}
          </motion.button>
        </div>
      </motion.section>

      {/* Navigation */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="py-8 px-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-y border-orange-200"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { id: 'teachings', label: t.navTeachings, icon: Lightbulb },
              { id: 'articles', label: t.navArticles, icon: Book },
              { id: 'quotes', label: t.navQuotes, icon: Quote },
              { id: 'practices', label: t.navPractices, icon: Target },
              { id: 'books', label: t.navBooks, icon: Heart },
              { id: 'wisdom', label: t.navWisdom, icon: Star },
              { id: 'videos', label: currentLanguage === 'he' ? 'וידיאוים' : 'Videos', icon: Play }
            ].map(({ id, label, icon: Icon }) => (
              <motion.button
                key={id}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveSection(id)}
                className={`flex items-center px-6 py-3 rounded-full transition-all duration-300 ${
                  activeSection === id
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-md hover:shadow-lg'
                }`}
                data-testid={`button-nav-${id}`}
              >
                <Icon className="w-5 h-5 mr-2" />
                {label}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          {/* Core Teachings Section */}
          {activeSection === 'teachings' && (
            <motion.section
              key="teachings"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-5xl font-bold text-gray-800 dark:text-gray-200 mb-4" data-testid="text-teachings-title">
                  {t.teachingsTitle}
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400" data-testid="text-teachings-subtitle">
                  {t.teachingsSubtitle}
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {coreTeachings.map((teaching, index) => (
                  <motion.div
                    key={teaching.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border-r-4 border-orange-500"
                    data-testid={`teaching-card-${teaching.id}`}
                  >
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        {teaching.icon}
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mr-4" data-testid={`teaching-title-${teaching.id}`}>
                          {getTitle(teaching)}
                        </h3>
                      </div>
                      
                      <div className="bg-orange-50 dark:bg-orange-900/30 p-4 rounded-lg mb-4" dir="rtl">
                        <p className="text-lg font-semibold text-orange-800 dark:text-orange-200" data-testid={`teaching-content-${teaching.id}`}>
                          {teaching.content}
                        </p>
                        <p className="text-sm text-orange-600 dark:text-orange-400 mt-2" data-testid={`teaching-source-${teaching.id}`}>
                          {teaching.source}
                        </p>
                      </div>
                      
                      <div className={`transition-all duration-300 ${expandedTeaching === teaching.id ? 'max-h-none' : 'max-h-24 overflow-hidden'}`}>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4" data-testid={`teaching-description-${teaching.id}`}>
                          {teaching.description}
                        </p>
                        
                        {expandedTeaching === teaching.id && teaching.practicalTips && (
                          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                            <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">
                              {currentLanguage === 'he' ? 'עצות מעשיות:' : 'Practical Tips:'}
                            </h4>
                            <ul className="space-y-2">
                              {teaching.practicalTips.map((tip, tipIndex) => (
                                <li key={tipIndex} className="flex items-start">
                                  <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                  <span className="text-gray-700 dark:text-gray-300">{tip}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      
                      <button
                        onClick={() => toggleTeaching(teaching.id)}
                        className="flex items-center text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors mt-4"
                        data-testid={`button-expand-${teaching.id}`}
                      >
                        {expandedTeaching === teaching.id ? (
                          <>
                            <ChevronUp className="w-4 h-4 mr-1" />
                            {currentLanguage === 'he' ? 'הסתר' : 'Hide'}
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-4 h-4 mr-1" />
                            {currentLanguage === 'he' ? 'קרא עוד' : 'Read More'}
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Spiritual Articles Section */}
          {activeSection === 'articles' && (
            <motion.section
              key="articles"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-5xl font-bold text-gray-800 dark:text-gray-200 mb-4" data-testid="text-articles-title">
                  {t.articlesTitle}
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400" data-testid="text-articles-subtitle">
                  {t.articlesSubtitle}
                </p>
              </div>
              
              <div className="space-y-8">
                {spiritualArticles.map((article, index) => (
                  <motion.article
                    key={article.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                    data-testid={`article-${article.id}`}
                  >
                    <div className="p-8">
                      <div className="flex items-center justify-between mb-4">
                        <span className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 px-3 py-1 rounded-full text-sm font-semibold">
                          {article.category}
                        </span>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {article.readTime} • {article.author}
                        </div>
                      </div>
                      
                      <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4" data-testid={`article-title-${article.id}`}>
                        {getTitle(article)}
                      </h3>
                      
                      <p className="text-lg text-gray-600 dark:text-gray-400 mb-6" data-testid={`article-excerpt-${article.id}`}>
                        {article.excerpt}
                      </p>
                      
                      <div className="prose prose-lg dark:prose-invert max-w-none">
                        <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line" data-testid={`article-content-${article.id}`}>
                          {article.content}
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.section>
          )}

          {/* Daily Quotes Section */}
          {activeSection === 'quotes' && (
            <motion.section
              key="quotes"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-5xl font-bold text-gray-800 dark:text-gray-200 mb-4" data-testid="text-quotes-title">
                  {t.dailyWisdomTitle}
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400" data-testid="text-quotes-subtitle">
                  {t.dailyWisdomSubtitle}
                </p>
              </div>
              
              {/* Featured Quote */}
              <motion.div
                key={currentQuoteIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl p-8 mb-8 text-center shadow-2xl"
                data-testid="featured-quote"
              >
                <Quote className="w-16 h-16 mx-auto mb-6 opacity-80" />
                <p className="text-3xl font-bold mb-4" dir="rtl">
                  {getCurrentQuote().text}
                </p>
                <p className="text-xl opacity-90 mb-4">
                  {getCurrentQuote().explanation}
                </p>
                <p className="text-lg opacity-80">
                  {getCurrentQuote().source}
                </p>
                <div className="flex justify-center items-center mt-6 space-x-4">
                  <button
                    onClick={prevQuote}
                    className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
                    data-testid="button-prev-quote"
                  >
                    <ChevronUp className="w-6 h-6" />
                  </button>
                  <span className="text-white/80">
                    {currentQuoteIndex + 1} / {dailyPearls.length}
                  </span>
                  <button
                    onClick={nextQuote}
                    className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
                    data-testid="button-next-quote"
                  >
                    <ChevronDown className="w-6 h-6" />
                  </button>
                </div>
              </motion.div>
              
              {/* All Quotes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dailyPearls.map((pearl, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.03, rotate: 0.5 }}
                    className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-r-4 cursor-pointer transition-all duration-300 ${
                      index === currentQuoteIndex ? 'border-orange-500 shadow-xl' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    onClick={() => setCurrentQuoteIndex(index)}
                    data-testid={`quote-card-${index}`}
                  >
                    <div className="mb-4">
                      <span className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 px-3 py-1 rounded-full text-xs font-semibold">
                        {pearl.theme}
                      </span>
                    </div>
                    <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3" dir="rtl">
                      {pearl.text}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {pearl.explanation}
                    </p>
                    <p className="text-xs text-orange-600 dark:text-orange-400" dir="rtl">
                      {pearl.source}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Practical Exercises Section */}
          {activeSection === 'practices' && (
            <motion.section
              key="practices"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-5xl font-bold text-gray-800 dark:text-gray-200 mb-4" data-testid="text-practices-title">
                  {t.practicalTitle}
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400" data-testid="text-practices-subtitle">
                  {t.practicalSubtitle}
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {practicalExercises.map((exercise, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-r-4 border-green-500"
                    data-testid={`practice-card-${index}`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200" data-testid={`practice-title-${index}`}>
                        {getTitle(exercise)}
                      </h3>
                      <Target className="w-8 h-8 text-green-500" />
                    </div>
                    
                    <div className="flex items-center gap-4 mb-4">
                      <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm">
                        {exercise.duration}
                      </span>
                      <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
                        {exercise.difficulty}
                      </span>
                    </div>
                    
                    <p className="text-gray-700 dark:text-gray-300 mb-6" data-testid={`practice-description-${index}`}>
                      {exercise.description}
                    </p>
                    
                    <div className="mb-6">
                      <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">
                        {currentLanguage === 'he' ? 'שלבי התרגיל:' : 'Exercise Steps:'}
                      </h4>
                      <ol className="space-y-2">
                        {exercise.steps.map((step, stepIndex) => (
                          <li key={stepIndex} className="flex items-start">
                            <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                              {stepIndex + 1}
                            </span>
                            <span className="text-gray-700 dark:text-gray-300">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">
                        {currentLanguage === 'he' ? 'יעבדי התרגיל:' : 'Benefits:'}
                      </h4>
                      <ul className="space-y-1">
                        {exercise.benefits.map((benefit, benefitIndex) => (
                          <li key={benefitIndex} className="flex items-center">
                            <Sparkles className="w-4 h-4 text-green-500 mr-2" />
                            <span className="text-gray-700 dark:text-gray-300 text-sm">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Essential Books Section */}
          {activeSection === 'books' && (
            <motion.section
              key="books"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-5xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  {currentLanguage === 'he' ? 'ספרי יסוד ברסלב' : 'Essential Breslov Books'}
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  {currentLanguage === 'he' ? 'האוסף המרכזי לעיון והתעמקות' : 'Core collection for study and contemplation'}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {essentialBooks.map((book, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-r-4 border-purple-500"
                    data-testid={`book-card-${index}`}
                  >
                    <div className="flex items-center mb-4">
                      <Book className="w-8 h-8 text-purple-500 mr-4" />
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200" data-testid={`book-title-${index}`}>
                        {getTitle(book)}
                      </h3>
                    </div>
                    
                    <p className="text-gray-700 dark:text-gray-300 mb-4" data-testid={`book-description-${index}`}>
                      {book.description}
                    </p>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        book.difficulty === 'קל' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                        book.difficulty === 'בינוני' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' :
                        'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                      }`}>
                        {book.difficulty}
                      </span>
                      <span className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm">
                        {book.pages} עמודים
                      </span>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">נושאים עיקריים:</h4>
                      <div className="flex flex-wrap gap-2">
                        {book.themes.map((theme, themeIndex) => (
                          <span key={themeIndex} className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded text-sm">
                            {theme}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg">
                      <p className="text-purple-800 dark:text-purple-200 font-semibold">
                        💡 {book.recommendation}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Wisdom Section */}
          {activeSection === 'wisdom' && (
            <motion.section
              key="wisdom"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-5xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  {currentLanguage === 'he' ? 'חכמת הדורות' : 'Generational Wisdom'}
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  {currentLanguage === 'he' ? 'תובנות עמוקות לדורנו' : 'Deep insights for our generation'}
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-xl p-8 shadow-2xl"
                >
                  <Eye className="w-16 h-16 mb-6 opacity-80" />
                  <h3 className="text-3xl font-bold mb-4">הראיה הברסלבית</h3>
                  <p className="text-xl leading-relaxed">
                    רבי נחמן מלמד אותנו לראות את העולם בעיניים חדשות - לחפש את הטוב בכל מצב, 
                    למצוא את ה' בכל רגע, ולחיות עם אמונה פשוטה גם בעולם מורכב.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-xl p-8 shadow-2xl"
                >
                  <Flame className="w-16 h-16 mb-6 opacity-80" />
                  <h3 className="text-3xl font-bold mb-4">האש הפנימית</h3>
                  <p className="text-xl leading-relaxed">
                    בכל יהודי בוערת אש קדושה - הנשמה שמחכה להתעורר. תורת רבי נחמן מלמדת 
                    איך להצית את האש הזאת ולהפוך כל רגע לעבודת ה' אמיתית.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-gradient-to-br from-green-500 to-teal-600 text-white rounded-xl p-8 shadow-2xl"
                >
                  <TreePine className="w-16 h-16 mb-6 opacity-80" />
                  <h3 className="text-3xl font-bold mb-4">גידול רוחני</h3>
                  <p className="text-xl leading-relaxed">
                    כמו עץ שגדל לאט לאט, כך הנשמה צריכה זמן להתפתח. רבי נחמן מלמד סבלנות 
                    עם העצמי, חיזוק מתמיד, ובטחון שכל יהודי יכול להגיע למעלות גבוהות.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-xl p-8 shadow-2xl"
                >
                  <Heart className="w-16 h-16 mb-6 opacity-80" />
                  <h3 className="text-3xl font-bold mb-4">אהבה ואמונה</h3>
                  <p className="text-xl leading-relaxed">
                    הדרך הברסלבית היא דרך של אהבה - אהבת ה', אהבת ישראל, ואהבה עצמית בריאה. 
                    כשנאהב בפשטות, הכל נעשה קל וטבעי.
                  </p>
                </motion.div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Quote */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="py-16 px-4 text-center bg-gradient-to-r from-gray-800 to-gray-900 text-white"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-8"
          >
            <Diamond className="w-16 h-16 mx-auto mb-6 animate-pulse text-yellow-400" />
            <p className="text-4xl font-bold mb-6" dir="rtl" data-testid="text-footer-quote">
              {t.footerQuote}
            </p>
            <p className="text-xl opacity-90" data-testid="text-footer-attribution">
              {t.footerAttribution}
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Breslov Videos Section - Integrated from breslov-videos */}
      {activeSection === 'videos' && (
        <motion.section
          key="videos"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.6 }}
          className="py-16 px-4"
        >
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              {currentLanguage === 'he' ? 'וידיאוים קדושים' : 'Keren Style Videos'}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {currentLanguage === 'he' ? 'וידיאוים אותנטיים על תורת רבי נחמן מברסלב' : 'Authentic videos on Rabbi Nachman of Breslov\'s teachings'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                id: 'video1',
                title: 'לִהְיוֹת בְּשִׂמְחָה תָּמִיד - התורה המפורסמת',
                titleEn: 'Always Be Happy - The Famous Teaching',
                videoId: '3uQP06r20H8',
                thumbnail: 'https://img.youtube.com/vi/3uQP06r20H8/maxresdefault.jpg',
                description: 'התורה המפורסמת של רבי נחמן על השמחה הנצחית',
                category: 'תורות עיקריות'
              },
              {
                id: 'video2',
                title: 'אין יאוש בעולם כלל - מסר התקווה',
                titleEn: 'No Despair in the World - Message of Hope',
                videoId: 'RvlOCvdiUCA',
                thumbnail: 'https://img.youtube.com/vi/RvlOCvdiUCA/maxresdefault.jpg',
                description: 'התורה החזקה של רבי נחמן נגד הייאוש',
                category: 'חיזוק והתגברות'
              },
              {
                id: 'video3',
                title: 'התבודדות - השיחה עם הבורא',
                titleEn: 'Hitbodedut - Speaking with the Creator',
                videoId: '3LFVAOXVB9Y',
                thumbnail: 'https://img.youtube.com/vi/3LFVAOXVB9Y/maxresdefault.jpg',
                description: 'הדרכה מעשית להתבודדות עם ה\' בלשון שלנו',
                category: 'עבודת ה'
              }
            ].map((video) => (
              <motion.div
                key={video.id}
                whileHover={{ scale: 1.03 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer"
                onClick={() => window.open(`https://www.youtube.com/watch?v=${video.videoId}`, '_blank')}
              >
                <div className="relative">
                  <img src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover" />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <Play className="w-12 h-12 text-white" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">
                    {currentLanguage === 'en' ? video.titleEn : video.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{video.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Background ambient music (if enabled) */}
      {ambientMusicEnabled && (
        <audio autoPlay loop className="hidden">
          <source src="/path-to-breslov-ambient-music.mp3" type="audio/mpeg" />
        </audio>
      )}
    </div>
  );
}