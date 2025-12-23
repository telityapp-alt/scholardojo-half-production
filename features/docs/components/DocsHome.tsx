
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DocsService, DojoDoc } from '../services/docsService';
import { PARENT_TEMPLATES, DojoTemplate } from '../data/templateRegistry';
// Added Target to lucide-react imports
import { 
    Plus, FileText, Briefcase, GraduationCap, Clock, 
    Search, Trash2, ArrowRight, Zap, Library, Sparkles, 
    Lock, ShieldCheck, User, Ghost, ClipboardList, 
    UserCheck, PlusCircle, Hammer, BookOpen, Layers, 
    Filter, Star, ChevronRight, Target
} from 'lucide-react';
import { DuoSearch } from '../../../components/ui/DuoSearch';
import { SuperDropdown } from '../../../components/ui/SuperDropdown';
import { DomainType } from '../../../core/contracts/entityMap';

export const DocsHome: React.FC = () => {
    const navigate = useNavigate();
    const { domain } = useParams();
    const domainEnum = (domain as DomainType) || DomainType.STUDENT;

    const [activeParentId, setActiveParentId] = useState('ALL');
    const [search, setSearch] = useState('');
    const [myDocs, setMyDocs] = useState<DojoDoc[]>([]);

    useEffect(() => {
        setMyDocs(DocsService.getAll());
    }, []);

    const handleCreateBlank = () => {
        const newDoc: DojoDoc = {
            id: `doc-${Date.now()}`,
            title: 'Blank Canvas Artifact',
            type: 'ESSAY',
            category: 'GENERAL',
            content: '<h1>New Strike</h1><p>Start typing or use "/" for blocks...</p>',
            lastModified: Date.now()
        };
        DocsService.save(newDoc);
        navigate(`/${domain}/workspace/library/${newDoc.id}`);
    };

    const handleAcquire = (temp: DojoTemplate) => {
        const newDoc = DocsService.acquireTemplate(temp);
        navigate(`/${domain}/workspace/library/${newDoc.id}`);
    };

    const filteredTemplates = useMemo(() => {
        return DocsService.getTemplatesByDomain(domainEnum).filter(t => {
            const matchSearch = t.title.toLowerCase().includes(search.toLowerCase());
            const matchParent = activeParentId === 'ALL' || t.parentId === activeParentId;
            return matchSearch && matchParent;
        });
    }, [domainEnum, search, activeParentId]);

    const ICONS: any = { 
        Briefcase, GraduationCap, FileText, UserCheck, 
        User, ClipboardList, Library, BookOpen, Target, Zap 
    };

    return (
        <div className="space-y-16 animate-in fade-in duration-500 pb-32 max-w-7xl mx-auto px-4">
            
            {/* 1. MISSION FORGE (TEMPLATES) */}
            <section className="space-y-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b-2 border-slate-200 pb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white border-b-[6px] border-black shadow-lg">
                            <Hammer size={32} />
                        </div>
                        <div>
                            <h2 className="text-3xl md:text-5xl font-black text-slate-800 tracking-tighter italic uppercase leading-none">Blueprint Forge</h2>
                            <p className="text-slate-400 font-bold text-sm md:text-lg mt-2">Elite document structures for the {domainEnum} Dojo.</p>
                        </div>
                    </div>
                    <div className="w-full md:w-96">
                        <DuoSearch value={search} onChange={setSearch} placeholder="Find a blueprint..." />
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                    <button 
                        onClick={() => setActiveParentId('ALL')}
                        className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest border-2 border-b-[6px] transition-all active:translate-y-1 active:border-b-2 ${activeParentId === 'ALL' ? 'bg-sky-100 border-sky-400 text-sky-600' : 'bg-white border-slate-200 text-slate-400'}`}
                    >
                        All Blueprints
                    </button>
                    {PARENT_TEMPLATES.map(pt => (
                        <button 
                            key={pt.id}
                            onClick={() => setActiveParentId(pt.id)}
                            className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest border-2 border-b-[6px] transition-all active:translate-y-1 active:border-b-2 flex items-center gap-2 ${activeParentId === pt.id ? 'bg-sky-100 border-sky-400 text-sky-600' : 'bg-white border-slate-200 text-slate-400'}`}
                        >
                            {React.createElement(ICONS[pt.icon] || FileText, { size: 14, strokeWidth: 3 })}
                            {pt.label}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {/* UNIFIED BLANK CANVAS CARD */}
                    <div 
                        onClick={handleCreateBlank}
                        className="group bg-white rounded-[40px] border-2 border-dashed border-slate-200 border-b-[10px] p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-sky-400 hover:bg-sky-50 transition-all active:translate-y-[4px] active:border-b-2 min-h-[320px]"
                    >
                        <div className="w-20 h-20 bg-slate-100 rounded-[28px] flex items-center justify-center mb-6 border-b-4 border-slate-200 group-hover:bg-sky-500 group-hover:text-white group-hover:rotate-6 transition-all">
                            <Plus size={48} strokeWidth={4} />
                        </div>
                        <h3 className="text-xl font-black text-slate-400 group-hover:text-sky-700 uppercase tracking-widest">Blank Canvas</h3>
                        <p className="text-[10px] font-bold text-slate-300 mt-2">No Blueprint • Pure Strike</p>
                    </div>

                    {filteredTemplates.map(t => (
                        <div 
                            key={t.id}
                            onClick={() => handleAcquire(t)}
                            className="group bg-white rounded-[40px] border-2 border-slate-200 border-b-[10px] p-8 flex flex-col hover:border-sky-400 hover:bg-sky-50/30 transition-all cursor-pointer active:translate-y-[4px] active:border-b-2 shadow-sm"
                        >
                            <div className="flex justify-between items-start mb-10">
                                <div className="w-16 h-16 bg-slate-50 rounded-2xl border-2 border-slate-100 flex items-center justify-center text-slate-300 group-hover:bg-white group-hover:text-sky-500 border-b-4 transition-all">
                                    {React.createElement(ICONS[PARENT_TEMPLATES.find(p => p.id === t.parentId)?.icon || 'FileText'], { size: 32, strokeWidth: 2.5 })}
                                </div>
                                {t.complexity === 'ELITE' && (
                                    <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-xl text-[9px] font-black border-b-2 border-yellow-600 flex items-center gap-1.5 shadow-sm"><Star size={10} fill="currentColor"/> ELITE</span>
                                )}
                            </div>
                            <h3 className="text-2xl font-black text-slate-700 mb-2 leading-tight group-hover:text-sky-700 transition-colors">{t.title}</h3>
                            <p className="text-sm font-bold text-slate-400 leading-relaxed line-clamp-2">{t.desc}</p>
                            <div className="mt-auto pt-8 border-t-2 border-slate-50 flex items-center justify-between">
                                <span className="text-[9px] font-black uppercase text-slate-300 tracking-[0.2em]">{t.parentId.replace('parent-', '')} Unit</span>
                                <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-200 flex items-center justify-center group-hover:bg-sky-100 group-hover:text-sky-500 transition-all border-b-2">
                                    <ChevronRight size={20} strokeWidth={4} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 2. PERSONAL VAULT */}
            <section className="space-y-8 pt-10">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-[#ce82ff] rounded-[24px] border-b-[8px] border-[#a855f7] flex items-center justify-center text-white shadow-xl transform rotate-3">
                        <Library size={32} />
                    </div>
                    <div>
                        <h2 className="text-3xl md:text-5xl font-black text-slate-800 tracking-tighter italic uppercase leading-none">Private Vault</h2>
                        <p className="text-slate-400 font-bold text-sm md:text-lg mt-2">Your synchronized local mission records.</p>
                    </div>
                </div>

                {myDocs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {myDocs.map(doc => (
                            <div 
                                key={doc.id}
                                onClick={() => navigate(`/${domain}/workspace/library/${doc.id}`)}
                                className="bg-white rounded-[40px] border-2 border-slate-200 border-b-[8px] p-8 flex items-center justify-between group hover:border-[#ce82ff] transition-all cursor-pointer relative overflow-hidden"
                            >
                                <div className="flex items-center gap-5">
                                    <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-purple-50 group-hover:text-[#ce82ff] border-b-4 border-slate-100 transition-all">
                                        {React.createElement(ICONS[doc.type] || FileText, { size: 28, strokeWidth: 2.5 })}
                                    </div>
                                    <div>
                                        <h4 className="font-black text-slate-700 text-lg group-hover:text-purple-700 transition-colors">{doc.title}</h4>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[8px] font-black uppercase text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded tracking-widest">{doc.type}</span>
                                            <span className="text-[8px] font-bold text-slate-300 flex items-center gap-1"><Clock size={10}/> {new Date(doc.lastModified).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                                <ArrowRight className="w-6 h-6 text-slate-200 group-hover:text-[#ce82ff] group-hover:translate-x-1 transition-all" strokeWidth={3} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-24 text-center bg-slate-50 rounded-[48px] border-4 border-dashed border-slate-100">
                        <Ghost size={64} className="mx-auto text-slate-200 mb-6" />
                        <h3 className="text-xl font-black text-slate-300 uppercase tracking-widest">Vault Empty</h3>
                        <p className="text-slate-400 font-bold mt-2">Acquire a blueprint to begin your first strike.</p>
                    </div>
                )}
            </section>
        </div>
    );
};
