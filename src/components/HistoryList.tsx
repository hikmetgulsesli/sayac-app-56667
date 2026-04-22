import { Plus, Minus, RotateCcw, History } from 'lucide-react';
import { HistoryEntry } from '@/types';

interface HistoryListProps {
  entries: HistoryEntry[];
}

function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString('tr-TR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

function getActionLabel(type: HistoryEntry['type']): string {
  switch (type) {
    case 'increment': return 'Arttır';
    case 'decrement': return 'Azalt';
    case 'reset': return 'Sıfırla';
  }
}

export function HistoryList({ entries }: HistoryListProps) {
  if (entries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <History size={48} className="text-outline-variant mb-4" />
        <p className="font-body text-on-surface-variant text-base">
          Henüz işlem yapılmadı
        </p>
        <p className="font-body text-on-surface-variant text-sm mt-1">
          Sayaçla işlem yaptığınızda geçmiş burada görünür.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 overflow-y-auto pr-2 max-h-[400px]">
      {entries.map((entry) => (
        <div
          key={entry.id}
          className="flex items-center justify-between p-3 rounded-lg hover:bg-surface-container-highest transition-colors group"
        >
          <div className="flex items-center gap-3">
            <div
              className={`
                w-8 h-8 rounded-full flex items-center justify-center
                ${entry.type === 'increment' ? 'bg-primary/10 text-primary' : ''}
                ${entry.type === 'decrement' ? 'bg-secondary-container/30 text-secondary' : ''}
                ${entry.type === 'reset' ? 'bg-tertiary/10 text-tertiary' : ''}
              `}
            >
              {entry.type === 'increment' && <Plus size={14} />}
              {entry.type === 'decrement' && <Minus size={14} />}
              {entry.type === 'reset' && <RotateCcw size={14} />}
            </div>
            <div>
              <p className="font-body text-sm font-medium text-on-surface">
                {getActionLabel(entry.type)}: {entry.previousValue} → {entry.newValue}
              </p>
              <p className="font-body text-xs text-on-surface-variant">
                {entry.type === 'increment' ? 'Manuel Giriş' : entry.type === 'decrement' ? 'Düzeltme' : 'Sıfırlama'}
              </p>
            </div>
          </div>
          <span className="font-display text-xs text-outline-variant group-hover:text-on-surface-variant transition-colors">
            {formatTime(entry.timestamp)}
          </span>
        </div>
      ))}
    </div>
  );
}
