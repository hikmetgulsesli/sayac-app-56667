import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCounter } from '@/hooks/useCounter';

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

describe('useCounter', () => {
  beforeEach(() => {
    localStorageMock.clear();
    window.app = {} as any;
  });

  it('starts at 0', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  it('increments by 1', () => {
    const { result } = renderHook(() => useCounter());
    act(() => result.current.increment());
    expect(result.current.count).toBe(1);
  });

  it('decrements by 1', () => {
    const { result } = renderHook(() => useCounter());
    act(() => result.current.increment());
    act(() => result.current.increment());
    act(() => result.current.decrement());
    expect(result.current.count).toBe(1);
  });

  it('decrements below zero', () => {
    const { result } = renderHook(() => useCounter());
    act(() => result.current.decrement());
    expect(result.current.count).toBe(-1);
  });

  it('resets to 0', () => {
    const { result } = renderHook(() => useCounter());
    act(() => result.current.increment());
    act(() => result.current.increment());
    act(() => result.current.reset());
    expect(result.current.count).toBe(0);
  });

  it('adds history entry on increment', () => {
    const { result } = renderHook(() => useCounter());
    act(() => result.current.increment());
    expect(result.current.history).toHaveLength(1);
    expect(result.current.history[0].type).toBe('increment');
    expect(result.current.history[0].previousValue).toBe(0);
    expect(result.current.history[0].newValue).toBe(1);
  });

  it('adds history entry on decrement', () => {
    const { result } = renderHook(() => useCounter());
    act(() => result.current.decrement());
    expect(result.current.history).toHaveLength(1);
    expect(result.current.history[0].type).toBe('decrement');
  });

  it('adds history entry on reset', () => {
    const { result } = renderHook(() => useCounter());
    act(() => result.current.increment());
    act(() => result.current.reset());
    expect(result.current.history).toHaveLength(2);
    expect(result.current.history[0].type).toBe('reset');
  });

  it('keeps max 10 history entries', () => {
    const { result } = renderHook(() => useCounter());
    for (let i = 0; i < 15; i++) {
      act(() => result.current.increment());
    }
    expect(result.current.history.length).toBe(10);
  });

  it('sets direction to up on increment', () => {
    const { result } = renderHook(() => useCounter());
    act(() => result.current.increment());
    expect(result.current.direction).toBe('up');
  });

  it('sets lastAction to increment on increment', () => {
    const { result } = renderHook(() => useCounter());
    act(() => result.current.increment());
    expect(result.current.lastAction).toBe('increment');
  });

  it('updates window.app on count change', () => {
    const { result } = renderHook(() => useCounter());
    act(() => result.current.increment());
    expect(window.app.counter).toBe(1);
    expect(window.app.lastAction).toBe('increment');
  });

  it('loads from localStorage on mount', () => {
    localStorageMock.setItem('sayac-app-56667-counter', JSON.stringify({ count: 42, history: [] }));
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(42);
  });
});
