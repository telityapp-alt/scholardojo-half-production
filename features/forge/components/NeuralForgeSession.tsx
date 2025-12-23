
import React, { useState } from 'react';
import { DomainType } from '../../../core/contracts/entityMap';
import { ForgeService, MasterProgram } from '../services/forgeService';
import { X, BrainCircuit, Send, Loader2, RefreshCcw, Check, ArrowLeft } from 'lucide-react';

interface Props {
    domain: DomainType;
    onCancel: () => void;
    onDone: (p: MasterProgram) => void;
}

export const NeuralForgeSession: React.FC<Props> = ({ domain, onCancel, onDone }) => {
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState<MasterProgram | null>(null);

    const handleRun = async () => {
        if (!input.trim() || loading) return;
        setLoading(true);
        try {
            const result = await ForgeService.forge(input, domain);
            setPreview(result);
        } catch (e) {
            alert("Neural Link Interrupted.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="animate-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto space-y-8 pb-32">
            {/* Header */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-200">
                <button 
                    onClick={onCancel}
                    className="flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors font-medium text-sm"
                >
                    <ArrowLeft size={16} />
                    Abort Session
                </button>
                <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full border border-slate-200 shadow-inner">
                    <div className="w-2 h-2 bg-sky-500 rounded-full animate-pulse"></div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Neural Syncing</span>
                </div>
            </div>

            {!preview ? (
                <div className="space-y-6">
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Mission Input</h2>
                        <p className="text-slate-400 text-sm">Paste the entire program briefing. AI will extract and map all objects.</p>
                    </div>

                    <div className="relative">
                        <textarea 
                            value={input} 
                            onChange={e => setInput(e.target.value)} 
                            placeholder="PASTE RAW BRIEFING HERE..."
                            disabled={loading}
                            className="w-full h-[400px] p-8 bg-slate-50 border border-slate-200 rounded-2xl font-mono text-sm leading-relaxed outline-none focus:bg-white focus:border-slate-400 transition-all resize-none shadow-inner"
                        />
                        {loading && (
                            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex flex-col items-center justify-center gap-4 rounded-2xl animate-in fade-in">
                                <Loader2 className="animate-spin text-slate-800" size={48} strokeWidth={1.5} />
                                <p className="font-bold text-slate-800 text-sm uppercase tracking-widest">Transmuting Content...</p>
                            </div>
                        )}
                    </div>
                    
                    <button 
                        disabled={!input.trim() || loading} 
                        onClick={handleRun}
                        className={`
                            w-full flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all
                            ${input.trim() && !loading ? 'bg-slate-900 text-white shadow-lg hover:bg-slate-800' : 'bg-slate-100 text-slate-300 border border-slate-200 cursor-not-allowed'}
                        `}
                    >
                        <BrainCircuit size={18} />
                        Execute Neural Mapping
                    </button>
                </div>
            ) : (
                <div className="space-y-8 animate-in zoom-in-95 duration-300">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Blueprint Review</h2>
                            <p className="text-slate-400 text-sm uppercase tracking-widest mt-1">Verification Required</p>
                        </div>
                        <div className="flex gap-2">
                            <button 
                                onClick={() => setPreview(null)}
                                className="flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-200 text-slate-500 rounded-lg text-sm font-bold hover:bg-slate-50 transition-all shadow-sm"
                            >
                                <RefreshCcw size={16} />
                                Re-Forge
                            </button>
                            <button 
                                onClick={() => onDone(preview)}
                                className="flex items-center gap-2 bg-[#58cc02] text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-[#46a302] transition-all shadow-md"
                            >
                                <Check size={18} strokeWidth={3} />
                                Commit Object
                            </button>
                        </div>
                    </div>

                    <div className="bg-slate-900 rounded-2xl border-4 border-slate-800 shadow-2xl overflow-hidden">
                        <div className="bg-slate-800 px-4 py-2 flex items-center gap-2 border-b border-slate-700">
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                            </div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase ml-4 tracking-widest">program_schema.json</span>
                        </div>
                        <pre className="p-8 text-sky-400 font-mono text-xs leading-relaxed overflow-x-auto max-h-[600px] scrollbar-hide">
                            {JSON.stringify(preview, null, 4)}
                        </pre>
                    </div>
                    
                    <div className="p-6 bg-blue-50 border border-blue-100 rounded-xl flex gap-4 items-start shadow-sm">
                        <BrainCircuit className="text-blue-500 shrink-0" size={20} />
                        <p className="text-xs text-blue-800 font-medium leading-relaxed">
                            <strong>Note:</strong> Neural Forge has automatically linked document checkpoints and generated a roadmap based on the input briefing. Review the JSON structure above for accuracy before committing.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};
