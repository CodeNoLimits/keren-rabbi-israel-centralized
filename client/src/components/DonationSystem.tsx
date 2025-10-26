import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { Heart, Users, BookOpen, Home, Star } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export interface DonationCause {
  id: string;
  name: {
    he: string;
    fr: string;
    en: string;
  };
  description: {
    he: string;
    fr: string;
    en: string;
  };
  icon: React.ReactNode;
  goalAmount: number;
  currentAmount: number;
  color: string;
}

const DONATION_CAUSES: DonationCause[] = [
  {
    id: 'hafatsa',
    name: {
      he: 'הפצת תורת רבינו',
      fr: 'Diffusion des enseignements',
      en: 'Torah Dissemination'
    },
    description: {
      he: 'הדפסה וחלוקה של ספרי רבינו בעולם',
      fr: 'Impression et distribution des livres de Rabbi Nachman',
      en: 'Printing and distributing Rabbi Nachman\'s books'
    },
    icon: <BookOpen className="h-6 w-6" />,
    goalAmount: 50000,
    currentAmount: 32450,
    color: 'blue'
  },
  {
    id: 'soldiers',
    name: {
      he: 'ספרים לחיילים',
      fr: 'Livres pour les soldats',
      en: 'Books for Soldiers'
    },
    description: {
      he: 'חלוקת ספרי ברסלב חינם לחיילי צה"ל',
      fr: 'Distribution gratuite de livres Breslov aux soldats',
      en: 'Free Breslov books for IDF soldiers'
    },
    icon: <Star className="h-6 w-6" />,
    goalAmount: 25000,
    currentAmount: 18750,
    color: 'green'
  },
  {
    id: 'uman',
    name: {
      he: 'עזרה לנוסעים לאומן',
      fr: 'Aide aux pèlerins d\'Ouman',
      en: 'Uman Pilgrimage Support'
    },
    description: {
      he: 'תמיכה במשפחות נזקקות לנסיעה לאומן',
      fr: 'Soutien aux familles nécessiteuses pour le pèlerinage',
      en: 'Supporting families in need for Uman pilgrimage'
    },
    icon: <Home className="h-6 w-6" />,
    goalAmount: 100000,
    currentAmount: 67890,
    color: 'purple'
  },
  {
    id: 'printing',
    name: {
      he: 'מהדורה חדשה של הספרים',
      fr: 'Nouvelle édition des livres',
      en: 'New Book Editions'
    },
    description: {
      he: 'הדפסת מהדורות מהודרות של ספרי הקרן',
      fr: 'Impression d\'éditions spéciales des livres',
      en: 'Printing special editions of Keren books'
    },
    icon: <Heart className="h-6 w-6" />,
    goalAmount: 75000,
    currentAmount: 45320,
    color: 'teal'
  }
];

const PRESET_AMOUNTS = [18, 36, 54, 180, 360];

export function DonationSystem() {
  const { currentLanguage } = useLanguage();
  const [selectedCause, setSelectedCause] = useState<string>('hafatsa');
  const [donationType, setDonationType] = useState<'one-time' | 'monthly'>('one-time');
  const [amount, setAmount] = useState<number>(36);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  const selectedCauseData = DONATION_CAUSES.find(c => c.id === selectedCause);
  const progress = selectedCauseData
    ? (selectedCauseData.currentAmount / selectedCauseData.goalAmount) * 100
    : 0;

  const handleDonation = async () => {
    setIsProcessing(true);

    const donationAmount = customAmount ? parseFloat(customAmount) : amount;

    // Intégration PayPal/Cardcom/Bit ici
    console.log({
      cause: selectedCause,
      type: donationType,
      amount: donationAmount,
      currency: 'ILS'
    });

    // Simuler un traitement
    setTimeout(() => {
      alert(`תודה רבה על תרומתך של ${donationAmount}₪!`);
      setIsProcessing(false);
    }, 2000);
  };

  const getText = (textObj: { he: string; fr: string; en: string }) => {
    return textObj[currentLanguage as keyof typeof textObj] || textObj.he;
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-teal-900 mb-2">
          {currentLanguage === 'he' && 'תרומה לקרן רבי ישראל'}
          {currentLanguage === 'fr' && 'Faire un don à Keren Rabbi Israel'}
          {currentLanguage === 'en' && 'Donate to Keren Rabbi Israel'}
        </h2>
        <p className="text-teal-600">
          {currentLanguage === 'he' && 'כל תרומה מקרבת את הגאולה'}
          {currentLanguage === 'fr' && 'Chaque don rapproche la Rédemption'}
          {currentLanguage === 'en' && 'Every donation brings the Redemption closer'}
        </p>
      </div>

      {/* Causes Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {DONATION_CAUSES.map((cause) => (
          <div
            key={cause.id}
            onClick={() => setSelectedCause(cause.id)}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              selectedCause === cause.id
                ? `border-${cause.color}-500 bg-${cause.color}-50 shadow-lg`
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-start gap-3 mb-3">
              <div className={`p-2 rounded-lg bg-${cause.color}-100 text-${cause.color}-600`}>
                {cause.icon}
              </div>
              <div>
                <h3 className="font-bold text-lg">{getText(cause.name)}</h3>
                <p className="text-sm text-gray-600">{getText(cause.description)}</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-gray-600">
                <span>{cause.currentAmount.toLocaleString()}₪</span>
                <span>{cause.goalAmount.toLocaleString()}₪</span>
              </div>
              <Progress value={(cause.currentAmount / cause.goalAmount) * 100} className="h-2" />
            </div>
          </div>
        ))}
      </div>

      {/* Selected Cause Goal */}
      {selectedCauseData && (
        <div className="mb-6 p-4 bg-teal-50 rounded-lg border border-teal-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-teal-900">
              {getText(selectedCauseData.name)}
            </span>
            <span className="text-sm text-teal-700">
              {progress.toFixed(1)}% הושג
            </span>
          </div>
          <Progress value={progress} className="h-3" />
          <div className="flex justify-between mt-2 text-xs text-teal-600">
            <span>{selectedCauseData.currentAmount.toLocaleString()}₪ נאספו</span>
            <span>מטרה: {selectedCauseData.goalAmount.toLocaleString()}₪</span>
          </div>
        </div>
      )}

      {/* Donation Type */}
      <div className="mb-6">
        <Label className="text-base font-semibold mb-3 block">סוג התרומה</Label>
        <RadioGroup value={donationType} onValueChange={(v) => setDonationType(v as 'one-time' | 'monthly')}>
          <div className="flex gap-4">
            <div className="flex items-center space-x-2 flex-1 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
              <RadioGroupItem value="one-time" id="one-time" />
              <Label htmlFor="one-time" className="cursor-pointer">תרומה חד-פעמית</Label>
            </div>
            <div className="flex items-center space-x-2 flex-1 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
              <RadioGroupItem value="monthly" id="monthly" />
              <Label htmlFor="monthly" className="cursor-pointer">תרומה חודשית</Label>
            </div>
          </div>
        </RadioGroup>
      </div>

      {/* Amount Selection */}
      <div className="mb-6">
        <Label className="text-base font-semibold mb-3 block">סכום התרומה</Label>
        <div className="grid grid-cols-5 gap-3 mb-4">
          {PRESET_AMOUNTS.map((presetAmount) => (
            <Button
              key={presetAmount}
              variant={amount === presetAmount && !customAmount ? "default" : "outline"}
              onClick={() => {
                setAmount(presetAmount);
                setCustomAmount('');
              }}
              className="h-12"
            >
              {presetAmount}₪
            </Button>
          ))}
        </div>

        <div>
          <Label htmlFor="custom-amount" className="text-sm mb-2 block">סכום אחר</Label>
          <Input
            id="custom-amount"
            type="number"
            placeholder="הכנס סכום..."
            value={customAmount}
            onChange={(e) => {
              setCustomAmount(e.target.value);
              setAmount(0);
            }}
            className="text-lg"
          />
        </div>
      </div>

      {/* Donation Button */}
      <Button
        onClick={handleDonation}
        disabled={isProcessing || (!amount && !customAmount)}
        className="w-full h-14 text-lg bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700"
      >
        {isProcessing ? (
          <span>מעבד...</span>
        ) : (
          <span>
            תרום {customAmount || amount}₪ {donationType === 'monthly' && 'בחודש'}
          </span>
        )}
      </Button>

      {/* Payment Methods */}
      <div className="mt-6 text-center text-sm text-gray-600">
        <p>תשלום מאובטח באמצעות:</p>
        <div className="flex justify-center gap-4 mt-2">
          <span className="font-semibold">PayPal</span>
          <span>•</span>
          <span className="font-semibold">Cardcom</span>
          <span>•</span>
          <span className="font-semibold">Bit</span>
        </div>
      </div>
    </div>
  );
}
