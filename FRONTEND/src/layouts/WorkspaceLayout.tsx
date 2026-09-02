import { Outlet, useParams } from 'react-router-dom';
import WorkspaceSidebar from '@/components/layout/WorkspaceSidebar';
import { useAsync } from '@/hooks/useAsync';
import { getProject } from '@/api/projects';
import { Skeleton } from '@/components/ui/Loader';

export default function WorkspaceLayout() {
  const { projectId = 'proj_001' } = useParams();
  const { data: project, status } = useAsync(() => getProject(projectId), [projectId]);

  return (
    <div className="flex min-h-screen bg-[var(--color-base)]">
      <WorkspaceSidebar
        projectId={projectId}
        projectName={status === 'success' && project ? project.name : ''}
      />
      <main className="min-w-0 flex-1 overflow-y-auto">
        <div className="mx-auto max-w-5xl px-8 py-10">
          {status === 'loading' && <Skeleton className="mb-6 h-8 w-64" />}
          <Outlet context={{ project }} />
        </div>
      </main>
    </div>
  );
}
