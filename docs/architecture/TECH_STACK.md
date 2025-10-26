# 🛠️ STACK TECHNIQUE - KEREN RABBI ISRAEL

> Documentation technique complète - Version 2.0

## 📋 Vue d'Ensemble

Ce projet utilise une stack moderne **React/Next.js** hébergée sur **Netlify**, avec un focus sur:
- Performance maximale (PageSpeed >85)
- Support multilingue natif (FR/HE/EN)
- RTL (Right-to-Left) parfait pour l'hébreu
- Coûts minimaux (objectif <100€/mois)

**🚫 Technologies EXPLICITEMENT EXCLUES:**
- ❌ WordPress (décision client)
- ❌ Shopify
- ❌ Replit (trop cher)
- ❌ Backends complexes (Node/Express serveur dédié)

---

## 🎨 FRONTEND

### Framework Principal
- **Next.js 14** (App Router ou Pages Router selon préférence)
  - SSG (Static Site Generation) pour performance maximale
  - ISR (Incremental Static Regeneration) optionnel
  - Image optimization native avec `next/image`
  - Code splitting automatique

- **React 18**
  - Hooks (useState, useEffect, useContext)
  - Context API pour état global simple
  - Pas de Redux (overkill pour ce projet)

### Styling & Design
- **Tailwind CSS 3**
  - Utility-first pour développement rapide
  - Plugin RTL officiel: `@tailwindcss/rtl`
  - Configuration personnalisée (couleurs Breslov 🔥)
  - Responsive design mobile-first

**Tailwind Config Example:**
```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        breslov: {
          fire: '#FF6B35',      // Orange feu
          flame: '#F7931E',     // Flamme
          light: '#FFC857',     // Lumière
          dark: '#2B2D42',      // Sombre
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/rtl'),
  ]
}
```

### Typographie
- **Google Fonts:**
  - Hébreu: Heebo (support RTL excellent)
  - Français/Anglais: Inter ou Open Sans
  - Fallbacks système pour performance

---

## 🌍 INTERNATIONALISATION (i18n)

### Librairie: next-i18next
- Basé sur i18next (standard industrie)
- Support SSG/SSR Next.js
- Détection langue automatique
- Changement langue sans rechargement

**Structure Fichiers:**
```
/public
  /locales
    /fr
      common.json
      books.json
      audio.json
    /he
      common.json
      books.json
      audio.json
    /en
      common.json
      books.json
      audio.json
```

**Configuration:**
```javascript
// next-i18next.config.js
module.exports = {
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'he', 'en'],
  },
  localePath: './public/locales',
  reloadOnPrerender: process.env.NODE_ENV === 'development',
}
```

### Support RTL (Hébreu)
- Direction automatique via `dir="rtl"` sur `<html>`
- Tailwind utilities: `rtl:text-right`, `ltr:ml-4`
- Layouts miroirs pour navigation/grids
- Test sur navigateurs support RTL natif

---

## 🛒 E-COMMERCE (Minimaliste)

### Phase 1 (Semaine 1): Liens Externes
- **Pas de panier d'achat complet**
- Catalogue produits statique (SSG)
- Composant `<BookCard />` avec:
  - Image optimisée (next/image)
  - Description trilingue
  - Bouton CTA → lien externe boutique partenaire

**Boutiques Partenaires Potentielles:**
- Breslov.co.il
- Ebay store Keren
- Amazon (si applicable)

### Phase 2 (Optionnel): Stripe Integration
- **Stripe Checkout** (hosted, sécurisé)
- Mode "donation" (nonprofit rate: 2.2%)
- Pas de gestion stock/inventaire
- Webhooks pour confirmation emails

**Avantages Stripe:**
- PCI compliance automatique
- Support multi-devises (€/$/₪)
- Récurrences (dons mensuels)
- Dashboard analytics

---

## 🎧 AUDIO (Shiurim)

### Player Custom HTML5
- Composant React `<AudioPlayer />`
- API HTML5 `<audio>` native
- Contrôles personnalisés:
  - Play/Pause
  - Volume slider
  - Progress bar (seek)
  - Vitesse lecture (0.5x → 2x)

### Hébergement Audio
**Option 1: Torahcasts.com (Recommandé)**
- Plateforme spécialisée Torah
- URLs stables
- Bandwidth gratuit
- Embed facile

**Option 2: Upload Direct**
- `/public/audio/*.mp3`
- CDN Cloudflare (cache)
- Compression: 128kbps MP3 (balance qualité/taille)

**Structure Data:**
```javascript
// /data/shiurim.json
[
  {
    "id": 1,
    "title": {
      "fr": "Likutei Moharan - Torah 1",
      "he": "ליקוטי מוהר\"ן - תורה א",
      "en": "Likutei Moharan - Torah 1"
    },
    "speaker": "Rabbi Yaakov Meir",
    "duration": "45:32",
    "url": "https://torahcasts.com/...",
    "language": "he"
  }
]
```

---

## 🚀 HÉBERGEMENT & DÉPLOIEMENT

### Netlify (Production)
**Pourquoi Netlify:**
- ✅ Centaines d'heures déjà investies (haesh-sheli.netlify.app)
- ✅ Deploy automatique Git push
- ✅ CDN global (Cloudflare)
- ✅ HTTPS gratuit (Let's Encrypt)
- ✅ Formulaires natifs (contact)
- ✅ Redirects/Rewrites (i18n routing)

**Configuration Netlify:**
```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[[redirects]]
  from = "/*"
  to = "/fr/:splat"
  status = 302
  conditions = {Language = ["fr"]}
  force = false
```

**Variables Environnement:**
- `NEXT_PUBLIC_SITE_URL`
- `STRIPE_PUBLISHABLE_KEY` (si Phase 2)
- `STRIPE_SECRET_KEY` (si Phase 2)

### Domaine
- **Production**: www.haesh-sheli.co.il
- **Dev Preview**: haesh-sheli.netlify.app
- DNS: Cloudflare (proxy + cache)

---

## 🎨 DESIGN & CONTENT

### Figma
- Maquettes initiales (si temps)
- Design system (couleurs, typo, composants)
- Prototypes interactifs

### Builder.io (Post-lancement)
- Édition visuelle contenu (Jacob)
- Drag-and-drop composants
- A/B testing pages
- Pas de code requis

**Intégration:**
```bash
npm install @builder.io/react
```

```javascript
// Configuration
import { builder } from '@builder.io/react'
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY)
```

### GenSpark (Code Generation)
- Génération composants React rapides
- Utilisation ponctuelle (pas systématique)
- Validation code par Claude Code/Cursor

---

## 🤖 AI & AUTOMATION (Phase 3 - Optionnel)

### ElevenLabs (Text-to-Speech)
- Narration textes en hébreu
- Voix réalistes (Rabbi virtuel)
- API: `elevenlabs.io/api`
- Coût: ~$22/mois (Creator plan)

### HeyGen (Avatars Vidéo)
- Avatar parlant Rabbi Nachman (illustratif)
- Lipsync hébreu
- Coût: ~$50-100/mois
- **REPORTÉ** à Phase 3 pour économies

### OpenAI (Chat Contextuel)
- Assistant virtuel questions Torah
- RAG (Retrieval Augmented Generation) sur corpus Breslov
- Modèle: GPT-4 Turbo
- Coût: ~$50/mois usage modéré

---

## 💾 DONNÉES & CONTENU

### Gestion Contenu
**Option 1: JSON Statiques (Phase 1)**
- `/data/books.json`
- `/data/shiurim.json`
- Build-time generation

**Option 2: CMS Headless (Phase 2)**
- Strapi (self-hosted gratuit)
- Contentful (plan gratuit limité)
- Sanity.io (plan gratuit généreux)

### Base de Données
**Pas de BDD pour Phase 1** (SSG pur)

**Phase 2 (si dons Stripe):**
- Supabase (PostgreSQL gratuit)
- Ou Firebase Firestore
- Juste pour tracking dons/utilisateurs

---

## 📊 ANALYTICS & MONITORING

### Google Analytics 4
- Tracking pages vues
- Événements: clics CTA, lecture audio
- Conversions: dons, téléchargements

### Uptime Monitoring
- UptimeRobot (gratuit, 50 monitors)
- Notifications email/SMS si down

### Performance Monitoring
- Lighthouse CI (automated tests)
- Netlify Analytics (built-in)

---

## 🛠️ DÉVELOPPEMENT (Local)

### IDE & Outils
- **Claude Code**: Architecture, logique métier
- **Cursor**: Édition code rapide
- **VS Code**: Alternative
- **Git**: Version control (GitHub)

### Scripts NPM
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "export": "next export",
    "deploy": "netlify deploy --prod"
  }
}
```

### Environnement Local
```bash
# Installation
npm install

# Développement (http://localhost:3000)
npm run dev

# Build production local
npm run build
npm start

# Deploy Netlify CLI
npm run deploy
```

---

## 💰 BUDGET MENSUEL ESTIMÉ

| Service | Plan | Coût/mois |
|---------|------|-----------|
| **Netlify** | Pro (si trafic élevé) | $19 ou gratuit |
| **Cloudflare** | Free | $0 |
| **Domaine** | .co.il renewal | ~$15/an |
| **Stripe** | Pay-as-you-go | 2.2% + €0.25/transaction |
| **Builder.io** | Free tier | $0 (début) |
| **Total Phase 1** | | **$0-25/mois** |

**Phase 3 (avec AI):**
- + ElevenLabs: $22/mois
- + HeyGen: $50/mois
- + OpenAI: $50/mois
- = **~$150/mois total**

---

## 🔒 SÉCURITÉ

### HTTPS
- Certificat SSL automatique (Netlify)
- Redirection HTTP → HTTPS forcée

### Formulaires
- Protection spam (Netlify Forms + honeypot)
- Validation côté client + serveur

### Paiements
- PCI DSS compliance via Stripe
- Jamais de données carte stockées

---

## 📱 RESPONSIVE & PWA

### Breakpoints Tailwind
- **Mobile**: < 640px (sm)
- **Tablet**: 640-1024px (md/lg)
- **Desktop**: > 1024px (xl)

### PWA (Optionnel)
- Manifest.json
- Service worker (cache offline)
- Installable app (Android/iOS)

---

## 🧪 TESTING

### Tests Manuels (Phase 1)
- Cross-browser: Chrome, Safari, Firefox, Edge
- Mobile: iPhone (Safari), Android (Chrome)
- RTL: Tester en hébreu natif

### Tests Automatisés (Phase 3)
- Jest + React Testing Library
- Cypress (E2E)
- Lighthouse CI (performance)

---

## 📚 DOCUMENTATION

### Pour Développeurs
- Ce fichier (TECH_STACK.md)
- `/docs/ROADMAP_1_WEEK.md`
- `/docs/requirements/REQUIREMENTS_V2.0.md`

### Pour Jacob (Utilisateur)
- `/docs/USER_GUIDE.md` (à créer)
- Vidéos tutoriels Builder.io
- Documentation inline code

---

**🔥 Stack validée et optimisée pour 1 semaine de dev! 🔥**

> *Basé sur centaines d'heures d'expérience haesh-sheli.netlify.app*
