
import React, { useState, useMemo } from 'react';
import { ShieldCheck, RefreshCw, Sparkles, Target, ShieldAlert, Bot, Zap, Info, CheckCircle2 } from 'lucide-react';
import { AIOrchestrator } from '../../../../core/engines/aiOrchestrator';
import { Editor } from '@tiptap/react';
import { UnifiedProgram } from '../../../programs/types';

interface Props {
    editor: Editor | null;
    program: UnifiedProgram | null;
    docType: string;
    onOpenSelector: () => void;
}

export const AiAuditor: React.FC<Props> = ({ editor, program, docType, onOpenSelector }) => {
    const [audit, setAudit] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const activeBrief = useMemo(() => {
        if (!program) return null;
        return program.shadowProtocol.docBriefs.find(b => 
            b.id.toLowerCase().includes(docType.toLowerCase()) || 
            docType.toLowerCase().includes(b.id.toLowerCase())
        );
    }, [program, docType]);

    const runAudit = async () => {
        if (!editor || !program) return;
        setLoading(true);
        const content = editor.getText();
        
        const systemInstruction = `
            You are the "Strategic Dojo Auditor" for ${program.organizer}.
            TARGET MISSION: ${program.title}
            ARTIFACT TYPE: ${activeBrief?.label || docType}
            
            ${activeBrief ? `STRICT BLUEPRINT BRIEF: ${activeBrief.instructions}
            AUDIT CRITERIA: ${activeBrief.aiAuditCriteria.join(', ')}` : ''}
            LETHAL MISTAKES TO DETECT: ${program.shadowProtocol.lethalMistakes.map(m => m.title).join(', ')}
            
            GOAL: Provide a brutal but high-impact tactical audit in Duolingo style.
            OUTPUT: Markdown format. Identify specific gaps. Be direct.
        `;

        try {
            const res = await AIOrchestrator.generateContent({
                model: 'gemini-3-flash-preview',
                contents: content,
                config: { systemInstruction }
            });
            setAudit(res.text || "Neural link stable.");
        } catch (e: any) { 
            setAudit(`**ERROR:** ${e.message}`); 
        }
        setLoading(false);
    };

    if (!program) {
        return (
            <div className="p-8 bg-slate-50 rounded-[40px] border-4 border-dashed border-slate-200 text-center space-y-6">
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-slate-200 border-b-8 border-slate-100 mx-auto">
                    <Target size={40} />
                </div>
                <div>
                    <h4 className="text-xl font-black text-slate-400 uppercase tracking-tight">Zero Context</h4>
                    <p className="text-sm font-bold text-slate-400 mt-2 italic">Sensei cannot audit without a linked mission blueprint.</p>
                </div>
                <button 
                    onClick={onOpenSelector}
                    className="w-full py-4 bg-sky-500 text-white rounded-2xl font-black uppercase text-xs tracking-widest border-b-[6px] border-sky-700 active:border-b-0 active:translate-y-[6px] transition-all shadow-xl"
                >
                    Link Mission Target
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in slide-in-from-right duration-500">
            <div className="bg-slate-900 rounded-[32px] border-b-[8px] border-black p-5 text-white relative overflow-hidden group shadow-xl">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                <div className="relative z-10 space-y-4">
                    <div className="flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-sky-500 rounded-xl flex items-center justify-center border-b-4 border-sky-700 shadow-lg shrink-0 group-hover:scale-110 transition-transform"><Bot size={24} strokeWidth={3} /></div>
                            <div>
                                <h5 className="font-black text-[10px] uppercase tracking-widest text-sky-400">Tactical Target</h5>
                                <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em] mt-1 flex items-center gap-1.5"><CheckCircle2 size={10} className="text-[#58cc02]" /> Synced</p>
                            </div>
                        </div>
                        <button 
                            onClick={onOpenSelector} 
                            className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all active:scale-90"
                        >
                            <RefreshCw size={14} strokeWidth={3}/>
                        </button>
                    </div>

                    <div className="space-y-1">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest truncate">{program.organizer}</p>
                        <h4 className="text-sm font-black text-white leading-tight truncate">{program.title}</h4>
                    </div>

                    {activeBrief ? (
                        <div className="bg-white/5 p-3 rounded-2xl border border-white/10 group-hover:border-sky-500/50 transition-colors">
                            <p className="text-[8px] font-black text-sky-300 uppercase tracking-widest mb-1.5 flex items-center gap-1.5"><Sparkles size={10} fill="currentColor"/> Blueprint Locked: {activeBrief.label}</p>
                            <p className="text-[10px] font-bold text-slate-400 leading-relaxed italic line-clamp-2">"{activeBrief.instructions}"</p>
                        </div>
                    ) : (
                        <div className="bg-orange-500/10 p-3 rounded-2xl border border-orange-500/20">
                            <p className="text-[8px] font-black text-orange-400 uppercase tracking-widest mb-1 flex items-center gap-1.5"><ShieldAlert size={10}/> Artifact Ambiguity</p>
                            <p className="text-[10px] font-bold text-slate-500 leading-relaxed">Using generic standards for {docType}.</p>
                        </div>
                    )}
                </div>
            </div>

            {!audit ? (
                <button onClick={runAudit} disabled={loading} className="w-full p-8 bg-white border-2 border-indigo-200 border-b-[10px] rounded-[40px] flex flex-col items-center gap-4 hover:bg-indigo-50 active:translate-y-2 transition-all group shadow-sm">
                    <div className="w-16 h-16 bg-indigo-500 rounded-3xl flex items-center justify-center text-white border-b-8 border-indigo-700 group-hover:scale-110 transition-transform shadow-xl">
                        {loading ? <RefreshCw className="animate-spin" strokeWidth={3} /> : <ShieldCheck size={32} strokeWidth={3} />}
                    </div>
                    <div className="text-center">
                        <span className="font-black text-indigo-700 text-xs uppercase tracking-[0.2em] block">Execute Neural Audit</span>
                        <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest mt-1 opacity-60">Strategic Calibration Check</span>
                    </div>
                </button>
            ) : (
                <div className="bg-white p-6 rounded-[32px] border-2 border-indigo-200 border-b-[12px] space-y-4 animate-in slide-in-from-right-4 relative overflow-hidden shadow-sm">
                    <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none"><Sparkles size={100}/></div>
                    <div className="flex justify-between items-center relative z-10">
                        <span className="text-[10px] font-black uppercase text-indigo-500 tracking-[0.3em] flex items-center gap-2"><Sparkles size={12} fill="currentColor"/> Auditor Verdict</span>
                        <button onClick={() => setAudit(null)} className="text-indigo-200 hover:text-indigo-600 transition-colors p-1"><RefreshCw size={14} strokeWidth={3}/></button>
                    </div>
                    <div className="prose prose-sm prose-slate font-bold text-slate-600 max-h-[450px] overflow-y-auto scrollbar-hide relative z-10 leading-relaxed custom-formatting">
                        {audit.split('\n').map((line, i) => (
                            <p key={i}>{line}</p>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
