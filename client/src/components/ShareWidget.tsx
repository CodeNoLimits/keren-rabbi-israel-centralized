// ===========================================
// KEREN SITE - WhatsApp Share Widget (555)
// ===========================================

import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function ShareWidget() {
  const { currentLanguage } = useLanguage();
  const [quoteIndex, setQuoteIndex] = useState(0);

  const quotes = [
    {
      he: "אֵין שׁוּם יֵאוּשׁ בָּעוֹלָם כְּלָל",
      fr: "Il n'y a aucun désespoir dans le monde!",
      en: "There is no despair in the world at all!",
      es: "¡No hay desesperación en el mundo en absoluto!",
      ru: "В мире нет отчаяния!"
    },
    {
      he: "מִצְוָה גְּדוֹלָה לִהְיוֹת בְּשִׂמְחָה תָּמִיד",
      fr: "C'est une grande mitsva d'être toujours joyeux",
      en: "It is a great mitzvah to always be joyful",
      es: "Es una gran mitzvá estar siempre alegre",
      ru: "Это большая мицва - всегда быть радостным"
    },
    {
      he: "כָּל הָעוֹלָם כֻּּלּוֹ גֶּשֶׁר צַר מְאֹד",
      fr: "Le monde entier est un pont très étroit",
      en: "The whole world is a very narrow bridge",
      es: "Todo el mundo es un puente muy estrecho",
      ru: "Весь мир - это очень узкий мост"
    },
    {
      he: "דַּע שֶׁצָּרִיך לָדוּן אֶת כָּל אָדָם לְכַף זְכוּת",
      fr: "Sache qu'il faut juger chaque personne favorablement",
      en: "Know that you must judge every person favorably",
      es: "Sabe que debes juzgar favorablemente a cada persona",
      ru: "Знай, что нужно судить каждого человека благосклонно"
    },
    {
      he: "לְעוֹלָם לֹא יִתְיָאֵש אָדָם, אֲפִילּוּ נָפַל וְנָפַל",
      fr: "L'homme ne doit jamais désespérer, même s'il tombe et retombe",
      en: "A person should never despair, even if they fall and fall again",
      es: "Una persona nunca debe desesperarse, incluso si cae y cae de nuevo",
      ru: "Человек никогда не должен отчаиваться, даже если падает снова и снова"
    }
  ];

  const currentQuote = quotes[quoteIndex];
  const quoteText = currentQuote[currentLanguage as keyof typeof currentQuote] || currentQuote.fr;
  const quoteHeb = currentQuote.he;

  const shareOnWhatsApp = () => {
    const url = window.location.origin;
    const text = `${quoteText}\n\n${quoteHeb}\n\n📚 Recevez un livre de Rabbi Nachman gratuit:\n${url}`;
    
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    
    // Tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'share', {
        method: 'whatsapp',
        content_type: 'quote',
        item_id: quoteIndex
      });
    }
  };

  const rotateQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % quotes.length);
  };

  const translations = {
    he: {
      share: 'שתף בוואטסאפ',
      subtitle: 'שתף את האור של רבינו עם חבריך!'
    },
    fr: {
      share: 'Partager sur WhatsApp',
      subtitle: 'Partagez la lumière de Rabbi Nachman avec vos amis!'
    },
    en: {
      share: 'Share on WhatsApp',
      subtitle: 'Share the light of Rabbi Nachman with your friends!'
    },
    es: {
      share: 'Compartir en WhatsApp',
      subtitle: '¡Comparte la luz del Rabino Nachman con tus amigos!'
    },
    ru: {
      share: 'Поделиться в WhatsApp',
      subtitle: 'Поделитесь светом Рабби Нахмана с друзьями!'
    }
  };

  const tr = translations[currentLanguage as keyof typeof translations] || translations.fr;

  return (
    <div className="share-widget" style={{
      background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
      color: 'white',
      padding: 'clamp(1.5rem, 3vw, 2.5rem)',
      borderRadius: '15px',
      margin: '2rem 0',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 10px 30px rgba(37, 211, 102, 0.3)'
    }}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        top: '-20%',
        right: '-10%',
        width: '150px',
        height: '150px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '50%',
        filter: 'blur(30px)'
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div 
          className="quote"
          onClick={rotateQuote}
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
            fontStyle: 'italic',
            marginBottom: '1.5rem',
            lineHeight: 1.6,
            cursor: 'pointer',
            padding: '1rem',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '10px',
            transition: 'background 0.3s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
          }}
          title={currentLanguage === 'fr' ? 'Cliquez pour changer de citation' : 'Click to change quote'}
        >
          "{quoteText}"
          <div style={{
            marginTop: '0.5rem',
            fontSize: 'clamp(0.85rem, 2vw, 1rem)',
            opacity: 0.9,
            direction: 'rtl'
          }}>
            {quoteHeb}
          </div>
        </div>

        <button
          onClick={shareOnWhatsApp}
          style={{
            background: 'white',
            color: '#25D366',
            border: 'none',
            padding: 'clamp(0.8rem, 2vw, 1rem) clamp(2rem, 4vw, 3rem)',
            fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
            fontWeight: 'bold',
            borderRadius: '25px',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.8rem',
            transition: 'all 0.3s',
            boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          {tr.share}
        </button>

        <p style={{
          marginTop: '1rem',
          fontSize: 'clamp(0.85rem, 2vw, 1rem)',
          opacity: 0.9
        }}>
          {tr.subtitle}
        </p>
      </div>
    </div>
  );
}

