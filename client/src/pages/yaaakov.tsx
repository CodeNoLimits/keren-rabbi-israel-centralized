import { useState } from 'react';
import { TrendingUp, DollarSign, Users, Star, Target, Calendar, CheckCircle2, ArrowUp, ArrowDown, Eye, CheckCircle, Clock, Circle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';

export default function YaakovInvestorDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  // Business-focused metrics for investors
  const businessMetrics = {
    currentMonth: {
      revenue: 47500, // in shekels
      newSubscribers: 156,
      totalUsers: 2845,
      conversionRate: 5.8,
      avgOrderValue: 285,
      monthlyRecurringRevenue: 89400
    },
    lastMonth: {
      revenue: 41200,
      newSubscribers: 132,
      totalUsers: 2689,
      conversionRate: 4.2,
      avgOrderValue: 267,
      monthlyRecurringRevenue: 76300
    },
    goals: {
      monthlyRevenue: 75000,
      totalUsers: 5000,
      conversionRate: 8.0,
      monthlyRecurringRevenue: 150000
    }
  };

  // Business milestones achieved
  const businessMilestones = [
    {
      title: 'מערכת תשלומים מאובטחת',
      description: 'השלמת אינטגרציה עם Stripe ומערכות תשלום בטוחות',
      impact: 'אפשר תרומות ומכירות מקוונות',
      value: '+300% בתרומות מקוונות',
      date: 'ספטמבר 2025'
    },
    {
      title: 'מנויי הוראת קבע',
      description: 'השקה של 4 רמות מנוי לתומכים: 99₪, 299₪, 499₪, 999₪',
      impact: 'הכנסה חוזרת יציבה',
      value: '89,400₪ הכנסה חודשית',
      date: 'ספטמבר 2025'
    },
    {
      title: 'אופטימיזציה לנייד',
      description: 'שיפור מלא של חוויית הגלישה במכשירים ניידים',
      impact: 'עלייה בהמרות ממכשירים ניידים',
      value: '+85% שיפור בניקוד נייד',
      date: 'אוגוסט 2025'
    }
  ];

  // Financial projections
  const financialProjections = [
    { month: 'ספטמבר', revenue: 47500, target: 75000 },
    { month: 'אוקטובר', revenue: 58000, target: 80000 },
    { month: 'נובמבר', revenue: 71000, target: 85000 },
    { month: 'דצמבר', revenue: 89000, target: 90000 },
    { month: 'ינואר', revenue: 105000, target: 100000 },
    { month: 'פברואר', revenue: 118000, target: 110000 }
  ];

  // Sprint progress data for business milestones
  const sprintProgress = {
    completed: [
      {
        id: 1,
        title: 'מערכת תשלומים מאובטחת',
        description: 'השלמת אינטגרציה עם Stripe ומערכות תשלום בטוחות',
        impact: 'עלייה של 300% בתרומות מקוונות',
        sprint: 'Sprint 1'
      },
      {
        id: 2,
        title: 'מנויי הוראת קבע',
        description: 'השקה של 4 רמות מנוי: 99₪, 299₪, 499₪, 999₪',
        impact: '89,400₪ הכנסה חודשית יציבה',
        sprint: 'Sprint 2'
      },
      {
        id: 3,
        title: 'אופטימיזציה לנייד',
        description: 'שיפור מלא של חוויית הגלישה במכשירים ניידים',
        impact: '+85% שיפור בניקוד נייד ו-25% עלייה בהמרות',
        sprint: 'Sprint 3'
      }
    ],
    inProgress: [
      {
        id: 4,
        title: 'חנות ספרים דיגיטלית',
        description: 'השלמת קטלוג של 50+ ספרי ברסלב עם תמונות HD',
        impact: 'פוטנציאל הכנסה נוספת של 25,000₪ חודשיים',
        sprint: 'Sprint 4'
      }
    ],
    pending: [
      {
        id: 5,
        title: 'צ׳אט AI רוחני',
        description: 'בוט צ׳אט חכם עם תשובות מותאמות לתורת ברסלב',
        impact: 'שיפור engagement ב-40% וזמן שהייה באתר',
        sprint: 'Sprint 5'
      },
      {
        id: 6,
        title: 'מגזין דיגיטלי',
        description: 'תוכן שבועי עם מאמרים, וידאו ופודקאסטים',
        impact: 'בניית קהילה של 1000+ מנויים רגילים',
        sprint: 'Sprint 6'
      },
      {
        id: 7,
        title: 'אפליקציית נייד',
        description: 'אפליקציה ייעודית עם התראות ותוכן יומי',
        impact: 'הרחבת הקהל ב-150% ושיפור retention',
        sprint: 'Sprint 7'
      }
    ]
  };

  // Metrics for budget and KPI tracking
  const metrics = {
    budget: {
      allocated: '₪120,000',
      spent: '₪67,500',
      remaining: '₪52,500'
    },
    targets: {
      conversionRate: {
        current: '5.8%',
        target: '8.0%'
      },
      mobileScore: {
        current: '85',
        target: '95'
      },
      timeOnSite: {
        current: '3:45min',
        target: '6:00min'
      }
    }
  };

  const calculateGrowth = (current: number, previous: number) => {
    return Math.round(((current - previous) / previous) * 100);
  };

  const MetricCard = ({ title, value, previousValue, suffix = "", icon, color = "blue" }: {
    title: string;
    value: number;
    previousValue?: number;
    suffix?: string;
    icon: any;
    color?: string;
  }) => {
    const growth = previousValue ? calculateGrowth(value, previousValue) : 0;
    const isPositive = growth >= 0;
    const colorClasses = {
      blue: "text-blue-600 bg-blue-50 border-blue-200",
      green: "text-green-600 bg-green-50 border-green-200",
      purple: "text-purple-600 bg-purple-50 border-purple-200",
      orange: "text-orange-600 bg-orange-50 border-orange-200"
    };

    return (
      <div className={`p-6 rounded-lg border ${colorClasses[color as keyof typeof colorClasses]}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">{title}</p>
            <p className="text-2xl font-bold">
              {value.toLocaleString('he-IL')}{suffix}
            </p>
            {previousValue && (
              <div className={`flex items-center text-sm mt-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {isPositive ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                <span className="mr-1">{Math.abs(growth)}%</span>
                <span className="text-gray-500">לעומת חודש קודם</span>
              </div>
            )}
          </div>
          <div className="text-3xl">{icon}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Header />
      
      {/* Dashboard Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                האש שלי - דוח עסקי למשקיעים
              </h1>
              <p className="text-gray-600 mt-1">
                תוצאות פיננסיות וביצועים עסקיים • עדכון: {new Date().toLocaleDateString('he-IL')}
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  ₪{businessMetrics.currentMonth.revenue.toLocaleString('he-IL')}
                </div>
                <div className="text-sm text-gray-600">הכנסות החודש</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {calculateGrowth(businessMetrics.currentMonth.revenue, businessMetrics.lastMonth.revenue)}%
                </div>
                <div className="text-sm text-gray-600">צמיחה חודשית</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex gap-6">
            {[
              { id: 'overview', label: 'סקירה עסקית' },
              { id: 'financial', label: 'ביצועים פיננסיים' },
              { id: 'growth', label: 'צמיחה ויעדים' },
              { id: 'milestones', label: 'הישגים עסקיים' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Key Business Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                title="הכנסות חודשיות"
                value={businessMetrics.currentMonth.revenue}
                previousValue={businessMetrics.lastMonth.revenue}
                suffix="₪"
                icon="💰"
                color="green"
              />
              
              <MetricCard
                title="מנויים חדשים"
                value={businessMetrics.currentMonth.newSubscribers}
                previousValue={businessMetrics.lastMonth.newSubscribers}
                icon="👥"
                color="blue"
              />
              
              <MetricCard
                title="שיעור המרה"
                value={businessMetrics.currentMonth.conversionRate}
                previousValue={businessMetrics.lastMonth.conversionRate}
                suffix="%"
                icon="📈"
                color="purple"
              />
              
              <MetricCard
                title="MRR - הכנסה חוזרת"
                value={businessMetrics.currentMonth.monthlyRecurringRevenue}
                previousValue={businessMetrics.lastMonth.monthlyRecurringRevenue}
                suffix="₪"
                icon="🔄"
                color="orange"
              />
            </div>

            {/* Business Summary */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 סיכום עסקי - ספטמבר 2025</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-800 mb-3">הישגי החודש:</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 text-green-500 ml-2" />
                      עלייה של 15% בהכנסות החודשיות
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 text-green-500 ml-2" />
                      השקת 4 רמות מנוי להוראת קבע
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 text-green-500 ml-2" />
                      שיפור שיעור המרה ל-5.8%
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 text-green-500 ml-2" />
                      הוספת 156 מנויים חדשים
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-3">יעדי החודש הבא:</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <Target className="w-4 h-4 text-blue-500 ml-2" />
                      הגעה ל-58,000₪ הכנסות חודשיות
                    </li>
                    <li className="flex items-center">
                      <Target className="w-4 h-4 text-blue-500 ml-2" />
                      200 מנויים חדשים בחודש
                    </li>
                    <li className="flex items-center">
                      <Target className="w-4 h-4 text-blue-500 ml-2" />
                      עלייה לשיעור המרה של 6.5%
                    </li>
                    <li className="flex items-center">
                      <Target className="w-4 h-4 text-blue-500 ml-2" />
                      השקת תוכן פרימיום חדש
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Recent Achievements */}
            <div className="lg:col-span-3 bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">הישגים אחרונים</h3>
              </div>
              <div className="p-6 space-y-4">
                {sprintProgress.completed.map((task) => (
                  <div key={task.id} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">{task.title}</div>
                      <div className="text-sm text-gray-600">{task.description}</div>
                      <div className="text-xs text-green-600 mt-1">{task.impact}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'financial' && (
          <div className="space-y-6">
            {/* Financial Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <MetricCard
                title="הכנסות החודש"
                value={businessMetrics.currentMonth.revenue}
                previousValue={businessMetrics.lastMonth.revenue}
                suffix="₪"
                icon="💰"
                color="green"
              />
              <MetricCard
                title="MRR - הכנסה חוזרת"
                value={businessMetrics.currentMonth.monthlyRecurringRevenue}
                previousValue={businessMetrics.lastMonth.monthlyRecurringRevenue}
                suffix="₪"
                icon="🔄"
                color="blue"
              />
              <MetricCard
                title="ממוצע עגלת קניות"
                value={businessMetrics.currentMonth.avgOrderValue}
                previousValue={businessMetrics.lastMonth.avgOrderValue}
                suffix="₪"
                icon="🛒"
                color="purple"
              />
            </div>

            {/* Financial Projections Chart */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">📈 תחזית הכנסות - 6 חודשים הבאים</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {financialProjections.map((proj, index) => (
                  <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">{proj.month}</div>
                    <div className="text-lg font-bold text-blue-700">
                      ₪{proj.revenue.toLocaleString('he-IL')}
                    </div>
                    <div className="text-xs text-gray-500">
                      יעד: ₪{proj.target.toLocaleString('he-IL')}
                    </div>
                    <div className={`text-xs mt-1 ${proj.revenue >= proj.target ? 'text-green-600' : 'text-orange-600'}`}>
                      {proj.revenue >= proj.target ? '✓ הושג' : `${Math.round((proj.revenue/proj.target)*100)}% מהיעד`}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Revenue Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">💳 פירוט הכנסות חודשיות</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">מנויים (89,400₪)</span>
                    <span className="font-semibold text-green-600">63%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">מכירת ספרים (15,200₪)</span>
                    <span className="font-semibold text-blue-600">32%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">תרומות חד פעמיות (2,900₪)</span>
                    <span className="font-semibold text-purple-600">5%</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">🎯 יעדים פיננסיים</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">יעד הכנסות חודשיות</span>
                    <span className="font-semibold">₪{businessMetrics.goals.monthlyRevenue.toLocaleString('he-IL')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">יעד MRR</span>
                    <span className="font-semibold">₪{businessMetrics.goals.monthlyRecurringRevenue.toLocaleString('he-IL')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">התקדמות ליעד השנתי</span>
                    <span className="font-semibold text-blue-600">
                      {Math.round((businessMetrics.currentMonth.revenue * 12 / (businessMetrics.goals.monthlyRevenue * 12)) * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'growth' && (
          <div className="space-y-6">
            {/* Growth Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <MetricCard
                title="צמיחה חודשית"
                value={calculateGrowth(businessMetrics.currentMonth.revenue, businessMetrics.lastMonth.revenue)}
                suffix="%"
                icon="📈"
                color="green"
              />
              <MetricCard
                title="צמיחת מנויים"
                value={calculateGrowth(businessMetrics.currentMonth.newSubscribers, businessMetrics.lastMonth.newSubscribers)}
                suffix="%"
                icon="👥"
                color="blue"
              />
              <MetricCard
                title="שיפור המרה"
                value={businessMetrics.currentMonth.conversionRate}
                previousValue={businessMetrics.lastMonth.conversionRate}
                suffix="%"
                icon="🎯"
                color="purple"
              />
            </div>

            {/* Growth Targets and Progress */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">🎯 יעדי צמיחה</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>שיעור המרה</span>
                      <span>{metrics.targets.conversionRate.current} → {metrics.targets.conversionRate.target}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{width: '72%'}}></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">72% להשגת היעד</div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>ניקוד נייד</span>
                      <span>{metrics.targets.mobileScore.current} → {metrics.targets.mobileScore.target}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{width: '89%'}}></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">89% להשגת היעד</div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>זמן באתר</span>
                      <span>{metrics.targets.timeOnSite.current} → {metrics.targets.timeOnSite.target}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-600 h-2 rounded-full" style={{width: '62%'}}></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">62% להשגת היעד</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 התקדמות לקראת יעדים</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">יעד משתמשים</span>
                    <span className="font-semibold">
                      {businessMetrics.currentMonth.totalUsers.toLocaleString('he-IL')} / {businessMetrics.goals.totalUsers.toLocaleString('he-IL')}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{width: `${(businessMetrics.currentMonth.totalUsers / businessMetrics.goals.totalUsers) * 100}%`}}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {Math.round((businessMetrics.currentMonth.totalUsers / businessMetrics.goals.totalUsers) * 100)}% מהיעד השנתי
                  </div>
                </div>
              </div>
            </div>

            {/* Growth Strategy & ROI Projection */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">🚀 אסטרטגיית צמיחה</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-800 mb-3">יוזמות צמיחה פעילות:</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 text-green-500 ml-2" />
                      אופטימיזציה לנייד (בוצע)
                    </li>
                    <li className="flex items-center">
                      <Clock className="w-4 h-4 text-yellow-500 ml-2" />
                      הרחבת קטלוג הספרים (בתהליך)
                    </li>
                    <li className="flex items-center">
                      <Circle className="w-4 h-4 text-gray-400 ml-2" />
                      צ'אט AI רוחני (מתוכנן)
                    </li>
                    <li className="flex items-center">
                      <Circle className="w-4 h-4 text-gray-400 ml-2" />
                      מגזין דיגיטלי (מתוכנן)
                    </li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-xl font-bold text-blue-700">300% ROI צפוי</div>
                  <div className="text-blue-600 text-sm mt-1">
                    בהשלמת כל יוזמות הצמיחה
                  </div>
                  <div className="mt-3 text-sm text-gray-700">
                    • המרה: 5.8% → 8% = עלייה 38%<br />
                    • זמן באתר: 3:45min → 6min = עלייה 60%<br />
                    • עגלת קניות: 285₪ → 400₪ = עלייה 40%
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'milestones' && (
          <div className="space-y-6">
            {/* Major Business Milestones */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">🏆 הישגים עסקיים עיקריים</h3>
              <div className="space-y-6">
                {businessMilestones.map((milestone, index) => (
                  <div key={index} className="border-r-4 border-green-500 pr-4 bg-green-50 p-4 rounded-lg">
                    <div className="font-semibold text-green-700 text-lg">{milestone.title}</div>
                    <div className="text-green-600 text-sm mt-1">{milestone.description}</div>
                    <div className="text-xs text-gray-600 mt-2">
                      <span className="font-medium">השפעה עסקית:</span> {milestone.impact}
                    </div>
                    <div className="text-xs text-green-700 mt-1">
                      <span className="font-medium">ערך כמותי:</span> {milestone.value}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      <span className="font-medium">תאריך השלמה:</span> {milestone.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Progress & Sprint Status */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">✅ הושלמו</h3>
                <div className="space-y-3">
                  {sprintProgress.completed.map((task) => (
                    <div key={task.id} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <div className="font-medium text-gray-900 text-sm">{task.title}</div>
                        <div className="text-xs text-green-600 mt-1">{task.impact}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">🔄 בביצוע</h3>
                <div className="space-y-3">
                  {sprintProgress.inProgress.map((task) => (
                    <div key={task.id} className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                      <Clock className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div>
                        <div className="font-medium text-gray-900 text-sm">{task.title}</div>
                        <div className="text-xs text-yellow-600 mt-1">{task.impact}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">📋 מתוכנן</h3>
                <div className="space-y-3">
                  {sprintProgress.pending.slice(0, 3).map((task) => (
                    <div key={task.id} className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg">
                      <Circle className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <div className="font-medium text-gray-900 text-sm">{task.title}</div>
                        <div className="text-xs text-blue-600 mt-1">{task.impact}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Timeline & Next Milestones */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">📅 ציר זמן והישגים עתידיים</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-800 mb-3">הישגים מתוכננים לחודש הבא:</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <Target className="w-4 h-4 text-blue-500 ml-2" />
                      השלמת קטלוג הספרים הדיגיטלי
                    </li>
                    <li className="flex items-center">
                      <Target className="w-4 h-4 text-blue-500 ml-2" />
                      השקת צ'אט AI רוחני
                    </li>
                    <li className="flex items-center">
                      <Target className="w-4 h-4 text-blue-500 ml-2" />
                      הגעה ל-200 מנויים חדשים
                    </li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-700 mb-2">📈 תחזית השפעה עסקית</h4>
                  <div className="text-sm text-gray-700">
                    בהשלמת כל המיילסטונים המתוכננים:<br />
                    • עלייה בהכנסות החודשיות ל-75,000₪<br />
                    • הגדלת בסיס המשתמשים ל-5,000 משתמשים<br />
                    • שיפור שיעור המרה ל-8%<br />
                    • הכנסה חוזרת של 150,000₪ MRR
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}