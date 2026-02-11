#!/usr/bin/env node

const GEMINI_API_KEY = 'AIzaSyDXTfhyOhcjXUB56ubE1S7Lags9vMz80qs';

const products = [
  { id: 'sefer-hamidot', nameEnglish: 'Sefer Hamidot' },
  { id: 'likutei-etzot', nameEnglish: 'Likutei Etzot' },
  { id: 'sichos-haran', nameEnglish: 'Sichos Haran' },
  { id: 'tehilim', nameEnglish: 'Tehilim (Psalms)' },
  { id: 'avi-hanachal', nameEnglish: 'Avi HaNachal' }
];

async function translateWithGemini(text, targetLanguage) {
  const prompt = `Translate this Hebrew/religious book title to ${targetLanguage}. Keep it concise and respectful. Only return the translation, nothing else.

Title: ${text}

${targetLanguage} translation:`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 100
        }
      })
    }
  );

  const data = await response.json();

  if (!data.candidates || !data.candidates[0]) {
    throw new Error(`API error: ${JSON.stringify(data)}`);
  }

  return data.candidates[0].content.parts[0].text.trim();
}

async function translateProduct(product) {
  console.log(`\n🔄 Translating: ${product.id} (${product.nameEnglish})`);

  try {
    const french = await translateWithGemini(product.nameEnglish, 'French');
    console.log(`  FR: ${french}`);

    await new Promise(resolve => setTimeout(resolve, 1000)); // Rate limit

    const spanish = await translateWithGemini(product.nameEnglish, 'Spanish');
    console.log(`  ES: ${spanish}`);

    await new Promise(resolve => setTimeout(resolve, 1000)); // Rate limit

    const russian = await translateWithGemini(product.nameEnglish, 'Russian');
    console.log(`  RU: ${russian}`);

    return { french, spanish, russian };
  } catch (error) {
    console.error(`  ❌ Error: ${error.message}`);
    return null;
  }
}

async function main() {
  console.log('🚀 Starting translation process for 5 Keren products...\n');

  const results = {};

  for (const product of products) {
    const translations = await translateProduct(product);
    if (translations) {
      results[product.id] = {
        nameEnglish: product.nameEnglish,
        ...translations
      };
    }
    await new Promise(resolve => setTimeout(resolve, 2000)); // Pause between products
  }

  console.log('\n✅ Translation complete!\n');
  console.log('📋 Results:\n');
  console.log(JSON.stringify(results, null, 2));
}

main().catch(console.error);
