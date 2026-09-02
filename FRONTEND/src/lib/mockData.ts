import type {
  Hackathon,
  Analysis,
  ProjectIdea,
  Project,
  ProjectTask,
  GeneratedPrompt,
  AIRecommendation,
  AIComparison,
  JudgeQuestion,
  JudgeFeedback,
  Pitch,
  PromptAnalysis,
} from '@/types';

export const HACKATHON_ID = 'hack_001';
export const PROJECT_ID = 'proj_001';

export const mockHackathon: Hackathon = {
  id: HACKATHON_ID,
  name: 'MedHack 2026',
  problemStatement:
    'Rural clinics in low-connectivity regions struggle to triage patients quickly, leading to delayed care for urgent cases and wasted specialist time on non-urgent ones.',
  theme: 'AI for Healthcare Access',
  rules: 'Team of up to 4. All code written during the 36-hour window. Open-source libraries allowed.',
  judgingCriteria: 'Innovation, feasibility, impact, demo quality',
  teamMembers: ['Shahrukh', 'Anaya', 'Rohit', 'Priya'],
  teamSkills: ['React', 'Node.js', 'FastAPI', 'Embedded/IoT', 'ML'],
  preferredTechnologies: ['React', 'FastAPI', 'PostgreSQL', 'ESP32'],
  timeAvailable: '36 hours',
  budget: '₹5,000 (hardware only)',
  createdAt: new Date().toISOString(),
};

export const mockAnalysis: Analysis = {
  hackathonId: HACKATHON_ID,
  problemUnderstanding:
    'The core failure point is triage, not diagnosis. Clinics need a fast, low-connectivity way to sort patients by urgency before a doctor is involved.',
  targetUsers: ['Rural clinic front-desk staff', 'Visiting nurses', 'Regional health coordinators'],
  constraints: ['Intermittent internet access', 'Low-cost hardware only', '36-hour build window'],
  opportunities: [
    'Offline-first triage scoring using a lightweight on-device model',
    'SMS-based follow-up for patients who are sent home',
    'Dashboard for regional coordinators to spot outbreak patterns early',
  ],
  risks: [
    'Medical liability if triage scoring is wrong',
    'Low digital literacy among some front-desk staff',
    'Judges may discount a "triage-only" scope as too narrow',
  ],
  scores: [
    { label: 'Innovation', value: 91 },
    { label: 'Feasibility', value: 87 },
    { label: 'Impact', value: 94 },
    { label: 'Demo Potential', value: 96 },
  ],
};

export const mockIdeas: ProjectIdea[] = [
  {
    id: 'idea_001',
    hackathonId: HACKATHON_ID,
    title: 'AI Healthcare Assistant',
    summary:
      'An offline-capable triage assistant that scores incoming patients by urgency using symptoms entered by front-desk staff, then queues them for the right level of care.',
    scores: { innovation: 9.2, feasibility: 8.8, impact: 9.5, demoPotential: 9.7 },
    recommended: true,
    techStack: ['React', 'FastAPI', 'SQLite', 'On-device ML'],
  },
  {
    id: 'idea_002',
    hackathonId: HACKATHON_ID,
    title: 'SMS Follow-Up Companion',
    summary:
      'A companion tool that sends automated SMS check-ins to patients sent home after triage, escalating to a nurse if symptoms worsen.',
    scores: { innovation: 7.8, feasibility: 9.1, impact: 8.0, demoPotential: 7.2 },
    recommended: false,
    techStack: ['Node.js', 'Twilio API', 'PostgreSQL'],
  },
  {
    id: 'idea_003',
    hackathonId: HACKATHON_ID,
    title: 'Regional Outbreak Dashboard',
    summary:
      'A coordinator-facing dashboard that aggregates anonymized triage data across clinics to flag early signs of localized outbreaks.',
    scores: { innovation: 8.5, feasibility: 7.4, impact: 8.6, demoPotential: 8.0 },
    recommended: false,
    techStack: ['React', 'Recharts', 'FastAPI', 'PostgreSQL'],
  },
];

export const mockProject: Project = {
  id: PROJECT_ID,
  hackathonId: HACKATHON_ID,
  ideaId: 'idea_001',
  name: 'AI Healthcare Assistant',
  summary: mockIdeas[0].summary,
  createdAt: new Date().toISOString(),
};

export const mockTasks: ProjectTask[] = [
  { id: 'task_001', projectId: PROJECT_ID, track: 'Backend', title: 'Design database schema', status: 'done', priority: 'high', complexity: 'moderate', recommendedAI: 'Claude', dependencies: [] },
  { id: 'task_002', projectId: PROJECT_ID, track: 'Backend', title: 'Create triage API', status: 'in_progress', priority: 'high', complexity: 'complex', recommendedAI: 'Claude', dependencies: ['task_001'] },
  { id: 'task_003', projectId: PROJECT_ID, track: 'Backend', title: 'Add staff authentication', status: 'todo', priority: 'medium', complexity: 'simple', recommendedAI: 'GPT', dependencies: ['task_001'] },
  { id: 'task_004', projectId: PROJECT_ID, track: 'Backend', title: 'Wire up on-device AI integration', status: 'todo', priority: 'high', complexity: 'complex', recommendedAI: 'Claude', dependencies: ['task_002'] },
  { id: 'task_005', projectId: PROJECT_ID, track: 'Frontend', title: 'Build triage intake dashboard', status: 'in_progress', priority: 'high', complexity: 'moderate', recommendedAI: 'Claude', dependencies: ['task_002'] },
  { id: 'task_006', projectId: PROJECT_ID, track: 'Frontend', title: 'Build staff login screen', status: 'todo', priority: 'low', complexity: 'simple', recommendedAI: 'GPT', dependencies: ['task_003'] },
  { id: 'task_007', projectId: PROJECT_ID, track: 'Frontend', title: 'Build project workspace shell', status: 'done', priority: 'medium', complexity: 'moderate', recommendedAI: 'Claude', dependencies: [] },
  { id: 'task_008', projectId: PROJECT_ID, track: 'AI/ML', title: 'Curate triage symptom dataset', status: 'todo', priority: 'high', complexity: 'moderate', recommendedAI: 'Gemini', dependencies: [] },
  { id: 'task_009', projectId: PROJECT_ID, track: 'AI/ML', title: 'Train urgency classifier', status: 'todo', priority: 'high', complexity: 'complex', recommendedAI: 'Gemini', dependencies: ['task_008'] },
  { id: 'task_010', projectId: PROJECT_ID, track: 'AI/ML', title: 'Evaluate model on held-out cases', status: 'todo', priority: 'medium', complexity: 'moderate', recommendedAI: 'Claude', dependencies: ['task_009'] },
];

export const mockPrompts: Record<string, GeneratedPrompt> = {
  task_002: {
    id: 'prompt_task_002',
    taskId: 'task_002',
    qualityScore: 94,
    content:
      'You are designing a REST API for a patient-triage system used by front-desk staff at rural clinics with intermittent connectivity.\n\n' +
      'Context:\n' +
      '- Stack: FastAPI + SQLite, syncs to Postgres when online\n' +
      '- Existing schema: patients, visits, triage_scores (see database design task)\n' +
      '- Must work fully offline; sync is eventual, not real-time\n\n' +
      'Task:\n' +
      'Design and implement the triage API with the following endpoints:\n' +
      '1. POST /visits - create a new visit with intake symptoms\n' +
      '2. POST /visits/{id}/triage - compute and store an urgency score (low/medium/high/critical)\n' +
      '3. GET /visits/queue - return visits ordered by urgency, then arrival time\n' +
      '4. PATCH /visits/{id}/status - mark a visit as seen/referred/discharged\n\n' +
      'Constraints:\n' +
      '- No external network calls in the request path (must work offline)\n' +
      '- Response time under 200ms on a Raspberry Pi 4-class device\n' +
      '- Return clear validation errors for missing/invalid symptom fields\n\n' +
      'Output: FastAPI route handlers, Pydantic models, and a short note on the offline-sync strategy.',
  },
};

export const mockRecommendations: Record<string, AIRecommendation> = {
  task_002: {
    taskId: 'task_002',
    recommended: 'Claude',
    confidence: 95,
    reasoning:
      'This task involves multi-file API design with an offline-sync constraint that has to stay consistent across several endpoints. Claude\'s long-context reasoning holds the whole schema and constraint set in view at once, which reduces the chance of an endpoint quietly contradicting another.',
    alternatives: [
      { provider: 'GPT', matchScore: 91 },
      { provider: 'Gemini', matchScore: 87 },
    ],
  },
};

export const mockComparisons: Record<string, AIComparison> = {
  task_002: {
    taskId: 'task_002',
    winner: 'Claude',
    evaluatorNotes:
      'Claude\'s response was the only one that explicitly handled the offline-sync edge case for triage scores computed while disconnected, and kept response shapes consistent across all four endpoints.',
    results: [
      { provider: 'GPT', score: 91, output: 'Defines four FastAPI routes with Pydantic models; offline handling is mentioned but not detailed in the sync strategy.' },
      { provider: 'Claude', score: 95, output: 'Defines all four routes, includes a conflict-resolution note for the offline sync queue, and flags the Raspberry Pi latency constraint in a comment.' },
      { provider: 'Gemini', score: 88, output: 'Clean route definitions with strong validation errors; offline-sync strategy is left as a TODO.' },
    ],
  },
};

export const mockPromptAnalysis: PromptAnalysis = {
  overallScore: 82,
  breakdown: {
    clarity: 90,
    context: 75,
    specificity: 83,
    constraints: 68,
    outputDefinition: 92,
  },
  problems: [
    'The offline constraint is mentioned but not quantified (how long can the device stay offline before sync?)',
    'No mention of who consumes the queue endpoint, which affects sort-order assumptions',
  ],
  suggestions: [
    'State the maximum offline duration you need to support',
    'Name the consumer of each endpoint (front-desk UI vs. background sync job)',
    'Give one concrete example request/response pair',
  ],
  improvedPrompt:
    'You are designing a REST API for a patient-triage system used by front-desk staff at rural clinics that may be offline for up to 8 hours at a stretch...\n\n[full improved prompt continues with explicit consumers, one example payload, and a stated offline duration]',
};

export const mockJudgeQuestions: JudgeQuestion[] = [
  { id: 'jq_001', index: 1, question: 'Walk me through the problem you\'re solving in 30 seconds.' },
  { id: 'jq_002', index: 2, question: 'Who specifically is your first user, and how do you know they need this?' },
  { id: 'jq_003', index: 3, question: 'Why is your solution better than existing alternatives?' },
  { id: 'jq_004', index: 4, question: 'What happens if your triage score is wrong and a critical patient is marked low-urgency?' },
  { id: 'jq_005', index: 5, question: 'What would you build next with one more week?' },
];

export const mockJudgeFeedback: JudgeFeedback = {
  questionId: 'jq_003',
  scores: { technical: 9, clarity: 7, confidence: 8, persuasiveness: 7 },
  feedback:
    'Strong on the offline-first differentiator, but you didn\'t name a specific existing alternative before contrasting against it, which makes the comparison feel asserted rather than proven.',
  weaknesses: [
    'No named competitor or status-quo workflow mentioned',
    'Answer ran long before reaching the actual differentiator',
  ],
  betterAnswer:
    'Most triage tools assume steady connectivity to a cloud model. Ours runs the urgency check entirely on-device, so a clinic with two hours of internet a day gets the same triage quality as one with none.',
  nextQuestion: mockJudgeQuestions[3],
};

export const mockPitch: Pitch = {
  projectId: PROJECT_ID,
  elevatorPitch:
    'An offline-first triage assistant that helps rural clinic staff sort patients by urgency in seconds, even with no internet connection.',
  problemStatement: mockHackathon.problemStatement,
  solution:
    'Front-desk staff enter symptoms into a lightweight tablet app. An on-device model scores urgency instantly and queues the patient, with sync to a regional dashboard whenever connectivity returns.',
  keyFeatures: [
    'Works fully offline, syncs opportunistically',
    'Urgency queue sorted automatically for the doctor on duty',
    'Regional dashboard flags emerging outbreak patterns',
  ],
  architectureExplanation:
    'React front-desk app talks to a local FastAPI service backed by SQLite. Triage scoring runs on-device via a distilled classifier. A background sync job reconciles with a central Postgres instance when connectivity is available.',
  businessImpact:
    'Cuts average time-to-first-assessment for critical patients and gives regional health coordinators early visibility into outbreak clusters, without requiring new connectivity infrastructure.',
  demoScript:
    'Show a patient walking in with vague symptoms, staff entering them on a tablet with wifi switched off, an instant urgency score appearing, then reconnecting wifi live to show the sync to the coordinator dashboard.',
  presentationStructure: [
    'Problem (30s)',
    'Live demo, offline (90s)',
    'Architecture (30s)',
    'Impact + what\'s next (30s)',
  ],
};
