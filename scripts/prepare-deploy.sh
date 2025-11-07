#!/bin/bash

# 🚀 Script de Préparation au Déploiement
# Prépare votre projet pour Render.com ou Netlify

set -e  # Arrêter en cas d'erreur

# Couleurs pour output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Banner
echo -e "${PURPLE}"
echo "╔══════════════════════════════════════════════════════╗"
echo "║   🚀 PRÉPARATION AU DÉPLOIEMENT                    ║"
echo "║   Keren Rabbi Israel                                ║"
echo "╚══════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Fonction pour afficher les étapes
print_step() {
    echo -e "${BLUE}▶${NC} $1"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

# Vérifier Git
print_step "Vérification de Git..."
if ! command -v git &> /dev/null; then
    print_error "Git non installé"
    exit 1
fi
print_success "Git OK"

# Vérifier les fichiers requis
print_step "Vérification des fichiers..."
for file in "render.yaml" "netlify.toml" "package.json"; do
    if [ -f "$file" ]; then
        print_success "$file trouvé"
    else
        print_error "$file manquant"
    fi
done

# Test de build
print_step "Test de build..."
if npm run build > /dev/null 2>&1; then
    print_success "Build réussi"
else
    print_error "Build échoué"
    exit 1
fi

# Vérifier Git status
print_step "Statut Git..."
if [ -n "$(git status --porcelain)" ]; then
    print_warning "Changements non committés détectés"
else
    print_success "Working tree propre"
fi

# Banner final
echo ""
echo -e "${GREEN}╔══════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║  ✅ PRÊT POUR LE DÉPLOIEMENT !                     ║${NC}"
echo -e "${GREEN}╚══════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${PURPLE}🎯 CHOISISSEZ VOTRE PLATEFORME:${NC}"
echo ""
echo -e "${BLUE}1. RENDER.COM${NC} ${GREEN}(RECOMMANDÉ)${NC} ⭐⭐⭐⭐⭐"
echo -e "   • Support complet Express + PostgreSQL"
echo -e "   • Setup en 10 minutes"
echo -e "   • Guide: ${YELLOW}DEPLOIEMENT_RAPIDE.md${NC}"
echo ""
echo -e "${BLUE}2. NETLIFY${NC} ${YELLOW}(Limité)${NC} ⭐⭐"
echo -e "   • Seulement pour sites statiques"
echo -e "   • Nécessite conversion serverless"
echo -e "   • Guide: ${YELLOW}DEPLOIEMENT_RAPIDE.md${NC}"
echo ""
echo -e "${PURPLE}📚 Guides disponibles:${NC}"
echo -e "   • ${BLUE}DEPLOIEMENT_RAPIDE.md${NC} - Comparaison et choix"
echo -e "   • ${BLUE}GUIDE_RENDER.md${NC} - Déploiement Render détaillé"
echo -e "   • ${BLUE}GUIDE_PAYPAL.md${NC} - Configuration PayPal"
echo ""
echo -e "${PURPLE}Na Nach Nachma Nachman Meuman!${NC} 🎵"
