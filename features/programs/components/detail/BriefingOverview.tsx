
import React from 'react';
import { UnifiedProgram } from '../../types';
import { 
    Info, CheckCircle2, Star, Target, ShieldCheck, 
    Zap, Sparkles, GraduationCap, Award, Flame, BadgeCheck, Coins
} from 'lucide-react';
import { renderJuicyContent } from '../../../../core/engines/contentRenderer';

export const BriefingOverview: React.FC<{ program: UnifiedProgram }> = ({ program }) => {
    const { intel } = program;

    return (
        <div className="space-y-6 mb-10 animate-in fade-in slide-in-from-top-4 duration-500">
            
            {/* ROW 1: THE TRINITY GRID (12 Column System) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* 1. CORE BRIEFING (COL 5) */}
                <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-[40px] border-2 border-slate-200 border-b-[10px] relative overflow-hidden group hover:border-sky-300 transition-all">
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:rotate-12 transition-transform duration-1000">
                        <Info size={160} />
                    </div>
                    
                    <div className="relative z-10 flex flex-col h-full">
                        <div className="flex items-center gap-4 mb-8 shrink-0">
                            <div className="w-12 h-12 bg-sky-100 rounded-2xl flex items-center justify-center text-sky-500 border-b-4 border-sky-200 shadow-sm">
                                <Info size={24} strokeWidth={3} />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-slate-800 uppercase tracking-tighter leading-none">Core Briefing</h3>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Mission Summary</p>
                            </div>
                        </div>

                        <div className="flex-1 space-y-6">
                            <p className="text-base font-bold text-slate-600 leading-relaxed italic">
                                {renderJuicyContent(intel.description)}
                            </p>

                            <div className="space-y-2.5">
                                {intel.highlights.map((h, i) => (
                                    <div key={i} className="flex items-center gap-3 bg-sky-50 p-3.5 rounded-2xl border-2 border-sky-100/50 group/item">
                                        <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-sky-500 shadow-sm group-hover/item:scale-110 transition-transform">
                                            <Sparkles size={12} fill="currentColor" />
                                        </div>
                                        <span className="text-[11px] font-black text-sky-700 uppercase tracking-tight leading-none">{h}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. ENTRY CRITERIA (COL 3) */}
                <div className="lg:col-span-3 bg-white p-6 md:p-8 rounded-[40px] border-2 border-slate-200 border-b-[10px] border-green-200 relative group overflow-hidden hover:border-green-300 transition-all">
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-green-600 border-b-4 border-green-200 shadow-sm">
                                <Target size={20} strokeWidth={3} />
                            </div>
                            <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">Criteria</h3>
                        </div>

                        <div className="space-y-4">
                            {intel.entryCriteria?.map((c, i) => (
                                <div key={i} className="flex items-start gap-3 group/crit">
                                    <div className="w-5 h-5 rounded-lg bg-duo-green flex items-center justify-center text-white shrink-0 mt-0.5 border-b-2 border-duo-greenDark group-hover/crit:scale-110 transition-transform">
                                        <CheckCircle2 size={12} strokeWidth={4} />
                                    </div>
                                    <span className="text-xs font-bold text-slate-600 leading-tight">{c}</span>
                                </div>
                            )) || <p className="text-[10px] font-black text-slate-300 uppercase italic">Updating Database...</p>}
                        </div>
                    </div>
                </div>

                {/* 3. REWARD PACKAGE (COL 4) */}
                <div className="lg:col-span-4 bg-white p-6 md:p-8 rounded-[40px] border-2 border-slate-200 border-b-[10px] border-orange-200 relative group overflow-hidden hover:border-orange-300 transition-all">
                    <div className="relative z-10 h-full flex flex-col">
                        <div className="flex items-center justify-between gap-3 mb-8 shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-500 border-b-4 border-orange-200 shadow-sm">
                                    <Award size={20} strokeWidth={3} />
                                </div>
                                <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">Rewards</h3>
                            </div>
                            {/* FUNDING RANGE / STATUS */}
                            <div className="bg-orange-500 text-white px-3 py-1.5 rounded-xl border-b-4 border-orange-700 shadow-lg flex items-center gap-2 transform rotate-2">
                                <Coins size={12} fill="currentColor" />
                                <span className="text-[9px] font-black uppercase tracking-widest">{intel.fundingStatus || 'GRANT'}</span>
                            </div>
                        </div>

                        <div className="space-y-3 flex-1 overflow-y-auto pr-1 scrollbar-hide">
                            {intel.funding?.map((f, i) => (
                                <div key={i} className="flex items-center gap-4 p-3 bg-orange-50 rounded-2xl border-2 border-orange-100/50 group/rew">
                                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-orange-500 border-b-2 border-orange-200 shrink-0 group-hover/rew:rotate-6 transition-transform">
                                        <Zap size={14} fill="currentColor" />
                                    </div>
                                    <span className="text-[10px] font-black text-orange-800 uppercase tracking-tighter leading-snug">{f}</span>
                                </div>
                            )) || <p className="text-[10px] font-black text-slate-300 uppercase italic">Calculating Loot...</p>}
                        </div>
                    </div>
                </div>
            </div>

            {/* ROW 2: PROTOCOL & RANK */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* SENSEI PROTOCOL BANNER (COL 8) */}
                <div className="lg:col-span-8">
                    <div className="bg-slate-900 rounded-[32px] border-b-[10px] border-black p-6 md:p-8 text-white relative overflow-hidden group shadow-xl">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')] opacity-10"></div>
                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                            <div className="w-14 h-14 bg-duo-blue rounded-2xl flex items-center justify-center text-white border-b-4 border-duo-blueDark shadow-lg group-hover:rotate-12 transition-transform shrink-0">
                                <ShieldCheck size={32} />
                            </div>
                            <div>
                                <h4 className="text-sky-400 font-black uppercase text-[10px] tracking-[0.3em] mb-2 flex items-center gap-2">
                                    <Flame size={14} fill="currentColor" /> Protocol Insight
                                </h4>
                                <p className="text-lg font-bold italic text-slate-300 leading-tight">
                                    "{program.senseiProtocolQuote || 'Mastering the basics is the first step to securing elite funding.'}"
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* DOJO RANK CARD (COL 4) */}
                <div className="lg:col-span-4">
                    <div className="bg-white p-6 md:p-8 rounded-[32px] border-2 border-slate-200 border-b-[10px] flex items-center justify-between h-full group hover:border-indigo-300 transition-all shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center text-white border-b-4 border-indigo-700 shadow-lg transform -rotate-3 group-hover:rotate-0 transition-transform shrink-0">
                                <GraduationCap size={28} strokeWidth={2.5} />
                            </div>
                            <div>
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">Required Rank</p>
                                <h4 className="text-lg font-black text-slate-800 tracking-tight leading-none uppercase">
                                    {program.dojoRankRequired || 'Level 1 Ninja'}
                                </h4>
                            </div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-300 group-hover:text-indigo-400 transition-colors">
                            <BadgeCheck size={24} strokeWidth={3} />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};
