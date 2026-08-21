// ======================================================
// AI STUDY HUB
// Model Registry
// ======================================================

import { AIModelConfig, AITool } from "./types";

export const GROQ_MODELS = {
  GPT_OSS_120B: "openai/gpt-oss-120b",
  LLAMA_8B: "llama-3.1-8b-instant",
} as const;
//models
const MODEL_REGISTRY: Record<AITool, AIModelConfig> = {
  writing: {
    model: GROQ_MODELS.GPT_OSS_120B,
    temperature: 0.7,
    maxTokens: 4096,
  },

  research: {
    model: GROQ_MODELS.GPT_OSS_120B,
    temperature: 0.3,
    maxTokens: 8192,
  },

  studyplanner: {
    model: GROQ_MODELS.GPT_OSS_120B,
    temperature: 0.5,
    maxTokens: 8192,
  },

  coding: {
    model: GROQ_MODELS.GPT_OSS_120B,
    temperature: 0.2,
    maxTokens: 8192,
  },

  productivity: {
    model: GROQ_MODELS.GPT_OSS_120B,
    temperature: 0.6,
    maxTokens: 8192,
  },
};

export function getModel(tool: AITool): AIModelConfig {
  return MODEL_REGISTRY[tool];
}