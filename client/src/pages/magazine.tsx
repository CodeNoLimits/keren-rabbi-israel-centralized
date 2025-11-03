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
        image: '/attached_assets/ליקוטי מוהרן 1_1757275910545.jpg',
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
        image: '/attached_assets/ליקוטי עצות 1_1757275910545.jpg',
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
        image: '/attached_assets/ישראל סבא_1757281003112.jpg',
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
        image: '/attached_assets/סיפורי מעשיות 1_1757275910546.jpg',
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
        image: '/attached_assets/ישראל סבא_1757281003112.jpg',
        communityImage: true,
        memberPhotos: [
          '/attached_assets/ליקוטי תפילות 1_1757275910545.jpg',
          '/attached_assets/סיפורי מעשיות 1_1757275910546.jpg',
          '/attached_assets/ליקוטי עצות 1_1757275910545.jpg',
          '/attached_assets/ישראל סבא_1757281003112.jpg'
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
        image: '/attached_assets/חיי מוהרן 1_1757275910544.jpg',
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
        image: '/attached_assets/ישראל סבא_1757281003112.jpg',
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
        image: '/attached_assets/ישראל סבא_1757281003112.jpg',
        communityImage: true,
        memberPhotos: [
          '/attached_assets/ליקוטי מ��הרן 1_1757275910545.jpg',
          '/attached_assets/ליקוטי עצות 1_1757275910545.jpg',
          '/attached_assets/ליקוטי תפילות 1_1757275910545.jpg'
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
        image: '/attached_assets/ליקוטי מוהרן 1_1757275910545.jpg',
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
        image: '/attached_assets/ליקוטי עצות 1_1757275910545.jpg',
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
        image: '/attached_assets/ישראל סבא_1757281003112.jpg',
        communityImage: true
      },
      {
        id: 4,
        title: 'Tales - The Hidden Wisdom',
        excerpt: 'Discover the wonderful stories of Rabbi Nachman that contain deep wisdom and spiritual secrets for every soul. Each story is a complete world - a king, a prince, a forest, a journey... and within them all the wisdom needed for true life.',
        category: 'stories',
        author: 'As told by Rabbi Natan of Breslov',
        date: '2025-01-08',
        views: 890,
        featured: false,
        image: '/attached_assets/סיפורי מעשיות 1_1757275910546.jpg',
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
        image: '/attached_assets/ישראל סבא_1757281003112.jpg',
        communityImage: true,
        memberPhotos: [
          '/attached_assets/ליקוטי תפילות 1_1757275910545.jpg',
          '/attached_assets/סיפורי מעשיות 1_1757275910546.jpg',
          '/attached_assets/ליקוטי עצות 1_1757275910545.jpg',
          '/attached_assets/ישראל סבא_1757281003112.jpg'
        ]
      },
      {
        id: 6,
        title: 'Daily Practice - Practical Guide to Spiritual Work',
        excerpt: 'How to integrate Breslov teachings into daily life - practical tips for spiritual work every day. Start with hitbodedut each day, recite the Tikkun HaKlali, read Likutei Moharan, and always be in joy!',
        category: 'practices',
        author: 'Rabbi Israel Dov Odesser zt"l',
        date: '2025-01-03',
        views: 750,
        featured: false,
        image: '/attached_assets/חיי מוהרן 1_1757275910544.jpg',
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
        image: '/attached_assets/ישראל סבא_1757281003112.jpg',
        communityImage: true
      },
      {
        id: 8,
        title: 'Dancing in Breslov - Celebration of Joy and Faith',
        excerpt: 'Enormous celebrations in Jerusalem and around the world! Breslov Hasidim gather to dance, to rejoice, and to spread the light of Rabbi Nachman. "It is a great mitzvah to be in joy" - and in dancing we express that joy!',
        category: 'community',
        author: 'Breslov Documentarians',
        date: '2024-12-28',
        views: 1890,
        featured: false,
        image: '/attached_assets/ישראל סבא_1757281003112.jpg',
        communityImage: true,
        memberPhotos: [
          '/attached_assets/ליקוטי מוהרן 1_1757275910545.jpg',
          '/attached_assets/ליקוטי עצות 1_1757275910545.jpg',
          '/attached_assets/ליקוטי תפילות 1_1757275910545.jpg'
        ]
      }
    ]
  },
  fr: {
    title: 'Le Magazine - Magazine Breslov',
    subtitle: 'Contenu à jour et actuel sur la vie Breslov',
    latestArticles: 'Derniers Articles',
    categories: 'Catégories',
    featured: 'Vedette',
    readMore: 'Lire la suite',
    published: 'Publié',
    author: 'Auteur',
    views: 'Vues',
    allArticles: 'Tous les articles',
    categoriesList: {
      teachings: 'Enseignements',
      stories: 'Histoires',
      practices: 'Pratiques',
      community: 'Communauté',
      events: 'Événements'
    },
    articles: [
      {
        id: 1,
        title: 'Un Grand Commandement: Toujours être Heureux - L\'Enseignement Complet',
        excerpt: 'Découvrez le plus célèbre enseignement du Rabbi Nahman de Breslov sur la joie éternelle et son importance dans nos vies. Rabbi Nahman a enseigné: "C\'est un grand commandement d\'être toujours dans la joie" - c\'est le plus puissant enseignement face aux difficultés et souffrances de la vie.',
        category: 'teachings',
        author: 'Rabbi Israel Dov Odesser zt"l',
        date: '2025-01-15',
        views: 1250,
        featured: true,
        image: '/attached_assets/ליקוטי מוהרן 1_1757275910545.jpg',
        communityImage: true
      },
      {
        id: 2,
        title: 'Hitbodedut - La Sainte Conversation avec le Créateur',
        excerpt: 'Découvrez le secret de l\'hitbodedut, la prière personnelle et privée du Rabbi Nahman que chacun peut faire n\'importe où et n\'importe quand. L\'hitbodedut est la force la plus puissante qui nous a été donnée - une simple et personnelle conversation avec le Très-Haut, dans notre langue, dans nos paroles.',
        category: 'practices',
        author: 'Rabbi Nahman de Breslov',
        date: '2025-01-12',
        views: 980,
        featured: true,
        image: '/attached_assets/ליקוטי עצות 1_1757275910545.jpg',
        communityImage: true
      },
      {
        id: 3,
        title: 'Il n\'y a Aucun Désespoir au Monde - Message d\'Espérance',
        excerpt: 'L\'enseignement le plus puissant du Rabbi Nahman sur l\'espérance et l\'importance de nous renforcer en tout ce qui est possible. Na Nach Nachma Nachman Meuman! Même quand tout semble difficile, il y a toujours de l\'espérance. "Sache qu\'une personne doit traverser un pont très, très étroit, et la règle est: ne pas avoir peur du tout!"',
        category: 'teachings',
        author: 'Rabbi Nahman de Breslov',
        date: '2025-01-10',
        views: 1560,
        featured: false,
        image: '/attached_assets/ישראל סבא_1757281003112.jpg',
        communityImage: true
      },
      {
        id: 4,
        title: 'Contes - La Sagesse Cachée',
        excerpt: 'Découvrez les merveilleux contes du Rabbi Nahman qui contiennent une profonde sagesse et des secrets spirituels pour chaque âme. Chaque conte est un monde complet - un roi, un prince, une forêt, un voyage... et en eux toute la sagesse nécessaire pour la vraie vie.',
        category: 'stories',
        author: 'Raconté par Rabbi Natan de Breslov',
        date: '2025-01-08',
        views: 890,
        featured: false,
        image: '/attached_assets/סיפורי מעשיות 1_1757275910546.jpg',
        communityImage: true
      },
      {
        id: 5,
        title: 'Pèlerinage à Ouman - Voyage Spirituel de Milliers',
        excerpt: 'Photos et rapports des événements de la communauté Breslov dans le monde entier - pèlerinage au tombeau du Rabbi Nahman à Ouman, Rosh Hashanah, danses, joie et connexion des âmes du monde entier. Des milliers de hassidim se réunissent chaque année pour célébrer ensemble.',
        category: 'community',
        author: 'Photographie: Communauté Breslov Mondiale',
        date: '2025-01-05',
        views: 1120,
        featured: false,
        image: '/attached_assets/ישראל סבא_1757281003112.jpg',
        communityImage: true,
        memberPhotos: [
          '/attached_assets/ליקוטי תפילות 1_1757275910545.jpg',
          '/attached_assets/סיפורי מעשיות 1_1757275910546.jpg',
          '/attached_assets/ליקוטי עצות 1_1757275910545.jpg',
          '/attached_assets/ישראל סבא_1757281003112.jpg'
        ]
      },
      {
        id: 6,
        title: 'Pratique Quotidienne - Guide Pratique du Service Spirituel',
        excerpt: 'Comment intégrer les enseignements de Breslov dans la vie quotidienne - conseils pratiques pour le travail spirituel chaque jour. Commencez par l\'hitbodedut chaque jour, récitez le Tikkun HaKlali, lisez le Likutei Moharan, et soyez toujours dans la joie!',
        category: 'practices',
        author: 'Rabbi Israel Dov Odesser zt"l',
        date: '2025-01-03',
        views: 750,
        featured: false,
        image: '/attached_assets/חיי מוהרן 1_1757275910544.jpg',
        communityImage: true
      },
      {
        id: 7,
        title: 'Na Nach Nachma Nachman Meuman - Le Célèbre Morceau',
        excerpt: 'L\'histoire de la révélation miraculeuse du morceau du Rabbi Israel Dov Odesser zt"l. "Na Nach Nachma Nachman Meuman" - le saint mantra qui apporte la joie et la rédemption au monde entier. Mon Feu brûlera jusqu\'à la venue du Messie!',
        category: 'teachings',
        author: 'Rabbi Israel Dov Odesser zt"l - Saba',
        date: '2025-01-01',
        views: 2340,
        featured: true,
        image: '/attached_assets/ישראל סבא_1757281003112.jpg',
        communityImage: true
      },
      {
        id: 8,
        title: 'Danses Breslov - Célébration de Joie et de Foi',
        excerpt: 'Énormes célébrations à Jérusalem et dans le monde entier! Les hassidim Breslov se rassemblent pour danser, se réjouir, et répandre la lumière du Rabbi Nahman. "C\'est un grand commandement d\'être dans la joie" - et dans la danse, nous exprimons cette joie!',
        category: 'community',
        author: 'Documentaristes Breslov',
        date: '2024-12-28',
        views: 1890,
        featured: false,
        image: '/attached_assets/ישראל סבא_1757281003112.jpg',
        communityImage: true,
        memberPhotos: [
          '/attached_assets/ליקוטי מוהרן 1_1757275910545.jpg',
          '/attached_assets/ליקוטי עצות 1_1757275910545.jpg',
          '/attached_assets/ליקוטי תפילות 1_1757275910545.jpg'
        ]
      }
    ]
  },
  es: {
    title: 'La Revista - Revista Breslov',
    subtitle: 'Contenido actualizado y actual sobre la vida Breslov',
    latestArticles: 'Últimos Artículos',
    categories: 'Categorías',
    featured: 'Destacado',
    readMore: 'Leer Más',
    published: 'Publicado',
    author: 'Autor',
    views: 'Vistas',
    allArticles: 'Todos los Artículos',
    categoriesList: {
      teachings: 'Enseñanzas',
      stories: 'Historias',
      practices: 'Prácticas',
      community: 'Comunidad',
      events: 'Eventos'
    },
    articles: [
      {
        id: 1,
        title: 'Un Gran Mandamiento: Siempre estar Feliz - La Enseñanza Completa',
        excerpt: 'Aprende sobre la enseñanza más famosa del Rabino Nachman de Breslov sobre la alegría eterna y su importancia en nuestras vidas. El Rabino Nachman enseñó: "Es un gran mandamiento estar siempre en alegría" - esta es la enseñanza más poderosa contra todas las dificultades y sufrimientos de la vida.',
        category: 'teachings',
        author: 'Rabino Israel Dov Odesser zt"l',
        date: '2025-01-15',
        views: 1250,
        featured: true,
        image: '/attached_assets/ליקוטי מוהרן 1_1757275910545.jpg',
        communityImage: true
      },
      {
        id: 2,
        title: 'Hitbodedut - La Sagrada Conversación con el Creador',
        excerpt: 'Descubre el secreto del hitbodedut, la oración personal y privada del Rabino Nachman que cualquiera puede hacer en cualquier lugar y en cualquier momento. El hitbodedut es la fuerza más poderosa que se nos ha dado - una conversación simple y personal con el Todopoderoso, en nuestro idioma, en nuestras palabras.',
        category: 'practices',
        author: 'Rabino Nachman de Breslov',
        date: '2025-01-12',
        views: 980,
        featured: true,
        image: '/attached_assets/ליקוטי עצות 1_1757275910545.jpg',
        communityImage: true
      },
      {
        id: 3,
        title: 'No Hay Desesperación en el Mundo - Mensaje de Esperanza',
        excerpt: 'La enseñanza más poderosa del Rabino Nachman sobre la esperanza y la importancia de fortalecernos en todo lo posible. ¡Na Nach Nachma Nachman Meuman! Incluso cuando todo parece difícil, siempre hay esperanza. "Sabe que una persona debe cruzar un puente muy, muy estrecho, y la regla es: ¡no tener miedo en absoluto!"',
        category: 'teachings',
        author: 'Rabino Nachman de Breslov',
        date: '2025-01-10',
        views: 1560,
        featured: false,
        image: '/attached_assets/ישראל סבא_1757281003112.jpg',
        communityImage: true
      },
      {
        id: 4,
        title: 'Cuentos - La Sabiduría Oculta',
        excerpt: 'Descubre los maravillosos cuentos del Rabino Nachman que contienen profunda sabiduría y secretos espirituales para cada alma. Cada cuento es un mundo completo - un rey, un príncipe, un bosque, un viaje... y en ellos toda la sabiduría necesaria para la verdadera vida.',
        category: 'stories',
        author: 'Contado por Rabino Natan de Breslov',
        date: '2025-01-08',
        views: 890,
        featured: false,
        image: '/attached_assets/סיפורי מעשיות 1_1757275910546.jpg',
        communityImage: true
      },
      {
        id: 5,
        title: 'Peregrinación a Uman - Viaje Espiritual de Miles',
        excerpt: 'Fotos e informes de eventos de la comunidad Breslov en todo el mundo - peregrinación a la tumba del Rabino Nachman en Uman, Rosh Hashanah, bailes, alegría y conexión de almas de todo el mundo. Miles de hasidim se reúnen cada año para celebrar juntos.',
        category: 'community',
        author: 'Fotografía: Comunidad Breslov Mundial',
        date: '2025-01-05',
        views: 1120,
        featured: false,
        image: '/attached_assets/ישראל סבא_1757281003112.jpg',
        communityImage: true,
        memberPhotos: [
          '/attached_assets/ליקוטי תפילות 1_1757275910545.jpg',
          '/attached_assets/סיפורי מעשיות 1_1757275910546.jpg',
          '/attached_assets/ליקוטי עצות 1_1757275910545.jpg',
          '/attached_assets/ישראל סבא_1757281003112.jpg'
        ]
      },
      {
        id: 6,
        title: 'Práctica Diaria - Guía Práctica del Servicio Espiritual',
        excerpt: 'Cómo integrar las enseñanzas de Breslov en la vida cotidiana - consejos prácticos para el trabajo espiritual cada día. Comienza con hitbodedut cada día, recita el Tikkun HaKlali, lee el Likutei Moharan, ¡y siempre está en alegría!',
        category: 'practices',
        author: 'Rabino Israel Dov Odesser zt"l',
        date: '2025-01-03',
        views: 750,
        featured: false,
        image: '/attached_assets/חיי מוהרן 1_1757275910544.jpg',
        communityImage: true
      },
      {
        id: 7,
        title: 'Na Nach Nachma Nachman Meuman - La Famosa Nota',
        excerpt: 'La historia de la revelación milagrosa de la nota del Rabino Israel Dov Odesser zt"l. "Na Nach Nachma Nachman Meuman" - el santo mantra que trae alegría y redención a todo el mundo. ¡Mi Fuego arderá hasta la venida del Mesías!',
        category: 'teachings',
        author: 'Rabino Israel Dov Odesser zt"l - Saba',
        date: '2025-01-01',
        views: 2340,
        featured: true,
        image: '/attached_assets/ישראל סבא_1757281003112.jpg',
        communityImage: true
      },
      {
        id: 8,
        title: 'Bailes Breslov - Celebración de Alegría y Fe',
        excerpt: 'Enormes celebraciones en Jerusalén y en todo el mundo! Los hasidim Breslov se reúnen para bailar, regocijarse y difundir la luz del Rabino Nachman. "Es un gran mandamiento estar en alegría" - ¡y en el baile expresamos esa alegría!',
        category: 'community',
        author: 'Documentalistas Breslov',
        date: '2024-12-28',
        views: 1890,
        featured: false,
        image: '/attached_assets/ישראל סבא_1757281003112.jpg',
        communityImage: true,
        memberPhotos: [
          '/attached_assets/ליקוטי מוהרן 1_1757275910545.jpg',
          '/attached_assets/ליקוטי עצות 1_1757275910545.jpg',
          '/attached_assets/ליקוטי תפילות 1_1757275910545.jpg'
        ]
      }
    ]
  },
  ru: {
    title: 'Журнал - Журнал Бреслова',
    subtitle: 'Обновленное и актуальное содержание о жизни Бреслова',
    latestArticles: 'Последние статьи',
    categories: 'Категории',
    featured: 'Рекомендуемое',
    readMore: 'Читать далее',
    published: 'Опубликовано',
    author: 'Автор',
    views: 'Просмотры',
    allArticles: 'Все статьи',
    categoriesList: {
      teachings: 'Учения',
      stories: 'Истории',
      practices: 'Практики',
      community: 'Сообщество',
      events: 'События'
    },
    articles: [
      {
        id: 1,
        title: 'Большая Заповедь: Всегда быть Счастливым - Полное Учение',
        excerpt: 'Узнайте о самом известном учении Раби Нахмана из Бреслова о вечной радости и ее значении в нашей жизни. Раби Нахман учил: "Это большая заповедь всегда быть в радости" - это самое мощное учение против всех трудностей и страданий жизни.',
        category: 'teachings',
        author: 'Раби Израиль Давид Одессер zt"l',
        date: '2025-01-15',
        views: 1250,
        featured: true,
        image: '/attached_assets/ליקוטי מוהרן 1_1757275910545.jpg',
        communityImage: true
      },
      {
        id: 2,
        title: 'Хитбодедут - Святая Беседа с Творцом',
        excerpt: 'Откройте секрет хитбодедута, личной и частной молитвы Раби Нахмана, которую каждый может делать в любом месте и в любое время. Хитбодедут - это самая мощная сила, данная нам - простая и личная беседа с Всевышним, на нашем языке, нашими словами.',
        category: 'practices',
        author: 'Раби Нахман из Бреслова',
        date: '2025-01-12',
        views: 980,
        featured: true,
        image: '/attached_assets/ליקוטי עצות 1_1757275910545.jpg',
        communityImage: true
      },
      {
        id: 3,
        title: 'Нет Отчаяния в Мире - Сообщение Надежды',
        excerpt: 'Самое мощное учение Раби Нахмана о надежде и важности укрепления себя во всем, что возможно. На Нах Нахма Нахман Меуман! Даже когда все кажется трудным, всегда есть надежда. "Знай, что человек должен перейти через очень, очень узкий мост, и правило таково: вообще не бояться!"',
        category: 'teachings',
        author: 'Раби Нахман из Бреслова',
        date: '2025-01-10',
        views: 1560,
        featured: false,
        image: '/attached_assets/ישראל סבא_1757281003112.jpg',
        communityImage: true
      },
      {
        id: 4,
        title: 'Сказки - Скрытая Мудрость',
        excerpt: 'Откройте чудесные сказки Раби Нахмана, которые содержат глубокую мудрость и духовные секреты для каждой души. Каждая сказка - это целый мир - король, принц, лес, путешествие... и в них вся мудрость, необходимая для истинной жизни.',
        category: 'stories',
        author: 'Рассказано Раби Натаном из Бреслова',
        date: '2025-01-08',
        views: 890,
        featured: false,
        image: '/attached_assets/סיפורי מעשיות 1_1757275910546.jpg',
        communityImage: true
      },
      {
        id: 5,
        title: 'Паломничество в Умань - Духовное Путешествие Тысяч',
        excerpt: 'Фотографии и отчеты о событиях сообщества Бреслова по всему миру - паломничество к могиле Раби Нахмана в Умани, Рош Ха-Шана, танцы, радость и связь душ со всего мира. Тысячи хасидов собираются каждый год, чтобы отпраздновать вместе.',
        category: 'community',
        author: 'Фотография: Всемирное сообщество Бр��слова',
        date: '2025-01-05',
        views: 1120,
        featured: false,
        image: '/attached_assets/ישראל סבא_1757281003112.jpg',
        communityImage: true,
        memberPhotos: [
          '/attached_assets/ליקוטי תפילות 1_1757275910545.jpg',
          '/attached_assets/סיפורי מעשיות 1_1757275910546.jpg',
          '/attached_assets/ליקוטי עצות 1_1757275910545.jpg',
          '/attached_assets/ישראל סבא_1757281003112.jpg'
        ]
      },
      {
        id: 6,
        title: 'Ежедневная Практика - Практическое Руководство Духовного Служения',
        excerpt: 'Как интегрировать учения Бреслова в повседневную жизнь - практические советы для духовной работы каждый день. Начните с хитбодедута каждый день, читайте Тиккун ХаКлали, читайте Ликутей Мохаран и всегда будьте в радости!',
        category: 'practices',
        author: 'Раби Израиль Давид Одессер zt"l',
        date: '2025-01-03',
        views: 750,
        featured: false,
        image: '/attached_assets/חיי מוהרן 1_1757275910544.jpg',
        communityImage: true
      },
      {
        id: 7,
        title: 'На Нах Нахма Нахман Меуман - Знаменитая Записка',
        excerpt: 'История чудесного откровения записки Раби Израиля Давида Одессера zt"l. "На Нах Нахма Нахман Меуман" - святая мантра, которая приносит радость и искупление всему миру. Мой Огонь будет гореть до прихода Машиаха!',
        category: 'teachings',
        author: 'Раби Израиль Давид Одессер zt"l - Саба',
        date: '2025-01-01',
        views: 2340,
        featured: true,
        image: '/attached_assets/ישראל סבא_1757281003112.jpg',
        communityImage: true
      },
      {
        id: 8,
        title: 'Танцы Бреслова - Празднование Радости и Веры',
        excerpt: 'Огромные праздники в Иерусалиме и по всему миру! Хасиды Бреслова собираются, чтобы танцевать, радоваться и распространять свет Раби Нахмана. "Это большая заповедь быть в радости" - и в танце мы выражаем эту радость!',
        category: 'community',
        author: 'Документалисты Бреслова',
        date: '2024-12-28',
        views: 1890,
        featured: false,
        image: '/attached_assets/ישראל סבא_1757281003112.jpg',
        communityImage: true,
        memberPhotos: [
          '/attached_assets/ליקוטי מוהרן 1_1757275910545.jpg',
          '/attached_assets/ליקוטי עצות 1_1757275910545.jpg',
          '/attached_assets/ליקוטי תפילות 1_1757275910545.jpg'
        ]
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
            <span className="text-sm font-medium">
              {currentLanguage === 'he' ? 'תוכן מעודכן יומיומי' :
               currentLanguage === 'en' ? 'Updated daily content' :
               currentLanguage === 'fr' ? 'Contenu mis à jour quotidiennement' :
               currentLanguage === 'es' ? 'Contenido actualizado diariamente' :
               'Ежедневно обновляемое содержание'}
            </span>
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
              {currentLanguage === 'he' ? 'הנושאים החמים' :
               currentLanguage === 'en' ? 'Hot Topics' :
               currentLanguage === 'fr' ? 'Sujets Tendances' :
               currentLanguage === 'es' ? 'Temas Populares' :
               'Популярные темы'}
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
                        className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-500"
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
                    <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3 text-sm leading-relaxed font-medium">{article.excerpt}</p>

                    {/* Member Photos - Community Articles */}
                    {article.memberPhotos && article.memberPhotos.length > 0 && (
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Users className="w-4 h-4 text-[#f97316]" />
                          <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                            {currentLanguage === 'he' ? 'חברי הקהילה' :
                             currentLanguage === 'en' ? 'Community Members' :
                             currentLanguage === 'fr' ? 'Membres de la communauté' :
                             currentLanguage === 'es' ? 'Miembros de la comunidad' :
                             'Члены сообщества'}
                          </span>
                        </div>
                        <div className="flex gap-2 overflow-x-auto pb-2">
                          {article.memberPhotos.slice(0, 4).map((photo, idx) => (
                            <img
                              key={idx}
                              src={photo}
                              alt={`Member ${idx + 1}`}
                              className="w-14 h-14 rounded-full object-cover border-2 border-[#f97316] shadow-md hover:scale-110 hover:shadow-xl transition-all cursor-pointer"
                            />
                          ))}
                          {article.memberPhotos.length > 4 && (
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#1e40af] to-[#1e3a8a] border-2 border-[#f97316] flex items-center justify-center text-white text-sm font-bold shadow-md">
                              +{article.memberPhotos.length - 4}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

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
                  <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm line-clamp-3 leading-relaxed font-medium">{article.excerpt}</p>

                  {/* Member Photos - Community Articles */}
                  {article.memberPhotos && article.memberPhotos.length > 0 && (
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="w-4 h-4 text-[#f97316]" />
                        <span className="text-xs font-semibold text-gray-700">
                          {currentLanguage === 'he' ? 'חברי הקהילה' :
                           currentLanguage === 'en' ? 'Community Members' :
                           currentLanguage === 'fr' ? 'Membres de la communauté' :
                           currentLanguage === 'es' ? 'Miembros de la comunidad' :
                           'Члены сообщества'}
                        </span>
                      </div>
                      <div className="flex gap-2 overflow-x-auto pb-2">
                        {article.memberPhotos.slice(0, 4).map((photo, idx) => (
                          <img
                            key={idx}
                            src={photo}
                            alt={`Member ${idx + 1}`}
                            className="w-12 h-12 rounded-full object-cover border-2 border-[#f97316] shadow-sm hover:scale-110 transition-transform cursor-pointer"
                          />
                        ))}
                        {article.memberPhotos.length > 4 && (
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1e40af] to-[#1e3a8a] border-2 border-[#f97316] flex items-center justify-center text-white text-xs font-bold shadow-sm">
                            +{article.memberPhotos.length - 4}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

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
