
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DomainType, GenericProgram, SuperTag } from '../../../core/contracts/entityMap';
import { CommunityService } from '../services/communityService';
import { DuoCard } from '../../../components/DuoCard';
import { DuoSearch } from '../../../components/ui/DuoSearch';
import { SuperDropdown } from '../../../components/ui/SuperDropdown';
import { SuperTagBadge } from '../../../components/SuperTagBadge';
import { BrainCircuit, ArrowRight, Globe, Layers, SortAsc, Zap, AlertTriangle, ShieldAlert, Star } from 'lucide-react';
import { ScannerModal } from '../../scanner/components/ScannerModal';
import { VerifyExtraction } from '../../scanner/components/VerifyExtraction';
import { processSmartTags } from '../../../core/engines/aiTagEngine';
import { useLanguage } from '../../../core/hooks/useLanguage';

export const CommunityHub: React.FC = () => {
    const { domain } = useParams<{ domain: string }>();
    const navigate = useNavigate();
    const domainEnum = (domain as DomainType) || DomainType.STUDENT;
    const { t } = useLanguage();

    const [programs, setPrograms] = useState<(GenericProgram & { generatedTags: SuperTag[] })[]>([]);
    const [loading, setLoading] = useState(true);
    const [isScannerOpen, setIsScannerOpen] = useState(false);
    const [aiDraft, setAiDraft] = useState<any>(null);

    const [searchQuery, setSearchQuery] = useState('');
    const [filterCategory, setFilterCategory] = useState('ALL');
    const [sortBy, setSortBy] = useState('NEWEST');

    useEffect(() => {
        setLoading(true);
        const load = () => {
            const raw = CommunityService.getPrograms(domainEnum);
            const enriched = raw.map(p => ({
                ...p,
                generatedTags: processSmartTags(domainEnum, p)
            }));
            setPrograms(enriched);
            setLoading(false);
        };
        const timer = setTimeout(load, 300);
        return () => clearTimeout(timer);
    }, [domainEnum]);

    const handleScanResult = (data: any) => {
        setAiDraft(data);
        setIsScannerOpen(false);
    };

    const handleConfirmAi = (finalData: any) => {
        const newProgram = CommunityService.uploadProgram(finalData, domainEnum);
        setPrograms(prev => [{
            ...newProgram,
            generatedTags: processSmartTags(domainEnum, newProgram)
        }, ...prev]);
        setAiDraft(null);
    };

    const filteredAndSorted = useMemo(() => {
        let result = programs.filter(p => {
            if (searchQuery) {
                const q = searchQuery.toLowerCase().trim();
                const matchesText = p.title.toLowerCase().includes(q) || (p.hostName || '').toLowerCase().includes(q);
                if (!matchesText) return false;
            }
            if (filterCategory !== 'ALL' && p.category?.toLowerCase() !== filterCategory.toLowerCase()) return false;
            return true;
        });
        return result.sort((a, b) => b.id.localeCompare(a.id));
    }, [programs, searchQuery, filterCategory]);

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-24 max-w-7xl mx-auto px-4">
            
            {/* ALERT BANNER */}
            <div className="bg-sky-50 border-2 border-sky-200 rounded-[28px] p-4 flex flex-col md:flex-row items-center gap-4 shadow-sm shrink-0">
                <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center text-white shrink-0">
                    <ShieldAlert size={20} strokeWidth={3} />
                </div>
                <div className="text-center md:text-left">
                    <h4 className="text-sky-900 font-bold text-xs uppercase tracking-tight mb-0.5">Community Record Board</h4>
                    <p className="text-sky-700 text-[10px] font-bold opacity-80">
                        Konten dikirim oleh user dan diproses AI. Lakukan verifikasi mandiri sebelum pendaftaran.
                    </p>
                </div>
            </div>

            {/* HERO HERO SECTION - COMPACT */}
            <div className="bg-slate-900 rounded-[40px] border-b-[12px] border-black p-8 md:p-10 text-white relative overflow-hidden shadow-2xl">
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
                 <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="max-w-xl">
                        <div className="inline-flex items-center gap-2 bg-sky-500/20 backdrop-blur-md px-3 py-1 rounded-lg border border-sky-500/30 mb-4">
                            <Zap className="w-3 h-3 text-sky-400 fill-sky-400" />
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-sky-300">Scout Mode Active</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-none mb-2">
                            Community <span className="text-sky-400">Hub</span>
                        </h1>
                        <p className="text-base font-bold text-slate-400 max-w-md">
                            Discover tracks extracted by the collective. Explore a massive vault of community intel.
                        </p>
                    </div>
                    <button 
                        onClick={() => setIsScannerOpen(true)} 
                        className="bg-[#1cb0f6] text-white px-8 py-5 rounded-[28px] font-black text-lg border-b-[6px] border-[#1899d6] hover:brightness-110 active:border-b-0 active:translate-y-[6px] transition-all flex items-center justify-center gap-4 shadow-xl group"
                    >
                        <BrainCircuit className="w-8 h-8 group-hover:rotate-12 transition-transform" /> Scan New Brief
                    </button>
                 </div>
            </div>

            {/* FILTER & SEARCH */}
            <div className="bg-white p-3 rounded-[28px] border-2 border-slate-200 border-b-[6px] flex flex-col lg:flex-row gap-3 shadow-sm relative z-[50]">
                <div className="lg:w-1/3">
                    <DuoSearch value={searchQuery} onChange={setSearchQuery} placeholder="Search tracks..." />
                </div>
                <div className="flex-1 grid grid-cols-2 gap-3">
                    <SuperDropdown label="Sort" icon={SortAsc} options={[{id:'NEWEST', label:'Newest Records'}]} value={sortBy} onChange={setSortBy} color="blue" />
                    <SuperDropdown label="Category" icon={Layers} options={[{id:'ALL', label:'All Types'}]} value={filterCategory} onChange={setFilterCategory} color="blue" />
                </div>
            </div>

            {/* GRID - COMPACT CARDS */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1,2,3].map(i => <div key={i} className="h-56 bg-slate-200 rounded-[28px] animate-pulse"></div>)}
                </div>
            ) : filteredAndSorted.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
                    {filteredAndSorted.map(p => (
                         <div key={p.id} onClick={() => navigate(`/${domain}/discovery/community-board/${p.id}`)} className="h-full">
                            <DuoCard className="h-full border-slate-200 border-b-slate-300 hover:border-sky-400 hover:border-b-sky-600 flex flex-col p-6 transition-all group relative overflow-hidden bg-white rounded-[32px]">
                                <div className="absolute top-0 right-0 p-3">
                                     <div className={`p-2 rounded-xl border ${p.tier === 'mythic' ? 'bg-yellow-50 text-yellow-600 border-yellow-200' : 'bg-sky-50 text-sky-500 border-sky-100'}`}>
                                        {p.tier === 'mythic' ? <Star size={14} fill="currentColor" /> : <Zap size={14} fill="currentColor" />}
                                     </div>
                                </div>

                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-12 h-12 bg-slate-50 rounded-2xl border-2 border-slate-100 flex items-center justify-center text-slate-300 group-hover:text-sky-500 group-hover:border-sky-50 transition-all">
                                        <Globe size={24} />
                                    </div>
                                </div>
                                
                                <span className={`text-[8px] font-black uppercase tracking-widest mb-1 flex items-center gap-1.5 ${p.tier === 'mythic' ? 'text-yellow-500' : 'text-sky-500'}`}>
                                    <AlertTriangle size={8}/> Record Node
                                </span>
                                <h3 className="text-xl font-bold text-slate-700 mb-1 leading-tight group-hover:text-sky-700 line-clamp-2">{p.title}</h3>
                                <p className="text-slate-400 font-bold text-[9px] uppercase tracking-widest mb-6 truncate">{p.hostName}</p>
                                
                                <div className="mt-auto pt-4 border-t-2 border-slate-50 flex items-center justify-between">
                                    <div className="flex -space-x-2">
                                        {[1,2,3].map(i => (
                                            <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-100 overflow-hidden shadow-sm">
                                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i+p.id}`} alt="" />
                                            </div>
                                        ))}
                                    </div>
                                    <span className="text-[9px] font-black text-sky-500 uppercase flex items-center gap-2 group-hover:translate-x-1 transition-transform">Strike <ArrowRight size={12} strokeWidth={4}/></span>
                                </div>
                            </DuoCard>
                         </div>
                    ))}
                </div>
            ) : (
                <div className="py-24 text-center bg-white rounded-[40px] border-4 border-dashed border-slate-200">
                    <p className="text-slate-400 font-black uppercase tracking-widest text-xs">No records captured</p>
                </div>
            )}
            
            {aiDraft && <VerifyExtraction data={aiDraft} onConfirm={handleConfirmAi} onCancel={() => setAiDraft(null)} />}
            {isScannerOpen && <ScannerModal domain={domainEnum} onClose={() => setIsScannerOpen(false)} onResult={handleScanResult} />}
        </div>
    );
};
