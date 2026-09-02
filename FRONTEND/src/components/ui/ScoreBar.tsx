interface ScoreBarProps {
  label: string;
  value: number; // 0-100
  color?: string;
}

export default function ScoreBar({ label, value, color = 'var(--color-route)' }: ScoreBarProps) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="text-sm text-[var(--color-text-muted)]">{label}</span>
        <span className="font-mono text-sm font-medium text-[var(--color-text)]">{value}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--color-hairline-soft)]">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${Math.min(100, Math.max(0, value))}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}
