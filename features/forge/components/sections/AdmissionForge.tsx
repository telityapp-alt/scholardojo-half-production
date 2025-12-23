
import React, { useState } from 'react';
import { MasterProgram, ForgeService } from '../../services/forgeService';
import { ClipboardList, BrainCircuit, Loader2, Database, Plus, Trash2, Calendar } from 'lucide-react';
import { Type } from '@google/genai';

export const AdmissionForge: React.FC<{ program: MasterProgram, onUpdate: (p: any) => void }> = ({ program, onUpdate }) => {
    const [raw, setRaw] = useState('');
    const [loading, setLoading] = useState(false);

    const handleForge = async () => {
        setLoading(true);
        const schema = {
            type: Type.OBJECT,
            properties: {
                checklist: { 
                    type: Type.ARRAY, 
                    items: { 
                        type: Type.OBJECT, 
                        properties: { 
                            id: { type: Type.STRING }, 
                            label: { type: Type.STRING }, 
                            estimate: { type: Type.STRING } 
                        } 
                    } 
                },
                monthlyRoadmap: { 
                    type: Type.ARRAY, 
                    items: { 
                        type: Type.OBJECT, 
                        properties: { 
                            month: { type: Type.STRING }, 
                            tasks: { type: Type.ARRAY, items: { type: Type.STRING } } 
                        } 
                    } 
                }
            }
        };
        try {
            const result = await ForgeService.callAI(`EXTRACT ADMISSION ROADMAP:\n${raw}`, schema);
            onUpdate({ ...program, ...result });
        } catch (e) { alert("Mapping failed."); }
        setLoading(false);
    };

    return (
        <div className="space-y-12 animate-in fade-in duration-300">
            {/* AI AREA */}
            <div className="space-y-4">
                <h2 className="text-sm font-black uppercase tracking-widest text-slate-400">1. Timeline Data Extraction</h2>
                <textarea 
                    value={raw} onChange={e => setRaw(e.target.value)}
                    placeholder="PASTE APPLICATION GUIDES, TIMELINES, OR PORTAL CHECKLISTS..."
                    className="w-full h-40 p-6 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs outline-none focus:bg-white focus:border-slate-400 transition-all resize-none shadow-inner"
                />
                <button 
                    onClick={handleForge} disabled={loading || !raw.trim()}
                    className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-xs uppercase tracking-[0.2em] hover:bg-slate-800 disabled:opacity-50 transition-all flex items-center justify-center gap-3"
                >
                    <BrainCircuit size={16} /> Execute Roadmap Mapping
                </button>
            </div>

            {/* EDITOR AREA */}
            <div className="space-y-8 pt-8 border-t border-slate-100">
                <h2 className="text-sm font-black uppercase tracking-widest text-slate-400">2. Ledger Editor</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Checklist */}
                    <div className="space-y-4">
                        <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 flex items-center gap-2"><ClipboardList size={12}/> Inventory</label>
                        <div className="space-y-2">
                            {program.checklist.map((c, i) => (
                                <div key={i} className="flex gap-2">
                                    <input value={c.label} onChange={e => {
                                        const next = [...program.checklist];
                                        next[i].label = e.target.value;
                                        onUpdate({ ...program, checklist: next });
                                    }} className="flex-1 p-2.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 outline-none" />
                                    <input value={c.estimate} onChange={e => {
                                        const next = [...program.checklist];
                                        next[i].estimate = e.target.value;
                                        onUpdate({ ...program, checklist: next });
                                    }} className="w-16 p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-400 text-center outline-none" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Monthly */}
                    <div className="space-y-4">
                        <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 flex items-center gap-2"><Calendar size={12}/> Milestones</label>
                        <div className="space-y-3">
                            {program.monthlyRoadmap?.map((m, i) => (
                                <div key={i} className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 shadow-sm">
                                    <input value={m.month} onChange={e => {
                                        const next = [...program.monthlyRoadmap];
                                        next[i].month = e.target.value;
                                        onUpdate({ ...program, monthlyRoadmap: next });
                                    }} className="w-full text-xs font-black uppercase text-sky-600 outline-none" />
                                    <textarea value={m.tasks.join('\n')} onChange={e => {
                                        const next = [...program.monthlyRoadmap];
                                        next[i].tasks = e.target.value.split('\n');
                                        onUpdate({ ...program, monthlyRoadmap: next });
                                    }} className="w-full h-16 text-[10px] font-bold text-slate-400 outline-none resize-none" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* RAW DUMP */}
            <div className="space-y-4 pt-12 border-t border-slate-100">
                <div className="flex items-center gap-2">
                    <Database size={14} className="text-slate-400" />
                    <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Chronological State</h2>
                </div>
                <pre className="p-8 bg-slate-900 text-emerald-400 font-mono text-[10px] rounded-2xl overflow-x-auto max-h-64 border-b-[8px] border-black">
                    {JSON.stringify({ checklist: program.checklist, monthly: program.monthlyRoadmap }, null, 4)}
                </pre>
            </div>
        </div>
    );
};
