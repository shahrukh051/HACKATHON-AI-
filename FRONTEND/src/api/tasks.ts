import { simulate } from '@/lib/mockClient';
import { mockTasks } from '@/lib/mockData';
import type { ProjectTask } from '@/types';

export async function getTasks(projectId: string): Promise<ProjectTask[]> {
  return simulate(
    mockTasks.map((t) => ({ ...t, projectId })),
    { minMs: 500, maxMs: 1000 },
  );
}

export async function getTask(taskId: string): Promise<ProjectTask | undefined> {
  const task = mockTasks.find((t) => t.id === taskId);
  return simulate(task, { minMs: 250, maxMs: 500 });
}

export async function updateTaskStatus(
  taskId: string,
  status: ProjectTask['status'],
): Promise<ProjectTask> {
  const task = mockTasks.find((t) => t.id === taskId)!;
  return simulate({ ...task, status }, { minMs: 300, maxMs: 600 });
}
