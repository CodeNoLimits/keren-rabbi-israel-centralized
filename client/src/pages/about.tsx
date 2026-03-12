import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Users, BookOpen, Award, Globe, Heart, Target, Zap, Star, ChevronRight, Mail, Download, Clock, Lightbulb, Shield, Code } from 'lucide-react';
import heroBooks from '@assets/hero-books-composition.png';
import { GoldDivider } from '../components/GoldDivider';
import { AnimatedOrbs } from '../components/AnimatedOrbs';
import { rtlFont, rtlBorderStyle } from '../lib/utils';

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
  const isRTL = currentLanguage === 'he' || currentLanguage === 'ar';

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
      <section className="relative overflow-hidden py-32 lg:py-48 dark:bg-[#050505] bg-[#F9F8F6] border-b dark:border-white/5 border-[#E6E0D8]" data-testid="hero-section">
        {/* Background Pattern and Glow */}
        <div className="absolute inset-0 bg-gradient-to-br dark:from-[#050505] dark:via-[#111318] dark:to-[#0A0500] from-white via-[#F9F8F6] to-[#E6E0D8]/30 z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D4AF37]/10 dark:bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none z-0" />
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[url('/images/jerusalem-skyline.svg')] bg-cover bg-center mix-blend-screen" />
        
        {/* Animated Orbs */}
        <AnimatedOrbs />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full dark:bg-[#111318]/80 bg-white/80 backdrop-blur-md border border-[#E6E0D8] dark:border-white/10 text-[#D4AF37] font-bold text-sm mb-10 shadow-sm">
              <Star className="w-4 h-4 fill-current" />
              <span className="tracking-widest uppercase">{currentLanguage === 'he' ? 'ברוכים הבאים' : 'Welcome to My Fire'}</span>
            </div>
            
            <h1 className={`text-6xl lg:text-8xl font-black dark:text-white text-slate-900 mb-8 tracking-tight leading-[1.1] ${rtlFont(isRTL)}`} data-testid="hero-title">
              {t.heroTitle}
            </h1>
            <GoldDivider size="lg" className="mb-10" />

            <p className="text-xl lg:text-3xl dark:text-slate-300 text-slate-700 mb-10 max-w-3xl mx-auto font-light leading-relaxed" data-testid="hero-subtitle">
              {t.heroSubtitle}
            </p>
            <p className="text-lg lg:text-xl text-[#B5912B] mb-14 max-w-3xl mx-auto leading-relaxed border-l-4 border-[#D4AF37] pl-8 text-left italic font-medium bg-white/50 dark:bg-black/20 p-8 rounded-2xl shadow-sm border-r-0" dir={isRTL ? "rtl" : "ltr"} style={rtlBorderStyle(isRTL, '4px', '2rem')} data-testid="hero-description">
              "{t.heroDescription}"
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a 
                href="/contact" 
                className="bg-gradient-to-r from-[#D4AF37] to-[#B5912B] hover:from-[#B5912B] hover:to-[#9E7A1C] text-white px-10 py-5 rounded-xl font-bold shadow-[0_4px_14px_rgba(212,175,55,0.4)] transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 uppercase tracking-widest text-sm focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                data-testid="hero-cta-primary"
              >
                <Mail className="w-5 h-5" />
                {t.heroCtaPrimary}
              </a>
              <a 
                href="/downloads" 
                className="bg-white dark:bg-[#111318] text-slate-900 dark:text-white border border-[#E6E0D8] dark:border-white/10 hover:border-[#D4AF37] dark:hover:border-[#D4AF37] hover:text-[#D4AF37] px-10 py-5 rounded-xl font-bold shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-[#D4AF37] flex items-center justify-center gap-2 uppercase tracking-widest text-sm"
                data-testid="hero-cta-secondary"
              >
                <Download className="w-5 h-5 text-[#D4AF37]" />
                {t.heroCtaSecondary}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-32 dark:bg-[#111318] bg-white border-b border-[#E6E0D8] dark:border-white/5 relative overflow-hidden" data-testid="founder-section">
        {/* Subtle Decorative Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-[1px] bg-gradient-to-l from-[#D4AF37]/50 to-transparent" />
        <div className="absolute top-0 right-0 w-[1px] h-1/3 bg-gradient-to-b from-[#D4AF37]/50 to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className={`text-4xl lg:text-6xl font-black text-slate-900 dark:text-white ${rtlFont(isRTL)}`} data-testid="founder-title">
                {t.founderTitle}
              </h2>
              <GoldDivider size="lg" className="mt-8" />
            </motion.div>
            
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center mb-24">
              {/* Founder Photo & Info (Left/Right depending on RTL) */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="lg:col-span-5 relative" data-testid="founder-info"
              >
                <div className="relative z-10 p-2 bg-gradient-to-br from-[#D4AF37] to-[#9E7A1C] rounded-3xl shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                  <div className="w-full aspect-[4/5] rounded-[1.25rem] dark:bg-[#0A0A0B] bg-slate-50 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/images/jerusalem-skyline.svg')] opacity-10 bg-cover mix-blend-screen" />
                    <img src="/images/histoire.webp" alt="Rabbi Israel" className="w-full h-full object-cover opacity-90 transition-transform duration-700 hover:scale-105" />
                    {/* Inner Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
                  </div>
                  
                  <div className="absolute bottom-10 left-8 right-8 text-center text-white z-20">
                    <h3 className={`text-3xl lg:text-4xl font-black mb-2 shadow-black drop-shadow-lg ${rtlFont(isRTL)}`} data-testid="founder-name">
                      {t.founderName}
                    </h3>
                    <p className="text-lg lg:text-xl text-[#F9F8F6] font-medium tracking-wide drop-shadow-md" data-testid="founder-role">
                      {t.founderRole}
                    </p>
                  </div>
                </div>
                
                {/* Decorative background blocks */}
                <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#D4AF37]/10 rounded-full blur-[40px] z-0" />
                <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-[#B5912B]/10 rounded-full blur-[60px] z-0" />
              </motion.div>

              {/* Founder Bio (Right/Left depending on RTL) */}
              <motion.div 
                initial={{ opacity: 0, x: isRTL ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-7 space-y-10" data-testid="founder-bio"
              >
                <div className="relative">
                  <span className="text-8xl text-[#D4AF37]/10 absolute -top-12 -left-6 z-0 font-serif leading-none select-none pointer-events-none">"</span>
                  <blockquote className="text-2xl lg:text-3xl dark:text-white text-slate-800 italic mb-0 relative z-10 font-medium leading-relaxed" data-testid="founder-mission">
                    {t.founderMission}
                  </blockquote>
                </div>
                
                <div className="h-px w-full bg-gradient-to-r from-transparent via-[#E6E0D8] dark:via-white/10 to-transparent" />

                <div className="relative">
                  <p className="text-lg lg:text-xl leading-relaxed dark:text-slate-300 text-slate-600 font-light">
                    {t.founderBio}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-3 mt-8">
                    {['React', 'TypeScript', 'Node.js', 'PostgreSQL'].map(tech => (
                      <span key={tech} className="px-5 py-2.5 dark:bg-[#111318] bg-white border border-[#E6E0D8] dark:border-white/10 dark:text-slate-300 text-slate-700 rounded-xl text-sm font-bold flex items-center gap-2 shadow-sm hover:border-[#D4AF37] transition-colors cursor-default">
                        <Code className="w-4 h-4 text-[#D4AF37]" /> {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="bg-[#F9F8F6] dark:bg-[#0A0A0B] p-8 md:p-10 rounded-3xl border border-[#D4AF37]/30 shadow-lg relative overflow-hidden group hover:border-[#D4AF37]/60 transition-colors duration-500">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-bl-full pointer-events-none transition-transform duration-500 group-hover:scale-110" />
                  <div className="flex items-start gap-6 relative z-10">
                    <div className="p-4 bg-white dark:bg-[#111318] rounded-2xl shadow-[0_4px_12px_rgba(212,175,55,0.15)] text-[#D4AF37] shrink-0 border border-[#E6E0D8] dark:border-white/5">
                      <Target className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className={`text-2xl font-bold dark:text-white text-slate-900 mb-4 ${rtlFont(isRTL)}`}>
                        {currentLanguage === 'he' ? 'המטרה הקדושה' : 'The Sacred Mission'}
                      </h4>
                      <p className="text-lg dark:text-slate-400 text-slate-600 leading-relaxed font-light">
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
              <h3 className={`text-4xl lg:text-5xl font-black text-center mb-16 dark:text-white text-slate-900 ${rtlFont(isRTL)}`} data-testid="values-title">
                {t.personalValues}
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {t.values.map((value, index) => (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    key={index} 
                    className="bg-white dark:bg-[#111318] p-8 rounded-[2rem] text-center shadow-lg shadow-slate-200/40 dark:shadow-none border border-[#E6E0D8] dark:border-white/5 hover:border-[#D4AF37]/50 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
                    data-testid={`value-card-${index}`}
                  >
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-[#1A1C23] dark:to-[#0A0A0B] border border-[#E6E0D8] dark:border-white/5 rounded-2xl flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-300">
                      <IconComponent iconName={value.icon} className="w-10 h-10 text-[#D4AF37]" />
                    </div>
                    <h4 className="text-2xl font-bold mb-4 dark:text-white text-slate-900 group-hover:text-[#D4AF37] transition-colors" data-testid={`value-title-${index}`}>
                      {value.title}
                    </h4>
                    <p className="dark:text-slate-400 text-slate-500 text-base leading-relaxed font-light" data-testid={`value-description-${index}`}>
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
      <section className="py-32 dark:bg-[#050505] bg-slate-900 relative overflow-hidden border-y dark:border-white/5 border-slate-800" data-testid="mission-section">
        {/* Abstract background */}
        <div className="absolute inset-0 bg-[url('/images/jerusalem-skyline.svg')] opacity-[0.03] bg-cover bg-center mix-blend-screen" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D4AF37]/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto text-center"
          >
            <div className="dark:bg-[#111318]/60 bg-slate-800/60 backdrop-blur-2xl rounded-[3rem] p-10 lg:p-20 border dark:border-white/5 border-slate-700 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-[#D4AF37]/10 pointer-events-none" />
              <div className="flex items-center justify-center mb-10 relative z-10">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-24 h-24 bg-gradient-to-br from-[#D4AF37]/20 to-transparent rounded-full flex items-center justify-center border border-[#D4AF37]/30 shadow-[0_0_30px_rgba(212,175,55,0.2)]"
                >
                  <Star className="w-12 h-12 text-[#D4AF37]" />
                </motion.div>
              </div>
              <h2 className={`text-4xl lg:text-6xl font-black text-white mb-8 relative z-10 ${rtlFont(isRTL)}`} data-testid="mission-title">
                {currentLanguage === 'he' ? 'המשימה הקדושה שלנו' : 'Our Sacred Mission'}
              </h2>
              <p className="text-xl lg:text-3xl text-slate-300 leading-relaxed max-w-4xl mx-auto mb-16 font-light relative z-10">
                {currentLanguage === 'he' 
                  ? 'להביא את אוצרות החכמה של רבי נחמן מברסלב לכל בית יהודי בעולם. באמצעות טכנולוגיה מתקדמת שומרים אנו על איכות מעולה ומפיצים את האור.'
                  : 'To bring the treasures of Rabbi Nachman of Breslov\'s wisdom to every Jewish home worldwide. Through advanced technology we maintain excellent quality and spread the light.'
                }
              </p>
              <div className="grid md:grid-cols-3 gap-8 relative z-10">
                {[
                  { icon: <BookOpen className="w-10 h-10 text-[#D4AF37]" />, title: 'ספרים אמיתיים', desc: 'רק מהמקורות הנכונים', delay: 0 },
                  { icon: <Globe className="w-10 h-10 text-[#D4AF37]" />, title: 'משלוח עולמי', desc: 'לכל מקום בעולם', delay: 0.1 },
                  { icon: <Heart className="w-10 h-10 text-[#D4AF37]" />, title: 'הורדות חינמיות', desc: 'נתינה מהלב', delay: 0.2 }
                ].map((item, i) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: item.delay }}
                    key={i} 
                    className="p-10 dark:bg-[#0A0A0B]/80 bg-slate-900/80 rounded-[2rem] border dark:border-white/5 border-[#D4AF37]/20 hover:border-[#D4AF37]/60 hover:shadow-[0_10px_40px_rgba(212,175,55,0.1)] transition-all duration-300 group"
                  >
                    <div className="mb-6 flex justify-center transform transition-transform group-hover:scale-110 duration-300 group-hover:-translate-y-2">{item.icon}</div>
                    <p className="text-2xl font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors">{item.title}</p>
                    <p className="text-slate-400 font-light text-lg">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 dark:bg-[#0A0A0B] bg-[#F9F8F6] border-b border-[#E6E0D8] dark:border-white/5" data-testid="stats-section">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-20"
          >
            <h2 className={`text-4xl lg:text-6xl font-black mb-6 text-slate-900 dark:text-white ${rtlFont(isRTL)}`} data-testid="stats-title">
              {t.statsTitle}
            </h2>
            <GoldDivider size="md" className="mt-6 mb-8" />
            <p className="text-xl lg:text-2xl dark:text-slate-400 text-slate-500 max-w-2xl mx-auto font-light" data-testid="stats-subtitle">
              {t.statsSubtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.stats.map((stat, index) => (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                key={index}
                className="bg-white dark:bg-[#1A1C23] p-8 rounded-3xl text-center shadow-[0_4px_20px_rgba(0,0,0,0.03)] border dark:border-white/5 border-transparent hover:border-[#D4AF37]/50 transition-all duration-300 transform hover:-translate-y-1"
                data-testid={`stat-card-${index}`}
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-slate-50 dark:bg-[#0A0A0B] border border-slate-100 dark:border-white/5 rounded-2xl flex items-center justify-center">
                  <IconComponent iconName={stat.icon} className="w-8 h-8 text-[#D4AF37]" />
                </div>
                <div className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight font-serif" data-testid={`stat-number-${index}`}>
                  <AnimatedCounter end={stat.number} />
                </div>
                <p className="text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider text-xs" data-testid={`stat-label-${index}`}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-32 dark:bg-[#111318] bg-white border-b border-[#E6E0D8] dark:border-white/5 overflow-hidden relative" data-testid="timeline-section">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none -mt-40 -mr-40" />
        <div className="container mx-auto px-4 relative">
          {/* Vertical line connecting nodes */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#D4AF37] dark:via-[#D4AF37]/50 to-transparent -translate-x-1/2" />
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-20 relative z-10"
          >
            <h2 className={`text-4xl lg:text-6xl font-black mb-6 text-slate-900 dark:text-white ${rtlFont(isRTL)}`} data-testid="timeline-title">
              {t.timelineTitle}
            </h2>
            <GoldDivider size="md" className="mt-6 mb-8" />
            <p className="text-xl lg:text-3xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-light" data-testid="timeline-subtitle">
              {t.timelineSubtitle}
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="space-y-20">
              {t.timeline.map((item, index) => (
                <motion.div 
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  key={index}
                  className={`flex flex-col lg:flex-row gap-8 lg:gap-20 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                  data-testid={`timeline-item-${index}`}
                >
                  {/* Timeline Node Content */}
                  <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'} w-full`}>
                    <div className="bg-[#F9F8F6] dark:bg-[#0A0A0B] p-10 rounded-[2rem] border border-[#E6E0D8] dark:border-white/5 hover:border-[#D4AF37]/50 shadow-lg hover:shadow-[0_15px_40px_rgba(212,175,55,0.1)] transition-all duration-500 group relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-bl-full pointer-events-none transition-transform duration-500 group-hover:scale-110" />
                      <div className={`flex items-center gap-4 mb-6 relative z-10 ${index % 2 === 0 ? 'lg:justify-end' : 'lg:justify-start'}`}>
                        <h3 className="text-3xl font-black text-slate-900 dark:text-white group-hover:text-[#D4AF37] transition-colors" data-testid={`timeline-item-title-${index}`}>
                          {item.title}
                        </h3>
                        <span className="bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm">
                          {item.duration}
                        </span>
                      </div>
                      <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-light relative z-10" data-testid={`timeline-item-description-${index}`}>
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Year Node */}
                  <div className="flex-shrink-0 relative z-10 transform lg:-translate-y-4">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-28 h-28 bg-white dark:bg-[#111318] border-[6px] border-[#D4AF37] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all duration-300"
                    >
                      <span className="text-2xl font-black text-[#D4AF37] font-serif">
                        {item.year}
                      </span>
                    </motion.div>
                  </div>
                  
                  {/* Empty space for alternating layout */}
                  <div className="flex-1 hidden lg:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 dark:bg-[#0A0A0B] bg-[#F9F8F6] border-b border-[#E6E0D8] dark:border-white/5" data-testid="testimonials-section">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-20"
          >
            <h2 className={`text-4xl lg:text-6xl font-black mb-6 text-slate-900 dark:text-white ${rtlFont(isRTL)}`} data-testid="testimonials-title">
              {t.testimonialsTitle}
            </h2>
            <GoldDivider size="md" className="mt-6 mb-8" />
            <p className="text-xl lg:text-3xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-light" data-testid="testimonials-subtitle">
              {t.testimonialsSubtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12 max-w-7xl mx-auto">
            {t.testimonials.map((testimonial, index) => (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                key={index}
                className="bg-white dark:bg-[#111318] p-10 rounded-[2.5rem] border border-[#E6E0D8] dark:border-white/5 shadow-xl shadow-slate-200/50 dark:shadow-none hover:shadow-2xl hover:border-[#D4AF37]/50 transition-all duration-500 flex flex-col h-full relative overflow-hidden group transform hover:-translate-y-2"
                data-testid={`testimonial-card-${index}`}
              >
                <div className="absolute top-0 right-0 p-8 text-8xl text-[#D4AF37] opacity-10 dark:opacity-5 font-serif leading-none rotate-180 pointer-events-none transition-transform duration-500 group-hover:scale-110">"</div>
                
                {/* Stars */}
                <div className="flex mb-8 relative z-10 text-[#D4AF37] gap-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current filter drop-shadow-[0_0_5px_rgba(212,175,55,0.5)]" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-xl text-slate-700 dark:text-slate-300 italic mb-10 flex-grow relative z-10 leading-relaxed font-light" data-testid={`testimonial-quote-${index}`}>
                  {testimonial.quote}
                </blockquote>

                {/* Author */}
                <div className="border-t border-[#E6E0D8] dark:border-white/5 pt-8 mt-auto flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#9E7A1C] flex items-center justify-center text-white font-bold text-xl shadow-md">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-black text-slate-900 dark:text-white uppercase tracking-wider text-sm mb-1" data-testid={`testimonial-name-${index}`}>
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-[#B5912B] tracking-wider font-semibold" data-testid={`testimonial-location-${index}`}>
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 relative overflow-hidden border-t dark:border-white/5 border-slate-200" data-testid="final-cta-section">
        <div className="absolute inset-0 dark:bg-[#050505] bg-slate-900">
          <img loading="lazy" decoding="async" src={heroBooks} alt="Books Texture" className="w-full h-full object-cover opacity-10 grayscale mix-blend-screen" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t dark:from-[#050505] from-slate-900 via-slate-900/80 to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto text-center bg-white/5 dark:bg-[#111318]/40 backdrop-blur-xl p-12 lg:p-20 rounded-[3rem] border border-white/10 shadow-2xl"
          >
            <h2 className={`text-5xl lg:text-7xl font-black mb-8 tracking-tight text-white ${rtlFont(isRTL)}`} data-testid="cta-title">
              {t.ctaTitle}
            </h2>
            <p className="text-2xl lg:text-4xl text-[#D4AF37] font-bold mb-8 drop-shadow-[0_2px_10px_rgba(212,175,55,0.3)]" data-testid="cta-subtitle">
              {t.ctaSubtitle}
            </p>
            <p className="text-xl mb-16 text-slate-300 max-w-3xl mx-auto leading-relaxed font-light" data-testid="cta-description">
              {t.ctaDescription}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <a 
                href="/store" 
                className="bg-gradient-to-r from-[#D4AF37] to-[#B5912B] hover:from-[#B5912B] hover:to-[#9E7A1C] text-white px-12 py-6 rounded-2xl font-black transition-all duration-300 inline-flex items-center justify-center gap-3 hover:-translate-y-2 shadow-[0_8px_30px_rgba(212,175,55,0.4)] text-xl min-w-[240px] tracking-widest uppercase focus-visible:ring-4 focus-visible:ring-[#D4AF37]"
                data-testid="cta-button-primary"
              >
                <ChevronRight className={`w-6 h-6 ${isRTL ? 'rotate-180' : ''}`} />
                {t.ctaButtonPrimary}
              </a>
              <a 
                href="/contact" 
                className="bg-white/5 hover:bg-white/10 text-white border-2 border-white/20 hover:border-white/40 px-12 py-6 rounded-2xl font-black transition-all duration-300 inline-flex items-center justify-center gap-3 hover:-translate-y-2 text-xl backdrop-blur-md min-w-[240px] tracking-widest uppercase focus-visible:ring-4 focus-visible:ring-white"
                data-testid="cta-button-secondary"
              >
                <Mail className="w-6 h-6" />
                {t.ctaButtonSecondary}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}