import { Header } from '../components/Header';
import { useLanguage } from '../contexts/LanguageContext';
import { breslovDownloadBooks } from '../data/downloadLinks';
import { realBreslovProducts } from '../data/realProducts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Download, ExternalLink } from 'lucide-react';

// Dynamically import all assets using import.meta.glob
const assets = import.meta.glob('/attached_assets/*.{png,jpg,jpeg,webp}', { eager: true, query: '?url', import: 'default' });

export default function BreslovStyle() {
  const { currentLanguage, setLanguage } = useLanguage();
  
  // Simple and reliable helper function to resolve image paths
  const getImageUrl = (imagePath: string): string | undefined => {
    if (!imagePath) return undefined;
    
    // Direct path lookup - realProducts.ts now uses /attached_assets/ paths directly
    if (assets[imagePath]) {
      return assets[imagePath] as string;
    }
    
    // If no asset found, return undefined to show fallback
    return undefined;
  };
  
  // Get real products for display
  const featuredProducts = Object.values(realBreslovProducts).filter(p => p.isFeatured).slice(0, 6);
  const allProducts = Object.values(realBreslovProducts).slice(0, 12);
  
  // Categories from real data
  const categories = [
    { name: 'ליקוטי מוהר"ן', count: 8, icon: '📖' },
    { name: 'תפילות', count: 12, icon: '🙏' },  
    { name: 'מועדי השנה', count: 6, icon: '📅' },
    { name: 'חומשים ותנ"ך', count: 4, icon: '📜' },
    { name: 'ספרי ברסלב', count: 15, icon: '✨' },
    { name: 'ליקוטים', count: 7, icon: '💫' }
  ];

  const handleDownload = (url: string, title: string) => {
    if (url) {
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.download = title;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div 
      className="min-h-screen bg-white" 
      dir={currentLanguage === 'he' ? 'rtl' : 'ltr'}
      data-testid="breslov-style-page"
    >
      <Header currentLanguage={currentLanguage} onLanguageChange={setLanguage} />
      
      {/* Clean Hero Banner - White/Blue Theme like breslev.co.il */}
      <div className="bg-gradient-to-l from-blue-50 to-white border-b border-gray-100" data-testid="hero-banner">
        <div className="container mx-auto px-4 py-6">
          <div className={`text-center ${currentLanguage === 'he' ? 'space-y-2' : 'space-y-2'}`}>
            <h1 className={`text-3xl font-bold text-gray-800 mb-2 ${currentLanguage === 'he' ? 'text-right' : 'text-left'}`} data-testid="main-title">
              {currentLanguage === 'he' ? 'הבית שלך לאמונה: ספרי ברסלב אמיתיים' : 'Your Home for Faith: Authentic Breslov Books'}
            </h1>
            <p className={`text-blue-600 text-lg ${currentLanguage === 'he' ? 'text-right' : 'text-left'}`} data-testid="subtitle">
              {currentLanguage === 'he' 
                ? 'ספרי רבי נחמן מברסלב ותלמידיו • זמינים להורדה וקנייה'
                : 'Books of Rabbi Nachman of Breslov and his disciples • Available for download and purchase'
              }
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Main Hero Layout - 12 Column Grid (8+4 like breslev.co.il) */}
        <div className="grid grid-cols-12 gap-6 mb-12" data-testid="hero-section">
          {/* Main Featured Article - 8 columns */}
          <div className="col-span-12 lg:col-span-8">
            {featuredProducts.slice(0, 1).map((product) => (
              <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 border-gray-100 bg-white" data-testid={`featured-main-${product.id}`}>
                <div className="relative overflow-hidden">
                  <div className="aspect-[16/9] bg-gradient-to-br from-blue-50 to-gray-50 relative">
                    {product.images && product.images[0] && getImageUrl(product.images[0]) ? (
                      <img 
                        src={getImageUrl(product.images[0])}
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-cover"
                        data-testid={`main-book-image-${product.id}`}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.parentElement?.querySelector('.fallback-content')?.classList.remove('hidden');
                        }}
                      />
                    ) : null}
                    <div className={`absolute inset-0 flex items-center justify-center fallback-content ${product.images && product.images[0] && getImageUrl(product.images[0]) ? 'hidden' : ''}`}>
                      <div className="text-center p-8">
                        <div className="text-6xl text-blue-300 mb-4">📖</div>
                        <h3 className="text-3xl font-bold text-blue-800">{product.name}</h3>
                        <p className="text-blue-600 text-lg mt-2">{product.nameEnglish}</p>
                      </div>
                    </div>
                    <div className={`absolute top-4 ${currentLanguage === 'he' ? 'left-4' : 'right-4'}`}>
                      <Badge className="bg-blue-600 text-white hover:bg-blue-700" data-testid="featured-badge">
                        {currentLanguage === 'he' ? 'מומלץ' : 'Featured'}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2" data-testid={`main-title-${product.id}`}>
                          {product.name}
                        </h2>
                        <p className="text-gray-600 text-sm" data-testid={`main-author-${product.id}`}>
                          {product.author} • {product.pages} {currentLanguage === 'he' ? 'עמודים' : 'pages'}
                        </p>
                      </div>
                      <p className="text-gray-700 line-clamp-3" data-testid={`main-description-${product.id}`}>
                        {product.description}
                      </p>
                      <div className={`flex items-center justify-between pt-4 ${currentLanguage === 'he' ? 'flex-row-reverse' : ''}`}>
                        <div className="text-lg font-bold text-blue-600" data-testid={`main-price-${product.id}`}>
                          {product.variants && product.variants[0]?.price ? `₪${product.variants[0].price}` : 'הורדה חינמית'}
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleDownload(breslovDownloadBooks.find(b => b.id === product.id)?.downloadUrl || '', product.name)}
                            className={`flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors ${currentLanguage === 'he' ? 'flex-row-reverse' : ''}`}
                            data-testid={`download-main-${product.id}`}
                          >
                            <Download size={16} />
                            {currentLanguage === 'he' ? 'הורד חינם' : 'Download Free'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>

          {/* Secondary Articles - 4 columns stacked */}
          <div className="col-span-12 lg:col-span-4 space-y-4">
            {featuredProducts.slice(1, 3).map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300 bg-white border-gray-100" data-testid={`featured-secondary-${product.id}`}>
                <div className="flex">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-50 to-gray-50 flex-shrink-0 relative">
                    {product.images && product.images[0] && getImageUrl(product.images[0]) ? (
                      <img 
                        src={getImageUrl(product.images[0])}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        data-testid={`secondary-book-image-${product.id}`}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.parentElement?.querySelector('.fallback-icon')?.classList.remove('hidden');
                        }}
                      />
                    ) : null}
                    <div className={`w-full h-full flex items-center justify-center fallback-icon ${product.images && product.images[0] && getImageUrl(product.images[0]) ? 'hidden' : ''}`}>
                      <span className="text-2xl text-blue-400">📖</span>
                    </div>
                  </div>
                  <CardContent className="p-4 flex-1">
                    <h3 className="font-bold text-gray-800 mb-1 line-clamp-2 text-sm" data-testid={`secondary-title-${product.id}`}>
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-600 mb-2" data-testid={`secondary-author-${product.id}`}>
                      {product.author}
                    </p>
                    <p className="text-xs text-gray-700 line-clamp-2 mb-2" data-testid={`secondary-description-${product.id}`}>
                      {product.description}
                    </p>
                    <button 
                      onClick={() => handleDownload(breslovDownloadBooks.find(b => b.id === product.id)?.downloadUrl || '', product.name)}
                      className="text-blue-600 hover:text-blue-800 text-xs font-medium flex items-center gap-1"
                      data-testid={`download-secondary-${product.id}`}
                    >
                      {currentLanguage === 'he' ? 'הורד' : 'Download'} 
                      {currentLanguage === 'he' ? <ChevronLeft size={12} /> : <ChevronRight size={12} />}
                    </button>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Popular Categories Section - Like breslev.co.il topics */}
        <div className="mb-12" data-testid="popular-categories">
          <div className={`${currentLanguage === 'he' ? 'border-r-4 border-blue-600 pr-4' : 'border-l-4 border-blue-600 pl-4'} mb-6`}>
            <h2 className={`text-2xl font-bold text-gray-800 ${currentLanguage === 'he' ? 'text-right' : 'text-left'}`} data-testid="categories-title">
              {currentLanguage === 'he' ? 'הנושאים החמים באתר' : 'Popular Topics on Site'}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <Card key={index} className="text-center hover:shadow-md transition-shadow cursor-pointer border-gray-100" data-testid={`category-${index}`}>
                <CardContent className="p-4">
                  <div className="text-2xl mb-2">{category.icon}</div>
                  <h3 className="font-medium text-gray-800 text-sm mb-1" data-testid={`category-name-${index}`}>
                    {category.name}
                  </h3>
                  <p className="text-xs text-gray-500" data-testid={`category-count-${index}`}>
                    {category.count} {currentLanguage === 'he' ? 'ספרים' : 'books'}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Books Carousel Section - Like breslev.co.il videos */}
        <div className="mb-12" data-testid="books-carousel">
          <div className={`flex items-center mb-6 ${currentLanguage === 'he' ? 'flex-row-reverse' : ''}`}>
            <div className={`text-blue-600 text-2xl ${currentLanguage === 'he' ? 'ml-3' : 'mr-3'}`}>📚</div>
            <div className="flex-1">
              <h2 className={`text-2xl font-bold text-gray-800 ${currentLanguage === 'he' ? 'text-right' : 'text-left'}`} data-testid="carousel-title">
                {currentLanguage === 'he' ? 'הספרים החדשים' : 'Recent Books'}
              </h2>
              <div className="h-px bg-gray-200 w-full mt-2"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-testid="books-grid">
            {allProducts.slice(3, 7).map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300 bg-white border-gray-100" data-testid={`book-card-${product.id}`}>
                <div className="aspect-[4/3] bg-gradient-to-br from-blue-50 to-gray-50 relative overflow-hidden">
                  {product.images && product.images[0] && getImageUrl(product.images[0]) ? (
                    <img 
                      src={getImageUrl(product.images[0])}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      data-testid={`carousel-book-image-${product.id}`}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement?.querySelector('.carousel-fallback')?.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  <div className={`w-full h-full flex items-center justify-center carousel-fallback ${product.images && product.images[0] && getImageUrl(product.images[0]) ? 'hidden' : ''}`}>
                    <div className="text-center">
                      <div className="text-3xl mb-2 text-blue-300">📖</div>
                      <div className="text-sm text-blue-600 font-medium px-2">{product.category}</div>
                    </div>
                  </div>
                  <div className="absolute bottom-2 left-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded" data-testid={`pages-badge-${product.id}`}>
                    {product.pages} {currentLanguage === 'he' ? 'עמ\'' : 'pages'}
                  </div>
                </div>
                <CardContent className="p-4">
                  <h4 className="font-bold text-gray-800 mb-1 line-clamp-2 text-sm" data-testid={`carousel-title-${product.id}`}>
                    {product.name}
                  </h4>
                  <p className="text-xs text-gray-600 mb-2" data-testid={`carousel-author-${product.id}`}>
                    {product.author}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-blue-600 font-medium" data-testid={`carousel-category-${product.id}`}>
                      {product.category}
                    </span>
                    <button 
                      onClick={() => handleDownload(breslovDownloadBooks.find(b => b.id === product.id)?.downloadUrl || '', product.name)}
                      className="text-blue-600 hover:text-blue-800 text-xs"
                      data-testid={`carousel-download-${product.id}`}
                    >
                      {currentLanguage === 'he' ? 'הורדה' : 'Download'}
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Authors/Lecturers Section - Like breslev.co.il */}
        <div className="mb-12" data-testid="authors-section">
          <div className={`${currentLanguage === 'he' ? 'border-r-4 border-blue-600 pr-4' : 'border-l-4 border-blue-600 pl-4'} mb-6`}>
            <h2 className={`text-2xl font-bold text-gray-800 ${currentLanguage === 'he' ? 'text-right' : 'text-left'}`} data-testid="authors-title">
              {currentLanguage === 'he' ? 'ספרים לפי מחברים' : 'Books by Authors'}
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'רבי נחמן מברסלב', count: 12 },
              { name: 'רבי נתן מברסלב', count: 8 },
              { name: 'רבי נחמן מטשעהרין', count: 4 },
              { name: 'רבי אברהם ב"ר נחמן', count: 3 },
              { name: 'רבי יצחק בריטר', count: 2 },
              { name: 'אחרים', count: 6 }
            ].map((author, index) => (
              <div key={index} className="text-center group cursor-pointer" data-testid={`author-${index}`}>
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-50 transition-colors">
                  <span className="text-2xl">👨‍🏫</span>
                </div>
                <h3 className="font-medium text-gray-800 text-sm mb-1" data-testid={`author-name-${index}`}>
                  {author.name}
                </h3>
                <p className="text-xs text-gray-500" data-testid={`author-count-${index}`}>
                  {author.count} {currentLanguage === 'he' ? 'ספרים' : 'books'}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer CTA - Clean Blue Theme */}
        <Card className="bg-blue-50 border border-blue-200" data-testid="footer-cta">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-bold text-blue-800 mb-3" data-testid="cta-title">
              {currentLanguage === 'he' ? '🔥 האש שלי - ספרי ברסלב אמיתיים' : '🔥 My Fire - Authentic Breslov Books'}
            </h3>
            <p className="text-blue-700 mb-4" data-testid="cta-description">
              {currentLanguage === 'he' 
                ? 'כל הספרים זמינים להורדה חינמית. אנו מעודדים להדפיס ולהפיץ את הספרים לזכות הרבים.'
                : 'All books are available for free download. We encourage printing and distributing these books for the merit of the many.'
              }
            </p>
            <div className={`flex justify-center gap-4 ${currentLanguage === 'he' ? 'flex-row-reverse' : ''}`}>
              <button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
                data-testid="browse-all-button"
              >
                {currentLanguage === 'he' ? 'עיין בכל הספרים' : 'Browse All Books'}
              </button>
              <button 
                className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-2 rounded-md font-medium transition-colors"
                data-testid="contact-button"
              >
                {currentLanguage === 'he' ? 'צור קשר' : 'Contact Us'}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}