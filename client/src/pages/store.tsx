import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { realBreslovProducts } from '../data/products';
import { Header } from '../components/Header';
import { ProductVariantModal } from '../components/ProductVariantModal';
import { useLanguage } from '../contexts/LanguageContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { useCart } from '../contexts/CartContext';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, X, Filter, ChevronDown, ChevronUp, Heart, ShoppingCart, Plus } from 'lucide-react';
import { convertImagePath } from '../utils/imagePathHelper';
import { getInterfaceDisplayTitle, getInterfaceCategoryName } from '../utils/bookTitleHelper';
import type { Product } from '../../../shared/schema';

// Task 55: Blur placeholder component for lazy-loaded images
function LazyImage({ src, alt, className, dataTestId, onError }: {
  src: string;
  alt: string;
  className?: string;
  dataTestId?: string;
  onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
}) {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      <div
        className={`absolute inset-0 bg-gray-200 transition-opacity duration-500 ${loaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        style={{ filter: 'blur(20px)', transform: 'scale(1.1)' }}
        aria-hidden="true"
      />
      <img
        loading="lazy"
        decoding="async"
        width="300"
        height="300"
        src={src}
        alt={alt}
        className={`${className || ''} transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        data-testid={dataTestId}
        onLoad={() => setLoaded(true)}
        onError={(e) => {
          setLoaded(true);
          onError?.(e);
        }}
      />
    </>
  );
}

// Highlight matching search text in a string
function highlightSearchMatch(text: string, query: string): React.ReactNode {
  if (!query || !query.trim()) return text;
  const trimmed = query.trim();
  const escapedQuery = trimmed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escapedQuery})`, 'gi');
  const parts = text.split(regex);
  if (parts.length <= 1) return text;
  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} style={{ background: '#fef08a', padding: '0 1px', borderRadius: '2px' }}>{part}</mark>
    ) : (
      part
    )
  );
}

// Task 19: Fuzzy matching for Hebrew typo tolerance (Levenshtein distance)
function fuzzyMatch(text: string, query: string, maxDistance = 2): boolean {
  if (text.includes(query)) return true;
  if (query.length <= 2) return false;

  // Check each word in text against query
  const words = text.split(/\s+/);
  for (const word of words) {
    if (word.length < 2) continue;
    const len = Math.min(word.length, query.length);
    let dist = 0;

    // Calculate character distance
    for (let i = 0; i < len; i++) {
      if (word[i] !== query[i]) dist++;
      if (dist > maxDistance) break;
    }

    // Add length difference to distance
    dist += Math.abs(word.length - query.length);

    // If within threshold, it's a match
    if (dist <= maxDistance) return true;
  }

  return false;
}

// Build descriptive alt text for product images
function buildProductAlt(product: { name: string; nameEnglish?: string | null; language?: string | null; author?: string | null; category?: string }, currentLanguage: string, suffix?: string): string {
  const title = getInterfaceDisplayTitle(product, currentLanguage);
  const author = product.author || (currentLanguage === 'he' ? '\u05E8\u05D1\u05D9 \u05E0\u05D7\u05DE\u05DF \u05DE\u05D1\u05E8\u05E1\u05DC\u05D1' : 'Rabbi Nachman of Breslov');
  const lang = product.language || '';
  const parts = [title, author, lang].filter(Boolean);
  const base = parts.join(' - ');
  return suffix ? `${base} ${suffix}` : base;
}

interface Filters {
  categories: string[];
  formats: string[];
  sizes: string[];
  priceRange: [number, number];
  searchQuery: string;
  languages: string[];
}

// Task 27: Translate product language names into interface language
const languageDisplayNames: Record<string, Record<string, string>> = {
  'עברית': { he: 'עברית', en: 'Hebrew', fr: 'Hébreu', es: 'Hebreo', ru: 'Иврит' },
  'אנגלית': { he: 'אנגלית', en: 'English', fr: 'Anglais', es: 'Inglés', ru: 'Английский' },
  'צרפתית': { he: 'צרפתית', en: 'French', fr: 'Français', es: 'Francés', ru: 'Французский' },
  'ספרדית': { he: 'ספרדית', en: 'Spanish', fr: 'Espagnol', es: 'Español', ru: 'Испанский' },
  'רוסית': { he: 'רוסית', en: 'Russian', fr: 'Russe', es: 'Ruso', ru: 'Русский' },
  'Hebrew': { he: 'עברית', en: 'Hebrew', fr: 'Hébreu', es: 'Hebreo', ru: 'Иврит' },
  'English': { he: 'אנגלית', en: 'English', fr: 'Anglais', es: 'Inglés', ru: 'Английский' },
  'French': { he: 'צרפתית', en: 'French', fr: 'Français', es: 'Francés', ru: 'Французский' },
  'Spanish': { he: 'ספרדית', en: 'Spanish', fr: 'Espagnol', es: 'Español', ru: 'Испанский' },
  'Russian': { he: 'רוסית', en: 'Russian', fr: 'Russe', es: 'Ruso', ru: 'Русский' },
};
function getLanguageDisplayName(language: string, interfaceLang: string): string {
  return languageDisplayNames[language]?.[interfaceLang] || language;
}

const quickAddLabels: Record<string, string> = {
  he: '\u05D4\u05D5\u05E1\u05E3 \u05DE\u05D4\u05D9\u05E8',
  en: 'Quick Add',
  fr: 'Ajout rapide',
  es: 'A\u00F1adir r\u00E1pido',
  ru: '\u0411\u044B\u0441\u0442\u0440\u043E \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C',
};

// Task 68: Module-level constant - realBreslovProducts is static, no need to recompute
const allProducts = Object.values(realBreslovProducts);

export default function Store() {
  const { currentLanguage, setLanguage } = useLanguage();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addItem, setIsCartOpen } = useCart();
  const quickAddTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [variantModalProduct, setVariantModalProduct] = useState<Product | null>(null);

  const handleQuickAdd = useCallback((product: Product) => {
    const defaultVariant = product.variants?.[0];
    if (!defaultVariant) return;
    addItem({ productId: product.id, variantId: defaultVariant.id, name: product.name, nameEnglish: product.nameEnglish || product.name, image: product.images?.[0] || '', price: defaultVariant.price, quantity: 1, variant: { format: defaultVariant.format || '', binding: defaultVariant.binding || '', size: defaultVariant.size || '' } });
    setIsCartOpen(true);
    if (quickAddTimerRef.current) clearTimeout(quickAddTimerRef.current);
    quickAddTimerRef.current = setTimeout(() => { setIsCartOpen(false); }, 2000);
  }, [addItem, setIsCartOpen]);

  useEffect(() => { return () => { if (quickAddTimerRef.current) clearTimeout(quickAddTimerRef.current); }; }, []);

  const [filters, setFilters] = useState<Filters>({ categories: [], formats: [], sizes: [], priceRange: [0, 1000], searchQuery: '', languages: [] });
  const [sortBy, setSortBy] = useState<string>('default');
  const PRODUCTS_PER_PAGE = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarVisible, setSidebarVisible] = useState(() => { if (typeof window !== 'undefined') return window.innerWidth >= 768; return true; });
  const [expandedSections, setExpandedSections] = useState({ categories: true, languages: true, sizes: true, formats: true, price: true });
  // Task 26: Track selected language for each product card
  const [productLanguages, setProductLanguages] = useState<Record<string, string>>({});

  const filterOptions = useMemo(() => {
    const categories = new Set<string>(); const formats = new Set<string>(); const sizes = new Set<string>(); const languages = new Set<string>();
    let minPrice = Infinity; let maxPrice = 0;
    allProducts.forEach(product => {
      categories.add(product.category); if (product.language) languages.add(product.language);
      product.variants?.forEach(variant => { if (variant.format) formats.add(variant.format); if (variant.size) sizes.add(variant.size); if (variant.price) { minPrice = Math.min(minPrice, variant.price); maxPrice = Math.max(maxPrice, variant.price); } });
    });
    return { categories: Array.from(categories).sort(), formats: Array.from(formats).sort(), sizes: Array.from(sizes).sort(), languages: Array.from(languages).sort(), priceRange: [Math.floor(minPrice), Math.ceil(maxPrice)] as [number, number] };
  }, [allProducts]);

  useEffect(() => { if (filterOptions.priceRange[0] !== Infinity) { setFilters(prev => ({ ...prev, priceRange: filterOptions.priceRange })); } }, [filterOptions.priceRange]);

  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        const translatedName = getInterfaceDisplayTitle(product, currentLanguage).toLowerCase();
        const nameMatch = product.name.toLowerCase().includes(q) || translatedName.includes(q) || (product.nameEnglish || '').toLowerCase().includes(q) || (product.nameFrench || '').toLowerCase().includes(q) || ((product as any).nameSpanish || '').toLowerCase().includes(q) || ((product as any).nameRussian || '').toLowerCase().includes(q);
        const descMatch = (product.description || '').toLowerCase().includes(q) || (product.descriptionEnglish || '').toLowerCase().includes(q);
        const catMatch = product.category.toLowerCase().includes(q);
        // Task 19: Fuzzy fallback for typo tolerance
        const fuzzyFallback = q.length >= 3 && !nameMatch && !descMatch && !catMatch &&
          (fuzzyMatch(product.name.toLowerCase(), q) || fuzzyMatch(translatedName, q) || fuzzyMatch((product.nameEnglish || '').toLowerCase(), q));
        if (!nameMatch && !descMatch && !catMatch && !fuzzyFallback) return false;
      }
      if (filters.categories.length > 0 && !filters.categories.includes(product.category)) return false;
      if (filters.languages.length > 0 && !filters.languages.includes(product.language || '')) return false;
      const needsVariantCheck = filters.formats.length > 0 || filters.sizes.length > 0 || (filters.priceRange[0] !== filterOptions.priceRange[0] || filters.priceRange[1] !== filterOptions.priceRange[1]);
      if (needsVariantCheck) {
        const hasMatchingVariant = product.variants?.some(variant => {
          const formatMatch = filters.formats.length === 0 || filters.formats.includes(variant.format || '');
          const sizeMatch = filters.sizes.length === 0 || filters.sizes.includes(variant.size || '');
          const priceRangeActive = filters.priceRange[0] !== filterOptions.priceRange[0] || filters.priceRange[1] !== filterOptions.priceRange[1];
          const priceMatch = !priceRangeActive || (variant.price !== undefined && variant.price >= filters.priceRange[0] && variant.price <= filters.priceRange[1]);
          return formatMatch && sizeMatch && priceMatch;
        });
        if (!hasMatchingVariant) return false;
      }
      return true;
    });
  }, [allProducts, filters, currentLanguage]);

  const sortedProducts = useMemo(() => {
    const products = [...filteredProducts];
    switch (sortBy) {
      case 'price-asc': return products.sort((a, b) => { const aMin = a.variants?.length ? Math.min(...a.variants.map(v => v.price)) : 0; const bMin = b.variants?.length ? Math.min(...b.variants.map(v => v.price)) : 0; return aMin - bMin; });
      case 'price-desc': return products.sort((a, b) => { const aMax = a.variants?.length ? Math.max(...a.variants.map(v => v.price)) : 0; const bMax = b.variants?.length ? Math.max(...b.variants.map(v => v.price)) : 0; return bMax - aMax; });
      case 'name-az': return products.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-za': return products.sort((a, b) => b.name.localeCompare(a.name));
      default: return products;
    }
  }, [filteredProducts, sortBy]);

  useEffect(() => { setCurrentPage(1); }, [filters, sortBy]);
  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = useMemo(() => { const start = (currentPage - 1) * PRODUCTS_PER_PAGE; return sortedProducts.slice(start, start + PRODUCTS_PER_PAGE); }, [sortedProducts, currentPage]);
  const toggleFilter = <T,>(key: keyof Filters, value: T) => { setFilters(prev => { const current = prev[key] as T[]; const newValue = current.includes(value) ? current.filter(item => item !== value) : [...current, value]; return { ...prev, [key]: newValue }; }); };
  const clearAllFilters = () => { setFilters({ categories: [], formats: [], sizes: [], priceRange: filterOptions.priceRange, searchQuery: '', languages: [] }); };
  const toggleSection = (section: keyof typeof expandedSections) => { setExpandedSections(prev => ({ ...prev, [section]: !prev[section] })); };

  // Task 99: Build sr-only product description for screen readers
  const buildSrDescription = (product: typeof allProducts[0]) => {
    const title = getInterfaceDisplayTitle(product, currentLanguage);
    const category = getInterfaceCategoryName(product.category, currentLanguage);
    const price = product.variants && product.variants.length > 0 ? `${Math.min(...product.variants.map(v => v.price))} \u20AA` : '';
    return `${title}, ${price}, ${category}.`;
  };

  return (
    <div style={{direction: currentLanguage === 'he' ? 'rtl' : 'ltr'}}>
      <section style={{background: '#333', color: 'white', padding: '8px 0'}}><div style={{maxWidth: '1400px', margin: '0 auto', padding: '0 2rem'}}><span>{'\u05DE\u05E9\u05DC\u05D5\u05D7\u05D9\u05DD \u05D7\u05D9\u05E0\u05DD \u05D4\u05D7\u05DC \u05DE- 399 \u05E9"\u05D7'}</span></div></section>
      <Header currentLanguage={currentLanguage} onLanguageChange={setLanguage} />

      <div className="flex min-h-screen bg-gray-50 pb-16 md:pb-0">
        {/* Overlay for mobile sidebar */}
        <AnimatePresence>
          {sidebarVisible && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden" 
              onClick={() => setSidebarVisible(false)} 
            />
          )}
        </AnimatePresence>

        <aside className={`
          ${sidebarVisible ? 'w-80' : 'w-0'} 
          transition-all duration-300 ease-in-out overflow-hidden 
          max-md:fixed max-md:inset-y-0 max-md:z-50 max-md:shadow-2xl
          ${sidebarVisible ? 'max-md:w-[280px]' : 'max-md:w-0'} 
          ${currentLanguage === 'he' ? 'max-md:right-0' : 'max-md:left-0'}
          bg-white
        `}>
          <div className="h-full flex flex-col border-r border-gray-200">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white sticky top-0 z-10">
              <h2 className="text-lg font-bold text-gray-900">{currentLanguage === 'he' ? '\u05DE\u05E1\u05E0\u05E0\u05D9 \u05D7\u05D9\u05E4\u05D5\u05E9' : 'Filters'}</h2>
              <button 
                onClick={() => setSidebarVisible(false)}
                className="md:hidden p-2 rounded-full hover:bg-gray-100"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <div className="p-4 space-y-4 max-h-screen overflow-y-auto">
              {/* Price Filter */}
              <div className="bg-white border border-gray-200 rounded p-4">
                <button className="flex items-center justify-between w-full text-left cursor-pointer mb-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded" onClick={() => toggleSection('price')} data-testid="label-price-range" aria-expanded={expandedSections.price} type="button"><span className="text-sm font-medium text-gray-700">{currentLanguage === 'he' ? '\u05D8\u05D5\u05D5\u05D7 \u05DE\u05D7\u05D9\u05E8\u05D9\u05DD' : currentLanguage === 'en' ? 'Price Range' : currentLanguage === 'fr' ? 'Gamme de Prix' : currentLanguage === 'es' ? 'Rango de Precio' : currentLanguage === 'ru' ? '\u0414\u0438\u0430\u043F\u0430\u0437\u043E\u043D \u0426\u0435\u043D' : '\u05D8\u05D5\u05D5\u05D7 \u05DE\u05D7\u05D9\u05E8\u05D9\u05DD'}</span>{expandedSections.price ? <ChevronUp className="h-4 w-4 text-gray-500" /> : <ChevronDown className="h-4 w-4 text-gray-500" />}</button>
                {expandedSections.price && (<div className="space-y-3"><Slider min={filterOptions.priceRange[0]} max={filterOptions.priceRange[1]} value={filters.priceRange} onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value as [number, number] }))} className="w-full" data-testid="slider-price-range" /><div className="flex justify-between text-xs text-gray-600"><span data-testid="text-price-min">{filters.priceRange[0]} {'\u20AA'}</span><span data-testid="text-price-max">{filters.priceRange[1]} {'\u20AA'}</span></div></div>)}
              </div>
              {/* Languages Filter */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded p-4">
                <button className="flex items-center justify-between w-full text-left cursor-pointer mb-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded" onClick={() => toggleSection('languages')} data-testid="label-languages" aria-expanded={expandedSections.languages} type="button"><span className="text-sm font-semibold text-blue-800">{currentLanguage === 'he' ? '\u05E9\u05E4\u05D5\u05EA' : currentLanguage === 'en' ? 'Languages' : currentLanguage === 'fr' ? 'Langues' : currentLanguage === 'es' ? 'Idiomas' : currentLanguage === 'ru' ? '\u042F\u0437\u044B\u043A\u0438' : '\u05E9\u05E4\u05D5\u05EA'}</span>{expandedSections.languages ? <ChevronUp className="h-4 w-4 text-blue-600" /> : <ChevronDown className="h-4 w-4 text-blue-600" />}</button>
                {expandedSections.languages && (<div className="space-y-2" role="group" aria-label="Language filters">{filterOptions.languages.map((language) => (<div key={language} className="flex items-center space-x-2 rtl:space-x-reverse"><Checkbox id={`language-${language}`} checked={filters.languages.includes(language)} onCheckedChange={() => toggleFilter('languages', language)} className="border-blue-400 text-blue-600 focus-visible:ring-2 focus-visible:ring-orange-500" data-testid={`checkbox-language-${language}`} /><label htmlFor={`language-${language}`} className="text-sm cursor-pointer text-blue-700 font-medium" data-testid={`text-language-${language}`}>{getLanguageDisplayName(language, currentLanguage)}</label></div>))}</div>)}
              </div>
              {/* Categories Filter */}
              <div className="bg-white border border-gray-200 rounded p-4">
                <button className="flex items-center justify-between w-full text-left cursor-pointer mb-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded" onClick={() => toggleSection('categories')} data-testid="label-categories" aria-expanded={expandedSections.categories} type="button"><span className="text-sm font-medium text-gray-700">{currentLanguage === 'he' ? '\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D5\u05EA' : currentLanguage === 'en' ? 'Categories' : currentLanguage === 'fr' ? 'Cat\u00E9gories' : currentLanguage === 'es' ? 'Categor\u00EDas' : currentLanguage === 'ru' ? '\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438' : '\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D5\u05EA'}</span>{expandedSections.categories ? <ChevronUp className="h-4 w-4 text-gray-500" /> : <ChevronDown className="h-4 w-4 text-gray-500" />}</button>
                {expandedSections.categories && (<div className="space-y-2 max-h-48 overflow-y-auto" role="group" aria-label="Category filters">{filterOptions.categories.map((category) => (<div key={category} className="flex items-center space-x-2 rtl:space-x-reverse"><Checkbox id={`category-${category}`} checked={filters.categories.includes(category)} onCheckedChange={() => toggleFilter('categories', category)} className="focus-visible:ring-2 focus-visible:ring-orange-500" data-testid={`checkbox-category-${category}`} /><label htmlFor={`category-${category}`} className="text-xs cursor-pointer text-gray-700" data-testid={`text-category-${category}`}>{getInterfaceCategoryName(category, currentLanguage)}</label></div>))}</div>)}
              </div>
              {/* Sizes Filter */}
              <div className="bg-white border border-gray-200 rounded p-4">
                <button className="flex items-center justify-between w-full text-left cursor-pointer mb-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded" onClick={() => toggleSection('sizes')} data-testid="label-sizes" aria-expanded={expandedSections.sizes} type="button"><span className="text-sm font-medium text-gray-700">{currentLanguage === 'he' ? '\u05D2\u05D3\u05DC\u05D9\u05DD' : currentLanguage === 'en' ? 'Sizes' : currentLanguage === 'fr' ? 'Tailles' : currentLanguage === 'es' ? 'Tama\u00F1os' : currentLanguage === 'ru' ? '\u0420\u0430\u0437\u043C\u0435\u0440\u044B' : '\u05D2\u05D3\u05DC\u05D9\u05DD'}</span>{expandedSections.sizes ? <ChevronUp className="h-4 w-4 text-gray-500" /> : <ChevronDown className="h-4 w-4 text-gray-500" />}</button>
                {expandedSections.sizes && (<div className="space-y-2" role="group" aria-label="Size filters">{filterOptions.sizes.map((size) => (<div key={size} className="flex items-center space-x-2 rtl:space-x-reverse"><Checkbox id={`size-${size}`} checked={filters.sizes.includes(size)} onCheckedChange={() => toggleFilter('sizes', size)} className="focus-visible:ring-2 focus-visible:ring-orange-500" data-testid={`checkbox-size-${size}`} /><label htmlFor={`size-${size}`} className="text-xs cursor-pointer text-gray-700" data-testid={`text-size-${size}`}>{size}</label></div>))}</div>)}
              </div>
              {/* Formats Filter */}
              <div className="bg-white border border-gray-200 rounded p-4">
                <button className="flex items-center justify-between w-full text-left cursor-pointer mb-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded" onClick={() => toggleSection('formats')} data-testid="label-formats" aria-expanded={expandedSections.formats} type="button"><span className="text-sm font-medium text-gray-700">{currentLanguage === 'he' ? '\u05DB\u05E8\u05D9\u05DB\u05D5\u05EA' : currentLanguage === 'en' ? 'Bindings' : currentLanguage === 'fr' ? 'Reliures' : currentLanguage === 'es' ? 'Encuadernaciones' : currentLanguage === 'ru' ? '\u041F\u0435\u0440\u0435\u043F\u043B\u0435\u0442\u044B' : '\u05DB\u05E8\u05D9\u05DB\u05D5\u05EA'}</span>{expandedSections.formats ? <ChevronUp className="h-4 w-4 text-gray-500" /> : <ChevronDown className="h-4 w-4 text-gray-500" />}</button>
                {expandedSections.formats && (<div className="space-y-2 max-h-48 overflow-y-auto" role="group" aria-label="Format filters">{filterOptions.formats.slice(0, 12).map((format) => (<div key={format} className="flex items-center space-x-2 rtl:space-x-reverse"><Checkbox id={`format-${format}`} checked={filters.formats.includes(format)} onCheckedChange={() => toggleFilter('formats', format)} className="focus-visible:ring-2 focus-visible:ring-orange-500" data-testid={`checkbox-format-${format}`} /><label htmlFor={`format-${format}`} className="text-xs cursor-pointer text-gray-700" data-testid={`text-format-${format}`}>{format}</label></div>))}{filterOptions.formats.length > 12 && (<div className="text-xs text-gray-500 pt-1" data-testid="text-more-formats">{'\u05D5\u05E2\u05D5\u05D3'} {filterOptions.formats.length - 12} {'\u05D0\u05E4\u05E9\u05E8\u05D5\u05D9\u05D5\u05EA...'}</div>)}</div>)}
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <Button onClick={() => setSidebarVisible(!sidebarVisible)} className="bg-blue-600 hover:bg-blue-700 text-white focus-visible:ring-2 focus-visible:ring-orange-500" data-testid="button-toggle-sidebar" aria-label={sidebarVisible ? 'Hide filters' : 'Show filters'}><Filter className="h-5 w-5" /></Button>
                <h1 className="text-3xl font-bold text-gray-900" data-testid="text-page-title">{currentLanguage === 'he' ? '\u05E1\u05E4\u05E8\u05D9 \u05D1\u05E8\u05E1\u05DC\u05D1' : currentLanguage === 'en' ? 'Breslov Books' : currentLanguage === 'fr' ? 'Livres Breslov' : currentLanguage === 'es' ? 'Libros Breslov' : currentLanguage === 'ru' ? '\u041A\u043D\u0438\u0433\u0438 \u0411\u0440\u0435\u0441\u043B\u043E\u0432' : '\u05E1\u05E4\u05E8\u05D9 \u05D1\u05E8\u05E1\u05DC\u05D1'}</h1>
              </div>
              <div className="bg-white px-4 py-2 rounded border border-gray-200" data-testid="text-results-count" aria-live="polite"><span className="text-sm text-gray-600">{currentLanguage === 'he' ? <>{'\u05E0\u05DE\u05E6\u05D0\u05D5'} <span className="font-semibold text-blue-600">{filteredProducts.length}</span> {'\u05DE\u05EA\u05D5\u05DA'} <span className="font-semibold">{allProducts.length}</span> {'\u05E1\u05E4\u05E8\u05D9\u05DD'}</> : currentLanguage === 'en' ? <>Found <span className="font-semibold text-blue-600">{filteredProducts.length}</span> out of <span className="font-semibold">{allProducts.length}</span> books</> : currentLanguage === 'fr' ? <>Trouv&eacute; <span className="font-semibold text-blue-600">{filteredProducts.length}</span> sur <span className="font-semibold">{allProducts.length}</span> livres</> : currentLanguage === 'es' ? <>Encontrado <span className="font-semibold text-blue-600">{filteredProducts.length}</span> de <span className="font-semibold">{allProducts.length}</span> libros</> : currentLanguage === 'ru' ? <>{'\u041D\u0430\u0439\u0434\u0435\u043D\u043E'} <span className="font-semibold text-blue-600">{filteredProducts.length}</span> {'\u0438\u0437'} <span className="font-semibold">{allProducts.length}</span> {'\u043A\u043D\u0438\u0433'}</> : <>{'\u05E0\u05DE\u05E6\u05D0\u05D5'} <span className="font-semibold text-blue-600">{filteredProducts.length}</span> {'\u05DE\u05EA\u05D5\u05DA'} <span className="font-semibold">{allProducts.length}</span> {'\u05E1\u05E4\u05E8\u05D9\u05DD'}</>}</span></div>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-white border border-gray-200 rounded px-3 py-2 text-sm text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500" data-testid="select-sort" aria-label={currentLanguage === 'he' ? '\u05DE\u05D9\u05D5\u05DF' : 'Sort products'}><option value="default">{currentLanguage === 'he' ? '\u05DE\u05D9\u05D5\u05DF: \u05D1\u05E8\u05D9\u05E8\u05EA \u05DE\u05D7\u05D3\u05DC' : currentLanguage === 'fr' ? 'Tri: par d\u00E9faut' : 'Sort: Default'}</option><option value="price-asc">{currentLanguage === 'he' ? '\u05DE\u05D7\u05D9\u05E8: \u05E0\u05DE\u05D5\u05DA \u05DC\u05D2\u05D1\u05D5\u05D4' : currentLanguage === 'fr' ? 'Prix: croissant' : 'Price: Low to High'}</option><option value="price-desc">{currentLanguage === 'he' ? '\u05DE\u05D7\u05D9\u05E8: \u05D2\u05D1\u05D5\u05D4 \u05DC\u05E0\u05DE\u05D5\u05DA' : currentLanguage === 'fr' ? 'Prix: d\u00E9croissant' : 'Price: High to Low'}</option><option value="name-az">{currentLanguage === 'he' ? '\u05E9\u05DD: \u05D0-\u05EA' : currentLanguage === 'fr' ? 'Nom: A-Z' : 'Name: A-Z'}</option><option value="name-za">{currentLanguage === 'he' ? '\u05E9\u05DD: \u05EA-\u05D0' : currentLanguage === 'fr' ? 'Nom: Z-A' : 'Name: Z-A'}</option></select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" role="list" aria-label={currentLanguage === 'he' ? '\u05E8\u05E9\u05D9\u05DE\u05EA \u05DE\u05D5\u05E6\u05E8\u05D9\u05DD' : 'Product list'}>
              {paginatedProducts.map((product) => {
                const liked = isFavorite(product.id);
                // Task 26: Get selected language for this product card (default to interface language)
                const selectedLang = productLanguages[product.id] || currentLanguage;
                const productTitle = getInterfaceDisplayTitle(product, selectedLang);
                const productCategory = getInterfaceCategoryName(product.category, currentLanguage);
                const productPrice = product.variants && product.variants.length > 0 ? `${Math.min(...product.variants.map(v => v.price))} \u20AA` : '';
                return (
                  <article key={product.id} className="bg-white rounded-lg overflow-hidden shadow hover:shadow-xl hover:-translate-y-1 transition-all duration-200 border border-gray-200 group relative focus-within:ring-2 focus-within:ring-orange-500" data-testid={`card-product-${product.id}`} role="listitem" aria-label={`${productTitle}, ${productPrice}, ${productCategory}`}>
                    <span className="sr-only">{buildSrDescription(product)} {currentLanguage === 'he' ? '\u05DB\u05E4\u05EA\u05D5\u05E8: \u05E6\u05E4\u05D9\u05D9\u05D4 \u05D1\u05E4\u05E8\u05D8\u05D9\u05DD. \u05DB\u05E4\u05EA\u05D5\u05E8: \u05D4\u05D5\u05E1\u05E3 \u05DC\u05DE\u05D5\u05E2\u05D3\u05E4\u05D9\u05DD.' : 'Button: View details. Button: Add to favorites.'}</span>
                    <div className={`absolute top-3 z-10 flex flex-col gap-1 ${currentLanguage === 'he' ? 'right-3' : 'left-3'}`}>
                      {product.variants?.some(v => v.originalPrice && v.originalPrice > v.price) && (<span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">{currentLanguage === 'he' ? '\u05DE\u05D1\u05E6\u05E2' : currentLanguage === 'fr' ? 'Promo' : 'Sale'}</span>)}
                      {product.isFeatured && (<span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">{currentLanguage === 'he' ? '\u05DE\u05D5\u05DE\u05DC\u05E5' : currentLanguage === 'fr' ? 'Populaire' : 'Popular'}</span>)}
                    </div>
                    <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavorite(product.id); }} className={`absolute top-3 z-10 p-2 rounded-full shadow-md transition-all duration-200 hover:scale-110 active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${currentLanguage === 'he' ? 'left-3' : 'right-3'} ${liked ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-white/90 text-gray-400 hover:text-red-500 hover:bg-white'}`} data-testid={`button-favorite-${product.id}`} aria-label={liked ? (currentLanguage === 'he' ? '\u05D4\u05E1\u05E8 \u05DE\u05D4\u05DE\u05D5\u05E2\u05D3\u05E4\u05D9\u05DD' : 'Remove from favorites') : (currentLanguage === 'he' ? '\u05D4\u05D5\u05E1\u05E3 \u05DC\u05DE\u05D5\u05E2\u05D3\u05E4\u05D9\u05DD' : 'Add to favorites')} aria-pressed={liked}><Heart className="h-4 w-4" fill={liked ? 'currentColor' : 'none'} strokeWidth={liked ? 0 : 2} /></button>

                    <Link href={`/product/${product.id}`} tabIndex={0} aria-label={`${currentLanguage === 'he' ? '\u05E6\u05E4\u05D9\u05D9\u05D4 \u05D1\u05E4\u05E8\u05D8\u05D9\u05DD:' : 'View details:'} ${productTitle}`}>
                      {product.images && product.images.length > 0 ? (
                        <div className="relative w-full aspect-square overflow-hidden cursor-pointer">
                          <LazyImage src={convertImagePath(product.images[0])} alt={buildProductAlt(product, currentLanguage)} className={`absolute inset-0 w-full h-full object-cover ${product.images.length > 1 ? 'group-hover:opacity-0' : 'hover:opacity-90'}`} dataTestId={`img-product-${product.id}`} onError={(e) => { const target = e.currentTarget as HTMLImageElement; const parent = target.parentElement; if (parent) { parent.innerHTML = `<div class="w-full h-full bg-gray-100 flex flex-col items-center justify-center gap-2 text-gray-400"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg><span class="text-xs text-gray-500 px-2 text-center line-clamp-2">${target.alt}</span></div>`; } }} />
                          {product.images.length > 1 && (<img loading="lazy" decoding="async" width="300" height="300" src={convertImagePath(product.images[1])} alt={buildProductAlt(product, currentLanguage, '- 2')} className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100" data-testid={`img-product-hover-${product.id}`} onError={(e) => { e.currentTarget.remove(); }} />)}
                          {product.variants && product.variants.length > 0 && (<button onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleQuickAdd(product as Product); }} className="absolute bottom-2 left-2 right-2 z-20 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 translate-y-2 group-hover:translate-y-0 focus-visible:translate-y-0 transition-all duration-300 ease-out bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-semibold text-sm py-2 px-3 rounded-lg shadow-lg flex items-center justify-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2" data-testid={`button-quick-add-${product.id}`} aria-label={quickAddLabels[currentLanguage] || quickAddLabels.he}><Plus size={16} strokeWidth={3} /><span>{quickAddLabels[currentLanguage] || quickAddLabels.he}</span></button>)}
                        </div>
                      ) : (
                        <div className="w-full aspect-square bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors relative" data-testid={`placeholder-product-${product.id}`} role="img" aria-label={productTitle}><span className="text-2xl" aria-hidden="true">&#128214;</span>
                          {product.variants && product.variants.length > 0 && (<button onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleQuickAdd(product as Product); }} className="absolute bottom-2 left-2 right-2 z-20 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 translate-y-2 group-hover:translate-y-0 focus-visible:translate-y-0 transition-all duration-300 ease-out bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-semibold text-sm py-2 px-3 rounded-lg shadow-lg flex items-center justify-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2" data-testid={`button-quick-add-placeholder-${product.id}`} aria-label={quickAddLabels[currentLanguage] || quickAddLabels.he}><Plus size={16} strokeWidth={3} /><span>{quickAddLabels[currentLanguage] || quickAddLabels.he}</span></button>)}
                        </div>
                      )}
                    </Link>

                    <div className="p-3">
                      {/* Task 26: Language selector tabs for products with multiple language versions */}
                      {product.languageGroupId && (product.nameEnglish || product.nameFrench || product.nameSpanish || product.nameRussian) && (
                        <div className="flex gap-1 mb-2 flex-wrap" data-testid={`language-tabs-${product.id}`}>
                          <button
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setProductLanguages(prev => ({ ...prev, [product.id]: 'he' })); }}
                            className={`px-2 py-0.5 text-[10px] font-medium rounded transition-colors ${selectedLang === 'he' ? 'bg-blue-100 text-blue-700 border border-blue-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300'}`}
                            data-testid={`lang-tab-he-${product.id}`}
                            aria-label="Hebrew"
                            title="עברית"
                            aria-pressed={selectedLang === 'he'}
                          >
                            עב
                          </button>
                          {product.nameEnglish && (
                            <button
                              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setProductLanguages(prev => ({ ...prev, [product.id]: 'en' })); }}
                              className={`px-2 py-0.5 text-[10px] font-medium rounded transition-colors ${selectedLang === 'en' ? 'bg-blue-100 text-blue-700 border border-blue-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300'}`}
                              data-testid={`lang-tab-en-${product.id}`}
                              aria-label="English"
                              title="English"
                              aria-pressed={selectedLang === 'en'}
                            >
                              EN
                            </button>
                          )}
                          {product.nameFrench && (
                            <button
                              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setProductLanguages(prev => ({ ...prev, [product.id]: 'fr' })); }}
                              className={`px-2 py-0.5 text-[10px] font-medium rounded transition-colors ${selectedLang === 'fr' ? 'bg-blue-100 text-blue-700 border border-blue-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300'}`}
                              data-testid={`lang-tab-fr-${product.id}`}
                              aria-label="French"
                              title="Français"
                              aria-pressed={selectedLang === 'fr'}
                            >
                              FR
                            </button>
                          )}
                          {product.nameSpanish && (
                            <button
                              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setProductLanguages(prev => ({ ...prev, [product.id]: 'es' })); }}
                              className={`px-2 py-0.5 text-[10px] font-medium rounded transition-colors ${selectedLang === 'es' ? 'bg-blue-100 text-blue-700 border border-blue-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300'}`}
                              data-testid={`lang-tab-es-${product.id}`}
                              aria-label="Spanish"
                              title="Español"
                              aria-pressed={selectedLang === 'es'}
                            >
                              ES
                            </button>
                          )}
                          {product.nameRussian && (
                            <button
                              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setProductLanguages(prev => ({ ...prev, [product.id]: 'ru' })); }}
                              className={`px-2 py-0.5 text-[10px] font-medium rounded transition-colors ${selectedLang === 'ru' ? 'bg-blue-100 text-blue-700 border border-blue-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300'}`}
                              data-testid={`lang-tab-ru-${product.id}`}
                              aria-label="Russian"
                              title="Русский"
                              aria-pressed={selectedLang === 'ru'}
                            >
                              РУ
                            </button>
                          )}
                        </div>
                      )}
                      <Link href={`/product/${product.id}`}><h3 className="font-semibold text-sm mb-1 text-gray-900 line-clamp-1 cursor-pointer hover:text-blue-600 transition-colors" data-testid={`text-title-${product.id}`}>{highlightSearchMatch(getInterfaceDisplayTitle(product, selectedLang), filters.searchQuery)}</h3></Link>
                      <div className="text-sm font-bold text-blue-600 mb-1" data-testid={`text-price-${product.id}`}>{product.variants && product.variants.length > 0 ? (() => { const minPrice = Math.min(...product.variants.map(v => v.price)); const maxPrice = Math.max(...product.variants.map(v => v.price)); const fromLabel = currentLanguage === 'he' ? '\u05D4\u05D7\u05DC \u05DE-' : currentLanguage === 'fr' ? '\u00C0 partir de ' : currentLanguage === 'es' ? 'Desde ' : currentLanguage === 'ru' ? '\u041E\u0442 ' : 'From '; if (minPrice === maxPrice) return `${minPrice} \u20AA`; return <>{fromLabel}<span className="text-lg">{minPrice} {'\u20AA'}</span></>; })() : currentLanguage === 'he' ? '\u05DE\u05D7\u05D9\u05E8 \u05DC\u05D0 \u05D6\u05DE\u05D9\u05DF' : 'Price unavailable'}</div>
                      <div className="flex items-center justify-between text-xs text-gray-600 mb-2" data-testid={`text-category-${product.id}`}><span>{getInterfaceCategoryName(product.category, currentLanguage)}</span>{product.variants && product.variants.length > 1 && (<span className="bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded text-[10px] font-medium">{product.variants.length} {currentLanguage === 'he' ? '\u05D0\u05E4\u05E9\u05E8\u05D5\u05D9\u05D5\u05EA' : 'options'}</span>)}</div>
                      <div className="flex gap-2">
                        <Link href={`/product/${product.id}`} className="flex-1"><Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm focus-visible:ring-2 focus-visible:ring-orange-500" data-testid={`button-view-details-${product.id}`} aria-label={`${currentLanguage === 'he' ? '\u05E6\u05E4\u05D9\u05D9\u05D4 \u05D1\u05E4\u05E8\u05D8\u05D9\u05DD' : 'View Details'}: ${productTitle}`}>{currentLanguage === 'he' ? '\u05E6\u05E4\u05D9\u05D9\u05D4 \u05D1\u05E4\u05E8\u05D8\u05D9\u05DD' : currentLanguage === 'en' ? 'View Details' : currentLanguage === 'fr' ? 'Voir' : currentLanguage === 'es' ? 'Ver' : currentLanguage === 'ru' ? '\u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435' : '\u05E6\u05E4\u05D9\u05D9\u05D4 \u05D1\u05E4\u05E8\u05D8\u05D9\u05DD'}</Button></Link>
                        <Button className="bg-red-600 hover:bg-red-700 text-white px-3 focus-visible:ring-2 focus-visible:ring-orange-500" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setVariantModalProduct(product as Product); }} data-testid={`button-add-to-cart-${product.id}`} aria-label={`${currentLanguage === 'he' ? '\u05D4\u05D5\u05E1\u05E3 \u05DC\u05E1\u05DC' : 'Add to cart'}: ${productTitle}`}><ShoppingCart className="h-4 w-4" /></Button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {totalPages > 1 && (
              <nav className="flex items-center justify-center gap-2 mt-8 mb-4" aria-label="Pagination">
                <button onClick={() => { setCurrentPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }} disabled={currentPage === 1} className="px-3 py-2 rounded-lg border border-gray-300 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500" aria-label={currentLanguage === 'he' ? '\u05E2\u05DE\u05D5\u05D3 \u05E7\u05D5\u05D3\u05DD' : 'Previous page'}>{currentLanguage === 'he' ? '\u2190 \u05D4\u05E7\u05D5\u05D3\u05DD' : '\u2190 Prev'}</button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (<button key={page} onClick={() => { setCurrentPage(page); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${page === currentPage ? 'bg-blue-600 text-white' : 'border border-gray-300 hover:bg-gray-50'}`} aria-label={`${currentLanguage === 'he' ? '\u05E2\u05DE\u05D5\u05D3' : 'Page'} ${page}`} aria-current={page === currentPage ? 'page' : undefined}>{page}</button>))}
                <button onClick={() => { setCurrentPage(p => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }} disabled={currentPage === totalPages} className="px-3 py-2 rounded-lg border border-gray-300 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500" aria-label={currentLanguage === 'he' ? '\u05E2\u05DE\u05D5\u05D3 \u05D4\u05D1\u05D0' : 'Next page'}>{currentLanguage === 'he' ? '\u05D4\u05D1\u05D0 \u2192' : 'Next \u2192'}</button>
              </nav>
            )}
            <div className="text-center text-sm text-gray-500 mb-6">{currentLanguage === 'he' ? `\u05DE\u05E6\u05D9\u05D2 ${(currentPage - 1) * PRODUCTS_PER_PAGE + 1}-${Math.min(currentPage * PRODUCTS_PER_PAGE, sortedProducts.length)} \u05DE\u05EA\u05D5\u05DA ${sortedProducts.length} \u05DE\u05D5\u05E6\u05E8\u05D9\u05DD` : `Showing ${(currentPage - 1) * PRODUCTS_PER_PAGE + 1}-${Math.min(currentPage * PRODUCTS_PER_PAGE, sortedProducts.length)} of ${sortedProducts.length} products`}</div>

            {variantModalProduct && (<ProductVariantModal product={variantModalProduct} isOpen={!!variantModalProduct} onClose={() => setVariantModalProduct(null)} />)}

            {filteredProducts.length === 0 && (
              <div className="text-center py-12" data-testid="text-no-results" role="status"><div className="text-4xl mb-4" aria-hidden="true">&#128269;</div><h3 className="text-xl font-semibold text-gray-900 mb-2">{currentLanguage === 'he' ? '\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D5 \u05EA\u05D5\u05E6\u05D0\u05D5\u05EA' : currentLanguage === 'en' ? 'No results found' : currentLanguage === 'fr' ? 'Aucun r\u00E9sultat trouv\u00E9' : currentLanguage === 'es' ? 'No se encontraron resultados' : currentLanguage === 'ru' ? '\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u043E\u0432 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E' : '\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D5 \u05EA\u05D5\u05E6\u05D0\u05D5\u05EA'}</h3><p className="text-gray-600 mb-4">{currentLanguage === 'he' ? '\u05E0\u05E1\u05D5 \u05DC\u05E9\u05E0\u05D5\u05EA \u05D0\u05EA \u05DE\u05E1\u05E0\u05E0\u05D9 \u05D4\u05D7\u05D9\u05E4\u05D5\u05E9' : currentLanguage === 'en' ? 'Try changing the search filters' : currentLanguage === 'fr' ? 'Essayez de modifier les filtres de recherche' : currentLanguage === 'es' ? 'Intente cambiar los filtros de b\u00FAsqueda' : currentLanguage === 'ru' ? '\u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0444\u0438\u043B\u044C\u0442\u0440\u044B \u043F\u043E\u0438\u0441\u043A\u0430' : '\u05E0\u05E1\u05D5 \u05DC\u05E9\u05E0\u05D5\u05EA \u05D0\u05EA \u05DE\u05E1\u05E0\u05E0\u05D9 \u05D4\u05D7\u05D9\u05E4\u05D5\u05E9'}</p><Button onClick={clearAllFilters} className="focus-visible:ring-2 focus-visible:ring-orange-500" data-testid="button-clear-filters-no-results">{currentLanguage === 'he' ? '\u05E0\u05E7\u05D4 \u05D0\u05EA \u05DB\u05DC \u05D4\u05DE\u05E1\u05E0\u05E0\u05D9\u05DD' : currentLanguage === 'en' ? 'Clear all filters' : currentLanguage === 'fr' ? 'Effacer tous les filtres' : currentLanguage === 'es' ? 'Borrar todos los filtros' : currentLanguage === 'ru' ? '\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u0432\u0441\u0435 \u0444\u0438\u043B\u044C\u0442\u0440\u044B' : '\u05E0\u05E7\u05D4 \u05D0\u05EA \u05DB\u05DC \u05D4\u05DE\u05E1\u05E0\u05E0\u05D9\u05DD'}</Button>
                {/* Task 21: Smart suggestions - show popular products */}
                {(() => { const popular = allProducts.filter(p => p.isFeatured).slice(0, 4); if (popular.length === 0) return null; return (
                  <div className="mt-8">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">{currentLanguage === 'he' ? 'ספרים פופולריים שאולי תאהבו' : currentLanguage === 'en' ? 'Popular books you might like' : currentLanguage === 'fr' ? 'Livres populaires que vous pourriez aimer' : currentLanguage === 'es' ? 'Libros populares que te pueden gustar' : currentLanguage === 'ru' ? 'Популярные книги, которые могут вам понравиться' : 'ספרים פופולריים שאולי תאהבו'}</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {popular.map(p => (
                        <Link key={p.id} href={`/product/${p.id}`} className="bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow border border-gray-200 cursor-pointer">
                          {p.images?.[0] ? (<img src={convertImagePath(p.images[0])} alt={getInterfaceDisplayTitle(p, currentLanguage)} className="w-full aspect-square object-cover" loading="lazy" />) : (<div className="w-full aspect-square bg-gray-100 flex items-center justify-center"><span className="text-2xl">&#128214;</span></div>)}
                          <div className="p-2"><h5 className="text-sm font-medium text-gray-900 line-clamp-1">{getInterfaceDisplayTitle(p, currentLanguage)}</h5>{p.variants?.[0] && <p className="text-sm text-blue-600 font-bold">{p.variants[0].price} ₪</p>}</div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ); })()}
              </div>
            )}

            <div className="bg-white rounded-lg p-8 text-center shadow border border-gray-200 mt-12">
              <p className="text-lg text-gray-700 mb-4" data-testid="text-contact-message">{currentLanguage === 'he' ? '\u05DE\u05D7\u05E4\u05E9\u05D9\u05DD \u05E1\u05E4\u05E8 \u05E0\u05D5\u05E1\u05E3? \u05E6\u05E8\u05D5 \u05E7\u05E9\u05E8 \u05D5\u05E0\u05DE\u05E6\u05D0 \u05E2\u05D1\u05D5\u05E8\u05DB\u05DD!' : currentLanguage === 'en' ? 'Looking for another book? Contact us and we\'ll find it for you!' : currentLanguage === 'fr' ? 'Vous cherchez un autre livre? Contactez-nous et nous le trouverons pour vous!' : currentLanguage === 'es' ? '\u00BFBusca otro libro? \u00A1Cont\u00E1ctenos y lo encontraremos para usted!' : currentLanguage === 'ru' ? '\u0418\u0449\u0435\u0442\u0435 \u0434\u0440\u0443\u0433\u0443\u044E \u043A\u043D\u0438\u0433\u0443? \u0421\u0432\u044F\u0436\u0438\u0442\u0435\u0441\u044C \u0441 \u043D\u0430\u043C\u0438, \u0438 \u043C\u044B \u043D\u0430\u0439\u0434\u0435\u043C \u0435\u0435 \u0434\u043B\u044F \u0432\u0430\u0441!' : '\u05DE\u05D7\u05E4\u05E9\u05D9\u05DD \u05E1\u05E4\u05E8 \u05E0\u05D5\u05E1\u05E3? \u05E6\u05E8\u05D5 \u05E7\u05E9\u05E8 \u05D5\u05E0\u05DE\u05E6\u05D0 \u05E2\u05D1\u05D5\u05E8\u05DB\u05DD!'}</p>
              <Link href="/contact"><Button className="bg-green-600 hover:bg-green-700 text-white focus-visible:ring-2 focus-visible:ring-orange-500" data-testid="button-contact">{currentLanguage === 'he' ? '\u05E6\u05E8\u05D5 \u05E7\u05E9\u05E8 \u05DC\u05E4\u05E8\u05D8\u05D9\u05DD \u05E0\u05D5\u05E1\u05E4\u05D9\u05DD' : currentLanguage === 'en' ? 'Contact us for more details' : currentLanguage === 'fr' ? 'Contactez-nous pour plus de d\u00E9tails' : currentLanguage === 'es' ? 'Cont\u00E1ctenos para m\u00E1s detalles' : currentLanguage === 'ru' ? '\u0421\u0432\u044F\u0436\u0438\u0442\u0435\u0441\u044C \u0441 \u043D\u0430\u043C\u0438 \u0434\u043B\u044F \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u043F\u043E\u0434\u0440\u043E\u0431\u043D\u043E\u0441\u0442\u0435\u0439' : '\u05E6\u05E8\u05D5 \u05E7\u05E9\u05E8 \u05DC\u05E4\u05E8\u05D8\u05D9\u05DD \u05E0\u05D5\u05E1\u05E4\u05D9\u05DD'}</Button></Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
