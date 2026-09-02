import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Copy, Check, Presentation } from 'lucide-react';
import { useAsync } from '@/hooks/useAsync';
import { getPitch } from '@/api/projects';
import { StagedLoader } from '@/components/ui/Loader';
import ErrorState from '@/components/ui/ErrorState';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

function Section({
  title,
  content,
  mono = false,
}: {
  title: string;
  content: string | string[];
  mono?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const text = Array.isArray(content) ? content.join('\n') : content;

  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Card>
      <div className="mb-2 flex items-center justify-between">
        <p className="font-display text-sm font-medium">{title}</p>
        <button onClick={copy} className="text-[var(--color-text-faint)] hover:text-[var(--color-text-muted)]">
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
      </div>
      {Array.isArray(content) ? (
        <ul className={`space-y-1.5 text-sm text-[var(--color-text-muted)] ${mono ? 'font-mono' : ''}`}>
          {content.map((c) => (
            <li key={c}>· {c}</li>
          ))}
        </ul>
      ) : (
        <p className={`text-sm leading-relaxed text-[var(--color-text-muted)] ${mono ? 'font-mono text-[13px]' : ''}`}>
          {content}
        </p>
      )}
    </Card>
  );
}

export default function PitchPage() {
  const { projectId = 'proj_001' } = useParams();
  const { data: pitch, status, error, retry } = useAsync(() => getPitch(projectId), [projectId]);

  if (status === 'loading' || status === 'idle') {
    return <StagedLoader title="Writing your pitch" stages={['Distilling the problem…', 'Framing the solution…', 'Drafting the demo script…']} />;
  }
  if (status === 'error') {
    return <ErrorState message={error ?? "We couldn't generate the pitch."} onRetry={retry} />;
  }
  if (!pitch) return null;

  return (
    <div>
      <div className="mb-8 flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-signal-soft)] text-[var(--color-signal)]">
          <Presentation size={16} />
        </span>
        <div>
          <h1 className="font-display text-2xl font-semibold">Pitch &amp; presentation</h1>
          <p className="text-sm text-[var(--color-text-muted)]">Everything you need to say, ready to copy.</p>
        </div>
      </div>

      <Card highlight className="mb-6">
        <p className="mb-1 font-mono text-xs uppercase tracking-wide text-[var(--color-signal)]">Elevator pitch</p>
        <p className="font-display text-lg leading-snug text-[var(--color-text)]">{pitch.elevatorPitch}</p>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <Section title="Problem statement" content={pitch.problemStatement} />
        <Section title="Solution" content={pitch.solution} />
        <Section title="Key features" content={pitch.keyFeatures} />
        <Section title="Business impact" content={pitch.businessImpact} />
        <Section title="Architecture" content={pitch.architectureExplanation} />
        <Section title="Presentation structure" content={pitch.presentationStructure} />
      </div>

      <div className="mt-4">
        <Section title="Demo script" content={pitch.demoScript} mono />
      </div>
    </div>
  );
}
