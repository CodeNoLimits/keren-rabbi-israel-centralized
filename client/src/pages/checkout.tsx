import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useStripe, useElements, Elements, PaymentElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { CheckoutForm } from '@/components/CheckoutForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, CreditCard } from 'lucide-react';

// Load Stripe
const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
const stripePromise = stripePublicKey ? loadStripe(stripePublicKey) : null;

const StripePaymentForm = ({ clientSecret, orderSummary }: {
  clientSecret: string;
  orderSummary: any;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const { clearCart } = useCart();
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!stripe || !elements) {
      toast({
        title: t('error'),
        description: t('error'),
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/success`,
        },
      });

      if (error) {
        toast({
          title: t('error'),
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: t('success'),
          description: t('securePaymentDesc'),
        });
        clearCart();
        queryClient.invalidateQueries({ queryKey: ['/api/user/subscription'] });
      }
    } catch (error: any) {
      console.error('Checkout error:', error);
      toast({
        title: t('error'),
        description: t('error'),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (amount: number) => `₪${(amount / 100).toFixed(2)}`;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border">
        <PaymentElement />
      </div>

      <Button
        type="submit"
        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg font-bold shadow-lg"
        disabled={!stripe || !elements || isLoading}
        data-testid="button-complete-payment"
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
            {t('processing')}
          </div>
        ) : (
          <>
            <CreditCard className="h-5 w-5" />
            {t('payNow')} - {formatPrice(orderSummary.totalAmount)}
          </>
        )}
      </Button>
    </form>
  );
};

export default function Checkout() {
  const { items } = useCart();
  const { currentLanguage, t } = useLanguage();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [orderSummary, setOrderSummary] = useState<any>(null);

  const isRTL = currentLanguage === 'he';
  const dir = isRTL ? 'rtl' : 'ltr';

  // Redirect if cart is empty
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4" dir={dir}>
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-8">
            <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <h2 className="text-2xl font-bold mb-2">{t('emptyCart')}</h2>
            <p className="text-gray-600 mb-4">{t('emptyCartDesc')}</p>
            <Button asChild>
              <a href="/store">{t('continueShopping')}</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" dir={dir}>
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Page title */}
          <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            {t('checkoutTitle')}
          </h1>

          {!clientSecret ? (
            <CheckoutForm />
          ) : (
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">
                    <CreditCard className="h-8 w-8 mx-auto mb-2" />
                    {t('securePayment')}
                  </CardTitle>
                  <CardDescription className="text-center">
                    {t('securePaymentDesc')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {stripePromise && (
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                      <StripePaymentForm clientSecret={clientSecret} orderSummary={orderSummary} />
                    </Elements>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
