import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useAsync } from '@/hooks/useAsync';
import { getIdeas, selectIdea } from '@/api/hackathons';
import { StagedLoader } from '@/components/ui/Loader';
import ErrorState from '@/components/ui/ErrorState';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import type { ProjectIdea } from '@/types';

const STAGES = ['Generating ideas…', 'Scoring feasibility…', 'Ranking by demo potential…'];

function IdeaScoreRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-[var(--color-text-muted)]">{label}</span>
      <span className="font-mono text-[var(--color-text)]">{value.toFixed(1)}/10</span>
    </div>
  );
}

export default function ProjectIdeasPage() {
  const { hackathonId = 'hack_001' } = useParams();
  const navigate = useNavigate();
  const { data: ideas, status, error, retry } = useAsync(() => getIdeas(hackathonId), [hackathonId]);
  const [selecting, setSelecting] = useState<string | null>(null);

  const handleSelect = async (idea: ProjectIdea) => {
    setSelecting(idea.id);
    const { projectId } = await selectIdea(hackathonId, idea.id);
    navigate(`/projects/${projectId}/overview`);
  };

  if (status === 'loading' || status === 'idle') {
    return <StagedLoader title="Generating project ideas…" stages={STAGES} />;
  }
  if (status === 'error') {
    return <ErrorState message={error ?? "We couldn't generate ideas. Please try again."} onRetry={retry} />;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-semibold">Pick a project</h1>
        <p className="mt-1.5 text-[var(--color-text-muted)]">Three ideas, scored against your problem statement and constraints.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        {ideas?.map((idea) => (
          <Card key={idea.id} highlight={idea.recommended} className="flex flex-col">
            {idea.recommended && (
              <Badge tone="signal" className="mb-3 w-fit">
                <Sparkles size={11} /> Recommended
              </Badge>
            )}
            <p className="font-display text-base font-medium">{idea.title}</p>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--color-text-muted)]">{idea.summary}</p>

            <div className="mt-4 space-y-2 border-t border-[var(--color-hairline-soft)] pt-4">
              <IdeaScoreRow label="Innovation" value={idea.scores.innovation} />
              <IdeaScoreRow label="Feasibility" value={idea.scores.feasibility} />
              <IdeaScoreRow label="Impact" value={idea.scores.impact} />
              <IdeaScoreRow label="Demo potential" value={idea.scores.demoPotential} />
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {idea.techStack.map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>

            <Button
              className="mt-5 w-full"
              variant={idea.recommended ? 'primary' : 'outline'}
              onClick={() => handleSelect(idea)}
              disabled={selecting !== null}
              iconRight={<ArrowRight size={16} />}
            >
              {selecting === idea.id ? 'Opening workspace…' : 'Select this idea'}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
