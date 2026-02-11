# Stripe Payment Testing Guide
# Task 81: Stripe Configuration & Testing Documentation

## Overview
The Keren Rabbi Israel e-commerce platform uses Stripe for payment processing with full support for Israeli Shekels (ILS) and Israeli payment methods.

## Configuration Checklist

### Environment Variables (Task 81)
Ensure these are set in your `.env` file:

```bash
# Server-side keys
STRIPE_SECRET_KEY=sk_test_...        # Get from https://dashboard.stripe.com/apikeys
STRIPE_WEBHOOK_SECRET=whsec_...      # Get from https://dashboard.stripe.com/webhooks
STRIPE_PRICE_ID=price_...            # For HoRaat Keva subscription (99 ILS/month)

# Client-side key (exposed to frontend)
VITE_STRIPE_PUBLIC_KEY=pk_test_...   # Test mode: pk_test_, Production: pk_live_
```

### Webhook Configuration
1. Go to https://dashboard.stripe.com/webhooks
2. Click "Add endpoint"
3. Enter your webhook URL:
   - **Modern endpoint:** `https://your-domain.com/api/webhooks/stripe`
   - **Legacy endpoint:** `https://your-domain.com/api/stripe-webhook`
4. Select events to listen for:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copy the webhook signing secret to `STRIPE_WEBHOOK_SECRET`

## Currency Configuration (Task 81)
- **Currency:** ILS (Israeli New Shekel)
- **Amount format:** Agorot (1 ILS = 100 agorot)
- **Example:** 99 ILS = 9900 agorot

All payment amounts are stored and processed in agorot to avoid floating-point precision issues.

## Test Card Numbers (Task 81)

### Standard Test Cards
Use these cards for testing different scenarios:

| Card Number | Brand | Description |
|------------|-------|-------------|
| `4242 4242 4242 4242` | Visa | Basic successful payment |
| `4000 0566 5566 5556` | Visa Debit | Successful debit card payment |
| `5555 5555 5555 4444` | Mastercard | Successful payment |
| `4000 0037 6000 0000` | Visa | Israel-issued card (recommended for testing) |

### Testing Specific Scenarios

#### Successful Payment
- Card: `4242 4242 4242 4242`
- Expiry: Any future date (e.g., `12/34`)
- CVC: Any 3 digits (e.g., `123`)
- Result: Payment succeeds

#### Declined Payment
- Card: `4000 0000 0000 0002`
- Result: Card declined

#### Insufficient Funds
- Card: `4000 0000 0000 9995`
- Result: Insufficient funds error

#### Expired Card
- Card: `4000 0000 0000 0069`
- Result: Expired card error

#### 3D Secure Authentication Required
- Card: `4000 0027 6000 3184`
- Result: Requires 3D Secure authentication (complete flow)

## Israeli Payment Methods (Task 82)

### Supported Payment Methods
The PaymentElement automatically enables these Israeli payment methods when currency is ILS:

1. **Credit/Debit Cards**
   - Visa
   - Mastercard
   - Israeli credit cards with installment support

2. **Bit** (Israeli instant payment)
   - Enabled automatically for ILS transactions
   - Popular instant bank transfer method in Israel

3. **Google Pay**
   - Enabled via PaymentElement
   - Requires Google Pay setup in Stripe Dashboard

4. **Apple Pay**
   - Enabled via PaymentElement
   - Requires Apple Pay domain verification

### PaymentElement Configuration
```typescript
<PaymentElement
  options={{
    layout: 'tabs',
    paymentMethodOrder: ['card', 'google_pay', 'apple_pay'],
    // Stripe automatically shows available payment methods based on currency (ILS)
    fields: {
      billingDetails: {
        address: {
          country: 'never' // Already collected in checkout form
        }
      }
    }
  }}
/>
```

## Installment Payments (Task 84)

### Israeli Credit Card Installments
Israeli credit cards commonly support installment payments (תשלומים). The platform displays:

- **1 payment** (full amount)
- **3 payments** (1/3 monthly)
- **6 payments** (1/6 monthly)
- **12 payments** (1/12 monthly, interest-free)

### Implementation
The installment display is shown in the checkout page:
- Calculates monthly payment for each option
- Shows full breakdown on demand
- Note: Actual installment processing is handled by the Israeli credit card company, not Stripe

### Example Calculation
Total: 600 ILS
- 1 payment: 600 ILS
- 3 payments: 200 ILS/month × 3
- 6 payments: 100 ILS/month × 6
- 12 payments: 50 ILS/month × 12 (no interest)

## Testing Workflow

### 1. Test Checkout Flow
```bash
# Start the development server
npm run dev

# Navigate to the store
http://localhost:5000/store

# Add items to cart and proceed to checkout
```

### 2. Fill Checkout Form
- Use test Israeli phone: `050-1234567`
- Use test email: `test@example.com`
- Fill in Israeli address

### 3. Test Payment
- Enter test card: `4000 0037 6000 0000` (Israel-issued Visa)
- Expiry: `12/34`
- CVC: `123`
- Complete payment

### 4. Verify Webhook
Check server logs for:
```
Payment succeeded for order <orderId>
Order confirmation email sent for order <orderId>
```

### 5. Check Stripe Dashboard
- Go to https://dashboard.stripe.com/test/payments
- Verify payment appears with:
  - Amount in ILS
  - Status: Succeeded
  - Metadata: orderId, isSubscriber

## Order Confirmation Email (Task 83)
After successful payment, the system automatically:
1. Updates order status to "processing"
2. Sends confirmation email via SendGrid
3. Includes:
   - Order summary
   - Shipping details
   - Expected delivery date
   - Order tracking link

Email template uses Hebrew for Israeli customers.

## Common Issues & Troubleshooting

### Payment Not Processing
- Check `VITE_STRIPE_PUBLIC_KEY` is set correctly
- Verify Stripe key matches test/production mode
- Check browser console for errors

### Webhook Not Receiving Events
- Verify webhook endpoint is publicly accessible
- Check `STRIPE_WEBHOOK_SECRET` is correct
- Test webhook using Stripe CLI:
  ```bash
  stripe listen --forward-to localhost:5000/api/webhooks/stripe
  ```

### Israeli Payment Methods Not Showing
- Verify currency is set to 'ils' in payment intent
- Check Stripe Dashboard: Settings → Payment methods
- Enable Bit, Google Pay, Apple Pay in Dashboard

### Installment Display Issues
- Verify `orderSummary.totalAmount` is in agorot
- Check calculation: `Math.ceil(totalAmount / months / 100)`
- Test with different total amounts

## Production Deployment Checklist

### Before Going Live
- [ ] Replace test keys with live keys
- [ ] Update `STRIPE_SECRET_KEY` to `sk_live_...`
- [ ] Update `VITE_STRIPE_PUBLIC_KEY` to `pk_live_...`
- [ ] Configure production webhook endpoint
- [ ] Enable desired payment methods in Stripe Dashboard
- [ ] Test with real Israeli credit card (small amount)
- [ ] Verify email delivery works
- [ ] Set up Stripe tax settings for Israel (17% VAT)
- [ ] Configure fraud detection rules

### Security Notes
- Never commit `.env` file to version control
- Use different keys for test and production
- Verify webhook signatures in production
- Implement rate limiting on payment endpoints
- Monitor for suspicious payment patterns

## Additional Resources
- Stripe Dashboard: https://dashboard.stripe.com
- Stripe Docs - ILS: https://stripe.com/docs/currencies#ils
- Stripe Testing: https://stripe.com/docs/testing
- Payment Methods: https://stripe.com/docs/payments/payment-methods
- Webhooks Guide: https://stripe.com/docs/webhooks

## Support
For issues or questions:
- Check Stripe logs: https://dashboard.stripe.com/logs
- Review webhook events: https://dashboard.stripe.com/webhooks
- Contact: support@haesh-sheli.co.il
