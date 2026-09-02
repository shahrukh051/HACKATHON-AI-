import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { FieldWrapper, Input, Textarea, TagInput } from '@/components/ui/Field';
import { createHackathon } from '@/api/hackathons';
import type { HackathonSetupInput } from '@/types';

const STEPS = ['Basics', 'Problem', 'Team & constraints'];

const initial: HackathonSetupInput = {
  name: '',
  theme: '',
  timeAvailable: '',
  problemStatement: '',
  rules: '',
  judgingCriteria: '',
  teamMembers: [],
  teamSkills: [],
  preferredTechnologies: [],
  budget: '',
};

export default function HackathonSetupPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<HackathonSetupInput>(initial);
  const [submitting, setSubmitting] = useState(false);

  const set = <K extends keyof HackathonSetupInput>(key: K, value: HackathonSetupInput[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const canAdvance =
    step === 0
      ? form.name.trim().length > 0 && form.theme.trim().length > 0
      : step === 1
        ? form.problemStatement.trim().length > 0
        : true;

  const handleSubmit = async () => {
    setSubmitting(true);
    const hackathon = await createHackathon(form);
    navigate(`/hackathons/${hackathon.id}/analysis`);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-semibold">Set up your hackathon</h1>
        <p className="mt-1.5 text-[var(--color-text-muted)]">
          A few details now save a lot of back-and-forth later. Takes about two minutes.
        </p>
      </div>

      <div className="mb-8 flex gap-2">
        {STEPS.map((s, i) => (
          <div key={s} className="flex-1">
            <div
              className={`h-1 rounded-full transition-colors ${i <= step ? 'bg-[var(--color-route)]' : 'bg-[var(--color-hairline)]'}`}
            />
            <p className={`mt-1.5 text-xs ${i === step ? 'text-[var(--color-text)]' : 'text-[var(--color-text-faint)]'}`}>{s}</p>
          </div>
        ))}
      </div>

      <Card className="p-7">
        {step === 0 && (
          <div className="space-y-5">
            <FieldWrapper label="Hackathon name">
              <Input
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
                placeholder="MedHack 2026"
                autoFocus
              />
            </FieldWrapper>
            <FieldWrapper label="Theme">
              <Input
                value={form.theme}
                onChange={(e) => set('theme', e.target.value)}
                placeholder="AI for Healthcare Access"
              />
            </FieldWrapper>
            <FieldWrapper label="Time available" hint="How long is the build window?">
              <Input
                value={form.timeAvailable}
                onChange={(e) => set('timeAvailable', e.target.value)}
                placeholder="36 hours"
              />
            </FieldWrapper>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-5">
            <FieldWrapper label="Problem statement">
              <Textarea
                rows={4}
                value={form.problemStatement}
                onChange={(e) => set('problemStatement', e.target.value)}
                placeholder="Describe the problem exactly as given in the brief..."
              />
            </FieldWrapper>
            <FieldWrapper label="Rules">
              <Textarea
                rows={2}
                value={form.rules}
                onChange={(e) => set('rules', e.target.value)}
                placeholder="Team size limits, allowed tools, time constraints..."
              />
            </FieldWrapper>
            <FieldWrapper label="Judging criteria">
              <Textarea
                rows={2}
                value={form.judgingCriteria}
                onChange={(e) => set('judgingCriteria', e.target.value)}
                placeholder="Innovation, feasibility, impact, demo quality..."
              />
            </FieldWrapper>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <FieldWrapper label="Team members" hint="Press enter after each name">
              <TagInput values={form.teamMembers} onChange={(v) => set('teamMembers', v)} placeholder="Add a teammate" />
            </FieldWrapper>
            <FieldWrapper label="Team skills">
              <TagInput values={form.teamSkills} onChange={(v) => set('teamSkills', v)} placeholder="React, FastAPI, ML..." />
            </FieldWrapper>
            <FieldWrapper label="Preferred technologies">
              <TagInput
                values={form.preferredTechnologies}
                onChange={(v) => set('preferredTechnologies', v)}
                placeholder="Optional — leave blank if flexible"
              />
            </FieldWrapper>
            <FieldWrapper label="Budget">
              <Input value={form.budget} onChange={(e) => set('budget', e.target.value)} placeholder="₹5,000 (hardware only)" />
            </FieldWrapper>
          </div>
        )}
      </Card>

      <div className="mt-6 flex items-center justify-between">
        <Button variant="ghost" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
          <ArrowLeft size={16} /> Back
        </Button>
        {step < STEPS.length - 1 ? (
          <Button onClick={() => setStep((s) => s + 1)} disabled={!canAdvance} iconRight={<ArrowRight size={16} />}>
            Continue
          </Button>
        ) : (
          <Button onClick={handleSubmit} disabled={submitting} icon={submitting ? <Loader2 size={16} className="animate-spin" /> : undefined}>
            {submitting ? 'Analyzing…' : 'Analyze my hackathon'}
          </Button>
        )}
      </div>
    </div>
  );
}
