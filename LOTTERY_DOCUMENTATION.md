# 🎯 Documentation Complète - Système de Loterie Keren

**Marqueur: 555**

## 📋 Table des Matières

1. [Vue d'ensemble](#vue-densemble)
2. [Architecture](#architecture)
3. [Configuration](#configuration)
4. [Base de Données](#base-de-données)
5. [API Endpoints](#api-endpoints)
6. [Pages Frontend](#pages-frontend)
7. [Sécurité](#sécurité)
8. [Utilisation](#utilisation)
9. [Déploiement](#déploiement)
10. [Troubleshooting](#troubleshooting)

---

## 🎯 Vue d'ensemble

Le système de loterie Keren permet de :
- ✅ Gérer des inscriptions à des tirages au sort
- ✅ Effectuer des tirages aléatoires déterministes (pour audit)
- ✅ Intégrer avec Shopify pour inscriptions automatiques
- ✅ Administrer les participants et tirages via interface admin

### Fonctionnalités Principales

- **Inscription Publique** : Formulaire web pour inscription directe
- **Inscription Shopify** : Inscription automatique via webhooks (futur)
- **Tirage au Sort** : Sélection aléatoire avec seed déterministe
- **Dashboard Admin** : Interface d'administration avec authentification Basic Auth
- **Statistiques** : Nombre de participants, répartition par source

---

## 🏗️ Architecture

### Stack Technique

- **Backend** : Express.js + TypeScript
- **Database** : Supabase (PostgreSQL)
- **Frontend** : React + Vite + TypeScript
- **Authentification** : Basic Auth (admin)
- **Validation** : Zod

### Structure des Fichiers

```
keren-original-backup/
├── server/
│   ├── lib/
│   │   └── supabase.ts          # Client Supabase serveur
│   └── routes.ts                 # Routes API loterie
├── client/
│   └── src/
│       └── pages/
│           ├── lottery.tsx       # Page publique loterie
│           └── lottery-admin.tsx # Page admin loterie
├── supabase-lottery-schema.sql   # Schéma SQL Supabase
└── LOTTERY_DOCUMENTATION.md      # Cette documentation
```

---

## ⚙️ Configuration

### Variables d'Environnement Requises

Ajoutez ces variables dans votre `.env` :

```bash
# Supabase Configuration
SUPABASE_URL=https://votre-projet.supabase.co
SUPABASE_SERVICE_ROLE_KEY=votre-service-role-key
# OU (pour compatibilité)
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=votre-anon-key

# Admin Lottery (Basic Auth)
LOTTERY_ADMIN_USER=admin
LOTTERY_ADMIN_PASS=votre-mot-de-passe-securise
```

### Configuration Supabase

1. **Créer un projet Supabase** : https://supabase.com
2. **Récupérer les credentials** :
   - URL du projet (Settings → API → Project URL)
   - Service Role Key (Settings → API → service_role key)
   - OU Anon Key (Settings → API → anon/public key)
3. **Exécuter le schéma SQL** :
   - Ouvrir SQL Editor dans Supabase Dashboard
   - Copier le contenu de `supabase-lottery-schema.sql`
   - Exécuter le script

---

## 🗄️ Base de Données

### Schéma des Tables

#### `lottery_entries` - Entrées de la loterie

```sql
CREATE TABLE lottery_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  name TEXT,
  phone TEXT,
  source TEXT,                    -- 'form' | 'shopify'
  subscription_contract_id TEXT,   -- si via Shopify Subscriptions
  order_id TEXT,                   -- si via commande
  metadata JSONB,                  -- données supplémentaires (donation_amount, etc.)
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Index :**
- `idx_lottery_entries_email` : Recherche par email
- `idx_lottery_entries_source` : Filtrage par source
- `idx_lottery_entries_created_at` : Tri par date

#### `draws` - Tirages au sort

```sql
CREATE TABLE draws (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  draw_name TEXT NOT NULL,
  scheduled_at TIMESTAMPTZ,
  executed_at TIMESTAMPTZ,
  winner_entry_id UUID REFERENCES lottery_entries(id),
  seed TEXT,                       -- pour audit et traçabilité
  details JSONB                    -- métadonnées (total, winnerIndex, etc.)
);
```

**Index :**
- `idx_draws_executed_at` : Tri par date d'exécution

#### `donors` - Donateurs (optionnel)

```sql
CREATE TABLE donors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE,
  full_name TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### `subscriptions` - Abonnements (optionnel, pour Shopify)

```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_id UUID REFERENCES donors(id) ON DELETE SET NULL,
  shopify_customer_id TEXT,
  shopify_contract_id TEXT UNIQUE,
  status TEXT CHECK (status IN ('active','paused','cancelled')) DEFAULT 'active',
  amount_cents INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'ILS',
  started_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Row Level Security (RLS)

- **Lecture publique** : `lottery_entries` (pour afficher le nombre de participants)
- **Insertion publique** : `lottery_entries` (pour formulaire)
- **Admin uniquement** : `draws` (via Basic Auth)

---

## 🔌 API Endpoints

### POST `/api/lottery/join`

**Inscription à la loterie (public)**

**Body :**
```json
{
  "name": "Jean Dupont",
  "email": "jean@example.com",
  "phone": "+33-6-12-34-56-78",      // optionnel
  "donation_amount": "35"            // optionnel
}
```

**Response (succès) :**
```json
{
  "ok": true,
  "message": "Inscription enregistrée avec succès !",
  "entryId": "uuid-here"
}
```

**Response (erreur) :**
```json
{
  "ok": false,
  "error": "Cet email est déjà inscrit à la loterie."
}
```

---

### GET `/api/lottery/stats`

**Statistiques publiques (nombre de participants)**

**Response :**
```json
{
  "ok": true,
  "totalEntries": 150,
  "entriesBySource": {
    "form": 120,
    "shopify": 30
  }
}
```

---

### GET `/api/lottery/entries`

**Liste des participants (admin uniquement)**

**Headers :**
```
Authorization: Basic <base64(username:password)>
```

**Response :**
```json
{
  "ok": true,
  "entries": [
    {
      "id": "uuid",
      "email": "jean@example.com",
      "name": "Jean Dupont",
      "phone": "+33-6-12-34-56-78",
      "source": "form",
      "created_at": "2024-01-15T10:30:00Z",
      "metadata": {
        "donation_amount": "35"
      }
    }
  ],
  "total": 150
}
```

---

### POST `/api/lottery/draw`

**Effectuer un tirage au sort (admin uniquement)**

**Headers :**
```
Authorization: Basic <base64(username:password)>
```

**Body :**
```json
{
  "drawName": "Tirage Hilloula 2024"
}
```

**Response (succès) :**
```json
{
  "ok": true,
  "winner": {
    "id": "uuid",
    "name": "Jean Dupont",
    "email": "jean@example.com",
    "phone": "+33-6-12-34-56-78"
  },
  "totalEntries": 150,
  "seed": "1705320000000",
  "drawId": "uuid",
  "drawName": "Tirage Hilloula 2024"
}
```

---

### GET `/api/lottery/draws`

**Liste des tirages (admin uniquement)**

**Headers :**
```
Authorization: Basic <base64(username:password)>
```

**Response :**
```json
{
  "ok": true,
  "draws": [
    {
      "id": "uuid",
      "draw_name": "Tirage Hilloula 2024",
      "executed_at": "2024-01-15T14:00:00Z",
      "winner_entry": { ... },
      "seed": "1705320000000",
      "details": {
        "total": 150,
        "winnerIndex": 42
      }
    }
  ],
  "total": 1
}
```

---

## 🎨 Pages Frontend

### `/lottery` - Page Publique

**Fichier :** `client/src/pages/lottery.tsx`

**Fonctionnalités :**
- Formulaire d'inscription (nom, email, téléphone, donation)
- Affichage du nombre de participants
- Instructions et informations sur la loterie
- Design responsive avec gradient orange/jaune
- Support multilingue (he, fr, en)

**Routes :**
- S'assurer que la route est ajoutée dans le routeur (ex: `wouter` ou `react-router`)

```tsx
// Exemple avec wouter
import { Route } from 'wouter';
import LotteryPage from './pages/lottery';

// Dans votre App.tsx ou router
<Route path="/lottery" component={LotteryPage} />
```

---

### `/lottery-admin` - Page Admin

**Fichier :** `client/src/pages/lottery-admin.tsx`

**Fonctionnalités :**
- Authentification Basic Auth
- Liste complète des participants (table)
- Bouton pour effectuer un tirage
- Affichage des résultats du tirage
- Statistiques et informations

**Sécurité :**
- Basic Auth (nom d'utilisateur/mot de passe)
- Session persistante via localStorage
- Déconnexion manuelle

**Routes :**
```tsx
<Route path="/lottery-admin" component={LotteryAdminPage} />
```

---

## 🔐 Sécurité

### Authentification Admin

**Basic Auth** :
- Header : `Authorization: Basic <base64(username:password)>`
- Variables d'environnement :
  - `LOTTERY_ADMIN_USER` (défaut: "admin")
  - `LOTTERY_ADMIN_PASS` (défaut: "admin" - **À CHANGER EN PRODUCTION**)

### Validation des Données

**Zod Schema** :
```typescript
const LotteryJoinSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(3).optional(),
  donation_amount: z.string().optional(),
});
```

### Protection contre les Doublons

- **Email unique** : Gestion des erreurs PostgreSQL pour emails dupliqués
- **Message utilisateur** : Erreur explicite si email déjà inscrit

### Row Level Security (RLS)

- **Lecture publique** : Nombre de participants
- **Insertion publique** : Formulaire d'inscription
- **Modification admin uniquement** : Tirages

---

## 📖 Utilisation

### Inscription Publique

1. Accéder à `/lottery`
2. Remplir le formulaire :
   - Nom complet (requis)
   - Email (requis)
   - Téléphone (optionnel)
   - Montant donation (optionnel)
3. Cliquer sur "S'inscrire à la Loterie"
4. Confirmation affichée

### Administration - Effectuer un Tirage

1. Accéder à `/lottery-admin`
2. Se connecter avec les identifiants admin
3. Vérifier la liste des participants
4. Entrer un nom pour le tirage (ex: "Tirage Hilloula 2024")
5. Cliquer sur "Lancer le Tirage"
6. Le gagnant est affiché avec ses coordonnées

### Vérification des Statistiques

**Via API :**
```bash
curl https://votre-site.com/api/lottery/stats
```

**Via Page :**
- La page `/lottery` affiche automatiquement le nombre de participants

---

## 🚀 Déploiement

### 1. Configuration Supabase

```bash
# 1. Créer projet Supabase
# 2. Récupérer URL et Service Role Key
# 3. Exécuter supabase-lottery-schema.sql
```

### 2. Variables d'Environnement

**Local (.env) :**
```bash
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=xxx
LOTTERY_ADMIN_USER=admin
LOTTERY_ADMIN_PASS=changement-mot-de-passe-ici
```

**Production (Netlify/Render/etc.) :**
- Ajouter les variables dans les paramètres du projet
- Ne jamais commiter le `.env` dans Git

### 3. Build et Déploiement

```bash
# Build
npm run build

# Déploiement Netlify
netlify deploy --prod
```

### 4. Vérification Post-Déploiement

- ✅ Tester l'inscription : `/lottery`
- ✅ Tester les stats : `/api/lottery/stats`
- ✅ Tester l'admin : `/lottery-admin`
- ✅ Tester un tirage : Effectuer un tirage de test

---

## 🐛 Troubleshooting

### Problème : "La loterie n'est pas configurée"

**Cause :** Variables Supabase manquantes ou incorrectes

**Solution :**
1. Vérifier `SUPABASE_URL` et `SUPABASE_SERVICE_ROLE_KEY`
2. Tester la connexion Supabase :
```typescript
import { supa } from './server/lib/supabase';
if (!supa) {
  console.error('Supabase not configured');
}
```

---

### Problème : Erreur 401 sur `/api/lottery/entries`

**Cause :** Identifiants Basic Auth incorrects

**Solution :**
1. Vérifier `LOTTERY_ADMIN_USER` et `LOTTERY_ADMIN_PASS`
2. Tester l'authentification :
```bash
curl -u "admin:password" https://votre-site.com/api/lottery/entries
```

---

### Problème : Erreur "Email déjà inscrit"

**Cause :** L'email existe déjà dans `lottery_entries`

**Solution :**
- Normal : Message utilisateur affiché
- Si besoin de supprimer (admin uniquement) :
```sql
DELETE FROM lottery_entries WHERE email = 'email@example.com';
```

---

### Problème : Tables n'existent pas

**Cause :** Schéma SQL non exécuté

**Solution :**
1. Ouvrir Supabase SQL Editor
2. Copier/coller `supabase-lottery-schema.sql`
3. Exécuter le script
4. Vérifier les tables : `SELECT * FROM lottery_entries LIMIT 1;`

---

### Problème : Routes `/lottery` non trouvées

**Cause :** Routes non ajoutées au routeur

**Solution :**
Vérifier que les routes sont ajoutées (ex: `wouter`) :
```tsx
import LotteryPage from './pages/lottery';
import LotteryAdminPage from './pages/lottery-admin';

<Route path="/lottery" component={LotteryPage} />
<Route path="/lottery-admin" component={LotteryAdminPage} />
```

---

## 📚 Références

### Fichiers Clés

- **Schéma SQL** : `supabase-lottery-schema.sql`
- **Client Supabase** : `server/lib/supabase.ts`
- **Routes API** : `server/routes.ts` (section LOTTERY)
- **Page Publique** : `client/src/pages/lottery.tsx`
- **Page Admin** : `client/src/pages/lottery-admin.tsx`

### Documentation Supabase

- https://supabase.com/docs
- https://supabase.com/docs/guides/auth/row-level-security

---

## 🔄 Intégration Future avec Shopify

### Webhook Shopify (À implémenter)

**Endpoint :** `POST /api/webhooks/shopify`

**Déclencheurs :**
- Nouvelle commande → Inscription automatique si montant ≥ 35 ILS
- Nouvelle subscription → Inscription automatique

**Structure JSON :**
```json
{
  "event": "order.created",
  "order": {
    "id": "123",
    "email": "customer@example.com",
    "total_price": "50.00",
    "currency": "ILS"
  }
}
```

**Code exemple :**
```typescript
app.post('/api/webhooks/shopify', async (req, res) => {
  const { event, order } = req.body;
  
  if (event === 'order.created' && parseFloat(order.total_price) >= 35) {
    await createLotteryEntry({
      email: order.email,
      source: 'shopify',
      order_id: order.id,
      metadata: { total_price: order.total_price }
    });
  }
  
  res.json({ ok: true });
});
```

---

## ✅ Checklist de Mise en Production

- [ ] Variables d'environnement configurées (Supabase + Admin)
- [ ] Schéma SQL exécuté dans Supabase
- [ ] Routes frontend ajoutées (`/lottery`, `/lottery-admin`)
- [ ] Test d'inscription fonctionnel
- [ ] Test de tirage fonctionnel
- [ ] Mot de passe admin changé (pas le défaut)
- [ ] RLS configuré correctement
- [ ] Erreurs gérées avec messages utilisateur clairs
- [ ] Design responsive testé (mobile/desktop)
- [ ] Multilingue testé (he/fr/en)

---

**נ נח נחמ נחמן מאומן ✨**

**Marqueur: 555**

---

*Documentation créée le : 2024-01-15*
*Dernière mise à jour : 2024-01-15*
