
import React, { useMemo, useState, useEffect } from 'react';
import { DomainType } from '../../../core/contracts/entityMap';
import { ProfileAccess, UserDNA } from '../../../core/access/profileAccess';
import { AnalyticsRadar } from '../../melytics/components/AnalyticsRadar';
import { BrainCircuit, Sparkles, ShieldCheck, BarChart3, ClipboardList, School, Globe, Trophy } from 'lucide-react';
import { DojoEmitter } from '../../../core/services/dojoEmitter';
import { AssessmentModal } from './widgets/AssessmentModal';

interface ProfileFoundationProps {
    domain: DomainType;
}

export const ProfileFoundation: React.FC<ProfileFoundationProps> = ({ domain }) => {
    const [dna, setDna] = useState<UserDNA>(() => ProfileAccess.getDNA(domain));
    const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
    
    useEffect(() => {
        const load = () => setDna(ProfileAccess.getDNA(domain));
        load();
        const unsubscribe = DojoEmitter.subscribe('DNA_UPDATED', (updatedDna: UserDNA) => {
            if (updatedDna.domain === domain) setDna(updatedDna);
        });
        return unsubscribe;
    }, [domain]);

    const avgScore = useMemo(() => {
        const s = dna.scores;
        return Math.round((s.technical + s.leadership + s.resilience + s.academic + s.fit + s.impact) / 6);
    }, [dna.scores]);

    return (
        <div className="mt-16 space-y-8 animate-in slide-in-from-bottom-12 duration-1000 pb-12">
            
            <AssessmentModal 
                isOpen={isAssessmentOpen} 
                onClose={() => setIsAssessmentOpen(false)} 
                domain={domain}
                onComplete={() => setDna(ProfileAccess.getDNA(domain))}
            />

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-2">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-slate-900 rounded-[24px] border-b-[6px] border-black flex items-center justify-center text-white shadow-lg">
                        <BrainCircuit size={28} strokeWidth={2.5} />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-slate-800 uppercase italic tracking-tighter leading-none">Neural Foundation</h2>
                        <p className="text-slate-400 font-bold text-sm mt-1 uppercase tracking-widest">Operator Central Intelligence</p>
                    </div>
                </div>
                
                <button 
                    onClick={() => setIsAssessmentOpen(true)}
                    className="flex items-center gap-3 px-8 py-4 bg-[#1cb0f6] border-b-[6px] border-[#1899d6] rounded-2xl font-black text-xs uppercase tracking-[0.2em] text-white hover:brightness-110 active:border-b-0 active:translate-y-[6px] transition-all shadow-xl group"
                >
                    <ClipboardList size={18} strokeWidth={3} /> Recalibrate DNA
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-5 bg-white p-8 md:p-10 rounded-[48px] border-2 border-slate-200 border-b-[12px] shadow-sm relative overflow-hidden group h-fit">
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-110 transition-transform duration-1000">
                        <BarChart3 size={200} />
                    </div>
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-6">
                            <div className="bg-sky-100 text-[#1cb0f6] px-4 py-1.5 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] border border-sky-200">Matrix Breakdown</div>
                            <div className="text-right">
                                <p className="text-5xl font-black text-slate-800 leading-none">{avgScore}</p>
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Combat Tier</p>
                            </div>
                        </div>
                        {/* STABLE WRAPPER - MATCHES PIXEL CHART */}
                        <div className="w-full h-[200px] flex items-center justify-center overflow-visible">
                            <AnalyticsRadar scores={dna.scores} color="#1cb0f6" />
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-7 space-y-6">
                    <div className="bg-slate-900 p-8 md:p-10 rounded-[48px] border-b-[16px] border-black text-white relative overflow-hidden shadow-2xl group">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')] opacity-10"></div>
                        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start">
                            <div className="w-24 h-24 bg-[#1cb0f6] rounded-[32px] border-b-8 border-[#1899d6] flex items-center justify-center shrink-0 shadow-2xl group-hover:rotate-6 transition-transform overflow-hidden p-1">
                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${dna.avatarSeed}`} className="w-full h-full object-cover rounded-2xl" alt="" />
                            </div>
                            <div className="text-center md:text-left flex-1">
                                <h4 className="text-sky-400 font-black uppercase text-[10px] tracking-[0.3em] mb-2 flex items-center gap-2 justify-center md:justify-start">
                                    <Sparkles size={14} fill="currentColor" /> Strategic Profile
                                </h4>
                                <h3 className="text-3xl font-black text-white mb-3 tracking-tight">{dna.name}</h3>
                                
                                <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-xl border border-white/5">
                                        <School size={14} className="text-sky-300" />
                                        <span className="text-xs font-bold text-sky-100">{dna.university || 'Awaiting Sync'}</span>
                                    </div>
                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-xl border border-white/5">
                                        <Globe size={14} className="text-sky-300" />
                                        <span className="text-xs font-bold text-sky-100">{dna.country || 'Global Node'}</span>
                                    </div>
                                </div>

                                <p className="text-lg font-bold italic text-slate-300 leading-relaxed opacity-90 border-l-4 border-sky-500 pl-6 py-1">
                                    "{dna.bio}"
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {['academic', 'technical', 'leadership', 'resilience', 'fit', 'impact'].map(key => {
                            const val = (dna.scores as any)[key] || 0;
                            return (
                                <div key={key} className="bg-white p-5 rounded-[32px] border-2 border-slate-200 border-b-[6px] hover:border-sky-200 transition-all group flex flex-col items-center text-center">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{key}</p>
                                    <p className="text-2xl font-black text-slate-800 group-hover:text-[#1cb0f6] transition-colors">{val}%</p>
                                    <div className="w-full h-1.5 bg-slate-100 rounded-full mt-3 overflow-hidden border border-slate-100">
                                        <div className="h-full bg-sky-400 rounded-full transition-all duration-1000 shadow-[0_0_8px_rgba(28,176,246,0.5)]" style={{ width: `${val}%` }}></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="bg-green-50 p-6 rounded-[32px] border-2 border-green-100 border-b-[8px] flex items-center justify-between group cursor-default">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-green-500 border-b-4 border-green-100 shadow-sm group-hover:scale-110 transition-transform">
                                <ShieldCheck size={24} strokeWidth={3} />
                            </div>
                            <div>
                                <h5 className="font-black text-slate-700 text-sm uppercase tracking-tight">Systematic Calibration</h5>
                                <p className="text-green-600 font-bold text-[10px] uppercase tracking-widest">Last Sync: {dna.lastUpdated ? new Date(dna.lastUpdated).toLocaleDateString() : 'Never'}</p>
                            </div>
                        </div>
                        <Trophy size={24} className="text-green-200 group-hover:text-green-500 transition-colors" />
                    </div>
                </div>
            </div>
        </div>
    );
};
