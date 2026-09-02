import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

export function Spinner({ size = 16 }: { size?: number }) {
  return <Loader2 size={size} className="animate-spin text-[var(--color-route)]" />;
}

/**
 * Staged loading indicator for longer AI operations, per Rule 3:
 * "Analyzing your hackathon... Finding opportunities... Generating ideas..."
 */
export function StagedLoader({ stages, title }: { stages: string[]; title?: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index >= stages.length - 1) return;
    const t = setTimeout(() => setIndex((i) => i + 1), 900);
    return () => clearTimeout(t);
  }, [index, stages.length]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
      <div className="relative flex h-14 w-14 items-center justify-center">
        <span className="absolute h-full w-full animate-ping rounded-full bg-[var(--color-route)]/20" />
        <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-route-soft)]">
          <Spinner size={20} />
        </span>
      </div>
      {title && <p className="font-display text-lg text-[var(--color-text)]">{title}</p>}
      <p className="font-mono text-sm text-[var(--color-text-muted)]">{stages[index]}</p>
    </div>
  );
}

export function Skeleton({ className = 'h-4 w-full' }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-[var(--color-hairline-soft)] ${className}`} />;
}

export function CardSkeleton() {
  return (
    <div className="rounded-xl border border-[var(--color-hairline)] bg-[var(--color-surface)] p-5">
      <Skeleton className="mb-3 h-5 w-2/3" />
      <Skeleton className="mb-2 h-3 w-full" />
      <Skeleton className="mb-4 h-3 w-4/5" />
      <div className="flex gap-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
    </div>
  );
}
