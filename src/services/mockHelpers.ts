/** Simulated latency & error helpers (frontend runs against mock data). */

const LATENCY = Number(import.meta.env.VITE_MOCK_LATENCY ?? 450);

export function delay(ms = LATENCY): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function mockError(message: string): never {
  throw new Error(message);
}

export function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}
