import React from 'react';
import { CalendarItem } from '../types';
import { Calendar, Clock, Target, Zap, Briefcase, GraduationCap, CheckCircle2 } from 'lucide-react';
import { DuoIcon, DuoColor } from '../../../components/ui/DuoIcon';

interface CalendarSidebarProps {
    selectedDate: Date;
    items: CalendarItem[];
    onItemClick: (item: CalendarItem) => void;
}

export const CalendarSidebar: React.FC<CalendarSidebarProps> = ({ selectedDate, items, onItemClick }) => {
    
    const ICONS: any = { Calendar, Clock, Target, Zap, Briefcase, GraduationCap };

    const dateLabel = selectedDate.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
    const isToday = new Date().toDateString() === selectedDate.toDateString();

    return (
        <div className="w-full xl:w-96 shrink-0 flex flex-col gap-6 animate-in slide-in-from-right-4 duration-500">
            {/* Header Block */}
            <div className={`
                p-6 rounded-[32px] border-b-[8px] relative overflow-hidden text-white transition-colors
                ${isToday ? 'bg-[#58cc02] border-[#46a302]' : 'bg-slate-800 border-slate-950'}
            `}>
                <div className="relative z-10">
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-1">
                        {isToday ? "Today's Agenda" : "Selected Date"}
                    </p>
                    <h3 className="text-2xl font-black leading-tight mb-2">{dateLabel}</h3>
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-white/20">
                        <Target className="w-4 h-4 text-white" />
                        <span className="text-xs font-bold">{items.length} Activities</span>
                    </div>
                </div>
                {/* Background Decoration */}
                <div className="absolute -right-6 -bottom-6 opacity-20 rotate-12">
                    <Calendar className="w-32 h-32" />
                </div>
            </div>

            {/* List Blocks */}
            <div className="flex-1 space-y-3">
                {items.length === 0 ? (
                    <div className="bg-slate-100 rounded-[32px] border-4 border-dashed border-slate-200 p-8 text-center flex flex-col items-center justify-center min-h-[300px]">
                        <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mb-6 shadow-sm border-b-4 border-slate-200">
                             <Zap className="w-10 h-10 text-slate-300 fill-slate-100" />
                        </div>
                        <h4 className="font-black text-slate-400 text-xl">No Plans</h4>
                        <p className="font-bold text-slate-400 text-sm mt-2 max-w-[200px]">
                            Looks like a free day! Use it to rest or catch up.
                        </p>
                    </div>
                ) : (
                    items.map((item) => {
                        const Icon = ICONS[item.metadata.icon] || Zap;
                        const color: DuoColor = item.metadata.color as DuoColor;
                        const isDone = item.metadata.status === 'Completed';
                        
                        return (
                            <button 
                                key={item.id}
                                onClick={() => onItemClick(item)}
                                className={`
                                    w-full text-left bg-white p-4 rounded-3xl border-2 border-slate-200 border-b-[6px] 
                                    hover:-translate-y-1 hover:border-b-[10px] hover:border-slate-300
                                    active:border-b-2 active:translate-y-[4px]
                                    transition-all flex items-center gap-4 group
                                    ${isDone ? 'opacity-60 bg-slate-50' : ''}
                                `}
                            >
                                <div className="relative">
                                    <DuoIcon icon={Icon} color={isDone ? 'gray' : color} size="md" />
                                    {isDone && (
                                        <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full border-2 border-white p-0.5">
                                            <CheckCircle2 className="w-3 h-3 text-white" />
                                        </div>
                                    )}
                                </div>
                                
                                <div className="flex-1 min-w-0">
                                    <h4 className={`font-black text-sm truncate ${isDone ? 'text-slate-500 line-through' : 'text-slate-700'}`}>
                                        {item.title}
                                    </h4>
                                    <p className="text-xs font-bold text-slate-400 truncate mt-1">{item.subtitle}</p>
                                </div>

                                <div className={`
                                    text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-lg shrink-0
                                    ${item.type === 'DEADLINE' ? 'bg-red-100 text-red-500' : 'bg-slate-100 text-slate-500'}
                                `}>
                                    {item.metadata.status}
                                </div>
                            </button>
                        );
                    })
                )}
            </div>
        </div>
    );
};