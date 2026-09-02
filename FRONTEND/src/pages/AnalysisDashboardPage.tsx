import { useParams, useNavigate } from 'react-router-dom';
import { ArrowRight, Users, ShieldAlert, Lightbulb, TriangleAlert, BrainCircuit } from 'lucide-react';
import { useAsync } from '@/hooks/useAsync';
import { analyzeHackathon } from '@/api/hackathons';
import { StagedLoader } from '@/components/ui/Loader';
import ErrorState from '@/components/ui/ErrorState';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import ScoreRing from '@/components/ui/ScoreRing';

const STAGES = ['Reading your problem statement…', 'Finding opportunities…', 'Scoring feasibility and impact…', 'Wrapping up the analysis…'];

export default function AnalysisDashboardPage() {
  const { hackathonId = 'hack_001' } = useParams();
  const navigate = useNavigate();
  const { data: analysis, status, error, retry } = useAsync(() => analyzeHackathon(hackathonId), [hackathonId]);

  if (status === 'loading' || status === 'idle') {
    return <StagedLoader title="Analyzing your hackathon…" stages={STAGES} />;
  }

  if (status === 'error') {
    return <ErrorState message={error ?? "We couldn't analyze the hackathon. Please check your connection and try again."} onRetry={retry} />;
  }

  if (!analysis) return null;

  return (
    <div>
      <div className="mb-8 flex items-center gap-2 text-sm text-[var(--color-route)]">
        <BrainCircuit size={16} />
        <span className="font-mono uppercase tracking-wide">Analysis complete</span>
      </div>
      <h1 className="font-display text-2xl font-semibold">Here's what we found</h1>
      <p className="mt-1.5 text-[var(--color-text-muted)]">{analysis.problemUnderstanding}</p>

      {/* Hackathon score */}
      <Card className="mt-8 flex flex-wrap items-center justify-around gap-6 py-8">
        {analysis.scores.map((s) => (
          <ScoreRing key={s.label} value={s.value} label={s.label} size={104} />
        ))}
      </Card>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Card>
          <div className="mb-3 flex items-center gap-2 text-[var(--color-route)]">
            <Users size={16} />
            <p className="font-display text-sm font-medium">Target users</p>
          </div>
          <ul className="space-y-1.5 text-sm text-[var(--color-text-muted)]">
            {analysis.targetUsers.map((u) => (
              <li key={u}>· {u}</li>
            ))}
          </ul>
        </Card>
        <Card>
          <div className="mb-3 flex items-center gap-2 text-[var(--color-text-muted)]">
            <ShieldAlert size={16} />
            <p className="font-display text-sm font-medium">Constraints</p>
          </div>
          <ul className="space-y-1.5 text-sm text-[var(--color-text-muted)]">
            {analysis.constraints.map((c) => (
              <li key={c}>· {c}</li>
            ))}
          </ul>
        </Card>
        <Card>
          <div className="mb-3 flex items-center gap-2 text-[var(--color-good)]">
            <Lightbulb size={16} />
            <p className="font-display text-sm font-medium">Opportunities</p>
          </div>
          <ul className="space-y-1.5 text-sm text-[var(--color-text-muted)]">
            {analysis.opportunities.map((o) => (
              <li key={o}>· {o}</li>
            ))}
          </ul>
        </Card>
        <Card>
          <div className="mb-3 flex items-center gap-2 text-[var(--color-bad)]">
            <TriangleAlert size={16} />
            <p className="font-display text-sm font-medium">Risks</p>
          </div>
          <ul className="space-y-1.5 text-sm text-[var(--color-text-muted)]">
            {analysis.risks.map((r) => (
              <li key={r}>· {r}</li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="mt-8 flex justify-end">
        <Button onClick={() => navigate(`/hackathons/${hackathonId}/ideas`)} iconRight={<ArrowRight size={16} />}>
          See project ideas
        </Button>
      </div>
    </div>
  );
}
