import clsx from 'clsx';
import type { AIProvider, TaskPriority, TaskStatus } from '@/types';

export function Badge({
  children,
  tone = 'neutral',
  className,
}: {
  children: React.ReactNode;
  tone?: 'neutral' | 'route' | 'signal' | 'good' | 'bad';
  className?: string;
}) {
  const tones: Record<string, string> = {
    neutral: 'bg-[var(--color-surface-2)] text-[var(--color-text-muted)] border-[var(--color-hairline)]',
    route: 'bg-[var(--color-route-soft)] text-[var(--color-route)] border-[var(--color-route)]/30',
    signal: 'bg-[var(--color-signal-soft)] text-[var(--color-signal)] border-[var(--color-signal)]/30',
    good: 'bg-[var(--color-good)]/10 text-[var(--color-good)] border-[var(--color-good)]/30',
    bad: 'bg-[var(--color-bad)]/10 text-[var(--color-bad)] border-[var(--color-bad)]/30',
  };
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium font-mono',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

const providerColors: Record<AIProvider, string> = {
  GPT: 'var(--color-gpt)',
  Claude: 'var(--color-claude)',
  Gemini: 'var(--color-gemini)',
};

export function ProviderBadge({ provider, size = 'md' }: { provider: AIProvider; size?: 'sm' | 'md' }) {
  const color = providerColors[provider];
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 rounded-full border font-mono font-medium',
        size === 'sm' ? 'text-[11px] px-2 py-0.5' : 'text-xs px-2.5 py-1',
      )}
      style={{ color, borderColor: `${color}55`, backgroundColor: `${color}14` }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
      {provider}
    </span>
  );
}

const priorityTone: Record<TaskPriority, 'bad' | 'signal' | 'neutral'> = {
  high: 'bad',
  medium: 'signal',
  low: 'neutral',
};

export function PriorityBadge({ priority }: { priority: TaskPriority }) {
  return <Badge tone={priorityTone[priority]}>{priority}</Badge>;
}

const statusLabel: Record<TaskStatus, string> = {
  todo: 'To do',
  in_progress: 'In progress',
  done: 'Done',
};
const statusTone: Record<TaskStatus, 'neutral' | 'route' | 'good'> = {
  todo: 'neutral',
  in_progress: 'route',
  done: 'good',
};

export function StatusBadge({ status }: { status: TaskStatus }) {
  return <Badge tone={statusTone[status]}>{statusLabel[status]}</Badge>;
}
