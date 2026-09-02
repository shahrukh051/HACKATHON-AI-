import { Outlet, useLocation, Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import clsx from 'clsx';
import Logo from '@/components/layout/Logo';

const STEPS = [
  { label: 'Setup', match: '/setup' },
  { label: 'Analysis', match: '/analysis' },
  { label: 'Ideas', match: '/ideas' },
];

export default function OnboardingLayout() {
  const { pathname } = useLocation();
  const activeIndex = STEPS.findIndex((s) => pathname.includes(s.match));

  return (
    <div className="min-h-screen bg-[var(--color-base)]">
      <header className="border-b border-[var(--color-hairline)]">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Logo />
          <ol className="flex items-center gap-2">
            {STEPS.map((step, i) => {
              const state = i < activeIndex ? 'done' : i === activeIndex ? 'active' : 'upcoming';
              return (
                <li key={step.label} className="flex items-center gap-2">
                  <span
                    className={clsx(
                      'flex h-6 w-6 items-center justify-center rounded-full font-mono text-[11px]',
                      state === 'done' && 'bg-[var(--color-good)]/15 text-[var(--color-good)]',
                      state === 'active' && 'bg-[var(--color-route)] text-white',
                      state === 'upcoming' && 'bg-[var(--color-surface-2)] text-[var(--color-text-faint)]',
                    )}
                  >
                    {state === 'done' ? <Check size={13} /> : i + 1}
                  </span>
                  <span
                    className={clsx(
                      'hidden text-sm sm:inline',
                      state === 'active' ? 'text-[var(--color-text)]' : 'text-[var(--color-text-faint)]',
                    )}
                  >
                    {step.label}
                  </span>
                  {i < STEPS.length - 1 && <span className="mx-1 h-px w-6 bg-[var(--color-hairline)]" />}
                </li>
              );
            })}
          </ol>
          <Link to="/" className="text-sm text-[var(--color-text-faint)] hover:text-[var(--color-text-muted)]">
            Exit
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
}
