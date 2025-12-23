
import React from 'react';
import { Swords, Trophy, Zap, Flame, Crown, Target, ArrowRight } from 'lucide-react';

export const CompetitionHome: React.FC = () => {
    return (
        <div className="space-y-12 pb-32 animate-in slide-in-from-bottom-6 duration-700 max-w-7xl mx-auto px-4">
            {/* TOURNAMENT HERO - DARK THEME */}
            <div className="bg-slate-950 rounded-[48px] border-b-[16px] border-black p-10 md:p-12 text-white relative overflow-hidden shadow-2xl group">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none"></div>
                <div className="absolute -right-20 -bottom-20 opacity-10 group-hover:scale-110 transition-transform duration-[3000ms]">
                    <Swords size={400} className="text-white" />
                </div>

                <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                    <div className="w-44 h-44 bg-red-600 rounded-[48px] border-b-[12px] border-red-800 flex items-center justify-center shadow-2xl animate-pulse-slow transform -rotate-3">
                        <Trophy size={80} className="text-white fill-white/20" />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <div className="inline-flex items-center gap-2 bg-red-500/20 backdrop-blur-md px-4 py-2 rounded-2xl border border-red-500/30 mb-6 font-black text-xs uppercase tracking-[0.3em] text-red-400">
                             Live Qualifier Phase 1
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic leading-none mb-6">
                            WAR <span className="text-red-500">ROOM</span>
                        </h1>
                        <p className="text-xl font-bold text-slate-400 max-w-2xl leading-tight">
                            Execute strategic strikes in world-class tournaments. Build your global bracket and claim the Crown.
                        </p>
                    </div>
                </div>
            </div>

            {/* BATTLE STATS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { icon: Flame, color: 'bg-orange-500', label: 'BATTLE STREAK', value: '14 Days' },
                    { icon: Crown, color: 'bg-yellow-400', label: 'TIER RANK', value: '#120 Global' },
                    { icon: Zap, color: 'bg-red-500', label: 'POWER RATING', value: '2,450' }
                ].map((stat, i) => (
                    <div key={i} className="bg-white rounded-[40px] border-2 border-slate-200 border-b-[12px] p-8 flex items-center gap-6 group hover:border-red-400 transition-all cursor-default">
                        <div className={`w-16 h-16 rounded-2xl border-b-4 flex items-center justify-center text-white shadow-lg ${stat.color}`}>
                            <stat.icon size={32} strokeWidth={3} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] mb-1">{stat.label}</p>
                            <h3 className="text-3xl font-black text-slate-800">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* LIVE BRACKET PLACEHOLDER */}
            <div className="bg-white rounded-[48px] border-2 border-slate-100 border-b-[16px] p-12 text-center flex flex-col items-center">
                 <div className="w-24 h-24 bg-slate-50 rounded-[32px] border-2 border-slate-200 flex items-center justify-center mb-8 shadow-inner">
                    <Target size={48} className="text-slate-200" />
                 </div>
                 <h2 className="text-3xl font-black text-slate-300 uppercase tracking-[0.4em]">Empty Bracket</h2>
                 <p className="text-slate-400 font-bold mt-4 max-w-sm mb-10">Scan a tournament brief in the explorer to initialize your first bracket strike.</p>
                 <button className="px-10 py-5 bg-red-500 text-white rounded-3xl font-black text-xl border-b-[8px] border-red-700 active:translate-y-2 active:border-b-0 transition-all flex items-center gap-3">
                    ENTER THE DEX <ArrowRight size={24} strokeWidth={4} />
                 </button>
            </div>
        </div>
    );
};
