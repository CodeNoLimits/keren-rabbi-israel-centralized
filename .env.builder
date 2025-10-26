# ============================================
# KEREN RABBI ISRAEL - Variables Environnement
# Pour Builder.io, Netlify, et Render
# ============================================

# Node Environment
NODE_ENV=production
NODE_VERSION=20

# ============================================
# DATABASE (Supabase PostgreSQL)
# ============================================
# Format: postgresql://user:password@host:port/database
# Obtenir sur: https://supabase.com/dashboard/project/_/settings/database
DATABASE_URL=

# Supabase Config
SUPABASE_URL=
SUPABASE_ANON_KEY=

# ============================================
# AI SERVICES (Optionnel pour MVP)
# ============================================

# OpenAI (Chat AI)
# Obtenir sur: https://platform.openai.com/api-keys
OPENAI_API_KEY=

# Google Gemini (Chat AI)
# Obtenir sur: https://makersuite.google.com/app/apikey
GEMINI_API_KEY=

# ============================================
# PAIEMENTS (Optionnel pour MVP)
# ============================================

# Stripe
# Obtenir sur: https://dashboard.stripe.com/apikeys
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=

# ============================================
# EMAILS (Optionnel)
# ============================================

# Resend (Emails transactionnels)
# Obtenir sur: https://resend.com/api-keys
RESEND_API_KEY=

# SendGrid (Alternative)
SENDGRID_API_KEY=

# ============================================
# BUILDER.IO (Si utilisé)
# ============================================

# Builder.io API Key
# Obtenir sur: https://builder.io/account/organization
BUILDER_API_KEY=
BUILDER_PUBLIC_KEY=

# ============================================
# SESSION & AUTH
# ============================================

# Session Secret (générer un string aléatoire long)
SESSION_SECRET=your-super-secret-session-key-change-this-in-production

# ============================================
# URLS & DOMAINES
# ============================================

# URL du site (pour emails, redirects, etc.)
SITE_URL=https://haesh-sheli.co.il
API_URL=https://haesh-sheli.co.il/api

# ============================================
# FEATURES FLAGS (Optionnel)
# ============================================

# Activer/désactiver features
ENABLE_CHAT_AI=false
ENABLE_STRIPE=false
ENABLE_NEWSLETTER=true
ENABLE_REVIEWS=true

# ============================================
# NOTES IMPORTANTES
# ============================================

# Pour Builder.io:
# - Copier UNIQUEMENT les variables dont tu as besoin
# - Ne PAS committer ce fichier avec des vraies clés
# - Utiliser l'interface Builder.io pour ajouter les variables

# Pour Netlify:
# - Aller dans Site settings → Environment variables
# - Ajouter chaque variable manuellement

# Pour Render:
# - Aller dans Environment → Add Environment Variable
# - Ajouter DATABASE_URL minimum pour backend

# Pour développement local:
# - Copier ce fichier vers .env
# - Remplir les clés nécessaires
# - Le fichier .env est dans .gitignore (sécurisé)

# ============================================
