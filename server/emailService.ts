import { MailService } from '@sendgrid/mail';

// Based on javascript_sendgrid integration
if (!process.env.SENDGRID_API_KEY) {
  console.warn("SENDGRID_API_KEY environment variable not set. Email functionality will be disabled.");
}

const mailService = new MailService();
if (process.env.SENDGRID_API_KEY) {
  mailService.setApiKey(process.env.SENDGRID_API_KEY);
}

interface EmailParams {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
  templateId?: string;
  dynamicTemplateData?: any;
}

export async function sendEmail(params: EmailParams): Promise<boolean> {
  if (!process.env.SENDGRID_API_KEY) {
    console.warn("SendGrid API key not configured. Email would be sent to:", params.to);
    return false;
  }

  try {
    await mailService.send({
      to: params.to,
      from: params.from,
      subject: params.subject,
      text: params.text,
      html: params.html,
      templateId: params.templateId,
      dynamicTemplateData: params.dynamicTemplateData,
    });
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}

// Order confirmation email template
export function generateOrderConfirmationHTML(orderData: {
  orderId: string;
  customerName: string;
  email: string;
  items: Array<{
    name: string;
    nameEnglish?: string;
    quantity: number;
    price: number;
    variant?: any;
  }>;
  shippingAddress: any;
  orderSummary: {
    subtotal: number;
    discount: number;
    vatAmount: number;
    shippingAmount: number;
    totalAmount: number;
    currency: string;
  };
  isSubscriber: boolean;
}): string {
  const formatPrice = (amount: number) => `₪${(amount / 100).toFixed(2)}`;
  
  return `
<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>אישור הזמנה - האש שלי</title>
    <style>
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); color: white; padding: 30px; text-align: center; }
        .logo { font-size: 28px; font-weight: bold; margin-bottom: 10px; }
        .header-subtitle { font-size: 16px; opacity: 0.9; }
        .content { padding: 30px; }
        .order-info { background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
        .order-number { font-size: 18px; font-weight: bold; color: #1e40af; margin-bottom: 10px; }
        .items-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .items-table th, .items-table td { padding: 12px; text-align: right; border-bottom: 1px solid #e2e8f0; }
        .items-table th { background-color: #f1f5f9; font-weight: bold; }
        .summary-table { width: 100%; margin-top: 20px; }
        .summary-table td { padding: 8px 0; border-bottom: 1px solid #e2e8f0; }
        .total-row { font-weight: bold; font-size: 16px; color: #1e40af; }
        .subscriber-badge { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 8px 16px; border-radius: 20px; font-size: 12px; display: inline-block; margin: 10px 0; }
        .keren-badge { background: linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%); color: white; padding: 8px 16px; border-radius: 20px; font-size: 12px; display: inline-block; margin: 10px 0; }
        .spiritual-mission { background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 0 8px 8px 0; }
        .address-section { background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 15px 0; }
        .footer { background-color: #1f2937; color: white; padding: 30px; text-align: center; }
        .footer a { color: #60a5fa; text-decoration: none; }
        .policies { background-color: #ecfdf5; border: 1px solid #10b981; padding: 15px; border-radius: 8px; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">🔥 האש שלי</div>
            <div class="header-subtitle">קרן רבי ישראל בר אודסר</div>
            <div class="header-subtitle">תוקף עד ביאת המשיח</div>
        </div>
        
        <div class="content">
            <div class="order-info">
                <div class="order-number">אישור הזמנה #${orderData.orderId}</div>
                <p>שלום ${orderData.customerName},</p>
                <p>תודה לך על הזמנתך מחנות "האש שלי"! זו הזמנתך מס' <strong>${orderData.orderId}</strong></p>
                ${orderData.isSubscriber ? '<div class="subscriber-badge">✨ מנוי הוראת קבע פעיל - קיבלת 5% הנחה!</div>' : ''}
                <div class="keren-badge">💎 מחיר הקרן - תמיכה ישירה בפעילות רוחנית</div>
            </div>

            <div class="spiritual-mission">
                <h3>🙏 המשימה הרוחנית שלנו</h3>
                <p>כל רכישה תומכת בהפצת תורת רבי נחמן מברסלב ובחיזוק הקשר לרבינו הקדוש. הכסף שלך הולך ישירות למשימה הרוחנית של הפצת האמת והאור בעולם.</p>
                <p><strong>נ נח נחמ נחמן מאומן!</strong></p>
            </div>

            <h3>פריטים שהוזמנו:</h3>
            <table class="items-table">
                <thead>
                    <tr>
                        <th>פריט</th>
                        <th>כמות</th>
                        <th>מחיר יחידה</th>
                        <th>סה"כ</th>
                    </tr>
                </thead>
                <tbody>
                    ${orderData.items.map(item => `
                    <tr>
                        <td>
                            <strong>${item.name}</strong>
                            ${item.nameEnglish ? `<br><em>${item.nameEnglish}</em>` : ''}
                            ${item.variant ? `<br><small>גרסה: ${item.variant.format || ''} ${item.variant.size || ''}</small>` : ''}
                        </td>
                        <td>${item.quantity}</td>
                        <td>${formatPrice(item.price)}</td>
                        <td><strong>${formatPrice(item.price * item.quantity)}</strong></td>
                    </tr>
                    `).join('')}
                </tbody>
            </table>

            <table class="summary-table">
                <tr>
                    <td>סכום ביניים:</td>
                    <td style="text-align: left;"><strong>${formatPrice(orderData.orderSummary.subtotal)}</strong></td>
                </tr>
                ${orderData.orderSummary.discount > 0 ? `
                <tr style="color: #10b981;">
                    <td>הנחת מנוי (5%):</td>
                    <td style="text-align: left;"><strong>-${formatPrice(orderData.orderSummary.discount)}</strong></td>
                </tr>
                ` : ''}
                <tr>
                    <td>מע"ם (17%):</td>
                    <td style="text-align: left;"><strong>${formatPrice(orderData.orderSummary.vatAmount)}</strong></td>
                </tr>
                <tr>
                    <td>משלוח:</td>
                    <td style="text-align: left;"><strong>${orderData.orderSummary.shippingAmount > 0 ? formatPrice(orderData.orderSummary.shippingAmount) : 'חינם! 🎉'}</strong></td>
                </tr>
                <tr class="total-row">
                    <td><strong>סה"כ לתשלום:</strong></td>
                    <td style="text-align: left;"><strong>${formatPrice(orderData.orderSummary.totalAmount)}</strong></td>
                </tr>
            </table>

            <div class="address-section">
                <h3>כתובת למשלוח:</h3>
                <p>
                    ${orderData.shippingAddress.fullName}<br>
                    ${orderData.shippingAddress.addressLine1}<br>
                    ${orderData.shippingAddress.addressLine2 ? orderData.shippingAddress.addressLine2 + '<br>' : ''}
                    ${orderData.shippingAddress.city}, ${orderData.shippingAddress.postalCode}<br>
                    ${orderData.shippingAddress.country}<br>
                    טלפון: ${orderData.shippingAddress.phone}
                </p>
            </div>

            <div class="policies">
                <h3>🚚 מדיניות משלוח ומדיניות החזרות</h3>
                <ul>
                    <li><strong>זמן משלוח:</strong> 3-7 ימי עסקים</li>
                    <li><strong>משלוח חינם:</strong> על הזמנות מעל ₪399</li>
                    <li><strong>החזרות:</strong> ניתן להחזיר תוך 14 יום מקבלת המוצר</li>
                    <li><strong>מוצר פגום:</strong> החלפה מיידית ללא עלות</li>
                    <li><strong>מעקב הזמנה:</strong> תקבל SMS עם קישור מעקב לאחר המשלוח</li>
                </ul>
                <p><strong>שירות לקוחות:</strong> support@haesh-sheli.co.il | 02-123-4567</p>
            </div>
        </div>

        <div class="footer">
            <p><strong>האש שלי - קרן רבי ישראל בר אודסר</strong></p>
            <p>מפיצים את אור רבי נחמן מברסלב בכל העולם</p>
            <p>
                <a href="https://haesh-sheli.co.il">האתר שלנו</a> | 
                <a href="mailto:support@haesh-sheli.co.il">צור קשר</a> | 
                <a href="https://haesh-sheli.co.il/returns">מדיניות החזרות</a>
            </p>
            <p style="font-size: 12px; margin-top: 20px; opacity: 0.8;">
                תוקף עד ביאת המשיח • נ נח נחמ נחמן מאומן
            </p>
        </div>
    </div>
</body>
</html>
  `;
}

export async function sendOrderConfirmation(orderData: {
  orderId: string;
  customerName: string;
  email: string;
  items: Array<{
    name: string;
    nameEnglish?: string;
    quantity: number;
    price: number;
    variant?: any;
  }>;
  shippingAddress: any;
  orderSummary: {
    subtotal: number;
    discount: number;
    vatAmount: number;
    shippingAmount: number;
    totalAmount: number;
    currency: string;
  };
  isSubscriber: boolean;
}): Promise<boolean> {
  const html = generateOrderConfirmationHTML(orderData);
  
  const subject = `אישור הזמנה #${orderData.orderId} - האש שלי 🔥`;
  
  const textVersion = `
שלום ${orderData.customerName},

תודה לך על הזמנתך מחנות "האש שלי"!
מספר הזמנה: ${orderData.orderId}

סכום כולל: ₪${(orderData.orderSummary.totalAmount / 100).toFixed(2)}

פרטי המשלוח יישלחו אליך בהודעת SMS נפרדת.

בברכה,
צוות האש שלי - קרן רבי ישראל בר אודסר
נ נח נחמ נחמן מאומן!
  `;

  return await sendEmail({
    to: orderData.email,
    from: process.env.SENDGRID_FROM_EMAIL || 'noreply@haesh-sheli.co.il',
    subject,
    text: textVersion,
    html
  });
}