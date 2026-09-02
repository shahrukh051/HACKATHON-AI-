import { simulate } from '@/lib/mockClient';
import { mockRecommendations, mockComparisons } from '@/lib/mockData';
import type { AIRecommendation, AIComparison } from '@/types';

export async function recommendAI(taskId: string): Promise<AIRecommendation> {
  const rec = mockRecommendations[taskId] ?? mockRecommendations['task_002'];
  return simulate({ ...rec, taskId }, { minMs: 1200, maxMs: 1900 });
}

export async function executeTask(taskId: string): Promise<{ status: 'queued' }> {
  return simulate({ status: 'queued' as const }, { minMs: 400, maxMs: 700 });
}

export async function compareAI(taskId: string): Promise<AIComparison> {
  const comparison = mockComparisons[taskId] ?? mockComparisons['task_002'];
  return simulate({ ...comparison, taskId }, { minMs: 2200, maxMs: 3200 });
}
