import { useState } from 'react';
import { Copy, Check, Wand2 } from 'lucide-react';
import { analyzePrompt } from '@/api/prompts';
import { StagedLoader } from '@/components/ui/Loader';
import ErrorState from '@/components/ui/ErrorState';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Field';
import ScoreRing from '@/components/ui/ScoreRing';
import ScoreBar from '@/components/ui/ScoreBar';
import type { PromptAnalysis } from '@/types';

export default function PromptAnalyzerPage() {
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<PromptAnalysis | null>(null);
  const [copied, setCopied] = useState(false);

  const run = async () => {
    setStatus('loading');
    setError(null);
    try {
      const result = await analyzePrompt(input);
      setAnalysis(result);
      setStatus('success');
    } catch (e) {
      setError((e as Error).message);
      setStatus('error');
    }
  };

  const copy = () => {
    if (!analysis) return;
    navigator.clipboard.writeText(analysis.improvedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-semibold">Prompt analyzer</h1>
        <p className="mt-1.5 text-[var(--color-text-muted)]">Paste any prompt and get a scored, sharper version back.</p>
      </div>

      <Card raised>
        <Textarea
          rows={6}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your prompt…"
        />
        <div className="mt-3 flex justify-end">
          <Button onClick={run} disabled={!input.trim() || status === 'loading'} icon={<Wand2 size={15} />}>
            {status === 'loading' ? 'Analyzing…' : 'Analyze prompt'}
          </Button>
        </div>
      </Card>

      {status === 'loading' && (
        <div className="mt-8">
          <StagedLoader stages={['Checking clarity…', 'Checking constraints…', 'Drafting a stronger version…']} />
        </div>
      )}

      {status === 'error' && (
        <div className="mt-8">
          <ErrorState message={error ?? 'Could not analyze that prompt.'} onRetry={run} />
        </div>
      )}

      {status === 'success' && analysis && (
        <div className="mt-8 space-y-6">
          <Card className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            <ScoreRing value={analysis.overallScore} size={100} label="Score" />
            <div className="flex-1 space-y-3">
              <ScoreBar label="Clarity" value={analysis.breakdown.clarity} />
              <ScoreBar label="Context" value={analysis.breakdown.context} />
              <ScoreBar label="Specificity" value={analysis.breakdown.specificity} />
              <ScoreBar label="Constraints" value={analysis.breakdown.constraints} color="var(--color-signal)" />
              <ScoreBar label="Output definition" value={analysis.breakdown.outputDefinition} />
            </div>
          </Card>

          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <p className="mb-2 font-display text-sm font-medium text-[var(--color-bad)]">Problems</p>
              <ul className="space-y-1.5 text-sm text-[var(--color-text-muted)]">
                {analysis.problems.map((p) => (
                  <li key={p}>· {p}</li>
                ))}
              </ul>
            </Card>
            <Card>
              <p className="mb-2 font-display text-sm font-medium text-[var(--color-good)]">Suggestions</p>
              <ul className="space-y-1.5 text-sm text-[var(--color-text-muted)]">
                {analysis.suggestions.map((s) => (
                  <li key={s}>· {s}</li>
                ))}
              </ul>
            </Card>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="font-display text-sm font-medium">Improved prompt</p>
              <Button variant="outline" size="sm" icon={copied ? <Check size={14} /> : <Copy size={14} />} onClick={copy}>
                {copied ? 'Copied' : 'Copy'}
              </Button>
            </div>
            <Card raised>
              <pre className="whitespace-pre-wrap font-mono text-[13px] leading-relaxed text-[var(--color-text)]">
                {analysis.improvedPrompt}
              </pre>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
