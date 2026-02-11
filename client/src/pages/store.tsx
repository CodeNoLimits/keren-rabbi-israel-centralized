import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { Link } from 'wouter';
import { realBreslovProducts } from '../data/realProducts';
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

// Filter interfaces
interface Filters {
  categories: string[];
  formats: string[];
  sizes: string[];
  priceRange: [number, number];
  searchQuery: string;
  languages: string[];
}

// Quick add labels per language
const quickAddLabels: Record<string, string> = {
  he: '\u05D4\u05D5\u05E1\u05E3 \u05DE\u05D4\u05D9\u05E8',
  en: 'Quick Add',
  fr: 'Ajout rapide',
  es: 'A\u00F1adir r\u00E1pido',
  ru: '\u0411\u044B\u0441\u0442\u0440\u043E \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C',
};

export default function Store() {
  const { currentLanguage, setLanguage } = useLanguage();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addItem, setIsCartOpen } = useCart();
  const allProducts = Object.values(realBreslovProducts);
  const quickAddTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Variant modal state
  const [variantModalProduct, setVariantModalProduct] = useState<Product | null>(null);

  // Quick add handler: adds default (first) variant, qty 1, opens cart briefly
  const handleQuickAdd = useCallback((product: Product) => {
    const defaultVariant = product.variants?.[0];
    if (!defaultVariant) return;

    addItem({
      productId: product.id,
      variantId: defaultVariant.id,
      name: product.name,
      nameEnglish: product.nameEnglish || product.name,
      image: product.images?.[0] || '',
      price: defaultVariant.price,
      quantity: 1,
      variant: {
        format: defaultVariant.format || '',
        binding: defaultVariant.binding || '',
        size: defaultVariant.size || '',
      },
    });

    // Open the cart
    setIsCartOpen(true);

    // Auto-close after 2 seconds
    if (quickAddTimerRef.current) clearTimeout(quickAddTimerRef.current);
    quickAddTimerRef.current = setTimeout(() => {
      setIsCartOpen(false);
    }, 2000);
  }, [addItem, setIsCartOpen]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (quickAddTimerRef.current) clearTimeout(quickAddTimerRef.current);
    };
  }, []);

  // Filter states
  const [filters, setFilters] = useState<Filters>({
    categories: [],
    formats: [],
    sizes: [],
    priceRange: [0, 1000], // Will be updated by useEffect to real range
    searchQuery: '',
    languages: []
  });
  
  // Sort state
  const [sortBy, setSortBy] = useState<string>('default');

  // Pagination state
  const PRODUCTS_PER_PAGE = 12;
  const [currentPage, setCurrentPage] = useState(1);

  // Sidebar visibility and collapsible sections
  // Default to hidden on mobile (< 768px)
  const [sidebarVisible, setSidebarVisible] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 768;
    }
    return true;
  });
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    languages: true,
    sizes: true,
    formats: true,
    price: true
  });
  
  // Extract unique filter options from products
  const filterOptions = useMemo(() => {
    const categories = new Set<string>();
    const formats = new Set<string>();
    const sizes = new Set<string>();
    const languages = new Set<string>();
    let minPrice = Infinity;
    let maxPrice = 0;
    
    allProducts.forEach(product => {
      categories.add(product.category);
      if (product.language) languages.add(product.language);
      
      product.variants?.forEach(variant => {
        if (variant.format) formats.add(variant.format);
        if (variant.size) sizes.add(variant.size);
        if (variant.price) {
          minPrice = Math.min(minPrice, variant.price);
          maxPrice = Math.max(maxPrice, variant.price);
        }
      });
    });
    
    return {
      categories: Array.from(categories).sort(),
      formats: Array.from(formats).sort(),
      sizes: Array.from(sizes).sort(),
      languages: Array.from(languages).sort(),
      priceRange: [Math.floor(minPrice), Math.ceil(maxPrice)] as [number, number]
    };
  }, [allProducts]);
  
  // Sync initial price range with calculated filterOptions
  useEffect(() => {
    if (filterOptions.priceRange[0] !== Infinity) {
      setFilters(prev => ({
        ...prev,
        priceRange: filterOptions.priceRange
      }));
    }
  }, [filterOptions.priceRange]);
  
  // Filtered products
  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      // Search query filter - search across all language variants of name and description
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        const translatedName = getInterfaceDisplayTitle(product, currentLanguage).toLowerCase();
        const nameMatch = product.name.toLowerCase().includes(q) ||
          translatedName.includes(q) ||
          (product.nameEnglish || '').toLowerCase().includes(q) ||
          (product.nameFrench || '').toLowerCase().includes(q) ||
          ((product as any).nameSpanish || '').toLowerCase().includes(q) ||
          ((product as any).nameRussian || '').toLowerCase().includes(q);
        const descMatch = (product.description || '').toLowerCase().includes(q) ||
          (product.descriptionEnglish || '').toLowerCase().includes(q);
        const catMatch = product.category.toLowerCase().includes(q);
        if (!nameMatch && !descMatch && !catMatch) return false;
      }
      
      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
        return false;
      }
      
      // Language filter
      if (filters.languages.length > 0 && !filters.languages.includes(product.language || '')) {
        return false;
      }
      
      // Format, size and price filters (check variants)
      const needsVariantCheck = filters.formats.length > 0 || filters.sizes.length > 0 || 
        (filters.priceRange[0] !== filterOptions.priceRange[0] || filters.priceRange[1] !== filterOptions.priceRange[1]);
      
      if (needsVariantCheck) {
        const hasMatchingVariant = product.variants?.some(variant => {
          const formatMatch = filters.formats.length === 0 || filters.formats.includes(variant.format || '');
          const sizeMatch = filters.sizes.length === 0 || filters.sizes.includes(variant.size || '');
          
          // Price match: only apply if price range differs from full range AND variant has price
          const priceRangeActive = filters.priceRange[0] !== filterOptions.priceRange[0] || filters.priceRange[1] !== filterOptions.priceRange[1];
          const priceMatch = !priceRangeActive || (variant.price !== undefined && variant.price >= filters.priceRange[0] && variant.price <= filters.priceRange[1]);
          
          return formatMatch && sizeMatch && priceMatch;
        });
        
        if (!hasMatchingVariant) return false;
      }
      
      return true;
    });
  }, [allProducts, filters, currentLanguage]);

  // Sorted products
  const sortedProducts = useMemo(() => {
    const products = [...filteredProducts];
    switch (sortBy) {
      case 'price-asc':
        return products.sort((a, b) => {
          const aMin = a.variants?.length ? Math.min(...a.variants.map(v => v.price)) : 0;
          const bMin = b.variants?.length ? Math.min(...b.variants.map(v => v.price)) : 0;
          return aMin - bMin;
        });
      case 'price-desc':
        return products.sort((a, b) => {
          const aMax = a.variants?.length ? Math.max(...a.variants.map(v => v.price)) : 0;
          const bMax = b.variants?.length ? Math.max(...b.variants.map(v => v.price)) : 0;
          return bMax - aMax;
        });
      case 'name-az':
        return products.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-za':
        return products.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return products;
    }
  }, [filteredProducts, sortBy]);

  // Reset page when filters/sort change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortBy]);

  // Paginated products
  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return sortedProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [sortedProducts, currentPage]);

  const toggleFilter = <T,>(key: keyof Filters, value: T) => {
    setFilters(prev => {
      const current = prev[key] as T[];
      const newValue = current.includes(value) 
        ? current.filter(item => item !== value)
        : [...current, value];
      return { ...prev, [key]: newValue };
    });
  };
  
  const clearAllFilters = () => {
    setFilters({
      categories: [],
      formats: [],
      sizes: [],
      priceRange: filterOptions.priceRange,
      searchQuery: '',
      languages: []
    });
  };
  
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div style={{direction: currentLanguage === 'he' ? 'rtl' : 'ltr'}}>
      <section style={{background: '#333', color: 'white', padding: '8px 0'}}>
        <div style={{maxWidth: '1400px', margin: '0 auto', padding: '0 2rem'}}>
          <span>משלוחים חינם החל מ- 399 ש"ח</span>
        </div>
      </section>

      <Header currentLanguage={currentLanguage} onLanguageChange={setLanguage} />

      <div className="flex min-h-screen bg-gray-50">
        {/* Mobile overlay backdrop */}
        {sidebarVisible && (
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setSidebarVisible(false)}
          />
        )}

        {/* Clean Simple Sidebar */}
        <div className={`
          ${sidebarVisible ? 'w-80' : 'w-0'}
          transition-all duration-200 overflow-hidden
          max-md:fixed max-md:inset-y-0 max-md:z-50
          ${sidebarVisible ? 'max-md:w-80' : 'max-md:w-0'}
          ${currentLanguage === 'he' ? 'max-md:right-0' : 'max-md:left-0'}
        `}>
          <div className="h-full bg-white shadow-lg border-r border-gray-200">
            {/* Simple Header */}
            <div className="bg-white p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800" data-testid="sidebar-title">
                  {currentLanguage === 'he' ? 'מסנני חיפוש' :
                   currentLanguage === 'en' ? 'Search Filters' :
                   currentLanguage === 'fr' ? 'Filtres de Recherche' :
                   currentLanguage === 'es' ? 'Filtros de Búsqueda' :
                   currentLanguage === 'ru' ? 'Фильтры Поиска' : 'מסנני חיפוש'}
                </h2>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={clearAllFilters}
                  className="text-sm"
                  data-testid="button-clear-filters"
                >
                  <X className="h-4 w-4 mr-1" />
                  {currentLanguage === 'he' ? 'נקה הכל' :
                   currentLanguage === 'en' ? 'Clear All' :
                   currentLanguage === 'fr' ? 'Tout Effacer' :
                   currentLanguage === 'es' ? 'Borrar Todo' :
                   currentLanguage === 'ru' ? 'Очистить Все' : 'נקה הכל'}
                </Button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder={currentLanguage === 'he' ? 'חיפוש ספרים...' :
                               currentLanguage === 'en' ? 'Search books...' :
                               currentLanguage === 'fr' ? 'Rechercher des livres...' :
                               currentLanguage === 'es' ? 'Buscar libros...' :
                               currentLanguage === 'ru' ? 'Поиск книг...' : 'חיפוש ספרים...'}
                  value={filters.searchQuery}
                  onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
                  className="pl-10 text-sm"
                  data-testid="input-search"
                />
              </div>
            </div>

            <div className="p-4 space-y-4 max-h-screen overflow-y-auto">
              {/* Price Filter */}
              <div className="bg-white border border-gray-200 rounded p-4">
                <div 
                  className="flex items-center justify-between cursor-pointer mb-3"
                  onClick={() => toggleSection('price')}
                  data-testid="label-price-range"
                >
                  <span className="text-sm font-medium text-gray-700">
                    {currentLanguage === 'he' ? 'טווח מחירים' :
                     currentLanguage === 'en' ? 'Price Range' :
                     currentLanguage === 'fr' ? 'Gamme de Prix' :
                     currentLanguage === 'es' ? 'Rango de Precio' :
                     currentLanguage === 'ru' ? 'Диапазон Цен' : 'טווח מחירים'}
                  </span>
                  {expandedSections.price ? <ChevronUp className="h-4 w-4 text-gray-500" /> : <ChevronDown className="h-4 w-4 text-gray-500" />}
                </div>
                {expandedSections.price && (
                  <div className="space-y-3">
                    <Slider
                      min={filterOptions.priceRange[0]}
                      max={filterOptions.priceRange[1]}
                      value={filters.priceRange}
                      onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value as [number, number] }))}
                      className="w-full"
                      data-testid="slider-price-range"
                    />
                    <div className="flex justify-between text-xs text-gray-600">
                      <span data-testid="text-price-min">{filters.priceRange[0]} ₪</span>
                      <span data-testid="text-price-max">{filters.priceRange[1]} ₪</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Languages Filter - PROMINENT POSITION */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded p-4">
                <div 
                  className="flex items-center justify-between cursor-pointer mb-3"
                  onClick={() => toggleSection('languages')}
                  data-testid="label-languages"
                >
                  <span className="text-sm font-semibold text-blue-800">
                    {currentLanguage === 'he' ? 'שפות' :
                     currentLanguage === 'en' ? 'Languages' :
                     currentLanguage === 'fr' ? 'Langues' :
                     currentLanguage === 'es' ? 'Idiomas' :
                     currentLanguage === 'ru' ? 'Языки' : 'שפות'}
                  </span>
                  {expandedSections.languages ? <ChevronUp className="h-4 w-4 text-blue-600" /> : <ChevronDown className="h-4 w-4 text-blue-600" />}
                </div>
                {expandedSections.languages && (
                  <div className="space-y-2">
                    {filterOptions.languages.map((language) => (
                      <div key={language} className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Checkbox
                          id={`language-${language}`}
                          checked={filters.languages.includes(language)}
                          onCheckedChange={() => toggleFilter('languages', language)}
                          className="border-blue-400 text-blue-600"
                          data-testid={`checkbox-language-${language}`}
                        />
                        <label 
                          htmlFor={`language-${language}`} 
                          className="text-sm cursor-pointer text-blue-700 font-medium"
                          data-testid={`text-language-${language}`}
                        >
                          {language}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Categories Filter */}
              <div className="bg-white border border-gray-200 rounded p-4">
                <div 
                  className="flex items-center justify-between cursor-pointer mb-3"
                  onClick={() => toggleSection('categories')}
                  data-testid="label-categories"
                >
                  <span className="text-sm font-medium text-gray-700">
                    {currentLanguage === 'he' ? 'קטגוריות' :
                     currentLanguage === 'en' ? 'Categories' :
                     currentLanguage === 'fr' ? 'Catégories' :
                     currentLanguage === 'es' ? 'Categorías' :
                     currentLanguage === 'ru' ? 'Категории' : 'קטגוריות'}
                  </span>
                  {expandedSections.categories ? <ChevronUp className="h-4 w-4 text-gray-500" /> : <ChevronDown className="h-4 w-4 text-gray-500" />}
                </div>
                {expandedSections.categories && (
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {filterOptions.categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Checkbox
                          id={`category-${category}`}
                          checked={filters.categories.includes(category)}
                          onCheckedChange={() => toggleFilter('categories', category)}
                          data-testid={`checkbox-category-${category}`}
                        />
                        <label
                          htmlFor={`category-${category}`}
                          className="text-xs cursor-pointer text-gray-700"
                          data-testid={`text-category-${category}`}
                        >
                          {getInterfaceCategoryName(category, currentLanguage)}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Sizes Filter */}
              <div className="bg-white border border-gray-200 rounded p-4">
                <div 
                  className="flex items-center justify-between cursor-pointer mb-3"
                  onClick={() => toggleSection('sizes')}
                  data-testid="label-sizes"
                >
                  <span className="text-sm font-medium text-gray-700">
                    {currentLanguage === 'he' ? 'גדלים' :
                     currentLanguage === 'en' ? 'Sizes' :
                     currentLanguage === 'fr' ? 'Tailles' :
                     currentLanguage === 'es' ? 'Tamaños' :
                     currentLanguage === 'ru' ? 'Размеры' : 'גדלים'}
                  </span>
                  {expandedSections.sizes ? <ChevronUp className="h-4 w-4 text-gray-500" /> : <ChevronDown className="h-4 w-4 text-gray-500" />}
                </div>
                {expandedSections.sizes && (
                  <div className="space-y-2">
                    {filterOptions.sizes.map((size) => (
                      <div key={size} className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Checkbox
                          id={`size-${size}`}
                          checked={filters.sizes.includes(size)}
                          onCheckedChange={() => toggleFilter('sizes', size)}
                          data-testid={`checkbox-size-${size}`}
                        />
                        <label 
                          htmlFor={`size-${size}`} 
                          className="text-xs cursor-pointer text-gray-700"
                          data-testid={`text-size-${size}`}
                        >
                          {size}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Formats Filter */}
              <div className="bg-white border border-gray-200 rounded p-4">
                <div 
                  className="flex items-center justify-between cursor-pointer mb-3"
                  onClick={() => toggleSection('formats')}
                  data-testid="label-formats"
                >
                  <span className="text-sm font-medium text-gray-700">
                    {currentLanguage === 'he' ? 'כריכות' :
                     currentLanguage === 'en' ? 'Bindings' :
                     currentLanguage === 'fr' ? 'Reliures' :
                     currentLanguage === 'es' ? 'Encuadernaciones' :
                     currentLanguage === 'ru' ? 'Переплеты' : 'כריכות'}
                  </span>
                  {expandedSections.formats ? <ChevronUp className="h-4 w-4 text-gray-500" /> : <ChevronDown className="h-4 w-4 text-gray-500" />}
                </div>
                {expandedSections.formats && (
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {filterOptions.formats.slice(0, 12).map((format) => (
                      <div key={format} className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Checkbox
                          id={`format-${format}`}
                          checked={filters.formats.includes(format)}
                          onCheckedChange={() => toggleFilter('formats', format)}
                          data-testid={`checkbox-format-${format}`}
                        />
                        <label 
                          htmlFor={`format-${format}`} 
                          className="text-xs cursor-pointer text-gray-700"
                          data-testid={`text-format-${format}`}
                        >
                          {format}
                        </label>
                      </div>
                    ))}
                    {filterOptions.formats.length > 12 && (
                      <div className="text-xs text-gray-500 pt-1" data-testid="text-more-formats">
                        ועוד {filterOptions.formats.length - 12} אפשרויות...
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <Button 
                  onClick={() => setSidebarVisible(!sidebarVisible)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  data-testid="button-toggle-sidebar"
                >
                  <Filter className="h-5 w-5" />
                </Button>
                <h1 className="text-3xl font-bold text-gray-900" data-testid="text-page-title">
                  {currentLanguage === 'he' ? 'ספרי ברסלב' :
                   currentLanguage === 'en' ? 'Breslov Books' :
                   currentLanguage === 'fr' ? 'Livres Breslov' :
                   currentLanguage === 'es' ? 'Libros Breslov' :
                   currentLanguage === 'ru' ? 'Книги Бреслов' : 'ספרי ברסלב'}
                </h1>
              </div>
              <div className="bg-white px-4 py-2 rounded border border-gray-200" data-testid="text-results-count">
                <span className="text-sm text-gray-600">
                  {currentLanguage === 'he' ?
                    <>נמצאו <span className="font-semibold text-blue-600">{filteredProducts.length}</span> מתוך <span className="font-semibold">{allProducts.length}</span> ספרים</> :
                   currentLanguage === 'en' ?
                    <>Found <span className="font-semibold text-blue-600">{filteredProducts.length}</span> out of <span className="font-semibold">{allProducts.length}</span> books</> :
                   currentLanguage === 'fr' ?
                    <>Trouvé <span className="font-semibold text-blue-600">{filteredProducts.length}</span> sur <span className="font-semibold">{allProducts.length}</span> livres</> :
                   currentLanguage === 'es' ?
                    <>Encontrado <span className="font-semibold text-blue-600">{filteredProducts.length}</span> de <span className="font-semibold">{allProducts.length}</span> libros</> :
                   currentLanguage === 'ru' ?
                    <>Найдено <span className="font-semibold text-blue-600">{filteredProducts.length}</span> из <span className="font-semibold">{allProducts.length}</span> книг</> :
                    <>נמצאו <span className="font-semibold text-blue-600">{filteredProducts.length}</span> מתוך <span className="font-semibold">{allProducts.length}</span> ספרים</>}
                </span>
              </div>
              {/* Sort dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-gray-200 rounded px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                data-testid="select-sort"
              >
                <option value="default">{currentLanguage === 'he' ? 'מיון: ברירת מחדל' : currentLanguage === 'fr' ? 'Tri: par défaut' : 'Sort: Default'}</option>
                <option value="price-asc">{currentLanguage === 'he' ? 'מחיר: נמוך לגבוה' : currentLanguage === 'fr' ? 'Prix: croissant' : 'Price: Low to High'}</option>
                <option value="price-desc">{currentLanguage === 'he' ? 'מחיר: גבוה לנמוך' : currentLanguage === 'fr' ? 'Prix: décroissant' : 'Price: High to Low'}</option>
                <option value="name-az">{currentLanguage === 'he' ? 'שם: א-ת' : currentLanguage === 'fr' ? 'Nom: A-Z' : 'Name: A-Z'}</option>
                <option value="name-za">{currentLanguage === 'he' ? 'שם: ת-א' : currentLanguage === 'fr' ? 'Nom: Z-A' : 'Name: Z-A'}</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedProducts.map((product) => {
                const liked = isFavorite(product.id);
                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg overflow-hidden shadow hover:shadow-xl hover:-translate-y-1 transition-all duration-200 border border-gray-200 group relative"
                    data-testid={`card-product-${product.id}`}
                  >

                    {/* Badges - Sale / Bestseller */}
                    <div className={`absolute top-3 z-10 flex flex-col gap-1 ${currentLanguage === 'he' ? 'right-3' : 'left-3'}`}>
                      {product.variants?.some(v => v.originalPrice && v.originalPrice > v.price) && (
                        <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                          {currentLanguage === 'he' ? 'מבצע' : currentLanguage === 'fr' ? 'Promo' : 'Sale'}
                        </span>
                      )}
                      {product.isFeatured && (
                        <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                          {currentLanguage === 'he' ? 'מומלץ' : currentLanguage === 'fr' ? 'Populaire' : 'Popular'}
                        </span>
                      )}
                    </div>

                    {/* Favorite Heart Button - top-right corner overlay */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleFavorite(product.id);
                      }}
                      className={`
                        absolute top-3 z-10 p-2 rounded-full shadow-md
                        transition-all duration-200 hover:scale-110 active:scale-90
                        ${currentLanguage === 'he' ? 'left-3' : 'right-3'}
                        ${liked
                          ? 'bg-red-500 text-white hover:bg-red-600'
                          : 'bg-white/90 text-gray-400 hover:text-red-500 hover:bg-white'}
                      `}
                      data-testid={`button-favorite-${product.id}`}
                      aria-label={liked ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <Heart
                        className="h-4 w-4"
                        fill={liked ? 'currentColor' : 'none'}
                        strokeWidth={liked ? 0 : 2}
                      />
                    </button>

                    {/* Image with hover effect */}
                    <Link href={`/product/${product.id}`}>
                      {product.images && product.images.length > 0 ? (
                        <div className="relative w-full aspect-square overflow-hidden cursor-pointer">
                          {/* Primary image (default) */}
                          <img loading="lazy"
                            decoding="async"
                            width="300"
                            height="300"
                            src={convertImagePath(product.images[0])}
                            alt={getInterfaceDisplayTitle(product, currentLanguage)}
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
                              product.images.length > 1 ? 'group-hover:opacity-0' : 'hover:opacity-90'
                            }`}
                            data-testid={`img-product-${product.id}`}
                            onError={(e) => {
                              const parent = e.currentTarget.parentElement;
                              if (parent) {
                                parent.innerHTML = `<div class="w-full h-full bg-gray-100 flex flex-col items-center justify-center gap-2 text-gray-400"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg><span class="text-xs text-gray-500 px-2 text-center line-clamp-2">${e.currentTarget.alt}</span></div>`;
                              }
                            }}
                          />
                          {/* Secondary image (shown on hover) */}
                          {product.images.length > 1 && (
                            <img loading="lazy"
                              decoding="async"
                              width="300"
                              height="300"
                              src={convertImagePath(product.images[1])}
                              alt={`${getInterfaceDisplayTitle(product, currentLanguage)} - 2`}
                              className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
                              data-testid={`img-product-hover-${product.id}`}
                              onError={(e) => {
                                e.currentTarget.remove();
                              }}
                            />
                          )}
                          {/* Quick Add Button - fades in on card hover */}
                          {product.variants && product.variants.length > 0 && (
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleQuickAdd(product as Product);
                              }}
                              className="absolute bottom-2 left-2 right-2 z-20
                                opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0
                                transition-all duration-300 ease-out
                                bg-orange-500 hover:bg-orange-600 active:bg-orange-700
                                text-white font-semibold text-sm
                                py-2 px-3 rounded-lg shadow-lg
                                flex items-center justify-center gap-1.5"
                              data-testid={`button-quick-add-${product.id}`}
                              aria-label={quickAddLabels[currentLanguage] || quickAddLabels.he}
                            >
                              <Plus size={16} strokeWidth={3} />
                              <span>{quickAddLabels[currentLanguage] || quickAddLabels.he}</span>
                            </button>
                          )}
                        </div>
                      ) : (
                        <div
                          className="w-full aspect-square bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors relative"
                          data-testid={`placeholder-product-${product.id}`}
                        >
                          <span className="text-2xl">&#128214;</span>
                          {/* Quick Add Button for placeholder images */}
                          {product.variants && product.variants.length > 0 && (
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleQuickAdd(product as Product);
                              }}
                              className="absolute bottom-2 left-2 right-2 z-20
                                opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0
                                transition-all duration-300 ease-out
                                bg-orange-500 hover:bg-orange-600 active:bg-orange-700
                                text-white font-semibold text-sm
                                py-2 px-3 rounded-lg shadow-lg
                                flex items-center justify-center gap-1.5"
                              data-testid={`button-quick-add-placeholder-${product.id}`}
                              aria-label={quickAddLabels[currentLanguage] || quickAddLabels.he}
                            >
                              <Plus size={16} strokeWidth={3} />
                              <span>{quickAddLabels[currentLanguage] || quickAddLabels.he}</span>
                            </button>
                          )}
                        </div>
                      )}
                    </Link>

                    {/* Content */}
                    <div className="p-3">
                      <Link href={`/product/${product.id}`}>
                        <h3
                          className="font-semibold text-sm mb-1 text-gray-900 line-clamp-1 cursor-pointer hover:text-blue-600 transition-colors"
                          data-testid={`text-title-${product.id}`}
                        >
                          {getInterfaceDisplayTitle(product, currentLanguage)}
                        </h3>
                      </Link>

                      <div
                        className="text-sm font-bold text-blue-600 mb-1"
                        data-testid={`text-price-${product.id}`}
                      >
                        {product.variants && product.variants.length > 0 ? (() => {
                          const minPrice = Math.min(...product.variants.map(v => v.price));
                          const maxPrice = Math.max(...product.variants.map(v => v.price));
                          const fromLabel = currentLanguage === 'he' ? 'החל מ-' : currentLanguage === 'fr' ? 'À partir de ' : currentLanguage === 'es' ? 'Desde ' : currentLanguage === 'ru' ? 'От ' : 'From ';
                          if (minPrice === maxPrice) return `${minPrice} ₪`;
                          return <>{fromLabel}<span className="text-lg">{minPrice} ₪</span></>;
                        })() :
                          currentLanguage === 'he' ? 'מחיר לא זמין' : 'Price unavailable'
                        }
                      </div>

                      <div
                        className="flex items-center justify-between text-xs text-gray-600 mb-2"
                        data-testid={`text-category-${product.id}`}
                      >
                        <span>{getInterfaceCategoryName(product.category, currentLanguage)}</span>
                        {product.variants && product.variants.length > 1 && (
                          <span className="bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded text-[10px] font-medium">
                            {product.variants.length} {currentLanguage === 'he' ? 'אפשרויות' : 'options'}
                          </span>
                        )}
                      </div>

                      {/* Two buttons: View Details + Add to Cart */}
                      <div className="flex gap-2">
                        <Link href={`/product/${product.id}`} className="flex-1">
                          <Button
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm"
                            data-testid={`button-view-details-${product.id}`}
                          >
                            {currentLanguage === 'he' ? '\u05E6\u05E4\u05D9\u05D9\u05D4 \u05D1\u05E4\u05E8\u05D8\u05D9\u05DD' :
                             currentLanguage === 'en' ? 'View Details' :
                             currentLanguage === 'fr' ? 'Voir' :
                             currentLanguage === 'es' ? 'Ver' :
                             currentLanguage === 'ru' ? '\u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435' : '\u05E6\u05E4\u05D9\u05D9\u05D4 \u05D1\u05E4\u05E8\u05D8\u05D9\u05DD'}
                          </Button>
                        </Link>
                        <Button
                          className="bg-red-600 hover:bg-red-700 text-white px-3"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setVariantModalProduct(product as Product);
                          }}
                          data-testid={`button-add-to-cart-${product.id}`}
                          aria-label={currentLanguage === 'he' ? '\u05D4\u05D5\u05E1\u05E3 \u05DC\u05E1\u05DC' : 'Add to cart'}
                        >
                          <ShoppingCart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8 mb-4">
                <button
                  onClick={() => { setCurrentPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  disabled={currentPage === 1}
                  className="px-3 py-2 rounded-lg border border-gray-300 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  {currentLanguage === 'he' ? '← הקודם' : '← Prev'}
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => { setCurrentPage(page); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                      page === currentPage
                        ? 'bg-blue-600 text-white'
                        : 'border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => { setCurrentPage(p => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 rounded-lg border border-gray-300 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  {currentLanguage === 'he' ? 'הבא →' : 'Next →'}
                </button>
              </div>
            )}
            <div className="text-center text-sm text-gray-500 mb-6">
              {currentLanguage === 'he'
                ? `מציג ${(currentPage - 1) * PRODUCTS_PER_PAGE + 1}-${Math.min(currentPage * PRODUCTS_PER_PAGE, sortedProducts.length)} מתוך ${sortedProducts.length} מוצרים`
                : `Showing ${(currentPage - 1) * PRODUCTS_PER_PAGE + 1}-${Math.min(currentPage * PRODUCTS_PER_PAGE, sortedProducts.length)} of ${sortedProducts.length} products`
              }
            </div>

            {/* Product Variant Selection Modal */}
            {variantModalProduct && (
              <ProductVariantModal
                product={variantModalProduct}
                isOpen={!!variantModalProduct}
                onClose={() => setVariantModalProduct(null)}
              />
            )}
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-12" data-testid="text-no-results">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {currentLanguage === 'he' ? 'לא נמצאו תוצאות' :
                   currentLanguage === 'en' ? 'No results found' :
                   currentLanguage === 'fr' ? 'Aucun résultat trouvé' :
                   currentLanguage === 'es' ? 'No se encontraron resultados' :
                   currentLanguage === 'ru' ? 'Результатов не найдено' : 'לא נמצאו תוצאות'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {currentLanguage === 'he' ? 'נסו לשנות את מסנני החיפוש' :
                   currentLanguage === 'en' ? 'Try changing the search filters' :
                   currentLanguage === 'fr' ? 'Essayez de modifier les filtres de recherche' :
                   currentLanguage === 'es' ? 'Intente cambiar los filtros de búsqueda' :
                   currentLanguage === 'ru' ? 'Попробуйте изменить фильтры поиска' : 'נסו לשנות את מסנני החיפוש'}
                </p>
                <Button onClick={clearAllFilters} data-testid="button-clear-filters-no-results">
                  {currentLanguage === 'he' ? 'נקה את כל המסננים' :
                   currentLanguage === 'en' ? 'Clear all filters' :
                   currentLanguage === 'fr' ? 'Effacer tous les filtres' :
                   currentLanguage === 'es' ? 'Borrar todos los filtros' :
                   currentLanguage === 'ru' ? 'Очистить все фильтры' : 'נקה את כל המסננים'}
                </Button>
              </div>
            )}
            
            <div className="bg-white rounded-lg p-8 text-center shadow border border-gray-200 mt-12">
              <p className="text-lg text-gray-700 mb-4" data-testid="text-contact-message">
                {currentLanguage === 'he' ? 'מחפשים ספר נוסף? צרו קשר ונמצא עבורכם!' :
                 currentLanguage === 'en' ? 'Looking for another book? Contact us and we\'ll find it for you!' :
                 currentLanguage === 'fr' ? 'Vous cherchez un autre livre? Contactez-nous et nous le trouverons pour vous!' :
                 currentLanguage === 'es' ? '¿Busca otro libro? ¡Contáctenos y lo encontraremos para usted!' :
                 currentLanguage === 'ru' ? 'Ищете другую книгу? Свяжитесь с нами, и мы найдем ее для вас!' : 'מחפשים ספר נוסף? צרו קשר ונמצא עבורכם!'}
              </p>
              <Link href="/contact">
                <Button className="bg-green-600 hover:bg-green-700 text-white" data-testid="button-contact">
                  {currentLanguage === 'he' ? 'צרו קשר לפרטים נוספים' :
                   currentLanguage === 'en' ? 'Contact us for more details' :
                   currentLanguage === 'fr' ? 'Contactez-nous pour plus de détails' :
                   currentLanguage === 'es' ? 'Contáctenos para más detalles' :
                   currentLanguage === 'ru' ? 'Свяжитесь с нами для получения подробностей' : 'צרו קשר לפרטים נוספים'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}