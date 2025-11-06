# ✨ Commandes Magiques - Tout Automatisé !

Ce document contient TOUTES les commandes dont vous avez besoin. **C'est aussi simple que ça !**

---

## 🚀 Installation Complète (1 Commande)

```bash
npm run setup
```

Cette **UNE** commande fait TOUT :
- ✅ Installe 557 packages npm
- ✅ Crée .env avec SECRET sécurisé
- ✅ Crée dossier images
- ✅ Met à jour PostgreSQL
- ✅ Build le projet

**Temps : 2 minutes** ⏱️

---

## 🎁 Créer Un Tirage au Sort (1 Commande)

```bash
npm run init-lottery
```

Crée automatiquement un tirage actif pour le mois en cours :
- ✅ 5000 ₪ de prix
- ✅ Dates automatiques
- ✅ 18 ₪ minimum

**Temps : 30 secondes** ⏱️

---

## 🧪 Tout Tester (1 Commande)

```bash
npm run test-all
```

Vérifie que TOUT fonctionne :
- ✅ 15+ tests automatiques
- ✅ Variables d'environnement
- ✅ Base de données
- ✅ Fichiers critiques

**Temps : 10 secondes** ⏱️

---

## 🎯 Lancer Le Site (1 Commande)

```bash
npm run dev
```

Ouvre : http://localhost:5000

**Temps : 5 secondes** ⏱️

---

## ✅ Vérifier Avant Déploiement (1 Commande)

```bash
npm run deploy-check
```

Fait tout d'un coup :
- ✅ Tests complets
- ✅ Build production

Si ça passe → **Vous êtes 100% prêt !**

**Temps : 2 minutes** ⏱️

---

## 📦 Build Production (1 Commande)

```bash
npm run build
```

Crée :
- ✅ Frontend optimisé (Vite)
- ✅ Backend bundle (esbuild)
- ✅ Fichier dist/index.js

**Temps : 1 minute** ⏱️

---

## 🗄️ Mettre à Jour La DB (1 Commande)

```bash
npm run db:push
```

Applique tous les changements du schéma à PostgreSQL.

**Temps : 5 secondes** ⏱️

---

## 🚀 Scénario Complet : De Zéro à Production

### Étape 1 : Installation (2 min)

```bash
git clone https://github.com/votre-org/keren-rabbi-israel.git
cd keren-rabbi-israel
npm run setup
```

### Étape 2 : Configuration PayPal (2 min)

Ouvrez `.env` et ajoutez :

```env
PAYPAL_CLIENT_ID=votre_client_id
PAYPAL_CLIENT_SECRET=votre_secret
PAYPAL_MODE=sandbox
```

### Étape 3 : Créer Tirage (30 sec)

```bash
npm run init-lottery
```

### Étape 4 : Tester (10 sec)

```bash
npm run test-all
```

### Étape 5 : Lancer (5 sec)

```bash
npm run dev
```

### Étape 6 : Tester Donation

1. Allez sur http://localhost:5000/donate
2. Entrez 50 ₪
3. PayPal sandbox
4. ✅ Inscrit à la loterie !

### Étape 7 : Déployer

```bash
npm run deploy-check
git add .
git commit -m "Ready for production"
git push origin main
```

**TOTAL : 5 MINUTES DE ZÉRO À PRODUCTION !** 🚀

---

## 🎯 Commandes par Situation

### 🆕 Premier jour avec le projet

```bash
npm run setup
npm run init-lottery
npm run dev
```

### 📅 Début du mois (nouveau tirage)

```bash
npm run init-lottery
```

### 🐛 Quelque chose ne marche pas

```bash
npm run test-all
# Suivez les instructions affichées
```

### 🚀 Avant de déployer

```bash
npm run deploy-check
# Si OK → git push
```

### 🔧 Après avoir modifié le schéma DB

```bash
npm run db:push
```

### 📱 Tester sur mobile

```bash
npm run dev
# Puis ouvrez sur votre téléphone : http://votre-ip:5000
```

---

## 🎁 Commandes Bonus

### Tout nettoyer et recommencer

```bash
rm -rf node_modules dist .env
npm run setup
```

### Voir les logs en temps réel (production)

```bash
npm start 2>&1 | tee logs.txt
```

### Vérifier les types TypeScript

```bash
npm run check
```

---

## 📞 Commandes de Débuggage

### La DB ne se connecte pas ?

```bash
# Vérifiez DATABASE_URL
echo $DATABASE_URL

# Re-créez les tables
npm run db:push
```

### PayPal ne marche pas ?

```bash
# Vérifiez les variables
npm run test-all | grep PAYPAL
```

### Le build échoue ?

```bash
# Réinstallez tout
rm -rf node_modules
npm install
npm run build
```

---

## 🎨 Personnalisation

### Changer le prix du tirage

Éditez `scripts/init-lottery.ts` :

```typescript
prizeAmount: 1000000,  // 10,000 ₪
```

### Changer le don minimum

```typescript
minimumDonation: 3600,  // 36 ₪
```

Puis :

```bash
npm run init-lottery
```

---

## 🚀 Déploiement Render.com

### Option 1 : Automatique (Recommandé)

1. Connectez votre repo GitHub à Render
2. Render détecte `render.yaml`
3. Un clic → **Déployé !**

### Option 2 : Manuel

1. Créez un Web Service sur Render
2. Build Command : `npm run setup && npm run build`
3. Start Command : `npm start`
4. Ajoutez les variables d'environnement
5. Déployez

### Après déploiement

```bash
# Via Render Shell ou SSH
npm run init-lottery
```

---

## 📊 Résumé des Temps

| Action | Commande | Temps |
|--------|----------|-------|
| Installation complète | `npm run setup` | 2 min |
| Créer tirage | `npm run init-lottery` | 30 sec |
| Tester tout | `npm run test-all` | 10 sec |
| Lancer site | `npm run dev` | 5 sec |
| Build production | `npm run build` | 1 min |
| Déployer | `git push` | 5 min |

**TOTAL : Installation à Production = 5-10 minutes** ⚡

---

## 🎉 C'est Tout !

Avec ces commandes, vous pouvez :
- ✅ Installer en 1 commande
- ✅ Configurer en 2 minutes
- ✅ Tester en 1 commande
- ✅ Déployer en 1 commande

**Plus besoin de se souvenir de 50 commandes !** 🎊

---

## 📚 Documentation Complète

Pour en savoir plus :
- 📖 **Guide complet** : README_FR.md
- 🚀 **Démarrage 5 min** : QUICK_START.md
- 🤖 **Scripts auto** : README_AUTOMATION.md
- ✅ **Checklist** : DEPLOYMENT_CHECKLIST.md
- 🖼️ **Images** : IMAGES_INSTRUCTIONS.md

---

**Na Nach Nachma Nachman Meuman!** 🎵

*Développé avec ❤️ pour la diffusion de la Torah de Rabbi Nachman*
