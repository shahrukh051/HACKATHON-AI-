import { simulate } from '@/lib/mockClient';
import { mockJudgeQuestions, mockJudgeFeedback } from '@/lib/mockData';
import type { JudgeQuestion, JudgeFeedback } from '@/types';

export async function startJudgeSession(projectId: string): Promise<JudgeQuestion> {
  return simulate(mockJudgeQuestions[0], { minMs: 500, maxMs: 900 });
}

export async function submitJudgeAnswer(
  questionId: string,
  answer: string,
): Promise<JudgeFeedback> {
  return simulate({ ...mockJudgeFeedback, questionId }, { minMs: 1600, maxMs: 2400 });
}
