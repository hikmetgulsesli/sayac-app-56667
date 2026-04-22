import { useState, useEffect, useCallback } from 'react';
import { HistoryEntry, MAX_HISTORY } from '@/types';
import { loadCounterState, saveCounterState } from '@/utils/storage';

export type CounterDirection = 'up' | 'down' | 'reset';
export type LastAction = 'increment' | 'decrement' | 'reset' | null;

export interface UseCounterReturn {
  count: number;
  history: HistoryEntry[];
  direction: CounterDirection;
  lastAction: LastAction;
  localStorageStatus: 'ok' | 'error' | 'unavailable';
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

function generateId(): string {
  return Math.random().toString(36).slice(2, 9);
}

export function useCounter(): UseCounterReturn {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [direction, setDirection] = useState<CounterDirection>('up');
  const [lastAction, setLastAction] = useState<LastAction>(null);
  const [localStorageStatus, setLocalStorageStatus] = useState<'ok' | 'error' | 'unavailable'>('ok');

  useEffect(() => {
    const { state, status } = loadCounterState();
    setCount(state.count);
    setHistory(state.history);
    setLocalStorageStatus(status);
  }, []);

  useEffect(() => {
    window.app = {
      state: 'idle',
      counter: count,
      direction,
      lastAction,
      localStorageStatus,
    };
  }, [count, direction, lastAction, localStorageStatus]);

  const addHistoryEntry = useCallback((type: 'increment' | 'decrement' | 'reset', prev: number, next: number) => {
    const entry: HistoryEntry = {
      id: generateId(),
      type,
      previousValue: prev,
      newValue: next,
      timestamp: Date.now(),
    };
    setHistory((prev) => {
      const next2 = [entry, ...prev].slice(0, MAX_HISTORY);
      const status = saveCounterState({ count: next, history: next2 });
      setLocalStorageStatus(status);
      return next2;
    });
  }, []);

  const increment = useCallback(() => {
    setCount((prev) => {
      const next = prev + 1;
      addHistoryEntry('increment', prev, next);
      return next;
    });
    setDirection('up');
    setLastAction('increment');
  }, [addHistoryEntry]);

  const decrement = useCallback(() => {
    setCount((prev) => {
      const next = prev - 1;
      addHistoryEntry('decrement', prev, next);
      return next;
    });
    setDirection('down');
    setLastAction('decrement');
  }, [addHistoryEntry]);

  const reset = useCallback(() => {
    setCount((prev) => {
      addHistoryEntry('reset', prev, 0);
      return 0;
    });
    setDirection('reset');
    setLastAction('reset');
  }, [addHistoryEntry]);

  return {
    count,
    history,
    direction,
    lastAction,
    localStorageStatus,
    increment,
    decrement,
    reset,
  };
}
