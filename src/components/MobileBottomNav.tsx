import { PlusCircle, BarChart3, Settings } from 'lucide-react';

export type TabId = 'sayac' | 'istatistikler' | 'ayarlar';

interface MobileBottomNavProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export function MobileBottomNav({ activeTab, onTabChange }: MobileBottomNavProps) {
  return (
    <nav
      aria-label="Mobil navigasyon"
      className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-6 pt-2 bg-background/80 backdrop-blur-xl z-50 rounded-t-[2rem] shadow-[0px_-10px_40px_rgba(0,0,0,0.3)]"
    >
      <button
        onClick={() => onTabChange('sayac')}
        aria-label="Sayaç"
        aria-current={activeTab === 'sayac' ? 'page' : undefined}
        className={`
          flex flex-col items-center justify-center rounded-[1.5rem] px-5 py-2 transition-all
          ${activeTab === 'sayac'
            ? 'bg-primary/10 text-primary scale-110'
            : 'text-outline hover:text-primary'
          }
        `}
      >
        <PlusCircle size={24} strokeWidth={activeTab === 'sayac' ? 2.5 : 1.5} />
        <span className="text-[12px] font-medium font-body uppercase tracking-widest mt-1">Sayaç</span>
      </button>

      <button
        onClick={() => onTabChange('istatistikler')}
        aria-label="İstatistikler"
        aria-current={activeTab === 'istatistikler' ? 'page' : undefined}
        className={`
          flex flex-col items-center justify-center rounded-[1.5rem] px-5 py-2 transition-all
          ${activeTab === 'istatistikler'
            ? 'bg-primary/10 text-primary scale-110'
            : 'text-outline hover:text-primary'
          }
        `}
      >
        <BarChart3 size={24} strokeWidth={activeTab === 'istatistikler' ? 2.5 : 1.5} />
        <span className="text-[12px] font-medium font-body uppercase tracking-widest mt-1">İstatistikler</span>
      </button>

      <button
        onClick={() => onTabChange('ayarlar')}
        aria-label="Ayarlar"
        aria-current={activeTab === 'ayarlar' ? 'page' : undefined}
        className={`
          flex flex-col items-center justify-center rounded-[1.5rem] px-5 py-2 transition-all
          ${activeTab === 'ayarlar'
            ? 'bg-primary/10 text-primary scale-110'
            : 'text-outline hover:text-primary'
          }
        `}
      >
        <Settings size={24} strokeWidth={activeTab === 'ayarlar' ? 2.5 : 1.5} />
        <span className="text-[12px] font-medium font-body uppercase tracking-widest mt-1">Ayarlar</span>
      </button>
    </nav>
  );
}
