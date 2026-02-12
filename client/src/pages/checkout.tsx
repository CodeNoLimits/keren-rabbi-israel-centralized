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
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

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
  const { t, currentLanguage } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [showInstallments, setShowInstallments] = useState(false);

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

  // Task 84: Calculate installment payments (Tashlumim)
  // Israeli credit cards commonly support 12 monthly payments without interest
  const installmentPlans = [
    { months: 1, label: currentLanguage === 'he' ? 'תשלום אחד' : currentLanguage === 'fr' ? 'Paiement unique' : 'Single payment' },
    { months: 3, label: currentLanguage === 'he' ? '3 תשלומים' : currentLanguage === 'fr' ? '3 paiements' : '3 payments' },
    { months: 6, label: currentLanguage === 'he' ? '6 תשלומים' : currentLanguage === 'fr' ? '6 paiements' : '6 payments' },
    { months: 12, label: currentLanguage === 'he' ? '12 תשלומים ללא ריבית' : currentLanguage === 'fr' ? '12 paiements sans intérêt' : '12 payments interest-free' }
  ];

  const calculateMonthlyPayment = (months: number) => {
    return Math.ceil(orderSummary.totalAmount / months / 100);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Task 84: Installment Payment Information Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <CreditCard className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h3 className="font-bold text-blue-900 mb-2">
              {currentLanguage === 'he' ? '💳 תשלום בתשלומים' :
               currentLanguage === 'fr' ? '💳 Paiement en plusieurs fois' :
               '💳 Installment Payments'}
            </h3>
            <p className="text-sm text-blue-800 mb-3">
              {currentLanguage === 'he' ?
                'ניתן לשלם עד 12 תשלומים ללא ריבית בכרטיסי אשראי ישראליים' :
               currentLanguage === 'fr' ?
                'Payez jusqu\'à 12 versements sans intérêt avec les cartes de crédit israéliennes' :
                'Pay up to 12 installments interest-free with Israeli credit cards'}
            </p>

            {/* Installment Options Grid */}
            <div className="grid grid-cols-2 gap-2 mb-2">
              {installmentPlans.map(plan => (
                <div key={plan.months} className="bg-white rounded-lg p-3 border border-blue-200">
                  <div className="text-xs text-gray-600 mb-1">{plan.label}</div>
                  <div className="font-bold text-blue-900">
                    ₪{calculateMonthlyPayment(plan.months)}
                    {plan.months > 1 && (
                      <span className="text-xs font-normal text-gray-600">
                        {currentLanguage === 'he' ? ' לחודש' :
                         currentLanguage === 'fr' ? '/mois' : '/month'}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setShowInstallments(!showInstallments)}
              className="text-sm text-blue-600 hover:text-blue-800 underline"
            >
              {showInstallments ?
                (currentLanguage === 'he' ? 'הסתר פירוט' : currentLanguage === 'fr' ? 'Masquer les détails' : 'Hide details') :
                (currentLanguage === 'he' ? 'הצג פירוט מלא' : currentLanguage === 'fr' ? 'Afficher tous les détails' : 'Show full details')}
            </button>

            {showInstallments && (
              <div className="mt-3 pt-3 border-t border-blue-200 space-y-2">
                <div className="text-sm text-blue-800">
                  <strong>{currentLanguage === 'he' ? 'פירוט תשלומים:' : currentLanguage === 'fr' ? 'Détails des paiements:' : 'Payment breakdown:'}</strong>
                </div>
                {installmentPlans.filter(p => p.months > 1).map(plan => (
                  <div key={plan.months} className="text-xs text-blue-700 bg-blue-50 p-2 rounded">
                    <strong>{plan.label}:</strong> {plan.months} × ₪{calculateMonthlyPayment(plan.months)} = ₪{formatPrice(orderSummary.totalAmount).replace('₪', '')}
                  </div>
                ))}
                <div className="text-xs text-gray-600 italic mt-2">
                  {currentLanguage === 'he' ?
                    '* תשלומים מתבצעים באמצעות חברת האשראי שלך. אין עמלות נוספות.' :
                   currentLanguage === 'fr' ?
                    '* Les paiements sont traités par votre société de carte de crédit. Pas de frais supplémentaires.' :
                    '* Installments are processed by your credit card company. No additional fees.'}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* PaymentElement with Israeli payment methods enabled */}
      {/* Task 82: Bit, PayBox, Google Pay, Apple Pay enabled via Stripe Payment Element */}
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border">
        <PaymentElement
          options={{
            layout: 'tabs',
            paymentMethodOrder: ['card', 'google_pay', 'apple_pay'],
            // Stripe automatically shows available payment methods based on currency (ILS)
            // Israeli payment methods (Bit) are enabled when currency is ILS
            fields: {
              billingDetails: {
                address: {
                  country: 'never' // Already collected in checkout form
                }
              }
            }
          }}
        />
      </div>

      {/* Test card numbers for development:
          Visa: 4242 4242 4242 4242
          Visa (debit): 4000 0566 5566 5556
          Mastercard: 5555 5555 5555 4444
          Israeli card: 4000 0037 6000 0000 (Israel-issued Visa)
          Use any future expiry date and any 3-digit CVC
      */}

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
  const { items, clearCart } = useCart();
  const { currentLanguage, t } = useLanguage();
  const { toast } = useToast();
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
    <PayPalScriptProvider options={{ 
      "clientId": import.meta.env.VITE_PAYPAL_CLIENT_ID || "sb",
      currency: "ILS",
      intent: "capture"
    }}>
      <div className="min-h-screen bg-gray-50" dir={dir}>
        <Header />

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-5xl mx-auto">
            {/* Page title */}
            <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              {t('checkoutTitle')}
            </h1>

            {!orderSummary ? (
              <CheckoutForm onSuccess={(secret, summary) => {
                setClientSecret(secret);
                setOrderSummary(summary);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} />
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
                    {clientSecret ? (
                      stripePromise && (
                        <Elements stripe={stripePromise} options={{ clientSecret }}>
                          <StripePaymentForm clientSecret={clientSecret} orderSummary={orderSummary} />
                        </Elements>
                      )
                    ) : (
                      <div className="space-y-6">
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 text-center">
                          <p className="text-blue-800 font-medium mb-4">
                            {currentLanguage === 'he' ? 'המשך תשלום באמצעות PayPal' : 'Continue with PayPal payment'}
                          </p>
                          <PayPalButtons 
                            style={{ layout: "vertical" }}
                            createOrder={async () => {
                              try {
                                const response = await apiRequest("POST", "/api/paypal/create-order", {
                                  totalAmount: orderSummary.totalAmount
                                });
                                const order = await response.json();
                                return order.id;
                              } catch (err) {
                                console.error(err);
                                return "";
                              }
                            }}
                            onApprove={async (data) => {
                              try {
                                const response = await apiRequest("POST", "/api/paypal/capture-order", {
                                  orderID: data.orderID,
                                  orderId: orderSummary.orderId
                                });
                                const captureData = await response.json();
                                if (captureData.status === 'COMPLETED') {
                                   toast({ title: t('success') });
                                   clearCart();
                                   window.location.href = '/checkout/success';
                                }
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                          />
                        </div>
                        <Button 
                          variant="ghost" 
                          className="w-full"
                          onClick={() => setOrderSummary(null)}
                        >
                          {currentLanguage === 'he' ? 'חזור לעדכון פרטים' : 'Back to details'}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </PayPalScriptProvider>
  );
}
