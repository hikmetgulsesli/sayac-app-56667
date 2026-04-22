import { useState, useEffect } from 'react';
import { useCounter } from '@/hooks/useCounter';
import { CounterDisplay } from '@/components/CounterDisplay';
import { CounterControls } from '@/components/CounterControls';
import { HistoryList } from '@/components/HistoryList';
import { ThemeToggle } from '@/components/ThemeToggle';
import { MobileBottomNav, TabId } from '@/components/MobileBottomNav';
import { DesktopNav } from '@/components/DesktopNav';
import { loadTheme, saveTheme } from '@/utils/storage';

const DAILY_GOAL = 100;

function App() {
  const { count, history, increment, decrement, reset } = useCounter();
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeTab, setActiveTab] = useState<TabId>('sayac');

  useEffect(() => {
    const saved = loadTheme();
    setTheme(saved);
    document.documentElement.classList.toggle('dark', saved === 'dark');
    document.documentElement.classList.toggle('light', saved === 'light');
  }, []);

  const handleThemeToggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    saveTheme(next);
    document.documentElement.classList.toggle('dark', next === 'dark');
    document.documentElement.classList.toggle('light', next === 'light');
  };

  const progress = Math.min((count / DAILY_GOAL) * 100, 100);

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background font-body antialiased selection:bg-primary-container selection:text-on-primary-container">
      {/* Desktop Nav */}
      <DesktopNav
        theme={theme}
        onThemeToggle={handleThemeToggle}
        onTabChange={setActiveTab}
        activeTab={activeTab}
      />

      {/* Mobile Header */}
      <header className="md:hidden flex justify-between items-center w-full px-6 h-16 bg-surface-container-low">
        <div className="text-2xl font-bold tracking-tighter text-on-surface font-display">SAYAÇ</div>
        <ThemeToggle theme={theme} onToggle={handleThemeToggle} />
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col md:flex-row max-w-screen-xl mx-auto w-full p-4 md:p-8 gap-8 pb-32 md:pb-8">
        {activeTab === 'sayac' && (
          <>
            {/* Left Column: Counter */}
            <section className="flex-1 flex flex-col items-center justify-center bg-surface-container-low rounded-xl p-8 md:p-12 relative overflow-hidden group">
              <div className="absolute -top-32 -left-32 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-700" />
              <CounterDisplay value={count} />
              <CounterControls
                onIncrement={increment}
                onDecrement={decrement}
                onReset={reset}
              />
            </section>

            {/* Right Column: Goal + History */}
            <aside className="w-full md:w-96 flex flex-col gap-6">
              {/* Quick Stats Card */}
              <div className="bg-surface-container rounded-lg p-6">
                <h3 className="font-display font-semibold text-on-surface text-lg mb-4">Bugünkü Hedef</h3>
                <div className="flex items-end gap-2 mb-2">
                  <span className="font-display text-3xl font-bold text-primary">{count}</span>
                  <span className="font-body text-on-surface-variant mb-1">/ {DAILY_GOAL}</span>
                </div>
                <div className="w-full bg-surface-container-highest rounded-full h-2 mb-2 overflow-hidden">
                  <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
                </div>
                <p className="font-body text-sm text-on-surface-variant text-right">
                  {Math.round(progress)}% Tamamlandı
                </p>
              </div>

              {/* History */}
              <div className="bg-surface-container/60 backdrop-blur-xl rounded-lg p-6 flex-grow border border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.12)] flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display font-semibold text-on-surface text-lg flex items-center gap-2">
                    <span className="text-primary-container">Görü</span>
                    Geçmiş
                  </h3>
                </div>
                <HistoryList entries={history} />
              </div>
            </aside>
          </>
        )}

        {activeTab === 'istatistikler' && (
          <div className="flex-1 flex flex-col items-center justify-center">
            <h2 className="font-display text-2xl font-bold text-on-surface mb-4">İstatistikler</h2>
            <p className="font-body text-on-surface-variant">İstatistikler yakında eklenecektir.</p>
          </div>
        )}

        {activeTab === 'ayarlar' && (
          <div className="flex-1 flex flex-col items-center justify-center">
            <h2 className="font-display text-2xl font-bold text-on-surface mb-4">Ayarlar</h2>
            <p className="font-body text-on-surface-variant">Ayarlar sayfası yakında eklenecektir.</p>
          </div>
        )}
      </main>

      {/* Mobile Bottom Nav */}
      <MobileBottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default App;
