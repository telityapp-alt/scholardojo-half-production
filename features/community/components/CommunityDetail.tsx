
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DomainType } from '../../../core/contracts/entityMap';
import { CommunityService } from '../services/communityService';
import { UnifiedProgram } from '../../programs/types';
import { DuoButton } from '../../../components/DuoButton';
import { DuoIcon } from '../../../components/ui/DuoIcon';
import { 
    ChevronLeft, BookOpen, Globe, ArrowRight, Building2, 
    MapPin, Zap, Star, Share2, Heart, ExternalLink,
    ShieldAlert, Info, Gem, Target, ShieldCheck, AlertTriangle
} from 'lucide-react';
import { renderJuicyContent } from '../../../core/engines/contentRenderer';
import { SaveService } from '../../../core/access/saveAccess';
import { BriefingTab } from '../../programs/components/detail/BriefingTab';
import { ShadowProtocolTab } from '../../programs/components/detail/ShadowProtocolTab';

export const CommunityDetail: React.FC = () => {
    const { domain, detailId } = useParams<{ domain: string; detailId: string }>();
    const navigate = useNavigate();
    const [program, setProgram] = useState<UnifiedProgram | null>(null);
    const [loading, setLoading] = useState(true);
    const [isSaved, setIsSaved] = useState(false);

    const domainEnum = (domain as DomainType) || DomainType.SCHOLAR;

    useEffect(() => {
        if (!detailId) return;
        setLoading(true);
        setTimeout(() => {
            const p = CommunityService.getProgramById(detailId);
            if (p) {
                setProgram(p);
                setIsSaved(SaveService.isSaved(p.id));
            }
            setLoading(false);
        }, 400);
    }, [detailId, domainEnum]);

    const handleSave = () => {
        if (!program) return;
        const saved = SaveService.toggle(program, 'COMMUNITY', domainEnum);
        setIsSaved(saved);
    };

    if (loading) return (
        <div className="p-20 text-center flex flex-col items-center gap-4 animate-pulse">
            <div className="w-12 h-12 bg-sky-100 rounded-2xl flex items-center justify-center text-[#1cb0f6]">
                <Zap size={24} fill="currentColor" />
            </div>
            <p className="font-black text-xs text-slate-300 uppercase tracking-widest">Gathering Intel...</p>
        </div>
    );

    if (!program) return (
        <div className="p-12 text-center bg-white rounded-[32px] border-2 border-dashed border-slate-200">
            <h2 className="text-xl font-black text-slate-400">Target Discarded</h2>
            <DuoButton themeColor="blue" className="mt-4" onClick={() => navigate(-1)}>Back to Board</DuoButton>
        </div>
    );

    return (
        <div className="animate-in slide-in-from-right duration-500 pb-24 max-w-7xl mx-auto px-4">
            
            <div className="flex items-center justify-between mb-6">
                <DuoButton variant="navigation" startIcon={ChevronLeft} onClick={() => navigate(-1)}>
                    Back to Board
                </DuoButton>
                <div className="flex gap-2">
                    <button className="w-10 h-10 bg-white rounded-xl border-2 border-slate-200 border-b-4 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-all active:translate-y-1 active:border-b-2">
                        <Share2 size={18} />
                    </button>
                    <button onClick={handleSave} className={`w-10 h-10 bg-white rounded-xl border-2 border-slate-200 border-b-4 flex items-center justify-center transition-all ${isSaved ? 'text-pink-500 border-pink-200' : 'text-slate-400 border-slate-200 hover:text-pink-400'}`}>
                        <Heart size={18} fill={isSaved ? "currentColor" : "none"} strokeWidth={3} />
                    </button>
                </div>
            </div>

            {/* COMPACT HERO */}
            <div className="bg-[#1cb0f6] rounded-[32px] border-b-[10px] border-[#1899d6] p-6 md:p-8 text-white relative overflow-hidden shadow-lg mb-8 group">
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-1000"></div>
                 
                 <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                    <div className="shrink-0">
                        <div className="w-20 h-20 bg-white rounded-[24px] border-b-[6px] border-sky-200 flex items-center justify-center shadow-xl transform group-hover:rotate-2 transition-transform">
                            <Globe size={40} className="text-[#1cb0f6]" strokeWidth={2.5} />
                        </div>
                    </div>

                    <div className="text-center md:text-left flex-1">
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
                            <span className="bg-black/20 backdrop-blur-md px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest border border-white/20">Community Scanned</span>
                            <span className="bg-white/10 px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest border border-white/5 flex items-center gap-1"><MapPin size={10} /> {program.country}</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
                            {program.title}
                        </h1>
                        <p className="text-sky-50 font-bold text-sm mt-1 opacity-90 flex items-center justify-center md:justify-start gap-2">
                            <Building2 size={16} /> {program.organizer}
                        </p>
                    </div>
                 </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* LEFT CONTENT: THE FULL MISSION DATA */}
                <div className="lg:col-span-8 space-y-10">
                    
                    {/* Warning Notice */}
                    <div className="bg-orange-50 rounded-[24px] border-2 border-orange-200 border-b-[6px] p-5 flex items-center gap-5 shadow-sm">
                        <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white shrink-0">
                            <ShieldAlert size={20} strokeWidth={3} />
                        </div>
                        <p className="text-orange-700 text-[11px] font-bold leading-tight">
                            Data ini diekstrak oleh komunitas menggunakan AI. Verifikasi sumber resmi sebelum melakukan pendaftaran final.
                        </p>
                    </div>

                    {/* Mission Brief Section */}
                    <div className="bg-white p-8 rounded-[32px] border-2 border-slate-200 border-b-[8px] shadow-sm relative overflow-hidden">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-sky-100 text-sky-600 rounded-lg border-b-2 border-sky-200">
                                <Info size={16} strokeWidth={3} />
                            </div>
                            <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">Mission Briefing</h3>
                        </div>
                        <p className="text-base font-bold text-slate-600 leading-relaxed italic border-l-4 border-sky-200 pl-6 mb-8">
                            {renderJuicyContent(program.intel.description)}
                        </p>
                        
                        <BriefingTab program={program} />
                    </div>

                    {/* Secret Keys Section */}
                    <div className="bg-slate-900 rounded-[40px] border-b-[12px] border-black p-8 md:p-10 shadow-xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')] opacity-10"></div>
                        <div className="relative z-10 space-y-12">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-yellow-400 text-yellow-900 rounded-xl border-b-2 border-yellow-600 shadow-md">
                                    <Gem size={20} strokeWidth={3} />
                                </div>
                                <h3 className="text-xl font-black text-white uppercase tracking-tight">Shadow Protocol Keys</h3>
                            </div>
                            
                            <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm">
                                <p className="text-[10px] font-black text-yellow-400 uppercase tracking-[0.3em] mb-3">Expert Verdict</p>
                                <p className="text-xl font-bold text-sky-50 italic">"{program.shadowProtocol.expertVerdict}"</p>
                            </div>

                            <ShadowProtocolTab program={program} />
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDEBAR: FLOATING ACTION STRIKE */}
                <div className="lg:col-span-4 sticky top-6 space-y-6">
                    <div className="bg-white p-6 rounded-[32px] border-2 border-slate-200 border-b-[10px] shadow-lg flex flex-col items-center text-center space-y-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5 rotate-12"><Target size={120} /></div>
                        
                        <div className="relative z-10 w-full">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">Mission Deadline</p>
                            <h4 className="text-2xl font-black text-slate-800">
                                {new Date(program.deadline).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}
                            </h4>
                        </div>

                        <div className="w-full space-y-3 relative z-10">
                            <DuoButton 
                                fullWidth 
                                themeColor="blue" 
                                onClick={() => window.open(program.applyUrl, '_blank')} 
                                endIcon={ExternalLink}
                                className="!py-4 text-sm uppercase tracking-widest shadow-xl rounded-2xl"
                            >
                                Strike Now
                            </DuoButton>

                            <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border-2 border-slate-100">
                                <ShieldCheck size={20} className="text-green-500" />
                                <div className="text-left">
                                    <p className="font-black text-slate-700 text-[10px] uppercase">Registry Synced</p>
                                    <p className="text-[9px] font-bold text-slate-400 leading-tight">This track is community verified.</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t-2 border-slate-50 w-full">
                            <p className="text-[8px] font-black text-slate-300 uppercase tracking-[0.4em]">Node Connection Stable</p>
                        </div>
                    </div>

                    {/* Stats Summary Panel */}
                    <div className="bg-white p-6 rounded-[32px] border-2 border-slate-200 border-b-[10px] shadow-md space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Target size={14} className="text-red-500" />
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Selectivity</span>
                            </div>
                            <span className="font-black text-slate-700">{program.intel.stats?.selectivityRatio}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Gem size={14} className="text-sky-500" />
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Loot Value</span>
                            </div>
                            <span className="font-black text-slate-700">{program.intel.financialValue?.totalValue || 'N/A'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
