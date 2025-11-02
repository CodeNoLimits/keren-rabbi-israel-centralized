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
import { getInterfaceDisplayTitle } from '../utils/bookTitleHelper';
import type { Product } from '../../../shared/schema';

// Filter interfaces
interface Filters {
  categories: string[];
  formats: string[];
  sizes: string[];
  priceRange: [number, number];
  searchQuery: string;
  languages: string[];
  authors: string[];
}

export default function Store() {
  const { currentLanguage, setLanguage, t } = useLanguage();
  const allProducts = Object.values(realBreslovProducts);
  
  // Force re-render on mount to fix reload issue
  const [, forceUpdate] = useState(0);
  useEffect(() => {
    forceUpdate(1);
  }, []);

  // Helper function to normalize language names for filtering
  // Also handles bilingual books (e.g., "עברית וצרפתית")
  const normalizeLanguage = (lang: string | undefined): string => {
    if (!lang) return '';
    const langLower = lang.toLowerCase();
    
    // Check for French (including bilingual books)
    if (langLower.includes('français') || langLower.includes('french') || langLower.includes('צרפתית')) {
      return 'Français';
    }
    // Check for Hebrew (including bilingual books)
    if (langLower.includes('hebrew') || langLower.includes('עברית')) {
      return 'עברית';
    }
    // Check for English (including bilingual books)
    if (langLower.includes('english') || langLower.includes('אנגלית')) {
      return 'English';
    }
    // Check for Russian
    if (langLower.includes('russian') || langLower.includes('רוסית')) {
      return 'Russian';
    }
    // Check for Spanish
    if (langLower.includes('spanish') || langLower.includes('español') || langLower.includes('ספרדית')) {
      return 'Spanish';
    }
    return lang;
  };
  
  // Filter states
  const [filters, setFilters] = useState<Filters>({
    categories: [],
    formats: [],
    sizes: [],
    priceRange: [0, 1000], // Will be updated by useEffect to real range
    searchQuery: '',
    languages: [],
    authors: []
  });
  
  // Sidebar visibility and collapsible sections
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    languages: true,
    sizes: true,
    formats: true,
    price: true,
    authors: true
  });
  
  // Extract unique filter options from products
  const filterOptions = useMemo(() => {
    const categories = new Set<string>();
    const formats = new Set<string>();
    const sizes = new Set<string>();
    const languages = new Set<string>();
    const authors = new Set<string>();
    let minPrice = Infinity;
    let maxPrice = 0;
    
    allProducts.forEach(product => {
      categories.add(product.category);
      if (product.language) {
        // Normalize language to standard form
        const normalizedLang = normalizeLanguage(product.language);
        languages.add(normalizedLang);
      }
      if (product.author) authors.add(product.author);
      
      product.variants?.forEach(variant => {
        if (variant.format) formats.add(variant.format);
        if (variant.size) sizes.add(variant.size);
        if (variant.price) {
          minPrice = Math.min(minPrice, variant.price);
          maxPrice = Math.max(maxPrice, variant.price);
        }
      });
    });
    
    // Grouper auteurs par catégories principales
    const authorGroups: Record<string, string[]> = {
      'רבי נחמן מברסלב': [],
      'רבי נתן מברסלב': [],
      'אחרים': []
    };
    
    authors.forEach(author => {
      if (author.includes('נחמן') || author.includes('מוהר"ן') || author.includes('רבינו')) {
        if (!authorGroups['רבי נחמן מברסלב'].includes(author)) {
          authorGroups['רבי נחמן מברסלב'].push(author);
        }
      } else if (author.includes('נתן')) {
        if (!authorGroups['רבי נתן מברסלב'].includes(author)) {
          authorGroups['רבי נתן מברסלב'].push(author);
        }
      } else {
        if (!authorGroups['אחרים'].includes(author)) {
          authorGroups['אחרים'].push(author);
        }
      }
    });
    
    return {
      categories: Array.from(categories).sort(),
      formats: Array.from(formats).sort(),
      sizes: Array.from(sizes).sort(),
      languages: Array.from(languages).sort(),
      authors: Array.from(authors).sort(),
      authorGroups,
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
      
      // Language filter - check normalized language
      if (filters.languages.length > 0) {
        const normalizedProductLang = normalizeLanguage(product.language);
        const normalizedFilterLangs = filters.languages.map(lang => normalizeLanguage(lang));
        if (!normalizedFilterLangs.includes(normalizedProductLang)) {
          return false;
        }
      }
      
      // Author filter
      if (filters.authors.length > 0 && product.author && !filters.authors.includes(product.author)) {
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
      languages: [],
      authors: []
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
          <span>{t('shippingBanner')}</span>
        </div>
      </section>

      <Header currentLanguage={currentLanguage} onLanguageChange={setLanguage} />

      <div className="flex min-h-screen bg-gray-50">
        {/* Clean Simple Sidebar */}
        <div className={`${sidebarVisible ? 'w-80' : 'w-0'} transition-all duration-200 overflow-hidden`}>
          <div className="h-full bg-gradient-to-br from-[#1e40af] to-[#1e3a8a] shadow-lg border-r-4 border-[#f97316]">
            {/* Header avec style bleu/orange cohérent */}
            <div className="bg-gradient-to-r from-[#1e40af] to-[#1e3a8a] p-4 border-b-4 border-[#f97316]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-white" data-testid="sidebar-title">
                  {t('sidebarTitle')}
                </h2>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={clearAllFilters}
                  className="text-sm border-2 border-[#f97316] text-white hover:bg-[#f97316] hover:text-white bg-transparent"
                  data-testid="button-clear-filters"
                >
                  <X className="h-4 w-4 mr-1" />
                  {t('clearAll')}
                </Button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#f97316]" />
                <Input 
                  placeholder={t('searchBooks')}
                  value={filters.searchQuery}
                  onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
                  className="pl-10 text-sm bg-white/90 border-2 border-[#f97316] focus:border-[#f97316] focus:ring-2 focus:ring-[#f97316]/50"
                  data-testid="input-search"
                />
              </div>
            </div>

            <div className="p-4 space-y-4 max-h-screen overflow-y-auto bg-gradient-to-br from-[#1e40af]/95 to-[#1e3a8a]/95">
              {/* Price Filter - Style bleu/orange */}
              <div 
                className="bg-gradient-to-r from-[#1e40af] to-[#1e3a8a] border-2 border-[#f97316] rounded-lg p-4 shadow-lg"
                role="region"
                aria-label={t('priceRange')}
              >
                <div 
                  className="flex items-center justify-between cursor-pointer mb-3"
                  onClick={() => toggleSection('price')}
                  role="button"
                  aria-expanded={expandedSections.price}
                  aria-controls="price-filter-content"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleSection('price');
                    }
                  }}
                  data-testid="label-price-range"
                >
                  <span className="text-sm font-bold text-white">{t('priceRange')}</span>
                  {expandedSections.price ? <ChevronUp className="h-4 w-4 text-[#f97316]" /> : <ChevronDown className="h-4 w-4 text-[#f97316]" />}
                </div>
                {expandedSections.price && (
                  <div id="price-filter-content" className="space-y-3" role="group" aria-label={t('priceRange')}>
                    <Slider
                      min={filterOptions.priceRange[0]}
                      max={filterOptions.priceRange[1]}
                      value={filters.priceRange}
                      onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value as [number, number] }))}
                      className="w-full"
                      data-testid="slider-price-range"
                    />
                    <div className="flex justify-between text-xs text-white/90">
                      <span data-testid="text-price-min">{filters.priceRange[0]} ₪</span>
                      <span data-testid="text-price-max">{filters.priceRange[1]} ₪</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Authors Filter - PRIORITY POSITION - Style Amazon */}
              <div 
                className="bg-gradient-to-r from-[#1e40af] to-[#1e3a8a] border-2 border-[#f97316] rounded-lg p-4 shadow-lg"
                role="region"
                aria-label={t('authors')}
              >
                <div 
                  className="flex items-center justify-between cursor-pointer mb-3"
                  onClick={() => toggleSection('authors')}
                  role="button"
                  aria-expanded={expandedSections.authors}
                  aria-controls="authors-filter-content"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleSection('authors');
                    }
                  }}
                  data-testid="label-authors"
                >
                  <span className="text-sm font-bold text-white">{t('authors')}</span>
                  {expandedSections.authors ? <ChevronUp className="h-4 w-4 text-[#f97316]" /> : <ChevronDown className="h-4 w-4 text-[#f97316]" />}
                </div>
                {expandedSections.authors && (
                  <div id="authors-filter-content" className="space-y-3 mt-3" role="group" aria-label={t('authors')}>
                    {/* Rabbi Nachman Group */}
                    {filterOptions.authorGroups['רבי נחמן מברסלב']?.length > 0 && (
                      <div className="bg-white/10 rounded p-2">
                        <div className="text-xs font-semibold text-[#f97316] mb-2">{t('rabbiNachman')}</div>
                        <div className="space-y-1">
                          {filterOptions.authorGroups['רבי נחמן מברסלב'].slice(0, 3).map((author) => (
                            <div key={author} className="flex items-center space-x-2 rtl:space-x-reverse">
                              <Checkbox
                                id={`author-${author}`}
                                checked={filters.authors.includes(author)}
                                onCheckedChange={() => toggleFilter('authors', author)}
                                className="border-orange-400 text-[#f97316]"
                                data-testid={`checkbox-author-${author}`}
                              />
                              <label 
                                htmlFor={`author-${author}`} 
                                className="text-xs cursor-pointer text-white font-medium"
                                data-testid={`text-author-${author}`}
                              >
                                {author.includes('נחמן') ? 'רבי נחמן מברסלב' : author}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Rabbi Nathan Group */}
                    {filterOptions.authorGroups['רבי נתן מברסלב']?.length > 0 && (
                      <div className="bg-white/10 rounded p-2">
                        <div className="text-xs font-semibold text-[#f97316] mb-2">{t('rabbiNathan')}</div>
                        <div className="space-y-1">
                          {filterOptions.authorGroups['רבי נתן מברסלב'].slice(0, 3).map((author) => (
                            <div key={author} className="flex items-center space-x-2 rtl:space-x-reverse">
                              <Checkbox
                                id={`author-${author}`}
                                checked={filters.authors.includes(author)}
                                onCheckedChange={() => toggleFilter('authors', author)}
                                className="border-orange-400 text-[#f97316]"
                                data-testid={`checkbox-author-${author}`}
                              />
                              <label 
                                htmlFor={`author-${author}`} 
                                className="text-xs cursor-pointer text-white font-medium"
                                data-testid={`text-author-${author}`}
                              >
                                {author.includes('נתן') ? 'רבי נתן מברסלב' : author}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Autres auteurs */}
                    {filterOptions.authorGroups['אחרים']?.length > 0 && (
                      <div className="bg-white/10 rounded p-2">
                        <div className="text-xs font-semibold text-[#f97316] mb-2">{t('others')}</div>
                        <div className="space-y-1 max-h-32 overflow-y-auto">
                          {filterOptions.authorGroups['אחרים'].map((author) => (
                            <div key={author} className="flex items-center space-x-2 rtl:space-x-reverse">
                              <Checkbox
                                id={`author-${author}`}
                                checked={filters.authors.includes(author)}
                                onCheckedChange={() => toggleFilter('authors', author)}
                                className="border-orange-400 text-[#f97316]"
                                data-testid={`checkbox-author-${author}`}
                              />
                              <label 
                                htmlFor={`author-${author}`} 
                                className="text-xs cursor-pointer text-white font-medium"
                                data-testid={`text-author-${author}`}
                              >
                                {author}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Languages Filter - Style bleu/orange avec 3 langues */}
              <div 
                className="bg-gradient-to-r from-[#1e40af] to-[#1e3a8a] border-2 border-[#f97316] rounded-lg p-4 shadow-lg"
                role="region"
                aria-label={t('languages')}
              >
                <div 
                  className="flex items-center justify-between cursor-pointer mb-3"
                  onClick={() => toggleSection('languages')}
                  role="button"
                  aria-expanded={expandedSections.languages}
                  aria-controls="languages-filter-content"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleSection('languages');
                    }
                  }}
                  data-testid="label-languages"
                >
                  <span className="text-sm font-bold text-white">{t('languages')}</span>
                  {expandedSections.languages ? <ChevronUp className="h-4 w-4 text-[#f97316]" /> : <ChevronDown className="h-4 w-4 text-[#f97316]" />}
                </div>
                {expandedSections.languages && (
                  <div id="languages-filter-content" className="space-y-2 mt-3" role="group" aria-label={t('languages')}>
                    {/* Display main languages with translations */}
                    {[
                      { key: 'עברית', display: t('hebrew') },
                      { key: 'Français', display: t('french') },
                      { key: 'English', display: t('english') }
                    ].map(({ key, display }) => (
                      <div key={key} className="flex items-center space-x-2 rtl:space-x-reverse bg-white/10 rounded p-2">
                        <Checkbox
                          id={`language-${key}`}
                          checked={filters.languages.includes(key)}
                          onCheckedChange={() => toggleFilter('languages', key)}
                          className="border-orange-400 text-[#f97316]"
                          data-testid={`checkbox-language-${key}`}
                        />
                        <label 
                          htmlFor={`language-${key}`} 
                          className="text-sm cursor-pointer text-white font-medium"
                          data-testid={`text-language-${key}`}
                        >
                          {display}
                        </label>
                      </div>
                    ))}
                    {/* Other available languages */}
                    {filterOptions.languages.filter(lang => !['עברית', 'Français', 'English', 'צרפתית', 'אנגלית'].includes(lang)).map((language) => {
                      const normalizedLang = normalizeLanguage(language);
                      const langDisplayMap: Record<string, string> = {
                        'עברית': t('hebrew'),
                        'Français': t('french'),
                        'English': t('english'),
                        'רוסית': t('russian'),
                        'Russian': t('russian'),
                        'Español': t('spanish'),
                        'Spanish': t('spanish')
                      };
                      return (
                        <div key={language} className="flex items-center space-x-2 rtl:space-x-reverse bg-white/10 rounded p-2">
                          <Checkbox
                            id={`language-${language}`}
                            checked={filters.languages.includes(normalizedLang)}
                            onCheckedChange={() => toggleFilter('languages', normalizedLang)}
                            className="border-orange-400 text-[#f97316]"
                            data-testid={`checkbox-language-${language}`}
                          />
                          <label 
                            htmlFor={`language-${language}`} 
                            className="text-sm cursor-pointer text-white font-medium"
                            data-testid={`text-language-${language}`}
                          >
                            {langDisplayMap[normalizedLang] || language}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Categories Filter - Style bleu/orange */}
              <div 
                className="bg-gradient-to-r from-[#1e40af] to-[#1e3a8a] border-2 border-[#f97316] rounded-lg p-4 shadow-lg"
                role="region"
                aria-label="קטגוריות"
              >
                <div 
                  className="flex items-center justify-between cursor-pointer mb-3"
                  onClick={() => toggleSection('categories')}
                  role="button"
                  aria-expanded={expandedSections.categories}
                  aria-controls="categories-filter-content"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleSection('categories');
                    }
                  }}
                  data-testid="label-categories"
                >
                  <span className="text-sm font-bold text-white">{t('categories')}</span>
                  {expandedSections.categories ? <ChevronUp className="h-4 w-4 text-[#f97316]" /> : <ChevronDown className="h-4 w-4 text-[#f97316]" />}
                </div>
                {expandedSections.categories && (
                  <div id="categories-filter-content" className="space-y-2 max-h-48 overflow-y-auto" role="group" aria-label="קטגוריות">
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
                          className="text-xs cursor-pointer text-white font-medium"
                          data-testid={`text-category-${category}`}
                        >
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Sizes Filter - Style bleu/orange */}
              <div 
                className="bg-gradient-to-r from-[#1e40af] to-[#1e3a8a] border-2 border-[#f97316] rounded-lg p-4 shadow-lg"
                role="region"
                aria-label="גדלים"
              >
                <div 
                  className="flex items-center justify-between cursor-pointer mb-3"
                  onClick={() => toggleSection('sizes')}
                  role="button"
                  aria-expanded={expandedSections.sizes}
                  aria-controls="sizes-filter-content"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleSection('sizes');
                    }
                  }}
                  data-testid="label-sizes"
                >
                  <span className="text-sm font-bold text-white">{t('sizes')}</span>
                  {expandedSections.sizes ? <ChevronUp className="h-4 w-4 text-[#f97316]" /> : <ChevronDown className="h-4 w-4 text-[#f97316]" />}
                </div>
                {expandedSections.sizes && (
                  <div id="sizes-filter-content" className="space-y-2" role="group" aria-label="גדלים">
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
                          className="text-xs cursor-pointer text-white font-medium"
                          data-testid={`text-size-${size}`}
                        >
                          {size}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Formats Filter - Style bleu/orange */}
              <div 
                className="bg-gradient-to-r from-[#1e40af] to-[#1e3a8a] border-2 border-[#f97316] rounded-lg p-4 shadow-lg"
                role="region"
                aria-label="כריכות"
              >
                <div 
                  className="flex items-center justify-between cursor-pointer mb-3"
                  onClick={() => toggleSection('formats')}
                  role="button"
                  aria-expanded={expandedSections.formats}
                  aria-controls="formats-filter-content"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleSection('formats');
                    }
                  }}
                  data-testid="label-formats"
                >
                  <span className="text-sm font-bold text-white">{t('formats')}</span>
                  {expandedSections.formats ? <ChevronUp className="h-4 w-4 text-[#f97316]" /> : <ChevronDown className="h-4 w-4 text-[#f97316]" />}
                </div>
                {expandedSections.formats && (
                  <div id="formats-filter-content" className="space-y-2 max-h-48 overflow-y-auto" role="group" aria-label="כריכות">
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
                          className="text-xs cursor-pointer text-white font-medium"
                          data-testid={`text-format-${format}`}
                        >
                          {format}
                        </label>
                      </div>
                    ))}
                    {filterOptions.formats.length > 12 && (
                      <div className="text-xs text-white/80 pt-1" data-testid="text-more-formats">
                        {t('moreOptions').replace('{count}', String(filterOptions.formats.length - 12))}
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
                  {t('storeBooks')}
                </h1>
              </div>
              <div className="bg-white px-4 py-2 rounded border border-gray-200" data-testid="text-results-count">
                <span className="text-sm text-gray-600">
                  {t('resultsFound').replace('{count}', String(filteredProducts.length)).replace('{total}', String(allProducts.length))}
                </span>
              </div>
            </div>

            {/* Étageres graphiques pour présenter les livres - Style présentoir */}
            <div className="relative mb-6 mt-4">
              {/* Étagère supérieure décorative - Style bois */}
              <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-amber-800 via-amber-700 to-amber-800 rounded-t-lg shadow-2xl border-b-4 border-amber-900" style={{zIndex: 1, boxShadow: '0 4px 6px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.1)'}}></div>
              
              {/* Grille produits avec effet étagère */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 pt-8">
                {filteredProducts.map((product, index) => (
                  // Encadré étagère individuelle pour chaque livre - Style présentoir discret
                  <div key={product.id} className="relative mb-6">
                    {/* Étagère supérieure individuelle */}
                    <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-800 via-amber-700 to-amber-800 rounded-t-lg shadow-md border-b border-amber-900" style={{zIndex: 2}}></div>
                    
                    {/* Carte produit */}
                    <div 
                      key={product.id} 
                      className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-amber-200 hover:border-[#f97316] hover:-translate-y-3 relative pt-2"
                      data-testid={`card-product-${product.id}`}
                      style={{
                        transform: `perspective(1000px) rotateY(${index % 4 === 0 ? '1deg' : index % 4 === 3 ? '-1deg' : '0deg'})`,
                      }}
                    >
                      {/* Support étagère sous le livre - Style présentoir discret mais visible */}
                      <div className="absolute -bottom-3 left-0 right-0 h-3 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 rounded-b-lg shadow-lg opacity-80" style={{boxShadow: '0 3px 6px rgba(0,0,0,0.25)'}}></div>
                    
                    {/* Image */}
                    <Link href={`/product/${product.id}`}>
                      {product.images && product.images.length > 0 ? (
                        <div className="relative overflow-hidden">
                          <img 
                            src={convertImagePath(product.images[0])}
                            alt={product.name}
                            className="w-full h-52 object-cover cursor-pointer hover:scale-110 transition-transform duration-500"
                            data-testid={`img-product-${product.id}`}
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                          {/* Overlay gradient pour effet profondeur */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
                        </div>
                      ) : (
                        <div 
                          className="w-full h-52 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center cursor-pointer hover:from-gray-200 hover:to-gray-300 transition-colors"
                          data-testid={`placeholder-product-${product.id}`}
                        >
                          <span className="text-4xl">📖</span>
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
                        {getInterfaceDisplayTitle(product, currentLanguage)}
                      </h3>
                    </Link>
                    
                    <div 
                      className="text-lg font-bold text-[#1e40af] mb-2"
                      data-testid={`text-price-${product.id}`}
                    >
                      {product.variants && product.variants.length > 0 ? 
                        `${Math.min(...product.variants.map(v => v.price))} ₪ – ${Math.max(...product.variants.map(v => v.price))} ₪` : 
                        t('noPrice')
                      }
                    </div>
                    
                    <div 
                      className="text-sm text-gray-600 mb-3"
                      data-testid={`text-category-${product.id}`}
                    >
                      {product.category}
                    </div>
                    
                    <Link href={`/product/${product.id}`}>
                      <Button 
                        className="w-full bg-gradient-to-r from-[#1e40af] to-[#1e3a8a] hover:from-[#1e3a8a] hover:to-[#1e40af] text-white shadow-md hover:shadow-lg transition-all duration-300"
                        data-testid={`button-view-details-${product.id}`}
                      >
                        {t('viewDetails')}
                      </Button>
                    </Link>
                  </div>
                </div>
                    
                {/* Étagère inférieure individuelle */}
                <div className="absolute -bottom-4 left-0 right-0 h-2 bg-gradient-to-r from-amber-800 via-amber-700 to-amber-800 rounded-b-lg shadow-md border-t border-amber-900" style={{zIndex: 2}}></div>
              </div>
                ))}
              </div>
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-12" data-testid="text-no-results">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('noResults')}</h3>
                <p className="text-gray-600 mb-4">{t('tryDifferentFilters')}</p>
                <Button onClick={clearAllFilters} data-testid="button-clear-filters-no-results">
                  {t('clearFilters')}
                </Button>
              </div>
            )}
            
            <div className="bg-white rounded-lg p-8 text-center shadow border border-gray-200 mt-12">
              <p className="text-lg text-gray-700 mb-4" data-testid="text-contact-message">
                {t('lookingForMore')}
              </p>
              <Link href="/contact">
                <Button className="bg-green-600 hover:bg-green-700 text-white" data-testid="button-contact">
                  {t('contactForDetails')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}