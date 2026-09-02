import { useOutletContext, useParams, Link } from 'react-router-dom';
import { ListChecks, Sparkles, Presentation, Gavel, ArrowRight } from 'lucide-react';
import { useAsync } from '@/hooks/useAsync';
import { getTasks } from '@/api/tasks';
import Card from '@/components/ui/Card';
import { StatusBadge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Loader';
import type { Project } from '@/types';

export default function ProjectOverviewPage() {
  const { project } = useOutletContext<{ project: Project | null }>();
  const { projectId = 'proj_001' } = useParams();
  const { data: tasks, status } = useAsync(() => getTasks(projectId), [projectId]);

  const done = tasks?.filter((t) => t.status === 'done').length ?? 0;
  const total = tasks?.length ?? 0;

  const quickLinks = [
    { to: `/projects/${projectId}/tasks`, label: 'Task list', icon: ListChecks, desc: `${done}/${total} tasks done` },
    { to: `/projects/${projectId}/prompts`, label: 'Prompt analyzer', icon: Sparkles, desc: 'Score any prompt' },
    { to: `/projects/${projectId}/pitch`, label: 'Pitch & presentation', icon: Presentation, desc: 'Ready to export' },
    { to: `/projects/${projectId}/judge`, label: 'Judge simulator', icon: Gavel, desc: 'Practice your Q&A' },
  ];

  return (
    <div>
      <div className="mb-8">
        {status === 'loading' && !project ? (
          <Skeleton className="h-8 w-72" />
        ) : (
          <h1 className="font-display text-2xl font-semibold">{project?.name ?? 'Your project'}</h1>
        )}
        <p className="mt-2 max-w-2xl text-[var(--color-text-muted)]">{project?.summary}</p>
      </div>

      <div className="mb-8">
        <p className="mb-3 text-sm font-medium text-[var(--color-text)]">Task progress</p>
        <Card className="flex items-center gap-4 py-4">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-[var(--color-hairline-soft)]">
            <div
              className="h-full rounded-full bg-[var(--color-good)] transition-all duration-700"
              style={{ width: total ? `${(done / total) * 100}%` : '0%' }}
            />
          </div>
          <span className="font-mono text-sm text-[var(--color-text-muted)]">{done}/{total}</span>
        </Card>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {quickLinks.map((q) => (
          <Link key={q.to} to={q.to}>
            <Card className="flex items-center justify-between transition-colors hover:border-[var(--color-text-faint)]">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-route-soft)] text-[var(--color-route)]">
                  <q.icon size={16} />
                </span>
                <div>
                  <p className="font-display text-sm font-medium">{q.label}</p>
                  <p className="text-xs text-[var(--color-text-faint)]">{q.desc}</p>
                </div>
              </div>
              <ArrowRight size={16} className="text-[var(--color-text-faint)]" />
            </Card>
          </Link>
        ))}
      </div>

      {tasks && tasks.length > 0 && (
        <div className="mt-8">
          <p className="mb-3 text-sm font-medium text-[var(--color-text)]">Recently touched tasks</p>
          <div className="space-y-2">
            {tasks.slice(0, 3).map((t) => (
              <Link key={t.id} to={`/projects/${projectId}/tasks/${t.id}`}>
                <Card className="flex items-center justify-between py-3">
                  <span className="text-sm">{t.title}</span>
                  <StatusBadge status={t.status} />
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
