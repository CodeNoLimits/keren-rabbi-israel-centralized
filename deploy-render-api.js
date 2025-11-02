#!/usr/bin/env node

/**
 * Script pour déployer sur Render via leur API
 * Usage: node deploy-render-api.js [RENDER_API_KEY]
 */

import fetch from 'node-fetch';

const RENDER_API_KEY = process.env.RENDER_API_KEY || process.argv[2];
const RENDER_API_BASE = 'https://api.render.com/v1';

if (!RENDER_API_KEY) {
  console.error('❌ RENDER_API_KEY manquante!');
  console.error('');
  console.error('Usage:');
  console.error('  RENDER_API_KEY=xxx node deploy-render-api.js');
  console.error('  ou');
  console.error('  node deploy-render-api.js YOUR_API_KEY');
  console.error('');
  console.error('Pour obtenir votre clé API:');
  console.error('1. Aller sur https://dashboard.render.com');
  console.error('2. Account Settings → API Keys');
  console.error('3. Créer une nouvelle clé API');
  process.exit(1);
}

const headers = {
  'Authorization': `Bearer ${RENDER_API_KEY}`,
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

async function makeRequest(method, endpoint, body = null) {
  const url = `${RENDER_API_BASE}${endpoint}`;
  const options = {
    method,
    headers,
    ...(body && { body: JSON.stringify(body) })
  };

  try {
    const response = await fetch(url, options);
    
    // Gérer les réponses vides (comme pour les déploiements)
    const text = await response.text();
    let data;
    
    if (text.length === 0) {
      // Réponse vide mais succès (status 200-299)
      if (response.ok) {
        return { success: true, status: response.status };
      }
      data = { error: 'Empty response' };
    } else {
      try {
        data = JSON.parse(text);
      } catch (e) {
        // Si ce n'est pas du JSON, retourner le texte
        data = { response: text };
      }
    }
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} - ${JSON.stringify(data)}`);
    }
    
    return data;
  } catch (error) {
    console.error(`❌ Erreur ${method} ${endpoint}:`, error.message);
    throw error;
  }
}

async function getServices() {
  console.log('📋 Récupération des services existants...');
  try {
    const data = await makeRequest('GET', '/services');
    // L'API retourne soit un array, soit un objet avec une propriété services
    return Array.isArray(data) ? data : (data.services || []);
  } catch (error) {
    console.error('Erreur lors de la récupération des services:', error.message);
    return [];
  }
}

async function findService(name) {
  const services = await getServices();
  return services.find(s => s.service.name === name || s.service.serviceDetails?.url === `https://${name}.onrender.com`);
}

async function createWebService() {
  console.log('🚀 Création du service web...');
  
  const serviceConfig = {
    type: 'web_service',
    name: 'haesh-sheli',
    repo: 'https://github.com/CodeNoLimits/keren-rabbi-israel-centralized',
    branch: 'main',
    env: 'node',
    buildCommand: 'npm install && npm run build',
    startCommand: 'npm run start:prod',
    healthCheckPath: '/api/health',
    autoDeploy: true
  };

  console.log('Configuration:', JSON.stringify(serviceConfig, null, 2));
  
  try {
    const service = await makeRequest('POST', '/services', serviceConfig);
    console.log('✅ Service créé:', service);
    return service;
  } catch (error) {
    console.error('❌ Erreur lors de la création:', error.message);
    throw error;
  }
}

async function updateService(serviceId) {
  console.log(`🔄 Mise à jour du service ${serviceId}...`);
  
  const updateConfig = {
    repo: 'https://github.com/CodeNoLimits/keren-rabbi-israel-centralized',
    branch: 'main',
    serviceDetails: {
      envSpecificDetails: {
        buildCommand: 'npm install && npm run build',
        startCommand: 'npm run start:prod'
      },
      healthCheckPath: '/api/health'
    }
  };

  try {
    const service = await makeRequest('PATCH', `/services/${serviceId}`, updateConfig);
    console.log('✅ Service mis à jour:', service);
    return service;
  } catch (error) {
    console.error('❌ Erreur lors de la mise à jour:', error.message);
    // Essayer une approche alternative avec des champs séparés
    try {
      console.log('⚠️  Essai avec structure alternative...');
      const altConfig = {
        repo: 'https://github.com/CodeNoLimits/keren-rabbi-israel-centralized',
        branch: 'main'
      };
      const service = await makeRequest('PATCH', `/services/${serviceId}`, altConfig);
      console.log('✅ Repo et branche mis à jour');
      return service;
    } catch (e) {
      console.error('❌ Échec aussi avec structure alternative');
      throw error;
    }
  }
}

async function triggerDeploy(serviceId) {
  console.log(`🚀 Déclenchement du déploiement pour ${serviceId}...`);
  
  try {
    const deploy = await makeRequest('POST', `/services/${serviceId}/deploys`, {
      clearBuildCache: true
    });
    console.log('✅ Déploiement déclenché:', deploy);
    return deploy;
  } catch (error) {
    console.error('❌ Erreur lors du déploiement:', error.message);
    throw error;
  }
}

async function main() {
  console.log('🔍 Recherche du service existant...');
  
  // Chercher un service existant
  const existingServices = await getServices();
  console.log(`📊 Services trouvés: ${existingServices.length}`);
  
  // Chercher le service haesh-sheli existant
  let service = existingServices.find(s => {
    const serviceData = s.service || s;
    const name = serviceData.name || '';
    const url = serviceData.serviceDetails?.url || serviceData.url || '';
    
    return name === 'haesh-sheli' || 
           name === 'keren-rabbi-israel' ||
           url.includes('haesh-sheli') ||
           url.includes('keren-rabbi-israel');
  });

  if (service) {
    const serviceData = service.service || service;
    const serviceId = serviceData.id || service.id;
    const serviceName = serviceData.name || 'N/A';
    const serviceUrl = serviceData.serviceDetails?.url || serviceData.url || 'N/A';
    
    console.log(`✅ Service trouvé: ${serviceName} (${serviceId})`);
    console.log(`   URL: ${serviceUrl}`);
    
    // Mettre à jour le service
    await updateService(serviceId);
    
    // Déclencher un nouveau déploiement
    await triggerDeploy(serviceId);
    
    console.log('');
    console.log('🎉 Déploiement déclenché avec succès!');
    console.log(`📍 URL: ${serviceUrl || 'https://haesh-sheli.onrender.com'}`);
  } else {
    console.log('📝 Aucun service trouvé. Création d\'un nouveau service...');
    
    // Créer un nouveau service
    service = await createWebService();
    
    console.log('');
    console.log('🎉 Service créé avec succès!');
    console.log(`📍 Service ID: ${service.service?.id}`);
  }
  
  console.log('');
  console.log('⏳ Le déploiement peut prendre 3-5 minutes...');
  console.log('   Surveillez le statut sur: https://dashboard.render.com');
}

main().catch(error => {
  console.error('❌ Erreur fatale:', error);
  process.exit(1);
});

