import React from 'react';
import { Lock } from 'lucide-react';
import { TabConfig } from '../../core/types/navigation';

interface LockedTabTooltipProps {
  tab: TabConfig;
  currentLevel: number;
}

export const LockedTabTooltip: React.FC<LockedTabTooltipProps> = ({ tab, currentLevel }) => {
  return (
    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 bg-slate-800 text-white text-xs rounded-xl p-3 shadow-xl z-50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
      <div className="flex items-center gap-2 mb-2 font-black uppercase tracking-wide text-red-400">
        <Lock size={12} />
        Locked
      </div>
      <p className="mb-2 text-slate-300">Reach Level {tab.levelRequired} to unlock {tab.label}.</p>
      
      {/* Mini Progress Bar */}
      <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
        <div 
          className="bg-slate-500 h-full rounded-full" 
          style={{ width: `${(currentLevel / tab.levelRequired) * 100}%` }}
        ></div>
      </div>
      <div className="flex justify-between mt-1 text-[10px] text-slate-500 font-bold">
        <span>Lvl {currentLevel}</span>
        <span>Lvl {tab.levelRequired}</span>
      </div>
      
      {/* Arrow */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-800"></div>
    </div>
  );
};
