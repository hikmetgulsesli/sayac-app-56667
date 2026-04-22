import { Moon, Sun, History, Settings } from 'lucide-react';
import { TabId } from './MobileBottomNav';

interface DesktopNavProps {
  theme: 'dark' | 'light';
  onThemeToggle: () => void;
  onTabChange: (tab: TabId) => void;
  activeTab?: TabId;
}

export function DesktopNav({ theme, onThemeToggle, onTabChange }: DesktopNavProps) {
  return (
    <nav className="hidden md:flex justify-between items-center w-full px-6 h-16 max-w-screen-xl mx-auto bg-surface-container-low">
      <div className="text-2xl font-bold tracking-tighter text-on-surface font-display">SAYAÇ</div>
      <div className="flex items-center gap-6">
        <button
          onClick={onThemeToggle}
          aria-label={theme === 'dark' ? 'Açık tema' : 'Koyu tema'}
          className="text-primary hover:bg-surface-container transition-colors duration-200 p-2 rounded-full flex items-center justify-center cursor-pointer"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button
          onClick={() => onTabChange('istatistikler')}
          aria-label="Geçmiş"
          className="text-primary hover:bg-surface-container transition-colors duration-200 p-2 rounded-full flex items-center justify-center cursor-pointer"
        >
          <History size={20} />
        </button>
        <button
          onClick={() => onTabChange('ayarlar')}
          aria-label="Ayarlar"
          className="text-primary hover:bg-surface-container transition-colors duration-200 p-2 rounded-full flex items-center justify-center cursor-pointer"
        >
          <Settings size={20} />
        </button>
      </div>
    </nav>
  );
}
