// Service OpenAI ChatGPT 4o-mini pour Chat authentique avec RAG HaEsh Sheli
// Via Open Router API - Modèle "openai/gpt-4o-mini" (ChatGPT 4o-mini)

import { createSystemPrompt, searchRelevantContent } from "./ragContext";

// Open Router configuration
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1";
const MODEL_NAME = "openai/gpt-4o-mini";

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
 * Chat avec OpenAI ChatGPT 4o-mini utilisant contexte RAG HaEsh Sheli
 */
export async function chatWithOpenAI(request: ChatRequest): Promise<ChatResponse> {
  try {
    // Utiliser OpenRouter API Key si disponible, sinon OpenAI API Key
    const apiKey = process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return {
        response: "מצטער, מערכת הצ'אט אינה זמינה כרגע. אנא צרו קשר עם השירות לקוחות.",
        error: "API_KEY not configured (OPENROUTER_API_KEY or OPENAI_API_KEY required)"
      };
    }

    // בניית ההיסטוריה עם קונטקסט RAG
    const systemPrompt = createSystemPrompt();
    
    // חיפוש תוכן רלוונטי אם נדרש RAG
    let contextualInfo = '';
    if (request.useRAG !== false) {
      contextualInfo = searchRelevantContent(request.message);
    }

    // בניית ההיסטוריה המלאה בפורמט OpenAI
    const messages = [
      {
        role: "system",
        content: systemPrompt
      }
    ];
    
    // הוספת הודעות קודמות מההיסטוריה
    if (request.conversationHistory && request.conversationHistory.length > 0) {
      request.conversationHistory.forEach(msg => {
        messages.push({
          role: msg.role,
          content: msg.content
        });
      });
    }

    // הוספת ההודעה הנוכחית
    const userMessage = contextualInfo 
      ? `${request.message}\n\nמידע רלוונטי נוסף: ${contextualInfo}`
      : request.message;
      
    messages.push({
      role: "user",
      content: userMessage
    });

    // קריאה ל-OpenAI ChatGPT 4o-mini via Open Router
    const response = await fetch(`${OPENROUTER_API_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://haesh-sheli.co.il",
        "X-Title": "HaEsh Sheli Chat System"
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        messages: messages,
        temperature: 0.7,
        max_tokens: 2048,
        stream: false
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`OpenAI API error: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    const responseText = data.choices?.[0]?.message?.content || "מצטער, לא הצלחתי לעבד את השאלה. אנא נסה שוב.";

    return {
      response: responseText,
      conversationId: generateConversationId()
    };

  } catch (error: any) {
    console.error('OpenAI chat error:', error);
    
    // הודעת שגיאה ידידותית בעברית
    let errorMessage = "מצטער, אירעה שגיאה בעיבוד השאלה. אנא נסה שוב בעוד רגע.";
    
    if (error.message?.includes('API_KEY') || error.message?.includes('401')) {
      errorMessage = "מערכת הצ'אט אינה זמינה כרגע. אנא צרו קשר עם השירות לקוחות.";
    } else if (error.message?.includes('quota') || error.message?.includes('limit') || error.message?.includes('429')) {
      errorMessage = "מערכת הצ'אט עמוסה כרגע. אנא נסו שוב בעוד כמה דקות.";
    } else if (error.message?.includes('safety') || error.message?.includes('content_policy')) {
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
export async function* chatWithOpenAIStream(request: ChatRequest): AsyncGenerator<string> {
  try {
    if (!process.env.OPENAI_API_KEY) {
      yield "מצטער, מערכת הצ'אט אינה זמינה כרגע. אנא צרו קשר עם השירות לקוחות.";
      return;
    }

    const systemPrompt = createSystemPrompt();
    
    // חיפוש תוכן רלוונטי
    let contextualInfo = '';
    if (request.useRAG !== false) {
      contextualInfo = searchRelevantContent(request.message);
    }

    // בניית ההיסטוריה בפורמט OpenAI
    const messages = [
      {
        role: "system",
        content: systemPrompt
      }
    ];
    
    if (request.conversationHistory && request.conversationHistory.length > 0) {
      request.conversationHistory.forEach(msg => {
        messages.push({
          role: msg.role,
          content: msg.content
        });
      });
    }

    const userMessage = contextualInfo 
      ? `${request.message}\n\nמידע רלוונטי נוסף: ${contextualInfo}`
      : request.message;
      
    messages.push({
      role: "user",
      content: userMessage
    });

    // יצירת streaming response
    const response = await fetch(`${OPENROUTER_API_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://haesh-sheli.co.il",
        "X-Title": "HaEsh Sheli Chat System"
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        messages: messages,
        temperature: 0.7,
        max_tokens: 2048,
        stream: true
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`OpenAI API error: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`);
    }

    // הזרמת התגובות
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            
            if (data === '[DONE]') {
              return;
            }
            
            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content;
              
              if (content) {
                yield content;
              }
            } catch (e) {
              // Ignore parsing errors for streaming data
            }
          }
        }
      }
    }

  } catch (error: any) {
    console.error('OpenAI streaming error:', error);
    
    let errorMessage = "מצטער, אירעה שגיאה בעיבוד השאלה. אנא נסה שוב בעוד רגע.";
    
    if (error.message?.includes('API_KEY') || error.message?.includes('401')) {
      errorMessage = "מערכת הצ'אט אינה זמינה כרגע. אנא צרו קשר עם השירות לקוחות.";
    } else if (error.message?.includes('quota') || error.message?.includes('limit') || error.message?.includes('429')) {
      errorMessage = "מערכת הצ'אט עמוסה כרגע. אנא נסו שוב בעוד כמה דקות.";
    }
    
    yield errorMessage;
  }
}

/**
 * בדיקת תקינות החיבור ל-OpenAI
 */
export async function checkOpenAIConnection(): Promise<{ connected: boolean; model?: string; error?: string }> {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return {
        connected: false,
        error: "OPENAI_API_KEY not configured"
      };
    }

    // בדיקה פשוטה של החיבור
    const response = await fetch(`${OPENROUTER_API_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://haesh-sheli.co.il",
        "X-Title": "HaEsh Sheli Chat System"
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        messages: [
          {
            role: "user",
            content: "שלום, זה רק בדיקה. ענה בעברית בקצרה."
          }
        ],
        max_tokens: 50
      })
    });

    if (response.ok) {
      const data = await response.json();
      const responseText = data.choices?.[0]?.message?.content;
      
      if (responseText) {
        return {
          connected: true,
          model: MODEL_NAME
        };
      } else {
        return {
          connected: false,
          error: "No response from OpenAI API"
        };
      }
    } else {
      const errorData = await response.json().catch(() => ({}));
      return {
        connected: false,
        error: `API Error: ${response.status} - ${JSON.stringify(errorData)}`
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
  return `openai_conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * פונקציה עזר לניתוח סנטימנט של שאלת המשתמש
 */
export async function analyzeUserSentimentOpenAI(message: string): Promise<{ sentiment: 'positive' | 'neutral' | 'negative'; confidence: number }> {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return { sentiment: 'neutral', confidence: 0 };
    }

    const response = await fetch(`${OPENROUTER_API_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://haesh-sheli.co.il",
        "X-Title": "HaEsh Sheli Chat System"
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        messages: [
          {
            role: "system",
            content: "You are a sentiment analysis system. Respond only with valid JSON containing 'sentiment' (positive/neutral/negative) and 'confidence' (0-1)."
          },
          {
            role: "user",
            content: `נתח את הסנטימנט של ההודעה הבאה החזר רק JSON עם sentiment (positive/neutral/negative) ו-confidence (0-1): "${message}"`
          }
        ],
        max_tokens: 100,
        temperature: 0.3
      })
    });

    if (response.ok) {
      const data = await response.json();
      const responseText = data.choices?.[0]?.message?.content;
      
      if (responseText) {
        try {
          const result = JSON.parse(responseText);
          return {
            sentiment: result.sentiment || 'neutral',
            confidence: result.confidence || 0.5
          };
        } catch (parseError) {
          console.error('Failed to parse sentiment response:', parseError);
        }
      }
    }

    return { sentiment: 'neutral', confidence: 0.5 };

  } catch (error) {
    console.error('OpenAI Sentiment analysis error:', error);
    return { sentiment: 'neutral', confidence: 0 };
  }
}