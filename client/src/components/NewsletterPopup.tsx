import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const STORAGE_KEY = 'haesh_newsletter_shown';
const SHOW_DELAY_MS = 30000; // 30 seconds
const SCROLL_THRESHOLD = 0.5; // 50% scroll

const translations = {
  he: {
    title: 'הצטרפו לניוזלטר של האש שלי',
    subtitle: 'קבלו עדכונים על ספרים חדשים וחכמת ברסלב',
    placeholder: 'כתובת אימייל',
    submit: 'הרשמה',
    thankYou: 'תודה רבה!',
    thankYouMsg: 'נרשמת בהצלחה לניוזלטר',
  },
  en: {
    title: 'Join the HaEsh Sheli Newsletter',
    subtitle: 'Get updates on new books and Breslov wisdom',
    placeholder: 'Email address',
    submit: 'Subscribe',
    thankYou: 'Thank you!',
    thankYouMsg: 'You have been subscribed successfully',
  },
  fr: {
    title: 'Rejoignez la Newsletter HaEsh Sheli',
    subtitle: 'Recevez des mises à jour sur les nouveaux livres et la sagesse Breslov',
    placeholder: 'Adresse email',
    submit: "S'inscrire",
    thankYou: 'Merci !',
    thankYouMsg: 'Vous êtes inscrit avec succès',
  },
  es: {
    title: 'Únete al Boletín HaEsh Sheli',
    subtitle: 'Recibe actualizaciones sobre nuevos libros y sabiduría Breslov',
    placeholder: 'Correo electrónico',
    submit: 'Suscribirse',
    thankYou: '¡Gracias!',
    thankYouMsg: 'Te has suscrito con éxito',
  },
  ru: {
    title: 'Подписаться на рассылку ХаЭш Шели',
    subtitle: 'Получайте обновления о новых книгах и мудрости Бреслов',
    placeholder: 'Электронная почта',
    submit: 'Подписаться',
    thankYou: 'Спасибо!',
    thankYouMsg: 'Вы успешно подписались',
  },
};

export function NewsletterPopup() {
  const { currentLanguage } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isRTL = currentLanguage === 'he';
  const t = translations[currentLanguage as keyof typeof translations] || translations.en;

  const showPopup = useCallback(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    sessionStorage.setItem(STORAGE_KEY, 'true');
    setIsVisible(true);
  }, []);

  useEffect(() => {
    // Already shown this session
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    // Timer trigger: 30 seconds
    const timer = setTimeout(() => {
      showPopup();
    }, SHOW_DELAY_MS);

    // Scroll trigger: 50% page scroll
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0 && window.scrollY / scrollHeight >= SCROLL_THRESHOLD) {
        showPopup();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [showPopup]);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
    }, 300);
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    // No backend yet - just show thank you
    setIsSubmitted(true);
    setTimeout(() => {
      handleClose();
    }, 2500);
  }, [email, handleClose]);

  if (!isVisible) return null;

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      style={{
        position: 'fixed',
        bottom: isClosing ? '-300px' : '24px',
        right: isRTL ? 'auto' : '24px',
        left: isRTL ? '24px' : 'auto',
        zIndex: 9999,
        width: '360px',
        maxWidth: 'calc(100vw - 48px)',
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)',
        overflow: 'hidden',
        transition: 'bottom 0.3s ease, opacity 0.3s ease',
        opacity: isClosing ? 0 : 1,
        direction: isRTL ? 'rtl' : 'ltr',
      }}
    >
      {/* Orange accent top bar */}
      <div style={{ height: '4px', background: 'linear-gradient(90deg, #FF6B35, #FF8C5A)' }} />

      {/* Close button */}
      <button
        onClick={handleClose}
        aria-label="Close"
        style={{
          position: 'absolute',
          top: '8px',
          right: isRTL ? 'auto' : '8px',
          left: isRTL ? '8px' : 'auto',
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          border: 'none',
          background: '#f3f4f6',
          color: '#6b7280',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '16px',
          lineHeight: 1,
          transition: 'background 0.2s ease',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = '#e5e7eb'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = '#f3f4f6'; }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <div style={{ padding: '20px 24px 24px' }}>
        {isSubmitted ? (
          /* Thank you state */
          <div style={{ textAlign: 'center', padding: '12px 0' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #34D399, #10B981)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1f2937', marginBottom: '6px' }}>
              {t.thankYou}
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>
              {t.thankYouMsg}
            </p>
          </div>
        ) : (
          /* Form state */
          <>
            {/* Newsletter icon */}
            <div style={{ marginBottom: '12px' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #FFF7ED, #FFEDD5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
            </div>

            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#1f2937', marginBottom: '6px', lineHeight: '1.3' }}>
              {t.title}
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '16px', lineHeight: '1.4' }}>
              {t.subtitle}
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px' }}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.placeholder}
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1.5px solid #e5e7eb',
                  fontSize: '0.9rem',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                  direction: isRTL ? 'rtl' : 'ltr',
                  minWidth: 0,
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = '#FF6B35'; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = '#e5e7eb'; }}
              />
              <button
                type="submit"
                style={{
                  padding: '10px 18px',
                  borderRadius: '10px',
                  border: 'none',
                  background: '#FF6B35',
                  color: 'white',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'background 0.2s ease',
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#e55a2b'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#FF6B35'; }}
              >
                {t.submit}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
