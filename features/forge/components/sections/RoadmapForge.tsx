
import React, { useState } from 'react';
import { MasterProgram, ForgeService } from '../../services/forgeService';
import { Map, BrainCircuit, Loader2, Database, Trash2, Plus, ArrowRight } from 'lucide-react';
import { Type } from '@google/genai';

export const RoadmapForge: React.FC<{ program: MasterProgram, onUpdate: (p: any) => void }> = ({ program, onUpdate }) => {
    const [raw, setRaw] = useState('');
    const [loading, setLoading] = useState(false);

    const handleForge = async () => {
        setLoading(true);
        const schema = {
            type: Type.OBJECT,
            properties: {
                curriculum: {
                    type: Type.OBJECT,
                    properties: {
                        units: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    id: { type: Type.STRING },
                                    title: { type: Type.STRING },
                                    description: { type: Type.STRING },
                                    chapters: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { title: { type: Type.STRING }, points: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { title: { type: Type.STRING }, content: { type: Type.STRING } } } } } } }
                                }
                            }
                        }
                    }
                }
            }
        };
        try {
            const result = await ForgeService.callAI(`BUILD CURRICULUM:\n${raw}`, schema);
            onUpdate({ ...program, curriculum: result.curriculum });
        } catch (e) { alert("Mapping failed."); }
        setLoading(false);
    };

    return (
        <div className="space-y-12 animate-in fade-in duration-300">
            {/* AI AREA */}
            <div className="space-y-4">
                <h2 className="text-sm font-black uppercase tracking-widest text-slate-400">1. Academy Data Synthesis</h2>
                <textarea 
                    value={raw} onChange={e => setRaw(e.target.value)}
                    placeholder="PASTE SYLLABUS, COURSE CONTENT, OR LEARNING OBJECTIVES..."
                    className="w-full h-40 p-6 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs outline-none focus:bg-white focus:border-slate-400 transition-all resize-none shadow-inner"
                />
                <button 
                    onClick={handleForge} disabled={loading || !raw.trim()}
                    className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-xs uppercase tracking-[0.2em] hover:bg-slate-800 disabled:opacity-50 transition-all flex items-center justify-center gap-3"
                >
                    <BrainCircuit size={16} /> Forge Academy Units
                </button>
            </div>

            {/* EDITOR AREA */}
            <div className="space-y-8 pt-8 border-t border-slate-100">
                <h2 className="text-sm font-black uppercase tracking-widest text-slate-400">2. Academy Blueprint Editor</h2>
                
                <div className="space-y-6">
                    {program.curriculum?.units?.map((unit: any, i: number) => (
                        <div key={i} className="bg-white border border-slate-200 rounded-[32px] border-b-[8px] p-6 space-y-4 group transition-all hover:border-sky-300">
                            <div className="flex items-center gap-4">
                                <span className="w-8 h-8 rounded-lg bg-sky-500 text-white flex items-center justify-center font-black text-xs">U{i+1}</span>
                                <input value={unit.title} onChange={e => {
                                    const next = { ...program.curriculum };
                                    next.units[i].title = e.target.value;
                                    onUpdate({ ...program, curriculum: next });
                                }} className="flex-1 font-black text-lg text-slate-700 outline-none" />
                            </div>
                            <div className="pl-12 space-y-3">
                                {unit.chapters.map((ch: any, j: number) => (
                                    <div key={j} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                                        <ArrowRight size={14} className="text-slate-300" />
                                        <input value={ch.title} onChange={e => {
                                            const next = { ...program.curriculum };
                                            next.units[i].chapters[j].title = e.target.value;
                                            onUpdate({ ...program, curriculum: next });
                                        }} className="flex-1 bg-transparent text-xs font-bold text-slate-500 outline-none" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* RAW DUMP */}
            <div className="space-y-4 pt-12 border-t border-slate-100">
                <div className="flex items-center gap-2">
                    <Database size={14} className="text-slate-400" />
                    <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Curriculum Matrix State</h2>
                </div>
                <pre className="p-8 bg-slate-900 text-pink-400 font-mono text-[10px] rounded-2xl overflow-x-auto max-h-64 border-b-[8px] border-black">
                    {JSON.stringify(program.curriculum, null, 4)}
                </pre>
            </div>
        </div>
    );
};
