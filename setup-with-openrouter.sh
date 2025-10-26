#!/bin/bash

# 🚀 SETUP AUTOMATIQUE COMPLET AVEC OPENROUTER
# Script pour remplacer Replit Agent 3 avec OpenRouter

echo "🔥 SETUP AUTOMATIQUE - HAESH SHELI + OPENROUTER"
echo "================================================="
echo ""

# Configuration avec ta clé OpenRouter
echo "🔑 Configuration OpenRouter..."

# Créer fichier de configuration OpenRouter
cat > openrouter-config.js << 'EOF'
// Configuration OpenRouter pour Haesh Sheli
export const openRouterConfig = {
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
  models: {
    primary: 'anthropic/claude-3.5-sonnet',
    fallback: 'openai/gpt-4o',
    coding: 'anthropic/claude-3.5-sonnet',
    chat: 'openai/gpt-4o-mini'
  },
  maxTokens: 4096,
  temperature: 0.3
};

// Client OpenRouter configuré
import fetch from 'node-fetch';

export class OpenRouterClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = 'https://openrouter.ai/api/v1';
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
          max_tokens: 4096,
          temperature: 0.3
        })
      });

      if (!response.ok) {
        throw new Error(`OpenRouter API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('OpenRouter error:', error);
      throw error;
    }
  }

  async generateCode(prompt, language = 'typescript') {
    const messages = [
      {
        role: 'system',
        content: `You are an expert ${language} developer. Generate clean, production-ready code.`
      },
      {
        role: 'user',
        content: prompt
      }
    ];

    return await this.chat(messages, 'anthropic/claude-3.5-sonnet');
  }
}
EOF

echo "✅ Configuration OpenRouter créée"

# Mettre à jour .env avec configuration complète
echo "📝 Configuration variables environnement..."

cat > .env << 'EOF'
# 🔧 CONFIGURATION HAESH SHELI - PRODUCTION READY

# ========================================
# OPENROUTER CONFIGURATION (AI Power)
# ========================================
OPENROUTER_API_KEY=votre-cle-openrouter-ici
VITE_OPENROUTER_API_KEY=votre-cle-openrouter-ici

# ========================================
# SUPABASE CONFIGURATION (Database)
# ========================================
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=votre-cle-anon-publique
SUPABASE_SERVICE_ROLE_KEY=votre-cle-service-role-secrete

# ========================================
# DATABASE LOCAL (Development)
# ========================================
DATABASE_URL=postgresql://postgres:password@localhost:5432/haesh_sheli_dev

# ========================================
# DEVELOPMENT CONFIGURATION
# ========================================
NODE_ENV=development
VITE_DEV_MODE=true
VITE_API_BASE_URL=http://localhost:3000
PORT=3000

# ========================================
# HAESH SHELI BRANDING
# ========================================
VITE_SITE_NAME="האש שלי - Haesh Sheli"
VITE_SITE_DESCRIPTION="ספרי רבי נחמן מברסלב - החנות הרשמית"
VITE_DEFAULT_LANGUAGE=he
VITE_SUPPORT_EMAIL=info@haesh-sheli.co.il
VITE_SUPPORT_PHONE=+972-50-123-4567
VITE_WHATSAPP=+972501234567

# ========================================
# VERCEL DEPLOYMENT
# ========================================
VERCEL_TOKEN=votre-token-vercel
VITE_SITE_URL=https://haesh-sheli.vercel.app

# ========================================
# AI FEATURES
# ========================================
ENABLE_AI_CHAT=true
ENABLE_AI_RECOMMENDATIONS=true
ENABLE_AI_SEARCH=true
AI_MODEL_PRIMARY=anthropic/claude-3.5-sonnet
AI_MODEL_CHAT=openai/gpt-4o-mini

# ========================================
# E-COMMERCE SETTINGS
# ========================================
FREE_SHIPPING_THRESHOLD=399
DEFAULT_SHIPPING_COST=25
INTERNATIONAL_SHIPPING_COST=80
DEFAULT_CURRENCY=ILS
TAX_RATE=0.17

# ========================================
# PAYMENT INTEGRATION
# ========================================
STRIPE_PUBLISHABLE_KEY=pk_test_votre-cle-publique-stripe
STRIPE_SECRET_KEY=sk_test_votre-cle-secrete-stripe
STRIPE_WEBHOOK_SECRET=whsec_votre-webhook-secret

# ========================================
# EMAIL & NOTIFICATIONS
# ========================================
SENDGRID_API_KEY=SG.votre-cle-sendgrid
FROM_EMAIL=noreply@haesh-sheli.co.il
ADMIN_EMAIL=admin@haesh-sheli.co.il

# ========================================
# ANALYTICS & MONITORING
# ========================================
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
FACEBOOK_PIXEL_ID=123456789
SENTRY_DSN=https://votre-sentry-dsn@sentry.io/project-id

# ========================================
# SOCIAL MEDIA
# ========================================
VITE_FACEBOOK_URL=https://facebook.com/haesh-sheli
VITE_INSTAGRAM_URL=https://instagram.com/haesh_sheli
VITE_YOUTUBE_URL=https://youtube.com/@haesh-sheli
VITE_TELEGRAM_URL=https://t.me/haesh_sheli

# ========================================
# PERFORMANCE & CACHE
# ========================================
REDIS_URL=redis://localhost:6379
CDN_URL=https://cdn.haesh-sheli.co.il
ENABLE_CACHING=true
CACHE_DURATION=3600

# ========================================
# SECURITY
# ========================================
JWT_SECRET=votre-jwt-secret-ultra-securise
ENCRYPTION_KEY=votre-cle-de-chiffrement
ADMIN_PASSWORD=votre-mot-de-passe-admin
EOF

echo "✅ Variables environnement configurées"

# Installation des dépendances supplémentaires pour OpenRouter
echo "📦 Installation dépendances OpenRouter..."

npm install --save openai node-fetch dotenv
npm install --save-dev @types/node-fetch

echo "✅ Dépendances OpenRouter installées"

# Créer service AI avec OpenRouter
echo "🤖 Création service IA avec OpenRouter..."

mkdir -p client/src/services

cat > client/src/services/ai-service.ts << 'EOF'
// 🤖 SERVICE IA AVEC OPENROUTER
// Remplace les fonctionnalités IA de Replit Agent 3

export interface AIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface AIResponse {
  content: string;
  model: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export class HaeshSheliAI {
  private apiKey: string;
  private baseURL = 'https://openrouter.ai/api/v1';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async chat(messages: AIMessage[], model = 'anthropic/claude-3.5-sonnet'): Promise<AIResponse> {
    try {
      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Haesh Sheli - AI Assistant'
        },
        body: JSON.stringify({
          model: model,
          messages: messages,
          max_tokens: 4096,
          temperature: 0.3,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`OpenRouter API error: ${error.error?.message || response.status}`);
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

  // Recommandations de livres basées sur IA
  async getBookRecommendations(userPreferences: string, availableBooks: any[]): Promise<string> {
    const messages: AIMessage[] = [
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
        
        Livres disponibles: ${JSON.stringify(availableBooks.map(b => ({
          title: b.title_hebrew || b.title,
          category: b.category,
          description: b.description_hebrew || b.description
        })))}
        
        Recommande 3-5 livres pertinents avec explications.`
      }
    ];

    const response = await this.chat(messages);
    return response.content;
  }

  // Recherche intelligente avec IA
  async smartSearch(query: string, availableBooks: any[]): Promise<string[]> {
    const messages: AIMessage[] = [
      {
        role: 'system',
        content: `Tu es un moteur de recherche intelligent pour livres de Rabbi Nachman.
        Analyse la requête et retourne les IDs des livres les plus pertinents.
        Réponds uniquement avec un array JSON des IDs: ["id1", "id2", "id3"]`
      },
      {
        role: 'user',
        content: `Requête: "${query}"
        
        Livres disponibles: ${JSON.stringify(availableBooks.map(b => ({
          id: b.id,
          title: b.title_hebrew || b.title,
          title_english: b.title_english,
          category: b.category,
          tags: b.tags,
          description: b.description_hebrew || b.description
        })))}
        
        Retourne les IDs des livres pertinents (maximum 10).`
      }
    ];

    try {
      const response = await this.chat(messages, 'openai/gpt-4o-mini');
      const bookIds = JSON.parse(response.content);
      return Array.isArray(bookIds) ? bookIds : [];
    } catch (error) {
      console.error('Smart search error:', error);
      return [];
    }
  }

  // Chat support client avec IA
  async customerSupport(userMessage: string, context: any = {}): Promise<string> {
    const messages: AIMessage[] = [
      {
        role: 'system',
        content: `Tu es un assistant client pour Haesh Sheli (האש שלי), magasin de livres de Rabbi Nachman de Breslov.
        
        Règles:
        - Réponds en hébreu principalement, anglais si demandé
        - Sois chaleureux, respectueux et spirituel
        - Aide avec: livres, commandes, spiritualité, conseils de lecture
        - Si tu ne sais pas, propose de contacter le support humain
        - Utilise des émojis appropriés 📚 🔥 ✨ 💝
        
        Informations du magasin:
        - Téléphone: 050-123-4567
        - Email: info@haesh-sheli.co.il
        - Livraison gratuite dès 399₪
        - Expédition en 24-48h en Israël`
      },
      {
        role: 'user',
        content: `${userMessage}
        
        Contexte: ${JSON.stringify(context)}`
      }
    ];

    const response = await this.chat(messages, 'anthropic/claude-3.5-sonnet');
    return response.content;
  }

  // Génération de descriptions produits avec IA
  async generateProductDescription(book: any): Promise<string> {
    const messages: AIMessage[] = [
      {
        role: 'system',
        content: `Tu es un rédacteur expert pour des livres spirituels de Rabbi Nachman de Breslov.
        Génère une description produit attrayante et spirituelle.
        Réponds en hébreu avec un style chaleureux et inspirant.
        Maximum 200 mots.`
      },
      {
        role: 'user',
        content: `Livre: ${JSON.stringify(book)}
        
        Génère une description qui inspire à l'achat tout en respectant la spiritualité du contenu.`
      }
    ];

    const response = await this.chat(messages);
    return response.content;
  }
}

// Instance globale du service IA
export const aiService = new HaeshSheliAI(
  import.meta.env.VITE_OPENROUTER_API_KEY || ''
);

// Hook React pour utiliser l'IA
import { useState, useCallback } from 'react';

export const useAI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const askAI = useCallback(async (
    messages: AIMessage[],
    model?: string
  ): Promise<string | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await aiService.chat(messages, model);
      return response.content;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur IA';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getRecommendations = useCallback(async (
    preferences: string,
    books: any[]
  ): Promise<string | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const recommendations = await aiService.getBookRecommendations(preferences, books);
      return recommendations;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur recommandations';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const smartSearch = useCallback(async (
    query: string,
    books: any[]
  ): Promise<string[]> => {
    try {
      return await aiService.smartSearch(query, books);
    } catch (err) {
      console.error('Smart search error:', err);
      return [];
    }
  }, []);

  return {
    askAI,
    getRecommendations,
    smartSearch,
    loading,
    error
  };
};

export default aiService;
EOF

echo "✅ Service IA OpenRouter créé"

# Créer composant chat IA pour le site
echo "💬 Création composant Chat IA..."

cat > client/src/components/AIChat.tsx << 'EOF'
import React, { useState, useRef, useEffect } from 'react';
import { useAI } from '../services/ai-service';
import { useLanguage } from '../contexts/LanguageContext';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const { askAI, loading, error } = useAI();
  const { currentLanguage, t } = useLanguage();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const aiMessages = [
        {
          role: 'system' as const,
          content: currentLanguage === 'he' 
            ? 'אתה עוזר לקוחות חכם ורוחני עבור חנות ספרי ברסלב "האש שלי". עזור בחמימות ובכבוד.'
            : 'You are a smart and spiritual customer assistant for Breslov bookstore "Haesh Sheli". Help warmly and respectfully.'
        },
        ...messages.map(m => ({ role: m.role, content: m.content })),
        { role: 'user' as const, content: input.trim() }
      ];

      const response = await askAI(aiMessages);

      if (response) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: response,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error('Chat error:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 z-50"
        style={{ direction: 'ltr' }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-80 h-96 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col z-50" style={{ direction: currentLanguage === 'he' ? 'rtl' : 'ltr' }}>
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
        <h3 className="font-semibold">
          {currentLanguage === 'he' ? 'עוזר ברסלב 🔥' : 'Breslov Assistant 🔥'}
        </h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white hover:text-gray-200 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 text-sm">
            {currentLanguage === 'he' 
              ? 'שאל אותי על ספרי רבי נחמן! 📚' 
              : 'Ask me about Rabbi Nachman\'s books! 📚'
            }
          </div>
        )}
        
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs p-3 rounded-lg ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              <p className="text-xs mt-1 opacity-70">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 max-w-xs p-3 rounded-lg">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={currentLanguage === 'he' ? 'הקלד הודעה...' : 'Type a message...'}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white p-2 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
        
        {error && (
          <p className="text-red-500 text-xs mt-2">{error}</p>
        )}
      </div>
    </div>
  );
};

export default AIChat;
EOF

echo "✅ Composant Chat IA créé"

# Créer script de configuration finale
echo "🔧 Création script configuration finale..."

cat > configure-final.sh << 'EOF'
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
EOF

chmod +x configure-final.sh

echo "✅ Script de configuration finale créé"

echo ""
echo "🎉 SETUP OPENROUTER TERMINÉ !"
echo "=============================="
echo ""
echo "🚀 Pour finaliser la configuration:"
echo "   ./configure-final.sh"
echo ""
echo "💰 Coûts estimés avec OpenRouter:"
echo "   - OpenRouter Pro: ~20$/mois"
echo "   - Supabase: 25$/mois (optionnel)"
echo "   - Vercel: 0$/mois (gratuit)"
echo "   - TOTAL: ~45$/mois vs 100$+ Replit"
echo ""
echo "🔥 Économie: 55$/mois minimum !"