import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const translations = {
  he: {
    message: 'התקן את האפליקציה לגישה מהירה',
    installButton: 'התקן',
    dismiss: '✕',
  },
  en: {
    message: 'Install the app for quick access',
    installButton: 'Install',
    dismiss: '✕',
  },
  fr: {
    message: 'Installez l\'app pour un accès rapide',
    installButton: 'Installer',
    dismiss: '✕',
  },
  es: {
    message: 'Instala la app para acceso rápido',
    installButton: 'Instalar',
    dismiss: '✕',
  },
  ru: {
    message: 'Установите приложение для быстрого доступа',
    installButton: 'Установить',
    dismiss: '✕',
  }
};

export function InstallPrompt() {
  const { currentLanguage } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const t = translations[currentLanguage as keyof typeof translations] || translations.he;

  useEffect(() => {
    // Don't show if already dismissed (7-day cooldown)
    const lastDismissed = localStorage.getItem('installPromptDismissed');
    const now = Date.now();
    const weekInMs = 7 * 24 * 60 * 60 * 1000;

    if (lastDismissed && (now - parseInt(lastDismissed)) < weekInMs) {
      return;
    }

    // Don't show if already installed as PWA
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return;
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Only show the banner when the browser actually supports install
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      setDeferredPrompt(null);
    }
    setIsVisible(false);
    localStorage.setItem('installPromptDismissed', Date.now().toString());
  };

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('installPromptDismissed', Date.now().toString());
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-20 left-4 right-4 z-40 mx-auto max-w-md animate-slide-up"
      style={{ direction: currentLanguage === 'he' ? 'rtl' : 'ltr' }}
    >
      <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl shadow-lg px-4 py-3">
        {/* App icon */}
        <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </div>

        {/* Message */}
        <p className="text-sm text-gray-700 flex-1">{t.message}</p>

        {/* Install button */}
        <button
          onClick={handleInstall}
          className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors flex-shrink-0"
        >
          {t.installButton}
        </button>

        {/* Dismiss button */}
        <button
          onClick={handleDismiss}
          className="text-gray-400 hover:text-gray-600 text-lg font-bold flex-shrink-0 w-6 h-6 flex items-center justify-center"
          aria-label="Dismiss"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
