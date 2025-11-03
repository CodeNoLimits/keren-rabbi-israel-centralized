import { useState } from 'react';
import { Header } from "@/components/Header";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Users, Star, ArrowRight, Filter } from 'lucide-react';

const translations = {
  he: {
    title: 'סיפורים משפחתיים - זה מה שאנחנו עושים',
    subtitle: 'שמעו מקולות אמיתיים של אנשים שחייהם השתנו בזכות תמיכתכם',
    description: 'כל תרומה היא שינוי - עבור משפחה שצריכה חזק, עבור ילדים שחוזרים לבית הספר, עבור שמחה שחוזרת לבית.',
    
    // Filters
    filters: {
      all: 'כל הסיפורים',
      donors: 'תורמים',
      beneficiaries: 'משפחות מעוזרות',
      community: 'קהילה',
    },

    // Call to action
    shareStory: 'שתפו את הסיפור שלכם',
    shareStoryDesc: 'האם התרומה שלכם שינתה משהו? או שאתם משפחה שהתמיכה עזרה לכם?',
    contactUs: 'צור קשר',
    viewMore: 'קרא את הסיפור המלא',

    testimonials: [
      {
        id: 1,
        name: 'שרה כהן',
        role: 'אם של 4 ילדים',
        type: 'beneficiary',
        quote: 'כאשר בעלי איבד את עבודתו, חשבתי שלא נשרד. אבל התמיכה שלכם הצילה את המשפחה שלי. ילדיי היום שמחים ובטוחים.',
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/07/1.d110a0.webp',
        story: 'שרה הייתה אם עובדת בו עבור שתי משפחות. כאשר הגיע הקורונה, הכל קרס. אבל עם התמיכה שלכם, היא הצליחה להמשיך ולתמוך בילדיה.',
        impact: 'משפחה שלמה',
        featured: true
      },
      {
        id: 2,
        name: 'דוד לביא',
        role: 'תורם קבוע למשך 3 שנים',
        type: 'donor',
        quote: 'כל חודש שאני תורם, אני חש שאני חלק ממשהו גדול. זה לא פשוט כסף - זה ברכה.',
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/07/2.d110a0.webp',
        story: 'דוד התחיל בתרומה קטנה ואחרי שראה את ההשפעה, הוא בחר להיות תורם קבוע. "כל תרומה שלי עוזרת לאדם אמיתי ברחוב."',
        impact: 'תמיכה משמעותית',
        featured: true
      },
      {
        id: 3,
        name: 'מירים וחברים שלה',
        role: 'קבוצת תורמים מהישיבה',
        type: 'community',
        quote: 'כשהתחברנו לתוכנית הקבוצתית, הבנו שיש כוח בקהילה. ביחד אנחנו יכולים לשנות עולם.',
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/07/3.d110a0.webp',
        story: 'קבוצת נשים מהישיבה התארגנו לתרום ביחד. כל אחת בתרומה קטנה, אבל ביחד זה הופך להצלה של משפחה שלמה.',
        impact: 'קהילה חזקה',
        featured: false
      },
      {
        id: 4,
        name: 'יעקב סלע',
        role: 'בן משפחה שקיבלה עזרה',
        type: 'beneficiary',
        quote: 'אני רוצה שכולם ידעו - אתם לא סתם תורמים. אתם שומרי מלאכים. אתם הצלתם את הנשמה שלי.',
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/07/5.d110a0.webp',
        story: 'יעקב היה רחוק מהדרך, אבל התמיכה והחום של הקהילה החזירו אותו. "אתם תרמתם לא רק כסף - תרמתם תקווה."',
        impact: 'חזרה לבית',
        featured: false
      },
      {
        id: 5,
        name: 'ינה בן-שלום',
        role: 'תורמת מארגון נשים',
        type: 'donor',
        quote: 'בכל פעם שאני תורמת, אני יודעת שילדה איזשהי תוכל ללכת לבית ספר. זה כל מה שצריך כדי להיות מוטיבציה.',
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/07/6.d110a0.webp',
        story: 'ינה ארגנה קבוצת נשים מ-50 משפחות שתורמות ביחד. "אם כל אדם תורם קצת, אנחנו יכולים לשנות עולם."',
        impact: 'תנועה גדולה',
        featured: true
      },
      {
        id: 6,
        name: 'רבינו ז״ל - דברים אודות צדקה',
        role: 'מתורת רבי נחמן',
        type: 'community',
        quote: 'מצוה גדולה להיות בשמחה תמיד - וצדקה היא השמחה העמוקה ביותר.',
        image: '/attached_assets/ליקוטי מוהרן 1_1757275910545.jpg',
        story: 'רבי נחמן לימד על החשיבות של צדקה לא רק כחובה אלא כשמחה. כל תרומה היא ביטוי של אהבה.',
        impact: 'חכמה נצחית',
        featured: false
      },
      {
        id: 7,
        name: 'משפחת נויברג',
        role: 'משפחה שעזרה למשפחה אחרת',
        type: 'beneficiary',
        quote: 'קיבלנו עזרה כשהיינו צריכים כי מישהו אחר בחר לתרום. עכשיו אנחנו מחזירים את החיוב.',
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/07/3.d110a0.webp',
        story: 'משפחת נויברג קיבלה עזרה בעבר. כעת הם בעמדה שבה יכולים לעזור לאחרים, והם עושים זאת בכל הלב.',
        impact: 'מעגל של טוב',
        featured: false
      },
      {
        id: 8,
        name: 'ראובן טייטלבאום',
        role: 'תורם ממוקד על חינוך',
        type: 'donor',
        quote: 'החלטתי להתמקד בתרומות לחינוך כי אני מאמין שהשכלה היא העתיד. תורמתי למאות ילדים שחזרו לבית הספר.',
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/07/2.d110a0.webp',
        story: 'ראובן, איש עסקים עשיר, החליט להתמקד בחינוך. עד כה הוא עזר לכמה מאות ילדים.',
        impact: 'משנה עולם דרך חינוך',
        featured: true
      },
      {
        id: 9,
        name: 'שושנה רומנוב',
        role: 'מורה שראתה את ההשפעה',
        type: 'community',
        quote: 'בתור מורה, אני רואה ישירות כיצד תמיכה משפחתית משפיעה על התלמידים. תרומתכם משנה חיים באמת.',
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/07/6.d110a0.webp',
        story: 'שושנה ממליצה לכל ההורים שלה שיתרמו. "כל תרומה חוזרת בישר למורל של הילד."',
        impact: 'חינוך טוב',
        featured: false
      },
      {
        id: 10,
        name: 'חיים וחנה בוכבינדר',
        role: 'זוג תורמים',
        type: 'donor',
        quote: 'תרומה משותפת היא דרך יפה להראות לילדים שלנו את הערך של נתינה.',
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/07/3.d110a0.webp',
        story: 'חיים וחנה תורמים ביחד ומעורבים הילדים שלהם בתהליך. "זו דרך יפה ללמד אותם על צדקה."',
        impact: 'משפחה שלמה',
        featured: false
      },
    ]
  },
  en: {
    title: 'Real Stories - See the Impact',
    subtitle: 'Hear from people whose lives changed because of your support',
    description: 'Every donation is a transformation - for families in need, for children returning to school, for hope returning home.',
    
    filters: {
      all: 'All Stories',
      donors: 'Donors',
      beneficiaries: 'Families Helped',
      community: 'Community',
    },

    shareStory: 'Share Your Story',
    shareStoryDesc: 'Did your donation change something? Or are you a family our support helped?',
    contactUs: 'Contact Us',
    viewMore: 'Read Full Story',

    testimonials: [
      {
        id: 1,
        name: 'Sarah Cohen',
        role: 'Mother of 4',
        type: 'beneficiary',
        quote: 'When my husband lost his job, I thought we wouldn\'t survive. But your support saved my family. My children are happy and safe today.',
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/07/1.d110a0.webp',
        story: 'Sarah was working as a cleaner. When COVID hit, everything collapsed. But with your support, she managed to keep supporting her children.',
        impact: 'One complete family',
        featured: true
      },
      {
        id: 2,
        name: 'David Leon',
        role: 'Regular Donor for 3 Years',
        type: 'donor',
        quote: 'Every month I donate, I feel part of something bigger. It\'s not just money - it\'s a blessing.',
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/07/2.d110a0.webp',
        story: 'David started with a small donation and saw the impact. He chose to become a regular donor. "Every dollar helps a real person."',
        impact: 'Meaningful support',
        featured: true
      },
      {
        id: 3,
        name: 'Miriam & Friends',
        role: 'Donor Group from Yeshiva',
        type: 'community',
        quote: 'When we joined the group donation program, we realized the power of community. Together we can change the world.',
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/07/3.d110a0.webp',
        story: 'A group of women from the yeshiva organized to donate together. Each small donation becomes a family\'s salvation.',
        impact: 'Strong community',
        featured: false
      },
    ]
  }
};

const TestimonialCard = ({ testimonial, currentLanguage }: any) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="border-l-4 border-l-[#f97316] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-16 h-16 rounded-full object-cover flex-shrink-0"
          />
          <div className="flex-1">
            <h3 className="font-bold text-lg text-[#1e40af]">{testimonial.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
            <Badge className="mt-2 bg-[#f97316] text-white text-xs">
              {translations[currentLanguage as keyof typeof translations].filters[
                testimonial.type as keyof typeof translations[keyof typeof translations]['filters']
              ] || testimonial.type}
            </Badge>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-[#f97316] text-[#f97316]" />
            ))}
          </div>
          <p className="text-gray-800 dark:text-gray-200 italic text-lg font-semibold mb-3">
            "{testimonial.quote}"
          </p>
          
          {expanded && (
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800 mb-3">
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {testimonial.story}
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-2 text-[#f97316] font-semibold text-sm">
            <Heart className="w-4 h-4" />
            <span>{testimonial.impact}</span>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-[#1e40af] hover:text-[#f97316] transition-colors text-sm font-semibold flex items-center gap-1"
          >
            {expanded ? (currentLanguage === 'he' ? 'בעד פחות' : 'Show less') : (currentLanguage === 'he' ? 'קרא עוד' : 'Read more')}
            <ArrowRight className={`w-4 h-4 transition-transform ${expanded ? 'rotate-90' : ''}`} />
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default function TestimonialsPage() {
  const { currentLanguage, setLanguage } = useLanguage();
  const [filter, setFilter] = useState('all');
  const t = translations[currentLanguage as keyof typeof translations] || translations.he;

  const filteredTestimonials = filter === 'all'
    ? t.testimonials
    : t.testimonials.filter(t => t.type === filter);

  const featuredTestimonials = t.testimonials.filter(t => t.featured);

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white dark:from-gray-900 dark:via-blue-900/20 dark:to-gray-900"
      dir={currentLanguage === 'he' ? 'rtl' : 'ltr'}
      data-testid="testimonials-page"
    >
      <Header currentLanguage={currentLanguage} onLanguageChange={setLanguage} />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden py-12 md:py-20 bg-gradient-to-br from-[#1e40af] via-[#1e3a8a] to-[#1e40af]">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#f97316] rounded-full blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-300 rounded-full blur-3xl opacity-20"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 max-w-4xl">
          <div className="text-center text-white">
            <div className="mb-6 text-6xl md:text-7xl">💭</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight drop-shadow-lg">
              {t.title}
            </h1>
            <p className="text-xl md:text-2xl mb-6 text-blue-100">
              {t.subtitle}
            </p>
            <p className="text-lg text-blue-50 max-w-2xl mx-auto leading-relaxed">
              {t.description}
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED TESTIMONIALS */}
      <section className="py-12 md:py-16 container mx-auto px-4 max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1e40af] mb-12">
          ⭐ {currentLanguage === 'he' ? 'סיפורים מומלצים' : 'Featured Stories'}
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {featuredTestimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              currentLanguage={currentLanguage}
            />
          ))}
        </div>
      </section>

      {/* FILTER SECTION */}
      <section className="py-8 bg-blue-50 dark:bg-blue-900/20 border-y border-blue-200 dark:border-blue-800">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-wrap justify-center gap-3 items-center">
            <Filter className="w-5 h-5 text-[#1e40af]" />
            {Object.entries(t.filters).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-4 py-2 rounded-full transition-all duration-300 font-semibold ${
                  filter === key
                    ? 'bg-[#1e40af] text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-blue-200 dark:border-blue-700 hover:border-[#1e40af]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ALL TESTIMONIALS GRID */}
      <section className="py-12 md:py-16 container mx-auto px-4 max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1e40af] mb-12">
          {currentLanguage === 'he' ? 'כל הסיפורים' : 'All Stories'}
        </h2>

        {filteredTestimonials.length === 0 ? (
          <div className="text-center py-12">
            <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {currentLanguage === 'he' ? 'אין סיפורים עם הסינון הזה' : 'No stories found with this filter'}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredTestimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                currentLanguage={currentLanguage}
              />
            ))}
          </div>
        )}
      </section>

      {/* SHARE STORY CTA */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 border-t-2 border-orange-200 dark:border-orange-800">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-[#1e40af] mb-4">{t.shareStory}</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
            {t.shareStoryDesc}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/972503515893?text=שלום, אני רוצה לשתף את הסיפור שלי" target="_blank" rel="noopener noreferrer">
              <Button className="bg-[#1e40af] hover:bg-[#1e3a8a] text-white px-8 py-3 text-lg font-bold rounded-lg">
                💬 {currentLanguage === 'he' ? 'שתפו בווטסאפ' : 'Share on WhatsApp'}
              </Button>
            </a>
            <a href="mailto:stories@haesh-sheli.co.il">
              <Button variant="outline" className="border-[#1e40af] text-[#1e40af] hover:bg-blue-50 px-8 py-3 text-lg font-bold rounded-lg">
                📧 {currentLanguage === 'he' ? 'שלח מייל' : 'Send Email'}
              </Button>
            </a>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 mt-6">
            {currentLanguage === 'he'
              ? '🔒 הגרסה שלכם תפורסם רק עם אישור מפורש'
              : '🔒 Your story will only be published with your explicit permission'
            }
          </p>
        </div>
      </section>
    </div>
  );
}
