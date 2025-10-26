#!/bin/bash

echo "🔥 CONFIGURATION FINALE - HAESH SHELI"
echo "====================================="

# Demander la clé OpenRouter
echo ""
echo "🔑 Veuillez entrer votre clé API OpenRouter:"
read -p "Clé OpenRouter: " openrouter_key

if [ -z "$openrouter_key" ]; then
    echo "❌ Clé OpenRouter requise pour continuer"
    exit 1
fi

# Mettre à jour .env avec la vraie clé
sed -i.backup "s/votre-cle-openrouter-ici/$openrouter_key/g" .env

echo "✅ Clé OpenRouter configurée"

# Test de la connexion OpenRouter
echo ""
echo "🧪 Test de connexion OpenRouter..."

node -e "
const fetch = require('node-fetch');

async function testOpenRouter() {
  try {
    const response = await fetch('https://openrouter.ai/api/v1/models', {
      headers: {
        'Authorization': 'Bearer $openrouter_key'
      }
    });
    
    if (response.ok) {
      console.log('✅ Connexion OpenRouter réussie');
      const data = await response.json();
      console.log('📊 Modèles disponibles:', data.data.length);
    } else {
      console.log('❌ Erreur connexion OpenRouter:', response.status);
    }
  } catch (error) {
    console.log('❌ Erreur test OpenRouter:', error.message);
  }
}

testOpenRouter();
"

echo ""
echo "🎯 Configuration terminée !"
echo ""
echo "📋 Prochaines étapes:"
echo "1. Configurer Supabase (optionnel pour la démo)"
echo "2. Démarrer le serveur: npm run dev:client"
echo "3. Ouvrir Cursor: npm run cursor:open"
echo ""
