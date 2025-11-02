# 🧠 MÉMOIRE - AUTOMATISATION ET MONITORING

## 📋 RÈGLES À SUIVRE EN PERMANENCE

### 1. ✅ TOUJOURS VÉRIFIER
- **Prendre des "screenshots"** (captures HTTP/statut)
- **Vérifier le statut** du site (HTTP codes, response time)
- **Vérifier les health checks** (`/api/health`, etc.)
- **Vérifier l'état des déploiements** (succès/échec/en cours)
- **Vérifier les logs** en cas d'erreur

### 2. 🤖 TOUJOURS AUTOMATISER
- **Créer des scripts** pour toutes les opérations répétitives
- **Monitoring automatique** des déploiements
- **Relance automatique** en cas d'échec (avec confirmation)
- **Sauvegarde des logs** et historiques
- **Rapports automatiques** de statut

### 3. 🔄 TOUJOURS RELANCER
- **Relancer automatiquement** les déploiements échoués
- **Surveiller** les déploiements en cours
- **Vérifier après** chaque déploiement
- **Rapporter** le statut final

### 4. 📊 TOUJOURS DOCUMENTER
- **Sauvegarder les logs** avec timestamp
- **Créer des rapports** de statut
- **Historiser** les déploiements
- **Documenter** les erreurs et solutions

## 🛠️ SCRIPTS DISPONIBLES

### `auto-deploy-monitor.sh`
Script principal de monitoring et déploiement automatique.

**Fonctionnalités:**
- ✅ Vérification du statut HTTP du site
- ✅ Vérification du health check endpoint
- ✅ Récupération du statut du dernier déploiement
- ✅ Récupération des logs en cas d'erreur
- ✅ Déclenchement automatique de nouveaux déploiements
- ✅ Surveillance des déploiements en cours
- ✅ Génération de rapports de statut

**Usage:**
```bash
./auto-deploy-monitor.sh [RENDER_API_KEY]
# ou
RENDER_API_KEY=xxx ./auto-deploy-monitor.sh
```

**Fichiers générés:**
- `deploy-logs/deploy-TIMESTAMP.log` - Log principal
- `deploy-logs/status-TIMESTAMP.txt` - État du système
- `deploy-logs/last-deploy-TIMESTAMP.json` - Dernier déploiement
- `deploy-logs/deploy-logs-DEPLOY_ID-TIMESTAMP.txt` - Logs d'erreur

### `deploy-render-api.js`
Script Node.js pour déployer via l'API Render.

**Usage:**
```bash
RENDER_API_KEY=xxx node deploy-render-api.js
```

## 📝 CHECKLIST AVANT/AFÈS DÉPLOIEMENT

### Avant
- [ ] Vérifier que le code est poussé sur GitHub
- [ ] Vérifier que le build passe localement
- [ ] Vérifier les variables d'environnement
- [ ] Lancer `auto-deploy-monitor.sh` pour vérifier l'état actuel

### Pendant
- [ ] Surveiller le déploiement en temps réel
- [ ] Capturer les logs d'erreur si échec
- [ ] Vérifier les health checks

### Après
- [ ] Vérifier le statut HTTP du site
- [ ] Vérifier le health check endpoint
- [ ] Vérifier que les fonctionnalités clés marchent
- [ ] Sauvegarder les logs et rapports
- [ ] Documenter tout problème rencontré

## 🎯 WORKFLOW RECOMMANDÉ

```bash
# 1. Vérifier l'état actuel
./auto-deploy-monitor.sh $RENDER_API_KEY

# 2. Si problèmes détectés, corriger et redéployer
# Le script propose automatiquement de relancer

# 3. Vérifier à nouveau après déploiement
./auto-deploy-monitor.sh $RENDER_API_KEY

# 4. Consulter les logs si nécessaire
ls -la deploy-logs/
cat deploy-logs/status-*.txt
```

## 🔧 VARIABLES IMPORTANTES

```bash
# Render
RENDER_API_KEY=rnd_VwC7VfBs1HMQl5C2hBvbEaLmHb8A
SERVICE_ID=srv-d3v30jbe5dus73a34ssg
SERVICE_URL=https://haesh-sheli.onrender.com
HEALTH_ENDPOINT=https://haesh-sheli.onrender.com/api/health
```

## 📚 RESSOURCES

- **Dashboard Render**: https://dashboard.render.com/web/srv-d3v30jbe5dus73a34ssg
- **API Render Docs**: https://render.com/docs/api
- **Service URL**: https://haesh-sheli.onrender.com

## 🚨 RAPPEL IMPORTANT

**TOUJOURS:**
1. ✅ Vérifier avant d'agir
2. 🤖 Automatiser les processus
3. 📸 Capturer l'état actuel (screenshots/logs)
4. 🔄 Relancer si nécessaire
5. 📊 Documenter les résultats

**NE JAMAIS:**
- ❌ Déployer sans vérifier l'état actuel
- ❌ Ignorer les erreurs de build
- ❌ Oublier de vérifier après déploiement
- ❌ Perdre les logs d'erreur

---

**Dernière mise à jour**: 2025-11-02
**Créé par**: Auto (Claude AI)

