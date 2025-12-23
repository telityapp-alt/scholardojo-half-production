
import React, { useState } from 'react';
import { 
    Trophy, Swords, Zap, Activity, Award, ArrowRight, 
    CheckCircle2, Star, Sparkles, BrainCircuit, ShieldCheck, Target,
    AlertCircle, Lightbulb, TrendingUp, XCircle, Plus, Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AnalyticsRadar } from '../../melytics/components/AnalyticsRadar';
import { ArenaDifficulty } from '../types';
import { DomainType } from '../../../core/contracts/entityMap';
import { QuestService } from '../../quest/services/questService';

interface BattleAnalyticsProps {
    domain: DomainType;
    history: { role: 'boss' | 'ninja', text: string, score?: number, weaknesses?: string[], improvements?: string[] }[];
    targetTitle: string;
    difficulty: ArenaDifficulty;
    onExit: () => void;
}

export const BattleAnalytics: React.FC<BattleAnalyticsProps> = ({ 
    domain, history, targetTitle, difficulty, onExit 
}) => {
    const [addedQuests, setAddedQuests] = useState<Record<string, boolean>>({});

    React.useEffect(() => {
        confetti({ 
            particleCount: 150, 
            spread: 70, 
            origin: { y: 0.6 }, 
            colors: ['#1cb0f6', '#58cc02', '#fbbf24'] 
        });
    }, []);

    const bossEvals = history.filter(h => h.role === 'boss' && h.score !== undefined);
    const avgDamage = bossEvals.reduce((a, b) => a + (b.score || 0), 0) / (bossEvals.length || 1);
    
    // Explicitly cast to string[] to resolve 'unknown' type inference issues on flatMap and Set in some environments
    const allWeaknesses = Array.from(new Set(bossEvals.flatMap(h => (h.weaknesses || []) as string[]))) as string[];
    const allImprovements = Array.from(new Set(bossEvals.flatMap(h => (h.improvements || []) as string[]))) as string[];

    const mockScores = {
        technical: Math.min(100, 40 + avgDamage),
        leadership: 30,
        resilience: 100,
        academic: 45,
        fit: 60,
        impact: Math.min(100, 20 + avgDamage)
    };

    const handleAddQuest = async (text: string) => {
        if (addedQuests[text]) return;
        
        await QuestService.createFromTrainingPlan(text, domain, targetTitle);
        setAddedQuests(prev => ({ ...prev, [text]: true }));
        
        // Mini confetti for micro-achievement
        confetti({
            particleCount: 40,
            spread: 40,
            origin: { y: 0.8 },
            colors: ['#58cc02']
        });
    };

    return (
        <div className="fixed inset-0 z-[9999] bg-slate-50 flex flex-col p-4 md:p-8 overflow-y-auto animate-in fade-in zoom-in duration-500">
            <div className="max-w-6xl mx-auto w-full space-y-8 pb-20">
                
                {/* 1. HERO BANNER */}
                <div className="bg-[#1cb0f6] rounded-[48px] border-b-[16px] border-[#1899d6] p-10 text-white text-center relative overflow-hidden shadow-2xl">
                     <div className="relative z-10 space-y-4">
                        <div className="w-24 h-24 bg-white/20 rounded-[32px] border-4 border-white/30 flex items-center justify-center mx-auto mb-6 shadow-2xl animate-bounce">
                            <Trophy size={64} fill="currentColor" className="text-yellow-300" />
                        </div>
                        <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic drop-shadow-2xl">VICTORY!</h2>
                        <p className="text-xl md:text-2xl font-bold text-sky-100 max-w-2xl mx-auto leading-relaxed">
                            Mission <span className="text-white">"{targetTitle}"</span> Analyzed.
                        </p>
                     </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* 2. ANALYTICS BLOCK (LEFT) */}
                    <div className="lg:col-span-5 space-y-8">
                         <div className="bg-white p-8 rounded-[40px] border-2 border-slate-200 border-b-[12px] shadow-xl">
                             <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center text-white border-b-4 border-indigo-700">
                                    <Activity size={20} />
                                </div>
                                <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Neural Matrix</h3>
                             </div>
                             <AnalyticsRadar scores={mockScores} color="#1cb0f6" />
                             
                             <div className="mt-8 p-6 bg-slate-50 rounded-[32px] border-2 border-slate-100">
                                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Sensei's Verdict</p>
                                 <p className="text-slate-700 font-bold italic leading-relaxed">
                                     "Your logic is stable, but your technical articulation needs more 'bite'. You missed critical keywords."
                                 </p>
                             </div>
                         </div>
                    </div>

                    {/* 3. ERRORS & IMPROVEMENTS (RIGHT) */}
                    <div className="lg:col-span-7 space-y-8">
                        {/* THE "FAILURES" SECTION (RED) */}
                        <div className="bg-red-50 rounded-[40px] border-2 border-red-200 border-b-[12px] p-8 shadow-lg">
                            <h3 className="text-xl font-black text-red-700 uppercase tracking-tight mb-6 flex items-center gap-3">
                                <XCircle size={24} /> Critical Vulnerabilities
                            </h3>
                            <div className="space-y-3">
                                {allWeaknesses.length > 0 ? allWeaknesses.map((w, i) => (
                                    <div key={i} className="flex gap-4 p-4 bg-white rounded-2xl border-2 border-red-100 group shadow-sm">
                                        <div className="w-8 h-8 rounded-lg bg-red-100 text-red-500 flex items-center justify-center shrink-0"><AlertCircle size={18} strokeWidth={3} /></div>
                                        <p className="font-bold text-red-900 text-sm leading-tight pt-1.5">{w}</p>
                                    </div>
                                )) : (
                                    <p className="text-red-400 font-black uppercase text-xs italic tracking-widest p-4">No major vulnerabilities detected. Perfect sync.</p>
                                )}
                            </div>
                        </div>

                        {/* THE "RECOVERY" SECTION (GREEN/BLUE) - NOW INTERACTIVE */}
                        <div className="bg-sky-50 rounded-[40px] border-2 border-sky-200 border-b-[12px] p-8 shadow-lg">
                            <h3 className="text-xl font-black text-sky-700 uppercase tracking-tight mb-6 flex items-center gap-3">
                                <Lightbulb size={24} /> Dojo Training Plan
                            </h3>
                            <div className="space-y-4">
                                {allImprovements.map((imp: string, i: number) => {
                                    const isAdded = !!addedQuests[imp];
                                    return (
                                        <div key={i} className="flex flex-col md:flex-row gap-4 p-5 bg-white rounded-3xl border-2 border-sky-100 shadow-sm relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-125 transition-transform"><Target size={60}/></div>
                                            <div className="w-10 h-10 rounded-xl bg-[#1cb0f6] text-white flex items-center justify-center shrink-0 border-b-4 border-sky-700"><TrendingUp size={20} /></div>
                                            <div className="flex-1">
                                                <p className="font-black text-slate-800 text-base leading-tight mb-1">{imp}</p>
                                                <p className="text-[10px] font-black text-sky-500 uppercase tracking-widest mb-4 md:mb-0">Recommended Training • +20 XP Potential</p>
                                            </div>
                                            <button 
                                                // Fixed: imp is now explicitly string to match handleAddQuest argument type
                                                onClick={() => handleAddQuest(imp)}
                                                className={`
                                                    px-5 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all border-b-4 flex items-center gap-2 shrink-0
                                                    ${isAdded 
                                                        ? 'bg-green-100 text-green-600 border-green-300 active:border-b-0 cursor-default' 
                                                        : 'bg-[#58cc02] text-white border-[#46a302] hover:brightness-110 active:border-b-0 active:translate-y-[4px] shadow-md shadow-green-100'
                                                    }
                                                `}
                                            >
                                                {isAdded ? (
                                                    <><Check size={14} strokeWidth={4} /> Added</>
                                                ) : (
                                                    <><Plus size={14} strokeWidth={4} /> Add to Quests</>
                                                )}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <button 
                            onClick={onExit}
                            className="w-full bg-[#58cc02] text-white px-10 py-7 rounded-[36px] font-black text-3xl border-b-[16px] border-[#46a302] hover:brightness-110 active:translate-y-[16px] active:border-b-0 transition-all flex items-center justify-center gap-6 shadow-2xl group"
                        >
                            COLLECT LOOT <ArrowRight size={40} className="group-hover:translate-x-3 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
