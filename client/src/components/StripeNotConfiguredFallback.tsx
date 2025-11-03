import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Mail, Phone, Crown, Star } from 'lucide-react';

interface StripeStatus {
  configured: boolean;
  message: string;
  missingConfig?: {
    secret_key: boolean;
    price_id: boolean;
    public_key_needed: string;
  };
}

interface SubscriptionPlan {
  id: string;
  name: string;
  nameHebrew: string;
  description: string;
  descriptionHebrew: string;
  price: number;
  currency: string;
  features: string[];
  featuresHebrew: string[];
  isActive: boolean;
}

interface StripeNotConfiguredFallbackProps {
  plan: SubscriptionPlan;
  children: React.ReactNode;
}

export function StripeNotConfiguredFallback({ plan, children }: StripeNotConfiguredFallbackProps) {
  const { data: stripeStatus, isLoading } = useQuery<StripeStatus>({
    queryKey: ['/api/stripe-status'],
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded-lg dark:bg-gray-700" />
        <div className="h-32 bg-gray-200 rounded-lg dark:bg-gray-700" />
      </div>
    );
  }

  // If Stripe is configured, render children (normal subscription UI)
  if (stripeStatus?.configured) {
    return <>{children}</>;
  }

  // If Stripe is not configured, show fallback UI
  return (
    <Card className="relative overflow-hidden border-2 border-amber-300 dark:border-amber-500 shadow-xl">
      {/* Premium badge */}
      <div className="absolute top-4 right-4">
        <Badge className="btn-breslov-gold text-white font-bold">
          <Star className="w-3 h-3 mr-1" />
          פרימיום
        </Badge>
      </div>

      <CardHeader className="text-center pb-2">
        <div className="flex justify-center mb-4">
          <div className="bg-primary p-3 rounded-full">
            <Crown className="h-8 w-8 text-white" />
          </div>
        </div>
        
        <CardTitle className="text-2xl font-bold text-primary mb-2" data-testid="plan-title">
          {plan.nameHebrew}
        </CardTitle>
        <CardDescription className="text-lg text-muted-foreground" data-testid="plan-description">
          {plan.descriptionHebrew}
        </CardDescription>
        
        <div className="text-center mt-4">
          <div className="text-4xl font-bold text-primary" data-testid="plan-price">
            ₪{(plan.price / 100).toFixed(0)}
          </div>
          <div className="text-muted-foreground">לחודש</div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Features list */}
        <div className="space-y-3">
          <h4 className="font-semibold text-foreground">מה כלול במנוי:</h4>
          <ul className="space-y-2">
            {plan.featuresHebrew.map((feature, index) => (
              <li key={index} className="flex items-start gap-2" data-testid={`feature-${index}`}>
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span className="text-sm text-muted-foreground leading-relaxed">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Service unavailable alert */}
        <Alert className="border-amber-300 bg-amber-50 dark:bg-amber-950 dark:border-amber-500" data-testid="service-unavailable-alert">
          <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          <AlertTitle className="text-amber-800 dark:text-amber-200">השירות זמנית לא זמין</AlertTitle>
          <AlertDescription className="text-amber-700 dark:text-amber-300">
            מערכת המנויים נמצאת כרגע בתחזוקה. לרכישת מנוי, אנא צרו קשר ישירות:
          </AlertDescription>
        </Alert>

        {/* Contact information */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3" data-testid="contact-info">
          <h4 className="font-semibold text-foreground">צרו קשר לרכישת מנוי:</h4>
          
          <div className="flex items-center gap-3 text-sm">
            <Mail className="w-4 h-4 text-primary" />
            <a 
              href="mailto:support@haesh-sheli.co.il" 
              className="text-primary hover:underline"
              data-testid="contact-email"
            >
              support@haesh-sheli.co.il
            </a>
          </div>
          
          <div className="flex items-center gap-3 text-sm">
            <Phone className="w-4 h-4 text-primary" />
            <a 
              href="tel:+972-2-123-4567" 
              className="text-primary hover:underline"
              data-testid="contact-phone"
            >
              02-123-4567
            </a>
          </div>
        </div>

        {/* Contact CTA buttons */}
        <div className="flex flex-col gap-3">
          <Button 
            asChild 
            className="w-full btn-breslov-primary text-white py-3 text-lg font-bold shadow-lg"
            data-testid="button-contact-email"
          >
            <a href="mailto:support@haesh-sheli.co.il?subject=בקשה לרכישת מנוי הוראת קבע&body=שלום, אני מעוניין/ת לרכוש מנוי הוראת קבע. אנא צרו איתי קשר.">
              <Mail className="mr-2 h-5 w-5" />
              צור קשר למנוי באימייל
            </a>
          </Button>
          
          <Button 
            asChild 
            variant="outline" 
            className="w-full border-primary text-primary hover:bg-primary hover:text-white py-3 text-lg font-bold"
            data-testid="button-contact-phone"
          >
            <a href="tel:+972-2-123-4567">
              <Phone className="mr-2 h-5 w-5" />
              התקשר עכשיו
            </a>
          </Button>
        </div>

        <div className="text-xs text-muted-foreground text-center mt-4" data-testid="fallback-note">
          * צוות השירות יעזור לכם להקים את המנוי וליהנות מכל היתרונות
        </div>
      </CardContent>
    </Card>
  );
}