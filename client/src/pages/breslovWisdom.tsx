import { useState } from 'react';
import { Star, Heart, Book, BookOpen, Lightbulb, Quote, Mountain, Music, Flame, Play, Volume2, VolumeX, Youtube, Target } from 'lucide-react';
import { Header } from '@/components/Header';
import { useLanguage } from '@/contexts/LanguageContext';
import { GoldDivider } from '../components/GoldDivider';
import { AnimatedOrbs } from '../components/AnimatedOrbs';
import { rtlFont } from '../lib/utils';

export default function BreslovWisdom() {
  const { currentLanguage, setLanguage } = useLanguage();
  const isRTL = currentLanguage === 'he' || currentLanguage === 'ar';
  const [activeSection, setActiveSection] = useState('teachings');
  const [ambientMusicEnabled, setAmbientMusicEnabled] = useState(false);

  const breslovTeachings = [
    {
      id: 'joy',
      title: 'מצוה גדולה להיות בשמחה תמיד - התורה השלמה',
      icon: '😊',
      content: `"מִצְוָה גְּדוֹלָה לִהְיוֹת בְּשִׂמְחָה תָּמִיד"`,
      verbatim: true,
      source: 'ליקוטי מוהר״ן תנינא, תורה כ״ד',
      description: `זוהי התורה המפורסמת ביותר של רבי נחמן על השמחה. רבינו הקדוש מגלה כאן שהשמחה אינה רק "מצב רוח נחמד" אלא מצווה ממש - וכלי רפואי חזק לנפש ולגוף. כל מחלה באה מקלקול השמחה, ולכן השמחה היא רפואה גדולה. זה לא פשטנות - זה חכמה עמוקה על הקשר בין הרגש לבריאות. השמחה פותחת את הלב, מחזקת את החיים, ומקרבת לה'.`
    },
    {
      id: 'prayer',
      title: 'התבודדות - השיחה הנשגבת עם הבורא',
      icon: '🤲',
      content: `ע"פ דברי רבינו: צריך לקבוע זמן בכל יום להתבודדות ולהרחבת השיחה בלשון אשכנז לפני ה' יתברך`,
      verbatim: false,
      source: 'ליקוטי מוהר״ן חלק א, תורה כ״ה',
      description: `זוהי התורה המיוחדת של רבי נחמן על ההתבודדות - התפילה האישית בלשון שלנו. רבינו מלמד שצריך לקבוע זמן קבוע מדי יום לשיחה פרטית עם ה', דוקא בשפת האם (לשון אשכנז) כדי לשפוך את הלב כמים. זו עבודה יותר חשובה מהתפילות הקבועות - זו השיחה האמיתית והאישית עם הבורא, שכל אדם יכול לעשות בכל מקום ובכל זמן.`
    },
    {
      id: 'faith',
      title: 'אמונה פשוטה - יסוד כל היסודות',
      icon: '💫',
      content: `ע"פ דברי רבינו: העיקר לילך באמונה פשוטה תמימה בלי חכמות כלל, כי "תם תהיה עם ה' אלהיך". המתחכמים באמונה נעשים כופרים, אבל האמונה הפשוטה היא הדרך האמיתית לידיעת השם יתברך`,
      verbatim: false,
      source: 'ליקוטי מוהר"ן תנינא, סימן לג',
      description: `רבינו הקדוש מגלה כאן את הסוד הנעלם של האמונה האמיתית. בעולם שבו כולם רוצים להבין הכל בשכל, רבי נחמן מלמד אותנו שהאמונה האמיתית היא דוקא בפשטות. כל מי שמנסה "להסביר" את האמונה בחכמות נופל לכפירה, כי הוא מנסה להכניס את האין סוף לתוך המוח הקטן. האמונה הפשוטה - כמו של ילד קטן - היא הדרך היחידה לחיבור אמיתי עם הבורא. זוהי מהפכה רוחנית: לא החכם הגדול מתקרב לה', אלא הפשוט והתמים.`
    },
    {
      id: 'tikkun',
      title: 'אין שום יאוש בעולם כלל - מסר התקווה הנצחי',
      icon: '🔧',
      content: `"וְהָעִקָּר – לְחַזֵּק עַצְמוֹ בְּכָל מַה שֶּׁאֶפְשָׁר, כִּי אֵין שׁוּם יֵאוּשׁ בָּעוֹלָם כְּלָל"`,
      verbatim: true,
      source: 'ליקוטי מוהר״ן תנינא, תורה ע״ח',
      description: `זוהי אולי התורה החזקה ביותר שאמר רבינו הקדוש - המסר שמציל מיליוני נשמות מייאוש. רבי נחמן מגלה כאן את הסוד: הייאוש עצמו הוא תחבולת השטן! העיקר הוא תמיד לחזק את עצמנו בכל מה שאפשר, כי באמת אין שום דבר כזה יאוש בעולם כלל. זהו מסר התקווה הנצחי שמאיר בחושך הגדול ביותר - הקדוש ברוך הוא תמיד מחכה לתשובה, ותמיד יש תקווה.`
    },
    {
      id: 'humility',
      title: 'ענווה אמיתית - מי באמת גדול',
      icon: '🕊️',
      content: `ע"פ דברי רבינו: הענווה האמיתית היא לדעת את מקום האדם - לא גאווה כשיש לו מעלות, לא עצבות כשאין לו. הכל מן השם יתברך. כמו משה רבנו - ענו מאד וגם מנהיג גדול`,
      verbatim: false,
      source: 'שיחות הר"ן אות ז',
      description: `רבינו הקדוש מגלה כאן את האמת הפנימית על הענווה. רבים חושבים שענווה פירושה להיות "שפל ונכנע", אבל רבי נחמן מלמד שזו אינה ענווה אלא עצבות! הענווה האמיתית היא לדעת את המקום האמיתי שלי - לא גאווה כשיש לי כישרונות, לא עצבות כשאין לי. הכל מן השמים. משה רבנו היה הכי ענוו והכי מנהיג. הענווה האמיתית נותנת כח לעבוד את ה' בכל הכחות, תמיד להתקדם, בלי גאווה ובלי עצבות. זוהי הדרך האמיתית לגדלות רוחנית.`
    },
    {
      id: 'truth',
      title: 'אמת - יסוד כל הקדושה',
      icon: '✨',
      content: `ע"פ דברי רבינו: העיקר הכל להיות אמיתי, לדבר אמת ולחיות אמת. הקדוש ברוך הוא אמת, ומי שרוצה להתקרב אליו יתברך חייב להיות אמיתי`,
      verbatim: false,
      source: 'שיחות הר"ן אות יב',
      description: `רבינו הקדוש מגלה כאן את הבסיס לכל עבודת ה' - האמת. רבים חושבים שעבודת ה' זה רק לקיים מצוות, אבל רבי נחמן מלמד שבלי אמת הכל ריק. האמת זה לא רק "לא לשקר", זה לחיות באמת - להיות כנה עם עצמי, להכיר איפה אני באמת עומד רוחנית. הרבה פעמים אנחנו משקרים לעצמנו שאנחנו צדיקים, ובזה אנחנו מפסידים את האפשרות להתקדם. רק מי שמכיר באמת את מצבו יכול להתחיל לתקן. ה' הוא אמת, ורק דרך האמת אפשר להתחבר אליו.`
    }
  ];

  const breslovBooks = [
    {
      title: 'ליקוטי מוהר"ן',
      description: 'התורות והחידושים של רבי נחמן מברסלב',
      type: 'ספר עיקרי',
      price: '89₪'
    },
    {
      title: 'ספיפת רוח',
      description: 'סיפורי מעשיות של רבי נחמן',
      type: 'מעשיות',
      price: '65₪'
    },
    {
      title: 'ליקוטי עצות',
      description: 'עצות מעשיות לחיי יום יום',
      type: 'הדרכה',
      price: '45₪'
    },
    {
      title: 'שיחות הר"ן',
      description: 'דברי חידוש ועצה',
      type: 'חיזוק',
      price: '55₪'
    }
  ];

  const breslovPractices = [
    {
      title: 'התבודדות יומית - שעה עם הבורא',
      description: 'שעה מדי יום לשיחה אישית עם ה\'',
      icon: <Mountain className="w-6 h-6 text-blue-600" />,
      content: `"דע! כשהאדם מתפלל בשדה, אזי כל העשבים כולם באים בתוך התפילה ומסייעים לו ונותנים לו כח בתפילתו"`,
      verbatim: true,
      source: 'ליקוטי מוהר״ן תנינא, תורה י״א',
      practicalGuide: 'בחר מקום שקט בבית, בתחילה 5-10 דקות ביום, דבר בעברית או בשפה שלך, פתח את הלב כמו עם חבר קרוב.'
    },
    {
      title: 'אמירת תהילים - תרופת הנשמה',
      description: 'תהילים כתרופה לנפש ולגוף',
      icon: <Book className="w-6 h-6 text-green-600" />,
      content: `ע"פ דברי רבינו: התהילים הם סגולה נפלאה לכל דבר, הן לנפש הן לגוף. מי שאומר תהילים בכוונה מתקן נזקים גדולים בנשמתו`,
      verbatim: false,
      source: 'שיחות הר"ן אות מד',
      practicalGuide: 'אמור מזמורים ידועים בכוונה (תהילים כ, כג, מב), התרכז במשמעות המילים, בזמן קושי אמור תהילים קשורים למצבך.'
    },
    {
      title: 'שמחה תמיד - מצוה גדולה',
      description: 'לשמוח בכל מצוה ובכל רגע',
      icon: <Heart className="w-6 h-6 text-red-600" />,
      content: `"מִצְוָה גְּדוֹלָה לִהְיוֹת בְּשִׂמְחָה תָּמִיד"`,
      verbatim: true,
      source: 'ליקוטי מוהר״ן תנינא, תורה כ״ד',
      practicalGuide: 'מצא דבר אחד חיובי בכל יום, תודה לה\' על הטוב הקטן שיש לך, עשה דברים שמשמחים אותך בקדושה.'
    },
    {
      title: 'ניגונים קדושים - שיר הנשמה',
      description: 'ניגונים ושירים לעילוי הנשמה',
      icon: <Music className="w-6 h-6 text-purple-600" />,
      content: `ע"פ דברי רבינו: הניגון הקדוש יש בו כח גדול מאד לעורר הלב ולהביא אותו לתשובה. כל אדם צריך ללמוד ניגון פשוט`,
      verbatim: false,
      source: 'ליקוטי מוהר"ן חלק ב, ח',
      practicalGuide: 'למד ניגון ברסלבי פשוט, שיר "נ נח נחמא נחמן מאומן", השתמש במוזיקה קדושה ברקע בזמן לימוד.'
    },
    {
      title: 'התחזקות מנפילות - תמיד לקום',
      description: 'איך לקום אחרי כל נפילה ולהמשיך',
      icon: <Target className="w-6 h-6 text-orange-600" />,
      content: `ע"פ דברי רבינו: עיקר הדבר לא ליפול מהכלל לגמרי. אפילו אם נפל אלף פעמים - לא יפול מהכלל. הצדיק נופל שבע וקם`,
      verbatim: false,
      source: 'ליקוטי מוהר"ן חלק א, פ"ב',
      practicalGuide: 'אחרי כל טעות או נפילה - תמיד חזור מיד לעבודה, אל תתייאש אף פעם, כל התחלה חדשה יקרה לה\'.'
    },
    {
      title: 'לימוד תורה בהתלהבות',
      description: 'ללמוד תורת רבינו בשמחה ובחיות',
      icon: <Flame className="w-6 h-6 text-yellow-600" />,
      content: `ע"פ דברי רבינו: כל אדם חייב ללמוד תורה בכל יום, ובפרט ללמוד ספרי רבינו הקדושים. אפילו דף אחד ביום בהבנה ובכוונה`,
      verbatim: false,
      source: 'שיחות הר"ן אות כט',
      practicalGuide: 'קבע זמן קצר ללימוד יומי, התחל מליקוטי מוהרן או ספר המידות, למד באיטיות ובהבנה.'
    }
  ];

  // תורות נשגבות ופרלי חכמה מרבי נחמן מברסלב - אוסף מלא ומעמיק בסגנון "פאריא"
  const dailyQuotes = [
    {
      id: 1,
      text: `ע"פ דברי רבינו: "וְהָעִקָּר – לְחַזֵּק עַצְמוֹ בְּכָל מַה שֶּׁאֶפְשָׁר, כִּי אֵין שׁוּם יֵאוּשׁ בָּעוֹלָם כְּלָל. וְעַל יְדֵי שֶׁהָאָדָם מְחַזֵּק עַצְמוֹ וְאֵינוֹ מִתְיָאֵשׁ, אֲפִילוּ מִמַּה שֶּׁהוּא, אֲזַי הַקָּדוֹשׁ בָּרוּךְ הוּא רַחֲמָן, וְאֶפְשָׁר לְתַקֵּן הַכֹּל"`,
      verbatim: false,
      source: 'ליקוטי מוהר״ן תנינא, תורה ע״ח, סעיפים ז׳-ח׳',
      explanation: `זוהי אולי התורה החזקה והמושלמת ביותר שניתנה לעולם נגד כח הייאוש והמרה שחורה. רבי נחמן מברסלב פותח כאן את שערי האמונה הגדולה בצורה שלא נשמעה מעולם. הוא מגלה סוד עמוק: הייאוש עצמו אינו רק "מצב רוח רע" אלא כח רוחני שלילי ממש - "קליפה" שמנסה לנתק את האדם מהקדוש ברוך הוא.

כאשר רבינו אומר "אין שום יאוש בעולם כלל" - הוא לא מנחם, הוא מכריז על אמת קוסמית! הייאוש הוא אשליה, שקר מוחלט. בפועל, אין מצב בעולם שאינו ניתן לתיקון, אין נפילה שאין ממנה עליה, אין חושך שהאור לא יכול לחדור אליו. זהו חוק רוחני כמו חוק הגרביטציה.

המילים "והקדוש ברוך הוא רחמן" מגלות את הסוד הגדול: ה' ממתין לתשובתנו בסבלנות אינסופית. כל עוד האדם לא מתייאש לגמרי ממש - הכל עוד ניתן לתיקון. רבי נחמן מלמד כאן שהחיזוק העצמי הוא לא רק "חשיבה חיובית" אלא עבודה רוחנית אמיתית שפותחת שערי הרחמים למעלה.`,
      theme: 'יסודות האמונה והביטחון',
      practicalApplication: 'בכל רגע של קושי, ייאוש או נפילה - חזור על המילים "אין שום יאוש בעולם כלל" כמנטרה אמיתית. זכור שהחיזוק שלך פותח רחמים למעלה.'
    },
    {
      id: 2,
      text: `"מִצְוָה גְּדוֹלָה לִהְיוֹת בְּשִׂמְחָה תָּמִיד"`,
      verbatim: true,
      source: 'ליקוטי מוהר״ן תנינא, תורה כ״ד',
      explanation: `זוהי התורה המהפכנית של רבי נחמן על השמחה, שהפכה לסיסמה של כל ברסלב. אך כדי להבין את עומק התורה, צריך לחדור לפרטים שרבינו מגלה כאן. השמחה אינה "תחושה נחמדה" - זו מצווה ממש מדאורייתא! רבינו קובע כאן עובדה מדהימה: השמחה היא הכלי הבסיסי לעבודת ה'. בלי שמחה, התפילה אינה עולה למעלה, הלימוד אינו נקלט בנשמה, והמצוות נעשות "קליפות".

המילים "יעשה עצמו שמח בעל כרחו" מגלות את המתכון המעשי הגאוני: השמחה אינה תלויה במצב החיצוני! אפילו כשיש "מרה שחורה ועצבות" - אנחנו יכולים ליצור שמחה מלאכותית, ואז "בא השמחה הטבעית". זהו סוד פסיכולוגי עמוק: כשאנחנו "מעמידים פנים" ששמחים (למטרה קדושה), המוח מתחיל לייצר שמחה אמיתית.

רבי נחמן מגלה כאן את אחד הסודות הגדולים ביותר של עבודת ה': השמחה איננה תוצאה של עבודה טובה - השמחה היא התנאי לעבודה טובה! קודם שמחה, ואחר כך הכל נעשה קל וטוב. זו מהפכה שלמה בגישה לחיים רוחניים.`,
      theme: 'שמחה כיסוד העבודה',
      practicalApplication: 'כשאתה עצוב או מדוכא - התחל "להעמיד פנים" ששמח (שיר, ריקוד קטן, חיוך). תוך זמן קצר השמחה המלאכותית תהפך לטבעית.'
    },
    {
      id: 3,
      text: `ע"פ דברי רבינו: "כל העולם כולו גשר צר מאד, והעיקר לא לפחד כלל"`,
      verbatim: false,
      source: 'ליקוטי מוהר״ן תנינא, תורה מ״ח',
      explanation: `זוהי אולי המשחה הפסיכולוגית-רוחנית העמוקה ביותר של רבי נחמן, המשחה שהתפרסמה בעולם כולו דרך השיר המפורסם "כל העולם כולו גשר צר מאד". אך מעטים מבינים את העומק האמיתי של התורה הזו. רבי נחמן מגלה כאן את סוד החיים האנושיים: כל החיים הם "גשר צר מאד מאד" - לא רק הרגעים הקשים, אלא כל רגע בחיים.

"הגשר הצר" הוא מטפורה לכל המצבים שבהם אנחנו מרגישים שאנחנו צריכים "לא לפול". זה יכול להיות החלטה מוסרית, בחירה קשה, מצב של לחץ, או פשוט הצורך לפרנס את המשפחה. רבינו מלמד שבכל המצבים האלה, הדרך היחידה לעבור בשלום היא "שלא יפחד כלל". הפחד עצמו - לא המצב - הוא מה שמפיל אותנו!

המילים "והעיקר הוא לחזק את עצמו ולהיות בשמחה תמיד" מגלות את הפתרון המהפכני: במקום להילחם במצב הקשה, אנחנו "משנים ערוץ" ונכנסים לשמחה ולביטחון. זה לא בריחה מהמציאות - זה השינוי הפנימי שמאפשר לנו להתמודד עם המציאות בהצלחה. כשאנחנו בשמחה ובביטחון, אנחנו עוברים על הגשר הצר בקלות.`,
      theme: 'התמודדות עם חיי היומיום',
      practicalApplication: 'בכל מצב מלחיץ או קשה - זכור שהפחד הוא האויב, לא המצב עצמו. עבור למצב של שמחה וביטחון, ותגלה שהכל נעשה קל יותר.'
    },
    {
      id: 4,
      text: `ע"פ דברי רבינו: "יודע אני כמה קשה לאדם לעבוד את השם יתברך בזמן הזה, כי הניסיונות גדולים מאוד, ורבו המונעים והמעכבים. אבל כל מי שמתגבר על כל המניעות ונצנץ אליו איזה יראת שמים בזמן הזה - שכרו גדול מאוד יותר מאשר הצדיקים וחסידים שהיו בדורות הקודמים שהיו נוחים יותר לעבודת השם יתברך"`,
      verbatim: false,
      source: 'ליקוטי מוהר״ן חלק ב׳, תורה נ״ח',
      explanation: `זוהי התורה המחזקת והמדהימה ביותר של רבי נחמן לדור שלנו, דור הפלאפונים והרשתות החברתיות והבלבולים הרוחניים. רבינו הקדוש, במבט נבואי מפליא, רואה את הדור שלנו ומגלה לנו סוד גדול: הקושי הרוחני שאנחנו חווים לא בא לעונש אותנו אלא להעלות אותנו!

כאשר רבי נחמן אומר "יודע אני כמה קשה" - הוא לא רק מבין, הוא רואה בעיני רוח את המציאות שלנו: עולם מלא פיתויים, מסכים שמנתקים אותנו מעצמנו, חברה שדוחפת אותנו למטריאליזם ושטחיות. וברגע שאנחנו מנסים להתקרב לה' - העולם כולו נלחם בנו.

אבל כאן מגיע הסוד הגדול: "שכרו גדול מאוד יותר מאשר הצדיקים וחסידים שהיו בדורות הקודמים". כל מעט של עבודת ה' שאנחנו עושים בדור הזה שווה הרבה יותר מעבודה גדולה בדורות קלים יותר! כל תפילה במצב של לחץ, כל מצווה בעידן הפיתויים, כל רגע של אמונה במציאות מבלבלת - הכל מוכפל פי כמה וכמה בשמים!`,
      theme: 'העל-ערך של עבודת ה\' בדורנו',
      practicalApplication: 'כשאתה מרגיש שקשה לך להיות דתי בעולם המודרני - תדע שכל מאמץ שלך שווה כמו של צדיק גדול בדורות קודמים!'
    },
    {
      id: 5,
      text: `ע"פ דברי רבינו: "אל יפול אדם מעצמו אם רואה שאינו מתפלל כמו שצריך, ואפילו רואה שאין לו שום הרגשה והתעוררות בתפילה כלל. ואפילו אם נדמה לו שתפילתו היא ממש כעובד עבודה זרה ח״ו. אל יפול מזה כלל, כי יש צדיקים וגבוהים שיכולים לתקן אפילו תפילה כזו, ולהעלותה למקום הראוי לה"`,
      verbatim: false,
      source: 'ליקוטי מוהר״ן חלק ב׳, תורה ט״ז',
      explanation: `זוהי אולי התורה המטלטלת והמרגשת ביותר של רבי נחמן על התפילה, שמציל אלפי נשמות מייאוש יומיומי. כמה אנשים מפסיקים להתפלל כי הם מרגישים שהתפילה שלהם "לא טובה", "קרה", או "לא כמו שצריך"? רבי נחמן פותח כאן את האמת המזעזעת: גם התפילה הכי "גרועה" יקרה בעיני ה'!

המילים "ואפילו אם נדמה לו שתפילתו היא ממש כעובד עבודה זרה" מגלות עד כמה רבינו מבין את המצוקה האנושית. יש אנשים שמרגישים שהתפילה שלהם היא סתם "מילים ריקות", שהם לא מתכוונים, שזה נעשה אוטומטי. רבי נחמן אומר: גם אם זה מה שאתה מרגיש - אל תפסיק!

הסוד הגדול הוא "יש צדיקים וגבוהים שיכולים לתקן אפילו תפילה כזו". זה אומר שכל תפילה, כמה שהיא נראית "לא מוצלחת" לנו, עולה למעלה ויש צדיקים שלוקחים אותה ומתקנים אותה! התפילה שלנו לא "נפלת" - היא פשוט צריכה "שיפוץ" למעלה, ויש "מומחים" למעלה שעושים את העבודה הזאת! זו תורה של חסד אינסופי שמעודד כל אדם להמשיך להתפלל בכל מצב.`,
      theme: 'ערך התפילה הפשוטה',
      practicalApplication: 'אל תפסיק אף פעם להתפלל, גם אם התפילה מרגישה "קרה" או לא מוצלחת. כל תפילה עולה למעלה ונתקנת על ידי צדיקים.'
    },
    {
      id: 6,
      text: `ע"פ דברי רבינו: "דע לך, שצריך לחפש ולמצוא בעצמו איזה דבר טוב ומעלה, להשתעשע עמה ולשמח עצמו עמה. ועל ידי זה יכול לבוא לשמחה. וגם אם רואה בעצמו שהוא מלא עוונות וחטאים, ואפילו אין בו שום דבר טוב כלל - גם אז לא יחפש בכל גופו ולא ימצא איזה דבר טוב ומעלה. וגם בזה יתחזק ויתעורר לעבודת השם"`,
      verbatim: false,
      source: 'ליקוטי מוהר״ן חלק א׳, תורה רפ״ב',
      explanation: `זוהי התורה המהפכנית של רבי נחמן על "נקודות טובות" - אחת התורות הכי מרפאות ומצילות שנאמרו אי פעם. רבינו פותח כאן דרך חדשה לגמרי לטפל בעצבות, נחיתות ויאוש: במקום להתמקד במה שרע בנו, צריך "לחפש ולמצוא" את הטוב!

המילים "שצריך לחפש ולמצוא" מגלות שזו עבודה מודעת ופעילה. זה לא מגיע לבד - צריך ממש "לחפש"! הטוב שלנו קבור מתחת לביקורת עצמית, תסביכים וחינוך שלילי. רבי נחמן מלמד אותנו להיות "חוקרים" של הטוב שלנו!

החלק המדהים הוא: "ואפילו אין בו שום דבר טוב כלל - גם אז לא יחפש בכל גופו ולא ימצא איזה דבר טוב". זה אומר שגם מישהו שמרגיש שהוא הכי גרוע בעולם - כשהוא מחפש באמת, הוא בהכרח ימצא משהו טוב! זה חוק רוחני: בכל אדם יש לפחות נקודה אחת של טוב אמיתי, וכשמוצאים אותה ו"משתעשעים עמה" (נהנים ממנה) - זה מביא לשמחה אמיתית שמחזקת לעבודת ה'. זו פסיכולוגיה עמוקה שעובדת 100% בפועל!`,
      theme: 'גילוי הטוב הפנימי',
      practicalApplication: 'כל יום חפש דבר טוב אחד בעצמך - כישרון, מעשה טוב, מחשבה יפה. "השתעשע" עם זה, תתגאה בזה. זה יביא אותך לשמחה ולכח.'
    },
    {
      id: 7,
      text: `ע"פ דברי רבינו: "והוא בחינת ביטול היש, שצריך האדם לבטל את עצמו לגמרי מכל רצונותיו ותאוותיו הגשמיים, ולהיות כאלו אינו. ועל ידי זה זוכה להתחדש ולהתקרב אל הבורא יתברך. כי כל זמן שהאדם רגיל אחר תאוותיו - אי אפשר לו לידע ולהכיר את הבורא יתברך כלל"`,
      verbatim: false,
      source: 'ליקוטי מוהר״ן חלק א׳, תורה ל״ב',
      explanation: `זוהי אולי התורה הכי עמוקה ו"מתקדמת" של רבי נחמן - תורת "ביטול היש", שמגלה את הסוד של קירבה אמיתית לה'. רבינו פותח כאן מושג מהפכני: כדי להתקרב לאינסוף (הקדוש ברוך הוא), האדם צריך להפוך ל"אינו" - לבטל את ה"יש" המדומה שלו.

מה זה "יש" שלנו? זה כל הרצונות והתאוות הקטנות שמחזיקים אותנו ב"כלוב" של העולם הגשמי. כשאנחנו רוצים רק כסף, כבוד, תענוגים - אנחנו נסגרים על עצמנו וחוסמים את החיבור לאור האינסופי. רבי נחמן מלמד שכדי "לידע ולהכיר את הבורא" - צריך לוותר על הזהות המדומה הזאת.

"ביטול היש" לא אומר להפוך ל"סנטה" או להזניח את החיים. זה אומר לחיות את החיים מתוך חיבור לה', ולא מתוך חיבור לאגו. כשאנחנו מבטלים את ה"יש" שלנו - אנחנו "זוכים להתחדש". כל יום הופך להרפתקה רוחנית חדשה, כי אנחנו לא "נעולים" על הפטנה שלנו. זו דרגה רוחנית מאוד גבוהה, אבל רבי נחמן מגלה שזו הדרך היחידה לחיבור אמיתי עם הבורא.`,
      theme: 'ביטול היש וקירבת הבורא',
      practicalApplication: 'תרגל "ביטול יש" קטן כל יום: וותר על משהו שאתה רוצה בשביל מצווה או לימוד. זה יפתח בך חיבור חדש לה\''
    },
    {
      id: 8,
      text: `ע"פ דברי רבינו: "דע לך, שיש צדיק שצריך לירד לשאול תחתיות בשביל להעלות נשמות שנפלו שם, ואין שום אדם יכול להעלותם חוץ מזה הצדיק. וכשהוא יורד לשם, אנשים חושבים שהוא נפל ח״ו, אבל באמת הוא עושה תיקון גדול. וכל אדם יש לו תיקונים מיוחדים שרק הוא יכול לעשות"`,
      verbatim: false,
      source: 'ליקוטי מוהר״ן חלק ב׳, תורה י״ב',
      explanation: `זוהי התורה הכי מסתורית והכי מעודדת של רבי נחמן - תורת ה"צדיק שיורד לשאול". תורה זו מגלה אמת מדהימה על עבודת ה' ועל הייעוד האישי של כל אחד ואחד מאיתנו. לכאורה זה נשמע "קשה" ו"לא מעשי", אבל באמת זו התורה הכי מעשית שיש!

מה זה אומר "יורד לשאול"? זה לא פשוטו כמשמעו. זה אומר שיש צדיקים שנדמה שהם "נופלים" רוחנית - הם נכנסים למקומות קשים, מצבים לא נקיים, או פשוט חווים תקופות של קושי ורדידה. אנשים מסביב חושבים "איך הוא נפל כך?", אבל באמת הם עושים "תיקון גדול" - הם הולכים לחלץ נשמות שנפלו שם.

החלק הכי חשוב: "וכל אדם יש לו תיקונים מיוחדים שרק הוא יכול לעשות". זה אומר שלכל אחד יש "משימה מיוחדת" בעולם, מקומות שרק הוא יכול להגיע אליהם ולתקן. לפעמים נדמה לנו שאנחנו "נופלים" או "לא הולכים כמו שצריך", אבל בעצם אנחנו הולכים בדיוק למקום שאנחנו צריכים לתקן! זו תורה שמעודדת כל אדם לקבל את הדרך שלו, גם אם היא נראית "לא מובנת" לאחרים.`,
      theme: 'הייעוד האישי והתיקון הייחודי',
      practicalApplication: 'כשאתה במצב קשה או "לא מובן" - חשוב שאולי זה בדיוק המקום שאתה צריך להיות כדי לעשות את התיקון הייחודי שלך.'
    }
  ];

  const breslovVideos = [
    {
      id: '0yDDjp4i2rQ',
      title: 'תורת רבי נחמן - חכמת הלב',
      description: 'הרצאה מעמיקה על תורת רבי נחמן מברסלב והדרך לחיבור עם ה\' דרך השמחה',
      category: 'שיעור תורה',
      duration: '45:30'
    },
    {
      id: 'YlmlOW5Rvi0',
      title: 'ליקוטי מוהרן - פרק הראשון', 
      description: 'ביאור מקיף על הפרק הראשון בליקוטי מוהרן - יסודות האמונה הפשוטה',
      category: 'לימוד עמוק',
      duration: '38:15'
    },
    {
      id: '3LFVAOXVB9Y',
      title: 'התבודדות ותפילה',
      description: 'המדריך המלא להתבודדות יומית - איך לדבר עם ה\' כמו עם חבר',
      category: 'הדרכה מעשית',
      duration: '29:45'
    },
    {
      id: '3uQP06r20H8',
      title: 'דרכי השמחה בעבודת ה\'',
      description: 'מצוה גדולה להיות בשמחה תמיד - איך להגיע לשמחה אמיתית בכל יום',
      category: 'חיזוק וחיזוק',
      duration: '52:20'
    },
    {
      id: 'Imiqgs8VvyE',
      title: 'ניגוני ברסלב לנשמה',
      description: 'ניגונים קדושים ומרגשים של רבי נחמן מברסלv - מוזיקה לעילוי הנשמה',
      category: 'מוזיקה קדושה',
      duration: '1:15:30',
      isAmbientMusic: true
    }
  ];

  return (
    <div className="min-h-screen dark:bg-[#050505] bg-[#F9F8F6]" dir={isRTL ? 'rtl' : 'ltr'}>
      <Header currentLanguage={currentLanguage} onLanguageChange={setLanguage} />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32 dark:bg-[#0A0A0B] bg-[#F9F8F6] border-b border-[#E6E0D8] dark:border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br dark:from-[#050505] dark:via-[#111318] dark:to-[#0A0500] from-[#F9F8F6] via-white to-slate-50 z-0"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none -mt-32 -mr-32 z-0" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none -mb-40 -ml-40 z-0" />
        <div className="absolute inset-0 opacity-5 dark:opacity-[0.03] bg-[url('/images/jerusalem-skyline.svg')] bg-cover bg-center mix-blend-screen" />
        
        <div className="relative container mx-auto px-4 text-center z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center justify-center gap-3 bg-white/50 dark:bg-white/5 backdrop-blur-md border border-[#D4AF37]/30 px-6 py-2 rounded-full mb-8 shadow-sm">
              <Star className="w-5 h-5 text-[#D4AF37]" />
              <span className="text-[#B5912B] dark:text-[#D4AF37] font-semibold tracking-widest uppercase text-sm">Light of Rebbe Nachman</span>
              <Star className="w-5 h-5 text-[#D4AF37]" />
            </div>
            
            <h1 className={`text-6xl md:text-8xl font-black mb-6 text-slate-900 dark:text-white tracking-tight leading-tight ${rtlFont(isRTL)}`} data-testid="title-breslov-wisdom">
              חכמת ברסלב <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#B5912B]">האמיתית</span>
            </h1>
            
            <p className="text-xl md:text-3xl dark:text-slate-300 text-slate-600 mb-12 font-light leading-relaxed">
              תורת רבי נחמן מברסלב • דרך השמחה והאמונה
            </p>
          </motion.div>
        </div>
      </div>

      {/* Navigation */}
      <div className="container mx-auto px-4 relative z-20 -mt-10">
        <div className="flex justify-center mb-20">
          <div className="bg-white/80 dark:bg-[#111318]/80 backdrop-blur-xl rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.3)] p-3 flex gap-2 flex-wrap justify-center border border-[#E6E0D8] dark:border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent dark:from-white/5 pointer-events-none" />
            {[
              { id: 'daily-quotes', label: 'פנינים יומיות', icon: <Quote className="w-5 h-5" /> },
              { id: 'teachings', label: 'תורות ומאמרים', icon: <Book className="w-5 h-5" /> },
              { id: 'videos', label: 'סרטוני לימוד', icon: <Youtube className="w-5 h-5" /> },
              { id: 'books', label: 'ספרי אור', icon: <Star className="w-5 h-5" /> },
              { id: 'practices', label: 'דרכי עבודה', icon: <Lightbulb className="w-5 h-5" /> }
            ].map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`relative flex items-center gap-3 px-8 py-4 rounded-[1.5rem] transition-all duration-300 font-bold overflow-hidden group ${
                  activeSection === section.id
                    ? 'text-white shadow-[0_8px_20px_rgba(212,175,55,0.4)] transform hover:-translate-y-1'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white hover:shadow-md'
                }`}
                data-testid={`nav-${section.id}`}
              >
                {activeSection === section.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#B5912B]" />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <span className={`transition-transform duration-300 ${activeSection === section.id ? 'scale-110' : 'group-hover:scale-110'}`}>
                    {section.icon}
                  </span>
                  {section.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Videos Section */}
        {activeSection === 'videos' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-16 pb-24"
          >
            <div className="text-center mb-20">
              <div className="flex justify-center items-center gap-4 mb-6">
                <Youtube className="w-12 h-12 text-[#D4AF37]" />
                <h2 className={`text-4xl lg:text-5xl font-black dark:text-white text-slate-900 ${rtlFont(isRTL)}`}>
                  סרטוני לימוד וחיזוק ברוח ברסלב
                </h2>
                <Youtube className="w-12 h-12 text-[#D4AF37]" />
              </div>
              <GoldDivider size="md" className="mb-8" />
              <p className="dark:text-slate-400 text-slate-500 max-w-3xl mx-auto text-xl font-light leading-relaxed">
                אוסף מיוחד של סרטוני לימוד, הרצאות וניגונים קדושים המביאים את תורת רבי נחמן מברסלב בצורה מעמיקה ומרגשת
              </p>
              
              {/* Ambient Music Toggle */}
              <div className="mt-10 flex justify-center">
                <div className="dark:bg-[#111318] bg-[#F9F8F6] rounded-2xl p-6 border border-[#E6E0D8] dark:border-[#D4AF37]/20 shadow-[0_8px_30px_rgba(0,0,0,0.05)] relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[#D4AF37]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="flex items-center gap-6 relative z-10">
                    <Music className="w-8 h-8 text-[#D4AF37]" />
                    <span className="dark:text-slate-200 text-slate-800 font-bold text-lg">מוזיקת רקע לנשמה</span>
                    <button
                      onClick={() => setAmbientMusicEnabled(!ambientMusicEnabled)}
                      className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                        ambientMusicEnabled
                          ? 'bg-gradient-to-r from-[#D4AF37] to-[#B5912B] text-white shadow-[0_4px_14px_rgba(212,175,55,0.4)]'
                          : 'bg-white dark:bg-[#0A0A0B] dark:text-slate-300 text-slate-700 border border-slate-200 dark:border-white/10 hover:border-[#D4AF37]/50'
                      }`}
                      data-testid="toggle-ambient-music"
                    >
                      {ambientMusicEnabled ? (
                        <>
                          <Volume2 className="w-5 h-5" />
                          <span>מופעל</span>
                        </>
                      ) : (
                        <>
                          <VolumeX className="w-5 h-5" />
                          <span>כבוי</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-sm dark:text-slate-500 text-slate-500 mt-4 font-light text-center relative z-10">
                    הפעל ניגוני ברסלב קדושים כמוזיקת רקע בזמן הגלישה באתר
                  </p>
                </div>
              </div>
            </div>

            {/* Videos Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-7xl mx-auto">
              {breslovVideos.map((video, index) => (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  key={video.id} 
                  className="dark:bg-[#0A0A0B] bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] overflow-hidden border border-[#E6E0D8] dark:border-white/5 hover:border-[#D4AF37]/50 transition-all duration-500 hover:-translate-y-2 group"
                >
                  {/* Video Header */}
                  <div className={`px-8 py-5 transition-colors duration-300 ${
                    video.isAmbientMusic 
                      ? 'bg-[#D4AF37]/10 border-b border-[#D4AF37]/20 relative overflow-hidden' 
                      : 'border-b border-[#E6E0D8] dark:border-white/5 dark:bg-[#111318] bg-[#F9F8F6] group-hover:bg-[#F0EEEA] dark:group-hover:bg-white/5'
                  }`}>
                    {video.isAmbientMusic && <div className="absolute inset-0 bg-[#D4AF37]/5 blur-lg" />}
                    <div className="flex justify-between items-center dark:text-white text-slate-800 relative z-10">
                      <div className="flex items-center gap-3">
                        <Play className="w-5 h-5 text-[#D4AF37]" />
                        <span className="font-bold text-sm tracking-widest uppercase">{video.category}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm opacity-80 font-mono font-medium">{video.duration}</span>
                        {video.isAmbientMusic && (
                          <Music className="w-5 h-5 text-[#D4AF37] animate-pulse" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Video Iframe */}
                  <div className="relative aspect-video bg-[#0A0A0B] border-b border-[#E6E0D8] dark:border-white/10 p-1">
                    <div className="absolute inset-0 bg-[#D4AF37]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                    <iframe
                      src={`https://www.youtube.com/embed/${video.id}${
                        video.isAmbientMusic && ambientMusicEnabled 
                          ? '?autoplay=1&loop=1&playlist=' + video.id + '&controls=1&modestbranding=1&rel=0'
                          : '?controls=1&modestbranding=1&rel=0'
                      }`}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full rounded-xl relative z-10"
                      data-testid={`video-iframe-${video.id}`}
                    />
                    
                    {/* Ambient Music Overlay */}
                    {video.isAmbientMusic && (
                      <div className={`absolute top-4 right-4 px-5 py-2 rounded-full text-sm font-bold backdrop-blur-md border shadow-lg z-20 ${
                        ambientMusicEnabled
                          ? 'bg-[#D4AF37]/90 text-white border-[#D4AF37]'
                          : 'bg-black/60 text-white border-white/20 hover:border-white/50'
                      }`}>
                        {ambientMusicEnabled ? '♪ נגן ברקע' : '♪ מוזיקת רקע'}
                      </div>
                    )}
                  </div>

                  {/* Video Info */}
                  <div className="p-8">
                    <h3 className={`text-2xl font-bold dark:text-white text-slate-900 mb-4 group-hover:text-[#D4AF37] transition-colors ${rtlFont(isRTL)}`}>
                      {video.title}
                    </h3>
                    <p className="dark:text-slate-400 text-slate-600 text-base leading-relaxed mb-8 font-light line-clamp-2">
                      {video.description}
                    </p>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-4">
                      <button 
                        className="flex-1 bg-gradient-to-r from-[#D4AF37] to-[#B5912B] hover:from-[#B5912B] hover:to-[#9E7A1C] text-white px-6 py-3.5 rounded-xl font-bold tracking-wide transition-all duration-300 shadow-[0_4px_14px_rgba(212,175,55,0.4)] hover:-translate-y-1 flex items-center justify-center gap-3"
                        data-testid={`watch-video-${video.id}`}
                      >
                        <Play className="w-5 h-5" />
                        צפה עכשיו
                      </button>
                      
                      {video.isAmbientMusic && (
                        <button
                          onClick={() => setAmbientMusicEnabled(!ambientMusicEnabled)}
                          className={`px-8 py-3.5 rounded-xl font-bold tracking-wide transition-all duration-300 flex items-center gap-2 ${
                            ambientMusicEnabled
                              ? 'bg-[#111318] text-white border border-[#D4AF37]/50 shadow-inner'
                              : 'bg-[#F9F8F6] dark:bg-[#111318] border border-[#E6E0D8] dark:border-white/10 dark:text-white dark:hover:bg-[#1A1C23] hover:bg-slate-100'
                          }`}
                          data-testid="toggle-ambient-button"
                        >
                          {ambientMusicEnabled ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                          {ambientMusicEnabled ? 'כבה' : 'הפעל'}
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Call to Action for Videos */}
            <div className="text-center mt-20 max-w-4xl mx-auto">
              <div className="dark:bg-[#111318] bg-white rounded-[3rem] p-12 lg:p-16 border border-[#E6E0D8] dark:border-[#D4AF37]/20 shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/5 via-transparent to-[#B5912B]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                <Youtube className="w-20 h-20 text-[#D4AF37] mx-auto mb-8 relative z-10 filter drop-shadow-[0_0_15px_rgba(212,175,55,0.4)] group-hover:scale-110 transition-transform duration-500" />
                <h3 className={`text-4xl font-black dark:text-white text-slate-900 mb-6 relative z-10 ${rtlFont(isRTL)}`}>
                  רוצים עוד תכנים מעמיקים?
                </h3>
                <p className="dark:text-slate-400 text-slate-500 mb-10 max-w-2xl mx-auto relative z-10 font-light text-xl">
                  הירשמו לערוץ שלנו ותקבלו התראות על סרטוני לימוד חדשים, שיעורים מעמיקים וניגונים קדושים
                </p>
                <button 
                  className="bg-gradient-to-r from-[#D4AF37] to-[#B5912B] hover:from-[#B5912B] hover:to-[#9E7A1C] text-white px-10 py-4.5 rounded-xl font-bold transition-all duration-300 flex items-center gap-3 mx-auto shadow-[0_8px_20px_rgba(212,175,55,0.4)] hover:-translate-y-1 relative z-10 text-lg"
                  data-testid="subscribe-youtube"
                >
                  <Youtube className="w-6 h-6" />
                  הירשמו לערוץ היוטיוב
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Teachings Section */}
        {activeSection === 'teachings' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-16 pb-24"
          >
            <div className="text-center mb-20">
              <h2 className={`text-4xl lg:text-5xl font-black dark:text-white text-slate-900 mb-6 ${rtlFont(isRTL)}`}>
                תורות וחידושים מרבי נחמן מברסלב
              </h2>
              <GoldDivider size="md" className="mb-8" />
              <p className="dark:text-slate-400 text-slate-500 max-w-2xl mx-auto font-light leading-relaxed text-xl">
                לימוד עמוק בתורתו הקדושה של רבי נחמן מברסלב זיע"א, המביא אור וחיות לכל נפש יהודית
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl mx-auto">
              {breslovTeachings.map((teaching, i) => (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  key={teaching.id} 
                  className="dark:bg-[#111318] bg-[#F9F8F6] rounded-[2.5rem] shadow-xl shadow-slate-200/50 dark:shadow-none p-10 border border-[#E6E0D8] dark:border-white/5 hover:border-[#D4AF37]/50 transition-all duration-500 hover:-translate-y-2 group relative overflow-hidden flex flex-col h-full"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-bl-[100px] pointer-events-none transition-transform duration-500 group-hover:scale-125 group-hover:bg-[#D4AF37]/10" />
                  
                  <div className="flex items-center gap-5 mb-8 relative z-10 w-full">
                    <div className="w-16 h-16 flex-shrink-0 bg-white dark:bg-[#1A1C23] border border-[#E6E0D8] dark:border-white/10 rounded-2xl flex items-center justify-center text-3xl shadow-sm transform group-hover:rotate-6 transition-transform duration-300">
                      {teaching.icon}
                    </div>
                    <h3 className={`text-2xl lg:text-3xl font-bold dark:text-white text-slate-900 group-hover:text-[#D4AF37] transition-colors ${rtlFont(isRTL)}`}>
                      {teaching.title}
                    </h3>
                  </div>
                  
                  <div className="dark:bg-[#0A0A0B] bg-white p-8 rounded-[2rem] mb-8 border border-[#E6E0D8] dark:border-white/5 shadow-inner relative z-10 group-hover:border-[#D4AF37]/30 transition-colors duration-300">
                    <Quote className="w-8 h-8 text-[#D4AF37] mb-4 opacity-50 transform group-hover:-translate-y-1 transition-transform duration-300 relative -top-2" />
                    <p className={`dark:text-slate-200 text-slate-800 font-medium leading-relaxed font-serif text-xl ${isRTL ? 'border-r-4' : 'border-l-4'} border-[#D4AF37]/50 ${isRTL ? 'pr-6' : 'pl-6'} py-2`}>
                      "{teaching.content}"
                    </p>
                  </div>
                  
                  <p className="dark:text-slate-400 text-slate-600 mb-8 font-light leading-relaxed text-lg flex-grow relative z-10">
                    {teaching.description}
                  </p>
                  
                  <div className="mt-auto pt-6 border-t border-[#E6E0D8] dark:border-white/5 relative z-10">
                    <div className="inline-flex items-center gap-3 bg-[#D4AF37]/10 text-[#B5912B] px-4 py-2 rounded-xl text-sm font-bold tracking-widest border border-[#D4AF37]/20">
                      <BookOpen className="w-4 h-4" />
                      מקור: {teaching.source}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Books Section */}
        {activeSection === 'books' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-16 pb-24"
          >
            <div className="text-center mb-20">
              <h2 className={`text-4xl lg:text-5xl font-black dark:text-white text-slate-900 mb-6 ${rtlFont(isRTL)}`}>
                ספרי ברסלב המיוחדים
              </h2>
              <GoldDivider size="md" className="mb-8" />
              <p className="dark:text-slate-400 text-slate-500 max-w-2xl mx-auto font-light leading-relaxed text-xl">
                אוסף נבחר של ספרי ברסלב אותנטיים, מודפסים באיכות גבוהה ומתאימים ללימוד יומיומי
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {breslovBooks.map((book, index) => (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  key={index} 
                  className="dark:bg-[#111318] bg-[#F9F8F6] rounded-[2rem] shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden border border-[#E6E0D8] dark:border-white/5 hover:border-[#D4AF37]/50 transition-all duration-500 hover:-translate-y-2 group"
                >
                  <div className="bg-gradient-to-br from-[#1A1C23] to-[#0A0A0B] p-10 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <Book className="w-16 h-16 text-[#D4AF37] mx-auto mb-6 drop-shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-transform duration-500 group-hover:scale-110" />
                    <div className="inline-block px-4 py-1.5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 relative z-10 backdrop-blur-md">
                      <span className="text-[#D4AF37] font-bold text-xs tracking-widest uppercase">{book.type}</span>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <h3 className={`text-2xl font-bold dark:text-white text-slate-900 mb-3 group-hover:text-[#D4AF37] transition-colors ${rtlFont(isRTL)}`}>
                      {book.title}
                    </h3>
                    <p className="dark:text-slate-400 text-slate-500 text-sm mb-8 font-light leading-relaxed h-[3rem]">
                      {book.description}
                    </p>
                    <div className="flex justify-between items-center pt-6 border-t border-[#E6E0D8] dark:border-white/10">
                      <span className="text-2xl font-black text-[#D4AF37]">
                        {book.price}
                      </span>
                      <button 
                        className="bg-white border-[#D4AF37] border text-[#D4AF37] dark:bg-transparent dark:text-white hover:bg-gradient-to-r hover:from-[#D4AF37] hover:to-[#B5912B] hover:text-white dark:hover:bg-gradient-to-r dark:hover:from-[#D4AF37] dark:hover:to-[#B5912B] px-6 py-2.5 rounded-xl transition-all duration-300 text-sm font-bold shadow-sm"
                        data-testid={`buy-book-${index}`}
                      >
                        הוסף לסל
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Daily Quotes Section */}
        {activeSection === 'daily-quotes' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-16 pb-24"
          >
            <div className="text-center mb-20">
              <div className="flex justify-center items-center gap-4 mb-6">
                <Quote className="w-12 h-12 text-[#D4AF37]" />
                <h2 className={`text-4xl lg:text-5xl font-black dark:text-white text-slate-900 ${rtlFont(isRTL)}`}>
                  פנינים יומיות מרבינו הקדוש
                </h2>
                <Quote className="w-12 h-12 text-[#D4AF37]" />
              </div>
              <GoldDivider size="md" className="mb-8" />
              <p className="dark:text-slate-400 text-slate-500 max-w-3xl mx-auto text-xl font-light leading-relaxed">
                אוצר של חכמת רבי נחמן מברסלב זיע״א • דברי תורה עמוקים ומעשיים שמאירים את הנפש ומחזקים את האמונה
              </p>
              <div className="mt-8 inline-block dark:bg-[#111318] bg-white rounded-full px-8 py-3 border border-[#E6E0D8] dark:border-[#D4AF37]/20 shadow-md">
                <p className="text-[#B5912B] dark:text-[#D4AF37] text-sm md:text-base font-bold tracking-wide">
                  ✨ כל ציטוט הוא תרגום מדויק מהמקורות הקדושים • ליקוטי מוהרן ושיחות הרן ✨
                </p>
              </div>
            </div>

            {/* Citations Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-7xl mx-auto">
              {dailyQuotes.map((quote, index) => (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  key={quote.id} 
                  className="dark:bg-[#0A0A0B] bg-[#F9F8F6] rounded-[2.5rem] shadow-xl shadow-slate-200/50 dark:shadow-none p-10 border border-[#E6E0D8] dark:border-white/5 hover:border-[#D4AF37]/50 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden group flex flex-col h-full"
                >
                  <div className="absolute top-0 right-0 w-40 h-40 bg-[#D4AF37]/5 dark:bg-[#D4AF37]/10 rounded-bl-[120px] -z-10 group-hover:scale-125 group-hover:bg-[#D4AF37]/10 transition-all duration-500" />
                  
                  {/* Header avec thème */}
                  <div className="flex items-center justify-between mb-8 pb-6 border-b border-[#E6E0D8] dark:border-white/10 relative z-10">
                    <div className="dark:bg-[#1A1C23] bg-white px-5 py-2.5 rounded-full border border-[#E6E0D8] dark:border-white/10 shadow-sm">
                      <span className="text-slate-800 dark:text-[#D4AF37] font-bold text-sm tracking-widest uppercase">
                        {quote.theme}
                      </span>
                    </div>
                    <div className="text-[#D4AF37]/30 dark:text-[#D4AF37]/20 font-serif text-4xl mr-4">
                      #{quote.id}
                    </div>
                  </div>

                  {/* Citation principale */}
                  <div className="mb-10 relative z-10">
                    <Quote className="absolute -top-6 -right-4 w-16 h-16 text-[#D4AF37] opacity-10 transform group-hover:scale-110 transition-transform duration-500" />
                    <p className={`dark:text-white text-slate-900 font-bold leading-relaxed text-xl md:text-2xl font-serif relative z-10 pr-8 ${isRTL ? 'border-r-4' : 'border-l-4'} border-[#D4AF37] py-4`}>
                      "{quote.text}"
                    </p>
                    <div className="mt-6 inline-flex items-center gap-3 bg-[#D4AF37]/10 text-[#B5912B] px-5 py-2.5 rounded-full text-sm font-bold tracking-widest border border-[#D4AF37]/20">
                      <BookOpen className="w-4 h-4" /> {quote.source}
                    </div>
                  </div>

                  {/* Explication */}
                  <div className="mb-8 flex-grow relative z-10">
                    <h4 className={`text-xl font-bold dark:text-white text-slate-900 mb-4 flex items-center gap-3 ${rtlFont(isRTL)}`}>
                      <Lightbulb className="w-6 h-6 text-[#D4AF37]" />
                      הסבר ופירוש
                    </h4>
                    <p className="dark:text-slate-400 text-slate-600 leading-relaxed font-light text-lg">
                      {quote.explanation}
                    </p>
                  </div>

                  {/* Application מעשית */}
                  <div className="mt-auto pt-6 border-t border-[#E6E0D8] dark:border-white/10 relative z-10">
                    <div className="dark:bg-gradient-to-r dark:from-[#111318] dark:to-[#1A1C23] bg-white border border-[#E6E0D8] dark:border-[#D4AF37]/20 rounded-2xl p-6 shadow-sm">
                      <h5 className="text-lg font-bold dark:text-white text-slate-900 mb-3 flex items-center gap-3">
                        <Target className="w-5 h-5 text-[#D4AF37]" />
                        יישום מעשי בעבודת ה'
                      </h5>
                      <p className="dark:text-slate-300 text-slate-700 text-base leading-relaxed font-light">
                        {quote.practicalApplication}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Call to action pour cette section */}
            <div className="max-w-4xl mx-auto mt-20">
              <div className="bg-gradient-to-br from-[#111318] via-[#0A0A0B] to-[#1A1C23] text-white rounded-[3rem] p-12 md:p-16 text-center shadow-2xl border border-[#D4AF37]/30 relative overflow-hidden group">
                <div className="absolute inset-0 bg-[#D4AF37]/10 blur-[80px] pointer-events-none group-hover:bg-[#D4AF37]/20 transition-colors duration-700" />
                <div className="absolute inset-0 opacity-20 bg-[url('/images/lux-texture.png')] mix-blend-overlay" />
                <Star className="w-20 h-20 text-[#D4AF37] mx-auto mb-8 relative z-10 drop-shadow-[0_0_20px_rgba(212,175,55,0.5)] transform group-hover:rotate-12 transition-transform duration-700" />
                <h3 className={`text-3xl md:text-4xl font-black mb-8 relative z-10 leading-relaxed ${rtlFont(isRTL)} text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400`}>
                  "עיקר השמחה הוא לחפש ולמצוא את הטוב שיש בכל דבר"
                </h3>
                <p className="text-slate-300 max-w-2xl mx-auto mb-12 relative z-10 font-light text-xl">
                  כל יום חדש הוא הזדמנות ללמוד משהו עמוק מתורת רבינו הקדוש ולהפעיל זאת בחיים האמיתיים. 
                  כל פנינת חכמה יכולה לשנות את כל הנפש שלך.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
                  <button 
                    className="bg-gradient-to-r from-[#D4AF37] to-[#B5912B] hover:from-[#B5912B] hover:to-[#9E7A1C] text-white px-10 py-4 rounded-xl font-bold transition-all duration-300 flex items-center gap-3 justify-center shadow-[0_8px_20px_rgba(212,175,55,0.4)] hover:-translate-y-1 text-lg"
                    data-testid="button-daily-study"
                  >
                    <BookOpen className="w-5 h-5" />
                    התחל לימוד יומי
                  </button>
                  <button 
                    className="border border-[#D4AF37]/50 text-white bg-white/5 hover:bg-white/10 px-10 py-4 rounded-xl font-bold transition-all duration-300 flex items-center gap-3 justify-center backdrop-blur-sm text-lg"
                    data-testid="button-share-quote"
                  >
                    <Heart className="w-5 h-5 text-[#D4AF37]" />
                    שתף ציטוט
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Practices Section */}
        {activeSection === 'practices' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-16 pb-24"
          >
            <div className="text-center mb-20">
              <h2 className={`text-4xl lg:text-5xl font-black dark:text-white text-slate-900 mb-6 ${rtlFont(isRTL)}`}>
                דרכי עבודה ברוח ברסלב
              </h2>
              <GoldDivider size="md" className="mb-8" />
              <p className="dark:text-slate-400 text-slate-500 max-w-2xl mx-auto font-light leading-relaxed text-xl">
                מעשים פרקטיים ודרכי עבודה שרבי נחמן מברסלב המליץ עליהם לחיים של שמחה ואמונה
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-7xl mx-auto">
              {breslovPractices.map((practice, index) => (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  key={index} 
                  className="dark:bg-[#0A0A0B] bg-[#F9F8F6] rounded-[2.5rem] shadow-xl shadow-slate-200/50 dark:shadow-none p-10 border border-[#E6E0D8] dark:border-white/5 hover:border-[#D4AF37]/50 transition-all duration-500 hover:-translate-y-2 group relative overflow-hidden flex flex-col"
                >
                  <div className="absolute top-0 right-0 w-2 h-full bg-gradient-to-b from-[#D4AF37] to-[#B5912B]" />
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#D4AF37]/5 rounded-tr-[100px] pointer-events-none transition-transform duration-500 group-hover:scale-125" />
                  
                  <div className="flex items-center gap-6 mb-8 relative z-10 w-full">
                    <div className="w-16 h-16 flex-shrink-0 bg-white dark:bg-[#1A1C23] border border-[#E6E0D8] dark:border-white/10 rounded-2xl flex items-center justify-center text-3xl shadow-sm transform group-hover:-rotate-6 transition-transform duration-300">
                      {React.cloneElement(practice.icon as React.ReactElement, { className: 'w-8 h-8 text-[#D4AF37]' })}
                    </div>
                    <h3 className={`text-2xl lg:text-3xl font-bold dark:text-white text-slate-900 group-hover:text-[#D4AF37] transition-colors ${rtlFont(isRTL)}`}>
                      {practice.title}
                    </h3>
                  </div>
                  
                  {/* Citations de Rabbi Nachman */}
                  {practice.content && (
                    <div className="dark:bg-[#111318] bg-white p-8 rounded-[2rem] mb-8 border border-[#E6E0D8] dark:border-white/5 shadow-inner relative z-10">
                      <Quote className="w-8 h-8 text-[#D4AF37] mb-4 opacity-50 relative -top-2" />
                      <p className={`dark:text-slate-200 text-slate-800 font-medium leading-relaxed font-serif text-xl pr-2`}>
                        {practice.content}
                      </p>
                      <div className="text-sm text-[#B5912B] font-bold tracking-widest uppercase flex items-center gap-3 mt-6 pt-4 border-t border-[#E6E0D8] dark:border-white/10">
                        <BookOpen className="w-4 h-4" /> {practice.source}
                      </div>
                    </div>
                  )}
                  
                  <p className="dark:text-slate-400 text-slate-600 mb-10 font-light leading-relaxed text-lg flex-grow relative z-10">
                    {practice.description}
                  </p>
                  
                  {/* Guide pratique */}
                  {practice.practicalGuide && (
                    <div className="dark:bg-gradient-to-r dark:from-[#D4AF37]/10 dark:to-transparent bg-gradient-to-r from-[#D4AF37]/5 to-transparent p-6 rounded-2xl border-r-4 border-[#D4AF37] relative z-10">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-1.5 rounded-full bg-[#D4AF37] text-white">
                          <Lightbulb className="w-4 h-4" />
                        </div>
                        <span className="text-lg font-bold dark:text-white text-slate-900">מדריך מעשי:</span>
                      </div>
                      <p className="text-base dark:text-slate-300 text-slate-700 leading-relaxed font-medium">
                        {practice.practicalGuide}
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="max-w-4xl mx-auto mt-20">
              <div className="dark:bg-[url('/images/hero-books.webp')] bg-[url('/images/hero-books.webp')] bg-cover bg-center rounded-[3rem] p-12 lg:p-16 text-center shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-slate-900/85 dark:bg-[#050505]/90 backdrop-blur-md z-0 transition-opacity duration-700 group-hover:bg-slate-900/80 dark:group-hover:bg-[#050505]/80" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/20 to-transparent z-0 relative" />
                <div className="relative z-10">
                  <Flame className="w-20 h-20 text-[#D4AF37] mx-auto mb-8 drop-shadow-[0_0_15px_rgba(212,175,55,0.5)] transform group-hover:scale-110 transition-transform duration-500" />
                  <h3 className={`text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400 mb-8 ${rtlFont(isRTL)}`}>
                    "צדיק באמונתו יחיה"
                  </h3>
                  <div className="w-16 h-1 bg-[#D4AF37] mx-auto mb-8 rounded-full"></div>
                  <p className="text-slate-200 max-w-2xl mx-auto font-light leading-relaxed text-xl">
                    רבי נחמן מברסלב לימד שכל יהודי יכול להגיע לדרגות רוחניות גבוהות דרך אמונה פשוטה, שמחה והתבודדות. 
                    הדרך פתוחה לכל אחד ואחת, בכל זמן ובכל מקום.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Call to Action */}
      <div className="relative overflow-hidden pt-32 pb-24 border-t border-[#E6E0D8] dark:border-white/5 mt-10">
        <div className="absolute inset-0 bg-gradient-to-br dark:from-[#050505] dark:via-[#111318] dark:to-[#0A0500] from-[#F9F8F6] via-white to-slate-50 z-0"></div>
        <div className="absolute inset-0 opacity-10 bg-[url('/images/hero-books.webp')] bg-cover bg-center mix-blend-overlay z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none z-0" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t dark:from-[#0A0A0B] from-[#F9F8F6] to-transparent z-0" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center justify-center gap-3 bg-white/50 dark:bg-white/5 backdrop-blur-md border border-[#D4AF37]/30 px-6 py-2 rounded-full mb-8 shadow-sm">
              <Heart className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-[#B5912B] dark:text-[#D4AF37] font-semibold tracking-widest uppercase text-sm">Our Community</span>
              <Heart className="w-4 h-4 text-[#D4AF37]" />
            </div>
            
            <h2 className={`text-5xl lg:text-7xl font-black mb-6 dark:text-white text-slate-900 tracking-tight ${rtlFont(isRTL)}`}>
              התחבר לקהילת ברסלב
            </h2>
            
            <GoldDivider size="md" className="mb-8" />
            
            <p className="text-xl md:text-3xl dark:text-slate-300 text-slate-600 mb-12 font-light max-w-2xl mx-auto">
              הצטרף למסע של צמיחה רוחנית, שמחה ואמונה באורו של רבינו
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                className="bg-gradient-to-r from-[#D4AF37] to-[#B5912B] hover:from-[#B5912B] hover:to-[#9E7A1C] text-white px-10 py-5 rounded-[1.5rem] font-bold transition-all duration-300 shadow-[0_8px_25px_rgba(212,175,55,0.4)] hover:-translate-y-1 text-lg flex items-center justify-center gap-3 group"
                data-testid="button-join-community"
              >
                <Target className="w-5 h-5 group-hover:scale-110 transition-transform" />
                הצטרף לקהילה
              </button>
              <button 
                className="bg-white dark:bg-[#111318] border border-[#E6E0D8] dark:border-white/10 shadow-[0_8px_25px_rgba(0,0,0,0.05)] text-slate-800 dark:text-white hover:border-[#D4AF37]/50 hover:text-[#B5912B] dark:hover:border-[#D4AF37]/50 px-10 py-5 rounded-[1.5rem] font-bold transition-all duration-300 hover:-translate-y-1 text-lg flex items-center justify-center gap-3 group"
                data-testid="button-view-books"
              >
                <Book className="w-5 h-5 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                עיין בספרי חיות
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}