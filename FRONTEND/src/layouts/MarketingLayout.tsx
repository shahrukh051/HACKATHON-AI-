import { Outlet, Link } from 'react-router-dom';
import Logo from '@/components/layout/Logo';
import Button from '@/components/ui/Button';

export default function MarketingLayout() {
  return (
    <div className="min-h-screen bg-[var(--color-base)]">
      <header className="sticky top-0 z-40 border-b border-[var(--color-hairline)] bg-[var(--color-base)]/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Logo />
          <nav className="hidden items-center gap-8 text-sm text-[var(--color-text-muted)] md:flex">
            <a href="#how-it-works" className="hover:text-[var(--color-text)]">How it works</a>
            <a href="#features" className="hover:text-[var(--color-text)]">Features</a>
            <a href="#workflow" className="hover:text-[var(--color-text)]">Workflow</a>
          </nav>
          <Link to="/setup">
            <Button size="sm">Start hackathon</Button>
          </Link>
        </div>
      </header>
      <Outlet />
      <footer className="border-t border-[var(--color-hairline)] px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-[var(--color-text-faint)] sm:flex-row">
          <div className="flex items-center gap-2">
            <Logo withLabel={false} />
            <span>Hackathon AI Copilot — route your problem to the right model, every time.</span>
          </div>
          <span>Built for teams who'd rather ship than choose an API.</span>
        </div>
      </footer>
    </div>
  );
}
