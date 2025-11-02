# 🚀 Guide de Setup Rapide - Système de Loterie Keren

**Marqueur: 555**

## ✅ Ce qui a été créé

1. ✅ **Schéma SQL Supabase** : `supabase-lottery-schema.sql`
2. ✅ **Client Supabase serveur** : `server/lib/supabase.ts`
3. ✅ **Routes API Express** : `server/routes.ts` (section LOTTERY)
4. ✅ **Page publique loterie** : `client/src/pages/lottery.tsx`
5. ✅ **Page admin loterie** : `client/src/pages/lottery-admin.tsx`
6. ✅ **Documentation complète** : `LOTTERY_DOCUMENTATION.md`
7. ✅ **Routes déjà configurées** : `/lottery` et `/lottery/admin` dans `App.tsx`

---

## 🎯 Étapes de Configuration (10 minutes)

### 1. Configuration Supabase (5 min)

**a. Créer un projet Supabase**
- Aller sur https://supabase.com
- Créer un nouveau projet
- Noter l'URL et les clés (Settings → API)

**b. Exécuter le schéma SQL**
- Ouvrir SQL Editor dans Supabase Dashboard
- Copier le contenu de `supabase-lottery-schema.sql`
- Exécuter le script
- Vérifier : `SELECT COUNT(*) FROM lottery_entries;` (devrait retourner 0)

### 2. Variables d'Environnement (2 min)

Ajouter dans votre `.env` (racine du projet) :

```bash
# Supabase (OBLIGATOIRE)
SUPABASE_URL=https://votre-projet.supabase.co
SUPABASE_SERVICE_ROLE_KEY=votre-service-role-key

# OU (alternative - utilise anon key)
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=votre-anon-key

# Admin Lottery (OBLIGATOIRE - changer le mot de passe!)
LOTTERY_ADMIN_USER=admin
LOTTERY_ADMIN_PASS=votre-mot-de-passe-securise-ici
```

**⚠️ IMPORTANT :**
- Ne jamais commiter le `.env` dans Git
- Changer le mot de passe admin par défaut en production
- Utiliser `SUPABASE_SERVICE_ROLE_KEY` pour bypass RLS (recommandé)

### 3. Installation des Dépendances (1 min)

```bash
cd keren-original-backup
npm install
```

**Vérifier que ces packages sont installés :**
- `@supabase/supabase-js` (déjà dans package.json)
- `zod` (déjà dans package.json)

### 4. Test Local (2 min)

```bash
# Démarrer le serveur de développement
npm run dev
```

**Tests à effectuer :**
1. Ouvrir http://localhost:5000/lottery
2. Remplir le formulaire et s'inscrire
3. Vérifier que ça fonctionne (message de succès)
4. Ouvrir http://localhost:5000/lottery/admin
5. Se connecter avec les identifiants admin
6. Effectuer un tirage de test

---

## 🔍 Vérification Post-Setup

### Checklist

- [ ] Supabase configuré (URL + Service Role Key)
- [ ] Schéma SQL exécuté (tables créées)
- [ ] Variables `.env` configurées
- [ ] Page `/lottery` accessible et fonctionnelle
- [ ] Page `/lottery/admin` accessible (avec auth)
- [ ] Inscription fonctionnelle
- [ ] Tirage fonctionnel
- [ ] Statistiques affichées

---

## 📍 URLs du Site

### Production (Netlify)
- **Page publique** : https://keren-cursor.netlify.app/lottery
- **Page admin** : https://keren-cursor.netlify.app/lottery/admin

### Local
- **Page publique** : http://localhost:5000/lottery
- **Page admin** : http://localhost:5000/lottery/admin

---

## 🔐 Identifiants Admin

**Par défaut :**
- Username : `admin`
- Password : `admin`

**⚠️ CHANGER EN PRODUCTION via variables d'environnement :**
```bash
LOTTERY_ADMIN_USER=votre-username
LOTTERY_ADMIN_PASS=votre-mot-de-passe-securise
```

---

## 📊 Structure de la Base de Données

### Tables créées

1. **`lottery_entries`** : Tous les participants
   - `id`, `email`, `name`, `phone`
   - `source` : 'form' ou 'shopify'
   - `metadata` : JSON (donation_amount, etc.)
   - `created_at`

2. **`draws`** : Tous les tirages effectués
   - `id`, `draw_name`, `executed_at`
   - `winner_entry_id` : référence vers `lottery_entries`
   - `seed` : pour audit
   - `details` : JSON (total, winnerIndex, etc.)

3. **`donors`** : Donateurs (optionnel, pour futur)
4. **`subscriptions`** : Abonnements Shopify (optionnel, pour futur)

---

## 🎨 Fonctionnalités Implémentées

### Page Publique (`/lottery`)
- ✅ Formulaire d'inscription (nom, email, téléphone, donation)
- ✅ Validation côté client
- ✅ Affichage du nombre de participants (stats)
- ✅ Messages de succès/erreur
- ✅ Design responsive avec gradient orange/jaune
- ✅ Support multilingue (he, fr, en)

### Page Admin (`/lottery/admin`)
- ✅ Authentification Basic Auth
- ✅ Liste complète des participants (table)
- ✅ Affichage source (formulaire vs Shopify)
- ✅ Bouton "Lancer le tirage" avec nom personnalisé
- ✅ Affichage résultat (gagnant + détails)
- ✅ Actualisation manuelle de la liste
- ✅ Session persistante (localStorage)

### API Endpoints
- ✅ `POST /api/lottery/join` : Inscription publique
- ✅ `GET /api/lottery/stats` : Statistiques publiques
- ✅ `GET /api/lottery/entries` : Liste participants (admin)
- ✅ `POST /api/lottery/draw` : Effectuer un tirage (admin)
- ✅ `GET /api/lottery/draws` : Liste des tirages (admin)

---

## 🚨 Problèmes Courants

### "La loterie n'est pas configurée"
**Cause :** Variables Supabase manquantes
**Solution :** Vérifier `SUPABASE_URL` et `SUPABASE_SERVICE_ROLE_KEY` dans `.env`

### Erreur 401 sur admin
**Cause :** Identifiants incorrects
**Solution :** Vérifier `LOTTERY_ADMIN_USER` et `LOTTERY_ADMIN_PASS`

### Tables n'existent pas
**Cause :** Schéma SQL non exécuté
**Solution :** Exécuter `supabase-lottery-schema.sql` dans Supabase SQL Editor

### Route `/lottery` non trouvée
**Cause :** Routes déjà configurées dans `App.tsx`
**Solution :** Vérifier que le serveur redémarre après modifications

---

## 📚 Documentation Complète

Pour plus de détails, voir :
- **`LOTTERY_DOCUMENTATION.md`** : Documentation technique complète
- **`supabase-lottery-schema.sql`** : Schéma de base de données
- **`server/lib/supabase.ts`** : Client Supabase serveur
- **`server/routes.ts`** : Routes API (section LOTTERY)

---

## 🔄 Prochaines Étapes (Optionnel)

### Intégration Shopify
- Webhook pour inscriptions automatiques
- Endpoint `/api/webhooks/shopify`
- Inscription auto si commande ≥ 35 ILS

### Notifications Email
- Email de confirmation d'inscription
- Email au gagnant du tirage
- Via SendGrid (déjà configuré dans le projet)

### Dashboard Statistiques
- Graphiques des participants
- Historique des tirages
- Export CSV/JSON

---

## ✅ Résumé

**Tout est prêt !** Il suffit de :
1. Configurer Supabase (5 min)
2. Ajouter les variables `.env` (2 min)
3. Tester localement (2 min)

**Total : 10 minutes** ⏱️

---

**נ נח נחמ נחמן מאומן ✨**

**Marqueur: 555**

---

*Guide créé le : 2024-01-15*
