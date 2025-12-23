
import React, { useState } from 'react';
import { AdmissionApp, AdmissionRequirement } from '../../../admission/types';
import { AdmissionService } from '../../../admission/services/admissionService';
import { DocumentService } from '../../services/documentService';
import { 
    FileText, BrainCircuit, Sparkles, Check, 
    AlertCircle, Zap, Loader2, Target, 
    ShieldCheck, Edit3, Save, ChevronRight
} from 'lucide-react';
import { DuoButton } from '../../../../components/DuoButton';
import confetti from 'canvas-confetti';

interface DocumentArsenalProps {
    app: AdmissionApp;
}

export const DocumentArsenal: React.FC<DocumentArsenalProps> = ({ app }) => {
    const [selectedReq, setSelectedReq] = useState<AdmissionRequirement | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [tempContent, setTempContent] = useState('');

    const docsOnly = app.requirements.filter(r => r.type === 'DOC' || r.type === 'ESSAY');

    const handleSelect = (req: AdmissionRequirement) => {
        setSelectedReq(req);
        setTempContent(req.content || '');
    };

    const handleRunAnalysis = async () => {
        if (!selectedReq) return;
        setIsAnalyzing(true);
        
        try {
            // Save content first
            AdmissionService.updateRequirement(app.id, selectedReq.id, { content: tempContent });
            
            const result = await DocumentService.analyzeContent(
                { ...selectedReq, content: tempContent }, 
                app.name
            );

            AdmissionService.updateRequirement(app.id, selectedReq.id, { 
                analysisScore: result.score,
                analysisFeedback: result.feedback,
                status: result.score > 85 ? 'VERIFIED' : 'UPLOADED'
            });

            if (result.score > 90) {
                confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ['#58cc02', '#fbbf24'] });
            }

            // Sync local state
            setSelectedReq(prev => prev ? { 
                ...prev, 
                content: tempContent,
                analysisScore: result.score, 
                analysisFeedback: result.feedback 
            } : null);

        } catch (e) {
            alert("Neural Link Failed. Please try again.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4 px-2">
                <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white border-b-8 border-indigo-800 shadow-xl">
                    <BrainCircuit size={32} strokeWidth={2.5} />
                </div>
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tighter uppercase italic">Neural Arsenal</h2>
                    <p className="text-slate-400 font-bold text-sm">Deep quality analysis of your tactical assets.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* LIST OF ASSETS */}
                <div className="lg:col-span-5 space-y-3">
                    {docsOnly.map((req) => {
                        const score = req.analysisScore || 0;
                        const isStandout = score >= 90;
                        const isQualified = score >= 70 && score < 90;

                        return (
                            <div 
                                key={req.id}
                                onClick={() => handleSelect(req)}
                                className={`
                                    p-5 rounded-[28px] border-2 border-b-[8px] cursor-pointer transition-all active:translate-y-[4px] active:border-b-2
                                    ${selectedReq?.id === req.id 
                                        ? 'bg-sky-50 border-sky-400 border-b-sky-600' 
                                        : 'bg-white border-slate-200 border-b-slate-300 hover:border-sky-300'}
                                `}
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border-b-4 ${isStandout ? 'bg-green-500 border-green-700 text-white' : 'bg-slate-100 border-slate-300 text-slate-400'}`}>
                                            <FileText size={20} />
                                        </div>
                                        <h4 className="font-black text-slate-700 text-sm leading-tight max-w-[120px] truncate">{req.label}</h4>
                                    </div>
                                    {score > 0 && (
                                        <div className={`px-3 py-1 rounded-lg border-2 text-[10px] font-black uppercase ${isStandout ? 'bg-green-100 border-green-200 text-green-600' : isQualified ? 'bg-sky-100 border-sky-200 text-sky-600' : 'bg-red-50 border-red-100 text-red-500'}`}>
                                            {score}% QUALITY
                                        </div>
                                    )}
                                </div>
                                {isStandout ? (
                                    <p className="text-[10px] font-black text-green-600 uppercase tracking-widest flex items-center gap-1.5"><Sparkles size={10} fill="currentColor" /> STANDOUT ASSET</p>
                                ) : score > 0 ? (
                                    <p className="text-[10px] font-black text-sky-500 uppercase tracking-widest flex items-center gap-1.5"><ShieldCheck size={10} /> QUALIFIED</p>
                                ) : (
                                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">PENDING ANALYSIS</p>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* ANALYSIS WORKBENCH */}
                <div className="lg:col-span-7 h-full">
                    {selectedReq ? (
                        <div className="bg-white rounded-[40px] border-2 border-slate-200 border-b-[12px] p-8 shadow-xl animate-in slide-in-from-right-4 duration-500 flex flex-col space-y-6">
                            <div className="flex justify-between items-center mb-2">
                                <div>
                                    <h3 className="text-2xl font-black text-slate-800 leading-none">{selectedReq.label}</h3>
                                    <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-2">Tactical Content Forge</p>
                                </div>
                                {selectedReq.analysisScore && (
                                    <div className="text-right">
                                        <div className="text-4xl font-black text-slate-800">{selectedReq.analysisScore}<span className="text-lg text-slate-300">%</span></div>
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Efficiency Rating</p>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em] px-1">Raw Content Input</label>
                                <textarea 
                                    value={tempContent}
                                    onChange={(e) => setTempContent(e.target.value)}
                                    placeholder="Paste your essay, CV summary, or document text here for AI review..."
                                    className="w-full h-64 bg-slate-50 border-2 border-slate-200 border-b-[8px] rounded-[32px] p-6 outline-none focus:border-indigo-400 focus:bg-white font-bold text-slate-700 leading-relaxed transition-all resize-none scrollbar-hide"
                                />
                            </div>

                            {selectedReq.analysisFeedback && selectedReq.analysisFeedback.length > 0 && (
                                <div className="bg-indigo-50 border-2 border-indigo-100 rounded-[32px] p-6 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-white"><Target size={16}/></div>
                                        <h4 className="font-black text-indigo-700 text-xs uppercase tracking-widest">Sensei Corrections</h4>
                                    </div>
                                    <ul className="space-y-2">
                                        {selectedReq.analysisFeedback.map((f, i) => (
                                            <li key={i} className="flex gap-3 text-sm font-bold text-indigo-900 leading-tight">
                                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0"></div> {f}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <DuoButton 
                                fullWidth
                                themeColor="indigo"
                                onClick={handleRunAnalysis}
                                isLoading={isAnalyzing}
                                disabled={!tempContent.trim() || isAnalyzing}
                                className="!py-6 !text-lg shadow-2xl"
                                startIcon={isAnalyzing ? undefined : BrainCircuit}
                            >
                                {isAnalyzing ? 'Running Neural Scan...' : 'Analyze with AI'}
                            </DuoButton>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center bg-slate-50 border-4 border-dashed border-slate-200 rounded-[48px] p-20 text-center opacity-60">
                            <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center text-slate-200 border-b-8 border-slate-100 mb-6 shadow-sm"><FileText size={48} /></div>
                            <h3 className="text-2xl font-black text-slate-300 uppercase tracking-widest">Workbench Idle</h3>
                            <p className="text-slate-400 font-bold mt-2">Select a document from the left to initialize analysis.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
