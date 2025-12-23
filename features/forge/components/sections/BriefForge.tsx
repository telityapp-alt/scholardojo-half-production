
import React, { useState } from 'react';
import { MasterProgram, ForgeService } from '../../services/forgeService';
import { BrainCircuit, Loader2, Database, Save, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';
import { Type } from '@google/genai';

export const BriefForge: React.FC<{ program: MasterProgram, onUpdate: (p: any) => void }> = ({ program, onUpdate }) => {
    const [raw, setRaw] = useState('');
    const [loading, setLoading] = useState(false);

    const handleForge = async () => {
        setLoading(true);
        const schema = {
            type: Type.OBJECT,
            properties: {
                title: { type: Type.STRING },
                organizer: { type: Type.STRING },
                type: { type: Type.STRING },
                level: { type: Type.STRING },
                country: { type: Type.STRING },
                deadline: { type: Type.STRING },
                applyUrl: { type: Type.STRING },
                intel: {
                    type: Type.OBJECT,
                    properties: {
                        description: { type: Type.STRING },
                        highlights: { type: Type.ARRAY, items: { type: Type.STRING } },
                        entryCriteria: { type: Type.ARRAY, items: { type: Type.STRING } },
                        funding: { type: Type.ARRAY, items: { type: Type.STRING } }
                    }
                }
            }
        };
        try {
            const result = await ForgeService.callAI(`EXTRACT CORE BRIEFING:\n${raw}`, schema);
            onUpdate({ ...result });
        } catch (e) { alert("Mapping failed."); }
        setLoading(false);
    };

    const updateField = (path: string, val: any) => {
        const next = { ...program };
        if (path.includes('.')) {
            const [p1, p2] = path.split('.');
            (next as any)[p1][p2] = val;
        } else {
            (next as any)[path] = val;
        }
        onUpdate(next);
    };

    return (
        <div className="space-y-12 animate-in fade-in duration-300">
            {/* AI TRIGGER AREA */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-sm font-black uppercase tracking-widest text-slate-400">1. AI Data Excavation</h2>
                    {loading && <Loader2 className="animate-spin text-sky-500" size={16}/>}
                </div>
                <textarea 
                    value={raw} onChange={e => setRaw(e.target.value)}
                    placeholder="PASTE RAW WEBSITE CONTENT OR PDF TEXT HERE..."
                    className="w-full h-40 p-6 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs outline-none focus:bg-white focus:border-slate-400 transition-all resize-none shadow-inner"
                />
                <button 
                    onClick={handleForge} disabled={loading || !raw.trim()}
                    className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-xs uppercase tracking-[0.2em] hover:bg-slate-800 disabled:opacity-50 transition-all flex items-center justify-center gap-3"
                >
                    <BrainCircuit size={16} /> Execute Neural Mapping
                </button>
            </div>

            {/* EDITABLE FORM AREA */}
            <div className="space-y-8 pt-8 border-t border-slate-100">
                <h2 className="text-sm font-black uppercase tracking-widest text-slate-400">2. Live Field Editor</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Program Title</label>
                        <input value={program.title} onChange={e => updateField('title', e.target.value)} className="w-full p-3 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 outline-none focus:border-sky-400" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Organizer Name</label>
                        <input value={program.organizer} onChange={e => updateField('organizer', e.target.value)} className="w-full p-3 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 outline-none focus:border-sky-400" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Deadline (ISO)</label>
                        <input value={program.deadline} onChange={e => updateField('deadline', e.target.value)} className="w-full p-3 bg-white border border-slate-200 rounded-lg text-sm font-mono text-slate-700 outline-none focus:border-sky-400" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Location / Country</label>
                        <input value={program.country} onChange={e => updateField('country', e.target.value)} className="w-full p-3 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 outline-none focus:border-sky-400" />
                    </div>
                    <div className="md:col-span-2 space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Official Apply URL</label>
                        <div className="relative">
                            <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                            <input value={program.applyUrl} onChange={e => updateField('applyUrl', e.target.value)} className="w-full p-3 pl-10 bg-white border border-slate-200 rounded-lg text-sm font-bold text-sky-600 outline-none focus:border-sky-400" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Logo URL</label>
                        <div className="flex gap-4 items-center">
                            <div className="w-12 h-12 rounded-lg border border-slate-200 p-1 bg-slate-50 flex items-center justify-center overflow-hidden shrink-0">
                                <img src={program.organizerLogo} className="w-full h-full object-contain" />
                            </div>
                            <input value={program.organizerLogo} onChange={e => updateField('organizerLogo', e.target.value)} className="flex-1 p-2.5 bg-white border border-slate-200 rounded-lg text-[10px] outline-none" placeholder="Paste Logo URL..." />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Cover Image URL</label>
                        <div className="flex gap-4 items-center">
                            <div className="w-12 h-12 rounded-lg border border-slate-200 p-1 bg-slate-50 flex items-center justify-center overflow-hidden shrink-0">
                                <ImageIcon size={20} className="text-slate-300" />
                            </div>
                            <input value={program.coverImage} onChange={e => updateField('coverImage', e.target.value)} className="flex-1 p-2.5 bg-white border border-slate-200 rounded-lg text-[10px] outline-none" placeholder="Paste Cover URL..." />
                        </div>
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Short Description</label>
                    <textarea value={program.intel.description} onChange={e => updateField('intel.description', e.target.value)} className="w-full h-24 p-4 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 outline-none focus:border-sky-400 resize-none" />
                </div>
            </div>

            {/* RAW DUMP AREA */}
            <div className="space-y-4 pt-12 border-t border-slate-100">
                <div className="flex items-center gap-2">
                    <Database size={14} className="text-slate-400" />
                    <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Current DNA State (Total JSON)</h2>
                </div>
                <pre className="p-8 bg-slate-950 text-sky-400 font-mono text-[10px] rounded-2xl overflow-x-auto max-h-96 border-b-[8px] border-black">
                    {JSON.stringify(program, null, 4)}
                </pre>
            </div>
        </div>
    );
};
