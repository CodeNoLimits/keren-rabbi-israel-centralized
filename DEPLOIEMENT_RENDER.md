# 🚀 GUIDE DE DÉPLOIEMENT RENDER - KEREN RABBI ISRAEL

## ✅ Configuration complète - Prêt à déployer!

### 📦 Ce qui a été fait:

1. ✅ Branche dédiée créée: `claude-render-deploy-20251102`
2. ✅ Fichier `render.yaml` optimisé créé à la racine
3. ✅ Builder.io (B6) configuré avec clé API
4. ✅ Structure PostgreSQL/Neon prête
5. ✅ Fichier de synchronisation CURSOR_SYNC.md créé

---

## 🎯 ÉTAPES DE DÉPLOIEMENT

### 1️⃣ Push vers GitHub

```bash
# Vous êtes sur la branche: claude-render-deploy-20251102
git add .
git commit -m "🚀 Render deployment config: DB + Builder.io ready"
git push origin claude-render-deploy-20251102
```

### 2️⃣ Connecter à Render.com

1. Aller sur **https://dashboard.render.com**
2. Cliquer sur **"New +"** → **"Web Service"**
3. Connecter votre repository GitHub
4. Sélectionner la branche: `claude-render-deploy-20251102`

### 3️⃣ Render détectera automatiquement `render.yaml`

Render va lire le fichier et appliquer cette configuration:
- **Name:** keren-rabbi-israel
- **Build:** `cd keren-original-backup && npm install && npm run build`
- **Start:** `cd keren-original-backup && npm run start:prod`
- **Region:** Oregon (Free)

### 4️⃣ Configurer les variables d'environnement

⚠️ **IMPORTANT:** Ajouter manuellement dans Render Dashboard → Environment:

#### A. Base de données (Neon PostgreSQL)

1. Aller sur **https://console.neon.tech**
2. Créer un nouveau projet ou utiliser existant
3. Copier la **Connection String**
4. Dans Render Dashboard → Environment, ajouter:
   ```
   Key: DATABASE_URL
   Value: postgresql://[user]:[password]@[host]/[dbname]?sslmode=require
   ```

#### B. Builder.io (B6) - Déjà configuré! ✅

La clé est déjà dans le `render.yaml`:
```
PUBLIC_BUILDER_KEY=64acbf47412843a9a0fbf6f4c8852e80
```

#### C. Services optionnels (si nécessaire)

```bash
# OpenAI (pour chat AI)
OPENAI_API_KEY=sk-...

# Gemini (pour AI alternative)
GEMINI_API_KEY=...

# Stripe (paiements)
STRIPE_SECRET_KEY=sk_live_...

# SendGrid (emails)
SENDGRID_API_KEY=SG...
```

### 5️⃣ Déployer!

1. Cliquer sur **"Create Web Service"**
2. Render va:
   - Cloner le repo
   - Installer les dépendances (`npm install`)
   - Build le projet (`npm run build`)
   - Démarrer le serveur (`npm run start:prod`)

⏱️ **Durée:** ~5-10 minutes pour le premier déploiement

---

## 🔗 URLs

Après déploiement, vous aurez:

### Production
```
https://keren-rabbi-israel.onrender.com
```

### Health Check
```
https://keren-rabbi-israel.onrender.com/api/health
```

### Builder.io Dashboard
```
https://builder.io/content
```

### Neon Database Dashboard
```
https://console.neon.tech
```

---

## 🛠️ Synchronisation avec Cursor et Builder

### Builder.io (B6)
Le site peut maintenant:
- Éditer le contenu via Builder.io CMS
- Gérer les pages dynamiquement
- Prévisualiser avant publication

### Cursor
Pour continuer à développer localement:
```bash
# Revenir sur dev/preview
git checkout dev/preview

# Merger les changements si besoin
git merge claude-render-deploy-20251102
```

---

## 📊 Monitoring

### Render Dashboard
- **Logs:** Voir les logs en temps réel
- **Metrics:** CPU, RAM, requêtes
- **Deploys:** Historique des déploiements

### Builder.io Analytics
- **Content:** Performances des pages
- **A/B Testing:** Tests automatiques
- **Insights:** Comportement utilisateur

---

## 🔄 Auto-Deploy

**Activé par défaut!** 

Chaque push sur `claude-render-deploy-20251102` déclenchera:
1. ✅ Build automatique
2. ✅ Tests santé
3. ✅ Déploiement en production

---

## ⚠️ Notes importantes

### Erreurs TypeScript détectées
17 erreurs TypeScript dans le code. **Non-bloquant pour Render**, mais à corriger:
- `use-toast` manquant
- `qr-code-styling` non installé
- Quelques types `any` à typer

### Performance
- **Free Plan:** Peut s'endormir après 15 min d'inactivité
- **Upgrade recommandé:** Pour production à fort trafic

### Base de données
- **Neon Free:** 0.5GB storage
- **Connexions:** Max 10 connexions simultanées
- **Backup:** Activer snapshots automatiques sur Neon

---

## 🎉 C'est prêt!

Tous les fichiers sont configurés. Il ne reste plus qu'à:

1. **Push vers GitHub** (commande ci-dessus)
2. **Connecter à Render** (quelques clics)
3. **Ajouter DATABASE_URL** (copier-coller depuis Neon)
4. **Déployer!** (automatique)

**Questions?** Consultez:
- Render Docs: https://render.com/docs
- Builder.io Docs: https://www.builder.io/c/docs
- Neon Docs: https://neon.tech/docs

---

🤖 **Généré par Claude Code**
📅 **Date:** 2025-11-02
🌿 **Branche:** claude-render-deploy-20251102
