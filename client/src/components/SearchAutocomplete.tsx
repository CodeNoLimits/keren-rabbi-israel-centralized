import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Search, X, BookOpen } from 'lucide-react';
import { realBreslovProducts } from '../data/realProducts';
import { useLanguage } from '../contexts/LanguageContext';
import { getBookDisplayTitle, getInterfaceDisplayTitle } from '../utils/bookTitleHelper';
import { convertImagePath } from '../utils/imagePathHelper';
import type { Product } from '../../../shared/schema';

interface SearchAutocompleteProps {
  onNavigate?: (productId: string) => void;
}

const searchTranslations = {
  he: {
    placeholder: 'חיפוש ספרים...',
    noResults: 'לא נמצאו תוצאות',
    tryDifferent: 'נסו מילות חיפוש אחרות',
    viewAll: 'הצג את כל התוצאות',
    resultsFound: 'תוצאות',
  },
  en: {
    placeholder: 'Search books...',
    noResults: 'No results found',
    tryDifferent: 'Try different keywords',
    viewAll: 'View all results',
    resultsFound: 'results',
  },
  fr: {
    placeholder: 'Rechercher des livres...',
    noResults: 'Aucun resultat trouve',
    tryDifferent: 'Essayez des mots-cles differents',
    viewAll: 'Voir tous les resultats',
    resultsFound: 'resultats',
  },
  es: {
    placeholder: 'Buscar libros...',
    noResults: 'No se encontraron resultados',
    tryDifferent: 'Pruebe diferentes palabras clave',
    viewAll: 'Ver todos los resultados',
    resultsFound: 'resultados',
  },
  ru: {
    placeholder: 'Poisk knig...',
    noResults: 'Rezultaty ne najdeny',
    tryDifferent: 'Poprobujte drugie slova',
    viewAll: 'Posmotret vse rezultaty',
    resultsFound: 'rezultatov',
  },
};

export function SearchAutocomplete({ onNavigate }: SearchAutocompleteProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { currentLanguage } = useLanguage();

  const t = searchTranslations[currentLanguage as keyof typeof searchTranslations] || searchTranslations.he;
  const isRTL = currentLanguage === 'he';

  // Build searchable index once
  const allProducts = useMemo(() => Object.values(realBreslovProducts), []);

  // Filter products based on query
  const suggestions = useMemo(() => {
    if (!query || query.length < 1) return [];

    const lowerQuery = query.toLowerCase().trim();

    // Score-based matching for better results
    const scored = allProducts
      .map(product => {
        const name = product.name.toLowerCase();
        const nameEn = (product.nameEnglish || '').toLowerCase();
        const nameFr = (product.nameFrench || '').toLowerCase();
        const nameEs = (product.nameSpanish || '').toLowerCase();
        const nameRu = (product.nameRussian || '').toLowerCase();
        const category = (product.category || '').toLowerCase();
        const desc = (product.description || '').toLowerCase();

        let score = 0;

        // Exact start match is best
        if (name.startsWith(lowerQuery)) score += 100;
        else if (nameEn.startsWith(lowerQuery)) score += 95;
        else if (nameFr.startsWith(lowerQuery)) score += 90;
        else if (nameEs.startsWith(lowerQuery)) score += 90;
        else if (nameRu.startsWith(lowerQuery)) score += 90;

        // Contains match
        if (name.includes(lowerQuery)) score += 50;
        if (nameEn.includes(lowerQuery)) score += 45;
        if (nameFr.includes(lowerQuery)) score += 40;
        if (nameEs.includes(lowerQuery)) score += 40;
        if (nameRu.includes(lowerQuery)) score += 40;

        // Category match
        if (category.includes(lowerQuery)) score += 20;

        // Description match (lower priority)
        if (desc.includes(lowerQuery)) score += 10;

        return { product, score };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map(item => item.product);

    return scored;
  }, [query, allProducts]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev =>
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev =>
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
          handleSelect(suggestions[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        inputRef.current?.blur();
        break;
    }
  }, [isOpen, highlightedIndex, suggestions]);

  const handleSelect = (product: Product) => {
    setQuery('');
    setIsOpen(false);
    setHighlightedIndex(-1);

    if (onNavigate) {
      onNavigate(product.id);
    } else {
      window.location.href = `/product/${product.id}`;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(value.length > 0);
    setHighlightedIndex(-1);
  };

  const clearSearch = () => {
    setQuery('');
    setIsOpen(false);
    setHighlightedIndex(-1);
    inputRef.current?.focus();
  };

  // Highlight matching text in suggestion
  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();
    const index = lowerText.indexOf(lowerQuery);

    if (index === -1) return text;

    return (
      <>
        {text.slice(0, index)}
        <span className="bg-yellow-200 text-yellow-900 font-semibold rounded-sm px-0.5">
          {text.slice(index, index + query.length)}
        </span>
        {text.slice(index + query.length)}
      </>
    );
  };

  return (
    <div className="relative w-full max-w-md" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Search Input */}
      <div className="relative">
        <Search
          className={`absolute top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/70 pointer-events-none ${isRTL ? 'right-3' : 'left-3'}`}
        />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => query.length > 0 && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={t.placeholder}
          className={`
            w-full h-11 rounded-lg bg-white/15 border border-white/25
            text-white placeholder:text-white/60 text-sm
            focus:outline-none focus:ring-2 focus:ring-white/40 focus:bg-white/20
            transition-all duration-200
            ${isRTL ? 'pr-10 pl-10' : 'pl-10 pr-10'}
          `}
          style={{
            fontSize: '16px', /* Prevents iOS zoom on focus */
            minHeight: '44px', /* 44px touch target */
          }}
          autoComplete="off"
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-autocomplete="list"
        />
        {query && (
          <button
            onClick={clearSearch}
            className={`absolute top-1/2 transform -translate-y-1/2 rounded-full hover:bg-white/20 transition-colors ${isRTL ? 'left-1' : 'right-1'}`}
            style={{minWidth: '44px', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
          >
            <X className="h-4 w-4 text-white/70" />
          </button>
        )}
      </div>

      {/* Dropdown - full width on mobile */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-[70]"
          role="listbox"
          style={{
            ...(isRTL ? { right: 0 } : { left: 0 }),
            width: '100%',
            minWidth: 'min(320px, calc(100vw - 2rem))',
            maxWidth: 'calc(100vw - 1rem)',
          }}
        >
          {suggestions.length > 0 ? (
            <div className="max-h-80 overflow-y-auto py-1">
              {suggestions.map((product, index) => {
                const displayTitle = getBookDisplayTitle(product);
                const minPrice = product.variants
                  ? Math.min(...product.variants.map(v => v.price))
                  : 0;
                const maxPrice = product.variants
                  ? Math.max(...product.variants.map(v => v.price))
                  : 0;
                const isHighlighted = index === highlightedIndex;

                return (
                  <button
                    key={product.id}
                    onClick={() => handleSelect(product)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2.5 text-right
                      transition-colors duration-100
                      ${isHighlighted ? 'bg-red-50' : 'hover:bg-gray-50'}
                    `}
                    role="option"
                    aria-selected={isHighlighted}
                  >
                    {/* Product thumbnail */}
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                      {product.images && product.images.length > 0 ? (
                        <img
                          loading="lazy"
                          decoding="async"
                          width="40"
                          height="40"
                          src={convertImagePath(product.images[0])}
                          alt=""
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <BookOpen className="h-4 w-4 text-gray-400" />
                        </div>
                      )}
                    </div>

                    {/* Product info */}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">
                        {highlightMatch(displayTitle, query)}
                      </div>
                      <div className="text-xs text-gray-500 truncate">
                        {product.category}
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex-shrink-0 text-sm font-bold text-red-600">
                      {minPrice === maxPrice
                        ? `${minPrice}\u20AA`
                        : `${minPrice}-${maxPrice}\u20AA`
                      }
                    </div>
                  </button>
                );
              })}

              {/* View all results link */}
              {suggestions.length >= 8 && (
                <a
                  href={`/store?search=${encodeURIComponent(query)}`}
                  className="block px-3 py-2.5 text-center text-sm text-red-600 font-medium hover:bg-red-50 border-t border-gray-100"
                >
                  {t.viewAll} ({suggestions.length}+ {t.resultsFound})
                </a>
              )}
            </div>
          ) : query.length > 0 ? (
            <div className="py-8 text-center">
              <Search className="h-8 w-8 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-500 font-medium">{t.noResults}</p>
              <p className="text-xs text-gray-500 mt-1">{t.tryDifferent}</p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
