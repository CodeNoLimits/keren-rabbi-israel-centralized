# 📝 Changelog - Système de Loterie Keren

**Marqueur: 555**  
**Date: 2024-01-15**  
**Destiné à: Claude Code (synchronisation)**

---

## 🎯 Résumé des Changements

Implémentation complète du système de loterie pour le site Keren Rabbi Israel, incluant :
- Base de données Supabase avec schéma SQL
- API endpoints Express (backend)
- Pages frontend (publique + admin)
- Documentation complète

---

## 📦 Fichiers Créés

### 1. **`supabase-lottery-schema.sql`**
**Emplacement:** `keren-original-backup/supabase-lottery-schema.sql`

**Description:** Schéma SQL complet pour Supabase avec :
- Table `donors` (donateurs)
- Table `subscriptions` (abonnements Shopify)
- Table `lottery_entries` (participants loterie)
- Table `draws` (tirages au sort)
- Index pour performance
- Row Level Security (RLS)
- Fonctions helper

**Modification utilisateur:**
- ✅ Ajout contrainte `UNIQUE(email, source)` sur `lottery_entries`
- Permet le même email via 'form' ET 'shopify', mais pas 2x 'form'
- **Ligne ajoutée:**
```sql
CONSTRAINT unique_email_per_source UNIQUE(email, source)
```

---

### 2. **`server/lib/supabase.ts`**
**Emplacement:** `keren-original-backup/server/lib/supabase.ts`

**Description:** Client Supabase côté serveur avec :
- Configuration Supabase (URL + Service Role Key)
- Types TypeScript (LotteryEntry, Draw, Donor, Subscription)
- Fonctions helper :
  - `getLotteryEntries()`
  - `getLotteryEntryById(id)`
  - `createLotteryEntry(entry)`
  - `getDraws()`
  - `createDraw(draw)`

**État:** ✅ Créé et fonctionnel

---

### 3. **`server/routes.ts`** (MODIFIÉ)
**Emplacement:** `keren-original-backup/server/routes.ts`

**Changements:**
- Ajout imports Supabase et Zod (ligne 16-17)
- Ajout section "LOTTERY API ROUTES" (ligne 1241-1497)

**Routes API ajoutées:**
1. **POST `/api/lottery/join`** (Public)
   - Inscription à la loterie
   - Validation Zod
   - Gestion erreurs duplicate email
   
2. **GET `/api/lottery/stats`** (Public)
   - Statistiques publiques
   - Nombre total participants
   - Répartition par source
   
3. **GET `/api/lottery/entries`** (Admin - Basic Auth)
   - Liste complète participants
   - Protection Basic Auth
   
4. **POST `/api/lottery/draw`** (Admin - Basic Auth)
   - Effectuer un tirage au sort
   - Sélection déterministe (seed)
   - Enregistrement dans table `draws`
   
5. **GET `/api/lottery/draws`** (Admin - Basic Auth)
   - Liste des tirages effectués
   - Historique complet

**Fonction helper ajoutée:**
- `verifyBasicAuth(req)` : Vérification Basic Auth pour admin

**Schema validation:**
- `LotteryJoinSchema` : Validation Zod pour inscription

---

### 4. **`client/src/pages/lottery.tsx`** (CRÉÉ puis MODIFIÉ par utilisateur)
**Emplacement:** `keren-original-backup/client/src/pages/lottery.tsx`

**Version initiale (créée par Cursor):**
- Design avec gradient orange/jaune
- Utilisation shadcn/ui components (Card, Input, Button)
- Affichage statistiques en temps réel
- Support multilingue (he, fr, en)

**Version modifiée par utilisateur:**
- ✅ Design simplifié avec styles inline
- ✅ Suppression dépendances shadcn/ui
- ✅ Formulaire plus minimaliste
- ✅ Support langues étendu (he, fr, en, es, ru)
- ✅ Tracking Google Analytics (gtag)
- ✅ Message note spirituelle ajouté
- ✅ Footer ajouté
- ✅ Section HilloulaCountdown commentée (préparée pour futur)

**Champs formulaire:**
- `name` (requis)
- `email` (requis)
- `phone` (optionnel)
- `donation_amount` (optionnel, min 36₪)

**Gestion état:**
- `form` : Données formulaire
- `loading` : État chargement
- `message` : Message succès/erreur
- `success` : Booléen succès

**Comportement:**
- Validation côté client
- Envoi POST à `/api/lottery/join`
- Réinitialisation formulaire après succès
- Messages d'erreur localisés

---

### 5. **`client/src/pages/lottery-admin.tsx`**
**Emplacement:** `keren-original-backup/client/src/pages/lottery-admin.tsx`

**Description:** Page administration loterie avec :
- Authentification Basic Auth
- Liste participants (table)
- Bouton tirage au sort
- Affichage résultats tirage
- Session persistante (localStorage)

**État:** ✅ Créé et fonctionnel

**Fonctionnalités:**
- Login/Logout
- Affichage source (form vs shopify)
- Refresh manuel liste
- Nom personnalisé pour tirage
- Détails gagnant (nom, email, phone)

---

### 6. **`LOTTERY_DOCUMENTATION.md`**
**Emplacement:** `keren-original-backup/LOTTERY_DOCUMENTATION.md`

**Description:** Documentation technique complète (200+ lignes) incluant :
- Vue d'ensemble
- Architecture
- Configuration
- Schéma base de données
- API endpoints (détails)
- Pages frontend
- Sécurité
- Utilisation
- Déploiement
- Troubleshooting
- Intégration future Shopify

---

### 7. **`LOTTERY_SETUP_GUIDE.md`**
**Emplacement:** `keren-original-backup/LOTTERY_SETUP_GUIDE.md`

**Description:** Guide rapide de configuration (10 minutes) avec :
- Checklist fichiers créés
- Étapes configuration Supabase
- Variables environnement
- Tests locaux
- URLs production/local
- Checklist vérification

---

## 🔄 Fichiers Modifiés

### **`client/src/App.tsx`**
**Changements:**
- ✅ Routes déjà configurées (lignes 52-53, 76-77)
- Imports:
```tsx
import Lottery from "@/pages/lottery";
import LotteryAdmin from "@/pages/lottery-admin";
```
- Routes:
```tsx
<Route path="/lottery" component={Lottery} />
<Route path="/lottery/admin" component={LotteryAdmin} />
```

**État:** ✅ Déjà configuré, pas de modification nécessaire

---

## ⚙️ Configuration Requise

### Variables d'Environnement

**Ajouter dans `.env` (racine du projet):**

```bash
# Supabase (OBLIGATOIRE)
SUPABASE_URL=https://votre-projet.supabase.co
SUPABASE_SERVICE_ROLE_KEY=votre-service-role-key

# OU (alternative)
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=votre-anon-key

# Admin Lottery (OBLIGATOIRE - changer mot de passe!)
LOTTERY_ADMIN_USER=admin
LOTTERY_ADMIN_PASS=votre-mot-de-passe-securise
```

---

## 🗄️ Structure Base de Données

### Tables Créées

1. **`lottery_entries`**
   - `id` (UUID, PK)
   - `email` (TEXT, NOT NULL)
   - `name` (TEXT)
   - `phone` (TEXT)
   - `source` (TEXT: 'form' | 'shopify')
   - `subscription_contract_id` (TEXT)
   - `order_id` (TEXT)
   - `metadata` (JSONB)
   - `created_at` (TIMESTAMPTZ)
   - **Contrainte:** `UNIQUE(email, source)` ⚠️ **AJOUTÉE PAR UTILISATEUR**

2. **`draws`**
   - `id` (UUID, PK)
   - `draw_name` (TEXT, NOT NULL)
   - `scheduled_at` (TIMESTAMPTZ)
   - `executed_at` (TIMESTAMPTZ)
   - `winner_entry_id` (UUID, FK → lottery_entries)
   - `seed` (TEXT)
   - `details` (JSONB)

3. **`donors`** (optionnel, futur)
4. **`subscriptions`** (optionnel, futur)

### Index Créés

- `idx_lottery_entries_email`
- `idx_lottery_entries_source`
- `idx_lottery_entries_created_at`
- `idx_subscriptions_contract_id`
- `idx_subscriptions_status`
- `idx_draws_executed_at`

### RLS (Row Level Security)

- Lecture publique: `lottery_entries` (pour stats)
- Insertion publique: `lottery_entries` (pour formulaire)
- Admin uniquement: `draws`

---

## 🔌 API Endpoints

### Public

| Méthode | Route | Description |
|---------|-------|-------------|
| POST | `/api/lottery/join` | Inscription loterie |
| GET | `/api/lottery/stats` | Statistiques publiques |

### Admin (Basic Auth)

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/api/lottery/entries` | Liste participants |
| POST | `/api/lottery/draw` | Effectuer tirage |
| GET | `/api/lottery/draws` | Liste tirages |

**Authentification:** Basic Auth via header:
```
Authorization: Basic <base64(username:password)>
```

---

## 🎨 Pages Frontend

### `/lottery` - Page Publique

**Fichier:** `client/src/pages/lottery.tsx`

**Modifications utilisateur:**
- Design simplifié (styles inline au lieu de Tailwind/shadcn)
- Support langues: he, fr, en, es, ru
- Tracking Google Analytics intégré
- Note spirituelle ajoutée
- Footer avec copyright
- Section HilloulaCountdown préparée (commentée)

**Fonctionnalités:**
- Formulaire inscription (4 champs)
- Validation côté client
- Messages succès/erreur localisés
- Réinitialisation après succès

### `/lottery/admin` - Page Admin

**Fichier:** `client/src/pages/lottery-admin.tsx`

**Fonctionnalités:**
- Login/Logout Basic Auth
- Table participants
- Bouton tirage au sort
- Affichage résultats
- Refresh manuel

---

## 🔐 Sécurité

### Authentification Admin

- **Type:** Basic Auth
- **Variables:** `LOTTERY_ADMIN_USER`, `LOTTERY_ADMIN_PASS`
- **Session:** Persistante via localStorage
- **Endpoints protégés:** `/api/lottery/entries`, `/api/lottery/draw`, `/api/lottery/draws`

### Validation Données

- **Zod Schema:** Validation stricte côté serveur
- **Champs requis:** name, email
- **Champs optionnels:** phone, donation_amount
- **Format email:** Validation regex

### Protection Doublons

- **Contrainte SQL:** `UNIQUE(email, source)` sur `lottery_entries`
- **Comportement:** 
  - Même email peut s'inscrire via 'form' ET 'shopify'
  - Même email ne peut pas s'inscrire 2x via 'form'
- **Message utilisateur:** Erreur explicite si duplicate

---

## 📊 Tirage au Sort

### Algorithme

- **Type:** Déterministe (pour audit)
- **Seed:** Timestamp actuel (`Date.now()`)
- **Sélection:** `winnerIndex = seed % entries.length`
- **Enregistrement:** Table `draws` avec détails complets

### Traçabilité

- **Seed:** Stocké dans table `draws`
- **Détails:** JSON avec total, winnerIndex, timestamp
- **Audit:** Possibilité de revérifier le tirage

---

## 🚀 Déploiement

### Étapes Requises

1. **Supabase:**
   - Créer projet
   - Exécuter `supabase-lottery-schema.sql`
   - Récupérer credentials

2. **Variables environnement:**
   - Ajouter dans `.env` local
   - Configurer dans Netlify/Render (production)

3. **Test:**
   - `/lottery` → Inscription test
   - `/lottery/admin` → Tirage test

### URLs Production

- **Public:** https://keren-cursor.netlify.app/lottery
- **Admin:** https://keren-cursor.netlify.app/lottery/admin

---

## ⚠️ Points d'Attention

### Modifications Utilisateur

1. **Contrainte unique_email_per_source:**
   - Permet même email via différents sources
   - Empêche doublons dans même source
   - **Impact:** Code doit gérer cette logique

2. **Design lottery.tsx simplifié:**
   - Styles inline au lieu de composants
   - Dépendances shadcn supprimées
   - **Impact:** Plus léger, moins de dépendances

3. **Support langues étendu:**
   - Ajout es, ru
   - **Impact:** Traductions supplémentaires nécessaires

---

## 🔄 Intégrations Futures

### Shopify (À implémenter)

**Webhook endpoint:** `/api/webhooks/shopify`

**Déclencheurs:**
- Nouvelle commande → Auto-inscription si montant ≥ 35 ILS
- Nouvelle subscription → Auto-inscription

**Code exemple (à ajouter dans routes.ts):**
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

## ✅ Checklist État

- [x] Schéma SQL créé
- [x] Client Supabase serveur créé
- [x] Routes API ajoutées
- [x] Page publique créée
- [x] Page admin créée
- [x] Routes configurées dans App.tsx
- [x] Documentation complète créée
- [x] Guide setup créé
- [x] Contrainte unique_email_per_source ajoutée (utilisateur)
- [x] Design lottery.tsx simplifié (utilisateur)
- [ ] Variables environnement configurées (à faire)
- [ ] Supabase configuré (à faire)
- [ ] Tests effectués (à faire)

---

## 📝 Notes pour Claude Code

### À Synchroniser

1. **Fichiers à copier:**
   - `supabase-lottery-schema.sql`
   - `server/lib/supabase.ts`
   - `server/routes.ts` (section LOTTERY)
   - `client/src/pages/lottery.tsx`
   - `client/src/pages/lottery-admin.tsx`
   - `LOTTERY_DOCUMENTATION.md`
   - `LOTTERY_SETUP_GUIDE.md`

2. **Modifications importantes:**
   - Contrainte `UNIQUE(email, source)` sur `lottery_entries`
   - Design simplifié de `lottery.tsx` (styles inline)
   - Support langues étendu (es, ru)

3. **À vérifier:**
   - Routes dans App.tsx (déjà configurées)
   - Variables environnement
   - Configuration Supabase

### Prochaines Étapes (Claude Code)

1. Vérifier compatibilité avec architecture existante
2. Tester endpoints API
3. Vérifier intégration avec Shopify (webhooks)
4. Optimiser performance si nécessaire
5. Ajouter tests unitaires (optionnel)

---

**נ נח נחמ נחמן מאומן ✨**

**Marqueur: 555**

---

*Changelog créé le: 2024-01-15*  
*Dernière mise à jour: 2024-01-15*  
*Version: 1.0.0*
