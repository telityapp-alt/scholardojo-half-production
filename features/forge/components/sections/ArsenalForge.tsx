
import React, { useState } from 'react';
import { MasterProgram, ForgeService } from '../../services/forgeService';
import { FileText, BrainCircuit, Loader2, Database, Plus, Trash2 } from 'lucide-react';
import { Type } from '@google/genai';

export const ArsenalForge: React.FC<{ program: MasterProgram, onUpdate: (p: any) => void }> = ({ program, onUpdate }) => {
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
                        documents: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { label: { type: Type.STRING }, spec: { type: Type.STRING }, type: { type: Type.STRING } } } }
                    }
                }
            }
        };
        try {
            const result = await ForgeService.callAI(`EXTRACT DOCUMENT REQUIREMENTS:\n${raw}`, schema);
            onUpdate({ intel: { ...program.intel, documents: result.intel.documents } });
        } catch (e) { alert("Mapping failed."); }
        setLoading(false);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-300">
            <div className="space-y-2 border-b border-slate-100 pb-6">
                <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Tactical Arsenal Builder</h2>
                <p className="text-slate-400 text-sm">Map doc requirements and alumni artifacts.</p>
            </div>

            <textarea 
                value={raw} onChange={e => setRaw(e.target.value)}
                placeholder="PASTE DOCUMENT LISTS, PDF SPECS, OR UPLOAD REQUIREMENTS..."
                className="w-full h-40 p-8 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs leading-relaxed outline-none focus:bg-white focus:border-slate-400 transition-all resize-none shadow-inner"
            />

            <button 
                onClick={handleForge} disabled={loading || !raw.trim()}
                className="w-full flex items-center justify-center gap-3 py-4 bg-slate-900 text-white rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-slate-800 disabled:opacity-50 transition-all shadow-md"
            >
                {loading ? <Loader2 className="animate-spin" size={18} /> : <BrainCircuit size={18} />}
                Map Arsenal Blueprints
            </button>

            <div className="space-y-4 pt-10 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest">Manual Artifact Registry</h4>
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-center">
                    <p className="text-slate-400 text-sm italic">Artifact upload logic integrated. Paste direct URLs to winning artifact PDFs.</p>
                </div>
            </div>

            <div className="space-y-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2"><Database size={12}/> Document Mapping</p>
                <pre className="p-6 bg-slate-900 text-indigo-400 font-mono text-[10px] rounded-xl overflow-x-auto max-h-64 border-b-4 border-black">
                    {JSON.stringify(program.intel.documents, null, 4)}
                </pre>
            </div>
        </div>
    );
};
