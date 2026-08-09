import { AIRequest } from "../types";

import { writingPrompt } from "./writing";
import { researchPrompt } from "./research";
import { smartPlannerPrompt } from "./smartPlanner";
import { codingPrompt } from "./coding";
import { productivityPrompt } from "./productivity";
export const promptRegistry = {
  writing: writingPrompt,

  research: researchPrompt,

  studyplanner: smartPlannerPrompt,
  
  coding: codingPrompt,

  productivity: productivityPrompt,
};

export function getPromptBuilder(
  tool: string
): ((data: AIRequest) => string) | undefined {
  return promptRegistry[
    tool as keyof typeof promptRegistry
  ] as ((data: AIRequest) => string) | undefined;
}