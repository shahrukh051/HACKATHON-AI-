// ---------- Hackathon ----------

export interface Hackathon {
  id: string;
  name: string;
  problemStatement: string;
  theme: string;
  rules: string;
  judgingCriteria: string;
  teamMembers: string[];
  teamSkills: string[];
  preferredTechnologies: string[];
  timeAvailable: string;
  budget: string;
  createdAt: string;
}

export type HackathonSetupInput = Omit<Hackathon, 'id' | 'createdAt'>;

// ---------- Analysis ----------

export interface HackathonScore {
  label: string;
  value: number; // 0-100
}

export interface Analysis {
  hackathonId: string;
  problemUnderstanding: string;
  targetUsers: string[];
  constraints: string[];
  opportunities: string[];
  risks: string[];
  scores: HackathonScore[];
}

// ---------- Ideas ----------

export interface IdeaScores {
  innovation: number;
  feasibility: number;
  impact: number;
  demoPotential: number;
}

export interface ProjectIdea {
  id: string;
  hackathonId: string;
  title: string;
  summary: string;
  scores: IdeaScores;
  recommended: boolean;
  techStack: string[];
}

// ---------- Project / Tasks ----------

export type TaskTrack = 'Backend' | 'Frontend' | 'AI/ML' | 'Design' | 'DevOps';
export type TaskStatus = 'todo' | 'in_progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskComplexity = 'simple' | 'moderate' | 'complex';

export interface ProjectTask {
  id: string;
  projectId: string;
  track: TaskTrack;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  complexity: TaskComplexity;
  recommendedAI: AIProvider;
  dependencies: string[];
}

export interface Project {
  id: string;
  hackathonId: string;
  ideaId: string;
  name: string;
  summary: string;
  createdAt: string;
}

// ---------- Prompts ----------

export interface GeneratedPrompt {
  id: string;
  taskId: string;
  content: string;
  qualityScore: number; // 0-100
}

export interface PromptScoreBreakdown {
  clarity: number;
  context: number;
  specificity: number;
  constraints: number;
  outputDefinition: number;
}

export interface PromptAnalysis {
  overallScore: number;
  breakdown: PromptScoreBreakdown;
  problems: string[];
  suggestions: string[];
  improvedPrompt: string;
}

// ---------- AI Recommendation / Battle ----------

export type AIProvider = 'GPT' | 'Claude' | 'Gemini';

export interface AIRecommendation {
  taskId: string;
  recommended: AIProvider;
  confidence: number; // 0-100
  reasoning: string;
  alternatives: { provider: AIProvider; matchScore: number }[];
}

export interface AIExecutionResult {
  provider: AIProvider;
  output: string;
  score: number;
}

export interface AIComparison {
  taskId: string;
  results: AIExecutionResult[];
  winner: AIProvider;
  evaluatorNotes: string;
}

// ---------- Judge Simulator ----------

export interface JudgeQuestion {
  id: string;
  index: number;
  question: string;
}

export interface JudgeFeedbackScores {
  technical: number;
  clarity: number;
  confidence: number;
  persuasiveness: number;
}

export interface JudgeFeedback {
  questionId: string;
  scores: JudgeFeedbackScores;
  feedback: string;
  weaknesses: string[];
  betterAnswer: string;
  nextQuestion: JudgeQuestion | null;
}

// ---------- Pitch ----------

export interface Pitch {
  projectId: string;
  elevatorPitch: string;
  problemStatement: string;
  solution: string;
  keyFeatures: string[];
  architectureExplanation: string;
  businessImpact: string;
  demoScript: string;
  presentationStructure: string[];
}

// ---------- Async state helper ----------

export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error';
