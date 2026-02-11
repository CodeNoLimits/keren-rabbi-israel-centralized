import { Switch, Route } from "wouter";
import { lazy, Suspense, useMemo } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import { CartProvider } from "@/contexts/CartContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { InstallPrompt } from "@/components/InstallPrompt";
import { AmbientMusic } from "@/components/AmbientMusic";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { NewsletterPopup } from "@/components/NewsletterPopup";

// Lazy load all pages for code splitting
const Home = lazy(() => import("@/pages/home"));
const Store = lazy(() => import("@/pages/store"));
const About = lazy(() => import("@/pages/about"));
const Magazine = lazy(() => import("@/pages/magazine"));
const Join = lazy(() => import("@/pages/join"));
const Contact = lazy(() => import("@/pages/contact"));
const Checkout = lazy(() => import("@/pages/checkout"));
const Downloads = lazy(() => import("@/pages/downloads"));
const Product = lazy(() => import("@/pages/product"));
const BreslovWisdom = lazy(() => import("@/pages/breslovWisdom"));

const KerenStyle = lazy(() => import("@/pages/keren-style"));
const HaeshHype = lazy(() => import("@/pages/haesh-hype"));
const Subscription = lazy(() => import("@/pages/subscription"));
const SubscriptionManagement = lazy(() => import("@/pages/subscription-management"));
const YaakovDashboard = lazy(() => import("@/pages/yaaakov"));
const Chat = lazy(() => import("@/pages/chat"));
const Favorites = lazy(() => import("@/pages/favorites"));
const Legal = lazy(() => import("@/pages/legal"));
const NotFound = lazy(() => import("@/pages/not-found"));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-50 to-orange-100 dark:from-gray-900 dark:to-gray-800">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-orange-600 border-t-transparent"></div>
      <p className="mt-4 text-gray-600 dark:text-gray-300">טוען...</p>
    </div>
  </div>
);

// Breslev quotes for the thank-you page
const breslovQuotes = {
  he: [
    { text: 'כל העולם כולו גשר צר מאוד, והעיקר לא לפחד כלל.', author: 'רבי נחמן מברסלב' },
    { text: 'אם אתה מאמין שיכולים לקלקל, תאמין שיכולים לתקן.', author: 'רבי נחמן מברסלב' },
    { text: 'מצווה גדולה להיות בשמחה תמיד.', author: 'רבי נחמן מברסלב' },
    { text: 'אין שום ייאוש בעולם כלל.', author: 'רבי נחמן מברסלב' },
    { text: 'תמיד תהיה שמח, ותחזק את עצמך בכל מיני דרכים.', author: 'רבי נחמן מברסלב' },
  ],
  en: [
    { text: 'The whole world is a very narrow bridge, and the main thing is not to be afraid at all.', author: 'Rabbi Nachman of Breslov' },
    { text: 'If you believe you can damage, believe you can fix.', author: 'Rabbi Nachman of Breslov' },
    { text: 'It is a great mitzvah to always be happy.', author: 'Rabbi Nachman of Breslov' },
    { text: 'There is no despair in the world at all.', author: 'Rabbi Nachman of Breslov' },
    { text: 'Always be happy, and strengthen yourself in every way.', author: 'Rabbi Nachman of Breslov' },
  ],
  fr: [
    { text: 'Le monde entier est un pont tres etroit, et l\'essentiel est de n\'avoir aucune peur.', author: 'Rabbi Nahman de Breslev' },
    { text: 'Si tu crois que l\'on peut detruire, crois que l\'on peut reparer.', author: 'Rabbi Nahman de Breslev' },
    { text: 'C\'est une grande mitsva d\'etre toujours joyeux.', author: 'Rabbi Nahman de Breslev' },
    { text: 'Il n\'y a aucun desespoir dans le monde.', author: 'Rabbi Nahman de Breslev' },
    { text: 'Sois toujours heureux et renforce-toi de toutes les manieres.', author: 'Rabbi Nahman de Breslev' },
  ],
  es: [
    { text: 'El mundo entero es un puente muy angosto, y lo principal es no tener miedo.', author: 'Rabi Najman de Breslov' },
    { text: 'Si crees que puedes destruir, cree que puedes reparar.', author: 'Rabi Najman de Breslov' },
    { text: 'Es una gran mitsva estar siempre feliz.', author: 'Rabi Najman de Breslov' },
    { text: 'No hay desesperacion en el mundo en absoluto.', author: 'Rabi Najman de Breslov' },
    { text: 'Siempre se feliz y fortalecete de todas las maneras.', author: 'Rabi Najman de Breslov' },
  ],
  ru: [
    { text: 'Весь мир - очень узкий мост, и главное - совсем не бояться.', author: 'Рабби Нахман из Бреслова' },
    { text: 'Если ты веришь, что можно разрушить - верь, что можно исправить.', author: 'Рабби Нахман из Бреслова' },
    { text: 'Великая заповедь - всегда быть в радости.', author: 'Рабби Нахман из Бреслова' },
    { text: 'Нет никакого отчаяния в мире вообще.', author: 'Рабби Нахман из Бреслова' },
    { text: 'Всегда будь счастлив и укрепляй себя всеми способами.', author: 'Рабби Нахман из Бреслова' },
  ],
};

const thankYouTranslations = {
  he: {
    title: 'תשלום בוצע בהצלחה!',
    subtitle: 'ההזמנה שלך התקבלה ותקבל מייל אישור בקרוב',
    orderNumber: 'מספר הזמנה:',
    continueShopping: 'המשך קניות',
    backHome: 'חזרה לדף הבית',
    whatsappHelp: 'צריך עזרה? דבר איתנו בוואטסאפ',
  },
  en: {
    title: 'Payment Successful!',
    subtitle: 'Your order has been received. You will get a confirmation email shortly.',
    orderNumber: 'Order number:',
    continueShopping: 'Continue Shopping',
    backHome: 'Back to Home',
    whatsappHelp: 'Need help? Talk to us on WhatsApp',
  },
  fr: {
    title: 'Paiement Reussi !',
    subtitle: 'Votre commande a ete recue. Vous recevrez un email de confirmation.',
    orderNumber: 'Numero de commande :',
    continueShopping: 'Continuer les achats',
    backHome: 'Retour a l\'accueil',
    whatsappHelp: 'Besoin d\'aide ? Parlez-nous sur WhatsApp',
  },
  es: {
    title: 'Pago Exitoso!',
    subtitle: 'Tu pedido ha sido recibido. Recibiras un email de confirmacion.',
    orderNumber: 'Numero de pedido:',
    continueShopping: 'Seguir comprando',
    backHome: 'Volver al inicio',
    whatsappHelp: 'Necesitas ayuda? Habla con nosotros por WhatsApp',
  },
  ru: {
    title: 'Оплата Успешна!',
    subtitle: 'Ваш заказ получен. Вы получите письмо с подтверждением.',
    orderNumber: 'Номер заказа:',
    continueShopping: 'Продолжить покупки',
    backHome: 'На главную',
    whatsappHelp: 'Нужна помощь? Напишите нам в WhatsApp',
  },
};

// Enhanced checkout success component with Breslev quotes and multi-language
const CheckoutSuccess = () => {
  const { currentLanguage } = useLanguage();
  const isRTL = currentLanguage === 'he';

  const t = thankYouTranslations[currentLanguage as keyof typeof thankYouTranslations] || thankYouTranslations.he;
  const quotes = breslovQuotes[currentLanguage as keyof typeof breslovQuotes] || breslovQuotes.he;

  const randomQuote = useMemo(() => quotes[Math.floor(Math.random() * quotes.length)], [quotes]);
  const orderNumber = useMemo(() => `KRI-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 9000 + 1000)}`, []);

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 50%, #FED7AA 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem',
        direction: isRTL ? 'rtl' : 'ltr',
      }}
    >
      <div
        style={{
          maxWidth: '520px',
          width: '100%',
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
          padding: '2.5rem 2rem',
          textAlign: 'center',
        }}
      >
        {/* Success icon */}
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #34D399, #10B981)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
          }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#1e3a5f', marginBottom: '0.75rem' }}>
          {t.title}
        </h1>

        <p style={{ color: '#6b7280', fontSize: '1rem', marginBottom: '1.25rem', lineHeight: '1.5' }}>
          {t.subtitle}
        </p>

        {/* Order number */}
        <div
          style={{
            background: '#FFF7ED',
            border: '1px solid #FDBA74',
            borderRadius: '8px',
            padding: '0.75rem 1rem',
            marginBottom: '1.5rem',
            display: 'inline-block',
          }}
        >
          <span style={{ color: '#9a3412', fontWeight: '600', fontSize: '0.9rem' }}>
            {t.orderNumber} <span style={{ fontFamily: 'monospace', letterSpacing: '0.05em' }}>{orderNumber}</span>
          </span>
        </div>

        {/* Breslev quote */}
        <div
          style={{
            background: '#F0FDF4',
            borderRight: isRTL ? '4px solid #FF6B35' : 'none',
            borderLeft: isRTL ? 'none' : '4px solid #FF6B35',
            borderRadius: '8px',
            padding: '1.25rem',
            marginBottom: '2rem',
            textAlign: isRTL ? 'right' : 'left',
          }}
        >
          <p style={{ fontSize: '1.05rem', color: '#1e3a5f', fontStyle: 'italic', lineHeight: '1.6', marginBottom: '0.5rem' }}>
            &ldquo;{randomQuote.text}&rdquo;
          </p>
          <p style={{ fontSize: '0.85rem', color: '#FF6B35', fontWeight: '600' }}>
            &mdash; {randomQuote.author}
          </p>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <a
            href="/store"
            style={{
              display: 'block',
              background: '#FF6B35',
              color: 'white',
              padding: '0.85rem 1.5rem',
              borderRadius: '10px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '1rem',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#e55a2b')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#FF6B35')}
          >
            {t.continueShopping}
          </a>

          <a
            href="/"
            style={{
              display: 'block',
              background: 'white',
              color: '#1e3a5f',
              padding: '0.85rem 1.5rem',
              borderRadius: '10px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '1rem',
              border: '2px solid #1e3a5f',
              transition: 'background 0.2s, color 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#1e3a5f'; e.currentTarget.style.color = 'white'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = '#1e3a5f'; }}
          >
            {t.backHome}
          </a>

          <a
            href="https://wa.me/972584921492?text=%D7%A9%D7%9C%D7%95%D7%9D%2C%20%D7%90%D7%A0%D7%99%20%D7%A6%D7%A8%D7%99%D7%9A%20%D7%A2%D7%96%D7%A8%D7%94%20%D7%9C%D7%92%D7%91%D7%99%20%D7%94%D7%96%D7%9E%D7%A0%D7%94"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              background: '#25D366',
              color: 'white',
              padding: '0.85rem 1.5rem',
              borderRadius: '10px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '0.9rem',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#128C7E')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#25D366')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {t.whatsappHelp}
          </a>
        </div>
      </div>
    </div>
  );
};

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/store" component={Store} />
        <Route path="/about" component={About} />
        <Route path="/magazine" component={Magazine} />
        <Route path="/join" component={Join} />
        <Route path="/contact" component={Contact} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/checkout/success" component={() => <CheckoutSuccess />} />
        <Route path="/downloads" component={Downloads} />
        <Route path="/subscription" component={Subscription} />
        <Route path="/subscription/manage" component={SubscriptionManagement} />
        <Route path="/favorites" component={Favorites} />
        <Route path="/privacy" component={() => <Legal page="privacy" />} />
        <Route path="/terms" component={() => <Legal page="terms" />} />
        <Route path="/returns" component={() => <Legal page="returns" />} />
        <Route path="/product/:id" component={Product} />
        <Route path="/breslov-wisdom" component={BreslovWisdom} />
        <Route path="/keren-style" component={KerenStyle} />
        <Route path="/haesh-hype" component={HaeshHype} />
        <Route path="/chat" component={Chat} />
        <Route path="/yaaakov" component={YaakovDashboard} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <CurrencyProvider>
            <CartProvider>
              <FavoritesProvider>
                <Toaster />
                <InstallPrompt />
                <AmbientMusic />
                <Router />
                <Footer />
                <WhatsAppFloat />
                <NewsletterPopup />
              </FavoritesProvider>
            </CartProvider>
          </CurrencyProvider>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
