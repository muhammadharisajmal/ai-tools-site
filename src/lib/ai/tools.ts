// ======================================================
// AI STUDY HUB
// Prompt Dispatcher
// ======================================================

import { AIRequest } from "./types";
import { getPromptBuilder } from "./prompts";

// ======================================================
// Build Final User Prompt
// ======================================================

export function buildPrompt(data: AIRequest): string {
  const builder = getPromptBuilder(data.tool);

  if (!builder) {
    throw new Error(`No prompt builder found for tool "${data.tool}"`);
  }

  return builder(data);
}