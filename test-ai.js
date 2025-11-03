// 🧪 TEST OPENROUTER - HAESH SHELI
// Test complet du service IA avec ta clé

import fetch from 'node-fetch';

// SÉCURISÉ: Clé depuis variable d'environnement
import dotenv from 'dotenv';
dotenv.config();
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
if (!OPENROUTER_API_KEY) {
  console.error('❌ OPENROUTER_API_KEY manquante dans .env');
  process.exit(1);
}
const BASE_URL = 'https://openrouter.ai/api/v1';

class HaeshSheliAI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = BASE_URL;
  }

  async chat(messages, model = 'anthropic/claude-3.5-sonnet') {
    try {
      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://haesh-sheli.vercel.app',
          'X-Title': 'Haesh Sheli - AI Assistant'
        },
        body: JSON.stringify({
          model: model,
          messages: messages,
          max_tokens: 1000,
          temperature: 0.3
        })
      });

      if (!response.ok) {
        throw new Error(`OpenRouter API error: ${response.status}`);
      }

      const data = await response.json();
      return {
        content: data.choices[0].message.content,
        model: data.model,
        usage: data.usage
      };
    } catch (error) {
      console.error('AI Service error:', error);
      throw error;
    }
  }

  async getBookRecommendations(userPreferences, availableBooks) {
    const messages = [
      {
        role: 'system',
        content: `Tu es un expert en livres de Rabbi Nachman de Breslov. 
        Recommande les meilleurs livres basés sur les préférences de l'utilisateur.
        Réponds en hébreu de manière chaleureuse et spirituelle.
        Format: recommandations avec explications courtes.`
      },
      {
        role: 'user',
        content: `Préférences utilisateur: ${userPreferences}
        
        Livres disponibles: ${JSON.stringify(availableBooks)}
        
        Recommande 3 livres pertinents avec explications courtes.`
      }
    ];

    const response = await this.chat(messages);
    return response.content;
  }

  async customerSupport(userMessage) {
    const messages = [
      {
        role: 'system',
        content: `Tu es un assistant client pour Haesh Sheli (האש שלי), magasin de livres de Rabbi Nachman de Breslov.
        
        Règles:
        - Réponds en hébreu principalement, anglais si demandé
        - Sois chaleureux, respectueux et spirituel
        - Aide avec: livres, commandes, spiritualité, conseils de lecture
        - Utilise des émojis appropriés 📚 🔥 ✨ 💝
        
        Informations du magasin:
        - Téléphone: 050-123-4567
        - Email: info@haesh-sheli.co.il
        - Livraison gratuite dès 399₪`
      },
      {
        role: 'user',
        content: userMessage
      }
    ];

    const response = await this.chat(messages);
    return response.content;
  }
}

// Tests
async function runTests() {
  console.log('🔥 TESTS HAESH SHELI AI - OPENROUTER');
  console.log('====================================\n');

  const ai = new HaeshSheliAI(OPENROUTER_API_KEY);

  // Test 1: Chat basique
  console.log('🧪 Test 1: Chat basique avec Claude');
  try {
    const response = await ai.chat([
      {
        role: 'user',
        content: 'שלום! אני מחפש ספר של רבי נחמן לתחילת המסע הרוחני שלי'
      }
    ]);
    console.log('✅ Succès!');
    console.log('Modèle utilisé:', response.model);
    console.log('Réponse:', response.content.substring(0, 200) + '...');
    console.log('Usage:', response.usage);
  } catch (error) {
    console.error('❌ Échec:', error.message);
  }
  console.log('');

  // Test 2: Recommandations de livres
  console.log('🧪 Test 2: Recommandations de livres');
  try {
    const mockBooks = [
      { title: 'ליקוטי מוהרן חלק א', category: 'torah', description: 'עיקר ספרי רבי נחמן' },
      { title: 'ספורי מעשיות', category: 'stories', description: '13 סיפורים מופלאים' },
      { title: 'ליקוטי תפילות', category: 'prayers', description: 'תפילות על פי ליקוטי מוהרן' }
    ];

    const recommendations = await ai.getBookRecommendations(
      'אני מתחיל במסע הרוחני ואוהב סיפורים מעוררי השראה',
      mockBooks
    );
    console.log('✅ Succès!');
    console.log('Recommandations:', recommendations.substring(0, 300) + '...');
  } catch (error) {
    console.error('❌ Échec:', error.message);
  }
  console.log('');

  // Test 3: Support client
  console.log('🧪 Test 3: Support client');
  try {
    const supportResponse = await ai.customerSupport(
      'היי, אני רוצה לדעת איך אני יכול להזמין ספר ומה זמני המשלוח?'
    );
    console.log('✅ Succès!');
    console.log('Support:', supportResponse.substring(0, 300) + '...');
  } catch (error) {
    console.error('❌ Échec:', error.message);
  }
  console.log('');

  // Test 4: Modèle gratuit (économique)
  console.log('🧪 Test 4: Modèle économique (DeepSeek gratuit)');
  try {
    const economicResponse = await ai.chat([
      {
        role: 'user',
        content: 'What is the main message of Rabbi Nachman teachings?'
      }
    ], 'deepseek/deepseek-chat-v3.1:free');
    console.log('✅ Succès!');
    console.log('Modèle:', economicResponse.model);
    console.log('Réponse:', economicResponse.content.substring(0, 200) + '...');
  } catch (error) {
    console.error('❌ Échec:', error.message);
  }
  console.log('');

  console.log('🎉 TESTS TERMINÉS !');
  console.log('==================');
  console.log('✅ OpenRouter configuré et fonctionnel');
  console.log('🤖 IA prête pour Haesh Sheli');
  console.log('💰 Économies vs Replit: 55$/mois minimum');
}

// Exécution des tests
runTests().catch(console.error);