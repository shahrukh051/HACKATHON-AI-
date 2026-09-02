import { useParams } from 'react-router-dom';
import { useAsync } from '@/hooks/useAsync';
import { getTasks } from '@/api/tasks';
import { CardSkeleton } from '@/components/ui/Loader';
import ErrorState from '@/components/ui/ErrorState';
import Card from '@/components/ui/Card';
import { ProviderBadge, StatusBadge } from '@/components/ui/Badge';
import type { AIProvider } from '@/types';

const PROVIDERS: AIProvider[] = ['GPT', 'Claude', 'Gemini'];

export default function AITeamPage() {
  const { projectId = 'proj_001' } = useParams();
  const { data: tasks, status, error, retry } = useAsync(() => getTasks(projectId), [projectId]);

  if (status === 'error') {
    return <ErrorState message={error ?? "We couldn't load your AI team."} onRetry={retry} />;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-semibold">Your AI team</h1>
        <p className="mt-1.5 text-[var(--color-text-muted)]">Each task is already routed to a model. Here's the full roster.</p>
      </div>

      {status === 'loading' && (
        <div className="grid gap-4 sm:grid-cols-3">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      )}

      {tasks && (
        <div className="grid gap-4 sm:grid-cols-3">
          {PROVIDERS.map((provider) => {
            const assigned = tasks.filter((t) => t.recommendedAI === provider);
            return (
              <Card key={provider}>
                <div className="mb-4 flex items-center justify-between">
                  <ProviderBadge provider={provider} />
                  <span className="font-mono text-xs text-[var(--color-text-faint)]">{assigned.length} tasks</span>
                </div>
                <div className="space-y-2">
                  {assigned.length === 0 && (
                    <p className="text-sm text-[var(--color-text-faint)]">No tasks routed here yet.</p>
                  )}
                  {assigned.map((t) => (
                    <div key={t.id} className="flex items-center justify-between gap-2">
                      <span className="truncate text-sm text-[var(--color-text-muted)]">{t.title}</span>
                      <StatusBadge status={t.status} />
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
