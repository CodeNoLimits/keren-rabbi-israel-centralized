# 🚀 DÉPLOIEMENT RENDER - GUIDE RAPIDE

## ✅ Tout est Prêt!

- ✅ `render.yaml` configuré
- ✅ `/api/health` endpoint actif
- ✅ `start:prod` script prêt
- ✅ Code poussé sur GitHub
- ✅ Port dynamique configuré (PORT env var)

---

## 📋 DÉPLOIEMENT EN 3 ÉTAPES

### 1. Aller sur Render.com

👉 **https://render.com**

- Créer un compte (si pas déjà fait) avec GitHub
- Autoriser l'accès au repo `keren-rabbi-israel-centralized`

### 2. Créer le Web Service

1. Dashboard → **"New"** → **"Web Service"**
2. **Connect repository**: Sélectionner `CodeNoLimits/keren-rabbi-israel-centralized`
3. Render va **auto-détecter** `render.yaml` et remplir:
   ```
   Name: keren-rabbi-israel
   Region: Oregon
   Branch: main
   Build Command: npm install && npm run build
   Start Command: npm run start:prod
   Health Check Path: /api/health
   ```

✅ **Ne rien changer** - Tout est déjà configuré!

### 3. Créer le Service

Cliquer **"Create Web Service"**

**Temps**: 3-5 minutes

---

## ✅ URL ATTENDUE

**URL Live**: https://keren-rabbi-israel.onrender.com

**Health Check**: https://keren-rabbi-israel.onrender.com/api/health

---

## 🔍 VÉRIFICATION

### 1. Attendre que le build termine

Dashboard Render:
- **"Building"** → En cours
- **"Live"** → ✅ EN LIGNE!

### 2. Tester

```bash
# Health check
curl https://keren-rabbi-israel.onrender.com/api/health

# Devrait retourner:
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

## 📊 FEATURES ACTIVES

✅ Frontend complet (20 pages React)
✅ Backend Express API (38+ endpoints)
✅ Health check endpoint
✅ i18n 5 langues (HE/EN/FR/ES/RU)
✅ Responsive mobile
✅ PWA offline

---

## ⚠️ LIMITATIONS FREE TIER

- ⏸️ Service s'endort après 15 min inactivité
- ⏸️ Redémarre au prochain hit (délai ~30s)
- ✅ 750h/mois gratuit (suffisant pour MVP)

---

## 🔄 AUTO-DEPLOY

✅ **Déjà activé!** Render détecte automatiquement les push GitHub.

Chaque push sur `main`:
1. Render lance un nouveau build
2. Si succès → déploie automatiquement
3. Si échec → garde l'ancienne version

---

## 🐛 SI ÇA NE MARCHE PAS

### Build échoue?

1. Cliquer sur le deploy qui a échoué
2. Regarder les logs détaillés
3. Chercher "Error" dans les logs

**Erreurs communes:**
- "Module not found" → Vérifier package.json
- "Command failed: npm run build" → Tester localement d'abord
- "Health check failed" → Vérifier que /api/health existe

### Service s'endort?

→ Normal sur Free Tier (après 15 min)
→ Solution: Upgrade vers plan payant ($7/mois)
→ Ou: Utiliser uptime monitoring gratuit

---

## 📋 CHECKLIST

- [ ] Compte Render créé
- [ ] Repo GitHub connecté
- [ ] Web Service créé
- [ ] Build passe (vert)
- [ ] Health check OK
- [ ] URL live accessible
- [ ] Pages principales testées
- [ ] Langues (FR/EN/HE) fonctionnent

**Une fois tout ✅ → Site EN PRODUCTION!** 🎉

---

🤖 **Déployé via GitHub**: https://github.com/CodeNoLimits/keren-rabbi-israel-centralized
📅 **Date**: 2 Novembre 2025

