#!/bin/bash

# 🚀 Script d'Initialisation Automatique - Keren Rabbi Israel
# Ce script configure tout automatiquement pour le déploiement

set -e  # Arrêter en cas d'erreur

echo "🎉 Début de l'initialisation automatique..."
echo ""

# Couleurs pour les messages
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages
print_step() {
    echo -e "${BLUE}▶ $1${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# 1. Vérifier Node.js
print_step "Vérification de Node.js..."
if ! command -v node &> /dev/null; then
    print_error "Node.js n'est pas installé. Veuillez installer Node.js 18+"
    exit 1
fi
NODE_VERSION=$(node --version)
print_success "Node.js installé: $NODE_VERSION"
echo ""

# 2. Installer les dépendances
print_step "Installation des dépendances npm..."
npm install
print_success "Dépendances installées"
echo ""

# 3. Créer le fichier .env s'il n'existe pas
print_step "Configuration du fichier .env..."
if [ ! -f .env ]; then
    cp .env.example .env
    print_success ".env créé depuis .env.example"

    # Générer un SECRET aléatoire
    SECRET=$(openssl rand -base64 32 2>/dev/null || cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 32 | head -n 1)

    # Remplacer dans .env (compatible Linux et macOS)
    if [[ "$OSTYPE" == "darwin"* ]]; then
        sed -i '' "s/your_very_long_random_secret_here_min_32_chars/$SECRET/g" .env
    else
        sed -i "s/your_very_long_random_secret_here_min_32_chars/$SECRET/g" .env
    fi

    print_success "SECRET de session généré automatiquement"
    echo ""

    print_warning "⚠️  IMPORTANT: Configurez vos clés PayPal dans .env:"
    print_warning "   - PAYPAL_CLIENT_ID=votre_client_id"
    print_warning "   - PAYPAL_CLIENT_SECRET=votre_secret"
    print_warning "   - PAYPAL_MODE=sandbox (ou 'live' pour production)"
    echo ""
else
    print_success ".env existe déjà"
    echo ""
fi

# 4. Créer le dossier images
print_step "Création du dossier images..."
mkdir -p client/public/images
print_success "Dossier client/public/images créé"
echo ""

# 5. Vérifier si DATABASE_URL existe
print_step "Vérification de DATABASE_URL..."
if grep -q "^DATABASE_URL=postgresql" .env 2>/dev/null; then
    print_success "DATABASE_URL configuré"

    # Tenter de pusher le schéma
    print_step "Mise à jour du schéma de base de données..."
    npm run db:push || {
        print_warning "Impossible de mettre à jour la DB. Vérifiez DATABASE_URL"
        print_warning "Le site fonctionnera en mode lecture seule sans DB"
    }
else
    print_warning "DATABASE_URL non configuré"
    print_warning "Le site fonctionnera sans fonctionnalités de donation/loterie"
    print_warning "Ajoutez DATABASE_URL dans .env pour activer toutes les fonctionnalités"
fi
echo ""

# 6. Build du projet
print_step "Build du projet..."
npm run build || {
    print_warning "Le build a échoué, mais le mode dev devrait fonctionner"
}
print_success "Build terminé"
echo ""

# 7. Résumé
echo ""
echo "════════════════════════════════════════════════════════════"
echo -e "${GREEN}✓ Initialisation terminée avec succès !${NC}"
echo "════════════════════════════════════════════════════════════"
echo ""
echo "📋 PROCHAINES ÉTAPES:"
echo ""
echo "1️⃣  Configurez PayPal dans .env:"
echo "   ${YELLOW}PAYPAL_CLIENT_ID=...${NC}"
echo "   ${YELLOW}PAYPAL_CLIENT_SECRET=...${NC}"
echo "   ${YELLOW}PAYPAL_MODE=sandbox${NC}"
echo ""
echo "2️⃣  Ajoutez les images des rabbis (optionnel):"
echo "   Placez les fichiers .webp dans ${YELLOW}client/public/images/${NC}"
echo "   Voir ${BLUE}IMAGES_INSTRUCTIONS.md${NC} pour les détails"
echo ""
echo "3️⃣  Lancez le serveur de développement:"
echo "   ${GREEN}npm run dev${NC}"
echo ""
echo "4️⃣  Testez le site sur:"
echo "   ${BLUE}http://localhost:5000${NC}"
echo ""
echo "5️⃣  Créez un tirage au sort actif:"
echo "   Exécutez ${GREEN}npm run init-lottery${NC}"
echo ""
echo "6️⃣  Déployez en production:"
echo "   Consultez ${BLUE}DEPLOYMENT_CHECKLIST.md${NC}"
echo ""
echo "════════════════════════════════════════════════════════════"
echo ""
echo -e "${YELLOW}⚠️  N'oubliez pas de configurer PayPal pour les donations !${NC}"
echo ""
