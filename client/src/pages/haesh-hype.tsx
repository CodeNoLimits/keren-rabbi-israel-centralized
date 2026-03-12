import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { GoldDivider } from '../components/GoldDivider';
import { 
  Zap, Users, Calendar, MessageCircle, Trophy, Sparkles, Globe, Heart,
  TrendingUp, Star, Clock, MapPin, Share2, ChevronRight, Play, Camera,
  Mic, Video, BookOpen, Coffee, Music, Newspaper, Award, Target, Quote
} from 'lucide-react';

const translations = {
  he: {
    // SEO et Meta
    title: 'האש הייפ - דופק הקהילה הברסלבית',
    description: 'חיבור, השראה ועדכונים מהקהילה הברסלבית הדינמית - אירועים, סיפורים מעוררי השראה וחדשות מעולם ברסלב',
    
    // Hero Section
    heroTitle: '🔥 האש הייפ',
    heroSubtitle: 'דופק הקהילה הברסלבית',
    heroDescription: 'המרכז הדינמי לחדשות, אירועים וסיפורים מהקהילה הברסלבית הפעילה - מקום שבו כל נשמה מוצאת את המקום שלה',
    heroQuote: '"הַצַּדִּיקִים הָאֲמִתִּיִים הֵם אֵלֶּה שֶׁמַּחֲזִירִים אֶת הָעוֹלָם לַטּוֹב" - רבי נחמן מברסלב',
    
    // Navigation Sections
    navNews: 'חדשות ברסלב',
    navEvents: 'אירועים קרובים',
    navStories: 'סיפורי האש',
    navTestimonials: 'עדויות מהלב',
    navCommunity: 'הקהילה שלנו',
    navMedia: 'מדיה חדשה',
    
    // Latest News
    newsTitle: 'חדשות וזרקור מעולם ברסלב',
    newsSubtitle: 'עדכונים חמים מהקהילה והעולם הרוחני',
    
    // Events
    eventsTitle: 'אירועים קרובים ושווים',
    eventsSubtitle: 'הצטרפו לפעילויות הקהילה המרגשות',
    
    // Stories
    storiesTitle: 'סיפורי האש - השראה אמיתית',
    storiesSubtitle: 'סיפורים מרגשים של שינוי ורוחניות מהקהילה',
    
    // Testimonials
    testimonialsTitle: 'עדויות מהלב - קולות הקהילה',
    testimonialsSubtitle: 'איך תורת רבי נחמן משנה חיים במציאות',
    
    // Community
    communityTitle: 'הקהילה שלנו - רשת האחווה',
    communitySubtitle: 'הכירו את האנשים המדהימים שמרכיבים את המשפחה הברסלבית',
    
    // Footer
    footerQuote: 'לְעוֹלָם אַל יַחֲשֹׁב אָדָם שֶׁאִי אֶפְשָׁר לוֹ לְהִתְקָרֵב לַה\'',
    footerAttribution: 'רבי נחמן מברסלב זצ״ל'
  },
  en: {
    title: 'HaEsh Hype - Pulse of the Breslov Community',
    description: 'Connection, inspiration and updates from the dynamic Breslov community - events, inspiring stories and news from the Breslov world',
    
    heroTitle: '🔥 HaEsh Hype',
    heroSubtitle: 'Pulse of the Breslov Community',
    heroDescription: 'The dynamic center for news, events and stories from the active Breslov community - where every soul finds its place',
    heroQuote: '"The true tzadikim are those who return the world to good" - Rabbi Nachman of Breslov',
    
    navNews: 'Breslov News',
    navEvents: 'Upcoming Events',
    navStories: 'HaEsh Stories',
    navTestimonials: 'Heart Testimonials',
    navCommunity: 'Our Community',
    navMedia: 'New Media',
    
    newsTitle: 'News and Spotlight from Breslov World',
    newsSubtitle: 'Hot updates from the community and spiritual world',
    
    eventsTitle: 'Upcoming Exciting Events',
    eventsSubtitle: 'Join the community\'s thrilling activities',
    
    storiesTitle: 'HaEsh Stories - Real Inspiration',
    storiesSubtitle: 'Moving stories of change and spirituality from the community',
    
    testimonialsTitle: 'Heart Testimonials - Community Voices',
    testimonialsSubtitle: 'How Rabbi Nachman\'s teachings change lives in reality',
    
    communityTitle: 'Our Community - Network of Brotherhood',
    communitySubtitle: 'Meet the amazing people who make up the Breslov family',
    
    footerQuote: 'Never should a person think that it\'s impossible to come close to Hashem',
    footerAttribution: 'Rabbi Nachman of Breslov'
  },
  fr: {
    title: 'HaEsh Hype - Pouls de la Communauté Breslov',
    description: 'Connexion, inspiration et mises à jour de la communauté Breslov dynamique - événements, histoires inspirantes et nouvelles du monde Breslov',
    
    heroTitle: '🔥 HaEsh Hype',
    heroSubtitle: 'Pouls de la Communauté Breslov',
    heroDescription: 'Le centre dynamique pour les nouvelles, événements et histoires de la communauté Breslov active - où chaque âme trouve sa place',
    heroQuote: '"Les vrais tsadikim sont ceux qui ramènent le monde au bien" - Rabbi Nachman de Breslov',
    
    navNews: 'Nouvelles Breslov',
    navEvents: 'Événements à Venir',
    navStories: 'Histoires HaEsh',
    navTestimonials: 'Témoignages du Cœur',
    navCommunity: 'Notre Communauté',
    navMedia: 'Nouveaux Médias',
    
    newsTitle: 'Nouvelles et Projecteur du Monde Breslov',
    newsSubtitle: 'Mises à jour chaudes de la communauté et du monde spirituel',
    
    eventsTitle: 'Événements Passionnants à Venir',
    eventsSubtitle: 'Rejoignez les activités palpitantes de la communauté',
    
    storiesTitle: 'Histoires HaEsh - Inspiration Réelle',
    storiesSubtitle: 'Histoires émouvantes de changement et de spiritualité de la communauté',
    
    testimonialsTitle: 'Témoignages du Cœur - Voix de la Communauté',
    testimonialsSubtitle: 'Comment les enseignements de Rabbi Nachman changent les vies en réalité',
    
    communityTitle: 'Notre Communauté - Réseau de Fraternité',
    communitySubtitle: 'Rencontrez les personnes incroyables qui composent la famille Breslov',
    
    footerQuote: 'Jamais une personne ne devrait penser qu\'il est impossible de se rapprocher d\'Hachem',
    footerAttribution: 'Rabbi Nachman de Breslov'
  }
};

export default function HaeshHype() {
  const { currentLanguage, setLanguage } = useLanguage();
  const [activeSection, setActiveSection] = useState('news');
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedStory, setSelectedStory] = useState<string | null>(null);
  
  const t = translations[currentLanguage as keyof typeof translations] || translations.he;

  // Actualités Breslov récentes
  const breslovNews = [
    {
      id: 'pilgrimage-2025',
      title: currentLanguage === 'he' ? 'הכנות לקיבוץ ראש השנה אומן תשפ״ו' : 'Preparations for Uman Rosh Hashana 2025',
      category: currentLanguage === 'he' ? 'עלייה לרגל' : 'Pilgrimage',
      date: '2025-09-10',
      excerpt: currentLanguage === 'he' ? 'אלפי חסידים ברסלב מתכוננים לקיבוץ המרגש בעיר הקדושה אומן...' : 'Thousands of Breslov chassidim prepare for the exciting gathering in holy Uman...',
      image: '/images/uman-2025.jpg',
      trending: true,
      tags: [currentLanguage === 'he' ? 'אומן' : 'Uman', currentLanguage === 'he' ? 'ראש השנה' : 'Rosh Hashana']
    },
    {
      id: 'new-sefer-release',
      title: currentLanguage === 'he' ? 'הוצאה חדשה של ״ליקוטי מוהר״ן״ עם פירושים חדשים' : 'New Edition of "Likutei Moharan" with New Commentary',
      category: currentLanguage === 'he' ? 'ספרות קדושה' : 'Holy Literature',
      date: '2025-09-08',
      excerpt: currentLanguage === 'he' ? 'הדפסה חדשה ומיוחדת של ספר התורות הקדושות עם הוספות ופירושים...' : 'New special printing of the holy book of teachings with additions and commentary...',
      image: '/images/likutei-new.jpg',
      hot: true,
      tags: [currentLanguage === 'he' ? 'ספרים' : 'Books', currentLanguage === 'he' ? 'תורה' : 'Torah']
    },
    {
      id: 'community-center',
      title: currentLanguage === 'he' ? 'פתיחת מרכז קהילתי ברסלבי חדש בתל אביב' : 'Opening of New Breslov Community Center in Tel Aviv',
      category: currentLanguage === 'he' ? 'קהילה' : 'Community',
      date: '2025-09-05',
      excerpt: currentLanguage === 'he' ? 'מרכז חדש ומודרני לפעילות קהילתית, שיעורים ואירועים מיוחדים...' : 'New modern center for community activities, classes and special events...',
      image: '/images/tel-aviv-center.jpg',
      tags: [currentLanguage === 'he' ? 'מרכז' : 'Center', currentLanguage === 'he' ? 'תל אביב' : 'Tel Aviv']
    }
  ];

  // Événements à venir
  const upcomingEvents = [
    {
      id: 'monthly-gathering',
      title: currentLanguage === 'he' ? 'קיבוץ חודשי - ליל המאור' : 'Monthly Gathering - Night of Light',
      date: '2025-09-20',
      time: '20:00',
      location: currentLanguage === 'he' ? 'בית הכנסת הגדול, ירושלים' : 'Great Synagogue, Jerusalem',
      description: currentLanguage === 'he' ? 'ערב של שירה, מוזיקה וחיבור רוחני עם הקהילה' : 'Evening of song, music and spiritual connection with the community',
      participants: 180,
      maxParticipants: 200,
      category: currentLanguage === 'he' ? 'רוחניות' : 'Spirituality',
      featured: true
    },
    {
      id: 'study-marathon',
      title: currentLanguage === 'he' ? 'מרתון לימוד ״ליקוטי מוהר״ן״' : 'Likutei Moharan Study Marathon',
      date: '2025-09-25',
      time: '18:00',
      location: currentLanguage === 'he' ? 'מרכז הקהילה, בני ברק' : 'Community Center, Bnei Brak',
      description: currentLanguage === 'he' ? 'לילה שלם של לימוד עמוק בספר התורות הקדוש' : 'All night of deep study in the holy book of teachings',
      participants: 95,
      maxParticipants: 120,
      category: currentLanguage === 'he' ? 'לימוד' : 'Study'
    },
    {
      id: 'family-day',
      title: currentLanguage === 'he' ? 'יום משפחות ברסלב בפארק' : 'Breslov Family Day in the Park',
      date: '2025-09-28',
      time: '10:00',
      location: currentLanguage === 'he' ? 'פארק גן העצמאות, נתניה' : 'Independence Park, Netanya',
      description: currentLanguage === 'he' ? 'יום כיף למשפחות עם פעילויות לילדים ונוער' : 'Fun day for families with activities for children and youth',
      participants: 250,
      maxParticipants: 300,
      category: currentLanguage === 'he' ? 'משפחה' : 'Family'
    }
  ];

  // Histoires inspirantes HaEsh
  const haeshStories = [
    {
      id: 'teshuvah-story',
      title: currentLanguage === 'he' ? 'מהחושך לאור - סיפור תשובה מרגש' : 'From Darkness to Light - Moving Teshuvah Story',
      author: currentLanguage === 'he' ? 'אברהם ל., תל אביב' : 'Avraham L., Tel Aviv',
      category: currentLanguage === 'he' ? 'תשובה' : 'Teshuvah',
      excerpt: currentLanguage === 'he' ? 'איך משפט אחד של רבי נחמן שינה את כל החיים שלי...' : 'How one sentence of Rabbi Nachman changed my entire life...',
      readTime: currentLanguage === 'he' ? '5 דקות' : '5 min',
      hearts: 324,
      shares: 89,
      featured: true
    },
    {
      id: 'simcha-healing',
      title: currentLanguage === 'he' ? 'השמחה שריפאה אותי - כח הריפוי של רבי נחמן' : 'The Joy That Healed Me - Rabbi Nachman\'s Healing Power',
      author: currentLanguage === 'he' ? 'מרים ר., חיפה' : 'Miriam R., Haifa',
      category: currentLanguage === 'he' ? 'ריפוי' : 'Healing',
      excerpt: currentLanguage === 'he' ? 'כשהרופאים התייאשו, התורה על השמחה הביאה את הנס...' : 'When doctors gave up hope, the teaching on joy brought the miracle...',
      readTime: currentLanguage === 'he' ? '7 דקות' : '7 min',
      hearts: 256,
      shares: 134
    },
    {
      id: 'young-inspiration',
      title: currentLanguage === 'he' ? 'בן 16 ומלא השראה - הדור הצעיר מתחזק' : '16 Years Old and Full of Inspiration - Young Generation Strengthens',
      author: currentLanguage === 'he' ? 'יוסף מ., ירושלים' : 'Yosef M., Jerusalem',
      category: currentLanguage === 'he' ? 'נוער' : 'Youth',
      excerpt: currentLanguage === 'he' ? 'איך הגעתי לברסלב בגיל 16 ומצאתי את המשמעות האמיתית של החיים...' : 'How I came to Breslov at age 16 and found the true meaning of life...',
      readTime: currentLanguage === 'he' ? '6 דקות' : '6 min',
      hearts: 189,
      shares: 67
    }
  ];

  // Témoignages communautaires
  const testimonials = [
    {
      id: 'life-change',
      name: currentLanguage === 'he' ? 'דוד כהן' : 'David Cohen',
      location: currentLanguage === 'he' ? 'ירושלים' : 'Jerusalem',
      text: currentLanguage === 'he' ? 'תורת רבי נחמן על השמחה ממש הצילה אותי מדיכאון עמוק. היום אני חי חיים חדשים מלאי אור ותקווה.' : 'Rabbi Nachman\'s teaching on joy literally saved me from deep depression. Today I live a new life full of light and hope.',
      years: currentLanguage === 'he' ? '3 שנים בקהילה' : '3 years in community',
      category: currentLanguage === 'he' ? 'ריפוי נפשי' : 'Mental Healing',
      verified: true
    },
    {
      id: 'family-blessing',
      name: currentLanguage === 'he' ? 'רחל אברהמי' : 'Rachel Avrahami',
      location: currentLanguage === 'he' ? 'בני ברק' : 'Bnei Brak',
      text: currentLanguage === 'he' ? 'המשפחה שלנו התחזקה בזכות האמונה הפשוטה של רבי נחמן. הילדים שלנו גדלים באושר ובביטחון.' : 'Our family was strengthened thanks to Rabbi Nachman\'s simple faith. Our children grow up in happiness and confidence.',
      years: currentLanguage === 'he' ? '8 שנים בקהילה' : '8 years in community',
      category: currentLanguage === 'he' ? 'חיי משפחה' : 'Family Life',
      verified: true
    },
    {
      id: 'business-success',
      name: currentLanguage === 'he' ? 'משה לוי' : 'Moshe Levy',
      location: currentLanguage === 'he' ? 'תל אביב' : 'Tel Aviv',
      text: currentLanguage === 'he' ? 'תורת הביטחון של רבי נחמן שינתה את האופן שבו אני מנהל את העסק. מעט לחץ, יותר הצלחה.' : 'Rabbi Nachman\'s teaching on trust changed how I run my business. Less stress, more success.',
      years: currentLanguage === 'he' ? '5 שנים בקהילה' : '5 years in community',
      category: currentLanguage === 'he' ? 'עסקים' : 'Business',
      verified: true
    }
  ];

  // Stats de la communauté
  const communityStats = [
    {
      icon: <Users className="w-8 h-8 text-blue-500" />,
      number: '12,500+',
      label: currentLanguage === 'he' ? 'חברי קהילה פעילים' : 'Active Community Members'
    },
    {
      icon: <Calendar className="w-8 h-8 text-green-500" />,
      number: '150+',
      label: currentLanguage === 'he' ? 'אירועים השנה' : 'Events This Year'
    },
    {
      icon: <BookOpen className="w-8 h-8 text-purple-500" />,
      number: '45+',
      label: currentLanguage === 'he' ? 'שיעורים שבועיים' : 'Weekly Classes'
    },
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      number: '95%',
      label: currentLanguage === 'he' ? 'שביעות רצון חברים' : 'Member Satisfaction'
    }
  ];

  // Rotation automatique des nouvelles
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNewsIndex((prev) => (prev + 1) % breslovNews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [breslovNews.length]);

  return (
    <div className="min-h-screen bg-[#F9F8F6] dark:bg-[#050505]" dir={currentLanguage === 'he' ? 'rtl' : 'ltr'}>
      <Header currentLanguage={currentLanguage} onLanguageChange={setLanguage} />
      
      {/* Hero Section avec Animations Dynamiques */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden border-b border-slate-200 dark:border-white/5" data-testid="hero-section">
        {/* Background Gradient Animé */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-[#050505] dark:via-[#111318] dark:to-[#0A0500] z-0"></div>
        <div className="absolute inset-0 bg-[url('/images/jerusalem-skyline.svg')] bg-cover bg-center opacity-[0.03] dark:opacity-[0.05] mix-blend-screen z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none z-0" />
        
        {/* Particules Flottantes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-[#D4AF37]/30 dark:bg-[#D4AF37]/20 rounded-full blur-[1px]"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight
              }}
              transition={{ 
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>

        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 max-w-4xl mx-auto"
          >
            <motion.h1 
              className={`text-5xl md:text-7xl font-bold tracking-tight mb-6 text-slate-900 dark:text-white ${currentLanguage === 'he' ? 'font-hebrew' : 'font-serif'}`}
              data-testid="hero-title"
              animate={{ 
                textShadow: [
                  '0 0 20px rgba(212,175,55,0.1)',
                  '0 0 40px rgba(212,175,55,0.3)',
                  '0 0 20px rgba(212,175,55,0.1)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="text-[#D4AF37]">🔥</span> {t.heroTitle.replace('🔥 ', '')}
            </motion.h1>
            
            <motion.h2 
              className="text-2xl md:text-3xl font-semibold text-[#B5912B] dark:text-[#D4AF37] mb-8 tracking-wide"
              data-testid="hero-subtitle"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              {t.heroSubtitle}
            </motion.h2>
            
            <GoldDivider size="md" className="mb-8" />
            
            <motion.p 
              className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-12 font-light"
              data-testid="hero-description"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              {t.heroDescription}
            </motion.p>

            {/* Navigation Rapide */}
            <motion.div 
              className="flex flex-wrap justify-center gap-4 mb-16"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              {[
                { id: 'news', label: t.navNews, icon: <Newspaper className="w-5 h-5" /> },
                { id: 'events', label: t.navEvents, icon: <Calendar className="w-5 h-5" /> },
                { id: 'stories', label: t.navStories, icon: <Star className="w-5 h-5" /> },
                { id: 'testimonials', label: t.navTestimonials, icon: <Heart className="w-5 h-5" /> },
                { id: 'community', label: t.navCommunity, icon: <Users className="w-5 h-5" /> }
              ].map((section) => (
                <motion.button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`px-6 py-3 rounded-full font-bold transition-all duration-300 flex items-center gap-2 border ${
                    activeSection === section.id 
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#B5912B] text-white border-transparent shadow-[0_4px_14px_rgba(212,175,55,0.4)] scale-110' 
                      : 'bg-white dark:bg-[#1A1C23] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-[#D4AF37]/50 hover:text-[#D4AF37]'
                  }`}
                  data-testid={`nav-${section.id}`}
                  whileHover={{ scale: activeSection === section.id ? 1.1 : 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {section.icon}
                  {section.label}
                </motion.button>
              ))}
            </motion.div>

            <motion.blockquote 
              className={`text-lg md:text-xl font-medium text-slate-700 dark:text-[#D4AF37] italic ${currentLanguage === 'he' ? 'border-r-4 pr-6' : 'border-l-4 pl-6'} border-[#D4AF37] max-w-3xl mx-auto`}
              data-testid="hero-quote"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              {t.heroQuote}
            </motion.blockquote>
          </motion.div>
        </div>

        {/* Flèche de scroll animée */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronRight className="w-8 h-8 text-[#D4AF37] rotate-90 opacity-70" />
        </motion.div>
      </section>

      {/* Section Actualités */}
      <AnimatePresence mode="wait">
        {activeSection === 'news' && (
          <motion.section 
            key="news"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6 }}
            className="py-24" 
            data-testid="news-section"
          >
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="text-center mb-16">
                <h2 className={`text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 ${currentLanguage === 'he' ? 'font-hebrew' : 'font-serif'}`} data-testid="news-title">
                  {t.newsTitle}
                </h2>
                <p className="text-xl text-slate-600 dark:text-slate-400 font-light max-w-2xl mx-auto" data-testid="news-subtitle">
                  {t.newsSubtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {breslovNews.map((news, index) => (
                  <motion.article
                    key={news.id}
                    className="bg-white dark:bg-[#0A0A0B] rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-slate-200 dark:border-white/5 overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
                    data-testid={`news-card-${news.id}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    {/* Image Header */}
                    <div className="relative h-56 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-[#1A1C23] dark:to-[#111318] overflow-hidden">
                      <div className="absolute inset-0 bg-[url('/images/hero-books.webp')] bg-cover bg-center opacity-30 mix-blend-overlay transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      
                      {news.trending && (
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg">
                          <TrendingUp className="w-3.5 h-3.5" />
                          HOT
                        </div>
                      )}
                      {news.hot && (
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-[#D4AF37] to-[#B5912B] text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg">
                          <Zap className="w-3.5 h-3.5" />
                          חדש
                        </div>
                      )}
                      <div className="absolute inset-0 flex items-center justify-center opacity-50 transition-opacity duration-300 group-hover:opacity-100">
                        <Newspaper className="w-16 h-16 text-white drop-shadow-md" />
                      </div>
                    </div>

                    <div className="p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="bg-slate-100 dark:bg-white/5 text-[#D4AF37] px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase">
                          {news.category}
                        </span>
                        <span className="text-slate-400 dark:text-slate-500 text-xs font-medium">
                          {new Date(news.date).toLocaleDateString(currentLanguage === 'he' ? 'he-IL' : 'en-US')}
                        </span>
                      </div>

                      <h3 className={`text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 leading-tight ${currentLanguage === 'he' ? 'font-hebrew' : 'font-serif'}`}>
                        {news.title}
                      </h3>
                      
                      <p className="text-slate-600 dark:text-slate-400 mb-6 line-clamp-3 font-light leading-relaxed">
                        {news.excerpt}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-8">
                        {news.tags.map((tag) => (
                          <span key={tag} className="bg-slate-50 dark:bg-black/20 text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-white/5 px-2.5 py-1 rounded-md text-xs font-medium">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <button className="w-full bg-white dark:bg-[#1A1C23] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white py-3 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-[#0A0A0B] hover:border-[#D4AF37]/50 hover:text-[#D4AF37] transition-all duration-300 flex items-center justify-center gap-2 group/btn">
                        <BookOpen className="w-4 h-4 text-[#D4AF37] group-hover/btn:scale-110 transition-transform" />
                        {currentLanguage === 'he' ? 'קרא עוד' : 'Read More'}
                      </button>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Section Événements */}
      <AnimatePresence mode="wait">
        {activeSection === 'events' && (
          <motion.section 
            key="events"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6 }}
            className="py-24" 
            data-testid="events-section"
          >
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="text-center mb-16">
                <h2 className={`text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 ${currentLanguage === 'he' ? 'font-hebrew' : 'font-serif'}`} data-testid="events-title">
                  {t.eventsTitle}
                </h2>
                <p className="text-xl text-slate-600 dark:text-slate-400 font-light max-w-2xl mx-auto" data-testid="events-subtitle">
                  {t.eventsSubtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {upcomingEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    className="bg-white dark:bg-[#0A0A0B] rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] overflow-hidden hover:shadow-2xl transition-all duration-500 border border-slate-200 dark:border-white/5 hover:-translate-y-1 relative"
                    data-testid={`event-card-${event.id}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.15 }}
                  >
                    <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#D4AF37] to-[#B5912B]" />
                    
                    {/* Event Header */}
                    <div className="relative p-8 bg-slate-50 dark:bg-[#1A1C23] border-b border-slate-100 dark:border-white/5">
                      {event.featured && (
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-[#D4AF37] to-[#B5912B] text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5">
                          <Star className="w-3.5 h-3.5 fill-white" /> מומלץ
                        </div>
                      )}
                      
                      <div className="flex items-center gap-4 mb-5">
                        <div className="w-14 h-14 rounded-2xl bg-white dark:bg-[#0A0A0B] border border-slate-200 dark:border-white/10 shadow-sm flex items-center justify-center shrink-0">
                          <Calendar className="w-6 h-6 text-[#D4AF37]" />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white text-lg tracking-tight">
                            {new Date(event.date).toLocaleDateString(currentLanguage === 'he' ? 'he-IL' : 'en-US')}
                          </div>
                          <div className="text-[#D4AF37] text-sm font-semibold">{event.time}</div>
                        </div>
                      </div>

                      <h3 className={`text-xl font-bold mb-3 text-slate-900 dark:text-white leading-tight ${currentLanguage === 'he' ? 'font-hebrew' : 'font-serif'}`}>{event.title}</h3>
                      <span className="inline-block bg-white dark:bg-black/20 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/10 px-3 py-1 rounded-full text-xs font-bold tracking-wide">
                        {event.category}
                      </span>
                    </div>

                    <div className="p-8">
                      <div className="flex items-start gap-3 mb-5 text-slate-600 dark:text-slate-300">
                        <MapPin className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                        <span className="text-sm font-medium leading-snug">{event.location}</span>
                      </div>

                      <p className="text-slate-600 dark:text-slate-400 mb-8 font-light leading-relaxed text-sm">
                        {event.description}
                      </p>

                      {/* Participation Info */}
                      <div className="mb-8 p-4 bg-slate-50 dark:bg-[#1A1C23] rounded-xl border border-slate-100 dark:border-white/5">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{currentLanguage === 'he' ? 'משתתפים' : 'Participants'}</span>
                          <span className="text-sm font-bold text-[#D4AF37]">{event.participants}/{event.maxParticipants}</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-black/40 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-[#D4AF37] to-[#B5912B] h-full rounded-full"
                            style={{ width: `${(event.participants / event.maxParticipants) * 100}%` }}
                          ></div>
                        </div>
                      </div>

                      <button className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B5912B] hover:from-[#B5912B] hover:to-[#9E7A1C] text-white py-3.5 rounded-xl font-bold shadow-[0_4px_14px_rgba(212,175,55,0.4)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2">
                        <Users className="w-5 h-5" />
                        {currentLanguage === 'he' ? 'הרשמה לאירוע' : 'Register for Event'}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Section Histoires HaEsh */}
      <AnimatePresence mode="wait">
        {activeSection === 'stories' && (
          <motion.section 
            key="stories"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6 }}
            className="py-24" 
            data-testid="stories-section"
          >
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="text-center mb-16">
                <h2 className={`text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 ${currentLanguage === 'he' ? 'font-hebrew' : 'font-serif'}`} data-testid="stories-title">
                  {t.storiesTitle}
                </h2>
                <p className="text-xl text-slate-600 dark:text-slate-400 font-light max-w-2xl mx-auto" data-testid="stories-subtitle">
                  {t.storiesSubtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {haeshStories.map((story, index) => (
                  <motion.article
                    key={story.id}
                    className="bg-white dark:bg-[#0A0A0B] rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] overflow-hidden hover:shadow-2xl transition-all duration-500 border border-slate-200 dark:border-white/5 hover:-translate-y-1"
                    data-testid={`story-card-${story.id}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    {/* Story Header */}
                    <div className="p-8 border-b border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-[#1A1C23]">
                      <div className="flex items-center justify-between mb-6">
                        <span className="bg-gradient-to-r from-[#D4AF37] to-[#B5912B] text-white px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase shadow-md">
                          {story.category}
                        </span>
                        {story.featured && (
                          <div className="bg-white dark:bg-black/20 text-[#D4AF37] border border-slate-200 dark:border-white/10 px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm">
                            <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
                            מומלץ
                          </div>
                        )}
                      </div>

                      <h3 className={`text-2xl font-bold text-slate-900 dark:text-white mb-4 leading-tight ${currentLanguage === 'he' ? 'font-hebrew' : 'font-serif'}`}>
                        {story.title}
                      </h3>
                      
                      <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 font-medium">
                        <span className="text-[#D4AF37]">{story.author}</span>
                        <span className="opacity-50">•</span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          {story.readTime}
                        </span>
                      </div>
                    </div>

                    <div className="p-8">
                      <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed font-light text-base">
                        {story.excerpt}
                      </p>

                      {/* Engagement Stats */}
                      <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100 dark:border-white/5">
                        <div className="flex items-center gap-6">
                          <button className="flex items-center gap-2 text-rose-500 hover:text-rose-600 transition-colors group">
                            <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            <span className="font-semibold">{story.hearts}</span>
                          </button>
                          <button className="flex items-center gap-2 text-slate-400 hover:text-[#D4AF37] transition-colors group">
                            <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            <span className="font-semibold">{story.shares}</span>
                          </button>
                        </div>
                      </div>

                      <button 
                        onClick={() => setSelectedStory(story.id)}
                        className="w-full bg-white dark:bg-[#1A1C23] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white py-3.5 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-[#0A0A0B] hover:border-[#D4AF37]/50 hover:text-[#D4AF37] transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                      >
                        <BookOpen className="w-4 h-4 text-[#D4AF37] group-hover/btn:scale-110 transition-transform" />
                        {currentLanguage === 'he' ? 'קרא את הסיפור המלא' : 'Read Full Story'}
                      </button>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Section Témoignages */}
      <AnimatePresence mode="wait">
        {activeSection === 'testimonials' && (
          <motion.section 
            key="testimonials"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6 }}
            className="py-24 bg-gradient-to-b from-transparent to-slate-50/50 dark:to-white/[0.02]" 
            data-testid="testimonials-section"
          >
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="text-center mb-16">
                <h2 className={`text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 ${currentLanguage === 'he' ? 'font-hebrew' : 'font-serif'}`} data-testid="testimonials-title">
                  {t.testimonialsTitle}
                </h2>
                <p className="text-xl text-slate-600 dark:text-slate-400 font-light max-w-2xl mx-auto" data-testid="testimonials-subtitle">
                  {t.testimonialsSubtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    className="bg-white dark:bg-[#0A0A0B] rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-10 border border-slate-200 dark:border-white/5 hover:border-[#D4AF37]/30 transition-all duration-500 hover:-translate-y-1 relative overflow-hidden group"
                    data-testid={`testimonial-card-${testimonial.id}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.15 }}
                  >
                    <div className="absolute -top-6 -right-6 text-slate-50 dark:text-white/[0.02] transform rotate-12 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                      <Quote className="w-40 h-40" />
                    </div>
                    
                    <div className="relative z-10">
                      {/* Quarter Icon */}
                      <div className="flex justify-start mb-8">
                        <div className="w-14 h-14 bg-gradient-to-br from-[#D4AF37] to-[#B5912B] rounded-2xl flex items-center justify-center shadow-lg shadow-[#D4AF37]/20">
                          <Quote className="w-6 h-6 text-white fill-white" />
                        </div>
                      </div>

                      {/* Testimonial Text */}
                      <p className={`text-slate-700 dark:text-slate-300 text-xl leading-relaxed mb-8 italic font-light relative ${currentLanguage === 'he' ? 'font-hebrew text-right' : 'font-serif text-left'}`}>
                        "{testimonial.text}"
                      </p>

                      {/* Author Info */}
                      <div className="flex items-center gap-4 pt-6 border-t border-slate-100 dark:border-white/5">
                        <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-[#1A1C23] border border-slate-200 dark:border-white/10 flex items-center justify-center text-[#D4AF37] font-bold text-lg">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-slate-900 dark:text-white">{testimonial.name}</h4>
                            {testimonial.verified && (
                              <div className="w-4 h-4 bg-[#D4AF37] rounded-full flex items-center justify-center">
                                <span className="text-white text-[10px] font-bold">✓</span>
                              </div>
                            )}
                          </div>
                          <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">{testimonial.location} • {testimonial.years}</p>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex">
                        <span className="inline-block bg-slate-50 dark:bg-black/20 text-[#D4AF37] border border-slate-100 dark:border-white/5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase">
                          {testimonial.category}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Section Communauté */}
      <AnimatePresence mode="wait">
        {activeSection === 'community' && (
          <motion.section 
            key="community"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6 }}
            className="py-24" 
            data-testid="community-section"
          >
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="text-center mb-16">
                <h2 className={`text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 ${currentLanguage === 'he' ? 'font-hebrew' : 'font-serif'}`} data-testid="community-title">
                  {t.communityTitle}
                </h2>
                <p className="text-xl text-slate-600 dark:text-slate-400 font-light max-w-2xl mx-auto" data-testid="community-subtitle">
                  {t.communitySubtitle}
                </p>
              </div>

              {/* Statistiques de la Communauté */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
                {communityStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center group"
                    data-testid={`community-stat-${index}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex justify-center mb-6">
                      <div className="w-20 h-20 bg-white dark:bg-[#1A1C23] border border-slate-200 dark:border-white/10 rounded-3xl flex items-center justify-center shadow-xl shadow-slate-200/50 dark:shadow-none transition-transform duration-500 hover:scale-110 hover:rotate-3">
                        <div className="text-[#D4AF37]">
                          {stat.icon}
                        </div>
                      </div>
                    </div>
                    <div className="text-4xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">{stat.number}</div>
                    <div className="text-slate-500 dark:text-slate-400 font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Call to Action Communauté */}
              <motion.div 
                className="bg-[#0A0A0B] relative overflow-hidden rounded-[2.5rem] p-10 md:p-16 text-white text-center border border-white/10 shadow-2xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                data-testid="community-cta"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent pointer-events-none" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[100px] pointer-events-none" />
                
                <div className="relative z-10 max-w-3xl mx-auto">
                  <h3 className={`text-4xl md:text-5xl font-bold mb-6 tracking-tight ${currentLanguage === 'he' ? 'font-hebrew' : 'font-serif'}`}>
                    {currentLanguage === 'he' ? 'הצטרפו למשפחה הברסלבית!' : 'Join the Breslov Family!'}
                  </h3>
                  <p className="text-xl mb-10 text-slate-300 font-light leading-relaxed">
                    {currentLanguage === 'he' 
                      ? 'חברו איתנו למסע של צמיחה רוחנית, אהבה וחיבור עמוק לתורת רבי נחמן'
                      : 'Join us on a journey of spiritual growth, love and deep connection to Rabbi Nachman\'s teachings'
                    }
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="bg-gradient-to-r from-[#D4AF37] to-[#B5912B] hover:from-[#B5912B] hover:to-[#9E7A1C] text-white px-8 py-4 rounded-xl font-bold shadow-[0_4px_14px_rgba(212,175,55,0.4)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2">
                      <Users className="w-5 h-5" />
                      {currentLanguage === 'he' ? 'הצטרפות לקהילה' : 'Join Community'}
                    </button>
                    <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2">
                      <MessageCircle className="w-5 h-5" />
                      {currentLanguage === 'he' ? 'צור קשר' : 'Contact Us'}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Footer avec Citation Inspirante */}
      <footer className="bg-[#050505] border-t border-white/5 text-slate-400 py-20" data-testid="footer">
        <div className="container mx-auto px-4 text-center">
          <motion.div className="w-16 h-16 mx-auto mb-8 opacity-20 bg-[url('/images/jerusalem-skyline.svg')] bg-contain bg-center bg-no-repeat" />
          <motion.blockquote 
            className={`text-2xl md:text-3xl font-light mb-6 italic text-white max-w-4xl mx-auto leading-relaxed ${currentLanguage === 'he' ? 'font-hebrew' : 'font-serif'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            data-testid="footer-quote"
          >
            "{t.footerQuote}"
          </motion.blockquote>
          <motion.p 
            className="text-[#D4AF37] text-lg font-medium tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            data-testid="footer-attribution"
          >
            - {t.footerAttribution}
          </motion.p>
          
          <motion.div 
            className="mt-12 flex justify-center items-center gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="text-center">
              <div className="text-6xl mb-2">🔥</div>
              <div className="text-lg font-semibold">האש שלי</div>
              <div className="text-sm text-blue-200">הקהילה הברסלבית הדינמית</div>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}