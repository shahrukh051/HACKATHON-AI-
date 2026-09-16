import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Eye, EyeOff, Loader2, Zap, GitBranch, Globe } from 'lucide-react';
import Button from '@/components/ui/Button';
import { FieldWrapper, Input } from '@/components/ui/Field';
import Logo from '@/components/layout/Logo';

export default function LoginPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'login' | 'signup'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  });
  const [error, setError] = useState('');

  const set = (key: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (tab === 'signup' && form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setLoading(true);
    // Simulate auth — replace with real API call
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    navigate('/setup');
  };

  const handleOAuth = async (provider: string) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    navigate('/setup');
    console.log(`OAuth with ${provider}`);
  };

  return (
    <div className="relative min-h-screen bg-[var(--color-base)] flex items-center justify-center overflow-hidden px-4">
      {/* Animated background grid */}
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" />

      {/* Glowing orbs */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[var(--color-route)] opacity-[0.06] blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-[var(--color-signal)] opacity-[0.04] blur-[100px]" />

      {/* Logo top-left */}
      <div className="absolute top-6 left-6">
        <Link to="/">
          <Logo />
        </Link>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Card */}
        <div className="rounded-2xl border border-[var(--color-hairline)] bg-[var(--color-surface)]/80 p-8 shadow-2xl backdrop-blur-xl">

          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--color-route)]/30 bg-[var(--color-route-soft)]">
              <Zap size={22} className="text-[var(--color-route)]" />
            </div>
            <h1 className="font-display text-2xl font-semibold text-[var(--color-text)]">
              {tab === 'login' ? 'Welcome back' : 'Create your account'}
            </h1>
            <p className="mt-1.5 text-sm text-[var(--color-text-muted)]">
              {tab === 'login'
                ? 'Sign in to your hackathon workspace'
                : 'Join thousands of hackers shipping smarter'}
            </p>
          </div>

          {/* Tab switcher */}
          <div className="mb-6 flex rounded-lg border border-[var(--color-hairline)] bg-[var(--color-base)] p-1">
            {(['login', 'signup'] as const).map((t) => (
              <button
                key={t}
                id={`auth-tab-${t}`}
                onClick={() => { setTab(t); setError(''); }}
                className={`flex-1 rounded-md py-2 text-sm font-medium transition-all duration-200 cursor-pointer ${
                  tab === t
                    ? 'bg-[var(--color-route)] text-white shadow-sm'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                }`}
              >
                {t === 'login' ? 'Sign in' : 'Sign up'}
              </button>
            ))}
          </div>

          {/* OAuth buttons */}
          <div className="mb-6 grid grid-cols-2 gap-3">
            <button
              id="oauth-github"
              onClick={() => handleOAuth('github')}
              disabled={loading}
              className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-[var(--color-hairline)] bg-[var(--color-surface-2)] px-4 py-2.5 text-sm font-medium text-[var(--color-text)] transition-all hover:border-[var(--color-text-faint)] hover:bg-[var(--color-hairline)] disabled:opacity-40"
            >
              <GitBranch size={16} />
              GitHub
            </button>
            <button
              id="oauth-google"
              onClick={() => handleOAuth('google')}
              disabled={loading}
              className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-[var(--color-hairline)] bg-[var(--color-surface-2)] px-4 py-2.5 text-sm font-medium text-[var(--color-text)] transition-all hover:border-[var(--color-text-faint)] hover:bg-[var(--color-hairline)] disabled:opacity-40"
            >
              <Globe size={16} />
              Google
            </button>
          </div>

          {/* Divider */}
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-[var(--color-hairline)]" />
            <span className="text-xs text-[var(--color-text-faint)]">or continue with email</span>
            <div className="h-px flex-1 bg-[var(--color-hairline)]" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {tab === 'signup' && (
              <FieldWrapper label="Full name">
                <Input
                  id="input-name"
                  type="text"
                  value={form.name}
                  onChange={(e) => set('name', e.target.value)}
                  placeholder="Alex Johnson"
                  required
                  autoFocus
                />
              </FieldWrapper>
            )}

            <FieldWrapper label="Email address">
              <Input
                id="input-email"
                type="email"
                value={form.email}
                onChange={(e) => set('email', e.target.value)}
                placeholder="you@example.com"
                required
                autoFocus={tab === 'login'}
              />
            </FieldWrapper>

            <FieldWrapper label="Password">
              <div className="relative">
                <Input
                  id="input-password"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => set('password', e.target.value)}
                  placeholder="At least 8 characters"
                  required
                  className="pr-10"
                />
                <button
                  type="button"
                  id="toggle-password"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-faint)] transition-colors hover:text-[var(--color-text-muted)] cursor-pointer"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </FieldWrapper>

            {tab === 'signup' && (
              <FieldWrapper label="Confirm password">
                <div className="relative">
                  <Input
                    id="input-confirm-password"
                    type={showConfirm ? 'text' : 'password'}
                    value={form.confirmPassword}
                    onChange={(e) => set('confirmPassword', e.target.value)}
                    placeholder="Repeat your password"
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    id="toggle-confirm-password"
                    onClick={() => setShowConfirm((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-faint)] transition-colors hover:text-[var(--color-text-muted)] cursor-pointer"
                  >
                    {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </FieldWrapper>
            )}

            {tab === 'login' && (
              <div className="flex justify-end">
                <Link
                  to="/forgot-password"
                  className="text-xs text-[var(--color-text-faint)] transition-colors hover:text-[var(--color-route)]"
                >
                  Forgot password?
                </Link>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="rounded-lg border border-[var(--color-bad)]/30 bg-[var(--color-bad)]/10 px-4 py-3 text-sm text-[var(--color-bad)]">
                {error}
              </div>
            )}

            <Button
              id="auth-submit"
              type="submit"
              size="lg"
              disabled={loading}
              icon={loading ? <Loader2 size={16} className="animate-spin" /> : undefined}
              iconRight={!loading ? <ArrowRight size={16} /> : undefined}
              className="w-full"
            >
              {loading
                ? tab === 'login' ? 'Signing in…' : 'Creating account…'
                : tab === 'login' ? 'Sign in' : 'Create account'}
            </Button>
          </form>

          {/* Footer note */}
          <p className="mt-6 text-center text-xs text-[var(--color-text-faint)]">
            {tab === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => { setTab(tab === 'login' ? 'signup' : 'login'); setError(''); }}
              className="text-[var(--color-route)] transition-colors hover:brightness-125 cursor-pointer"
            >
              {tab === 'login' ? 'Sign up free' : 'Sign in'}
            </button>
          </p>

          {tab === 'signup' && (
            <p className="mt-3 text-center text-xs text-[var(--color-text-faint)]">
              By signing up you agree to our{' '}
              <a href="#" className="text-[var(--color-route)] hover:brightness-125">Terms</a>
              {' '}and{' '}
              <a href="#" className="text-[var(--color-route)] hover:brightness-125">Privacy Policy</a>.
            </p>
          )}
        </div>

        {/* Social proof strip */}
        <div className="mt-6 flex items-center justify-center gap-6 text-xs text-[var(--color-text-faint)]">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 animate-[pulse-dot_1.6s_ease-in-out_infinite] rounded-full bg-[var(--color-good)]" />
            GPT · Claude · Gemini routed live
          </div>
          <span>·</span>
          <span>Free to start</span>
          <span>·</span>
          <span>No credit card</span>
        </div>
      </div>
    </div>
  );
}
