# 🚀 GUIDE SETUP COMPLET - Environnement Développement Optimal

## 🎯 OBJECTIF
Remplacer Replit Agent 3 coûteux par un environnement plus performant et économique.

---

## 📦 PHASE 1 : INSTALLATION CURSOR (30 minutes)

### Étape 1 : Téléchargement Cursor
```bash
# Option 1 : Site officiel
# Aller sur : https://cursor.sh
# Télécharger la version pour ton OS

# Option 2 : Homebrew (Mac)
brew install --cask cursor

# Option 3 : Winget (Windows)
winget install cursor
```

### Étape 2 : Configuration Initiale
1. **Lancer Cursor**
2. **Connecter compte** (GitHub recommandé)
3. **Choisir plan** : Pro 20$/mois
4. **Importer settings** VS Code existants (si applicable)

### Étape 3 : Extensions Essentielles
```bash
# Dans Cursor, installer ces extensions :
- Live Server (ritwickdey.liveserver)
- GitLens (eamodio.gitlens) 
- Thunder Client (rangav.vscode-thunder-client)
- Prettier (esbenp.prettier-vscode)
- Auto Rename Tag (formulahendry.auto-rename-tag)
- Bracket Pair Colorizer (coenraads.bracket-pair-colorizer)
- ES7+ React/Redux Snippets (dsznajder.es7-react-js-snippets)
```

### Étape 4 : Configuration Live Preview
```bash
# Créer un fichier test
mkdir test-preview && cd test-preview
echo '<!DOCTYPE html><html><body><h1>Test Preview</h1></body></html>' > index.html

# Dans Cursor :
# 1. Ouvrir le dossier
# 2. Clic droit sur index.html
# 3. "Open with Live Server"
# 4. Vérifier preview temps réel
```

---

## 🗄️ PHASE 2 : BASE DE DONNÉES SUPABASE (20 minutes)

### Étape 1 : Création Compte
1. **Aller sur** : https://supabase.com
2. **Sign up** avec GitHub
3. **Créer nouveau projet**
   - Nom : "haesh-sheli-db"
   - Région : Europe West (Irlande)
   - Plan : Pro (25$/mois)

### Étape 2 : Configuration Database
```sql
-- Dans Supabase SQL Editor :

-- Table des livres
CREATE TABLE books (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  title_hebrew TEXT,
  author TEXT NOT NULL,
  price DECIMAL(10,2),
  category TEXT,
  language TEXT DEFAULT 'he',
  image_url TEXT,
  description TEXT,
  stock_quantity INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des commandes  
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_email TEXT NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  shipping_address JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des éléments de commande
CREATE TABLE order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id),
  book_id UUID REFERENCES books(id),
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL
);

-- Données d'exemple
INSERT INTO books (title, title_hebrew, author, price, category, language, description) VALUES
('Likutey Moharan Vol 1', 'ליקוטי מוהר"ן חלק א', 'Rabbi Nachman', 89.90, 'Torah', 'he', 'Enseignements principaux du Rabbi'),
('Sippurei Maasiyot', 'ספורי מעשיות', 'Rabbi Nachman', 65.00, 'Stories', 'he', 'Les 13 contes du Rabbi'),
('Likutey Tefilot', 'ליקוטי תפילות', 'Rabbi Nathan', 75.00, 'Prayer', 'he', 'Prières basées sur les enseignements');
```

### Étape 3 : Configuration API
```bash
# Copier les variables d'environnement :
# Project Settings > API > Project URL & API Keys

# Créer fichier .env dans ton projet :
VITE_SUPABASE_URL=https://ton-projet.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1...
```

---

## 🌐 PHASE 3 : DEPLOYMENT VERCEL (15 minutes)

### Étape 1 : Préparation du Projet
```bash
# Dans ton projet haesh-sheli
npm install @supabase/supabase-js

# Créer vercel.json
echo '{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev"
}' > vercel.json
```

### Étape 2 : Deployment
1. **Aller sur** : https://vercel.com
2. **Sign up** avec GitHub
3. **Import project** : haesh-sheli repository
4. **Configure** :
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. **Environment Variables** :
   - `VITE_SUPABASE_URL` : ton URL Supabase
   - `VITE_SUPABASE_ANON_KEY` : ta clé API
6. **Deploy**

### Étape 3 : Configuration Auto-Deploy
- Chaque push sur `main` = deploy automatique
- Preview URLs pour les PR
- Analytics incluses

---

## 🔄 PHASE 4 : WORKFLOW QUOTIDIEN

### Développement Local
```bash
# 1. Ouvrir Cursor
cursor .

# 2. Lancer dev server  
npm run dev

# 3. Activer Live Server (si nécessaire)
# Clic droit sur index.html > "Open with Live Server"

# 4. Développer avec IA Cursor
# Ctrl+K = AI chat
# Ctrl+L = AI edit mode
# Tab = Accept suggestion
```

### Testing & Deployment
```bash
# 1. Tests locaux
npm run build
npm run preview

# 2. Commit & Push
git add .
git commit -m "Feature: nouvelle fonctionnalité"
git push origin main

# 3. Auto-deploy Vercel (automatique)
# 4. Vérifier sur l'URL de production
```

---

## 💰 PHASE 5 : OPTIMISATION BUDGET

### Analyse des Coûts
```text
AVANT (Replit Agent 3) : 100$/mois minimum
├─ Agent usage : 70$/mois
├─ Premium features : 30$/mois
└─ Total : 100$/mois

APRÈS (Solution optimisée) : 50$/mois
├─ Cursor Pro : 20$/mois
├─ Supabase Pro : 25$/mois  
├─ Vercel Pro : 0$/mois (gratuit suffisant)
└─ Total : 45$/mois

ÉCONOMIES : 55$/mois = 660$/an
```

### Optimisations Additionnelles
```bash
# Si besoin d'économiser plus :

# Option 1 : Supabase Free (limite 2 projets)
TOTAL : 20$/mois

# Option 2 : Database locale (PostgreSQL)
brew install postgresql
TOTAL : 20$/mois

# Option 3 : GitHub Codespaces (120h gratuites/mois)
TOTAL : 0$/mois pour développement occasionnel
```

---

## 🔧 PHASE 6 : CONFIGURATION AVANCÉE

### Cursor AI Configuration
```json
// settings.json dans Cursor
{
  "cursor.chat.model": "claude-3.5-sonnet",
  "cursor.autocomplete.enabled": true,
  "cursor.autocomplete.languageSupport": {
    "typescript": true,
    "javascript": true,
    "react": true,
    "vue": true,
    "html": true,
    "css": true
  },
  "cursor.chat.commandPalette": true
}
```

### Scripts Automation
```bash
# package.json - Scripts utiles
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "vercel --prod",
    "db:reset": "supabase db reset",
    "db:migrate": "supabase db push"
  }
}
```

### Mobile Preview Setup
```bash
# Installation ngrok pour preview mobile
npm install -g ngrok

# Usage
ngrok http 3000
# Utiliser l'URL générée sur mobile
```

---

## 📱 PHASE 7 : WORKFLOW MOBILE & COLLABORATION

### Preview Mobile
```bash
# Option 1 : ngrok tunnel
ngrok http 5173  # Port Vite par défaut
# Utiliser l'URL https://xxxxx.ngrok.io sur mobile

# Option 2 : Vercel Preview URLs
# Chaque push = URL preview automatique
# Partager l'URL pour tests mobile
```

### Collaboration
```bash
# Cursor Live Share (gratuit)
# 1. Cmd+Shift+P > "Live Share: Start Session"
# 2. Partager le lien
# 3. Collaboration temps réel

# Git Workflow
git checkout -b feature/nouvelle-fonctionnalite
# Développer
git push origin feature/nouvelle-fonctionnalite
# Créer PR sur GitHub
# Merge après review
```

---

## 🚀 PHASE 8 : MIGRATION DESDE REPLIT

### Export des Données
```bash
# 1. Dans Replit, télécharger le projet complet
# 2. Extraire dans nouveau dossier local
# 3. Nettoyer les fichiers Replit-specific

# Fichiers à supprimer :
rm .replit
rm replit.nix
rm .gitignore.replit
```

### Migration Base de Données
```sql
-- Si tu as une DB Replit existante :
-- 1. Export SQL depuis Replit
-- 2. Import dans Supabase :

-- Dans Supabase SQL Editor :
-- Coller ton export SQL existant
-- Ou utiliser l'outil d'import CSV
```

### Test de Migration
```bash
# 1. Ouvrir projet migré dans Cursor
# 2. Installer dépendances
npm install

# 3. Configurer variables environnement
cp .env.example .env
# Remplir avec tes nouvelles configs

# 4. Tester localement
npm run dev

# 5. Build de production
npm run build

# 6. Deploy initial
vercel --prod
```

---

## 📊 PHASE 9 : MONITORING & ANALYTICS

### Performance Monitoring
```bash
# Dans package.json, ajouter :
{
  "scripts": {
    "analyze": "vite-bundle-analyzer",
    "lighthouse": "lighthouse https://ton-site.vercel.app"
  }
}

npm install -D vite-bundle-analyzer lighthouse
```

### Analytics Setup
```html
<!-- Dans index.html -->
<!-- Google Analytics 4 (gratuit) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Error Tracking
```bash
# Sentry (gratuit jusqu'à 5k erreurs/mois)
npm install @sentry/react @sentry/vite-plugin

# Configuration basique dans main.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "TON_SENTRY_DSN",
  environment: import.meta.env.MODE,
});
```

---

## 🎯 CHECKLIST FINAL

### Avant de Quitter Replit
- [ ] Export complet du code
- [ ] Sauvegarde base de données 
- [ ] Liste des dépendances/packages
- [ ] Documentation des configs spéciales
- [ ] Cancel subscription Replit

### Setup Nouvelle Solution
- [ ] Cursor installé et configuré
- [ ] Extensions essentielles installées
- [ ] Supabase configuré avec données
- [ ] Vercel deployment fonctionnel
- [ ] Preview mobile testé
- [ ] Workflow git configuré
- [ ] Variables environnement sécurisées

### Validation Performance
- [ ] Build time < 2 minutes
- [ ] Hot reload < 1 seconde
- [ ] Deploy time < 3 minutes
- [ ] Mobile preview responsive
- [ ] Database queries optimisées
- [ ] SEO basique configuré

---

## 🆘 SUPPORT & TROUBLESHOOTING

### Problèmes Courants

**Cursor ne démarre pas :**
```bash
# Mac
sudo xattr -rd com.apple.quarantine /Applications/Cursor.app

# Windows  
# Exécuter en tant qu'administrateur
```

**Live Server ne fonctionne pas :**
```bash
# Vérifier port disponible
lsof -i :5500
# Changer port dans settings
```

**Build Vercel échoue :**
```bash
# Vérifier Node version
node --version  # Doit être 18+

# Dans vercel.json :
{
  "functions": {
    "app/page.tsx": {
      "runtime": "nodejs18.x"
    }
  }
}
```

### Contacts Support
- **Cursor** : support@cursor.sh
- **Supabase** : support@supabase.io  
- **Vercel** : support@vercel.com
- **Claude Code** : Tu l'utilises déjà ✅

---

## 📈 PROCHAINES ÉTAPES

### Semaine 1 : Setup & Migration
- [ ] Installation complète
- [ ] Migration projet pilote
- [ ] Tests fonctionnalités principales

### Semaine 2 : Optimisation
- [ ] Configuration avancée
- [ ] Workflow automation
- [ ] Performance tuning

### Semaine 3 : Production
- [ ] Migration projets principaux
- [ ] Cancel Replit
- [ ] Documentation équipe

### Semaine 4 : Scale
- [ ] Nouveaux projets
- [ ] Collaboration avancée
- [ ] Monitoring & analytics

---

**🎉 RÉSULTAT FINAL :**
- ✅ Environnement plus rapide que Replit
- ✅ IA plus puissante que Agent 3
- ✅ Économies 660$/an minimum
- ✅ Flexibilité totale
- ✅ Pas de vendor lock-in

**Questions ? Contact Claude Code pour assistance !**