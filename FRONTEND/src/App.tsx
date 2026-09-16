// hii
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import MarketingLayout from '@/layouts/MarketingLayout';
import OnboardingLayout from '@/layouts/OnboardingLayout';
import WorkspaceLayout from '@/layouts/WorkspaceLayout';

import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import HackathonSetupPage from '@/pages/HackathonSetupPage';
import AnalysisDashboardPage from '@/pages/AnalysisDashboardPage';
import ProjectIdeasPage from '@/pages/ProjectIdeasPage';

import ProjectOverviewPage from '@/pages/workspace/ProjectOverviewPage';
import TaskManagementPage from '@/pages/workspace/TaskManagementPage';
import TaskDetailPage from '@/pages/workspace/TaskDetailPage';
import PromptAnalyzerPage from '@/pages/workspace/PromptAnalyzerPage';
import AITeamPage from '@/pages/workspace/AITeamPage';
import ResearchPage from '@/pages/workspace/ResearchPage';
import ArchitecturePage from '@/pages/workspace/ArchitecturePage';
import PitchPage from '@/pages/workspace/PitchPage';
import JudgeSimulatorPage from '@/pages/workspace/JudgeSimulatorPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Marketing */}
        <Route element={<MarketingLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<LoginPage />} />
        </Route>

        {/* Linear onboarding: setup -> analysis -> ideas */}
        <Route element={<OnboardingLayout />}>
          <Route path="/setup" element={<HackathonSetupPage />} />
          <Route path="/hackathons/:hackathonId/analysis" element={<AnalysisDashboardPage />} />
          <Route path="/hackathons/:hackathonId/ideas" element={<ProjectIdeasPage />} />
        </Route>

        {/* Project workspace */}
        <Route path="/projects/:projectId" element={<WorkspaceLayout />}>
          <Route index element={<Navigate to="overview" replace />} />
          <Route path="overview" element={<ProjectOverviewPage />} />
          <Route path="tasks" element={<TaskManagementPage />} />
          <Route path="tasks/:taskId" element={<TaskDetailPage />} />
          <Route path="prompts" element={<PromptAnalyzerPage />} />
          <Route path="ai-team" element={<AITeamPage />} />
          <Route path="research" element={<ResearchPage />} />
          <Route path="architecture" element={<ArchitecturePage />} />
          <Route path="pitch" element={<PitchPage />} />
          <Route path="judge" element={<JudgeSimulatorPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
