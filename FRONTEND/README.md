# Hackathon AI Copilot — Frontend

Full scaffold for the Hackathon AI Copilot frontend, built to the spec: React + TypeScript + Vite + Tailwind CSS v4 + React Router, with a complete mock API layer so the UI runs end-to-end before any backend exists.

## Run it

```bash
npm install
npm run dev
```

Then open the printed localhost URL. Every screen works out of the box against mock data — no backend required.

```bash
npm run build     # production build (also type-checks)
npm run preview   # serve the production build locally
```

## What's here

- **Landing → Setup → Analysis → Ideas → Workspace** — the full flow from the spec, as real routes.
- **Project workspace** (`/projects/:projectId/...`) — persistent sidebar with Overview, Tasks, Prompts, AI Team, Research, Architecture, Pitch, and Judge.
- **Task detail** (`/projects/:projectId/tasks/:taskId`) — tabs for Prompt Generator, AI Recommendation, and AI Battle, matching pages 7–9 of the spec.
- **Mock API layer** (`src/api/`) — one file per domain (auth, hackathons, projects, tasks, prompts, ai, judge), each simulating real network latency via `src/lib/mockClient.ts`. Swapping to a real backend later means editing the *inside* of these functions only — nothing in the pages or components needs to change.
- **Design system** — dark, technical "AI command center" palette (indigo route accent + amber signal accent), Space Grotesk/Inter/JetBrains Mono type system, and a signature animated "route line" SVG motif (`RouteConverge`) that visualizes the app's core idea: a task fans out to GPT/Claude/Gemini and converges on one recommended model.
- **Loading & error states** — every async screen has a staged loading indicator (per Rule 3) and a real retry-capable error state (per Rule 4), not a generic spinner or "something went wrong."

## Folder structure

```
src/
├── api/           one service module per backend domain (mock-backed)
├── components/
│   ├── ui/        Button, Card, Badge, ScoreRing, RouteConverge, Loader, ErrorState, Field…
│   ├── layout/     Logo, WorkspaceSidebar
│   └── workspace/  tab content shared by the Task Detail page
├── hooks/         useAsync — standardized loading/error/success handling
├── layouts/       MarketingLayout, OnboardingLayout, WorkspaceLayout
├── lib/           mockClient (simulated network), mockData (seeded dataset)
├── pages/         top-level route components
├── types/         shared domain types
└── App.tsx        route tree
```

## Wiring up the real backend

Each function in `src/api/*.ts` currently resolves mock data through `simulate()`. To connect FastAPI:

1. Add an `http.ts` in `src/lib/` wrapping `fetch`/`axios` with the base URL and auth headers.
2. Replace the body of each `api/*.ts` function with a real call, keeping the same function signature and return type.
3. Nothing in `pages/` or `components/` needs to change — they only depend on the types in `src/types/`, not on how the data is fetched.

## Notes

- Seeded mock data tells one consistent story (a "MedHack 2026 / AI Healthcare Assistant" hackathon) so every page has realistic, cross-referenced content instead of lorem ipsum.
- Tailwind v4 is configured via `@theme` in `src/index.css` — there's no `tailwind.config.js`; all design tokens (colors, fonts) live there.
- `npx tsc -b`, `npm run build`, and `npx oxlint src` all pass clean (0 errors) as of this scaffold.
