# 🔥 Keren Rabbi Israel - Site Central

> **"האש שלי תבער עד ביאת המשיח"** - Rabbi Nachman de Breslov

Site officiel multilingue de la Keren Rabbi Israel Dov Odesser pour la distribution des livres de Rabbi Nachman de Breslov.

## 🚀 Quick Start

```bash
# Installation
npm install

# Développement local
npm run dev

# Build production
npm run build

# Deploy Netlify
npm run deploy
```

## 📁 Structure du Projet

```
keren-rabbi-israel-centralized/
├── docs/               # Documentation complète
│   ├── requirements/   # Requirements V2.0 (FR/EN/HE)
│   ├── meetings/       # Transcriptions meetings
│   └── architecture/   # Stack technique
├── src/
│   ├── components/     # Composants React réutilisables
│   ├── pages/          # Pages Next.js (multilingue)
│   ├── styles/         # CSS + RTL support
│   └── lib/            # Utilitaires (AI, Stripe, i18n)
├── public/
│   ├── images/         # Images optimisées
│   ├── audio/          # Shiurim MP3
│   └── locales/        # Fichiers traduction FR/HE/EN
└── scripts/            # Scripts déploiement

```

## 🎯 Stack Technique

### Frontend
- **Framework**: Next.js 14 (React 18)
- **Styling**: Tailwind CSS + RTL plugin
- **Multilingue**: next-i18next (FR/HE/EN)
- **État**: React Context + hooks

### Intégrations
- **Paiements**: Stripe API (nonprofit 2.2%)
- **Audio**: Player HTML5 custom + Torahcasts.com
- **Hébergement**: Netlify (auto-deploy)
- **CDN**: Cloudflare (gratuit)
- **AI** (Phase 3 optionnelle):
  - ElevenLabs (Text-to-Speech hébreu)
  - HeyGen (Avatars virtuels)
  - OpenAI (Chat contextuel)

### Dev Tools
- **Design**: Figma
- **Code Gen**: GenSpark
- **Editing**: Claude Code + Cursor
- **Visual**: Builder.io

## 🌍 Multilingue (3 langues)

- **Français** (défaut): `/fr/`
- **Hébreu** (RTL): `/he/`
- **Anglais**: `/en/`

Support RTL natif pour l'hébreu avec direction automatique.

## 📦 Fonctionnalités Principales

### Phase 1 (Semaine 1) - MVP CRITIQUE
- [x] Architecture multilingue FR/HE/EN
- [x] Support RTL hébreu parfait
- [x] E-commerce minimaliste (liens externes)
- [x] Lecteur audio Shiurim basique
- [x] Design responsive mobile-first

### Phase 2 (Optionnelle si temps)
- [ ] Système dons Stripe complet
- [ ] Blog/Actualités
- [ ] Newsletter signup
- [ ] Galerie photos Hafatza

### Phase 3 (Post-lancement)
- [ ] Avatars IA (ElevenLabs + HeyGen)
- [ ] Plateforme communautaire
- [ ] Application mobile

## 🔑 Variables d'Environnement

Créer un fichier `.env.local`:

```env
# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# Builder.io (optionnel)
NEXT_PUBLIC_BUILDER_API_KEY=...

# AI APIs (Phase 3)
ELEVEN_LABS_API_KEY=...
HEYGEN_API_KEY=...
OPENAI_API_KEY=...
```

## 📊 Sources Consolidées

Ce repo centralise le travail de **3 repos existants**:
1. **haesh-sheli** - Site Netlify actuel (centaines d'heures)
2. **HaeshSheliOriginal** - Backup original
3. **haesh-sheli-store** - E-commerce spécialisé

Plus tous les documents de requirements et transcriptions meetings.

## 🚀 Déploiement Netlify

Le site est configuré pour auto-deploy sur push vers `main`:

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = ".next"
```

**URL Production**: https://haesh-sheli.netlify.app

## 👨‍💻 Développement

### Workflow Recommandé
1. **Claude Code** - Architecture et logique
2. **Cursor** - Édition code rapide
3. **Builder.io** - Édition visuelle contenu
4. **GenSpark** - Génération composants

### Commands Utiles
```bash
# Lint
npm run lint

# Format
npm run format

# Type check
npm run type-check

# Tests
npm run test
```

## 📝 Documentation Complète

- [Requirements V2.0](/docs/requirements/REQUIREMENTS_V2.0.md)
- [Architecture Technique](/docs/architecture/TECH_STACK.md)
- [Guide Multilingue](/docs/architecture/I18N_GUIDE.md)
- [Roadmap 1 Semaine](/docs/ROADMAP_1_WEEK.md)

## 🎯 Objectifs 1 Semaine

### Jours 1-2: Foundation
- Structure projet
- Setup Next.js + i18n
- Migration code critique Netlify

### Jours 3-4: Features
- E-commerce minimaliste
- Lecteur audio Shiurim
- RTL hébreu testing

### Jours 5-6: Polish
- Optimisations performance
- Tests multilingue
- Responsive mobile

### Jour 7: Launch
- Deploy production Netlify
- Formation Jacob
- Monitoring

## 📈 Métriques Succès (Post-lancement)

### Semaine 1
- Site live trilingue ✅
- 20+ produits catalogués
- 10+ Shiurim audio
- PageSpeed >85 mobile

### Mois 1
- 1,000+ visiteurs
- 30+ dons
- 5,000+ followers réseaux
- ROI pub 3:1

## 🤝 Contribution

Ce projet est développé pour la **Keren Rabbi Israel Dov Odesser**.

### Contact
- **Client**: Jacob Henne
- **Dev Lead**: David
- **Traducteur**: Ghezi (EN/HE)

## 📜 License

Ce projet est propriété de la Keren Rabbi Israel Dov Odesser.

---

**🔥 Na Nach Nachma Nachman Meuman! 🔥**

> *"My fire will burn until the coming of the Messiah"* - Rabbi Nachman of Breslov
