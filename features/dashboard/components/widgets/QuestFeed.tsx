
import React from 'react';
import { QuestCard } from '../../../quest/types';
import { Clock, LayoutList, CheckCircle2, ChevronRight } from 'lucide-react';

interface QuestFeedProps {
    quests: QuestCard[];
    onNavigate: (path: string) => void;
}

export const QuestFeed: React.FC<QuestFeedProps> = ({ quests, onNavigate }) => {
    
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-black text-slate-800 tracking-tighter italic uppercase">Priority Quests</h2>
                </div>
                <button 
                    onClick={() => onNavigate('quest')}
                    className="text-sky-500 font-black uppercase text-[10px] tracking-[0.2em] cursor-pointer hover:bg-sky-50 px-4 py-2 rounded-xl transition-all border-2 border-transparent hover:border-sky-100"
                >
                    View Board
                </button>
            </div>

            <div className="space-y-4">
                {quests.length === 0 ? (
                    <div className="bg-white rounded-[40px] border-2 border-slate-200 border-b-[8px] border-dashed p-12 text-center group transition-all hover:bg-slate-50">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-slate-100">
                            <LayoutList className="w-10 h-10 text-slate-200" />
                        </div>
                        <p className="text-slate-400 font-black uppercase tracking-widest text-xs mb-6">No Tactical Objectives</p>
                        <button 
                            onClick={() => onNavigate('quest')}
                            className="bg-sky-500 text-white px-8 py-3 rounded-2xl font-black uppercase text-xs tracking-[0.2em] border-b-4 border-sky-700 active:border-b-0 active:translate-y-1 transition-all"
                        >
                            + Secure Quests
                        </button>
                    </div>
                ) : (
                    quests.map(quest => {
                        const completedSubtasks = quest.subtasks.filter(t => t.completed).length;
                        const totalSubtasks = quest.subtasks.length;
                        const progress = totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;
                        const isDone = progress === 100;
                        
                        return (
                            <div 
                                key={quest.id} 
                                onClick={() => onNavigate('quest')}
                                className={`group bg-white rounded-[32px] border-2 border-slate-200 border-b-[8px] p-5 flex items-center gap-6 cursor-pointer hover:bg-slate-50 transition-all active:border-b-2 active:translate-y-[6px] shadow-sm
                                    ${isDone ? 'border-green-200 border-b-green-500 bg-green-50/20' : 'hover:border-sky-300'}
                                `}
                            >
                                <div className={`relative w-16 h-16 rounded-2xl border-2 border-b-[4px] flex items-center justify-center shrink-0 transition-all bg-white 
                                    ${isDone ? 'border-green-300 border-b-green-500' : 'border-slate-100 border-b-slate-300'}
                                `}>
                                    <div className={`radial-progress font-black text-[11px] ${isDone ? 'text-green-500' : 'text-sky-500'}`} style={{ "--value": progress, "--size": "3.2rem", "--thickness": "4px" } as any}>
                                        {isDone ? <CheckCircle2 size={24} strokeWidth={4} /> : `${Math.round(progress)}%`}
                                    </div>
                                </div>
                                
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`text-[9px] font-black px-2 py-0.5 rounded-lg uppercase tracking-wider border ${
                                            quest.priority === 'High' 
                                            ? 'bg-red-50 text-red-500 border-red-200' 
                                            : 'bg-slate-100 text-slate-500 border-slate-200'
                                        }`}>
                                            {quest.priority}
                                        </span>
                                        {quest.deadline && (
                                            <span className="text-[9px] font-black text-slate-400 flex items-center gap-1 uppercase tracking-widest opacity-60">
                                                <Clock size={10} /> 
                                                {new Date(quest.deadline).toLocaleDateString(undefined, {month:'short', day:'numeric'})}
                                            </span>
                                        )}
                                    </div>
                                    <h4 className={`font-black text-base truncate ${isDone ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                                        {quest.title}
                                    </h4>
                                </div>
                                <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-200 flex items-center justify-center group-hover:bg-sky-100 group-hover:text-sky-500 transition-all">
                                    <ChevronRight size={20} strokeWidth={3} />
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};
