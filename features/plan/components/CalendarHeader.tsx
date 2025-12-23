import React from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalIcon } from 'lucide-react';

interface CalendarHeaderProps {
    currentDate: Date;
    onPrev: () => void;
    onNext: () => void;
    themeColor: string;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({ currentDate, onPrev, onNext, themeColor }) => {
    
    const monthName = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.getFullYear();

    const getThemeClasses = () => {
        switch(themeColor) {
            case 'green': return 'text-duo-green';
            case 'blue': return 'text-duo-blue';
            case 'purple': return 'text-duo-purple';
            default: return 'text-slate-700';
        }
    };

    return (
        <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-3xl border-2 border-slate-200 border-b-[6px]">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 border-2 border-slate-200 border-b-4">
                    <CalIcon className="w-6 h-6 stroke-[3px]" />
                </div>
                <div>
                    <h2 className={`text-2xl font-black capitalize ${getThemeClasses()}`}>
                        {monthName} {year}
                    </h2>
                    <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">
                        Your Schedule
                    </p>
                </div>
            </div>

            <div className="flex gap-2">
                <button 
                    onClick={onPrev}
                    className="w-10 h-10 rounded-xl bg-white border-2 border-slate-200 border-b-4 flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-slate-600 active:border-b-2 active:translate-y-[2px] transition-all"
                >
                    <ChevronLeft className="w-6 h-6 stroke-[3px]" />
                </button>
                <button 
                    onClick={onNext}
                    className="w-10 h-10 rounded-xl bg-white border-2 border-slate-200 border-b-4 flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-slate-600 active:border-b-2 active:translate-y-[2px] transition-all"
                >
                    <ChevronRight className="w-6 h-6 stroke-[3px]" />
                </button>
            </div>
        </div>
    );
};