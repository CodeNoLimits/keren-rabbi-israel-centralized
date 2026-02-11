import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import {
  ShoppingCart,
  CreditCard,
  Shield,
  Heart,
  Lock,
  Truck,
} from 'lucide-react';

// ----- Payment method SVG icons -----

const VisaIcon = () => (
  <svg viewBox="0 0 48 32" className="h-6 w-auto" fill="none">
    <rect width="48" height="32" rx="4" fill="#1A1F71" />
    <path
      d="M19.5 21h-3l1.9-11.5h3L19.5 21zm8.1-11.2c-.6-.2-1.5-.5-2.7-.5-3 0-5.1 1.5-5.1 3.7 0 1.6 1.5 2.5 2.6 3.1 1.1.6 1.5 .9 1.5 1.4 0 .8-.9 1.1-1.7 1.1-1.2 0-1.8-.2-2.7-.5l-.4-.2-.4 2.4c.7.3 1.9.6 3.2.6 3.2 0 5.2-1.5 5.2-3.8 0-1.3-.8-2.3-2.5-3.1-1-.5-1.7-.9-1.7-1.4 0-.5.5-1 1.7-1 1 0 1.7.2 2.2.4l.3.1.5-2.3zm7.8-.3h-2.3c-.7 0-1.3.2-1.6.9L27 21h3.2s.5-1.4.6-1.7h3.9c.1.4.4 1.7.4 1.7h2.8l-2.5-11.5zm-3.7 7.4c.3-.7 1.2-3.3 1.2-3.3s.2-.7.4-1.1l.2 1s.6 2.8.7 3.4h-2.5zM16.2 9.5L13.3 17l-.3-1.5c-.5-1.8-2.2-3.7-4.1-4.7l2.7 10.2h3.2l4.8-11.5h-3.4z"
      fill="white"
    />
    <path
      d="M11.3 9.5H6.1l-.1.3c3.8.9 6.3 3.2 7.3 5.9l-1.1-5.3c-.2-.7-.7-.9-1-.9z"
      fill="#F9A533"
    />
  </svg>
);

const MastercardIcon = () => (
  <svg viewBox="0 0 48 32" className="h-6 w-auto" fill="none">
    <rect width="48" height="32" rx="4" fill="#252525" />
    <circle cx="19" cy="16" r="8" fill="#EB001B" />
    <circle cx="29" cy="16" r="8" fill="#F79E1B" />
    <path
      d="M24 10.3a8 8 0 0 1 0 11.4 8 8 0 0 1 0-11.4z"
      fill="#FF5F00"
    />
  </svg>
);

const BitIcon = () => (
  <svg viewBox="0 0 48 32" className="h-6 w-auto" fill="none">
    <rect width="48" height="32" rx="4" fill="#3CC564" />
    <text
      x="24"
      y="20"
      textAnchor="middle"
      fill="white"
      fontSize="14"
      fontWeight="bold"
      fontFamily="Arial, sans-serif"
    >
      bit
    </text>
  </svg>
);

const PayPalIcon = () => (
  <svg viewBox="0 0 48 32" className="h-6 w-auto" fill="none">
    <rect width="48" height="32" rx="4" fill="#003087" />
    <text
      x="24"
      y="20"
      textAnchor="middle"
      fill="white"
      fontSize="11"
      fontWeight="bold"
      fontFamily="Arial, sans-serif"
    >
      PayPal
    </text>
  </svg>
);

// ----- Types & Schema factory -----

type PaymentMethod = 'credit_card' | 'bit' | 'paypal';

const createCheckoutSchema = (t: (key: string) => string) =>
  z.object({
    firstName: z.string().min(1, t('firstNameRequired')),
    lastName: z.string().min(1, t('lastNameRequired')),
    email: z.string().min(1, t('emailRequired')).email(t('emailInvalid')),
    phone: z
      .string()
      .min(1, t('phoneRequired'))
      .regex(/^05\d[-]?\d{7}$/, t('phoneInvalid')),
    address: z.string().min(1, t('addressRequired')),
    city: z.string().min(1, t('cityRequired')),
    zipCode: z.string().min(1, t('zipCodeRequired')),
    orderNotes: z.string().optional(),
    paymentMethod: z.enum(['credit_card', 'bit', 'paypal']),
  });

type CheckoutFormValues = z.infer<ReturnType<typeof createCheckoutSchema>>;

// ----- Component -----

export function CheckoutForm() {
  const { items, totalPrice, subtotalPrice, discount, isSubscriber } = useCart();
  const { currentLanguage, t } = useLanguage();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const isRTL = currentLanguage === 'he';
  const dir = isRTL ? 'rtl' : 'ltr';

  const schema = createCheckoutSchema(t);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      zipCode: '',
      orderNotes: '',
      paymentMethod: 'credit_card',
    },
  });

  const onSubmit = async (data: CheckoutFormValues) => {
    setIsLoading(true);
    try {
      const cartData = items.map((item) => ({
        productId: item.productId,
        variantId: item.variantId,
        name: item.name,
        nameEnglish: item.nameEnglish,
        price: item.price,
        quantity: item.quantity,
        variant: item.variant,
      }));

      const res = await apiRequest('POST', '/api/create-payment-intent', {
        cart: cartData,
        shippingAddress: {
          fullName: `${data.firstName} ${data.lastName}`,
          addressLine1: data.address,
          city: data.city,
          postalCode: data.zipCode,
          country: 'IL',
          phone: data.phone,
        },
        billingAddress: {
          fullName: `${data.firstName} ${data.lastName}`,
          addressLine1: data.address,
          city: data.city,
          postalCode: data.zipCode,
          country: 'IL',
          phone: data.phone,
        },
        email: data.email,
        paymentMethod: data.paymentMethod,
        orderNotes: data.orderNotes,
        shippingMethod: 'standard',
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || t('error'));
      }

      toast({
        title: t('success'),
        description: t('securePaymentDesc'),
      });
    } catch (error: any) {
      toast({
        title: t('error'),
        description: error.message || t('error'),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const shippingCost = subtotalPrice >= 399 ? 0 : 29;

  // ----- Render -----

  return (
    <div dir={dir} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* ============ FORM COLUMN (right in RTL) ============ */}
      <div className="order-1">
        <Card className="bg-white shadow-sm border border-gray-100">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Truck className="h-5 w-5 text-orange-500" />
              {t('shippingDetails')}
            </CardTitle>
            <p className="text-sm text-gray-500">{t('fillShippingDetails')}</p>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                {/* First + Last name row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('firstName')} *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t('firstName')}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('lastName')} *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t('lastName')}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Email + Phone row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('email')} *</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="email@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('phone')} *</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="050-1234567"
                            dir="ltr"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Address */}
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('address')} *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t('address')}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* City + Zip code row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('city')} *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t('city')}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('zipCode')} *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t('zipCode')}
                            dir="ltr"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Order notes */}
                <FormField
                  control={form.control}
                  name="orderNotes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('orderNotes')}</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={t('orderNotesPlaceholder')}
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* ---- Payment Method Section ---- */}
                <div className="pt-2">
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-orange-500" />
                    {t('paymentMethod')}
                  </h3>
                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="space-y-3"
                          >
                            {/* Credit Card */}
                            <label
                              className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                                field.value === 'credit_card'
                                  ? 'border-orange-500 bg-orange-50'
                                  : 'border-gray-200 bg-white hover:border-gray-300'
                              }`}
                            >
                              <RadioGroupItem value="credit_card" />
                              <div className="flex items-center gap-2 flex-1">
                                <span className="font-medium">
                                  {t('creditCard')}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <VisaIcon />
                                <MastercardIcon />
                              </div>
                            </label>

                            {/* Bit */}
                            <label
                              className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                                field.value === 'bit'
                                  ? 'border-green-500 bg-green-50'
                                  : 'border-gray-200 bg-white hover:border-gray-300'
                              }`}
                            >
                              <RadioGroupItem value="bit" />
                              <div className="flex items-center gap-2 flex-1">
                                <span className="font-medium">
                                  {t('bit')}
                                </span>
                              </div>
                              <BitIcon />
                            </label>

                            {/* PayPal */}
                            <label
                              className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                                field.value === 'paypal'
                                  ? 'border-blue-500 bg-blue-50'
                                  : 'border-gray-200 bg-white hover:border-gray-300'
                              }`}
                            >
                              <RadioGroupItem value="paypal" />
                              <div className="flex items-center gap-2 flex-1">
                                <span className="font-medium">
                                  {t('paypal')}
                                </span>
                              </div>
                              <PayPalIcon />
                            </label>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Secure badge */}
                <div className="flex items-center gap-2 text-sm text-gray-500 pt-1">
                  <Lock className="h-4 w-4" />
                  <span>{t('securePaymentDesc')}</span>
                </div>

                {/* ---- Submit Button ---- */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold text-lg py-4 px-6 rounded-lg shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                      <span>{t('processing')}</span>
                    </>
                  ) : (
                    <>
                      <Lock className="h-5 w-5" />
                      <span>{t('payNow')}</span>
                    </>
                  )}
                </button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      {/* ============ ORDER SUMMARY COLUMN (left in RTL) ============ */}
      <div className="order-2 space-y-6">
        {/* Cart items */}
        <Card className="bg-white shadow-sm border border-gray-100">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-xl">
              <ShoppingCart className="h-5 w-5 text-orange-500" />
              {t('orderSummary')} ({items.length} {t('items')})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3"
                >
                  {/* Product image */}
                  {item.image && (
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  {/* Product info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">
                      {item.name}
                    </h4>
                    {item.variant && (
                      <p className="text-xs text-gray-500">
                        {item.variant.format} - {item.variant.size}
                      </p>
                    )}
                    <p className="text-xs text-gray-400">
                      {t('quantity')}: {item.quantity} x {t('shekel')}
                      {item.price}
                    </p>
                  </div>
                  {/* Price */}
                  <span className="font-semibold text-sm whitespace-nowrap">
                    {t('shekel')}
                    {(item.price * item.quantity).toFixed(0)}
                  </span>
                </div>
              ))}

              <Separator className="my-3" />

              {/* Totals */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('subtotal')}:</span>
                  <span>
                    {t('shekel')}
                    {subtotalPrice}
                  </span>
                </div>

                {isSubscriber && discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>{t('subscriberDiscount')}:</span>
                    <span>
                      -{t('shekel')}
                      {discount}
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-gray-600">{t('shipping')}:</span>
                  <span className={shippingCost === 0 ? 'text-green-600 font-medium' : ''}>
                    {shippingCost === 0
                      ? t('freeShippingLabel')
                      : `${t('shekel')}${shippingCost}`}
                  </span>
                </div>

                <Separator className="my-2" />

                <div className="flex justify-between text-lg font-bold">
                  <span>{t('total')}:</span>
                  <span className="text-orange-600">
                    {t('shekel')}
                    {totalPrice + shippingCost}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Spiritual Support */}
        <Card className="border-amber-200 bg-amber-50 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Heart className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-amber-800 mb-1">
                  {t('spiritualSupport')}
                </h3>
                <p className="text-sm text-amber-700">
                  {t('spiritualSupportDesc')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Shipping Policy */}
        <Card className="border-green-200 bg-green-50 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Shield className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-green-800 mb-2">
                  {t('shippingPolicy')}
                </h3>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>
                    {t('freeShippingOver')} {t('shekel')}399
                  </li>
                  <li>{t('deliveryTime')}</li>
                  <li>{t('returnPolicy')}</li>
                  <li>{t('defectivePolicy')}</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
