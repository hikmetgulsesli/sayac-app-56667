export const STORAGE_KEY = 'sayac-app-56667-counter';
export const THEME_KEY = 'sayac-app-56667-theme';
export const MAX_HISTORY = 10;

export interface HistoryEntry {
  id: string;
  type: 'increment' | 'decrement' | 'reset';
  previousValue: number;
  newValue: number;
  timestamp: number;
}

export interface CounterState {
  count: number;
  history: HistoryEntry[];
}

export interface AppWindow {
  state: 'idle' | 'loading' | 'success' | 'error';
  counter: number;
  direction: 'up' | 'down' | 'reset';
  lastAction: null | 'increment' | 'decrement' | 'reset';
  localStorageStatus: 'ok' | 'error' | 'unavailable';
}

declare global {
  interface Window {
    app: AppWindow;
  }
}
