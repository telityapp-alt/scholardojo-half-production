import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface Option {
    id: string;
    label: string;
}

interface SuperDropdownProps {
    label: string;
    icon: React.ElementType;
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    color?: 'blue' | 'green' | 'purple' | 'orange' | 'red';
}

export const SuperDropdown: React.FC<SuperDropdownProps> = ({ 
    label, 
    icon: Icon, 
    options, 
    value, 
    onChange,
    color = 'blue' 
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Find selected label for display
    const selectedLabel = options.find(o => o.id === value)?.label || label;

    // Theme Logic
    const getTheme = () => {
        switch(color) {
            case 'green': return { bg: 'bg-duo-green', border: 'border-duo-greenDark', text: 'text-duo-green', ring: 'focus:ring-duo-green' };
            case 'purple': return { bg: 'bg-duo-purple', border: 'border-duo-purpleDark', text: 'text-duo-purple', ring: 'focus:ring-duo-purple' };
            case 'orange': return { bg: 'bg-duo-orange', border: 'border-orange-600', text: 'text-duo-orange', ring: 'focus:ring-duo-orange' };
            case 'red': return { bg: 'bg-duo-red', border: 'border-duo-redDark', text: 'text-duo-red', ring: 'focus:ring-duo-red' };
            default: return { bg: 'bg-duo-blue', border: 'border-duo-blueDark', text: 'text-duo-blue', ring: 'focus:ring-duo-blue' };
        }
    };
    const theme = getTheme();

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative w-full z-20" ref={dropdownRef}>
            {/* 
               THE TRIGGER (BUTTON)
            */}
            <button 
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    relative w-full bg-white 
                    border-2 ${isOpen ? 'border-slate-300' : 'border-slate-200'} ${isOpen ? 'border-b-2 translate-y-[2px]' : 'border-b-4'}
                    rounded-2xl flex items-center p-2
                    transition-all duration-150
                    hover:bg-slate-50 hover:border-slate-300
                    active:border-b-2 active:translate-y-[2px]
                    cursor-pointer text-left
                `}
            >
                {/* ICON BLOCK */}
                <div className={`
                    w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mr-3
                    border-b-4 text-white transition-all
                    ${theme.bg} ${theme.border}
                    ${isOpen ? 'border-b-0 translate-y-[2px]' : ''}
                `}>
                    <Icon className="w-5 h-5 stroke-[2.5]" />
                </div>

                {/* TEXT STACK */}
                <div className="flex-1 flex flex-col justify-center overflow-hidden">
                     <span className="text-[10px] font-bold text-slate-400 leading-tight mb-0.5 capitalize">
                        {label}
                     </span>
                     <span className="text-sm font-bold leading-tight truncate capitalize text-slate-700">
                        {selectedLabel}
                     </span>
                </div>

                {/* CHEVRON */}
                <div className="pr-2">
                     <ChevronDown className={`h-5 w-5 text-slate-400 stroke-[3] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </div>
            </button>

            {/* 
               THE DROPDOWN MENU (POPOVER)
               Completely custom, no native select.
            */}
            {isOpen && (
                <div className="absolute top-[115%] left-0 w-full bg-white rounded-2xl border-2 border-slate-200 border-b-[6px] shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200 flex flex-col gap-1 max-h-60 overflow-y-auto">
                    {options.map((opt) => {
                        const isSelected = opt.id === value;
                        return (
                            <button
                                key={opt.id}
                                onClick={() => {
                                    onChange(opt.id);
                                    setIsOpen(false);
                                }}
                                className={`
                                    flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-bold transition-colors capitalize
                                    ${isSelected 
                                        ? `bg-slate-100 ${theme.text}` 
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                                    }
                                `}
                            >
                                <span>{opt.label}</span>
                                {isSelected && <Check className="w-4 h-4 stroke-[4]" />}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};