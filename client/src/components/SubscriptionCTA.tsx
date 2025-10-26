import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Crown, CheckCircle, ArrowRight, AlertCircle, Mail, Phone } from 'lucide-react';

interface SubscriptionStatus {
  configured: boolean;
  message: string;
}

interface SubscriptionCTAProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  showManageLink?: boolean;
  className?: string;
  'data-testid'?: string;
}

export function SubscriptionCTA({ 
  variant = 'primary', 
  size = 'md',
  showManageLink = true,
  className = '',
  'data-testid': testId
}: SubscriptionCTAProps) {
  const [showContactInfo, setShowContactInfo] = useState(false);

  // Check Stripe configuration
  const { data: stripeStatus } = useQuery<SubscriptionStatus>({
    queryKey: ['/api/stripe-status'],
    retry: false,
    refetchOnWindowFocus: false,
  });

  // Get user subscription status
  const { data: userSubscription, isLoading: subscriptionLoading } = useQuery({
    queryKey: ['/api/user/subscription'],
    retry: false,
    refetchOnWindowFocus: false,
  });

  const user = (userSubscription as any)?.user;
  const isSubscriber = user?.isSubscriber || false;
  const subscriptionStatus = user?.subscriptionStatus;

  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'px-4 py-2 text-sm';
      case 'lg': return 'px-6 py-4 text-lg';
      default: return 'px-5 py-3 text-base';
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'secondary': return 'btn-breslov-secondary';
      default: return 'btn-breslov-primary';
    }
  };

  // Loading state
  if (subscriptionLoading) {
    return (
      <Button 
        disabled 
        className={`${getVariantClasses()} ${getSizeClasses()} ${className} opacity-50`}
        data-testid={testId || 'subscription-loading'}
      >
        טוען...
      </Button>
    );
  }

  // If user is already subscribed and active
  if (isSubscriber && subscriptionStatus === 'active') {
    return (
      <div className="flex flex-col sm:flex-row gap-3">
        <Button 
          disabled
          className="bg-green-600 hover:bg-green-700 text-white font-bold flex items-center gap-2"
          data-testid={testId || 'subscription-active'}
        >
          <CheckCircle className="w-4 h-4" />
          מנוי פעיל
        </Button>
        {showManageLink && (
          <Button 
            asChild
            variant="outline" 
            className="border-primary text-primary hover:bg-primary hover:text-white"
            data-testid={testId ? `${testId}-manage` : 'subscription-manage'}
          >
            <a href="/subscription/manage">
              <ArrowRight className="w-4 h-4 mr-2" />
              ניהול מנוי
            </a>
          </Button>
        )}
      </div>
    );
  }

  // If Stripe is not configured, show fallback
  if (stripeStatus && !stripeStatus.configured) {
    return (
      <div className="space-y-4">
        <Alert className="border-amber-300 bg-amber-50 dark:bg-amber-950 dark:border-amber-500">
          <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          <AlertTitle className="text-amber-800 dark:text-amber-200">
            המנוי זמנית לא זמין
          </AlertTitle>
          <AlertDescription className="text-amber-700 dark:text-amber-300">
            לרכישת מנוי, אנא צרו קשר ישירות עם השירות לקוחות
          </AlertDescription>
        </Alert>
        
        {!showContactInfo ? (
          <Button 
            onClick={() => setShowContactInfo(true)}
            className={`${getVariantClasses()} ${getSizeClasses()} ${className} w-full`}
            data-testid={testId || 'subscription-contact-info'}
          >
            <Crown className="w-4 h-4 mr-2" />
            מידע על רכישת מנוי
          </Button>
        ) : (
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
            <h4 className="font-semibold text-foreground">צרו קשר לרכישת מנוי:</h4>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                asChild 
                className="flex-1 btn-breslov-primary"
                data-testid={testId ? `${testId}-email` : 'contact-email'}
              >
                <a href="mailto:support@haesh-sheli.co.il?subject=בקשה לרכישת מנוי הוראת קבע&body=שלום, אני מעוניין/ת לרכוש מנוי הוראת קבע. אנא צרו איתי קשר.">
                  <Mail className="w-4 h-4 mr-2" />
                  שלח אימייל
                </a>
              </Button>
              
              <Button 
                asChild 
                variant="outline" 
                className="flex-1 border-primary text-primary hover:bg-primary hover:text-white"
                data-testid={testId ? `${testId}-phone` : 'contact-phone'}
              >
                <a href="tel:+972-2-123-4567">
                  <Phone className="w-4 h-4 mr-2" />
                  התקשר
                </a>
              </Button>
            </div>
            
            <div className="text-xs text-center text-muted-foreground">
              support@haesh-sheli.co.il • 02-123-4567
            </div>
          </div>
        )}
      </div>
    );
  }

  // Default CTA - user not subscribed, Stripe is configured
  return (
    <Button 
      asChild
      className={`${getVariantClasses()} ${getSizeClasses()} ${className}`}
      data-testid={testId || 'subscription-join'}
    >
      <a href="/subscription">
        <Crown className="w-4 h-4 mr-2" />
        הצטרף למנוי הוראת קבע
      </a>
    </Button>
  );
}