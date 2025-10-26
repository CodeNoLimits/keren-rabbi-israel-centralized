# 🔥 Keren Rabbi Israel - Site Centralisé

> **"האש שלי תבער עד ביאת המשיח"** - Rabbi Nachman de Breslov

## 📋 Vue d'Ensemble

**Keren Rabbi Israel** (Haesh Sheli) est une plateforme e-commerce multilingue dédiée à la distribution des livres et enseignements de **Rabbi Nachman de Breslov**. 

Ce dépôt centralisé consolide 3 repos existants:
- github.com/CodeNoLimits/haesh-sheli (principal - 95% complet)
- github.com/CodeNoLimits/HaeshSheliOriginal (legacy)
- github.com/CodeNoLimits/haesh-sheli-store (tests)

### 🎯 Mission
- Diffuser gratuitement les enseignements de Rabbi Nachman
- Vendre livres physiques et numériques (161+ produits)
- Offrir 49+ téléchargements gratuits (PDF hébreu/anglais/français)
- Chat IA contextuel basé sur les enseignements

---

## ⚡ Quick Start

\`\`\`bash
# 1. Installation
npm install

# 2. Configuration environnement
cp .env.example .env
# Remplir les clés API (Stripe, OpenAI, Gemini, Supabase)

# 3. Démarrage développement
npm run dev
# → http://localhost:5000

# 4. Build production
npm run build
\`\`\`

---

## 🏗️ Stack Technique

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Express.js + TypeScript
- **Database**: PostgreSQL (Supabase) - 27 tables
- **ORM**: Drizzle ORM
- **Styling**: Tailwind CSS 3 + RTL support
- **UI**: Shadcn/ui (45+ composants)
- **i18n**: Custom LanguageContext (HE/EN/FR/ES/RU)
- **State**: React Context (Cart, Language)
- **Routing**: Wouter 3.3.5

### Features Clés
- ✅ Multilingue RTL (5 langues)
- ✅ E-commerce complet (Stripe)
- ✅ 49 téléchargements PDF gratuits
- ✅ AI Chat (Gemini + OpenAI)
- ✅ Shiurim audio/vidéo
- ✅ Newsletter + Reviews + Wishlist
- ✅ PWA offline-ready

---

## 📊 État: 95% Complet

### ✅ Terminé
- Frontend: 21 pages fonctionnelles
- Backend: 27 tables + API complète
- i18n: 5 langues (HE/EN/FR/ES/RU)
- E-commerce: Catalogue 161 produits
- Content: 49 livres PDF gratuits
- AI: Chat contextuel Breslov

### 🚧 À Finaliser (5%)
- [ ] Push database schema → Supabase prod
- [ ] Seed produits + downloads
- [ ] Optimiser images (WebP)
- [ ] Fine-tuning RTL hébreu
- [ ] Déploiement production
- [ ] Tests + Formation client (2h)

---

## 📁 Structure

\`\`\`
keren-rabbi-israel-centralized/
├── client/           # React/Vite frontend
│   ├── src/
│   │   ├── components/   # 55+ composants UI
│   │   ├── pages/        # 21 pages
│   │   ├── contexts/     # State management
│   │   └── data/         # Products, downloads
│   └── index.html
│
├── server/           # Express.js backend
│   ├── routes.ts         # 38+ API endpoints
│   ├── geminiService.ts  # AI Gemini
│   ├── openaiService.ts  # AI OpenAI
│   └── emailService.ts   # Resend emails
│
├── shared/
│   └── schema.ts         # Drizzle schema (27 tables)
│
├── docs/                 # Documentation
│   ├── PLAN_COMPLET_EXECUTION.md (15K words)
│   ├── ROADMAP_1_WEEK.md
│   ├── INVENTORY_BOOKS.csv (49 livres)
│   └── requirements/
│
└── public/images/books/  # 222 couvertures JPG
\`\`\`

---

## 🗄️ Base de Données (27 Tables)

**E-commerce**: products, orders, order_items, cart_items
**Contenu**: downloads, shiurim, wisdoms, magazine_articles
**Users**: users, sessions, user_preferences
**Engagement**: product_reviews, user_wishlist, newsletter_subscribers
**Subscriptions**: subscription_plans, user_subscriptions
**Admin**: analytics_events, admin_logs, email_templates

Voir \`supabase-setup.sql\` pour schema complet.

---

## 🌍 i18n - 5 Langues

Implémentation custom dans \`client/src/contexts/LanguageContext.tsx\`:

- **Hébreu (he)** - RTL, langue principale
- **Anglais (en)** - Complet
- **Français (fr)** - Complet
- **Espagnol (es)** - Complet
- **Russe (ru)** - Complet

Features RTL automatiques pour hébreu (flex-row-reverse, ms-/me- margins, text-right).

---

## 📚 Inventaire: 49 Livres

Voir \`docs/INVENTORY_BOOKS.csv\` pour liste complète.

**Catégories**:
1. Likutey Moharan (Volumes I & II)
2. Prières (Likutey Tefilot, Tikkun HaKlali)
3. Pratique (Likutey Eitzos, Sefer HaMiddot)
4. Biographies (Chayei, Shivchei, Sichot HaRan)
5. Contes (Sippurei Maasiyot)
6. Brochures (18x EN/HE 64-80 pages)
7. Avancés (Likutey Halachos 4+ volumes)

**Assets**: 222 images JPG couvertures (\`public/images/books/\`)

---

## 🚀 Déploiement Netlify

**Sites**:
- Dev: https://haesh-sheli.netlify.app
- Prod: https://www.haesh-sheli.co.il

**Auto-deploy**: Push vers \`main\` → deploy automatique

**Env variables** (Netlify UI):
- DATABASE_URL (Supabase)
- STRIPE_SECRET_KEY
- OPENAI_API_KEY
- GEMINI_API_KEY
- RESEND_API_KEY

---

## 🛠️ Commandes

\`\`\`bash
npm run dev          # Dev server :5000
npm run build        # Build production
npm run db:push      # Push schema Supabase
npm run db:studio    # GUI Drizzle Studio
npm run lint         # ESLint
npm run deploy       # Deploy Netlify
\`\`\`

---

## 📞 Contacts

**Client**: Jacob Henne - Keren Rabbi Israel
**Dev**: David + Claude Code + Cursor
**Traducteur**: Ghezi (EN/HE)

---

## 📖 Documentation Complète

- \`PLAN_COMPLET_EXECUTION.md\` - Plan 10 jours (44h45)
- \`ROADMAP_1_WEEK.md\` - Roadmap MVP 7 jours
- \`docs/requirements/REQUIREMENTS_V2.0.md\` - Specs (800 lignes)
- \`docs/architecture/TECH_STACK.md\` - Stack détaillé (600 lignes)
- \`PROGRESS_REPORT.md\` - Status temps réel

---

## 🔥 Na Nach Nachma Nachman Meuman!

> *"La joie est grande, l'obscurité se dissipe!"* — Rabbi Nachman de Breslov

---

**Claude Code** - https://claude.com/claude-code
**Consolidation**: 26 Octobre 2025 | **Version**: 1.0.0
