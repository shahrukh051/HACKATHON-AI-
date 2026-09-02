import { Trophy } from 'lucide-react';
import clsx from 'clsx';
import { useAsync } from '@/hooks/useAsync';
import { compareAI } from '@/api/ai';
import { StagedLoader } from '@/components/ui/Loader';
import ErrorState from '@/components/ui/ErrorState';
import Card from '@/components/ui/Card';
import { ProviderBadge } from '@/components/ui/Badge';
import ScoreRing from '@/components/ui/ScoreRing';
import RouteConverge from '@/components/ui/RouteConverge';

export default function AIBattleTab({ taskId }: { taskId: string }) {
  const { data: comparison, status, error, retry } = useAsync(() => compareAI(taskId), [taskId]);

  if (status === 'loading' || status === 'idle') {
    return (
      <StagedLoader
        title="Running the battle"
        stages={['Sending the prompt to all three…', 'Collecting outputs…', 'Evaluator is scoring each one…']}
      />
    );
  }
  if (status === 'error') {
    return <ErrorState message={error ?? "The comparison didn't finish. Please try again."} onRetry={retry} />;
  }
  if (!comparison) return null;

  const winnerIndex = comparison.results.findIndex((r) => r.provider === comparison.winner);

  return (
    <div>
      <p className="mb-4 text-center font-mono text-xs uppercase tracking-wide text-[var(--color-text-faint)]">AI Battle</p>

      <div className="grid gap-4 sm:grid-cols-3">
        {comparison.results.map((r) => (
          <Card
            key={r.provider}
            highlight={r.provider === comparison.winner}
            className="flex flex-col items-center text-center"
          >
            <ProviderBadge provider={r.provider} />
            <div className="mt-4">
              <ScoreRing value={r.score} size={72} strokeWidth={5} />
            </div>
            <p className="mt-4 text-left text-xs leading-relaxed text-[var(--color-text-muted)]">{r.output}</p>
          </Card>
        ))}
      </div>

      <div className="mx-auto max-w-md">
        <RouteConverge
          width={400}
          height={70}
          points={[0.17, 0.5, 0.83]}
          target={0.5}
          direction="down"
          highlightIndex={winnerIndex}
        />
      </div>

      <Card
        className={clsx(
          'mx-auto flex max-w-md flex-col items-center gap-2 border-[var(--color-signal)]/30 bg-[var(--color-signal-soft)] text-center',
        )}
      >
        <span className="flex items-center gap-2 text-[var(--color-signal)]">
          <Trophy size={16} />
          <span className="font-display text-sm font-semibold">AI Evaluator</span>
        </span>
        <p className="font-display text-lg font-semibold">
          Winner: <ProviderBadge provider={comparison.winner} />
        </p>
        <p className="text-sm text-[var(--color-text-muted)]">{comparison.evaluatorNotes}</p>
      </Card>
    </div>
  );
}
