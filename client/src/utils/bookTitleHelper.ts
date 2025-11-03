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