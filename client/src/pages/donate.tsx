import { useState } from 'react';
import { Header } from '../components/Header';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function Donate() {
  const { currentLanguage, setLanguage } = useLanguage();
  const [donationAmount, setDonationAmount] = useState<number | ''>('');
  const [customAmount, setCustomAmount] = useState('');
  const [selectedAmount, setSelectedAmount] = useState<string>('');
  const [participateInLottery, setParticipateInLottery] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<'paypal' | 'stripe'>('paypal');
  const [donorInfo, setDonorInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
  });

  const predefinedAmounts = [18, 36, 54, 100, 180, 360, 500, 1000];

  const translations = {
    he: {
      title: 'תרומה לקרן רבי ישראל דב אודסר',
      subtitle: 'עזרו לנו להפיץ את ספרי הצדיק בכל העולם',
      lotteryTitle: '🎁 הפתעה! כל תורם משתתף בהגרלה!',
      lotteryDesc: 'כל תורם מעל 18 ש"ח משתתף אוטומטית בהגרלה חודשית על פרסים מרהיבים!',
      currentPrize: 'הפרס החודש: 5,000 ₪',
      selectAmount: 'בחרו סכום תרומה',
      orCustom: 'או הזינו סכום אחר',
      donorDetails: 'פרטי התורם',
      fullName: 'שם מלא',
      email: 'אימייל',
      phone: 'טלפון',
      paymentMethod: 'אמצעי תשלום',
      participateLottery: 'אני רוצה להשתתף בהגרלה',
      donateNow: 'תרמו עכשיו',
      whyDonate: 'למה לתרום?',
      reason1: '📚 הפצת ספרי הצדיק לכל העולם',
      reason2: '🎓 תמיכה בלימוד והוראה',
      reason3: '💝 עזרה לנזקקים ומשפחות',
      reason4: '🌍 פעילות צדקה בכל העולם',
      taxDeductible: 'התרומה מוכרת לצורכי מס סעיף 46',
      securePayment: 'תשלום מאובטח 100%',
      minimum: 'תרומה מינימלית: 18 ₪',
    },
    en: {
      title: 'Donate to Rabbi Israel Dov Odesser Foundation',
      subtitle: 'Help us spread the Tzaddik\'s books worldwide',
      lotteryTitle: '🎁 Surprise! Every donor participates in the raffle!',
      lotteryDesc: 'Every donor of 18 ₪ or more automatically participates in our monthly raffle for amazing prizes!',
      currentPrize: 'This month\'s prize: 5,000 ₪',
      selectAmount: 'Select donation amount',
      orCustom: 'Or enter custom amount',
      donorDetails: 'Donor Details',
      fullName: 'Full Name',
      email: 'Email',
      phone: 'Phone',
      paymentMethod: 'Payment Method',
      participateLottery: 'I want to participate in the raffle',
      donateNow: 'Donate Now',
      whyDonate: 'Why Donate?',
      reason1: '📚 Spreading the Tzaddik\'s books worldwide',
      reason2: '🎓 Support for study and teaching',
      reason3: '💝 Helping the needy and families',
      reason4: '🌍 Charity activities worldwide',
      taxDeductible: 'Tax deductible donation (Section 46)',
      securePayment: '100% Secure Payment',
      minimum: 'Minimum donation: 18 ₪',
    },
    fr: {
      title: 'Faire un don à la Fondation Rabbi Israel Dov Odesser',
      subtitle: 'Aidez-nous à diffuser les livres du Tsaddik dans le monde entier',
      lotteryTitle: '🎁 Surprise! Chaque donateur participe au tirage au sort!',
      lotteryDesc: 'Chaque donateur de 18 ₪ ou plus participe automatiquement à notre tirage mensuel pour des prix incroyables!',
      currentPrize: 'Prix de ce mois: 5 000 ₪',
      selectAmount: 'Sélectionner le montant du don',
      orCustom: 'Ou entrez un montant personnalisé',
      donorDetails: 'Détails du donateur',
      fullName: 'Nom complet',
      email: 'Email',
      phone: 'Téléphone',
      paymentMethod: 'Mode de paiement',
      participateLottery: 'Je veux participer au tirage au sort',
      donateNow: 'Faire un don maintenant',
      whyDonate: 'Pourquoi faire un don?',
      reason1: '📚 Diffusion des livres du Tsaddik dans le monde entier',
      reason2: '🎓 Soutien à l\'étude et à l\'enseignement',
      reason3: '💝 Aide aux nécessiteux et aux familles',
      reason4: '🌍 Activités caritatives dans le monde entier',
      taxDeductible: 'Don déductible d\'impôt (Article 46)',
      securePayment: 'Paiement 100% sécurisé',
      minimum: 'Don minimum: 18 ₪',
    },
    es: {
      title: 'Donar a la Fundación Rabbi Israel Dov Odesser',
      subtitle: 'Ayúdenos a difundir los libros del Tzaddik en todo el mundo',
      lotteryTitle: '🎁 ¡Sorpresa! ¡Cada donante participa en el sorteo!',
      lotteryDesc: '¡Cada donante de 18 ₪ o más participa automáticamente en nuestro sorteo mensual por premios increíbles!',
      currentPrize: 'Premio de este mes: 5,000 ₪',
      selectAmount: 'Seleccionar monto de donación',
      orCustom: 'O ingrese un monto personalizado',
      donorDetails: 'Detalles del donante',
      fullName: 'Nombre completo',
      email: 'Email',
      phone: 'Teléfono',
      paymentMethod: 'Método de pago',
      participateLottery: 'Quiero participar en el sorteo',
      donateNow: 'Donar ahora',
      whyDonate: '¿Por qué donar?',
      reason1: '📚 Difusión de los libros del Tzaddik en todo el mundo',
      reason2: '🎓 Apoyo al estudio y la enseñanza',
      reason3: '💝 Ayuda a los necesitados y las familias',
      reason4: '🌍 Actividades de caridad en todo el mundo',
      taxDeductible: 'Donación deducible de impuestos (Sección 46)',
      securePayment: 'Pago 100% seguro',
      minimum: 'Donación mínima: 18 ₪',
    },
    ru: {
      title: 'Пожертвовать Фонду Рабби Израэля Дова Одессера',
      subtitle: 'Помогите нам распространять книги Цадика по всему миру',
      lotteryTitle: '🎁 Сюрприз! Каждый жертвователь участвует в розыгрыше!',
      lotteryDesc: 'Каждый жертвователь от 18 ₪ и более автоматически участвует в нашем ежемесячном розыгрыше удивительных призов!',
      currentPrize: 'Приз этого месяца: 5 000 ₪',
      selectAmount: 'Выберите сумму пожертвования',
      orCustom: 'Или введите свою сумму',
      donorDetails: 'Данные жертвователя',
      fullName: 'Полное имя',
      email: 'Email',
      phone: 'Телефон',
      paymentMethod: 'Способ оплаты',
      participateLottery: 'Я хочу участвовать в розыгрыше',
      donateNow: 'Пожертвовать сейчас',
      whyDonate: 'Зачем жертвовать?',
      reason1: '📚 Распространение книг Цадика по всему миру',
      reason2: '🎓 Поддержка обучения и преподавания',
      reason3: '💝 Помощь нуждающимся и семьям',
      reason4: '🌍 Благотворительная деятельность по всему миру',
      taxDeductible: 'Пожертвование не облагается налогом (Раздел 46)',
      securePayment: '100% безопасный платеж',
      minimum: 'Минимальное пожертвование: 18 ₪',
    },
  };

  const t = translations[currentLanguage as keyof typeof translations] || translations.he;
  const isRTL = currentLanguage === 'he';

  const handleDonate = async () => {
    const amount = selectedAmount === 'custom'
      ? parseFloat(customAmount)
      : parseInt(selectedAmount);

    if (!amount || amount < 18) {
      alert(t.minimum);
      return;
    }

    if (!donorInfo.fullName || !donorInfo.email) {
      alert(isRTL ? 'אנא מלאו את כל הפרטים הנדרשים' : 'Please fill in all required fields');
      return;
    }

    try {
      const response = await fetch('/api/donations/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount * 100, // Convert to agorot
          currency: 'ILS',
          donorInfo,
          participateInLottery,
          paymentMethod,
        }),
      });

      const data = await response.json();

      if (paymentMethod === 'paypal' && data.approvalUrl) {
        window.location.href = data.approvalUrl;
      } else if (paymentMethod === 'stripe' && data.clientSecret) {
        // Handle Stripe payment
        // This will be implemented with Stripe Elements
      }
    } catch (error) {
      console.error('Donation error:', error);
      alert(isRTL ? 'שגיאה ביצירת תרומה' : 'Error creating donation');
    }
  };

  return (
    <div className="min-h-screen" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
      <Header currentLanguage={currentLanguage} onLanguageChange={setLanguage} />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zm20.97 0l9.315 9.314-1.414 1.414L34.828 0h2.83zM22.344 0L13.03 9.314l1.414 1.414L25.172 0h-2.83zM32 0l12.142 12.142-1.414 1.414L30 .828 17.272 13.556l-1.414-1.414L28 0h4zM.284 0l28 28-1.414 1.414L0 2.544V0h.284zM0 5.373l25.456 25.455-1.414 1.415L0 8.2V5.374zm0 5.656l22.627 22.627-1.414 1.414L0 13.86v-2.83zm0 5.656l19.8 19.8-1.415 1.413L0 19.514v-2.83zm0 5.657l16.97 16.97-1.414 1.415L0 25.172v-2.83zM0 28l14.142 14.142-1.414 1.414L0 30.828V28zm0 5.657L11.314 44.97 9.9 46.386l-9.9-9.9v-2.828zm0 5.657L8.485 47.8 7.07 49.212 0 42.143v-2.83zm0 5.657l5.657 5.657-1.414 1.415L0 47.8v-2.83zm0 5.657l2.828 2.83-1.414 1.413L0 53.456v-2.83zM54.627 60L30 35.373 5.373 60H8.2L30 38.2 51.8 60h2.827zm-5.656 0L30 41.03 11.03 60h2.828L30 43.858 46.142 60h2.83zm-5.656 0L30 46.686 16.686 60h2.83L30 49.514 40.485 60h2.83zm-5.657 0L30 52.343 22.344 60h2.83L30 55.172 34.828 60h2.83zM32 60l-2-2-2 2h4zM59.716 0l-28 28 1.414 1.414L60 2.544V0h-.284zM60 5.373L34.544 30.828l1.414 1.415L60 8.2V5.374zm0 5.656L37.373 33.656l1.414 1.414L60 13.86v-2.83zm0 5.656l-19.8 19.8 1.415 1.413L60 19.514v-2.83zm0 5.657l-16.97 16.97 1.414 1.415L60 25.172v-2.83zM60 28L45.858 42.142l1.414 1.414L60 30.828V28zm0 5.657L48.686 44.97l1.415 1.415 9.9-9.9v-2.828zm0 5.657L51.515 47.8l1.414 1.413L60 42.143v-2.83zm0 5.657l-5.657 5.657 1.414 1.415L60 47.8v-2.83zm0 5.657l-2.828 2.83 1.414 1.413L60 53.456v-2.83z" fill="%23ffffff" fill-opacity="1" fill-rule="evenodd"/%3E%3C/svg%3E")',
          }} />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
              {t.title}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              {t.subtitle}
            </p>

            {/* Lottery Banner */}
            <Card className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 border-0 shadow-2xl animate-pulse">
              <CardHeader>
                <CardTitle className="text-white text-3xl font-bold">
                  {t.lotteryTitle}
                </CardTitle>
                <CardDescription className="text-white text-lg font-medium">
                  {t.lotteryDesc}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-white text-2xl font-bold bg-black/20 rounded-lg py-4">
                  {t.currentPrize}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Donation Form Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-2xl border-2 border-blue-100">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-blue-900">
                  {t.selectAmount}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Predefined Amounts */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {predefinedAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => {
                        setSelectedAmount(amount.toString());
                        setCustomAmount('');
                      }}
                      className={`p-6 rounded-xl text-xl font-bold transition-all transform hover:scale-105 ${
                        selectedAmount === amount.toString()
                          ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg scale-105'
                          : 'bg-white border-2 border-blue-200 text-blue-900 hover:border-blue-400'
                      }`}
                    >
                      ₪{amount}
                    </button>
                  ))}
                </div>

                {/* Custom Amount */}
                <div className="space-y-2">
                  <Label htmlFor="custom-amount" className="text-lg font-semibold text-gray-700">
                    {t.orCustom}
                  </Label>
                  <div className="flex gap-2 items-center">
                    <RadioGroupItem
                      value="custom"
                      id="custom"
                      checked={selectedAmount === 'custom'}
                      onClick={() => setSelectedAmount('custom')}
                    />
                    <Input
                      id="custom-amount"
                      type="number"
                      min="18"
                      placeholder="18"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setSelectedAmount('custom');
                      }}
                      className="text-lg p-6"
                    />
                    <span className="text-xl font-semibold">₪</span>
                  </div>
                </div>

                {/* Donor Information */}
                <div className="space-y-4 border-t pt-8">
                  <h3 className="text-2xl font-bold text-gray-800">{t.donorDetails}</h3>

                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-lg">{t.fullName} *</Label>
                    <Input
                      id="fullName"
                      type="text"
                      required
                      value={donorInfo.fullName}
                      onChange={(e) => setDonorInfo({ ...donorInfo, fullName: e.target.value })}
                      className="p-6 text-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-lg">{t.email} *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={donorInfo.email}
                      onChange={(e) => setDonorInfo({ ...donorInfo, email: e.target.value })}
                      className="p-6 text-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-lg">{t.phone}</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={donorInfo.phone}
                      onChange={(e) => setDonorInfo({ ...donorInfo, phone: e.target.value })}
                      className="p-6 text-lg"
                    />
                  </div>
                </div>

                {/* Payment Method */}
                <div className="space-y-4 border-t pt-8">
                  <h3 className="text-2xl font-bold text-gray-800">{t.paymentMethod}</h3>
                  <RadioGroup value={paymentMethod} onValueChange={(val) => setPaymentMethod(val as 'paypal' | 'stripe')}>
                    <div className="flex items-center space-x-3 space-x-reverse p-4 border-2 rounded-lg hover:border-blue-400 cursor-pointer">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal" className="text-lg font-semibold cursor-pointer flex items-center gap-2">
                        <span>💳 PayPal</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 space-x-reverse p-4 border-2 rounded-lg hover:border-blue-400 cursor-pointer">
                      <RadioGroupItem value="stripe" id="stripe" />
                      <Label htmlFor="stripe" className="text-lg font-semibold cursor-pointer flex items-center gap-2">
                        <span>💳 {isRTL ? 'כרטיס אשראי' : 'Credit Card'}</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Lottery Participation */}
                <div className="flex items-center space-x-3 space-x-reverse p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border-2 border-orange-200">
                  <Checkbox
                    id="lottery"
                    checked={participateInLottery}
                    onCheckedChange={(checked) => setParticipateInLottery(checked as boolean)}
                  />
                  <Label htmlFor="lottery" className="text-lg font-semibold cursor-pointer">
                    {t.participateLottery}
                  </Label>
                </div>

                {/* Submit Button */}
                <Button
                  onClick={handleDonate}
                  className="w-full py-8 text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-xl transform hover:scale-105 transition-all"
                >
                  {t.donateNow} 🎁
                </Button>

                {/* Security Notes */}
                <div className="text-center space-y-2 text-gray-600">
                  <p className="flex items-center justify-center gap-2 text-sm">
                    🔒 {t.securePayment}
                  </p>
                  <p className="text-sm">
                    {t.taxDeductible}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Donate Section */}
      <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-blue-900">
              {t.whyDonate}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[t.reason1, t.reason2, t.reason3, t.reason4].map((reason, index) => (
                <Card key={index} className="hover:shadow-xl transition-shadow border-2 border-blue-100">
                  <CardContent className="p-8">
                    <p className="text-xl font-semibold text-gray-700">
                      {reason}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
