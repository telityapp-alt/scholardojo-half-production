
import React, { useState } from 'react';
import { DomainConfig } from '../../../core/contracts/domainConfig';
import { SenseiMasterView } from './SenseiMasterView';
import { Bot, Sparkles } from 'lucide-react';

interface SenseiTriggerProps {
  config: DomainConfig;
}

export const SenseiTrigger: React.FC<SenseiTriggerProps> = ({ config }) => {
  const [isOpen, setIsOpen] = useState(false);

  const getTheme = () => {
    switch(config.theme) {
        case 'green': return { bg: 'bg-[#58cc02]', border: 'border-[#46a302]' };
        case 'blue': return { bg: 'bg-[#1cb0f6]', border: 'border-[#1899d6]' };
        case 'orange': return { bg: 'bg-[#ff9600]', border: 'border-[#cb7700]' };
        default: return { bg: 'bg-slate-700', border: 'border-slate-900' };
    }
  }
  const theme = getTheme();

  return (
    <>
      {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className={`
                fixed bottom-6 right-6 z-[1000]
                h-14 rounded-2xl px-5
                ${theme.bg} ${theme.border} border-b-[6px]
                flex items-center gap-3
                text-white shadow-2xl hover:scale-105 active:scale-95 active:border-b-0 active:translate-y-[6px]
                transition-all duration-300 group
            `}
          >
              <div className="relative">
                 <Bot size={24} strokeWidth={3} className="group-hover:rotate-6 transition-transform" />
                 <div className="absolute -top-3 -right-3 w-5 h-5 bg-red-500 rounded-full border-[3px] border-white flex items-center justify-center">
                    <Sparkles size={8} fill="currentColor" className="animate-pulse" />
                 </div>
              </div>
              <div className="text-left leading-none hidden sm:block">
                  <p className="text-[10px] font-black uppercase tracking-widest leading-none mb-1">Sensei AI</p>
                  <p className="font-black text-xs italic tracking-tighter">Consult</p>
              </div>
          </button>
      )}

      {isOpen && (
          <SenseiMasterView 
            initialDomain={config.id} 
            onClose={() => setIsOpen(false)} 
          />
      )}
    </>
  );
};
