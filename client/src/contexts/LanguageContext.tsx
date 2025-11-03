import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (language: string) => void;
  t: (key: string) => string;
}

export const translations = {
  he: {
    // Header
    home: 'דף הבית',
    store: 'חנות',
    about: 'אודות', 
    contact: 'צור קשר',
    magazine: 'המגזין',
    join: 'הצטרפות',
    downloads: 'הורדות',
    fire: '🔥 האש שלי',

    // Downloads page
    freeDownloads: 'הורדות חינמיות',
    downloadDescription: 'הורדו ספרי ברסלב במגוון שפות - כל הספרים זמינים בחינם לקהילה',
    search: 'חיפוש',
    searchBooks: 'חפש ספרים...',
    category: 'קטגוריה',
    rebbeNachman: 'כתבי רבי נחמן',
    rebbeNathan: 'כתבי רבי נתן',
    compilations: 'ליקוטים וקבצים',
    downloadLanguage: 'שפת הורדה',
    allLanguages: 'כל השפות',
    availableLanguages: 'שפות זמינות',
    noResultsFound: 'לא נמצאו תוצאות',
    tryDifferentSearch: 'נסה מונחי חיפוש אחרים',
    importantNote: 'הערה חשובה',
    freeDownloadNote: 'כל הספרים זמינים להורדה חינמית לפי רוח הברסלב - התורה שלמה תהיה חינם',

    // Store page
    storeTitle: 'ספרי ברסלב - קרן רבי ישראל',
    storeSubtitle: 'אוסף מקיף של ספרי רבי נחמן מברסלב ותלמידיו במחירים מיוחדים',
    filterBy: 'סינון לפי..',
    freeSearch: 'חיפוש חופשי',
    searchPlaceholder: 'חיפוש...',
    showResults: 'הצג תוצאות חיפוש',
    categories: 'קטגוריות',
    allCategories: 'כל הקטגוריות',
    editionType: 'סוג מהדורה',
    pocketEditions: 'מהדורות כיס',
    luxuryEditions: 'מהדורות יוקרה',
    completeSets: 'סטים מלאים',
    illustratedEditions: 'מהדורות מאוירות',
    leatherBinding: 'כריכת עור',
    languages: 'שפות',
    hebrew: 'עברית',
    english: 'אנגלית',
    french: 'צרפתית',
    russian: 'רוסית',
    spanish: 'ספרדית',
    priceRange: 'טווח מחירים',
    minimum: 'מינימום',
    maximum: 'מקסימום',
    viewProduct: 'צפה במוצר',
    addToCart: 'הוסף לסל',
    freeShipping: 'מחיר כולל משלוח לכל הארץ',
    moreProducts: 'עוד מוצרים זמינים - לקטלוג המלא',
    contactForMore: 'צור קשר לפרטים נוספים',
    ratedOutOf: 'דורג 5.00 מתוך 5',
    options: 'אפשרויות',

    // Common
    shekel: '₪',
    loading: 'טוען...',
    error: 'שגיאה',
    success: 'הצלחה'
  },
  en: {
    // Header
    home: 'Home',
    store: 'Store',
    about: 'About',
    contact: 'Contact',
    magazine: 'Magazine', 
    join: 'Join',
    downloads: 'Downloads',
    fire: '🔥 My Fire',

    // Store page
    storeTitle: 'Breslov Books - Rabbi Israel Foundation',
    storeSubtitle: 'Comprehensive collection of Rabbi Nachman of Breslov and his students\' books at special prices',
    filterBy: 'Filter by..',
    freeSearch: 'Free search',
    searchPlaceholder: 'Search...',
    showResults: 'Show search results',
    categories: 'Categories',
    allCategories: 'All categories',
    editionType: 'Edition type',
    pocketEditions: 'Pocket editions',
    luxuryEditions: 'Luxury editions',
    completeSets: 'Complete sets',
    illustratedEditions: 'Illustrated editions',
    leatherBinding: 'Leather binding',
    languages: 'Languages',
    hebrew: 'Hebrew',
    english: 'English',
    french: 'French', 
    russian: 'Russian',
    spanish: 'Spanish',
    priceRange: 'Price range',
    minimum: 'Minimum',
    maximum: 'Maximum',
    viewProduct: 'View product',
    addToCart: 'Add to cart',
    freeShipping: 'Price includes shipping nationwide',
    moreProducts: 'More products available - for full catalog',
    contactForMore: 'Contact for more details',
    ratedOutOf: 'Rated 5.00 out of 5',
    options: 'options',

    // Downloads page
    freeDownloads: 'Free Downloads',
    downloadDescription: 'Download Breslov books in multiple languages - all books available free to the community',
    search: 'Search',
    searchBooks: 'Search books...',
    category: 'Category',
    rebbeNachman: 'Rebbe Nachman Writings',
    rebbeNathan: 'Rebbe Nathan Writings',
    compilations: 'Compilations',
    downloadLanguage: 'Download Language',
    allLanguages: 'All Languages',
    availableLanguages: 'Available Languages',
    noResultsFound: 'No Results Found',
    tryDifferentSearch: 'Try different search terms',
    importantNote: 'Important Note',
    freeDownloadNote: 'All books are available for free download in the spirit of Breslov - the entire Torah should be free',

    // Common
    shekel: '₪',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success'
  },
  fr: {
    // Header
    home: 'Accueil',
    store: 'Boutique',
    about: 'À propos',
    contact: 'Contact',
    magazine: 'Magazine',
    join: 'Rejoindre',
    downloads: 'Téléchargements',
    fire: '🔥 Mon Feu',

    // Store page
    storeTitle: 'Livres Breslov - Fondation Rabbi Israel',
    storeSubtitle: 'Collection complète des livres de Rabbi Nachman de Breslov et de ses étudiants à prix spéciaux',
    filterBy: 'Filtrer par..',
    freeSearch: 'Recherche libre',
    searchPlaceholder: 'Rechercher...',
    showResults: 'Afficher les résultats de recherche',
    categories: 'Catégories',
    allCategories: 'Toutes les catégories',
    editionType: 'Type d\'édition',
    pocketEditions: 'Éditions de poche',
    luxuryEditions: 'Éditions de luxe',
    completeSets: 'Collections complètes',
    illustratedEditions: 'Éditions illustrées',
    leatherBinding: 'Reliure en cuir',
    languages: 'Langues',
    hebrew: 'Hébreu',
    english: 'Anglais',
    french: 'Français',
    russian: 'Russe',
    spanish: 'Espagnol',
    priceRange: 'Gamme de prix',
    minimum: 'Minimum',
    maximum: 'Maximum',
    viewProduct: 'Voir le produit',
    addToCart: 'Ajouter au panier',
    freeShipping: 'Prix inclut livraison nationale',
    moreProducts: 'Plus de produits disponibles - pour le catalogue complet',
    contactForMore: 'Contactez pour plus de détails',
    ratedOutOf: 'Noté 5.00 sur 5',
    options: 'options',

    // Downloads page
    freeDownloads: 'Téléchargements Gratuits',
    downloadDescription: 'Téléchargez des livres Breslov en plusieurs langues - tous les livres sont disponibles gratuitement pour la communauté',
    search: 'Recherche',
    searchBooks: 'Rechercher des livres...',
    category: 'Catégorie',
    rebbeNachman: 'Écrits de Rebbe Nachman',
    rebbeNathan: 'Écrits de Rebbe Nathan',
    compilations: 'Compilations',
    downloadLanguage: 'Langue de Téléchargement',
    allLanguages: 'Toutes les Langues',
    availableLanguages: 'Langues Disponibles',
    noResultsFound: 'Aucun Résultat Trouvé',
    tryDifferentSearch: 'Essayez des termes de recherche différents',
    importantNote: 'Note Importante',
    freeDownloadNote: 'Tous les livres sont disponibles en téléchargement gratuit dans l\'esprit de Breslov - toute la Torah devrait être gratuite',

    // Common
    shekel: '₪',
    loading: 'Chargement...',
    error: 'Erreur',
    success: 'Succès'
  },
  es: {
    // Header
    home: 'Inicio',
    store: 'Tienda',
    about: 'Acerca de',
    contact: 'Contacto',
    magazine: 'Revista',
    join: 'Unirse',
    downloads: 'Descargas',
    fire: '🔥 Mi Fuego',

    // Store page
    storeTitle: 'Libros Breslov - Fundación Rabino Israel',
    storeSubtitle: 'Colección completa de libros del Rabino Nachman de Breslov y sus estudiantes a precios especiales',
    filterBy: 'Filtrar por..',
    freeSearch: 'Búsqueda libre',
    searchPlaceholder: 'Buscar...',
    showResults: 'Mostrar resultados de búsqueda',
    categories: 'Categorías',
    allCategories: 'Todas las categorías',
    editionType: 'Tipo de edición',
    pocketEditions: 'Ediciones de bolsillo',
    luxuryEditions: 'Ediciones de lujo',
    completeSets: 'Sets completos',
    illustratedEditions: 'Ediciones ilustradas',
    leatherBinding: 'Encuadernación en cuero',
    languages: 'Idiomas',
    hebrew: 'Hebreo',
    english: 'Inglés',
    french: 'Francés',
    russian: 'Ruso',
    spanish: 'Español',
    priceRange: 'Rango de precios',
    minimum: 'Mínimo',
    maximum: 'Máximo',
    viewProduct: 'Ver producto',
    addToCart: 'Añadir al carrito',
    freeShipping: 'Precio incluye envío nacional',
    moreProducts: 'Más productos disponibles - para catálogo completo',
    contactForMore: 'Contactar para más detalles',
    ratedOutOf: 'Calificado 5.00 de 5',
    options: 'opciones',

    // Common
    shekel: '₪',
    loading: 'Cargando...',
    error: 'Error',
    success: 'Éxito'
  },
  ru: {
    // Header
    home: 'Главная',
    store: 'Магазин',
    about: 'О нас',
    contact: 'Контакт',
    magazine: 'Журнал',
    join: 'Присоединиться',
    downloads: 'Загрузки',
    fire: '🔥 Мой Огонь',

    // Store page
    storeTitle: 'Книги Бреслов - Фонд Рабби Израиль',
    storeSubtitle: 'Полная коллекция книг Рабби Нахмана из Бреслов и его учеников по специальным ценам',
    filterBy: 'Фильтровать по..',
    freeSearch: 'Свободный поиск',
    searchPlaceholder: 'Поиск...',
    showResults: 'Показать результаты поиска',
    categories: 'Категории',
    allCategories: 'Все категории',
    editionType: 'Тип издания',
    pocketEditions: 'Карманные издания',
    luxuryEditions: 'Люксовые издания',
    completeSets: 'Полные наборы',
    illustratedEditions: 'Иллюстрированные издания',
    leatherBinding: 'Кожаный переплет',
    languages: 'Языки',
    hebrew: 'Иврит',
    english: 'Английский',
    french: 'Французский',
    russian: 'Русский',
    spanish: 'Испанский',
    priceRange: 'Диапазон цен',
    minimum: 'Минимум',
    maximum: 'Максимум',
    viewProduct: 'Посмотреть товар',
    addToCart: 'Добавить в корзину',
    freeShipping: 'Цена включает доставку по стране',
    moreProducts: 'Больше товаров доступно - для полного каталога',
    contactForMore: 'Свяжитесь для получения подробностей',
    ratedOutOf: 'Рейтинг 5.00 из 5',
    options: 'вариантов',

    // Common
    shekel: '₪',
    loading: 'Загрузка...',
    error: 'Ошибка',
    success: 'Успех'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState('he');

  useEffect(() => {
    const saved = localStorage.getItem('site-language');
    if (saved && translations[saved as keyof typeof translations]) {
      setCurrentLanguage(saved);
    }
  }, []);

  const setLanguage = (language: string) => {
    setCurrentLanguage(language);
    localStorage.setItem('site-language', language);
  };

  const t = (key: string): string => {
    const currentTranslations = translations[currentLanguage as keyof typeof translations] || translations.he;
    return currentTranslations[key as keyof typeof currentTranslations] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}