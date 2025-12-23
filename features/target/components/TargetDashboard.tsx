
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TargetService } from '../services/targetService';
import { TargetAnalysis } from '../types';
import { LeaderboardWidget } from './widgets/LeaderboardWidget';
import { ProbabilityEngine } from './widgets/ProbabilityEngine';
import { ProfileSynapse } from './widgets/ProfileSynapse';
import { MissionCenter } from './widgets/MissionCenter';
import { MissionDossier } from './widgets/MissionDossier';
import { MissionIntel } from './widgets/MissionIntel';
import { ProfileAccess } from '../../../core/access/profileAccess';
import { ArrowLeft, RefreshCw, Target, Sparkles, Clock, Zap } from 'lucide-react';
import { DomainType } from '../../../core/contracts/entityMap';
import { UnifiedProgramService } from '../../programs/services/unifiedProgramService';

interface TargetDashboardProps {
    injectedId?: string;
    hideHeader?: boolean;
}

export const TargetDashboard: React.FC<TargetDashboardProps> = ({ injectedId, hideHeader = false }) => {
    const { domain, detailId: paramId } = useParams<{ domain: string; detailId: string }>();
    const navigate = useNavigate();
    
    const activeTargetId = injectedId || paramId;
    const domainEnum = (domain as DomainType) || DomainType.STUDENT;
    
    const [data, setData] = useState<TargetAnalysis | null>(null);
    const [loading, setLoading] = useState(true);

    const dna = ProfileAccess.getDNA(domainEnum);
    const program = activeTargetId ? UnifiedProgramService.getById(activeTargetId) : null;

    const loadIntel = async () => {
        if (!activeTargetId) return;
        const result = await TargetService.analyzeTarget(activeTargetId, domainEnum);
        if (result) setData(result);
    };

    useEffect(() => {
        setLoading(true);
        loadIntel().then(() => setLoading(false));
        
        window.addEventListener('storage', loadIntel);
        return () => window.removeEventListener('storage', loadIntel);
    }, [activeTargetId, domainEnum]);

    if (loading) return (
        <div className="h-96 flex flex-col items-center justify-center animate-in fade-in duration-500">
            <div className="w-20 h-20 bg-sky-100 rounded-[32px] border-b-[8px] border-sky-200 flex items-center justify-center text-sky-500 mb-6">
                <RefreshCw size={40} className="animate-spin" />
            </div>
            <p className="font-black text-xs text-slate-300 uppercase tracking-[0.3em] animate-pulse">Syncing Tactical Grid...</p>
        </div>
    );
    
    if (!data) return null;

    const daysLeft = Math.ceil((new Date(data.scholarship.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24));

    return (
        <div className={`animate-in slide-in-from-bottom-6 duration-700 ${hideHeader ? '' : 'pb-32 max-w-7xl mx-auto px-4'}`}>
            {!hideHeader && (
                <div className="flex justify-between items-center mb-8">
                    <button 
                        onClick={() => navigate(`/${domain}/workspace/target`)} 
                        className="group flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border-2 border-slate-200 border-b-[5px] text-slate-500 font-black uppercase text-[10px] tracking-widest hover:bg-slate-50 active:border-b-2 active:translate-y-[3px]"
                    >
                        <ArrowLeft size={18} strokeWidth={3} />
                        <span>Exit Command Center</span>
                    </button>
                    <div className="flex items-center gap-2">
                         <div className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest border-b-4 border-indigo-800 shadow-lg">Target: Secured</div>
                    </div>
                </div>
            )}

            {/* HERO BLOCK */}
            <div className="bg-white rounded-[48px] border-2 border-slate-200 border-b-[12px] p-8 md:p-12 mb-10 relative overflow-hidden group shadow-2xl">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none"></div>
                <div className="absolute top-0 right-0 p-12 opacity-[0.05] group-hover:scale-110 transition-transform duration-[2000ms] text-slate-900 pointer-events-none">
                    <Target size={260} strokeWidth={2.5} />
                </div>
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                    <div className="w-24 h-24 bg-white rounded-3xl border-2 border-slate-100 flex items-center justify-center p-4 shadow-xl shrink-0">
                         <img src={program?.organizerLogo} className="w-full h-full object-contain" alt="" />
                    </div>
                    <div>
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                            <div className="bg-red-500 text-white px-4 py-1.5 rounded-xl text-[10px] font-black uppercase border-b-4 border-red-700 shadow-lg tracking-wider">
                                <Sparkles size={12} className="inline mr-2 fill-current" /> {data.scholarship.category}
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-slate-800 leading-tight tracking-tighter mb-4">{data.scholarship.name}</h1>
                        <div className="flex items-center gap-6 text-slate-400 font-extrabold text-[11px] uppercase tracking-[0.15em]">
                            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${daysLeft < 30 ? 'bg-red-50 text-red-500 border-red-100 animate-pulse' : 'bg-green-50 text-green-600 border-green-100'}`}>
                                <Clock size={14} /> {daysLeft} Days Remaining
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ANALYTICS ROW */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10 items-start">
                <LeaderboardWidget 
                    user={{ name: dna.name, avatarSeed: dna.avatarSeed }} 
                    rank={data.competition.userRank} 
                    totalApplicants={data.competition.totalApplicants} 
                    percentile={data.competition.percentile} 
                    standingLabel={data.competition.standingLabel}
                    trend="UP"
                />
                <ProbabilityEngine ratioString={data.competition.ratioString} probability={data.prediction.score} difficulty={program?.difficultyLevel} />
                <ProfileSynapse analysis={data} />
            </div>

            {/* MISSION CONTROL - FIXED: Added items-start to prevent vertical stretching */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                <div className="lg:col-span-8">
                    <MissionCenter analysis={data} onTaskComplete={loadIntel} />
                </div>
                <div className="lg:col-span-4 space-y-6">
                    {/* INTEGRATED IDENTITY CORE */}
                    <MissionIntel targetId={activeTargetId!} domain={domainEnum} />
                    
                    <div className="bg-slate-900 rounded-[32px] border-b-[8px] border-black p-6 text-white relative overflow-hidden group shadow-xl">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')] opacity-10"></div>
                        <h4 className="font-black text-sky-400 uppercase text-[9px] tracking-[0.3em] mb-3 flex items-center gap-2"><Zap size={12}/> Tactical Tip</h4>
                        <p className="font-bold text-slate-300 text-xs leading-relaxed italic">
                            "Recalibrating your DNA updates your Neural Matrix globally. Ensure your records are confirmed."
                        </p>
                    </div>
                </div>
            </div>

            {/* DOSSIER */}
            <MissionDossier targetId={data.scholarship.id} targetTitle={data.scholarship.name} />
        </div>
    );
};
