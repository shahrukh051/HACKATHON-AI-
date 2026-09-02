import { useState } from 'react';
import { Copy, Check, Pencil, Send } from 'lucide-react';
import { useAsync } from '@/hooks/useAsync';
import { generatePrompt } from '@/api/prompts';
import { StagedLoader } from '@/components/ui/Loader';
import ErrorState from '@/components/ui/ErrorState';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import ScoreRing from '@/components/ui/ScoreRing';

export default function PromptGeneratorTab({ taskId }: { taskId: string }) {
  const { data: prompt, status, error, retry } = useAsync(() => generatePrompt(taskId), [taskId]);
  const [copied, setCopied] = useState(false);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');

  if (status === 'loading' || status === 'idle') {
    return <StagedLoader title="Writing your prompt" stages={['Reading task context…', 'Pulling in constraints…', 'Scoring for clarity…']} />;
  }
  if (status === 'error') {
    return <ErrorState message={error ?? "We couldn't generate a prompt for this task."} onRetry={retry} />;
  }
  if (!prompt) return null;

  const content = editing ? draft : prompt.content;

  const copy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="font-mono text-xs uppercase tracking-wide text-[var(--color-text-faint)]">Generated prompt</p>
        <div className="flex items-center gap-3">
          <span className="text-xs text-[var(--color-text-faint)]">Prompt quality</span>
          <ScoreRing value={prompt.qualityScore} size={40} strokeWidth={4} />
        </div>
      </div>

      <Card raised className="p-0">
        {editing ? (
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={16}
            className="w-full resize-none rounded-xl bg-transparent p-5 font-mono text-[13px] leading-relaxed text-[var(--color-text)] outline-none"
          />
        ) : (
          <pre className="whitespace-pre-wrap p-5 font-mono text-[13px] leading-relaxed text-[var(--color-text)]">{content}</pre>
        )}
      </Card>

      <div className="mt-4 flex flex-wrap gap-2">
        <Button variant="outline" size="sm" icon={copied ? <Check size={14} /> : <Copy size={14} />} onClick={copy}>
          {copied ? 'Copied' : 'Copy'}
        </Button>
        <Button
          variant="outline"
          size="sm"
          icon={<Pencil size={14} />}
          onClick={() => {
            if (!editing) setDraft(prompt.content);
            setEditing((e) => !e);
          }}
        >
          {editing ? 'Done editing' : 'Edit'}
        </Button>
        <Button variant="primary" size="sm" icon={<Send size={14} />}>
          Send to AI
        </Button>
      </div>
    </div>
  );
}
