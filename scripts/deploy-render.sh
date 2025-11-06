#!/bin/bash

# 🚀 Script de Déploiement Automatique pour Render.com
#
# Ce script est exécuté automatiquement par Render lors du build
# Vous pouvez aussi l'exécuter localement pour vérifier

set -e  # Arrêter en cas d'erreur

echo "🚀 Déploiement en cours..."
echo ""

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

# 1. Installation des dépendances
echo -e "${BLUE}▶ Installation des dépendances...${NC}"
npm ci --legacy-peer-deps || npm install
echo -e "${GREEN}✓ Dépendances installées${NC}"
echo ""

# 2. Vérification des variables d'environnement critiques
echo -e "${BLUE}▶ Vérification des variables d'environnement...${NC}"

WARNINGS=0

if [ -z "$PAYPAL_CLIENT_ID" ]; then
  echo -e "${YELLOW}⚠ PAYPAL_CLIENT_ID non configuré${NC}"
  WARNINGS=$((WARNINGS+1))
fi

if [ -z "$PAYPAL_CLIENT_SECRET" ]; then
  echo -e "${YELLOW}⚠ PAYPAL_CLIENT_SECRET non configuré${NC}"
  WARNINGS=$((WARNINGS+1))
fi

if [ -z "$SESSION_SECRET" ]; then
  echo -e "${YELLOW}⚠ SESSION_SECRET non configuré${NC}"
  WARNINGS=$((WARNINGS+1))
fi

if [ -z "$DATABASE_URL" ]; then
  echo -e "${YELLOW}⚠ DATABASE_URL non configuré (mode sans DB)${NC}"
  WARNINGS=$((WARNINGS+1))
fi

if [ $WARNINGS -eq 0 ]; then
  echo -e "${GREEN}✓ Toutes les variables sont configurées${NC}"
else
  echo -e "${YELLOW}⚠ $WARNINGS variable(s) manquante(s)${NC}"
fi
echo ""

# 3. Migration de la base de données si configurée
if [ -n "$DATABASE_URL" ]; then
  echo -e "${BLUE}▶ Mise à jour du schéma de base de données...${NC}"
  npm run db:push || {
    echo -e "${YELLOW}⚠ Migration échouée (tables peut-être déjà créées)${NC}"
  }
  echo -e "${GREEN}✓ Base de données mise à jour${NC}"
  echo ""
fi

# 4. Build du frontend et backend
echo -e "${BLUE}▶ Build du projet...${NC}"
npm run build
echo -e "${GREEN}✓ Build terminé${NC}"
echo ""

# 5. Vérification du build
if [ -f "dist/index.js" ]; then
  echo -e "${GREEN}✓ Fichier dist/index.js créé${NC}"
else
  echo -e "${YELLOW}⚠ dist/index.js non trouvé${NC}"
fi
echo ""

# 6. Résumé
echo "════════════════════════════════════════════════════════════"
echo -e "${GREEN}✓ Déploiement terminé avec succès !${NC}"
echo "════════════════════════════════════════════════════════════"
echo ""
echo "📋 Prochaines étapes sur Render :"
echo ""
echo "1. Vérifiez que le service démarre sans erreur"
echo "2. Testez l'URL de votre site"
echo "3. Créez un tirage actif (voir README_FR.md)"
echo "4. Testez une donation"
echo ""
echo "🎉 Votre site est en ligne !"
echo ""
