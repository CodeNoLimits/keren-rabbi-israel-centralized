# FIX URGENT: Keren Vercel Environment Variables
**Date:** 11 février 2026
**Problème:** Backend API errors (blog/admin/shipping bloqués) car AUCUNE env var configurée sur Vercel

---

## 🔴 PROBLÈME IDENTIFIÉ

```bash
$ vercel env ls
> No Environment Variables found
```

**Résultat:**
- Blog page: ❌ Error modal (API can't connect to database)
- Admin page: ❌ Error modal (no database access)
- Shipping page: ❌ Error modal (no backend connection)
- Checkout Stripe: ⚠️ Untested (no VITE_STRIPE_PUBLIC_KEY)
- Analytics: ❌ Not tracking (no GA4/FB Pixel IDs)

---

## ✅ SOLUTION: Ajouter TOUTES ces env vars sur Vercel

### Étape 1: Se connecter à Vercel

```bash
cd ~/keren-rabbi-israel-centralized
vercel login  # Si pas déjà logged in
vercel link   # Link to existing project
```

### Étape 2: Ajouter les env vars CRITIQUES (Backend fonctionnel)

#### A. Database (OBLIGATOIRE - #1 priority)

**Où trouver:** Neon PostgreSQL dashboard (admin@holyrentals.com account?)

```bash
vercel env add DATABASE_URL
# When prompted, enter:
# postgresql://user:password@ep-xxx.neon.tech/keren_db?sslmode=require
# Select: Production, Preview, Development (all 3)
```

**Format requis:**
```
postgresql://[user]:[password]@[host]/[database]?sslmode=require
```

**Test:** Après ajout, le blog/admin/shipping pages doivent fonctionner.

---

#### B. Session Secret (OBLIGATOIRE #2)

```bash
vercel env add SESSION_SECRET
# Enter a random 32+ character string
# Example: openssl rand -base64 32
# Select: Production, Preview, Development
```

**Génération locale:**
```bash
openssl rand -base64 32
```

---

#### C. Stripe (OBLIGATOIRE #3 - Checkout + Payments)

**Où trouver:** https://dashboard.stripe.com/apikeys (admin@holyrentals.com)

```bash
# 1. Stripe Secret Key (server-side)
vercel env add STRIPE_SECRET_KEY
# Test: sk_test_51... (mode test)
# Prod: sk_live_51... (mode production)
# Select: Production (sk_live), Preview (sk_test), Development (sk_test)

# 2. Stripe Public Key (client-side - VITE_ prefix important!)
vercel env add VITE_STRIPE_PUBLIC_KEY
# Test: pk_test_51...
# Prod: pk_live_51...
# Select: Production (pk_live), Preview (pk_test), Development (pk_test)

# 3. Webhook Secret
vercel env add STRIPE_WEBHOOK_SECRET
# Get from: https://dashboard.stripe.com/webhooks
# Create endpoint: https://haesh-sheli-new.vercel.app/api/webhooks/stripe
# Copy whsec_... value
# Select: Production (whsec_live), Preview (whsec_test), Development (whsec_test)

# 4. Subscription Price ID (HoRaat Keva 99 ILS/month)
vercel env add STRIPE_PRICE_ID
# Get from: https://dashboard.stripe.com/products
# Create product: "HoRaat Keva" monthly 99 ILS
# Copy price_... value
# Select: Production, Preview, Development
```

**Test:** Checkout page should load Stripe payment form with Israeli methods (Bit, Google Pay, Apple Pay).

---

### Étape 3: Ajouter les env vars ANALYTICS (Tracking)

#### D. Google Analytics 4 (Task 92)

**Où trouver:** https://analytics.google.com/ (dreamnovaultimate@gmail.com)

```bash
vercel env add VITE_GA4_MEASUREMENT_ID
# Format: G-XXXXXXXXXX
# Example: G-12345XYZ
# Select: Production, Preview (skip Development for clean logs)
```

**Setup GA4:**
1. Go to https://analytics.google.com/
2. Create property "Keren Rabbi Yisrael"
3. Add data stream: haesh-sheli-new.vercel.app
4. Copy Measurement ID (G-XXXXXXXXXX)

---

#### E. Facebook Pixel (Task 93)

**Où trouver:** https://business.facebook.com/events_manager

```bash
vercel env add VITE_FB_PIXEL_ID
# Format: numeric ID
# Example: 9046007782171074
# Select: Production, Preview (skip Development)
```

**Setup FB Pixel:**
1. Go to https://business.facebook.com/
2. Events Manager → Create Pixel
3. Name: "Keren Rabbi Yisrael"
4. Copy Pixel ID (numeric only, not entire code)

---

#### F. Microsoft Clarity (Task 94)

**Où trouver:** https://clarity.microsoft.com/

```bash
vercel env add VITE_CLARITY_ID
# Format: alphanumeric ID
# Example: p0b8jxhgr1
# Select: Production, Preview (skip Development)
```

**Setup Clarity:**
1. Go to https://clarity.microsoft.com/
2. Create project "Keren Rabbi Yisrael"
3. Copy Project ID

---

### Étape 4: Ajouter les env vars OPTIONNELLES (Features avancées)

#### G. SendGrid Email (Order confirmations)

**Où trouver:** https://app.sendgrid.com/settings/api_keys

```bash
vercel env add SENDGRID_API_KEY
# Format: SG.xxxxxxxxxxxxx
# Select: Production, Preview, Development

vercel env add SENDGRID_FROM_EMAIL
# Value: noreply@haesh-sheli.co.il
# OR: info@haesh-sheli.co.il
# Select: Production, Preview, Development
```

---

#### H. Gemini AI (Chatbot - optional)

**Où trouver:** https://aistudio.google.com/apikey (dreamnovaultimate@gmail.com)

```bash
vercel env add GEMINI_API_KEY
# Format: AIzaSy...
# Note: Already have key: AIzaSyDXTfhyOhcjXUB56ubE1S7Lags9vMz80qs
# Select: Production, Preview, Development
```

---

### Étape 5: Vérifier et Redeploy

```bash
# Vérifier que toutes les vars sont ajoutées
vercel env ls

# Should show:
# DATABASE_URL (Production, Preview, Development)
# SESSION_SECRET (Production, Preview, Development)
# STRIPE_SECRET_KEY (Production, Preview, Development)
# VITE_STRIPE_PUBLIC_KEY (Production, Preview, Development)
# STRIPE_WEBHOOK_SECRET (Production, Preview, Development)
# STRIPE_PRICE_ID (Production, Preview, Development)
# VITE_GA4_MEASUREMENT_ID (Production, Preview)
# VITE_FB_PIXEL_ID (Production, Preview)
# VITE_CLARITY_ID (Production, Preview)
# SENDGRID_API_KEY (Production, Preview, Development)
# SENDGRID_FROM_EMAIL (Production, Preview, Development)
# GEMINI_API_KEY (Production, Preview, Development)

# Trigger redeploy pour appliquer les nouvelles env vars
vercel --prod
```

---

## 📊 CHECKLIST POST-FIX

Après avoir ajouté toutes les env vars et redéployé:

### Backend API (Must work)
- [ ] Navigate to https://haesh-sheli-new.vercel.app/blog
- [ ] Should see: 5 Torah articles (NOT error modal)
- [ ] Navigate to https://haesh-sheli-new.vercel.app/admin
- [ ] Should see: Admin dashboard with 4 tabs (NOT error modal)
- [ ] Navigate to https://haesh-sheli-new.vercel.app/shipping
- [ ] Should see: Shipping policy in 5 languages (NOT error modal)

### Stripe Checkout (Must work)
- [ ] Add product to cart
- [ ] Go to checkout
- [ ] Should see: Stripe payment form loading
- [ ] Should see: Installment banner (1/3/6/12 months)
- [ ] Test card: 4242 4242 4242 4242
- [ ] Should process successfully

### Analytics (Should track)
- [ ] Open browser DevTools → Console
- [ ] Navigate site
- [ ] Should see: `[Analytics] GA4 initialized: G-XXXXXXXXXX`
- [ ] Should see: `[Analytics] FB Pixel initialized: XXXXXXXXXX`
- [ ] Should see: `[Analytics] Clarity initialized: XXXXXXXXXX`
- [ ] Check GA4 Real-Time report: https://analytics.google.com/
- [ ] Check FB Events Manager: https://business.facebook.com/events_manager

### Email (Optional)
- [ ] Complete a test order with Stripe
- [ ] Check email inbox (order confirmation should arrive)
- [ ] If no email: Check SendGrid dashboard for logs

---

## 🔧 ALTERNATIVE: Bulk Add via Vercel Dashboard

If CLI method is too tedious, use Vercel web dashboard:

1. Go to https://vercel.com/dream-ais-projects/keren-rabbi-israel-centralized/settings/environment-variables
2. Click "Add Variable"
3. For each var:
   - Name: DATABASE_URL (example)
   - Value: postgresql://... (paste value)
   - Environments: Select Production, Preview, Development
   - Click "Save"
4. Repeat for all 12 env vars
5. Go to Deployments tab → Click "..." on latest → "Redeploy"

---

## 🚨 SÉCURITÉ - IMPORTANT

**NEVER commit these to Git:**
- `.env` file (contains secrets)
- Any file with API keys, passwords, tokens

**Already protected:**
- `.gitignore` includes `.env`
- `.env.example` is safe (no real values)

**Best practices:**
- Different keys for test vs production
- Rotate keys periodically
- Enable Stripe Radar for fraud detection
- Use strong SESSION_SECRET (32+ chars random)

---

## 📝 NOTES ADDITIONNELLES

### Pourquoi VITE_ prefix?

Les variables commençant par `VITE_` sont exposées au client (browser):
- `VITE_STRIPE_PUBLIC_KEY` → OK (safe, public key)
- `VITE_GA4_MEASUREMENT_ID` → OK (safe, tracking ID)
- `STRIPE_SECRET_KEY` → NOT VITE (server-only, secret)
- `DATABASE_URL` → NOT VITE (server-only, credentials)

### ILS Currency (Israeli Shekel)

Stripe amounts in agorot: **1 ILS = 100 agorot**
- Product price 95 ILS = 9500 agorot in Stripe
- Already configured in server/routes.ts: `currency: 'ils'`

### Webhook Endpoint

Configure in Stripe Dashboard:
- URL: `https://haesh-sheli-new.vercel.app/api/webhooks/stripe`
- Events: `payment_intent.succeeded`, `payment_intent.payment_failed`
- Description: "Keren Rabbi Yisrael production"
- Copy webhook secret → STRIPE_WEBHOOK_SECRET env var

### Testing Stripe in Preview

Preview deployments get test keys (sk_test, pk_test):
- Use test cards: 4242 4242 4242 4242
- Israeli test card: 4000 0037 6000 0000
- No real money charged
- See STRIPE_TESTING_GUIDE.md for full test scenarios

---

## ⏱️ TIME ESTIMATE

- **Finding all keys/values:** 30-45 minutes
- **Adding via CLI:** 10-15 minutes (12 vars × 1 min each)
- **Adding via Dashboard:** 15-20 minutes (easier, more visual)
- **Redeploy + verification:** 5-10 minutes
- **Total:** 1 hour maximum

---

## 🆘 SI BLOQUÉ

### DATABASE_URL introuvable
- Check Neon dashboard: https://console.neon.tech/
- Account likely: admin@holyrentals.com or codenolimits@gmail.com
- Create new database if needed: "keren_db"
- Connection string format: `postgresql://[user]:[pass]@[ep-xxx.neon.tech]/keren_db?sslmode=require`

### Stripe keys introuvables
- Check https://dashboard.stripe.com/apikeys
- Account likely: admin@holyrentals.com
- If no account: Create new Stripe account (free)
- Test mode keys available immediately

### GA4/FB Pixel pas configurés
- Can be added later - not blocking
- Site works without analytics, just no tracking
- Skip for now, add when have 15 minutes

### SendGrid pas configuré
- Order confirmations won't send emails
- Orders still work, just no email notification
- Can use alternative: Resend, Mailgun, Postmark
- Or skip emails for MVP

---

**Created by:** Claude Sonnet 4.5
**Date:** 11 février 2026, 22:00 UTC
**Status:** READY FOR DAVID - Print this file and follow step-by-step
**Expected result:** All 3 API errors fixed, Stripe checkout working, analytics tracking

---

**NEXT STEP:** David, execute ce guide maintenant (1h max), puis relance visual testing pour confirmer le fix.
