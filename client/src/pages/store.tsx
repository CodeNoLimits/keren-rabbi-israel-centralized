import { useState, useMemo, useEffect } from 'react';
import { Link } from 'wouter';
import { realBreslovProducts } from '../data/realProducts';
import { Header } from '../components/Header';
import { useLanguage } from '../contexts/LanguageContext';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, X, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { convertImagePath } from '../utils/imagePathHelper';
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

export default function Store() {
  const { currentLanguage, setLanguage } = useLanguage();
  const allProducts = Object.values(realBreslovProducts);
  
  // Filter states
  const [filters, setFilters] = useState<Filters>({
    categories: [],
    formats: [],
    sizes: [],
    priceRange: [0, 1000], // Will be updated by useEffect to real range
    searchQuery: '',
    languages: []
  });
  
  // Sidebar visibility and collapsible sections
  const [sidebarVisible, setSidebarVisible] = useState(true);
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
      // Search query filter
      if (filters.searchQuery && !product.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) 
          && !product.description?.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
        return false;
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
  }, [allProducts, filters]);
  
  console.log('✅ STORE: Loading', allProducts.length, 'books, filtered to', filteredProducts.length);
  
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
        {/* Clean Simple Sidebar */}
        <div className={`${sidebarVisible ? 'w-80' : 'w-0'} transition-all duration-200 overflow-hidden`}>
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
                          {category}
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div 
                  key={product.id} 
                  className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow border border-gray-200"
                  data-testid={`card-product-${product.id}`}
                >
                  
                  {/* Image */}
                  <Link href={`/product/${product.id}`}>
                    {product.images && product.images.length > 0 ? (
                      <img 
                        src={convertImagePath(product.images[0])}
                        alt={product.name}
                        className="w-full h-48 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                        data-testid={`img-product-${product.id}`}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div 
                        className="w-full h-48 bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"
                        data-testid={`placeholder-product-${product.id}`}
                      >
                        <span className="text-2xl">📖</span>
                      </div>
                    )}
                  </Link>
                  
                  {/* Content */}
                  <div className="p-4">
                    <Link href={`/product/${product.id}`}>
                      <h3 
                        className="font-semibold text-lg mb-2 text-gray-900 line-clamp-2 cursor-pointer hover:text-blue-600 transition-colors"
                        data-testid={`text-title-${product.id}`}
                      >
                        {product.name}
                      </h3>
                    </Link>
                    
                    <div 
                      className="text-lg font-bold text-blue-600 mb-2"
                      data-testid={`text-price-${product.id}`}
                    >
                      {product.variants && product.variants.length > 0 ? 
                        `${Math.min(...product.variants.map(v => v.price))} ₪ – ${Math.max(...product.variants.map(v => v.price))} ₪` : 
                        'מחיר לא זמין'
                      }
                    </div>
                    
                    <div 
                      className="text-sm text-gray-600 mb-4"
                      data-testid={`text-category-${product.id}`}
                    >
                      {product.category}
                    </div>
                    
                    <Link href={`/product/${product.id}`}>
                      <Button 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        data-testid={`button-view-details-${product.id}`}
                      >
                        {currentLanguage === 'he' ? 'צפייה בפרטים' :
                         currentLanguage === 'en' ? 'View Details' :
                         currentLanguage === 'fr' ? 'Voir Détails' :
                         currentLanguage === 'es' ? 'Ver Detalles' :
                         currentLanguage === 'ru' ? 'Посмотреть Детали' : 'צפייה בפרטים'}
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
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