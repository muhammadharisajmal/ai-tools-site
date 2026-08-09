// ======================================================
// AI STUDY HUB
// Shared Types
// Single Source of Truth
// ======================================================

export type AITool =
  | "writing"
  | "research"
  | "studyplanner"
  | "coding"
  | "productivity";

// ======================================================
// Base Request
// ======================================================

export interface BaseAIRequest {
  tool: AITool;
  prompt: string;
  language?: string;
}

// ======================================================
// Writing Assistant
// ======================================================

export interface WritingRequest extends BaseAIRequest {
  tool: "writing";

  tone?: string;
  writingType?: string;
  outputLength?: string;
  specialInstructions?: string;
}

// ======================================================
// Research Assistant
// ======================================================

export interface ResearchRequest extends BaseAIRequest {
  tool: "research";

  researchMode?: string;
  academicLevel?: string;
  researchDepth?: string;
  citationStyle?: string;
  outputLength?: string;
}

// ======================================================
// Smart Study Planner
// ======================================================

export interface StudyPlannerRequest extends BaseAIRequest {
  tool: "studyplanner";

  semester?: string;
  degree?: string;
  subjects?: string;

  dailyHours?: string;

  wakeUpTime?: string;
  sleepTime?: string;

  examDate?: string;
  assignmentDeadline?: string;

  currentGPA?: string;
  targetGPA?: string;

  goal?: string;

  difficulty?: string;

  studyMode?: string;

  outputLength?: string;

  specialInstructions?: string;
}

// ======================================================
// AI Coding Assistant
// ======================================================

export interface CodingRequest extends BaseAIRequest {
  tool: "coding";

  programmingLanguage?: string;

  framework?: string;

  difficulty?: string;

  codeStyle?: string;

  includeExplanation?: boolean;

  includeComments?: boolean;

  includeComplexity?: boolean;
}

// ======================================================
// Productivity
// ======================================================

export interface ProductivityRequest extends BaseAIRequest {
  tool: "productivity";

  goal?: string;

  currentTask?: string;

  availableHours?: string;

  deadline?: string;

  energyLevel?: string;

  stressLevel?: string;

  productivityMode?: string;

  preferredStudyMethod?: string;

  specialInstructions?: string;
}

// ======================================================
// Unified Request
// ======================================================

export type AIRequest =
  | WritingRequest
  | ResearchRequest
  | StudyPlannerRequest
  | CodingRequest
  | ProductivityRequest;

// ======================================================
// Model Config
// ======================================================

export interface AIModelConfig {
  model: string;
  temperature: number;
  maxTokens: number;
}

// ======================================================
// Prompt Builder
// ======================================================

export type PromptBuilder<T extends AIRequest = AIRequest> = (
  data: T
) => string;

// ======================================================
// API Response
// ======================================================

export interface AIUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

export interface AISuccessResponse {
  success: true;

  tool: AITool;

  model: string;

  result: string;

  usage?: AIUsage;
}

export interface AIErrorResponse {
  success: false;

  error: string;
}

export type AIResponse =
  | AISuccessResponse
  | AIErrorResponse;