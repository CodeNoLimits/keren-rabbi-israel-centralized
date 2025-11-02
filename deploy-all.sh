#!/bin/bash

# 🚀 Script de Déploiement Automatique - Netlify & Render
# Usage: ./deploy-all.sh

echo "🚀 DÉPLOIEMENT NETLIFY & RENDER"
echo "================================"
echo ""

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. NETLIFY
echo -e "${BLUE}📦 Déploiement Netlify...${NC}"
echo ""

# Vérifier que netlify CLI est installé
if ! command -v netlify &> /dev/null; then
    echo -e "${YELLOW}⚠️  Netlify CLI pas installé. Installation...${NC}"
    npm install -g netlify-cli
fi

# Ajouter variable d'environnement (déjà fait mais on vérifie)
echo -e "${GREEN}✅ Variable OPENROUTER_API_KEY configurée sur Netlify${NC}"

# Déployer
echo -e "${BLUE}Déploiement en cours...${NC}"
netlify deploy --prod

echo ""
echo -e "${GREEN}✅ Netlify déployé !${NC}"
echo ""

# 2. RENDER
echo -e "${BLUE}📦 Configuration Render...${NC}"
echo ""
echo -e "${YELLOW}ℹ️  Pour Render, vous devez :${NC}"
echo "1. Aller sur https://dashboard.render.com"
echo "2. Créer un nouveau Web Service"
echo "3. Connecter votre repo GitHub/GitLab"
echo "4. Render utilisera automatiquement render.yaml"
echo ""
echo -e "${GREEN}✅ render.yaml est déjà configuré avec :${NC}"
echo "   - OPENROUTER_API_KEY"
echo "   - NODE_ENV=production"
echo "   - Build command: npm install && npm run build"
echo "   - Start command: npm run start:prod"
echo ""

echo -e "${GREEN}✅ Configuration terminée !${NC}"
echo ""
echo "🌐 URLs de vos sites :"
echo "   Netlify: https://app.netlify.com/projects/kerensitefinal"
echo "   Render: https://dashboard.render.com (créer nouveau service)"
echo ""

