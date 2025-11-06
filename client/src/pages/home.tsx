import { Header } from '../components/Header';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function HomeNew() {
  const { currentLanguage, setLanguage } = useLanguage();
  const isRTL = currentLanguage === 'he';

  const translations = {
    he: {
      hero: {
        title: 'קרן רבי ישראל דב אודסר זצ"ל',
        subtitle: 'הפצת תורת רבי נחמן מברסלב לכל העולם',
        cta1: 'תרמו עכשיו',
        cta2: 'כניסה לחנות',
      },
      rabbis: {
        title: 'מי היה רבי ישראל דב אודסר?',
        subtitle: 'התלמיד הגדול ביותר של רבי נחמן מברסלב',
        bio: 'רבי ישראל דב אודסר היה צדיק וקדוש שהקדיש את חייו להפצת תורת רבי נחמן מברסלב. הוא התגלה כאחד המגלים הגדולים ביותר של תורת ברסלב במאה העשרים.',
        readMore: 'קראו עוד',
      },
      features: {
        title: 'הפעילות שלנו',
        feature1: {
          title: 'הפצת ספרים',
          desc: 'מאות אלפי ספרים מופצים מדי שנה לכל קצוות תבל',
        },
        feature2: {
          title: 'שיעורים והרצאות',
          desc: 'שיעורי תורה והרצאות על תורת רבי נחמן מברסלב',
        },
        feature3: {
          title: 'עזרה לנזקקים',
          desc: 'תמיכה במשפחות נזקקות וסיוע בצדקה',
        },
        feature4: {
          title: 'פעילות עולמית',
          desc: 'קהילות ברסלב בכל רחבי העולם',
        },
      },
      lottery: {
        title: 'תרמו והשתתפו בהגרלה',
        desc: 'כל תורם מעל 18 ש"ח משתתף בהגרלה חודשית',
        prize: 'הפרס החודש: 5,000 ₪',
        donate: 'תרמו עכשיו',
      },
      books: {
        title: 'הספרים הפופולריים ביותר',
      },
    },
    en: {
      hero: {
        title: 'Rabbi Israel Dov Odesser Foundation',
        subtitle: 'Spreading Rabbi Nachman of Breslov\'s Torah worldwide',
        cta1: 'Donate Now',
        cta2: 'Enter Store',
      },
      rabbis: {
        title: 'Who was Rabbi Israel Dov Odesser?',
        subtitle: 'The Greatest Student of Rabbi Nachman of Breslov',
        bio: 'Rabbi Israel Dov Odesser was a righteous and holy man who dedicated his life to spreading the teachings of Rabbi Nachman of Breslov. He emerged as one of the greatest revealers of Breslov Torah in the twentieth century.',
        readMore: 'Read More',
      },
      features: {
        title: 'Our Activities',
        feature1: {
          title: 'Book Distribution',
          desc: 'Hundreds of thousands of books distributed annually worldwide',
        },
        feature2: {
          title: 'Classes and Lectures',
          desc: 'Torah classes and lectures on Rabbi Nachman\'s teachings',
        },
        feature3: {
          title: 'Helping the Needy',
          desc: 'Support for needy families and charity assistance',
        },
        feature4: {
          title: 'Worldwide Activity',
          desc: 'Breslov communities across the globe',
        },
      },
      lottery: {
        title: 'Donate and Participate in Raffle',
        desc: 'Every donor of 18 ₪ or more participates in monthly raffle',
        prize: 'This month\'s prize: 5,000 ₪',
        donate: 'Donate Now',
      },
      books: {
        title: 'Most Popular Books',
      },
    },
    fr: {
      hero: {
        title: 'Fondation Rabbi Israel Dov Odesser',
        subtitle: 'Diffusion de la Torah de Rabbi Nachman de Breslov dans le monde entier',
        cta1: 'Faire un don maintenant',
        cta2: 'Entrer dans la boutique',
      },
      rabbis: {
        title: 'Qui était Rabbi Israel Dov Odesser?',
        subtitle: 'Le plus grand étudiant de Rabbi Nachman de Breslov',
        bio: 'Rabbi Israel Dov Odesser était un homme juste et saint qui a consacré sa vie à diffuser les enseignements de Rabbi Nachman de Breslov. Il s\'est révélé être l\'un des plus grands révélateurs de la Torah de Breslov au vingtième siècle.',
        readMore: 'Lire la suite',
      },
      features: {
        title: 'Nos activités',
        feature1: {
          title: 'Distribution de livres',
          desc: 'Des centaines de milliers de livres distribués chaque année dans le monde',
        },
        feature2: {
          title: 'Cours et conférences',
          desc: 'Cours de Torah et conférences sur les enseignements de Rabbi Nachman',
        },
        feature3: {
          title: 'Aide aux nécessiteux',
          desc: 'Soutien aux familles nécessiteuses et aide caritative',
        },
        feature4: {
          title: 'Activité mondiale',
          desc: 'Communautés Breslov à travers le monde',
        },
      },
      lottery: {
        title: 'Faites un don et participez au tirage',
        desc: 'Chaque donateur de 18 ₪ ou plus participe au tirage mensuel',
        prize: 'Prix de ce mois: 5 000 ₪',
        donate: 'Faire un don maintenant',
      },
      books: {
        title: 'Livres les plus populaires',
      },
    },
    es: {
      hero: {
        title: 'Fundación Rabbi Israel Dov Odesser',
        subtitle: 'Difundiendo la Torá de Rabbi Nachman de Breslov en todo el mundo',
        cta1: 'Donar ahora',
        cta2: 'Entrar a la tienda',
      },
      rabbis: {
        title: '¿Quién fue Rabbi Israel Dov Odesser?',
        subtitle: 'El estudiante más grande de Rabbi Nachman de Breslov',
        bio: 'Rabbi Israel Dov Odesser fue un hombre justo y santo que dedicó su vida a difundir las enseñanzas de Rabbi Nachman de Breslov. Surgió como uno de los mayores reveladores de la Torá de Breslov en el siglo XX.',
        readMore: 'Leer más',
      },
      features: {
        title: 'Nuestras actividades',
        feature1: {
          title: 'Distribución de libros',
          desc: 'Cientos de miles de libros distribuidos anualmente en todo el mundo',
        },
        feature2: {
          title: 'Clases y conferencias',
          desc: 'Clases de Torá y conferencias sobre las enseñanzas de Rabbi Nachman',
        },
        feature3: {
          title: 'Ayuda a los necesitados',
          desc: 'Apoyo a familias necesitadas y asistencia caritativa',
        },
        feature4: {
          title: 'Actividad mundial',
          desc: 'Comunidades Breslov en todo el mundo',
        },
      },
      lottery: {
        title: 'Done y participe en el sorteo',
        desc: 'Cada donante de 18 ₪ o más participa en el sorteo mensual',
        prize: 'Premio de este mes: 5,000 ₪',
        donate: 'Donar ahora',
      },
      books: {
        title: 'Libros más populares',
      },
    },
    ru: {
      hero: {
        title: 'Фонд Рабби Израэля Дова Одессера',
        subtitle: 'Распространение Торы Рабби Нахмана из Бреслов по всему миру',
        cta1: 'Пожертвовать сейчас',
        cta2: 'Войти в магазин',
      },
      rabbis: {
        title: 'Кем был Рабби Израэль Дов Одессер?',
        subtitle: 'Величайший ученик Рабби Нахмана из Бреслов',
        bio: 'Рабби Израэль Дов Одессер был праведником и святым человеком, посвятившим свою жизнь распространению учений Рабби Нахмана из Бреслов. Он стал одним из величайших раскрывателей Торы Бреслов в двадцатом веке.',
        readMore: 'Читать далее',
      },
      features: {
        title: 'Наша деятельность',
        feature1: {
          title: 'Распространение книг',
          desc: 'Сотни тысяч книг распространяются ежегодно по всему миру',
        },
        feature2: {
          title: 'Уроки и лекции',
          desc: 'Уроки Торы и лекции об учениях Рабби Нахмана',
        },
        feature3: {
          title: 'Помощь нуждающимся',
          desc: 'Поддержка нуждающихся семей и благотворительная помощь',
        },
        feature4: {
          title: 'Мировая деятельность',
          desc: 'Общины Бреслов по всему миру',
        },
      },
      lottery: {
        title: 'Пожертвуйте и участвуйте в розыгрыше',
        desc: 'Каждый жертвователь от 18 ₪ и более участвует в ежемесячном розыгрыше',
        prize: 'Приз этого месяца: 5 000 ₪',
        donate: 'Пожертвовать сейчас',
      },
      books: {
        title: 'Самые популярные книги',
      },
    },
  };

  const t = translations[currentLanguage as keyof typeof translations] || translations.he;

  const rabbiImages = [
    {
      src: '/images/rabbi-israel-odesser-1.webp',
      alt: 'Rabbi Israel Dov Odesser',
      caption: isRTL ? 'רבי ישראל דב אודסר זצ"ל' : 'Rabbi Israel Dov Odesser zt"l',
    },
    {
      src: '/images/rabbi-israel-odesser-2.webp',
      alt: 'Rabbi Israel Odesser Teaching',
      caption: isRTL ? 'רבי ישראל בשיעור תורה' : 'Rabbi Israel Teaching Torah',
    },
    {
      src: '/images/rabbi-israel-odesser-3.webp',
      alt: 'Rabbi Israel Odesser Praying',
      caption: isRTL ? 'רבי ישראל בתפילה' : 'Rabbi Israel in Prayer',
    },
    {
      src: '/images/rabbi-nachman-breslov.webp',
      alt: 'Rabbi Nachman of Breslov',
      caption: isRTL ? 'רבינו נחמן מברסלב זצוקללה"ה' : 'Rabbi Nachman of Breslov',
    },
  ];

  const books = [
    {
      title: isRTL ? 'ליקוטי מוהרן' : 'Likutei Moharan',
      image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/07/6.d110a0.webp',
      price: '₪120',
    },
    {
      title: isRTL ? 'ליקוטי תפילות' : 'Likutei Tefilot',
      image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/07/3.d110a0.webp',
      price: '₪90',
    },
    {
      title: isRTL ? 'סיפורי מעשיות' : 'Sipurei Maasiyot',
      image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2025/02/%D7%AA%D7%9E%D7%95%D7%A0%D7%AA-%D7%9E%D7%95%D7%A6%D7%A8-3.d110a0.webp',
      price: '₪85',
    },
    {
      title: isRTL ? 'חומש ליקוטי הלכות' : 'Chumash Likutei Halachos',
      image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/07/5.d110a0.webp',
      price: '₪150',
    },
  ];

  return (
    <div className="min-h-screen bg-white" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
      <Header currentLanguage={currentLanguage} onLanguageChange={setLanguage} />

      {/* Hero Section - Magazine Style */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0 animate-pulse"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Main Title */}
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 animate-fade-in leading-tight">
              {t.hero.title}
            </h1>

            {/* Subtitle */}
            <p className="text-2xl md:text-3xl text-blue-100 mb-12 font-light">
              {t.hero.subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex gap-6 justify-center flex-wrap mb-16">
              <a href="/donate">
                <Button className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 font-bold text-xl px-12 py-8 rounded-xl shadow-2xl transform hover:scale-105 transition-all">
                  {t.hero.cta1} 🎁
                </Button>
              </a>
              <a href="/store">
                <Button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold text-xl px-12 py-8 rounded-xl border-2 border-white/30 shadow-2xl transform hover:scale-105 transition-all">
                  {t.hero.cta2} 📚
                </Button>
              </a>
            </div>

            {/* Scroll Indicator */}
            <div className="animate-bounce">
              <svg className="w-8 h-8 mx-auto text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Rabbi Israel Odesser Section - Magazine Grid */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
                {t.rabbis.title}
              </h2>
              <p className="text-2xl text-blue-600 font-semibold">
                {t.rabbis.subtitle}
              </p>
            </div>

            {/* Magazine-style Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Large Featured Image */}
              <Card className="overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow group">
                <div className="relative h-[600px] overflow-hidden">
                  <img
                    src={rabbiImages[0].src}
                    alt={rabbiImages[0].alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600'%3E%3Crect fill='%23e5e7eb' width='400' height='600'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%236b7280' font-size='24'%3E%D7%A6%D7%99%D7%9C%D7%95%D7%9D %D7%A8%D7%91%D7%99 %D7%99%D7%A9%D7%A8%D7%90%D7%9C%3C/text%3E%3C/svg%3E";
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                    <h3 className="text-3xl font-bold text-white">
                      {rabbiImages[0].caption}
                    </h3>
                  </div>
                </div>
              </Card>

              {/* Grid of smaller images */}
              <div className="grid grid-rows-2 gap-8">
                {rabbiImages.slice(1, 3).map((img, idx) => (
                  <Card key={idx} className="overflow-hidden shadow-xl hover:shadow-2xl transition-shadow group">
                    <div className="relative h-[285px] overflow-hidden">
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          e.currentTarget.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='285'%3E%3Crect fill='%23e5e7eb' width='400' height='285'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%236b7280' font-size='16'%3E%D7%A6%D7%99%D7%9C%D7%95%D7%9D ${idx + 2}%3C/text%3E%3C/svg%3E`;
                        }}
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                        <h3 className="text-xl font-bold text-white">
                          {img.caption}
                        </h3>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Biography Section */}
            <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-0 shadow-xl">
              <CardContent className="p-12">
                <p className="text-xl text-gray-700 leading-relaxed mb-8">
                  {t.rabbis.bio}
                </p>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-6 text-lg">
                  {t.rabbis.readMore} →
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Lottery Banner - Eye-Catching */}
      <section className="py-20 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 animate-pulse" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23ffffff\' fill-opacity=\'1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
          }} />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-6xl mb-6 animate-bounce">
              🎁
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              {t.lottery.title}
            </h2>
            <p className="text-2xl text-white mb-4">
              {t.lottery.desc}
            </p>
            <div className="bg-black/20 backdrop-blur-sm rounded-2xl py-6 px-8 inline-block mb-8">
              <p className="text-3xl font-bold text-white">
                {t.lottery.prize}
              </p>
            </div>
            <div>
              <a href="/donate">
                <Button className="bg-white text-orange-600 hover:bg-gray-100 font-bold text-2xl px-16 py-8 rounded-xl shadow-2xl transform hover:scale-105 transition-all">
                  {t.lottery.donate} 🚀
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Modern Cards */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-bold text-center text-gray-900 mb-16">
              {t.features.title}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: '📚', ...t.features.feature1 },
                { icon: '🎓', ...t.features.feature2 },
                { icon: '💝', ...t.features.feature3 },
                { icon: '🌍', ...t.features.feature4 },
              ].map((feature, idx) => (
                <Card key={idx} className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-gray-100 group">
                  <CardContent className="p-8 text-center">
                    <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-lg">
                      {feature.desc}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Popular Books - Sleek Showcase */}
      <section className="py-24 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl font-bold text-center text-gray-900 mb-16">
              {t.books.title}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {books.map((book, idx) => (
                <a key={idx} href="/store" className="group">
                  <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                    <div className="relative h-80 overflow-hidden">
                      <img
                        src={book.image}
                        alt={book.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                        {book.price}
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 text-center group-hover:text-blue-600 transition-colors">
                        {book.title}
                      </h3>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
            <div className="text-center mt-12">
              <a href="/store">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xl px-12 py-6 rounded-xl shadow-xl">
                  {isRTL ? 'צפו בכל הספרים' : 'View All Books'} →
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {isRTL ? 'הצטרפו למשפחה הברסלבית העולמית' : 'Join the Global Breslov Family'}
            </h2>
            <p className="text-xl mb-10 text-blue-100">
              {isRTL ? 'עזרו לנו להפיץ את אור התורה לכל קצוות תבל' : 'Help us spread the light of Torah to all corners of the world'}
            </p>
            <div className="flex gap-6 justify-center flex-wrap">
              <a href="/donate">
                <Button className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 font-bold text-xl px-10 py-6 rounded-xl">
                  {isRTL ? 'תרמו עכשיו' : 'Donate Now'}
                </Button>
              </a>
              <a href="/join">
                <Button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold text-xl px-10 py-6 rounded-xl border-2 border-white/30">
                  {isRTL ? 'הצטרפו אלינו' : 'Join Us'}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
