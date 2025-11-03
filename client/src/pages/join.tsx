import { Header } from '../components/Header';
import { useLanguage } from '../contexts/LanguageContext';
import { useState, useEffect } from 'react';
import { 
  Users, 
  BookOpen, 
  Heart, 
  Globe, 
  Award, 
  Target,
  Lightbulb,
  Mail,
  Plus,
  Minus,
  Star,
  MessageCircle,
  Building,
  ChevronRight,
  Check
} from 'lucide-react';

const translations = {
  he: {
    // SEO
    title: 'הצטרפו אלינו - האש שלי | הזדמנות להפיץ את אור רבנו בעולם',
    description: 'הצטרפו לקהילת האש שלי ועזרו להפיץ את תורת רבי נחמן מברסלב בעולם. למעלה מ-30 שנה של פעילות קדושה.',

    // Hero Section
    heroTitle: 'יש לכם הזדמנות',
    heroSubtitle: 'להפיץ ולגלות את אור רבנו בעולם',
    heroDescription: 'למעלה מ-30 שנה שאנחנו עוסקים ועמלים בהדפסה והפצת ספרי רבנו הקדוש. הפעילות שהסבא רבי ישראל דוב אודסר פעל להקים - מאז ועד היום הקרן עומדת כגוף הגדול והפעיל ביותר בחסידות ברסלב.',

    // Statistics Section
    statsTitle: 'כמה מספרים רק לסבר את האוזן',
    statsSubtitle: 'שנים של הדפסה והפצה עם פעילות יום יומית',
    stats: [
      {
        number: '30+',
        label: 'שנים של הדפסה והפצה',
        icon: 'Award'
      },
      {
        number: '1M+',
        label: 'ספרים בשפה העברית',
        icon: 'BookOpen'
      },
      {
        number: '50+',
        label: 'מדינות עם הפצה ישירה',
        icon: 'Globe'
      },
      {
        number: '1000+',
        label: 'משפחות בקהילה',
        icon: 'Users'
      }
    ],

    // Activities Section
    activitiesTitle: 'הפעילות שלנו',
    activitiesSubtitle: 'פועלים בכל התחומים להפצת תורת רבנו',
    activities: [
      {
        title: 'הדפסה והפצה',
        description: 'הדפסה והפצה של ספרי רבנו הקדוש בכל רחבי העולם',
        icon: 'BookOpen'
      },
      {
        title: 'פעילות במירון',
        description: 'מחדשים את הבסטות במירון ואצל רבי ישראל',
        icon: 'Building'
      },
      {
        title: 'חינוך והסברה',
        description: 'פעילות חינוכית לדור הצעיר בתורת רבנו',
        icon: 'Lightbulb'
      },
      {
        title: 'קהילה עולמית',
        description: 'חיבור בין חסידי ברסלב בכל רחבי העולם',
        icon: 'Globe'
      }
    ],

    // Features Section
    featuresTitle: 'למה להצטרף אלינו?',
    features: [
      {
        title: 'משימה קדושה',
        description: 'להפיץ את תורת רבי נחמן מברסלב בכל העולם',
        icon: 'Heart'
      },
      {
        title: 'קהילה תומכת',
        description: 'חלק מקהילה חמה ותומכת של חסידי ברסלב',
        icon: 'Users'
      },
      {
        title: 'השפעה אמיתית',
        description: 'כל תרומה ופעילות יוצרת שינוי אמיתי בעולם',
        icon: 'Target'
      }
    ],

    // Testimonials
    testimonialsTitle: 'המלצות מחברי הקהילה',
    testimonials: [
      {
        quote: 'זכיתי לקבל את ספרי רבנו הקדוש והם שינו את חיי לחלוטין. התוכן הרוחני העמוק נתן לי כוח וחיזוק בכל יום.',
        author: 'משה כהן',
        location: 'תל אביב',
        rating: 5
      },
      {
        quote: 'הקרן עוזרת לי כבר שנים רבות. הפעילות באמת מקדשת את השם והספרים סייעו לי להתחזק ברוחניות.',
        author: 'יעקב לוי',
        location: 'ירושלים',
        rating: 5
      },
      {
        quote: 'השירות המקצועי והיחס האישי מרגשים. זה יותר מקהילה - זה משפחה אמיתית המחוברת לתורת רבנו.',
        author: 'רחל אברהם',
        location: 'בני ברק',
        rating: 5
      }
    ],

    // FAQ Section
    faqTitle: 'שאלות נפוצות',
    faq: [
      {
        question: 'איך יכולני להצטרף לקהילה?',
        answer: 'ניתן להצטרף באמצעות האתר, השתתפות בפעילויות, נדבות, או התנדבות. כל דרך של חיבור מברכת בואכם.'
      },
      {
        question: 'אילו ספרים זמינים ובאילו שפות?',
        answer: 'יש לנו מגוון רחב של ספרי רבי נחמן מברסלב בעברית, אנגלית, צרפתית, ספרדית ורוסית. הקטלוג מתעדכן באופן שוטף.'
      },
      {
        question: 'האם יש עלויות להצטרפות?',
        answer: 'ההצטרפות לקהילה חינמית לחלוטין. ישנן אפשרויות נדבה ותמיכה למי שרוצה לתרום למשימה הקדושה.'
      },
      {
        question: 'איך מתנהל שירותי הלקוחות?',
        answer: 'אנחנו זמינים 24/7 דרך האתר, אימייל וטלפון. הצוות שלנו דובר עברית, אנגלית וכמה שפות נוספות.'
      }
    ],

    // CTA Section
    ctaTitle: 'מוכנים להצטרף למשימה?',
    ctaSubtitle: 'הפכו לחלק מקהילה עולמית שפועלת להפצת אור רבנו',
    ctaDescription: 'כל אחד יכול לתרום ולהיות חלק מהמשימה הקדושה הזו. בואו נפעל יחד!',
    ctaButtonPrimary: 'הצטרפו עכשיו',
    ctaButtonSecondary: 'למדו עוד',

    // Join Methods
    joinMethodsTitle: 'דרכים להצטרפות',
    joinMethods: [
      {
        title: 'התנדבות',
        description: 'השתתפו בהפצת ספרים ובפעילויות הקהילה',
        icon: 'Users'
      },
      {
        title: 'תמיכה כספית',
        description: 'תרמו לעזור במימון ההדפסות וההפצה',
        icon: 'Heart'
      },
      {
        title: 'הפצה מקומית',
        description: 'עזרו להפיץ ספרים באזור המגורים שלכם',
        icon: 'Target'
      },
      {
        title: 'רשתות חברתיות',
        description: 'שתפו ופרסמו על הפעילות ברשתות',
        icon: 'MessageCircle'
      }
    ]
  },

  en: {
    // SEO
    title: 'Join Us - My Fire | Opportunity to spread Rabbi\'s light worldwide',
    description: 'Join the My Fire community and help spread Rabbi Nachman of Breslov\'s teachings worldwide. Over 30 years of sacred activity.',

    // Hero Section
    heroTitle: 'You Have an Opportunity',
    heroSubtitle: 'To spread and reveal our Rabbi\'s light in the world',
    heroDescription: 'For over 30 years we have been engaged in printing and distributing our holy Rabbi\'s books. The activity that the Saba Rabbi Israel Dov Odser worked to establish - from then until today the foundation stands as the largest and most active body in Breslov Hasidism.',

    // Statistics Section
    statsTitle: 'Some Numbers Just to Please the Ear',
    statsSubtitle: 'Years of printing and distribution with daily activity',
    stats: [
      {
        number: '30+',
        label: 'Years of printing and distribution',
        icon: 'Award'
      },
      {
        number: '1M+',
        label: 'Books in Hebrew language',
        icon: 'BookOpen'
      },
      {
        number: '50+',
        label: 'Countries with direct distribution',
        icon: 'Globe'
      },
      {
        number: '1000+',
        label: 'Families in community',
        icon: 'Users'
      }
    ],

    // Activities Section
    activitiesTitle: 'Our Activities',
    activitiesSubtitle: 'Working in all areas to spread our Rabbi\'s teachings',
    activities: [
      {
        title: 'Printing & Distribution',
        description: 'Printing and distributing our holy Rabbi\'s books worldwide',
        icon: 'BookOpen'
      },
      {
        title: 'Meron Activities',
        description: 'Renewing the activities in Meron and at Rabbi Israel\'s',
        icon: 'Building'
      },
      {
        title: 'Education & Outreach',
        description: 'Educational activity for the younger generation in our Rabbi\'s teachings',
        icon: 'Lightbulb'
      },
      {
        title: 'Global Community',
        description: 'Connecting Breslov Hasidim from all over the world',
        icon: 'Globe'
      }
    ],

    // Features Section
    featuresTitle: 'Why Join Us?',
    features: [
      {
        title: 'Sacred Mission',
        description: 'To spread Rabbi Nachman of Breslov\'s teachings throughout the world',
        icon: 'Heart'
      },
      {
        title: 'Supportive Community',
        description: 'Part of a warm and supportive community of Breslov Hasidim',
        icon: 'Users'
      },
      {
        title: 'Real Impact',
        description: 'Every contribution and activity creates real change in the world',
        icon: 'Target'
      }
    ],

    // Testimonials
    testimonialsTitle: 'Testimonials from Community Members',
    testimonials: [
      {
        quote: 'I had the privilege of receiving our holy Rabbi\'s books and they completely changed my life. The deep spiritual content gave me strength and encouragement every day.',
        author: 'Moshe Cohen',
        location: 'Tel Aviv',
        rating: 5
      },
      {
        quote: 'The foundation has been helping me for many years. The activity truly sanctifies the Name and the books helped me strengthen spiritually.',
        author: 'Yaakov Levi',
        location: 'Jerusalem',
        rating: 5
      },
      {
        quote: 'The professional service and personal treatment are moving. It\'s more than a community - it\'s a real family connected to our Rabbi\'s teachings.',
        author: 'Rachel Abraham',
        location: 'Bnei Brak',
        rating: 5
      }
    ],

    // FAQ Section
    faqTitle: 'Frequently Asked Questions',
    faq: [
      {
        question: 'How can I join the community?',
        answer: 'You can join through the website, participation in activities, donations, or volunteering. Any way of connection welcomes you.'
      },
      {
        question: 'What books are available and in which languages?',
        answer: 'We have a wide range of Rabbi Nachman of Breslov\'s books in Hebrew, English, French, Spanish and Russian. The catalog is constantly updated.'
      },
      {
        question: 'Are there costs for joining?',
        answer: 'Joining the community is completely free. There are donation and support options for those who want to contribute to the sacred mission.'
      },
      {
        question: 'How is customer service managed?',
        answer: 'We are available 24/7 through the website, email and phone. Our team speaks Hebrew, English and several other languages.'
      }
    ],

    // CTA Section
    ctaTitle: 'Ready to Join the Mission?',
    ctaSubtitle: 'Become part of a global community working to spread our Rabbi\'s light',
    ctaDescription: 'Everyone can contribute and be part of this sacred mission. Let\'s work together!',
    ctaButtonPrimary: 'Join Now',
    ctaButtonSecondary: 'Learn More',

    // Join Methods
    joinMethodsTitle: 'Ways to Join',
    joinMethods: [
      {
        title: 'Volunteering',
        description: 'Participate in book distribution and community activities',
        icon: 'Users'
      },
      {
        title: 'Financial Support',
        description: 'Donate to help fund printing and distribution',
        icon: 'Heart'
      },
      {
        title: 'Local Distribution',
        description: 'Help distribute books in your local area',
        icon: 'Target'
      },
      {
        title: 'Social Media',
        description: 'Share and promote activities on social networks',
        icon: 'MessageCircle'
      }
    ]
  },

  fr: {
    // SEO
    title: 'Rejoignez-Nous - Mon Feu | Opportunité de répandre la lumière du Rabbi dans le monde',
    description: 'Rejoignez la communauté Mon Feu et aidez à répandre les enseignements de Rabbi Nachman de Breslov dans le monde. Plus de 30 ans d\'activité sacrée.',

    // Hero Section
    heroTitle: 'Vous Avez une Opportunité',
    heroSubtitle: 'De répandre et révéler la lumière de notre Rabbi dans le monde',
    heroDescription: 'Depuis plus de 30 ans, nous nous engageons dans l\'impression et la distribution des livres de notre saint Rabbi. L\'activité que le Saba Rabbi Israel Dov Odser a travaillé à établir - depuis lors jusqu\'à aujourd\'hui, la fondation se dresse comme le corps le plus grand et le plus actif du hassidisme de Breslov.',

    // Statistics Section
    statsTitle: 'Quelques Chiffres Juste pour Faire Plaisir à l\'Oreille',
    statsSubtitle: 'Années d\'impression et de distribution avec activité quotidienne',
    stats: [
      {
        number: '30+',
        label: 'Années d\'impression et distribution',
        icon: 'Award'
      },
      {
        number: '1M+',
        label: 'Livres en langue hébraïque',
        icon: 'BookOpen'
      },
      {
        number: '50+',
        label: 'Pays avec distribution directe',
        icon: 'Globe'
      },
      {
        number: '1000+',
        label: 'Familles dans la communauté',
        icon: 'Users'
      }
    ],

    // Activities Section
    activitiesTitle: 'Nos Activités',
    activitiesSubtitle: 'Travailler dans tous les domaines pour répandre les enseignements de notre Rabbi',
    activities: [
      {
        title: 'Impression et Distribution',
        description: 'Impression et distribution des livres de notre saint Rabbi dans le monde entier',
        icon: 'BookOpen'
      },
      {
        title: 'Activités de Meron',
        description: 'Renouvellement des activités à Meron et chez Rabbi Israel',
        icon: 'Building'
      },
      {
        title: 'Éducation et Sensibilisation',
        description: 'Activité éducative pour la jeune génération dans les enseignements de notre Rabbi',
        icon: 'Lightbulb'
      },
      {
        title: 'Communauté Mondiale',
        description: 'Connecter les hassidim de Breslov du monde entier',
        icon: 'Globe'
      }
    ],

    // Features Section
    featuresTitle: 'Pourquoi Nous Rejoindre?',
    features: [
      {
        title: 'Mission Sacrée',
        description: 'Répandre les enseignements de Rabbi Nachman de Breslov dans le monde entier',
        icon: 'Heart'
      },
      {
        title: 'Communauté Solidaire',
        description: 'Partie d\'une communauté chaleureuse et solidaire de hassidim de Breslov',
        icon: 'Users'
      },
      {
        title: 'Impact Réel',
        description: 'Chaque contribution et activité crée un changement réel dans le monde',
        icon: 'Target'
      }
    ],

    // Testimonials
    testimonialsTitle: 'Témoignages des Membres de la Communauté',
    testimonials: [
      {
        quote: 'J\'ai eu le privilège de recevoir les livres de notre saint Rabbi et ils ont complètement changé ma vie. Le contenu spirituel profond m\'a donné force et encouragement chaque jour.',
        author: 'Moshe Cohen',
        location: 'Tel Aviv',
        rating: 5
      },
      {
        quote: 'La fondation m\'aide depuis de nombreuses années. L\'activité sanctifie vraiment le Nom et les livres m\'ont aidé à me renforcer spirituellement.',
        author: 'Yaakov Levi',
        location: 'Jérusalem',
        rating: 5
      },
      {
        quote: 'Le service professionnel et le traitement personnel sont émouvants. C\'est plus qu\'une communauté - c\'est une vraie famille connectée aux enseignements de notre Rabbi.',
        author: 'Rachel Abraham',
        location: 'Bnei Brak',
        rating: 5
      }
    ],

    // FAQ Section
    faqTitle: 'Questions Fréquemment Posées',
    faq: [
      {
        question: 'Comment puis-je rejoindre la communauté?',
        answer: 'Vous pouvez rejoindre via le site web, participation aux activités, dons, ou bénévolat. Toute façon de se connecter vous accueille.'
      },
      {
        question: 'Quels livres sont disponibles et dans quelles langues?',
        answer: 'Nous avons une large gamme de livres de Rabbi Nachman de Breslov en hébreu, anglais, français, espagnol et russe. Le catalogue est constamment mis à jour.'
      },
      {
        question: 'Y a-t-il des coûts pour rejoindre?',
        answer: 'Rejoindre la communauté est complètement gratuit. Il y a des options de don et de soutien pour ceux qui veulent contribuer à la mission sacrée.'
      },
      {
        question: 'Comment le service client est-il géré?',
        answer: 'Nous sommes disponibles 24/7 via le site web, email et téléphone. Notre équipe parle hébreu, anglais et plusieurs autres langues.'
      }
    ],

    // CTA Section
    ctaTitle: 'Prêt à Rejoindre la Mission?',
    ctaSubtitle: 'Devenez partie d\'une communauté mondiale travaillant à répandre la lumière de notre Rabbi',
    ctaDescription: 'Chacun peut contribuer et faire partie de cette mission sacrée. Travaillons ensemble!',
    ctaButtonPrimary: 'Rejoignez Maintenant',
    ctaButtonSecondary: 'En Savoir Plus',

    // Join Methods
    joinMethodsTitle: 'Façons de Rejoindre',
    joinMethods: [
      {
        title: 'Bénévolat',
        description: 'Participez à la distribution de livres et aux activités communautaires',
        icon: 'Users'
      },
      {
        title: 'Soutien Financier',
        description: 'Faites un don pour aider à financer l\'impression et la distribution',
        icon: 'Heart'
      },
      {
        title: 'Distribution Locale',
        description: 'Aidez à distribuer des livres dans votre région',
        icon: 'Target'
      },
      {
        title: 'Réseaux Sociaux',
        description: 'Partagez et promouvez les activités sur les réseaux sociaux',
        icon: 'MessageCircle'
      }
    ]
  },

  es: {
    // SEO
    title: 'Únete a Nosotros - Mi Fuego | Oportunidad de difundir la luz del Rabino en el mundo',
    description: 'Únete a la comunidad Mi Fuego y ayuda a difundir las enseñanzas del Rabino Najman de Breslov en todo el mundo. Más de 30 años de actividad sagrada.',

    // Hero Section
    heroTitle: 'Tienes una Oportunidad',
    heroSubtitle: 'De difundir y revelar la luz de nuestro Rabino en el mundo',
    heroDescription: 'Durante más de 30 años hemos estado comprometidos en la impresión y distribución de los libros de nuestro santo Rabino. La actividad que el Saba Rabino Israel Dov Odser trabajó para establecer - desde entonces hasta hoy la fundación se erige como el cuerpo más grande y activo en el jasidismo de Breslov.',

    // Statistics Section
    statsTitle: 'Algunos Números Solo para Complacer al Oído',
    statsSubtitle: 'Años de impresión y distribución con actividad diaria',
    stats: [
      {
        number: '30+',
        label: 'Años de impresión y distribución',
        icon: 'Award'
      },
      {
        number: '1M+',
        label: 'Libros en idioma hebreo',
        icon: 'BookOpen'
      },
      {
        number: '50+',
        label: 'Países con distribución directa',
        icon: 'Globe'
      },
      {
        number: '1000+',
        label: 'Familias en la comunidad',
        icon: 'Users'
      }
    ],

    // Activities Section
    activitiesTitle: 'Nuestras Actividades',
    activitiesSubtitle: 'Trabajando en todas las áreas para difundir las enseñanzas de nuestro Rabino',
    activities: [
      {
        title: 'Impresión y Distribución',
        description: 'Impresión y distribución de los libros de nuestro santo Rabino en todo el mundo',
        icon: 'BookOpen'
      },
      {
        title: 'Actividades en Meron',
        description: 'Renovando las actividades en Meron y en el Rabino Israel',
        icon: 'Building'
      },
      {
        title: 'Educación y Divulgación',
        description: 'Actividad educativa para la generación joven en las enseñanzas de nuestro Rabino',
        icon: 'Lightbulb'
      },
      {
        title: 'Comunidad Global',
        description: 'Conectando jasidim de Breslov de todo el mundo',
        icon: 'Globe'
      }
    ],

    // Features Section
    featuresTitle: '¿Por Qué Unirse a Nosotros?',
    features: [
      {
        title: 'Misión Sagrada',
        description: 'Difundir las enseñanzas del Rabino Najman de Breslov por todo el mundo',
        icon: 'Heart'
      },
      {
        title: 'Comunidad Solidaria',
        description: 'Parte de una comunidad cálida y solidaria de jasidim de Breslov',
        icon: 'Users'
      },
      {
        title: 'Impacto Real',
        description: 'Cada contribución y actividad crea un cambio real en el mundo',
        icon: 'Target'
      }
    ],

    // Testimonials
    testimonialsTitle: 'Testimonios de Miembros de la Comunidad',
    testimonials: [
      {
        quote: 'Tuve el privilegio de recibir los libros de nuestro santo Rabino y cambiaron completamente mi vida. El contenido espiritual profundo me dio fuerza y ánimo cada día.',
        author: 'Moshe Cohen',
        location: 'Tel Aviv',
        rating: 5
      },
      {
        quote: 'La fundación me ha estado ayudando durante muchos años. La actividad realmente santifica el Nombre y los libros me ayudaron a fortalecerme espiritualmente.',
        author: 'Yaakov Levi',
        location: 'Jerusalén',
        rating: 5
      },
      {
        quote: 'El servicio profesional y el trato personal son conmovedores. Es más que una comunidad - es una familia real conectada a las enseñanzas de nuestro Rabino.',
        author: 'Rachel Abraham',
        location: 'Bnei Brak',
        rating: 5
      }
    ],

    // FAQ Section
    faqTitle: 'Preguntas Frecuentes',
    faq: [
      {
        question: '¿Cómo puedo unirme a la comunidad?',
        answer: 'Puedes unirte a través del sitio web, participación en actividades, donaciones, o voluntariado. Cualquier forma de conexión te da la bienvenida.'
      },
      {
        question: '¿Qué libros están disponibles y en qué idiomas?',
        answer: 'Tenemos una amplia gama de libros del Rabino Najman de Breslov en hebreo, inglés, francés, español y ruso. El catálogo se actualiza constantemente.'
      },
      {
        question: '¿Hay costos por unirse?',
        answer: 'Unirse a la comunidad es completamente gratis. Hay opciones de donación y apoyo para aquellos que quieren contribuir a la misión sagrada.'
      },
      {
        question: '¿Cómo se maneja el servicio al cliente?',
        answer: 'Estamos disponibles 24/7 a través del sitio web, email y teléfono. Nuestro equipo habla hebreo, inglés y varios otros idiomas.'
      }
    ],

    // CTA Section
    ctaTitle: '¿Listo para Unirte a la Misión?',
    ctaSubtitle: 'Conviértete en parte de una comunidad global trabajando para difundir la luz de nuestro Rabino',
    ctaDescription: 'Todos pueden contribuir y ser parte de esta misión sagrada. ¡Trabajemos juntos!',
    ctaButtonPrimary: 'Únete Ahora',
    ctaButtonSecondary: 'Aprende Más',

    // Join Methods
    joinMethodsTitle: 'Formas de Unirse',
    joinMethods: [
      {
        title: 'Voluntariado',
        description: 'Participa en la distribución de libros y actividades comunitarias',
        icon: 'Users'
      },
      {
        title: 'Apoyo Financiero',
        description: 'Dona para ayudar a financiar la impresión y distribución',
        icon: 'Heart'
      },
      {
        title: 'Distribución Local',
        description: 'Ayuda a distribuir libros en tu área local',
        icon: 'Target'
      },
      {
        title: 'Redes Sociales',
        description: 'Comparte y promueve actividades en redes sociales',
        icon: 'MessageCircle'
      }
    ]
  },

  ru: {
    // SEO
    title: 'Присоединяйтесь к Нам - Мой Огонь | Возможность распространить свет Рабби в мире',
    description: 'Присоединяйтесь к сообществу Мой Огонь и помогите распространить учения Рабби Нахмана из Бреслов по всему миру. Более 30 лет священной деятельности.',

    // Hero Section
    heroTitle: 'У Вас Есть Возможность',
    heroSubtitle: 'Распространить и открыть свет нашего Рабби в мире',
    heroDescription: 'Более 30 лет мы занимаемся печатью и распространением книг нашего святого Рабби. Деятельность, которую Саба Рабби Израэль Дов Одсер работал, чтобы установить - с тех пор до сегодня фонд стоит как самое большое и активное тело в хасидизме Бреслов.',

    // Statistics Section
    statsTitle: 'Несколько Цифр Просто Чтобы Порадовать Слух',
    statsSubtitle: 'Годы печати и распространения с ежедневной деятельностью',
    stats: [
      {
        number: '30+',
        label: 'Лет печати и распространения',
        icon: 'Award'
      },
      {
        number: '1M+',
        label: 'Книг на иврите',
        icon: 'BookOpen'
      },
      {
        number: '50+',
        label: 'Стран с прямым распространением',
        icon: 'Globe'
      },
      {
        number: '1000+',
        label: 'Семей в сообществе',
        icon: 'Users'
      }
    ],

    // Activities Section
    activitiesTitle: 'Наша Деятельность',
    activitiesSubtitle: 'Работаем во всех областях для распространения учений нашего Рабби',
    activities: [
      {
        title: 'Печать и Распространение',
        description: 'Печать и распространение книг нашего святого Рабби по всему миру',
        icon: 'BookOpen'
      },
      {
        title: 'Деятельность в Мероне',
        description: 'Обновление деятельности в Мероне и у Рабби Израэля',
        icon: 'Building'
      },
      {
        title: 'Образование и Просвещение',
        description: 'Образовательная деятельность для молодого поколения в учениях нашего Рабби',
        icon: 'Lightbulb'
      },
      {
        title: 'Глобальное Сообщество',
        description: 'Соединение хасидов Бреслов со всего мира',
        icon: 'Globe'
      }
    ],

    // Features Section
    featuresTitle: 'Почему Присоединиться к Нам?',
    features: [
      {
        title: 'Священная Миссия',
        description: 'Распространить учения Рабби Нахмана из Бреслов по всему миру',
        icon: 'Heart'
      },
      {
        title: 'Поддерживающее Сообщество',
        description: 'Часть теплого и поддерживающего сообщества хасидов Бреслов',
        icon: 'Users'
      },
      {
        title: 'Реальное Влияние',
        description: 'Каждый вклад и деятельность создают реальные изменения в мире',
        icon: 'Target'
      }
    ],

    // Testimonials
    testimonialsTitle: 'Отзывы Членов Сообщества',
    testimonials: [
      {
        quote: 'Я имел привилегию получить книги нашего святого Рабби, и они полностью изменили мою жизнь. Глубокое духовное содержание дало мне силу и поощрение каждый день.',
        author: 'Моше Коэн',
        location: 'Тель-Авив',
        rating: 5
      },
      {
        quote: 'Фонд помогает мне уже много лет. Деятельность действительно освящает Имя, и книги помогли мне укрепиться духовно.',
        author: 'Яаков Леви',
        location: 'Иерусалим',
        rating: 5
      },
      {
        quote: 'Профессиональный сервис и личное обращение трогательны. Это больше чем сообщество - это настоящая семья, связанная с учениями нашего Рабби.',
        author: 'Рахель Авраам',
        location: 'Бней-Брак',
        rating: 5
      }
    ],

    // FAQ Section
    faqTitle: 'Часто Задаваемые Вопросы',
    faq: [
      {
        question: 'Как я могу присоединиться к сообществу?',
        answer: 'Вы можете присоединиться через веб-сайт, участие в деятельности, пожертвования или волонтерство. Любой способ связи приветствует вас.'
      },
      {
        question: 'Какие книги доступны и на каких языках?',
        answer: 'У нас есть широкий ассортимент книг Рабби Нахмана из Бреслов на иврите, английском, французском, испанском и русском языках. Каталог постоянно обновляется.'
      },
      {
        question: 'Есть ли расходы на присоединение?',
        answer: 'Присоединение к сообществу полностью бесплатно. Есть варианты пожертвований и поддержки для тех, кто хочет внести свой вклад в священную миссию.'
      },
      {
        question: 'Как управляется обслуживание клиентов?',
        answer: 'Мы доступны 24/7 через веб-сайт, электронную почту и телефон. Наша команда говорит на иврите, английском и нескольких других языках.'
      }
    ],

    // CTA Section
    ctaTitle: 'Готовы Присоединиться к Миссии?',
    ctaSubtitle: 'Станьте частью глобального сообщества, работающего над распространением света нашего Рабби',
    ctaDescription: 'Каждый может внести свой вклад и быть частью этой священной миссии. Давайте работать вместе!',
    ctaButtonPrimary: 'Присоединиться Сейчас',
    ctaButtonSecondary: 'Узнать Больше',

    // Join Methods
    joinMethodsTitle: 'Способы Присоединения',
    joinMethods: [
      {
        title: 'Волонтерство',
        description: 'Участвуйте в распространении книг и общественной деятельности',
        icon: 'Users'
      },
      {
        title: 'Финансовая Поддержка',
        description: 'Жертвуйте, чтобы помочь финансировать печать и распространение',
        icon: 'Heart'
      },
      {
        title: 'Местное Распространение',
        description: 'Помогите распространять книги в вашем районе',
        icon: 'Target'
      },
      {
        title: 'Социальные Сети',
        description: 'Делитесь и продвигайте деятельность в социальных сетях',
        icon: 'MessageCircle'
      }
    ]
  }
};

// Icon mapping component
const iconMap = {
  Users,
  BookOpen,
  Heart,
  Globe,
  Award,
  Target,
  Lightbulb,
  Mail,
  Plus,
  Minus,
  Star,
  MessageCircle,
  Building,
  ChevronRight,
  Check
} as const;

type IconKey = keyof typeof iconMap;

const IconComponent = ({ iconName, className = "w-6 h-6" }: { iconName: string, className?: string }) => {
  const Icon = iconMap[iconName as IconKey] ?? Star;
  return <Icon className={className} aria-hidden />;
};

export default function Join() {
  const { currentLanguage, setLanguage } = useLanguage();
  const t = translations[currentLanguage as keyof typeof translations] || translations.he;
  const isRTL = currentLanguage === 'he';
  
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

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

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-background" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
      <Header currentLanguage={currentLanguage} onLanguageChange={setLanguage} />
      
      {/* Hero Section */}
      <section className="hero-gradient relative overflow-hidden py-20 lg:py-32" data-testid="hero-section">
        <div className="hero-overlay absolute inset-0"></div>
        {/* Background Books Composition */}
        <div className="absolute inset-0 opacity-15">
          <img 
            src="/images/hero-books-composition.png" 
            alt="Breslov Books Collection - Sacred Mission" 
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-scale">
            <h3 className="text-2xl font-bold text-primary mb-4" data-testid="hero-subtitle">
              {t.heroTitle}
            </h3>
            <h1 className="heading-oversized mb-6 text-primary" data-testid="hero-title">
              {t.heroSubtitle}
            </h1>
            <p className="text-lg text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed" data-testid="hero-description">
              {t.heroDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-background relative overflow-hidden" data-testid="stats-section">
        {/* Background with multiple book images */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-6 gap-4 h-full">
            <img src="/images/ליקוטי מוהרן 1_1757275910545.jpg" alt="" className="w-full h-full object-cover" />
            <img src="/images/ספר המידות 1_1757275910546.jpg" alt="" className="w-full h-full object-cover" />
            <img src="/images/חיי מוהרן 1_1757275910544.jpg" alt="" className="w-full h-full object-cover" />
            <img src="/images/ליקוטי תפילות 1_1757275910545.jpg" alt="" className="w-full h-full object-cover" />
            <img src="/images/סיפורי מעשיות 1_1757275910546.jpg" alt="" className="w-full h-full object-cover" />
            <img src="/images/ליקוטי עצות 1_1757275910545.jpg" alt="" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6" data-testid="stats-title">
                {t.statsTitle}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="stats-subtitle">
                {t.statsSubtitle}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {t.stats.map((stat, index) => (
                <div 
                  key={index}
                  className="card-premium p-8 text-center group hover:scale-105 transition-transform duration-300"
                  data-testid={`stat-card-${index}`}
                >
                  <div className="mb-6 flex justify-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      <IconComponent iconName={stat.icon} className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <div className="text-4xl lg:text-5xl font-bold text-primary mb-4" data-testid={`stat-number-${index}`}>
                    {stat.number}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground" data-testid={`stat-label-${index}`}>
                    {stat.label}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-20 bg-secondary/20" data-testid="activities-section">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6" data-testid="activities-title">
                {t.activitiesTitle}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="activities-subtitle">
                {t.activitiesSubtitle}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {t.activities.map((activity, index) => (
                <div 
                  key={index}
                  className="card-premium p-8 group hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                  data-testid={`activity-card-${index}`}
                >
                  {/* Book image per activity */}
                  <div className="absolute top-4 right-4 opacity-10 pointer-events-none">
                    <img 
                      src={`/images/${
                        index === 0 ? "כתבי רבי נחמן מברסלב 2_1757275758578.jpg" :
                        index === 1 ? "רבינו הקדוש 1_1757281260204.jpg" :
                        index === 2 ? "חומש עם ליקוטי הלכות גדול 1_1757275742254.jpg" :
                        "ליקוטי מוהרן עם מפרשים 1_1757281125909.jpg"
                      }`} 
                      alt="" 
                      className="w-24 h-30 object-cover rounded-lg transform rotate-12"
                    />
                  </div>
                  <div className="flex items-start gap-6 relative z-10">
                    <div className="flex-shrink-0 w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      <IconComponent iconName={activity.icon} className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-3" data-testid={`activity-title-${index}`}>
                        {activity.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed" data-testid={`activity-description-${index}`}>
                        {activity.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background relative overflow-hidden" data-testid="features-section">
        {/* Background accent images */}
        <div className="absolute inset-0 opacity-8">
          <div className="absolute top-10 left-10">
            <img src="/images/השתפכות הנפש 1_1757281125907.jpg" alt="" className="w-32 h-40 object-cover rounded-lg transform -rotate-12" />
          </div>
          <div className="absolute top-20 right-10">
            <img src="/images/מכתבי ר נתן 1_1757281125910.jpg" alt="" className="w-28 h-36 object-cover rounded-lg transform rotate-6" />
          </div>
          <div className="absolute bottom-20 left-1/4">
            <img src="/images/עצות המבוארות 1_1757275910546.jpg" alt="" className="w-24 h-30 object-cover rounded-lg transform rotate-12" />
          </div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6" data-testid="features-title">
                {t.featuresTitle}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {t.features.map((feature, index) => (
                <div 
                  key={index}
                  className="card-premium p-8 text-center group hover:scale-105 transition-transform duration-300"
                  data-testid={`feature-card-${index}`}
                >
                  <div className="mb-6 flex justify-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      <IconComponent iconName={feature.icon} className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-4" data-testid={`feature-title-${index}`}>
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed" data-testid={`feature-description-${index}`}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Join Methods Section */}
      <section className="py-20 bg-secondary/20" data-testid="join-methods-section">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6" data-testid="join-methods-title">
                {t.joinMethodsTitle}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {t.joinMethods.map((method, index) => (
                <div 
                  key={index}
                  className="card-premium p-6 text-center group hover:shadow-xl transition-all duration-300"
                  data-testid={`join-method-${index}`}
                >
                  <div className="mb-4 flex justify-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      <IconComponent iconName={method.icon} className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-primary mb-3" data-testid={`join-method-title-${index}`}>
                    {method.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed" data-testid={`join-method-description-${index}`}>
                    {method.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-background" data-testid="testimonials-section">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6" data-testid="testimonials-title">
                {t.testimonialsTitle}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {t.testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className="card-premium p-8 group hover:shadow-xl transition-all duration-300"
                  data-testid={`testimonial-${index}`}
                >
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, starIndex) => (
                      <Star key={starIndex} className="w-5 h-5 text-gold-accent fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-6 italic" data-testid={`testimonial-quote-${index}`}>
                    "{testimonial.quote}"
                  </p>
                  <div>
                    <h4 className="font-bold text-primary" data-testid={`testimonial-author-${index}`}>
                      {testimonial.author}
                    </h4>
                    <p className="text-sm text-muted-foreground" data-testid={`testimonial-location-${index}`}>
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-secondary/20" data-testid="faq-section">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6" data-testid="faq-title">
                {t.faqTitle}
              </h2>
            </div>
            
            <div className="space-y-4">
              {t.faq.map((item, index) => (
                <div 
                  key={index}
                  className="card-premium overflow-hidden"
                  data-testid={`faq-item-${index}`}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-secondary/30 transition-colors duration-200"
                    data-testid={`faq-question-${index}`}
                  >
                    <h3 className="text-lg font-semibold text-primary">
                      {item.question}
                    </h3>
                    {openFAQ === index ? (
                      <Minus className="w-5 h-5 text-primary flex-shrink-0" />
                    ) : (
                      <Plus className="w-5 h-5 text-primary flex-shrink-0" />
                    )}
                  </button>
                  {openFAQ === index && (
                    <div className="px-6 pb-6 animate-fade-in-scale" data-testid={`faq-answer-${index}`}>
                      <p className="text-muted-foreground leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent relative overflow-hidden" data-testid="cta-section">
        <div className="absolute inset-0 bg-primary/90"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-primary-foreground">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="cta-title">
              {t.ctaTitle}
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed" data-testid="cta-subtitle">
              {t.ctaSubtitle}
            </p>
            <p className="text-lg mb-12 opacity-80 max-w-3xl mx-auto leading-relaxed" data-testid="cta-description">
              {t.ctaDescription}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact" 
                className="bg-background text-primary px-8 py-4 rounded-xl font-semibold hover:bg-background/90 transition-all duration-200 inline-flex items-center justify-center gap-2"
                data-testid="cta-button-primary"
              >
                <Heart className="w-5 h-5" />
                {t.ctaButtonPrimary}
              </a>
              <a 
                href="/about" 
                className="border-2 border-background text-background px-8 py-4 rounded-xl font-semibold hover:bg-background hover:text-primary transition-all duration-200 inline-flex items-center justify-center gap-2"
                data-testid="cta-button-secondary"
              >
                <ChevronRight className="w-5 h-5" />
                {t.ctaButtonSecondary}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}