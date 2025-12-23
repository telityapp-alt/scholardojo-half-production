
import React, { useState, useEffect } from 'react';
import { ShieldCheck, RefreshCw, BarChart3, Fingerprint, BrainCircuit } from 'lucide-react';
import { ProfileAccess, UserDNA } from '../../../../core/access/profileAccess';
import { DomainType } from '../../../../core/contracts/entityMap';
import { AssessmentModal } from '../../../dashboard/components/widgets/AssessmentModal';
import { AnalyticsRadar } from '../../../melytics/components/AnalyticsRadar';

interface MissionIntelProps {
    targetId: string;
    domain: DomainType;
}

export const MissionIntel: React.FC<MissionIntelProps> = ({ targetId, domain }) => {
    const [dna, setDna] = useState<UserDNA>(() => ProfileAccess.getDNA(domain));
    const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);

    const refresh = () => {
        setDna(ProfileAccess.getDNA(domain));
    };

    useEffect(() => {
        refresh();
        window.addEventListener('storage', refresh);
        return () => window.removeEventListener('storage', refresh);
    }, [domain, targetId]);

    const avgScore = Math.round((dna.scores.technical + dna.scores.leadership + dna.scores.resilience + dna.scores.academic + dna.scores.fit + dna.scores.impact) / 6);
    const hasCalibrated = dna.lastUpdated !== '';

    return (
        <div className="animate-in fade-in duration-500 w-full h-fit shrink-0">
            <AssessmentModal 
                isOpen={isAssessmentOpen} 
                onClose={() => setIsAssessmentOpen(false)} 
                domain={domain}
                onComplete={refresh}
            />

            <div className="bg-white rounded-[24px] border-2 border-slate-200 border-b-[6px] p-4 shadow-sm overflow-hidden relative group h-fit">
                <div className="relative z-10 flex flex-col">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-1 shrink-0 px-1">
                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7 bg-slate-900 rounded-lg flex items-center justify-center text-white border-b-2 border-black">
                                <BarChart3 size={14} strokeWidth={3} />
                            </div>
                            <h3 className="text-xs font-black text-slate-700 uppercase tracking-tight italic">Matrix</h3>
                        </div>
                        <div className="text-right leading-none">
                             <span className={`text-xl font-black ${!hasCalibrated ? 'text-slate-300' : 'text-slate-800'}`}>{avgScore}</span>
                             <span className="text-[7px] font-black text-slate-400 uppercase ml-1">Power</span>
                        </div>
                    </div>

                    {/* Chart Area - FIXED HEIGHT SHIELD */}
                    <div className="relative w-full h-[200px] flex items-center justify-center bg-slate-50/50 rounded-xl border border-slate-100/50 overflow-visible my-1">
                        <div className={`transition-opacity duration-700 ${!hasCalibrated ? 'opacity-10 blur-sm' : 'opacity-100'}`}>
                            <AnalyticsRadar scores={dna.scores} color="#1cb0f6" />
                        </div>

                        {!hasCalibrated && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <BrainCircuit size={24} className="text-slate-200 animate-pulse mb-1" />
                                <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest">DNA Sync Required</p>
                            </div>
                        )}
                    </div>

                    {/* Stats Footer - Tighter */}
                    <div className="grid grid-cols-2 gap-2 mt-2">
                        <div className="flex flex-col p-1.5 px-2 bg-slate-50 rounded-lg border border-slate-100">
                            <span className="font-black text-slate-400 text-[7px] uppercase leading-none mb-0.5 tracking-tighter">Academic</span>
                            <span className="font-black text-slate-700 text-[10px] leading-none">{dna.currentGpa.toFixed(2)}</span>
                        </div>
                        <div className="flex flex-col p-1.5 px-2 bg-slate-50 rounded-lg border border-slate-100">
                            <span className="font-black text-slate-400 text-[7px] uppercase leading-none mb-0.5 tracking-tighter">Efficiency</span>
                            <span className="font-black text-slate-700 text-[10px] leading-none">{avgScore}%</span>
                        </div>
                    </div>

                    <button 
                        onClick={() => setIsAssessmentOpen(true)}
                        className="w-full mt-3 py-2 bg-[#1cb0f6] border-b-[4px] border-[#1899d6] rounded-xl font-black text-[9px] uppercase tracking-[0.15em] text-white hover:brightness-110 active:border-b-0 active:translate-y-[4px] transition-all flex items-center justify-center gap-1.5"
                    >
                        <RefreshCw size={10} strokeWidth={4} /> Recalibrate DNA
                    </button>
                </div>
            </div>
        </div>
    );
};
