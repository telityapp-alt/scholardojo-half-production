
import React from 'react';
import { UnifiedProgram, DocBrief } from '../../types';
import { FileText, Target, Zap, Sparkles, BookOpen, ExternalLink, ArrowRight, ShieldCheck, PenTool } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Props {
    program: UnifiedProgram;
}

export const RequirementsBriefSection: React.FC<Props> = ({ program }) => {
    const navigate = useNavigate();
    const briefs = program.shadowProtocol.docBriefs || [];

    if (briefs.length === 0) return null;

    return (
        <section className="space-y-10 animate-in fade-in duration-500">
            <div className="flex items-center gap-4 px-2">
                <div className="w-12 h-12 bg-sky-500 rounded-2xl flex items-center justify-center text-white border-b-4 border-sky-700 shadow-lg transform -rotate-2">
                    <PenTool size={24} strokeWidth={3} />
                </div>
                <div>
                    <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight italic">Doc Blueprints</h3>
                    <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">Tactical Asset Preparation</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {briefs.map((brief) => (
                    <div key={brief.id} className="bg-white rounded-[48px] border-2 border-slate-200 border-b-[12px] p-8 space-y-6 group hover:border-sky-400 transition-all flex flex-col h-full shadow-sm">
                        <div className="flex justify-between items-start">
                            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 group-hover:bg-sky-50 group-hover:text-sky-500 transition-all border-b-2">
                                <FileText size={28} />
                            </div>
                            <div className="bg-sky-100 text-sky-600 px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest border border-sky-200 shadow-sm flex items-center gap-1.5">
                                <Sparkles size={10} fill="currentColor"/> AI Target Calibrated
                            </div>
                        </div>

                        <div className="flex-1 space-y-4">
                            <div>
                                <h4 className="text-2xl font-black text-slate-800 leading-tight mb-2 group-hover:text-sky-600 transition-colors">{brief.label}</h4>
                                <p className="text-sm font-bold text-slate-500 leading-relaxed italic">
                                    "{brief.instructions}"
                                </p>
                            </div>

                            <div className="space-y-3 pt-2">
                                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2"><Target size={12} className="text-red-400"/> AI Scoring Criteria</p>
                                <div className="flex flex-wrap gap-2">
                                    {brief.aiAuditCriteria.map((c, i) => (
                                        <span key={i} className="bg-slate-50 text-slate-500 px-3 py-1.5 rounded-xl text-[9px] font-black border border-slate-100 group-hover:border-sky-200 group-hover:bg-sky-50 transition-all">
                                            {c}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t-2 border-slate-50">
                            <div className="bg-[#58cc02]/10 border-2 border-[#58cc02]/20 p-5 rounded-[28px] space-y-4">
                                <div className="flex items-center gap-3">
                                    <ShieldCheck size={20} className="text-[#58cc02]" />
                                    <h5 className="font-black text-[#58cc02] text-xs uppercase tracking-widest">Sensei Directive</h5>
                                </div>
                                <p className="text-[11px] font-bold text-green-800 leading-snug">
                                    "Forge this using the <span className="underline decoration-2 font-black italic">{brief.suggestedDojoTheme}</span> structure. Ensure 100% calibration before final deployment."
                                </p>
                                <button 
                                    onClick={() => navigate(`/${program.domain}/workspace/library`)}
                                    className="w-full py-3.5 bg-[#58cc02] text-white rounded-2xl font-black text-xs uppercase tracking-widest border-b-[6px] border-[#46a302] active:border-b-0 active:translate-y-[6px] transition-all flex items-center justify-center gap-2 shadow-lg"
                                >
                                    Open Document Workbench <ArrowRight size={14} strokeWidth={4} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
