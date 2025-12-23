
import React from 'react';
import { Trophy, Crown, ArrowUp, TrendingUp, Shield } from 'lucide-react';

interface LeaderboardWidgetProps {
    user: { name: string; avatarSeed?: string };
    rank: number;
    totalApplicants: number;
    percentile: number;
    standingLabel?: string;
    trend?: 'STABLE' | 'UP';
}

export const LeaderboardWidget: React.FC<LeaderboardWidgetProps> = ({ 
    user, 
    rank, 
    totalApplicants, 
    percentile, 
    standingLabel = "Ninja",
    trend = 'STABLE' 
}) => {
    const isRankingUp = trend === 'UP';
    
    const getFakeUser = (offset: number) => {
        const seed = (rank + offset) * 12345;
        // Logic: if current user is Top 10%, neighbor is Top 9% or 11%
        const neighborPercentile = Math.max(1, Math.min(99, percentile + offset));
        return {
            name: `Ninja ${neighborPercentile}%`,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`,
            percentText: `Top ${neighborPercentile}%`
        };
    };

    const topUsers = [
        { ...getFakeUser(-2), isMe: false },
        { ...user, name: 'You', avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.avatarSeed || 'Felix'}`, percentText: `Top ${percentile}%`, isMe: true }, 
        { ...getFakeUser(2), isMe: false }
    ];

    return (
        <div className="bg-white rounded-[32px] border-2 border-slate-200 border-b-[8px] p-6 h-full flex flex-col relative overflow-hidden transition-all group">
            <div className={`absolute -top-10 -right-10 w-40 h-40 blur-[60px] rounded-full opacity-40 pointer-events-none transition-colors duration-500 ${isRankingUp ? 'bg-[#58cc02]' : 'bg-sky-200'}`}></div>
            
            <div className="relative z-10 flex justify-between items-start mb-6">
                <div>
                    <div className={`flex items-center gap-2 mb-1 transition-colors ${isRankingUp ? 'text-[#58cc02]' : 'text-slate-400'}`}>
                        {isRankingUp ? <ArrowUp className="w-5 h-5 stroke-[4px] animate-bounce" /> : <Trophy className="w-5 h-5 fill-current stroke-[2.5px]" />}
                        <span className="text-[10px] font-black uppercase tracking-widest">{isRankingUp ? 'Melesat Naik!' : 'Global Standing'}</span>
                    </div>
                    <h3 className={`text-4xl font-black tracking-tight leading-none transition-all duration-300 ${isRankingUp ? 'text-[#58cc02] scale-110 origin-left' : 'text-slate-800'}`}>
                        Top {percentile}%
                    </h3>
                    <p className="text-[10px] font-black text-slate-400 mt-1 uppercase tracking-wider">{standingLabel}</p>
                </div>
                <div className={`px-3 py-2 rounded-xl border-2 text-center shadow-sm transition-colors bg-white ${isRankingUp ? 'border-[#58cc02] text-[#58cc02]' : 'border-slate-200 text-slate-500'}`}>
                    <Shield size={16} className="mx-auto mb-1" strokeWidth={3} />
                    <p className="text-[8px] font-black uppercase leading-none">Tier</p>
                </div>
            </div>

            <div className="relative z-10 flex-1 flex flex-col justify-center space-y-3">
                {topUsers.map((u, i) => (
                    <div key={i} className={`flex items-center gap-4 p-3 rounded-2xl border-2 transition-all duration-500 transform ${u.isMe ? `shadow-lg z-10 translate-x-2 ${isRankingUp ? 'bg-[#58cc02] border-[#46a302] scale-105' : 'bg-white border-slate-200 scale-100'}` : 'bg-slate-50 border-slate-100 opacity-60 scale-95'}`}>
                        <span className={`font-black w-14 text-right text-[10px] uppercase transition-colors ${u.isMe ? (isRankingUp ? 'text-white' : 'text-slate-700') : 'text-slate-400'}`}>{u.percentText}</span>
                        <div className={`w-10 h-10 rounded-xl bg-white border-2 overflow-hidden shrink-0 ${u.isMe ? 'border-transparent' : 'border-slate-200'}`}><img src={u.avatar} alt="" className="w-full h-full object-cover" /></div>
                        <div className="flex-1">
                            <p className={`font-black text-sm transition-colors ${u.isMe ? (isRankingUp ? 'text-white' : 'text-slate-800') : 'text-slate-500'}`}>{u.name}</p>
                            {u.isMe && <p className={`text-[9px] font-bold uppercase tracking-wider transition-colors ${isRankingUp ? 'text-green-100' : 'text-slate-400'}`}>Target Secured</p>}
                        </div>
                        {u.isMe && <Crown className="w-5 h-5 text-yellow-400 fill-yellow-400 animate-pulse" />}
                    </div>
                ))}
            </div>

            <div className="relative z-10 mt-auto pt-6 border-t-2 border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2 text-green-500 text-xs font-black"><TrendingUp className="w-4 h-4 stroke-[3px]" /><span>Live Matrix</span></div>
                <button className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors">Elite Board</button>
            </div>
        </div>
    );
};
