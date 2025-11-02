# 🚀 Déploiement Netlify & Render - Instructions

## ⚠️ **IMPORTANT - Sécurité**

**NE JAMAIS mettre la clé OpenRouter dans :**
- ❌ `render.yaml` (serait exposée sur Git)
- ❌ `netlify.toml` (serait exposée sur Git)
- ❌ Fichiers de documentation commités

**Utiliser uniquement :**
- ✅ Dashboard Netlify → Environment variables
- ✅ Dashboard Render → Environment variables
- ✅ Fichier `.env` local (dans .gitignore)

---

## 🌐 **NETLIFY - Déploiement**

### 1. Variable d'Environnement (Déjà fait ✅)

La variable `OPENROUTER_API_KEY` est déjà configurée via CLI.

### 2. Déploiement

```bash
cd keren-original-backup
netlify deploy --prod
```

### 3. Vérifier

- Aller sur : https://app.netlify.com/projects/kerensitefinal
- Vérifier dans **Site settings** → **Environment variables**
- Vérifier que `OPENROUTER_API_KEY` est présent
- Tester le chat après déploiement

---

## 🖥️ **RENDER - Déploiement**

### Option 1 : Via Dashboard (Recommandé - SÉCURISÉ)

1. **Aller sur** : https://dashboard.render.com
2. **New** → **Web Service**
3. **Connect repo** (GitHub/GitLab) ou **Deploy from public Git repository**
4. **Configuration** :
   - Name: `keren-rabbi-israel`
   - Region: Oregon
   - Environment: Node
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run start:prod`
5. **Environment** (IMPORTANT) :
   - Cliquer **Add Environment Variable**
   - **Key** : `OPENROUTER_API_KEY`
   - **Value** : `[VOTRE NOUVELLE CLÉ - Générer sur openrouter.ai/keys]`
   - **Save Changes**
6. **Create Web Service**

### Option 2 : Via render.yaml (Sans clé)

Le fichier `render.yaml` est configuré SANS la clé (sécurisé).

**IMPORTANT :** Ajouter manuellement `OPENROUTER_API_KEY` dans Render Dashboard.

---

## 🔑 **Générer Nouvelle Clé OpenRouter**

1. Aller sur : https://openrouter.ai/keys
2. **RÉVOQUER** l'ancienne clé exposée
3. **Générer** nouvelle clé
4. **Mettre à jour** dans :
   - `.env` (local)
   - Netlify Dashboard
   - Render Dashboard

---

## ✅ **Vérification Finale**

### Netlify :
- [ ] Variable `OPENROUTER_API_KEY` dans Dashboard
- [ ] Site déployé
- [ ] Chat fonctionne

### Render :
- [ ] Service créé
- [ ] Variable `OPENROUTER_API_KEY` dans Dashboard (PAS dans render.yaml)
- [ ] Chat fonctionne

---

**🔒 Votre clé est maintenant sécurisée !**

---

**Marqueur :** 555

