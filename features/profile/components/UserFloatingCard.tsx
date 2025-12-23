
import React, { useState, useEffect } from 'react';
import { 
    ChevronDown, Crown, Flame, Gem, Fingerprint, 
    Zap, Target, BrainCircuit, ShieldCheck, User
} from 'lucide-react';
import { useUserProgress } from '../../../core/hooks/useUserProgress';
import { useParams } from 'react-router-dom';
import { DomainType } from '../../../core/contracts/entityMap';
import { ProfileAccess } from '../../../core/access/profileAccess';
import { getQuestsByDomain } from '../../../core/access/questAccess';
import { AutoQuestEngine } from '../../../core/engines/autoQuestEngine';

export const UserFloatingCard: React.FC = () => {
    const { domain } = useParams<{ domain: string }>();
    const domainEnum = (domain as DomainType) || DomainType.SCHOLAR;
    
    const [isExpanded, setIsExpanded] = useState(false);
    const { xp, gems, streak, level, progressPercent } = useUserProgress(domainEnum);
    const dna = ProfileAccess.getDNA(domainEnum);
    
    const [activeQuests, setActiveQuests] = useState<any[]>([]);

    const refreshIntelligence = () => {
        const quests = getQuestsByDomain(domainEnum).filter(q => q.columnId !== 'done');
        setActiveQuests(quests);
        AutoQuestEngine.syncQuestsWithPrograms(domainEnum);
    };

    useEffect(() => {
        refreshIntelligence();
        window.addEventListener('storage', refreshIntelligence);
        return () => window.removeEventListener('storage', refreshIntelligence);
    }, [domainEnum]);

    const nextObjective = activeQuests[0]?.subtasks.find((s: any) => !s.completed)?.text || "Ecosystem Synchronized";

    return (
        <div className="fixed bottom-6 left-6 z-[2000] flex flex-col items-start gap-3 pointer-events-none">
            {!isExpanded && (
                <button 
                    onClick={() => setIsExpanded(true)}
                    className="pointer-events-auto flex items-center gap-3 bg-white p-2 pr-5 rounded-[24px] border-2 border-slate-200 border-b-[6px] hover:border-sky-400 transition-all active:border-b-2 active:translate-y-[4px] shadow-2xl group"
                >
                    <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-white border-b-4 border-black relative overflow-hidden group-hover:rotate-3 transition-transform">
                        <img 
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${dna.avatarSeed}`} 
                            alt="Avatar" 
                            className="w-full h-full object-cover" 
                        />
                        <div className="absolute top-0 right-0 w-3 h-3 bg-green-50 border-2 border-white rounded-full"></div>
                    </div>
                    <div>
                        <div className="flex items-center gap-1.5 mb-0.5">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter leading-none">LVL</span>
                            <span className="text-sm font-black text-slate-800 leading-none">{level}</span>
                            <div className="w-12 h-1.5 bg-slate-100 rounded-full ml-1 overflow-hidden border border-slate-200">
                                <div className="h-full bg-yellow-400" style={{ width: `${progressPercent}%` }} />
                            </div>
                        </div>
                        <p className="text-[9px] font-black text-sky-500 uppercase tracking-widest">{dna.id}</p>
                    </div>
                </button>
            )}

            {isExpanded && (
                <div className="pointer-events-auto w-80 bg-white rounded-[40px] border-4 border-slate-200 border-b-[12px] shadow-[0_32px_64px_rgba(0,0,0,0.2)] overflow-hidden animate-in slide-in-from-bottom-10 duration-300">
                    <div className="p-5 bg-slate-50 border-b-2 border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white border-b-4 border-black">
                                <Fingerprint size={20} />
                            </div>
                            <div>
                                <h4 className="font-black text-slate-800 text-xs leading-none uppercase tracking-tighter">Ninja DNA</h4>
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">{dna.id}</p>
                            </div>
                        </div>
                        <button onClick={() => setIsExpanded(false)} className="p-2 hover:bg-slate-200 rounded-xl text-slate-400 transition-colors">
                            <ChevronDown size={20} strokeWidth={3} />
                        </button>
                    </div>

                    <div className="p-5 grid grid-cols-2 gap-3 bg-white border-b-2 border-slate-100">
                        <div className="p-3 bg-orange-50 border-2 border-orange-100 border-b-4 rounded-2xl text-center">
                            <div className="flex items-center justify-center gap-2 mb-1">
                                <Flame size={14} className="text-orange-500 fill-orange-500" />
                                <span className="text-xs font-black text-orange-600">{streak}</span>
                            </div>
                            <p className="text-[8px] font-black text-orange-400 uppercase">Streak</p>
                        </div>
                        <div className="p-3 bg-sky-50 border-2 border-sky-100 border-b-4 rounded-2xl text-center">
                            <div className="flex items-center justify-center gap-2 mb-1">
                                <Gem size={14} className="text-sky-500 fill-sky-500" />
                                <span className="text-xs font-black text-sky-600">{gems}</span>
                            </div>
                            <p className="text-[8px] font-black text-sky-400 uppercase">Gems</p>
                        </div>
                    </div>

                    <div className="p-5">
                        <div className="bg-slate-900 rounded-[32px] p-5 text-white relative overflow-hidden group shadow-xl">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')] opacity-10"></div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-3">
                                    <BrainCircuit size={14} className="text-sky-400" />
                                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-sky-400">Current Directive</span>
                                </div>
                                <p className="text-[13px] font-bold text-slate-100 line-clamp-2 leading-snug">
                                    {nextObjective}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
