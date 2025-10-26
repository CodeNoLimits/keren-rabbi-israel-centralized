/**
 * NewsletterSignup Component - Site Keren Rabbi Israel
 *
 * Formulaire d'inscription à la newsletter
 * Variants:
 * - 'inline': Version inline (footer, sidebar)
 * - 'modal': Version popup/modal (plus grande)
 *
 * Features:
 * - Validation react-hook-form + zod
 * - Appel API POST /api/newsletter
 * - Toast notifications (succès/erreur)
 * - Loading state
 * - GDPR checkbox
 * - Support RTL pour l'hébreu
 */

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { useToast } from './ui/use-toast';
import { Mail, CheckCircle2, Loader2 } from 'lucide-react';

// Validation schema
const newsletterSchema = z.object({
  email: z.string().email('כתובת אימייל לא תקינה'),
  language: z.enum(['he', 'fr', 'en']).default('he'),
  gdprConsent: z.boolean().refine(val => val === true, {
    message: 'יש לאשר את תנאי השימוש'
  }),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

export interface NewsletterSignupProps {
  /** Variante visuelle */
  variant?: 'inline' | 'modal';
  /** Callback appelé après inscription réussie */
  onSuccess?: () => void;
}

export default function NewsletterSignup({
  variant = 'inline',
  onSuccess
}: NewsletterSignupProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      language: 'he',
      gdprConsent: false,
    },
  });

  const gdprConsent = watch('gdprConsent');

  const onSubmit = async (data: NewsletterFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          language: data.language,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Erreur lors de l\'inscription');
      }

      // Success!
      setIsSuccess(true);
      reset();

      toast({
        title: '✅ נרשמת בהצלחה!',
        description: result.message || 'תודה על הרשמתך לניוזלטר',
        duration: 5000,
      });

      if (onSuccess) {
        onSuccess();
      }

      // Reset success state after 3 seconds
      setTimeout(() => setIsSuccess(false), 3000);

    } catch (error: any) {
      console.error('Newsletter signup error:', error);

      toast({
        title: '❌ שגיאה',
        description: error.message || 'אירעה שגיאה בהרשמה',
        variant: 'destructive',
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Inline variant (compact)
  if (variant === 'inline') {
    return (
      <div className="w-full max-w-md mx-auto">
        {isSuccess ? (
          // Success state
          <div className="flex items-center justify-center gap-2 text-green-600 py-4">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-semibold">נרשמת בהצלחה!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            {/* Email input */}
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="הכנס אימייל"
                  {...register('email')}
                  disabled={isSubmitting}
                  className={errors.email ? 'border-red-500' : ''}
                  dir="ltr"
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                disabled={isSubmitting || !gdprConsent}
                className="min-w-[100px]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 me-2 animate-spin" />
                    שולח...
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 me-2" />
                    הרשם
                  </>
                )}
              </Button>
            </div>

            {/* Language selector */}
            <div className="flex gap-2 text-sm">
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  value="he"
                  {...register('language')}
                  defaultChecked
                />
                <span>עברית</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer">
                <input type="radio" value="fr" {...register('language')} />
                <span>Français</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer">
                <input type="radio" value="en" {...register('language')} />
                <span>English</span>
              </label>
            </div>

            {/* GDPR Consent */}
            <div className="flex items-start gap-2">
              <Checkbox
                id="gdpr-inline"
                checked={gdprConsent}
                onCheckedChange={(checked) => setValue('gdprConsent', !!checked)}
              />
              <Label
                htmlFor="gdpr-inline"
                className="text-xs text-muted-foreground cursor-pointer leading-tight"
              >
                אני מסכים לקבל עדכונים ופרסומות מקרן רבי ישראל
              </Label>
            </div>
            {errors.gdprConsent && (
              <p className="text-xs text-red-500">{errors.gdprConsent.message}</p>
            )}
          </form>
        )}
      </div>
    );
  }

  // Modal variant (larger, more details)
  return (
    <div className="w-full max-w-lg mx-auto p-6 bg-card rounded-lg border shadow-lg">
      {isSuccess ? (
        // Success state
        <div className="text-center py-8">
          <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">נרשמת בהצלחה!</h3>
          <p className="text-muted-foreground">
            תודה על הרשמתך לניוזלטר של קרן רבי ישראל
          </p>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="text-center mb-6">
            <Mail className="w-12 h-12 mx-auto mb-3 text-primary" />
            <h2 className="text-2xl font-bold mb-2">הירשם לניוזלטר</h2>
            <p className="text-muted-foreground">
              קבל עדכונים על ספרים חדשים, הנחות מיוחדות ותכנים בלעדיים
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div>
              <Label htmlFor="email-modal">כתובת אימייל</Label>
              <Input
                id="email-modal"
                type="email"
                placeholder="example@email.com"
                {...register('email')}
                disabled={isSubmitting}
                className={errors.email ? 'border-red-500' : ''}
                dir="ltr"
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Language */}
            <div>
              <Label>שפה מועדפת</Label>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="he"
                    {...register('language')}
                    defaultChecked
                  />
                  <span>עברית</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" value="fr" {...register('language')} />
                  <span>Français</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" value="en" {...register('language')} />
                  <span>English</span>
                </label>
              </div>
            </div>

            {/* GDPR */}
            <div className="flex items-start gap-2 p-3 bg-muted rounded">
              <Checkbox
                id="gdpr-modal"
                checked={gdprConsent}
                onCheckedChange={(checked) => setValue('gdprConsent', !!checked)}
              />
              <Label
                htmlFor="gdpr-modal"
                className="text-sm cursor-pointer leading-relaxed"
              >
                אני מסכים לקבל עדכונים ופרסומות מקרן רבי ישראל.
                ניתן לבטל את ההרשמה בכל עת.
              </Label>
            </div>
            {errors.gdprConsent && (
              <p className="text-sm text-red-500">{errors.gdprConsent.message}</p>
            )}

            {/* Submit */}
            <Button
              type="submit"
              disabled={isSubmitting || !gdprConsent}
              className="w-full"
              size="lg"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 me-2 animate-spin" />
                  שולח...
                </>
              ) : (
                <>
                  <Mail className="w-5 h-5 me-2" />
                  הרשם לניוזלטר
                </>
              )}
            </Button>
          </form>
        </>
      )}
    </div>
  );
}
