import { Header } from '../components/Header';
import { useLanguage } from '../contexts/LanguageContext';
import { useState, useEffect } from 'react';
import { GoldDivider } from '../components/GoldDivider';
import { rtlFont } from '../lib/utils';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageCircle,
  CheckCircle,
  BookOpen,
  Heart,
  Users,
  Lightbulb
} from 'lucide-react';

const translations = {
  he: {
    // SEO
    title: 'צור קשר - האש שלי | נשמח לעזור ולענות על כל שאלה',
    description: 'צור קשר עם צוות האש שלי. נענה על שאלות, נעזור בהזמנות ונספק שירות מקצועי לקהילה הברסלבית.',

    // Hero Section
    heroTitle: 'נשמח לעזור לכם',
    heroSubtitle: 'הצוות שלנו כאן כדי לענות על כל שאלה ולהעניק שירות מקצועי',
    heroDescription: 'בין אם אתם מחפשים ספר מסוים, זקוקים לעזרה עם הזמנה, או פשוט רוצים לשתף משוב - אנחנו כאן בשבילכם.',

    // Form Section
    formTitle: 'שלחו לנו הודעה',
    formSubtitle: 'נחזור אליכם תוך 24 שעות',
    name: 'שם מלא',
    email: 'כתובת אימייל',
    phone: 'טלפון (אופציונלי)',
    subject: 'נושא הפנייה',
    message: 'תוכן ההודעה',
    send: 'שלח הודעה',
    sending: 'שולח...',
    
    // Placeholders
    namePlaceholder: 'שם מלא',
    emailPlaceholder: 'example@email.com',
    phonePlaceholder: '+972-50-123-4567',
    subjectPlaceholder: 'בחרו נושא...',
    messagePlaceholder: 'כתבו כאן את ההודעה שלכם...',
    
    // Subjects
    subjects: [
      'שאלה כללית',
      'הזמנת ספר מיוחד',
      'בעיה עם ההזמנה',
      'משוב על המוצר',
      'שאלה טכנית',
      'אחר'
    ],

    // Contact Info
    contactTitle: 'פרטי התקשרות',
    contactSubtitle: 'דרכים נוספות ליצור עמנו קשר',
    
    address: 'כתובת',
    addressText: 'ישראל, פתח תקווה',
    emailContact: 'אימייל',
    emailText: 'contact@haesh-sheli.co.il',
    phoneContact: 'טלפון',
    phoneText: '+972-50-123-4567',
    hours: 'שעות פעילות',
    hoursText: 'ימים א\'-ה\': 9:00-18:00\nימי ו\': 9:00-13:00\nימי שבת: סגור',

    // Features
    featuresTitle: 'למה לבחור בנו?',
    features: [
      {
        title: 'מענה מהיר',
        description: 'תמיד נחזור אליכם תוך 24 שעות',
        icon: 'MessageCircle'
      },
      {
        title: 'שירות אישי',
        description: 'כל לקוח מקבל יחס אישי ומקצועי',
        icon: 'Heart'
      },
      {
        title: 'מומחיות ברסלבית',
        description: 'הצוות שלנו מכיר לעומק את הספרות הברסלבית',
        icon: 'BookOpen'
      },
      {
        title: 'קהילה תומכת',
        description: 'אנחנו חלק מהקהילה הברסלבית העולמית',
        icon: 'Users'
      }
    ],

    // Success & Error
    thankYou: 'תודה רבה! ההודעה נשלחה בהצלחה',
    thankYouDescription: 'נחזור אליכם בהקדם האפשרי',
    errorMessage: 'אירעה שגיאה. אנא נסו שוב מאוחר יותר',
    
    // CTA
    ctaTitle: 'מוכנים להתחיל?',
    ctaDescription: 'עיינו בקטלוג הספרים שלנו או צרו איתנו קשר לייעוץ אישי'
  },
  
  en: {
    // SEO
    title: 'Contact Us - My Fire | We\'re here to help with any question',
    description: 'Contact the My Fire team. We answer questions, help with orders and provide professional service to the Breslov community.',

    // Hero Section
    heroTitle: 'We\'re Here to Help',
    heroSubtitle: 'Our team is here to answer any question and provide professional service',
    heroDescription: 'Whether you\'re looking for a specific book, need help with an order, or simply want to share feedback - we\'re here for you.',

    // Form Section
    formTitle: 'Send Us a Message',
    formSubtitle: 'We\'ll get back to you within 24 hours',
    name: 'Full Name',
    email: 'Email Address',
    phone: 'Phone (Optional)',
    subject: 'Subject',
    message: 'Message',
    send: 'Send Message',
    sending: 'Sending...',
    
    // Placeholders
    namePlaceholder: 'Full Name',
    emailPlaceholder: 'example@email.com',
    phonePlaceholder: '+972-50-123-4567',
    subjectPlaceholder: 'Choose subject...',
    messagePlaceholder: 'Write your message here...',
    
    // Subjects
    subjects: [
      'General Question',
      'Special Book Order',
      'Order Problem',
      'Product Feedback',
      'Technical Question',
      'Other'
    ],

    // Contact Info
    contactTitle: 'Contact Information',
    contactSubtitle: 'Additional ways to reach us',
    
    address: 'Address',
    addressText: 'Israel, Petah Tikva',
    emailContact: 'Email',
    emailText: 'contact@haesh-sheli.co.il',
    phoneContact: 'Phone',
    phoneText: '+972-50-123-4567',
    hours: 'Business Hours',
    hoursText: 'Sunday-Thursday: 9:00-18:00\nFridays: 9:00-13:00\nSaturdays: Closed',

    // Features
    featuresTitle: 'Why Choose Us?',
    features: [
      {
        title: 'Quick Response',
        description: 'We always get back to you within 24 hours',
        icon: 'MessageCircle'
      },
      {
        title: 'Personal Service',
        description: 'Every customer receives personal and professional treatment',
        icon: 'Heart'
      },
      {
        title: 'Breslov Expertise',
        description: 'Our team deeply knows Breslov literature',
        icon: 'BookOpen'
      },
      {
        title: 'Supportive Community',
        description: 'We\'re part of the global Breslov community',
        icon: 'Users'
      }
    ],

    // Success & Error
    thankYou: 'Thank you! Message sent successfully',
    thankYouDescription: 'We\'ll get back to you as soon as possible',
    errorMessage: 'An error occurred. Please try again later',
    
    // CTA
    ctaTitle: 'Ready to Start?',
    ctaDescription: 'Browse our book catalog or contact us for personal consultation'
  },

  fr: {
    // SEO
    title: 'Contactez-Nous - Mon Feu | Nous sommes là pour vous aider',
    description: 'Contactez l\'équipe de Mon Feu. Nous répondons aux questions, aidons avec les commandes et fournissons un service professionnel à la communauté Breslov.',

    // Hero Section
    heroTitle: 'Nous Sommes Là Pour Vous Aider',
    heroSubtitle: 'Notre équipe est là pour répondre à toute question et fournir un service professionnel',
    heroDescription: 'Que vous cherchiez un livre spécifique, ayez besoin d\'aide avec une commande, ou souhaitiez simplement partager vos commentaires - nous sommes là pour vous.',

    // Form Section
    formTitle: 'Envoyez-nous un Message',
    formSubtitle: 'Nous vous répondrons dans les 24 heures',
    name: 'Nom Complet',
    email: 'Adresse Email',
    phone: 'Téléphone (Optionnel)',
    subject: 'Sujet',
    message: 'Message',
    send: 'Envoyer le Message',
    sending: 'Envoi...',
    
    // Placeholders
    namePlaceholder: 'Nom Complet',
    emailPlaceholder: 'exemple@email.com',
    phonePlaceholder: '+972-50-123-4567',
    subjectPlaceholder: 'Choisir un sujet...',
    messagePlaceholder: 'Écrivez votre message ici...',
    
    // Subjects
    subjects: [
      'Question Générale',
      'Commande de Livre Spécial',
      'Problème de Commande',
      'Commentaire sur le Produit',
      'Question Technique',
      'Autre'
    ],

    // Contact Info
    contactTitle: 'Informations de Contact',
    contactSubtitle: 'Autres moyens de nous joindre',
    
    address: 'Adresse',
    addressText: 'Israël, Petah Tikva',
    emailContact: 'Email',
    emailText: 'contact@haesh-sheli.co.il',
    phoneContact: 'Téléphone',
    phoneText: '+972-50-123-4567',
    hours: 'Heures d\'Ouverture',
    hoursText: 'Dimanche-Jeudi: 9:00-18:00\nVendredis: 9:00-13:00\nSamedis: Fermé',

    // Features
    featuresTitle: 'Pourquoi Nous Choisir?',
    features: [
      {
        title: 'Réponse Rapide',
        description: 'Nous vous répondons toujours dans les 24 heures',
        icon: 'MessageCircle'
      },
      {
        title: 'Service Personnel',
        description: 'Chaque client reçoit un traitement personnel et professionnel',
        icon: 'Heart'
      },
      {
        title: 'Expertise Breslov',
        description: 'Notre équipe connaît profondément la littérature Breslov',
        icon: 'BookOpen'
      },
      {
        title: 'Communauté Solidaire',
        description: 'Nous faisons partie de la communauté Breslov mondiale',
        icon: 'Users'
      }
    ],

    // Success & Error
    thankYou: 'Merci! Message envoyé avec succès',
    thankYouDescription: 'Nous vous répondrons dès que possible',
    errorMessage: 'Une erreur s\'est produite. Veuillez réessayer plus tard',
    
    // CTA
    ctaTitle: 'Prêt à Commencer?',
    ctaDescription: 'Parcourez notre catalogue de livres ou contactez-nous pour une consultation personnelle'
  },

  es: {
    // SEO
    title: 'Contáctanos - Mi Fuego | Estamos aquí para ayudar',
    description: 'Contacta al equipo de Mi Fuego. Respondemos preguntas, ayudamos con pedidos y brindamos servicio profesional a la comunidad Breslov.',

    // Hero Section
    heroTitle: 'Estamos Aquí Para Ayudar',
    heroSubtitle: 'Nuestro equipo está aquí para responder cualquier pregunta y brindar servicio profesional',
    heroDescription: 'Ya sea que busques un libro específico, necesites ayuda con un pedido, o simplemente quieras compartir comentarios - estamos aquí para ti.',

    // Form Section
    formTitle: 'Envíanos un Mensaje',
    formSubtitle: 'Te responderemos dentro de 24 horas',
    name: 'Nombre Completo',
    email: 'Dirección de Email',
    phone: 'Teléfono (Opcional)',
    subject: 'Asunto',
    message: 'Mensaje',
    send: 'Enviar Mensaje',
    sending: 'Enviando...',
    
    // Placeholders
    namePlaceholder: 'Nombre Completo',
    emailPlaceholder: 'ejemplo@email.com',
    phonePlaceholder: '+972-50-123-4567',
    subjectPlaceholder: 'Elegir asunto...',
    messagePlaceholder: 'Escribe tu mensaje aquí...',
    
    // Subjects
    subjects: [
      'Pregunta General',
      'Pedido de Libro Especial',
      'Problema con Pedido',
      'Comentario sobre Producto',
      'Pregunta Técnica',
      'Otro'
    ],

    // Contact Info
    contactTitle: 'Información de Contacto',
    contactSubtitle: 'Formas adicionales de contactarnos',
    
    address: 'Dirección',
    addressText: 'Israel, Petah Tikva',
    emailContact: 'Email',
    emailText: 'contact@haesh-sheli.co.il',
    phoneContact: 'Teléfono',
    phoneText: '+972-50-123-4567',
    hours: 'Horarios de Atención',
    hoursText: 'Domingo-Jueves: 9:00-18:00\nViernes: 9:00-13:00\nSábados: Cerrado',

    // Features
    featuresTitle: '¿Por Qué Elegirnos?',
    features: [
      {
        title: 'Respuesta Rápida',
        description: 'Siempre te respondemos dentro de 24 horas',
        icon: 'MessageCircle'
      },
      {
        title: 'Servicio Personal',
        description: 'Cada cliente recibe un trato personal y profesional',
        icon: 'Heart'
      },
      {
        title: 'Experiencia Breslov',
        description: 'Nuestro equipo conoce profundamente la literatura Breslov',
        icon: 'BookOpen'
      },
      {
        title: 'Comunidad Solidaria',
        description: 'Somos parte de la comunidad Breslov global',
        icon: 'Users'
      }
    ],

    // Success & Error
    thankYou: '¡Gracias! Mensaje enviado exitosamente',
    thankYouDescription: 'Te responderemos lo antes posible',
    errorMessage: 'Ocurrió un error. Por favor intenta de nuevo más tarde',
    
    // CTA
    ctaTitle: '¿Listo para Empezar?',
    ctaDescription: 'Explora nuestro catálogo de libros o contáctanos para consulta personal'
  },

  ru: {
    // SEO
    title: 'Свяжитесь с Нами - Мой Огонь | Мы здесь, чтобы помочь',
    description: 'Свяжитесь с командой Мой Огонь. Мы отвечаем на вопросы, помогаем с заказами и предоставляем профессиональный сервис сообществу Бреслов.',

    // Hero Section
    heroTitle: 'Мы Здесь, Чтобы Помочь',
    heroSubtitle: 'Наша команда готова ответить на любой вопрос и предоставить профессиональный сервис',
    heroDescription: 'Ищете ли вы конкретную книгу, нужна помощь с заказом, или просто хотите поделиться отзывом - мы здесь для вас.',

    // Form Section
    formTitle: 'Отправьте Нам Сообщение',
    formSubtitle: 'Мы ответим в течение 24 часов',
    name: 'Полное Имя',
    email: 'Адрес Электронной Почты',
    phone: 'Телефон (Необязательно)',
    subject: 'Тема',
    message: 'Сообщение',
    send: 'Отправить Сообщение',
    sending: 'Отправка...',
    
    // Placeholders
    namePlaceholder: 'Полное Имя',
    emailPlaceholder: 'пример@email.com',
    phonePlaceholder: '+972-50-123-4567',
    subjectPlaceholder: 'Выберите тему...',
    messagePlaceholder: 'Напишите ваше сообщение здесь...',
    
    // Subjects
    subjects: [
      'Общий Вопрос',
      'Заказ Специальной Книги',
      'Проблема с Заказом',
      'Отзыв о Продукте',
      'Технический Вопрос',
      'Другое'
    ],

    // Contact Info
    contactTitle: 'Контактная Информация',
    contactSubtitle: 'Дополнительные способы связи с нами',
    
    address: 'Адрес',
    addressText: 'Израиль, Петах-Тиква',
    emailContact: 'Email',
    emailText: 'contact@haesh-sheli.co.il',
    phoneContact: 'Телефон',
    phoneText: '+972-50-123-4567',
    hours: 'Часы Работы',
    hoursText: 'Воскресенье-Четверг: 9:00-18:00\nПятница: 9:00-13:00\nСуббота: Закрыто',

    // Features
    featuresTitle: 'Почему Выбрать Нас?',
    features: [
      {
        title: 'Быстрый Ответ',
        description: 'Мы всегда отвечаем в течение 24 часов',
        icon: 'MessageCircle'
      },
      {
        title: 'Персональный Сервис',
        description: 'Каждый клиент получает персональное и профессиональное обслуживание',
        icon: 'Heart'
      },
      {
        title: 'Экспертиза Бреслов',
        description: 'Наша команда глубоко знает литературу Бреслов',
        icon: 'BookOpen'
      },
      {
        title: 'Поддерживающее Сообщество',
        description: 'Мы часть глобального сообщества Бреслов',
        icon: 'Users'
      }
    ],

    // Success & Error
    thankYou: 'Спасибо! Сообщение отправлено успешно',
    thankYouDescription: 'Мы ответим вам как можно скорее',
    errorMessage: 'Произошла ошибка. Пожалуйста, попробуйте позже',
    
    // CTA
    ctaTitle: 'Готовы Начать?',
    ctaDescription: 'Просмотрите наш каталог книг или свяжитесь с нами для персональной консультации'
  }
};

// Icon mapping component
const iconMap = {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  CheckCircle,
  BookOpen,
  Heart,
  Users,
  Lightbulb
} as const;

type IconKey = keyof typeof iconMap;

const IconComponent = ({ iconName, className = "w-6 h-6" }: { iconName: string, className?: string }) => {
  const Icon = iconMap[iconName as IconKey] ?? Mail;
  return <Icon className={className} aria-hidden />;
};

export default function Contact() {
  const { currentLanguage, setLanguage } = useLanguage();
  const t = translations[currentLanguage as keyof typeof translations] || translations.he;
  const isRTL = currentLanguage === 'he' || currentLanguage === 'ar';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setSubmitStatus(''), 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-background" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
      <Header currentLanguage={currentLanguage} onLanguageChange={setLanguage} />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-32 dark:bg-[#0A0A0B] bg-[#F9F8F6] border-b dark:border-white/5 border-slate-200" data-testid="hero-section">
        {/* Background Pattern and Glow */}
        <div className="absolute inset-0 bg-gradient-to-br dark:from-[#050505] dark:via-[#111318] dark:to-[#0A0500] from-white via-[#F9F8F6] to-slate-100 z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none z-0" />
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[url('/images/jerusalem-skyline.svg')] bg-cover bg-center mix-blend-screen" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-scale">
            <h1 className={`text-5xl lg:text-7xl font-bold dark:text-white text-slate-900 mb-6 tracking-tight leading-tight ${rtlFont(isRTL)}`} data-testid="hero-title" style={{ textShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
              {t.heroTitle}
            </h1>
            <GoldDivider size="md" className="mb-8" />
            <p className="text-xl lg:text-2xl dark:text-slate-300 text-slate-700 mb-8 max-w-2xl mx-auto font-light leading-relaxed" data-testid="hero-subtitle">
              {t.heroSubtitle}
            </p>
            <p className="text-lg text-[#B5912B] mb-12 max-w-3xl mx-auto leading-relaxed border-l-2 border-[#D4AF37] pl-6 text-left italic font-medium" dir={isRTL ? "rtl" : "ltr"} style={{ borderRightWidth: isRTL ? '2px' : '0', borderLeftWidth: isRTL ? '0' : '2px', paddingRight: isRTL ? '1.5rem' : '0', paddingLeft: isRTL ? '0' : '1.5rem', textAlign: isRTL ? 'right' : 'left' }} data-testid="hero-description">
              "{t.heroDescription}"
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 dark:bg-[#111318] bg-white border-b dark:border-white/5 border-slate-200" data-testid="main-content">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            
            {/* Contact Form */}
            <div className="dark:bg-[#0A0A0B] bg-slate-50 p-8 lg:p-10 rounded-3xl border dark:border-white/5 border-slate-200 shadow-[0_4px_30px_rgba(0,0,0,0.05)]" data-testid="contact-form">
              <div className="mb-8">
                <h2 className={`text-3xl font-bold dark:text-white text-slate-900 mb-3 ${rtlFont(isRTL)}`} data-testid="form-title">
                  {t.formTitle}
                </h2>
                <p className="dark:text-slate-400 text-slate-500 font-light" data-testid="form-subtitle">
                  {t.formSubtitle}
                </p>
              </div>
              
              {submitStatus === 'success' && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6 mb-8 animate-fade-in-scale" data-testid="success-message">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle className="w-6 h-6 text-emerald-500" />
                    <h3 className="font-semibold text-emerald-500">{t.thankYou}</h3>
                  </div>
                  <p className="text-emerald-500/80 text-sm">{t.thankYouDescription}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form-fields">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold dark:text-slate-300 text-slate-700 mb-3" data-testid="name-label">
                      {t.name}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t.namePlaceholder}
                      className="w-full px-4 py-3 border dark:border-white/10 border-slate-200 rounded-xl dark:bg-[#1A1C23] bg-white dark:text-white text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition-all duration-200 outline-none"
                      required
                      data-testid="input-name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold dark:text-slate-300 text-slate-700 mb-3" data-testid="email-label">
                      {t.email}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t.emailPlaceholder}
                      className="w-full px-4 py-3 border dark:border-white/10 border-slate-200 rounded-xl dark:bg-[#1A1C23] bg-white dark:text-white text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition-all duration-200 outline-none"
                      required
                      data-testid="input-email"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold dark:text-slate-300 text-slate-700 mb-3" data-testid="phone-label">
                      {t.phone}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={t.phonePlaceholder}
                      className="w-full px-4 py-3 border dark:border-white/10 border-slate-200 rounded-xl dark:bg-[#1A1C23] bg-white dark:text-white text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition-all duration-200 outline-none"
                      data-testid="input-phone"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold dark:text-slate-300 text-slate-700 mb-3" data-testid="subject-label">
                      {t.subject}
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border dark:border-white/10 border-slate-200 rounded-xl dark:bg-[#1A1C23] bg-white dark:text-white text-slate-900 focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition-all duration-200 outline-none"
                      required
                      data-testid="select-subject"
                    >
                      <option value="">{t.subjectPlaceholder}</option>
                      {t.subjects.map((subject, index) => (
                        <option key={index} value={subject}>{subject}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold dark:text-slate-300 text-slate-700 mb-3" data-testid="message-label">
                    {t.message}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t.messagePlaceholder}
                    rows={6}
                    className="w-full px-4 py-3 border dark:border-white/10 border-slate-200 rounded-xl dark:bg-[#1A1C23] bg-white dark:text-white text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition-all duration-200 resize-y outline-none"
                    required
                    data-testid="textarea-message"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-[#D4AF37] to-[#B5912B] hover:from-[#B5912B] hover:to-[#9E7A1C] text-white w-full py-4 rounded-xl font-bold uppercase tracking-wider text-sm shadow-[0_4px_14px_rgba(212,175,55,0.4)] transition-all duration-300 hover:-translate-y-0.5 inline-flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  data-testid="button-submit"
                >
                  <Send className="w-5 h-5" />
                  {isSubmitting ? t.sending : t.send}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Breslov Books Visual */}
              <div className="relative mb-8 pt-4">
                <div className="grid grid-cols-3 gap-4 opacity-90 relative z-10">
                  <div className="bg-white dark:bg-[#1A1C23] p-2 rounded-xl border border-slate-100 dark:border-white/5 shadow-[0_8px_30px_rgba(0,0,0,0.1)] transform rotate-2 hover:rotate-0 transition-all duration-500 hover:scale-105">
                    <img loading="lazy" decoding="async" src="/images/book-1.webp" alt="Likutei Moharan" className="w-full h-36 object-cover rounded-md" />
                  </div>
                  <div className="bg-white dark:bg-[#1A1C23] p-2 rounded-xl border border-slate-100 dark:border-white/5 shadow-[0_8px_30px_rgba(0,0,0,0.1)] transform -rotate-2 hover:rotate-0 transition-all duration-500 hover:scale-105">
                    <img loading="lazy" decoding="async" src="/images/book-2.webp" alt="Sefer HaMidot" className="w-full h-36 object-cover rounded-md" />
                  </div>
                  <div className="bg-white dark:bg-[#1A1C23] p-2 rounded-xl border border-slate-100 dark:border-white/5 shadow-[0_8px_30px_rgba(0,0,0,0.1)] transform rotate-3 hover:rotate-0 transition-all duration-500 hover:scale-105">
                    <img loading="lazy" decoding="async" src="/images/book-5.webp" alt="Chayei Moharan" className="w-full h-36 object-cover rounded-md" />
                  </div>
                </div>
                {/* Soft glow behind books */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-24 bg-[#D4AF37]/20 blur-[50px] z-0 pointer-events-none" />
              </div>
              
              {/* Contact Details */}
              <div className="dark:bg-[#0A0A0B] bg-slate-50 p-8 rounded-3xl border dark:border-white/5 border-slate-200 shadow-[0_4px_30px_rgba(0,0,0,0.05)]" data-testid="contact-info">
                <h2 className={`text-3xl font-bold dark:text-white text-slate-900 mb-3 ${rtlFont(isRTL)}`} data-testid="contact-title">
                  {t.contactTitle}
                </h2>
                <p className="dark:text-slate-400 text-slate-500 font-light mb-8" data-testid="contact-subtitle">
                  {t.contactSubtitle}
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4" data-testid="contact-address">
                    <div className="flex-shrink-0 w-12 h-12 dark:bg-[#1A1C23] bg-white rounded-xl shadow-sm border border-slate-100 dark:border-white/5 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-[#D4AF37]" />
                    </div>
                    <div>
                      <h3 className="font-semibold dark:text-white text-slate-900 mb-1">{t.address}</h3>
                      <p className="dark:text-slate-400 text-slate-500 font-light">{t.addressText}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4" data-testid="contact-email">
                    <div className="flex-shrink-0 w-12 h-12 dark:bg-[#1A1C23] bg-white rounded-xl shadow-sm border border-slate-100 dark:border-white/5 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-[#D4AF37]" />
                    </div>
                    <div>
                      <h3 className="font-semibold dark:text-white text-slate-900 mb-1">{t.emailContact}</h3>
                      <a href={`mailto:${t.emailText}`} className="text-[#D4AF37] hover:text-[#B5912B] transition-colors">
                        {t.emailText}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4" data-testid="contact-phone">
                    <div className="flex-shrink-0 w-12 h-12 dark:bg-[#1A1C23] bg-white rounded-xl shadow-sm border border-slate-100 dark:border-white/5 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-[#D4AF37]" />
                    </div>
                    <div>
                      <h3 className="font-semibold dark:text-white text-slate-900 mb-1">{t.phoneContact}</h3>
                      <a href={`tel:${t.phoneText}`} className="text-[#D4AF37] hover:text-[#B5912B] transition-colors" dir="ltr">
                        {t.phoneText}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4" data-testid="contact-hours">
                    <div className="flex-shrink-0 w-12 h-12 dark:bg-[#1A1C23] bg-white rounded-xl shadow-sm border border-slate-100 dark:border-white/5 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-[#D4AF37]" />
                    </div>
                    <div>
                      <h3 className="font-semibold dark:text-white text-slate-900 mb-1">{t.hours}</h3>
                      <p className="dark:text-slate-400 text-slate-500 font-light whitespace-pre-line text-sm leading-relaxed">
                        {t.hoursText}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="dark:bg-[#0A0A0B] bg-slate-50 p-8 rounded-3xl border dark:border-white/5 border-slate-200 shadow-[0_4px_30px_rgba(0,0,0,0.05)] relative overflow-hidden" data-testid="features-section">
                {/* Background book image */}
                <div className="absolute top-4 right-4 opacity-5 pointer-events-none">
                  <img loading="lazy" decoding="async" src="/images/book-44.webp" alt="Background Book" className="w-32 h-40 object-cover rounded-lg transform rotate-12 grayscale mix-blend-screen" />
                </div>
                <h2 className={`text-2xl font-bold dark:text-white text-slate-900 mb-6 relative z-10 ${rtlFont(isRTL)}`} data-testid="features-title">
                  {t.featuresTitle}
                </h2>
                
                <div className="space-y-4 relative z-10">
                  {t.features.map((feature, index) => (
                    <div 
                      key={index}
                      className="flex items-start gap-4 p-4 rounded-xl dark:bg-[#1A1C23] bg-white border border-transparent dark:hover:border-white/10 hover:border-slate-300 transition-all duration-300 shadow-sm"
                      data-testid={`feature-item-${index}`}
                    >
                      <div className="flex-shrink-0 w-10 h-10 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center">
                        <IconComponent iconName={feature.icon} className="w-5 h-5 text-[#D4AF37]" />
                      </div>
                      <div>
                        <h3 className="font-semibold dark:text-white text-slate-900 mb-1" data-testid={`feature-title-${index}`}>
                          {feature.title}
                        </h3>
                        <p className="dark:text-slate-400 text-slate-500 text-sm font-light" data-testid={`feature-description-${index}`}>
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden border-t dark:border-white/5 border-slate-200" data-testid="cta-section">
      {/* Texture de fond */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-[#B5912B]/5 to-transparent z-10" />
        <img loading="lazy" decoding="async" src="/images/hero-books.webp" alt="Books Texture" className="w-full h-full object-cover opacity-[0.05] grayscale mix-blend-screen" />
      </div>
        <div className="absolute inset-0 bg-gradient-to-t dark:from-[#050505] from-slate-900 via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className={`text-4xl lg:text-5xl font-bold mb-6 text-white ${rtlFont(isRTL)}`} data-testid="cta-title">
              {t.ctaTitle}
            </h2>
            <p className="text-xl mb-12 text-[#D4AF37] max-w-2xl mx-auto leading-relaxed font-light" data-testid="cta-description">
              {t.ctaDescription}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a 
                href="/store" 
                className="bg-gradient-to-r from-[#D4AF37] to-[#B5912B] hover:from-[#B5912B] hover:to-[#9E7A1C] text-white px-10 py-5 rounded-xl font-bold uppercase tracking-wider text-sm transition-all duration-300 shadow-[0_4px_14px_rgba(212,175,55,0.4)] hover:-translate-y-1 inline-flex items-center justify-center gap-2 min-w-[200px]"
                data-testid="cta-button-store"
              >
                <BookOpen className="w-5 h-5" />
                {currentLanguage === 'he' ? 'עיינו בחנות' : 'Browse Store'}
              </a>
              <a 
                href="/about" 
                className="bg-white/5 hover:bg-white/10 text-white border border-white/20 px-10 py-5 rounded-xl font-bold uppercase tracking-wider text-sm transition-all duration-300 inline-flex items-center justify-center gap-2 hover:-translate-y-1 backdrop-blur-sm shadow-sm min-w-[200px]"
                data-testid="cta-button-about"
              >
                <Users className="w-5 h-5" />
                {currentLanguage === 'he' ? 'למדו עלינו' : 'Learn About Us'}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}