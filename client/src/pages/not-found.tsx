import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Home, Store, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { Header } from "@/components/Header";
import { useLanguage } from "@/contexts/LanguageContext";

const translations = {
  he: {
    title: '404 - דף לא נמצא',
    description: 'הדף שחיפשת לא קיים או הועבר למיקום אחר',
    goHome: 'חזרה לעמוד הבית',
    goStore: 'לחנות',
    back: 'חזור'
  },
  en: {
    title: '404 - Page Not Found',
    description: 'The page you are looking for does not exist or has been moved',
    goHome: 'Back to Home',
    goStore: 'Go to Store',
    back: 'Go Back'
  },
  fr: {
    title: '404 - Page Non Trouvée',
    description: 'La page que vous recherchez n\'existe pas ou a été déplacée',
    goHome: 'Retour à l\'Accueil',
    goStore: 'Aller à la Boutique',
    back: 'Retour'
  },
  es: {
    title: '404 - Página No Encontrada',
    description: 'La página que buscas no existe o ha sido movida',
    goHome: 'Volver al Inicio',
    goStore: 'Ir a la Tienda',
    back: 'Volver'
  },
  ru: {
    title: '404 - Страница Не Найдена',
    description: 'Страница, которую вы ищете, не существует или была перемещена',
    goHome: 'Вернуться на Главную',
    goStore: 'Перейти в Магазин',
    back: 'Назад'
  }
};

export default function NotFound() {
  const { currentLanguage, setLanguage } = useLanguage();
  const t = translations[currentLanguage as keyof typeof translations] || translations.en;
  const dir = currentLanguage === 'he' ? 'rtl' : 'ltr';

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-50 to-blue-100" dir={dir}>
      <Header currentLanguage={currentLanguage} onLanguageChange={setLanguage} />
      <div className="min-h-screen w-full flex items-center justify-center pt-24 pb-12 px-4">
        <Card className="w-full max-w-lg mx-4 shadow-xl">
          <CardContent className="pt-8 pb-8 px-6 text-center">
            <div className="flex justify-center mb-6">
              <AlertCircle className="h-16 w-16 text-red-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.title}</h1>
            <p className="text-lg text-gray-600 mb-8">{t.description}</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <button className="flex items-center justify-center gap-2 bg-[#1e40af] hover:bg-[#1e3a8a] text-white px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 font-medium">
                  <Home className="w-5 h-5" />
                  {t.goHome}
                </button>
              </Link>
              <Link href="/store">
                <button className="flex items-center justify-center gap-2 bg-[#f97316] hover:bg-[#ea580c] text-white px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 font-medium">
                  <Store className="w-5 h-5" />
                  {t.goStore}
                </button>
              </Link>
              <button 
                onClick={() => window.history.back()}
                className="flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 font-medium"
              >
                <ArrowLeft className="w-5 h-5" />
                {t.back}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
