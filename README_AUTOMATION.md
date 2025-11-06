# 🤖 Scripts d'Automatisation

Ce document décrit tous les scripts automatiques disponibles pour simplifier le développement et le déploiement.

---

## 📦 Scripts Disponibles

### 🚀 `npm run setup`
**Installation et configuration automatique complète**

Ce script fait TOUT automatiquement :
- ✅ Installe les dépendances npm
- ✅ Crée .env depuis .env.example
- ✅ Génère un SESSION_SECRET sécurisé
- ✅ Crée le dossier images
- ✅ Met à jour le schéma de base de données
- ✅ Build le projet

**Utilisation** :
```bash
npm run setup
```

**Quand l'utiliser** :
- Première installation du projet
- Après un git clone
- Pour réinitialiser l'environnement

---

### 🎁 `npm run init-lottery`
**Création automatique d'un tirage au sort**

Crée un tirage actif pour le mois en cours avec :
- Nom en hébreu et anglais
- Prix de 5000 ₪
- Dates automatiques (1er au dernier du mois)
- Tirage le 1er du mois suivant
- Don minimum de 18 ₪

**Utilisation** :
```bash
npm run init-lottery
```

**Quand l'utiliser** :
- Après avoir configuré DATABASE_URL
- Au début de chaque mois
- Pour créer le premier tirage

**Exemple de sortie** :
```
🎁 Initialisation du système de loterie...

📅 Création d'un tirage actif...
   Période: 01/02/2025 - 28/02/2025
   Tirage: 01/03/2025

✅ Tirage créé avec succès!

📊 Détails du tirage:
   ID: 123e4567-e89b-12d3-a456-426614174000
   Nom: הגרלה חודשית - פברואר 2025
   Prix: 5000 ₪
   Don minimum: 18 ₪
   Statut: active

🎉 Le système de loterie est maintenant actif!
```

---

### 🧪 `npm run test-all`
**Test automatique de tous les composants**

Vérifie :
- ✅ Variables d'environnement (PORT, PAYPAL_*, DATABASE_URL...)
- ✅ Connexion à la base de données
- ✅ Présence des tables (donations, lottery_draws, lottery_entries)
- ✅ Fichiers critiques (pages, routes, schéma)
- ✅ Dossier et images

**Utilisation** :
```bash
npm run test-all
```

**Quand l'utiliser** :
- Avant de déployer
- Après avoir modifié .env
- Pour débugger un problème

**Exemple de sortie** :
```
🧪 Exécution des tests automatiques...

═══════════════════════════════════════

📋 Test des variables d'environnement:
✅ PORT: Configuré: 5000
✅ NODE_ENV: development
✅ SESSION_SECRET: OK (32+ caractères)
✅ DATABASE_URL: Configuré
✅ PAYPAL_CLIENT_ID: Configuré
✅ PAYPAL_CLIENT_SECRET: Configuré
✅ PAYPAL_MODE: sandbox

🗄️  Test de la base de données:
✅ Connexion DB: Connexion réussie
✅ Table donations: Existe
✅ Table lottery_draws: Existe
✅ Table lottery_entries: Existe

📁 Test des fichiers critiques:
✅ client/src/pages/home.tsx: Existe
✅ client/src/pages/donate.tsx: Existe
✅ server/routes/donations.ts: Existe

📊 RÉSUMÉ DES TESTS:
   Total:    15
   ✅ Passés: 15
   ❌ Échoués: 0

🎉 Tous les tests sont passés!
✨ Le site est prêt pour le déploiement!
```

---

### ✅ `npm run deploy-check`
**Vérification complète avant déploiement**

Exécute dans l'ordre :
1. `npm run test-all` - Vérifie tout
2. `npm run build` - Build le projet

**Utilisation** :
```bash
npm run deploy-check
```

**Quand l'utiliser** :
- Juste avant de git push
- Avant de déployer sur Render
- Pour s'assurer que tout fonctionne

Si cette commande réussit, votre site est **100% prêt** pour la production !

---

### 🗄️ `npm run db:push`
**Mise à jour du schéma de base de données**

Applique tous les changements du schéma Drizzle à la base de données PostgreSQL.

**Utilisation** :
```bash
npm run db:push
```

**Quand l'utiliser** :
- Après avoir modifié shared/schema.ts
- Première fois que vous configurez DATABASE_URL
- Si les tests indiquent des tables manquantes

---

## 🎯 Scénarios d'Utilisation

### Scénario 1 : Première Installation

```bash
# 1. Cloner le projet
git clone https://github.com/votre-org/keren-rabbi-israel.git
cd keren-rabbi-israel

# 2. Setup automatique
npm run setup

# 3. Configurer PayPal dans .env
# Éditez .env et ajoutez vos clés PayPal

# 4. Créer un tirage
npm run init-lottery

# 5. Tester
npm run test-all

# 6. Lancer
npm run dev
```

**Total : 5 minutes** ⏱️

---

### Scénario 2 : Déploiement en Production

```bash
# 1. Vérifier que tout fonctionne
npm run deploy-check

# 2. Commit et push
git add .
git commit -m "🚀 Ready for production"
git push origin main

# 3. Sur Render.com
# - Le build se fait automatiquement avec npm run setup
# - Ajoutez les variables d'environnement
# - PAYPAL_MODE=live

# 4. Une fois déployé, créer un tirage
# Via SSH ou Render Shell:
npm run init-lottery
```

**Total : 10 minutes** ⏱️

---

### Scénario 3 : Nouveau Mois (Nouveau Tirage)

```bash
# Chaque 1er du mois
npm run init-lottery
```

**Total : 30 secondes** ⏱️

---

### Scénario 4 : Débugger un Problème

```bash
# 1. Lancer les tests
npm run test-all

# 2. Vérifier les logs
# Les tests vous diront exactement ce qui ne va pas

# 3. Corriger et re-tester
# Éditez .env ou autres fichiers
npm run test-all
```

---

## 🔧 Scripts Techniques Internes

Ces scripts sont utilisés par les autres, vous n'avez normalement pas besoin de les lancer manuellement :

### `npm run dev`
Lance le serveur de développement avec hot-reload

### `npm run build`
Build le frontend (Vite) et backend (esbuild)

### `npm start`
Lance le serveur de production (après build)

### `npm run check`
Vérifie les types TypeScript

---

## 📁 Structure des Scripts

```
scripts/
├── setup.sh              # Installation automatique
├── init-lottery.ts       # Création de tirage
├── test-all.ts          # Tests automatiques
└── deploy-render.sh     # Déploiement Render (auto)
```

---

## 🎓 Personnalisation

### Modifier le tirage par défaut

Éditez `scripts/init-lottery.ts` :

```typescript
prizeAmount: 1000000,  // 10,000 ₪ au lieu de 5,000 ₪
minimumDonation: 3600, // 36 ₪ au lieu de 18 ₪
```

### Ajouter vos propres tests

Éditez `scripts/test-all.ts` et ajoutez :

```typescript
test(
  'Ma Variable Custom',
  !!process.env.MA_VARIABLE,
  'Configurée'
);
```

### Personnaliser le setup

Éditez `scripts/setup.sh` pour ajouter vos étapes.

---

## 🚨 Dépannage

### Erreur "tsx: command not found"

```bash
npm install -g tsx
# ou
npx tsx scripts/init-lottery.ts
```

### Erreur "Permission denied: setup.sh"

```bash
chmod +x scripts/setup.sh
```

### Erreur "Database not available"

```bash
# Vérifiez DATABASE_URL dans .env
# Puis:
npm run db:push
npm run init-lottery
```

---

## 🎉 Résumé

Avec ces scripts, vous pouvez :
- ✅ Installer le projet en **1 commande**
- ✅ Créer un tirage en **1 commande**
- ✅ Tester tout en **1 commande**
- ✅ Déployer en **1 commande**

**C'est ça l'automatisation !** 🚀

---

Pour plus d'informations :
- 📖 **Guide complet** : README_FR.md
- 🚀 **Démarrage rapide** : QUICK_START.md
- ✅ **Checklist** : DEPLOYMENT_CHECKLIST.md
