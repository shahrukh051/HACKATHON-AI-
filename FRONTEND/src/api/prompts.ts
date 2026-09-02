import { simulate } from '@/lib/mockClient';
import { mockPrompts, mockPromptAnalysis } from '@/lib/mockData';
import type { GeneratedPrompt, PromptAnalysis } from '@/types';

export async function generatePrompt(taskId: string): Promise<GeneratedPrompt> {
  const prompt = mockPrompts[taskId] ?? {
    id: `prompt_${taskId}`,
    taskId,
    qualityScore: 88,
    content:
      'Generated prompt content will appear here once this task is wired to the backend prompt generator.',
  };
  return simulate(prompt, { minMs: 1600, maxMs: 2400 });
}

export async function analyzePrompt(promptText: string): Promise<PromptAnalysis> {
  return simulate(mockPromptAnalysis, { minMs: 1400, maxMs: 2200 });
}
