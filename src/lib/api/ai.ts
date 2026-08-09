import { AIRequest, AIResponse } from "@/lib/ai/types";

export async function askAI(data: AIRequest): Promise<AIResponse> {
  const response = await fetch("/api/ai", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result: AIResponse = await response.json();

  return result;
}