import { Header } from '../components/Header';
import { useLanguage } from '../contexts/LanguageContext';
import { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  User,
  Search,
  Tag,
  TrendingUp,
  Heart,
  Eye,
  Share2,
  ArrowRight,
  Mail,
  Star,
  Filter,
  ChevronRight,
  Globe,
  Award,
  Target,
  MessageCircle,
  Users,
  Play,
  Quote,
  MapPin,
  Video,
  Image,
  ThumbsUp,
  Bookmark,
  Download,
  ExternalLink,
  Volume2
} from 'lucide-react';

// Types pour TypeScript
interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  views: number;
  image: string;
  featured: boolean;
  tags: string[];
}

interface Category {
  name: string;
  count: number;
  icon: string;
}

interface Stat {
  number: string;
  label: string;
  icon: string;
}

interface ContentType {
  title: string;
  description: string;
  icon: string;
}

interface Testimonial {
  id: number;
  name: string;
  location: string;
  content: string;
  image: string;
  rating: number;
}

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  type: string;
  image?: string;
}

interface DailyQuote {
  id: number;
  text: string;
  source: string;
  author: string;
}

const translations = {
  he: {
    // SEO
    title: 'מגזין האש שלי | תורה, רוחניות ועדכונים מעולם ברסלב',
    description: 'מגזין רוחני המוקדש לתורת רבי נחמן מברסלב. מאמרים מעמיקים, עדויות מרגשות ועדכונים על פעילות הקרן.',

    // Hero Section
    heroTitle: 'מגזין האש שלי',
    heroSubtitle: 'תורה, רוחניות ועדכונים מעולם ברסלב',
    heroDescription: 'מגזין רוחני ייחודי המוקדש לתורתו ודרכו של רבי נחמן מברסלב. כאן תמצאו מאמרים מעמיקים, עדויות מרגשות מרחבי העולם, ועדכונים על פעילות הקרן להפצת ספרי רבנו הקדוש.',

    // Categories
    categoriesTitle: 'קטגוריות',
    categories: [
      { name: 'תורה ורוחניות', count: 45, icon: 'BookOpen' },
      { name: 'ברסלב בעולם', count: 32, icon: 'Globe' },
      { name: 'עדכוני הקרן', count: 28, icon: 'Award' },
      { name: 'מועדים וחגים', count: 15, icon: 'Calendar' },
      { name: 'סיפורים', count: 22, icon: 'Heart' },
      { name: 'שאלות ותשובות', count: 18, icon: 'MessageCircle' }
    ],

    // Featured Articles
    featuredTitle: 'מאמרים מובילים',
    featuredSubtitle: 'המאמרים הנקראים והמשפיעים ביותר',

    // Latest Articles
    latestTitle: 'מאמרים אחרונים',
    latestSubtitle: 'התוכן החדש ביותר שלנו',

    // Articles Data - Enriched with authentic Breslov content
    articles: [
      {
        id: 1,
        title: 'עצות לשמחה מליקוטי מוהרן',
        excerpt: 'מאמר מעמיק על דברי רבנו הקדוש בענין השמחה והאמונה, ואיך להגיע לשמחה אמיתית בכל מצב ובכל זמן, גם בעתות של קושי וניסיון.',
        category: 'תורה ורוחניות',
        author: 'הרב יעקב הן יעקוב חן',
        date: '15 ינואר 2025',
        readTime: '8 דקות קריאה',
        views: 1250,
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/1-1-300x300.d110a0.webp',
        featured: true,
        tags: ['שמחה', 'ליקוטי מוהרן', 'חיזוק']
      },
      {
        id: 2,
        title: 'סיפורים מברסלב ברחבי העולם',
        excerpt: 'עדויות מרגשות מברסלבים מרחבי העולם על ישועות וחוויות רוחניות באמצעות תורת רבנו הקדוש, כיצד השפיעו הספרים על חייהם.',
        category: 'ברסלב בעולם',
        author: 'הרב משה כהן',
        date: '12 ינואר 2025',
        readTime: '6 דקות קריאה',
        views: 980,
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/44-300x300.d110a0.webp',
        featured: true,
        tags: ['עדויות', 'חו"ל', 'ישועות']
      },
      {
        id: 3,
        title: 'ההתבודדות - דרך לחיבור אמיתי',
        excerpt: 'מדריך מעשי להתבודדות על פי תורת רבי נחמן מברסלב. איך ליצור חיבור אמיתי עם הבורא דרך התבודדות יומיומית ותפילה אישית.',
        category: 'תורה ורוחניות',
        author: 'הרב דוד לוי',
        date: '10 ינואר 2025',
        readTime: '12 דקות קריאה',
        views: 1450,
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/2-1-300x300.d110a0.webp',
        featured: false,
        tags: ['התבודדות', 'תפילה', 'חיבור']
      },
      {
        id: 4,
        title: 'פעילויות הקרן ברחבי הארץ',
        excerpt: 'סיקור מפורט של פעילויות הקרן בחודש האחרון: הפצת ספרים, הרצאות, ופעילויות חינוכיות במרכזים השונים ברחבי הארץ.',
        category: 'עדכוני הקרן',
        author: 'צוות האש שלי',
        date: '8 ינואר 2025',
        readTime: '5 דקות קריאה',
        views: 750,
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/02/Untitled-design-10-1024x1024.d110a0.webp',
        featured: false,
        tags: ['פעילויות', 'הפצה', 'חינוך']
      },
      {
        id: 5,
        title: 'טו בשבט ותורת רבנו על הטבע',
        excerpt: 'ט"ו בשבט מתקרב ועמו הזדמנות ללמוד על יחסו המיוחד של רבי נחמן לטבע ולבריאה. מה לימדנו רבנו על החיבור לטבע?',
        category: 'מועדים וחגים',
        author: 'הרב אליעזר גולד',
        date: '5 ינואר 2025',
        readTime: '7 דקות קריאה',
        views: 620,
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/3-1-300x300.d110a0.webp',
        featured: false,
        tags: ['טו בשבת', 'טבע', 'חגים']
      },
      {
        id: 6,
        title: 'הנא ברסלב - חיבור לשורשים',
        excerpt: 'מסע רוחני לאומן ולקברו הקדוש של רבי נחמן. המדריך המלא לנוסעים לראש השנה ולחגים, כולל הכנה רוחנית ומעשית.',
        category: 'ברסלב בעולם',
        author: 'הרב יוסף ברגר',
        date: '3 ינואר 2025',
        readTime: '15 דקות קריאה',
        views: 2100,
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/5-1-300x300.d110a0.webp',
        featured: true,
        tags: ['אומן', 'נסיעה', 'ראש השנה']
      },
      {
        id: 7,
        title: 'נ נח נחמא נחמן מאומן - פירוש והסבר',
        excerpt: 'משמעות הפסוק המיוחד "נ נח נחמא נחמן מאומן" ותפקידו בחסידות ברסלב. המסר הקבלי והרוחני הטמון בניגון המיוחד הזה.',
        category: 'תורה ורוחניות',
        author: 'הרב אריה נועם',
        date: '2 ינואר 2025',
        readTime: '10 דקות קריאה',
        views: 1850,
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/1-1-300x300.d110a0.webp',
        featured: true,
        tags: ['נ נח', 'ניגון', 'קבלה']
      },
      {
        id: 8,
        title: 'ליקוטי תפילות - התפילה מהלב',
        excerpt: 'עיון בליקוטי תפילות של רבי נתן מברסלב. איך התפילות הללו יכולות לעזור לנו להתחבר לתפילה אמיתית ולהתרגש בעבודת השם.',
        category: 'תורה ורוחניות',
        author: 'הרב אליהו שמעון',
        date: '30 דצמבר 2024',
        readTime: '14 דקות קריאה',
        views: 1320,
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/2-1-300x300.d110a0.webp',
        featured: false,
        tags: ['ליקוטי תפילות', 'רב נתן', 'תפילה']
      },
      {
        id: 9,
        title: 'סיפורי מעשיות - הסיפור הרוחני',
        excerpt: 'ניתוח מעמיק של סיפורי המעשיות של רבי נחמן מברסלב. המסרים הנסתרים והלקחים הרוחניים בכל סיפור, ואיך הם רלוונטיים היום.',
        category: 'תורה ורוחניות',
        author: 'הרב יצחק ברקוביץ',
        date: '28 דצמבר 2024',
        readTime: '16 דקות קריאה',
        views: 2240,
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/3-1-300x300.d110a0.webp',
        featured: true,
        tags: ['סיפורי מעשיות', 'נסתר', 'חכמה']
      },
      {
        id: 10,
        title: 'הקיבוץ השנתי באומן - חוויה רוחנית',
        excerpt: 'דיווח מפורט על הקיבוץ השנתי באומן לראש השנה. עדויות מרגשות, חוויות רוחניות ותיאור האווירה המיוחדת בקברו הקדוש של רבנו.',
        category: 'ברסלב בעולם',
        author: 'הרב מרדכי גולן',
        date: '25 דצמבר 2024',
        readTime: '12 דקות קריאה',
        views: 3150,
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/5-1-300x300.d110a0.webp',
        featured: true,
        tags: ['אומן', 'ראש השנה', 'קיבוץ']
      },
      {
        id: 11,
        title: 'ספר המידות - מדריך מעשי לחיים',
        excerpt: 'ספר המידות של רבי נחמן מברסלב כמדריך מעשי לחיי היום יום. איך לקחים פשוטים יכולים לשנות את החיים שלנו לטובה.',
        category: 'תורה ורוחניות',
        author: 'הרב שמואל הלוי',
        date: '22 דצמבר 2024',
        readTime: '8 דקות קריאה',
        views: 890,
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/44-300x300.d110a0.webp',
        featured: false,
        tags: ['ספר המידות', 'מעשי', 'חיים']
      },
      {
        id: 12,
        title: 'רבי נתן מברסלב - התלמיד הנאמן',
        excerpt: 'הכרת דמותו המיוחדת של רבי נתן מברסלב, התלמיד הנאמן של רבי נחמן. תפקידו בהנצחת התורה ובהקמת חסידות ברסלב.',
        category: 'סיפורים',
        author: 'הרב אברהם כהן',
        date: '20 דצמבר 2024',
        readTime: '11 דקות קריאה',
        views: 1450,
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/1-1-300x300.d110a0.webp',
        featured: false,
        tags: ['רב נתן', 'תלמיד', 'נאמנות']
      },
      {
        id: 13,
        title: 'התיקון הכללי - דרך לתשובה שלמה',
        excerpt: 'עיון בתיקון הכללי שגילה רבי נחמן מברסלב. איך עשרת המזמורים המיוחדים יכולים לתקן את הנשמה ולהביא לתשובה שלמה.',
        category: 'תורה ורוחניות',
        author: 'הרב צבי הירש',
        date: '18 דצמבר 2024',
        readTime: '13 דקות קריאה',
        views: 1920,
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/2-1-300x300.d110a0.webp',
        featured: true,
        tags: ['תיקון כללי', 'תשובה', 'מזמורים']
      },
      {
        id: 14,
        title: 'ברסלב בישראל - מרכזים ופעילויות',
        excerpt: 'מפת מרכזי ברסלב בישראל - בתי מדרש, מקווי הרחצה ומוקדי פעילות רוחנית. מידע מעודכן על שיעורים, אירועים ופעילויות.',
        category: 'עדכוני הקרן',
        author: 'צוות האש שלי',
        date: '15 דצמבר 2024',
        readTime: '7 דקות קריאה',
        views: 680,
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/02/Untitled-design-10-1024x1024.d110a0.webp',
        featured: false,
        tags: ['ישראל', 'מרכזים', 'פעילויות']
      },
      {
        id: 15,
        title: 'רוש חודש בברסלב - התחדשות רוחנית',
        excerpt: 'המשמעות המיוחדת של ראש חודש בחסידות ברסלב. איך לנצל את זמן הזה להתחדשות רוחנית ולהתקרבות לבורא עולם.',
        category: 'מועדים וחגים',
        author: 'הרב נחמן גולדשטיין',
        date: '12 דצמבר 2024',
        readTime: '6 דקות קריאה',
        views: 520,
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/3-1-300x300.d110a0.webp',
        featured: false,
        tags: ['ראש חודש', 'התחדשות', 'זמן']
      },
      {
        id: 16,
        title: 'היכל הקודש באומן - מקום קדוש',
        excerpt: 'תיאור היכל הקודש באומן שבו קבור רבי נחמן מברסלב. ההיסטוריה, הקדושה והמשמעות הרוחנית של המקום עבור חסידי ברסלב.',
        category: 'ברסלב בעולם',
        author: 'הרב יעקב אוקראיני',
        date: '10 דצמבר 2024',
        readTime: '15 דקות קריאה',
        views: 2850,
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/5-1-300x300.d110a0.webp',
        featured: true,
        tags: ['היכל הקודש', 'אומן', 'קדושה']
      },
      {
        id: 17,
        title: 'שיחות הרן - חכמת החיים',
        excerpt: 'לימוד שיחות הרן של רבי נחמן מברסלב. עצות מעשיות לחיי היום יום, דברי חיזוק והדרכה רוחנית לכל אחד ואחת.',
        category: 'תורה ורוחניות',
        author: 'הרב שלמה ברסלבי',
        date: '8 דצמבר 2024',
        readTime: '9 דקות קריאה',
        views: 1150,
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/44-300x300.d110a0.webp',
        featured: false,
        tags: ['שיחות הרן', 'עצות', 'חכמה']
      },
      {
        id: 18,
        title: 'הפצת ספרי ברסלב בעולם - משימה קדושה',
        excerpt: 'הפצת ספרי רבי נחמן מברסלב ברחבי העולם. פעילות הקרן, התרגומים לשפות שונות והשפעה על יהדות העולם.',
        category: 'עדכוני הקרן',
        author: 'הרב מיכאל הפץ',
        date: '5 דצמבר 2024',
        readTime: '10 דקות קריאה',
        views: 980,
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/02/Untitled-design-10-1024x1024.d110a0.webp',
        featured: false,
        tags: ['הפצה', 'עולם', 'ספרים']
      }
    ],

    // Newsletter
    newsletterTitle: 'הצטרפו לרשימת התפוצה',
    newsletterSubtitle: 'קבלו עדכונים על מאמרים חדשים ופעילויות הקרן',
    newsletterDescription: 'הירשמו לקבלת עדכונים שוטפים על תוכן חדש, מאמרים מיוחדים לחגים ומועדים, ועדכונים על פעילויות הקרן ברחבי העולם.',
    newsletterPlaceholder: 'הכניסו את כתובת המייל שלכם',
    newsletterButton: 'הצטרפו עכשיו',
    newsletterSuccess: 'תודה! נרשמתם בהצלחה לרשימת התפוצה',

    // Statistics
    statsTitle: 'המגזין במספרים',
    stats: [
      { number: '150+', label: 'מאמרים פורסמו', icon: 'BookOpen' },
      { number: '25K+', label: 'קוראים חודשיים', icon: 'Users' },
      { number: '12', label: 'שפות זמינות', icon: 'Globe' },
      { number: '4.9', label: 'דירוג ממוצע', icon: 'Star' }
    ],

    // Content Types
    contentTypesTitle: 'סוגי התוכן במגזין',
    contentTypes: [
      {
        title: 'מאמרי תורה',
        description: 'פירושים ועיונים בתורתו הקדושה של רבי נחמן מברסלב',
        icon: 'BookOpen'
      },
      {
        title: 'עדויות וסיפורים',
        description: 'סיפורים מרגשים על ישועות וחוויות רוחניות',
        icon: 'Heart'
      },
      {
        title: 'מדריכים מעשיים',
        description: 'הדרכה מעשית ליישום תורת רבנו בחיי היום יום',
        icon: 'Target'
      },
      {
        title: 'עדכוני הקרן',
        description: 'חדשות ועדכונים על פעילויות הקרן ברחבי העולם',
        icon: 'Globe'
      }
    ],

    // CTA
    ctaTitle: 'רוצים לתרום למגזין?',
    ctaDescription: 'יש לכם סיפור, מאמר או עדות שתרצו לשתף? נשמח לשמוע מכם!',
    ctaButtonPrimary: 'שלחו תוכן',
    ctaButtonSecondary: 'צרו קשר',

    // Daily Quotes - NEW SECTION
    dailyQuotesTitle: 'ציטוט יומי מרבנו הקדוש',
    dailyQuotesSubtitle: 'דברי חיזוק והשראה מתורת רבי נחמן מברסלב',
    dailyQuotes: [
      {
        id: 1,
        text: 'כל העולם כולו גשר צר מאוד, והעיקר לא לפחד כלל',
        source: 'ליקוטי מוהרן ב\', מח',
        author: 'רבי נחמן מברסלב'
      },
      {
        id: 2,
        text: 'אין שום יאוש בעולם כלל',
        source: 'שיחות הרן',
        author: 'רבי נחמן מברסלב'
      },
      {
        id: 3,
        text: 'מצוה גדולה להיות בשמחה תמיד',
        source: 'ליקוטי מוהרן ב\', כד',
        author: 'רבי נחמן מברסלב'
      },
      {
        id: 4,
        text: 'והתפילה היא למעלה מכל מדריגה',
        source: 'ליקוטי מוהרן א\', ב',
        author: 'רבי נחמן מברסלב'
      },
      {
        id: 5,
        text: 'אדם צריך לעבור על גשר צר מאוד, והכלל לא לפחד כלל',
        source: 'ליקוטי מוהרן ב\', מח',
        author: 'רבי נחמן מברסלב'
      }
    ],

    // Testimonials - NEW SECTION
    testimonialsTitle: 'עדויות קוראים',
    testimonialsSubtitle: 'איך המגזין שלנו משפיע על חייהם של קוראים ברחבי העולם',
    testimonials: [
      {
        id: 1,
        name: 'יעקב לוי',
        location: 'ירושלים, ישראל',
        content: 'המגזין הזה שינה את החיים שלי. כל מאמר מביא לי חיזוק והשראה חדשה. במיוחד אהבתי את המאמר על ההתבודדות - עזר לי להתחבר באמת לתפילה.',
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/1-1-300x300.d110a0.webp',
        rating: 5
      },
      {
        id: 2,
        name: 'שרה כהן',
        location: 'תל אביב, ישראל',
        content: 'אני קוראת כבר שנתיים ולא מפסיקה להתרגש מהתוכן. הסיפורים מברסלב ברחבי העולם נותנים לי כוח והאמונה שהקב"ה שומר עלינו תמיד.',
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/2-1-300x300.d110a0.webp',
        rating: 5
      },
      {
        id: 3,
        name: 'אברהם גולדברג',
        location: 'ניו יורק, ארה"ב',
        content: 'המגזין מחבר אותי לקהילת ברסלב ברחבי העולם. הציטוטים היומיים עוזרים לי להתחיל כל יום בהשראה, והמאמרים עמוקים ומעניינים.',
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/3-1-300x300.d110a0.webp',
        rating: 5
      },
      {
        id: 4,
        name: 'מרים שוורץ',
        location: 'בני ברק, ישראל',
        content: 'תוכן איכותי שבאמת בנוי על יסודות תורת רבנו הקדוש. המדריכים המעשיים עוזרים לי ליישם את ההלכות בחיי היום יום שלי.',
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/44-300x300.d110a0.webp',
        rating: 5
      }
    ],

    // Events Calendar - NEW SECTION
    eventsTitle: 'לוח אירועים ברסלב',
    eventsSubtitle: 'אירועים, שיעורים והתכנסויות ברחבי העולם',
    events: [
      {
        id: 1,
        title: 'שיעור בליקוטי מוהרן - הרב יעקב הן',
        date: '18 ינואר 2025',
        location: 'בית מדרש ברסלב, ירושלים',
        type: 'שיעור',
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/1-1-300x300.d110a0.webp'
      },
      {
        id: 2,
        title: 'התכנסות חסידי ברסלב - ראש חודש שבט',
        date: '30 ינואר 2025',
        location: 'מירון, ישראל',
        type: 'התכנסות',
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/2-1-300x300.d110a0.webp'
      },
      {
        id: 3,
        title: 'נסיעה לאומן - הכנה לראש השנה',
        date: '15 ספטמבר 2025',
        location: 'אומן, אוקראינה',
        type: 'נסיעה',
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/5-1-300x300.d110a0.webp'
      },
      {
        id: 4,
        title: 'חלקת הפצת ספרי ברסלב - יום התנדבות',
        date: '25 ינואר 2025',
        location: 'מרכז האש שלי, ירושלים',
        type: 'התנדבות',
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/02/Untitled-design-10-1024x1024.d110a0.webp'
      }
    ],

    // Videos Section - NEW SECTION
    videosTitle: 'סרטונים והרצאות',
    videosSubtitle: 'הרצאות מעמיקות, שיעורים וסיפורים מעשיים',
    videos: [
      {
        id: 1,
        title: 'עצות לשמחה מליקוטי מוהרן - הרב יעקב הן',
        description: 'הרצאה מעמיקה על דברי רבנו הקדוש בענין השמחה והאמונה',
        duration: '45:30',
        views: 15420,
        thumbnail: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/1-1-300x300.d110a0.webp'
      },
      {
        id: 2,
        title: 'סיפור מרגש מאומן - עדות אישית',
        description: 'עדות מרגשת של חסיד ברסלב על ישועה שקיבל בזכות רבנו הקדוש',
        duration: '22:15',
        views: 8930,
        thumbnail: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/2-1-300x300.d110a0.webp'
      },
      {
        id: 3,
        title: 'מדריך להתבודדות יומיומית',
        description: 'הדרכה מעשית לביצוע התבודדות על פי תורת רבי נחמן מברסלב',
        duration: '31:45',
        views: 12650,
        thumbnail: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/3-1-300x300.d110a0.webp'
      }
    ],

    // World News - NEW SECTION
    worldNewsTitle: 'ברסלב בעולם',
    worldNewsSubtitle: 'חדשות ועדכונים מקהילות ברסלב ברחבי העולם',
    worldNews: [
      {
        id: 1,
        title: 'הקמת מרכז ברסלב חדש בברוקלין',
        location: 'ניו יורק, ארה"ב',
        date: '10 ינואר 2025',
        summary: 'מרכז חדש לחסידי ברסלב נפתח בברוקלין עם בית מדרש ומקווה טהרה',
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/1-1-300x300.d110a0.webp'
      },
      {
        id: 2,
        title: 'חלוקת ספרי ברסלב בפריז',
        location: 'פריז, צרפת',
        date: '5 ינואר 2025',
        summary: 'מבצע הפצת ספרים נרחב ברובע היהודי בפריז הגיע ל-500 משפחות',
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/2-1-300x300.d110a0.webp'
      },
      {
        id: 3,
        title: 'כנס צעירי ברסלב בלונדון',
        location: 'לונדון, אנגליה',
        date: '2 ינואר 2025',
        summary: 'למעלה מ-300 צעירים השתתפו בכנס השנתי לחיזוק והתעוררות רוחנית',
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/3-1-300x300.d110a0.webp'
      }
    ],

    // Interactive Features - NEW SECTION
    interactiveTitle: 'כלים אינטראקטיביים',
    bookmarkText: 'הוסף למועדפים',
    shareText: 'שתף מאמר',
    downloadText: 'הורד PDF',
    printText: 'הדפס',
    relatedArticles: 'מאמרים קשורים',
    popularTags: 'תגיות פופולריות',

    // Common
    readMore: 'קרא עוד',
    readTime: 'זמן קריאה',
    views: 'צפיות',
    author: 'מאת',
    searchPlaceholder: 'חפש במגזין...',
    filterBy: 'סנן לפי',
    allCategories: 'כל הקטגוריות',
    sortBy: 'מיין לפי',
    newest: 'החדשים ביותר',
    popular: 'הפופולריים ביותר',
    watchVideo: 'צפה בסרטון',
    readTestimonial: 'קרא עדות',
    viewEvent: 'פרטי אירוע',
    subscribeNewsletter: 'הירשם לעדכונים'
  },

  en: {
    // SEO
    title: 'My Fire Magazine | Torah, Spirituality and Updates from Breslov World',
    description: 'Spiritual magazine dedicated to Rabbi Nachman of Breslov\'s teachings. Deep articles, moving testimonies and updates on foundation activities.',

    // Hero Section
    heroTitle: 'My Fire Magazine',
    heroSubtitle: 'Torah, Spirituality and Updates from Breslov World',
    heroDescription: 'A unique spiritual magazine dedicated to the teachings and path of Rabbi Nachman of Breslov. Here you will find deep articles, moving testimonies from around the world, and updates on foundation activities for spreading our holy Rabbi\'s books.',

    // Categories
    categoriesTitle: 'Categories',
    categories: [
      { name: 'Torah & Spirituality', count: 45, icon: 'BookOpen' },
      { name: 'Breslov Worldwide', count: 32, icon: 'Globe' },
      { name: 'Foundation Updates', count: 28, icon: 'Award' },
      { name: 'Holidays & Festivals', count: 15, icon: 'Calendar' },
      { name: 'Stories', count: 22, icon: 'Heart' },
      { name: 'Q&A', count: 18, icon: 'MessageCircle' }
    ],

    // Featured Articles
    featuredTitle: 'Featured Articles',
    featuredSubtitle: 'Our most read and impactful articles',

    // Latest Articles
    latestTitle: 'Latest Articles',
    latestSubtitle: 'Our newest content',

    // Articles Data
    articles: [
      {
        id: 1,
        title: 'Joy Lessons from Likutei Moharan',
        excerpt: 'A deep article on our holy Rabbi\'s words about joy and faith, and how to achieve true joy in any situation and at any time, even during times of difficulty and trial.',
        category: 'Torah & Spirituality',
        author: 'Rabbi Yaakov Hen',
        date: 'January 15, 2025',
        readTime: '8 min read',
        views: 1250,
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/1-1-300x300.d110a0.webp',
        featured: true,
        tags: ['joy', 'Likutei Moharan', 'encouragement']
      },
      {
        id: 2,
        title: 'Breslov Stories from Around the World',
        excerpt: 'Moving testimonies from Breslov Hasidim worldwide about salvations and spiritual experiences through our holy Rabbi\'s teachings, how the books influenced their lives.',
        category: 'Breslov Worldwide',
        author: 'Rabbi Moshe Cohen',
        date: 'January 12, 2025',
        readTime: '6 min read',
        views: 980,
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/44-300x300.d110a0.webp',
        featured: true,
        tags: ['testimonies', 'worldwide', 'salvations']
      },
      {
        id: 3,
        title: 'Hitbodedut - Path to True Connection',
        excerpt: 'Practical guide to hitbodedut according to Rabbi Nachman of Breslov\'s teachings. How to create true connection with the Creator through daily meditation and personal prayer.',
        category: 'Torah & Spirituality',
        author: 'Rabbi David Levi',
        date: 'January 10, 2025',
        readTime: '12 min read',
        views: 1450,
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/2-1-300x300.d110a0.webp',
        featured: false,
        tags: ['hitbodedut', 'prayer', 'connection']
      },
      {
        id: 4,
        title: 'Foundation Activities Across the Country',
        excerpt: 'Detailed coverage of foundation activities in the past month: book distribution, lectures, and educational activities in various centers across the country.',
        category: 'Foundation Updates',
        author: 'My Fire Team',
        date: 'January 8, 2025',
        readTime: '5 min read',
        views: 750,
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/02/Untitled-design-10-1024x1024.d110a0.webp',
        featured: false,
        tags: ['activities', 'distribution', 'education']
      },
      {
        id: 5,
        title: 'Tu BiShvat and Our Rabbi\'s Teaching on Nature',
        excerpt: 'Tu BiShvat approaches and with it an opportunity to learn about Rabbi Nachman\'s special relationship with nature and creation. What did our Rabbi teach us about connecting with nature?',
        category: 'Holidays & Festivals',
        author: 'Rabbi Eliezer Gold',
        date: 'January 5, 2025',
        readTime: '7 min read',
        views: 620,
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/3-1-300x300.d110a0.webp',
        featured: false,
        tags: ['Tu BiShvat', 'nature', 'holidays']
      },
      {
        id: 6,
        title: 'Traveling to Breslov - Connecting to Roots',
        excerpt: 'Spiritual journey to Uman and our holy Rabbi\'s grave. Complete guide for Rosh Hashana and holiday travelers, including spiritual and practical preparation.',
        category: 'Breslov Worldwide',
        author: 'Rabbi Yosef Berger',
        date: 'January 3, 2025',
        readTime: '15 min read',
        views: 2100,
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/5-1-300x300.d110a0.webp',
        featured: true,
        tags: ['Uman', 'travel', 'Rosh Hashana']
      }
    ],

    // Daily Quotes - NEW SECTION
    dailyQuotesTitle: 'Daily Quote from Our Holy Rabbi',
    dailyQuotesSubtitle: 'Words of encouragement and inspiration from Rabbi Nachman of Breslov\'s teachings',
    dailyQuotes: [
      {
        id: 1,
        text: 'The entire world is a very narrow bridge, and the main thing is not to fear at all',
        source: 'Likutei Moharan II, 48',
        author: 'Rabbi Nachman of Breslov'
      },
      {
        id: 2,
        text: 'There is no despair in the world at all',
        source: 'Sichot HaRan',
        author: 'Rabbi Nachman of Breslov'
      },
      {
        id: 3,
        text: 'It is a great mitzvah to be always in joy',
        source: 'Likutei Moharan II, 24',
        author: 'Rabbi Nachman of Breslov'
      },
      {
        id: 4,
        text: 'And prayer is above every level',
        source: 'Likutei Moharan I, 2',
        author: 'Rabbi Nachman of Breslov'
      },
      {
        id: 5,
        text: 'A person must cross a very narrow bridge, and the rule is not to fear at all',
        source: 'Likutei Moharan II, 48',
        author: 'Rabbi Nachman of Breslov'
      }
    ],

    // Testimonials - NEW SECTION
    testimonialsTitle: 'Reader Testimonials',
    testimonialsSubtitle: 'How our magazine impacts the lives of readers around the world',
    testimonials: [
      {
        id: 1,
        name: 'Jacob Levi',
        location: 'Jerusalem, Israel',
        content: 'This magazine has changed my life. Every article brings me encouragement and new inspiration. I especially loved the article on hitbodedut - it helped me truly connect to prayer.',
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/1-1-300x300.d110a0.webp',
        rating: 5
      },
      {
        id: 2,
        name: 'Sarah Cohen',
        location: 'Tel Aviv, Israel',
        content: 'I\'ve been reading for two years now and never stop being moved by the content. The Breslov stories from around the world give me strength and faith that Hashem is always watching over us.',
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/2-1-300x300.d110a0.webp',
        rating: 5
      },
      {
        id: 3,
        name: 'Abraham Goldberg',
        location: 'New York, USA',
        content: 'The magazine connects me to the Breslov community worldwide. The daily quotes help me start each day with inspiration, and the articles are deep and interesting.',
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/3-1-300x300.d110a0.webp',
        rating: 5
      },
      {
        id: 4,
        name: 'Miriam Schwartz',
        location: 'Bnei Brak, Israel',
        content: 'Quality content that is truly built on the foundations of our holy Rabbi\'s teachings. The practical guides help me apply the teachings in my daily life.',
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/44-300x300.d110a0.webp',
        rating: 5
      }
    ],

    // Events Calendar - NEW SECTION
    eventsTitle: 'Breslov Events Calendar',
    eventsSubtitle: 'Events, lectures and gatherings around the world',
    events: [
      {
        id: 1,
        title: 'Likutei Moharan Class - Rabbi Jacob Hen',
        date: 'January 18, 2025',
        location: 'Breslov Study Hall, Jerusalem',
        type: 'Class',
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/1-1-300x300.d110a0.webp'
      },
      {
        id: 2,
        title: 'Breslov Hasidim Gathering - Rosh Chodesh Shvat',
        date: 'January 30, 2025',
        location: 'Meron, Israel',
        type: 'Gathering',
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/2-1-300x300.d110a0.webp'
      },
      {
        id: 3,
        title: 'Trip to Uman - Rosh Hashana Preparation',
        date: 'September 15, 2025',
        location: 'Uman, Ukraine',
        type: 'Travel',
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/5-1-300x300.d110a0.webp'
      },
      {
        id: 4,
        title: 'Breslov Book Distribution - Volunteer Day',
        date: 'January 25, 2025',
        location: 'My Fire Center, Jerusalem',
        type: 'Volunteer',
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/02/Untitled-design-10-1024x1024.d110a0.webp'
      }
    ],

    // Videos Section - NEW SECTION
    videosTitle: 'Videos and Lectures',
    videosSubtitle: 'In-depth lectures, classes and practical stories',
    videos: [
      {
        id: 1,
        title: 'Joy Lessons from Likutei Moharan - Rabbi Jacob Hen',
        description: 'In-depth lecture on our holy Rabbi\'s words about joy and faith',
        duration: '45:30',
        views: 15420,
        thumbnail: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/1-1-300x300.d110a0.webp'
      },
      {
        id: 2,
        title: 'Moving Story from Uman - Personal Testimony',
        description: 'Moving testimony of a Breslov Hasid about salvation received through our holy Rabbi',
        duration: '22:15',
        views: 8930,
        thumbnail: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/2-1-300x300.d110a0.webp'
      },
      {
        id: 3,
        title: 'Guide to Daily Hitbodedut',
        description: 'Practical guidance for performing hitbodedut according to Rabbi Nachman of Breslov\'s teachings',
        duration: '31:45',
        views: 12650,
        thumbnail: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/3-1-300x300.d110a0.webp'
      }
    ],

    // World News - NEW SECTION
    worldNewsTitle: 'Breslov Worldwide',
    worldNewsSubtitle: 'News and updates from Breslov communities around the world',
    worldNews: [
      {
        id: 1,
        title: 'New Breslov Center Opens in Brooklyn',
        location: 'New York, USA',
        date: 'January 10, 2025',
        summary: 'New center for Breslov Hasidim opened in Brooklyn with study hall and mikveh',
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/1-1-300x300.d110a0.webp'
      },
      {
        id: 2,
        title: 'Breslov Book Distribution in Paris',
        location: 'Paris, France',
        date: 'January 5, 2025',
        summary: 'Extensive book distribution campaign in Jewish quarter of Paris reached 500 families',
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/2-1-300x300.d110a0.webp'
      },
      {
        id: 3,
        title: 'Young Breslov Convention in London',
        location: 'London, England',
        date: 'January 2, 2025',
        summary: 'Over 300 young people participated in annual convention for spiritual strengthening and awakening',
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/3-1-300x300.d110a0.webp'
      }
    ],

    // Newsletter
    newsletterTitle: 'Join Our Mailing List',
    newsletterSubtitle: 'Get updates on new articles and foundation activities',
    newsletterDescription: 'Subscribe to receive regular updates on new content, special holiday articles, and updates on foundation activities worldwide.',
    newsletterPlaceholder: 'Enter your email address',
    newsletterButton: 'Join Now',
    newsletterSuccess: 'Thank you! You have successfully subscribed to our mailing list',

    // Statistics
    statsTitle: 'Magazine by Numbers',
    stats: [
      { number: '150+', label: 'Articles Published', icon: 'BookOpen' },
      { number: '25K+', label: 'Monthly Readers', icon: 'Users' },
      { number: '12', label: 'Languages Available', icon: 'Globe' },
      { number: '4.9', label: 'Average Rating', icon: 'Star' }
    ],

    // Content Types
    contentTypesTitle: 'Content Types in Magazine',
    contentTypes: [
      {
        title: 'Torah Articles',
        description: 'Commentaries and studies in Rabbi Nachman of Breslov\'s holy teachings',
        icon: 'BookOpen'
      },
      {
        title: 'Testimonies & Stories',
        description: 'Moving stories about salvations and spiritual experiences',
        icon: 'Heart'
      },
      {
        title: 'Practical Guides',
        description: 'Practical guidance for implementing our Rabbi\'s teachings in daily life',
        icon: 'Target'
      },
      {
        title: 'Foundation Updates',
        description: 'News and updates on foundation activities worldwide',
        icon: 'Globe'
      }
    ],

    // CTA
    ctaTitle: 'Want to Contribute to the Magazine?',
    ctaDescription: 'Do you have a story, article or testimony you\'d like to share? We\'d love to hear from you!',
    ctaButtonPrimary: 'Submit Content',
    ctaButtonSecondary: 'Contact Us',

    // Daily Quotes - NEW SECTION
    dailyQuotesTitle: 'Daily Quote from Our Holy Rabbi',
    dailyQuotesSubtitle: 'Words of encouragement and inspiration from Rabbi Nachman of Breslov\'s teachings',
    dailyQuotes: [
      {
        id: 1,
        text: 'The whole world is a very narrow bridge, but the main thing is not to fear at all',
        source: 'Likutei Moharan II, 48',
        author: 'Rabbi Nachman of Breslov'
      },
      {
        id: 2,
        text: 'There is no despair in the world at all',
        source: 'Siach Sarfey Kodesh',
        author: 'Rabbi Nachman of Breslov'
      },
      {
        id: 3,
        text: 'It is a great mitzvah to be happy always',
        source: 'Likutei Moharan II, 24',
        author: 'Rabbi Nachman of Breslov'
      },
      {
        id: 4,
        text: 'Prayer is above every level',
        source: 'Likutei Moharan I, 2',
        author: 'Rabbi Nachman of Breslov'
      },
      {
        id: 5,
        text: 'A person must cross a very narrow bridge, but the rule is not to fear at all',
        source: 'Likutei Moharan II, 48',
        author: 'Rabbi Nachman of Breslov'
      }
    ],

    // Testimonials - NEW SECTION
    testimonialsTitle: 'Reader Testimonials',
    testimonialsSubtitle: 'How our magazine impacts readers\' lives around the world',
    testimonials: [
      {
        id: 1,
        name: 'Jacob Levy',
        location: 'Jerusalem, Israel',
        content: 'This magazine changed my life. Every article brings me new strength and inspiration. I especially loved the article about hitbodedut - it helped me truly connect to prayer.',
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/1-1-300x300.d110a0.webp',
        rating: 5
      },
      {
        id: 2,
        name: 'Sarah Cohen',
        location: 'Tel Aviv, Israel',
        content: 'I\'ve been reading for two years and never stop being moved by the content. The Breslov stories from around the world give me strength and faith that Hashem always watches over us.',
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/2-1-300x300.d110a0.webp',
        rating: 5
      },
      {
        id: 3,
        name: 'Abraham Goldberg',
        location: 'New York, USA',
        content: 'The magazine connects me to the Breslov community worldwide. The daily quotes help me start each day with inspiration, and the articles are deep and interesting.',
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/3-1-300x300.d110a0.webp',
        rating: 5
      },
      {
        id: 4,
        name: 'Miriam Schwartz',
        location: 'Bnei Brak, Israel',
        content: 'Quality content truly based on the foundations of our holy Rabbi\'s teachings. The practical guides help me implement the teachings in my daily life.',
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/44-300x300.d110a0.webp',
        rating: 5
      }
    ],

    // Events Calendar - NEW SECTION
    eventsTitle: 'Breslov Events Calendar',
    eventsSubtitle: 'Events, classes and gatherings worldwide',
    events: [
      {
        id: 1,
        title: 'Likutei Moharan Class - Rabbi Yaakov Hen',
        date: 'January 18, 2025',
        location: 'Breslov Study Hall, Jerusalem',
        type: 'Class',
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/1-1-300x300.d110a0.webp'
      },
      {
        id: 2,
        title: 'Breslov Hasidim Gathering - Rosh Chodesh Shvat',
        date: 'January 30, 2025',
        location: 'Meron, Israel',
        type: 'Gathering',
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/2-1-300x300.d110a0.webp'
      },
      {
        id: 3,
        title: 'Trip to Uman - Rosh Hashana Preparation',
        date: 'September 15, 2025',
        location: 'Uman, Ukraine',
        type: 'Trip',
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/5-1-300x300.d110a0.webp'
      },
      {
        id: 4,
        title: 'Breslov Books Distribution - Volunteer Day',
        date: 'January 25, 2025',
        location: 'My Fire Center, Jerusalem',
        type: 'Volunteer',
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/02/Untitled-design-10-1024x1024.d110a0.webp'
      }
    ],

    // Videos Section - NEW SECTION
    videosTitle: 'Videos and Lectures',
    videosSubtitle: 'Deep lectures, classes and practical stories',
    videos: [
      {
        id: 1,
        title: 'Joy Advice from Likutei Moharan - Rabbi Yaakov Hen',
        description: 'Deep lecture on our holy Rabbi\'s words about joy and faith',
        duration: '45:30',
        views: 15420,
        thumbnail: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/1-1-300x300.d110a0.webp'
      },
      {
        id: 2,
        title: 'Moving Story from Uman - Personal Testimony',
        description: 'Moving testimony of a Breslov Hasid about salvation received through our holy Rabbi\'s merit',
        duration: '22:15',
        views: 8930,
        thumbnail: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/2-1-300x300.d110a0.webp'
      },
      {
        id: 3,
        title: 'Guide to Daily Hitbodedut',
        description: 'Practical guidance for performing hitbodedut according to Rabbi Nachman of Breslov\'s teachings',
        duration: '31:45',
        views: 12650,
        thumbnail: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/3-1-300x300.d110a0.webp'
      }
    ],

    // World News - NEW SECTION
    worldNewsTitle: 'Breslov Around the World',
    worldNewsSubtitle: 'News and updates from Breslov communities worldwide',
    worldNews: [
      {
        id: 1,
        title: 'New Breslov Center Established in Brooklyn',
        location: 'New York, USA',
        date: 'January 10, 2025',
        summary: 'New center for Breslov Hasidim opened in Brooklyn with study hall and mikveh',
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/1-1-300x300.d110a0.webp'
      },
      {
        id: 2,
        title: 'Breslov Books Distribution in Paris',
        location: 'Paris, France',
        date: 'January 5, 2025',
        summary: 'Extensive book distribution campaign in Jewish quarter of Paris reached 500 families',
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/2-1-300x300.d110a0.webp'
      },
      {
        id: 3,
        title: 'Young Breslov Convention in London',
        location: 'London, England',
        date: 'January 2, 2025',
        summary: 'Over 300 young people participated in annual convention for spiritual strengthening and awakening',
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/3-1-300x300.d110a0.webp'
      }
    ],

    // Interactive Features - NEW SECTION
    interactiveTitle: 'Interactive Tools',
    bookmarkText: 'Add to Favorites',
    shareText: 'Share Article',
    downloadText: 'Download PDF',
    printText: 'Print',
    relatedArticles: 'Related Articles',
    popularTags: 'Popular Tags',

    // Common
    readMore: 'Read More',
    readTime: 'read time',
    views: 'views',
    author: 'by',
    searchPlaceholder: 'Search magazine...',
    filterBy: 'Filter by',
    allCategories: 'All Categories',
    sortBy: 'Sort by',
    newest: 'Newest',
    popular: 'Most Popular',
    watchVideo: 'Watch Video',
    readTestimonial: 'Read Testimony',
    viewEvent: 'Event Details',
    subscribeNewsletter: 'Subscribe to Updates',
  },

  fr: {
    // SEO
    title: 'Magazine Mon Feu | Torah, Spiritualité et Actualités du Monde Breslov',
    description: 'Magazine spirituel dédié aux enseignements du Rabbi Nachman de Breslov. Articles profonds, témoignages émouvants et actualités des activités de la fondation.',

    // Hero Section
    heroTitle: 'Magazine Mon Feu',
    heroSubtitle: 'Torah, Spiritualité et Actualités du Monde Breslov',
    heroDescription: 'Un magazine spirituel unique dédié aux enseignements et à la voie du Rabbi Nachman de Breslov. Ici vous trouverez des articles profonds, des témoignages émouvants du monde entier, et des actualités sur les activités de la fondation pour diffuser les livres de notre saint Rabbi.',

    // Categories
    categoriesTitle: 'Catégories',
    categories: [
      { name: 'Torah & Spiritualité', count: 45, icon: 'BookOpen' },
      { name: 'Breslov dans le Monde', count: 32, icon: 'Globe' },
      { name: 'Actualités Fondation', count: 28, icon: 'Award' },
      { name: 'Fêtes & Festivals', count: 15, icon: 'Calendar' },
      { name: 'Histoires', count: 22, icon: 'Heart' },
      { name: 'Q&R', count: 18, icon: 'MessageCircle' }
    ],

    // Featured Articles
    featuredTitle: 'Articles en Vedette',
    featuredSubtitle: 'Nos articles les plus lus et les plus impactants',

    // Latest Articles
    latestTitle: 'Derniers Articles',
    latestSubtitle: 'Notre contenu le plus récent',

    // Newsletter
    newsletterTitle: 'Rejoignez Notre Liste de Diffusion',
    newsletterSubtitle: 'Recevez des mises à jour sur les nouveaux articles et les activités de la fondation',
    newsletterDescription: 'Abonnez-vous pour recevoir des mises à jour régulières sur le nouveau contenu, des articles spéciaux pour les fêtes, et des actualités sur les activités de la fondation dans le monde.',
    newsletterPlaceholder: 'Entrez votre adresse email',
    newsletterButton: 'Rejoignez Maintenant',
    newsletterSuccess: 'Merci ! Vous vous êtes inscrit avec succès à notre liste de diffusion',

    // Statistics
    statsTitle: 'Le Magazine en Chiffres',
    stats: [
      { number: '150+', label: 'Articles Publiés', icon: 'BookOpen' },
      { number: '25K+', label: 'Lecteurs Mensuels', icon: 'Users' },
      { number: '12', label: 'Langues Disponibles', icon: 'Globe' },
      { number: '4.9', label: 'Note Moyenne', icon: 'Star' }
    ],

    // Content Types
    contentTypesTitle: 'Types de Contenu dans le Magazine',
    contentTypes: [
      {
        title: 'Articles de Torah',
        description: 'Commentaires et études des saints enseignements du Rabbi Nachman de Breslov',
        icon: 'BookOpen'
      },
      {
        title: 'Témoignages & Histoires',
        description: 'Histoires émouvantes sur les saluts et expériences spirituelles',
        icon: 'Heart'
      },
      {
        title: 'Guides Pratiques',
        description: 'Guidance pratique pour mettre en œuvre les enseignements de notre Rabbi dans la vie quotidienne',
        icon: 'Target'
      },
      {
        title: 'Actualités Fondation',
        description: 'Nouvelles et mises à jour sur les activités de la fondation dans le monde',
        icon: 'Globe'
      }
    ],

    // CTA
    ctaTitle: 'Voulez-vous Contribuer au Magazine?',
    ctaDescription: 'Avez-vous une histoire, un article ou un témoignage que vous aimeriez partager? Nous aimerions vous entendre!',
    ctaButtonPrimary: 'Soumettre du Contenu',
    ctaButtonSecondary: 'Nous Contacter',

    // Common
    readMore: 'Lire Plus',
    readTime: 'temps de lecture',
    views: 'vues',
    author: 'par',
    searchPlaceholder: 'Rechercher dans le magazine...',
    filterBy: 'Filtrer par',
    allCategories: 'Toutes les Catégories',
    sortBy: 'Trier par',
    newest: 'Plus Récent',
    popular: 'Plus Populaire',

    // Daily Quotes - NOUVELLE SECTION
    dailyQuotesTitle: 'Citation Quotidienne de Notre Saint Rabbi',
    dailyQuotesSubtitle: 'Paroles d\'encouragement et d\'inspiration des enseignements du Rabbi Nachman de Breslov',
    dailyQuotes: [
      {
        id: 1,
        text: 'Le monde entier est un pont très étroit, mais l\'essentiel est de ne pas avoir peur du tout',
        source: 'Likoutei Moharan II, 48',
        author: 'Rabbi Nachman de Breslov'
      },
      {
        id: 2,
        text: 'Il n\'y a aucun désespoir au monde du tout',
        source: 'Siach Sarfey Kodesh',
        author: 'Rabbi Nachman de Breslov'
      },
      {
        id: 3,
        text: 'C\'est une grande mitzvah d\'être toujours joyeux',
        source: 'Likoutei Moharan II, 24',
        author: 'Rabbi Nachman de Breslov'
      },
      {
        id: 4,
        text: 'La prière est au-dessus de tout niveau',
        source: 'Likoutei Moharan I, 2',
        author: 'Rabbi Nachman de Breslov'
      },
      {
        id: 5,
        text: 'Une personne doit traverser un pont très étroit, mais la règle est de ne pas avoir peur du tout',
        source: 'Likoutei Moharan II, 48',
        author: 'Rabbi Nachman de Breslov'
      }
    ],

    // Témoignages - NOUVELLE SECTION
    testimonialsTitle: 'Témoignages des Lecteurs',
    testimonialsSubtitle: 'Comment notre magazine impacte la vie des lecteurs à travers le monde',
    testimonials: [
      {
        id: 1,
        name: 'Jacques Lévy',
        location: 'Jérusalem, Israël',
        content: 'Ce magazine a changé ma vie. Chaque article m\'apporte une nouvelle force et inspiration. J\'ai particulièrement aimé l\'article sur la hitbodedout - cela m\'a aidé à vraiment me connecter à la prière.',
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/1-1-300x300.d110a0.webp',
        rating: 5
      },
      {
        id: 2,
        name: 'Sarah Cohen',
        location: 'Tel Aviv, Israël',
        content: 'Je lis depuis deux ans et ne cesse jamais d\'être émue par le contenu. Les histoires de Breslov du monde entier me donnent force et foi que Hachem veille toujours sur nous.',
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/2-1-300x300.d110a0.webp',
        rating: 5
      },
      {
        id: 3,
        name: 'Abraham Goldberg',
        location: 'New York, États-Unis',
        content: 'Le magazine me connecte à la communauté Breslov mondiale. Les citations quotidiennes m\'aident à commencer chaque journée avec inspiration, et les articles sont profonds et intéressants.',
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/3-1-300x300.d110a0.webp',
        rating: 5
      },
      {
        id: 4,
        name: 'Miriam Schwartz',
        location: 'Bnei Brak, Israël',
        content: 'Contenu de qualité vraiment basé sur les fondements des enseignements de notre saint Rabbi. Les guides pratiques m\'aident à mettre en œuvre les enseignements dans ma vie quotidienne.',
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/44-300x300.d110a0.webp',
        rating: 5
      }
    ],

    // Calendrier d\'Événements - NOUVELLE SECTION
    eventsTitle: 'Calendrier des Événements Breslov',
    eventsSubtitle: 'Événements, cours et rassemblements à travers le monde',
    events: [
      {
        id: 1,
        title: 'Cours Likoutei Moharan - Rabbi Yaakov Hen',
        date: '18 janvier 2025',
        location: 'Salle d\'Étude Breslov, Jérusalem',
        type: 'Cours',
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/1-1-300x300.d110a0.webp'
      },
      {
        id: 2,
        title: 'Rassemblement Hassidim Breslov - Rosh Hodesh Shvat',
        date: '30 janvier 2025',
        location: 'Meron, Israël',
        type: 'Rassemblement',
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/2-1-300x300.d110a0.webp'
      },
      {
        id: 3,
        title: 'Voyage à Ouman - Préparation Rosh Hashana',
        date: '15 septembre 2025',
        location: 'Ouman, Ukraine',
        type: 'Voyage',
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/5-1-300x300.d110a0.webp'
      },
      {
        id: 4,
        title: 'Distribution de Livres Breslov - Journée Bénévolat',
        date: '25 janvier 2025',
        location: 'Centre Mon Feu, Jérusalem',
        type: 'Bénévolat',
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/02/Untitled-design-10-1024x1024.d110a0.webp'
      }
    ],

    // Section Vidéos - NOUVELLE SECTION
    videosTitle: 'Vidéos et Conférences',
    videosSubtitle: 'Conférences profondes, cours et histoires pratiques',
    videos: [
      {
        id: 1,
        title: 'Conseils de Joie du Likoutei Moharan - Rabbi Yaakov Hen',
        description: 'Conférence profonde sur les paroles de notre saint Rabbi concernant la joie et la foi',
        duration: '45:30',
        views: 15420,
        thumbnail: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/1-1-300x300.d110a0.webp'
      },
      {
        id: 2,
        title: 'Histoire Émouvante d\'Ouman - Témoignage Personnel',
        description: 'Témoignage émouvant d\'un Hassid Breslov sur un salut reçu grâce au mérite de notre saint Rabbi',
        duration: '22:15',
        views: 8930,
        thumbnail: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/2-1-300x300.d110a0.webp'
      },
      {
        id: 3,
        title: 'Guide pour la Hitbodedout Quotidienne',
        description: 'Guidance pratique pour effectuer la hitbodedout selon les enseignements du Rabbi Nachman de Breslov',
        duration: '31:45',
        views: 12650,
        thumbnail: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/3-1-300x300.d110a0.webp'
      }
    ],

    // Nouvelles du Monde - NOUVELLE SECTION
    worldNewsTitle: 'Breslov à Travers le Monde',
    worldNewsSubtitle: 'Nouvelles et mises à jour des communautés Breslov mondiales',
    worldNews: [
      {
        id: 1,
        title: 'Nouveau Centre Breslov Établi à Brooklyn',
        location: 'New York, États-Unis',
        date: '10 janvier 2025',
        summary: 'Nouveau centre pour les Hassidim Breslov ouvert à Brooklyn avec salle d\'étude et mikvé',
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/1-1-300x300.d110a0.webp'
      },
      {
        id: 2,
        title: 'Distribution de Livres Breslov à Paris',
        location: 'Paris, France',
        date: '5 janvier 2025',
        summary: 'Vaste campagne de distribution de livres dans le quartier juif de Paris a atteint 500 familles',
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/2-1-300x300.d110a0.webp'
      },
      {
        id: 3,
        title: 'Convention de Jeunes Breslov à Londres',
        location: 'Londres, Angleterre',
        date: '2 janvier 2025',
        summary: 'Plus de 300 jeunes ont participé à la convention annuelle pour renforcement et réveil spirituel',
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/3-1-300x300.d110a0.webp'
      }
    ],

    // Fonctionnalités Interactives - NOUVELLE SECTION
    interactiveTitle: 'Outils Interactifs',
    bookmarkText: 'Ajouter aux Favoris',
    shareText: 'Partager l\'Article',
    downloadText: 'Télécharger PDF',
    printText: 'Imprimer',
    relatedArticles: 'Articles Connexes',
    popularTags: 'Tags Populaires',

    // Common
    watchVideo: 'Regarder la Vidéo',
    readTestimonial: 'Lire le Témoignage',
    viewEvent: 'Détails de l\'Événement',
    subscribeNewsletter: 'S\'abonner aux Mises à Jour'
  },

  es: {
    // SEO
    title: 'Revista Mi Fuego | Torá, Espiritualidad y Noticias del Mundo Breslov',
    description: 'Revista espiritual dedicada a las enseñanzas del Rabino Nachman de Breslov. Artículos profundos, testimonios conmovedores y noticias de las actividades de la fundación.',

    // Hero Section
    heroTitle: 'Revista Mi Fuego',
    heroSubtitle: 'Torá, Espiritualidad y Noticias del Mundo Breslov',
    heroDescription: 'Una revista espiritual única dedicada a las enseñanzas y el camino del Rabino Nachman de Breslov. Aquí encontrarás artículos profundos, testimonios conmovedores de todo el mundo, y noticias sobre las actividades de la fundación para difundir los libros de nuestro santo Rabino.',

    // Categories
    categoriesTitle: 'Categorías',
    categories: [
      { name: 'Torá & Espiritualidad', count: 45, icon: 'BookOpen' },
      { name: 'Breslov en el Mundo', count: 32, icon: 'Globe' },
      { name: 'Noticias Fundación', count: 28, icon: 'Award' },
      { name: 'Fiestas & Festivales', count: 15, icon: 'Calendar' },
      { name: 'Historias', count: 22, icon: 'Heart' },
      { name: 'P&R', count: 18, icon: 'MessageCircle' }
    ],

    // Featured Articles
    featuredTitle: 'Artículos Destacados',
    featuredSubtitle: 'Nuestros artículos más leídos e impactantes',

    // Latest Articles
    latestTitle: 'Últimos Artículos',
    latestSubtitle: 'Nuestro contenido más reciente',

    // Newsletter
    newsletterTitle: 'Únete a Nuestra Lista de Correo',
    newsletterSubtitle: 'Recibe actualizaciones sobre nuevos artículos y actividades de la fundación',
    newsletterDescription: 'Suscríbete para recibir actualizaciones regulares sobre contenido nuevo, artículos especiales para fiestas, y noticias sobre actividades de la fundación en todo el mundo.',
    newsletterPlaceholder: 'Ingresa tu dirección de email',
    newsletterButton: 'Únete Ahora',
    newsletterSuccess: '¡Gracias! Te has suscrito exitosamente a nuestra lista de correo',

    // Statistics
    statsTitle: 'La Revista en Números',
    stats: [
      { number: '150+', label: 'Artículos Publicados', icon: 'BookOpen' },
      { number: '25K+', label: 'Lectores Mensuales', icon: 'Users' },
      { number: '25K+', label: 'Idiomas Disponibles', icon: 'Globe' },
      { number: '4.9', label: 'Calificación Promedio', icon: 'Star' }
    ],

    // Content Types
    contentTypesTitle: 'Tipos de Contenido en la Revista',
    contentTypes: [
      {
        title: 'Artículos de Torá',
        description: 'Comentarios y estudios de las santas enseñanzas del Rabino Nachman de Breslov',
        icon: 'BookOpen'
      },
      {
        title: 'Testimonios & Historias',
        description: 'Historias conmovedoras sobre salvaciones y experiencias espirituales',
        icon: 'Heart'
      },
      {
        title: 'Guías Prácticas',
        description: 'Orientación práctica para implementar las enseñanzas de nuestro Rabino en la vida diaria',
        icon: 'Target'
      },
      {
        title: 'Noticias Fundación',
        description: 'Noticias y actualizaciones sobre actividades de la fundación en todo el mundo',
        icon: 'Globe'
      }
    ],

    // CTA
    ctaTitle: '¿Quieres Contribuir a la Revista?',
    ctaDescription: '¿Tienes una historia, artículo o testimonio que te gustaría compartir? ¡Nos encantaría escucharte!',
    ctaButtonPrimary: 'Enviar Contenido',
    ctaButtonSecondary: 'Contáctanos',

    // Articles Data
    articles: [],

    // Daily Quotes
    dailyQuotesTitle: 'Cita Diaria de Nuestro Santo Rabino',
    dailyQuotesSubtitle: 'Palabras de aliento e inspiración de las enseñanzas del Rabino Nachman de Breslov',
    dailyQuotes: [],

    // Testimonials
    testimonialsTitle: 'Testimonios de Lectores',
    testimonialsSubtitle: 'Cómo nuestra revista impacta las vidas de lectores en todo el mundo',
    testimonials: [],

    // Events Calendar
    eventsTitle: 'Calendario de Eventos Breslov',
    eventsSubtitle: 'Eventos, conferencias y reuniones en todo el mundo',
    events: [],

    // Videos Section
    videosTitle: 'Videos y Conferencias',
    videosSubtitle: 'Conferencias profundas, clases e historias prácticas',
    videos: [],

    // World News
    worldNewsTitle: 'Breslov en el Mundo',
    worldNewsSubtitle: 'Noticias y actualizaciones de comunidades Breslov en todo el mundo',
    worldNews: [],

    // Interactive Features
    interactiveTitle: 'Herramientas Interactivas',
    bookmarkText: 'Agregar a Favoritos',
    shareText: 'Compartir Artículo',
    downloadText: 'Descargar PDF',
    printText: 'Imprimir',
    relatedArticles: 'Artículos Relacionados',
    popularTags: 'Tags Populares',

    // Common
    readMore: 'Leer Más',
    readTime: 'tiempo de lectura',
    views: 'vistas',
    author: 'por',
    searchPlaceholder: 'Buscar en la revista...',
    filterBy: 'Filtrar por',
    allCategories: 'Todas las Categorías',
    sortBy: 'Ordenar por',
    newest: 'Más Reciente',
    popular: 'Más Popular',
    watchVideo: 'Ver Video',
    readTestimonial: 'Leer Testimonio',
    viewEvent: 'Detalles del Evento',
    subscribeNewsletter: 'Suscribirse a Actualizaciones'
  },

  ru: {
    // SEO
    title: 'Журнал Мой Огонь | Тора, Духовность и Новости из Мира Бреслов',
    description: 'Духовный журнал, посвященный учениям Рабби Нахмана из Бреслов. Глубокие статьи, трогательные свидетельства и новости о деятельности фонда.',

    // Hero Section
    heroTitle: 'Журнал Мой Огонь',
    heroSubtitle: 'Тора, Духовность и Новости из Мира Бреслов',
    heroDescription: 'Уникальный духовный журнал, посвященный учениям и пути Рабби Нахмана из Бреслов. Здесь вы найдете глубокие статьи, трогательные свидетельства со всего мира и новости о деятельности фонда по распространению книг нашего святого Рабби.',

    // Categories
    categoriesTitle: 'Категории',
    categories: [
      { name: 'Тора & Духовность', count: 45, icon: 'BookOpen' },
      { name: 'Бреслов в Мире', count: 32, icon: 'Globe' },
      { name: 'Новости Фонда', count: 28, icon: 'Award' },
      { name: 'Праздники & Фестивали', count: 15, icon: 'Calendar' },
      { name: 'Истории', count: 22, icon: 'Heart' },
      { name: 'В&О', count: 18, icon: 'MessageCircle' }
    ],

    // Featured Articles
    featuredTitle: 'Рекомендуемые Статьи',
    featuredSubtitle: 'Наши самые читаемые и влиятельные статьи',

    // Latest Articles
    latestTitle: 'Последние Статьи',
    latestSubtitle: 'Наш самый новый контент',

    // Newsletter
    newsletterTitle: 'Присоединяйтесь к Нашему Списку Рассылки',
    newsletterSubtitle: 'Получайте обновления о новых статьях и деятельности фонда',
    newsletterDescription: 'Подпишитесь, чтобы получать регулярные обновления о новом контенте, специальных статьях к праздникам и новостях о деятельности фонда по всему миру.',
    newsletterPlaceholder: 'Введите ваш email адрес',
    newsletterButton: 'Присоединиться Сейчас',
    newsletterSuccess: 'Спасибо! Вы успешно подписались на нашу рассылку',

    // Statistics
    statsTitle: 'Журнал в Цифрах',
    stats: [
      { number: '150+', label: 'Опубликованных Статей', icon: 'BookOpen' },
      { number: '25K+', label: 'Ежемесячных Читателей', icon: 'Users' },
      { number: '12', label: 'Доступных Языков', icon: 'Globe' },
      { number: '4.9', label: 'Средний Рейтинг', icon: 'Star' }
    ],

    // Content Types
    contentTypesTitle: 'Типы Контента в Журнале',
    contentTypes: [
      {
        title: 'Статьи Торы',
        description: 'Комментарии и изучение святых учений Рабби Нахмана из Бреслов',
        icon: 'BookOpen'
      },
      {
        title: 'Свидетельства & Истории',
        description: 'Трогательные истории о спасениях и духовных переживаниях',
        icon: 'Heart'
      },
      {
        title: 'Практические Руководства',
        description: 'Практическое руководство по применению учений нашего Рабби в повседневной жизни',
        icon: 'Target'
      },
      {
        title: 'Новости Фонда',
        description: 'Новости и обновления о деятельности фонда по всему миру',
        icon: 'Globe'
      }
    ],

    // CTA
    ctaTitle: 'Хотите Внести Вклад в Журнал?',
    ctaDescription: 'У вас есть история, статья или свидетельство, которыми вы хотели бы поделиться? Мы будем рады услышать от вас!',
    ctaButtonPrimary: 'Отправить Контент',
    ctaButtonSecondary: 'Связаться с Нами',

    // Common
    readMore: 'Читать Далее',
    readTime: 'время чтения',
    views: 'просмотры',
    author: 'автор',
    searchPlaceholder: 'Поиск в журнале...',
    filterBy: 'Фильтровать по',
    allCategories: 'Все Категории',
    sortBy: 'Сортировать по',
    newest: 'Новейшие',
    popular: 'Самые Популярные',

    // Ежедневные Цитаты - НОВАЯ СЕКЦИЯ
    dailyQuotesTitle: 'Ежедневная Цитата от Нашего Святого Рабби',
    dailyQuotesSubtitle: 'Слова ободрения и вдохновения из учений Рабби Нахмана из Бреслов',
    dailyQuotes: [
      {
        id: 1,
        text: 'Весь мир - очень узкий мост, но главное - вообще не бояться',
        source: 'Ликутей Мохаран II, 48',
        author: 'Рабби Нахман из Бреслов'
      },
      {
        id: 2,
        text: 'Нет никакого отчаяния в мире вообще',
        source: 'Сиах Сарфей Кодеш',
        author: 'Рабби Нахман из Бреслов'
      },
      {
        id: 3,
        text: 'Великая заповедь - быть всегда в радости',
        source: 'Ликутей Мохаран II, 24',
        author: 'Рабби Нахман из Бреслов'
      },
      {
        id: 4,
        text: 'Молитва выше любого уровня',
        source: 'Ликутей Мохаран I, 2',
        author: 'Рабби Нахман из Бреслов'
      },
      {
        id: 5,
        text: 'Человек должен пройти по очень узкому мосту, но правило - не бояться вообще',
        source: 'Ликутей Мохаран II, 48',
        author: 'Рабби Нахман из Бреслов'
      }
    ],

    // Отзывы - НОВАЯ СЕКЦИЯ
    testimonialsTitle: 'Отзывы Читателей',
    testimonialsSubtitle: 'Как наш журнал влияет на жизни читателей по всему миру',
    testimonials: [
      {
        id: 1,
        name: 'Яков Леви',
        location: 'Иерусалим, Израиль',
        content: 'Этот журнал изменил мою жизнь. Каждая статья приносит мне новую силу и вдохновение. Особенно понравилась статья о hitbodedut - она помогла мне по-настоящему связаться с молитвой.',
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/1-1-300x300.d110a0.webp',
        rating: 5
      },
      {
        id: 2,
        name: 'Сара Коэн',
        location: 'Тель-Авив, Израиль',
        content: 'Читаю уже два года и не перестаю трогаться содержанием. Истории Бреслов со всего мира дают мне силу и веру, что Всевышний всегда следит за нами.',
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/2-1-300x300.d110a0.webp',
        rating: 5
      },
      {
        id: 3,
        name: 'Авраам Гольдберг',
        location: 'Нью-Йорк, США',
        content: 'Журнал соединяет меня с мировым сообществом Бреслов. Ежедневные цитаты помогают мне начинать каждый день с вдохновения, а статьи глубокие и интересные.',
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/3-1-300x300.d110a0.webp',
        rating: 5
      },
      {
        id: 4,
        name: 'Мириам Шварц',
        location: 'Бней-Брак, Израиль',
        content: 'Качественное содержание, действительно основанное на основах учений нашего святого Рабби. Практические руководства помогают мне применять учения в повседневной жизни.',
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/44-300x300.d110a0.webp',
        rating: 5
      }
    ],

    // Календарь Событий - НОВАЯ СЕКЦИЯ
    eventsTitle: 'Календарь Событий Бреслов',
    eventsSubtitle: 'События, уроки и собрания по всему миру',
    events: [
      {
        id: 1,
        title: 'Урок Ликутей Мохаран - Рабби Яков Хен',
        date: '18 января 2025',
        location: 'Зал изучения Бреслов, Иерусалим',
        type: 'Урок',
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/1-1-300x300.d110a0.webp'
      },
      {
        id: 2,
        title: 'Собрание Хасидов Бреслов - Рош Ходеш Шват',
        date: '30 января 2025',
        location: 'Мерон, Израиль',
        type: 'Собрание',
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/2-1-300x300.d110a0.webp'
      },
      {
        id: 3,
        title: 'Поездка в Умань - Подготовка к Рош аШана',
        date: '15 сентября 2025',
        location: 'Умань, Украина',
        type: 'Поездка',
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/5-1-300x300.d110a0.webp'
      },
      {
        id: 4,
        title: 'Распространение Книг Бреслов - День Волонтеров',
        date: '25 января 2025',
        location: 'Центр Мой Огонь, Иерусалим',
        type: 'Волонтерство',
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/02/Untitled-design-10-1024x1024.d110a0.webp'
      }
    ],

    // Раздел Видео - НОВАЯ СЕКЦИЯ
    videosTitle: 'Видео и Лекции',
    videosSubtitle: 'Глубокие лекции, уроки и практические истории',
    videos: [
      {
        id: 1,
        title: 'Советы для Радости из Ликутей Мохаран - Рабби Яков Хен',
        description: 'Глубокая лекция о словах нашего святого Рабби о радости и вере',
        duration: '45:30',
        views: 15420,
        thumbnail: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/1-1-300x300.d110a0.webp'
      },
      {
        id: 2,
        title: 'Трогательная История из Умани - Личное Свидетельство',
        description: 'Трогательное свидетельство хасида Бреслов о спасении, полученном заслугой нашего святого Рабби',
        duration: '22:15',
        views: 8930,
        thumbnail: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/2-1-300x300.d110a0.webp'
      },
      {
        id: 3,
        title: 'Руководство по Ежедневной Hitbodedut',
        description: 'Практическое руководство по выполнению hitbodedut согласно учениям Рабби Нахмана из Бреслов',
        duration: '31:45',
        views: 12650,
        thumbnail: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/3-1-300x300.d110a0.webp'
      }
    ],

    // Мировые Новости - НОВАЯ СЕКЦИЯ
    worldNewsTitle: 'Бреслов по Всему Миру',
    worldNewsSubtitle: 'Новости и обновления от сообществ Бреслов по всему миру',
    worldNews: [
      {
        id: 1,
        title: 'Новый Центр Бреслов Основан в Бруклине',
        location: 'Нью-Йорк, США',
        date: '10 января 2025',
        summary: 'Новый центр для хасидов Бреслов открылся в Бруклине с залом для изучения и микве',
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/1-1-300x300.d110a0.webp'
      },
      {
        id: 2,
        title: 'Распространение Книг Бреслов в Париже',
        location: 'Париж, Франция',
        date: '5 января 2025',
        summary: 'Обширная кампания по распространению книг в еврейском квартале Парижа достигла 500 семей',
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/2-1-300x300.d110a0.webp'
      },
      {
        id: 3,
        title: 'Конвенция Молодых Бреслов в Лондоне',
        location: 'Лондон, Англия',
        date: '2 января 2025',
        summary: 'Более 300 молодых людей приняли участие в ежегодной конвенции для духовного укрепления и пробуждения',
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/03/3-1-300x300.d110a0.webp'
      }
    ],

    // Интерактивные Функции - НОВАЯ СЕКЦИЯ
    interactiveTitle: 'Интерактивные Инструменты',
    bookmarkText: 'Добавить в Избранное',
    shareText: 'Поделиться Статьей',
    downloadText: 'Скачать PDF',
    printText: 'Печать',
    relatedArticles: 'Связанные Статьи',
    popularTags: 'Популярные Теги',

    // Общие
    watchVideo: 'Смотреть Видео',
    readTestimonial: 'Читать Отзыв',
    viewEvent: 'Детали События',
    subscribeNewsletter: 'Подписаться на Обновления'
  }
};

// Icon mapping component
const iconMap = {
  BookOpen,
  Calendar,
  Clock,
  User,
  Search,
  Tag,
  TrendingUp,
  Heart,
  Eye,
  Share2,
  ArrowRight,
  Mail,
  Star,
  Filter,
  ChevronRight,
  Globe,
  Award,
  Target,
  MessageCircle,
  Users
} as const;

type IconKey = keyof typeof iconMap;

const IconComponent = ({ iconName, className = "w-6 h-6" }: { iconName: string, className?: string }) => {
  const Icon = iconMap[iconName as IconKey] ?? BookOpen;
  return <Icon className={className} aria-hidden />;
};

export default function Magazine() {
  const { currentLanguage, setLanguage } = useLanguage();
  const t = translations[currentLanguage as keyof typeof translations] || translations.he;
  const isRTL = currentLanguage === 'he';
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [emailSubscription, setEmailSubscription] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState('');

  // Set document title and meta description
  useEffect(() => {
    document.title = t.title;
    
    // Set meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', t.description);
  }, [t.title, t.description]);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscriptionStatus('success');
    setEmailSubscription('');
    setTimeout(() => setSubscriptionStatus(''), 5000);
  };

  // Filter and sort articles
  const filteredArticles = t.articles
    .filter((article: Article) => 
      (selectedCategory === '' || article.category === selectedCategory) &&
      (searchTerm === '' || 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    )
    .sort((a: Article, b: Article) => {
      if (sortBy === 'popular') return b.views - a.views;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  const featuredArticles = filteredArticles.filter((article: Article) => article.featured);
  const latestArticles = filteredArticles.filter((article: Article) => !article.featured);

  return (
    <div className="min-h-screen bg-background" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
      <Header currentLanguage={currentLanguage} onLanguageChange={setLanguage} />
      
      {/* Hero Section */}
      <section className="hero-gradient relative overflow-hidden py-20 lg:py-32" data-testid="hero-section">
        <div className="hero-overlay absolute inset-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-scale">
            <h1 className="heading-oversized mb-6 text-primary" data-testid="hero-title">
              {t.heroTitle}
            </h1>
            <p className="text-large text-muted-foreground mb-8 max-w-2xl mx-auto" data-testid="hero-subtitle">
              {t.heroSubtitle}
            </p>
            <p className="text-lg text-foreground/80 mb-12 max-w-3xl mx-auto leading-relaxed" data-testid="hero-description">
              {t.heroDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-secondary/20" data-testid="search-section">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-4 justify-center items-center">
              <div className="relative flex-1 max-w-lg">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                  data-testid="search-input"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-border rounded-xl bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                data-testid="category-filter"
              >
                <option value="">{t.allCategories}</option>
                {t.categories.map((category, index) => (
                  <option key={index} value={category.name}>{category.name}</option>
                ))}
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-border rounded-xl bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                data-testid="sort-filter"
              >
                <option value="newest">{t.newest}</option>
                <option value="popular">{t.popular}</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-background" data-testid="categories-section">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-primary mb-12 text-center" data-testid="categories-title">
              {t.categoriesTitle}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {t.categories.map((category, index) => (
                <div 
                  key={index}
                  onClick={() => setSelectedCategory(selectedCategory === category.name ? '' : category.name)}
                  className={`card-premium p-6 text-center cursor-pointer transition-all duration-500 group ${
                    selectedCategory === category.name ? 'ring-2 ring-primary bg-primary/5 scale-105 shadow-xl' : 'hover:shadow-2xl hover:scale-110 hover:-translate-y-4 hover:rotate-2'
                  }`}
                  data-testid={`category-${index}`}
                >
                  <div className="mb-4 flex justify-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-125 group-hover:bg-blue-500 group-hover:shadow-xl group-hover:rotate-12">
                      <IconComponent iconName={category.icon} className="w-6 h-6 text-primary transition-all duration-300 group-hover:text-white group-hover:scale-125" />
                    </div>
                  </div>
                  <h3 className="text-sm font-semibold text-foreground mb-2 transition-all duration-300 group-hover:text-blue-600 group-hover:scale-110 group-hover:font-bold" data-testid={`category-name-${index}`}>
                    {category.name}
                  </h3>
                  <span className="text-xs text-muted-foreground transition-all duration-300 group-hover:text-green-600 group-hover:scale-105 group-hover:font-semibold" data-testid={`category-count-${index}`}>
                    {category.count} מאמרים
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="py-20 bg-secondary/20" data-testid="featured-section">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6" data-testid="featured-title">
                  {t.featuredTitle}
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="featured-subtitle">
                  {t.featuredSubtitle}
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featuredArticles.slice(0, 4).map((article: Article, index: number) => (
                  <article 
                    key={article.id}
                    className="card-premium overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-4 hover:rotate-1 cursor-pointer"
                    data-testid={`featured-article-${index}`}
                  >
                    <div className="relative overflow-hidden">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-48 object-cover group-hover:scale-110 group-hover:brightness-110 group-hover:contrast-110 transition-all duration-500"
                      />
                      <div className="absolute top-4 right-4">
                        <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 group-hover:scale-110 group-hover:bg-yellow-500 group-hover:text-black group-hover:shadow-lg group-hover:rotate-3">
                          {article.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-blue-600 transition-all duration-300 group-hover:scale-105" data-testid={`featured-article-title-${index}`}>
                        {article.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed transition-all duration-300 group-hover:text-gray-700 group-hover:scale-105" data-testid={`featured-article-excerpt-${index}`}>
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1 transition-all duration-300 group-hover:text-blue-600 group-hover:scale-110">
                            <User className="w-4 h-4 transition-all duration-300 group-hover:scale-125" />
                            {article.author}
                          </span>
                          <span className="flex items-center gap-1 transition-all duration-300 group-hover:text-green-600 group-hover:scale-110">
                            <Calendar className="w-4 h-4 transition-all duration-300 group-hover:scale-125" />
                            {article.date}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1 transition-all duration-300 group-hover:text-purple-600 group-hover:scale-110">
                            <Clock className="w-4 h-4 transition-all duration-300 group-hover:scale-125" />
                            {article.readTime}
                          </span>
                          <span className="flex items-center gap-1 transition-all duration-300 group-hover:text-orange-600 group-hover:scale-110">
                            <Eye className="w-4 h-4 transition-all duration-300 group-hover:scale-125" />
                            {article.views}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          {article.tags.slice(0, 3).map((tag: string, tagIndex: number) => (
                            <span key={tagIndex} className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-100 group-hover:text-blue-700 group-hover:shadow-md">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <a 
                          href="#" 
                          className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:-translate-y-1"
                          data-testid={`featured-article-link-${index}`}
                        >
                          {t.readMore}
                          <ArrowRight className="w-4 h-4 transition-all duration-300 hover:scale-125 hover:translate-x-1" />
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Latest Articles */}
      <section className="py-20 bg-background" data-testid="latest-section">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6" data-testid="latest-title">
                {t.latestTitle}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="latest-subtitle">
                {t.latestSubtitle}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestArticles.map((article: Article, index: number) => (
                <article 
                  key={article.id}
                  className="card-premium overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-3 hover:rotate-1 cursor-pointer"
                  data-testid={`latest-article-${index}`}
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-40 object-cover group-hover:scale-110 group-hover:brightness-110 group-hover:contrast-110 transition-all duration-500"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs font-medium transition-all duration-300 group-hover:scale-110 group-hover:bg-purple-500 group-hover:shadow-lg group-hover:rotate-3">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-primary mb-3 group-hover:text-blue-600 transition-all duration-300 group-hover:scale-105" data-testid={`latest-article-title-${index}`}>
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed transition-all duration-300 group-hover:text-gray-700 group-hover:scale-105" data-testid={`latest-article-excerpt-${index}`}>
                      {article.excerpt.slice(0, 120)}...
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                      <span className="transition-all duration-300 group-hover:text-blue-600 group-hover:scale-110 group-hover:font-bold">{article.author}</span>
                      <span className="transition-all duration-300 group-hover:text-green-600 group-hover:scale-110 group-hover:font-bold">{article.readTime}</span>
                    </div>
                    <a 
                      href="#" 
                      className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1 text-sm transition-all duration-300 hover:scale-110 hover:shadow-lg hover:-translate-y-1"
                      data-testid={`latest-article-link-${index}`}
                    >
                      {t.readMore}
                      <ArrowRight className="w-4 h-4 transition-all duration-300 hover:scale-125 hover:translate-x-1" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-secondary/20" data-testid="stats-section">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6" data-testid="stats-title">
                {t.statsTitle}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {t.stats.map((stat, index) => (
                <div 
                  key={index}
                  className="card-premium p-8 text-center group hover:scale-105 transition-transform duration-300"
                  data-testid={`stat-${index}`}
                >
                  <div className="mb-6 flex justify-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      <IconComponent iconName={stat.icon} className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <div className="text-4xl lg:text-5xl font-bold text-primary mb-4" data-testid={`stat-number-${index}`}>
                    {stat.number}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground" data-testid={`stat-label-${index}`}>
                    {stat.label}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content Types */}
      <section className="py-20 bg-background" data-testid="content-types-section">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6" data-testid="content-types-title">
                {t.contentTypesTitle}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {t.contentTypes.map((type, index) => (
                <div 
                  key={index}
                  className="card-premium p-8 text-center group hover:shadow-xl transition-all duration-300"
                  data-testid={`content-type-${index}`}
                >
                  <div className="mb-6 flex justify-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      <IconComponent iconName={type.icon} className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-4" data-testid={`content-type-title-${index}`}>
                    {type.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed" data-testid={`content-type-description-${index}`}>
                    {type.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-accent to-primary relative overflow-hidden" data-testid="newsletter-section">
        <div className="absolute inset-0 bg-primary/90"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-primary-foreground">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="newsletter-title">
              {t.newsletterTitle}
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed" data-testid="newsletter-subtitle">
              {t.newsletterSubtitle}
            </p>
            <p className="text-lg mb-12 opacity-80 max-w-3xl mx-auto leading-relaxed" data-testid="newsletter-description">
              {t.newsletterDescription}
            </p>
            
            {subscriptionStatus === 'success' && (
              <div className="bg-background/20 border border-background/30 rounded-xl p-4 mb-8 animate-fade-in-scale" data-testid="newsletter-success">
                <p className="text-background font-semibold">{t.newsletterSuccess}</p>
              </div>
            )}
            
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto" data-testid="newsletter-form">
              <input
                type="email"
                value={emailSubscription}
                onChange={(e) => setEmailSubscription(e.target.value)}
                placeholder={t.newsletterPlaceholder}
                className="flex-1 px-6 py-4 rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-background focus:outline-none"
                required
                data-testid="newsletter-email"
              />
              <button
                type="submit"
                className="bg-background text-primary px-8 py-4 rounded-xl font-semibold hover:bg-background/90 transition-all duration-200 inline-flex items-center justify-center gap-2"
                data-testid="newsletter-submit"
              >
                <Mail className="w-5 h-5" />
                {t.newsletterButton}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Daily Quotes Section - NEW */}
      <section className="py-20 bg-secondary/20" data-testid="daily-quotes-section">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6" data-testid="daily-quotes-title">
                {t.dailyQuotesTitle || 'Daily Quotes'}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="daily-quotes-subtitle">
                {t.dailyQuotesSubtitle || 'Inspiration from Rabbi Nachman of Breslov'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(t.dailyQuotes || []).map((quote: DailyQuote, index: number) => (
                <div 
                  key={quote.id}
                  className="card-premium p-8 text-center group hover:shadow-xl transition-all duration-300"
                  data-testid={`daily-quote-${index}`}
                >
                  <Quote className="w-12 h-12 text-primary mx-auto mb-6" />
                  <blockquote className="text-xl font-medium text-foreground mb-6 leading-relaxed" data-testid={`quote-text-${index}`}>
                    "{quote.text}"
                  </blockquote>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div className="font-semibold text-primary" data-testid={`quote-source-${index}`}>
                      {quote.source}
                    </div>
                    <div data-testid={`quote-author-${index}`}>
                      {quote.author}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - NEW */}
      <section className="py-20 bg-background" data-testid="testimonials-section">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6" data-testid="testimonials-title">
                {t.testimonialsTitle || 'Reader Testimonials'}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="testimonials-subtitle">
                {t.testimonialsSubtitle || 'How our magazine impacts readers worldwide'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {(t.testimonials || []).map((testimonial: Testimonial, index: number) => (
                <div 
                  key={testimonial.id}
                  className="card-premium p-8 group hover:shadow-xl transition-all duration-300"
                  data-testid={`testimonial-${index}`}
                >
                  <div className="flex items-center mb-6">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                      data-testid={`testimonial-image-${index}`}
                    />
                    <div>
                      <h3 className="font-bold text-foreground" data-testid={`testimonial-name-${index}`}>
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-muted-foreground" data-testid={`testimonial-location-${index}`}>
                        {testimonial.location}
                      </p>
                      <div className="flex mt-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <blockquote className="text-foreground leading-relaxed italic" data-testid={`testimonial-content-${index}`}>
                    "{testimonial.content}"
                  </blockquote>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Events Calendar Section - NEW */}
      <section className="py-20 bg-secondary/20" data-testid="events-section">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6" data-testid="events-title">
                {t.eventsTitle || 'Breslov Events Calendar'}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="events-subtitle">
                {t.eventsSubtitle || 'Events, classes and gatherings worldwide'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {(t.events || []).map((event: Event, index: number) => (
                <div 
                  key={event.id}
                  className="card-premium overflow-hidden group hover:shadow-xl transition-all duration-300"
                  data-testid={`event-${index}`}
                >
                  {event.image && (
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <Calendar className="w-4 h-4 text-primary mr-2" />
                      <span className="text-sm font-medium text-primary" data-testid={`event-type-${index}`}>
                        {event.type}
                      </span>
                    </div>
                    <h3 className="font-bold text-foreground mb-3 text-sm leading-tight" data-testid={`event-title-${index}`}>
                      {event.title}
                    </h3>
                    <div className="space-y-2 text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-2" />
                        <span data-testid={`event-date-${index}`}>{event.date}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-3 h-3 mr-2" />
                        <span data-testid={`event-location-${index}`}>{event.location}</span>
                      </div>
                    </div>
                    <button 
                      className="mt-4 text-primary hover:text-primary/80 font-medium text-sm transition-colors duration-200"
                      data-testid={`event-button-${index}`}
                    >
                      {t.viewEvent || 'View Event'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Videos Section - NEW */}
      <section className="py-20 bg-background" data-testid="videos-section">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6" data-testid="videos-title">
                {t.videosTitle || 'Videos & Lectures'}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="videos-subtitle">
                {t.videosSubtitle || 'Deep lectures, classes and practical stories'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(t.videos || []).map((video: any, index: number) => (
                <div 
                  key={video.id}
                  className="card-premium overflow-hidden group hover:shadow-xl transition-all duration-300"
                  data-testid={`video-${index}`}
                >
                  <div className="relative">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Play className="w-16 h-16 text-white" />
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs">
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-foreground mb-3 text-lg leading-tight" data-testid={`video-title-${index}`}>
                      {video.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed" data-testid={`video-description-${index}`}>
                      {video.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        <span data-testid={`video-views-${index}`}>{video.views.toLocaleString()}</span>
                      </div>
                      <button 
                        className="text-primary hover:text-primary/80 font-medium transition-colors duration-200"
                        data-testid={`video-button-${index}`}
                      >
                        {t.watchVideo || 'Watch Video'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* World News Section - NEW */}
      <section className="py-20 bg-secondary/20" data-testid="world-news-section">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6" data-testid="world-news-title">
                {t.worldNewsTitle || 'Breslov Around the World'}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="world-news-subtitle">
                {t.worldNewsSubtitle || 'News and updates from Breslov communities worldwide'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(t.worldNews || []).map((news: any, index: number) => (
                <div 
                  key={news.id}
                  className="card-premium overflow-hidden group hover:shadow-xl transition-all duration-300"
                  data-testid={`world-news-${index}`}
                >
                  <img 
                    src={news.image} 
                    alt={news.title}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <Globe className="w-4 h-4 text-primary mr-2" />
                      <span className="text-sm font-medium text-primary" data-testid={`news-location-${index}`}>
                        {news.location}
                      </span>
                    </div>
                    <h3 className="font-bold text-foreground mb-3 leading-tight" data-testid={`news-title-${index}`}>
                      {news.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed" data-testid={`news-summary-${index}`}>
                      {news.summary}
                    </p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span data-testid={`news-date-${index}`}>{news.date}</span>
                      <a 
                        href="#" 
                        className="text-primary hover:text-primary/80 font-medium transition-colors duration-200"
                        data-testid={`news-link-${index}`}
                      >
                        {t.readMore}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background" data-testid="cta-section">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6" data-testid="cta-title">
              {t.ctaTitle}
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed" data-testid="cta-description">
              {t.ctaDescription}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact" 
                className="btn-breslov-primary inline-flex items-center justify-center gap-2"
                data-testid="cta-button-primary"
              >
                <Share2 className="w-5 h-5" />
                {t.ctaButtonPrimary}
              </a>
              <a 
                href="/contact" 
                className="btn-breslov-secondary inline-flex items-center justify-center gap-2"
                data-testid="cta-button-secondary"
              >
                <MessageCircle className="w-5 h-5" />
                {t.ctaButtonSecondary}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}