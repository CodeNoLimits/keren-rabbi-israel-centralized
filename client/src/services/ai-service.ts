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
