import { useParams, useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useAsync } from '@/hooks/useAsync';
import { getTasks } from '@/api/tasks';
import { CardSkeleton } from '@/components/ui/Loader';
import ErrorState from '@/components/ui/ErrorState';
import Card from '@/components/ui/Card';
import { PriorityBadge, StatusBadge, ProviderBadge, Badge } from '@/components/ui/Badge';
import type { ProjectTask, TaskTrack } from '@/types';

const TRACKS: TaskTrack[] = ['Backend', 'Frontend', 'AI/ML', 'Design', 'DevOps'];

function TaskRow({ task, onClick }: { task: ProjectTask; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-between gap-4 border-b border-[var(--color-hairline-soft)] px-1 py-3.5 text-left last:border-0 hover:bg-[var(--color-surface-2)]"
    >
      <div className="flex min-w-0 items-center gap-3">
        <span
          className={`h-2 w-2 shrink-0 rounded-full ${
            task.status === 'done' ? 'bg-[var(--color-good)]' : task.status === 'in_progress' ? 'bg-[var(--color-route)]' : 'bg-[var(--color-hairline)]'
          }`}
        />
        <span className="truncate text-sm text-[var(--color-text)]">{task.title}</span>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <PriorityBadge priority={task.priority} />
        <ProviderBadge provider={task.recommendedAI} size="sm" />
        <StatusBadge status={task.status} />
        <ChevronRight size={15} className="text-[var(--color-text-faint)]" />
      </div>
    </button>
  );
}

export default function TaskManagementPage() {
  const { projectId = 'proj_001' } = useParams();
  const navigate = useNavigate();
  const { data: tasks, status, error, retry } = useAsync(() => getTasks(projectId), [projectId]);

  if (status === 'error') {
    return <ErrorState message={error ?? "We couldn't load your tasks. Please try again."} onRetry={retry} />;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-semibold">Tasks</h1>
        <p className="mt-1.5 text-[var(--color-text-muted)]">Every task carries a recommended AI. Open one to generate a prompt.</p>
      </div>

      {status === 'loading' && (
        <div className="space-y-4">
          <CardSkeleton />
          <CardSkeleton />
        </div>
      )}

      {tasks &&
        TRACKS.filter((track) => tasks.some((t) => t.track === track)).map((track) => (
          <div key={track} className="mb-7">
            <div className="mb-2 flex items-center gap-2">
              <p className="font-mono text-xs uppercase tracking-wide text-[var(--color-text-faint)]">{track}</p>
              <Badge>{tasks.filter((t) => t.track === track).length}</Badge>
            </div>
            <Card className="px-4 py-1">
              {tasks
                .filter((t) => t.track === track)
                .map((task) => (
                  <TaskRow key={task.id} task={task} onClick={() => navigate(`/projects/${projectId}/tasks/${task.id}`)} />
                ))}
            </Card>
          </div>
        ))}
    </div>
  );
}
