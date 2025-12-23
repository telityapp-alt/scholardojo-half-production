
import React, { useState, useRef, useMemo } from 'react';
import { 
    X, Check, Zap, FileText, BrainCircuit, 
    Target, ShieldCheck, FileUp, Loader2, Sparkles, 
    Edit3, Link, AlertTriangle, HelpCircle, ArrowRight, ShieldAlert
} from 'lucide-react';
import { AdmissionRequirement } from '../types';
import { DocumentService } from '../../target/services/documentService';
import { DossierService } from '../../target/services/dossierService';
import { ArsenalService } from '../../documentArsenal/services/arsenalService';
import { DuoButton } from '../../../components/DuoButton';
import { ProfileAccess } from '../../../core/access/profileAccess';
import { DomainType } from '../../../core/contracts/entityMap';
import { UnifiedProgramService } from '../../programs/services/unifiedProgramService';
import confetti from 'canvas-confetti';

interface RequirementDetailModalProps {
    requirement: AdmissionRequirement;
    appId: string; 
    appName: string;
    onClose: () => void;
    onUpdate: (updates: Partial<AdmissionRequirement>) => void;
}

export const RequirementDetailModal: React.FC<RequirementDetailModalProps> = ({ 
    requirement, 
    appId, 
    appName, 
    onClose, 
    onUpdate
}) => {
    const [content, setContent] = useState(requirement.content || '');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [isParsing, setIsParsing] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const [isLinking, setIsLinking] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const isField = requirement.type === 'FIELD';
    const score = requirement.analysisScore || 0;

    // Arsenal Blueprint Detection
    const blueprint = useMemo(() => 
        ArsenalService.getBlueprintForRequirement(appId, requirement.id)
    , [appId, requirement.id]);

    const program = useMemo(() => UnifiedProgramService.getById(appId), [appId]);

    const handleSyncFromDossier = (itemId: string) => {
        const item = DossierService.getItem(appId, itemId);
        if (item && item.content) {
            setContent(item.content);
            onUpdate({ 
                content: item.content, 
                analysisScore: item.score, 
                status: item.status === 'AI_VERIFIED' ? 'VERIFIED' : 'UPLOADED' 
            });
            confetti({ particleCount: 100, spread: 50, origin: { y: 0.8 }, colors: ['#1cb0f6'] });
        }
        setIsLinking(false);
    };

    const handleRunAnalysis = async () => {
        if (!content.trim() || isAnalyzing) return;
        setIsAnalyzing(true);
        try {
            let result;
            if (blueprint) {
                const audit = await ArsenalService.auditDocument(content, blueprint);
                result = {
                    score: audit.score,
                    feedback: audit.checkpointFeedback.map(cf => cf.tip),
                    isArsenalVerified: true,
                    status: audit.score >= 85 ? 'VERIFIED' : 'UPLOADED'
                };
            } else {
                const audit = await DocumentService.analyzeContent({ ...requirement, content }, appName);
                result = {
                    score: audit.score,
                    feedback: audit.feedback,
                    isArsenalVerified: false,
                    status: audit.status === 'STANDOUT' ? 'VERIFIED' : 'UPLOADED'
                };
            }

            onUpdate({ 
                content,
                analysisScore: result.score,
                analysisFeedback: result.feedback,
                status: result.status as any
            });

            const domainEnum = program?.domain || DomainType.STUDENT;
            const boostFactor = (result.score / 100) * (result.isArsenalVerified ? 1.5 : 1.0);
            ProfileAccess.updateScores(domainEnum, {
                technical: requirement.id === 'cv' ? 10 * boostFactor : 2 * boostFactor,
                fit: requirement.id.includes('essay') ? 12 * boostFactor : 3 * boostFactor
            });

            if (result.score >= 85) {
                confetti({ particleCount: 150, spread: 70, origin: { y: 0.7 }, colors: result.isArsenalVerified ? ['#58cc02', '#ffffff'] : ['#fbbf24', '#ffffff'] });
            }
        } catch (e) {
            console.error("Neural Analysis Failed", e);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const theme = blueprint 
        ? { color: 'text-[#58cc02]', bg: 'bg-[#58cc02]', border: 'border-[#46a302]', label: 'ARSENAL SYNCED' }
        : { color: 'text-yellow-500', bg: 'bg-yellow-400', border: 'border-yellow-600', label: 'GENERIC SCAN' };

    return (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-0 md:p-6 animate-in fade-in duration-200">
            <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={onClose}></div>
            
            <div className="relative w-full max-w-6xl bg-white rounded-t-[40px] md:rounded-[48px] border-x-4 border-t-4 border-slate-200 border-b-[16px] shadow-2xl overflow-hidden flex flex-col h-[92vh] animate-in zoom-in-95 duration-300">
                
                {/* Header */}
                <div className="p-6 md:p-8 bg-white border-b-2 border-slate-100 flex items-center justify-between shrink-0 z-20">
                    <div className="flex items-center gap-6">
                        <div className={`w-16 h-16 rounded-[28px] border-b-4 flex items-center justify-center shadow-xl ${theme.bg} ${theme.border} text-white`}>
                            {blueprint ? <ShieldCheck size={32} strokeWidth={3} /> : <BrainCircuit size={32} strokeWidth={3} />}
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight leading-none mb-2">{requirement.label}</h2>
                            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{appName}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        {score > 0 && (
                            <div className={`hidden md:flex flex-col items-end px-4 border-r-2 border-slate-100`}>
                                <div className={`text-3xl font-black leading-none ${theme.color}`}>{score}%</div>
                                <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mt-1">Audit Score</p>
                            </div>
                        )}
                        <button onClick={onClose} className="w-12 h-12 bg-slate-100 hover:bg-red-50 hover:text-red-500 rounded-2xl flex items-center justify-center text-slate-400 border-b-4 border-slate-200 transition-all active:translate-y-[4px]">
                            <X size={28} strokeWidth={4} />
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-hidden flex flex-col md:flex-row bg-slate-50">
                    {/* Sidebar */}
                    <div className="w-full md:w-[35%] border-r-2 border-slate-100 overflow-y-auto p-6 md:p-8 space-y-8 scrollbar-hide bg-white/50">
                        
                        {blueprint ? (
                            <div className="bg-green-50 p-6 rounded-[32px] border-b-[8px] border-green-200 text-green-800 space-y-3 shadow-sm relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform"><ShieldCheck size={64}/></div>
                                <div className="flex items-center gap-3 relative z-10">
                                    <Sparkles size={20} className="fill-[#58cc02] text-[#58cc02]" />
                                    <h4 className="font-black uppercase text-[10px] tracking-[0.2em]">Confirmed Arsenal Strike</h4>
                                </div>
                                <p className="text-xs font-bold leading-relaxed relative z-10">
                                    Audit linked to official <strong>{blueprint.title}</strong> blueprint. Evaluation will be 100% accurate to program standards.
                                </p>
                            </div>
                        ) : (
                            <div className="bg-orange-50 p-6 rounded-[32px] border-b-[8px] border-orange-200 text-orange-800 space-y-3 shadow-sm relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10"><ShieldAlert size={64}/></div>
                                <div className="flex items-center gap-3 relative z-10">
                                    <AlertTriangle size={20} className="text-orange-500" />
                                    <h4 className="font-black uppercase text-[10px] tracking-[0.2em] text-red-500">Limited Intelligence</h4>
                                </div>
                                <p className="text-xs font-bold leading-relaxed relative z-10">
                                    We don't have enough data to provide the base of this doc, please find yourself! AI will use generic standards. Be cautious and double-check.
                                </p>
                            </div>
                        )}

                        <section className="space-y-4">
                            <div className="flex items-center gap-3 px-1">
                                <div className="w-2 h-6 bg-indigo-500 rounded-full"></div>
                                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Requirement Brief</h3>
                            </div>
                            <div className="bg-white p-6 rounded-[32px] border-2 border-slate-200 border-b-[8px] italic text-sm font-bold text-slate-500 shadow-sm leading-relaxed">
                                "{requirement.brief || 'Provide specialized documentation aligning with program requirements.'}"
                            </div>
                        </section>

                        <section className="space-y-4">
                             <div className="flex items-center gap-3 px-1">
                                <div className="w-2 h-6 bg-sky-500 rounded-full"></div>
                                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Ecosystem Sync</h3>
                            </div>
                            {!isLinking ? (
                                <button 
                                    onClick={() => setIsLinking(true)}
                                    className="w-full p-5 bg-white border-2 border-sky-200 border-b-[8px] rounded-[32px] flex items-center gap-5 hover:bg-sky-50 transition-all group active:translate-y-[4px]"
                                >
                                    <div className="w-12 h-12 bg-sky-500 rounded-2xl flex items-center justify-center text-white border-b-4 border-sky-700 group-hover:rotate-12 transition-transform shadow-lg">
                                        <Link size={24} strokeWidth={3} />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-black text-slate-800 text-sm uppercase">Sync Dossier</p>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase mt-0.5">Pull verified assets</p>
                                    </div>
                                </button>
                            ) : (
                                <div className="bg-white p-6 rounded-[32px] border-2 border-sky-400 border-b-[8px] animate-in zoom-in-95 duration-200">
                                    <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto pr-1 scrollbar-hide">
                                        {['cv', 'essay_personal', 'lor_academic', 'transkrip'].map(key => (
                                            <button 
                                                key={key} 
                                                onClick={() => handleSyncFromDossier(key)}
                                                className="w-full p-3.5 rounded-2xl bg-slate-50 border-2 border-slate-100 hover:border-sky-400 hover:bg-sky-50 font-black text-[9px] uppercase text-slate-600 transition-all text-left flex items-center gap-3"
                                            >
                                                <div className="w-2 h-2 rounded-full bg-sky-300"></div>
                                                {key.replace(/_/g, ' ')}
                                            </button>
                                        ))}
                                    </div>
                                    <button onClick={() => setIsLinking(false)} className="w-full py-2.5 mt-4 text-[9px] font-black text-red-400 uppercase hover:bg-red-50 rounded-xl transition-all">Cancel</button>
                                </div>
                            )}
                        </section>
                    </div>

                    <div className="flex-1 flex flex-col bg-white overflow-hidden p-6 md:p-10 space-y-8">
                        <div className="flex-1 flex flex-col">
                             <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] px-4 mb-3 flex items-center gap-2"><Edit3 size={12} /> Neural Grid Output</label>
                             <div className="relative flex-1 group">
                                <textarea 
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="Paste mission documentation here..."
                                    className="w-full h-full p-8 bg-slate-50 border-2 border-slate-200 border-b-[12px] rounded-[48px] outline-none focus:border-[#1cb0f6] focus:bg-white font-bold text-lg text-slate-700 leading-relaxed transition-all resize-none shadow-inner"
                                />
                                {content && (
                                    <div className="absolute bottom-6 right-6">
                                         <div className="px-3 py-1 bg-white/80 backdrop-blur-md rounded-lg border border-slate-200 text-[8px] font-black text-slate-400 uppercase tracking-widest">{content.split(/\s+/).length} Words</div>
                                    </div>
                                )}
                             </div>
                        </div>

                        {requirement.analysisFeedback && (
                             <div className="animate-in slide-in-from-bottom-2 duration-300">
                                 <div className={`border-2 rounded-[32px] p-6 space-y-4 ${blueprint ? 'bg-green-50 border-green-100' : 'bg-yellow-50 border-yellow-100'}`}>
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-sm border-b-2 ${blueprint ? 'bg-[#58cc02] border-[#46a302]' : 'bg-yellow-500 border-yellow-700'}`}><Target size={16}/></div>
                                        <h4 className={`font-black text-[10px] uppercase tracking-widest ${blueprint ? 'text-green-700' : 'text-yellow-700'}`}>Strategic Corrections</h4>
                                    </div>
                                    <div className="space-y-2">
                                        {requirement.analysisFeedback.slice(0, 3).map((f, i) => (
                                            <div key={i} className="flex gap-3 items-start">
                                                <div className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${blueprint ? 'bg-[#58cc02]' : 'bg-yellow-500'}`}></div>
                                                <p className={`text-xs font-bold leading-tight ${blueprint ? 'text-green-900' : 'text-yellow-900'}`}>{f}</p>
                                            </div>
                                        ))}
                                    </div>
                                 </div>
                             </div>
                        )}

                        <div className="pt-2 flex flex-col gap-4">
                            <DuoButton 
                                fullWidth 
                                themeColor={blueprint ? 'green' : 'blue'} 
                                onClick={handleRunAnalysis} 
                                isLoading={isAnalyzing} 
                                disabled={!content.trim() || isAnalyzing}
                                className="!py-7 !text-xl !rounded-[32px] shadow-2xl uppercase tracking-widest" 
                                startIcon={BrainCircuit}
                            >
                                {isAnalyzing ? 'Running Audit...' : blueprint ? 'Arsenal Strike Audit' : 'Quality Scan'}
                            </DuoButton>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <button onClick={onClose} className="py-4 bg-white border-2 border-slate-200 border-b-[6px] rounded-[24px] font-black text-slate-400 text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all active:translate-y-[4px]">Close</button>
                                <button 
                                    onClick={() => { onUpdate({ status: 'VERIFIED', content }); onClose(); }} 
                                    className="py-4 bg-[#58cc02] border-b-[8px] border-[#46a302] text-white rounded-[24px] font-black text-[10px] uppercase tracking-widest hover:brightness-110 active:translate-y-[4px] shadow-lg flex items-center justify-center gap-2"
                                >
                                    Manual Sync <ArrowRight size={14} strokeWidth={4} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
