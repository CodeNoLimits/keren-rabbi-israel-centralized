import { useState } from 'react';
import { Header } from "@/components/Header";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Users, TrendingUp, Gift, Music, Radio, Sparkles, ArrowRight, Calendar, MapPin, Clock } from 'lucide-react';

const translations = {
  he: {
    title: 'הילולא 2024 - קרן האש שלי',
    subtitle: 'חגיגה רוחנית לאמץ משלחת רבי נחמן מברסלב',
    heroSubtitle: 'כל תרומה משמעותית - עזרו לנו להעניק אור לאלפי משפחות',
    eventDate: '27 בדצמבר 2024',
    eventTime: '13:00 - 22:00',
    eventLocation: 'ירושלים, אולם הרים',
    
    // Sections
    sections: {
      eventInfo: 'מידע על האירוע',
      impact: 'ההשפעה שלנו',
      donate: 'תרום עכשיו',
      sponsors: 'שותפים לחזון',
      faq: 'שאלות נפוצות',
    },

    // Event Details
    eventDescription: 'הילולא היא חגיגה רוחנית עתיקה המציינת את יום התנשואות של צדיק. השנה, אנחנו חוגגים את הילולת רבי נחמן מברסלב - מלבד הגדול ביותר של עמנו. התכנית כוללת תפילות, שירה, ריקודים, סיפורי מעשיות וזיכרו�� עמוק.',
    eventHighlights: [
      'תפילות קבוצתיות ברוח החסידות',
      'השמעת מוסיקה תיירנוז וריקודי ברסלב',
      'סיפורי מעשיות של רבי נחמן',
      'וועידה עם רבנים ודברי תורה',
      'סעודת קהילה חוגגת',
      'הברית הלילית ושמחה עד הבוקר'
    ],

    // Impact Section
    impactTitle: 'בשנה שעברה - ההשפעה שלנו',
    impactStats: [
      {
        number: '5,000+',
        label: 'משפחות נתמכו',
        icon: 'Users'
      },
      {
        number: '₪2.5M',
        label: 'הן העלויות שלנו',
        icon: 'TrendingUp'
      },
      {
        number: '95%',
        label: 'משימות הושלמו',
        icon: 'Heart'
      },
      {
        number: '50K+',
        label: 'תורמים פעילים',
        icon: 'Radio'
      }
    ],

    // Donation Options
    donationTitle: 'בחרו אפשרות תרומה',
    donationOptions: [
      { amount: 100, label: 'תמיכה בסיסית', benefit: 'עזרה למשפחה אחת' },
      { amount: 300, label: 'תמיכה משמעותית', benefit: 'עזרה לשלוש משפחות' },
      { amount: 500, label: 'תמיכה חזקה', benefit: 'אירוח משפחה ��משך שבוע' },
      { amount: 1000, label: 'תמיכה מלאה', benefit: 'עזרה משלימה לשנה' },
    ],
    customAmount: 'סכום אישי',
    donate: 'תרום עכשיו',
    taxBenefits: '💰 הטבות מס: תרומות לארגונים צדקה מוכרים זכאים להנחות מס בישראל',

    // Testimonials
    testimonialsTitle: 'סיפורי השינוי',
    testimonials: [
      {
        quote: 'התרומה שלכם שינתה את חיי המשפחה שלי לחלוטין. כעת הילדים שלי יכולים ללכת לבית הספר בשקט נפשי.',
        author: 'שרה מירושלים',
        role: 'אם של ארבעה ילדים'
      },
      {
        quote: 'בכל פעם שאני חושב על הגמולים הרוחניים שאני מקבל מהתרומה שלי, אני יודע שכל שקל שווה.',
        author: 'דוד מתל אביב',
        role: 'תורם קבוע'
      },
      {
        quote: 'מצביא ההילולה, הרגשתי חלק מקהילה גדולה שמטרתה אחת - להעניק אור.',
        author: 'מירים מחיפה',
        role: 'משתתפת בהילולה'
      },
    ],

    // FAQ
    faqItems: [
      {
        question: 'האם ההילולה פתוחה לציבור?',
        answer: 'כן! ההילולה פתוחה לכל המאמינים, בלי הבדל דת או מוצא. זו חגיגה קהילתית לכל נשמה שרוצה להצטרף.'
      },
      {
        question: 'לאן הולכות התרומות שלי?',
        answer: '95% מהתרומות יוצאות ישירות לעזרה לאדם בקרקע - מזון, בגדים, שכר דירה, חינוך וטיפול רפואי.'
      },
      {
        question: 'האם אוכל לתרום במנוייה?',
        answer: 'כן! תוכלו להצטרף לתוכנית הוראת קבע שלנו וקבלו ברכה שנתית במסגרת הקהילה.'
      },
      {
        question: 'מה קורה בהילולה בלילה?',
        answer: 'הלילה מלא בתפילות, שירה, סיפורי מעשיות, ריקודים וזכרון עמוק של תורה וחסדים של רבי נחמן.'
      },
    ],

    // CTA
    joinCommunity: 'הצטרפו לקהילתנו',
    contactUs: 'דברו איתנו',
    shareEvent: 'שתפו את האירוע',
  },
  en: {
    title: 'Hilloula 2024 - Keren Haesh Sheli',
    subtitle: 'A spiritual celebration honoring Rabbi Nachman\'s legacy',
    heroSubtitle: 'Every donation brings hope - help us bring light to thousands of families',
    eventDate: 'December 27, 2024',
    eventTime: '1:00 PM - 10:00 PM',
    eventLocation: 'Jerusalem, Herim Hall',
    
    sections: {
      eventInfo: 'Event Details',
      impact: 'Our Impact',
      donate: 'Donate Now',
      sponsors: 'Partners',
      faq: 'FAQ',
    },

    eventDescription: 'A Hilloula is an ancient spiritual celebration marking the anniversary of a great tzaddik\'s passing to the next world. This year, we celebrate Rabbi Nachman of Breslov\'s Hilloula. The program includes prayers, singing, dancing, mystical stories, and deep remembrance.',
    eventHighlights: [
      'Group prayers in Chassidic tradition',
      'Traditional Breslov music and dancing',
      'Rabbi Nachman\'s mystical tales',
      'Torah teachings from great rabbis',
      'Festive communal meal',
      'Night celebration until dawn'
    ],

    impactTitle: 'Last Year\'s Impact',
    impactStats: [
      {
        number: '5,000+',
        label: 'Families Supported',
        icon: 'Users'
      },
      {
        number: '$75K+',
        label: 'Distributed',
        icon: 'TrendingUp'
      },
      {
        number: '95%',
        label: 'Mission Success',
        icon: 'Heart'
      },
      {
        number: '50K+',
        label: 'Active Donors',
        icon: 'Radio'
      }
    ],

    donationTitle: 'Choose Your Donation',
    donationOptions: [
      { amount: 100, label: 'Basic Support', benefit: 'Help one family' },
      { amount: 300, label: 'Meaningful Support', benefit: 'Help three families' },
      { amount: 500, label: 'Strong Support', benefit: 'House a family for a week' },
      { amount: 1000, label: 'Full Support', benefit: 'Complete yearly assistance' },
    ],
    customAmount: 'Custom Amount',
    donate: 'Donate Now',
    taxBenefits: '💰 Tax Benefits: Donations to recognized charities in Israel are eligible for tax deductions',

    testimonialsTitle: 'Stories of Change',
    testimonials: [
      {
        quote: 'Your donation transformed my family\'s life. Now my children can go to school with peace of mind.',
        author: 'Sarah from Jerusalem',
        role: 'Mother of four'
      },
      {
        quote: 'Every donation brings me spiritual rewards I can\'t measure. Every dollar is worth it.',
        author: 'David from Tel Aviv',
        role: 'Regular Donor'
      },
      {
        quote: 'During the Hilloula, I felt part of a great community with one mission - to bring light.',
        author: 'Miriam from Haifa',
        role: 'Hilloula Participant'
      },
    ],

    faqItems: [
      {
        question: 'Is the Hilloula open to the public?',
        answer: 'Yes! The Hilloula is open to all believers regardless of background. It\'s a community celebration for every soul who wants to join.'
      },
      {
        question: 'Where does my donation go?',
        answer: '95% of donations go directly to help people in need - food, clothes, rent, education, and medical care.'
      },
      {
        question: 'Can I donate monthly?',
        answer: 'Yes! Join our recurring donation program and receive an annual blessing as part of our community.'
      },
      {
        question: 'What happens at night during the Hilloula?',
        answer: 'The night is filled with prayers, singing, mystical tales, dancing, and deep remembrance of Rabbi Nachman\'s teachings.'
      },
    ],

    joinCommunity: 'Join Our Community',
    contactUs: 'Contact Us',
    shareEvent: 'Share This Event',
  }
};

export default function HilloulaPage() {
  const { currentLanguage, setLanguage } = useLanguage();
  const [donationAmount, setDonationAmount] = useState(300);
  const t = translations[currentLanguage as keyof typeof translations] || translations.he;

  const handleDonate = (amount: number) => {
    setDonationAmount(amount);
    // TODO: Integrate with Stripe/payment system
    console.log(`Donation of ${amount} initiated`);
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white dark:from-gray-900 dark:via-blue-900/20 dark:to-gray-900"
      dir={currentLanguage === 'he' ? 'rtl' : 'ltr'}
      data-testid="hilloula-page"
    >
      <Header currentLanguage={currentLanguage} onLanguageChange={setLanguage} />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden py-12 md:py-20 bg-gradient-to-br from-[#1e40af] via-[#1e3a8a] to-[#1e40af]">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#f97316] rounded-full blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-300 rounded-full blur-3xl opacity-20"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <div className="mb-6 text-6xl md:text-7xl">🕯️</div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight drop-shadow-lg">
              {t.title}
            </h1>
            <p className="text-xl md:text-2xl mb-6 text-blue-100">
              {t.subtitle}
            </p>
            <p className="text-lg mb-8 text-blue-50 max-w-2xl mx-auto leading-relaxed">
              {t.heroSubtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a href="#donate" className="inline-block">
                <Button className="bg-[#f97316] hover:bg-orange-600 text-white px-8 py-3 text-lg font-bold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  {t.donate}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </a>
              <a href="#event" className="inline-block">
                <Button variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-8 py-3 text-lg font-bold rounded-lg">
                  {t.sections.eventInfo}
                </Button>
              </a>
            </div>

            {/* Event Meta Info */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center text-blue-100 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{t.eventDate}</span>
              </div>
              <div className="hidden sm:block text-blue-200">•</div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{t.eventTime}</span>
              </div>
              <div className="hidden sm:block text-blue-200">•</div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{t.eventLocation}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EVENT INFO SECTION */}
      <section id="event" className="py-12 md:py-16 container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1e40af] mb-4">{t.sections.eventInfo}</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
            {t.eventDescription}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-[#1e40af] mb-4">✨ {currentLanguage === 'he' ? 'התוכנית' : 'Program'}</h3>
            {t.eventHighlights.map((highlight, idx) => (
              <div key={idx} className="flex gap-3 items-start p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <Sparkles className="w-5 h-5 text-[#f97316] flex-shrink-0 mt-0.5" />
                <span className="text-gray-800 dark:text-gray-200">{highlight}</span>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 p-8 rounded-xl border border-orange-200 dark:border-orange-800">
            <h3 className="text-xl font-bold text-[#f97316] mb-4">🎉 {currentLanguage === 'he' ? 'חיבור קהילה' : 'Community Connection'}</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              {currentLanguage === 'he' 
                ? 'ההילולה היא רגע של התחברות עמוקה עם קהילה עולמית של מאמינים. אלפים מהעולם התכנסים לחגוג יחד את מורשת רבי נחמן מברסלב.'
                : 'The Hilloula is a moment of deep connection with a global community of believers. Thousands from around the world gather to celebrate Rabbi Nachman\'s legacy.'
              }
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Music className="w-4 h-4" />
              <span>{currentLanguage === 'he' ? 'מוזיקה, ריקודים, ותפילה' : 'Music, dancing, and prayer'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT SECTION */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1e40af] mb-12">
            {t.impactTitle}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {t.impactStats.map((stat, idx) => (
              <Card key={idx} className="border-2 border-[#1e40af] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-[#1e40af] mb-2">{stat.number}</div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-12 md:py-16 container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1e40af] mb-12">
          {t.testimonialsTitle}
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {t.testimonials.map((testimonial, idx) => (
            <Card key={idx} className="border-l-4 border-l-[#f97316] hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="mb-4 text-[#f97316] text-2xl">⭐⭐⭐⭐⭐</div>
                <p className="text-gray-700 dark:text-gray-300 italic mb-4">"{testimonial.quote}"</p>
                <div className="border-t pt-4">
                  <p className="font-bold text-[#1e40af]">{testimonial.author}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* DONATION SECTION */}
      <section id="donate" className="py-12 md:py-16 bg-gradient-to-br from-[#1e40af] to-[#1e3a8a] text-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">{t.donationTitle}</h2>
          <p className="text-center text-blue-100 mb-12 max-w-2xl mx-auto">{t.taxBenefits}</p>

          {/* Donation Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {t.donationOptions.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleDonate(option.amount)}
                className={`p-6 rounded-lg border-2 transition-all duration-300 transform hover:scale-105 ${
                  donationAmount === option.amount
                    ? 'bg-[#f97316] border-white shadow-xl'
                    : 'bg-blue-700/30 border-blue-400 hover:border-[#f97316]'
                }`}
              >
                <div className="text-3xl font-bold mb-2">₪{option.amount}</div>
                <p className="font-semibold mb-2">{option.label}</p>
                <p className="text-sm text-blue-100">{option.benefit}</p>
              </button>
            ))}
          </div>

          {/* Custom Amount */}
          <div className="max-w-md mx-auto mb-8">
            <label className="block text-center mb-3 font-semibold">{t.customAmount}</label>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder={currentLanguage === 'he' ? 'סכום בשקלים' : 'Amount in NIS'}
                value={donationAmount}
                onChange={(e) => setDonationAmount(Math.max(10, parseInt(e.target.value) || 0))}
                className="flex-1 bg-white text-black"
                min="10"
              />
              <Button
                onClick={() => handleDonate(donationAmount)}
                className="bg-[#f97316] hover:bg-orange-600 text-white px-6 font-bold"
              >
                {t.donate}
              </Button>
            </div>
          </div>

          <p className="text-center text-blue-100 text-sm">
            {currentLanguage === 'he' 
              ? '🔒 תשלום מאובטח • כל התרומות בחסות צדקה מוכרת'
              : '🔒 Secure Payment • All donations under recognized charity'
            }
          </p>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-12 md:py-16 container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1e40af] mb-12">
          {t.sections.faq}
        </h2>

        <div className="space-y-4">
          {t.faqItems.map((faq, idx) => (
            <Card key={idx} className="border-l-4 border-l-[#f97316] hover:shadow-lg transition-all">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-[#1e40af]">{faq.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA FOOTER SECTION */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 border-t-2 border-orange-200 dark:border-orange-800">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-[#1e40af] mb-6">{t.joinCommunity}</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
            {currentLanguage === 'he'
              ? 'בואו נהיה חלק ממשהו גדול יותר - קהילה עולמית שמטרתה להעניק אור לעולם.'
              : 'Let\'s be part of something greater - a global community bringing light to the world.'
            }
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/972503515893?text=שלום, אני מעוניין להשתתף בהילולה 2024" target="_blank" rel="noopener noreferrer">
              <Button className="bg-[#1e40af] hover:bg-[#1e3a8a] text-white px-8 py-3 text-lg font-bold rounded-lg">
                💬 {currentLanguage === 'he' ? 'דברו איתנו בווטסאפ' : 'Message us on WhatsApp'}
              </Button>
            </a>
            <a href="mailto:info@haesh-sheli.co.il">
              <Button variant="outline" className="border-[#1e40af] text-[#1e40af] hover:bg-blue-50 px-8 py-3 text-lg font-bold rounded-lg">
                📧 {currentLanguage === 'he' ? 'שלח מייל' : 'Send Email'}
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
