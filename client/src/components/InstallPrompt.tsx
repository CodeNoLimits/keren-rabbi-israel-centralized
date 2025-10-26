import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const translations = {
  he: {
    title: 'התקן את האפליקציה',
    subtitle: 'קבל גישה מהירה לספרי ברסלב בכל זמן',
    benefits: [
      'גישה מהירה וקלה',
      'עדכונים אוטומטיים',
      'חווית משתמש משופרת',
      'פעולה ללא אינטרנט'
    ],
    installButton: 'התקן עכשיו',
    laterButton: 'אולי מאוחר יותר',
    mobileInstruction: 'לחץ על כפתור "שתף" ואז "הוסף למסך הבית"',
    desktopInstruction: 'לחץ על סמל ההתקנה בשורת הכתובות'
  },
  en: {
    title: 'Install the App',
    subtitle: 'Get quick access to Breslov books anytime',
    benefits: [
      'Fast and easy access',
      'Automatic updates',
      'Enhanced user experience',
      'Offline functionality'
    ],
    installButton: 'Install Now',
    laterButton: 'Maybe Later',
    mobileInstruction: 'Tap the "Share" button then "Add to Home Screen"',
    desktopInstruction: 'Click the install icon in the address bar'
  },
  fr: {
    title: 'Installer l\'App',
    subtitle: 'Accès rapide aux livres Breslov à tout moment',
    benefits: [
      'Accès rapide et facile',
      'Mises à jour automatiques',
      'Expérience utilisateur améliorée',
      'Fonctionnalité hors ligne'
    ],
    installButton: 'Installer Maintenant',
    laterButton: 'Peut-être Plus Tard',
    mobileInstruction: 'Appuyez sur "Partager" puis "Ajouter à l\'écran d\'accueil"',
    desktopInstruction: 'Cliquez sur l\'icône d\'installation dans la barre d\'adresse'
  },
  es: {
    title: 'Instalar la App',
    subtitle: 'Acceso rápido a libros Breslov en cualquier momento',
    benefits: [
      'Acceso rápido y fácil',
      'Actualizaciones automáticas',
      'Experiencia de usuario mejorada',
      'Funcionalidad sin conexión'
    ],
    installButton: 'Instalar Ahora',
    laterButton: 'Tal Vez Después',
    mobileInstruction: 'Toca "Compartir" luego "Agregar a Pantalla de Inicio"',
    desktopInstruction: 'Haz clic en el ícono de instalación en la barra de direcciones'
  },
  ru: {
    title: 'Установить Приложение',
    subtitle: 'Быстрый доступ к книгам Бреслов в любое время',
    benefits: [
      'Быстрый и легкий доступ',
      'Автоматические обновления',
      'Улучшенный пользовательский опыт',
      'Функциональность офлайн'
    ],
    installButton: 'Установить Сейчас',
    laterButton: 'Может Быть Позже',
    mobileInstruction: 'Нажмите "Поделиться" затем "Добавить на главный экран"',
    desktopInstruction: 'Нажмите значок установки в адресной строке'
  }
};

export function InstallPrompt() {
  const { currentLanguage } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isMobile, setIsMobile] = useState(false);
  const t = translations[currentLanguage as keyof typeof translations] || translations.he;

  useEffect(() => {
    // Check if user has already been prompted recently
    const lastPrompted = localStorage.getItem('installPromptLastShown');
    const now = Date.now();
    const dayInMs = 24 * 60 * 60 * 1000; // 24 hours
    
    if (lastPrompted && (now - parseInt(lastPrompted)) < dayInMs) {
      return; // Don't show if shown within last 24 hours
    }

    // Detect mobile device
    const checkIsMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    setIsMobile(checkIsMobile);

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Show prompt after 2.5 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
      localStorage.setItem('installPromptLastShown', now.toString());
    }, 2500);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      clearTimeout(timer);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      }
      setDeferredPrompt(null);
    }
    setIsVisible(false);
  };

  const handleLater = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={handleLater}
      >
        {/* Modal */}
        <div 
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative overflow-hidden"
          style={{direction: currentLanguage === 'he' ? 'rtl' : 'ltr'}}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={handleLater}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
            style={{left: currentLanguage === 'he' ? '1rem' : 'auto', right: currentLanguage === 'he' ? 'auto' : '1rem'}}
          >
            <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>

          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 text-white">
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm6.293-6.707a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 11H3a1 1 0 110-2h4.586L4.879 6.293a1 1 0 011.414-1.414l3 3z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-1">{t.title}</h2>
                <p className="text-red-100 text-sm">{t.subtitle}</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Benefits */}
            <div className="mb-6">
              <div className="grid grid-cols-1 gap-3">
                {t.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3 space-x-reverse">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700 text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions for mobile/desktop */}
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-blue-800 text-sm text-center">
                {isMobile ? t.mobileInstruction : t.desktopInstruction}
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col space-y-3">
              <button
                onClick={handleInstall}
                className="w-full btn-breslov-primary text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 space-x-reverse"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <span>{t.installButton}</span>
              </button>
              
              <button
                onClick={handleLater}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors duration-200"
              >
                {t.laterButton}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}