
import React, { useState, useMemo } from 'react';
import { UnifiedProgram, DocBrief } from '../../../programs/types';
import { UnifiedProgramService } from '../../../programs/services/unifiedProgramService';
import { DomainType } from '../../../../core/contracts/entityMap';
import { 
    X, Search, Target, Zap, Sparkles, ArrowRight, ShieldCheck, 
    Globe, Trophy, Hash, Clock, FileText, ChevronLeft,
    Filter, Layers, Star, BrainCircuit
} from 'lucide-react';

interface Props {
    domain: DomainType; // This will likely be 'docs' from the editor context
    onSelect: (p: UnifiedProgram, b: DocBrief | null) => void;
    onClose: () => void;
}

export const MissionSelectorModal: React.FC<Props> = ({ domain, onClose, onSelect }) => {
    const [search, setSearch] = useState('');
    const [allPrograms, setAllPrograms] = useState<UnifiedProgram[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedProgram, setSelectedProgram] = useState<UnifiedProgram | null>(null);
    const [activeFilter, setActiveFilter] = useState('ALL');

    React.useEffect(() => {
        const load = async () => {
            setIsLoading(true);
            // Docs Dojo is a cross-domain tool. 
            // We need to look for secured missions in ALL primary domains (Scholar, Intern, Student)
            const domainsToSearch = [DomainType.SCHOLAR, DomainType.INTERN, DomainType.STUDENT];
            
            let aggregated: UnifiedProgram[] = [];
            for (const d of domainsToSearch) {
                const data = await UnifiedProgramService.getAll(d);
                aggregated = [...aggregated, ...data];
            }

            const securedIds = JSON.parse(localStorage.getItem('dojo_secured_missions') || '[]');
            // Filter to only show what the user has "Secured"
            const securedMissions = aggregated.filter(p => securedIds.includes(p.id));
            
            setAllPrograms(securedMissions);
            setIsLoading(false);
        };
        load();
    }, []);

    const filteredPrograms = useMemo(() => allPrograms.filter(p => 
        p.title.toLowerCase().includes(search.toLowerCase()) || 
        p.organizer.toLowerCase().includes(search.toLowerCase())
    ), [allPrograms, search]);

    const CATEGORIES = [
        { id: 'ALL', label: 'All Artifacts' },
        { id: 'cv', label: 'Resumes' },
        { id: 'essay', label: 'Essays' },
        { id: 'lor', label: 'Letters' },
        { id: 'portfolio', label: 'Portfolio' }
    ];

    const filteredBriefs = useMemo(() => {
        if (!selectedProgram) return [];
        const briefs = selectedProgram.shadowProtocol.docBriefs || [];
        return briefs.filter(b => 
            activeFilter === 'ALL' ? true : b.id.toLowerCase().includes(activeFilter.toLowerCase())
        );
    }, [selectedProgram, activeFilter]);

    return (
        <div className="fixed inset-0 z-[5000] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
            <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={onClose}></div>
            
            <div className="relative w-full max-w-6xl h-[90vh] bg-[#f7f7f7] rounded-[48px] border-4 border-slate-200 border-b-[16px] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
                
                {/* Header Area */}
                <div className="bg-white p-6 md:p-8 border-b-2 border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6 shrink-0 relative z-20 shadow-sm">
                    <div className="flex items-center gap-5">
                        {selectedProgram && (
                            <button 
                                onClick={() => { setSelectedProgram(null); setActiveFilter('ALL'); }} 
                                className="w-12 h-12 bg-slate-100 rounded-2xl text-slate-400 hover:text-sky-500 hover:bg-sky-50 border-b-4 border-slate-200 transition-all active:translate-y-1 flex items-center justify-center"
                            >
                                <ChevronLeft size={28} strokeWidth={4} />
                            </button>
                        )}
                        <div>
                            <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white border-b-4 shadow-lg transition-colors ${selectedProgram ? 'bg-[#ce82ff] border-[#a855f7]' : 'bg-[#1cb0f6] border-[#1899d6]'}`}>
                                    {selectedProgram ? <FileText size={24} strokeWidth={3} /> : <Target size={24} strokeWidth={3} />}
                                </div>
                                {selectedProgram ? 'Select Mission Artifact' : 'Mission Target Hub'}
                            </h2>
                            <p className="text-slate-400 font-bold text-xs md:text-sm mt-1">
                                {selectedProgram ? `Targeting ${selectedProgram.title}` : 'Select your secured mission to sync Dojo AI context.'}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {selectedProgram ? (
                            /* Category Switcher in Modal (Mirror of DocsTab) */
                            <div className="bg-slate-100 p-1 rounded-2xl border-2 border-slate-200 flex gap-1 shadow-inner">
                                {CATEGORIES.map(cat => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setActiveFilter(cat.id)}
                                        className={`px-4 py-2 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all ${activeFilter === cat.id ? 'bg-white text-purple-600 shadow-sm border-b-2 border-slate-200' : 'text-slate-400 hover:text-slate-600'}`}
                                    >
                                        {cat.label.split(' ')[0]}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="relative w-full md:w-64">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input 
                                    value={search} onChange={e => setSearch(e.target.value)}
                                    placeholder="Search secured missions..."
                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-2xl outline-none focus:border-sky-400 font-bold text-sm"
                                />
                            </div>
                        )}
                        <button onClick={onClose} className="w-12 h-12 bg-slate-100 hover:bg-slate-200 text-slate-400 rounded-2xl flex items-center justify-center border-b-4 border-slate-200 active:translate-y-1"><X size={24} strokeWidth={4} /></button>
                    </div>
                </div>

                {/* Stage 1: Mission Selection */}
                {!selectedProgram ? (
                    <div className="flex-1 overflow-y-auto p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 scrollbar-hide relative z-10">
                        {isLoading ? (
                            <div className="md:col-span-3 py-20 text-center animate-pulse">
                                <BrainCircuit size={64} className="mx-auto text-slate-200 mb-4 animate-spin-slow" />
                                <p className="font-black text-slate-300 uppercase tracking-widest">Scanning Neural Pool...</p>
                            </div>
                        ) : filteredPrograms.map(p => (
                            <div 
                                key={p.id}
                                onClick={() => setSelectedProgram(p)}
                                className="group bg-white rounded-[40px] border-2 border-slate-200 border-b-[8px] hover:border-sky-400 hover:border-b-sky-600 transition-all cursor-pointer active:translate-y-[4px] active:border-b-2 overflow-hidden flex flex-col h-full shadow-sm"
                            >
                                <div className="aspect-[2/1] relative overflow-hidden bg-slate-100 border-b-2 border-slate-100">
                                    <img src={p.intel.description.includes('AI') ? 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000' : 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000'} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="" />
                                    <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md text-white px-2 py-1 rounded-lg flex items-center gap-1 border border-white/20 shadow-lg">
                                        <Hash size={10} className="text-sky-400 stroke-[4px]" />
                                        <span className="text-[10px] font-black tracking-widest">{p.id.slice(-3).toUpperCase()}</span>
                                    </div>
                                    <div className="absolute bottom-3 right-3 bg-[#1cb0f6] px-3 py-1 rounded-xl text-[9px] font-black uppercase text-white border-b-2 border-sky-700 shadow-sm">{p.domain}</div>
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="text-xl font-black text-slate-700 leading-tight mb-2 truncate group-hover:text-sky-600 transition-colors">{p.title}</h3>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest truncate mb-6">{p.organizer}</p>
                                    <div className="mt-auto pt-6 border-t-2 border-slate-50 flex items-center justify-between">
                                         <span className="text-[10px] font-black text-slate-400 uppercase">{p.shadowProtocol.docBriefs.length} Artifacts</span>
                                         <span className="text-[10px] font-black text-sky-500 uppercase flex items-center gap-2 group-hover:translate-x-1 transition-transform">Target <ArrowRight size={14} strokeWidth={3}/></span>
                                    </div>
                                </div>
                            </div>
                        ))}
                        
                        {!isLoading && filteredPrograms.length === 0 && (
                            <div className="md:col-span-3 py-32 text-center flex flex-col items-center gap-6">
                                 <div className="w-24 h-24 bg-white rounded-[32px] border-b-[8px] border-slate-200 flex items-center justify-center text-slate-200 shadow-md">
                                    <Trophy size={48} />
                                 </div>
                                 <h3 className="text-2xl font-black text-slate-300 uppercase tracking-[0.4em]">Desk Empty</h3>
                                 <p className="font-bold text-slate-400 max-w-sm mx-auto leading-relaxed">
                                     You haven't "Secured" any programs yet. Visit the **Explore** tab in Student, Intern, or Scholar Dojo to secure a target mission.
                                 </p>
                            </div>
                        )}
                    </div>
                ) : (
                    /* Stage 2: Artifact Selection (EXACT MIRROR OF DOCS TAB) */
                    <div className="flex-1 overflow-y-auto p-10 scrollbar-hide relative z-10 space-y-10 bg-slate-50/50">
                        {filteredBriefs.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-10">
                                {filteredBriefs.map((brief) => (
                                    <div 
                                        key={brief.id}
                                        onClick={() => { onSelect(selectedProgram, brief); onClose(); }}
                                        className="bg-white rounded-[48px] border-2 border-slate-200 border-b-[12px] p-8 space-y-6 group hover:border-[#ce82ff] transition-all cursor-pointer active:translate-y-[4px] active:border-b-4 flex flex-col h-full shadow-sm relative overflow-hidden"
                                    >
                                        <div className="absolute top-0 right-0 p-8 opacity-[0.02] group-hover:scale-110 transition-transform"><Layers size={150}/></div>
                                        
                                        <div className="flex justify-between items-start relative z-10">
                                            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 group-hover:bg-purple-50 group-hover:text-purple-500 transition-all border-b-2">
                                                <FileText size={28} />
                                            </div>
                                            <div className="bg-purple-100 text-purple-600 px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest border border-purple-200 shadow-sm flex items-center gap-1.5">
                                                <Sparkles size={10} fill="currentColor"/> AI Target Link
                                            </div>
                                        </div>

                                        <div className="flex-1 space-y-4 relative z-10">
                                            <div>
                                                <h4 className="text-2xl font-black text-slate-800 leading-tight mb-2 group-hover:text-purple-600 transition-colors">{brief.label}</h4>
                                                <p className="text-sm font-bold text-slate-500 leading-relaxed italic line-clamp-3">
                                                    "{brief.instructions}"
                                                </p>
                                            </div>

                                            <div className="space-y-3 pt-2">
                                                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2"><Target size={12} className="text-red-400"/> Critical Checkpoints</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {brief.aiAuditCriteria.slice(0, 4).map((c, i) => (
                                                        <span key={i} className="bg-slate-50 text-slate-500 px-3 py-1.5 rounded-xl text-[9px] font-black border border-slate-100 group-hover:border-purple-200 group-hover:bg-purple-50 transition-all">
                                                            {c}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-6 border-t-2 border-slate-50 relative z-10 mt-auto">
                                            <div className="flex items-center justify-between text-[#ce82ff] font-black text-[10px] uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                                                <span>Deploy AI Auditor</span>
                                                <ArrowRight size={16} strokeWidth={4} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-40 text-center flex flex-col items-center gap-6">
                                <Search size={80} className="text-slate-100" />
                                <h3 className="text-2xl font-black text-slate-300 uppercase tracking-widest">No Artifacts Found</h3>
                                <p className="text-slate-400 font-bold">Try adjusting your filters above.</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Footer Center - Fixed Intelligence Status */}
                <div className="p-8 bg-slate-950 border-t-4 border-black shrink-0 flex items-center justify-center gap-8 relative z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.3)]">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-[#1cb0f6] rounded-[24px] flex items-center justify-center text-white border-b-8 border-[#1899d6] shadow-xl transform -rotate-2">
                            <BrainCircuit size={32} />
                        </div>
                        <div className="text-left">
                            <h4 className="text-sky-400 font-black uppercase text-xs tracking-[0.3em]">Neural Calibration Active</h4>
                            <p className="text-base font-bold text-slate-300 leading-tight italic">
                                {selectedProgram 
                                    ? `Calibrating Boss intelligence for "${selectedProgram.title}".` 
                                    : "Mission Target selection required for strategic audit."}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
