import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Star, ChevronRight, CheckCircle2, DollarSign, Sparkles, Shield, Gift } from 'lucide-react';

const translations = {
  he: {
    title: 'העוצמה לתת | האש שלי',
    description: 'הצטרפו לתומכי האש שלי והפיצו את תורת ברסלב בעולם.',
    heroTitle: 'השותפות שלכם מאירה את העולם',
    heroSubtitle: 'יחד ננגיש את אור ברסלב לכל יהודי, בכל מקום בעולם.',
    heroDescription: 'כל תרומה מאפשרת לנו לפתח מערכות חכמות יותר, להרחיב את מאגר הספרים, ולהגיע ללבבות נוספים. היו שותפים למהפכה הדיגיטלית של חכמת רבי נחמן.',
    tiersTitle: 'בחרו את רמת התמיכה שלכם',
    tiersSubtitle: 'כל תרומה קטנה כגדולה יוצרת השפעה נצחית',
    securePayment: 'תשלום מאובטח ברמת הצפנה גבוהה',
    selectAmount: 'או בחרו סכום מותאם אישית:',
    customAmountPlaceholder: 'סכום התרומה בש״ח',
    donateNow: 'תרום עכשיו',
    processing: 'מעבד תשלום...',
    tiers: [
      {
        id: 'light',
        name: 'נר למאור',
        price: '18',
        icon: '🕯️',
        description: 'תרומה סמלית להפצת אור ברסלב. כי "מעט מן האור דוחה הרבה מן החושך".',
        features: ['גישה לספרים חינמיים', 'תפילה בציון הקדוש', 'עידכונים מיוחדים']
      },
      {
        id: 'partner',
        name: 'שותף להפצה',
        price: '148',
        icon: '🤝',
        popular: true,
        description: 'זכות בלימוד ותמיכה בשרתי האתר ויכולות ה־AI החדשניות.',
        features: ['כל זכויות נר למאור', 'הקדשה יומית באתר', 'ספר במתנה חודשית']
      },
      {
        id: 'pillar',
        name: 'עמוד התווך',
        price: '1,000',
        icon: '🏛️',
        description: 'תמיכה אסטרטגית המאפשרת פיתוח כלים טכנולוגיים חדשים להפצת החכמה.',
        features: ['שותפות נצחית באפליקציות', 'הקדשה קבועה בעמוד הבית', 'תעודת הוקרה מהודרת']
      }
    ]
  },
  en: {
    title: 'The Power to Give | My Fire',
    description: 'Join the supporters of My Fire and spread Breslov teachings worldwide.',
    heroTitle: 'Your Partnership Lights Up The World',
    heroSubtitle: 'Together we will make Breslov light accessible to every Jew, anywhere in the world.',
    heroDescription: 'Every donation allows us to develop smarter systems, expand the book repository, and reach more hearts. Be a partner in the digital revolution of Rabbi Nachman\'s wisdom.',
    tiersTitle: 'Choose Your Support Level',
    tiersSubtitle: 'Every donation, small or large, creates an eternal impact',
    securePayment: 'Secure payment with high-level encryption',
    selectAmount: 'Or select a custom amount:',
    customAmountPlaceholder: 'Donation amount',
    donateNow: 'Donate Now',
    processing: 'Processing...',
    tiers: [
      {
        id: 'light',
        name: 'Candle of Light',
        price: '18',
        icon: '🕯️',
        description: 'A symbolic donation to spread light. Because "a little light dispels a lot of darkness".',
        features: ['Access to free books', 'Prayer at the holy site', 'Special updates']
      },
      {
        id: 'partner',
        name: 'Distribution Partner',
        price: '148',
        icon: '🤝',
        popular: true,
        description: 'Merit in Torah study and supporting site servers and innovative AI capabilities.',
        features: ['All Candle rights', 'Daily site dedication', 'Monthly gift book']
      },
      {
        id: 'pillar',
        name: 'Pillar of Support',
        price: '1,000',
        icon: '🏛️',
        description: 'Strategic support enabling the development of new technological tools for spreading wisdom.',
        features: ['Eternal app partnership', 'Permanent homepage dedication', 'Elegant certificate of appreciation']
      }
    ]
  },
  fr: {
    title: 'Le Pouvoir de Donner | Mon Feu',
    description: 'Rejoignez les soutiens de Mon Feu et répandez les enseignements de Breslov partout.',
    heroTitle: 'Votre Partenariat Illumine Le Monde',
    heroSubtitle: 'Ensemble, nous rendrons la lumière de Breslov accessible à chaque Juif.',
    heroDescription: 'Chaque don nous permet de développer des systèmes plus intelligents, d\'élargir le référentiel de livres et d\'atteindre plus de cœurs.',
    tiersTitle: 'Choisissez Votre Niveau de Soutien',
    tiersSubtitle: 'Chaque don crée un impact éternel',
    securePayment: 'Paiement sécurisé avec un haut niveau de cryptage',
    selectAmount: 'Ou sélectionnez un montant personnalisé :',
    customAmountPlaceholder: 'Montant du don',
    donateNow: 'Faire un Don',
    processing: 'Traitement...',
    tiers: [
      {
        id: 'light',
        name: 'Bougie de Lumière',
        price: '18',
        icon: '🕯️',
        description: 'Un don symbolique pour répandre la lumière.',
        features: ['Accès aux livres gratuits', 'Prière sur le site sacré', 'Mises à jour spéciales']
      },
      {
        id: 'partner',
        name: 'Partenaire de Distribution',
        price: '148',
        icon: '🤝',
        popular: true,
        description: 'Mérite dans l\'étude de la Torah et soutien aux serveurs du site.',
        features: ['Tous les droits Bougie', 'Dédicace quotidienne sur le site', 'Livre cadeau mensuel']
      },
      {
        id: 'pillar',
        name: 'Pilier de Soutien',
        price: '1,000',
        icon: '🏛️',
        description: 'Soutien stratégique permettant le développement de nouveaux outils.',
        features: ['Partenariat éternel des applications', 'Dédicace permanente en page d\'accueil', 'Certificat d\'appréciation élégant']
      }
    ]
  },
  es: {
    title: 'El Poder de Dar | Mi Fuego',
    description: 'Únase a los seguidores de Mi Fuego y difunda las enseñanzas de Breslov.',
    heroTitle: 'Tu Asociación Ilumina El Mundo',
    heroSubtitle: 'Juntos haremos que la luz de Breslov sea accesible para cada Judío.',
    heroDescription: 'Cada donación nos permite desarrollar sistemas más inteligentes, expandir el repositorio de libros y llegar a más corazones.',
    tiersTitle: 'Elige Tu Nivel de Apoyo',
    tiersSubtitle: 'Cada donación crea un impacto eterno',
    securePayment: 'Pago seguro con alto nivel de encriptación',
    selectAmount: 'O selecciona un monto personalizado:',
    customAmountPlaceholder: 'Monto de la donación',
    donateNow: 'Donar Ahora',
    processing: 'Procesando...',
    tiers: [
      {
        id: 'light',
        name: 'Vela de Luz',
        price: '18',
        icon: '🕯️',
        description: 'Una donación simbólica para difundir la luz.',
        features: ['Acceso a libros gratuitos', 'Oración en el sitio sagrado', 'Actualizaciones especiales']
      },
      {
        id: 'partner',
        name: 'Socio de Distribución',
        price: '148',
        icon: '🤝',
        popular: true,
        description: 'Mérito en el estudio de la Torá y apoyo a los servidores del sitio.',
        features: ['Todos los derechos Vela', 'Dedicación diaria en el sitio', 'Libro de regalo mensual']
      },
      {
        id: 'pillar',
        name: 'Pilar de Apoyo',
        price: '1,000',
        icon: '🏛️',
        description: 'Apoyo estratégico que permite el desarrollo de nuevas herramientas.',
        features: ['Asociación eterna de aplicaciones', 'Dedicación permanente en inicio', 'Elegante certificado de apreciación']
      }
    ]
  },
  ru: {
    title: 'Сила Даяния | Мой Огонь',
    description: 'Присоединяйтесь к сторонникам Моего Огня и распространяйте учения Бреслов.',
    heroTitle: 'Ваше Партнерство Освещает Мир',
    heroSubtitle: 'Вместе мы сделаем свет Бреслов доступным для каждого еврея.',
    heroDescription: 'Каждое пожертвование позволяет нам развивать умные системы, расширять репозиторий книг и достигать большего количества сердец.',
    tiersTitle: 'Выберите Ваш Уровень Поддержки',
    tiersSubtitle: 'Каждое пожертвование создает вечное влияние',
    securePayment: 'Безопасная оплата',
    selectAmount: 'Или выберите произвольную сумму:',
    customAmountPlaceholder: 'Сумма пожертвования',
    donateNow: 'Пожертвовать',
    processing: 'Обработка...',
    tiers: [
      {
        id: 'light',
        name: 'Свеча Света',
        price: '18',
        icon: '🕯️',
        description: 'Символическое пожертвование.',
        features: ['Доступ к бесплатным книгам', 'Молитва на святом месте', 'Особые обновления']
      },
      {
        id: 'partner',
        name: 'Партнер по Распространению',
        price: '148',
        icon: '🤝',
        popular: true,
        description: 'Заслуга в изучении Торы и поддержка серверов сайта.',
        features: ['Все права Свечи', 'Ежедневное посвящение', 'Ежемесячная подарочная книга']
      },
      {
        id: 'pillar',
        name: 'Опора Поддержки',
        price: '1,000',
        icon: '🏛️',
        description: 'Стратегическая поддержка разработки новых инструментов.',
        features: ['Вечное партнерство приложений', 'Постоянное посвящение на главной', 'Элегантный сертификат']
      }
    ]
  }
};

export default function Donate() {
  const { currentLanguage, setLanguage } = useLanguage();
  const t = translations[currentLanguage as keyof typeof translations] || translations.he;
  const isRTL = currentLanguage === 'he';

  const [selectedTier, setSelectedTier] = useState<string | null>('partner');
  const [customAmount, setCustomAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    document.title = t.title;
  }, [t.title]);

  const handleDonate = () => {
    setIsProcessing(true);
    // Simulate payment process delay
    setTimeout(() => {
      window.location.href = 'https://buy.stripe.com/test_14k3cdeNwaGq67mbII'; // Mock stripe link
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
      <Header currentLanguage={currentLanguage} onLanguageChange={setLanguage} />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-slate-900 to-orange-900">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-orange-300 font-semibold mb-8 shadow-sm">
              <Sparkles className="w-4 h-4" />
              <span>{t.heroSubtitle}</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight leading-tight drop-shadow-lg">
              {t.heroTitle}
            </h1>
            
            <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
              {t.heroDescription}
            </p>
          </motion.div>
        </div>
        
        {/* Animated wave bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-50 dark:from-slate-900 to-transparent"></div>
      </section>

      {/* Tiers Section */}
      <section className="py-20 relative z-20 -mt-16">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              {t.tiersTitle}
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              {t.tiersSubtitle}
            </p>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {t.tiers.map((tier, index) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                key={tier.id}
                onClick={() => { setSelectedTier(tier.id); setCustomAmount(''); }}
                className={`relative p-8 rounded-3xl cursor-pointer transition-all duration-300 border-2 overflow-hidden bg-white dark:bg-slate-800 shadow-xl ${
                  selectedTier === tier.id 
                    ? 'border-orange-500 shadow-orange-500/20 transform -translate-y-2' 
                    : 'border-transparent hover:border-orange-300 dark:hover:border-orange-800'
                }`}
              >
                {/* Popular Badge */}
                {tier.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold px-4 py-1 rounded-bl-xl z-20">
                    {currentLanguage === 'he' ? 'מומלץ' : 'Recommended'}
                  </div>
                )}
                
                {selectedTier === tier.id && (
                  <div className="absolute inset-0 bg-orange-50 dark:bg-orange-900/10 pointer-events-none"></div>
                )}

                <div className="relative z-10">
                  <div className="text-5xl mb-4">{tier.icon}</div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{tier.name}</h3>
                  <div className="flex items-baseline gap-1 mb-6 text-orange-600 dark:text-orange-400">
                    <span className="text-2xl font-medium">$</span>
                    <span className="text-5xl font-extrabold tracking-tight">{tier.price}</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 min-h-[60px]">
                    {tier.description}
                  </p>
                  
                  <div className="space-y-3 mb-8">
                    {tier.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-colors ${
                    selectedTier === tier.id 
                      ? 'bg-orange-500 text-white border-orange-500' 
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                  }`}>
                    {selectedTier === tier.id ? (
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-current" />
                    )}
                    <span className="font-semibold">{currentLanguage === 'he' ? 'בחר מסלול זה' : 'Select Tier'}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Custom Amount & Checkout */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700"
          >
            <div className="mb-8">
              <label className="block text-lg font-semibold text-slate-900 dark:text-white mb-4 text-center">
                {t.selectAmount}
              </label>
              <div className="relative max-w-xs mx-auto">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <DollarSign className="w-6 h-6 text-slate-400" />
                </div>
                <input
                  type="number"
                  placeholder={t.customAmountPlaceholder}
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    if (e.target.value) setSelectedTier(null);
                  }}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 focus:border-orange-500 dark:focus:border-orange-500 bg-slate-50 dark:bg-slate-900 text-xl font-bold dark:text-white outline-none transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col items-center">
              <button
                onClick={handleDonate}
                disabled={isProcessing || (!selectedTier && !customAmount)}
                className={`w-full max-w-md py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${
                  (!selectedTier && !customAmount)
                    ? 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-xl shadow-orange-500/20 transform hover:-translate-y-1'
                }`}
              >
                {isProcessing ? (
                  <>
                    <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>{t.processing}</span>
                  </>
                ) : (
                  <>
                    <Gift className="w-6 h-6" />
                    <span>{t.donateNow}</span>
                  </>
                )}
              </button>
              
              <div className="flex items-center gap-2 mt-6 text-slate-500 dark:text-slate-400 text-sm">
                <Shield className="w-4 h-4 text-green-500" />
                <span>{t.securePayment}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
