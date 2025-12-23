
import React, { useState } from 'react';
import { UnifiedProgram, DocBrief } from '../../types';
import { 
    FileText, Target, Zap, Sparkles, BookOpen, 
    ArrowRight, ShieldCheck, PenTool, Layers, 
    Filter, Star, ClipboardList
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Props {
    program: UnifiedProgram;
}

export const DocsTab: React.FC<Props> = ({ program }) => {
    const navigate = useNavigate();
    const briefs = program.shadowProtocol.docBriefs || [];
    const [activeFilter, setActiveFilter] = useState('ALL');

    const CATEGORIES = [
        { id: 'ALL', label: 'All Artifacts' },
        { id: 'cv', label: 'Resumes' },
        { id: 'essay', label: 'Essays' },
        { id: 'lor', label: 'Letters' },
        { id: 'portfolio', label: 'Portfolio' }
    ];

    const filteredBriefs = briefs.filter(b => 
        activeFilter === 'ALL' ? true : b.id.toLowerCase().includes(activeFilter.toLowerCase())
    );

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-right duration-500">
            {/* Header Info */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-[#ce82ff] rounded-2xl border-b-[6px] border-[#a855f7] flex items-center justify-center text-white shadow-lg">
                        <FileText size={32} strokeWidth={2.5} />
                    </div>
                    <div>
                        <h2 className="text-2xl md:text-3xl font-black text-slate-800 uppercase tracking-tight italic">Mission Artifacts</h2>
                        <p className="text-slate-400 font-bold text-sm">Strategic blueprints for your local dossier.</p>
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="bg-white p-1.5 rounded-[24px] border-2 border-slate-200 border-b-[4px] flex gap-1 shadow-sm">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveFilter(cat.id)}
                            className={`px-4 py-2 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all ${activeFilter === cat.id ? 'bg-purple-100 text-purple-600 shadow-inner' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>
            </div>

            {filteredBriefs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-20">
                    {filteredBriefs.map((brief) => (
                        <div key={brief.id} className="bg-white rounded-[48px] border-2 border-slate-200 border-b-[12px] p-8 space-y-6 group hover:border-purple-400 transition-all flex flex-col h-full shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform"><BookOpen size={120}/></div>
                            
                            <div className="flex justify-between items-start relative z-10">
                                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 group-hover:bg-purple-50 group-hover:text-purple-500 transition-all border-b-2">
                                    <FileText size={28} />
                                </div>
                                <div className="bg-purple-100 text-purple-600 px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest border border-purple-200 shadow-sm flex items-center gap-1.5">
                                    <Sparkles size={10} fill="currentColor"/> AI Blueprint Synced
                                </div>
                            </div>

                            <div className="flex-1 space-y-4 relative z-10">
                                <div>
                                    <h4 className="text-2xl font-black text-slate-800 leading-tight mb-2 group-hover:text-purple-600 transition-colors">{brief.label}</h4>
                                    <p className="text-sm font-bold text-slate-500 leading-relaxed italic">
                                        "{brief.instructions}"
                                    </p>
                                </div>

                                <div className="space-y-3 pt-2">
                                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2"><Target size={12} className="text-red-400"/> AI Checkpoints</p>
                                    <div className="flex flex-wrap gap-2">
                                        {brief.aiAuditCriteria.map((c, i) => (
                                            <span key={i} className="bg-slate-50 text-slate-500 px-3 py-1.5 rounded-xl text-[9px] font-black border border-slate-100 group-hover:border-purple-200 group-hover:bg-purple-50 transition-all">
                                                {c}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t-2 border-slate-50 relative z-10">
                                <div className="bg-purple-50 border-2 border-purple-100 p-5 rounded-[28px] space-y-4">
                                    <div className="flex items-center gap-3">
                                        <ShieldCheck size={20} className="text-purple-500" />
                                        <h5 className="font-black text-purple-600 text-xs uppercase tracking-widest">Strike Logic</h5>
                                    </div>
                                    <p className="text-[11px] font-bold text-purple-800 leading-snug">
                                        "Calibrated for the <span className="font-black italic">{brief.suggestedDojoTheme}</span> protocol. Master this unit to gain XP."
                                    </p>
                                    <button 
                                        onClick={() => navigate(`/${program.domain}/workspace/library`)}
                                        className="w-full py-4 bg-purple-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest border-b-[6px] border-purple-700 active:border-b-0 active:translate-y-[6px] transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-100"
                                    >
                                        Forge this Artifact <ArrowRight size={14} strokeWidth={4} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="py-32 text-center bg-white rounded-[48px] border-4 border-dashed border-slate-100 flex flex-col items-center">
                    <ClipboardList size={80} className="text-slate-100 mb-8" />
                    <h3 className="text-2xl font-black text-slate-300 uppercase tracking-widest">No matching blueprints</h3>
                    <p className="text-slate-400 font-bold mt-2">Try another artifact filter above.</p>
                </div>
            )}
        </div>
    );
};
