import type { Product } from '../../../shared/schema';

/**
 * Détermine le titre à afficher selon la langue du livre
 * Un livre doit être affiché dans sa langue respective, pas selon l'interface
 */
export function getBookDisplayTitle(product: Product): string {
  const bookLanguage = product.language;
  
  // Si le livre est en anglais, utiliser le titre anglais
  if (bookLanguage === 'אנגלית' || bookLanguage === 'English') {
    return product.nameEnglish || product.name;
  }
  
  // Si le livre est en français, utiliser le titre français
  if (bookLanguage === 'צרפתית' || bookLanguage === 'Français' || bookLanguage === 'עברית וצרפתית') {
    return product.nameFrench || product.nameEnglish || product.name;
  }
  
  // Si le livre est en espagnol, utiliser le titre espagnol  
  if (bookLanguage === 'ספרדית' || bookLanguage === 'Español') {
    return product.nameSpanish || product.nameEnglish || product.name;
  }
  
  // Si le livre est en russe, utiliser le titre russe
  if (bookLanguage === 'רוסית' || bookLanguage === 'Русский') {
    return product.nameRussian || product.nameEnglish || product.name;
  }
  
  // Pour l'hébreu ou par défaut, utiliser le titre hébreu
  return product.name;
}

/**
 * Détermine le titre à afficher selon les préférences d'interface
 * Utilisé quand on veut respecter la langue de l'interface utilisateur
 */
export function getInterfaceDisplayTitle(product: Product, interfaceLanguage: string): string {
  switch (interfaceLanguage) {
    case 'en':
      return product.nameEnglish || product.name;
    case 'fr':
      return product.nameFrench || product.nameEnglish || product.name;
    case 'es':
      return product.nameSpanish || product.nameEnglish || product.name;
    case 'ru':
      return product.nameRussian || product.nameEnglish || product.name;
    case 'he':
    default:
      return product.name;
  }
}

/**
 * Returns the product description according to the interface language.
 * Falls back to English description, then Hebrew description.
 */
export function getInterfaceDisplayDescription(product: Product, interfaceLanguage: string): string {
  const fallback = product.description || '';
  switch (interfaceLanguage) {
    case 'en':
      return product.descriptionEnglish || fallback;
    case 'fr':
      // No dedicated French description field exists yet; fall back to English then Hebrew
      return product.descriptionEnglish || fallback;
    case 'es':
      return product.descriptionEnglish || fallback;
    case 'ru':
      return product.descriptionEnglish || fallback;
    case 'he':
    default:
      return fallback;
  }
}

/**
 * Category translation map: Hebrew category names to other languages.
 * Used by the store sidebar and product cards to display category names
 * in the user's chosen interface language.
 */
const categoryTranslations: Record<string, Record<string, string>> = {
  'ספרי רבינו': { en: "Rebbe Nachman's Books", fr: 'Livres de Rabbinou', es: 'Libros de Rabeinu', ru: 'Книги Рабейну' },
  'תפילות': { en: 'Prayers', fr: 'Prières', es: 'Oraciones', ru: 'Молитвы' },
  'מכתבים וכתבים': { en: 'Letters & Writings', fr: 'Lettres et Écrits', es: 'Cartas y Escritos', ru: 'Письма и Писания' },
  'סיפורים ומעשיות': { en: 'Stories & Tales', fr: 'Histoires et Contes', es: 'Historias y Cuentos', ru: 'Рассказы и Сказки' },
  'מוסר והדרכה': { en: 'Ethics & Guidance', fr: 'Éthique et Guidance', es: 'Ética y Guía', ru: 'Этика и Руководство' },
  'התבודדות ותפילה': { en: 'Meditation & Prayer', fr: 'Méditation et Prière', es: 'Meditación y Oración', ru: 'Медитация и Молитва' },
  'הלכה ועבודה': { en: 'Halacha & Service', fr: 'Halakha et Service', es: 'Halajá y Servicio', ru: 'Галаха и Служение' },
  'עצות והדרכה': { en: 'Advice & Guidance', fr: 'Conseils et Guidance', es: 'Consejos y Guía', ru: 'Советы и Руководство' },
  'שיחות ודיבורים': { en: 'Conversations & Talks', fr: 'Conversations et Discours', es: 'Conversaciones y Charlas', ru: 'Беседы и Разговоры' },
  'תולדות וחיים': { en: 'History & Life', fr: 'Histoire et Vie', es: 'Historia y Vida', ru: 'История и Жизнь' },
  'שיחות וסיפורים': { en: 'Conversations & Stories', fr: 'Conversations et Histoires', es: 'Conversaciones e Historias', ru: 'Беседы и Рассказы' },
  'תנ"ך ותפילה': { en: 'Bible & Prayer', fr: 'Bible et Prière', es: 'Biblia y Oración', ru: 'Библия и Молитва' },
  'מועדי השנה': { en: 'Holidays', fr: 'Fêtes', es: 'Festividades', ru: 'Праздники' },
  'ליקוטים': { en: 'Compilations', fr: 'Compilations', es: 'Compilaciones', ru: 'Компиляции' },
  'חומשים ותנ"ך': { en: 'Torah & Bible', fr: 'Torah et Bible', es: 'Torá y Biblia', ru: 'Тора и Библия' },
  'תפילות וישועות': { en: 'Prayers & Salvations', fr: 'Prières et Saluts', es: 'Oraciones y Salvaciones', ru: 'Молитвы и Спасения' },
  'ספרי התלמידים': { en: "Students' Books", fr: 'Livres des Élèves', es: 'Libros de los Alumnos', ru: 'Книги Учеников' },
  'חגים ומועדים': { en: 'Holidays & Festivals', fr: 'Fêtes et Célébrations', es: 'Fiestas y Celebraciones', ru: 'Праздники и Фестивали' },
  'מכתבים': { en: 'Letters', fr: 'Lettres', es: 'Cartas', ru: 'Письма' },
  'סגולות וישועות': { en: 'Remedies & Salvations', fr: 'Remèdes et Saluts', es: 'Remedios y Salvaciones', ru: 'Средства и Спасения' },
  'תולדות': { en: 'History', fr: 'Histoire', es: 'Historia', ru: 'История' },
};

/**
 * Translates a Hebrew category name to the given interface language.
 * Falls back to the original Hebrew category if no translation is found.
 */
export function getInterfaceCategoryName(category: string, interfaceLanguage: string): string {
  if (interfaceLanguage === 'he') return category;
  return categoryTranslations[category]?.[interfaceLanguage] || category;
}