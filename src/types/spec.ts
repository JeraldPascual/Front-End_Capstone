export type Priority = 'Must Have' | 'Should Have' | 'Could Have';
export type StoryStatus = 'planned' | 'in_progress' | 'completed';
export type TShirtSize = 'S' | 'M' | 'L' | 'XL';
export type EdgeCaseCategory = 'Network / Offline' | 'Validation / Input' | 'Auth & Permissions' | 'Performance & Scale';

export interface AcceptanceCriterion {
  id: string;
  given: string;
  when: string;
  then: string;
  completed?: boolean;
}

export interface UserStory {
  id: string;
  title: string;
  asA: string;
  iWant: string;
  soThat: string;
  acceptanceCriteria: AcceptanceCriterion[];
  priority: Priority;
  status: StoryStatus;
}

export interface ExecutiveSummary {
  problemStatement: string;
  targetPersona: string;
  valueProposition: string;
  successMetrics: string[];
}

export interface AccessibilitySpec {
  wcagLevel: 'WCAG 2.1 AA' | 'WCAG 2.1 AAA';
  keyboardNavigation: string[];
  screenReaderNotes: string[];
  colorContrastNotes: string[];
  focusManagement: string[];
}

export interface EdgeCase {
  id: string;
  category: EdgeCaseCategory;
  scenario: string;
  expectedBehavior: string;
  fallbackMitigation: string;
}

export interface ArchitectureSpec {
  frontendPattern: string;
  stateManagement: string;
  apiContract: string[];
  performanceBudget: string[];
}

export interface EffortEstimation {
  tShirtSize: TShirtSize;
  estimatedHours: number;
  risks: string[];
}

export interface FeatureSpec {
  id: string;
  title: string;
  tagline: string;
  createdAt: string;
  sourceProvider: 'mock' | 'claude' | 'gemini' | 'openai';
  executiveSummary: ExecutiveSummary;
  userStories: UserStory[];
  accessibility: AccessibilitySpec;
  edgeCases: EdgeCase[];
  architecture: ArchitectureSpec;
  effortEstimation: EffortEstimation;
}

export interface SpecPromptInput {
  featureName: string;
  targetAudience: string;
  coreProblem: string;
  techStack: string;
  complexity: 'simple' | 'standard' | 'complex';
}

export type LLMProvider = 'mock' | 'claude' | 'gemini' | 'openai';

export interface ProviderConfig {
  provider: LLMProvider;
  apiKey?: string;
  model?: string;
}

export interface GenerationStatus {
  isLoading: boolean;
  stage: 'idle' | 'analyzing' | 'drafting_stories' | 'evaluating_edge_cases' | 'finalizing' | 'error';
  error: string | null;
  usedFallback?: boolean;
}
