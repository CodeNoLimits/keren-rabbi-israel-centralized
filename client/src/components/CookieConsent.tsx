import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { X } from 'lucide-react';

const COOKIE_KEY = 'cookie-consent-accepted';

const text: Record<string, { message: string; accept: string; learnMore: string }> = {
  he: {
    message: 'אתר זה משתמש בעוגיות (cookies) לשיפור חוויית הגלישה ולשמירת העדפותיך.',
    accept: 'מסכים',
    learnMore: 'מדיניות פרטיות',
  },
  en: {
    message: 'This site uses cookies to improve your browsing experience and save your preferences.',
    accept: 'Accept',
    learnMore: 'Privacy Policy',
  },
  fr: {
    message: 'Ce site utilise des cookies pour améliorer votre expérience de navigation et sauvegarder vos préférences.',
    accept: 'Accepter',
    learnMore: 'Politique de confidentialité',
  },
  es: {
    message: 'Este sitio utiliza cookies para mejorar su experiencia de navegación y guardar sus preferencias.',
    accept: 'Aceptar',
    learnMore: 'Política de privacidad',
  },
  ru: {
    message: 'Этот сайт использует файлы cookie для улучшения вашего опыта просмотра и сохранения ваших предпочтений.',
    accept: 'Принять',
    learnMore: 'Политика конфиденциальности',
  },
};

export function CookieConsent() {
  const { currentLanguage } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem(COOKIE_KEY);
    if (!accepted) {
      // Small delay so it doesn't flash on page load
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_KEY, 'true');
    setVisible(false);
  };

  if (!visible) return null;

  const lang = (currentLanguage in text) ? currentLanguage : 'en';
  const t = text[lang];
  const isRTL = currentLanguage === 'he';

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[9999] bg-white border-t border-gray-200 shadow-lg px-4 py-3 animate-in slide-in-from-bottom duration-300"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center gap-3">
        <p className="text-sm text-gray-700 flex-1">
          {t.message}{' '}
          <a href="/privacy" className="text-blue-600 underline hover:text-blue-800">
            {t.learnMore}
          </a>
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={handleAccept}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors"
          >
            {t.accept}
          </button>
          <button
            onClick={handleAccept}
            className="text-gray-400 hover:text-gray-600 p-1"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
