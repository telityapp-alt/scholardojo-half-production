
import React, { useState } from 'react';
import { DocumentBlueprint, SuccessArtifact } from '../types';
import { 
    X, Gem, FileText, CheckCircle2, AlertCircle, 
    Search, Download, Eye, Sparkles, BrainCircuit, 
    Zap, Target, ShieldCheck, History, Award, Edit3, 
    ArrowRight, Star, GraduationCap, Briefcase
} from 'lucide-react';
import { ArsenalService } from '../services/arsenalService';
import { DuoButton } from '../../../components/DuoButton';
import { PdfViewerModal } from '../../../components/ui/PdfViewerModal';
import confetti from 'canvas-confetti';

interface BlueprintPanelProps {
    blueprint: DocumentBlueprint;
    onClose: () => void;
}

export const BlueprintPanel: React.FC<BlueprintPanelProps> = ({ blueprint, onClose }) => {
    const [selectedArtifact, setSelectedArtifact] = useState<SuccessArtifact | null>(null);
    const [content, setContent] = useState('');
    const [auditResult, setAuditResult] = useState<any>(null);
    const [isAuditing, setIsAuditing] = useState(false);

    const handleRunAudit = async () => {
        if (!content.trim() || isAuditing) return;
        setIsAuditing(true);
        try {
            const result = await ArsenalService.auditDocument(content, blueprint);
            setAuditResult(result);
            if (result.score >= 85) {
                confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#58cc02', '#fbbf24'] });
            }
        } catch (e) {
            alert("Neural Link Failed.");
        } finally {
            setIsAuditing(false);
        }
    };

    return (
        <div className="flex flex-col h-full animate-in slide-in-from-right duration-500 overflow-hidden -mt-4">
            
            <div className="bg-white p-6 border-b-2 border-slate-100 flex items-center justify-between shrink-0 z-20">
                <div className="flex items-center gap-6">
                    <div className={`w-16 h-16 rounded-[24px] border-b-4 flex items-center justify-center shadow-xl text-white ${blueprint.category === 'ESSAY' ? 'bg-purple-500 border-purple-700' : 'bg-sky-500 border-sky-700'}`}>
                        <FileText size={32} strokeWidth={3} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-slate-800 tracking-tight leading-none mb-2">{blueprint.title}</h2>
                        <div className="flex items-center gap-2">
                             <span className="text-[10px] font-black uppercase text-sky-500 bg-sky-50 px-2 py-0.5 rounded border border-sky-100 tracking-widest">{blueprint.category} Blueprint</span>
                        </div>
                    </div>
                </div>
                <button onClick={onClose} className="w-12 h-12 bg-slate-100 hover:bg-red-50 hover:text-red-500 rounded-2xl flex items-center justify-center text-slate-400 border-b-4 border-slate-200 transition-all active:translate-y-[4px]">
                    <X size={28} strokeWidth={4} />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto bg-slate-50 p-6 md:p-10 scrollbar-hide">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
                    
                    {/* LEFT: INTEL & BLUEPRINT */}
                    <div className="lg:col-span-5 space-y-10">
                        
                        <section className="space-y-4">
                            <div className="flex items-center gap-3 px-2">
                                <div className="w-8 h-8 rounded-xl bg-slate-900 flex items-center justify-center text-white border-b-2 border-black"><Target size={16}/></div>
                                <h4 className="text-sm font-black text-slate-700 uppercase tracking-widest">Tactical Brief</h4>
                            </div>
                            <div className="bg-white p-8 rounded-[40px] border-2 border-slate-200 border-b-[8px] shadow-sm italic text-lg font-bold text-slate-500 leading-relaxed">
                                "{blueprint.brief}"
                            </div>
                        </section>

                        <section className="space-y-4">
                            <div className="flex items-center gap-3 px-2">
                                <div className="w-8 h-8 rounded-xl bg-[#58cc02] flex items-center justify-center text-white border-b-2 border-[#46a302]"><ShieldCheck size={16}/></div>
                                <h4 className="text-sm font-black text-slate-700 uppercase tracking-widest">Required Checkpoints</h4>
                            </div>
                            <div className="bg-white rounded-[32px] border-2 border-slate-200 border-b-[8px] overflow-hidden">
                                {blueprint.checkpoints.map((cp, i) => (
                                    <div key={cp.id} className={`p-5 flex items-center gap-5 ${i !== 0 ? 'border-t-2 border-slate-50' : ''}`}>
                                        <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center font-black text-xs shrink-0 border-b-2">
                                            {cp.weight}
                                        </div>
                                        <div>
                                            <p className="font-black text-slate-800 text-sm">{cp.label}</p>
                                            <p className="text-xs font-bold text-slate-400 mt-1">{cp.reason}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="space-y-4">
                             <div className="flex items-center gap-3 px-2">
                                <div className="w-8 h-8 rounded-xl bg-yellow-400 flex items-center justify-center text-yellow-900 border-b-2 border-yellow-600"><Gem size={16}/></div>
                                <h4 className="text-sm font-black text-slate-700 uppercase tracking-widest">Winning Artifacts</h4>
                            </div>
                            <div className="space-y-3">
                                {blueprint.artifacts.map(art => (
                                    <div key={art.id} className="bg-white p-5 rounded-[32px] border-2 border-yellow-200 border-b-[8px] group hover:border-yellow-400 transition-all cursor-pointer relative overflow-hidden">
                                         <div className="flex items-center gap-5">
                                            <div className="w-12 h-12 bg-yellow-100 rounded-2xl flex items-center justify-center text-yellow-600 border-b-4 border-yellow-200 shrink-0 shadow-inner group-hover:rotate-3 transition-transform">
                                                <FileText size={24} />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-[10px] font-black text-yellow-600 uppercase tracking-widest mb-1">{art.alumniName} ({art.alumniYear})</p>
                                                <h5 className="font-black text-slate-800 text-sm leading-tight mb-2">{art.title}</h5>
                                                <button onClick={() => setSelectedArtifact(art)} className="flex items-center gap-2 text-[10px] font-black text-sky-500 uppercase tracking-widest hover:underline decoration-2 underline-offset-4">
                                                    <Eye size={12} strokeWidth={4} /> Open Study Mode
                                                </button>
                                            </div>
                                         </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* RIGHT: WORKBENCH & AUDITOR */}
                    <div className="lg:col-span-7 space-y-10">
                        <section className="space-y-4 flex flex-col h-full">
                            <div className="flex items-center justify-between px-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-xl bg-sky-500 flex items-center justify-center text-white border-b-2 border-sky-700"><Edit3 size={16}/></div>
                                    <h4 className="text-sm font-black text-slate-700 uppercase tracking-widest">Neural Workbench</h4>
                                </div>
                                {auditResult && (
                                    <div className="flex items-center gap-4 bg-slate-900 px-4 py-2 rounded-2xl border-b-4 border-black text-white">
                                        <div className="text-center"><p className="text-[8px] font-black uppercase text-slate-500">Score</p><p className="font-black text-xl text-yellow-400 leading-none">{auditResult.score}</p></div>
                                        <div className="w-px h-6 bg-white/10"></div>
                                        <div className="text-center"><p className="text-[8px] font-black uppercase text-slate-500">Matrix</p><p className="font-black text-xs text-sky-400 leading-none">V4 SYNC</p></div>
                                    </div>
                                )}
                            </div>
                            
                            <div className="relative flex-1 bg-white rounded-[48px] border-2 border-slate-200 border-b-[12px] p-8 md:p-10 shadow-xl overflow-hidden group">
                                <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none group-hover:scale-110 transition-transform"><BrainCircuit size={150}/></div>
                                <textarea 
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="Paste your content here to begin the strategic audit..."
                                    className="w-full h-96 bg-transparent outline-none font-bold text-lg text-slate-600 leading-relaxed placeholder:text-slate-200 resize-none scrollbar-hide"
                                />

                                {auditResult && (
                                    <div className="mt-8 pt-8 border-t-2 border-slate-100 space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                                        <div className="p-6 bg-slate-900 rounded-[32px] border-b-[10px] border-black text-white relative overflow-hidden group">
                                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                                            <div className="relative z-10">
                                                <h5 className="font-black text-sky-400 uppercase text-[10px] tracking-widest mb-4 flex items-center gap-2"><Sparkles size={12} fill="currentColor" /> Strategic Verdict</h5>
                                                <p className="text-lg font-bold text-slate-300 leading-tight italic">"{auditResult.overallVerdict}"</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {auditResult.checkpointFeedback?.map((fb: any, i: number) => {
                                                const orig = blueprint.checkpoints.find(c => c.id === fb.id);
                                                return (
                                                    <div key={i} className={`p-4 rounded-[24px] border-2 border-b-[6px] transition-all ${fb.pass ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
                                                        <div className="flex items-center gap-3 mb-2">
                                                            {fb.pass ? <CheckCircle2 size={16} strokeWidth={4}/> : <AlertCircle size={16} strokeWidth={4}/>}
                                                            <span className="font-black text-[10px] uppercase tracking-widest">{orig?.label || 'Requirement'}</span>
                                                        </div>
                                                        <p className="text-xs font-bold leading-snug">{fb.tip}</p>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="pt-6">
                                <DuoButton 
                                    fullWidth 
                                    themeColor="indigo" 
                                    onClick={handleRunAudit}
                                    isLoading={isAuditing}
                                    disabled={!content.trim() || isAuditing}
                                    className="!py-6 !text-lg !rounded-[32px] shadow-2xl"
                                    startIcon={BrainCircuit}
                                >
                                    {isAuditing ? 'Initiating Neural Scan...' : 'Audit Document Content'}
                                </DuoButton>
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            {selectedArtifact && (
                <PdfViewerModal 
                    isOpen={!!selectedArtifact} 
                    title={`${selectedArtifact.title} • Study Mode`} 
                    url={selectedArtifact.url} 
                    onClose={() => setSelectedArtifact(null)} 
                />
            )}
        </div>
    );
};
