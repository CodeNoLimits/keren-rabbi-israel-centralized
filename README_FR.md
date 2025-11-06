# 🕎 Keren Rabbi Israel Dov Odesser - Site Web Officiel

Site web officiel de la Fondation Keren Rabbi Israel Dov Odesser pour la diffusion des enseignements de Rabbi Nachman de Breslov dans le monde entier.

## ✨ Nouvelles Fonctionnalités (2025)

### 🎁 Système de Loterie avec Donations
- **Donations en ligne** avec PayPal et cartes de crédit
- **Inscription automatique** à la loterie pour chaque don de 18 ₪ ou plus
- **Tirages mensuels** avec des prix allant jusqu'à 5 000 ₪
- **Gestion complète** des participants et des tirages

### 🎨 Design Moderne Magazine-Style
- **Page d'accueil refaite** avec un design moderne et élégant
- **Section dédiée aux Rabbis** avec galerie de photos professionnelle
- **Animations fluides** et transitions élégantes
- **Responsive design** optimisé pour mobile, tablette et desktop

### 💳 Intégration PayPal
- **Paiements sécurisés** via PayPal
- **Support multi-devises** (ILS, USD, EUR, etc.)
- **Reçus automatiques** pour chaque donation
- **Suivi en temps réel** des transactions

### 📚 Boutique de Livres
- **Catalogue complet** des livres de Rabbi Nachman
- **Variantes multiples** (formats, tailles, reliures)
- **Calcul automatique** de la TVA et des frais de port
- **Système de panier** avancé

## 🚀 Installation et Configuration

### Prérequis
- Node.js 18+
- PostgreSQL 14+
- npm ou yarn

### Installation

```bash
# Cloner le repository
git clone https://github.com/votre-org/keren-rabbi-israel-centralized.git
cd keren-rabbi-israel-centralized

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec vos clés API

# Créer la base de données
npm run db:push

# Lancer en mode développement
npm run dev

# Build pour la production
npm run build

# Lancer en production
npm start
```

### Configuration PayPal

1. **Créer un compte PayPal Business**
   - Allez sur https://www.paypal.com/business
   - Créez un compte Business

2. **Obtenir les clés API**
   - Connectez-vous au Dashboard PayPal
   - Allez dans "Apps & Credentials"
   - Créez une nouvelle app
   - Copiez le Client ID et Client Secret

3. **Configurer .env**
   ```
   PAYPAL_CLIENT_ID=votre_client_id
   PAYPAL_CLIENT_SECRET=votre_client_secret
   PAYPAL_MODE=live  # ou 'sandbox' pour tester
   ```

### Configuration de la Base de Données

Le site fonctionne **avec ou sans base de données** :
- **Avec DB** : Toutes les fonctionnalités (donations, loterie, commandes)
- **Sans DB** : Boutique en lecture seule, pas de donations

Pour activer la DB :
```env
DATABASE_URL=postgresql://user:password@host:5432/database
```

### Configuration des Images

Voir [IMAGES_INSTRUCTIONS.md](./IMAGES_INSTRUCTIONS.md) pour les détails complets.

Images requises (format WebP) :
- `/client/public/images/rabbi-israel-odesser-1.webp`
- `/client/public/images/rabbi-israel-odesser-2.webp`
- `/client/public/images/rabbi-israel-odesser-3.webp`
- `/client/public/images/rabbi-nachman-breslov.webp`

## 📋 Structure du Projet

```
keren-rabbi-israel-centralized/
├── client/                     # Frontend React + TypeScript
│   ├── src/
│   │   ├── components/        # Composants réutilisables
│   │   ├── pages/             # Pages principales
│   │   │   ├── home.tsx       # Page d'accueil (NOUVEAU design)
│   │   │   ├── donate.tsx     # Page de donation (NOUVEAU)
│   │   │   ├── store.tsx      # Boutique
│   │   │   └── ...
│   │   ├── contexts/          # Contexts React (Language, Cart)
│   │   └── hooks/             # Custom hooks
│   └── public/
│       └── images/            # Images des rabbis (WebP)
├── server/                     # Backend Express + TypeScript
│   ├── routes/
│   │   ├── donations.ts       # Routes donations/loterie (NOUVEAU)
│   │   └── ...
│   ├── db.ts                  # Configuration DB
│   ├── storage.ts             # Couche d'accès aux données
│   └── index.ts               # Serveur principal
├── shared/
│   └── schema.ts              # Schéma DB Drizzle (+ tables loterie)
├── .env.example               # Template variables d'environnement
├── IMAGES_INSTRUCTIONS.md     # Guide pour les images
└── README_FR.md              # Ce fichier
```

## 🎯 Fonctionnalités Principales

### Pour les Visiteurs
- ✅ Parcourir le catalogue de livres
- ✅ Voir les détails des produits
- ✅ Lire les enseignements de Rabbi Nachman
- ✅ En savoir plus sur Rabbi Israel Odesser
- ✅ Contacter l'organisation

### Pour les Donateurs
- ✅ Faire des donations en ligne (PayPal/Carte)
- ✅ Participer automatiquement à la loterie
- ✅ Recevoir des reçus de donation
- ✅ Voir l'historique des donations
- ✅ Déductible fiscalement (section 46)

### Pour les Acheteurs
- ✅ Ajouter des livres au panier
- ✅ Choisir parmi différentes variantes (taille, format, reliure)
- ✅ Calcul automatique des frais de port
- ✅ Paiement sécurisé
- ✅ Suivi de commande
- ✅ Réduction de 5% pour les abonnés

### Pour les Administrateurs
- ✅ Gérer les produits
- ✅ Créer des tirages au sort
- ✅ Sélectionner les gagnants
- ✅ Voir les statistiques de donations
- ✅ Gérer les commandes

## 🌐 Support Multilingue

Le site supporte 5 langues :
- 🇮🇱 Hébreu (par défaut)
- 🇬🇧 Anglais
- 🇫🇷 Français
- 🇪🇸 Espagnol
- 🇷🇺 Russe

## 🎨 Technologies Utilisées

### Frontend
- **React 18** - Framework UI
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styles modernes
- **Shadcn/UI** - Composants UI
- **Wouter** - Routing léger
- **TanStack Query** - Gestion d'état async

### Backend
- **Express** - Serveur web
- **TypeScript** - Typage statique
- **Drizzle ORM** - ORM moderne
- **PostgreSQL** - Base de données
- **Stripe & PayPal** - Paiements

### Services
- **SendGrid** - Emails transactionnels
- **Google Gemini** - Chat AI (optionnel)
- **OpenAI** - Chat assistant (optionnel)

## 🔒 Sécurité

- ✅ Validation côté serveur pour tous les prix
- ✅ Protection CSRF
- ✅ Paiements PCI-DSS via Stripe/PayPal
- ✅ Sanitization des inputs
- ✅ Rate limiting sur les APIs
- ✅ Sessions sécurisées
- ✅ HTTPS obligatoire en production

## 📊 Base de Données - Schéma

### Tables Principales

#### `donations`
Stocke toutes les donations avec :
- Informations du donateur
- Montant et devise
- Méthode de paiement
- Statut du paiement
- Participation à la loterie

#### `lottery_draws`
Gère les tirages au sort :
- Dates de début/fin
- Montant du prix
- Statut (actif, terminé, etc.)
- Gagnant sélectionné

#### `lottery_entries`
Entrées dans la loterie :
- Référence à la donation
- Nombre de tickets
- Informations du participant

#### `products`, `orders`, `order_items`
Système complet e-commerce

## 🚢 Déploiement

### Render.com (Recommandé)

1. **Créer un nouveau Web Service**
2. **Connecter votre repo GitHub**
3. **Configuration** :
   ```
   Build Command: npm install && npm run build
   Start Command: npm start
   ```
4. **Ajouter les variables d'environnement** depuis .env.example
5. **Déployer** 🚀

### Variables d'Environnement Essentielles

```env
DATABASE_URL=...              # PostgreSQL URL
PAYPAL_CLIENT_ID=...         # PayPal API
PAYPAL_CLIENT_SECRET=...     # PayPal Secret
STRIPE_SECRET_KEY=...        # Stripe (optionnel)
SENDGRID_API_KEY=...         # Emails
SESSION_SECRET=...           # Sessions
```

## 🎮 Utilisation de la Loterie

### Créer un Tirage

```javascript
// Via l'API ou directement en DB
POST /api/lottery/draws/create
{
  "nameHebrew": "הגרלה חודשית - ינואר 2025",
  "name": "Monthly Draw - January 2025",
  "prizeAmount": 500000,  // 5000 ₪ en agorot
  "startDate": "2025-01-01",
  "endDate": "2025-01-31",
  "drawDate": "2025-02-01",
  "minimumDonation": 1800  // 18 ₪
}
```

### Processus de Donation

1. **Utilisateur fait un don** sur `/donate`
2. **Paiement via PayPal** (ou Stripe)
3. **Webhook confirme le paiement**
4. **Inscription automatique** dans `lottery_entries`
5. **Calcul des tickets** : 1 ticket par 18 ₪

### Sélectionner un Gagnant

```javascript
// Algorithme de sélection aléatoire basé sur les tickets
// Chaque ticket a une chance égale
```

## 📱 Responsive Design

Le site est **100% responsive** :
- 📱 **Mobile** : 320px - 768px
- 📱 **Tablette** : 768px - 1024px
- 💻 **Desktop** : 1024px+
- 🖥️ **Large Desktop** : 1440px+

Optimisations mobile :
- Touch-friendly buttons
- Swipe gestures
- Optimized images (WebP)
- Fast loading times

## 🧪 Tests

```bash
# Lancer les tests (à venir)
npm test

# Vérifier le type checking
npm run check

# Linter
npm run lint
```

## 📞 Support et Contact

### Pour les utilisateurs
- **Email** : support@keren-rabbi-israel.org
- **Téléphone** : +972-XX-XXX-XXXX
- **WhatsApp** : Groupes multilingues disponibles

### Pour les développeurs
- **Issues GitHub** : [github.com/votre-org/repo/issues](https://github.com)
- **Email technique** : dev@keren-rabbi-israel.org

## 📜 Licence

Copyright © 2025 Keren Rabbi Israel Dov Odesser. Tous droits réservés.

## 🙏 Remerciements

- Rabbi Nachman de Breslov זצוקללה"ה
- Rabbi Israel Dov Odesser זצ"ל
- Toute la communauté Breslov mondiale
- Les contributeurs open-source

---

**Développé avec ❤️ pour la diffusion de la Torah de Rabbi Nachman**

Na Nach Nachma Nachman Meuman! 🎵
