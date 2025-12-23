
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DomainType, GenericVaultItem } from '../../../core/contracts/entityMap';
import { DOMAIN_CONFIGS } from '../../../core/contracts/domainConfig';
import { getVaultItemById } from '../../../core/access/vaultAccess';
import { 
    ChevronLeft, Building2, Target, ArrowRight, Zap, 
    BookOpen, Map, ShieldCheck, Star, 
    MapPin, Clock, Award, Info, ListChecks, GraduationCap, ShieldAlert,
    BrainCircuit, Fingerprint, Activity, Sparkles, Layout, FileText, RefreshCw
} from 'lucide-react';
import { DuoButton } from '../../../components/DuoButton';
import { VaultTabs } from './detail/VaultTabs';
import { VaultChecklist } from './detail/VaultChecklist';
import { TargetRoadmap } from '../../target/components/widgets/TargetRoadmap';
import { ApplicationConfirmModal } from './ApplicationConfirmModal';
import { AdmissionService } from '../../admission/services/admissionService';
import { useLanguage } from '../../../core/hooks/useLanguage';
import { DuoIcon } from '../../../components/ui/DuoIcon';
import { renderJuicyContent } from '../../../core/engines/contentRenderer';

export const VaultDetailView: React.FC = () => {
    const { domain, detailId } = useParams<{ domain: string; detailId: string }>();
    const navigate = useNavigate();
    const { lang, t } = useLanguage();
    const domainEnum = (domain as DomainType) || DomainType.STUDENT;
    const config = DOMAIN_CONFIGS[domainEnum];

    const [item, setItem] = useState<GenericVaultItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'BRIEF' | 'ROADMAP' | 'CRITERIA'>('BRIEF');
    const [showConfirm, setShowConfirm] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    
    // Fix: Defuse timer leak
    const createTimerRef = useRef<any>(null);

    useEffect(() => {
        if (!detailId) return;
        setLoading(true);
        try {
            const data = getVaultItemById(detailId, domainEnum, lang);
            setItem(data);
        } catch (error) {
            console.error("[Vault] Failed to fetch item intel", error);
        } finally {
            setLoading(false);
        }

        return () => {
            if (createTimerRef.current) clearTimeout(createTimerRef.current);
        };
    }, [detailId, domainEnum, lang]);

    const handleApply = () => {
        if (!item) return;
        setIsCreating(true);
        
        // Fix: Use ref to manage timeout lifecycle
        createTimerRef.current = setTimeout(() => {
            try {
                const newApp = AdmissionService.createFromVault(item, domainEnum);
                setIsCreating(false);
                setShowConfirm(false);
                navigate(`/${domain}/workspace/target/${newApp.targetId}`);
            } catch (error) {
                console.error("[Admission] Strike creation failed", error);
                setIsCreating(false);
            }
        }, 1200);
    };

    if (loading) return (
        <div className="p-20 text-center flex flex-col items-center gap-6 animate-pulse">
            <div className="w-16 h-16 bg-sky-100 rounded-2xl border-b-[6px] border-sky-200 flex items-center justify-center text-sky-500">
                <RefreshCw size={32} className="animate-spin" />
            </div>
            <p className="font-black text-slate-300 uppercase tracking-widest text-xs">Syncing Mission Intel...</p>
        </div>
    );
    
    if (!item) return <div className="p-20 text-center font-black text-slate-300 uppercase tracking-widest">Intel Discarded (Not Found)</div>;

    const daysLeft = Math.ceil((new Date(item.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24));

    return (
        <div className="animate-in slide-in-from-right duration-500 pb-32 max-w-6xl mx-auto px-4">
            <ApplicationConfirmModal isOpen={showConfirm} title={item.title} onConfirm={handleApply} onCancel={() => setShowConfirm(false)} isCreating={isCreating} themeColor={config.theme} />

            <div className="mb-4">
                <DuoButton variant="navigation" startIcon={ChevronLeft} onClick={() => navigate(-1)} className="!py-1.5">{t.common.back}</DuoButton>
            </div>

            {/* HEADER HERO */}
            <div className={`relative bg-duo-blue rounded-[32px] border-b-[10px] border-duo-blueDark p-6 md:p-10 text-white overflow-hidden mb-8 shadow-lg group`}>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none group-hover:scale-105 transition-transform duration-[2000ms]"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                    <div className="shrink-0 relative">
                        <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-[28px] flex items-center justify-center shadow-xl border-[4px] border-white/30 transform -rotate-2 group-hover:rotate-0 transition-all duration-700">
                             <Target className="w-12 h-12 md:w-16 md:h-16 text-duo-blue stroke-[2.5px]" />
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-xl font-black text-[9px] border-b-2 border-yellow-600 shadow-lg flex items-center gap-1">
                            <Sparkles size={10} fill="currentColor" /> {item.matchScore}% Match
                        </div>
                    </div>
                    <div className="text-center md:text-left flex-1 space-y-3">
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                            <span className="bg-black/20 backdrop-blur-md px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-[0.2em] border border-white/10">{item.category}</span>
                            <span className="bg-white/10 text-white/80 px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-[0.1em] border border-white/5 flex items-center gap-1.5">
                                <MapPin size={10} /> {item.location}
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black leading-tight tracking-tighter">{item.title}</h1>
                        <p className="font-bold text-sky-50 text-sm md:text-base flex items-center justify-center md:justify-start gap-2 opacity-90">
                            <Building2 size={18} /> {item.hostName}
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8 space-y-8">
                    <VaultTabs activeTab={activeTab} onTabChange={setActiveTab} />
                    
                    <div className="min-h-[400px]">
                        {activeTab === 'BRIEF' && (
                            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                <section className="space-y-4">
                                    <div className="flex items-center gap-2.5 px-1">
                                        <DuoIcon icon={BookOpen} color="blue" size="sm" />
                                        <h3 className="text-sm font-black text-slate-400 tracking-widest uppercase">The Mission Briefing</h3>
                                    </div>
                                    <div className="bg-white p-6 md:p-8 rounded-[28px] border-2 border-slate-200 border-b-[6px] shadow-sm relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-6 opacity-[0.02] group-hover:scale-110 transition-transform"><BookOpen size={120} /></div>
                                        <p className="text-base md:text-lg font-bold text-slate-600 leading-relaxed relative z-10">
                                            {renderJuicyContent(item.description)}
                                        </p>
                                    </div>
                                </section>

                                <section className="space-y-4">
                                    <div className="flex items-center gap-2.5 px-1">
                                        <DuoIcon icon={ShieldCheck} color="purple" size="sm" />
                                        <h3 className="text-sm font-black text-slate-400 tracking-widest uppercase">Prerequisites</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {item.requirements.map((req) => (
                                            <div key={req.id} className="bg-white p-5 rounded-[24px] border-2 border-slate-200 border-b-[6px] hover:border-purple-200 transition-all flex gap-4 group cursor-default">
                                                <div className="w-12 h-12 bg-slate-50 rounded-xl border-b-4 border-slate-100 flex items-center justify-center text-slate-300 group-hover:bg-purple-500 group-hover:text-white transition-all shrink-0">
                                                    {req.type === 'document' ? <FileText size={24} /> : <Target size={24} />}
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-[8px] font-black text-purple-400 uppercase tracking-widest mb-1">{req.type}</p>
                                                    <h4 className="font-black text-slate-700 text-sm leading-tight truncate">{req.label}</h4>
                                                    <div className="flex items-center gap-1.5 mt-2">
                                                        <div className={`w-1.5 h-1.5 rounded-full ${req.mandatory ? 'bg-red-400 animate-pulse' : 'bg-slate-300'}`}></div>
                                                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{req.mandatory ? 'Mandatory' : 'Optional'}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </div>
                        )}

                        {activeTab === 'ROADMAP' && (
                            <div className="animate-in zoom-in-95 duration-500">
                                <TargetRoadmap milestones={item.roadmap || []} />
                            </div>
                        )}

                        {activeTab === 'CRITERIA' && (
                            <div className="animate-in slide-in-from-right-2 duration-500">
                                <VaultChecklist item={item} onStartApp={() => setShowConfirm(true)} themeColor={config.theme} />
                            </div>
                        )}
                    </div>
                </div>

                <div className="lg:col-span-4 space-y-6 sticky top-6">
                    <div className="bg-white p-6 rounded-[32px] border-2 border-slate-200 border-b-[12px] shadow-lg text-center space-y-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-5 rotate-12 group-hover:rotate-0 transition-transform duration-700"><Target size={120} /></div>
                        <div className="space-y-1 relative z-10">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Deployment Window</p>
                            <h4 className="text-2xl font-black text-slate-800 flex items-center justify-center gap-2">
                                <Clock className="w-5 h-5 text-orange-500" strokeWidth={3} />
                                {new Date(item.deadline).toLocaleDateString()}
                            </h4>
                            <div className={`mt-2 inline-block px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border-2 ${daysLeft < 30 ? 'bg-red-50 text-red-500 border-red-100 animate-pulse' : 'bg-green-50 text-green-600 border-green-100'}`}>
                                {daysLeft} Days Remaining
                            </div>
                        </div>

                        <div className="w-full space-y-3 relative z-10">
                            <DuoButton 
                                fullWidth 
                                themeColor={config.theme} 
                                onClick={() => setShowConfirm(true)} 
                                endIcon={ArrowRight}
                                className="!py-4 text-base uppercase tracking-widest shadow-lg rounded-2xl"
                            >
                                Start Mission
                            </DuoButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
