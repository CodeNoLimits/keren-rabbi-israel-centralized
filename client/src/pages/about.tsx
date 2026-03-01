import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Users, BookOpen, Award, Globe, Heart, Target, Zap, Star, ChevronRight, Mail, Download, Clock, Lightbulb, Shield, Code } from 'lucide-react';
import heroBooks from '@assets/hero-books-composition.png';

const translations = {
  he: {
    // SEO
    title: 'אודות האש שלי - המקום שלכם לספרי ברסלב אמיתיים',
    description: 'למדו על הסיפור מאחורי האש שלי, האתר המוביל לספרי ברסלב באיכות מעולה. הכירו את המייסד יעקב חן והחזון שלנו להפצת אור ברסלב בעולם.',

    // Hero Section
    heroTitle: 'אודות האש שלי',
    heroSubtitle: 'המקום שלכם לספרי ברסלב אמיתיים באיכות מעולה',
    heroDescription: 'אנחנו מאמינים שכל יהודי בעולם זכאי לגשת לאוצרות החכמה של רבי נחמן מברסלב. האש שלי נוסדה כדי להביא את האור הברסלבי לכל בית יהודי באמצעות הטכנולוגיה המתקדמת ביותר.',
    heroCtaPrimary: 'צור קשר עכשיו',
    heroCtaSecondary: 'הורדות חינמיות',

    // Founder Section
    founderTitle: 'הכירו את המייסד',
    founderName: 'יעקב חן',
    founderRole: 'מייסד ומפתח האש שלי',
    founderBio: 'יעקב הוא מפתח Full-Stack מנוסה עם תשוקה עמוקה להפצת הספרות הברסלבית. בהשראת תורתו של סבא ישראל, הוא הקדיש את כישוריו הטכניים למשימה קדושה: לייצר מהפכה דיגיטלית בעולם הספרות היהודית כדי להנגיש את חכמת רבי נחמן לכל אחד.',
    founderMission: 'החזון שלי פשוט: כל יהודי בעולם צריך לקבל גישה קלה ונוחה לחכמת רבי נחמן. הטכנולוגיה היא הכלי, האור הברסלבי הוא המטרה.',
    personalValues: 'הערכים שלנו',
    values: [
      {
        title: 'הפצת אור',
        description: 'להביא את חכמת ברסלב לכל אחד',
        icon: 'Lightbulb'
      },
      {
        title: 'איכות מעולה',
        description: 'רק ספרים אמיתיים מהמקורות הנכונים',
        icon: 'Award'
      },
      {
        title: 'שירות קהילתי',
        description: 'לתת את המיטב למען הקהילה הברסלבית',
        icon: 'Heart'
      },
      {
        title: 'חדשנות טכנולוגית',
        description: 'שימוש בטכנולוגיות החדשניות ביותר',
        icon: 'Zap'
      }
    ],

    // Stats Section
    statsTitle: 'ההשפעה שלנו בעולם',
    statsSubtitle: 'נתונים שמראים איך אנחנו משנים את עולם הספרות הברסלבית',
    stats: [
      {
        number: '25,000+',
        label: 'משתמשים מכל העולם',
        icon: 'Users'
      },
      {
        number: '75,000+',
        label: 'הורדות ספרים חינמיות',
        icon: 'BookOpen'
      },
      {
        number: '5,500+',
        label: 'הזמנות מוצלחות',
        icon: 'Award'
      },
      {
        number: '45',
        label: 'מדינות עם לקוחות',
        icon: 'Globe'
      }
    ],

    // Timeline Section
    timelineTitle: 'המסע שלנו',
    timelineSubtitle: 'איך האש שלי התפתחה למאגר הספרים הברסלבי המוביל',
    timeline: [
      {
        year: '2023',
        title: 'החלום נולד',
        description: 'זיהינו את הצורך בפלטפורמה מודרנית לספרי ברסלב איכותיים. התחלנו במחקר עמוק על הקהילה והצרכים.',
        duration: '3 חודשים'
      },
      {
        year: '2024',
        title: 'פיתוח והקמה',
        description: 'בניית האתר עם הטכנולוגיות המתקדמות ביותר: React, TypeScript, ומערכות תשלום מאובטחות.',
        duration: '8 חודשים'
      },
      {
        year: '2024',
        title: 'השקה ראשונית',
        description: 'פתיחת האתר לקהל הרחב עם מבחר ספרים מקיף ותמיכה בחמש שפות עיקריות.',
        duration: '2 חודשים'
      },
      {
        year: '2025',
        title: 'הרחבה ויעדים',
        description: 'הוספת תכונות מתקדמות, הרחבת המלאי והגעה לקהילות יהודיות נוספות ברחבי העולם.',
        duration: 'מתמשך'
      }
    ],

    // Testimonials Section
    testimonialsTitle: 'מה הלקוחות אומרים עלינו',
    testimonialsSubtitle: 'הקהילה הברסלבית מכל העולם חולקת את החוויות שלהם',
    testimonials: [
      {
        name: 'הרב משה כהן',
        location: 'ירושלים, ישראל',
        quote: 'האתר הכי מתקדם ונוח לקניית ספרי ברסלב. איכות מעולה, שירות מהיר, ומבחר שלא קיים בשום מקום אחר. ממליץ בחום!',
        rating: 5
      },
      {
        name: 'דוד לוי',
        location: 'ברוקלין, ניו יורק',
        quote: 'סוף סוף מצאתי מקום שמבין את הצרכים שלנו. החיפוש בעברית פועל מושלם, המחירים הוגנים והספרים מגיעים במצב מעולה.',
        rating: 5
      },
      {
        name: 'שרה רוזן',
        location: 'לונדון, אנגליה',
        quote: 'ההורדות החינמיות הן מתנה אמיתית לקהילה. תודה רבה על הטוב לב ועל ההזדמנות ללמוד ולהתקרב לחכמת רבי נחמן.',
        rating: 5
      },
      {
        name: 'יוסף מרדכי',
        location: 'מונטריאול, קנדה',
        quote: 'המשלוחים מהירים, האריזה מקצועית, והשירות מעבר לכל ציפייה. זה בדיוק מה שהקהילה הברסלבית חיפשה במשך שנים.',
        rating: 5
      },
      {
        name: 'רחל גולדברג',
        location: 'מלבורן, אוסטרליה',
        quote: 'האתר קל לשימוש, המידע מדויק והתמיכה בעברית מושלמת. המלצה גדולה למי שמחפש ספרי ברסלב אמיתיים.',
        rating: 5
      }
    ],

    // Final CTA Section
    ctaTitle: 'הצטרפו למשפחת האש שלי',
    ctaSubtitle: 'גלו את האוסף המלא של ספרי ברסלב איכותיים ותחילו את המסע הרוחני שלכם היום',
    ctaDescription: 'בין אם אתם מחפשים ספר מסוים, רוצים לגלות יצירות חדשות, או פשוט רוצים לתמוך במשימה שלנו - אנחנו כאן בשבילכם.',
    ctaButtonPrimary: 'חקרו את החנות',
    ctaButtonSecondary: 'צרו קשר'
  },

  en: {
    // SEO
    title: 'About My Fire - Your Source for Authentic Breslov Books',
    description: 'Learn about the story behind My Fire, the leading website for high-quality Breslov books. Meet founder Yaakov Hen and our vision to spread Breslov light worldwide.',

    // Hero Section
    heroTitle: 'About My Fire',
    heroSubtitle: 'Your source for authentic high-quality Breslov books',
    heroDescription: 'We believe every Jew worldwide deserves access to Rabbi Nachman of Breslov\'s treasure troves of wisdom. My Fire was founded to bring Breslov light to every Jewish home using the most advanced technology.',
    heroCtaPrimary: 'Contact Us Now',
    heroCtaSecondary: 'Free Downloads',

    // Founder Section
    founderTitle: 'Meet the Founder',
    founderName: 'Yaakov Hen',
    founderRole: 'Founder & Developer of My Fire',
    founderBio: 'Yaakov is an experienced Full-Stack developer with a deep passion for spreading Breslov literature. Inspired by the teachings of Saba Israel, he dedicated his technical skills to a holy mission: creating a digital revolution in the world of Jewish literature to make Rabbi Nachman\'s wisdom accessible to all.',
    founderMission: 'My vision is simple: every Jew in the world should have easy and convenient access to Rabbi Nachman\'s wisdom. Technology is the tool, Breslov light is the goal.',
    personalValues: 'Our Values',
    values: [
      {
        title: 'Spreading Light',
        description: 'Bringing Breslov wisdom to everyone',
        icon: 'Lightbulb'
      },
      {
        title: 'Excellent Quality',
        description: 'Only authentic books from the right sources',
        icon: 'Award'
      },
      {
        title: 'Community Service',
        description: 'Giving our best for the Breslov community',
        icon: 'Heart'
      },
      {
        title: 'Technological Innovation',
        description: 'Using the most innovative technologies',
        icon: 'Zap'
      }
    ],

    // Stats Section
    statsTitle: 'Our Global Impact',
    statsSubtitle: 'Numbers showing how we\'re changing the world of Breslov literature',
    stats: [
      {
        number: '25,000+',
        label: 'Users Worldwide',
        icon: 'Users'
      },
      {
        number: '75,000+',
        label: 'Free Book Downloads',
        icon: 'BookOpen'
      },
      {
        number: '5,500+',
        label: 'Successful Orders',
        icon: 'Award'
      },
      {
        number: '45',
        label: 'Countries with Customers',
        icon: 'Globe'
      }
    ],

    // Timeline Section
    timelineTitle: 'Our Journey',
    timelineSubtitle: 'How My Fire developed into the leading Breslov book repository',
    timeline: [
      {
        year: '2023',
        title: 'The Dream Was Born',
        description: 'We identified the need for a modern platform for quality Breslov books. Started deep research on the community and needs.',
        duration: '3 months'
      },
      {
        year: '2024',
        title: 'Development & Establishment',
        description: 'Building the website with the most advanced technologies: React, TypeScript, and secure payment systems.',
        duration: '8 months'
      },
      {
        year: '2024',
        title: 'Initial Launch',
        description: 'Opening the website to the general public with a comprehensive book selection and support for five main languages.',
        duration: '2 months'
      },
      {
        year: '2025',
        title: 'Expansion & Goals',
        description: 'Adding advanced features, expanding inventory and reaching additional Jewish communities worldwide.',
        duration: 'Ongoing'
      }
    ],

    // Testimonials Section
    testimonialsTitle: 'What Our Customers Say',
    testimonialsSubtitle: 'The Breslov community worldwide shares their experiences',
    testimonials: [
      {
        name: 'Rabbi Moshe Cohen',
        location: 'Jerusalem, Israel',
        quote: 'The most advanced and convenient website for buying Breslov books. Excellent quality, fast service, and a selection that doesn\'t exist anywhere else. Highly recommended!',
        rating: 5
      },
      {
        name: 'David Levy',
        location: 'Brooklyn, New York',
        quote: 'Finally found a place that understands our needs. The Hebrew search works perfectly, fair prices and books arrive in excellent condition.',
        rating: 5
      },
      {
        name: 'Sarah Rosen',
        location: 'London, England',
        quote: 'The free downloads are a real gift to the community. Thank you for the kindness and the opportunity to learn and get closer to Rabbi Nachman\'s wisdom.',
        rating: 5
      },
      {
        name: 'Joseph Mordechai',
        location: 'Montreal, Canada',
        quote: 'Fast shipping, professional packaging, and service beyond all expectations. This is exactly what the Breslov community has been looking for for years.',
        rating: 5
      },
      {
        name: 'Rachel Goldberg',
        location: 'Melbourne, Australia',
        quote: 'Easy to use website, accurate information and perfect Hebrew support. Great recommendation for anyone looking for authentic Breslov books.',
        rating: 5
      }
    ],

    // Final CTA Section
    ctaTitle: 'Join the My Fire Family',
    ctaSubtitle: 'Discover the complete collection of quality Breslov books and begin your spiritual journey today',
    ctaDescription: 'Whether you\'re looking for a specific book, want to discover new works, or simply want to support our mission - we\'re here for you.',
    ctaButtonPrimary: 'Explore the Store',
    ctaButtonSecondary: 'Contact Us'
  },

  fr: {
    // SEO
    title: 'À Propos de Mon Feu - Votre Source de Livres Breslov Authentiques',
    description: 'Découvrez l\'histoire derrière Mon Feu, le site web leader pour les livres Breslov de haute qualité. Rencontrez le fondateur Yaakov Hen et notre vision de répandre la lumière Breslov dans le monde.',

    // Hero Section
    heroTitle: 'À Propos de Mon Feu',
    heroSubtitle: 'Votre source de livres Breslov authentiques de haute qualité',
    heroDescription: 'Nous croyons que chaque Juif dans le monde mérite d\'accéder aux trésors de sagesse du Rabbi Nachman de Breslov. Mon Feu a été fondé pour apporter la lumière Breslov à chaque foyer juif en utilisant la technologie la plus avancée.',
    heroCtaPrimary: 'Contactez-Nous Maintenant',
    heroCtaSecondary: 'Téléchargements Gratuits',

    // Founder Section
    founderTitle: 'Rencontrez le Fondateur',
    founderName: 'Yaakov Hen',
    founderRole: 'Fondateur & Développeur de Mon Feu',
    founderBio: 'Yaakov est un développeur Full-Stack expérimenté avec une passion profonde pour répandre la littérature Breslov. Inspiré par les enseignements de Saba Israël, il a dédié ses compétences techniques à une mission sainte : créer une révolution numérique dans le monde de la littérature juive pour rendre accessible la sagesse de Rabbi Nachman à tous.',
    founderMission: 'Ma vision est simple : chaque Juif dans le monde devrait avoir un accès facile et pratique à la sagesse du Rabbi Nachman. La technologie est l\'outil, la lumière Breslov est l\'objectif.',
    personalValues: 'Nos Valeurs',
    values: [
      {
        title: 'Répandre la Lumière',
        description: 'Apporter la sagesse Breslov à tous',
        icon: 'Lightbulb'
      },
      {
        title: 'Qualité Excellente',
        description: 'Seulement des livres authentiques des bonnes sources',
        icon: 'Award'
      },
      {
        title: 'Service Communautaire',
        description: 'Donner notre meilleur pour la communauté Breslov',
        icon: 'Heart'
      },
      {
        title: 'Innovation Technologique',
        description: 'Utiliser les technologies les plus innovantes',
        icon: 'Zap'
      }
    ],

    // Stats Section
    statsTitle: 'Notre Impact Mondial',
    statsSubtitle: 'Des chiffres montrant comment nous changeons le monde de la littérature Breslov',
    stats: [
      {
        number: '25,000+',
        label: 'Utilisateurs Mondiaux',
        icon: 'Users'
      },
      {
        number: '75,000+',
        label: 'Téléchargements de Livres Gratuits',
        icon: 'BookOpen'
      },
      {
        number: '5,500+',
        label: 'Commandes Réussies',
        icon: 'Award'
      },
      {
        number: '45',
        label: 'Pays avec Clients',
        icon: 'Globe'
      }
    ],

    // Timeline Section
    timelineTitle: 'Notre Parcours',
    timelineSubtitle: 'Comment Mon Feu s\'est développé en dépôt de livres Breslov leader',
    timeline: [
      {
        year: '2023',
        title: 'Le Rêve Est Né',
        description: 'Nous avons identifié le besoin d\'une plateforme moderne pour les livres Breslov de qualité. Commencé la recherche approfondie sur la communauté et les besoins.',
        duration: '3 mois'
      },
      {
        year: '2024',
        title: 'Développement & Établissement',
        description: 'Construction du site web avec les technologies les plus avancées : React, TypeScript, et systèmes de paiement sécurisés.',
        duration: '8 mois'
      },
      {
        year: '2024',
        title: 'Lancement Initial',
        description: 'Ouverture du site web au grand public avec une sélection complète de livres et support pour cinq langues principales.',
        duration: '2 mois'
      },
      {
        year: '2025',
        title: 'Expansion & Objectifs',
        description: 'Ajout de fonctionnalités avancées, expansion de l\'inventaire et atteinte de communautés juives supplémentaires dans le monde.',
        duration: 'En cours'
      }
    ],

    // Testimonials Section
    testimonialsTitle: 'Ce Que Disent Nos Clients',
    testimonialsSubtitle: 'La communauté Breslov mondiale partage ses expériences',
    testimonials: [
      {
        name: 'Rabbin Moshe Cohen',
        location: 'Jérusalem, Israël',
        quote: 'Le site web le plus avancé et pratique pour acheter des livres Breslov. Excellente qualité, service rapide, et une sélection qui n\'existe nulle part ailleurs. Fortement recommandé !',
        rating: 5
      },
      {
        name: 'David Levy',
        location: 'Brooklyn, New York',
        quote: 'Finalement trouvé un endroit qui comprend nos besoins. La recherche en hébreu fonctionne parfaitement, prix équitables et les livres arrivent en excellent état.',
        rating: 5
      },
      {
        name: 'Sarah Rosen',
        location: 'Londres, Angleterre',
        quote: 'Les téléchargements gratuits sont un vrai cadeau pour la communauté. Merci pour la gentillesse et l\'opportunité d\'apprendre et de se rapprocher de la sagesse du Rabbi Nachman.',
        rating: 5
      },
      {
        name: 'Joseph Mordechai',
        location: 'Montréal, Canada',
        quote: 'Expédition rapide, emballage professionnel, et service au-delà de toutes les attentes. C\'est exactement ce que la communauté Breslov cherchait depuis des années.',
        rating: 5
      },
      {
        name: 'Rachel Goldberg',
        location: 'Melbourne, Australie',
        quote: 'Site web facile à utiliser, informations précises et support hébreu parfait. Grande recommandation pour quiconque cherche des livres Breslov authentiques.',
        rating: 5
      }
    ],

    // Final CTA Section
    ctaTitle: 'Rejoignez la Famille Mon Feu',
    ctaSubtitle: 'Découvrez la collection complète de livres Breslov de qualité et commencez votre voyage spirituel aujourd\'hui',
    ctaDescription: 'Que vous cherchiez un livre spécifique, vouliez découvrir de nouvelles œuvres, ou simplement soutenir notre mission - nous sommes là pour vous.',
    ctaButtonPrimary: 'Explorer la Boutique',
    ctaButtonSecondary: 'Contactez-Nous'
  },

  es: {
    // SEO
    title: 'Acerca de Mi Fuego - Tu Fuente de Libros Breslov Auténticos',
    description: 'Aprende sobre la historia detrás de Mi Fuego, el sitio web líder para libros Breslov de alta calidad. Conoce al fundador Yaakov Hen y nuestra visión de esparcir la luz Breslov mundialmente.',

    // Hero Section
    heroTitle: 'Acerca de Mi Fuego',
    heroSubtitle: 'Tu fuente de libros Breslov auténticos de alta calidad',
    heroDescription: 'Creemos que cada judío en el mundo merece acceder a los tesoros de sabiduría del Rabino Nachman de Breslov. Mi Fuego fue fundado para traer la luz Breslov a cada hogar judío usando la tecnología más avanzada.',
    heroCtaPrimary: 'Contáctanos Ahora',
    heroCtaSecondary: 'Descargas Gratuitas',

    // Founder Section
    founderTitle: 'Conoce al Fundador',
    founderName: 'Yaakov Hen',
    founderRole: 'Fundador y Desarrollador de Mi Fuego',
    founderBio: 'Yaakov es un desarrollador Full-Stack experimentado con una pasión profunda por esparcir la literatura Breslov. Inspirado por las enseñanzas de Saba Israel, dedicó sus habilidades técnicas a una misión sagrada: crear una revolución digital en el mundo de la literatura judía para hacer accesible la sabiduría de Rabbi Nachman a todos.',
    founderMission: 'Mi visión es simple: cada judío en el mundo debería tener acceso fácil y conveniente a la sabiduría del Rabino Nachman. La tecnología es la herramienta, la luz Breslov es el objetivo.',
    personalValues: 'Nuestros Valores',
    values: [
      {
        title: 'Esparcir Luz',
        description: 'Traer sabiduría Breslov a todos',
        icon: 'Lightbulb'
      },
      {
        title: 'Calidad Excelente',
        description: 'Solo libros auténticos de las fuentes correctas',
        icon: 'Award'
      },
      {
        title: 'Servicio Comunitario',
        description: 'Dar nuestro mejor esfuerzo para la comunidad Breslov',
        icon: 'Heart'
      },
      {
        title: 'Innovación Tecnológica',
        description: 'Usar las tecnologías más innovadoras',
        icon: 'Zap'
      }
    ],

    // Stats Section
    statsTitle: 'Nuestro Impacto Global',
    statsSubtitle: 'Números mostrando cómo estamos cambiando el mundo de la literatura Breslov',
    stats: [
      {
        number: '25,000+',
        label: 'Usuarios Mundiales',
        icon: 'Users'
      },
      {
        number: '75,000+',
        label: 'Descargas de Libros Gratuitas',
        icon: 'BookOpen'
      },
      {
        number: '5,500+',
        label: 'Órdenes Exitosas',
        icon: 'Award'
      },
      {
        number: '45',
        label: 'Países con Clientes',
        icon: 'Globe'
      }
    ],

    // Timeline Section
    timelineTitle: 'Nuestro Viaje',
    timelineSubtitle: 'Cómo Mi Fuego se desarrolló en el repositorio líder de libros Breslov',
    timeline: [
      {
        year: '2023',
        title: 'El Sueño Nació',
        description: 'Identificamos la necesidad de una plataforma moderna para libros Breslov de calidad. Comenzamos investigación profunda sobre la comunidad y necesidades.',
        duration: '3 meses'
      },
      {
        year: '2024',
        title: 'Desarrollo y Establecimiento',
        description: 'Construyendo el sitio web con las tecnologías más avanzadas: React, TypeScript, y sistemas de pago seguros.',
        duration: '8 meses'
      },
      {
        year: '2024',
        title: 'Lanzamiento Inicial',
        description: 'Abriendo el sitio web al público general con una selección completa de libros y soporte para cinco idiomas principales.',
        duration: '2 meses'
      },
      {
        year: '2025',
        title: 'Expansión y Objetivos',
        description: 'Agregando características avanzadas, expandiendo inventario y alcanzando comunidades judías adicionales mundialmente.',
        duration: 'En curso'
      }
    ],

    // Testimonials Section
    testimonialsTitle: 'Lo Que Dicen Nuestros Clientes',
    testimonialsSubtitle: 'La comunidad Breslov mundial comparte sus experiencias',
    testimonials: [
      {
        name: 'Rabino Moshe Cohen',
        location: 'Jerusalén, Israel',
        quote: 'El sitio web más avanzado y conveniente para comprar libros Breslov. Excelente calidad, servicio rápido, y una selección que no existe en ningún otro lugar. ¡Altamente recomendado!',
        rating: 5
      },
      {
        name: 'David Levy',
        location: 'Brooklyn, Nueva York',
        quote: 'Finalmente encontré un lugar que entiende nuestras necesidades. La búsqueda en hebreo funciona perfectamente, precios justos y los libros llegan en excelente condición.',
        rating: 5
      },
      {
        name: 'Sarah Rosen',
        location: 'Londres, Inglaterra',
        quote: 'Las descargas gratuitas son un regalo real para la comunidad. Gracias por la bondad y la oportunidad de aprender y acercarse a la sabiduría del Rabino Nachman.',
        rating: 5
      },
      {
        name: 'Joseph Mordechai',
        location: 'Montreal, Canadá',
        quote: 'Envío rápido, empaquetado profesional, y servicio más allá de todas las expectativas. Esto es exactamente lo que la comunidad Breslov ha estado buscando por años.',
        rating: 5
      },
      {
        name: 'Rachel Goldberg',
        location: 'Melbourne, Australia',
        quote: 'Sitio web fácil de usar, información precisa y soporte en hebreo perfecto. Gran recomendación para cualquiera que busque libros Breslov auténticos.',
        rating: 5
      }
    ],

    // Final CTA Section
    ctaTitle: 'Únete a la Familia Mi Fuego',
    ctaSubtitle: 'Descubre la colección completa de libros Breslov de calidad y comienza tu viaje espiritual hoy',
    ctaDescription: 'Ya sea que busques un libro específico, quieras descubrir nuevas obras, o simplemente apoyar nuestra misión - estamos aquí para ti.',
    ctaButtonPrimary: 'Explorar la Tienda',
    ctaButtonSecondary: 'Contáctanos'
  },

  ru: {
    // SEO
    title: 'О Моем Огне - Ваш Источник Подлинных Книг Бреслов',
    description: 'Узнайте историю создания Моего Огня, ведущего веб-сайта высококачественных книг Бреслов. Познакомьтесь с основателем Яаковом Хеном и нашим видением распространения света Бреслов по всему миру.',

    // Hero Section
    heroTitle: 'О Моем Огне',
    heroSubtitle: 'Ваш источник подлинных высококачественных книг Бреслов',
    heroDescription: 'Мы верим, что каждый еврей в мире заслуживает доступа к сокровищницам мудрости рабби Нахмана из Бреслов. Мой Огонь был основан, чтобы принести свет Бреслов в каждый еврейский дом, используя самые передовые технологии.',
    heroCtaPrimary: 'Свяжитесь с Нами Сейчас',
    heroCtaSecondary: 'Бесплатные Загрузки',

    // Founder Section
    founderTitle: 'Познакомьтесь с Основателем',
    founderName: 'Яаков Хен',
    founderRole: 'Основатель и Разработчик Моего Огня',
    founderBio: 'Яаков - опытный Full-Stack разработчик с глубокой страстью к распространению литературы Бреслов. Вдохновленный учениями Сабы Израэля, он посвятил свои технические навыки святой миссии: созданию цифровой революции в мире еврейской литературы, чтобы сделать мудрость Рабби Нахмана доступной для всех.',
    founderMission: 'Мое видение простое: каждый еврей в мире должен иметь легкий и удобный доступ к мудрости рабби Нахмана. Технология - это инструмент, свет Бреслов - это цель.',
    personalValues: 'Наши Ценности',
    values: [
      {
        title: 'Распространение Света',
        description: 'Принести мудрость Бреслов всем',
        icon: 'Lightbulb'
      },
      {
        title: 'Отличное Качество',
        description: 'Только подлинные книги из правильных источников',
        icon: 'Award'
      },
      {
        title: 'Служение Общине',
        description: 'Давать наше лучшее для общины Бреслов',
        icon: 'Heart'
      },
      {
        title: 'Технологические Инновации',
        description: 'Использование самых инновационных технологий',
        icon: 'Zap'
      }
    ],

    // Stats Section
    statsTitle: 'Наше Глобальное Влияние',
    statsSubtitle: 'Цифры, показывающие, как мы меняем мир литературы Бреслов',
    stats: [
      {
        number: '25,000+',
        label: 'Пользователей по Всему Миру',
        icon: 'Users'
      },
      {
        number: '75,000+',
        label: 'Бесплатных Загрузок Книг',
        icon: 'BookOpen'
      },
      {
        number: '5,500+',
        label: 'Успешных Заказов',
        icon: 'Award'
      },
      {
        number: '45',
        label: 'Стран с Клиентами',
        icon: 'Globe'
      }
    ],

    // Timeline Section
    timelineTitle: 'Наш Путь',
    timelineSubtitle: 'Как Мой Огонь развился в ведущий репозиторий книг Бреслов',
    timeline: [
      {
        year: '2023',
        title: 'Мечта Родилась',
        description: 'Мы определили потребность в современной платформе для качественных книг Бреслов. Начали глубокое исследование общины и потребностей.',
        duration: '3 месяца'
      },
      {
        year: '2024',
        title: 'Разработка и Создание',
        description: 'Создание веб-сайта с самыми передовыми технологиями: React, TypeScript и безопасные платежные системы.',
        duration: '8 месяцев'
      },
      {
        year: '2024',
        title: 'Первоначальный Запуск',
        description: 'Открытие веб-сайта для широкой публики с полным выбором книг и поддержкой пяти основных языков.',
        duration: '2 месяца'
      },
      {
        year: '2025',
        title: 'Расширение и Цели',
        description: 'Добавление передовых функций, расширение запасов и достижение дополнительных еврейских общин по всему миру.',
        duration: 'Продолжается'
      }
    ],

    // Testimonials Section
    testimonialsTitle: 'Что Говорят Наши Клиенты',
    testimonialsSubtitle: 'Община Бреслов по всему миру делится своим опытом',
    testimonials: [
      {
        name: 'Раввин Моше Коэн',
        location: 'Иерусалим, Израиль',
        quote: 'Самый передовой и удобный веб-сайт для покупки книг Бреслов. Отличное качество, быстрое обслуживание и выбор, которого нет больше нигде. Настоятельно рекомендую!',
        rating: 5
      },
      {
        name: 'Давид Леви',
        location: 'Бруклин, Нью-Йорк',
        quote: 'Наконец нашел место, которое понимает наши потребности. Поиск на иврите работает идеально, справедливые цены и книги приходят в отличном состоянии.',
        rating: 5
      },
      {
        name: 'Сара Розен',
        location: 'Лондон, Англия',
        quote: 'Бесплатные загрузки - настоящий подарок для общины. Спасибо за доброту и возможность учиться и приближаться к мудрости рабби Нахмана.',
        rating: 5
      },
      {
        name: 'Йосеф Мордехай',
        location: 'Монреаль, Канада',
        quote: 'Быстрая доставка, профессиональная упаковка и обслуживание сверх всех ожиданий. Это именно то, что община Бреслов искала годами.',
        rating: 5
      },
      {
        name: 'Рахель Гольдберг',
        location: 'Мельбурн, Австралия',
        quote: 'Легко используемый веб-сайт, точная информация и идеальная поддержка иврита. Отличная рекомендация для всех, кто ищет подлинные книги Бреслов.',
        rating: 5
      }
    ],

    // Final CTA Section
    ctaTitle: 'Присоединяйтесь к Семье Мой Огонь',
    ctaSubtitle: 'Откройте полную коллекцию качественных книг Бреслов и начните свое духовное путешествие сегодня',
    ctaDescription: 'Ищете ли вы конкретную книгу, хотите открыть новые произведения или просто поддержать нашу миссию - мы здесь для вас.',
    ctaButtonPrimary: 'Изучить Магазин',
    ctaButtonSecondary: 'Свяжитесь с Нами'
  }
};

// Icon mapping component - SECURE IMPLEMENTATION
const iconMap = {
  Users,
  BookOpen,
  Award,
  Globe,
  Lightbulb,
  Heart,
  Zap,
  Star,
  Shield,
  Code
} as const;

type IconKey = keyof typeof iconMap;

const IconComponent = ({ iconName, className = "w-6 h-6" }: { iconName: string, className?: string }) => {
  // Safe icon resolution with fallback to prevent crashes
  const Icon = iconMap[iconName as IconKey] ?? Star;
  return <Icon className={className} aria-hidden />;
};

// Animated counter component
const AnimatedCounter = ({ end, duration = 2000 }: { end: string, duration?: number }) => {
  const [count, setCount] = useState('0');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isVisible) {
          setIsVisible(true);
          
          // Extract numeric part from end string
          const numericEnd = parseInt(end.replace(/[^\d]/g, ''));
          let startTime: number;
          
          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            
            const currentCount = Math.floor(progress * numericEnd);
            const suffix = end.includes('+') ? '+' : '';
            const prefix = end.includes(',') ? currentCount.toLocaleString() : currentCount.toString();
            
            setCount(prefix + suffix);
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById(`counter-${end}`);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [end, duration, isVisible]);

  return <span id={`counter-${end}`}>{count}</span>;
};

export default function About() {
  const { currentLanguage, setLanguage } = useLanguage();
  const t = translations[currentLanguage as keyof typeof translations] || translations.he;
  const isRTL = currentLanguage === 'he';

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

    // Set Open Graph tags
    const ogTags = [
      { property: 'og:title', content: t.title },
      { property: 'og:description', content: t.description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: window.location.href },
      { property: 'og:site_name', content: 'האש שלי - My Fire' }
    ];

    ogTags.forEach(tag => {
      let ogTag = document.querySelector(`meta[property="${tag.property}"]`);
      if (!ogTag) {
        ogTag = document.createElement('meta');
        ogTag.setAttribute('property', tag.property);
        document.head.appendChild(ogTag);
      }
      ogTag.setAttribute('content', tag.content);
    });

  }, [t.title, t.description]);

  return (
    <div className="min-h-screen bg-background" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
      <Header currentLanguage={currentLanguage} onLanguageChange={setLanguage} />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-32" data-testid="hero-section">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-orange-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800"></div>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#FF6B00 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 text-orange-600 dark:text-orange-400 font-semibold text-sm mb-8 shadow-sm">
              <Star className="w-4 h-4" />
              <span>{currentLanguage === 'he' ? 'ברוכים הבאים' : 'Welcome to My Fire'}</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight leading-tight" data-testid="hero-title">
              {t.heroTitle}
            </h1>
            <p className="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto font-medium" data-testid="hero-subtitle">
              {t.heroSubtitle}
            </p>
            <p className="text-lg text-slate-500 dark:text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed border-l-4 border-orange-500 pl-6 text-left" dir={isRTL ? "rtl" : "ltr"} style={{ borderRightWidth: isRTL ? '4px' : '0', borderLeftWidth: isRTL ? '0' : '4px', paddingRight: isRTL ? '1.5rem' : '0', paddingLeft: isRTL ? '0' : '1.5rem', textAlign: isRTL ? 'right' : 'left', fontStyle: 'italic' }} data-testid="hero-description">
              "{t.heroDescription}"
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact" 
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-orange-500/25 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
                data-testid="hero-cta-primary"
              >
                <Mail className="w-5 h-5" />
                {t.heroCtaPrimary}
              </a>
              <a 
                href="/downloads" 
                className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 px-8 py-4 rounded-full font-semibold shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all flex items-center justify-center gap-2"
                data-testid="hero-cta-secondary"
              >
                <Download className="w-5 h-5" />
                {t.heroCtaSecondary}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-24 bg-white dark:bg-slate-900" data-testid="founder-section">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white" data-testid="founder-title">
                {t.founderTitle}
              </h2>
              <div className="w-24 h-1.5 bg-orange-500 mx-auto mt-6 rounded-full"></div>
            </motion.div>
            
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
              {/* Founder Photo & Info */}
              <motion.div 
                initial={{ opacity: 0, x: isRTL ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-5 text-center lg:text-start" data-testid="founder-info"
              >
                <div className="w-48 h-48 mx-auto lg:mx-0 mb-8 rounded-3xl bg-gradient-to-br from-orange-100 to-orange-50 dark:from-slate-800 dark:to-slate-800/50 flex items-center justify-center relative overflow-hidden shadow-2xl border border-white/50 dark:border-slate-700">
                  <div className="text-7xl">🔥</div>
                </div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2" data-testid="founder-name">
                  {t.founderName}
                </h3>
                <p className="text-xl text-orange-600 dark:text-orange-400 font-bold mb-6" data-testid="founder-role">
                  {t.founderRole}
                </p>
                
                <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 relative z-0">
                  <blockquote className="text-lg text-slate-700 dark:text-slate-300 italic mb-0 relative z-10" data-testid="founder-mission">
                    <span className="text-5xl text-orange-200 dark:text-orange-900/40 absolute -top-4 -left-2 -z-10 font-serif leading-none">"</span>
                    {t.founderMission}
                    <span className="text-5xl text-orange-200 dark:text-orange-900/40 absolute -bottom-6 -right-2 -z-10 font-serif leading-none">"</span>
                  </blockquote>
                </div>
              </motion.div>

              {/* Founder Bio */}
              <motion.div 
                initial={{ opacity: 0, x: isRTL ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-7 space-y-8" data-testid="founder-bio"
              >
                <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700">
                  <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300 mb-6">
                    {t.founderBio}
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    {['React', 'TypeScript', 'Node.js', 'PostgreSQL'].map(tech => (
                      <span key={tech} className="px-4 py-1.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full text-sm font-semibold flex items-center gap-2">
                        <Code className="w-4 h-4" /> {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 p-8 rounded-3xl border border-orange-100 dark:border-orange-900/30">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm text-orange-500 shrink-0">
                      <Target className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                        {currentLanguage === 'he' ? 'המטרה הקדושה' : 'The Sacred Mission'}
                      </h4>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        {currentLanguage === 'he' ? 'להביא את אור ברסלב ותורת סבא ישראל לכל בית יהודי באמצעות טכנולוגיה מתקדמת, תוך שמירה על איכות מעולה ושירות מהיר.' : 'To bring Breslov light and the teachings of Saba Israel to every Jewish home through advanced technology, while maintaining excellent quality and fast service.'}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Values Section */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              data-testid="values-section"
            >
              <h3 className="text-3xl font-bold text-center mb-12 text-slate-900 dark:text-white" data-testid="values-title">
                {t.personalValues}
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {t.values.map((value, index) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    key={index} 
                    className="bg-white dark:bg-slate-800 p-8 rounded-3xl text-center shadow-lg shadow-slate-200/40 dark:shadow-none border border-slate-100 dark:border-slate-700 hover:-translate-y-2 transition-transform duration-300"
                    data-testid={`value-card-${index}`}
                  >
                    <div className="w-16 h-16 mx-auto mb-6 bg-orange-50 dark:bg-orange-900/20 rounded-2xl flex items-center justify-center transform rotate-3">
                      <IconComponent iconName={value.icon} className="w-8 h-8 text-orange-500" />
                    </div>
                    <h4 className="text-xl font-bold mb-3 text-slate-900 dark:text-white" data-testid={`value-title-${index}`}>
                      {value.title}
                    </h4>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed" data-testid={`value-description-${index}`}>
                      {value.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Statement Section */}
      {/* Mission Statement Section */}
      <section className="py-24 bg-gradient-to-r from-orange-500 to-orange-600 relative overflow-hidden" data-testid="mission-section">
        {/* Abstract background */}
        <div className="absolute inset-0 opacity-10 bg-white" style={{ backgroundImage: 'radial-gradient(circle at center, white 2px, transparent 2px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto text-center"
          >
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 lg:p-16 border border-white/20 shadow-2xl">
              <div className="flex items-center justify-center mb-8">
                <span className="text-6xl drop-shadow-2xl">🔥</span>
              </div>
              <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6" data-testid="mission-title">
                {currentLanguage === 'he' ? 'המשימה הקדושה שלנו' : 'Our Sacred Mission'}
              </h2>
              <p className="text-xl lg:text-2xl text-orange-50 leading-relaxed max-w-4xl mx-auto mb-16 font-medium">
                {currentLanguage === 'he' 
                  ? 'להביא את אוצרות החכמה של רבי נחמן מברסלב לכל בית יהודי בעולם. באמצעות טכנולוגיה מתקדמת ואהבת ישראל, אנו פועלים להפיץ את האור הברסלבי ולחבר לבבות לאמונה טהורה.'
                  : 'To bring the treasures of Rabbi Nachman of Breslov\'s wisdom to every Jewish home worldwide. Through advanced technology and love for Israel, we work to spread Breslov light and connect hearts to pure faith.'
                }
              </p>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { icon: '📚', title: 'ספרים אמיתיים', desc: 'רק מהמקורות הנכונים', delay: 0 },
                  { icon: '🌍', title: 'משלוח עולמי', desc: 'לכל מקום בעולם', delay: 0.1 },
                  { icon: '💝', title: 'הורדות חינמיות', desc: 'נתינה מהלב', delay: 0.2 }
                ].map((item, i) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: item.delay }}
                    key={i} 
                    className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <div className="text-4xl mb-4">{item.icon}</div>
                    <p className="text-xl font-bold text-white mb-2">{item.title}</p>
                    <p className="text-orange-100/80">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800" data-testid="stats-section">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-slate-900 dark:text-white" data-testid="stats-title">
              {t.statsTitle}
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto" data-testid="stats-subtitle">
              {t.statsSubtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.stats.map((stat, index) => (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                key={index}
                className="bg-white dark:bg-slate-800 p-8 rounded-3xl text-center shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-shadow"
                data-testid={`stat-card-${index}`}
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-orange-100 to-orange-50 dark:from-slate-700 dark:to-slate-800 rounded-2xl flex items-center justify-center transform -rotate-3">
                  <IconComponent iconName={stat.icon} className="w-8 h-8 text-orange-500" />
                </div>
                <div className="text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-3 tracking-tight" data-testid={`stat-number-${index}`}>
                  <AnimatedCounter end={stat.number} />
                </div>
                <p className="text-slate-500 dark:text-slate-400 font-medium" data-testid={`stat-label-${index}`}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-white dark:bg-slate-900 overflow-hidden" data-testid="timeline-section">
        <div className="container mx-auto px-4 relative">
          {/* Vertical line connecting nodes */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-orange-200 dark:via-orange-900/50 to-transparent -translate-x-1/2"></div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-20 relative z-10"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-slate-900 dark:text-white" data-testid="timeline-title">
              {t.timelineTitle}
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto" data-testid="timeline-subtitle">
              {t.timelineSubtitle}
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <div className="space-y-16">
              {t.timeline.map((item, index) => (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  key={index}
                  className={`flex flex-col lg:flex-row gap-8 lg:gap-16 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                  data-testid={`timeline-item-${index}`}
                >
                  {/* Timeline Node Content */}
                  <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'} w-full`}>
                    <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-shadow">
                      <div className={`flex items-center gap-3 mb-4 ${index % 2 === 0 ? 'lg:justify-end' : 'lg:justify-start'}`}>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white" data-testid={`timeline-item-title-${index}`}>
                          {item.title}
                        </h3>
                        <span className="bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                          {item.duration}
                        </span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed" data-testid={`timeline-item-description-${index}`}>
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Year Node */}
                  <div className="flex-shrink-0 relative z-10 transform lg:-translate-y-4">
                    <div className="w-24 h-24 bg-white dark:bg-slate-900 border-4 border-orange-500 rounded-full flex items-center justify-center shadow-xl shadow-orange-500/20">
                      <span className="text-xl font-black text-orange-500">
                        {item.year}
                      </span>
                    </div>
                  </div>
                  
                  {/* Empty space for alternating layout */}
                  <div className="flex-1 hidden lg:block"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-800/50" data-testid="testimonials-section">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-slate-900 dark:text-white" data-testid="testimonials-title">
              {t.testimonialsTitle}
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto" data-testid="testimonials-subtitle">
              {t.testimonialsSubtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {t.testimonials.map((testimonial, index) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                key={index}
                className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full relative overflow-hidden"
                data-testid={`testimonial-card-${index}`}
              >
                <div className="absolute top-0 right-0 p-6 text-6xl text-slate-100 dark:text-slate-700 opacity-50 font-serif leading-none rotate-180">"</div>
                
                {/* Stars */}
                <div className="flex mb-6 relative z-10">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-slate-600 dark:text-slate-300 italic mb-8 flex-grow relative z-10" data-testid={`testimonial-quote-${index}`}>
                  {testimonial.quote}
                </blockquote>

                {/* Author */}
                <div className="border-t border-slate-100 dark:border-slate-700 pt-6 mt-auto">
                  <p className="font-bold text-slate-900 dark:text-white" data-testid={`testimonial-name-${index}`}>
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400" data-testid={`testimonial-location-${index}`}>
                    {testimonial.location}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 relative overflow-hidden" data-testid="final-cta-section">
        <div className="absolute inset-0 bg-slate-900">
          <img loading="lazy" decoding="async" src={heroBooks} alt="Books Texture" className="w-full h-full object-cover opacity-10 mix-blend-overlay grayscale" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl lg:text-6xl font-extrabold mb-6 tracking-tight text-white" data-testid="cta-title">
              {t.ctaTitle}
            </h2>
            <p className="text-xl lg:text-2xl text-orange-400 font-medium mb-6" data-testid="cta-subtitle">
              {t.ctaSubtitle}
            </p>
            <p className="text-lg mb-12 text-slate-400 max-w-2xl mx-auto leading-relaxed" data-testid="cta-description">
              {t.ctaDescription}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a 
                href="/store" 
                className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-5 rounded-full font-bold transition-all duration-300 inline-flex items-center gap-2 hover:scale-105 shadow-xl shadow-orange-500/20 text-lg"
                data-testid="cta-button-primary"
              >
                <ChevronRight className="w-5 h-5" />
                {t.ctaButtonPrimary}
              </a>
              <a 
                href="/contact" 
                className="bg-white/5 hover:bg-white/10 text-white border border-white/20 px-10 py-5 rounded-full font-bold transition-all duration-300 inline-flex items-center gap-2 hover:scale-105 text-lg backdrop-blur-sm"
                data-testid="cta-button-secondary"
              >
                <Mail className="w-5 h-5" />
                {t.ctaButtonSecondary}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}