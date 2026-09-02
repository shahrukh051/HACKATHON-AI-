import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Brain,
  ListChecks,
  Sparkles,
  Swords,
  Gavel,
  Gauge,
  ClipboardList,
  SearchCheck,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { ProviderBadge } from '@/components/ui/Badge';
import RouteConverge from '@/components/ui/RouteConverge';

const FEATURES = [
  { icon: SearchCheck, title: 'Problem analysis', desc: 'Breaks your problem statement into users, constraints, opportunities, and risk — before anyone writes a line of code.' },
  { icon: Sparkles, title: 'Idea generation', desc: 'Generates scored project ideas and tells you which one gives you the best shot, and why.' },
  { icon: ListChecks, title: 'Task breakdown', desc: 'Splits the chosen idea into backend, frontend, and AI/ML tasks with priority and complexity attached.' },
  { icon: ClipboardList, title: 'Prompt generation', desc: 'Writes a ready-to-send prompt for each task, scored for clarity, context, and constraints.' },
  { icon: Brain, title: 'AI recommendation', desc: 'Matches each task to the model best suited for it, with the reasoning shown, not hidden.' },
  { icon: Swords, title: 'AI battle', desc: 'Runs a task across models side by side and shows you which output actually holds up.' },
  { icon: Gauge, title: 'Prompt analyzer', desc: 'Scores any prompt you paste in and hands back a stronger version.' },
  { icon: Gavel, title: 'Judge simulator', desc: 'Fires real judging questions at you and grades your answer before the real thing does.' },
];

const FLOW = [
  'Set up your hackathon',
  'Get your problem analyzed',
  'Pick a scored idea',
  'Open your workspace',
  'Work the task list',
  'Generate a prompt',
  'Get matched to an AI',
  'Compare outputs',
  'Rehearse with the judge',
];

export default function LandingPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-grid relative overflow-hidden border-b border-[var(--color-hairline)]">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--color-base)]" />
        <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-20 sm:pt-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-hairline)] bg-[var(--color-surface)] px-3 py-1 text-xs text-[var(--color-text-muted)]">
              <span className="h-1.5 w-1.5 animate-[pulse-dot_1.6s_ease-in-out_infinite] rounded-full bg-[var(--color-good)]" />
              Live routing across GPT, Claude &amp; Gemini
            </span>
            <h1 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-[var(--color-text)] sm:text-6xl">
              Hack smarter.
              <br />
              Build faster.
              <br />
              <span className="text-[var(--color-route)]">Choose the right AI.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-balance text-base text-[var(--color-text-muted)] sm:text-lg">
              Your AI-powered hackathon copilot for ideas, architecture, coding, prompts, and judging.
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <Link to="/setup">
                <Button size="lg" iconRight={<ArrowRight size={18} />}>
                  Start hackathon
                </Button>
              </Link>
              <a href="#how-it-works">
                <Button size="lg" variant="outline">
                  See how it works
                </Button>
              </a>
            </div>
          </div>

          {/* Signature: routing diagram */}
          <div className="mx-auto mt-16 max-w-2xl">
            <Card className="px-6 pb-6 pt-8">
              <div className="mb-2 text-center font-mono text-xs uppercase tracking-wide text-[var(--color-text-faint)]">
                Design backend architecture
              </div>
              <RouteConverge
                width={480}
                height={90}
                points={[0.2, 0.5, 0.8]}
                target={0.5}
                direction="up"
                highlightIndex={1}
              />
              <div className="mt-2 flex justify-center gap-8">
                <ProviderBadge provider="GPT" size="sm" />
                <ProviderBadge provider="Claude" size="sm" />
                <ProviderBadge provider="Gemini" size="sm" />
              </div>
              <p className="mt-4 text-center text-sm text-[var(--color-text-muted)]">
                One task, routed to the model that actually fits it — <span className="text-[var(--color-claude)]">Claude</span> wins this one on long-context reasoning.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* AI orchestration concept */}
      <section id="how-it-works" className="border-b border-[var(--color-hairline)] px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">You don't pick the model. The problem does.</h2>
            <p className="mt-3 text-[var(--color-text-muted)]">
              The backend is the brain — it reads each task and decides which model fits. The frontend is your control center: it shows you the decision, never makes you guess at it.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            <Card className="text-center">
              <p className="font-mono text-xs text-[var(--color-text-faint)]">01</p>
              <p className="mt-2 font-display font-medium">Frontend</p>
              <p className="mt-1 text-sm text-[var(--color-text-muted)]">Your control center — every screen in this app.</p>
            </Card>
            <Card highlight className="text-center">
              <p className="font-mono text-xs text-[var(--color-route)]">02</p>
              <p className="mt-2 font-display font-medium">Backend</p>
              <p className="mt-1 text-sm text-[var(--color-text-muted)]">The brain — analyzes, scores, and routes every task.</p>
            </Card>
            <Card className="text-center">
              <p className="font-mono text-xs text-[var(--color-text-faint)]">03</p>
              <p className="mt-2 font-display font-medium">GPT · Claude · Gemini</p>
              <p className="mt-1 text-sm text-[var(--color-text-muted)]">Whichever one actually fits the task at hand.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-b border-[var(--color-hairline)] px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">Everything between "idea" and "demo day"</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => (
              <Card key={f.title} raised>
                <f.icon size={18} className="text-[var(--color-route)]" />
                <p className="mt-3 font-display text-sm font-medium">{f.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-text-muted)]">{f.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Example workflow */}
      <section id="workflow" className="px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center font-display text-2xl font-semibold sm:text-3xl">One straight line from problem to pitch</h2>
          <ol className="mt-10 space-y-0">
            {FLOW.map((step, i) => (
              <li key={step} className="relative flex gap-4 pb-8 last:pb-0">
                {i < FLOW.length - 1 && (
                  <span className="absolute left-[15px] top-8 h-full w-px bg-[var(--color-hairline)]" />
                )}
                <span className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--color-hairline)] bg-[var(--color-surface)] font-mono text-xs text-[var(--color-text-muted)]">
                  {i + 1}
                </span>
                <span className="pt-1 text-[var(--color-text)]">{step}</span>
              </li>
            ))}
          </ol>
          <div className="mt-6 text-center">
            <Link to="/setup">
              <Button size="lg" iconRight={<ArrowRight size={18} />}>
                Start hackathon
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
