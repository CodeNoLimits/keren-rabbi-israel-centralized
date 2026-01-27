import { Switch, Route } from "wouter";
import { Suspense, lazy } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { CartProvider } from "@/contexts/CartContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { InstallPrompt } from "@/components/InstallPrompt";
import { AmbientMusic } from "@/components/AmbientMusic";

// Lazy load all page components for code splitting
const Home = lazy(() => import("@/pages/home"));
const Store = lazy(() => import("@/pages/store"));
const About = lazy(() => import("@/pages/about"));
const Magazine = lazy(() => import("@/pages/magazine"));
const Join = lazy(() => import("@/pages/join"));
const Contact = lazy(() => import("@/pages/contact"));
const Checkout = lazy(() => import("@/pages/checkout"));

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
const Lottery = lazy(() => import("@/pages/lottery"));
const LotteryAdmin = lazy(() => import("@/pages/lottery-admin"));
const Hilloula = lazy(() => import("@/pages/hilloula-2024"));
const NotFound = lazy(() => import("@/pages/not-found"));

// Loading fallback for Suspense
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-50 to-orange-100 dark:from-gray-900 dark:to-gray-800">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600"></div>
  </div>
);

function Router() {
  return (
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
      <Route path="/breslov-videos" component={BreslovVideos} />
      <Route path="/keren-style" component={KerenStyle} />
      <Route path="/haesh-hype" component={HaeshHype} />
      <Route path="/chat" component={Chat} />
      <Route path="/lottery" component={Lottery} />
      <Route path="/lottery/admin" component={LotteryAdmin} />
      <Route path="/hilloula-2024" component={Hilloula} />
      <Route path="/yaaakov" component={YaakovDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
          <LanguageProvider>
            <CartProvider>
              <Toaster />
              <InstallPrompt />
              <AmbientMusic />
              <Suspense fallback={<PageLoader />}>
                <Router />
              </Suspense>
            </CartProvider>
          </LanguageProvider>
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
