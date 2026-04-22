import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  theme: 'dark' | 'light';
  onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      aria-label={theme === 'dark' ? 'Açık tema' : 'Koyu tema'}
      className="text-primary hover:bg-surface-container transition-colors duration-200 p-2 rounded-full flex items-center justify-center cursor-pointer"
    >
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
