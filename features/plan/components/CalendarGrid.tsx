import React from 'react';
import { CalendarItem } from '../types';
import { Zap, Target, Calendar as CalIcon, Briefcase, Star, Check } from 'lucide-react';

interface CalendarGridProps {
    currentDate: Date;
    selectedDate: Date;
    items: CalendarItem[];
    onSelectDate: (date: Date) => void;
    themeColor: string;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({ currentDate, selectedDate, items, onSelectDate, themeColor }) => {
    // Math to build the grid
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 = Sunday

    // Days of Week Header
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Generate Slots
    const slots = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
        slots.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
        slots.push(new Date(year, month, i));
    }

    const getItemsForDate = (date: Date) => {
        return items.filter(item => 
            item.date.getDate() === date.getDate() &&
            item.date.getMonth() === date.getMonth() &&
            item.date.getFullYear() === date.getFullYear()
        );
    };

    const isSelected = (date: Date) => {
        return date.getDate() === selectedDate.getDate() &&
               date.getMonth() === selectedDate.getMonth() &&
               date.getFullYear() === selectedDate.getFullYear();
    };

    const isToday = (date: Date) => {
        const today = new Date();
        return date.getDate() === today.getDate() &&
               date.getMonth() === today.getMonth() &&
               date.getFullYear() === today.getFullYear();
    };

    // Theme Logic for Active State
    const getActiveStyle = () => {
         switch(themeColor) {
            case 'green': return 'bg-[#58cc02] border-[#46a302] text-white';
            case 'blue': return 'bg-[#1cb0f6] border-[#1899d6] text-white';
            case 'purple': return 'bg-[#ce82ff] border-[#a855f7] text-white';
            case 'orange': return 'bg-[#ff9600] border-[#e58700] text-white';
            default: return 'bg-slate-700 border-slate-900 text-white';
        }
    };

    // Icon Mapping for Tiny Indicators
    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'QUEST': return { icon: Zap, color: 'text-orange-400' };
            case 'DEADLINE': return { icon: Target, color: 'text-red-400' };
            case 'EVENT': return { icon: CalIcon, color: 'text-purple-400' };
            case 'PROGRAM': return { icon: Briefcase, color: 'text-blue-400' };
            default: return { icon: Star, color: 'text-slate-400' };
        }
    };

    return (
        <div className="bg-white rounded-[32px] border-2 border-slate-200 border-b-[8px] p-6 shadow-sm">
            {/* Days Header */}
            <div className="grid grid-cols-7 gap-3 mb-4">
                {daysOfWeek.map(d => (
                    <div key={d} className="text-center text-xs font-black uppercase text-slate-300 tracking-widest py-2">
                        {d}
                    </div>
                ))}
            </div>
            
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2 md:gap-3">
                {slots.map((date, index) => {
                    // EMPTY SLOT
                    if (!date) {
                        return (
                            <div key={`empty-${index}`} className="aspect-square rounded-2xl border-2 border-slate-100/50 bg-slate-50/30"></div>
                        );
                    }

                    const active = isSelected(date);
                    const today = isToday(date);
                    const dayItems = getItemsForDate(date);
                    const hasItems = dayItems.length > 0;

                    // DYNAMIC CLASSES
                    let containerClasses = `
                        relative aspect-[4/5] md:aspect-square flex flex-col items-center justify-between py-2 md:py-3 px-1
                        rounded-2xl border-2 border-b-[5px] cursor-pointer
                        transition-all duration-100 ease-in-out
                        active:border-b-2 active:translate-y-[3px]
                    `;
                    
                    if (active) {
                        // SELECTED STATE (Solid Color)
                        containerClasses += ` ${getActiveStyle()} shadow-inner`;
                    } else if (today) {
                        // TODAY STATE (Highlighted)
                        containerClasses += ` bg-sky-50 border-sky-300 text-sky-600 hover:bg-sky-100 hover:border-b-[6px]`;
                    } else if (hasItems) {
                        // ITEMS STATE (White with bold border)
                        containerClasses += ` bg-white border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-b-[8px] hover:-translate-y-0.5`;
                    } else {
                        // EMPTY STATE (Subtle)
                        containerClasses += ` bg-white border-slate-200 text-slate-400 hover:border-slate-300 hover:border-b-[6px] hover:-translate-y-0.5`;
                    }

                    return (
                        <button
                            key={index}
                            onClick={() => onSelectDate(date)}
                            className={containerClasses}
                        >
                            {/* Today Label */}
                            {today && !active && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-sky-500 text-white text-[8px] font-black uppercase px-1.5 py-0.5 rounded-md tracking-wider shadow-sm z-10 whitespace-nowrap">
                                    Today
                                </div>
                            )}

                            {/* Date Number */}
                            <span className={`text-sm md:text-lg font-black ${active ? 'text-white' : ''} leading-none`}>
                                {date.getDate()}
                            </span>
                            
                            {/* Activity Indicators */}
                            <div className="flex gap-1 h-4 items-end">
                                {dayItems.length > 0 ? (
                                    dayItems.slice(0, 3).map((item, i) => {
                                        const { icon: Icon, color } = getTypeIcon(item.type);
                                        const iconColor = active ? 'text-white' : color;
                                        
                                        return (
                                            <div key={i} className={`transform transition-transform ${active ? '' : 'hover:scale-125'}`}>
                                                <Icon className={`w-3 h-3 md:w-3.5 md:h-3.5 ${iconColor} fill-current stroke-[3]`} />
                                            </div>
                                        );
                                    })
                                ) : (
                                    // Placeholder dot to keep spacing consistent
                                    <div className="w-1 h-1"></div>
                                )}
                                {dayItems.length > 3 && (
                                    <span className={`text-[8px] font-black leading-none ${active ? 'text-white' : 'text-slate-400'}`}>+</span>
                                )}
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};