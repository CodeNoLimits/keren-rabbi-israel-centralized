import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { CartProvider } from "@/contexts/CartContext";
import { InstallPrompt } from "@/components/InstallPrompt";
import { AmbientMusic } from "@/components/AmbientMusic";
import Home from "@/pages/home";
import Store from "@/pages/store";
import About from "@/pages/about";
import Magazine from "@/pages/magazine";
import Join from "@/pages/join";
import Contact from "@/pages/contact";
import Checkout from "@/pages/checkout";

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
import Downloads from "@/pages/downloads";
import Product from "@/pages/product";
import BreslovWisdom from "@/pages/breslovWisdom";
import BreslovVideos from "@/pages/breslov-videos";
import KerenStyle from "@/pages/keren-style";
import HaeshHype from "@/pages/haesh-hype";
import Subscription from "@/pages/subscription";
import SubscriptionManagement from "@/pages/subscription-management";
import YaakovDashboard from "@/pages/yaaakov";
import Chat from "@/pages/chat";
import NotFound from "@/pages/not-found";

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
      <Route path="/keren-style" component={KerenStyle} />
      <Route path="/haesh-hype" component={HaeshHype} />
      <Route path="/chat" component={Chat} />
      <Route path="/yaaakov" component={YaakovDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <CartProvider>
            <Toaster />
            <InstallPrompt />
            <AmbientMusic />
            <Router />
          </CartProvider>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
