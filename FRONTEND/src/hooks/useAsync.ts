import { useCallback, useEffect, useState } from 'react';
import type { AsyncStatus } from '@/types';

export function useAsync<T>(fn: () => Promise<T>, deps: unknown[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<AsyncStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [nonce, setNonce] = useState(0);

  const run = useCallback(() => {
    let cancelled = false; // prevents state updates on unmounted or re-triggered components
    setStatus('loading');
    setError(null);
    fn()
      .then((result) => {
        if (cancelled) return;
        setData(result);
        setStatus('success');
      })
      .catch((err: Error) => {
        if (cancelled) return;
        setError(err.message || 'Something went wrong.');
        setStatus('error');
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, nonce]);

  useEffect(() => run(), [run]);

  // Bumping nonce invalidates the useCallback memo, re-triggering the useEffect
  const retry = useCallback(() => setNonce((n) => n + 1), []);

  return { data, status, error, retry, isLoading: status === 'loading', isError: status === 'error' };
}
