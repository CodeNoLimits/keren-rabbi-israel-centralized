#!/bin/bash

# 🔍 Script de Vérification de Configuration
# Vérifie que tout est prêt pour le déploiement

set -e

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo "🔍 Vérification de la configuration..."
echo ""

ERRORS=0
WARNINGS=0

# Vérifier .env
if [ ! -f .env ]; then
    echo -e "${RED}❌ Fichier .env manquant${NC}"
    echo "   Solution: Exécutez 'npm run setup'"
    ERRORS=$((ERRORS+1))
else
    echo -e "${GREEN}✓ Fichier .env existe${NC}"
fi

# Vérifier PayPal
echo ""
echo "🔍 Configuration PayPal:"

if [ -f .env ]; then
    if grep -q "^PAYPAL_CLIENT_ID=.\+$" .env; then
        CLIENT_ID=$(grep "^PAYPAL_CLIENT_ID=" .env | cut -d '=' -f2)
        if [ "$CLIENT_ID" != "your_paypal_client_id_here" ] && [ ! -z "$CLIENT_ID" ]; then
            echo -e "${GREEN}✓ PAYPAL_CLIENT_ID configuré${NC}"
        else
            echo -e "${RED}❌ PAYPAL_CLIENT_ID non configuré${NC}"
            echo "   Solution: Voir GUIDE_PAYPAL.md"
            ERRORS=$((ERRORS+1))
        fi
    else
        echo -e "${RED}❌ PAYPAL_CLIENT_ID manquant${NC}"
        ERRORS=$((ERRORS+1))
    fi

    if grep -q "^PAYPAL_CLIENT_SECRET=.\+$" .env; then
        SECRET=$(grep "^PAYPAL_CLIENT_SECRET=" .env | cut -d '=' -f2)
        if [ "$SECRET" != "your_paypal_client_secret_here" ] && [ ! -z "$SECRET" ]; then
            echo -e "${GREEN}✓ PAYPAL_CLIENT_SECRET configuré${NC}"
        else
            echo -e "${RED}❌ PAYPAL_CLIENT_SECRET non configuré${NC}"
            echo "   Solution: Voir GUIDE_PAYPAL.md"
            ERRORS=$((ERRORS+1))
        fi
    else
        echo -e "${RED}❌ PAYPAL_CLIENT_SECRET manquant${NC}"
        ERRORS=$((ERRORS+1))
    fi

    if grep -q "^PAYPAL_MODE=.\+$" .env; then
        MODE=$(grep "^PAYPAL_MODE=" .env | cut -d '=' -f2)
        if [ "$MODE" = "sandbox" ] || [ "$MODE" = "live" ]; then
            echo -e "${GREEN}✓ PAYPAL_MODE: $MODE${NC}"
            if [ "$MODE" = "live" ]; then
                echo -e "${YELLOW}⚠️  Mode LIVE actif - Vrais paiements !${NC}"
            fi
        else
            echo -e "${RED}❌ PAYPAL_MODE invalide: $MODE${NC}"
            echo "   Doit être 'sandbox' ou 'live'"
            ERRORS=$((ERRORS+1))
        fi
    else
        echo -e "${YELLOW}⚠️  PAYPAL_MODE non défini${NC}"
        WARNINGS=$((WARNINGS+1))
    fi
fi

# Vérifier Database
echo ""
echo "🔍 Configuration Database:"

if [ -f .env ] && grep -q "^DATABASE_URL=.\+$" .env; then
    DB_URL=$(grep "^DATABASE_URL=" .env | cut -d '=' -f2)
    if [ ! -z "$DB_URL" ] && [ "$DB_URL" != "postgresql://username:password@localhost:5432/keren_rabbi_israel" ]; then
        echo -e "${GREEN}✓ DATABASE_URL configuré${NC}"
    else
        echo -e "${YELLOW}⚠️  DATABASE_URL non configuré (mode sans DB)${NC}"
        echo "   Fonctionnalités limitées"
        WARNINGS=$((WARNINGS+1))
    fi
else
    echo -e "${YELLOW}⚠️  DATABASE_URL non configuré${NC}"
    WARNINGS=$((WARNINGS+1))
fi

# Vérifier dossier images
echo ""
echo "🔍 Images:"

if [ -d "client/public/images" ]; then
    echo -e "${GREEN}✓ Dossier images existe${NC}"

    IMAGES=("rabbi-israel-odesser-1.webp" "rabbi-israel-odesser-2.webp" "rabbi-israel-odesser-3.webp" "rabbi-nachman-breslov.webp")
    for img in "${IMAGES[@]}"; do
        if [ -f "client/public/images/$img" ]; then
            echo -e "${GREEN}  ✓ $img${NC}"
        else
            echo -e "${YELLOW}  ⚠️  $img manquant (placeholder utilisé)${NC}"
            WARNINGS=$((WARNINGS+1))
        fi
    done
else
    echo -e "${YELLOW}⚠️  Dossier images manquant${NC}"
    echo "   Solution: Exécutez 'npm run setup'"
    WARNINGS=$((WARNINGS+1))
fi

# Vérifier node_modules
echo ""
echo "🔍 Dépendances:"

if [ -d "node_modules" ]; then
    echo -e "${GREEN}✓ node_modules installé${NC}"
else
    echo -e "${RED}❌ node_modules manquant${NC}"
    echo "   Solution: Exécutez 'npm install'"
    ERRORS=$((ERRORS+1))
fi

# Résumé
echo ""
echo "═══════════════════════════════════════"
echo ""

if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo -e "${GREEN}🎉 Tout est parfait !${NC}"
    echo ""
    echo "Prochaines étapes:"
    echo "  1. npm run dev          → Tester localement"
    echo "  2. npm run deploy-check → Vérifier avant déploiement"
    echo "  3. Déployer sur Render  → Voir GUIDE_RENDER.md"
    exit 0
elif [ $ERRORS -eq 0 ]; then
    echo -e "${YELLOW}⚠️  Configuration OK avec $WARNINGS avertissement(s)${NC}"
    echo ""
    echo "Le site fonctionnera, mais certaines fonctionnalités"
    echo "peuvent être limitées."
    echo ""
    echo "Consultez les warnings ci-dessus."
    exit 0
else
    echo -e "${RED}❌ $ERRORS erreur(s) trouvée(s)${NC}"

    if [ $WARNINGS -gt 0 ]; then
        echo -e "${YELLOW}⚠️  $WARNINGS avertissement(s)${NC}"
    fi

    echo ""
    echo "Corrigez les erreurs avant de continuer."
    echo ""
    echo "Guides disponibles:"
    echo "  • GUIDE_PAYPAL.md   → Configuration PayPal"
    echo "  • GUIDE_RENDER.md   → Déploiement Render"
    echo "  • QUICK_START.md    → Guide rapide"
    exit 1
fi
