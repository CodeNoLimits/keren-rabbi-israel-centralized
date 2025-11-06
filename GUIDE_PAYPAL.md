# 🚀 GUIDE COMPLET : Configuration PayPal (Pas à Pas)

## ⚠️ IMPORTANT
Je ne peux pas configurer votre compte PayPal directement. Vous devez le faire vous-même car cela nécessite vos identifiants.

**MAIS** ce guide vous montre **EXACTEMENT** chaque clic à faire. Suivez simplement les étapes ! ⏱️ **Temps : 5 minutes**

---

## 📋 CE DONT VOUS AVEZ BESOIN

- Un compte PayPal (personnel ou business)
- Accès à Internet
- 5 minutes

---

## 🎯 ÉTAPE 1 : Créer un Compte PayPal Developer (2 minutes)

### 1.1 Allez sur le site PayPal Developer

Ouvrez votre navigateur et allez sur :
```
https://developer.paypal.com
```

### 1.2 Connectez-vous

- Cliquez sur **"Log In"** (en haut à droite)
- Utilisez votre compte PayPal normal
- Si vous n'avez pas de compte, cliquez sur **"Sign Up"** d'abord

### 1.3 Acceptez les conditions

- Première connexion : Acceptez les conditions d'utilisation
- Cliquez sur **"Agree and Continue"**

✅ **Vous êtes maintenant sur le Dashboard Developer !**

---

## 🔑 ÉTAPE 2 : Créer une Application (2 minutes)

### 2.1 Aller dans Apps & Credentials

Sur le Dashboard :
1. Dans le menu de gauche, cliquez sur **"Apps & Credentials"**
2. Vérifiez que vous êtes en mode **"Sandbox"** (en haut)
   - **Sandbox** = mode test (argent fictif)
   - **Live** = mode production (vrais paiements)

### 2.2 Créer une App

Option A : **Utiliser l'app par défaut** (plus rapide)
- Vous voyez "Default Application" ? Cliquez dessus
- Passez à l'étape 2.3

Option B : **Créer une nouvelle app**
1. Cliquez sur le bouton **"Create App"** (en haut à droite)
2. Nommez votre app : `Keren Rabbi Israel Donations`
3. Type : **Merchant**
4. Cliquez sur **"Create App"**

### 2.3 Récupérer les clés API

Vous êtes maintenant sur la page de votre app. Vous voyez :

```
Client ID
─────────────────────────────────────────────────
AXpxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
[Copy]

Secret
─────────────────────────────────────────────────
ELpxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
[Show] [Copy]
```

**COPIEZ CES DEUX VALEURS :**

1. **Client ID** :
   - Cliquez sur **"Copy"** à côté du Client ID
   - Collez-le dans un fichier texte temporaire

2. **Secret** :
   - Cliquez sur **"Show"** pour afficher le secret
   - Cliquez sur **"Copy"**
   - Collez-le dans le même fichier texte

⚠️ **NE PARTAGEZ JAMAIS CES CLÉS !**

---

## 💻 ÉTAPE 3 : Ajouter les Clés dans Votre Projet (1 minute)

### 3.1 Ouvrir le fichier .env

Dans votre projet, ouvrez le fichier `.env` (à la racine)

Si le fichier n'existe pas :
```bash
npm run setup
```

### 3.2 Ajouter vos clés PayPal

Trouvez ces lignes dans `.env` :

```env
PAYPAL_CLIENT_ID=your_paypal_client_id_here
PAYPAL_CLIENT_SECRET=your_paypal_client_secret_here
PAYPAL_MODE=live
```

Remplacez par vos vraies valeurs :

```env
PAYPAL_CLIENT_ID=AXpxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
PAYPAL_CLIENT_SECRET=ELpxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
PAYPAL_MODE=sandbox
```

⚠️ **IMPORTANT** :
- `PAYPAL_MODE=sandbox` pour tester
- `PAYPAL_MODE=live` pour la production

### 3.3 Sauvegarder

- Sauvegardez le fichier `.env`
- Fermez-le

✅ **Configuration terminée !**

---

## 🧪 ÉTAPE 4 : Tester Votre Configuration (2 minutes)

### 4.1 Vérifier les variables

```bash
npm run test-all
```

Vous devriez voir :
```
✅ PAYPAL_CLIENT_ID: Configuré
✅ PAYPAL_CLIENT_SECRET: Configuré
✅ PAYPAL_MODE: sandbox
```

### 4.2 Créer des comptes de test

Pour tester les donations, vous avez besoin de comptes PayPal sandbox :

1. Sur le Dashboard Developer
2. Menu de gauche : **"Testing Tools"** → **"Sandbox accounts"**
3. Vous voyez deux comptes :
   - **Business** (pour recevoir)
   - **Personal** (pour payer)

Notez les emails et mots de passe !

### 4.3 Lancer le site

```bash
npm run dev
```

### 4.4 Tester une donation

1. Allez sur http://localhost:5000/donate
2. Entrez **50 ₪**
3. Remplissez vos infos
4. Cliquez sur **"Donate Now"**
5. Connexion PayPal : Utilisez le compte **Personal** du sandbox
6. Approuvez le paiement

✅ **Si ça marche, vous êtes inscrit à la loterie !**

---

## 🚀 ÉTAPE 5 : Passer en Production (Quand Prêt)

### 5.1 Créer des clés Live

1. Sur le Dashboard Developer
2. En haut, passez de **"Sandbox"** à **"Live"**
3. Répétez l'ÉTAPE 2 pour créer une app Live
4. Copiez les nouvelles clés (Live)

### 5.2 Mettre à jour .env

```env
PAYPAL_CLIENT_ID=votre_live_client_id
PAYPAL_CLIENT_SECRET=votre_live_secret
PAYPAL_MODE=live
```

### 5.3 Déployer

```bash
npm run deploy-check
git push origin main
```

Sur Render.com, ajoutez les mêmes variables d'environnement.

---

## 📊 VÉRIFICATION RAPIDE

Utilisez ce script pour vérifier que tout est OK :

```bash
npm run test-all | grep PAYPAL
```

Doit afficher :
```
✅ PAYPAL_CLIENT_ID: Configuré
✅ PAYPAL_CLIENT_SECRET: Configuré
✅ PAYPAL_MODE: sandbox
```

---

## 🐛 PROBLÈMES COURANTS

### ❌ "PAYPAL_CLIENT_ID non configuré"

**Solution** : Vérifiez que vous avez bien copié le Client ID dans `.env`

### ❌ "Payment failed: Authentication failed"

**Solution** :
- Vérifiez que le Secret est correct
- Pas d'espaces avant/après les valeurs
- Mode sandbox/live correspond aux clés

### ❌ "PayPal order creation failed"

**Solution** :
- Vérifiez votre connexion Internet
- Essayez avec d'autres clés
- Consultez les logs : `npm run dev`

---

## 📞 BESOIN D'AIDE ?

### Documentation PayPal

- Guide officiel : https://developer.paypal.com/docs/api/overview/
- Support : https://developer.paypal.com/support/

### Votre Projet

- Testez : `npm run test-all`
- Logs : Regardez le terminal quand vous faites `npm run dev`

---

## ✅ CHECKLIST FINALE

Avant de déployer en production :

```
☐ Client ID copié dans .env
☐ Secret copié dans .env
☐ Mode = sandbox pour tester
☐ npm run test-all → Tout OK
☐ Test donation sandbox → Fonctionne
☐ Clés Live créées
☐ Mode = live dans .env
☐ Variables ajoutées sur Render
☐ Test donation live (petit montant)
☐ ✅ PRÊT POUR LA PRODUCTION !
```

---

## 🎉 FÉLICITATIONS !

Si vous avez suivi toutes les étapes, votre PayPal est maintenant configuré et vous pouvez accepter des donations !

**Temps total : 5 minutes** ⏱️

---

**Questions ? Consultez la documentation ou contactez le support PayPal.**

**Na Nach Nachma Nachman Meuman!** 🎵
