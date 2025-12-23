
import React, { useState } from 'react';
import { MasterProgram, ForgeService } from '../../services/forgeService';
import { Target, BrainCircuit, Loader2, Database } from 'lucide-react';
import { Type } from '@google/genai';

export const CommandForge: React.FC<{ program: MasterProgram, onUpdate: (p: any) => void }> = ({ program, onUpdate }) => {
    const [raw, setRaw] = useState('');
    const [loading, setLoading] = useState(false);

    const handleForge = async () => {
        setLoading(true);
        const schema = {
            type: Type.OBJECT,
            properties: {
                intel: {
                    type: Type.OBJECT,
                    properties: {
                        weights: { type: Type.OBJECT, properties: { academic: { type: Type.NUMBER }, assets: { type: Type.NUMBER }, matrix: { type: Type.NUMBER } } },
                        stats: { 
                            type: Type.OBJECT, 
                            properties: { 
                                awardeesPerYear: { type: Type.STRING }, 
                                acceptanceRate: { type: Type.STRING }, 
                                selectivityRatio: { type: Type.STRING },
                                targetKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
                                minGpa: { type: Type.NUMBER }
                            } 
                        }
                    }
                }
            }
        };
        try {
            const result = await ForgeService.callAI(`CALCULATE ADMISSION WEIGHTS & STATS FOR ${program.title}:\n${raw}`, schema);
            onUpdate({ intel: { ...program.intel, ...result.intel } });
        } catch (e) { alert("Mapping failed."); }
        setLoading(false);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-300">
            <div className="space-y-2 border-b border-slate-100 pb-6">
                <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Command Center Calibration</h2>
                <p className="text-slate-400 text-sm">Neural odds weights and historical statistics.</p>
            </div>

            <textarea 
                value={raw} onChange={e => setRaw(e.target.value)}
                placeholder="PASTE ACCEPTANCE DATA, MINIMUM GPA INFO, OR SCORING RUBRICS..."
                className="w-full h-64 p-8 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs leading-relaxed outline-none focus:bg-white focus:border-slate-400 transition-all resize-none shadow-inner"
            />

            <button 
                onClick={handleForge} disabled={loading || !raw.trim()}
                className="w-full flex items-center justify-center gap-3 py-4 bg-slate-900 text-white rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-slate-800 disabled:opacity-50 transition-all shadow-md"
            >
                {loading ? <Loader2 className="animate-spin" size={18} /> : <BrainCircuit size={18} />}
                Calibrate Odds Logic
            </button>

            <div className="space-y-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2"><Database size={12}/> Logic Parameters</p>
                <pre className="p-6 bg-slate-900 text-sky-400 font-mono text-[10px] rounded-xl overflow-x-auto max-h-64 border-b-4 border-black">
                    {JSON.stringify({ weights: program.intel.weights, stats: program.intel.stats }, null, 4)}
                </pre>
            </div>
        </div>
    );
};
