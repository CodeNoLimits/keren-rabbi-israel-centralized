// Service Gemini 2.5 Pro pour Chat authentique avec RAG HaEsh Sheli
// Basé sur l'intégration blueprint:javascript_gemini

import { GoogleGenAI } from "@google/genai";
import { createSystemPrompt, searchRelevantContent } from "./ragContext";

// DON'T DELETE THIS COMMENT
// Follow these instructions when using this blueprint:
// - Note that the newest Gemini model series is "gemini-2.5-flash" or gemini-2.5-pro"
//   - do not change this unless explicitly requested by the user

// This API key is from Gemini Developer API Key, not vertex AI API Key
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

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

/**
 * Chat avec Gemini 2.5 Pro utilisant contexte RAG HaEsh Sheli
 */
export async function chatWithGemini(request: ChatRequest): Promise<ChatResponse> {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return {
        response: "מצטער, מערכת הצ'אט אינה זמינה כרגע. אנא צרו קשר עם השירות לקוחות.",
        error: "GEMINI_API_KEY not configured"
      };
    }

    // בניית ההיסטוריה עם קונטקסט RAG
    const systemPrompt = createSystemPrompt();
    
    // חיפוש תוכן רלוונטי אם נדרש RAG
    let contextualInfo = '';
    if (request.useRAG !== false) {
      contextualInfo = searchRelevantContent(request.message);
    }

    // בניית ההיסטוריה המלאה
    const conversationContents = [];
    
    // הוספת הודעות קודמות מההיסטוריה
    if (request.conversationHistory && request.conversationHistory.length > 0) {
      request.conversationHistory.forEach(msg => {
        conversationContents.push({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }]
        });
      });
    }

    // הוספת ההודעה הנוכחית
    const userMessage = contextualInfo 
      ? `${request.message}\n\nמידע רלוונטי נוסף: ${contextualInfo}`
      : request.message;
      
    conversationContents.push({
      role: 'user',
      parts: [{ text: userMessage }]
    });

    // קריאה ל-Gemini 2.5 Pro
    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
        maxOutputTokens: 2048,
      },
      contents: conversationContents,
    });

    const responseText = response.text || "מצטער, לא הצלחתי לעבד את השאלה. אנא נסה שוב.";

    return {
      response: responseText,
      conversationId: generateConversationId()
    };

  } catch (error: any) {
    console.error('Gemini chat error:', error);
    
    // הודעת שגיאה ידידותית בעברית
    let errorMessage = "מצטער, אירעה שגיאה בעיבוד השאלה. אנא נסה שוב בעוד רגע.";
    
    if (error.message?.includes('API_KEY')) {
      errorMessage = "מערכת הצ'אט אינה זמינה כרגע. אנא צרו קשר עם השירות לקוחות.";
    } else if (error.message?.includes('quota') || error.message?.includes('limit')) {
      errorMessage = "מערכת הצ'אט עמוסה כרגע. אנא נסו שוב בעוד כמה דקות.";
    } else if (error.message?.includes('safety')) {
      errorMessage = "השאלה לא עברה את מערכת הבטיחות. אנא נסח שוב בצורה שונה.";
    }

    return {
      response: errorMessage,
      error: error.message
    };
  }
}

/**
 * Chat עם streaming response לחוויה משופרת
 */
export async function* chatWithGeminiStream(request: ChatRequest): AsyncGenerator<string> {
  try {
    if (!process.env.GEMINI_API_KEY) {
      yield "מצטער, מערכת הצ'אט אינה זמינה כרגע. אנא צרו קשר עם השירות לקוחות.";
      return;
    }

    const systemPrompt = createSystemPrompt();
    
    // חיפוש תוכן רלוונטי
    let contextualInfo = '';
    if (request.useRAG !== false) {
      contextualInfo = searchRelevantContent(request.message);
    }

    // בניית ההיסטוריה
    const conversationContents = [];
    
    if (request.conversationHistory && request.conversationHistory.length > 0) {
      request.conversationHistory.forEach(msg => {
        conversationContents.push({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }]
        });
      });
    }

    const userMessage = contextualInfo 
      ? `${request.message}\n\nמידע רלוונטי נוסף: ${contextualInfo}`
      : request.message;
      
    conversationContents.push({
      role: 'user',
      parts: [{ text: userMessage }]
    });

    // יצירת streaming response
    const stream = await ai.models.generateContentStream({
      model: "gemini-2.5-pro",
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
        maxOutputTokens: 2048,
      },
      contents: conversationContents,
    });

    // הזרמת התגובות
    for await (const chunk of stream) {
      const text = chunk.text;
      if (text) {
        yield text;
      }
    }

  } catch (error: any) {
    console.error('Gemini streaming error:', error);
    
    let errorMessage = "מצטער, אירעה שגיאה בעיבוד השאלה. אנא נסה שוב בעוד רגע.";
    
    if (error.message?.includes('API_KEY')) {
      errorMessage = "מערכת הצ'אט אינה זמינה כרגע. אנא צרו קשר עם השירות לקוחות.";
    } else if (error.message?.includes('quota') || error.message?.includes('limit')) {
      errorMessage = "מערכת הצ'אט עמוסה כרגע. אנא נסו שוב בעוד כמה דקות.";
    }
    
    yield errorMessage;
  }
}

/**
 * בדיקת תקינות החיבור ל-Gemini
 */
export async function checkGeminiConnection(): Promise<{ connected: boolean; model?: string; error?: string }> {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return {
        connected: false,
        error: "GEMINI_API_KEY not configured"
      };
    }

    // בדיקה פשוטה של החיבור
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "שלום, זה רק בדיקה. ענה בעברית בקצרה.",
    });

    if (response.text) {
      return {
        connected: true,
        model: "gemini-2.5-pro"
      };
    } else {
      return {
        connected: false,
        error: "No response from Gemini API"
      };
    }

  } catch (error: any) {
    return {
      connected: false,
      error: error.message
    };
  }
}

/**
 * יוצר מזהה שיחה ייחודי
 */
function generateConversationId(): string {
  return `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * פונקציה עזר לניתוח סנטימנט של שאלת המשתמש
 */
export async function analyzeUserSentiment(message: string): Promise<{ sentiment: 'positive' | 'neutral' | 'negative'; confidence: number }> {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return { sentiment: 'neutral', confidence: 0 };
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            sentiment: { type: "string", enum: ["positive", "neutral", "negative"] },
            confidence: { type: "number", minimum: 0, maximum: 1 }
          },
          required: ["sentiment", "confidence"]
        }
      },
      contents: `נתח את הסנטימנט של ההודעה הבאה ודרג בין positive/neutral/negative עם רמת ביטחון 0-1:
      
      "${message}"`
    });

    if (response.text) {
      const result = JSON.parse(response.text);
      return {
        sentiment: result.sentiment || 'neutral',
        confidence: result.confidence || 0.5
      };
    }

    return { sentiment: 'neutral', confidence: 0.5 };

  } catch (error) {
    console.error('Sentiment analysis error:', error);
    return { sentiment: 'neutral', confidence: 0 };
  }
}