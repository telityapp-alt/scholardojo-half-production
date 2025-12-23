
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DomainType } from '../../../core/contracts/entityMap';
import { CurriculumService } from '../services/curriculumService';
import { CurriculumMaster } from '../types';
import { BookOpen, Star, Clock, ArrowRight, Library, Sparkles, Zap } from 'lucide-react';
import { useLanguage } from '../../../core/hooks/useLanguage';

export const CurriculumView: React.FC = () => {
    const { domain } = useParams<{ domain: string }>();
    const navigate = useNavigate();
    const domainEnum = (domain as DomainType) || DomainType.STUDENT;
    const { t, lang, translateObject } = useLanguage();

    const [curricula, setCurricula] = useState<CurriculumMaster[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        // Fix: Use an async function inside useEffect to handle the promise from CurriculumService.getAll
        const loadData = async () => {
            const baseData = await CurriculumService.getAll(domainEnum, lang);
            setCurricula(baseData);
            setLoading(false);
        };
        loadData();
    }, [domainEnum, lang]); // lang included in dependency

    if (loading) return (
        <div className="p-20 text-center flex flex-col items-center justify-center min-h-[60vh] animate-in fade-in duration-500">
            <Zap size={48} className="text-sky-300 animate-pulse" />
        </div>
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-20">
            {/* HERO */}
            <div className="bg-[#1cb0f6] rounded-[32px] border-b-[12px] border-[#1899d6] p-8 md:p-10 text-white relative overflow-hidden shadow-xl">
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
                 <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="max-w-xl text-center md:text-left">
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30 mb-4">
                            <Library className="w-3.5 h-3.5 text-sky-200" />
                            <span className="text-[9px] font-black uppercase tracking-widest text-sky-100">{t.curriculum.title}</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight mb-2">
                            {t.curriculum.title.split(' ')[0]} <span className="text-yellow-300">{t.curriculum.title.split(' ')[1] || 'Library'}</span>
                        </h1>
                        <p className="text-base font-bold text-sky-50 opacity-90 leading-relaxed max-w-md">
                            {t.curriculum.subtitle}
                        </p>
                    </div>
                    <div className="shrink-0 w-20 h-20 bg-white/20 rounded-2xl border-2 border-white/30 flex items-center justify-center backdrop-blur-lg rotate-3 group hover:rotate-0 transition-transform">
                        <BookOpen size={40} className="text-white" strokeWidth={2.5} />
                    </div>
                 </div>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {curricula.map(curr => (
                    <div 
                        key={curr.id} 
                        onClick={() => navigate(`/${domain}/skillspace/curriculum/${curr.id}`)}
                        className="group bg-white rounded-[32px] border-2 border-slate-200 border-b-[8px] hover:border-sky-300 hover:border-b-sky-500 transition-all cursor-pointer overflow-hidden flex flex-col md:flex-row"
                    >
                        <div className="w-full md:w-40 h-40 md:h-auto relative bg-slate-100 shrink-0">
                            <img src={curr.image} alt={curr.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
                            {curr.tier === 'mythic' && (
                                <div className="absolute top-3 left-3 bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest border-b-2 border-yellow-600 shadow-lg">
                                    Mythic
                                </div>
                            )}
                        </div>

                        <div className="p-5 flex flex-col flex-1">
                            <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">
                                <Clock size={10} /> Sync: {curr.lastUpdated}
                            </div>
                            <h3 className="text-xl font-black text-slate-700 mb-1 leading-tight group-hover:text-sky-600 transition-colors line-clamp-1">{curr.title}</h3>
                            <p className="text-slate-500 font-bold text-xs mb-4 line-clamp-2">{curr.subtitle}</p>
                            
                            <div className="mt-auto pt-4 border-t-2 border-slate-50 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-7 h-7 rounded-lg bg-sky-50 flex items-center justify-center text-sky-600 border-b-2 border-sky-100">
                                        <Sparkles size={14} />
                                    </div>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{curr.totalUnits} {t.curriculum.units}</span>
                                </div>
                                <ArrowRight className="w-5 h-5 text-slate-200 group-hover:text-sky-400 group-hover:translate-x-1 transition-all stroke-[3px]" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};