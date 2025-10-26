import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Share2, Download, TrendingUp, Users, DollarSign, QrCode } from 'lucide-react';
import QRCodeStyling from 'qr-code-styling';

export interface PartnerStats {
  totalClicks: number;
  totalSales: number;
  totalCommission: number;
  conversionRate: number;
  activeLinks: number;
}

export interface PartnerLink {
  id: string;
  productId: string;
  productName: string;
  url: string;
  clicks: number;
  sales: number;
  commission: number;
}

export function PartnerProgram() {
  const [partnerId, setPartnerId] = useState<string>('');
  const [customLink, setCustomLink] = useState<string>('');
  const [generatedLinks, setGeneratedLinks] = useState<PartnerLink[]>([]);
  const [qrCodeCanvas, setQrCodeCanvas] = useState<HTMLElement | null>(null);

  // Simuler les stats du partenaire
  const [stats] = useState<PartnerStats>({
    totalClicks: 1247,
    totalSales: 89,
    totalCommission: 3567,
    conversionRate: 7.1,
    activeLinks: 12
  });

  // Générer un ID partenaire unique à la première visite
  useEffect(() => {
    let id = localStorage.getItem('partner-id');
    if (!id) {
      id = `P${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('partner-id', id);
    }
    setPartnerId(id);

    // Charger les liens existants
    const savedLinks = localStorage.getItem('partner-links');
    if (savedLinks) {
      setGeneratedLinks(JSON.parse(savedLinks));
    }
  }, []);

  const generatePartnerLink = (productId?: string) => {
    const baseUrl = 'https://haesh-sheli.netlify.app';
    const link = productId
      ? `${baseUrl}/product/${productId}?ref=${partnerId}`
      : customLink
      ? `${customLink}?ref=${partnerId}`
      : `${baseUrl}/store?ref=${partnerId}`;

    return link;
  };

  const createPartnerLink = () => {
    const newLink: PartnerLink = {
      id: `link-${Date.now()}`,
      productId: customLink || 'store',
      productName: customLink || 'החנות הראשית',
      url: generatePartnerLink(),
      clicks: 0,
      sales: 0,
      commission: 0
    };

    const updatedLinks = [...generatedLinks, newLink];
    setGeneratedLinks(updatedLinks);
    localStorage.setItem('partner-links', JSON.stringify(updatedLinks));
    setCustomLink('');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('הקישור הועתק ללוח!');
  };

  const generateQRCode = (url: string) => {
    const qrCode = new QRCodeStyling({
      width: 300,
      height: 300,
      type: 'svg',
      data: url,
      dotsOptions: {
        color: '#0d9488',
        type: 'rounded'
      },
      backgroundOptions: {
        color: '#ffffff',
      },
      imageOptions: {
        crossOrigin: 'anonymous',
        margin: 10
      }
    });

    const container = document.getElementById('qr-code-container');
    if (container) {
      container.innerHTML = '';
      qrCode.append(container);
    }
  };

  const generateWhatsAppStatus = (link: string) => {
    const message = `🌟 ספרי ברסלב מיוחדים 🌟\n\nגלו את ספרי רבינו רבי נחמן מברסלב\n📚 ליקוטי מוהר"ן, ספר המידות, סיפורי מעשיות ועוד...\n\n👉 ${link}\n\nהזמינו עכשיו והפיצו אור!`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-teal-900 mb-2">תוכנית השותפים של הקרן</h1>
        <p className="text-teal-600">הרוויחו עמלות על כל מכירה שתפנו אלינו</p>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">קליקים כולל</p>
              <p className="text-2xl font-bold text-blue-600">{stats.totalClicks.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">מכירות</p>
              <p className="text-2xl font-bold text-green-600">{stats.totalSales}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <DollarSign className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">עמלות</p>
              <p className="text-2xl font-bold text-purple-600">{stats.totalCommission.toLocaleString()}₪</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-100 rounded-lg">
              <TrendingUp className="h-5 w-5 text-teal-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">המרה</p>
              <p className="text-2xl font-bold text-teal-600">{stats.conversionRate}%</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Share2 className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">קישורים פעילים</p>
              <p className="text-2xl font-bold text-orange-600">{stats.activeLinks}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Partner ID */}
      <Card className="p-6 mb-8 bg-gradient-to-br from-teal-50 to-blue-50">
        <h3 className="text-lg font-bold mb-3">מזהה השותף שלך</h3>
        <div className="flex gap-2">
          <Input value={partnerId} readOnly className="font-mono" />
          <Button onClick={() => copyToClipboard(partnerId)} variant="outline">
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="create" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="create">יצירת קישורים</TabsTrigger>
          <TabsTrigger value="links">הקישורים שלי</TabsTrigger>
          <TabsTrigger value="qr">קוד QR</TabsTrigger>
          <TabsTrigger value="whatsapp">שיתוף WhatsApp</TabsTrigger>
        </TabsList>

        {/* Create Links Tab */}
        <TabsContent value="create" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-bold mb-4">צור קישור שותף חדש</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  הכנס קישור למוצר או לעמוד (או השאר ריק לקישור לחנות הראשית)
                </label>
                <Input
                  placeholder="https://haesh-sheli.netlify.app/product/likutei-moharan"
                  value={customLink}
                  onChange={(e) => setCustomLink(e.target.value)}
                />
              </div>

              <Button onClick={createPartnerLink} className="w-full bg-teal-600 hover:bg-teal-700">
                צור קישור שותף
              </Button>

              {generatedLinks.length > 0 && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm font-semibold mb-2">הקישור האחרון שנוצר:</p>
                  <div className="flex gap-2">
                    <Input
                      value={generatedLinks[generatedLinks.length - 1].url}
                      readOnly
                      className="font-mono text-sm"
                    />
                    <Button
                      onClick={() => copyToClipboard(generatedLinks[generatedLinks.length - 1].url)}
                      variant="outline"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Commission Structure */}
          <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50">
            <h3 className="text-lg font-bold mb-4">מבנה העמלות</h3>
            <div className="space-y-2">
              <div className="flex justify-between p-3 bg-white rounded-lg">
                <span>מכירת ספרים</span>
                <span className="font-bold text-green-600">10% עמלה</span>
              </div>
              <div className="flex justify-between p-3 bg-white rounded-lg">
                <span>מנויים</span>
                <span className="font-bold text-blue-600">15% עמלה חודשית</span>
              </div>
              <div className="flex justify-between p-3 bg-white rounded-lg">
                <span>תרומות</span>
                <span className="font-bold text-purple-600">5% עמלה</span>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* My Links Tab */}
        <TabsContent value="links">
          <div className="space-y-3">
            {generatedLinks.map((link) => (
              <Card key={link.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">{link.productName}</h4>
                    <p className="text-sm text-gray-600 font-mono truncate">{link.url}</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">קליקים</p>
                      <p className="text-lg font-bold">{link.clicks}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">מכירות</p>
                      <p className="text-lg font-bold text-green-600">{link.sales}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">עמלות</p>
                      <p className="text-lg font-bold text-purple-600">{link.commission}₪</p>
                    </div>
                    <Button
                      onClick={() => copyToClipboard(link.url)}
                      variant="outline"
                      size="sm"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}

            {generatedLinks.length === 0 && (
              <Card className="p-8 text-center text-gray-500">
                <p>עדיין לא יצרת קישורים. עבור ל"יצירת קישורים" כדי להתחיל.</p>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* QR Code Tab */}
        <TabsContent value="qr">
          <Card className="p-6">
            <h3 className="text-lg font-bold mb-4">קוד QR לקישור השותף</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">בחר קישור לייצור QR</label>
                <select
                  className="w-full p-2 border rounded-lg"
                  onChange={(e) => generateQRCode(e.target.value)}
                >
                  <option value="">בחר קישור...</option>
                  {generatedLinks.map((link) => (
                    <option key={link.id} value={link.url}>
                      {link.productName}
                    </option>
                  ))}
                </select>
              </div>

              <div id="qr-code-container" className="flex justify-center p-6 bg-gray-50 rounded-lg"></div>

              <Button className="w-full" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                הורד קוד QR
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* WhatsApp Tab */}
        <TabsContent value="whatsapp">
          <Card className="p-6">
            <h3 className="text-lg font-bold mb-4">שתף בסטטוס WhatsApp</h3>
            <p className="text-sm text-gray-600 mb-4">
              צור סטטוס WhatsApp מוכן עם הקישור השותף שלך
            </p>

            <div className="space-y-3">
              {generatedLinks.map((link) => (
                <div key={link.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-semibold">{link.productName}</p>
                    <p className="text-sm text-gray-600">הפץ בסטטוס והרוויח עמלות</p>
                  </div>
                  <Button
                    onClick={() => generateWhatsAppStatus(link.url)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    שתף בWhatsApp
                  </Button>
                </div>
              ))}

              {generatedLinks.length === 0 && (
                <p className="text-center text-gray-500 py-8">
                  יצור קישור קודם כדי לשתף בWhatsApp
                </p>
              )}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
