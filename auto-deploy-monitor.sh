#!/bin/bash

###############################################################################
# Script de déploiement et monitoring automatique pour Render
# Usage: ./auto-deploy-monitor.sh [RENDER_API_KEY]
###############################################################################

set -e

# Couleurs pour la sortie
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
RENDER_API_KEY="${RENDER_API_KEY:-$1}"
RENDER_API_BASE="https://api.render.com/v1"
SERVICE_ID="srv-d3v30jbe5dus73a34ssg"
SERVICE_URL="https://haesh-sheli.onrender.com"
HEALTH_ENDPOINT="${SERVICE_URL}/api/health"
LOG_DIR="./deploy-logs"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# Créer le dossier de logs
mkdir -p "$LOG_DIR"

log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a "${LOG_DIR}/deploy-${TIMESTAMP}.log"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" | tee -a "${LOG_DIR}/deploy-${TIMESTAMP}.log"
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1" | tee -a "${LOG_DIR}/deploy-${TIMESTAMP}.log"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1" | tee -a "${LOG_DIR}/deploy-${TIMESTAMP}.log"
}

# Vérifier la clé API
if [ -z "$RENDER_API_KEY" ]; then
    error "RENDER_API_KEY manquante!"
    echo "Usage: RENDER_API_KEY=xxx $0"
    echo "   ou: $0 YOUR_API_KEY"
    exit 1
fi

# Fonction pour faire des requêtes API
api_request() {
    local method=$1
    local endpoint=$2
    local data=$3
    
    if [ -n "$data" ]; then
        curl -s -X "$method" \
            -H "Authorization: Bearer $RENDER_API_KEY" \
            -H "Accept: application/json" \
            -H "Content-Type: application/json" \
            -d "$data" \
            "${RENDER_API_BASE}${endpoint}"
    else
        curl -s -X "$method" \
            -H "Authorization: Bearer $RENDER_API_KEY" \
            -H "Accept: application/json" \
            "${RENDER_API_BASE}${endpoint}"
    fi
}

# Fonction pour vérifier le statut HTTP du site
check_site_status() {
    log "Vérification du statut du site..."
    local status=$(curl -s -o /dev/null -w "%{http_code}" "$SERVICE_URL" 2>/dev/null || echo "000")
    local time=$(curl -s -o /dev/null -w "%{time_total}" "$SERVICE_URL" 2>/dev/null || echo "0")
    
    echo "HTTP Status: $status" | tee -a "${LOG_DIR}/status-${TIMESTAMP}.txt"
    echo "Response Time: ${time}s" | tee -a "${LOG_DIR}/status-${TIMESTAMP}.txt"
    
    if [ "$status" = "200" ]; then
        success "Site accessible (HTTP $status)"
        return 0
    elif [ "$status" = "502" ] || [ "$status" = "503" ]; then
        warning "Site en erreur (HTTP $status) - probablement déploiement en cours ou erreur"
        return 1
    elif [ "$status" = "000" ]; then
        error "Site inaccessible (timeout ou erreur réseau)"
        return 1
    else
        warning "Statut HTTP $status"
        return 1
    fi
}

# Fonction pour vérifier le health check
check_health_endpoint() {
    log "Vérification du health check..."
    local health_response=$(curl -s -w "\n%{http_code}" "$HEALTH_ENDPOINT" 2>/dev/null || echo -e "\n000")
    local lines=$(echo "$health_response" | wc -l)
    if [ "$lines" -gt 1 ]; then
        local body=$(echo "$health_response" | head -n $((lines - 1)))
        local status=$(echo "$health_response" | tail -n 1)
    else
        local body=""
        local status=$(echo "$health_response")
    fi
    
    echo "Health Check Status: $status" | tee -a "${LOG_DIR}/status-${TIMESTAMP}.txt"
    echo "Response: $body" | tee -a "${LOG_DIR}/status-${TIMESTAMP}.txt"
    
    if [ "$status" = "200" ]; then
        if echo "$body" | grep -q "healthy"; then
            success "Health check OK"
            return 0
        else
            warning "Health check retourne 200 mais réponse inattendue"
            return 1
        fi
    else
        warning "Health check échoué (HTTP $status)"
        return 1
    fi
}

# Fonction pour obtenir le dernier déploiement
get_last_deploy() {
    log "Récupération du dernier déploiement..."
    local response=$(api_request "GET" "/services/${SERVICE_ID}/deploys?limit=1")
    echo "$response" > "${LOG_DIR}/last-deploy-${TIMESTAMP}.json"
    
    local deploy_id=$(echo "$response" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)
    local deploy_status=$(echo "$response" | grep -o '"status":"[^"]*"' | head -1 | cut -d'"' -f4)
    local commit_message=$(echo "$response" | grep -o '"message":"[^"]*"' | head -1 | cut -d'"' -f4)
    
    echo "Deploy ID: $deploy_id" | tee -a "${LOG_DIR}/status-${TIMESTAMP}.txt"
    echo "Status: $deploy_status" | tee -a "${LOG_DIR}/status-${TIMESTAMP}.txt"
    echo "Commit: $commit_message" | tee -a "${LOG_DIR}/status-${TIMESTAMP}.txt"
    
    log "Dernier déploiement: $deploy_status"
    
    if [ "$deploy_status" = "live" ]; then
        success "Dernier déploiement: LIVE"
        return 0
    elif [ "$deploy_status" = "build_failed" ] || [ "$deploy_status" = "update_failed" ]; then
        error "Dernier déploiement: ÉCHEC ($deploy_status)"
        return 1
    elif [ "$deploy_status" = "building" ] || [ "$deploy_status" = "updating" ]; then
        warning "Déploiement en cours: $deploy_status"
        return 2
    else
        warning "Statut du déploiement: $deploy_status"
        return 1
    fi
}

# Fonction pour obtenir les logs du dernier déploiement
get_deploy_logs() {
    local deploy_id=$1
    if [ -z "$deploy_id" ]; then
        warning "Pas d'ID de déploiement pour récupérer les logs"
        return
    fi
    
    log "Récupération des logs du déploiement $deploy_id..."
    # Les logs peuvent être dans différentes formats selon l'API
    local logs=$(api_request "GET" "/services/${SERVICE_ID}/deploys/${deploy_id}/log-stream" 2>&1 || \
                 api_request "GET" "/services/${SERVICE_ID}/deploys/${deploy_id}/logs" 2>&1 || \
                 echo "Logs non disponibles via API")
    
    echo "$logs" > "${LOG_DIR}/deploy-logs-${deploy_id}-${TIMESTAMP}.txt"
    log "Logs sauvegardés dans ${LOG_DIR}/deploy-logs-${deploy_id}-${TIMESTAMP}.txt"
    
    # Afficher les dernières lignes si erreur
    if echo "$logs" | grep -qi "error\|fail\|fatal"; then
        error "Erreurs détectées dans les logs:"
        echo "$logs" | grep -i "error\|fail\|fatal" | tail -20 | tee -a "${LOG_DIR}/deploy-${TIMESTAMP}.log"
    fi
}

# Fonction pour déclencher un nouveau déploiement
trigger_deploy() {
    log "Déclenchement d'un nouveau déploiement..."
    local response=$(api_request "POST" "/services/${SERVICE_ID}/deploys" '{"clearBuildCache":true}')
    
    local deploy_id=$(echo "$response" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4 || echo "")
    
    if [ -n "$deploy_id" ]; then
        success "Déploiement déclenché: $deploy_id"
        echo "$deploy_id" > "${LOG_DIR}/current-deploy-${TIMESTAMP}.txt"
        return 0
    else
        error "Échec du déclenchement du déploiement"
        echo "$response" | tee -a "${LOG_DIR}/deploy-${TIMESTAMP}.log"
        return 1
    fi
}

# Fonction pour attendre qu'un déploiement se termine
wait_for_deploy() {
    local deploy_id=$1
    local max_wait=${2:-300}  # 5 minutes par défaut
    local elapsed=0
    local interval=10
    
    if [ -z "$deploy_id" ]; then
        warning "Pas d'ID de déploiement à surveiller"
        return
    fi
    
    log "Surveillance du déploiement $deploy_id (max ${max_wait}s)..."
    
    while [ $elapsed -lt $max_wait ]; do
        sleep $interval
        elapsed=$((elapsed + interval))
        
        local response=$(api_request "GET" "/services/${SERVICE_ID}/deploys/${deploy_id}")
        local status=$(echo "$response" | grep -o '"status":"[^"]*"' | head -1 | cut -d'"' -f4)
        
        log "Statut après ${elapsed}s: $status"
        
        if [ "$status" = "live" ]; then
            success "Déploiement terminé avec succès!"
            return 0
        elif [ "$status" = "build_failed" ] || [ "$status" = "update_failed" ]; then
            error "Déploiement échoué: $status"
            get_deploy_logs "$deploy_id"
            return 1
        elif [ "$status" = "canceled" ]; then
            warning "Déploiement annulé"
            return 1
        fi
        
        # Afficher une progression
        if [ $((elapsed % 30)) -eq 0 ]; then
            echo -n "."
        fi
    done
    
    warning "Timeout: le déploiement n'est pas terminé après ${max_wait}s"
    return 2
}

# Fonction principale de vérification complète
full_health_check() {
    log "=== VÉRIFICATION COMPLÈTE ==="
    
    local site_ok=false
    local health_ok=false
    local deploy_ok=false
    
    # Vérifier le site
    if check_site_status; then
        site_ok=true
    fi
    
    # Vérifier le health check
    if check_health_endpoint; then
        health_ok=true
    fi
    
    # Vérifier le dernier déploiement
    local deploy_result
    get_last_deploy
    deploy_result=$?
    
    if [ $deploy_result -eq 0 ]; then
        deploy_ok=true
    fi
    
    # Résumé
    echo ""
    log "=== RÉSUMÉ ==="
    if $site_ok && $health_ok && $deploy_ok; then
        success "✓ Site opérationnel"
        success "✓ Health check OK"
        success "✓ Dernier déploiement: LIVE"
        return 0
    else
        warning "✗ Problèmes détectés:"
        $site_ok || error "  - Site inaccessible ou en erreur"
        $health_ok || error "  - Health check échoué"
        $deploy_ok || error "  - Dernier déploiement: échec ou en cours"
        return 1
    fi
}

# Fonction pour obtenir les détails d'un déploiement
get_deploy_details() {
    local deploy_id=$1
    if [ -z "$deploy_id" ]; then
        return
    fi
    
    log "Récupération des détails du déploiement $deploy_id..."
    local details=$(api_request "GET" "/services/${SERVICE_ID}/deploys/${deploy_id}")
    echo "$details" > "${LOG_DIR}/deploy-details-${deploy_id}-${TIMESTAMP}.json"
    
    # Extraire les informations importantes
    local commit_id=$(echo "$details" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)
    local commit_msg=$(echo "$details" | grep -o '"message":"[^"]*"' | head -1 | cut -d'"' -f4)
    local started_at=$(echo "$details" | grep -o '"startedAt":"[^"]*"' | head -1 | cut -d'"' -f4)
    local finished_at=$(echo "$details" | grep -o '"finishedAt":"[^"]*"' | head -1 | cut -d'"' -f4)
    
    log "Commit: $commit_id"
    log "Message: $commit_msg"
    log "Démarré: $started_at"
    log "Terminé: $finished_at"
    
    # Afficher tout le JSON pour debug
    echo "$details" | python3 -m json.tool 2>/dev/null || echo "$details"
}

# Fonction principale
main() {
    log "=== DÉMARRAGE DU MONITORING AUTOMATIQUE ==="
    
    # Vérification complète
    if ! full_health_check; then
        warning "Problèmes détectés, tentative de correction..."
        
        # Récupérer le dernier déploiement pour voir son statut
        local last_deploy=$(api_request "GET" "/services/${SERVICE_ID}/deploys?limit=1")
        local last_status=$(echo "$last_deploy" | grep -o '"status":"[^"]*"' | head -1 | cut -d'"' -f4)
        
        if [ "$last_status" = "build_failed" ] || [ "$last_status" = "update_failed" ]; then
            error "Le dernier déploiement a échoué"
            
            # Obtenir les logs et détails
            local deploy_id=$(echo "$last_deploy" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)
            if [ -n "$deploy_id" ]; then
                get_deploy_logs "$deploy_id"
                get_deploy_details "$deploy_id"
                
                # Afficher un résumé des erreurs possibles
                log "=== ANALYSE DES ERREURS ==="
                log "Consultez les logs dans: ${LOG_DIR}/"
                log "Dashboard Render: https://dashboard.render.com/web/${SERVICE_ID}"
                warning "Pour voir les logs détaillés, allez sur le dashboard Render"
            fi
            
            # Demander si on doit relancer
            log "Voulez-vous relancer un déploiement? (oui/non)"
            read -t 10 -r answer || answer="oui"
            
            answer_lower=$(echo "$answer" | tr '[:upper:]' '[:lower:]')
            if [ "$answer_lower" = "oui" ] || [ "$answer_lower" = "o" ] || [ -z "$answer" ]; then
                if trigger_deploy; then
                    local new_deploy_id=$(cat "${LOG_DIR}/current-deploy-${TIMESTAMP}.txt" 2>/dev/null)
                    if [ -n "$new_deploy_id" ]; then
                        wait_for_deploy "$new_deploy_id" 600  # 10 minutes
                        
                        # Re-vérifier après le déploiement
                        sleep 5
                        full_health_check
                    fi
                fi
            fi
        else
            warning "Statut du déploiement: $last_status"
        fi
    fi
    
    log "=== FIN DU MONITORING ==="
    log "Logs sauvegardés dans: ${LOG_DIR}/"
}

# Exécuter le script
main "$@"

