
import React, { useMemo } from 'react';
import { UserProfile } from '../../../../core/access/userAccess';
import { Trophy, Shield, ChevronUp } from 'lucide-react';

interface LeagueWidgetProps {
    user: UserProfile;
}

export const LeagueWidget: React.FC<LeagueWidgetProps> = ({ user }) => {
    // Generate deterministic rival data based on user's real XP
    const leaderboard = useMemo(() => {
        return [
            { rank: 1, name: 'Grandmaster Ninja', xp: user.xp + 850, isMe: false, seed: 'A' },
            { rank: 2, name: 'Swift Operative', xp: user.xp + 230, isMe: false, seed: 'B' },
            { rank: 3, name: user.name, xp: user.xp, isMe: true, seed: user.avatarSeed }, 
            { rank: 4, name: 'Silent Scout', xp: Math.max(0, user.xp - 140), isMe: false, seed: 'C' },
            { rank: 5, name: 'Shadow Apprentice', xp: Math.max(0, user.xp - 380), isMe: false, seed: 'D' },
        ];
    }, [user.xp, user.name, user.avatarSeed]);

    const leagueTheme = useMemo(() => {
        switch(user.league) {
            case 'Diamond': return { text: 'text-sky-600', bg: 'bg-sky-50', border: 'border-sky-200', iconColor: 'text-sky-400' };
            case 'Gold': return { text: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200', iconColor: 'text-yellow-400' };
            case 'Silver': return { text: 'text-slate-500', bg: 'bg-slate-50', border: 'border-slate-200', iconColor: 'text-slate-400' };
            default: return { text: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200', iconColor: 'text-orange-400' };
        }
    }, [user.league]);

    return (
        <div className="bg-white rounded-[40px] border-2 border-slate-200 border-b-[12px] p-6 shadow-sm overflow-hidden relative group">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-900 rounded-xl border-b-4 border-black flex items-center justify-center text-white shadow-lg">
                        <Trophy size={20} strokeWidth={3} />
                    </div>
                    <h3 className="font-black text-xl text-slate-700 tracking-tight">Leagues</h3>
                </div>
                <div className={`px-4 py-1.5 rounded-xl border-2 border-b-4 font-black text-[10px] uppercase tracking-[0.2em] shadow-sm ${leagueTheme.bg} ${leagueTheme.text} ${leagueTheme.border}`}>
                    {user.league}
                </div>
            </div>
            
            <div className="space-y-2 relative z-10">
                {leaderboard.map((u, i) => (
                    <div 
                        key={i} 
                        className={`flex items-center gap-4 p-3.5 rounded-[24px] transition-all border-2
                            ${u.isMe 
                                ? 'bg-sky-50 border-sky-400 border-b-[6px] scale-[1.05] shadow-xl z-20 -mx-1' 
                                : 'bg-white border-transparent hover:bg-slate-50 hover:border-slate-200'
                            }
                        `}
                    >
                        <div className={`
                            w-8 h-8 rounded-full flex items-center justify-center font-black text-xs
                            ${u.rank === 1 ? 'bg-yellow-400 text-yellow-900 shadow-md border-b-2 border-yellow-600' : 
                              u.rank === 2 ? 'bg-slate-200 text-slate-500 border-b-2 border-slate-300' : 'text-slate-400'}
                        `}>
                            {u.rank}
                        </div>
                        
                        <div className={`
                            w-11 h-11 rounded-xl border-2 overflow-hidden flex items-center justify-center p-0.5 shrink-0
                            ${u.isMe ? 'border-sky-300 bg-white shadow-inner' : 'border-slate-100 bg-slate-50'}
                        `}>
                            <img 
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${u.seed}`} 
                                alt={u.name} 
                                className="w-full h-full object-cover rounded-lg"
                            />
                        </div>

                        <div className="flex-1 min-w-0">
                            <p className={`font-black text-sm truncate ${u.isMe ? 'text-sky-700' : 'text-slate-700'}`}>
                                {u.isMe ? 'You' : u.name}
                            </p>
                            <div className="flex items-center gap-1.5">
                                <p className={`text-[10px] font-black uppercase tracking-widest ${u.isMe ? 'text-sky-400' : 'text-slate-400'}`}>
                                    {u.xp.toLocaleString()} XP
                                </p>
                                {u.isMe && <ChevronUp size={10} className="text-duo-green animate-bounce" strokeWidth={4} />}
                            </div>
                        </div>
                        
                        {u.rank === 1 && !u.isMe && <Shield size={16} className="text-yellow-400 fill-yellow-400 opacity-20" />}
                    </div>
                ))}
            </div>

            <div className="mt-8 pt-6 border-t-2 border-slate-50 flex items-center justify-center">
                 <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Season ends in 4 days</p>
            </div>
        </div>
    );
};
