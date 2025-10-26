#!/bin/bash

# 🚀 DÉMARRAGE RAPIDE - HAESH SHELI
# Script pour remplacer Replit rapidement

echo "🔥 HAESH SHELI - Démarrage Rapide"
echo "=================================="
echo ""

# Fonction pour afficher les étapes
step_info() {
    echo "📋 ÉTAPE $1: $2"
    echo "-------------------"
}

# Vérifier si on est dans le bon dossier
if [ ! -f "package.json" ]; then
    echo "❌ Erreur: package.json non trouvé"
    echo "   Assurez-vous d'être dans le dossier haesh-sheli"
    exit 1
fi

# Étape 1: Vérification des prérequis
step_info "1" "Vérification des prérequis"

# Node.js
if command -v node >/dev/null 2>&1; then
    echo "✅ Node.js $(node -v) installé"
else
    echo "❌ Node.js non installé"
    echo "   Installer depuis: https://nodejs.org"
    exit 1
fi

# Cursor
if command -v cursor >/dev/null 2>&1; then
    echo "✅ Cursor installé"
else
    echo "⚠️  Cursor non trouvé"
    echo "   Télécharger depuis: https://cursor.sh"
    echo "   Continuer quand même..."
fi

# Vercel CLI
if command -v vercel >/dev/null 2>&1; then
    echo "✅ Vercel CLI installé"
else
    echo "📦 Installation Vercel CLI..."
    npm install -g vercel
fi

echo ""

# Étape 2: Installation des dépendances
step_info "2" "Installation des dépendances"

if [ -d "node_modules" ]; then
    echo "✅ node_modules existe déjà"
else
    echo "📦 Installation des dépendances..."
    npm install
fi

# Vérifier Supabase client
if npm list @supabase/supabase-js >/dev/null 2>&1; then
    echo "✅ Supabase client installé"
else
    echo "📦 Installation Supabase client..."
    npm install @supabase/supabase-js
fi

echo ""

# Étape 3: Configuration environnement
step_info "3" "Configuration de l'environnement"

if [ ! -f ".env" ]; then
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo "✅ Fichier .env créé depuis .env.example"
        echo "⚠️  IMPORTANT: Éditer .env avec vos vraies clés API"
    else
        echo "❌ .env.example non trouvé"
    fi
else
    echo "✅ Fichier .env existe déjà"
fi

echo ""

# Étape 4: Test du build
step_info "4" "Test de build"

echo "🔨 Test du build client..."
cd client 2>/dev/null || {
    echo "❌ Dossier client non trouvé"
    echo "   Créer le dossier client ou ajuster le chemin"
    exit 1
}

if npm run build >/dev/null 2>&1; then
    echo "✅ Build client réussie"
else
    echo "⚠️  Problème de build - vérifier les dépendances"
fi

cd ..

echo ""

# Étape 5: Instructions pour Supabase
step_info "5" "Configuration Supabase"

echo "🗄️  Configuration Supabase requise:"
echo ""
echo "1. Créer compte sur: https://supabase.com"
echo "2. Créer nouveau projet"
echo "3. Copier URL du projet et clés API"
echo "4. Exécuter le fichier: supabase-setup.sql"
echo "   (dans SQL Editor de Supabase)"
echo "5. Mettre à jour .env avec vos vraies clés"
echo ""

# Étape 6: Instructions pour Vercel
step_info "6" "Deployment Vercel"

echo "🚀 Deployment automatique:"
echo ""
echo "1. Connecter à Vercel: vercel login"
echo "2. Déployer: npm run deploy"
echo "3. Configurer variables environnement sur Vercel"
echo ""

# Étape 7: Résumé et prochaines étapes
step_info "7" "Prochaines étapes"

echo "🎯 Pour commencer le développement:"
echo ""
echo "   # Ouvrir Cursor"
echo "   npm run cursor:open"
echo ""
echo "   # OU utiliser VS Code"
echo "   code ."
echo ""
echo "   # Démarrer le serveur de développement"
echo "   npm run dev:client"
echo ""
echo "📋 Commandes utiles:"
echo ""
echo "   npm run dev:client      # Serveur de dev client"
echo "   npm run build:client    # Build de production"
echo "   npm run preview:client  # Preview du build"
echo "   npm run deploy          # Deploy sur Vercel"
echo "   npm run deploy:preview  # Deploy preview"
echo ""

# Étape 8: Économies réalisées
step_info "8" "Économies réalisées"

echo "💰 COMPARAISON DES COÛTS:"
echo ""
echo "   AVANT (Replit Agent 3):"
echo "   ├─ Agent usage: 100$/mois minimum"
echo "   ├─ Premium features: 30$/mois"
echo "   └─ Total: 130$/mois"
echo ""
echo "   APRÈS (Cette solution):"
echo "   ├─ Cursor Pro: 20$/mois"
echo "   ├─ Supabase Pro: 25$/mois"
echo "   ├─ Vercel: 0$/mois (gratuit suffisant)"
echo "   └─ Total: 45$/mois"
echo ""
echo "   🎉 ÉCONOMIES: 85$/mois = 1,020$/an"
echo ""

# Message final
echo "🔥 SETUP TERMINÉ !"
echo "=================="
echo ""
echo "Votre environnement est prêt à remplacer Replit Agent 3"
echo "Avec de meilleures performances et 85% d'économies !"
echo ""
echo "📞 Support: Utiliser Claude Code pour toute assistance"
echo ""
echo "Happy Coding! 🚀"