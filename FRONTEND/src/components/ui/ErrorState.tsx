import { AlertTriangle } from 'lucide-react';
import Button from './Button';

export default function ErrorState({
  title = "That didn't go through",
  message,
  onRetry,
}: {
  title?: string;
  message: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-[var(--color-bad)]/25 bg-[var(--color-bad)]/5 px-6 py-12 text-center">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-bad)]/10">
        <AlertTriangle size={20} className="text-[var(--color-bad)]" />
      </span>
      <div>
        <p className="font-display text-base font-medium text-[var(--color-text)]">{title}</p>
        <p className="mt-1 max-w-sm text-sm text-[var(--color-text-muted)]">{message}</p>
      </div>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}
