# 🔥 Keren Cursor - HaEsh Sheli

**Site du Keren Rabbi Israël Dov Odesser**

Site e-commerce pour la diffusion des livres de Rabbi Nachman de Breslev dans le monde entier.

---

## 🌐 URLs

- **Site Production:** https://keren-cursor.netlify.app
- **Site Preview (branche Keren5.5.5):** https://keren-cursor-5-5-5.netlify.app
- **Dashboard Netlify:** https://app.netlify.com/sites/keren-cursor
- **Repo GitHub:** https://github.com/CodeNoLimits/keren-rabbi-israel-centralized

---

## 🛠️ Stack Technique

- **Frontend:** React + Vite + TypeScript
- **Backend:** Express + Node.js
- **Styling:** Tailwind CSS + shadcn/ui
- **Database:** Supabase (PostgreSQL)
- **E-commerce:** Shopify Storefront API
- **Deployment:** Netlify
- **Nom Netlify:** Keren Cursor

---

## 🚀 Développement Local

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Build production
npm run build

# Lancer en production
npm start
```

---

## 📋 Structure du Projet

```
keren-original-backup/
├── client/          # Frontend React + Vite
│   ├── src/
│   │   ├── pages/   # Pages principales
│   │   ├── components/  # Composants réutilisables
│   │   └── contexts/    # Contextes React
├── server/          # Backend Express
│   ├── routes.ts    # Routes API
│   └── index.ts     # Point d'entrée serveur
├── shared/          # Code partagé
└── netlify.toml     # Configuration Netlify
```

---

## 🌍 Branches Git

- **main** : Production stable
- **Keren5.5.5** : Branche de développement avec fixes et améliorations

---

## 🔄 Déploiement

### Déploiement automatique (via GitHub)

Push sur `main` → Auto-deploy sur Netlify "Keren Cursor"

### Déploiement manuel

```bash
npm run build
netlify deploy --prod --dir=dist/public --site=keren-cursor
```

### Déploiement preview (branche Keren5.5.5)

```bash
git checkout Keren5.5.5
npm run build
netlify deploy --dir=dist/public --site=keren-cursor --alias keren-cursor-5-5-5
```

---

## 📚 Documentation

- **Workflow Optimal:** Voir `WORKFLOW_OPTIMAL_48H.md`
- **Audit Site:** Voir `AUDIT_SITE_KEREN.md`
- **Fixes Immédiats:** Voir `FIXES_CURSOR_IMMEDIATS.md`

---

## 🎯 Objectifs

- Diffuser les enseignements de Rabbi Nachman de Breslev
- Vendre des livres physiques et numériques
- Organiser des loteries pour collecter des fonds
- Permettre les dons récurrents (hora'at keva)

---

**נ נח נחמ נחמן מאומן ✨**

**Marqueur: 555**
