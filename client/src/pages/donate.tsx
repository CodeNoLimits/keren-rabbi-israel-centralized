import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Heart, CreditCard, Smartphone, Gift } from 'lucide-react';
import { PayPalButton } from '../components/PayPalButton';

interface DonationAmount {
  value: number;
  label: string;
  popular?: boolean;
}

export default function DonatePage() {
  const { currentLanguage } = useLanguage();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorMessage, setDonorMessage] = useState('');

  const donationAmounts: DonationAmount[] = [
    { value: 50, label: '50₪' },
    { value: 100, label: '100₪' },
    { value: 200, label: '200₪', popular: true },
    { value: 500, label: '500₪' },
    { value: 1000, label: '1000₪' },
    { value: 2000, label: '2000₪' }
  ];

  const getText = (key: string) => {
    const texts = {
      title: {
        he: 'תרומה לקרן הרב ישראל',
        en: 'Donation to Rabbi Yisrael Foundation',
        fr: 'Don à la Fondation Rabbi Yisrael'
      },
      subtitle: {
        he: 'תמכו במשימה שלנו להפיץ את תורתו של רבי נחמן מברסלב',
        en: 'Support our mission to spread Rabbi Nachman\'s teachings',
        fr: 'Soutenez notre mission de diffuser les enseignements de Rabbi Nachman'
      },
      amountLabel: {
        he: 'סכום התרומה',
        en: 'Donation Amount',
        fr: 'Montant du don'
      },
      customAmount: {
        he: 'סכום אחר',
        en: 'Custom Amount',
        fr: 'Montant personnalisé'
      },
      recurring: {
        he: 'תרומה חודשית',
        en: 'Monthly Donation',
        fr: 'Don mensuel'
      },
      donorInfo: {
        he: 'פרטי התורם',
        en: 'Donor Information',
        fr: 'Informations du donateur'
      },
      name: {
        he: 'שם מלא',
        en: 'Full Name',
        fr: 'Nom complet'
      },
      email: {
        he: 'אימייל',
        en: 'Email',
        fr: 'Email'
      },
      message: {
        he: 'הודעה (אופציונלי)',
        en: 'Message (Optional)',
        fr: 'Message (Optionnel)'
      },
      donateButton: {
        he: 'תרום עכשיו',
        en: 'Donate Now',
        fr: 'Faire un don maintenant'
      },
      paymentMethods: {
        he: 'אמצעי תשלום',
        en: 'Payment Methods',
        fr: 'Moyens de paiement'
      }
    };
    return texts[key as keyof typeof texts][currentLanguage as keyof typeof texts[keyof typeof texts]] || texts[key as keyof typeof texts].he;
  };

  const handleDonate = () => {
    const amount = selectedAmount || parseFloat(customAmount);
    if (!amount || amount <= 0) {
      alert(currentLanguage === 'he' ? 'אנא בחר סכום תרומה' : 'Please select a donation amount');
      return;
    }

    // Le PayPalButton gère maintenant le paiement
    console.log('Donation prepared:', {
      amount,
      isRecurring,
      donorName,
      donorEmail,
      donorMessage
    });
  };

  const handlePayPalSuccess = (transactionId: string) => {
    alert(`${getText('donateButton')} הצליח! תודה רבה! Transaction ID: ${transactionId}`);
    // Ici on pourrait envoyer un email de confirmation, sauvegarder en base, etc.
  };

  const handlePayPalError = (error: string) => {
    alert(`שגיאה בתשלום: ${error}`);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-orange-50 to-red-50 ${currentLanguage === 'he' ? 'rtl' : 'ltr'}`}>
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
            <Heart className="h-8 w-8 text-orange-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {getText('title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {getText('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Donation Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              {getText('amountLabel')}
            </h2>

            {/* Amount Selection */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {donationAmounts.map((amount) => (
                <Button
                  key={amount.value}
                  variant={selectedAmount === amount.value ? "default" : "outline"}
                  onClick={() => {
                    setSelectedAmount(amount.value);
                    setCustomAmount('');
                  }}
                  className={`h-12 ${amount.popular ? 'ring-2 ring-orange-500' : ''}`}
                >
                  <span className="font-semibold">{amount.label}</span>
                  {amount.popular && (
                    <span className="ml-2 text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
                      {currentLanguage === 'he' ? 'פופולרי' : 'Popular'}
                    </span>
                  )}
                </Button>
              ))}
            </div>

            {/* Custom Amount */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {getText('customAmount')}
              </label>
              <Input
                type="number"
                placeholder="₪"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setSelectedAmount(null);
                }}
                className="text-lg"
              />
            </div>

            {/* Recurring Donation */}
            <div className="mb-6">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={isRecurring}
                  onChange={(e) => setIsRecurring(e.target.checked)}
                  className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  {getText('recurring')}
                </span>
              </label>
            </div>

            {/* Donor Information */}
            <div className="space-y-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {getText('donorInfo')}
              </h3>
              
              <Input
                placeholder={getText('name')}
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
              />
              
              <Input
                type="email"
                placeholder={getText('email')}
                value={donorEmail}
                onChange={(e) => setDonorEmail(e.target.value)}
              />
              
              <textarea
                placeholder={getText('message')}
                value={donorMessage}
                onChange={(e) => setDonorMessage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                rows={3}
              />
            </div>

            {/* Donate Button */}
            <PayPalButton
              amount={selectedAmount || parseFloat(customAmount) || 0}
              description={`${getText('title')} - ${donorName || 'Anonymous'}`}
              donorName={donorName}
              donorEmail={donorEmail}
              isRecurring={isRecurring}
              onSuccess={handlePayPalSuccess}
              onError={handlePayPalError}
            />
          </div>

          {/* Payment Methods & Info */}
          <div className="space-y-6">
            {/* Payment Methods */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {getText('paymentMethods')}
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <CreditCard className="h-6 w-6 text-blue-600 mr-3" />
                  <div>
                    <div className="font-medium text-gray-900">
                      {currentLanguage === 'he' ? 'כרטיס אשראי' : 'Credit Card'}
                    </div>
                    <div className="text-sm text-gray-600">
                      Visa, Mastercard, American Express
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <Smartphone className="h-6 w-6 text-green-600 mr-3" />
                  <div>
                    <div className="font-medium text-gray-900">
                      {currentLanguage === 'he' ? 'פייבוקס' : 'PayBox'}
                    </div>
                    <div className="text-sm text-gray-600">
                      {currentLanguage === 'he' ? 'תשלום בטלפון' : 'Phone Payment'}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <Gift className="h-6 w-6 text-purple-600 mr-3" />
                  <div>
                    <div className="font-medium text-gray-900">
                      {currentLanguage === 'he' ? 'העברה בנקאית' : 'Bank Transfer'}
                    </div>
                    <div className="text-sm text-gray-600">
                      {currentLanguage === 'he' ? 'העברה ישירה' : 'Direct Transfer'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Impact Info */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg shadow-lg p-6 text-white">
              <h3 className="text-xl font-semibold mb-4">
                {currentLanguage === 'he' ? 'השפעת התרומה שלכם' : 'Impact of Your Donation'}
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  <span className="text-sm">
                    {currentLanguage === 'he' 
                      ? 'תמיכה בהדפסת ספרים חדשים' 
                      : 'Support printing new books'
                    }
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  <span className="text-sm">
                    {currentLanguage === 'he' 
                      ? 'הפצת תורת ברסלב בעולם' 
                      : 'Spreading Breslov teachings worldwide'
                    }
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  <span className="text-sm">
                    {currentLanguage === 'he' 
                      ? 'תמיכה בפעילות חינוכית' 
                      : 'Supporting educational activities'
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
