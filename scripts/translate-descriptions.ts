/**
 * Script to translate all product descriptions to FR/ES/RU using Gemini API
 * Run with: tsx scripts/translate-descriptions.ts
 */
import { realProducts } from '../client/src/data/realProducts';

const GEMINI_API_KEY = 'AIzaSyDXTfhyOhcjXUB56ubE1S7Lags9vMz80qs';
const GEMINI_API = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';

async function translateText(text: string, targetLang: string): Promise<string> {
  const langNames = { fr: 'French', es: 'Spanish', ru: 'Russian' };
  const prompt = `Translate this Breslov book description to ${langNames[targetLang as keyof typeof langNames]}. Keep the spiritual tone. Description: "${text}"`;

  const response = await fetch(`${GEMINI_API}?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.3, maxOutputTokens: 500 }
    })
  });

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || text;
}

async function main() {
  console.log(`🌍 Starting translation of ${realProducts.length} product descriptions...`);
  console.log('Languages: FR, ES, RU\n');
  
  const translations: Record<string, any> = {};
  
  for (let i = 0; i < realProducts.length; i++) {
    const product = realProducts[i];
    console.log(`[${i+1}/${realProducts.length}] ${product.id}: ${product.name.substring(0, 40)}`);
    
    const descEn = product.descriptionEnglish || product.description;
    
    try {
      const [fr, es, ru] = await Promise.all([
        translateText(descEn, 'fr'),
        translateText(descEn, 'es'),
        translateText(descEn, 'ru')
      ]);
      
      translations[product.id] = {
        descriptionFrench: fr,
        descriptionSpanish: es,
        descriptionRussian: ru
      };
      
      console.log(`  ✅ Translated to 3 languages`);
      
      // Rate limiting (Gemini API: 15 RPM free tier)
      await new Promise(resolve => setTimeout(resolve, 4500)); // ~13 req/min
    } catch (error: any) {
      console.error(`  ❌ Error: ${error.message}`);
    }
  }
  
  // Save to file
  const fs = await import('fs/promises');
  await fs.writeFile('translations-output.json', JSON.stringify(translations, null, 2));
  console.log(`\n✅ Translations saved to translations-output.json`);
  console.log(`Total: ${Object.keys(translations).length} products translated`);
}

main().catch(console.error);
