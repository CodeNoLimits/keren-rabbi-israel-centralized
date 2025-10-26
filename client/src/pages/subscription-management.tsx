import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { CheckCircle, XCircle, Crown, CreditCard, Calendar, DollarSign, History } from 'lucide-react';
import { format } from 'date-fns';
import { he } from 'date-fns/locale';

interface UserSubscription {
  user: {
    id: string;
    username: string;
    email: string;
    isSubscriber: boolean;
    subscriptionStatus: string;
    subscriptionStartDate: string;
    subscriptionEndDate: string;
    subscriptionPlanId: string;
  };
  stripeSubscription?: any;
  history: Array<{
    id: string;
    eventType: string;
    createdAt: string;
    eventData: any;
  }>;
}

export default function SubscriptionManagement() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Fetch user subscription status
  const { data: subscription, isLoading: subscriptionLoading, refetch } = useQuery<UserSubscription>({
    queryKey: ['/api/user/subscription'],
    meta: { errorMessage: "שגיאה בטעינת מצב המנוי" }
  });

  // Cancel subscription mutation
  const cancelSubscriptionMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest('POST', '/api/cancel-subscription');
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "המנוי בוטל בהצלחה",
        description: "המנוי שלך יישאר פעיל עד לסוף התקופה ששולמה",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/user/subscription'] });
    },
    onError: (error: any) => {
      toast({
        title: "שגיאה",
        description: error.message || "אירעה שגיאה בביטול המנוי",
        variant: "destructive",
      });
    }
  });

  const handleCancelSubscription = async () => {
    setIsLoading(true);
    try {
      await cancelSubscriptionMutation.mutateAsync();
    } catch (error) {
      console.error('Cancel subscription error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" /> פעיל</Badge>;
      case 'canceled':
        return <Badge className="bg-destructive/10 text-destructive"><XCircle className="w-3 h-3 mr-1" /> מבוטל</Badge>;
      case 'past_due':
        return <Badge className="badge-premium">בעבר להתשלום</Badge>;
      case 'incomplete':
        return <Badge className="bg-gray-100 text-gray-800">לא הושלם</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getEventTypeText = (eventType: string) => {
    switch (eventType) {
      case 'created':
        return 'מנוי נוצר';
      case 'activated':
        return 'מנוי הופעל';
      case 'canceled':
        return 'מנוי בוטל';
      case 'renewed':
        return 'מנוי חודש';
      case 'failed':
        return 'תשלום נכשל';
      case 'past_due':
        return 'תשלום באיחור';
      default:
        return eventType;
    }
  };

  if (subscriptionLoading) {
    return (
      <div className="min-h-screen hero-surface dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto" />
            <p className="mt-4 text-gray-600 dark:text-gray-300">טוען מידע על המנוי...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!subscription?.user) {
    return (
      <div className="min-h-screen hero-surface dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-primary mb-4">
              נדרשת התחברות
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              יש להתחבר כדי לצפות בפרטי המנוי
            </p>
            <Button asChild>
              <a href="/login">התחבר</a>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const user = subscription.user;
  const isSubscriber = user.isSubscriber;

  return (
    <div className="min-h-screen hero-surface dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            ניהול המנוי שלי
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            הוראת קבע - הנהל את המנוי שלך
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Subscription Status Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-primary">
                <Crown className="w-5 h-5 mr-2" />
                מצב המנוי
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">סטטוס:</span>
                {getStatusBadge(user.subscriptionStatus || 'inactive')}
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">חבר פרימיום:</span>
                {isSubscriber ? (
                  <Badge className="badge-premium">
                    <Crown className="w-3 h-3 mr-1" />
                    כן
                  </Badge>
                ) : (
                  <Badge variant="outline">לא</Badge>
                )}
              </div>

              {user.subscriptionStartDate && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">תאריך התחלה:</span>
                  <span className="font-medium">
                    {format(new Date(user.subscriptionStartDate), 'dd/MM/yyyy', { locale: he })}
                  </span>
                </div>
              )}

              {user.subscriptionEndDate && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">תאריך סיום:</span>
                  <span className="font-medium">
                    {format(new Date(user.subscriptionEndDate), 'dd/MM/yyyy', { locale: he })}
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">תוכנית:</span>
                <span className="font-medium">הוראת קבע פרימיום</span>
              </div>
            </CardContent>
          </Card>

          {/* Benefits Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-green-600 dark:text-green-400">
                <CheckCircle className="w-5 h-5 mr-2" />
                יתרונות המנוי
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-reverse space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">
                  גישה חופשית לכל הספרים הדיגיטליים
                </span>
              </div>
              <div className="flex items-center space-x-reverse space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">
                  5% הנחה על כל ההזמנות הפיזיות
                </span>
              </div>
              <div className="flex items-center space-x-reverse space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">
                  סטטוס חבר פרימיום
                </span>
              </div>
              <div className="flex items-center space-x-reverse space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">
                  גישה מוקדמת לשחרורים חדשים
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="max-w-4xl mx-auto mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900 dark:text-white">
                <CreditCard className="w-5 h-5 mr-2" />
                פעולות
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
              {!isSubscriber ? (
                <Button asChild className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700">
                  <a href="/subscription">
                    <Crown className="w-4 h-4 mr-2" />
                    הצטרף להוראת קבע
                  </a>
                </Button>
              ) : (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" disabled={isLoading}>
                      <XCircle className="w-4 h-4 mr-2" />
                      בטל מנוי
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>בטל מנוי</AlertDialogTitle>
                      <AlertDialogDescription>
                        האם אתה בטוח שברצונך לבטל את המנוי? המנוי יישאר פעיל עד לסוף התקופה ששולמה.
                        לאחר מכן לא תוכל יותר לגשת לספרים הדיגיטליים וההנחה לא תחול על הקניות שלך.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>ביטול</AlertDialogCancel>
                      <AlertDialogAction onClick={handleCancelSubscription} disabled={isLoading}>
                        {isLoading ? "מבטל..." : "בטל מנוי"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}

              <Button variant="outline" asChild>
                <a href="/downloads">
                  <History className="w-4 h-4 mr-2" />
                  ספרים דיגיטליים
                </a>
              </Button>

              <Button variant="outline" asChild>
                <a href="/store">
                  <DollarSign className="w-4 h-4 mr-2" />
                  חנות
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Subscription History */}
        {subscription.history && subscription.history.length > 0 && (
          <div className="max-w-4xl mx-auto mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900 dark:text-white">
                  <History className="w-5 h-5 mr-2" />
                  היסטוריית המנוי
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {subscription.history.slice(0, 10).map((event) => (
                    <div
                      key={event.id}
                      className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div>
                        <span className="font-medium">{getEventTypeText(event.eventType)}</span>
                        {event.eventData && (
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {JSON.stringify(event.eventData, null, 2)}
                          </p>
                        )}
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {format(new Date(event.createdAt), 'dd/MM/yyyy HH:mm', { locale: he })}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}