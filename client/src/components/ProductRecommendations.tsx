import { Link } from 'wouter';
import { realBreslovProducts } from '../data/realProducts';
import { getRelatedBooks } from '../utils/recommendationEngine';
import { convertImagePath } from '../utils/imagePathHelper';
import { useLanguage } from '../contexts/LanguageContext';
import type { Product } from '../../../shared/schema';

interface ProductRecommendationsProps {
  currentProductId: string;
  maxResults?: number;
}

export function ProductRecommendations({ currentProductId, maxResults = 6 }: ProductRecommendationsProps) {
  const { currentLanguage } = useLanguage();
  const allProducts = Object.values(realBreslovProducts);
  
  const relatedProducts = getRelatedBooks(currentProductId, allProducts, maxResults);

  if (relatedProducts.length === 0) {
    return null;
  }

  const getProductTitle = (product: Product) => {
    switch (currentLanguage) {
      case 'he':
        return product.name;
      case 'en':
        return product.nameEnglish || product.name;
      case 'fr':
        return product.nameFrench || product.nameEnglish || product.name;
      case 'es':
        return product.nameSpanish || product.nameEnglish || product.name;
      case 'ru':
        return product.nameRussian || product.nameEnglish || product.name;
      default:
        return product.nameEnglish || product.name;
    }
  };

  const getMinPrice = (product: Product) => {
    const prices = product.variants?.map(v => v.price).filter(p => p !== undefined) || [];
    return prices.length > 0 ? Math.min(...prices) : 0;
  };

  return (
    <div className="mt-12 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
        {currentLanguage === 'he' ? 'ספרים דומים' : 'Livres similaires'}
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {relatedProducts.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`}>
            <div className="group cursor-pointer bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200">
              {/* Image */}
              <div className="aspect-[3/4] bg-gray-100 overflow-hidden">
                {product.images && product.images.length > 0 ? (
                  <img
                    src={convertImagePath(product.images[0])}
                    alt={getProductTitle(product)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <div className="text-gray-400 text-center p-4">
                      <div className="text-4xl mb-2">📚</div>
                      <div className="text-sm">{getProductTitle(product)}</div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Content */}
              <div className="p-3">
                <h4 className="font-medium text-gray-900 text-sm line-clamp-2 mb-2">
                  {getProductTitle(product)}
                </h4>
                
                {/* Author */}
                {product.author && (
                  <p className="text-xs text-gray-600 mb-2 line-clamp-1">
                    {product.author}
                  </p>
                )}
                
                {/* Price */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-orange-600">
                    {getMinPrice(product)}₪
                    {currentLanguage === 'he' ? ' ומעלה' : ' et plus'}
                  </span>
                  
                  {/* Stock indicator */}
                  {product.variants?.some(v => v.inStock) && (
                    <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
                      {currentLanguage === 'he' ? 'במלאי' : 'En stock'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {/* View all link */}
      <div className="text-center mt-6">
        <Link href="/store">
          <button className="text-orange-600 hover:text-orange-700 font-medium text-sm underline">
            {currentLanguage === 'he' ? 'צפה בכל הספרים' : 'Voir tous les livres'}
          </button>
        </Link>
      </div>
    </div>
  );
}
