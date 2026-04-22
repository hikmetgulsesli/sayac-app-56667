import { STORAGE_KEY, THEME_KEY, CounterState } from '@/types';

export function loadCounterState(): { state: CounterState; status: 'ok' | 'error' | 'unavailable' } {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === null) {
      return { state: { count: 0, history: [] }, status: 'ok' };
    }
    const parsed = JSON.parse(stored) as CounterState;
    return { state: { count: parsed.count ?? 0, history: parsed.history ?? [] }, status: 'ok' };
  } catch {
    return { state: { count: 0, history: [] }, status: 'error' };
  }
}

export function saveCounterState(state: CounterState): 'ok' | 'error' | 'unavailable' {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return 'ok';
  } catch {
    return 'error';
  }
}

export function loadTheme(): 'dark' | 'light' {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
    return 'dark';
  } catch {
    return 'dark';
  }
}

export function saveTheme(theme: 'dark' | 'light'): void {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // ignore
  }
}
