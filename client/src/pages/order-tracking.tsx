import { useState, useEffect } from 'react';
import { useRoute } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Package, Truck, CheckCircle2, XCircle, Clock, MapPin, Mail, Phone } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import type { Order, OrderItem, ShippingAddress } from '@shared/schema';

const translations = {
  he: {
    title: 'מעקב הזמנה',
    enterOrderId: 'הזן מספר הזמנה',
    orderIdPlaceholder: 'מספר הזמנה (למשל: abc123...)',
    trackButton: 'עקוב אחר הזמנה',
    loading: 'טוען...',
    orderNotFound: 'הזמנה לא נמצאה',
    orderNotFoundDesc: 'לא הצלחנו למצוא הזמנה עם המספר הזה. אנא בדוק את המספר ונסה שוב.',
    orderDetails: 'פרטי הזמנה',
    orderId: 'מספר הזמנה',
    orderDate: 'תאריך הזמנה',
    status: 'סטטוס',
    paymentStatus: 'סטטוס תשלום',
    trackingNumber: 'מספר מעקב',
    estimatedDelivery: 'משלוח משוער',
    deliveredAt: 'נמסר בתאריך',
    items: 'פריטים',
    total: 'סה"כ',
    shippingAddress: 'כתובת למשלוח',
    customerNotes: 'הערות לקוח',
    contactSupport: 'צור קשר עם שירות לקוחות',
    pending: 'ממתין',
    processing: 'בטיפול',
    shipped: 'נשלח',
    delivered: 'נמסר',
    canceled: 'בוטל',
    refunded: 'הוחזר',
    succeeded: 'הצליח',
    failed: 'נכשל',
    nis: '₪',
  },
  en: {
    title: 'Order Tracking',
    enterOrderId: 'Enter Order ID',
    orderIdPlaceholder: 'Order ID (e.g., abc123...)',
    trackButton: 'Track Order',
    loading: 'Loading...',
    orderNotFound: 'Order Not Found',
    orderNotFoundDesc: 'We could not find an order with this ID. Please check the number and try again.',
    orderDetails: 'Order Details',
    orderId: 'Order ID',
    orderDate: 'Order Date',
    status: 'Status',
    paymentStatus: 'Payment Status',
    trackingNumber: 'Tracking Number',
    estimatedDelivery: 'Estimated Delivery',
    deliveredAt: 'Delivered At',
    items: 'Items',
    total: 'Total',
    shippingAddress: 'Shipping Address',
    customerNotes: 'Customer Notes',
    contactSupport: 'Contact Support',
    pending: 'Pending',
    processing: 'Processing',
    shipped: 'Shipped',
    delivered: 'Delivered',
    canceled: 'Canceled',
    refunded: 'Refunded',
    succeeded: 'Succeeded',
    failed: 'Failed',
    nis: 'NIS',
  },
  fr: {
    title: 'Suivi de Commande',
    enterOrderId: 'Entrez le numéro de commande',
    orderIdPlaceholder: 'Numéro de commande (ex: abc123...)',
    trackButton: 'Suivre la commande',
    loading: 'Chargement...',
    orderNotFound: 'Commande non trouvée',
    orderNotFoundDesc: 'Nous n\'avons pas trouvé de commande avec ce numéro. Veuillez vérifier et réessayer.',
    orderDetails: 'Détails de la commande',
    orderId: 'Numéro de commande',
    orderDate: 'Date de commande',
    status: 'Statut',
    paymentStatus: 'Statut du paiement',
    trackingNumber: 'Numéro de suivi',
    estimatedDelivery: 'Livraison estimée',
    deliveredAt: 'Livré le',
    items: 'Articles',
    total: 'Total',
    shippingAddress: 'Adresse de livraison',
    customerNotes: 'Notes du client',
    contactSupport: 'Contacter le support',
    pending: 'En attente',
    processing: 'En cours',
    shipped: 'Expédié',
    delivered: 'Livré',
    canceled: 'Annulé',
    refunded: 'Remboursé',
    succeeded: 'Réussi',
    failed: 'Échoué',
    nis: 'NIS',
  },
  es: {
    title: 'Seguimiento de Pedido',
    enterOrderId: 'Ingrese número de pedido',
    orderIdPlaceholder: 'Número de pedido (ej: abc123...)',
    trackButton: 'Rastrear Pedido',
    loading: 'Cargando...',
    orderNotFound: 'Pedido No Encontrado',
    orderNotFoundDesc: 'No pudimos encontrar un pedido con este número. Por favor verifique e intente de nuevo.',
    orderDetails: 'Detalles del Pedido',
    orderId: 'Número de Pedido',
    orderDate: 'Fecha de Pedido',
    status: 'Estado',
    paymentStatus: 'Estado del Pago',
    trackingNumber: 'Número de Seguimiento',
    estimatedDelivery: 'Entrega Estimada',
    deliveredAt: 'Entregado el',
    items: 'Artículos',
    total: 'Total',
    shippingAddress: 'Dirección de Envío',
    customerNotes: 'Notas del Cliente',
    contactSupport: 'Contactar Soporte',
    pending: 'Pendiente',
    processing: 'Procesando',
    shipped: 'Enviado',
    delivered: 'Entregado',
    canceled: 'Cancelado',
    refunded: 'Reembolsado',
    succeeded: 'Exitoso',
    failed: 'Fallido',
    nis: 'NIS',
  },
  ru: {
    title: 'Отслеживание Заказа',
    enterOrderId: 'Введите номер заказа',
    orderIdPlaceholder: 'Номер заказа (напр: abc123...)',
    trackButton: 'Отследить Заказ',
    loading: 'Загрузка...',
    orderNotFound: 'Заказ Не Найден',
    orderNotFoundDesc: 'Мы не смогли найти заказ с этим номером. Пожалуйста, проверьте и попробуйте снова.',
    orderDetails: 'Детали Заказа',
    orderId: 'Номер Заказа',
    orderDate: 'Дата Заказа',
    status: 'Статус',
    paymentStatus: 'Статус Оплаты',
    trackingNumber: 'Номер Отслеживания',
    estimatedDelivery: 'Ожидаемая Доставка',
    deliveredAt: 'Доставлено',
    items: 'Товары',
    total: 'Итого',
    shippingAddress: 'Адрес Доставки',
    customerNotes: 'Заметки Клиента',
    contactSupport: 'Связаться с Поддержкой',
    pending: 'В ожидании',
    processing: 'Обрабатывается',
    shipped: 'Отправлено',
    delivered: 'Доставлено',
    canceled: 'Отменено',
    refunded: 'Возвращено',
    succeeded: 'Успешно',
    failed: 'Неудачно',
    nis: 'NIS',
  },
};

type OrderWithItems = Order & {
  items: OrderItem[];
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'pending':
      return <Clock className="h-5 w-5" />;
    case 'processing':
      return <Package className="h-5 w-5" />;
    case 'shipped':
      return <Truck className="h-5 w-5" />;
    case 'delivered':
      return <CheckCircle2 className="h-5 w-5" />;
    case 'canceled':
    case 'refunded':
      return <XCircle className="h-5 w-5" />;
    default:
      return <Clock className="h-5 w-5" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'processing':
      return 'bg-blue-100 text-blue-800 border-blue-300';
    case 'shipped':
      return 'bg-purple-100 text-purple-800 border-purple-300';
    case 'delivered':
      return 'bg-green-100 text-green-800 border-green-300';
    case 'canceled':
      return 'bg-red-100 text-red-800 border-red-300';
    case 'refunded':
      return 'bg-orange-100 text-orange-800 border-orange-300';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300';
  }
};

export default function OrderTracking() {
  const { currentLanguage, isRTL } = useLanguage();
  const t = translations[currentLanguage as keyof typeof translations] || translations.he;
  const [, params] = useRoute('/orders/:id');
  const [orderId, setOrderId] = useState(params?.id || '');
  const [order, setOrder] = useState<OrderWithItems | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchOrder = async (id: string) => {
    if (!id) return;

    setLoading(true);
    setError(false);

    try {
      const response = await fetch(`/api/orders/${id}`);

      if (!response.ok) {
        setError(true);
        setOrder(null);
        return;
      }

      const data = await response.json();
      setOrder(data);
    } catch (err) {
      console.error('Failed to fetch order:', err);
      setError(true);
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params?.id) {
      fetchOrder(params.id);
    }
  }, [params?.id]);

  const handleTrack = () => {
    if (orderId.trim()) {
      window.history.pushState({}, '', `/orders/${orderId}`);
      fetchOrder(orderId);
    }
  };

  const formatDate = (date: Date | string | null) => {
    if (!date) return '-';
    const d = new Date(date);
    return d.toLocaleDateString(currentLanguage === 'he' ? 'he-IL' : currentLanguage, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatPrice = (priceInAgorot: number) => {
    const price = (priceInAgorot / 100).toFixed(2);
    return isRTL ? `${price} ${t.nis}` : `${t.nis} ${price}`;
  };

  const formatAddress = (address: ShippingAddress) => {
    return `${address.fullName}, ${address.addressLine1}${address.addressLine2 ? ', ' + address.addressLine2 : ''}, ${address.city}, ${address.postalCode}, ${address.country}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white dark:from-gray-900 dark:to-gray-800" dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          {t.title}
        </h1>

        {/* Order ID Input */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{t.enterOrderId}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder={t.orderIdPlaceholder}
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
                className="flex-1"
              />
              <Button onClick={handleTrack} disabled={!orderId.trim() || loading}>
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  t.trackButton
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
            <span className="ml-2 text-gray-600">{t.loading}</span>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <Card className="border-red-200 bg-red-50 dark:bg-red-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400">
                <XCircle className="h-5 w-5" />
                {t.orderNotFound}
              </CardTitle>
              <CardDescription className="text-red-600 dark:text-red-300">
                {t.orderNotFoundDesc}
              </CardDescription>
            </CardHeader>
          </Card>
        )}

        {/* Order Details */}
        {order && !loading && (
          <div className="space-y-6">
            {/* Order Status */}
            <Card>
              <CardHeader>
                <CardTitle>{t.orderDetails}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t.orderId}</p>
                    <p className="font-mono text-sm">{order.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t.orderDate}</p>
                    <p>{formatDate(order.createdAt)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{t.status}</p>
                    <Badge className={`${getStatusColor(order.status)} flex items-center gap-2 w-fit`}>
                      {getStatusIcon(order.status)}
                      {t[order.status as keyof typeof t] || order.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{t.paymentStatus}</p>
                    <Badge className={`${getStatusColor(order.paymentStatus)} flex items-center gap-2 w-fit`}>
                      {getStatusIcon(order.paymentStatus)}
                      {t[order.paymentStatus as keyof typeof t] || order.paymentStatus}
                    </Badge>
                  </div>
                </div>

                {order.trackingNumber && (
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t.trackingNumber}</p>
                    <p className="font-mono font-semibold">{order.trackingNumber}</p>
                  </div>
                )}

                {order.estimatedDelivery && (
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t.estimatedDelivery}</p>
                    <p>{formatDate(order.estimatedDelivery)}</p>
                  </div>
                )}

                {order.deliveredAt && (
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t.deliveredAt}</p>
                    <p className="text-green-600 font-semibold">{formatDate(order.deliveredAt)}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle>{t.items}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-start border-b pb-4 last:border-b-0">
                      <div className="flex-1">
                        <p className="font-semibold">{item.productName}</p>
                        {item.productNameEnglish && currentLanguage === 'en' && (
                          <p className="text-sm text-gray-600">{item.productNameEnglish}</p>
                        )}
                        {item.variantDetails && (
                          <p className="text-sm text-gray-500">
                            {item.variantDetails.size} • {item.variantDetails.binding} • {item.variantDetails.format}
                          </p>
                        )}
                        <p className="text-sm text-gray-600">{t.total}: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatPrice(item.totalPrice)}</p>
                        <p className="text-sm text-gray-500">{formatPrice(item.unitPrice)} / {item.quantity > 1 ? 'unit' : ''}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>{formatPrice(order.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>VAT (17%):</span>
                    <span>{formatPrice(order.vatAmount)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping:</span>
                    <span>{formatPrice(order.shippingAmount)}</span>
                  </div>
                  {order.discountAmount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount:</span>
                      <span>-{formatPrice(order.discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold pt-2 border-t">
                    <span>{t.total}:</span>
                    <span>{formatPrice(order.totalAmount)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            {order.shippingAddress && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    {t.shippingAddress}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{formatAddress(order.shippingAddress)}</p>
                  {order.shippingAddress.phone && (
                    <p className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                      <Phone className="h-4 w-4" />
                      {order.shippingAddress.phone}
                    </p>
                  )}
                  <p className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                    <Mail className="h-4 w-4" />
                    {order.email}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Customer Notes */}
            {order.customerNotes && (
              <Card>
                <CardHeader>
                  <CardTitle>{t.customerNotes}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300">{order.customerNotes}</p>
                </CardContent>
              </Card>
            )}

            {/* Contact Support */}
            <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200">
              <CardContent className="pt-6 text-center">
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  {t.contactSupport}
                </p>
                <Button variant="outline" asChild>
                  <a href="/contact">{t.contactSupport}</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
