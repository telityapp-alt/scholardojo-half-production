
import React, { useMemo } from 'react';
import { QuestCard } from '../types';
import { CheckCircle2, Zap, BarChart3, Target, TrendingUp, ShieldCheck } from 'lucide-react';

interface QuestAnalyticsProps {
    quests: QuestCard[];
}

export const QuestAnalytics: React.FC<QuestAnalyticsProps> = ({ quests }) => {
    const stats = useMemo(() => {
        const total = quests.length;
        const done = quests.filter(q => q.columnId === 'done').length;
        const active = total - done;
        
        // Calculate subtask completion percentage
        const allSubtasks = quests.flatMap(q => q.subtasks);
        const completedSubtasks = allSubtasks.filter(s => s.completed).length;
        const subtaskProgress = allSubtasks.length > 0 ? Math.round((completedSubtasks / allSubtasks.length) * 100) : 0;

        // Completion Rate
        const completionRate = total > 0 ? Math.round((done / total) * 100) : 0;

        return { total, done, active, subtaskProgress, completionRate };
    }, [quests]);

    const StatCard = ({ icon: Icon, color, label, value, subValue, progress }: any) => {
        const themes: any = {
            green: 'border-green-200 border-b-green-500 text-green-600 bg-green-50/30',
            blue: 'border-sky-200 border-b-sky-500 text-sky-600 bg-sky-50/30',
            purple: 'border-purple-200 border-b-purple-500 text-purple-600 bg-purple-50/30'
        };

        return (
            <div className={`flex-1 min-w-[240px] bg-white rounded-[32px] border-2 border-b-[8px] p-6 transition-all hover:-translate-y-1 ${themes[color] || themes.blue}`}>
                <div className="flex justify-between items-start mb-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border-b-4 bg-white shadow-sm`}>
                        <Icon size={20} strokeWidth={3} />
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{label}</p>
                        <h4 className="text-3xl font-black text-slate-800 leading-none">{value}</h4>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase text-slate-400">
                        <span>Efficiency</span>
                        <span className={progress > 70 ? 'text-green-500' : 'text-slate-500'}>{progress}%</span>
                    </div>
                    <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-100">
                        <div 
                            className={`h-full transition-all duration-1000 ease-out rounded-full ${color === 'green' ? 'bg-[#58cc02]' : color === 'blue' ? 'bg-[#1cb0f6]' : 'bg-[#ce82ff]'}`}
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <p className="text-[9px] font-bold text-slate-400 italic mt-1">{subValue}</p>
                </div>
            </div>
        );
    };

    return (
        <div className="mt-12 space-y-6 animate-in slide-in-from-bottom-8 duration-700">
            <div className="flex items-center gap-4 px-2">
                <div className="w-12 h-12 bg-slate-800 rounded-2xl border-b-4 border-slate-950 flex items-center justify-center text-white shadow-lg">
                    <BarChart3 size={24} />
                </div>
                <div>
                    <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tighter italic">Tactical Analytics</h2>
                    <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Real-time mission tracking and neural growth metrics.</p>
                </div>
            </div>

            <div className="flex flex-wrap gap-6">
                <StatCard 
                    icon={CheckCircle2} 
                    color="green" 
                    label="Missions Completed" 
                    value={stats.done} 
                    progress={stats.completionRate}
                    subValue={`${stats.done} Targets verified in the current cycle.`}
                />
                <StatCard 
                    icon={Zap} 
                    color="blue" 
                    label="Active Operations" 
                    value={stats.active} 
                    progress={100 - stats.completionRate}
                    subValue={`${stats.active} High-priority strikes pending execution.`}
                />
                <StatCard 
                    icon={ShieldCheck} 
                    color="purple" 
                    label="Neural Task Load" 
                    value={`${stats.subtaskProgress}%`} 
                    progress={stats.subtaskProgress}
                    subValue="Overall sub-task completion across all mission types."
                />
            </div>
            
            {/* Minimal improvement hint */}
            <div className="bg-slate-900 rounded-[28px] border-b-[8px] border-black p-5 text-white flex items-center gap-4 group">
                <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center border-b-4 border-sky-700 shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                    <TrendingUp size={20} strokeWidth={3} />
                </div>
                <div className="flex-1">
                    <p className="text-[9px] font-black text-sky-400 uppercase tracking-widest mb-0.5">Tactical Insight</p>
                    <p className="text-xs font-bold text-slate-300 leading-tight">
                        Completing <span className="text-white">Done</span> column items archives them to your Melytics foundation. Keep the board clean for maximum XP yield.
                    </p>
                </div>
            </div>
        </div>
    );
};
