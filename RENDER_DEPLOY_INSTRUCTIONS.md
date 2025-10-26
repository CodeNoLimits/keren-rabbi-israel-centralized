# 🚀 DÉPLOYER SUR RENDER.COM

## ✅ Configuration Prête

Le projet est maintenant 100% prêt pour Render deployment avec:
- ✅ render.yaml configuré
- ✅ /api/health endpoint actif
- ✅ start:prod script
- ✅ Code pushé sur GitHub

---

## 📋 ÉTAPES POUR DÉPLOYER

### 1. Créer Compte Render (si pas déjà fait)

Aller sur: https://render.com
- Sign up avec GitHub
- Autoriser Render à accéder aux repos

### 2. Créer Nouveau Web Service

1. Dashboard → **"New"** → **"Web Service"**
2. **Connect GitHub repository**: `keren-rabbi-israel-centralized`
3. Si le repo n'apparaît pas, cliquer "Configure account" et autoriser le repo

### 3. Configuration Auto-Détectée

Render va lire `render.yaml` automatiquement et remplir:

```
Name: keren-rabbi-israel
Region: Oregon (ou le plus proche)
Branch: main
Build Command: npm install && npm run build
Start Command: npm run start:prod
```

✅ **Ne rien changer** - Tout est déjà configuré!

### 4. Variables d'Environnement (OPTIONNEL pour MVP)

**Pour l'instant, SKIP ces variables** (on peut ajouter après):

```bash
DATABASE_URL=          # Supabase - Jour 2
OPENAI_API_KEY=        # Chat AI - Jour 4
GEMINI_API_KEY=        # Chat AI - Jour 4
STRIPE_SECRET_KEY=     # Paiements - Jour 5
```

**Note**: Le site fonctionne sans pour le catalogue statique

### 5. Créer le Service

Cliquer **"Create Web Service"**

Render va:
1. ✅ Clone le repo GitHub
2. ✅ Détecte Node 20 (auto)
3. ✅ Run `npm install` (~90s)
4. ✅ Run `npm run build` (~30s)
5. ✅ Run `npm run start:prod` (démarre serveur)
6. ✅ Health check sur `/api/health`
7. ✅ Génère URL: https://keren-rabbi-israel.onrender.com

**Temps total**: 3-5 minutes

---

## ✅ RÉSULTAT ATTENDU

**URL live**: https://keren-rabbi-israel.onrender.com

**Features actives:**
- ✅ Frontend complet (20 pages React)
- ✅ Backend Express API (38+ endpoints)
- ✅ Health check endpoint
- ✅ i18n 5 langues (HE/EN/FR/ES/RU)
- ✅ Responsive mobile
- ✅ PWA offline

**Limitations Free Tier:**
- ⏸️ Service s'endort après 15 min inactivité
- ⏸️ Redémarre au prochain hit (délai ~30s)
- ✅ 750h/mois gratuit (suffisant pour MVP)

---

## 🔍 VÉRIFIER LE DÉPLOIEMENT

### 1. Attendre que le build termine

Dans Render Dashboard:
- **"Building"** → En cours
- **"Live"** → ✅ EN LIGNE!

### 2. Tester l'URL

```bash
# Health check
curl https://keren-rabbi-israel.onrender.com/api/health

# Should return:
{
  "status": "healthy",
  "timestamp": "...",
  "uptime": ...,
  "environment": "production",
  "version": "1.0.0",
  "service": "keren-rabbi-israel"
}
```

### 3. Tester le Site

Ouvrir dans navigateur:
- https://keren-rabbi-israel.onrender.com/
- https://keren-rabbi-israel.onrender.com/store
- https://keren-rabbi-israel.onrender.com/downloads

---

## 🐛 SI ÇA NE MARCHE PAS

### Build échoue?

1. **Clique sur le deploy qui a échoué**
2. **Regarde les logs** détaillés
3. **Cherche "Error"** dans les logs

**Erreurs communes:**

#### "Module not found"
→ Manque dépendance dans package.json
→ Solution: Ajouter la dépendance et re-push

#### "Command failed: npm run build"
→ Le build échoue localement aussi
→ Solution: Tester `npm run build` sur ton Mac d'abord

#### "Health check failed"
→ `/api/health` ne répond pas
→ Solution: Vérifier que server/routes.ts a bien la route

### Site 404 après déploiement?

→ Attendre 1-2 minutes (propagation DNS)
→ Vider cache navigateur (Cmd+Shift+R)
→ Essayer mode incognito

### Service s'endort trop vite?

→ C'est normal sur Free Tier (après 15 min)
→ Solution: Upgrade vers plan payant ($7/mois)
→ Ou: Utiliser uptime monitoring gratuit (cron-job.org)

---

## 📊 LOGS ET MONITORING

### Voir les logs en temps réel

Dashboard → Service → **"Logs"**
- Logs live du serveur
- Erreurs en rouge
- Requêtes HTTP

### Redémarrer le service

Dashboard → Service → **"Manual Deploy"** → "Clear build cache & deploy"

---

## 🔧 APRÈS LE DÉPLOIEMENT

### Activer Auto-Deploy

✅ **Déjà actif!** Render détecte les push GitHub automatiquement.

Chaque fois que tu push sur `main`:
1. Render lance un nouveau build
2. Si succès → déploie automatiquement
3. Si échec → garde l'ancienne version

### Ajouter Custom Domain (Plus Tard)

1. **Dashboard** → **Service** → **Settings** → **Custom Domains**
2. **Add Custom Domain**: haesh-sheli.co.il
3. **Configure DNS** chez ton registrar:
   ```
   CNAME haesh-sheli.co.il → keren-rabbi-israel.onrender.com
   ```
4. **HTTPS**: Auto-activé (gratuit Let's Encrypt)

---

## 📋 CHECKLIST DÉPLOIEMENT

- [ ] Compte Render créé
- [ ] Repo GitHub connecté
- [ ] Web Service créé
- [ ] Build passe (vert)
- [ ] Health check OK
- [ ] URL live accessible
- [ ] Pages principales testées
- [ ] Langues (FR/EN/HE) fonctionnent

**Une fois tout ✅ → Site MVP EN PRODUCTION!** 🎉

---

## 🔥 Na Nach Nachma Nachman Meuman!

**Temps total**: 5 minutes
**Coût**: $0 (free tier)

---

🤖 **Claude Code** - https://claude.com/claude-code
📅 **Date**: 26 Octobre 2025
