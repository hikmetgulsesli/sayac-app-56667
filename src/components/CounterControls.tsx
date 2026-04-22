import { Plus, Minus, RotateCcw } from 'lucide-react';

interface CounterControlsProps {
  onIncrement: () => void;
  onDecrement: () => void;
  onReset: () => void;
}

export function CounterControls({ onIncrement, onDecrement, onReset }: CounterControlsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      {/* Arttır */}
      <button
        onClick={onIncrement}
        aria-label="Sayaç değerini bir artır"
        className="col-span-2 bg-gradient-to-br from-primary to-primary-container text-on-primary-container font-display font-semibold text-xl py-6 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_10px_30px_rgba(129,140,248,0.2)] flex items-center justify-center gap-3 cursor-pointer border-0"
      >
        <Plus size={24} strokeWidth={2.5} />
        <span>Arttır</span>
      </button>

      {/* Azalt */}
      <button
        onClick={onDecrement}
        aria-label="Sayaç değerini bir azalt"
        className="bg-secondary-container text-on-secondary-container font-body font-medium py-4 rounded-xl hover:bg-surface-bright transition-colors flex flex-col items-center justify-center gap-2 cursor-pointer border-0"
      >
        <Minus size={20} />
        <span>Azalt</span>
      </button>

      {/* Sıfırla */}
      <button
        onClick={onReset}
        aria-label="Sayaç değerini sıfırla"
        className="bg-surface-container text-tertiary font-body font-medium py-4 rounded-xl hover:bg-surface-bright transition-colors flex flex-col items-center justify-center gap-2 border border-outline-variant/30 cursor-pointer"
      >
        <RotateCcw size={20} />
        <span>Sıfırla</span>
      </button>
    </div>
  );
}
