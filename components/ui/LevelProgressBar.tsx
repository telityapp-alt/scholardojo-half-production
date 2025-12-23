import React from 'react';
import { Crown } from 'lucide-react';

interface LevelProgressBarProps {
  level: number;
  xp: number;
  xpToNext: number;
}

export const LevelProgressBar: React.FC<LevelProgressBarProps> = ({ level, xp, xpToNext }) => {
  // Simple linear progress calc for visualization: (100 - xpToNext) / 100
  const progressPercent = 100 - xpToNext; 

  return (
    <div className="flex items-center gap-3 bg-white border-2 border-slate-200 rounded-2xl px-3 py-1.5 shadow-sm">
      <div className="relative">
          <Crown className="text-amber-400 fill-amber-400 w-6 h-6" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-black text-white">
              {level}
          </div>
      </div>
      
      <div className="flex flex-col w-24">
          <div className="flex justify-between text-[9px] font-black uppercase text-slate-400 mb-0.5">
              <span>Lvl {level}</span>
              <span>{xp} XP</span>
          </div>
          <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-100">
              <div 
                  className="h-full bg-amber-400 rounded-full" 
                  style={{ width: `${progressPercent}%` }}
              ></div>
          </div>
      </div>
    </div>
  );
};
