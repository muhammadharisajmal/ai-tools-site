// ======================================================
// AI STUDY HUB
// Groq Client
// ======================================================

import Groq from "groq-sdk";

// Ensure the API key exists during startup
if (!process.env.GROQ_API_KEY) {
  throw new Error("Missing GROQ_API_KEY in .env.local");
}

// Singleton Groq client
export const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});