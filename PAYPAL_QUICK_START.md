# PayPal Integration - Quick Start Guide
## 5-Minute Setup for Testing

---

## Step 1: Get PayPal Sandbox Credentials (3 minutes)

1. **Go to:** https://developer.paypal.com/dashboard/
2. **Login or Sign Up** (free developer account)
3. **Navigate to:** "My Apps & Credentials"
4. **Under "Sandbox"**, click **"Create App"**
   - App Name: `Keren-Test`
   - App Type: `Merchant`
5. **Click "Create App"**
6. **Copy your credentials:**
   - Client ID: `starts with AXXxxXX...`
   - Secret: Click "Show" to reveal

---

## Step 2: Add to .env File (1 minute)

Open `.env` in project root and add:

```bash
# PayPal Sandbox
VITE_PAYPAL_CLIENT_ID=paste-your-client-id-here
PAYPAL_CLIENT_SECRET=paste-your-secret-here
```

**Example:**
```bash
VITE_PAYPAL_CLIENT_ID=AYour_Sandbox_Client_ID_Here123456
PAYPAL_CLIENT_SECRET=EXample-Secret-Key-Here-ABCD1234
```

---

## Step 3: Start Development Server (1 minute)

```bash
cd ~/keren-rabbi-israel-centralized
npm run dev
```

Wait for: `Server running on http://localhost:5000`

---

## Step 4: Test Checkout (2 minutes)

1. **Open:** http://localhost:5000/store
2. **Add items to cart** (any book)
3. **Click cart icon** → "Proceed to Checkout"
4. **Fill shipping form:**
   - Name: Test User
   - Email: test@example.com
   - Address: 123 Test St
   - City: Tel Aviv
   - Postal Code: 12345
5. **Click "Continue to Payment"**
6. **Choose PayPal** (yellow button)
7. **Login with PayPal Sandbox account:**
   - Email: Check "Sandbox Accounts" in PayPal Dashboard
   - Password: Available in Dashboard
8. **Complete payment**
9. **Verify:** Redirect to success page

---

## PayPal Sandbox Test Accounts

### Personal Account (Buyer)
1. **Go to:** https://developer.paypal.com/dashboard/accounts
2. **Click "Create Account"**
3. **Account Type:** Personal
4. **Email:** Will be generated (e.g., buyer@example.com)
5. **Balance:** $5,000 (fake money for testing)

### Using Test Cards
PayPal also accepts credit cards in sandbox:

**Visa:** 4032034594699725
**Mastercard:** 5425233430109903
**Expiry:** Any future date (12/2026)
**CVV:** Any 3 digits (123)

---

## Troubleshooting

### PayPal Button Doesn't Show
✅ Check `.env` has `VITE_PAYPAL_CLIENT_ID`
✅ Restart dev server after adding .env
✅ Check browser console for errors

### "Create Order Failed"
✅ Verify `PAYPAL_CLIENT_SECRET` is set (server-side)
✅ Check server logs: `tail -f logs/server.log`
✅ Ensure amount is in agorot (15000 = 150 ILS)

### Payment Succeeds But Order Not Updated
✅ Check database connection
✅ Verify SendGrid API key is set (for emails)
✅ Check server logs for errors

---

## What Success Looks Like

1. ✅ PayPal button appears in checkout
2. ✅ Button opens PayPal login popup
3. ✅ Payment completes successfully
4. ✅ Redirect to success page
5. ✅ Order appears in database
6. ✅ Confirmation email sent (if SendGrid configured)
7. ✅ Cart is cleared

---

## Next Steps After Testing

✅ **Works in sandbox?** → Ready for production!

**To Go Live:**
1. Create Live PayPal Business Account
2. Get production API credentials
3. Update `.env` with live credentials
4. Set `NODE_ENV=production`
5. Deploy to Vercel/Netlify
6. Test with small real transaction ($1)
7. Monitor first 10 orders

---

## Full Documentation

See `PAYPAL_INTEGRATION_GUIDE.md` for:
- Complete implementation details
- Multi-language support
- Security features
- API endpoint documentation
- Production deployment guide
- Webhook setup (optional)

---

**Time to setup:** 5 minutes
**Time to test:** 2 minutes
**Total:** 7 minutes → Full PayPal integration working!

**Questions?** Check the main guide or PayPal Developer Docs.
