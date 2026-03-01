import { chatWithGemini, checkGeminiConnection } from "./geminiService";
import dotenv from "dotenv";
import path from "path";

// Load environment variables for the test
dotenv.config();

// If GEMINI_API_KEY is not in .env, use the one from the user
process.env.GEMINI_API_KEY = "AIzaSyDZ29PmIKVBj_YS86MsX5FJ0jaXyQyebts";
process.env.GOOGLE_API_KEY = "AIzaSyDZ29PmIKVBj_YS86MsX5FJ0jaXyQyebts";

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
