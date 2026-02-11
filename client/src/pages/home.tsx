import { Header } from '../components/Header';
import { useLanguage } from '../contexts/LanguageContext';

export default function Home() {
  const { currentLanguage, setLanguage } = useLanguage();

  return (
    <div className="rtl home page-template-default page page-id-13" style={{direction: currentLanguage === 'he' ? 'rtl' : 'ltr', background: '#FFFFFF'}}>
      {/* TOP BAR */}
      <section style={{background: 'hsl(210, 85%, 45%)', color: 'white', padding: '8px 0'}}>
        <div style={{maxWidth: '1200px', margin: '0 auto', padding: '0 2rem'}}>
          <ul style={{display: 'flex', gap: '1rem', listStyle: 'none', margin: 0, padding: 0, justifyContent: 'center'}}>
            <li style={{display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem'}}>
              <span>🚚</span>
              <span>
                {currentLanguage === 'he' ? 'משלוחים חינם החל מ- 399 ש"ח' :
                 currentLanguage === 'en' ? 'Free shipping from 399 ₪' :
                 currentLanguage === 'fr' ? 'Livraison gratuite à partir de 399 ₪' :
                 currentLanguage === 'es' ? 'Envío gratis desde 399 ₪' :
                 currentLanguage === 'ru' ? 'Бесплатная доставка от 399 ₪' : 'משלוחים חינם החל מ- 399 ש"ח'}
              </span>
            </li>
          </ul>
        </div>
      </section>

      <Header currentLanguage={currentLanguage} onLanguageChange={setLanguage} />

      {/* HERO SECTION - Clean, white, airy */}
      <section style={{
        background: '#FFFFFF',
        padding: '6rem 0 5rem',
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div style={{maxWidth: '900px', margin: '0 auto', padding: '0 2rem', width: '100%'}}>
          <div style={{
            textAlign: 'center',
            padding: '3rem 2rem',
          }}>
            <h1 style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              fontWeight: '700',
              marginBottom: '1.5rem',
              lineHeight: '1.2',
              color: 'hsl(210, 25%, 20%)',
              fontFamily: currentLanguage === 'he' ? 'var(--font-hebrew)' : 'var(--font-latin)',
              letterSpacing: '-0.01em'
            }}>
              {currentLanguage === 'he' ? 'ספרי רבינו נחמן מברסלב זצ״ל' :
               currentLanguage === 'en' ? 'Books of Our Master Rabbi Nachman of Breslov' :
               currentLanguage === 'fr' ? 'Livres de Notre Maître Rabbi Nachman de Breslov' :
               currentLanguage === 'es' ? 'Libros de Nuestro Maestro Rabino Nachman de Breslov' :
               currentLanguage === 'ru' ? 'Книги Нашего Учителя Рабби Нахмана из Бреслов' : 'ספרי רבינו נחמן מברסלב זצ״ל'}
            </h1>
            <h2 style={{
              fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
              fontWeight: '300',
              marginBottom: '2rem',
              color: 'hsl(210, 15%, 50%)',
              fontFamily: currentLanguage === 'he' ? 'var(--font-hebrew)' : 'var(--font-serif)'
            }}>
              {currentLanguage === 'he' ? 'הדרך לאוצר שלך.' :
               currentLanguage === 'en' ? 'The Path to Your Treasure.' :
               currentLanguage === 'fr' ? 'Le Chemin vers Votre Trésor.' :
               currentLanguage === 'es' ? 'El Camino hacia Tu Tesoro.' :
               currentLanguage === 'ru' ? 'Путь к Вашему Сокровищу.' : 'הדרך לאוצר שלך.'}
            </h2>
            <p style={{
              marginBottom: '2.5rem',
              fontStyle: 'italic',
              color: 'hsl(210, 12%, 40%)',
              fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
              lineHeight: '1.7',
              maxWidth: '600px',
              margin: '0 auto 2.5rem'
            }}>
              {currentLanguage === 'he' ? '\'\'רק תנו לי את ליבכם ואוליך אתכם בדרך חדשה..\'\' (רבי נחמן)' :
               currentLanguage === 'en' ? '"Just give me your hearts and I will lead you on a new path..." (Rabbi Nachman)' :
               currentLanguage === 'fr' ? '"Donnez-moi simplement vos cœurs et je vous mènerai sur un nouveau chemin..." (Rabbi Nachman)' :
               currentLanguage === 'es' ? '"Solo denme sus corazones y los guiaré por un camino nuevo..." (Rabino Nachman)' :
               currentLanguage === 'ru' ? '"Просто дайте мне ваши сердца и я поведу вас новым путем..." (Рабби Нахман)' : '\'\'רק תנו לי את ליבכם ואוליך אתכם בדרך חדשה..\'\' (רבי נחמן)'}
            </p>
            <div style={{display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center'}}>
              <a href="/store" style={{textDecoration: 'none'}}>
                <button data-testid="button-enter-store" style={{
                  background: 'hsl(210, 85%, 45%)',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '1rem 2.5rem',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontSize: '1.05rem',
                  fontWeight: '600',
                  boxShadow: '0 4px 14px hsla(210, 85%, 45%, 0.3)',
                  transition: 'all 0.2s ease'
                }}>
                  {currentLanguage === 'he' ? 'כניסה לחנות' :
                   currentLanguage === 'en' ? 'Enter Store' :
                   currentLanguage === 'fr' ? 'Entrer dans la Boutique' :
                   currentLanguage === 'es' ? 'Entrar a la Tienda' :
                   currentLanguage === 'ru' ? 'Войти в Магазин' : 'כניסה לחנות'}
                </button>
              </a>
              <a href="/join" style={{textDecoration: 'none'}}>
                <button data-testid="button-discover-activities" style={{
                  background: '#FFFFFF',
                  color: 'hsl(210, 85%, 45%)',
                  border: '1.5px solid hsl(210, 85%, 45%)',
                  padding: '1rem 2.5rem',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontSize: '1.05rem',
                  fontWeight: '600',
                  transition: 'all 0.2s ease'
                }}>
                  {currentLanguage === 'he' ? 'באו לגלות על הפעילות שלנו' :
                   currentLanguage === 'en' ? 'Discover Our Activities' :
                   currentLanguage === 'fr' ? 'Découvrez nos Activités' :
                   currentLanguage === 'es' ? 'Descubra Nuestras Actividades' :
                   currentLanguage === 'ru' ? 'Узнайте о Наших Мероприятиях' : 'באו לגלות על הפעילות שלנו'}
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* LEADING BOOKS SECTION - White background, generous spacing */}
      <section style={{background: '#FFFFFF', padding: '5rem 0'}}>
        <div style={{maxWidth: '1200px', margin: '0 auto', padding: '0 2rem'}}>
          <div style={{textAlign: 'center', marginBottom: '3.5rem'}}>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              fontWeight: '700',
              color: 'hsl(210, 25%, 20%)',
              marginBottom: '0.5rem',
              fontFamily: currentLanguage === 'he' ? 'var(--font-hebrew)' : 'var(--font-serif)'
            }}>
              {currentLanguage === 'he' ? 'ספרי רבנו המובילים' :
               currentLanguage === 'en' ? 'Leading Books of Our Master' :
               currentLanguage === 'fr' ? 'Livres Principaux de Notre Maître' :
               currentLanguage === 'es' ? 'Libros Principales de Nuestro Maestro' :
               currentLanguage === 'ru' ? 'Ведущие Книги Нашего Учителя' : 'ספרי רבנו המובילים'}
            </h2>
            <div style={{width: '60px', height: '3px', background: 'hsl(210, 85%, 45%)', margin: '1rem auto 0', borderRadius: '2px'}} />
          </div>

          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem'}}>
            {[
              {
                title: 'ליקוטי מוהרן',
                titleEn: 'Likutei Moharan',
                image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/07/6.d110a0.webp'
              },
              {
                title: 'ליקוטי תפילות',
                titleEn: 'Likutei Tefilot',
                image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/07/3.d110a0.webp'
              },
              {
                title: 'חומש ליקוטי הלכות',
                titleEn: 'Chumash Likutei Halachos',
                image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/07/5.d110a0.webp'
              },
              {
                title: 'ליקוטי הלכות',
                titleEn: 'Likutei Halachos',
                image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/07/2.d110a0.webp'
              },
              {
                title: 'סיפורי מעשיות',
                titleEn: 'Tales of Ancient Times',
                image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2025/02/%D7%AA%D7%9E%D7%95%D7%A0%D7%AA-%D7%9E%D7%95%D7%A6%D7%A8-3.d110a0.webp'
              },
              {
                title: 'כל בו לישועות',
                titleEn: 'Complete Guide to Salvation',
                image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/07/1.d110a0.webp'
              }
            ].map((book, index) => (
              <a key={index} href="/store" style={{textDecoration: 'none', color: 'inherit'}}>
                <div style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  background: '#FFFFFF',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)';
                  }}>
                  <div style={{height: '240px', overflow: 'hidden'}}>
                    <img loading="lazy"
                      src={book.image}
                      alt={book.title}
                      style={{width: '100%', height: '100%', objectFit: 'cover'}}
                    />
                  </div>
                  <div style={{padding: '1.25rem', textAlign: 'center'}}>
                    <h3 style={{fontSize: '1.1rem', fontWeight: '600', color: 'hsl(210, 25%, 25%)', margin: 0}}>
                      {currentLanguage === 'he' ? book.title : book.titleEn}
                    </h3>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* RABBI NATHAN QUOTE SECTION - Soft, light background instead of heavy blue */}
      <section style={{background: 'hsl(210, 30%, 97%)', padding: '5rem 0'}}>
        <div style={{maxWidth: '700px', margin: '0 auto', padding: '0 2rem', textAlign: 'center'}}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            padding: '3rem 2.5rem',
            boxShadow: '0 2px 20px rgba(0,0,0,0.04)',
          }}>
            <h2 style={{
              fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
              fontWeight: '600',
              marginBottom: '0.75rem',
              color: 'hsl(210, 25%, 20%)',
            }}>
              {currentLanguage === 'he' ? 'דף אחד מספרי רבנו' :
               currentLanguage === 'en' ? 'One Page from Our Master\'s Books' :
               currentLanguage === 'fr' ? 'Une Page des Livres de Notre Maître' :
               currentLanguage === 'es' ? 'Una Página de los Libros de Nuestro Maestro' :
               currentLanguage === 'ru' ? 'Одна Страница из Книг Нашего Учителя' : 'דף אחד מספרי רבנו'}
            </h2>
            <h3 style={{
              fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
              fontWeight: '400',
              marginBottom: '1rem',
              color: 'hsl(210, 85%, 45%)',
            }}>
              {currentLanguage === 'he' ? 'יהיה תיקון על הכל!' :
               currentLanguage === 'en' ? 'There will be rectification for everything!' :
               currentLanguage === 'fr' ? 'Il y aura une rectification pour tout!' :
               currentLanguage === 'es' ? '¡Habrá rectificación para todo!' :
               currentLanguage === 'ru' ? 'Будет исправление для всего!' : 'יהיה תיקון על הכל!'}
            </h3>
            <p style={{fontSize: '0.95rem', fontStyle: 'italic', color: 'hsl(210, 12%, 50%)', margin: 0}}>
              {currentLanguage === 'he' ? 'רבי נתן מברסלב' :
               currentLanguage === 'en' ? 'Rabbi Nathan of Breslov' :
               currentLanguage === 'fr' ? 'Rabbi Nathan de Breslov' :
               currentLanguage === 'es' ? 'Rabino Nathan de Breslov' :
               currentLanguage === 'ru' ? 'Рабби Натан из Бреслов' : 'רבי נתן מברסלב'}
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION - White, clean cards */}
      <section style={{background: '#FFFFFF', padding: '5rem 0'}}>
        <div style={{maxWidth: '1100px', margin: '0 auto', padding: '0 2rem'}}>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem'}}>
            {[
              {
                icon: '🚚',
                titleHe: 'משלוח מהיר עד הבית חינם',
                titleEn: 'Fast Free Home Delivery',
                titleFr: 'Livraison Rapide Gratuite à Domicile',
                titleEs: 'Entrega Rápida Gratuita a Domicilio',
                titleRu: 'Быстрая Бесплатная Доставка на Дом',
                descHe: 'ברכישה מעל 299 ₪ מהחנות',
                descEn: 'On purchases over 299 ₪ from the store',
                descFr: 'Sur les achats de plus de 299 ₪ du magasin',
                descEs: 'En compras mayores a 299 ₪ de la tienda',
                descRu: 'При покупках свыше 299 ₪ из магазина',
              },
              {
                icon: '🔒',
                titleHe: 'רכישה מאובטחת',
                titleEn: 'Secure Purchase',
                titleFr: 'Achat Sécurisé',
                titleEs: 'Compra Segura',
                titleRu: 'Безопасная Покупка',
                descHe: 'באמצעות תעודת SSL ובתקנים המחמירים ביותר',
                descEn: 'Using SSL certificate and the most stringent standards',
                descFr: 'En utilisant un certificat SSL et les normes les plus strictes',
                descEs: 'Utilizando certificado SSL y los estándares más estrictos',
                descRu: 'Использование SSL-сертификата и самых строгих стандартов',
              },
              {
                icon: '📚',
                titleHe: 'חנות הספרים הגדולה ביותר לספרי רבנו אונליין',
                titleEn: 'Largest Online Bookstore for Our Master\'s Books',
                titleFr: 'Plus Grande Librairie en Ligne',
                titleEs: 'Librería en Línea Más Grande',
                titleRu: 'Крупнейший Интернет-Книжный Магазин',
                descHe: 'משלוחים לכל הארץ',
                descEn: 'Shipping throughout the country',
                descFr: 'Expédition dans tout le pays',
                descEs: 'Envío por todo el país',
                descRu: 'Доставка по всей стране',
              },
              {
                icon: '🎧',
                titleHe: 'שירות לקוחות מעולה וזמין תמיד לשירותכם',
                titleEn: 'Excellent Customer Service Always Available',
                titleFr: 'Excellent Service Client Toujours Disponible',
                titleEs: 'Excelente Servicio al Cliente Siempre Disponible',
                titleRu: 'Отличное Обслуживание Клиентов Всегда Доступно',
                descHe: 'עד 12 תשלומים ללא ריבית',
                descEn: 'Up to 12 payments without interest',
                descFr: 'Jusqu\'à 12 paiements sans intérêt',
                descEs: 'Hasta 12 pagos sin interés',
                descRu: 'До 12 платежей без процентов',
              },
            ].map((service, index) => (
              <div key={index} style={{
                background: '#FFFFFF',
                padding: '2rem 1.5rem',
                borderRadius: '12px',
                boxShadow: '0 1px 8px rgba(0,0,0,0.05)',
                textAlign: 'center',
                transition: 'box-shadow 0.3s ease',
              }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)'}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 1px 8px rgba(0,0,0,0.05)'}
              >
                <div style={{fontSize: '2.5rem', marginBottom: '1rem'}}>{service.icon}</div>
                <h3 style={{fontSize: '1.05rem', fontWeight: '600', color: 'hsl(210, 25%, 25%)', marginBottom: '0.75rem', lineHeight: '1.4'}}>
                  {currentLanguage === 'he' ? service.titleHe :
                   currentLanguage === 'en' ? service.titleEn :
                   currentLanguage === 'fr' ? service.titleFr :
                   currentLanguage === 'es' ? service.titleEs :
                   currentLanguage === 'ru' ? service.titleRu : service.titleHe}
                </h3>
                <p style={{color: 'hsl(210, 10%, 55%)', fontSize: '0.88rem', margin: 0, lineHeight: '1.5'}}>
                  {currentLanguage === 'he' ? service.descHe :
                   currentLanguage === 'en' ? service.descEn :
                   currentLanguage === 'fr' ? service.descFr :
                   currentLanguage === 'es' ? service.descEs :
                   currentLanguage === 'ru' ? service.descRu : service.descHe}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION - Light background, clean cards instead of heavy blue gradient */}
      <section style={{background: 'hsl(210, 30%, 97%)', padding: '5rem 0'}}>
        <div style={{maxWidth: '1000px', margin: '0 auto', padding: '0 2rem'}}>
          <div style={{textAlign: 'center', marginBottom: '3rem'}}>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              fontWeight: '700',
              color: 'hsl(210, 25%, 20%)',
              marginBottom: '0.5rem',
            }}>
              {currentLanguage === 'he' ? 'הקטגוריות בחנות' :
               currentLanguage === 'en' ? 'Store Categories' :
               currentLanguage === 'fr' ? 'Catégories du Magasin' :
               currentLanguage === 'es' ? 'Categorías de la Tienda' :
               currentLanguage === 'ru' ? 'Категории Магазина' : 'הקטגוריות בחנות'}
            </h2>
            <div style={{width: '60px', height: '3px', background: 'hsl(210, 85%, 45%)', margin: '1rem auto 0', borderRadius: '2px'}} />
          </div>

          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem'}}>
            <div style={{
              background: '#FFFFFF',
              padding: '2.5rem 2rem',
              borderRadius: '12px',
              textAlign: 'center',
              boxShadow: '0 1px 8px rgba(0,0,0,0.05)',
            }}>
              <h3 style={{fontSize: '1.2rem', fontWeight: '600', marginBottom: '1.25rem', color: 'hsl(210, 25%, 25%)'}}>
                {currentLanguage === 'he' ? 'כל חיבורי רבנו הקדוש' :
                 currentLanguage === 'en' ? 'All Holy Compositions of Our Master' :
                 currentLanguage === 'fr' ? 'Toutes les Compositions Saintes de Notre Maître' :
                 currentLanguage === 'es' ? 'Todas las Composiciones Sagradas de Nuestro Maestro' :
                 currentLanguage === 'ru' ? 'Все Святые Сочинения Нашего Учителя' : 'כל חיבורי רבנו הקדוש'}
              </h3>
              <a href="/store" style={{textDecoration: 'none'}}>
                <button style={{
                  background: 'hsl(210, 85%, 45%)',
                  color: 'white',
                  border: 'none',
                  padding: '0.8rem 2rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '600',
                  boxShadow: '0 2px 8px hsla(210, 85%, 45%, 0.25)',
                  transition: 'all 0.2s ease',
                }}>
                  {currentLanguage === 'he' ? 'לחצו כאן' :
                   currentLanguage === 'en' ? 'Click Here' :
                   currentLanguage === 'fr' ? 'Cliquez Ici' :
                   currentLanguage === 'es' ? 'Haga Clic Aquí' :
                   currentLanguage === 'ru' ? 'Нажмите Здесь' : 'לחצו כאן'}
                </button>
              </a>
            </div>

            <div style={{
              background: '#FFFFFF',
              padding: '2.5rem 2rem',
              borderRadius: '12px',
              textAlign: 'center',
              boxShadow: '0 1px 8px rgba(0,0,0,0.05)',
            }}>
              <h3 style={{fontSize: '1.2rem', fontWeight: '600', marginBottom: '1.25rem', color: 'hsl(210, 25%, 25%)'}}>
                {currentLanguage === 'he' ? 'כל ספרי רבי ישראל' :
                 currentLanguage === 'en' ? 'All Books of Rabbi Israel' :
                 currentLanguage === 'fr' ? 'Tous les Livres de Rabbi Israel' :
                 currentLanguage === 'es' ? 'Todos los Libros del Rabino Israel' :
                 currentLanguage === 'ru' ? 'Все Книги Рабби Израэля' : 'כל ספרי רבי ישראל'}
              </h3>
              <a href="/store" style={{textDecoration: 'none'}}>
                <button style={{
                  background: 'hsl(210, 85%, 45%)',
                  color: 'white',
                  border: 'none',
                  padding: '0.8rem 2rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '600',
                  boxShadow: '0 2px 8px hsla(210, 85%, 45%, 0.25)',
                  transition: 'all 0.2s ease',
                }}>
                  {currentLanguage === 'he' ? 'לחצו כאן' :
                   currentLanguage === 'en' ? 'Click Here' :
                   currentLanguage === 'fr' ? 'Cliquez Ici' :
                   currentLanguage === 'es' ? 'Haga Clic Aquí' :
                   currentLanguage === 'ru' ? 'Нажмите Здесь' : 'לחצו כאן'}
                </button>
              </a>
            </div>
          </div>

          <div style={{textAlign: 'center'}}>
            <a href="/store" style={{textDecoration: 'none'}}>
              <button style={{
                background: '#FFFFFF',
                color: 'hsl(210, 85%, 45%)',
                border: '1.5px solid hsl(210, 85%, 45%)',
                padding: '0.8rem 2rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600',
                transition: 'all 0.2s ease',
              }}>
                {currentLanguage === 'he' ? 'לקטגוריות נוספות לחצו כאן' :
                 currentLanguage === 'en' ? 'For additional categories click here' :
                 currentLanguage === 'fr' ? 'Pour des catégories supplémentaires cliquez ici' :
                 currentLanguage === 'es' ? 'Para categorías adicionales haga clic aquí' :
                 currentLanguage === 'ru' ? 'Для дополнительных категорий нажмите здесь' : 'לקטגוריות נוספות לחצו כאן'}
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* NEWSLETTER SECTION - White, clean */}
      <section style={{background: '#FFFFFF', padding: '5rem 0'}}>
        <div style={{maxWidth: '700px', margin: '0 auto', padding: '0 2rem', textAlign: 'center'}}>
          <h2 style={{
            fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
            fontWeight: '700',
            color: 'hsl(210, 25%, 20%)',
            marginBottom: '0.75rem',
          }}>
            {currentLanguage === 'he' ? 'הצטרפו עכשיו לרשימת תפוצה' :
             currentLanguage === 'en' ? 'Join Our Mailing List Now' :
             currentLanguage === 'fr' ? 'Rejoignez Notre Liste de Diffusion Maintenant' :
             currentLanguage === 'es' ? 'Únete a Nuestra Lista de Correo Ahora' :
             currentLanguage === 'ru' ? 'Присоединяйтесь к Нашему Списку Рассылки Сейчас' : 'הצטרפו עכשיו לרשימת תפוצה'}
          </h2>
          <p style={{fontSize: '1.05rem', color: 'hsl(210, 15%, 50%)', marginBottom: '2rem'}}>
            {currentLanguage === 'he' ? 'וקבלו 10% הנחנה ברכישה ראשונה באתר' :
             currentLanguage === 'en' ? 'And get 10% discount on your first purchase on the site' :
             currentLanguage === 'fr' ? 'Et obtenez 10% de réduction sur votre premier achat sur le site' :
             currentLanguage === 'es' ? 'Y obtén 10% de descuento en tu primera compra en el sitio' :
             currentLanguage === 'ru' ? 'И получите скидку 10% на первую покупку на сайте' : 'וקבלו 10% הנחנה ברכישה ראשונה באתר'}
          </p>

          <div style={{display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '3.5rem', flexWrap: 'wrap'}}>
            <input
              type="email"
              placeholder={currentLanguage === 'he' ? 'הכניסו כתובת אימייל' : 'Enter email address'}
              style={{
                padding: '0.9rem 1.25rem',
                borderRadius: '8px',
                border: '1.5px solid hsl(210, 20%, 85%)',
                fontSize: '0.95rem',
                minWidth: '280px',
                textAlign: currentLanguage === 'he' ? 'right' : 'left',
                outline: 'none',
                transition: 'border-color 0.2s ease',
              }}
            />
            <button style={{
              background: 'hsl(210, 85%, 45%)',
              color: 'white',
              border: 'none',
              padding: '0.9rem 1.75rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.95rem',
              fontWeight: '600',
              boxShadow: '0 2px 8px hsla(210, 85%, 45%, 0.25)',
              transition: 'all 0.2s ease',
            }}>
              {currentLanguage === 'he' ? 'הצטרפו עכשיו' :
               currentLanguage === 'en' ? 'Join Now' :
               currentLanguage === 'fr' ? 'Rejoignez Maintenant' :
               currentLanguage === 'es' ? 'Únete Ahora' :
               currentLanguage === 'ru' ? 'Присоединяйтесь Сейчас' : 'הצטרפו עכשיו'}
            </button>
          </div>

          <div>
            <h3 style={{fontSize: '1.3rem', fontWeight: '600', color: 'hsl(210, 25%, 20%)', marginBottom: '0.75rem'}}>
              {currentLanguage === 'he' ? 'הצטרפו לקבוצות הוואטסאפ שלנו' :
               currentLanguage === 'en' ? 'Join Our WhatsApp Groups' :
               currentLanguage === 'fr' ? 'Rejoignez Nos Groupes WhatsApp' :
               currentLanguage === 'es' ? 'Únete a Nuestros Grupos de WhatsApp' :
               currentLanguage === 'ru' ? 'Присоединяйтесь к Нашим Группам WhatsApp' : 'הצטרפו לקבוצות הוואטסאפ שלנו'}
            </h3>
            <p style={{fontSize: '0.95rem', color: 'hsl(210, 15%, 50%)', marginBottom: '1.5rem'}}>
              {currentLanguage === 'he' ? 'קבלו עדכונים יומיים, חוויות מרגשות וחיזוק רוחני' :
               currentLanguage === 'en' ? 'Receive daily updates, exciting experiences and spiritual strengthening' :
               currentLanguage === 'fr' ? 'Recevez des mises à jour quotidiennes, des expériences passionnantes et un renforcement spirituel' :
               currentLanguage === 'es' ? 'Recibe actualizaciones diarias, experiencias emocionantes y fortalecimiento espiritual' :
               currentLanguage === 'ru' ? 'Получайте ежедневные обновления, захватывающие впечатления и духовное укрепление' : 'קבלו עדכונים יומיים, חוויות מרגשות וחיזוק רוחני'}
            </p>

            <div style={{display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap'}}>
              {[
                {flag: '📱', lang: 'עברית', phone: '972587308000'},
                {flag: '🌍', lang: 'English', phone: '972587308001'},
                {flag: '🇷🇺', lang: 'Русский', phone: '972587308002'},
                {flag: '🇪🇸', lang: 'Español', phone: '972587308003'},
                {flag: '🇫🇷', lang: 'Français', phone: '972587308004'}
              ].map((item, index) => (
                <a key={index} href={`https://wa.me/${item.phone}`} target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none'}}>
                  <button style={{
                    background: 'hsl(150, 55%, 45%)',
                    color: 'white',
                    border: 'none',
                    padding: '0.6rem 1.2rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 2px 6px hsla(150, 55%, 45%, 0.25)',
                  }}>
                    {item.flag} {item.lang}
                  </button>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* JOIN / CTA SECTION - Light background instead of heavy blue gradient */}
      <section style={{background: 'hsl(210, 30%, 97%)', padding: '5rem 0'}}>
        <div style={{maxWidth: '800px', margin: '0 auto', padding: '0 2rem', textAlign: 'center'}}>
          <h2 style={{
            fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
            fontWeight: '700',
            marginBottom: '0.75rem',
            color: 'hsl(210, 25%, 20%)',
          }}>
            {currentLanguage === 'he' ? 'הצטרפו עכשיו לפרסום והפצת ספרי רבי נחמן בעולם' :
             currentLanguage === 'en' ? 'Join Now to Promote and Spread Rabbi Nachman\'s Books Worldwide' :
             currentLanguage === 'fr' ? 'Rejoignez Maintenant pour Promouvoir et Diffuser les Livres de Rabbi Nachman dans le Monde' :
             currentLanguage === 'es' ? 'Únete Ahora para Promover y Difundir los Libros del Rabino Nachman en el Mundo' :
             currentLanguage === 'ru' ? 'Присоединяйтесь Сейчас к Продвижению и Распространению Книг Рабби Нахмана по Всему Миру' : 'הצטרפו עכשיו לפרסום והפצת ספרי רבי נחמן בעולם'}
          </h2>
          <p style={{
            fontSize: '1.05rem',
            fontWeight: '300',
            marginBottom: '2.5rem',
            color: 'hsl(210, 15%, 50%)',
            lineHeight: '1.6',
          }}>
            {currentLanguage === 'he' ? 'ההזדמנות שלכם לעזור ולתת יד לפרסום שם הצדיק בעולם' :
             currentLanguage === 'en' ? 'Your opportunity to help and lend a hand in spreading the name of the Tzaddik in the world' :
             currentLanguage === 'fr' ? 'Votre opportunité d\'aider et de donner un coup de main à la diffusion du nom du Tzaddik dans le monde' :
             currentLanguage === 'es' ? 'Tu oportunidad de ayudar y dar una mano en difundir el nombre del Tzaddik en el mundo' :
             currentLanguage === 'ru' ? 'Ваша возможность помочь и приложить руку к распространению имени Цадика в мире' : 'ההזדמנות שלכם לעזור ולתת יד לפרסום שם הצדיק בעולם'}
          </p>

          <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}>
            <a href="/join" style={{textDecoration: 'none'}}>
              <button style={{
                background: 'hsl(210, 85%, 45%)',
                color: 'white',
                border: 'none',
                padding: '1rem 2.5rem',
                borderRadius: '10px',
                cursor: 'pointer',
                fontSize: '1.05rem',
                fontWeight: '600',
                boxShadow: '0 4px 14px hsla(210, 85%, 45%, 0.3)',
                transition: 'all 0.2s ease'
              }}>
                {currentLanguage === 'he' ? 'הצטרפו אלינו' :
                 currentLanguage === 'en' ? 'Join Us' :
                 currentLanguage === 'fr' ? 'Rejoignez-nous' :
                 currentLanguage === 'es' ? 'Únete a Nosotros' :
                 currentLanguage === 'ru' ? 'Присоединяйтесь к Нам' : 'הצטרפו אלינו'}
              </button>
            </a>
            <a href="/contact" style={{textDecoration: 'none'}}>
              <button style={{
                background: '#FFFFFF',
                color: 'hsl(210, 85%, 45%)',
                border: '1.5px solid hsl(210, 85%, 45%)',
                padding: '1rem 2.5rem',
                borderRadius: '10px',
                cursor: 'pointer',
                fontSize: '1.05rem',
                fontWeight: '600',
                transition: 'all 0.2s ease'
              }}>
                {currentLanguage === 'he' ? 'צרו קשר לתרומה' :
                 currentLanguage === 'en' ? 'Contact for Donation' :
                 currentLanguage === 'fr' ? 'Contactez pour Don' :
                 currentLanguage === 'es' ? 'Contacto para Donación' :
                 currentLanguage === 'ru' ? 'Связаться для Пожертвования' : 'צרו קשר לתרומה'}
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="main-footer" style={{background: 'hsl(210, 20%, 18%)', color: 'white', padding: '2.5rem 0 2rem'}}>
        <div style={{maxWidth: '1200px', margin: '0 auto', padding: '0 2rem'}}>
          <div style={{textAlign: 'center'}}>
            <div style={{color: 'hsl(210, 10%, 60%)', fontSize: '0.85rem'}}>
              <p style={{marginBottom: '0.4rem'}}>
                {currentLanguage === 'he' ? 'כל הזכיות שמורות 2025 © קרן רבי ישראל דב אודסר זצ"ל' :
                 currentLanguage === 'en' ? 'All rights reserved 2025 © Rabbi Israel Dov Odesser Foundation' :
                 currentLanguage === 'fr' ? 'Tous droits réservés 2025 © Fondation Rabbi Israel Dov Odesser' :
                 currentLanguage === 'es' ? 'Todos los derechos reservados 2025 © Fundación Rabino Israel Dov Odesser' :
                 currentLanguage === 'ru' ? 'Все права защищены 2025 © Фонд Рабби Израэля Дова Одессера' : 'כל הזכיות שמורות 2025 © קרן רבי ישראל דב אודסר זצ"ל'}
              </p>
              <p style={{margin: 0}}>
                {currentLanguage === 'he' ? 'האתר נבנה ע"י מדיה מאסטר' :
                 currentLanguage === 'en' ? 'Website built by Media Master' :
                 currentLanguage === 'fr' ? 'Site web construit par Media Master' :
                 currentLanguage === 'es' ? 'Sitio web construido por Media Master' :
                 currentLanguage === 'ru' ? 'Сайт создан Media Master' : 'האתר נבנה ע"י מדיה מאסטר'}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
