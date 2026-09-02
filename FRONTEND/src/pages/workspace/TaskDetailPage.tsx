import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import clsx from 'clsx';
import { useAsync } from '@/hooks/useAsync';
import { getTask } from '@/api/tasks';
import { Skeleton } from '@/components/ui/Loader';
import ErrorState from '@/components/ui/ErrorState';
import { PriorityBadge, StatusBadge, ProviderBadge } from '@/components/ui/Badge';
import PromptGeneratorTab from '@/components/workspace/PromptGeneratorTab';
import AIRecommendationTab from '@/components/workspace/AIRecommendationTab';
import AIBattleTab from '@/components/workspace/AIBattleTab';

const TABS = ['Prompt', 'Recommended AI', 'AI Battle'] as const;
type Tab = (typeof TABS)[number];

export default function TaskDetailPage() {
  const { projectId = 'proj_001', taskId = '' } = useParams();
  const [tab, setTab] = useState<Tab>('Prompt');
  const { data: task, status, error, retry } = useAsync(() => getTask(taskId), [taskId]);

  if (status === 'error') {
    return <ErrorState message={error ?? "We couldn't load this task."} onRetry={retry} />;
  }

  return (
    <div>
      <Link
        to={`/projects/${projectId}/tasks`}
        className="mb-5 inline-flex items-center gap-1.5 text-sm text-[var(--color-text-faint)] hover:text-[var(--color-text-muted)]"
      >
        <ArrowLeft size={14} /> All tasks
      </Link>

      {status === 'loading' || !task ? (
        <Skeleton className="mb-8 h-9 w-96" />
      ) : (
        <div className="mb-8">
          <p className="font-mono text-xs uppercase tracking-wide text-[var(--color-text-faint)]">{task.track}</p>
          <h1 className="mt-1 font-display text-2xl font-semibold">{task.title}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <StatusBadge status={task.status} />
            <PriorityBadge priority={task.priority} />
            <span className="text-xs text-[var(--color-text-faint)]">·</span>
            <span className="text-xs capitalize text-[var(--color-text-faint)]">{task.complexity} complexity</span>
            <span className="text-xs text-[var(--color-text-faint)]">·</span>
            <span className="flex items-center gap-1.5 text-xs text-[var(--color-text-faint)]">
              Suggested: <ProviderBadge provider={task.recommendedAI} size="sm" />
            </span>
          </div>
        </div>
      )}

      <div className="mb-6 flex gap-1 border-b border-[var(--color-hairline)]">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={clsx(
              'relative px-4 py-2.5 text-sm transition-colors',
              tab === t ? 'text-[var(--color-text)]' : 'text-[var(--color-text-faint)] hover:text-[var(--color-text-muted)]',
            )}
          >
            {t}
            {tab === t && <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-[var(--color-route)]" />}
          </button>
        ))}
      </div>

      {taskId && (
        <>
          {tab === 'Prompt' && <PromptGeneratorTab taskId={taskId} />}
          {tab === 'Recommended AI' && <AIRecommendationTab taskId={taskId} />}
          {tab === 'AI Battle' && <AIBattleTab taskId={taskId} />}
        </>
      )}
    </div>
  );
}
