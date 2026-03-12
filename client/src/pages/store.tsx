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
    <div className="relative w-full h-full bg-transparent overflow-hidden">
      <img
        loading="lazy"
        decoding="async"
        width="300"
        height="300"
        src={src}
        alt={alt}
        className={`${className || ''} transition-all duration-700 ease-in-out ${loaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-105 blur-lg'}`}
        data-testid={dataTestId}
        onLoad={() => setLoaded(true)}
        onError={(e) => {
          setLoaded(true);
          onError?.(e);
        }}
      />
    </div>
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
    // Task 1.1: Always open variant selector modal on "Quick Add" to ensure user chooses size
    setVariantModalProduct(product);
  }, []);

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
      <section style={{background: '#050505', color: '#D4AF37', borderBottom: '1px solid rgba(212,175,55,0.2)', padding: '10px 0', fontSize: '0.85rem', fontWeight: '700', textAlign: 'center'}}><div style={{maxWidth: '1400px', margin: '0 auto', padding: '0 2rem'}}><span>{'\u05DE\u05E9\u05DC\u05D5\u05D7\u05D9\u05DD \u05D7\u05D9\u05E0\u05DD \u05D4\u05D7\u05DC \u05DE- 399 \u05E9"\u05D7 \u2022 \u05D3\u05D5\u05D0\u05E8 \u05E2\u05D3 7 \u05D9\u05DE\u05D9 \u05E2\u05E1\u05E7'}</span></div></section>
      <Header currentLanguage={currentLanguage} onLanguageChange={setLanguage} />

      <div className="flex min-h-screen bg-[#F9F8F6] dark:bg-[#050505] pb-16 md:pb-0 transition-colors duration-500">
        {/* Simple overlay for mobile sidebar */}
        {sidebarVisible && (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity" 
            onClick={() => setSidebarVisible(false)} 
          />
        )}

        <aside className={`
          ${sidebarVisible ? 'w-80' : 'w-0'} 
          transition-all duration-300 ease-in-out overflow-hidden 
          max-md:fixed max-md:inset-y-0 max-md:z-50 max-md:shadow-2xl
          ${sidebarVisible ? 'max-md:w-[280px]' : 'max-md:w-0'} 
          ${currentLanguage === 'he' ? 'max-md:right-0' : 'max-md:left-0'}
          bg-white dark:bg-[#0A0A0B] border-r border-[#E6E0D8] dark:border-white/5
        `}>
          <div className="h-full flex flex-col">
            <div className="p-4 border-b border-[#E6E0D8] dark:border-white/5 flex items-center justify-between bg-white dark:bg-[#0A0A0B] sticky top-0 z-10 transition-colors duration-500">
              <h2 className={`text-xl font-bold text-slate-900 dark:text-white ${currentLanguage === 'he' ? 'font-hebrew' : 'font-serif'}`}>{currentLanguage === 'he' ? '\u05DE\u05E1\u05E0\u05E0\u05D9 \u05D7\u05D9\u05E4\u05D5\u05E9' : 'Filters'}</h2>
              <button 
                onClick={() => setSidebarVisible(false)}
                className="md:hidden p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10"
              >
                <X className="h-5 w-5 text-slate-500 dark:text-slate-400" />
              </button>
            </div>
            <div className="p-5 space-y-6 max-h-screen overflow-y-auto custom-scrollbar">
              {/* Price Filter */}
              <div className="bg-white dark:bg-[#111318] border border-[#E6E0D8] dark:border-white/5 rounded-2xl p-5 shadow-sm">
                <button className="flex items-center justify-between w-full text-left cursor-pointer mb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded" onClick={() => toggleSection('price')} data-testid="label-price-range" aria-expanded={expandedSections.price} type="button"><span className="text-[15px] font-bold text-slate-800 dark:text-white tracking-wide">{currentLanguage === 'he' ? '\u05D8\u05D5\u05D5\u05D7 \u05DE\u05D7\u05D9\u05E8\u05D9\u05DD' : currentLanguage === 'en' ? 'Price Range' : currentLanguage === 'fr' ? 'Gamme de Prix' : currentLanguage === 'es' ? 'Rango de Precio' : currentLanguage === 'ru' ? '\u0414\u0438\u0430\u043F\u0430\u0437\u043E\u043D \u0426\u0435\u043D' : '\u05D8\u05D5\u05D5\u05D7 \u05DE\u05D7\u05D9\u05E8\u05D9\u05DD'}</span>{expandedSections.price ? <ChevronUp className="h-4 w-4 text-slate-500" /> : <ChevronDown className="h-4 w-4 text-slate-500" />}</button>
                {expandedSections.price && (<div className="space-y-4 pt-2"><Slider min={filterOptions.priceRange[0]} max={filterOptions.priceRange[1]} value={filters.priceRange} onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value as [number, number] }))} className="w-full" data-testid="slider-price-range" /><div className="flex justify-between text-sm font-medium text-slate-600 dark:text-slate-400"><span data-testid="text-price-min">{filters.priceRange[0]} {'\u20AA'}</span><span data-testid="text-price-max">{filters.priceRange[1]} {'\u20AA'}</span></div></div>)}
              </div>
              {/* Languages Filter */}
              <div className="relative overflow-hidden bg-gradient-to-br from-[#FAF8F5] to-white dark:from-[#1A1C23] dark:to-[#111318] border border-[#D4AF37]/30 dark:border-[#D4AF37]/20 rounded-2xl p-5 shadow-sm">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 dark:bg-[#D4AF37]/5 rounded-bl-full pointer-events-none" />
                <button className="flex items-center justify-between w-full text-left cursor-pointer mb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded relative z-10" onClick={() => toggleSection('languages')} data-testid="label-languages" aria-expanded={expandedSections.languages} type="button"><span className="text-[15px] font-bold text-[#D4AF37] tracking-wide">{currentLanguage === 'he' ? '\u05E9\u05E4\u05D5\u05EA' : currentLanguage === 'en' ? 'Languages' : currentLanguage === 'fr' ? 'Langues' : currentLanguage === 'es' ? 'Idiomas' : currentLanguage === 'ru' ? '\u042F\u0437\u044B\u043A\u0438' : '\u05E9\u05E4\u05D5\u05EA'}</span>{expandedSections.languages ? <ChevronUp className="h-4 w-4 text-[#D4AF37]" /> : <ChevronDown className="h-4 w-4 text-[#D4AF37]" />}</button>
                {expandedSections.languages && (<div className="space-y-3 relative z-10" role="group" aria-label="Language filters">{filterOptions.languages.map((language) => (<div key={language} className="flex items-center space-x-3 rtl:space-x-reverse"><Checkbox id={`language-${language}`} checked={filters.languages.includes(language)} onCheckedChange={() => toggleFilter('languages', language)} className="border-[#D4AF37]/50 text-[#D4AF37] focus-visible:ring-2 focus-visible:ring-[#D4AF37]" data-testid={`checkbox-language-${language}`} /><label htmlFor={`language-${language}`} className="text-sm cursor-pointer text-slate-700 dark:text-slate-300 font-medium hover:text-[#D4AF37] transition-colors" data-testid={`text-language-${language}`}>{getLanguageDisplayName(language, currentLanguage)}</label></div>))}</div>)}
              </div>
              {/* Categories Filter */}
              <div className="bg-white dark:bg-[#111318] border border-[#E6E0D8] dark:border-white/5 rounded-2xl p-5 shadow-sm">
                <button className="flex items-center justify-between w-full text-left cursor-pointer mb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded" onClick={() => toggleSection('categories')} data-testid="label-categories" aria-expanded={expandedSections.categories} type="button"><span className="text-[15px] font-bold text-slate-800 dark:text-white tracking-wide">{currentLanguage === 'he' ? '\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D5\u05EA' : currentLanguage === 'en' ? 'Categories' : currentLanguage === 'fr' ? 'Cat\u00E9gories' : currentLanguage === 'es' ? 'Categor\u00EDas' : currentLanguage === 'ru' ? '\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438' : '\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D5\u05EA'}</span>{expandedSections.categories ? <ChevronUp className="h-4 w-4 text-slate-500" /> : <ChevronDown className="h-4 w-4 text-slate-500" />}</button>
                {expandedSections.categories && (<div className="space-y-3 max-h-56 overflow-y-auto custom-scrollbar pr-2" role="group" aria-label="Category filters">{filterOptions.categories.map((category) => (<div key={category} className="flex items-center space-x-3 rtl:space-x-reverse"><Checkbox id={`category-${category}`} checked={filters.categories.includes(category)} onCheckedChange={() => toggleFilter('categories', category)} className="border-slate-300 dark:border-slate-600 focus-visible:ring-2 focus-visible:ring-[#D4AF37] text-[#D4AF37]" data-testid={`checkbox-category-${category}`} /><label htmlFor={`category-${category}`} className="text-sm cursor-pointer text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors" data-testid={`text-category-${category}`}>{getInterfaceCategoryName(category, currentLanguage)}</label></div>))}</div>)}
              </div>
              {/* Sizes Filter */}
              <div className="bg-white dark:bg-[#111318] border border-[#E6E0D8] dark:border-white/5 rounded-2xl p-5 shadow-sm">
                <button className="flex items-center justify-between w-full text-left cursor-pointer mb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded" onClick={() => toggleSection('sizes')} data-testid="label-sizes" aria-expanded={expandedSections.sizes} type="button"><span className="text-[15px] font-bold text-slate-800 dark:text-white tracking-wide">{currentLanguage === 'he' ? '\u05D2\u05D3\u05DC\u05D9\u05DD' : currentLanguage === 'en' ? 'Sizes' : currentLanguage === 'fr' ? 'Tailles' : currentLanguage === 'es' ? 'Tama\u00F1os' : currentLanguage === 'ru' ? '\u0420\u0430\u0437\u043C\u0435\u0440\u044B' : '\u05D2\u05D3\u05DC\u05D9\u05DD'}</span>{expandedSections.sizes ? <ChevronUp className="h-4 w-4 text-slate-500" /> : <ChevronDown className="h-4 w-4 text-slate-500" />}</button>
                {expandedSections.sizes && (<div className="space-y-3" role="group" aria-label="Size filters">{filterOptions.sizes.map((size) => (<div key={size} className="flex items-center space-x-3 rtl:space-x-reverse"><Checkbox id={`size-${size}`} checked={filters.sizes.includes(size)} onCheckedChange={() => toggleFilter('sizes', size)} className="border-slate-300 dark:border-slate-600 focus-visible:ring-2 focus-visible:ring-[#D4AF37] text-[#D4AF37]" data-testid={`checkbox-size-${size}`} /><label htmlFor={`size-${size}`} className="text-sm cursor-pointer text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors" data-testid={`text-size-${size}`}>{size}</label></div>))}</div>)}
              </div>
              {/* Formats Filter */}
              <div className="bg-white dark:bg-[#111318] border border-[#E6E0D8] dark:border-white/5 rounded-2xl p-5 shadow-sm">
                <button className="flex items-center justify-between w-full text-left cursor-pointer mb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded" onClick={() => toggleSection('formats')} data-testid="label-formats" aria-expanded={expandedSections.formats} type="button"><span className="text-[15px] font-bold text-slate-800 dark:text-white tracking-wide">{currentLanguage === 'he' ? '\u05DB\u05E8\u05D9\u05DB\u05D5\u05EA' : currentLanguage === 'en' ? 'Bindings' : currentLanguage === 'fr' ? 'Reliures' : currentLanguage === 'es' ? 'Encuadernaciones' : currentLanguage === 'ru' ? '\u041F\u0435\u0440\u0435\u043F\u043B\u0435\u0442\u044B' : '\u05DB\u05E8\u05D9\u05DB\u05D5\u05EA'}</span>{expandedSections.formats ? <ChevronUp className="h-4 w-4 text-slate-500" /> : <ChevronDown className="h-4 w-4 text-slate-500" />}</button>
                {expandedSections.formats && (<div className="space-y-3 max-h-56 overflow-y-auto custom-scrollbar pr-2" role="group" aria-label="Format filters">{filterOptions.formats.slice(0, 12).map((format) => (<div key={format} className="flex items-center space-x-3 rtl:space-x-reverse"><Checkbox id={`format-${format}`} checked={filters.formats.includes(format)} onCheckedChange={() => toggleFilter('formats', format)} className="border-slate-300 dark:border-slate-600 focus-visible:ring-2 focus-visible:ring-[#D4AF37] text-[#D4AF37]" data-testid={`checkbox-format-${format}`} /><label htmlFor={`format-${format}`} className="text-sm cursor-pointer text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors" data-testid={`text-format-${format}`}>{format}</label></div>))}{filterOptions.formats.length > 12 && (<div className="text-xs text-slate-500 pt-2 font-medium" data-testid="text-more-formats">{'\u05D5\u05E2\u05D5\u05D3'} {filterOptions.formats.length - 12} {'\u05D0\u05E4\u05E9\u05E8\u05D5\u05D9\u05D5\u05EA...'}</div>)}</div>)}
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1">
          <div className="p-6 md:p-10 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div className="flex items-center justify-between md:justify-start w-full md:w-auto gap-4">
                <Button onClick={() => setSidebarVisible(!sidebarVisible)} className="bg-white dark:bg-[#111318] text-slate-800 dark:text-white border border-[#E6E0D8] dark:border-white/10 hover:border-[#D4AF37] hover:text-[#D4AF37] shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-[#D4AF37] h-11 px-4 rounded-xl" data-testid="button-toggle-sidebar" aria-label={sidebarVisible ? 'Hide filters' : 'Show filters'}><Filter className="h-5 w-5 mr-2" />{currentLanguage === 'he' ? 'סינון' : 'Filters'}</Button>
                <h1 className={`text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight ${currentLanguage === 'he' ? 'font-hebrew' : 'font-serif'}`} data-testid="text-page-title">{currentLanguage === 'he' ? '\u05E1\u05E4\u05E8\u05D9 \u05D1\u05E8\u05E1\u05DC\u05D1' : currentLanguage === 'en' ? 'Breslov Books' : currentLanguage === 'fr' ? 'Livres Breslov' : currentLanguage === 'es' ? 'Libros Breslov' : currentLanguage === 'ru' ? '\u041A\u043D\u0438\u0433\u0438 \u0411\u0440\u0435\u0441\u043B\u043E\u0432' : '\u05E1\u05E4\u05E8\u05D9 \u05D1\u05E8\u05E1\u05DC\u05D1'}</h1>
              </div>
              
              <div className="flex items-center gap-4 bg-white dark:bg-[#111318] p-1.5 rounded-xl border border-[#E6E0D8] dark:border-white/10 shadow-sm w-full md:w-auto overflow-hidden">
                <div className="px-4 py-2" data-testid="text-results-count" aria-live="polite"><span className="text-sm font-medium text-slate-500 dark:text-slate-400">{currentLanguage === 'he' ? <>{'\u05E0\u05DE\u05E6\u05D0\u05D5'} <span className="font-bold text-[#D4AF37]">{filteredProducts.length}</span> {'\u05DE\u05EA\u05D5\u05DA'} <span className="font-bold text-slate-700 dark:text-slate-200">{allProducts.length}</span></> : currentLanguage === 'en' ? <>Showing <span className="font-bold text-[#D4AF37]">{filteredProducts.length}</span> of <span className="font-bold text-slate-700 dark:text-slate-200">{allProducts.length}</span></> : currentLanguage === 'fr' ? <>Trouv&eacute; <span className="font-bold text-[#D4AF37]">{filteredProducts.length}</span> sur <span className="font-bold text-slate-700 dark:text-slate-200">{allProducts.length}</span></> : currentLanguage === 'es' ? <>Encontrado <span className="font-bold text-[#D4AF37]">{filteredProducts.length}</span> de <span className="font-bold text-slate-700 dark:text-slate-200">{allProducts.length}</span></> : currentLanguage === 'ru' ? <>{'\u041D\u0430\u0439\u0434\u0435\u043D\u043E'} <span className="font-bold text-[#D4AF37]">{filteredProducts.length}</span> {'\u0438\u0437'} <span className="font-bold text-slate-700 dark:text-slate-200">{allProducts.length}</span></> : <>{'\u05E0\u05DE\u05E6\u05D0\u05D5'} <span className="font-bold text-[#D4AF37]">{filteredProducts.length}</span></>}</span></div>
                <div className="h-6 w-px bg-[#E6E0D8] dark:bg-white/10 hidden md:block" />
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-transparent border-none text-sm font-medium text-slate-700 dark:text-slate-300 focus:ring-0 cursor-pointer pl-3 pr-8 w-full md:w-auto" data-testid="select-sort" aria-label={currentLanguage === 'he' ? '\u05DE\u05D9\u05D5\u05DF' : 'Sort products'}><option value="default">{currentLanguage === 'he' ? '\u05DE\u05D9\u05D5\u05DF: \u05D1\u05E8\u05D9\u05E8\u05EA \u05DE\u05D7\u05D3\u05DC' : currentLanguage === 'fr' ? 'Tri: par d\u00E9faut' : 'Sort: Default'}</option><option value="price-asc">{currentLanguage === 'he' ? '\u05DE\u05D7\u05D9\u05E8: \u05E0\u05DE\u05D5\u05DA \u05DC\u05D2\u05D1\u05D5\u05D4' : currentLanguage === 'fr' ? 'Prix: croissant' : 'Price: Low to High'}</option><option value="price-desc">{currentLanguage === 'he' ? '\u05DE\u05D7\u05D9\u05E8: \u05D2\u05D1\u05D5\u05D4 \u05DC\u05E0\u05DE\u05D5\u05DA' : currentLanguage === 'fr' ? 'Prix: d\u00E9croissant' : 'Price: High to Low'}</option><option value="name-az">{currentLanguage === 'he' ? '\u05E9\u05DD: \u05D0-\u05EA' : currentLanguage === 'fr' ? 'Nom: A-Z' : 'Name: A-Z'}</option><option value="name-za">{currentLanguage === 'he' ? '\u05E9\u05DD: \u05EA-\u05D0' : currentLanguage === 'fr' ? 'Nom: Z-A' : 'Name: Z-A'}</option></select>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8" role="list" aria-label={currentLanguage === 'he' ? '\u05E8\u05E9\u05D9\u05DE\u05EA \u05DE\u05D5\u05E6\u05E8\u05D9\u05DD' : 'Product list'}>
              {paginatedProducts.map((product) => {
                const liked = isFavorite(product.id);
                // Task 26: Get selected language for this product card (default to interface language)
                const selectedLang = productLanguages[product.id] || currentLanguage;
                const productTitle = getInterfaceDisplayTitle(product, selectedLang);
                const productCategory = getInterfaceCategoryName(product.category, currentLanguage);
                const productPrice = product.variants && product.variants.length > 0 ? `${Math.min(...product.variants.map(v => v.price))} \u20AA` : '';
                return (
                  <article key={product.id} className="bg-white dark:bg-[#0A0A0B] rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-[#E6E0D8] dark:border-white/5 hover:-translate-y-1.5 group relative focus-within:ring-2 focus-within:ring-[#D4AF37]" data-testid={`card-product-${product.id}`} role="listitem" aria-label={`${productTitle}, ${productPrice}, ${productCategory}`}>
                    <span className="sr-only">{buildSrDescription(product)} {currentLanguage === 'he' ? '\u05DB\u05E4\u05EA\u05D5\u05E8: \u05E6\u05E4\u05D9\u05D9\u05D4 \u05D1\u05E4\u05E8\u05D8\u05D9\u05DD. \u05DB\u05E4\u05EA\u05D5\u05E8: \u05D4\u05D5\u05E1\u05E3 \u05DC\u05DE\u05D5\u05E2\u05D3\u05E4\u05D9\u05DD.' : 'Button: View details. Button: Add to favorites.'}</span>
                    <div className={`absolute top-4 z-10 flex flex-col gap-1.5 ${currentLanguage === 'he' ? 'right-4' : 'left-4'}`}>
                      {product.variants?.some(v => v.originalPrice && v.originalPrice > v.price) && (() => { const saleVariant = product.variants!.find(v => v.originalPrice && v.originalPrice > v.price)!; const discount = Math.round(((saleVariant.originalPrice! - saleVariant.price) / saleVariant.originalPrice!) * 100); return <span className="bg-red-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md tracking-wider">-{discount}%</span>; })()}
                      {product.isFeatured && (<span className="bg-[#D4AF37] text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md tracking-wider">{currentLanguage === 'he' ? '\u05DE\u05D5\u05DE\u05DC\u05E5' : 'Popular'}</span>)}
                      {product.language && product.language !== '\u05E2\u05D1\u05E8\u05D9\u05EA' && product.language !== 'Hebrew' && (<span className="bg-[#111318] dark:bg-white text-white dark:text-[#111318] text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md tracking-wider">{getLanguageDisplayName(product.language, currentLanguage)}</span>)}
                    </div>
                    <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavorite(product.id); }} className={`absolute top-4 z-10 w-10 h-10 flex items-center justify-center rounded-full shadow-md transition-all duration-300 hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${currentLanguage === 'he' ? 'left-4' : 'right-4'} ${liked ? 'bg-red-500 text-white shadow-red-500/30' : 'bg-white/90 dark:bg-black/80 backdrop-blur-md text-slate-400 dark:text-slate-300 hover:text-red-500 dark:hover:text-red-400'}`} data-testid={`button-favorite-${product.id}`} aria-label={liked ? (currentLanguage === 'he' ? '\u05D4\u05E1\u05E8 \u05DE\u05D4\u05DE\u05D5\u05E2\u05D3\u05E4\u05D9\u05DD' : 'Remove from favorites') : (currentLanguage === 'he' ? '\u05D4\u05D5\u05E1\u05E3 \u05DC\u05DE\u05D5\u05E2\u05D3\u05E4\u05D9\u05DD' : 'Add to favorites')} aria-pressed={liked}><Heart className={"h-5 w-5 transition-transform duration-300 " + (liked ? "scale-110" : "scale-100")} fill={liked ? 'currentColor' : 'none'} strokeWidth={liked ? 0 : 2} /></button>

                    <Link href={`/product/${product.id}`} tabIndex={0} aria-label={`${currentLanguage === 'he' ? '\u05E6\u05E4\u05D9\u05D9\u05D4 \u05D1\u05E4\u05E8\u05D8\u05D9\u05DD:' : 'View details:'} ${productTitle}`}>
                      {product.images && product.images.length > 0 ? (
                        <div className="relative w-full aspect-square overflow-hidden cursor-pointer bg-[#F9F8F6] dark:bg-[#111318]">
                          <LazyImage src={convertImagePath(product.images[0])} alt={buildProductAlt(product, currentLanguage)} className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out ${product.images.length > 1 ? 'group-hover:opacity-0 group-hover:scale-110' : 'group-hover:scale-105'}`} dataTestId={`img-product-${product.id}`} onError={(e) => { const target = e.currentTarget as HTMLImageElement; const parent = target.parentElement; if (parent) { parent.innerHTML = `<div class="w-full h-full bg-[#F9F8F6] dark:bg-[#111318] flex flex-col items-center justify-center gap-2 text-slate-400"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg><span class="text-xs font-semibold px-4 text-center line-clamp-2">${target.alt}</span></div>`; } }} />
                          {product.images.length > 1 && (<img loading="lazy" decoding="async" width="300" height="300" src={convertImagePath(product.images[1])} alt={buildProductAlt(product, currentLanguage, '- 2')} className="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-700 ease-in-out group-hover:opacity-100 group-hover:scale-105 scale-100" data-testid={`img-product-hover-${product.id}`} onError={(e) => { e.currentTarget.remove(); }} />)}
                          {product.variants && product.variants.length > 0 && (<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />)}
                          {product.variants && product.variants.length > 0 && (<button onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleQuickAdd(product as Product); }} className="absolute bottom-4 left-4 right-4 z-20 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 translate-y-8 group-hover:translate-y-0 focus-visible:translate-y-0 transition-all duration-500 ease-out bg-white dark:bg-[#111318] text-[#050505] dark:text-white hover:bg-[#F9F8F6] dark:hover:bg-[#1A1C23] font-bold text-sm py-3 px-4 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]" data-testid={`button-quick-add-${product.id}`} aria-label={quickAddLabels[currentLanguage] || quickAddLabels.he}><Plus size={18} strokeWidth={2.5} /><span>{quickAddLabels[currentLanguage] || quickAddLabels.he}</span></button>)}
                        </div>
                      ) : (
                        <div className="w-full aspect-square bg-[#F9F8F6] dark:bg-[#111318] flex items-center justify-center cursor-pointer hover:bg-[#E6E0D8] dark:hover:bg-[#1A1C23] transition-colors relative" data-testid={`placeholder-product-${product.id}`} role="img" aria-label={productTitle}><span className="text-4xl opacity-50 z-10" aria-hidden="true">&#128214;</span>
                          {product.variants && product.variants.length > 0 && (<button onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleQuickAdd(product as Product); }} className="absolute bottom-4 left-4 right-4 z-20 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 translate-y-4 group-hover:translate-y-0 focus-visible:translate-y-0 transition-all duration-300 ease-out bg-white dark:bg-[#1A1C23] text-slate-900 dark:text-white font-semibold py-3 rounded-xl shadow-lg border border-[#E6E0D8] dark:border-white/10 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]" data-testid={`button-quick-add-placeholder-${product.id}`} aria-label={quickAddLabels[currentLanguage] || quickAddLabels.he}><Plus size={18} strokeWidth={2.5} /><span>{quickAddLabels[currentLanguage] || quickAddLabels.he}</span></button>)}
                        </div>
                      )}
                    </Link>

                    <div className="p-5 md:p-6 flex flex-col items-center text-center">
                      <div className="flex items-center justify-center text-[11px] uppercase tracking-[0.2em] font-bold text-slate-400 mb-3 w-full" data-testid={`text-category-${product.id}`}>{getInterfaceCategoryName(product.category, currentLanguage)}</div>
                      <Link href={`/product/${product.id}`}><h3 className={`font-bold text-lg mb-3 text-slate-900 dark:text-white line-clamp-2 cursor-pointer hover:text-[#D4AF37] transition-colors leading-snug ${currentLanguage === 'he' ? 'font-hebrew text-right' : 'font-serif text-center'}`} data-testid={`text-title-${product.id}`}>{highlightSearchMatch(getInterfaceDisplayTitle(product, currentLanguage), filters.searchQuery)}</h3></Link>
                      <div className="text-xl font-black text-[#D4AF37] dark:text-[#E8C34E] mb-6 tracking-tight flex-1 flex items-end justify-center" data-testid={`text-price-${product.id}`}>{product.variants && product.variants.length > 0 ? (() => { const minPrice = Math.min(...product.variants.map(v => v.price)); const cheapestVariant = product.variants.reduce((min, v) => v.price < min.price ? v : min, product.variants[0]); const hasOriginalPrice = cheapestVariant.originalPrice && cheapestVariant.originalPrice > cheapestVariant.price; const fromLabel = product.variants.length > 1 ? (currentLanguage === 'he' ? '\u05D4\u05D7\u05DC \u05DE-' : 'From ') : ''; return <div className="flex items-baseline gap-2 flex-wrap justify-center">{fromLabel && <span className="text-xs font-semibold text-slate-500">{fromLabel}</span>}<span>{minPrice} {'\u20AA'}</span>{hasOriginalPrice && <span className="text-sm text-slate-400 line-through font-medium ml-1">{cheapestVariant.originalPrice} {'\u20AA'}</span>}</div>; })() : <span className="text-slate-400 text-sm">{currentLanguage === 'he' ? '\u05DE\u05D7\u05D9\u05E8 \u05DC\u05D0 \u05D6\u05DE\u05D9\u05DF' : 'Price unavailable'}</span>}</div>
                      
                      <div className="w-full pt-4 border-t border-[#E6E0D8] dark:border-white/5 mt-auto">
                        <Link href={`/product/${product.id}`} className="block w-full"><Button className="w-full bg-transparent hover:bg-slate-50 dark:hover:bg-white/5 text-slate-900 dark:text-white border border-[#E6E0D8] dark:border-white/10 text-sm font-bold rounded-xl h-12 shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-[#D4AF37] group/btn" data-testid={`button-view-details-${product.id}`} aria-label={`${currentLanguage === 'he' ? '\u05E6\u05E4\u05D9\u05D9\u05D4 \u05D1\u05E4\u05E8\u05D8\u05D9\u05DD' : 'View Details'}: ${productTitle}`}>
                          <span className="group-hover/btn:scale-105 transition-transform inline-block">{currentLanguage === 'he' ? '\u05E6\u05E4\u05D9\u05D9\u05D4 \u05D1\u05DE\u05D5\u05E6\u05E8' : 'View Product'}</span>
                        </Button></Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {totalPages > 1 && (
              <nav className="flex items-center justify-center gap-2 mt-12 mb-6" aria-label="Pagination">
                <button onClick={() => { setCurrentPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }} disabled={currentPage === 1} className="h-11 px-4 rounded-xl border border-[#E6E0D8] dark:border-white/10 text-sm font-bold text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white dark:hover:bg-[#111318] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] shadow-sm flex items-center" aria-label={currentLanguage === 'he' ? '\u05E2\u05DE\u05D5\u05D3 \u05E7\u05D5\u05D3\u05DD' : 'Previous page'}>{currentLanguage === 'he' ? '\u2190 \u05D4\u05E7\u05D5\u05D3\u05DD' : '\u2190 Prev'}</button>
                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (<button key={page} onClick={() => { setCurrentPage(page); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={`w-11 h-11 rounded-xl text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] shadow-sm flex items-center justify-center ${page === currentPage ? 'bg-gradient-to-r from-[#D4AF37] to-[#B5912B] text-white border-transparent' : 'bg-white dark:bg-[#111318] border border-[#E6E0D8] dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-[#D4AF37] hover:text-[#D4AF37]'}`} aria-label={`${currentLanguage === 'he' ? '\u05E2\u05DE\u05D5\u05D3' : 'Page'} ${page}`} aria-current={page === currentPage ? 'page' : undefined}>{page}</button>))}
                </div>
                <button onClick={() => { setCurrentPage(p => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }} disabled={currentPage === totalPages} className="h-11 px-4 rounded-xl border border-[#E6E0D8] dark:border-white/10 text-sm font-bold text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white dark:hover:bg-[#111318] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] shadow-sm flex items-center" aria-label={currentLanguage === 'he' ? '\u05E2\u05DE\u05D5\u05D3 \u05D4\u05D1\u05D0' : 'Next page'}>{currentLanguage === 'he' ? '\u05D4\u05D1\u05D0 \u2192' : 'Next \u2192'}</button>
              </nav>
            )}
            <div className="text-center text-sm font-medium text-slate-500 dark:text-slate-400 mb-10">{currentLanguage === 'he' ? `\u05DE\u05E6\u05D9\u05D2 ${(currentPage - 1) * PRODUCTS_PER_PAGE + 1}-${Math.min(currentPage * PRODUCTS_PER_PAGE, sortedProducts.length)} \u05DE\u05EA\u05D5\u05DA ${sortedProducts.length} \u05DE\u05D5\u05E6\u05E8\u05D9\u05DD` : `Showing ${(currentPage - 1) * PRODUCTS_PER_PAGE + 1}-${Math.min(currentPage * PRODUCTS_PER_PAGE, sortedProducts.length)} of ${sortedProducts.length} products`}</div>

            {variantModalProduct && (<ProductVariantModal product={variantModalProduct} isOpen={!!variantModalProduct} onClose={() => setVariantModalProduct(null)} />)}

            {filteredProducts.length === 0 && (
              <div className="text-center py-20 bg-white dark:bg-[#111318] rounded-3xl border border-[#E6E0D8] dark:border-white/5 shadow-sm" data-testid="text-no-results" role="status"><div className="text-6xl mb-6 opacity-40" aria-hidden="true">&#128269;</div><h3 className={`text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4 ${currentLanguage === 'he' ? 'font-hebrew' : 'font-serif'}`}>{currentLanguage === 'he' ? '\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D5 \u05EA\u05D5\u05E6\u05D0\u05D5\u05EA' : currentLanguage === 'en' ? 'No results found' : '\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D5 \u05EA\u05D5\u05E6\u05D0\u05D5\u05EA'}</h3><p className="text-slate-600 dark:text-slate-400 mb-8 font-light text-lg">{currentLanguage === 'he' ? '\u05E0\u05E1\u05D5 \u05DC\u05E9\u05E0\u05D5\u05EA \u05D0\u05EA \u05DE\u05E1\u05E0\u05E0\u05D9 \u05D4\u05D7\u05D9\u05E4\u05D5\u05E9' : currentLanguage === 'en' ? 'Try changing the search filters' : '\u05E0\u05E1\u05D5 \u05DC\u05E9\u05E0\u05D5\u05EA \u05D0\u05EA \u05DE\u05E1\u05E0\u05E0\u05D9 \u05D4\u05D7\u05D9\u05E4\u05D5\u05E9'}</p><Button onClick={clearAllFilters} className="bg-gradient-to-r from-[#D4AF37] to-[#B5912B] hover:from-[#B5912B] hover:to-[#9E7A1C] text-white px-8 py-4 rounded-xl font-bold shadow-md hover:-translate-y-0.5 transition-all text-base focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#D4AF37]" data-testid="button-clear-filters-no-results">{currentLanguage === 'he' ? '\u05E0\u05E7\u05D4 \u05D0\u05EA \u05DB\u05DC \u05D4\u05DE\u05E1\u05E0\u05E0\u05D9\u05DD' : currentLanguage === 'en' ? 'Clear all filters' : '\u05E0\u05E7\u05D4 \u05D0\u05EA \u05DB\u05DC \u05D4\u05DE\u05E1\u05E0\u05E0\u05D9\u05DD'}</Button>
                {/* Task 21: Smart suggestions - show popular products */}
                {(() => { const popular = allProducts.filter(p => p.isFeatured).slice(0, 4); if (popular.length === 0) return null; return (
                  <div className="mt-16 pt-16 border-t border-[#E6E0D8] dark:border-white/5 max-w-5xl mx-auto px-6">
                    <h4 className={`text-2xl font-bold text-slate-900 dark:text-white mb-8 ${currentLanguage === 'he' ? 'font-hebrew' : 'font-serif'}`}>{currentLanguage === 'he' ? 'ספרים פופולריים שאולי תאהבו' : 'Popular books you might like'}</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left rtl:text-right">
                      {popular.map(p => (
                        <Link key={p.id} href={`/product/${p.id}`} className="bg-[#F9F8F6] dark:bg-[#0A0A0B] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#E6E0D8] dark:border-white/5 cursor-pointer block group hover:-translate-y-1">
                          {p.images?.[0] ? (<img src={convertImagePath(p.images[0])} alt={getInterfaceDisplayTitle(p, currentLanguage)} className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />) : (<div className="w-full aspect-square bg-slate-100 flex items-center justify-center"><span className="text-4xl opacity-20">&#128214;</span></div>)}
                          <div className="p-4"><h5 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 mb-2 group-hover:text-[#D4AF37] transition-colors">{getInterfaceDisplayTitle(p, currentLanguage)}</h5>{p.variants?.[0] && <p className="text-sm text-[#D4AF37] dark:text-[#E8C34E] font-black">{p.variants[0].price} ₪</p>}</div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ); })()}
              </div>
            )}

            <div className="bg-gradient-to-r from-[#050505] to-[#1A1C23] border border-white/10 rounded-3xl p-10 md:p-14 text-center shadow-2xl mt-16 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('/images/jerusalem-skyline.svg')] bg-cover bg-center opacity-5 pointer-events-none" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-[80px] pointer-events-none" />
              
              <div className="relative z-10">
                <p className="text-2xl text-slate-300 mb-8 font-light" data-testid="text-contact-message">{currentLanguage === 'he' ? '\u05DE\u05D7\u05E4\u05E9\u05D9\u05DD \u05E1\u05E4\u05E8 \u05E0\u05D5\u05E1\u05E3? \u05E6\u05E8\u05D5 \u05E7\u05E9\u05E8 \u05D5\u05E0\u05DE\u05E6\u05D0 \u05E2\u05D1\u05D5\u05E8\u05DB\u05DD!' : 'Looking for another book? Contact us and we\'ll find it for you!'}</p>
                <Link href="/contact"><Button className="bg-gradient-to-r from-[#D4AF37] to-[#B5912B] hover:from-[#B5912B] hover:to-[#9E7A1C] text-white px-8 h-14 rounded-xl font-bold shadow-[0_4px_14px_rgba(212,175,55,0.4)] hover:-translate-y-1 transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0B] focus-visible:ring-[#D4AF37]" data-testid="button-contact">{currentLanguage === 'he' ? '\u05E6\u05E8\u05D5 \u05E7\u05E9\u05E8 \u05DC\u05E4\u05E8\u05D8\u05D9\u05DD \u05E0\u05D5\u05E1\u05E4\u05D9\u05DD' : 'Contact us for more details'}</Button></Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
