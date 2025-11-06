# 🚀 Guide de Démarrage Rapide (5 Minutes)

## Installation en Une Commande

```bash
npm run setup
```

Cette commande fait **TOUT automatiquement** :
- ✅ Installe les dépendances
- ✅ Crée le fichier .env avec un SECRET sécurisé
- ✅ Crée le dossier images
- ✅ Met à jour la base de données
- ✅ Build le projet

---

## Configuration PayPal (2 Minutes)

### 1. Obtenez vos clés PayPal

**Mode Test (Sandbox)** - Recommandé pour commencer :
1. Allez sur https://developer.paypal.com/dashboard
2. Cliquez sur "Apps & Credentials"
3. Créez une app ou utilisez "Default Application"
4. Copiez **Client ID** et **Secret**

**Mode Production (Live)** - Pour les vrais paiements :
1. Allez sur https://www.paypal.com/businessmanage/account/apiAccess
2. Suivez le même processus

### 2. Ajoutez-les dans .env

Ouvrez le fichier `.env` et complétez :

```env
PAYPAL_CLIENT_ID=Votre_Client_ID_Ici
PAYPAL_CLIENT_SECRET=Votre_Secret_Ici
PAYPAL_MODE=sandbox    # ou 'live' pour production
```

---

## Créez Un Tirage Actif (1 Minute)

```bash
npm run init-lottery
```

Cette commande crée automatiquement un tirage actif pour le mois en cours.

---

## Lancez Le Site (30 Secondes)

```bash
npm run dev
```

Ouvrez : http://localhost:5000

---

## Testez Tout (1 Minute)

```bash
npm run test-all
```

Ce script vérifie que tout fonctionne correctement.

---

## 🎯 C'est Tout !

Votre site est maintenant :
- ✅ Installé
- ✅ Configuré avec PayPal
- ✅ Prêt à accepter des donations
- ✅ Inscriptions automatiques à la loterie

## Testez Une Donation

1. Allez sur http://localhost:5000/donate
2. Entrez 50 ₪
3. Remplissez vos infos
4. Sélectionnez PayPal
5. Connectez-vous avec votre compte sandbox
6. Confirmez le paiement

✅ Vous devriez être automatiquement inscrit à la loterie !

---

## 🚀 Déploiement en Production

Une fois testé localement :

1. **Passez en mode live** :
   ```env
   PAYPAL_MODE=live
   ```

2. **Déployez sur Render.com** :
   - Build Command: `npm run setup && npm run build`
   - Start Command: `npm start`
   - Ajoutez toutes les variables d'environnement

3. **Créez un tirage actif** :
   ```bash
   npm run init-lottery
   ```

---

## 📞 Besoin d'Aide ?

- 📖 **Documentation complète** : README_FR.md
- ✅ **Checklist déploiement** : DEPLOYMENT_CHECKLIST.md
- 🖼️ **Guide images** : IMAGES_INSTRUCTIONS.md
- 🧪 **Tester le site** : npm run test-all

---

## 🎉 Prêt Pour 20 000 Personnes !

Votre site dispose de :
- ✨ Design moderne magazine-style
- 🎁 Système de loterie complet
- 💳 Paiements PayPal sécurisés
- 📱 100% responsive mobile
- 🌍 5 langues (HE, EN, FR, ES, RU)
- 📚 Boutique e-commerce fonctionnelle

**Na Nach Nachma Nachman Meuman!** 🎵
