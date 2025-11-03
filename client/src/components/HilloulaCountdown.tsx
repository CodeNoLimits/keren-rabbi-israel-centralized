// ===========================================
// KEREN SITE - Hilloula Countdown Banner (555)
// ===========================================

import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'wouter';

export default function HilloulaCountdown() {
  const { currentLanguage, t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Hilloula: 18 Tevet - Date fixe chaque année
  // En 2025: 15 Janvier 2025 à 18h00 (heure Jérusalem)
  const hilloulaDate = new Date('2025-01-15T18:00:00+02:00');
  
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = hilloulaDate.getTime() - now.getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        // Hilloula passée, calculer pour l'année prochaine
        const nextYear = new Date(hilloulaDate);
        nextYear.setFullYear(nextYear.getFullYear() + 1);
        const diff = nextYear.getTime() - now.getTime();
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const translations = {
    he: {
      title: '🕯️ הילולא של סבא ישראל - י״ח טבת 🕯️',
      subtitle: 'הגרלה הגדולה של הקרן - אלפי ספרים לזכייה!',
      days: 'ימים',
      hours: 'שעות',
      minutes: 'דקות',
      seconds: 'שניות',
      cta: '🎁 השתתף בהגרלה - 36₪ = 1 כרטיס',
      footer: 'נ נח נחמ נחמן מאומן ✨'
    },
    fr: {
      title: '🕯️ Hilloula de Saba Israël - 18 Tevet 🕯️',
      subtitle: 'La Grande Loterie du Keren - Des milliers de livres à gagner!',
      days: 'Jours',
      hours: 'Heures',
      minutes: 'Minutes',
      seconds: 'Secondes',
      cta: '🎁 Participer à la Loterie - 36₪ = 1 Ticket',
      footer: 'נ נח נחמ נחמן מאומן ✨'
    },
    en: {
      title: '🕯️ Hilloula of Saba Israël - 18 Tevet 🕯️',
      subtitle: 'The Great Keren Lottery - Thousands of books to win!',
      days: 'Days',
      hours: 'Hours',
      minutes: 'Minutes',
      seconds: 'Seconds',
      cta: '🎁 Join the Lottery - 36₪ = 1 Ticket',
      footer: 'נ נח נחמ נחמן מאומן ✨'
    },
    es: {
      title: '🕯️ Hilloula de Saba Israël - 18 Tevet 🕯️',
      subtitle: '¡La Gran Lotería del Keren - Miles de libros para ganar!',
      days: 'Días',
      hours: 'Horas',
      minutes: 'Minutos',
      seconds: 'Segundos',
      cta: '🎁 Participar en la Lotería - 36₪ = 1 Boleto',
      footer: 'נ נח נחמ נחמן מאומן ✨'
    },
    ru: {
      title: '🕯️ Хилула Саба Исраэль - 18 Тевет 🕯️',
      subtitle: 'Большая лотерея Керен - тысячи книг для выигрыша!',
      days: 'Дни',
      hours: 'Часы',
      minutes: 'Минуты',
      seconds: 'Секунды',
      cta: '🎁 Участвовать в лотерее - 36₪ = 1 Билет',
      footer: 'נ נח נחמ נחמן מאומן ✨'
    }
  };

  const tr = translations[currentLanguage as keyof typeof translations] || translations.fr;

  return (
    <div className="hilloula-banner" style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      color: 'white',
      padding: 'clamp(1.5rem, 4vw, 3rem)',
      marginBottom: '2rem',
      borderRadius: '15px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative elements */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        right: '-10%',
        width: '300px',
        height: '300px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '50%',
        filter: 'blur(40px)'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-30%',
        left: '-10%',
        width: '200px',
        height: '200px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '50%',
        filter: 'blur(30px)'
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <h1 style={{
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
          fontWeight: 'bold',
          marginBottom: '1rem',
          textShadow: '0 2px 10px rgba(0,0,0,0.3)'
        }}>
          {tr.title}
        </h1>
        
        <p style={{
          fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
          marginBottom: '2rem',
          opacity: 0.95
        }}>
          {tr.subtitle}
        </p>

        <div className="countdown" style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 'clamp(0.5rem, 2vw, 1.5rem)',
          margin: '2rem 0',
          flexWrap: 'wrap'
        }}>
          {[
            { value: timeLeft.days, label: tr.days },
            { value: timeLeft.hours, label: tr.hours },
            { value: timeLeft.minutes, label: tr.minutes },
            { value: timeLeft.seconds, label: tr.seconds }
          ].map((item, idx) => (
            <div key={idx} style={{
              background: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)',
              padding: 'clamp(0.8rem, 2vw, 1.5rem) clamp(1rem, 3vw, 2rem)',
              borderRadius: '12px',
              minWidth: 'clamp(70px, 15vw, 100px)',
              border: '1px solid rgba(255,255,255,0.3)'
            }}>
              <div style={{
                fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
                fontWeight: 'bold',
                display: 'block',
                lineHeight: 1.2,
                marginBottom: '0.3rem'
              }}>
                {String(item.value).padStart(2, '0')}
              </div>
              <div style={{
                fontSize: 'clamp(0.7rem, 1.5vw, 0.9rem)',
                opacity: 0.9,
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>

        <Link href="/lottery">
          <button style={{
            background: '#FFD700',
            color: '#333',
            border: 'none',
            padding: 'clamp(0.8rem, 2vw, 1.2rem) clamp(2rem, 5vw, 3rem)',
            fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
            fontWeight: 'bold',
            borderRadius: '50px',
            cursor: 'pointer',
            transition: 'all 0.3s',
            marginTop: '1rem',
            boxShadow: '0 5px 20px rgba(255,215,0,0.4)',
            textDecoration: 'none',
            display: 'inline-block'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(255,215,0,0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 5px 20px rgba(255,215,0,0.4)';
          }}
          >
            {tr.cta}
          </button>
        </Link>

        <p style={{
          marginTop: '1.5rem',
          opacity: 0.9,
          fontSize: 'clamp(0.9rem, 2vw, 1.1rem)'
        }}>
          {tr.footer}
        </p>
      </div>
    </div>
  );
}



