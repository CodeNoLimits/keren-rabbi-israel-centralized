// RAG Context pour Chat Gemini avec données authentiques HaEsh Sheli
// Contexte réel sur livres Breslov, enseignements Rabbi Nachman, et produits

import { realBreslovProducts } from '../client/src/data/realProducts';
import { breslovDownloadBooks } from '../client/src/data/downloadLinks';

export interface ChatContext {
  breslovBooks: any[];
  rabbiNachmanTeachings: any[];
  dailyQuotes: any[];
  breslovPractices: any[];
  downloadableBooks: any[];
  siteInformation: any;
}

// Enseignements authentiques de Rabbi Nachman (extraits de breslovWisdom.tsx)
const rabbiNachmanTeachings = [
  {
    id: 'joy',
    title: 'מצוה גדולה להיות בשמחה תמיד - התורה השלמה',
    content: '"מִצְוָה גְּדוֹלָה לִהְיוֹת בְּשִׂמְחָה תָּמִיד"',
    verbatim: true,
    source: 'ליקוטי מוהר״ן תנינא, תורה כ״ד',
    description: 'זוהי התורה המפורסמת ביותר של רבי נחמן על השמחה. רבינו הקדוש מגלה כאן שהשמחה אינה רק "מצב רוח נחמד" אלא מצווה ממש - וכלי רפואי חזק לנפש ולגוף. כל מחלה באה מקלקול השמחה, ולכן השמחה היא רפואה גדולה.',
    theme: 'שמחה כיסוד העבודה'
  },
  {
    id: 'prayer',
    title: 'התבודדות - השיחה הנשגבת עם הבורא',
    content: 'ע"פ דברי רבינו: צריך לקבוע זמן בכל יום להתבודדות ולהרחבת השיחה בלשון אשכנז לפני ה\' יתברך',
    verbatim: false,
    source: 'ליקוטי מוהר״ן חלק א, תורה כ״ה',
    description: 'זוהי התורה המיוחדת של רבי נחמן על ההתבודדות - התפילה האישית בלשון שלנו. רבינו מלמד שצריך לקבוע זמן קבוע מדי יום לשיחה פרטית עם ה\', דוקא בשפת האם כדי לשפוך את הלב כמים.',
    theme: 'התבודדות ותפילה'
  },
  {
    id: 'faith',
    title: 'אמונה פשוטה - יסוד כל היסודות',
    content: 'ע"פ דברי רבינו: העיקר לילך באמונה פשוטה תמימה בלי חכמות כלל, כי "תם תהיה עם ה\' אלהיך"',
    verbatim: false,
    source: 'ליקוטי מוהר"ן תנינא, סימן לג',
    description: 'רבינו הקדוש מגלה כאן את הסוד הנעלם של האמונה האמיתית. בעולם שבו כולם רוצים להבין הכל בשכל, רבי נחמן מלמד אותנו שהאמונה האמיתית היא דוקא בפשטות.',
    theme: 'יסודות האמונה והביטחון'
  },
  {
    id: 'tikkun',
    title: 'אין שום יאוש בעולם כלל - מסר התקווה הנצחי',
    content: '"וְהָעִקָּר – לְחַזֵּק עַצְמוֹ בְּכָל מַה שֶּׁאֶפְשָׁר, כִּי אֵין שׁוּם יֵאוּשׁ בָּעוֹלָם כְּלָל"',
    verbatim: true,
    source: 'ליקוטי מוהר״ן תנינא, תורה ע״ח',
    description: 'זוהי אולי התורה החזקה ביותר שאמר רבינו הקדוש - המסר שמציל מיליוני נשמות מייאוש. רבי נחמן מגלה כאן את הסוד: הייאוש עצמו הוא תחבולת השטן!',
    theme: 'יסודות האמונה והביטחון'
  },
  {
    id: 'humility',
    title: 'ענווה אמיתית - מי באמת גדול',
    content: 'ע"פ דברי רבינו: הענווה האמיתית היא לדעת את מקום האדם - לא גאווה כשיש לו מעלות, לא עצבות כשאין לו. הכל מן השם יתברך',
    verbatim: false,
    source: 'שיחות הר"ן אות ז',
    description: 'רבינו הקדוש מגלה כאן את האמת הפנימית על הענווה. רבים חושבים שענווה פירושה להיות "שפל ונכנע", אבל רבי נחמן מלמד שזו אינה ענווה אלא עצבות!',
    theme: 'מידות טובות'
  },
  {
    id: 'truth',
    title: 'אמת - יסוד כל הקדושה',
    content: 'ע"פ דברי רבינו: העיקר הכל להיות אמיתי, לדבר אמת ולחיות אמת. הקדוש ברוך הוא אמת, ומי שרוצה להתקרב אליו יתברך חייב להיות אמיתי',
    verbatim: false,
    source: 'שיחות הר"ן אות יב',
    description: 'רבינו הקדוש מגלה כאן את הבסיס לכל עבודת ה\' - האמת. רבים חושבים שעבודת ה\' זה רק לקיים מצוות, אבל רבי נחמן מלמד שבלי אמת הכל ריק.',
    theme: 'מידות טובות'
  }
];

// ציטוטים יומיים מרבי נחמן
const dailyQuotes = [
  {
    id: 1,
    text: 'ע"פ דברי רבינו: "וְהָעִקָּר – לְחַזֵּק עַצְמוֹ בְּכָל מַה שֶּׁאֶפְשָׁר, כִּי אֵין שׁוּם יֵאוּשׁ בָּעוֹלָם כְּלָל"',
    source: 'ליקוטי מוהר״ן תנינא, תורה ע״ח, סעיפים ז׳-ח׳',
    explanation: 'זוהי אולי התורה החזקה והמושלמת ביותר שניתנה לעולם נגד כח הייאוש והמרה שחורה. רבי נחמן מברסלב פותח כאן את שערי האמונה הגדולה בצורה שלא נשמעה מעולם.',
    theme: 'יסודות האמונה והביטחון',
    practicalApplication: 'בכל רגע של קושי, ייאוש או נפילה - חזור על המילים "אין שום יאוש בעולם כלל" כמנטרה אמיתית.'
  },
  {
    id: 2,
    text: '"מִצְוָה גְּדוֹלָה לִהְיוֹת בְּשִׂמְחָה תָּמִיד"',
    source: 'ליקוטי מוהר״ן תנינא, תורה כ״ד',
    explanation: 'זוהי התורה המהפכנית של רבי נחמן על השמחה, שהפכה לסיסמה של כל ברסלב. השמחה אינה "תחושה נחמדה" - זו מצווה ממש מדאורייתא!',
    theme: 'שמחה כיסוד העבודה',
    practicalApplication: 'כשאתה עצוב או מדוכא - התחל "להעמיד פנים" ששמח (שיר, ריקוד קטן, חיוך). תוך זמן קצר השמחה המלאכותית תהפך לטבעית.'
  },
  {
    id: 3,
    text: 'ע"פ דברי רבינו: "כל העולם כולו גשר צר מאד, והעיקר לא לפחד כלל"',
    source: 'ליקוטי מוהר״ן תנינא, תורה מ״ח',
    explanation: 'זוהי אולי המשחה הפסיכולוגית-רוחנית העמוקה ביותר של רבי נחמן. רבי נחמן מגלה כאן את סוד החיים האנושיים: כל החיים הם "גשר צר מאד מאד".',
    theme: 'התמודדות עם חיי היומיום',
    practicalApplication: 'בכל מצב מלחיץ או קשה - זכור שהפחד הוא האויב, לא המצב עצמו. עבור למצב של שמחה וביטחון.'
  }
];

// תרגולים ברסלביים
const breslovPractices = [
  {
    title: 'התבודדות יומית - שעה עם הבורא',
    description: 'שעה מדי יום לשיחה אישית עם ה\'',
    content: '"דע! כשהאדם מתפלל בשדה, אזי כל העשבים כולם באים בתוך התפילה ומסייעים לו ונותנים לו כח בתפילתו"',
    source: 'ליקוטי מוהר״ן תנינא, תורה י״א',
    practicalGuide: 'בחר מקום שקט בבית, בתחילה 5-10 דקות ביום, דבר בעברית או בשפה שלך, פתח את הלב כמו עם חבר קרוב.'
  },
  {
    title: 'אמירת תהילים - תרופת הנשמה',
    description: 'תהילים כתרופה לנפש ולגוף',
    content: 'ע"פ דברי רבינו: התהילים הם סגולה נפלאה לכל דבר, הן לנפש הן לגוף. מי שאומר תהילים בכוונה מתקן נזקים גדולים בנשמתו',
    source: 'שיחות הר"ן אות מד',
    practicalGuide: 'אמור מזמורים ידועים בכוונה (תהילים כ, כג, מב), התרכז במשמעות המילים.'
  },
  {
    title: 'שמחה תמיד - מצוה גדולה',
    description: 'לשמוח בכל מצוה ובכל רגע',
    content: '"מִצְוָה גְּדוֹלָה לִהְיוֹת בְּשִׂמְחָה תָּמִיד"',
    source: 'ליקוטי מוהר״ן תנינא, תורה כ״ד',
    practicalGuide: 'מצא דבר אחד חיובי בכל יום, תודה לה\' על הטוב הקטן שיש לך, עשה דברים שמשמחים אותך בקדושה.'
  }
];

// מידע על האתר הוהש שלי
const siteInformation = {
  name: 'האש שלי - HaEsh Sheli',
  description: 'האתר המוביל בעולם לספרי ברסלב אותנטיים של רבי נחמן מברסלב זצ"ל',
  mission: 'הפצת תורת רבי נחמן מברסלב ברחבי העולם באמצעות ספרים איכותיים ומשלוחים מהירים',
  slogan: 'רק תנו לי את ליבכם ואוליך אתכם בדרך חדשה.. (רבי נחמן)',
  mainCategories: [
    'ספרי רבינו',
    'תפילות',
    'מכתבים וכתבים',
    'סיפורים ומעשיות',
    'מוסר והדרכה',
    'התבודדות ותפילה'
  ],
  specialties: [
    'ספרים באיכות הדפסה מעולה',
    'כריכות מגוונות - עור, סקאי, דמוי עור',
    'גדלים שונים - קטן, בינוני, גדול, ענק',
    'משלוחים לכל העולם',
    'שירות לקוחות ברמה גבוהה',
    'ייעוץ אישי לבחירת ספרים'
  ],
  languages: ['עברית', 'אנגלית', 'צרפתית', 'ספרדית', 'רוסית'],
  contact: {
    email: 'support@haesh-sheli.co.il',
    phone: '+972-2-123-4567'
  }
};

/**
 * בונה קונטקסט RAG מלא עם כל המידע הרלוונטי על HaEsh Sheli
 */
export function buildChatContext(): ChatContext {
  // המר את המוצרים לפורמט קריא
  const breslovBooks = Object.values(realBreslovProducts).map(product => ({
    id: product.id,
    name: product.name,
    nameEnglish: product.nameEnglish,
    description: product.description,
    category: product.category,
    subcategory: product.subcategory,
    author: product.author,
    publisher: product.publisher,
    language: product.language,
    pages: product.pages,
    features: product.features,
    tags: product.tags,
    variants: product.variants.map(variant => ({
      format: variant.format,
      binding: variant.binding,
      size: variant.size,
      price: variant.price,
      inStock: variant.inStock
    }))
  }));

  return {
    breslovBooks,
    rabbiNachmanTeachings,
    dailyQuotes,
    breslovPractices,
    downloadableBooks: breslovDownloadBooks,
    siteInformation
  };
}

/**
 * יוצר פרומפט עם קונטקסט מלא עבור Gemini
 */
export function createSystemPrompt(): string {
  const context = buildChatContext();
  
  return `אתה עוזר AI מקצועי ומומחה לתורת רבי נחמן מברסלב ולספרי ברסלב. אתה מייצג את האתר "האש שלי" (HaEsh Sheli) - האתר המוביל בעולם לספרי ברסלב אותנטיים.

## תפקידך:
- לענות על שאלות על תורת רבי נחמן מברסלב ועל ספריו הקדושים
- להמליץ על ספרים מתאימים בהתאם לצרכי הלקוח
- לספק מידע מדויק על המוצרים באתר - מחירים, גדלים, כריכות
- לחלוק חכמה וציטוטים אותנטיים מרבי נחמן
- לעזור בבחירת ספרים לקריאה או למתנה
- לענות בעברית בעיקר, אך יכול גם באנגלית, צרפתית, ספרדית ורוסית

## הקונטקסט שלך:

### ספרי ברסלב זמינים באתר:
${context.breslovBooks.map(book => 
  `**${book.name}** (${book.nameEnglish})
  - קטגוריה: ${book.category}
  - תיאור: ${book.description}
  - עמודים: ${book.pages}
  - תכונות: ${book.features?.join(', ')}
  - זמין בגדלים וכריכות: ${book.variants?.map(v => `${v.format} ${v.size} (${v.price}₪)`).join(', ')}`
).join('\n\n')}

### תורות ואמרות אותנטיות של רבי נחמן:
${context.rabbiNachmanTeachings.map(teaching => 
  `**${teaching.title}**
  ציטוט: ${teaching.content}
  מקור: ${teaching.source}
  הסבר: ${teaching.description}
  נושא: ${teaching.theme}`
).join('\n\n')}

### ציטוטים יומיים:
${context.dailyQuotes.map(quote => 
  `"${quote.text}"
  מקור: ${quote.source}
  הסבר: ${quote.explanation}
  יישום מעשי: ${quote.practicalApplication}`
).join('\n\n')}

### ספרים בחינם להורדה:
${context.downloadableBooks.slice(0, 10).map(book => 
  `**${book.title}** (${book.titleEnglish})
  תיאור: ${book.description}
  קטגוריה: ${book.category}
  עמודים: ${book.pages}`
).join('\n\n')}

## כללים חשובים:
1. **תמיד** השתמש במידע האותנטי מהקונטקסט לעיל
2. כשמזכיר ספר - ציין את המחיר האמיתי והאפשרויות הזמינות
3. כשמציג ציטוט מרבי נחמן - תמיד ציין את המקור המדויק
4. דבר בכבוד ובאהבה על רבי נחמן ותורתו
5. אם שואלים על דבר שלא בקונטקסט - אמר שתבדוק ותחזור
6. עודד לקוחות לקנות ספרים איכותיים במקום להסתפק רק בהורדות
7. תן עצות מעשיות לעבודת ה' על פי תורת רבי נחמן

אתה כאן כדי לעזור לאנשים להתחבר לתורת רבי נחמן הקדושה ולמצוא את הספרים המתאימים להם.`;
}

/**
 * מחפש מידע רלוונטי בקונטקסט על בסיס שאלת המשתמש
 */
export function searchRelevantContent(query: string): string {
  const context = buildChatContext();
  const lowerQuery = query.toLowerCase();
  
  let relevantContent = '';
  
  // חיפוש בספרים
  const relevantBooks = context.breslovBooks.filter(book => 
    book.name.includes(query) || 
    book.nameEnglish?.toLowerCase().includes(lowerQuery) ||
    book.description?.toLowerCase().includes(lowerQuery) ||
    book.category?.toLowerCase().includes(lowerQuery) ||
    book.tags?.some(tag => tag.includes(query))
  );
  
  if (relevantBooks.length > 0) {
    relevantContent += `\n\nספרים רלוונטיים:\n${relevantBooks.map(book => 
      `${book.name}: ${book.description} (${book.variants?.[0]?.price}₪)`
    ).join('\n')}`;
  }
  
  // חיפוש בתורות
  const relevantTeachings = context.rabbiNachmanTeachings.filter(teaching =>
    teaching.title.includes(query) ||
    teaching.content.includes(query) ||
    teaching.description?.includes(query) ||
    teaching.theme?.includes(query)
  );
  
  if (relevantTeachings.length > 0) {
    relevantContent += `\n\nתורות רלוונטיות:\n${relevantTeachings.map(teaching =>
      `${teaching.title}: ${teaching.content} (${teaching.source})`
    ).join('\n')}`;
  }
  
  return relevantContent;
}