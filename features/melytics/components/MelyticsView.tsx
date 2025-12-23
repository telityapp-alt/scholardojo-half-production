
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { DomainType } from '../../../core/contracts/entityMap';
import { UserFoundation } from '../types';
import { MelyticsService } from '../services/melyticsService';
import { AnalyticsRadar } from './AnalyticsRadar';
import { 
    Fingerprint, Zap, History, Trophy, Swords, 
    Clock, BrainCircuit, Bot, Activity, BarChart3, 
    ChevronDown, ChevronUp, Star, CheckCircle2, 
    FileText, Target, Database, Info, Sparkles, AlertCircle
} from 'lucide-react';
import { useLanguage } from '../../../core/hooks/useLanguage';
import { useStorageSync } from '../../../core/hooks/useStorageSync';

export const MelyticsView: React.FC = () => {
    const { domain } = useParams<{ domain: string }>();
    const domainEnum = (domain as DomainType) || DomainType.STUDENT;
    const { t } = useLanguage();

    const [foundation, setFoundation] = useState<UserFoundation>(() => MelyticsService.getFoundation(domainEnum));
    const [expandedArena, setExpandedArena] = useState<string | null>(null);

    const refresh = useCallback(() => {
        setFoundation(MelyticsService.getFoundation(domainEnum));
    }, [domainEnum]);

    useEffect(() => {
        refresh();
    }, [refresh]);

    // High precision sync gate
    useStorageSync(refresh);

    const matrixSummary = useMemo(() => {
        const s = foundation.scores;
        const avg = (s.technical + s.leadership + s.resilience + s.academic + s.fit + s.impact) / 6;
        return {
            avg: Math.round(avg),
            label: avg > 80 ? 'Elite Operative' : avg > 50 ? 'Advanced Ninja' : 'Rising Candidate'
        };
    }, [foundation.scores]);

    return (
        <div className="space-y-10 pb-32 animate-in fade-in slide-in-from-bottom-6 duration-700 max-w-7xl mx-auto px-4">
            
            {/* 1. THE BRAIN OVERLAY (HEADER) */}
            <div className="bg-slate-900 rounded-[48px] border-b-[16px] border-black p-8 md:p-12 text-white relative overflow-hidden shadow-2xl group">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none"></div>
                <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform duration-[3000ms] pointer-events-none">
                    <BrainCircuit size={300} />
                </div>
                
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                    <div className="relative">
                        <div className="w-44 h-44 md:w-56 md:h-56 bg-white rounded-[64px] border-b-[12px] border-sky-100 flex items-center justify-center shadow-2xl overflow-hidden p-1.5 transform -rotate-2 group-hover:rotate-0 transition-all duration-700">
                             <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${foundation.avatarSeed}`} className="w-full h-full object-cover rounded-[56px]" alt="Neural Identity" />
                             <div className="absolute top-4 right-4 w-6 h-6 bg-[#58cc02] border-4 border-white rounded-full animate-pulse shadow-lg"></div>
                        </div>
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 px-5 py-2 rounded-2xl font-black text-xs uppercase tracking-widest border-b-4 border-yellow-600 shadow-xl whitespace-nowrap">
                            Rank: {matrixSummary.label}
                        </div>
                    </div>

                    <div className="flex-1 text-center md:text-left space-y-6">
                        <div className="inline-flex items-center gap-2 bg-sky-500/20 backdrop-blur-md px-4 py-2 rounded-2xl border border-sky-500/30 font-black text-[10px] uppercase tracking-[0.2em] text-sky-300">
                             <Fingerprint size={14} strokeWidth={3} /> Neural Identity Locked • {foundation.id}
                        </div>
                        <div className="space-y-4">
                            <h1 className="text-5xl md:text-8xl font-black text-white leading-none tracking-tighter drop-shadow-xl">{foundation.name}</h1>
                            <p className="text-xl md:text-3xl font-bold text-sky-100/70 max-w-2xl leading-tight italic">
                                "{foundation.bio}"
                            </p>
                        </div>
                        
                        <div className="flex flex-wrap justify-center md:justify-start gap-4">
                             <div className="bg-white/10 px-4 py-2 rounded-xl border border-white/10 flex items-center gap-3">
                                Activity size={18} className="text-red-400" />
                                <div><p className="text-[8px] font-black uppercase text-slate-400">Total XP</p><p className="font-black text-sm">{foundation.auditHistory.length * 50 + foundation.arenaLogs.length * 200}</p></div>
                             </div>
                             <div className="bg-white/10 px-4 py-2 rounded-xl border border-white/10 flex items-center gap-3">
                                Trophy size={18} className="text-yellow-400" />
                                <div><p className="text-[8px] font-black uppercase text-slate-400">Victories</p><p className="font-black text-sm">{foundation.arenaLogs.filter(l => l.avgScore > 20).length}</p></div>
                             </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. THE MATRIX CORE */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
                {/* RADAR COMMAND */}
                <div className="lg:col-span-5 flex flex-col">
                    <div className="bg-white rounded-[48px] border-2 border-slate-200 border-b-[16px] p-8 md:p-12 shadow-xl flex-1 relative overflow-hidden group">
                        <div className="flex items-center justify-between mb-10">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-sky-500 rounded-2xl flex items-center justify-center text-white border-b-4 border-sky-700 shadow-lg"><BarChart3 size={24} strokeWidth={3} /></div>
                                <h3 className="text-2xl font-black text-slate-800 tracking-tighter uppercase italic">Neural Matrix</h3>
                            </div>
                            <div className="text-center">
                                <p className="text-4xl font-black text-[#58cc02] leading-none">{matrixSummary.avg}</p>
                                <p className="text-[9px] font-black uppercase text-slate-300 tracking-widest mt-1">Efficiency</p>
                            </div>
                        </div>

                        <AnalyticsRadar scores={foundation.scores} color="#1cb0f6" />

                        <div className="mt-12 pt-8 border-t-2 border-slate-50">
                             <div className="flex gap-6 p-8 bg-sky-50 rounded-[40px] border-2 border-sky-100 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-5"><Bot size={80}/></div>
                                <div className="shrink-0 w-16 h-16 bg-[#1cb0f6] rounded-2xl flex items-center justify-center text-white border-b-4 border-[#1899d6] shadow-xl"><Bot size={32} /></div>
                                <div className="relative z-10">
                                    <p className="text-[10px] font-black text-[#1cb0f6] uppercase mb-2 flex items-center gap-2"><Sparkles size={14} /> AI Evolution Feedback</p>
                                    <p className="text-base font-bold text-slate-700 leading-relaxed italic">
                                        "{foundation.aiSummary}"
                                    </p>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>

                {/* AUDIT TIMELINE (THE RECENT STRIKES) */}
                <div className="lg:col-span-7 flex flex-col gap-8">
                    <div className="flex-1 bg-white rounded-[48px] border-2 border-slate-200 border-b-[16px] p-8 md:p-10 shadow-xl flex flex-col">
                        <div className="flex items-center justify-between mb-8 px-2">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center text-white border-b-4 border-purple-700 shadow-lg"><FileText size={24} /></div>
                                <div>
                                    <h3 className="text-2xl font-black text-slate-800 tracking-tighter uppercase italic">Document Strike History</h3>
                                    <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Quality Audit Archive</p>
                                </div>
                            </div>
                            <div className="bg-purple-100 text-purple-600 px-4 py-2 rounded-xl font-black text-xs border-b-2 border-purple-200">
                                {foundation.auditHistory.length} Records
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto pr-2 space-y-3 scrollbar-hide max-h-[600px]">
                            {foundation.auditHistory.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center p-12 opacity-50 border-4 border-dashed border-slate-100 rounded-[40px]">
                                    <Database size={64} className="text-slate-200 mb-6" />
                                    <p className="font-black text-slate-300 uppercase tracking-widest">No strikes recorded yet.</p>
                                </div>
                            ) : (
                                foundation.auditHistory.map(record => (
                                    <div key={record.id} className="bg-slate-50 border-2 border-slate-100 border-b-[6px] rounded-[28px] p-5 flex items-center gap-6 group hover:border-purple-200 hover:bg-white transition-all">
                                        <div className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center text-white shrink-0 border-b-4 ${record.score >= 80 ? 'bg-[#58cc02] border-[#46a302]' : record.score >= 60 ? 'bg-sky-500 border-sky-700' : 'bg-orange-500 border-orange-700'}`}>
                                            <span className="text-xl font-black leading-none">{record.score}</span>
                                            <span className="text-[8px] font-black uppercase opacity-70">Points</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{record.targetTitle}</p>
                                            <h4 className="font-black text-slate-700 text-lg leading-tight truncate">{record.docLabel}</h4>
                                            <p className="text-[9px] font-bold text-sky-500 mt-1 flex items-center gap-1"><Clock size={10}/> {new Date(record.timestamp).toLocaleDateString()}</p>
                                        </div>
                                        <div className="hidden md:flex flex-col items-end">
                                            <div className="bg-white px-3 py-1 rounded-lg border-2 border-slate-100 text-[10px] font-black uppercase text-slate-500 shadow-sm">{record.verdict}</div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. ARENA LOGS (BATTLE ARCHIVE) */}
            <section className="space-y-8">
                <div className="flex items-center gap-5 px-4">
                    <div className="w-14 h-14 bg-red-500 rounded-3xl border-b-[8px] border-red-700 flex items-center justify-center text-white shadow-xl transform -rotate-3">
                        <Swords size={32} />
                    </div>
                    <div>
                        <h2 className="text-3xl md:text-5xl font-black text-slate-800 tracking-tighter uppercase italic">Interview Battle Logs</h2>
                        <p className="text-slate-400 font-bold text-lg">Detailed tactical breakdown of every boss encounter.</p>
                    </div>
                </div>

                <div className="space-y-6">
                    {foundation.arenaLogs.length > 0 ? foundation.arenaLogs.map((log) => (
                        <div key={log.id} className="bg-white rounded-[48px] border-2 border-slate-200 border-b-[16px] overflow-hidden shadow-2xl transition-all hover:border-red-200">
                             <div 
                                onClick={() => setExpandedArena(expandedArena === log.id ? null : log.id)}
                                className="p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-10 cursor-pointer hover:bg-slate-50/50 transition-colors"
                            >
                                <div className="flex items-center gap-8">
                                    <div className={`w-20 h-20 rounded-[32px] border-b-[8px] flex items-center justify-center text-white shrink-0 shadow-xl ${log.avgScore > 20 ? 'bg-yellow-400 border-yellow-600' : 'bg-red-50 border-red-700'}`}>
                                        <Target size={40} strokeWidth={3} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{new Date(log.date).toLocaleDateString()} • {log.difficulty} ENCOUNTER</p>
                                        <h3 className="text-3xl font-black text-slate-800 tracking-tight leading-none">{log.targetTitle}</h3>
                                    </div>
                                </div>
                                <div className="flex items-center gap-10">
                                    <div className="text-center">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Combat Power</p>
                                        <p className="text-3xl font-black text-sky-500 leading-none">{log.avgScore.toFixed(0)} PWR</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Boss Verdict</p>
                                        <p className={`text-3xl font-black ${log.avgScore > 20 ? 'text-[#58cc02]' : 'text-red-500'} leading-none`}>{log.performanceLabel}</p>
                                    </div>
                                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 border-2 border-slate-100">
                                        {expandedArena === log.id ? <ChevronUp size={32} strokeWidth={3} /> : <ChevronDown size={32} strokeWidth={3} />}
                                    </div>
                                </div>
                            </div>

                            {expandedArena === log.id && (
                                <div className="px-10 pb-12 pt-6 bg-slate-50/50 border-t-4 border-slate-100 grid grid-cols-1 lg:grid-cols-2 gap-10 animate-in slide-in-from-top-6 duration-500">
                                    <div className="space-y-6">
                                        <div className="bg-white p-8 rounded-[40px] border-2 border-red-100 border-b-[10px] shadow-sm">
                                            <h4 className="flex items-center gap-3 text-red-600 font-black uppercase text-sm tracking-widest mb-6">
                                                <AlertCircle size={20} strokeWidth={3} /> Identified Vulnerabilities
                                            </h4>
                                            <div className="space-y-3">
                                                {log.weaknesses?.map((w, i) => (
                                                    <div key={i} className="flex gap-4 p-4 bg-red-50/30 rounded-2xl border border-red-100 text-sm font-bold text-slate-700">
                                                        <div className="w-2 h-2 rounded-full bg-red-400 mt-2 shrink-0"></div> {w}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="bg-white p-8 rounded-[40px] border-2 border-green-100 border-b-[10px] shadow-sm">
                                            <h4 className="flex items-center gap-3 text-[#58cc02] font-black uppercase text-sm tracking-widest mb-6">
                                                <Star size={20} fill="currentColor" strokeWidth={3} /> Elite Strike Performance
                                            </h4>
                                            <div className="space-y-3">
                                                {log.strengths?.map((s, i) => (
                                                    <div key={i} className="flex gap-4 p-4 bg-green-50/30 rounded-2xl border border-green-100 text-sm font-bold text-slate-700">
                                                        <CheckCircle2 size={18} className="text-[#58cc02] shrink-0" /> {s}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-slate-900 rounded-[48px] border-b-[16px] border-black p-10 text-white relative overflow-hidden shadow-2xl">
                                         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                                         <div className="relative z-10">
                                             <div className="flex items-center gap-4 mb-8">
                                                <div className="w-12 h-12 bg-[#1cb0f6] rounded-2xl flex items-center justify-center border-b-4 border-[#1899d6] shadow-lg"><BrainCircuit size={28}/></div>
                                                <h4 className="text-sky-400 font-black uppercase text-xs tracking-[0.2em]">Neural Feedback Transcript</h4>
                                             </div>
                                             <p className="text-xl font-bold italic text-sky-50 leading-relaxed mb-10 border-l-4 border-sky-500 pl-8">"{log.bossFeedback}"</p>
                                             
                                             <div className="space-y-6 pt-10 border-t border-white/10">
                                                 <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] flex items-center gap-2"><Zap size={12} className="text-yellow-400 fill-yellow-400" /> Strategic Recovery Plan</p>
                                                 <div className="grid grid-cols-1 gap-4">
                                                     {log.improvementSteps?.map((step, i) => (
                                                        <div key={i} className="flex items-center gap-5 bg-white/5 border border-white/10 p-5 rounded-3xl group hover:bg-white/10 transition-all">
                                                            <div className="w-10 h-10 rounded-xl bg-[#1cb0f6] text-white flex items-center justify-center font-black text-sm border-b-4 border-[#1899d6] shadow-lg">{i+1}</div>
                                                            <p className="text-base font-bold text-sky-100 leading-tight">{step}</p>
                                                        </div>
                                                     ))}
                                                 </div>
                                             </div>
                                         </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )) : (
                        <div className="py-32 text-center bg-white rounded-[64px] border-4 border-dashed border-slate-100 flex flex-col items-center">
                            <History size={80} className="text-slate-100 mb-8" />
                            <h3 className="text-2xl font-black text-slate-300 uppercase tracking-[0.4em]">Arena History Empty</h3>
                            <p className="text-slate-400 font-bold mt-4 max-w-sm leading-relaxed">
                                Complete an Interview Arena simulation to generate deep-intelligence combat logs.
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};
