
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DomainType } from '../../../core/contracts/entityMap';
import { ForgeService, MasterProgram } from '../services/forgeService';
import { ProgramForgeContainer } from './ProgramForgeContainer';
import { Plus, Trash2, Edit3, Database, Hammer } from 'lucide-react';

export const ForgeView: React.FC = () => {
    const { domain } = useParams<{ domain: string }>();
    const domainEnum = (domain as DomainType) || DomainType.STUDENT;
    const [programs, setPrograms] = useState<MasterProgram[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);

    const load = () => setPrograms(ForgeService.getAll().filter(p => p.domain === domainEnum));

    useEffect(() => {
        load();
        window.addEventListener('storage', load);
        return () => window.removeEventListener('storage', load);
    }, [domainEnum]);

    if (editingId) {
        return <ProgramForgeContainer 
            id={editingId} 
            domain={domainEnum} 
            onClose={() => { setEditingId(null); load(); }} 
        />;
    }

    return (
        <div className="space-y-10 animate-in fade-in duration-300">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-2 flex items-center gap-4">
                        <Hammer className="text-slate-400" size={32} /> Architect Registry
                    </h1>
                    <p className="text-slate-500 text-sm">Forge high-fidelity Dojo objects for production deployment.</p>
                </div>
                <button 
                    onClick={() => {
                        const newId = `p-${Date.now()}`;
                        setEditingId(newId);
                    }}
                    className="flex items-center gap-2 bg-slate-900 text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-slate-800 transition-all shadow-sm"
                >
                    <Plus size={18} /> New Architecture
                </button>
            </div>

            <div className="space-y-1">
                {programs.length === 0 && (
                    <div className="p-20 text-center border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                        <p className="text-slate-400 font-medium text-sm">No architectures forged in this domain.</p>
                    </div>
                )}

                {programs.map(p => (
                    <div key={p.id} className="group grid grid-cols-12 items-center px-6 py-4 border border-slate-100 hover:border-slate-200 hover:bg-slate-50 rounded-xl transition-all">
                        <div className="col-span-1 flex justify-center">
                            <div className="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center p-1 shadow-sm">
                                <img src={p.organizerLogo} className="w-full h-full object-contain" />
                            </div>
                        </div>
                        <div className="col-span-7 pl-4">
                            <h4 className="font-bold text-slate-700 text-sm">{p.title}</h4>
                            <p className="text-[10px] text-slate-400 uppercase tracking-widest">{p.organizer} • {p.country}</p>
                        </div>
                        <div className="col-span-2">
                             <span className="text-[10px] font-bold bg-slate-200 px-2 py-0.5 rounded text-slate-600 uppercase">{p.tier}</span>
                        </div>
                        <div className="col-span-2 text-right flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => setEditingId(p.id)} className="p-2 text-slate-400 hover:text-sky-600 hover:bg-white rounded border border-transparent hover:border-slate-200 shadow-sm"><Edit3 size={14} /></button>
                            <button onClick={() => ForgeService.delete(p.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded border border-transparent hover:border-red-100 shadow-sm"><Trash2 size={14} /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
