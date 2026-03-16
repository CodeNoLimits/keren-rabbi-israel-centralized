import { chatWithGemini, checkGeminiConnection } from "./geminiService";
import dotenv from "dotenv";
import path from "path";

// Load environment variables for the test
dotenv.config();

// GEMINI_API_KEY must be set in .env file (never hardcode secrets)
if (!process.env.GEMINI_API_KEY) {
  console.error("GEMINI_API_KEY not found in environment. Set it in .env file.");
  process.exit(1);
}
process.env.GOOGLE_API_KEY = process.env.GEMINI_API_KEY;

async function testGemini() {
  console.log("--- Testing Gemini Connection ---");
  const status = await checkGeminiConnection();
  console.log("Connection Status:", JSON.stringify(status, null, 2));

  if (status.connected) {
    console.log("\n--- Testing Chat Response ---");
    const response = await chatWithGemini({
      message: "שלום, מי אתה?",
      useRAG: false
    });
    console.log("Chat Response:", JSON.stringify(response, null, 2));
  } else {
    console.error("Gemini is not connected. Chat test skipped.");
  }
}

testGemini().catch(console.error);
