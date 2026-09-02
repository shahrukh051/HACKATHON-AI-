import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Gavel, Send, ArrowRight } from 'lucide-react';
import { useAsync } from '@/hooks/useAsync';
import { startJudgeSession, submitJudgeAnswer } from '@/api/judge';
import { StagedLoader, Spinner } from '@/components/ui/Loader';
import ErrorState from '@/components/ui/ErrorState';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Field';
import type { JudgeQuestion, JudgeFeedback } from '@/types';

function FeedbackScoreItem({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-[var(--color-text-muted)]">{label}</span>
      <span className="font-mono text-sm font-medium text-[var(--color-text)]">{value}/10</span>
    </div>
  );
}

export default function JudgeSimulatorPage() {
  const { projectId = 'proj_001' } = useParams();
  const { data: firstQuestion, status: sessionStatus, error: sessionError, retry: retrySession } = useAsync(
    () => startJudgeSession(projectId),
    [projectId],
  );

  const [question, setQuestion] = useState<JudgeQuestion | null>(null);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState<JudgeFeedback | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const activeQuestion = question ?? firstQuestion ?? null;

  const submit = async () => {
    if (!activeQuestion || !answer.trim()) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const result = await submitJudgeAnswer(activeQuestion.id, answer);
      setFeedback(result);
    } catch (e) {
      setSubmitError((e as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  const nextQuestion = () => {
    if (feedback?.nextQuestion) {
      setQuestion(feedback.nextQuestion);
      setFeedback(null);
      setAnswer('');
    }
  };

  if (sessionStatus === 'loading' || sessionStatus === 'idle') {
    return <StagedLoader title="Setting up judge mode" stages={['Loading judging criteria…', 'Preparing the first question…']} />;
  }
  if (sessionStatus === 'error') {
    return <ErrorState message={sessionError ?? "We couldn't start the judge simulator."} onRetry={retrySession} />;
  }
  if (!activeQuestion) return null;

  return (
    <div>
      <div className="mb-8 flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-signal-soft)] text-[var(--color-signal)]">
          <Gavel size={16} />
        </span>
        <div>
          <h1 className="font-display text-2xl font-semibold">Judge mode</h1>
          <p className="text-sm text-[var(--color-text-muted)]">Answer like it's demo day. Feedback is instant.</p>
        </div>
      </div>

      <Card className="mb-6 border-[var(--color-hairline)] bg-[var(--color-surface-2)]">
        <p className="font-mono text-xs uppercase tracking-wide text-[var(--color-text-faint)]">
          Question {String(activeQuestion.index).padStart(2, '0')}
        </p>
        <p className="mt-2 font-display text-lg leading-snug text-[var(--color-text)]">"{activeQuestion.question}"</p>
      </Card>

      {!feedback && (
        <div>
          <Textarea
            rows={5}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer as if you were on stage…"
          />
          {submitError && <p className="mt-2 text-sm text-[var(--color-bad)]">{submitError}</p>}
          <div className="mt-3 flex justify-end">
            <Button
              onClick={submit}
              disabled={!answer.trim() || submitting}
              icon={submitting ? <Spinner size={15} /> : <Send size={15} />}
            >
              {submitting ? 'Judging…' : 'Submit answer'}
            </Button>
          </div>
        </div>
      )}

      {feedback && (
        <div className="space-y-5">
          <Card>
            <p className="mb-3 font-mono text-xs uppercase tracking-wide text-[var(--color-text-faint)]">AI Feedback</p>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
              <FeedbackScoreItem label="Technical" value={feedback.scores.technical} />
              <FeedbackScoreItem label="Clarity" value={feedback.scores.clarity} />
              <FeedbackScoreItem label="Confidence" value={feedback.scores.confidence} />
              <FeedbackScoreItem label="Persuasiveness" value={feedback.scores.persuasiveness} />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-muted)]">{feedback.feedback}</p>
          </Card>

          <Card raised>
            <p className="mb-2 font-display text-sm font-medium text-[var(--color-bad)]">Weaknesses</p>
            <ul className="space-y-1.5 text-sm text-[var(--color-text-muted)]">
              {feedback.weaknesses.map((w) => (
                <li key={w}>· {w}</li>
              ))}
            </ul>
          </Card>

          <Card raised>
            <p className="mb-2 font-display text-sm font-medium text-[var(--color-good)]">A stronger answer</p>
            <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">{feedback.betterAnswer}</p>
          </Card>

          {feedback.nextQuestion && (
            <div className="flex justify-end">
              <Button onClick={nextQuestion} iconRight={<ArrowRight size={16} />}>
                Next question
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
