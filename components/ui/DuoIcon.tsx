import React from 'react';
import { LucideIcon } from 'lucide-react';

export type DuoColor = 'green' | 'blue' | 'purple' | 'orange' | 'red' | 'gray' | 'sky' | 'indigo' | 'pink';

interface DuoIconProps {
    icon: LucideIcon;
    color?: DuoColor;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
}

export const DuoIcon: React.FC<DuoIconProps> = ({ 
    icon: Icon, 
    color = 'gray', 
    size = 'md',
    className = ''
}) => {

    const getSize = () => {
        switch(size) {
            case 'sm': return 'w-8 h-8 rounded-lg border-b-[3px]';
            case 'md': return 'w-10 h-10 rounded-xl border-b-4';
            case 'lg': return 'w-12 h-12 rounded-2xl border-b-4';
            case 'xl': return 'w-16 h-16 rounded-2xl border-b-[6px]';
            default: return 'w-10 h-10 rounded-xl border-b-4';
        }
    };

    const getTheme = () => {
        switch(color) {
            case 'green': return 'bg-duo-green border-duo-greenDark text-white';
            case 'blue': return 'bg-duo-blue border-duo-blueDark text-white';
            case 'purple': return 'bg-duo-purple border-duo-purpleDark text-white';
            case 'orange': return 'bg-duo-orange border-orange-600 text-white';
            case 'red': return 'bg-duo-red border-duo-redDark text-white';
            case 'sky': return 'bg-sky-400 border-sky-600 text-white';
            case 'indigo': return 'bg-indigo-500 border-indigo-700 text-white';
            case 'pink': return 'bg-pink-500 border-pink-700 text-white';
            default: return 'bg-slate-100 border-slate-300 text-slate-400';
        }
    };

    const iconSize = size === 'sm' ? 16 : size === 'lg' ? 24 : size === 'xl' ? 32 : 20;

    return (
        <div className={`
            flex items-center justify-center shrink-0 border-2 border-transparent
            ${getSize()}
            ${getTheme()}
            ${className}
        `}>
            <Icon size={iconSize} strokeWidth={3} />
        </div>
    );
};