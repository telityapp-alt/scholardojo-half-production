
import React, { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DomainType } from '../../../core/contracts/entityMap';
import { EssayService } from '../services/essayService';
import { EssayType } from '../types';
import { DuoSearch } from '../../../components/ui/DuoSearch';
import { SuperDropdown } from '../../../components/ui/SuperDropdown';
import { 
    BookOpen, FileText, Star, Target, Filter, 
    Zap, ArrowRight, Layers, GraduationCap, 
    Briefcase, Sparkles, Clock, PenTool, Flame
} from 'lucide-react';
import { SuperTagBadge } from '../../../components/SuperTagBadge';

export const EssayReviewerHome: React.FC = () => {
    const navigate = useNavigate();
    const { domain } = useParams<{ domain: string }>();
    const domainEnum = (domain as DomainType) || DomainType.SCHOLAR;

    const [search, setSearch] = useState('');
    const [filterType, setFilterType] = useState('ALL');

    const missions = useMemo(() => EssayService.getMissions(domainEnum), [domainEnum]);

    const filtered = useMemo(() => {
        return missions.filter(m => {
            const matchSearch = m.title.toLowerCase().includes(search.toLowerCase()) || m.programName.toLowerCase().includes(search.toLowerCase());
            const matchType = filterType === 'ALL' || m.type === filterType;
            return matchSearch && matchType;
        });
    }, [missions, search, filterType]);

    const TYPE_OPTIONS = [
        { id: 'ALL', label: 'All Essay Types' },
        { id: 'PERSONAL', label: 'Personal Statement' },
        { id: 'MOTIVATION', label: 'Motivation Letter' },
        { id: 'LEADERSHIP', label: 'Leadership' },
        { id: 'IMPACT', label: 'Contribution/Impact' },
    ];

    return (
        <div className="space-y-12 animate-in fade-in duration-500 pb-20 max-w-7xl mx-auto">
            {/* HERO SECTION - DUO PURPLE */}
            <div className="bg-[#ce82ff] rounded-[48px] border-b-[16px] border-[#a855f7] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl group">
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-15 pointer-events-none group-hover:scale-110 transition-transform duration-700"></div>
                 <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="max-w-2xl text-center md:text-left">
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/30 mb-6">
                            <PenTool className="w-4 h-4 text-purple-200" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-100">Narrative Neural Forge</span>
                        </div>
                        <h1 className="text-4xl md:text-7xl font-display font-black text-white leading-[0.9] mb-6 uppercase italic tracking-tighter">
                            ESSAY <span className="text-yellow-300">DOJO</span>
                        </h1>
                        <p className="text-xl md:text-2xl font-bold text-purple-50 opacity-90 leading-relaxed max-w-lg">
                            Forge world-class narratives. Our AI Sensei audits your words against real program blueprints.
                        </p>
                    </div>
                    <div className="shrink-0 w-32 h-32 md:w-48 md:h-48 bg-white/20 rounded-[40px] border-2 border-white/30 flex items-center justify-center backdrop-blur-lg transform rotate-3 group-hover:rotate-0 transition-transform duration-700 shadow-xl">
                        <FileText size={80} className="text-white drop-shadow-xl" strokeWidth={2.5} />
                    </div>
                 </div>
            </div>

            {/* FILTERS - STICKY FOR ACCESSIBILITY */}
            <div className="bg-white p-3 rounded-[32px] border-2 border-slate-200 border-b-[8px] flex flex-col lg:flex-row gap-4 shadow-sm z-50 sticky top-4">
                <div className="lg:w-1/2">
                    <DuoSearch value={search} onChange={setSearch} placeholder="Search by program (LPDP, Gates, etc)..." />
                </div>
                <div className="flex-1">
                    <SuperDropdown 
                        label="Filter by Type" 
                        icon={Layers} 
                        options={TYPE_OPTIONS} 
                        value={filterType} 
                        onChange={setFilterType} 
                        color="purple" 
                    />
                </div>
            </div>

            {/* MISSION GRID */}
            {filtered.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filtered.map(mission => (
                        <div 
                            key={mission.id}
                            onClick={() => navigate(`/${domainEnum}/workspace/essay-reviewer/${mission.id}`)}
                            className="group bg-white rounded-[40px] border-2 border-slate-200 border-b-[10px] p-8 hover:border-[#ce82ff] transition-all cursor-pointer active:translate-y-2 active:border-b-4 h-full flex flex-col shadow-sm relative overflow-hidden"
                        >
                            {/* Mission Difficulty Badge */}
                            <div className="absolute top-0 right-0 p-4">
                                <div className={`px-3 py-1 rounded-xl border-2 text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-sm
                                    ${mission.difficulty === 'HARD' ? 'bg-red-50 text-red-500 border-red-100' : 'bg-green-50 text-green-600 border-green-100'}
                                `}>
                                    <Flame size={12} className={mission.difficulty === 'HARD' ? 'fill-red-500' : 'fill-green-500'} />
                                    {mission.difficulty}
                                </div>
                            </div>

                            <div className="flex items-center gap-5 mb-8">
                                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 group-hover:bg-purple-50 group-hover:text-[#ce82ff] border-b-4 border-slate-100 transition-all shrink-0">
                                    <FileText size={32} />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest truncate">{mission.programName}</p>
                                    <h3 className="text-xl font-black text-slate-700 truncate group-hover:text-slate-900 leading-tight">{mission.title}</h3>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-8">
                                <div className="bg-sky-50 text-sky-600 px-3 py-1.5 rounded-xl border-b-2 border-sky-100 text-[10px] font-black uppercase tracking-tight flex items-center gap-1.5">
                                    <Clock size={12} strokeWidth={3} /> ~{mission.wordCount} Words
                                </div>
                                <div className="bg-purple-50 text-purple-600 px-3 py-1.5 rounded-xl border-b-2 border-purple-100 text-[10px] font-black uppercase tracking-tight flex items-center gap-1.5">
                                    <Zap size={12} fill="currentColor" /> {mission.type}
                                </div>
                            </div>

                            <div className="mt-auto pt-6 border-t-2 border-slate-50 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                     <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Open Workbench</span>
                                </div>
                                <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-200 flex items-center justify-center group-hover:bg-purple-500 group-hover:text-white transition-all border-b-2 border-slate-100">
                                    <ArrowRight size={20} strokeWidth={4} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="py-32 text-center bg-white rounded-[48px] border-4 border-dashed border-slate-100 flex flex-col items-center">
                    <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-8 border-2 border-slate-100 shadow-inner">
                        <BookOpen size={48} className="text-slate-200" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-300 uppercase tracking-[0.4em] italic leading-none">No records found</h3>
                    <p className="text-slate-400 font-bold mt-4 max-w-sm">Adjust your filters to discover new tactical essay missions from your secured targets.</p>
                </div>
            )}
        </div>
    );
};
