
import React, { useState } from 'react';
import { MasterProgram, ForgeService } from '../../services/forgeService';
import { Key, BrainCircuit, Loader2, Database, Save, Trash2, Plus } from 'lucide-react';
import { Type } from '@google/genai';

export const KeysForge: React.FC<{ program: MasterProgram, onUpdate: (p: any) => void }> = ({ program, onUpdate }) => {
    const [raw, setRaw] = useState('');
    const [loading, setLoading] = useState(false);

    const handleForge = async () => {
        setLoading(true);
        const schema = {
            type: Type.OBJECT,
            properties: {
                shadowProtocol: {
                    type: Type.OBJECT,
                    properties: {
                        expertVerdict: { type: Type.STRING },
                        lethalMistakes: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { title: { type: Type.STRING }, reason: { type: Type.STRING } } } },
                        ghostTasks: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { label: { type: Type.STRING }, importance: { type: Type.STRING } } } }
                    }
                }
            }
        };
        try {
            const result = await ForgeService.callAI(`ANALYZE SUCCESS STRATEGY:\n${raw}`, schema);
            onUpdate({ ...program, ...result });
        } catch (e) { alert("Mapping failed."); }
        setLoading(false);
    };

    const updateProtocol = (field: string, val: any) => {
        onUpdate({ ...program, shadowProtocol: { ...program.shadowProtocol, [field]: val } });
    };

    const addGhostTask = () => {
        const next = [...program.shadowProtocol.ghostTasks, { label: 'New Secret Action', importance: 'STRATEGIC' }];
        updateProtocol('ghostTasks', next);
    };

    return (
        <div className="space-y-12 animate-in fade-in duration-300">
            {/* AI AREA */}
            <div className="space-y-4">
                <h2 className="text-sm font-black uppercase tracking-widest text-slate-400">1. Strategic Intelligence Extraction</h2>
                <textarea 
                    value={raw} onChange={e => setRaw(e.target.value)}
                    placeholder="PASTE ALUMNI REPORTS, INTERVIEW RECAPS, OR ADMISSIONS BLOGS..."
                    className="w-full h-40 p-6 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs outline-none focus:bg-white focus:border-slate-400 transition-all resize-none shadow-inner"
                />
                <button 
                    onClick={handleForge} disabled={loading || !raw.trim()}
                    className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-xs uppercase tracking-[0.2em] hover:bg-slate-800 disabled:opacity-50 transition-all flex items-center justify-center gap-3"
                >
                    <BrainCircuit size={16} /> Execute Shadow Mapping
                </button>
            </div>

            {/* EDITOR AREA */}
            <div className="space-y-8 pt-8 border-t border-slate-100">
                <h2 className="text-sm font-black uppercase tracking-widest text-slate-400">2. Success Field Editor</h2>
                
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Expert Verdict (The One Thing)</label>
                    <textarea value={program.shadowProtocol.expertVerdict} onChange={e => updateProtocol('expertVerdict', e.target.value)} className="w-full h-24 p-4 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 outline-none focus:border-sky-400 resize-none" />
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Ghost Tasks (Off-the-record)</label>
                        <button onClick={addGhostTask} className="text-[10px] font-black uppercase text-sky-500 flex items-center gap-1 hover:text-sky-700"><Plus size={12}/> Add Task</button>
                    </div>
                    <div className="space-y-2">
                        {program.shadowProtocol.ghostTasks.map((t, i) => (
                            <div key={i} className="flex gap-3">
                                <input value={t.label} onChange={e => {
                                    const next = [...program.shadowProtocol.ghostTasks];
                                    next[i].label = e.target.value;
                                    updateProtocol('ghostTasks', next);
                                }} className="flex-1 p-3 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 outline-none" />
                                <select value={t.importance} onChange={e => {
                                    const next = [...program.shadowProtocol.ghostTasks];
                                    next[i].importance = e.target.value;
                                    updateProtocol('ghostTasks', next);
                                }} className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-bold uppercase outline-none">
                                    <option value="CRITICAL">CRITICAL</option>
                                    <option value="STRATEGIC">STRATEGIC</option>
                                    <option value="BONUS">BONUS</option>
                                </select>
                                <button onClick={() => {
                                    const next = program.shadowProtocol.ghostTasks.filter((_, idx) => idx !== i);
                                    updateProtocol('ghostTasks', next);
                                }} className="p-3 text-slate-300 hover:text-red-500"><Trash2 size={16}/></button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* RAW DUMP */}
            <div className="space-y-4 pt-12 border-t border-slate-100">
                <div className="flex items-center gap-2">
                    <Database size={14} className="text-slate-400" />
                    <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Current Success DNA</h2>
                </div>
                <pre className="p-8 bg-slate-900 text-yellow-400 font-mono text-[10px] rounded-2xl overflow-x-auto max-h-64 border-b-[8px] border-black">
                    {JSON.stringify(program.shadowProtocol, null, 4)}
                </pre>
            </div>
        </div>
    );
};
