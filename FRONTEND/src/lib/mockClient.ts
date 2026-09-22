/**
 * Simulated network layer.
 *
 * Every function in `src/api/*` should route through `simulate` so that:
 *  - loading states are real (there is an actual delay)
 *  - swapping to a real backend later is a one-line change per call site
 *  - error states can be exercised deterministically via `forceError`
 */

export interface SimulateOptions {
  /** artificial latency range, ms */
  minMs?: number;
  maxMs?: number;
  /** reject instead of resolving, for exercising error UI */
  forceError?: boolean;
  errorMessage?: string;
}

const DEFAULTS: Required<Pick<SimulateOptions, 'minMs' | 'maxMs'>> = {
  minMs: 450,
  maxMs: 1100,
};

function randomBetween(min: number, max: number) {
  return Math.round(min + Math.random() * (max - min));
}

export function simulate<T>(data: T, opts: SimulateOptions = {}): Promise<T> {
  const { minMs = DEFAULTS.minMs, maxMs = DEFAULTS.maxMs, forceError, errorMessage } = opts;
  const ms = randomBetween(minMs, maxMs);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (forceError) {
        reject(new Error(errorMessage ?? 'The request failed. Please try again.'));
      } else {
        resolve(data);
      }
    }, ms);
  });
}

// Distributes stage label updates evenly across totalMs — keeps the UI feeling alive during long AI calls
/** Small helper for staged "progress" messages during longer AI operations. */
export function onStage(stages: string[], setStage: (s: string) => void, totalMs: number) {
  const stepMs = totalMs / stages.length;
  stages.forEach((stage, i) => {
    setTimeout(() => setStage(stage), i * stepMs);
  });
}
