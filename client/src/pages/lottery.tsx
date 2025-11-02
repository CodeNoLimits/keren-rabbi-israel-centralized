// ===========================================
// KEREN SITE - Lottery Page (555)
// ===========================================

import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Header } from '../components/Header';
// import HilloulaCountdown from '../components/HilloulaCountdown';

export default function Lottery() {
  const { currentLanguage, setLanguage } = useLanguage();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    donation_amount: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const translations = {
    he: {
      title: '🎟 הגרלת הקרן הגדולה',
      subtitle: 'הצטרפו להגרלה וזכו בספרי קודש של רבינו נחמן מברסלב',
      formTitle: 'הזינו את פרטיכם',
      nameLabel: 'שם מלא',
      emailLabel: 'אימייל',
      phoneLabel: 'טלפון',
      amountLabel: 'סכום התרומה (₪)',
      amountPlaceholder: '36',
      submit: 'הצטרף להגרלה',
      submitting: 'שולח...',
      success: '✅ ההרשמה הצליחה! אתם משתתפים בהגרלה!',
      error: '❌ שגיאה: ',
      note: 'כל התרומות תומכות בהפצת ספרי הקודש של רבינו. נ נח נחמ נחמן מאומן ✨'
    },
    fr: {
      title: '🎟 Grande Loterie du Keren',
      subtitle: 'Rejoignez la loterie et gagnez des livres saints de Rabbi Nachman de Breslov',
      formTitle: 'Entrez vos informations',
      nameLabel: 'Nom complet',
      emailLabel: 'Email',
      phoneLabel: 'Téléphone',
      amountLabel: 'Montant du don (₪)',
      amountPlaceholder: '36',
      submit: 'Participer à la loterie',
      submitting: 'Envoi...',
      success: '✅ Inscription réussie ! Vous participez à la loterie !',
      error: '❌ Erreur: ',
      note: 'Tous les dons soutiennent la diffusion des livres saints de Rabbi Nachman. נ נח נחמ נחמן מאומן ✨'
    },
    en: {
      title: '🎟 Great Keren Lottery',
      subtitle: 'Join the lottery and win holy books of Rabbi Nachman of Breslov',
      formTitle: 'Enter your information',
      nameLabel: 'Full name',
      emailLabel: 'Email',
      phoneLabel: 'Phone',
      amountLabel: 'Donation amount (₪)',
      amountPlaceholder: '36',
      submit: 'Join the lottery',
      submitting: 'Sending...',
      success: '✅ Registration successful! You are participating in the lottery!',
      error: '❌ Error: ',
      note: 'All donations support the spread of Rabbi Nachman\'s holy books. נ נח נחמ נחמן מאומן ✨'
    },
    es: {
      title: '🎟 Gran Lotería del Keren',
      subtitle: 'Únete a la lotería y gana libros sagrados del Rabino Nachman de Breslov',
      formTitle: 'Ingresa tu información',
      nameLabel: 'Nombre completo',
      emailLabel: 'Email',
      phoneLabel: 'Teléfono',
      amountLabel: 'Monto de donación (₪)',
      amountPlaceholder: '36',
      submit: 'Unirse a la lotería',
      submitting: 'Enviando...',
      success: '✅ ¡Registro exitoso! ¡Estás participando en la lotería!',
      error: '❌ Error: ',
      note: 'Todas las donaciones apoyan la difusión de los libros sagrados del Rabino Nachman. נ נח נחמ נחמן מאומן ✨'
    },
    ru: {
      title: '🎟 Великая Лотерея Керен',
      subtitle: 'Присоединяйтесь к лотерее и выигрывайте святые книги Рабби Нахмана из Бреслов',
      formTitle: 'Введите вашу информацию',
      nameLabel: 'Полное имя',
      emailLabel: 'Email',
      phoneLabel: 'Телефон',
      amountLabel: 'Сумма пожертвования (₪)',
      amountPlaceholder: '36',
      submit: 'Присоединиться к лотерее',
      submitting: 'Отправка...',
      success: '✅ Регистрация успешна! Вы участвуете в лотерее!',
      error: '❌ Ошибка: ',
      note: 'Все пожертвования поддерживают распространение святых книг Рабби Нахмана. נ נח נחמ נחמן מאומן ✨'
    }
  };

  const tr = translations[currentLanguage as keyof typeof translations] || translations.fr;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setSuccess(false);

    try {
      const res = await fetch('/api/lottery/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setLoading(false);

      if (data.ok || data.success) {
        setSuccess(true);
        setMessage(tr.success);
        setForm({ name: '', email: '', phone: '', donation_amount: '' });
        
        // Tracking
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'lottery_signup', {
            event_category: 'lottery',
            event_label: 'form_submit',
            value: parseInt(form.donation_amount) || 36
          });
        }
      } else {
        setMessage(tr.error + (data.error || data.message || 'Erreur inconnue'));
      }
    } catch (error: any) {
      setLoading(false);
      setMessage(tr.error + (error.message || 'Erreur de connexion'));
    }
  }

  return (
    <div style={{direction: currentLanguage === 'he' ? 'rtl' : 'ltr', minHeight: '100vh'}}>
      <Header currentLanguage={currentLanguage} onLanguageChange={setLanguage} />

      {/* HILLOULA COUNTDOWN */}
      <div style={{maxWidth: '1200px', margin: '0 auto', padding: '2rem'}}>
        {/* <HilloulaCountdown /> */}
      </div>

      {/* LOTTERY FORM SECTION */}
      <main style={{
        background: 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)',
        padding: '4rem 2rem',
        minHeight: '60vh'
      }}>
        <div style={{maxWidth: '600px', margin: '0 auto'}}>
          <div style={{
            background: 'white',
            borderRadius: '20px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
            padding: 'clamp(2rem, 5vw, 3.5rem)',
            textAlign: 'center'
          }}>
            <h1 style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              fontWeight: 'bold',
              marginBottom: '1rem',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              {tr.title}
            </h1>
            
            <p style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
              color: '#666',
              marginBottom: '2.5rem',
              lineHeight: 1.6
            }}>
              {tr.subtitle}
            </p>

            <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left'}}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: '600',
                  color: '#333',
                  fontSize: '0.95rem'
                }}>
                  {tr.nameLabel} *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '0.9rem 1.2rem',
                    border: '2px solid #e0e0e0',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    transition: 'border-color 0.3s',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#667eea'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#e0e0e0'}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: '600',
                  color: '#333',
                  fontSize: '0.95rem'
                }}>
                  {tr.emailLabel} *
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '0.9rem 1.2rem',
                    border: '2px solid #e0e0e0',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    transition: 'border-color 0.3s',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#667eea'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#e0e0e0'}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: '600',
                  color: '#333',
                  fontSize: '0.95rem'
                }}>
                  {tr.phoneLabel}
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.9rem 1.2rem',
                    border: '2px solid #e0e0e0',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    transition: 'border-color 0.3s',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#667eea'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#e0e0e0'}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: '600',
                  color: '#333',
                  fontSize: '0.95rem'
                }}>
                  {tr.amountLabel}
                </label>
                <input
                  type="number"
                  value={form.donation_amount}
                  onChange={(e) => setForm({ ...form, donation_amount: e.target.value })}
                  placeholder={tr.amountPlaceholder}
                  min="36"
                  style={{
                    width: '100%',
                    padding: '0.9rem 1.2rem',
                    border: '2px solid #e0e0e0',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    transition: 'border-color 0.3s',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#667eea'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#e0e0e0'}
                />
                <p style={{fontSize: '0.85rem', color: '#888', marginTop: '0.5rem'}}>
                  {currentLanguage === 'he' ? 'מינימום 36₪ = 1 כרטיס בהגרלה' :
                   currentLanguage === 'en' ? 'Minimum 36₪ = 1 ticket in lottery' :
                   currentLanguage === 'fr' ? 'Minimum 36₪ = 1 ticket à la loterie' :
                   currentLanguage === 'es' ? 'Mínimo 36₪ = 1 boleto en la lotería' :
                   'Минимум 36₪ = 1 билет в лотерее'}
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  background: loading ? '#ccc' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '1.1rem 2rem',
                  borderRadius: '12px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s',
                  marginTop: '0.5rem',
                  boxShadow: loading ? 'none' : '0 5px 20px rgba(102, 126, 234, 0.4)'
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.currentTarget.style.transform = 'scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.5)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = loading ? 'none' : '0 5px 20px rgba(102, 126, 234, 0.4)';
                }}
              >
                {loading ? tr.submitting : tr.submit}
              </button>
            </form>

            {message && (
              <div style={{
                marginTop: '1.5rem',
                padding: '1rem',
                borderRadius: '10px',
                background: success ? '#d4edda' : '#f8d7da',
                color: success ? '#155724' : '#721c24',
                fontSize: '0.95rem',
                textAlign: 'center'
              }}>
                {message}
              </div>
            )}

            <p style={{
              marginTop: '2rem',
              fontSize: '0.9rem',
              color: '#888',
              lineHeight: 1.6,
              textAlign: 'center'
            }}>
              {tr.note}
            </p>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer style={{background: 'hsl(210, 85%, 25%)', color: 'white', padding: '2rem', textAlign: 'center'}}>
        <p style={{fontSize: '0.9rem', opacity: 0.8}}>
          {currentLanguage === 'he' ? 'כל הזכיות שמורות 2025 © קרן רבי ישראל דב אודסר זצ"ל' :
           currentLanguage === 'en' ? 'All rights reserved 2025 © Rabbi Israel Dov Odesser Foundation' :
           currentLanguage === 'fr' ? 'Tous droits réservés 2025 © Fondation Rabbi Israel Dov Odesser' :
           currentLanguage === 'es' ? 'Todos los derechos reservados 2025 © Fundación Rabino Israel Dov Odesser' :
           'Все права защищены 2025 © Фонд Рабби Израэля Дова Одессера'}
        </p>
      </footer>
    </div>
  );
}
