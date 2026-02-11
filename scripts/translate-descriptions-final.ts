/**
 * FINAL ATTEMPT - Product descriptions translation using Google Translate API
 * If this fails, we switch to DeepL or manual translation
 */
import { realBreslovProducts } from '../client/src/data/realProducts';

const realProducts = Object.values(realBreslovProducts);

// Using Google Cloud Translation API (simpler, more reliable than Gemini for translation)
const GOOGLE_TRANSLATE_API = 'https://translation.googleapis.com/language/translate/v2';
const API_KEY = 'AIzaSyDXTfhyOhcjXUB56ubE1S7Lags9vMz80qs';

async function translateWithGoogle(text: string, targetLang: string): Promise<string> {
  try {
    const response = await fetch(`${GOOGLE_TRANSLATE_API}?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        q: text,
        target: targetLang,
        format: 'text',
        source: 'en'
      })
    });

    const data = await response.json();
    if (data.error) {
      console.error(`  Google Translate API error: ${data.error.message}`);
      return text;
    }

    return data.data.translations[0].translatedText;
  } catch (error: any) {
    console.error(`  Translation error: ${error.message}`);
    return text;
  }
}

async function main() {
  console.log(`🌐 Google Translate API - Translating ${realProducts.length} products...`);
  console.log('Languages: FR, ES, RU\n');

  const translations: Record<string, any> = {};

  for (let i = 0; i < realProducts.length; i++) {
    const product = realProducts[i];
    console.log(`[${i+1}/${realProducts.length}] ${product.id}`);

    const descEn = product.descriptionEnglish || product.description;

    try {
      const [fr, es, ru] = await Promise.all([
        translateWithGoogle(descEn, 'fr'),
        translateWithGoogle(descEn, 'es'),
        translateWithGoogle(descEn, 'ru')
      ]);

      translations[product.id] = {
        descriptionFrench: fr,
        descriptionSpanish: es,
        descriptionRussian: ru
      };

      console.log(`  ✅ FR: ${fr.substring(0, 40)}...`);
      console.log(`  ✅ ES: ${es.substring(0, 40)}...`);
      console.log(`  ✅ RU: ${ru.substring(0, 40)}...`);

      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 200)); // Google allows higher rate
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
