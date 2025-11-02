import { Header } from '../components/Header';
import { useLanguage } from '../contexts/LanguageContext';
import { useState, useEffect } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageCircle,
  CheckCircle,
  AlertCircle,
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
  const isRTL = currentLanguage === 'he';
  
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
    setSubmitStatus('');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || result.error || 'שגיאה בשליחת ההודעה');
      }

      // Success!
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setSubmitStatus(''), 8000);
    } catch (error: any) {
      console.error('Contact form error:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(''), 5000);
    } finally {
      setIsSubmitting(false);
    }
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
      <section className="hero-gradient relative overflow-hidden py-20 lg:py-32" data-testid="hero-section">
        <div className="hero-overlay absolute inset-0"></div>
        {/* Background Image */}
        <div className="absolute inset-0 opacity-10">
          <img 
            src="/images/hero-books-composition.png" 
            alt="Breslov Books Collection" 
            className="w-full h-full object-cover object-center"
          />
        </div>
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

      {/* Main Content */}
      <section className="py-20 bg-background" data-testid="main-content">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            
            {/* Contact Form */}
            <div className="card-premium p-8 lg:p-10" data-testid="contact-form">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-primary mb-3" data-testid="form-title">
                  {t.formTitle}
                </h2>
                <p className="text-muted-foreground" data-testid="form-subtitle">
                  {t.formSubtitle}
                </p>
              </div>
              
              {submitStatus === 'success' && (
                <div className="bg-success-green/10 border border-success-green/20 rounded-xl p-6 mb-8 animate-fade-in-scale" data-testid="success-message">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle className="w-6 h-6 text-success-green" />
                    <h3 className="font-semibold text-success-green">{t.thankYou}</h3>
                  </div>
                  <p className="text-success-green/80 text-sm">{t.thankYouDescription}</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-6 mb-8 animate-fade-in-scale" data-testid="error-message">
                  <div className="flex items-center gap-3 mb-2">
                    <AlertCircle className="w-6 h-6 text-destructive" />
                    <h3 className="font-semibold text-destructive">{t.errorMessage}</h3>
                  </div>
                  <p className="text-destructive/80 text-sm">{t.errorMessage}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form-fields">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-3" data-testid="name-label">
                      {t.name}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t.namePlaceholder}
                      className="w-full px-4 py-3 border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                      required
                      data-testid="input-name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-3" data-testid="email-label">
                      {t.email}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t.emailPlaceholder}
                      className="w-full px-4 py-3 border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                      required
                      data-testid="input-email"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-3" data-testid="phone-label">
                      {t.phone}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={t.phonePlaceholder}
                      className="w-full px-4 py-3 border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                      data-testid="input-phone"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-3" data-testid="subject-label">
                      {t.subject}
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border rounded-xl bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
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
                  <label className="block text-sm font-semibold text-foreground mb-3" data-testid="message-label">
                    {t.message}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t.messagePlaceholder}
                    rows={6}
                    className="w-full px-4 py-3 border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 resize-vertical"
                    required
                    data-testid="textarea-message"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-breslov-primary w-full inline-flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
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
              <div className="relative mb-8">
                <div className="grid grid-cols-3 gap-4 opacity-80">
                  <img 
                    src="/images/ליקוטי מוהרן 1_1757275910545.jpg" 
                    alt="Likutei Moharan" 
                    className="w-full h-32 object-cover rounded-lg shadow-lg transform rotate-1 hover:rotate-0 transition-transform duration-300"
                  />
                  <img 
                    src="/images/ספר המידות 1_1757275910546.jpg" 
                    alt="Sefer HaMidot" 
                    className="w-full h-32 object-cover rounded-lg shadow-lg transform -rotate-1 hover:rotate-0 transition-transform duration-300"
                  />
                  <img 
                    src="/images/חיי מוהרן 1_1757275910544.jpg" 
                    alt="Chayei Moharan" 
                    className="w-full h-32 object-cover rounded-lg shadow-lg transform rotate-2 hover:rotate-0 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent rounded-lg"></div>
              </div>
              {/* Contact Details */}
              <div className="card-premium p-8" data-testid="contact-info">
                <h2 className="text-3xl font-bold text-primary mb-3" data-testid="contact-title">
                  {t.contactTitle}
                </h2>
                <p className="text-muted-foreground mb-8" data-testid="contact-subtitle">
                  {t.contactSubtitle}
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4" data-testid="contact-address">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{t.address}</h3>
                      <p className="text-muted-foreground">{t.addressText}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4" data-testid="contact-email">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{t.emailContact}</h3>
                      <a href={`mailto:${t.emailText}`} className="text-primary hover:underline">
                        {t.emailText}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4" data-testid="contact-phone">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{t.phoneContact}</h3>
                      <a href={`tel:${t.phoneText}`} className="text-primary hover:underline">
                        {t.phoneText}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4" data-testid="contact-hours">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{t.hours}</h3>
                      <p className="text-muted-foreground whitespace-pre-line text-sm leading-relaxed">
                        {t.hoursText}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="card-premium p-8 relative overflow-hidden" data-testid="features-section">
                {/* Background book image */}
                <div className="absolute top-4 right-4 opacity-5 pointer-events-none">
                  <img 
                    src="/images/ליקוטי תפילות 1_1757275910545.jpg" 
                    alt="Likutei Tefilot" 
                    className="w-32 h-40 object-cover rounded-lg transform rotate-12"
                  />
                </div>
                <h2 className="text-2xl font-bold text-primary mb-6 relative z-10" data-testid="features-title">
                  {t.featuresTitle}
                </h2>
                
                <div className="space-y-6 relative z-10">
                  {t.features.map((feature, index) => (
                    <div 
                      key={index}
                      className="flex items-start gap-4 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors duration-200 backdrop-blur-sm"
                      data-testid={`feature-item-${index}`}
                    >
                      <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <IconComponent iconName={feature.icon} className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1" data-testid={`feature-title-${index}`}>
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground text-sm" data-testid={`feature-description-${index}`}>
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
      <section className="py-20 bg-gradient-to-r from-primary to-accent relative overflow-hidden" data-testid="cta-section">
        <div className="absolute inset-0 bg-primary/90"></div>
        {/* Breslov books composition background */}
        <div className="absolute inset-0 opacity-20">
          <img 
            src="/images/hero-books-composition.png" 
            alt="Breslov Books Collection" 
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-primary-foreground">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="cta-title">
              {t.ctaTitle}
            </h2>
            <p className="text-xl mb-12 opacity-90 max-w-2xl mx-auto leading-relaxed" data-testid="cta-description">
              {t.ctaDescription}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/store" 
                className="bg-background text-primary px-8 py-4 rounded-xl font-semibold hover:bg-background/90 transition-all duration-200 inline-flex items-center justify-center gap-2"
                data-testid="cta-button-store"
              >
                <BookOpen className="w-5 h-5" />
                עיינו בחנות
              </a>
              <a 
                href="/about" 
                className="border-2 border-background text-background px-8 py-4 rounded-xl font-semibold hover:bg-background hover:text-primary transition-all duration-200 inline-flex items-center justify-center gap-2"
                data-testid="cta-button-about"
              >
                <Users className="w-5 h-5" />
                למדו עלינו
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}