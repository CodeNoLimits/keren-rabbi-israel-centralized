#!/bin/bash

# 🚀 SCRIPT D'AUTOMATISATION SETUP COMPLET
# Exécute tout le setup automatiquement

set -e  # Arrêt en cas d'erreur

echo "🔥 Démarrage du setup automatisé pour remplacer Replit..."
echo "=================================================="

# Détection OS
if [[ "$OSTYPE" == "darwin"* ]]; then
    OS="mac"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    OS="linux"
elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    OS="windows"
else
    echo "❌ OS non supporté: $OSTYPE"
    exit 1
fi

echo "✅ OS détecté: $OS"

# Installation Homebrew (Mac) ou équivalents
install_package_manager() {
    if [[ "$OS" == "mac" ]]; then
        if ! command -v brew &> /dev/null; then
            echo "📦 Installation Homebrew..."
            /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
        else
            echo "✅ Homebrew déjà installé"
        fi
    elif [[ "$OS" == "linux" ]]; then
        # Mise à jour des paquets
        sudo apt update && sudo apt upgrade -y
    fi
}

# Installation Node.js et npm
install_nodejs() {
    echo "📦 Vérification Node.js..."
    
    if ! command -v node &> /dev/null || [[ $(node -v | cut -d'v' -f2 | cut -d'.' -f1) -lt 18 ]]; then
        echo "📦 Installation Node.js 18+..."
        
        if [[ "$OS" == "mac" ]]; then
            brew install node
        elif [[ "$OS" == "linux" ]]; then
            curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
            sudo apt-get install -y nodejs
        fi
    else
        echo "✅ Node.js $(node -v) déjà installé"
    fi
}

# Installation Cursor
install_cursor() {
    echo "🎯 Installation Cursor..."
    
    if [[ "$OS" == "mac" ]]; then
        if ! command -v cursor &> /dev/null; then
            brew install --cask cursor
            echo "✅ Cursor installé via Homebrew"
        else
            echo "✅ Cursor déjà installé"
        fi
    elif [[ "$OS" == "linux" ]]; then
        if ! command -v cursor &> /dev/null; then
            # Téléchargement et installation Cursor Linux
            curl -fsSL https://download.todesktop.com/210313leapfrogai/linux -o cursor-linux.AppImage
            chmod +x cursor-linux.AppImage
            sudo mv cursor-linux.AppImage /usr/local/bin/cursor
            echo "✅ Cursor installé pour Linux"
        else
            echo "✅ Cursor déjà installé"
        fi
    fi
}

# Installation des outils globaux
install_global_tools() {
    echo "🛠️ Installation des outils globaux..."
    
    # Vercel CLI
    if ! command -v vercel &> /dev/null; then
        npm install -g vercel
        echo "✅ Vercel CLI installé"
    fi
    
    # Supabase CLI
    if ! command -v supabase &> /dev/null; then
        if [[ "$OS" == "mac" ]]; then
            brew install supabase/tap/supabase
        else
            npm install -g supabase
        fi
        echo "✅ Supabase CLI installé"
    fi
    
    # Live Server (pour les tests)
    npm install -g live-server
    echo "✅ Live Server installé"
}

# Configuration du projet
setup_project() {
    echo "🔧 Configuration du projet..."
    
    # Installation des dépendances
    if [ -f "package.json" ]; then
        npm install
        echo "✅ Dépendances installées"
    else
        echo "❌ package.json non trouvé"
        exit 1
    fi
    
    # Installation des dépendances Supabase
    npm install @supabase/supabase-js
    echo "✅ Supabase client installé"
}

# Création des fichiers de configuration
create_config_files() {
    echo "📝 Création des fichiers de configuration..."
    
    # .env.example
    cat > .env.example << 'EOF'
# Configuration Supabase
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=votre-cle-anon

# Configuration Vercel (optionnel)
VERCEL_TOKEN=votre-token-vercel

# Configuration développement
VITE_DEV_MODE=true
VITE_API_BASE_URL=http://localhost:3000
EOF

    # vercel.json
    cat > vercel.json << 'EOF'
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "functions": {
    "client/src/pages/*.tsx": {
      "runtime": "nodejs18.x"
    }
  },
  "rewrites": [
    {
      "source": "/((?!api/.*).*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
EOF

    echo "✅ Fichiers de configuration créés"
}

# Scripts package.json
update_package_scripts() {
    echo "📝 Mise à jour des scripts package.json..."
    
    # Backup du package.json existant
    cp package.json package.json.backup
    
    # Utilisation de node pour modifier package.json
    node -e "
        const fs = require('fs');
        const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
        
        pkg.scripts = {
            ...pkg.scripts,
            'dev:full': 'concurrently \"npm run dev\" \"live-server dist --port=8080\"',
            'build:analyze': 'npm run build && npx vite-bundle-analyzer',
            'deploy': 'vercel --prod',
            'deploy:preview': 'vercel',
            'db:reset': 'supabase db reset',
            'db:migrate': 'supabase db push',
            'setup:cursor': 'code --install-extension ritwickdey.liveserver && code --install-extension eamodio.gitlens',
            'test:preview': 'npm run build && live-server dist --port=8080'
        };
        
        fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
        console.log('✅ Scripts package.json mis à jour');
    "
}

# Configuration Git
setup_git() {
    echo "🔧 Configuration Git..."
    
    # .gitignore amélioré
    cat >> .gitignore << 'EOF'

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Supabase
.supabase/

# Vercel
.vercel

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Editor directories and files
.vscode/*
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json
*.swp
*.swo
*~

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*

# Temporary files
*.tmp
*.temp
.cache/
EOF

    echo "✅ .gitignore mis à jour"
}

# Exécution des fonctions
echo "🚀 Début de l'installation automatisée..."

install_package_manager
install_nodejs
install_cursor
install_global_tools
setup_project
create_config_files
update_package_scripts
setup_git

echo ""
echo "🎉 SETUP AUTOMATISÉ TERMINÉ !"
echo "================================"
echo ""
echo "📋 Prochaines étapes manuelles :"
echo "1. Ouvrir Cursor: cursor ."
echo "2. Configurer Supabase (voir guide)"
echo "3. Déployer sur Vercel: npm run deploy"
echo ""
echo "💰 Économies réalisées: ~80$/mois vs Replit"
echo ""
echo "🔥 Environnement prêt pour le développement !"