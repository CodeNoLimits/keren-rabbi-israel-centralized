import { Switch, Route } from "wouter";
import { lazy, Suspense } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { CartProvider } from "@/contexts/CartContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { InstallPrompt } from "@/components/InstallPrompt";
import { AmbientMusic } from "@/components/AmbientMusic";

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
const BreslovVideos = lazy(() => import("@/pages/breslov-videos"));
const KerenStyle = lazy(() => import("@/pages/keren-style"));
const HaeshHype = lazy(() => import("@/pages/haesh-hype"));
const Subscription = lazy(() => import("@/pages/subscription"));
const SubscriptionManagement = lazy(() => import("@/pages/subscription-management"));
const YaakovDashboard = lazy(() => import("@/pages/yaaakov"));
const Chat = lazy(() => import("@/pages/chat"));
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

// Simple checkout success component
const CheckoutSuccess = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="text-green-600 text-6xl mb-4">✓</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            תשלום בוצע בהצלחה!
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            ההזמנה שלך התקבלה ותקבל מייל אישור בקרוב
          </p>
          <a 
            href="/" 
            className="inline-block bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
          >
            חזרה לעמוד הבית
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
          <CartProvider>
            <FavoritesProvider>
              <Toaster />
              <InstallPrompt />
              <AmbientMusic />
              <Router />
            </FavoritesProvider>
          </CartProvider>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
