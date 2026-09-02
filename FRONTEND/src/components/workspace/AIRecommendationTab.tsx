import { Star, ArrowRight } from 'lucide-react';
import { useAsync } from '@/hooks/useAsync';
import { recommendAI } from '@/api/ai';
import { StagedLoader } from '@/components/ui/Loader';
import ErrorState from '@/components/ui/ErrorState';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { ProviderBadge } from '@/components/ui/Badge';

export default function AIRecommendationTab({ taskId }: { taskId: string }) {
  const { data: rec, status, error, retry } = useAsync(() => recommendAI(taskId), [taskId]);

  if (status === 'loading' || status === 'idle') {
    return <StagedLoader title="Matching this task to a model" stages={['Weighing context length…', 'Checking reasoning depth needed…', 'Comparing recent benchmarks…']} />;
  }
  if (status === 'error') {
    return <ErrorState message={error ?? "We couldn't get a recommendation for this task."} onRetry={retry} />;
  }
  if (!rec) return null;

  const stars = Math.round(rec.confidence / 20);

  return (
    <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
      <Card highlight className="flex flex-col">
        <p className="font-mono text-xs uppercase tracking-wide text-[var(--color-text-faint)]">Recommended AI</p>
        <div className="mt-3 flex items-center gap-3">
          <ProviderBadge provider={rec.recommended} />
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < stars ? 'fill-[var(--color-signal)] text-[var(--color-signal)]' : 'text-[var(--color-hairline)]'}
              />
            ))}
          </div>
        </div>
        <p className="mt-4 text-sm font-medium text-[var(--color-text)]">Why?</p>
        <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-text-muted)]">{rec.reasoning}</p>
        <Button className="mt-6 w-fit" iconRight={<ArrowRight size={16} />}>
          Use recommended AI
        </Button>
      </Card>

      <Card>
        <p className="mb-3 font-mono text-xs uppercase tracking-wide text-[var(--color-text-faint)]">Alternatives</p>
        <div className="space-y-3">
          {rec.alternatives.map((alt) => (
            <div key={alt.provider} className="flex items-center justify-between">
              <ProviderBadge provider={alt.provider} size="sm" />
              <span className="font-mono text-sm text-[var(--color-text-muted)]">{alt.matchScore}%</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
