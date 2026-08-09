// ======================================================
// AI STUDY HUB
// Writing Prompt Builder
// ======================================================

import { PromptBuilder, WritingRequest } from "../types";

export const writingPrompt: PromptBuilder<WritingRequest> = (data) => `
You are a professional AI Writing Assistant and Expert Content Creator.

Your task is to create a high-quality ${data.tone || "professional"} ${data.writingType || "article"}.

# Topic

${data.prompt}

# Language

${data.language || "English"}

# Output Length

${data.outputLength || "Medium"}

# Special Instructions

${data.specialInstructions || "None"}

# Requirements

- Write completely original content.
- Do not repeat ideas unnecessarily.
- Write naturally.
- Use Markdown.
- Start with an engaging introduction.
- Use clear headings.
- Explain each heading thoroughly.
- Use bullet lists where appropriate.
- Keep logical flow.
- End with a strong conclusion.

Return ONLY Markdown.
`;