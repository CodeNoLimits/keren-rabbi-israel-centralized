/**
 * Shared type definitions for chat services (Gemini and OpenAI).
 * Both services use identical request/response interfaces.
 */

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatRequest {
  message: string;
  conversationHistory?: ChatMessage[];
  useRAG?: boolean;
}

export interface ChatResponse {
  response: string;
  conversationId?: string;
  error?: string;
}
