
import React from 'react';
import { Target, Zap, Award, TrendingUp, GraduationCap } from 'lucide-react';
import { useLanguage } from '../../../../core/hooks/useLanguage';

interface StatsRowProps {
    xp: number;
    activeQuests: number;
    totalApps: number;
    submittedApps: number;
    gpa?: {
        current: number;
        max: number;
    };
    labels: {
        apps: string;
        tracker: string;
    }
}

export const StatsRow: React.FC<StatsRowProps> = ({ xp, activeQuests, totalApps, submittedApps, gpa, labels }) => {
    const { t } = useLanguage();
    
    const StatCard = ({ icon: Icon, color, value, label, sub, progress }: any) => {
        const colorStyles: any = {
            yellow: 'bg-duo-orange border-orange-600',
            blue: 'bg-duo-blue border-duo-blueDark',
            green: 'bg-duo-green border-duo-greenDark',
            sky: 'bg-sky-500 border-sky-700'
        };

        return (
            <div className="bg-white rounded-[32px] border-2 border-slate-200 border-b-[8px] p-6 flex flex-row items-center gap-5 hover:border-b-[10px] hover:-translate-y-1 active:border-b-2 active:translate-y-[6px] transition-all cursor-pointer group h-full">
                <div className={`w-16 h-16 rounded-2xl border-b-[5px] flex items-center justify-center shrink-0 ${colorStyles[color]} shadow-sm group-active:border-b-0 group-active:translate-y-[5px] transition-all`}>
                    <Icon className="w-8 h-8 text-white fill-white/10 stroke-[3px]" />
                </div>
                <div className="min-w-0 flex-1">
                    <h3 className="text-3xl font-black text-slate-700 leading-none mb-1.5">{value}</h3>
                    <p className="text-slate-400 font-black uppercase text-[10px] tracking-[0.2em] mb-1 truncate">{label}</p>
                    {progress !== undefined ? (
                        <div className="w-full h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden border border-slate-50">
                            <div className="h-full bg-sky-400 rounded-full transition-all duration-1000" style={{ width: `${progress}%` }}></div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-1.5">
                            {sub.icon && <sub.icon className="w-3 h-3 text-duo-green" strokeWidth={4} />}
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider truncate">{sub.text}</p>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
                icon={Target} 
                color="yellow" 
                value={xp.toLocaleString()} 
                label="Total XP" 
                sub={{ text: "Mission Power" }} 
            />
            {gpa && (
                <StatCard 
                    icon={GraduationCap} 
                    color="sky" 
                    value={gpa.current.toFixed(2)} 
                    label={`GPA / ${gpa.max.toFixed(1)}`}
                    progress={(gpa.current / gpa.max) * 100}
                />
            )}
            <StatCard 
                icon={Zap} 
                color="blue" 
                value={activeQuests} 
                label={t.dashboard.activeQuests} 
                sub={{ text: "Tactical Load" }} 
            />
            <StatCard 
                icon={Award} 
                color="green" 
                value={totalApps} 
                label={labels.apps} 
                sub={{ icon: TrendingUp, text: `${submittedApps} Secured` }} 
            />
        </div>
    );
};
