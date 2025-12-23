import React, { useState } from 'react';
import { DomainConfig } from '../../../core/contracts/domainConfig';
import { AICompanion } from './AICompanion';
import { Bot } from 'lucide-react';

interface SenseiCardProps {
  config: DomainConfig;
}

export const SenseiCard: React.FC<SenseiCardProps> = ({ config }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Theme logic for the TRIGGER BUTTON
  const getTheme = () => {
    switch(config.theme) {
        case 'green': return { bg: 'bg-[#58cc02]', border: 'border-[#46a302]', shadow: 'shadow-green-900/20' };
        case 'blue': return { bg: 'bg-[#1cb0f6]', border: 'border-[#1899d6]', shadow: 'shadow-blue-900/20' };
        case 'purple': return { bg: 'bg-[#ce82ff]', border: 'border-[#a855f7]', shadow: 'shadow-purple-900/20' };
        default: return { bg: 'bg-slate-700', border: 'border-slate-900', shadow: 'shadow-slate-900/20' };
    }
  }
  const theme = getTheme();

  return (
    <>
      {/* TRIGGER BUTTON */}
      {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className={`
                fixed bottom-6 right-6 z-[9999]
                w-16 h-16 rounded-2xl
                ${theme.bg} ${theme.border} border-b-[6px]
                flex items-center justify-center
                text-white shadow-2xl hover:scale-110 hover:-rotate-3 active:scale-95 active:border-b-0 active:translate-y-[6px]
                transition-all duration-300 ease-out group
            `}
          >
              <div className="relative">
                 <Bot size={32} strokeWidth={2.5} className="group-hover:animate-bounce" />
                 <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full border-4 border-white flex items-center justify-center">
                    <span className="text-[10px] font-black">1</span>
                 </div>
              </div>
          </button>
      )}

      {/* POPOVER CARD */}
      {isOpen && (
        <div className={`
            fixed bottom-6 right-6 z-[9999]
            w-[380px] h-[600px] max-w-[calc(100vw-32px)] max-h-[calc(100vh-100px)]
            rounded-[32px] border-4 border-slate-200 border-b-[12px]
            shadow-2xl flex flex-col overflow-hidden
            animate-in slide-in-from-bottom-20 zoom-in-95 duration-300 ease-out origin-bottom-right bg-white
        `}>
            {/* 
                AICompanion expects to fill the parent.
                We pass context (domain id) and onClose.
            */}
            <AICompanion 
                context={config.id} 
                onClose={() => setIsOpen(false)} 
                mode="WIDGET"
            />
        </div>
      )}
    </>
  );
};