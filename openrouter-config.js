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
