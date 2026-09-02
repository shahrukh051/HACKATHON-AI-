import { useParams } from 'react-router-dom';
import { Boxes } from 'lucide-react';
import { useAsync } from '@/hooks/useAsync';
import { getPitch } from '@/api/projects';
import { StagedLoader } from '@/components/ui/Loader';
import ErrorState from '@/components/ui/ErrorState';
import Card from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

const LAYERS = [
  { name: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS'] },
  { name: 'Backend', items: ['FastAPI', 'SQLite (local)', 'PostgreSQL (sync target)'] },
  { name: 'AI / ML', items: ['On-device classifier', 'Offline-first scoring'] },
];

export default function ArchitecturePage() {
  const { projectId = 'proj_001' } = useParams();
  const { data: pitch, status, error, retry } = useAsync(() => getPitch(projectId), [projectId]);

  if (status === 'loading' || status === 'idle') {
    return <StagedLoader title="Mapping the architecture" stages={['Reading the tech stack…', 'Tracing data flow…']} />;
  }
  if (status === 'error') {
    return <ErrorState message={error ?? "We couldn't load the architecture."} onRetry={retry} />;
  }

  return (
    <div>
      <div className="mb-8 flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-route-soft)] text-[var(--color-route)]">
          <Boxes size={16} />
        </span>
        <div>
          <h1 className="font-display text-2xl font-semibold">Architecture</h1>
          <p className="text-sm text-[var(--color-text-muted)]">How the pieces fit together.</p>
        </div>
      </div>

      <Card className="mb-6">
        <p className="text-sm leading-relaxed text-[var(--color-text)]">{pitch?.architectureExplanation}</p>
      </Card>

      <div className="grid gap-4 sm:grid-cols-3">
        {LAYERS.map((layer, i) => (
          <Card key={layer.name} raised>
            <p className="font-mono text-xs text-[var(--color-text-faint)]">{String(i + 1).padStart(2, '0')}</p>
            <p className="mt-1 font-display text-sm font-medium">{layer.name}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {layer.items.map((item) => (
                <Badge key={item}>{item}</Badge>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
