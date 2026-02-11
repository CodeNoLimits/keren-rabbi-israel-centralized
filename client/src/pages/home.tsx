import { Header } from '../components/Header';
import { useLanguage } from '../contexts/LanguageContext';

export default function Home() {
  const { currentLanguage, setLanguage } = useLanguage();
  
  return (
    <div className="rtl home page-template-default page page-id-13 wp-custom-logo theme-hello-elementor woocommerce-js elementor-default elementor-kit-5 elementor-page elementor-page-13" style={{direction: currentLanguage === 'he' ? 'rtl' : 'ltr'}}>
      {/* TOP BAR */}
      <section className="elementor-section elementor-top-section elementor-element elementor-element-ba655d5 elementor-section-full_width elementor-hidden-tablet elementor-hidden-mobile elementor-section-height-default" style={{background: 'hsl(210, 85%, 45%)', color: 'white', padding: '8px 0'}}>
        <div className="elementor-container elementor-column-gap-default" style={{maxWidth: '1200px', margin: '0 auto', padding: '0 2rem'}}>
          <div className="elementor-column elementor-col-33 elementor-top-column">
            <div className="elementor-widget-wrap elementor-element-populated">
              <div className="elementor-element elementor-icon-list--layout-inline elementor-align-left elementor-list-item-link-full_width elementor-widget elementor-widget-icon-list">
                <div className="elementor-widget-container">
                  <ul className="elementor-icon-list-items elementor-inline-items" style={{display: 'flex', gap: '1rem', listStyle: 'none', margin: 0, padding: 0}}>
                    <li className="elementor-icon-list-item elementor-inline-item" style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                      <span className="elementor-icon-list-icon">
                        🚚
                      </span>
                      <span className="elementor-icon-list-text">
                        {currentLanguage === 'he' ? 'משלוחים חינם החל מ- 399 ש"ח' :
                         currentLanguage === 'en' ? 'Free shipping from 399 ₪' :
                         currentLanguage === 'fr' ? 'Livraison gratuite à partir de 399 ₪' :
                         currentLanguage === 'es' ? 'Envío gratis desde 399 ₪' :
                         currentLanguage === 'ru' ? 'Бесплатная доставка от 399 ₪' : 'משלוחים חינם החל מ- 399 ש"ח'}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Header currentLanguage={currentLanguage} onLanguageChange={setLanguage} />

      {/* HERO SECTION */}
      <section className="hero-gradient animate-fade-in-scale" 
        style={{
          background: `linear-gradient(135deg, hsl(0, 0%, 100%, 0.95) 0%, hsl(210, 85%, 45%, 0.05) 100%), url('/images/hero-books-composition.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          color: 'hsl(210, 8%, 25%)', 
          padding: '8rem 0',
          minHeight: '90vh',
          display: 'flex',
          alignItems: 'center'
        }}>
        <div className="elementor-container elementor-column-gap-default" style={{maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', width: '100%'}}>
          <div className="elementor-column elementor-col-100 elementor-top-column elementor-element">
            <div className="elementor-widget-wrap elementor-element-populated">
              <div className="elementor-element elementor-widget elementor-widget-heading" style={{textAlign: 'center'}}>
                <div className="card-premium animate-scale-in" style={{background: 'rgba(255,255,255,0.95)', padding: '3rem', borderRadius: '15px', backdropFilter: 'blur(10px)', boxShadow: '0 25px 50px -12px hsl(210, 85%, 45%, 0.25)'}}>
                  <h1 className="heading-oversized text-breslov-gradient" style={{
                    marginBottom: '1.5rem', 
                    lineHeight: '1.1',
                    fontFamily: currentLanguage === 'he' ? 'var(--font-hebrew)' : 'var(--font-latin)'
                  }}>
                    {currentLanguage === 'he' ? 'ספרי רבינו נחמן מברסלב זצ״ל' : 
                     currentLanguage === 'en' ? 'Books of Our Master Rabbi Nachman of Breslov' :
                     currentLanguage === 'fr' ? 'Livres de Notre Maître Rabbi Nachman de Breslov' :
                     currentLanguage === 'es' ? 'Libros de Nuestro Maestro Rabino Nachman de Breslov' :
                     currentLanguage === 'ru' ? 'Книги Нашего Учителя Рабби Нахмана из Бреслов' : 'ספרי רבינו נחמן מברסלב זצ״ל'}
                  </h1>
                  <h2 style={{
                    fontSize: 'var(--heading-3)',
                    fontWeight: '300', 
                    marginBottom: '2rem', 
                    color: 'hsl(210, 12%, 55%)',
                    fontFamily: currentLanguage === 'he' ? 'var(--font-hebrew)' : 'var(--font-serif)'
                  }}>
                    {currentLanguage === 'he' ? 'הדרך לאוצר שלך.' :
                     currentLanguage === 'en' ? 'The Path to Your Treasure.' :
                     currentLanguage === 'fr' ? 'Le Chemin vers Votre Trésor.' :
                     currentLanguage === 'es' ? 'El Camino hacia Tu Tesoro.' :
                     currentLanguage === 'ru' ? 'Путь к Вашему Сокровищу.' : 'הדרך לאוצר שלך.'}
                  </h2>
                  <p className="text-large" style={{marginBottom: '2rem', fontStyle: 'italic', color: 'hsl(210, 8%, 25%)', textAlign: 'center'}}>
                    {currentLanguage === 'he' ? '\'\'רק תנו לי את ליבכם ואוליך אתכם בדרך חדשה..\'\' (רבי נחמן)' :
                     currentLanguage === 'en' ? '"Just give me your hearts and I will lead you on a new path..." (Rabbi Nachman)' :
                     currentLanguage === 'fr' ? '"Donnez-moi simplement vos cœurs et je vous mènerai sur un nouveau chemin..." (Rabbi Nachman)' :
                     currentLanguage === 'es' ? '"Solo denme sus corazones y los guiaré por un camino nuevo..." (Rabino Nachman)' :
                     currentLanguage === 'ru' ? '"Просто дайте мне ваши сердца и я поведу вас новым путем..." (Рабби Нахман)' : '\'\'רק תנו לי את ליבכם ואוליך אתכם בדרך חדשה..\'\' (רבי נחמן)'}
                  </p>
                  <div style={{display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center'}}>
                    <a href="/store" style={{textDecoration: 'none', flex: '0 1 auto'}}>
                      <button className="btn-breslov-primary" data-testid="button-enter-store" style={{margin: '0 auto', display: 'block'}}>
                        {currentLanguage === 'he' ? 'כניסה לחנות' :
                         currentLanguage === 'en' ? 'Enter Store' :
                         currentLanguage === 'fr' ? 'Entrer dans la Boutique' :
                         currentLanguage === 'es' ? 'Entrar a la Tienda' :
                         currentLanguage === 'ru' ? 'Войти в Магазин' : 'כניסה לחנות'}
                      </button>
                    </a>
                    <a href="/join" style={{textDecoration: 'none'}}>
                      <button className="btn-breslov-secondary" data-testid="button-discover-activities">
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
            </div>
          </div>
        </div>
      </section>

      {/* LEADING BOOKS SECTION */}
      <section className="hero-gradient animate-fade-in-up" style={{background: 'linear-gradient(135deg, hsl(0, 0%, 100%) 0%, hsl(45, 30%, 98%) 30%, hsl(210, 70%, 98%) 100%)', padding: '6rem 0'}}>
        <div style={{maxWidth: '1200px', margin: '0 auto', padding: '0 2rem'}}>
          <div className="card-premium animate-scale-in" style={{textAlign: 'center', marginBottom: '4rem', padding: '2rem', borderRadius: '15px'}}>
            <h2 className="text-breslov-gradient" style={{
              fontSize: 'var(--heading-2)', 
              fontWeight: 'bold', 
              marginBottom: '1.5rem',
              fontFamily: currentLanguage === 'he' ? 'var(--font-hebrew)' : 'var(--font-serif)'
            }}>
              {currentLanguage === 'he' ? 'ספרי רבנו המובילים' :
               currentLanguage === 'en' ? 'Leading Books of Our Master' :
               currentLanguage === 'fr' ? 'Livres Principaux de Notre Maître' :
               currentLanguage === 'es' ? 'Libros Principales de Nuestro Maestro' :
               currentLanguage === 'ru' ? 'Ведущие Книги Нашего Учителя' : 'ספרי רבנו המובילים'}
            </h2>
          </div>
          
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem'}}>
            {/* Leading Books Grid */}
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
                <div className="card-premium card-hover" style={{
                  borderRadius: '15px', 
                  overflow: 'hidden', 
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }} 
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                  <div style={{height: '250px', overflow: 'hidden'}}>
                    <img loading="lazy" 
                      src={book.image} 
                      alt={book.title} 
                      style={{width: '100%', height: '100%', objectFit: 'cover'}}
                    />
                  </div>
                  <div style={{padding: '1.5rem', textAlign: 'center'}}>
                    <h3 style={{fontSize: '1.2rem', fontWeight: 'bold', color: 'hsl(210, 85%, 45%)', marginBottom: '0.5rem'}}>
                      {currentLanguage === 'he' ? book.title : book.titleEn}
                    </h3>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* RABBI NATHAN QUOTE SECTION */}
      <section style={{background: 'linear-gradient(135deg, hsl(210, 85%, 45%) 0%, hsl(210, 90%, 35%) 100%)', color: 'white', padding: '4rem 0'}}>
        <div style={{maxWidth: '800px', margin: '0 auto', padding: '0 2rem', textAlign: 'center'}}>
          <h2 style={{fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: 'hsl(45, 90%, 85%)'}}>
            {currentLanguage === 'he' ? 'דף אחד מספרי רבנו' :
             currentLanguage === 'en' ? 'One Page from Our Master\'s Books' :
             currentLanguage === 'fr' ? 'Une Page des Livres de Notre Maître' :
             currentLanguage === 'es' ? 'Una Página de los Libros de Nuestro Maestro' :
             currentLanguage === 'ru' ? 'Одна Страница из Книг Нашего Учителя' : 'דף אחד מספרי רבנו'}
          </h2>
          <h3 style={{fontSize: '1.8rem', fontWeight: '300', marginBottom: '1rem', color: 'hsl(45, 90%, 75%)'}}>
            {currentLanguage === 'he' ? 'יהיה תיקון על הכל!' :
             currentLanguage === 'en' ? 'There will be rectification for everything!' :
             currentLanguage === 'fr' ? 'Il y aura une rectification pour tout!' :
             currentLanguage === 'es' ? '¡Habrá rectificación para todo!' :
             currentLanguage === 'ru' ? 'Будет исправление для всего!' : 'יהיה תיקון על הכל!'}
          </h3>
          <p style={{fontSize: '1.1rem', fontStyle: 'italic', color: 'hsl(45, 85%, 90%)'}}>
            {currentLanguage === 'he' ? 'רבי נתן מברסלב' :
             currentLanguage === 'en' ? 'Rabbi Nathan of Breslov' :
             currentLanguage === 'fr' ? 'Rabbi Nathan de Breslov' :
             currentLanguage === 'es' ? 'Rabino Nathan de Breslov' :
             currentLanguage === 'ru' ? 'Рабби Натан из Бреслов' : 'רבי נתן מברסלב'}
          </p>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section style={{background: 'linear-gradient(135deg, hsl(180, 30%, 98%) 0%, hsl(210, 30%, 98%) 100%)', padding: '5rem 0'}}>
        <div style={{maxWidth: '1200px', margin: '0 auto', padding: '0 2rem'}}>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem'}}>
            <div style={{background: 'white', padding: '2rem', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', textAlign: 'center'}}>
              <div style={{fontSize: '3rem', marginBottom: '1rem'}}>🚚</div>
              <h3 style={{fontSize: '1.3rem', fontWeight: 'bold', color: 'hsl(210, 85%, 45%)', marginBottom: '1rem'}}>
                {currentLanguage === 'he' ? 'משלוח מהיר עד הבית חינם' :
                 currentLanguage === 'en' ? 'Fast Free Home Delivery' :
                 currentLanguage === 'fr' ? 'Livraison Rapide Gratuite à Domicile' :
                 currentLanguage === 'es' ? 'Entrega Rápida Gratuita a Domicilio' :
                 currentLanguage === 'ru' ? 'Быстрая Бесплатная Доставка на Дом' : 'משלוח מהיר עד הבית חינם'}
              </h3>
              <p style={{color: 'hsl(210, 12%, 55%)', fontSize: '0.9rem'}}>
                {currentLanguage === 'he' ? 'ברכישה מעל 299 ₪ מהחנות' :
                 currentLanguage === 'en' ? 'On purchases over 299 ₪ from the store' :
                 currentLanguage === 'fr' ? 'Sur les achats de plus de 299 ₪ du magasin' :
                 currentLanguage === 'es' ? 'En compras mayores a 299 ₪ de la tienda' :
                 currentLanguage === 'ru' ? 'При покупках свыше 299 ₪ из магазина' : 'ברכישה מעל 299 ₪ מהחנות'}
              </p>
            </div>
            
            <div style={{background: 'white', padding: '2rem', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', textAlign: 'center'}}>
              <div style={{fontSize: '3rem', marginBottom: '1rem'}}>🔒</div>
              <h3 style={{fontSize: '1.3rem', fontWeight: 'bold', color: 'hsl(210, 85%, 45%)', marginBottom: '1rem'}}>
                {currentLanguage === 'he' ? 'רכישה מאובטחת' :
                 currentLanguage === 'en' ? 'Secure Purchase' :
                 currentLanguage === 'fr' ? 'Achat Sécurisé' :
                 currentLanguage === 'es' ? 'Compra Segura' :
                 currentLanguage === 'ru' ? 'Безопасная Покупка' : 'רכישה מאובטחת'}
              </h3>
              <p style={{color: 'hsl(210, 12%, 55%)', fontSize: '0.9rem'}}>
                {currentLanguage === 'he' ? 'באמצעות תעודת SSL ובתקנים המחמירים ביותר' :
                 currentLanguage === 'en' ? 'Using SSL certificate and the most stringent standards' :
                 currentLanguage === 'fr' ? 'En utilisant un certificat SSL et les normes les plus strictes' :
                 currentLanguage === 'es' ? 'Utilizando certificado SSL y los estándares más estrictos' :
                 currentLanguage === 'ru' ? 'Использование SSL-сертификата и самых строгих стандартов' : 'באמצעות תעודת SSL ובתקנים המחמירים ביותר'}
              </p>
            </div>
            
            <div style={{background: 'white', padding: '2rem', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', textAlign: 'center'}}>
              <div style={{fontSize: '3rem', marginBottom: '1rem'}}>📚</div>
              <h3 style={{fontSize: '1.3rem', fontWeight: 'bold', color: 'hsl(210, 85%, 45%)', marginBottom: '1rem'}}>
                {currentLanguage === 'he' ? 'חנות הספרים הגדולה ביותר לספרי רבנו אונליין' :
                 currentLanguage === 'en' ? 'Largest Online Bookstore for Our Master\'s Books' :
                 currentLanguage === 'fr' ? 'Plus Grande Librairie en Ligne pour les Livres de Notre Maître' :
                 currentLanguage === 'es' ? 'Librería en Línea Más Grande para los Libros de Nuestro Maestro' :
                 currentLanguage === 'ru' ? 'Крупнейший Интернет-Книжный Магазин Книг Нашего Учителя' : 'חנות הספרים הגדולה ביותר לספרי רבנו אונליין'}
              </h3>
              <p style={{color: 'hsl(210, 12%, 55%)', fontSize: '0.9rem'}}>
                {currentLanguage === 'he' ? 'משלוחים לכל הארץ' :
                 currentLanguage === 'en' ? 'Shipping throughout the country' :
                 currentLanguage === 'fr' ? 'Expédition dans tout le pays' :
                 currentLanguage === 'es' ? 'Envío por todo el país' :
                 currentLanguage === 'ru' ? 'Доставка по всей стране' : 'משלוחים לכל הארץ'}
              </p>
            </div>
            
            <div style={{background: 'white', padding: '2rem', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', textAlign: 'center'}}>
              <div style={{fontSize: '3rem', marginBottom: '1rem'}}>🎧</div>
              <h3 style={{fontSize: '1.3rem', fontWeight: 'bold', color: 'hsl(210, 85%, 45%)', marginBottom: '1rem'}}>
                {currentLanguage === 'he' ? 'שירות לקוחות מעולה וזמין תמיד לשירותכם' :
                 currentLanguage === 'en' ? 'Excellent Customer Service Always Available' :
                 currentLanguage === 'fr' ? 'Excellent Service Client Toujours Disponible' :
                 currentLanguage === 'es' ? 'Excelente Servicio al Cliente Siempre Disponible' :
                 currentLanguage === 'ru' ? 'Отличное Обслуживание Клиентов Всегда Доступно' : 'שירות לקוחות מעולה וזמין תמיד לשירותכם'}
              </h3>
              <p style={{color: 'hsl(210, 12%, 55%)', fontSize: '0.9rem'}}>
                {currentLanguage === 'he' ? 'עד 12 תשלומים ללא ריבית' :
                 currentLanguage === 'en' ? 'Up to 12 payments without interest' :
                 currentLanguage === 'fr' ? 'Jusqu\'à 12 paiements sans intérêt' :
                 currentLanguage === 'es' ? 'Hasta 12 pagos sin interés' :
                 currentLanguage === 'ru' ? 'До 12 платежей без процентов' : 'עד 12 תשלומים ללא ריבית'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section style={{background: 'linear-gradient(135deg, hsl(210, 85%, 45%) 0%, hsl(210, 90%, 35%) 100%)', color: 'white', padding: '5rem 0'}}>
        <div style={{maxWidth: '1200px', margin: '0 auto', padding: '0 2rem'}}>
          <div style={{textAlign: 'center', marginBottom: '3rem'}}>
            <h2 style={{fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem', color: 'hsl(45, 90%, 85%)'}}>
              {currentLanguage === 'he' ? 'הקטגוריות בחנות' :
               currentLanguage === 'en' ? 'Store Categories' :
               currentLanguage === 'fr' ? 'Catégories du Magasin' :
               currentLanguage === 'es' ? 'Categorías de la Tienda' :
               currentLanguage === 'ru' ? 'Категории Магазина' : 'הקטגוריות בחנות'}
            </h2>
          </div>
          
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem'}}>
            <div style={{background: 'rgba(255, 228, 181, 0.1)', padding: '2rem', borderRadius: '10px', textAlign: 'center'}}>
              <h3 style={{fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: 'hsl(45, 90%, 85%)'}}>
                {currentLanguage === 'he' ? 'כל חיבורי רבנו הקדוש' :
                 currentLanguage === 'en' ? 'All Holy Compositions of Our Master' :
                 currentLanguage === 'fr' ? 'Toutes les Compositions Saintes de Notre Maître' :
                 currentLanguage === 'es' ? 'Todas las Composiciones Sagradas de Nuestro Maestro' :
                 currentLanguage === 'ru' ? 'Все Святые Сочинения Нашего Учителя' : 'כל חיבורי רבנו הקדוש'}
              </h3>
              <a href="/store" style={{textDecoration: 'none'}}>
                <button style={{
                  background: 'linear-gradient(135deg, hsl(210, 85%, 45%), hsl(210, 90%, 35%))', 
                  color: 'white', 
                  border: 'none', 
                  padding: '1rem 2rem', 
                  borderRadius: '8px', 
                  cursor: 'pointer', 
                  fontSize: '1.1rem', 
                  fontWeight: 'bold'
                }}>
                  {currentLanguage === 'he' ? 'לחצו כאן' :
                   currentLanguage === 'en' ? 'Click Here' :
                   currentLanguage === 'fr' ? 'Cliquez Ici' :
                   currentLanguage === 'es' ? 'Haga Clic Aquí' :
                   currentLanguage === 'ru' ? 'Нажмите Здесь' : 'לחצו כאן'}
                </button>
              </a>
            </div>
            
            <div style={{background: 'rgba(255, 228, 181, 0.1)', padding: '2rem', borderRadius: '10px', textAlign: 'center'}}>
              <h3 style={{fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: 'hsl(45, 90%, 85%)'}}>
                {currentLanguage === 'he' ? 'כל ספרי רבי ישראל' :
                 currentLanguage === 'en' ? 'All Books of Rabbi Israel' :
                 currentLanguage === 'fr' ? 'Tous les Livres de Rabbi Israel' :
                 currentLanguage === 'es' ? 'Todos los Libros del Rabino Israel' :
                 currentLanguage === 'ru' ? 'Все Книги Рабби Израэля' : 'כל ספרי רבי ישראל'}
              </h3>
              <a href="/store" style={{textDecoration: 'none'}}>
                <button style={{
                  background: 'linear-gradient(135deg, hsl(210, 85%, 45%), hsl(210, 90%, 35%))', 
                  color: 'white', 
                  border: 'none', 
                  padding: '1rem 2rem', 
                  borderRadius: '8px', 
                  cursor: 'pointer', 
                  fontSize: '1.1rem', 
                  fontWeight: 'bold'
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
          
          <div style={{textAlign: 'center', marginTop: '2rem'}}>
            <a href="/store" style={{textDecoration: 'none'}}>
              <button style={{
                background: 'rgba(255, 228, 181, 0.2)', 
                color: 'hsl(45, 90%, 85%)', 
                border: '2px solid hsl(45, 90%, 85%)', 
                padding: '1rem 2rem', 
                borderRadius: '8px', 
                cursor: 'pointer', 
                fontSize: '1.1rem', 
                fontWeight: 'bold'
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

      {/* NEWSLETTER SECTION */}
      <section style={{background: 'linear-gradient(135deg, hsl(180, 30%, 98%) 0%, hsl(210, 30%, 98%) 100%)', padding: '5rem 0'}}>
        <div style={{maxWidth: '800px', margin: '0 auto', padding: '0 2rem', textAlign: 'center'}}>
          <h2 style={{fontSize: '2.5rem', fontWeight: 'bold', color: 'hsl(210, 85%, 45%)', marginBottom: '1rem'}}>
            {currentLanguage === 'he' ? 'הצטרפו עכשיו לרשימת תפוצה' :
             currentLanguage === 'en' ? 'Join Our Mailing List Now' :
             currentLanguage === 'fr' ? 'Rejoignez Notre Liste de Diffusion Maintenant' :
             currentLanguage === 'es' ? 'Únete a Nuestra Lista de Correo Ahora' :
             currentLanguage === 'ru' ? 'Присоединяйтесь к Нашему Списку Рассылки Сейчас' : 'הצטרפו עכשיו לרשימת תפוצה'}
          </h2>
          <p style={{fontSize: '1.2rem', color: 'hsl(180, 65%, 45%)', marginBottom: '2rem'}}>
            {currentLanguage === 'he' ? 'וקבלו 10% הנחנה ברכישה ראשונה באתר' :
             currentLanguage === 'en' ? 'And get 10% discount on your first purchase on the site' :
             currentLanguage === 'fr' ? 'Et obtenez 10% de réduction sur votre premier achat sur le site' :
             currentLanguage === 'es' ? 'Y obtén 10% de descuento en tu primera compra en el sitio' :
             currentLanguage === 'ru' ? 'И получите скидку 10% на первую покупку на сайте' : 'וקבלו 10% הנחנה ברכישה ראשונה באתר'}
          </p>
          
          <div style={{display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap'}}>
            <input 
              type="email" 
              placeholder={currentLanguage === 'he' ? 'הכניסו כתובת אימייל' : 'Enter email address'}
              style={{
                padding: '1rem 1.5rem', 
                borderRadius: '8px', 
                border: '2px solid hsl(210, 85%, 45%)', 
                fontSize: '1rem', 
                minWidth: '300px',
                textAlign: currentLanguage === 'he' ? 'right' : 'left'
              }}
            />
            <button style={{
              background: 'linear-gradient(135deg, hsl(210, 85%, 45%), hsl(210, 90%, 35%))', 
              color: 'white', 
              border: 'none', 
              padding: '1rem 2rem', 
              borderRadius: '8px', 
              cursor: 'pointer', 
              fontSize: '1rem', 
              fontWeight: 'bold'
            }}>
              {currentLanguage === 'he' ? 'הצטרפו עכשיו' :
               currentLanguage === 'en' ? 'Join Now' :
               currentLanguage === 'fr' ? 'Rejoignez Maintenant' :
               currentLanguage === 'es' ? 'Únete Ahora' :
               currentLanguage === 'ru' ? 'Присоединяйтесь Сейчас' : 'הצטרפו עכשיו'}
            </button>
          </div>

          <div style={{marginBottom: '3rem'}}>
            <h3 style={{fontSize: '1.8rem', fontWeight: 'bold', color: 'hsl(210, 85%, 45%)', marginBottom: '1.5rem'}}>
              {currentLanguage === 'he' ? 'הצטרפו לקבוצות הוואטסאפ שלנו' :
               currentLanguage === 'en' ? 'Join Our WhatsApp Groups' :
               currentLanguage === 'fr' ? 'Rejoignez Nos Groupes WhatsApp' :
               currentLanguage === 'es' ? 'Únete a Nuestros Grupos de WhatsApp' :
               currentLanguage === 'ru' ? 'Присоединяйтесь к Нашим Группам WhatsApp' : 'הצטרפו לקבוצות הוואטסאפ שלנו'}
            </h3>
            <p style={{fontSize: '1.1rem', color: 'hsl(180, 65%, 45%)', marginBottom: '2rem'}}>
              {currentLanguage === 'he' ? 'קבלו עדכונים יומיים, חוויות מרגשות וחיזוק רוחני' :
               currentLanguage === 'en' ? 'Receive daily updates, exciting experiences and spiritual strengthening' :
               currentLanguage === 'fr' ? 'Recevez des mises à jour quotidiennes, des expériences passionnantes et un renforcement spirituel' :
               currentLanguage === 'es' ? 'Recibe actualizaciones diarias, experiencias emocionantes y fortalecimiento espiritual' :
               currentLanguage === 'ru' ? 'Получайте ежедневные обновления, захватывающие впечатления и духовное укрепление' : 'קבלו עדכונים יומיים, חוויות מרגשות וחיזוק רוחני'}
            </p>
            
            <div style={{display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap'}}>
              {[
                {flag: '📱', lang: 'עברית', phone: '972587308000'},
                {flag: '🌍', lang: 'English', phone: '972587308001'},
                {flag: '🇷🇺', lang: 'Русский', phone: '972587308002'},
                {flag: '🇪🇸', lang: 'Español', phone: '972587308003'},
                {flag: '🇫🇷', lang: 'Français', phone: '972587308004'}
              ].map((item, index) => (
                <a key={index} href={`https://wa.me/${item.phone}`} target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none'}}>
                  <button style={{
                    background: 'hsl(150, 60%, 45%)', 
                    color: 'white', 
                    border: 'none', 
                    padding: '0.8rem 1.5rem', 
                    borderRadius: '8px', 
                    cursor: 'pointer', 
                    fontSize: '1rem', 
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    {item.flag} {item.lang}
                  </button>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* JOIN SECTION */}
      <section style={{background: 'linear-gradient(135deg, hsl(210, 85%, 45%) 0%, hsl(210, 90%, 35%) 100%)', color: 'white', padding: '5rem 0'}}>
        <div style={{maxWidth: '1000px', margin: '0 auto', padding: '0 2rem', textAlign: 'center'}}>
          <h2 style={{fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem', color: 'hsl(45, 90%, 85%)'}}>
            {currentLanguage === 'he' ? 'הצטרפו עכשיו לפרסום והפצת ספרי רבי נחמן בעולם' :
             currentLanguage === 'en' ? 'Join Now to Promote and Spread Rabbi Nachman\'s Books Worldwide' :
             currentLanguage === 'fr' ? 'Rejoignez Maintenant pour Promouvoir et Diffuser les Livres de Rabbi Nachman dans le Monde' :
             currentLanguage === 'es' ? 'Únete Ahora para Promover y Difundir los Libros del Rabino Nachman en el Mundo' :
             currentLanguage === 'ru' ? 'Присоединяйтесь Сейчас к Продвижению и Распространению Книг Рабби Нахмана по Всему Миру' : 'הצטרפו עכשיו לפרסום והפצת ספרי רבי נחמן בעולם'}
          </h2>
          <h3 style={{fontSize: '1.8rem', fontWeight: '300', marginBottom: '2rem', color: 'hsl(45, 90%, 75%)'}}>
            {currentLanguage === 'he' ? 'ההזדמנות שלכם לעזור ולתת יד לפרסום שם הצדיק בעולם' :
             currentLanguage === 'en' ? 'Your opportunity to help and lend a hand in spreading the name of the Tzaddik in the world' :
             currentLanguage === 'fr' ? 'Votre opportunité d\'aider et de donner un coup de main à la diffusion du nom du Tzaddik dans le monde' :
             currentLanguage === 'es' ? 'Tu oportunidad de ayudar y dar una mano en difundir el nombre del Tzaddik en el mundo' :
             currentLanguage === 'ru' ? 'Ваша возможность помочь и приложить руку к распространению имени Цадика в мире' : 'ההזדמנות שלכם לעזור ולתת יד לפרסום שם הצדיק בעולם'}
          </h3>
          
          <div style={{display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap'}}>
            <a href="/join" style={{textDecoration: 'none'}}>
              <button style={{
                background: 'linear-gradient(135deg, hsl(210, 85%, 45%), hsl(210, 90%, 35%))', 
                color: 'white', 
                border: '3px solid hsl(45, 90%, 85%)', 
                padding: '1.2rem 2.5rem', 
                borderRadius: '12px', 
                cursor: 'pointer', 
                fontSize: '1.2rem', 
                fontWeight: 'bold', 
                boxShadow: '0 6px 20px rgba(220, 53, 69, 0.4)', 
                transition: 'all 0.3s ease'
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
                background: 'rgba(255, 228, 181, 0.15)', 
                color: 'hsl(45, 90%, 85%)', 
                border: '3px solid hsl(45, 90%, 85%)', 
                padding: '1.2rem 2.5rem', 
                borderRadius: '12px', 
                cursor: 'pointer', 
                fontSize: '1.2rem', 
                fontWeight: 'bold', 
                transition: 'all 0.3s ease'
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
      <footer className="main-footer" style={{background: 'hsl(210, 85%, 25%)', color: 'white', padding: '3rem 0 2rem'}}>
        <div className="elementor-container" style={{maxWidth: '1200px', margin: '0 auto', padding: '0 2rem'}}>
          <div style={{textAlign: 'center', paddingTop: '2rem'}}>
            <div style={{color: 'hsl(210, 12%, 65%)', fontSize: '0.9rem'}}>
              <p style={{marginBottom: '0.5rem'}}>
                {currentLanguage === 'he' ? 'כל הזכיות שמורות 2025 © קרן רבי ישראל דב אודסר זצ"ל' :
                 currentLanguage === 'en' ? 'All rights reserved 2025 © Rabbi Israel Dov Odesser Foundation' :
                 currentLanguage === 'fr' ? 'Tous droits réservés 2025 © Fondation Rabbi Israel Dov Odesser' :
                 currentLanguage === 'es' ? 'Todos los derechos reservados 2025 © Fundación Rabino Israel Dov Odesser' :
                 currentLanguage === 'ru' ? 'Все права защищены 2025 © Фонд Рабби Израэля Дова Одессера' : 'כל הזכיות שמורות 2025 © קרן רבי ישראל דב אודסר זצ"ל'}
              </p>
              <p>
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