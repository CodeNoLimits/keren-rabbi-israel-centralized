# 🚀 DÉPLOYER SUR NETLIFY - INSTRUCTIONS EXACTES

## ⚠️ La CLI Netlify a un bug - Utilise l'interface web (2 minutes)

---

## 📋 ÉTAPE PAR ÉTAPE

### 1. Ouvre Netlify
**URL:** https://app.netlify.com/teams/codenolimits/sites

### 2. Nouveau Site
- Clique **"Add new site"** (bouton vert en haut à droite)
- Sélectionne **"Import an existing project"**

### 3. Connecter GitHub
- Clique **"Deploy with GitHub"**
- Si demandé, autorise Netlify à accéder à tes repos

### 4. Sélectionner le Repo
- Cherche: **keren-rabbi-israel-centralized**
- Clique sur le repo pour le sélectionner

### 5. Configuration Build (AUTO-DÉTECTÉE)

Netlify va lire `netlify.toml` et remplir automatiquement:

```
Site name: keren-rabbi-israel-centralized (ou laisse vide pour random)
Branch to deploy: main
Build command: npm run build
Publish directory: dist/public
```

✅ **NE CHANGE RIEN** - C'est déjà configuré dans netlify.toml!

### 6. Variables Environnement (OPTIONNEL - Skip pour MVP)

Pour l'instant, **NE METS RIEN**.

Le site fonctionne sans variables pour le catalogue statique.

Tu pourras ajouter plus tard:
- Site settings → Environment variables → Add variable

### 7. DEPLOY!

Clique le gros bouton **"Deploy keren-rabbi-israel-centralized"**

---

## ⏱️ Attendre le Build (2-3 minutes)

Netlify va:
1. ✅ Clone le repo GitHub
2. ✅ Détecte Node 20 (via netlify.toml)
3. ✅ Run `npm install` (~60s)
4. ✅ Run `npm run build` (~30s)
5. ✅ Déploie `dist/public`
6. ✅ Génère URL: https://[random-id].netlify.app

**Tu verras en temps réel:**
- "Building" → en cours
- "Published" → ✅ EN LIGNE!

---

## ✅ URL FINALE

Une fois terminé, tu verras:

**URL Preview:**
```
https://[random-hash].netlify.app
```

Exemple:
```
https://keren-rabbi-israel-abc123.netlify.app
```

**Clique dessus pour voir le site live!**

---

## 🎯 QUE FAIRE SI ÇA ÉCHOUE?

### Build Failed?

1. **Clique sur le deploy qui a échoué**
2. **Scroll dans les logs** pour voir l'erreur
3. **Cherche la ligne rouge** avec "Error"

**Erreurs communes:**

#### "Module not found"
→ Manque une dépendance dans package.json
→ Solution: Ajouter la dépendance et re-push

#### "Command failed: npm run build"
→ Le build échoue localement aussi
→ Solution: Tester `npm run build` sur ton Mac d'abord

#### "Publish directory not found"
→ dist/public n'existe pas après build
→ Solution: Vérifier vite.config.ts (déjà correct normalement)

---

## 📱 APRÈS LE DÉPLOIEMENT

### Teste le Site

**Pages à vérifier:**
1. ✅ Home: https://[ton-url].netlify.app/
2. ✅ Store: https://[ton-url].netlify.app/store
3. ✅ About: https://[ton-url].netlify.app/about
4. ✅ Downloads: https://[ton-url].netlify.app/downloads

**Langues à tester:**
- Français (défaut)
- English
- עברית (hébreu RTL)
- Español
- Русский

### Custom Domain (Plus Tard)

1. **Dans Netlify:** Site settings → Domain management
2. **Add custom domain:** haesh-sheli.co.il
3. **Configure DNS:** Pointer vers Netlify
4. **HTTPS:** Auto-activé (gratuit)

---

## 🔑 VARIABLES ENVIRONNEMENT (Jour 2+)

**Quand tu veux activer le backend:**

1. **Site settings** → **Environment variables**
2. **Add variable:**

```bash
# Database (Jour 2)
DATABASE_URL=postgresql://user:pass@host/db

# Chat AI (Jour 4)
OPENAI_API_KEY=sk-...
GEMINI_API_KEY=...

# Paiements (Jour 5)
STRIPE_SECRET_KEY=sk_live_...
```

3. **Redeploy:** Triggers → Deploy site

---

## ✅ CHECKLIST SUCCÈS

- [ ] Site créé sur Netlify
- [ ] Build passe (vert)
- [ ] URL live accessible
- [ ] Page Home s'affiche
- [ ] Navigation fonctionne
- [ ] Langues switchent correctement
- [ ] Mobile responsive OK

**Une fois tout ✅ → Site MVP EN LIGNE!** 🎉

---

## 🆘 BESOIN D'AIDE?

**Si vraiment bloqué:**

1. **Regarde les logs Netlify** (très détaillés)
2. **Screenshot de l'erreur** et envoie à Claude Code
3. **Alternative:** Utilise le site existant https://haesh-sheli.netlify.app

---

## 🔥 Na Nach Nachma Nachman Meuman!

**Temps total:** 2-3 minutes
**Difficulté:** Facile
**Coût:** $0 (gratuit)

---

🤖 **Claude Code** - Instructions de déploiement
📅 **Date:** 26 Octobre 2025
