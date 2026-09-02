import { simulate } from '@/lib/mockClient';
import { mockProject } from '@/lib/mockData';
import type { Project, Pitch } from '@/types';
import { mockPitch } from '@/lib/mockData';

export async function getProject(id: string): Promise<Project> {
  return simulate({ ...mockProject, id }, { minMs: 300, maxMs: 600 });
}

export async function getPitch(projectId: string): Promise<Pitch> {
  return simulate({ ...mockPitch, projectId }, { minMs: 1200, maxMs: 1900 });
}
