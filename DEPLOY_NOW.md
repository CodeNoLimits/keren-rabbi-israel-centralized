# 🚀 Déploiement Immédiat - Netlify & Render

## ✅ **Configuration Terminée**

Les fichiers de configuration sont prêts avec la clé OpenRouter.

---

## 🌐 **NETLIFY - Déploiement**

### Option 1 : Via Netlify CLI (Maintenant)

```bash
cd keren-original-backup

# 1. Se connecter à Netlify (si pas déjà connecté)
netlify login

# 2. Lier au site existant ou créer un nouveau site
netlify link
# Ou créer nouveau site :
# netlify init

# 3. Ajouter la variable d'environnement OpenRouter
netlify env:set OPENROUTER_API_KEY "[CLÉ_API_MASQUÉE]"

# 4. Déployer
netlify deploy --prod
```

### Option 2 : Via Netlify Dashboard

1. **Aller sur** : https://app.netlify.com
2. **Sélectionner site** : "Keren Cursor" ou créer nouveau
3. **Site settings** → **Environment variables**
4. **Add variable** :
   - Name: `OPENROUTER_API_KEY`
   - Value: `[CLÉ_API_MASQUÉE]`
   - Scope: All scopes
5. **Deploys** → **Trigger deploy** → **Deploy site**

---

## 🖥️ **RENDER - Déploiement**

### Option 1 : Via Render Dashboard

1. **Aller sur** : https://dashboard.render.com
2. **Nouveau service** → **Web Service**
3. **Connecter votre repo** (GitHub/GitLab) ou **Deploy from public Git repository**
4. **Configuration** :
   - **Name** : `keren-rabbi-israel`
   - **Region** : Oregon
   - **Branch** : main/master
   - **Root Directory** : (vide = racine)
   - **Environment** : Node
   - **Build Command** : `npm install && npm run build`
   - **Start Command** : `npm run start:prod`
5. **Advanced** → **Environment Variables** :
   - Ajouter :
     - `NODE_ENV` = `production`
     - `OPENROUTER_API_KEY` = `[CLÉ_API_MASQUÉE]`
6. **Create Web Service**

### Option 2 : Via render.yaml (Automatique)

Le fichier `render.yaml` est déjà configuré avec la clé OpenRouter.

**Dans Render Dashboard :**
1. **New** → **Blueprint**
2. **Connect repo** et sélectionner `render.yaml`
3. Render détectera automatiquement la configuration
4. Créer le service

---

## ✅ **Vérification Après Déploiement**

### Netlify :
1. Aller sur votre site : `https://votre-site.netlify.app`
2. Tester `/chat`
3. Si le chat fonctionne → ✅ Succès !

### Render :
1. Aller sur votre site : `https://votre-service.onrender.com`
2. Tester `/chat`
3. Si le chat fonctionne → ✅ Succès !

---

## 📝 **Variables d'Environnement Configurées**

- ✅ `OPENROUTER_API_KEY` = Clé configurée dans les deux plateformes
- ✅ `NODE_ENV` = production
- ✅ `NODE_VERSION` = 20

---

## 🚀 **Commandes Rapides**

### Netlify :
```bash
netlify env:set OPENROUTER_API_KEY "[CLÉ_API_MASQUÉE]"
netlify deploy --prod
```

### Render :
- Configuration automatique via `render.yaml`
- Ou ajouter manuellement dans Dashboard → Environment

---

**Les deux plateformes sont prêtes !** 🎉

---

**Marqueur :** 555

