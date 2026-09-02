import { Search, ExternalLink } from 'lucide-react';
import { useAsync } from '@/hooks/useAsync';
import { getHackathon } from '@/api/hackathons';
import { HACKATHON_ID } from '@/lib/mockData';
import { StagedLoader } from '@/components/ui/Loader';
import ErrorState from '@/components/ui/ErrorState';
import Card from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

const REFERENCE_NOTES = [
  {
    title: 'Existing triage workflows',
    note: 'Most rural clinics still triage on paper, sorted only by arrival time, not urgency.',
  },
  {
    title: 'Offline-first prior art',
    note: 'Similar constraint pattern to offline-first POS systems: queue locally, reconcile on reconnect.',
  },
  {
    title: 'Comparable products',
    note: 'No direct competitor found that targets rural, low-connectivity clinics specifically for triage.',
  },
];

export default function ResearchPage() {
  const { data: hackathon, status, error, retry } = useAsync(() => getHackathon(HACKATHON_ID), []);

  if (status === 'loading' || status === 'idle') {
    return <StagedLoader title="Gathering context" stages={['Reading the problem statement…', 'Pulling in related prior art…']} />;
  }
  if (status === 'error') {
    return <ErrorState message={error ?? "We couldn't load research notes."} onRetry={retry} />;
  }

  return (
    <div>
      <div className="mb-8 flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-route-soft)] text-[var(--color-route)]">
          <Search size={16} />
        </span>
        <div>
          <h1 className="font-display text-2xl font-semibold">Research</h1>
          <p className="text-sm text-[var(--color-text-muted)]">Context gathered around your problem space.</p>
        </div>
      </div>

      <Card className="mb-6">
        <p className="mb-2 font-mono text-xs uppercase tracking-wide text-[var(--color-text-faint)]">Problem statement</p>
        <p className="text-sm leading-relaxed text-[var(--color-text)]">{hackathon?.problemStatement}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {hackathon?.preferredTechnologies.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
      </Card>

      <div className="space-y-3">
        {REFERENCE_NOTES.map((r) => (
          <Card key={r.title} raised className="flex items-start justify-between gap-4">
            <div>
              <p className="font-display text-sm font-medium">{r.title}</p>
              <p className="mt-1 text-sm text-[var(--color-text-muted)]">{r.note}</p>
            </div>
            <ExternalLink size={14} className="mt-1 shrink-0 text-[var(--color-text-faint)]" />
          </Card>
        ))}
      </div>
    </div>
  );
}
