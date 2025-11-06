# 🚀 GUIDE COMPLET : Déploiement sur Render.com (Pas à Pas)

## ⚠️ IMPORTANT
Je ne peux pas accéder à votre compte Render directement, mais ce guide vous montre **EXACTEMENT** chaque clic à faire.

**FACILE !** Render détecte automatiquement la configuration grâce au fichier `render.yaml` que j'ai créé !

⏱️ **Temps : 10 minutes**

---

## 📋 CE DONT VOUS AVEZ BESOIN

- Un compte GitHub (avec le code déjà pushé)
- Un compte Render.com (gratuit)
- Vos clés PayPal (voir GUIDE_PAYPAL.md)
- 10 minutes

---

## 🎯 ÉTAPE 1 : Créer un Compte Render (2 minutes)

### 1.1 Aller sur Render.com

Ouvrez votre navigateur :
```
https://render.com
```

### 1.2 S'inscrire

- Cliquez sur **"Get Started"** ou **"Sign Up"**
- Choisissez **"Sign up with GitHub"** (recommandé)
  - Ou utilisez votre email

### 1.3 Connecter GitHub

- Autorisez Render à accéder à GitHub
- Sélectionnez **"All repositories"** ou juste `keren-rabbi-israel-centralized`

✅ **Vous êtes maintenant sur le Dashboard Render !**

---

## 🗄️ ÉTAPE 2 : Créer une Base de Données PostgreSQL (3 minutes)

### 2.1 Créer la Database

1. Sur le Dashboard, cliquez sur **"New +"**
2. Sélectionnez **"PostgreSQL"**

### 2.2 Configurer la Database

Remplissez :
- **Name** : `keren-rabbi-israel-db`
- **Database** : `keren_rabbi_israel`
- **User** : (laissez par défaut ou `postgres`)
- **Region** : Choisissez le plus proche :
  - 🇪🇺 **Frankfurt** (Europe)
  - 🇺🇸 **Oregon** (USA Ouest)
  - 🇸🇬 **Singapore** (Asie)
- **Plan** : **Free** (suffisant pour commencer)

### 2.3 Créer

- Cliquez sur **"Create Database"**
- ⏳ Attendez 1-2 minutes (création en cours)

### 2.4 Copier l'URL de Connexion

Une fois créée :
1. Cliquez sur votre database
2. Cherchez **"Internal Database URL"** ou **"External Database URL"**
3. Cliquez sur **"Copy"**
4. Collez-la dans un fichier texte (vous en aurez besoin)

Ça ressemble à ça :
```
postgres://user:password@host.render.com/database
```

✅ **Database créée !**

---

## 🌐 ÉTAPE 3 : Créer le Web Service (3 minutes)

### 3.1 Nouveau Service

1. Sur le Dashboard, cliquez sur **"New +"**
2. Sélectionnez **"Web Service"**

### 3.2 Connecter le Repository GitHub

1. Cherchez `keren-rabbi-israel-centralized`
2. Cliquez sur **"Connect"**

⚠️ **Si vous ne voyez pas votre repo** :
- Cliquez sur **"Configure account"**
- Donnez accès au repo

### 3.3 Configurer le Service

Render devrait **auto-détecter** grâce à `render.yaml` !

Si ce n'est pas le cas, remplissez manuellement :

```
Name: keren-rabbi-israel
Region: Frankfurt (ou autre, même que la DB)
Branch: claude/rebuild-site-deployment-011CUra5HEu8iwTKoq5dEwey
Root Directory: (laissez vide)
Runtime: Node
Build Command: npm run setup && npm run build
Start Command: npm start
Plan: Free (ou Starter pour plus de performance)
```

### 3.4 Variables d'Environnement (IMPORTANT!)

Scrollez jusqu'à **"Environment Variables"**, cliquez sur **"Add Environment Variable"** pour chaque :

#### Variables OBLIGATOIRES :

```
NODE_ENV = production
PORT = 5000
SESSION_SECRET = (cliquez sur "Generate" ou mettez 32+ caractères aléatoires)
DATABASE_URL = postgres://... (collez l'URL de l'ÉTAPE 2.4)
PAYPAL_CLIENT_ID = votre_client_id_paypal
PAYPAL_CLIENT_SECRET = votre_secret_paypal
PAYPAL_MODE = sandbox (ou "live" pour production)
FRONTEND_URL = https://votre-app.onrender.com (remplacez après)
```

#### Variables OPTIONNELLES (pour plus de fonctionnalités) :

```
STRIPE_SECRET_KEY = (si vous voulez Stripe)
SENDGRID_API_KEY = (pour emails automatiques)
SENDGRID_FROM_EMAIL = noreply@votre-domaine.com
SENDGRID_FROM_NAME = Keren Rabbi Israel
```

### 3.5 Auto-Deploy

- **Auto-Deploy** : **Yes** (recommandé)
  - Le site se redéploiera automatiquement à chaque git push

### 3.6 Créer le Service

- Cliquez sur **"Create Web Service"**
- ⏳ Attendez 5-10 minutes (premier build)

Vous verrez les logs en temps réel :
```
==> Downloading Node.js
==> Installing dependencies
==> npm run setup
==> npm run build
==> Deploy successful!
```

✅ **Service créé !**

---

## 🎁 ÉTAPE 4 : Initialiser la Loterie (2 minutes)

Une fois le déploiement terminé :

### 4.1 Ouvrir le Shell Render

1. Sur la page de votre service
2. Onglet **"Shell"** (en haut)
3. Un terminal s'ouvre

### 4.2 Créer le premier tirage

Dans le Shell, tapez :
```bash
npm run init-lottery
```

Vous devriez voir :
```
🎁 Initialisation du système de loterie...
✅ Tirage créé avec succès!
📊 Détails du tirage:
   ID: xxx-xxx-xxx
   Nom: הגרלה חודשית - פברואר 2025
   Prix: 5000 ₪
```

✅ **Loterie active !**

---

## 🧪 ÉTAPE 5 : Tester Votre Site (2 minutes)

### 5.1 Obtenir votre URL

Sur la page du service, en haut vous voyez :
```
https://keren-rabbi-israel.onrender.com
```

Cliquez dessus !

### 5.2 Vérifier les Pages

Testez ces URLs :
- `https://votre-app.onrender.com/` → Page d'accueil
- `https://votre-app.onrender.com/donate` → Page donation
- `https://votre-app.onrender.com/store` → Boutique

### 5.3 Tester une Donation

1. Allez sur `/donate`
2. Entrez **50 ₪** (en mode sandbox PayPal)
3. Remplissez vos infos
4. PayPal → Utilisez un compte sandbox
5. Confirmez

✅ **Si ça marche, vous êtes inscrit à la loterie !**

### 5.4 Mettre à jour FRONTEND_URL

1. Retournez sur le Dashboard Render
2. Service → **"Environment"**
3. Trouvez `FRONTEND_URL`
4. Remplacez par votre vraie URL : `https://keren-rabbi-israel.onrender.com`
5. Sauvegardez → Le service redémarre automatiquement

---

## 🚀 ÉTAPE 6 : Passer en Production (Optionnel)

### 6.1 Obtenir des Clés PayPal Live

Voir GUIDE_PAYPAL.md, section "Passer en Production"

### 6.2 Mettre à Jour les Variables

Sur Render :
1. Service → **"Environment"**
2. Modifiez :
   ```
   PAYPAL_CLIENT_ID = votre_live_client_id
   PAYPAL_CLIENT_SECRET = votre_live_secret
   PAYPAL_MODE = live
   ```
3. Sauvegardez

Le service redémarre automatiquement.

### 6.3 Tester avec un Vrai Paiement

⚠️ **Faites un petit test** : Donation de 18 ₪ avec votre vraie carte

✅ **Si ça marche, vous êtes en production !**

---

## 🌍 ÉTAPE 7 : Nom de Domaine Personnalisé (Optionnel)

### 7.1 Acheter un Domaine

Achetez un domaine (ex: `keren-rabbi-israel.org`) sur :
- Namecheap
- GoDaddy
- Google Domains

### 7.2 Configurer sur Render

1. Service → **"Settings"**
2. **"Custom Domain"**
3. Ajoutez : `www.keren-rabbi-israel.org`
4. Suivez les instructions pour configurer le DNS

✅ **Domaine personnalisé configuré !**

---

## 📊 MONITORING

### Voir les Logs

- Service → **"Logs"** (en temps réel)
- Cherchez les erreurs ou warnings

### Métriques

- Service → **"Metrics"**
- CPU, Mémoire, Requêtes

### Redémarrer

Si besoin :
- Service → **"Manual Deploy"** → **"Clear build cache & deploy"**

---

## 🐛 PROBLÈMES COURANTS

### ❌ "Build failed: npm install error"

**Solution** :
```bash
# Localement
rm -rf node_modules
npm install
git push
```

### ❌ "Application failed to respond"

**Solution** :
- Vérifiez que `PORT=5000` dans les variables
- Vérifiez les logs pour voir l'erreur exacte

### ❌ "Database connection failed"

**Solution** :
- Vérifiez que `DATABASE_URL` est correct
- Testez la connexion depuis le Shell :
  ```bash
  npm run db:push
  ```

### ❌ "PayPal order creation failed"

**Solution** :
- Vérifiez `PAYPAL_CLIENT_ID` et `SECRET`
- Vérifiez `PAYPAL_MODE` (sandbox/live)

---

## ✅ CHECKLIST FINALE

Avant de présenter :

```
☐ Database créée sur Render
☐ Web Service créé et déployé
☐ Toutes les variables d'environnement configurées
☐ PAYPAL_MODE = sandbox (pour tester)
☐ npm run init-lottery exécuté
☐ Site accessible (https://...)
☐ Test donation sandbox → Fonctionne
☐ FRONTEND_URL mise à jour
☐ Mode live activé (si prêt)
☐ Test donation live (petit montant)
☐ ✅ PRÊT POUR 20 000 PERSONNES !
```

---

## 💰 COÛTS

### Plan Free (Gratuit)
- ✅ Web Service : Gratuit
- ✅ PostgreSQL : Gratuit (500MB)
- ⚠️ Le service se met en veille après 15 min d'inactivité
- ⚠️ 750 heures/mois (suffisant pour tester)

### Plan Starter ($7/mois)
- ✅ Pas de mise en veille
- ✅ 100GB bande passante
- ✅ Support prioritaire
- ✅ **Recommandé pour production**

---

## 🎉 FÉLICITATIONS !

Votre site est maintenant **EN LIGNE** et prêt à accepter des donations !

**Temps total : 10 minutes** ⏱️

---

## 📞 BESOIN D'AIDE ?

### Support Render
- Docs : https://render.com/docs
- Support : https://render.com/support

### Votre Projet
- Logs : Render Dashboard → Logs
- Tests : Shell → `npm run test-all`

---

## 🔗 LIENS UTILES

- **Votre site** : https://keren-rabbi-israel.onrender.com
- **Dashboard** : https://dashboard.render.com
- **Documentation** : Voir tous les fichiers .md du projet

---

**Questions ? Consultez les logs ou le support Render !**

**Na Nach Nachma Nachman Meuman!** 🎵
