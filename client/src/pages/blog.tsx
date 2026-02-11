import { useState } from 'react';
import { Header } from '../components/Header';
import { useLanguage } from '../contexts/LanguageContext';

// Multi-language text helper
function ml(lang: string, texts: { he: string; en: string; fr: string; es?: string; ru?: string }) {
  switch (lang) {
    case 'en': return texts.en;
    case 'fr': return texts.fr;
    case 'es': return texts.es || texts.en;
    case 'ru': return texts.ru || texts.en;
    default: return texts.he;
  }
}

interface Article {
  id: string;
  title: { he: string; en: string; fr: string; es?: string; ru?: string };
  excerpt: { he: string; en: string; fr: string; es?: string; ru?: string };
  content: { he: string; en: string; fr: string; es?: string; ru?: string };
  category: { he: string; en: string; fr: string; es?: string; ru?: string };
  date: string;
  readTime: { he: string; en: string; fr: string; es?: string; ru?: string };
}

const articles: Article[] = [
  {
    id: 'torah-of-the-day-hitbodedut',
    title: {
      he: 'כוח ההתבודדות - שיחה יומית עם הבורא',
      en: 'The Power of Hitbodedut - Daily Conversation with the Creator',
      fr: 'Le Pouvoir de la Hitbodedout - Conversation Quotidienne avec le Createur',
      es: 'El Poder de la Hitbodedut - Conversacion Diaria con el Creador',
      ru: 'Сила Итбодедут - Ежедневный Разговор с Творцом',
    },
    excerpt: {
      he: 'רבי נחמן מברסלב לימד שההתבודדות היא המעלה העליונה מכל המעלות. כל אדם צריך להקדיש זמן כל יום לדבר עם הקב"ה בשפתו שלו, כילד המתחנן לפני אביו.',
      en: 'Rabbi Nachman of Breslov taught that Hitbodedut is the highest of all virtues. Every person should dedicate time each day to speak with God in their own language, like a child pleading before their father.',
      fr: 'Rabbi Nachman de Breslov a enseigne que la Hitbodedout est la plus haute de toutes les vertus. Chaque personne devrait consacrer du temps chaque jour pour parler avec Dieu dans sa propre langue.',
      es: 'Rabi Najman de Breslov enseno que la Hitbodedut es la mas alta de todas las virtudes. Cada persona deberia dedicar tiempo cada dia para hablar con Dios en su propio idioma.',
      ru: 'Рабби Нахман из Бреслова учил, что Итбодедут является высшей из всех добродетелей. Каждый человек должен посвящать время каждый день разговору с Богом на своем языке.',
    },
    content: {
      he: 'ליקוטי מוהר"ן, תורה נ"ב: "התבודדות הוא מעלה עליונה מכל המעלות, דהיינו לקבוע לו על כל פנים שעה או יותר להתבודד לבד באיזה חדר או בשדה, ולפרש שיחתו בינו לבין קונו." רבינו מלמד אותנו שדרך השיחה האישית עם ה\' אנו יכולים לתקן את הנשמה ולהתקרב אל האמת.',
      en: 'Likutei Moharan, Torah 52: "Hitbodedut is the highest of all virtues - that is, to set aside at least one hour or more to seclude oneself in a room or in the field, and to express one\'s conversation between oneself and one\'s Creator." Our Master teaches us that through personal conversation with God, we can rectify the soul and draw closer to truth.',
      fr: 'Likoutei Moharan, Torah 52 : "La Hitbodedout est la plus haute de toutes les vertus - c\'est-a-dire, consacrer au moins une heure ou plus pour s\'isoler dans une chambre ou dans un champ, et exprimer sa conversation entre soi et son Createur."',
      es: 'Likutei Moharan, Torah 52: "La Hitbodedut es la mas alta de todas las virtudes - es decir, reservar al menos una hora o mas para aislarse en una habitacion o en el campo."',
      ru: 'Ликутей Моаран, Тора 52: "Итбодедут является высшей из всех добродетелей - то есть выделить хотя бы один час или более для уединения в комнате или в поле."',
    },
    category: {
      he: 'תורה יומית',
      en: 'Daily Torah',
      fr: 'Torah Quotidienne',
      es: 'Torah Diaria',
      ru: 'Ежедневная Тора',
    },
    date: '2026-02-10',
    readTime: {
      he: '5 דקות קריאה',
      en: '5 min read',
      fr: '5 min de lecture',
      es: '5 min de lectura',
      ru: '5 мин чтения',
    },
  },
  {
    id: 'story-seven-beggars',
    title: {
      he: 'סיפור שבעת הקבצנים - חכמת הסתר',
      en: 'The Tale of the Seven Beggars - Hidden Wisdom',
      fr: 'Le Conte des Sept Mendiants - Sagesse Cachee',
      es: 'El Cuento de los Siete Mendigos - Sabiduria Oculta',
      ru: 'Сказка о Семи Нищих - Скрытая Мудрость',
    },
    excerpt: {
      he: 'אחד הסיפורים המפורסמים ביותר של רבי נחמן. שבעה קבצנים מגיעים לחתונה ומספרים כל אחד סיפור נפלא. כל קבצן מסתיר בתוכו חכמה עליונה שמעבר למה שהעין יכולה לראות.',
      en: 'One of Rabbi Nachman\'s most famous stories. Seven beggars arrive at a wedding and each tells a wondrous tale. Each beggar conceals within himself a supreme wisdom beyond what the eye can see.',
      fr: 'L\'un des contes les plus celebres de Rabbi Nachman. Sept mendiants arrivent a un mariage et chacun raconte un conte merveilleux. Chaque mendiant dissimule en lui une sagesse supreme.',
      es: 'Uno de los cuentos mas famosos de Rabi Najman. Siete mendigos llegan a una boda y cada uno cuenta un cuento maravilloso.',
      ru: 'Одна из самых известных историй Рабби Нахмана. Семь нищих приходят на свадьбу и каждый рассказывает чудесную историю.',
    },
    content: {
      he: 'הסיפור מתאר את החכמה הגנוזה בתוך הפשטות. רבי נחמן מלמד שדווקא בתוך השברון והחוסר, מתגלה האור הגדול ביותר. הקבצן הראשון, העיוור, רואה יותר מכל אדם בעולם. כי "עיני ה\' המה משוטטים בכל הארץ." כל קבצן מייצג מידה עילאית שנראית כחיסרון בעולם הזה.',
      en: 'The story describes the hidden wisdom within simplicity. Rabbi Nachman teaches that precisely within brokenness and lack, the greatest light is revealed. The first beggar, the blind one, sees more than any person in the world.',
      fr: 'L\'histoire decrit la sagesse cachee dans la simplicite. Rabbi Nachman enseigne que c\'est precisement dans la brisure et le manque que la plus grande lumiere se revele.',
      es: 'La historia describe la sabiduria oculta dentro de la simplicidad. Rabi Najman ensena que precisamente dentro de la ruptura y la carencia, se revela la luz mas grande.',
      ru: 'История описывает скрытую мудрость внутри простоты. Рабби Нахман учит, что именно в сокрушенности и недостатке раскрывается величайший свет.',
    },
    category: {
      he: 'סיפורי רבי נחמן',
      en: 'Stories of Rabbi Nachman',
      fr: 'Contes de Rabbi Nachman',
      es: 'Cuentos de Rabi Najman',
      ru: 'Рассказы Рабби Нахмана',
    },
    date: '2026-02-08',
    readTime: {
      he: '8 דקות קריאה',
      en: '8 min read',
      fr: '8 min de lecture',
      es: '8 min de lectura',
      ru: '8 мин чтения',
    },
  },
  {
    id: 'azamra-finding-good',
    title: {
      he: 'אזמרה - למצוא את הנקודות הטובות',
      en: 'Azamra - Finding the Good Points',
      fr: 'Azamra - Trouver les Points Positifs',
      es: 'Azamra - Encontrar los Puntos Buenos',
      ru: 'Азамра - Находить Хорошие Точки',
    },
    excerpt: {
      he: '"אזמרה לאלוקי בעודי" - רבי נחמן מלמד שצריך לחפש ולמצוא בעצמו נקודות טובות, ועל ידי כך אדם מעלה את עצמו מכף חובה לכף זכות. גם ברשע הגמור יש נקודות טובות.',
      en: '"I will sing to my God while I yet live" - Rabbi Nachman teaches that one must search and find within oneself good points, and thereby raise oneself from the scale of guilt to the scale of merit.',
      fr: '"Je chanterai pour mon Dieu tant que je vivrai" - Rabbi Nachman enseigne qu\'on doit chercher et trouver en soi-meme des points positifs.',
      es: '"Cantare a mi Dios mientras viva" - Rabi Najman ensena que uno debe buscar y encontrar dentro de si mismo puntos buenos.',
      ru: '"Буду петь Богу моему, пока жив" - Рабби Нахман учит, что нужно искать и находить в себе хорошие точки.',
    },
    content: {
      he: 'ליקוטי מוהר"ן, תורה רפ"ב: "דע, שצריך לדון את כל אדם לכף זכות, ואפילו מי שהוא רשע גמור, צריך לחפש ולמצוא בו איזה מעט טוב, שבאותו המעט אינו רשע." רבינו מגלה סוד עצום: על ידי שאדם מוצא בעצמו ובחבירו נקודות טובות, הוא בונה ניגון של תשובה ושמחה.',
      en: 'Likutei Moharan, Torah 282: "Know that you must judge every person favorably, and even someone who is completely wicked, you must search and find in him some small good, that in that bit of good he is not wicked."',
      fr: 'Likoutei Moharan, Torah 282 : "Sache que tu dois juger chaque personne favorablement, et meme quelqu\'un qui est completement mechant, tu dois chercher et trouver en lui un peu de bien."',
      es: 'Likutei Moharan, Torah 282: "Sabe que debes juzgar a cada persona favorablemente, e incluso alguien que es completamente malvado, debes buscar y encontrar en el algo bueno."',
      ru: 'Ликутей Моаран, Тора 282: "Знай, что нужно судить каждого человека благосклонно, и даже того, кто совершенно нечестив, нужно искать и находить в нем немного добра."',
    },
    category: {
      he: 'תורה יומית',
      en: 'Daily Torah',
      fr: 'Torah Quotidienne',
      es: 'Torah Diaria',
      ru: 'Ежедневная Тора',
    },
    date: '2026-02-06',
    readTime: {
      he: '6 דקות קריאה',
      en: '6 min read',
      fr: '6 min de lecture',
      es: '6 min de lectura',
      ru: '6 мин чтения',
    },
  },
  {
    id: 'tikkun-haklali',
    title: {
      he: 'תיקון הכללי - עשרה מזמורי תהילים',
      en: 'Tikkun HaKlali - The Ten Psalms of Rectification',
      fr: 'Tikkoun HaKlali - Les Dix Psaumes de Rectification',
      es: 'Tikun HaKlali - Los Diez Salmos de Rectificacion',
      ru: 'Тикун аКлали - Десять Псалмов Исправления',
    },
    excerpt: {
      he: 'רבי נחמן גילה שעשרה מזמורים מיוחדים בתהילים מהווים תיקון כללי לנשמה. אמירת עשרת המזמורים הללו מועילה מאוד לתשובה ולתיקון הברית.',
      en: 'Rabbi Nachman revealed that ten specific Psalms constitute a general rectification for the soul. Reciting these ten Psalms is greatly beneficial for repentance and rectifying the covenant.',
      fr: 'Rabbi Nachman a revele que dix Psaumes specifiques constituent une rectification generale pour l\'ame. Reciter ces dix Psaumes est tres benefique pour la repentance.',
      es: 'Rabi Najman revelo que diez Salmos especificos constituyen una rectificacion general para el alma.',
      ru: 'Рабби Нахман раскрыл, что десять определенных Псалмов составляют общее исправление для души.',
    },
    content: {
      he: 'עשרת המזמורים הם: ט"ז, ל"ב, מ"א, מ"ב, נ"ט, ע"ז, צ\', ק"ה, קל"ז, ק"נ. רבי נחמן אמר: "התיקון הכללי הוא תיקון גדול מאוד." ואמר: "מי שבא על קברי ואומר התיקון הכללי ונותן פרוטה לצדקה - אני אתנהג עמו בכל הצדדים, ואפשט אותו מן הגיהנום בפאותיו."',
      en: 'The ten Psalms are: 16, 32, 41, 42, 59, 77, 90, 105, 137, 150. Rabbi Nachman said: "The Tikkun HaKlali is a very great rectification." He also said: "Whoever comes to my grave and recites the Tikkun HaKlali and gives a small coin to charity - I will deal with him in every way."',
      fr: 'Les dix Psaumes sont : 16, 32, 41, 42, 59, 77, 90, 105, 137, 150. Rabbi Nachman a dit : "Le Tikkoun HaKlali est une tres grande rectification."',
      es: 'Los diez Salmos son: 16, 32, 41, 42, 59, 77, 90, 105, 137, 150. Rabi Najman dijo: "El Tikun HaKlali es una rectificacion muy grande."',
      ru: 'Десять Псалмов: 16, 32, 41, 42, 59, 77, 90, 105, 137, 150. Рабби Нахман сказал: "Тикун аКлали является очень великим исправлением."',
    },
    category: {
      he: 'הלכה ומנהג',
      en: 'Law & Custom',
      fr: 'Loi et Coutume',
      es: 'Ley y Costumbre',
      ru: 'Закон и Обычай',
    },
    date: '2026-02-04',
    readTime: {
      he: '4 דקות קריאה',
      en: '4 min read',
      fr: '4 min de lecture',
      es: '4 min de lectura',
      ru: '4 мин чтения',
    },
  },
  {
    id: 'simcha-joy-breslov',
    title: {
      he: 'מצווה גדולה להיות בשמחה תמיד',
      en: 'It is a Great Mitzvah to Always Be Happy',
      fr: 'C\'est une Grande Mitsva d\'Etre Toujours Joyeux',
      es: 'Es una Gran Mitsva Estar Siempre Feliz',
      ru: 'Великая Заповедь - Всегда Быть Радостным',
    },
    excerpt: {
      he: 'רבי נחמן מדגיש את חשיבות השמחה בעבודת ה\'. העצבות היא מכשול גדול, ואילו השמחה פותחת את כל השערים. "מצווה גדולה להיות בשמחה תמיד" - ליקוטי מוהר"ן תנינא.',
      en: 'Rabbi Nachman emphasizes the importance of joy in serving God. Sadness is a great obstacle, while joy opens all gates. "It is a great mitzvah to always be happy" - Likutei Moharan Tinyana.',
      fr: 'Rabbi Nachman souligne l\'importance de la joie dans le service de Dieu. La tristesse est un grand obstacle, tandis que la joie ouvre toutes les portes.',
      es: 'Rabi Najman enfatiza la importancia de la alegria en el servicio a Dios. La tristeza es un gran obstaculo, mientras que la alegria abre todas las puertas.',
      ru: 'Рабби Нахман подчеркивает важность радости в служении Богу. Печаль является большим препятствием, тогда как радость открывает все врата.',
    },
    content: {
      he: 'ליקוטי מוהר"ן תנינא, תורה כ"ד: "מצווה גדולה להיות בשמחה תמיד." רבינו מסביר שהשמחה אינה רק רגש - היא כלי רוחני. על ידי השמחה, אדם יכול להגיע למדרגות הגבוהות ביותר. ובאותו זמן, רבינו מזהיר מ"שמחה שטותית" - השמחה האמיתית היא שמחה הקשורה לקדושה, למצוות ולתורה.',
      en: 'Likutei Moharan Tinyana, Torah 24: "It is a great mitzvah to always be happy." Our Master explains that joy is not merely an emotion - it is a spiritual tool. Through joy, a person can reach the highest levels.',
      fr: 'Likoutei Moharan Tinyana, Torah 24 : "C\'est une grande mitsva d\'etre toujours joyeux." Notre Maitre explique que la joie n\'est pas simplement une emotion - c\'est un outil spirituel.',
      es: 'Likutei Moharan Tinyana, Torah 24: "Es una gran mitsva estar siempre feliz." Nuestro Maestro explica que la alegria no es meramente una emocion - es una herramienta espiritual.',
      ru: 'Ликутей Моаран Тиньяна, Тора 24: "Великая заповедь - всегда быть радостным." Наш Учитель объясняет, что радость - это не просто эмоция, а духовный инструмент.',
    },
    category: {
      he: 'תורה יומית',
      en: 'Daily Torah',
      fr: 'Torah Quotidienne',
      es: 'Torah Diaria',
      ru: 'Ежедневная Тора',
    },
    date: '2026-02-02',
    readTime: {
      he: '5 דקות קריאה',
      en: '5 min read',
      fr: '5 min de lecture',
      es: '5 min de lectura',
      ru: '5 мин чтения',
    },
  },
];

const pageTranslations = {
  he: {
    pageTitle: 'תורה יומית ומאמרים',
    pageSubtitle: 'חכמת רבי נחמן מברסלב - לקט מאמרים, סיפורים ותורות לחיזוק הנשמה',
    readMore: 'קרא עוד',
    readLess: 'סגור',
    allArticles: 'כל המאמרים',
    backToTop: 'חזרה למעלה',
  },
  en: {
    pageTitle: 'Daily Torah & Articles',
    pageSubtitle: 'Wisdom of Rabbi Nachman of Breslov - A collection of articles, stories and teachings for spiritual strengthening',
    readMore: 'Read More',
    readLess: 'Close',
    allArticles: 'All Articles',
    backToTop: 'Back to Top',
  },
  fr: {
    pageTitle: 'Torah Quotidienne et Articles',
    pageSubtitle: 'Sagesse de Rabbi Nachman de Breslov - Une collection d\'articles, contes et enseignements pour le renforcement spirituel',
    readMore: 'Lire la Suite',
    readLess: 'Fermer',
    allArticles: 'Tous les Articles',
    backToTop: 'Retour en Haut',
  },
  es: {
    pageTitle: 'Torah Diaria y Articulos',
    pageSubtitle: 'Sabiduria de Rabi Najman de Breslov - Una coleccion de articulos, cuentos y ensenanzas para el fortalecimiento espiritual',
    readMore: 'Leer Mas',
    readLess: 'Cerrar',
    allArticles: 'Todos los Articulos',
    backToTop: 'Volver Arriba',
  },
  ru: {
    pageTitle: 'Ежедневная Тора и Статьи',
    pageSubtitle: 'Мудрость Рабби Нахмана из Бреслова - Коллекция статей, рассказов и учений для духовного укрепления',
    readMore: 'Читать Далее',
    readLess: 'Закрыть',
    allArticles: 'Все Статьи',
    backToTop: 'Наверх',
  },
};

function formatDate(dateStr: string, lang: string): string {
  const date = new Date(dateStr);
  const locales: Record<string, string> = {
    he: 'he-IL',
    en: 'en-US',
    fr: 'fr-FR',
    es: 'es-ES',
    ru: 'ru-RU',
  };
  return date.toLocaleDateString(locales[lang] || 'he-IL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function Blog() {
  const { currentLanguage, setLanguage } = useLanguage();
  const isRTL = currentLanguage === 'he';
  const t = pageTranslations[currentLanguage as keyof typeof pageTranslations] || pageTranslations.he;

  const [expandedArticle, setExpandedArticle] = useState<string | null>(null);

  const toggleArticle = (id: string) => {
    setExpandedArticle(expandedArticle === id ? null : id);
  };

  return (
    <div style={{ direction: isRTL ? 'rtl' : 'ltr', background: '#FFFFFF', minHeight: '100vh' }}>
      <Header currentLanguage={currentLanguage} onLanguageChange={setLanguage} />

      {/* Hero Section */}
      <section
        style={{
          background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF7ED 50%, #FFF0E0 100%)',
          padding: '4rem 0 3rem',
          textAlign: 'center',
          borderBottom: '1px solid #f0f0f0',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1.5rem' }}>
          <h1
            style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '800',
              color: '#0F172A',
              marginBottom: '1rem',
              lineHeight: '1.2',
              fontFamily: isRTL ? 'var(--font-hebrew)' : 'var(--font-latin)',
            }}
          >
            {t.pageTitle}
          </h1>
          <p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: '#64748B',
              lineHeight: '1.7',
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            {t.pageSubtitle}
          </p>
          <div
            style={{
              width: '60px',
              height: '3px',
              background: '#FF6B00',
              margin: '1.5rem auto 0',
              borderRadius: '2px',
            }}
          />
        </div>
      </section>

      {/* Articles Grid */}
      <section style={{ padding: '3rem 0 5rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 440px), 1fr))',
              gap: '2rem',
            }}
          >
            {articles.map((article) => {
              const isExpanded = expandedArticle === article.id;
              return (
                <article
                  key={article.id}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: '14px',
                    boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
                    overflow: 'hidden',
                    transition: 'box-shadow 0.3s ease, transform 0.3s ease',
                    border: '1px solid #f0f0f0',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.1)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,0.06)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {/* Category bar */}
                  <div
                    style={{
                      background: '#FF6B00',
                      padding: '0.5rem 1.25rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span
                      style={{
                        color: '#FFFFFF',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        letterSpacing: '0.03em',
                      }}
                    >
                      {ml(currentLanguage, article.category)}
                    </span>
                    <span
                      style={{
                        color: 'rgba(255,255,255,0.85)',
                        fontSize: '0.75rem',
                      }}
                    >
                      {ml(currentLanguage, article.readTime)}
                    </span>
                  </div>

                  {/* Content */}
                  <div style={{ padding: '1.5rem' }}>
                    {/* Date */}
                    <time
                      style={{
                        display: 'block',
                        fontSize: '0.8rem',
                        color: '#94a3b8',
                        marginBottom: '0.75rem',
                      }}
                      dateTime={article.date}
                    >
                      {formatDate(article.date, currentLanguage)}
                    </time>

                    {/* Title */}
                    <h2
                      style={{
                        fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)',
                        fontWeight: '700',
                        color: '#0F172A',
                        marginBottom: '0.75rem',
                        lineHeight: '1.4',
                      }}
                    >
                      {ml(currentLanguage, article.title)}
                    </h2>

                    {/* Excerpt */}
                    <p
                      style={{
                        fontSize: '0.95rem',
                        color: '#475569',
                        lineHeight: '1.7',
                        marginBottom: '1rem',
                      }}
                    >
                      {ml(currentLanguage, article.excerpt)}
                    </p>

                    {/* Expanded content */}
                    {isExpanded && (
                      <div
                        style={{
                          background: '#FFFBF5',
                          borderRadius: '10px',
                          padding: '1.25rem',
                          marginBottom: '1rem',
                          borderRight: isRTL ? '3px solid #FF6B00' : 'none',
                          borderLeft: isRTL ? 'none' : '3px solid #FF6B00',
                        }}
                      >
                        <p
                          style={{
                            fontSize: '0.95rem',
                            color: '#334155',
                            lineHeight: '1.8',
                            margin: 0,
                          }}
                        >
                          {ml(currentLanguage, article.content)}
                        </p>
                      </div>
                    )}

                    {/* Read more button */}
                    <button
                      onClick={() => toggleArticle(article.id)}
                      style={{
                        background: 'transparent',
                        border: '1.5px solid #FF6B00',
                        color: '#FF6B00',
                        padding: '0.6rem 1.5rem',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        transition: 'all 0.2s ease',
                        minWidth: '44px',
                        minHeight: '44px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#FF6B00';
                        e.currentTarget.style.color = '#FFFFFF';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = '#FF6B00';
                      }}
                    >
                      {isExpanded ? t.readLess : t.readMore}
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                          transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.2s ease',
                        }}
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section
        style={{
          background: '#FFF7ED',
          padding: '3rem 0',
          textAlign: 'center',
          borderTop: '1px solid #f0f0f0',
        }}
      >
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 1.5rem' }}>
          <p
            style={{
              fontSize: '1.1rem',
              fontStyle: 'italic',
              color: '#64748B',
              marginBottom: '0.5rem',
              lineHeight: '1.6',
            }}
          >
            {ml(currentLanguage, {
              he: '"כל העולם כולו גשר צר מאוד, והעיקר לא לפחד כלל."',
              en: '"The whole world is a very narrow bridge, and the main thing is not to be afraid at all."',
              fr: '"Le monde entier est un pont tres etroit, et l\'essentiel est de n\'avoir aucune peur."',
              es: '"El mundo entero es un puente muy angosto, y lo principal es no tener miedo."',
              ru: '"Весь мир - очень узкий мост, и главное - совсем не бояться."',
            })}
          </p>
          <p
            style={{
              fontSize: '0.9rem',
              color: '#FF6B00',
              fontWeight: '600',
            }}
          >
            {ml(currentLanguage, {
              he: '-- רבי נחמן מברסלב',
              en: '-- Rabbi Nachman of Breslov',
              fr: '-- Rabbi Nachman de Breslov',
              es: '-- Rabi Najman de Breslov',
              ru: '-- Рабби Нахман из Бреслова',
            })}
          </p>
          <div style={{ marginTop: '2rem' }}>
            <a href="/store" style={{ textDecoration: 'none' }}>
              <button
                style={{
                  background: '#FF6B00',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '0.85rem 2rem',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '600',
                  boxShadow: '0 4px 14px rgba(255,107,0,0.3)',
                  transition: 'all 0.2s ease',
                  minHeight: '44px',
                }}
              >
                {ml(currentLanguage, {
                  he: 'לחנות הספרים',
                  en: 'Visit the Bookstore',
                  fr: 'Visiter la Librairie',
                  es: 'Visitar la Libreria',
                  ru: 'Посетить Книжный Магазин',
                })}
              </button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
