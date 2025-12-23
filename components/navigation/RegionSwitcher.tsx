
import React, { useState, useRef, useEffect } from 'react';
import { useRegion } from '../../core/hooks/useRegion';
import { REGION_REGISTRY } from '../../core/contracts/regionConfig';
import { ChevronDown, Check } from 'lucide-react';

export const RegionSwitcher: React.FC = () => {
  const { regionId, switchRegion, allRegions } = useRegion();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const click = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', click);
    return () => document.removeEventListener('mousedown', click);
  }, []);

  const activeRegion = REGION_REGISTRY[regionId];

  return (
    <div className="relative" ref={ref}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-white border-2 border-slate-200 border-b-4 rounded-xl hover:bg-slate-50 transition-all active:border-b-2 active:translate-y-[2px]"
      >
        <span className="text-xl">{activeRegion?.flag || '🌐'}</span>
        <span className="hidden md:block font-black text-[11px] uppercase text-slate-600 tracking-widest ml-1">{activeRegion?.id}</span>
        <ChevronDown size={14} className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-[120%] right-0 w-64 bg-white rounded-2xl border-2 border-slate-200 border-b-[6px] shadow-xl p-2 z-[200] animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-3 py-2 border-b-2 border-slate-50 mb-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Region Settings</p>
          </div>
          {allRegions.map((r) => (
            <button
              key={r.id}
              onClick={() => { switchRegion(r.id); setIsOpen(false); }}
              className={`flex items-center justify-between w-full p-3 rounded-xl transition-all ${regionId === r.id ? 'bg-sky-50' : 'hover:bg-slate-50'}`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{r.flag}</span>
                <div className="text-left">
                    <p className={`font-black text-sm leading-none ${regionId === r.id ? 'text-sky-600' : 'text-slate-700'}`}>{r.label}</p>
                    <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tight">{r.currency.code} ({r.currency.symbol})</p>
                </div>
              </div>
              {regionId === r.id && <Check size={18} strokeWidth={4} className="text-sky-500" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
