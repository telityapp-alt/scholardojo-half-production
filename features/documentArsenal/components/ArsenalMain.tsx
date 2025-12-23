
import React, { useState, useEffect, useMemo } from 'react';
import { ArsenalService } from '../services/arsenalService';
import { DocumentBlueprint } from '../types';
import { DomainType } from '../../../core/contracts/entityMap';
import { 
    FileText, Zap, Star, ShieldCheck, 
    Gem, BrainCircuit, ArrowRight, BookOpen, 
    Plus, Search, ExternalLink, Trophy, Fingerprint, Lock,
    Library
} from 'lucide-react';
import { DuoIcon } from '../../../components/ui/DuoIcon';
import { BlueprintPanel } from './BlueprintPanel';

interface ArsenalMainProps {
    domain: DomainType;
    programId?: string; // If provided, shows only relevant docs
    variant?: 'BROWSER' | 'COMPACT';
}

export const ArsenalMain: React.FC<ArsenalMainProps> = ({ domain, programId, variant = 'BROWSER' }) => {
    const [blueprints, setBlueprints] = useState<DocumentBlueprint[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const data = programId 
            ? ArsenalService.getBlueprintsByProgram(programId)
            : ArsenalService.getAllBlueprints(domain);
        setBlueprints(data);
    }, [domain, programId]);

    const filtered = useMemo(() => {
        if (!search) return blueprints;
        return blueprints.filter(b => b.title.toLowerCase().includes(search.toLowerCase()));
    }, [blueprints, search]);

    const activeBlueprint = useMemo(() => 
        blueprints.find(b => b.id === selectedId) || null
    , [selectedId, blueprints]);

    if (activeBlueprint) {
        return <BlueprintPanel blueprint={activeBlueprint} onClose={() => setSelectedId(null)} />;
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header Area */}
            {variant === 'BROWSER' && (
                <div className="flex flex-col md:flex-row justify-between items-end border-b-2 border-slate-200 pb-8 gap-6">
                    <div>
                        <h2 className="text-3xl font-black text-slate-700 flex items-center gap-3">
                            <div className="w-12 h-12 bg-duo-blue rounded-xl border-b-4 border-duo-blueDark flex items-center justify-center text-white shadow-lg">
                                <FileText size={28} strokeWidth={3} />
                            </div>
                            Tactical Arsenal
                        </h2>
                        <p className="text-slate-400 font-bold text-sm mt-1 ml-15">
                            Master every document blueprint with alumni winning artifacts.
                        </p>
                    </div>
                    <div className="w-full md:w-80">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input 
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Search blueprints..."
                                className="w-full pl-12 pr-4 py-3.5 bg-white rounded-2xl border-2 border-slate-200 border-b-4 outline-none focus:border-sky-400 font-bold text-slate-700"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Grid Area */}
            {filtered.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filtered.map(blueprint => (
                        <div 
                            key={blueprint.id}
                            onClick={() => setSelectedId(blueprint.id)}
                            className="group bg-white rounded-[32px] border-2 border-slate-200 border-b-[8px] p-6 hover:border-sky-400 hover:border-b-sky-600 transition-all cursor-pointer active:translate-y-[4px] active:border-b-2 h-full flex flex-col"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className={`w-14 h-14 rounded-2xl border-b-4 flex items-center justify-center shadow-md group-hover:rotate-3 transition-transform ${blueprint.category === 'ESSAY' ? 'bg-purple-500 border-purple-700 text-white' : 'bg-sky-500 border-sky-700 text-white'}`}>
                                    {blueprint.category === 'ESSAY' ? <BookOpen size={28} /> : <FileText size={28} />}
                                </div>
                                <div className="bg-slate-50 px-3 py-1.5 rounded-xl border-b-2 border-slate-100 flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    <Zap size={12} fill="currentColor" /> {blueprint.artifacts.length} Winning Docs
                                </div>
                            </div>
                            
                            <h3 className="text-xl font-black text-slate-700 leading-tight mb-3 group-hover:text-sky-600 transition-colors">{blueprint.title}</h3>
                            <p className="text-slate-500 font-bold text-xs leading-relaxed mb-6 line-clamp-2 italic">
                                "{blueprint.brief}"
                            </p>

                            <div className="mt-auto pt-6 border-t-2 border-slate-50 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="flex -space-x-2">
                                        {[1,2].map(i => (
                                            <div key={i} className="w-7 h-7 rounded-full border-2 border-white bg-slate-100 overflow-hidden">
                                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${blueprint.id + i}`} alt="" />
                                            </div>
                                        ))}
                                    </div>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Studied by Elite</span>
                                </div>
                                <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-300 flex items-center justify-center border-b-2 border-slate-100 group-hover:bg-sky-500 group-hover:text-white transition-all">
                                    <ArrowRight size={20} strokeWidth={4} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="py-20 text-center bg-slate-50 rounded-[48px] border-4 border-dashed border-slate-200">
                    {/* Fix: Added missing Library icon to imports */}
                    <Library className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                    <h3 className="text-xl font-black text-slate-300 uppercase tracking-widest">Blueprint Archive Empty</h3>
                </div>
            )}
        </div>
    );
};
