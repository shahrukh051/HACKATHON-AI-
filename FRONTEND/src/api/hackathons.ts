import { simulate } from '@/lib/mockClient';
import { mockHackathon, mockAnalysis, mockIdeas, HACKATHON_ID } from '@/lib/mockData';
import type { Hackathon, HackathonSetupInput, Analysis, ProjectIdea } from '@/types';

export async function createHackathon(input: HackathonSetupInput): Promise<Hackathon> {
  const hackathon: Hackathon = {
    ...input,
    id: HACKATHON_ID,
    createdAt: new Date().toISOString(),
  };
  return simulate(hackathon, { minMs: 500, maxMs: 900 });
}

export async function getHackathon(id: string): Promise<Hackathon> {
  return simulate({ ...mockHackathon, id }, { minMs: 300, maxMs: 600 });
}

export async function analyzeHackathon(id: string): Promise<Analysis> {
  return simulate({ ...mockAnalysis, hackathonId: id }, { minMs: 1800, maxMs: 2600 });
}

export async function getIdeas(hackathonId: string): Promise<ProjectIdea[]> {
  return simulate(
    mockIdeas.map((i) => ({ ...i, hackathonId })),
    { minMs: 1400, maxMs: 2200 },
  );
}

export async function selectIdea(hackathonId: string, ideaId: string): Promise<{ projectId: string }> {
  return simulate({ projectId: 'proj_001' }, { minMs: 500, maxMs: 900 });
}
