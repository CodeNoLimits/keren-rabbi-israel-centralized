import { useState } from 'react';
import { Header } from "@/components/Header";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Calendar, Users, Heart, Star, ArrowRight, Clock, TrendingUp, Sparkles, Eye } from 'lucide-react';

const translations = {
  he: {
    title: 'המגזין - מגזין ברסלב',
    subtitle: 'תוכן מעודכן ועדכני על חיי ברסלב',
    latestArticles: 'מאמרים אחרונים',
    categories: 'קטגוריות',
    featured: 'מומלץ',
    readMore: 'קרא עוד',
    published: 'פורסם',
    author: 'מחבר',
    views: 'צפיות',
    allArticles: 'כל המאמרים',
    categoriesList: {
      teachings: 'תורות',
      stories: 'סיפורים',
      practices: 'תרגולים',
      community: 'קהילה',
      events: 'אירועים'
    },
    articles: [
      {
        id: 1,
        title: 'מצוה גדולה להיות בשמחה תמיד - התורה השלמה',
        excerpt: 'למדו על התורה המפורסמת ביותר של רבי נחמן מברסלב על השמחה הנצחית והחשיבות שלה בחיינו. רבי נחמן לימד: "מצוה גדולה להיות בשמחה תמיד" - זו התורה החזקה ביותר למול כל הקשיים והייסורים בחיים.',
        category: 'teachings',
        author: 'רבי ישראל דב אודסר זצ"ל',
        date: '2025-01-15',
        views: 1250,
        featured: true,
        image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop',
        communityImage: true
      },
      {
        id: 2,
        title: 'התבודדות - השיחה הנשגבת עם הבורא',
        excerpt: 'גלו את סוד ההתבודדות, התפילה האישית והפרטית של רבי נחמן שכל אדם יכול לעשות בכל מקום ובכל זמן. ההתבודדות היא הכח העצום ביותר שניתן לנו - שיחה פשוטה ואישית עם הקדוש ברוך הוא, בשפה שלנו, במילים שלנו.',
        category: 'practices',
        author: 'רבי נחמן מברסלב',
        date: '2025-01-12',
        views: 980,
        featured: true,
        image: 'https://images.unsplash.com/photo-1483389127117-b6a2102724ae?w=800&h=600&fit=crop',
        communityImage: true
      },
      {
        id: 3,
        title: 'אין שום יאוש בעולם כלל - מסר התקווה',
        excerpt: 'התורה החזקה ביותר של רבי נחמן על התקווה והחשיבות של חיזוק עצמנו בכל מה שאפשר. נ נח נחמ נחמן מאומן! אפילו כשהכל נראה קשה, יש תמיד תקווה. "דע שהאדם צריך לעבור על גשר צר מאוד מאוד, והכלל: לא לפחד כלל!"',
        category: 'teachings',
        author: 'רבי נחמן מברסלב',
        date: '2025-01-10',
        views: 1560,
        featured: false,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
        communityImage: true
      },
      {
        id: 4,
        title: 'סיפורי מעשיות - החכמה הנסתרת',
        excerpt: 'גלו את הסיפורים הנפלאים של רבי נחמן שמכילים חכמה עמוקה וסודות רוחניים לכל נשמה. כל סיפור הוא עולם שלם - מלך, נסיך, יער, מסע... ובתוכם כל החכמה שצריך לחיים האמיתיים.',
        category: 'stories',
        author: 'מסופר ע"י רבי נתן מברסלב',
        date: '2025-01-08',
        views: 890,
        featured: false,
        image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop',
        communityImage: true
      },
      {
        id: 5,
        title: 'עלייה לאומן - מסע רוחני של אלפים',
        excerpt: 'תמונות ודיווחים מאירועי הקהילה הברסלבית ברחבי העולם - עלייה לציון רבי נחמן באומן, ראש השנה, ריקודים, שמחה וחיבור נשמות מכל העולם. אלפי חסידים מתכנסים מדי שנה לחגוג יחד.',
        category: 'community',
        author: 'צילום: קהילת ברסלב עולמית',
        date: '2025-01-05',
        views: 1120,
        featured: false,
        image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&h=600&fit=crop',
        communityImage: true,
        memberPhotos: [
          'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
          'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&h=400&fit=crop'
        ]
      },
      {
        id: 6,
        title: 'תרגול היומי - מדריך מעשי לעבודת ה׳',
        excerpt: 'כיצד לשלב את תורת ברסלב בחיי היומיום - טיפים מעשיים לעבודה רוחנית יום-יומית. להתחיל בהתבודדות כל יום, לומר תיקון הכללי, לקרוא ליקוטי מוהרן, ולהיות בשמחה תמיד!',
        category: 'practices',
        author: 'רבי ישראל דב אודסר זצ"ל',
        date: '2025-01-03',
        views: 750,
        featured: false,
        image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&h=600&fit=crop',
        communityImage: true
      },
      {
        id: 7,
        title: 'נ נח נחמ נחמן מאומן - הפתק המפורסם',
        excerpt: 'סיפור גילוי הפתק המופלא של רבי ישראל דב אודסר זצ"ל. "נ נח נחמ נחמן מאומן" - המנטרה הקדושה שמביאה שמחה וגאולה לכל העולם. האש שלי תוקד עד ביאת המשיח!',
        category: 'teachings',
        author: 'רבי ישראל דב אודסר זצ"ל - סבא',
        date: '2025-01-01',
        views: 2340,
        featured: true,
        image: 'https://images.unsplash.com/photo-1509909756405-be0199881695?w=800&h=600&fit=crop',
        communityImage: true
      },
      {
        id: 8,
        title: 'ריקודי ברסלב - חגיגה של שמחה ואמונה',
        excerpt: 'ריקודים עצומים בירושלים ובכל העולם! חסידי ברסלב מתכנסים לרקוד, לשמוח, ולפזר את האור של רבי נחמן. "מצוה גדולה להיות בשמחה" - ובריקוד אנחנו מבטאים את השמחה הזאת!',
        category: 'community',
        author: 'מתעד: צילומי ברסלב',
        date: '2024-12-28',
        views: 1890,
        featured: false,
        image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=600&fit=crop',
        communityImage: true,
        memberPhotos: [
          'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
          'https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=400&h=400&fit=crop'
        ]
      }
    ]
  },
  en: {
    title: 'The Magazine - Breslov Magazine',
    subtitle: 'Updated and current content about Breslov life',
    latestArticles: 'Latest Articles',
    categories: 'Categories',
    featured: 'Featured',
    readMore: 'Read More',
    published: 'Published',
    author: 'Author',
    views: 'Views',
    allArticles: 'All Articles',
    categoriesList: {
      teachings: 'Teachings',
      stories: 'Stories',
      practices: 'Practices',
      community: 'Community',
      events: 'Events'
    },
    articles: [
      {
        id: 1,
        title: 'It is a Great Mitzvah to Always Be Happy - The Complete Teaching',
        excerpt: 'Learn about Rabbi Nachman of Breslov\'s most famous teaching on eternal joy and its importance in our lives. Rabbi Nachman taught: "It is a great mitzvah to always be in joy" - this is the strongest teaching against all difficulties and suffering in life.',
        category: 'teachings',
        author: 'Rabbi Israel Dov Odesser zt"l',
        date: '2025-01-15',
        views: 1250,
        featured: true,
        image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop',
        communityImage: true
      },
      {
        id: 2,
        title: 'Hitbodedut - The Sacred Conversation with the Creator',
        excerpt: 'Discover the secret of hitbodedut, Rabbi Nachman\'s personal and private prayer that anyone can do anywhere and anytime. Hitbodedut is the most powerful force given to us - a simple and personal conversation with God, in our language, in our words.',
        category: 'practices',
        author: 'Rabbi Nachman of Breslov',
        date: '2025-01-12',
        views: 980,
        featured: true,
        image: 'https://images.unsplash.com/photo-1483389127117-b6a2102724ae?w=800&h=600&fit=crop',
        communityImage: true
      },
      {
        id: 3,
        title: 'There is No Despair in the World - Message of Hope',
        excerpt: 'Rabbi Nachman\'s strongest teaching on hope and the importance of strengthening ourselves in all that is possible. Na Nach Nachma Nachman Meuman! Even when everything seems difficult, there is always hope. "Know that a person must cross over a very, very narrow bridge, and the rule is: not to be afraid at all!"',
        category: 'teachings',
        author: 'Rabbi Nachman of Breslov',
        date: '2025-01-10',
        views: 1560,
        featured: false,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
        communityImage: true
      },
      {
        id: 7,
        title: 'Na Nach Nachma Nachman Meuman - The Famous Note',
        excerpt: 'The story of the miraculous note\'s revelation by Rabbi Israel Dov Odesser zt"l. "Na Nach Nachma Nachman Meuman" - the holy mantra that brings joy and redemption to the entire world. My Fire will burn until the coming of Mashiach!',
        category: 'teachings',
        author: 'Rabbi Israel Dov Odesser zt"l - Saba',
        date: '2025-01-01',
        views: 2340,
        featured: true,
        image: 'https://images.unsplash.com/photo-1509909756405-be0199881695?w=800&h=600&fit=crop',
        communityImage: true
      },
      {
        id: 5,
        title: 'Pilgrimage to Uman - Spiritual Journey of Thousands',
        excerpt: 'Photos and reports from Breslov community events worldwide - pilgrimage to Rabbi Nachman\'s gravesite in Uman, Rosh Hashanah, dancing, joy and connection of souls from all over the world. Thousands of Hasidim gather every year to celebrate together.',
        category: 'community',
        author: 'Photography: Breslov World Community',
        date: '2025-01-05',
        views: 1120,
        featured: false,
        image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&h=600&fit=crop',
        communityImage: true,
        memberPhotos: [
          'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
          'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&h=400&fit=crop'
        ]
      },
      {
        id: 2,
        title: 'Hitbodedut - The Sacred Conversation with the Creator',
        excerpt: 'Discover the secret of hitbodedut, the personal and private prayer of Rabbi Nachman that anyone can do anywhere and anytime.',
        category: 'practices',
        author: 'My Fire Team',
        date: '2025-01-12',
        views: 980,
        featured: true
      },
      {
        id: 3,
        title: 'There is No Despair in the World - Message of Hope',
        excerpt: 'Rabbi Nachman\'s strongest teaching on hope and the importance of strengthening ourselves in all that is possible.',
        category: 'teachings',
        author: 'My Fire Team',
        date: '2025-01-10',
        views: 1560,
        featured: false
      },
      {
        id: 4,
        title: 'Tales - The Hidden Wisdom',
        excerpt: 'Discover the wonderful stories of Rabbi Nachman that contain deep wisdom and spiritual secrets for every soul.',
        category: 'stories',
        author: 'My Fire Team',
        date: '2025-01-08',
        views: 890,
        featured: false
      },
      {
        id: 5,
        title: 'Community Events - Connecting Souls',
        excerpt: 'Photos and reports from Breslov community events around the world - weeks of connection and joy.',
        category: 'community',
        author: 'My Fire Team',
        date: '2025-01-05',
        views: 1120,
        featured: false
      },
      {
        id: 6,
        title: 'Daily Practice - Practical Guide',
        excerpt: 'How to integrate Breslov teachings into daily life - practical tips for daily spiritual work.',
        category: 'practices',
        author: 'My Fire Team',
        date: '2025-01-03',
        views: 750,
        featured: false
      }
    ]
  }
};

export default function Magazine() {
  const { currentLanguage, setLanguage } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const t = translations[currentLanguage as keyof typeof translations] || translations.he;
  const dir = currentLanguage === 'he' ? 'rtl' : 'ltr';
  
  const featuredArticles = t.articles.filter(a => a.featured);
  const filteredArticles = selectedCategory 
    ? t.articles.filter(a => a.category === selectedCategory)
    : t.articles;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-orange-50" dir={dir} style={{ position: 'relative', zIndex: 1 }}>
      <Header currentLanguage={currentLanguage} onLanguageChange={setLanguage} />
      
      {/* Hero Section - Modern Design */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-br from-[#1e40af] via-[#1e3a8a] to-[#312e81] text-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#f97316] rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto max-w-6xl text-center relative z-10">
          <div className="inline-block mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
            <Sparkles className="w-5 h-5 inline mr-2" />
            <span className="text-sm font-medium">תוכן מעודכן יומיומי</span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            {t.title}
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hot Topics Section - Inspired by Breslev */}
        <div className="mb-12 bg-gradient-to-r from-[#f97316]/10 via-[#1e40af]/5 to-[#f97316]/10 rounded-2xl p-6 border border-[#1e40af]/20">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6 text-[#f97316]" />
            <h2 className="text-2xl font-bold text-gray-900">
              {currentLanguage === 'he' ? 'הנושאים החמים' : 'Hot Topics'}
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="#" className="px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all hover:-translate-y-1 border border-gray-200 hover:border-[#f97316]">
              <span className="text-sm font-medium text-gray-700 hover:text-[#f97316]">
                {currentLanguage === 'he' ? 'פדיון נפש' : 'Pidyon Nefesh'}
              </span>
            </a>
            <a href="#" className="px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all hover:-translate-y-1 border border-gray-200 hover:border-[#f97316]">
              <span className="text-sm font-medium text-gray-700 hover:text-[#f97316]">
                {currentLanguage === 'he' ? 'התבודדות' : 'Hitbodedut'}
              </span>
            </a>
            <a href="#" className="px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all hover:-translate-y-1 border border-gray-200 hover:border-[#f97316]">
              <span className="text-sm font-medium text-gray-700 hover:text-[#f97316]">
                {currentLanguage === 'he' ? 'תיקון הכללי' : 'Tikkun HaKlali'}
              </span>
            </a>
            <a href="#" className="px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all hover:-translate-y-1 border border-gray-200 hover:border-[#f97316]">
              <span className="text-sm font-medium text-gray-700 hover:text-[#f97316]">
                {currentLanguage === 'he' ? 'שמחה תמיד' : 'Always Happy'}
              </span>
            </a>
          </div>
        </div>

        {/* Categories Filter - Enhanced */}
        <div className="mb-8 flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 ${
              selectedCategory === null
                ? 'bg-gradient-to-r from-[#1e40af] to-[#1e3a8a] text-white shadow-xl border-2 border-[#f97316]'
                : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-[#1e40af]'
            }`}
          >
            {t.allArticles}
          </button>
          {Object.entries(t.categoriesList).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 font-medium ${
                selectedCategory === key
                  ? 'bg-gradient-to-r from-[#1e40af] to-[#1e3a8a] text-white shadow-xl border-2 border-[#f97316]'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-[#1e40af]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Featured Articles - Enhanced Design */}
        {selectedCategory === null && featuredArticles.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-[#f97316] to-[#ea580c] rounded-lg">
                <Star className="w-6 h-6 text-white fill-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">{t.featured}</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredArticles.map((article, index) => (
                <Card 
                  key={article.id} 
                  className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-[#f97316] transform hover:-translate-y-2 bg-white"
                >
                  <div className="relative h-56 bg-gradient-to-br from-[#1e40af] via-[#1e3a8a] to-[#312e81] overflow-hidden">
                    {/* Image Overlay */}
                    {article.image && (
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500"
                      />
                    )}
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1e40af]/90 via-transparent to-transparent"></div>
                    {/* Featured Badge */}
                    <div className="absolute top-4 left-4 px-3 py-1 bg-[#f97316] text-white text-xs rounded-full font-bold shadow-lg flex items-center gap-1">
                      <Star className="w-3 h-3 fill-white" />
                      {t.featured}
                    </div>
                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <div className="mb-2">
                        <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full font-semibold border border-white/30">
                          {t.categoriesList[article.category as keyof typeof t.categoriesList]}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 line-clamp-2">{article.title}</h3>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">{article.excerpt}</p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4 text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(article.date).toLocaleDateString(currentLanguage)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {article.views.toLocaleString()}
                        </span>
                      </div>
                      <button className="flex items-center gap-2 text-[#1e40af] hover:text-[#f97316] font-semibold group-hover:gap-3 transition-all">
                        {t.readMore}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Articles - Modern Grid */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-6 h-6 text-[#1e40af]" />
            <h2 className="text-3xl font-bold text-gray-900">{t.latestArticles}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <Card 
                key={article.id} 
                className="group overflow-hidden hover:shadow-2xl transition-all duration-500 bg-white border border-gray-200 hover:border-[#1e40af] transform hover:-translate-y-2 cursor-pointer"
              >
                <div className="relative h-48 bg-gradient-to-br from-[#1e40af] via-[#1e3a8a] to-[#312e81] overflow-hidden">
                  {article.image ? (
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-110 transition-all duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <BookOpen className="w-16 h-16 text-white opacity-30" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-gray-700 text-xs rounded font-medium">
                      {t.categoriesList[article.category as keyof typeof t.categoriesList]}
                    </span>
                    {article.featured && (
                      <div className="px-2 py-1 bg-[#f97316] text-white rounded-full">
                        <Star className="w-3 h-3 fill-white" />
                      </div>
                    )}
                  </div>
                </div>
                <CardContent className="p-5">
                  <h3 className="text-lg font-bold mb-2 text-gray-900 line-clamp-2 group-hover:text-[#1e40af] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm line-clamp-3 leading-relaxed">{article.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(article.date).toLocaleDateString(currentLanguage)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {article.views.toLocaleString()}
                      </span>
                    </div>
                    <button className="flex items-center gap-1 text-[#1e40af] hover:text-[#f97316] font-semibold group-hover:gap-2 transition-all">
                      {t.readMore}
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
