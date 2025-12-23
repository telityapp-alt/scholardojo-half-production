
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
    ShieldCheck, Check, Zap, FileText, CheckSquare, Fingerprint
} from 'lucide-react';
import { DossierService, CampaignDossier } from '../../services/dossierService';
import { UnifiedProgramService } from '../../../programs/services/unifiedProgramService';
import { useStorageSync } from '../../../../core/hooks/useStorageSync';

interface MissionDossierProps {
    targetId: string;
    targetTitle: string;
}

export const MissionDossier: React.FC<MissionDossierProps> = ({ targetId, targetTitle }) => {
    const [dossier, setDossier] = useState<CampaignDossier | null>(null);

    const program = useMemo(() => UnifiedProgramService.getById(targetId), [targetId]);
    const requiredKeys = program?.dossierRequirementKeys || [];
    
    const refresh = useCallback(() => {
        const data = DossierService.getForTarget(targetId) || DossierService.createInitial(targetId);
        setDossier(data);
    }, [targetId]);

    useEffect(() => {
        refresh();
    }, [refresh]);

    // Unified cross-tab synchronization
    useStorageSync(refresh);

    const activeReadiness = useMemo(() => {
        if (!dossier) return 0;
        const filtered = dossier.requirements.filter(r => requiredKeys.includes(r.id));
        if (filtered.length === 0) return 0;
        const completed = filtered.filter(r => r.status === 'COMPLETED').length;
        return Math.round((completed / filtered.length) * 100);
    }, [dossier, requiredKeys]);

    const handleToggleCheck = (itemId: string) => {
        DossierService.toggleItem(targetId, itemId);
        refresh();
    };

    if (!dossier) return null;

    return (
        <div id="mission-dossier-section" className="mt-28 pb-32 animate-in fade-in duration-500 max-w-7xl mx-auto px-4">
            {/* Header Banner */}
            <div className="bg-[#1cb0f6] rounded-[48px] border-b-[12px] border-[#1899d6] p-8 text-white mb-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative group">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="relative z-10 flex items-center gap-6">
                    <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-[#1cb0f6] shadow-lg border-b-4 border-slate-200 group-hover:rotate-3 transition-transform">
                        <ShieldCheck size={40} strokeWidth={3} />
                    </div>
                    <div>
                        <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white leading-none">The Complete Dossier</h2>
                        <p className="text-sky-100 font-bold text-xs uppercase tracking-[0.2em] opacity-80 mt-2">Dojo Universal Archive Registry</p>
                    </div>
                </div>
                <div className="relative z-10 flex items-center gap-6 bg-white/20 backdrop-blur-md px-6 py-4 rounded-[32px] border border-white/20">
                    <div className="text-right">
                        <p className="text-[10px] font-black uppercase tracking-widest leading-none mb-2 opacity-70">Active Readiness</p>
                        <p className="font-black text-3xl leading-none">{activeReadiness}%</p>
                    </div>
                    <div className="w-32 h-5 bg-white/20 rounded-full overflow-hidden border border-white/10 shadow-inner p-1">
                        <div className="h-full bg-[#58cc02] rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(88,204,2,0.6)]" style={{ width: `${activeReadiness}%` }} />
                    </div>
                </div>
            </div>

            {/* Dossier Categories */}
            <div className="space-y-16">
                {dossier.categories.map((cat) => (
                    <div key={cat.id} className="space-y-8">
                        <div className="flex items-center gap-3 px-2">
                            <div className="w-2.5 h-10 bg-slate-900 rounded-full shadow-sm"></div>
                            <h3 className="font-black text-slate-800 text-xl uppercase tracking-[0.2em]">{cat.title}</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {cat.items.map((item) => {
                                const isRequired = requiredKeys.includes(item.id);
                                const isCompleted = item.status === 'COMPLETED';
                                
                                return (
                                    <div 
                                        key={item.id} 
                                        onClick={() => handleToggleCheck(item.id)}
                                        className={`
                                            group relative flex flex-col p-6 rounded-[40px] border-2 transition-all cursor-pointer shadow-sm
                                            ${!isRequired ? 'bg-slate-50 border-slate-200 border-b-[4px] opacity-40 hover:opacity-100 grayscale hover:grayscale-0' : 
                                              isCompleted ? 'bg-white border-[#58cc02] border-b-[10px]' : 
                                              'bg-white border-slate-200 border-b-[10px] hover:border-[#1cb0f6] active:translate-y-[4px] active:border-b-4'}
                                        `}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-14 h-14 rounded-[20px] border-b-4 flex items-center justify-center transition-all shrink-0 
                                                ${!isRequired ? 'bg-slate-100 border-slate-200 text-slate-300' : 
                                                  isCompleted ? 'bg-[#58cc02] border-[#46a302] text-white shadow-lg' : 
                                                  'bg-slate-50 border-slate-200 text-slate-300 group-hover:bg-white group-hover:text-sky-500'}
                                            `}>
                                                {item.type === 'DOC' ? <FileText size={28} /> : item.type === 'FIELD' ? <Fingerprint size={28} /> : <CheckSquare size={28} />}
                                            </div>
                                            <div className="truncate flex-1">
                                                <p className={`font-black text-base truncate ${!isRequired ? 'text-slate-400' : isCompleted ? 'text-slate-800' : 'text-slate-700'}`}>{item.label}</p>
                                                <div className="flex items-center gap-1.5 mt-0.5">
                                                    {isRequired ? (
                                                        <span className="text-[9px] font-black text-red-500 uppercase tracking-widest flex items-center gap-1"><Zap size={10} fill="currentColor"/> Core Mission Unit</span>
                                                    ) : (
                                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Shadow Asset</span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className={`w-8 h-8 rounded-full border-b-2 flex items-center justify-center transition-all ${isCompleted ? 'bg-green-500 text-white border-green-700' : 'bg-white border-slate-200 text-slate-200'}`}>
                                                <Check size={14} strokeWidth={5} />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
