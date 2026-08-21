import { NextResponse } from "next/server";

import { groq } from "@/lib/ai/groq";
import { getModel } from "@/lib/ai/models";
import { getSystemPrompt } from "@/lib/ai/system";
import { buildPrompt } from "@/lib/ai/tools";

import {
  AIRequest,
  AIResponse,
} from "@/lib/ai/types";

export async function POST(req: Request) {
  try {
    // Parse request body
    const data: AIRequest = await req.json();

    // Basic validation
    if (!data.tool || !data.prompt) {
      return NextResponse.json<AIResponse>(
        {
          success: false,
          error: "Tool and prompt are required.",
        },
        {
          status: 400,
        }
      );
    }

    // Get model configuration
    const modelConfig = getModel(data.tool);

    console.log("AI TOOL:", data.tool);
console.log("AI MODEL:", modelConfig.model);


    // Get system prompt
    const systemPrompt = getSystemPrompt(data.tool);

    // Build user prompt
    const userPrompt = buildPrompt(data);

    // ============================
// Call Groq
// ============================

const completion = await groq.chat.completions.create({
  model: modelConfig.model,

  temperature: modelConfig.temperature,

  max_completion_tokens: modelConfig.maxTokens,

  messages: [
    {
      role: "system",
      content: systemPrompt,
    },
    {
      role: "user",
      content: userPrompt,
    },
  ],
});

// ============================
// Success Response
// ============================

return NextResponse.json({
  success: true,

  tool: data.tool,

  model: modelConfig.model,

  result: completion.choices[0]?.message?.content ?? "",

  usage: completion.usage
    ? {
        promptTokens: completion.usage.prompt_tokens,
        completionTokens: completion.usage.completion_tokens,
        totalTokens: completion.usage.total_tokens,
      }
    : undefined,
});

} catch (error: any) {
  console.error("GROQ ERROR:", error);

  return NextResponse.json(
    {
      success: false,
      error: error?.message || "Internal Server Error.",
    },
    {
      status: 500,
    }
  );
}
}