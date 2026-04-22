import { describe, it, expect, beforeEach } from 'vitest';
import { loadCounterState, saveCounterState, loadTheme, saveTheme } from '@/utils/storage';
import { STORAGE_KEY, THEME_KEY } from '@/types';

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('storage utils', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  describe('loadCounterState', () => {
    it('returns default state when nothing stored', () => {
      const { state, status } = loadCounterState();
      expect(state.count).toBe(0);
      expect(state.history).toEqual([]);
      expect(status).toBe('ok');
    });

    it('loads stored state', () => {
      localStorageMock.setItem(STORAGE_KEY, JSON.stringify({ count: 42, history: [] }));
      const { state } = loadCounterState();
      expect(state.count).toBe(42);
    });
  });

  describe('saveCounterState', () => {
    it('saves state to localStorage', () => {
      saveCounterState({ count: 99, history: [] });
      expect(localStorageMock.getItem(STORAGE_KEY)).toBe('{"count":99,"history":[]}');
    });
  });

  describe('loadTheme', () => {
    it('returns dark by default', () => {
      expect(loadTheme()).toBe('dark');
    });

    it('returns stored theme', () => {
      localStorageMock.setItem(THEME_KEY, 'light');
      expect(loadTheme()).toBe('light');
    });
  });

  describe('saveTheme', () => {
    it('saves theme', () => {
      saveTheme('light');
      expect(localStorageMock.getItem(THEME_KEY)).toBe('light');
    });
  });
});
