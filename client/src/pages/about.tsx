import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'wouter';
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
    heroDescription: 'אנחנו מאמינים שכל יהודי בעולם זכאי לגשת לאוצרות החכמה של רבי נחמן מברסלב. האש שלי נוסדה כדי להביא את האור הברסלבי לכל בית יהודי באמצעות הטכנולוגיה המתקדמת ביו��ר.',
    heroCtaPrimary: 'צור קשר עכשיו',
    heroCtaSecondary: 'הורדות חינמיות',

    // Founder Section
    founderTitle: 'הכירו את המייסד ומשהו של אתכם',
    founderName: 'יעקב חן',
    founderRole: 'מייסד ומנהל האש שלי',
    founderBio: 'יעק�� נשאר בעל אמונה עמוקה בברסלב והשתאבות את אלו החוכמות של רבי נחמן. עם זריזות וחיבור עמוק לרוח ברסלב, יעקב הקדיש עצמו למשימה קדושה: להביא את אור רבי נחמן לכל יהודי בעולם, ולא משנה אי שם הם שוהים או מה המצב שלהם. התקווה היא שהספרים והתורות של רבי נחמן יגיעו לכל לב שצריך אותם.',
    founderMission: 'בעקבות רבי ישראל דב אודסר זצ״ל (הסבא), שהפיץ את מסרו של רבי נחמן בכל המדינות, אנו משתדלים להשלים את המשימה הזו דרך הטכנולוגיה. הטכנולוגיה היא כלי בלבד - הנשמה של העבודה היא להקרים את אור ברסלב לכל אחד.',
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
        quote: 'האתר הכי מתקדם ונוח לקניית ספרי ברסלב. איכות מעולה, שי��ות מהיר, ומבחר שלא קיים בשום מקום אחר. מ��ליץ בחום!',
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
        quote: 'האתר קל לשימוש, המידע מדויק והתמיכה בעברית מושלמת. המלצה גדולה למי שמחפש ספ���י ברסלב אמיתיים.',
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
    title: 'About Keren Rabbi Israel - Your Source for Authentic Breslov Books',
    description: 'Learn about the story behind Keren Rabbi Israel Dov Odesser, the leading organization for high-quality Breslov books. Discover the legacy of Saba Rabbi Israel Dov Odesser and our mission to spread Breslov light worldwide.',

    // Hero Section
    heroTitle: 'About My Fire',
    heroSubtitle: 'Your source for authentic high-quality Breslov books',
    heroDescription: 'We believe every Jew worldwide deserves access to Rabbi Nachman of Breslov\'s treasure troves of wisdom. My Fire was founded to bring Breslov light to every Jewish home using the most advanced technology.',
    heroCtaPrimary: 'Contact Us Now',
    heroCtaSecondary: 'Free Downloads',

    // Founder Section
    founderTitle: 'Meet the Founder',
    founderName: 'Rabbi Israël Dov Odesser זצ״ל - Saba',
    founderRole: 'Founder and Director of My Fire',
    founderBio: 'Rabbi Israël Dov Odesser, known as "Saba", was one of the greatest disseminators of Rabbi Nachman of Breslov\'s teachings in the world. For decades, he dedicated his life to spreading the light of Rabbi Nachman to every Jew in the world, in every country and every language. He merited to discover the holy note "Na Nach Nachma Nachman MeUman" and spread the Breslov light throughout the world. The Keren was founded to continue Saba\'s holy mission and bring Rabbi Nachman\'s books to every Jewish home.',
    founderMission: 'Following Rabbi Israel Dov Odesser zt"l (the Saba), who spread Rabbi Nachman\'s message to all nations, we strive to continue this mission through technology. Technology is merely a tool - the soul of our work is to illuminate the Breslov light for everyone.',
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
    description: 'Découvrez l\'histoire derrière la Keren Rabbi Israël Dov Odesser, l\'organisation leader pour les livres Breslov de haute qualité. Découvrez l\'héritage de Saba Rabbi Israël Dov Odesser et notre mission de répandre la lumière Breslov dans le monde.',

    // Hero Section
    heroTitle: 'À Propos de Mon Feu',
    heroSubtitle: 'Votre source de livres Breslov authentiques de haute qualité',
    heroDescription: 'Nous croyons que chaque Juif dans le monde mérite d\'accéder aux trésors de sagesse du Rabbi Nachman de Breslov. Mon Feu a été fondé pour apporter la lumière Breslov à chaque foyer juif en utilisant la technologie la plus avancée.',
    heroCtaPrimary: 'Contactez-Nous Maintenant',
    heroCtaSecondary: 'Téléchargements Gratuits',

    // Founder Section
    founderTitle: 'Rencontrez le Fondateur',
    founderName: 'Rabbi Israël Dov Odesser זצ״ל - Saba',
    founderRole: 'Fondateur et Directeur de Mon Feu',
    founderBio: 'Rabbi Israël Dov Odesser, connu sous le nom de "Saba", était l\'un des plus grands diffuseurs des enseignements du Rabbi Nachman de Breslov dans le monde. Pendant des décennies, il a consacré sa vie à répandre la lumière du Rabbi Nachman à chaque Juif du monde, dans chaque pays et chaque langue. Il a mérité de découvrir le note sacré "Na Nach Nachma Nachman MeUman" et de répandre la lumière Breslov dans le monde entier. La Keren a été fondée pour poursuivre la mission sainte de Saba et apporter les livres du Rabbi Nachman à chaque foyer juif.',
    founderMission: 'En suivant le Rabbi Israel Dov Odesser zt"l (le Saba), qui a répandu le message du Rabbi Nachman à toutes les nations, nous nous efforçons de poursuivre cette mission par la technologie. La technologie n\'est qu\'un outil - l\'âme de notre travail est d\'illuminer la lumière Breslov pour tous.',
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
    description: 'Aprende sobre la historia detrás de la Keren Rabbi Israel Dov Odesser, la organización líder para libros Breslov de alta calidad. Descubre el legado de Saba Rabbi Israel Dov Odesser y nuestra misión de esparcir la luz Breslov mundialmente.',

    // Hero Section
    heroTitle: 'Acerca de Mi Fuego',
    heroSubtitle: 'Tu fuente de libros Breslov auténticos de alta calidad',
    heroDescription: 'Creemos que cada judío en el mundo merece acceder a los tesoros de sabiduría del Rabino Nachman de Breslov. Mi Fuego fue fundado para traer la luz Breslov a cada hogar judío usando la tecnología más avanzada.',
    heroCtaPrimary: 'Contáctanos Ahora',
    heroCtaSecondary: 'Descargas Gratuitas',

    // Founder Section
    founderTitle: 'Conoce al Fundador',
    founderName: 'Rabbi Israël Dov Odesser זצ״ל - Saba',
    founderRole: 'Fundador y Director de Mi Fuego',
    founderBio: 'Rabbi Israel Dov Odesser, conocido como "Saba", fue uno de los más grandes difusores de las enseñanzas del Rabino Nachman de Breslov en el mundo. Durante décadas, dedicó su vida a esparcir la luz del Rabino Nachman a cada judío del mundo, en cada país y cada idioma. Merezó descubrir la nota sagrada "Na Nach Nachma Nachman MeUman" y esparcir la luz Breslov por todo el mundo. La Keren fue fundada para continuar la santa misión de Saba y traer los libros del Rabino Nachman a cada hogar judío.',
    founderMission: 'Siguiendo al Rabino Israel Dov Odesser zt"l (el Saba), quien difundió el mensaje del Rabino Nachman a todas las naciones, nos esforzamos por continuar esta misión a través de la tecnología. La tecnología es solo una herramienta - el alma de nuestro trabajo es iluminar la luz Breslov para todos.',
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
    founderBio: 'Яаков - опытн��й Full-Stack разработчик с глубокой страстью к распространению литературы Бреслов. Имея более 8 лет опыта в разработке передовых веб-сайтов, Яаков посвятил свои технические навыки святой миссии: созданию цифровой революции в мире еврейской литературы.',
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
        title: 'Служени�� Общине',
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
        label: 'Успешн��х Заказов',
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
        quote: 'Легко используемый веб-сайт, точная информация и идеальная поддержка иврита. Отличная рекомендация для всех, кто ищет подлинны�� книги Бреслов.',
        rating: 5
      }
    ],

    // Final CTA Section
    ctaTitle: 'Присоединяйтесь к Семье Мой Огонь',
    ctaSubtitle: 'Откройте полную коллекцию качественных книг Бреслов и начните свое духовное путешествие сегодня',
    ctaDescription: 'Ищете ли вы кон��ретную книгу, хотите открыть новые произведения или просто поддержать нашу миссию - мы здесь для вас.',
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
      
      {/* Hero Section - Fix z-index pour éviter images dans header */}
      <section className="hero-gradient relative overflow-hidden py-20 lg:py-32" style={{ position: 'relative', zIndex: 1, marginTop: '0', paddingTop: '120px' }} data-testid="hero-section">
        <div className="hero-overlay absolute inset-0"></div>
        {/* Background Image */}
        <div className="absolute inset-0 opacity-10">
          <img 
            src={heroBooks} 
            alt="Breslov Books Collection" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-scale">
            <h1 className="heading-oversized mb-6" data-testid="hero-title">
              {t.heroTitle}
            </h1>
            <p className="text-large text-muted-foreground mb-8 max-w-2xl mx-auto" data-testid="hero-subtitle">
              {t.heroSubtitle}
            </p>
            <p className="text-lg text-foreground/80 mb-12 max-w-3xl mx-auto leading-relaxed" data-testid="hero-description">
              {t.heroDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact" 
                className="btn-breslov-primary inline-flex items-center gap-2"
                data-testid="hero-cta-primary"
              >
                <Mail className="w-5 h-5" />
                {t.heroCtaPrimary}
              </Link>
              <Link 
                href="/downloads" 
                className="btn-breslov-secondary inline-flex items-center gap-2"
                data-testid="hero-cta-secondary"
              >
                <Download className="w-5 h-5" />
                {t.heroCtaSecondary}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 bg-secondary/30" data-testid="founder-section">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold text-center mb-16 text-primary" data-testid="founder-title">
              {t.founderTitle}
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
              {/* Background Books Image */}
              <div className="absolute top-0 right-0 w-1/3 h-1/3 opacity-5 lg:opacity-10">
                <img 
                  src={heroBooks} 
                  alt="Books Background" 
                  className="w-full h-full object-contain"
                />
              </div>
              {/* Founder Photo & Info */}
              <div className="text-center lg:text-start" data-testid="founder-info">
                <div className="w-48 h-48 mx-auto lg:mx-0 mb-6 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center relative overflow-hidden border-4 border-primary/30">
                  <div className="w-full h-full bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 flex items-center justify-center">
                    <div className="text-6xl font-bold text-white drop-shadow-lg">🔥</div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <h3 className="text-3xl font-bold text-primary mb-2" data-testid="founder-name">
                  {t.founderName} יעקב חן
                </h3>
                <p className="text-lg text-accent font-medium mb-4" data-testid="founder-role">
                  {t.founderRole}
                </p>
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                  <span className="text-2xl">🔥</span>
                  <span className="text-primary font-semibold">מפתח Full-Stack & חסיד ברסלב</span>
                </div>
                <blockquote className="text-lg text-primary font-medium italic border-r-4 border-primary pr-4 mb-4" data-testid="founder-mission">
                  "{t.founderMission}"
                </blockquote>
              </div>

              {/* Founder Bio */}
              <div className="space-y-6" data-testid="founder-bio">
                <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-6 rounded-xl border border-primary/10">
                  <p className="text-lg leading-relaxed text-foreground">
                    {t.founderBio}
                  </p>
                </div>
              </div>
            </div>

            {/* Values Section */}
            <div data-testid="values-section">
              <h3 className="text-3xl font-bold text-center mb-12 text-primary" data-testid="values-title">
                {t.personalValues}
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {t.values.map((value, index) => (
                  <div 
                    key={index} 
                    className="card-premium p-6 text-center hover:shadow-xl transition-all duration-300"
                    data-testid={`value-card-${index}`}
                  >
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                      <IconComponent iconName={value.icon} className="w-8 h-8 text-primary" />
                    </div>
                    <h4 className="text-xl font-semibold mb-3 text-primary" data-testid={`value-title-${index}`}>
                      {value.title}
                    </h4>
                    <p className="text-muted-foreground" data-testid={`value-description-${index}`}>
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement Section */}
      <section className="py-16 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20" data-testid="mission-section">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 lg:p-12 border border-yellow-200 dark:border-yellow-800">
              <div className="flex items-center justify-center mb-6">
                <span className="text-6xl">🔥</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-6" data-testid="mission-title">
                {currentLanguage === 'he' ? 'המשימה הקדושה שלנו' : 'Our Sacred Mission'}
              </h2>
              <p className="text-lg lg:text-xl text-foreground leading-relaxed max-w-4xl mx-auto mb-8">
                {currentLanguage === 'he' 
                  ? 'להביא את אוצרות החכמה של רבי נחמן מברסלב לכל בית יהודי בעולם. באמצעות טכנולוגיה מתקדמת ואהבת ישראל, אנו פועלים להפיץ את האור הברסלבי ולחבר לבבות לאמונה טהורה.'
                  : 'To bring the treasures of Rabbi Nachman of Breslov\'s wisdom to every Jewish home worldwide. Through advanced technology and love for Israel, we work to spread Breslov light and connect hearts to pure faith.'
                }
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl mb-2">����</div>
                  <p className="font-semibold text-primary">ספרים אמיתיים</p>
                  <p className="text-sm text-muted-foreground">רק מהמקורות הנכונים</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🌍</div>
                  <p className="font-semibold text-primary">משלוח עולמי</p>
                  <p className="text-sm text-muted-foreground">לכל מקום בעולם</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">💝</div>
                  <p className="font-semibold text-primary">הורדות חינמיות</p>
                  <p className="text-sm text-muted-foreground">נתינה מהלב</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary/5" data-testid="stats-section">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-primary" data-testid="stats-title">
              {t.statsTitle}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="stats-subtitle">
              {t.statsSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.stats.map((stat, index) => (
              <div 
                key={index}
                className="card-premium p-8 text-center hover:scale-105 transition-all duration-300"
                data-testid={`stat-card-${index}`}
              >
                <div className="w-20 h-20 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                  <IconComponent iconName={stat.icon} className="w-10 h-10 text-primary" />
                </div>
                <div className="text-4xl lg:text-5xl font-bold text-primary mb-3" data-testid={`stat-number-${index}`}>
                  <AnimatedCounter end={stat.number} />
                </div>
                <p className="text-lg font-medium text-muted-foreground" data-testid={`stat-label-${index}`}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-background" data-testid="timeline-section">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-primary" data-testid="timeline-title">
              {t.timelineTitle}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="timeline-subtitle">
              {t.timelineSubtitle}
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              {t.timeline.map((item, index) => (
                <div 
                  key={index}
                  className={`flex flex-col lg:flex-row gap-8 lg:gap-12 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                  data-testid={`timeline-item-${index}`}
                >
                  {/* Year Badge */}
                  <div className="flex-shrink-0 lg:w-32">
                    <div className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold text-lg">
                      {item.year}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                    <div className="card-premium p-8 animate-slide-in-left">
                      <div className="flex items-center gap-3 mb-4">
                        <h3 className="text-2xl font-bold text-primary" data-testid={`timeline-item-title-${index}`}>
                          {item.title}
                        </h3>
                        <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium">
                          {item.duration}
                        </span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed" data-testid={`timeline-item-description-${index}`}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20" data-testid="success-stories-section">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4" data-testid="success-stories-title">
              {currentLanguage === 'he' ? '🎯 הצלחות ויעדים שהושגו' : '🎯 Achievements & Success Stories'}
            </h2>
            <p className="text-lg text-muted-foreground">
              {currentLanguage === 'he' 
                ? 'מהדרך שעשינו עד ��יום - תוצאות מדויקות ומדודות'
                : 'From our journey so far - measurable results and achievements'
              }
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all">
              <div className="text-3xl mb-3">📚</div>
              <div className="text-2xl font-bold text-primary mb-1">150+</div>
              <div className="text-sm text-muted-foreground">ספרים במלאי</div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all">
              <div className="text-3xl mb-3">🌍</div>
              <div className="text-2xl font-bold text-primary mb-1">5</div>
              <div className="text-sm text-muted-foreground">ש��ות זמינות</div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all">
              <div className="text-3xl mb-3">⚡</div>
              <div className="text-2xl font-bold text-primary mb-1">24/7</div>
              <div className="text-sm text-muted-foreground">זמינ��ת האתר</div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all">
              <div className="text-3xl mb-3">🏆</div>
              <div className="text-2xl font-bold text-primary mb-1">99.9%</div>
              <div className="text-sm text-muted-foreground">שביעות רצון</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 bg-secondary/30" data-testid="testimonials-section">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-primary" data-testid="testimonials-title">
              {t.testimonialsTitle}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="testimonials-subtitle">
              {t.testimonialsSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {t.testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="card-premium p-8 hover:scale-105 transition-all duration-300"
                data-testid={`testimonial-card-${index}`}
              >
                {/* Stars */}
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-gold-accent fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-muted-foreground italic mb-6 leading-relaxed" data-testid={`testimonial-quote-${index}`}>
                  "{testimonial.quote}"
                </blockquote>

                {/* Author */}
                <div className="text-center border-t border-border pt-4">
                  <p className="font-semibold text-primary" data-testid={`testimonial-name-${index}`}>
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground" data-testid={`testimonial-location-${index}`}>
                    {testimonial.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent relative overflow-hidden" data-testid="final-cta-section">
        <div className="absolute inset-0 bg-primary/90"></div>
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 text-6xl opacity-10 animate-bounce">🔥</div>
          <div className="absolute top-20 right-20 text-4xl opacity-10 animate-pulse">📚</div>
          <div className="absolute bottom-20 left-20 text-5xl opacity-10 animate-ping">✨</div>
          <div className="absolute bottom-10 right-10 text-3xl opacity-10 animate-bounce">🌟</div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-primary-foreground">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="cta-title">
              {t.ctaTitle}
            </h2>
            <p className="text-xl mb-6 opacity-90" data-testid="cta-subtitle">
              {t.ctaSubtitle}
            </p>
            <p className="text-lg mb-12 opacity-80 max-w-2xl mx-auto leading-relaxed" data-testid="cta-description">
              {t.ctaDescription}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/store" 
                className="bg-background text-primary px-8 py-4 rounded-xl font-semibold hover:bg-background/90 transition-all duration-300 inline-flex items-center gap-2 hover:scale-105 hover:shadow-2xl"
                data-testid="cta-button-primary"
              >
                <ChevronRight className="w-5 h-5" />
                {t.ctaButtonPrimary}
                <span className="text-xl">🔥</span>
              </Link>
              <Link 
                href="/contact" 
                className="border-2 border-background text-background px-8 py-4 rounded-xl font-semibold hover:bg-background hover:text-primary transition-all duration-300 inline-flex items-center gap-2 hover:scale-105 hover:shadow-2xl"
                data-testid="cta-button-secondary"
              >
                <Mail className="w-5 h-5" />
                {t.ctaButtonSecondary}
                <span className="text-xl">💬</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
