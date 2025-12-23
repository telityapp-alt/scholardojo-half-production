
import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../core/hooks/useLanguage';
import { SupportedLanguage } from '../../core/contracts/localization';
import { ChevronDown, Check, Globe } from 'lucide-react';

const LANG_MAP: Record<SupportedLanguage, { label: string; flag: string }> = {
  en: { label: 'English', flag: '🇺🇸' },
  id: { label: 'Indonesia', flag: '🇮🇩' },
  ms: { label: 'Malaysia', flag: '🇲🇾' },
  hi: { label: 'India', flag: '🇮🇳' },
  'pt-br': { label: 'Brazil', flag: '🇧🇷' }
};

export const LanguageSwitcher: React.FC = () => {
  const { lang, switchLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const click = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', click);
    return () => document.removeEventListener('mousedown', click);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-white border-2 border-slate-200 border-b-4 rounded-xl hover:bg-slate-50 transition-all active:border-b-2 active:translate-y-[2px]"
      >
        <span className="text-lg">{LANG_MAP[lang]?.flag || '🌐'}</span>
        <ChevronDown size={14} className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-[120%] right-0 w-48 bg-white rounded-2xl border-2 border-slate-200 border-b-[6px] shadow-xl p-2 z-[200] animate-in fade-in slide-in-from-top-2 duration-200">
          {(Object.keys(LANG_MAP) as SupportedLanguage[]).map((l) => (
            <button
              key={l}
              onClick={() => { switchLanguage(l); setIsOpen(false); }}
              className={`flex items-center justify-between w-full p-3 rounded-xl text-sm font-bold transition-all ${lang === l ? 'bg-sky-50 text-sky-600' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <div className="flex items-center gap-3">
                <span>{LANG_MAP[l].flag}</span>
                <span>{LANG_MAP[l].label}</span>
              </div>
              {lang === l && <Check size={16} strokeWidth={4} className="text-sky-500" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
