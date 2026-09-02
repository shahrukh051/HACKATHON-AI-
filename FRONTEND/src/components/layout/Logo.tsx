import { Link } from 'react-router-dom';

export function LogoMark({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="4" r="2.4" fill="var(--color-route)" />
      <circle cx="4" cy="19" r="2" fill="var(--color-gpt)" />
      <circle cx="12" cy="19" r="2" fill="var(--color-claude)" />
      <circle cx="20" cy="19" r="2" fill="var(--color-gemini)" />
      <path d="M12 6.4 C12 11, 4 12, 4 17" stroke="var(--color-hairline)" strokeWidth="1.2" fill="none" />
      <path d="M12 6.4 V17" stroke="var(--color-route)" strokeWidth="1.4" fill="none" />
      <path d="M12 6.4 C12 11, 20 12, 20 17" stroke="var(--color-hairline)" strokeWidth="1.2" fill="none" />
    </svg>
  );
}

export default function Logo({ withLabel = true }: { withLabel?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2">
      <LogoMark />
      {withLabel && (
        <span className="font-display text-[15px] font-semibold tracking-tight text-[var(--color-text)]">
          Hackathon<span className="text-[var(--color-route)]">.AI</span>
        </span>
      )}
    </Link>
  );
}
