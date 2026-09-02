import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import {
  LayoutDashboard,
  ListChecks,
  Sparkles,
  Users,
  Search,
  Boxes,
  Presentation,
  Gavel,
} from 'lucide-react';
import Logo from './Logo';

interface NavItem {
  to: string;
  label: string;
  icon: React.ElementType;
}

function useNavItems(projectId: string): NavItem[] {
  const base = `/projects/${projectId}`;
  return [
    { to: `${base}/overview`, label: 'Overview', icon: LayoutDashboard },
    { to: `${base}/tasks`, label: 'Tasks', icon: ListChecks },
    { to: `${base}/prompts`, label: 'Prompts', icon: Sparkles },
    { to: `${base}/ai-team`, label: 'AI Team', icon: Users },
    { to: `${base}/research`, label: 'Research', icon: Search },
    { to: `${base}/architecture`, label: 'Architecture', icon: Boxes },
    { to: `${base}/pitch`, label: 'Pitch', icon: Presentation },
    { to: `${base}/judge`, label: 'Judge', icon: Gavel },
  ];
}

export default function WorkspaceSidebar({ projectId, projectName }: { projectId: string; projectName: string }) {
  const items = useNavItems(projectId);

  return (
    <aside className="flex h-screen w-60 shrink-0 flex-col border-r border-[var(--color-hairline)] bg-[var(--color-surface)]">
      <div className="border-b border-[var(--color-hairline)] px-5 py-4">
        <Logo />
      </div>
      <div className="border-b border-[var(--color-hairline-soft)] px-5 py-3">
        <p className="text-[10px] uppercase tracking-wide text-[var(--color-text-faint)]">Project</p>
        <p className="mt-0.5 truncate font-display text-sm font-medium text-[var(--color-text)]">{projectName}</p>
      </div>
      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                isActive
                  ? 'bg-[var(--color-route-soft)] text-[var(--color-route)]'
                  : 'text-[var(--color-text-muted)] hover:bg-[var(--color-surface-2)] hover:text-[var(--color-text)]',
              )
            }
          >
            <item.icon size={16} />
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-[var(--color-hairline)] px-5 py-4 text-xs text-[var(--color-text-faint)]">
        Backend is the brain.
        <br />
        This is your control center.
      </div>
    </aside>
  );
}
