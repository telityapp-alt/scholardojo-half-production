
import React from 'react';
import { BookOpen, FlaskConical, Atom, Library, Share2, Target, ArrowRight, Database, Sparkles, Wand2, PenTool } from 'lucide-react';
import { RegionLocked } from '../../../components/shared/RegionLocked';
import { useRegion } from '../../../core/hooks/useRegion';

export const ResearchHome: React.FC = () => {
    const { regionId } = useRegion();
    const isIndo = regionId === 'id';
    
    if (!isIndo) return <RegionLocked featureName="Lab Riset & Skripsi" />;

    return (
        <div className="space-y-4 pb-20 animate-in fade-in duration-500 max-w-5xl mx-auto px-4">
            {/* HERO COMPACT */}
            <div className="bg-teal-500 rounded-[28px] border-b-[8px] border-teal-700 p-5 text-white relative overflow-hidden shadow-lg group">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-20 mix-blend-multiply"></div>
                <div className="relative z-10 flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl border-b-4 border-teal-100 flex items-center justify-center text-teal-600 shadow-xl shrink-0">
                        <FlaskConical size={24} strokeWidth={2.5} />
                    </div>
                    <div>
                        <h1 className="font-display font-black text-xl md:text-3xl tracking-tight leading-none mb-1">
                            Lab <span className="text-teal-900/50">Riset & Skripsi</span>
                        </h1>
                        <p className="text-[10px] font-bold text-teal-50 opacity-90 uppercase tracking-widest">Asisten neural untuk manuskrip dan skripsi elit.</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                <div className="lg:col-span-8 space-y-4">
                    <div className="bg-white rounded-[28px] border-2 border-slate-200 border-b-[8px] p-5 shadow-sm overflow-hidden relative">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-teal-50 rounded-lg border-b-2 border-teal-100 flex items-center justify-center text-teal-600">
                                    <PenTool size={16} />
                                </div>
                                <h3 className="font-display font-black text-lg text-slate-800 uppercase italic">Draf Aktif</h3>
                            </div>
                            <span className="text-[8px] font-black uppercase text-teal-500 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-100 tracking-widest">0 Manuskrip</span>
                        </div>

                        <div className="py-10 text-center flex flex-col items-center">
                            <Library size={32} className="text-slate-200 mb-4" />
                            <p className="text-slate-400 font-bold text-xs mb-6 italic">Belum ada draf dalam antrian penulisan.</p>
                            <button className="px-6 py-2.5 bg-teal-600 text-white rounded-xl font-black text-[10px] border-b-[4px] border-teal-800 active:translate-y-1 active:border-b-0 transition-all uppercase tracking-[0.2em] shadow-md">
                                Proyek Baru
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                         <div className="bg-white p-4 rounded-2xl border-2 border-slate-100 border-b-[4px] flex items-center gap-3 group hover:border-teal-300 transition-all cursor-pointer active:translate-y-[1px]">
                             <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-500 border-b-2 border-teal-100 flex items-center justify-center shrink-0 group-hover:bg-teal-500 group-hover:text-white transition-all"><Wand2 size={20}/></div>
                             <div className="min-w-0"><h4 className="font-black text-xs text-slate-700 truncate">Generator Judul</h4><p className="text-[8px] font-bold text-slate-400 uppercase">Input Keyword</p></div>
                         </div>
                         <div className="bg-white p-4 rounded-2xl border-2 border-slate-100 border-b-[4px] flex items-center gap-3 group hover:border-teal-300 transition-all cursor-pointer active:translate-y-[1px]">
                             <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-500 border-b-2 border-teal-100 flex items-center justify-center shrink-0 group-hover:bg-teal-500 group-hover:text-white transition-all"><Target size={20}/></div>
                             <div className="min-w-0"><h4 className="font-black text-xs text-slate-700 truncate">Analisis Celah</h4><p className="text-[8px] font-bold text-slate-400 uppercase">Mapping AI</p></div>
                         </div>
                    </div>
                </div>

                <div className="lg:col-span-4 space-y-4">
                     <div className="bg-slate-900 rounded-[28px] border-b-[8px] border-black p-5 text-white relative overflow-hidden group shadow-xl">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')] opacity-10"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-3">
                                <Sparkles size={14} className="text-teal-400" />
                                <h4 className="text-teal-400 font-black uppercase text-[8px] tracking-[0.3em]">Sensei Protocol</h4>
                            </div>
                            <p className="text-base font-bold italic leading-tight text-slate-200">
                                "Publikasi riset elit membutuhkan skor kecocokan teknis di atas 95%."
                            </p>
                        </div>
                     </div>
                     <div className="bg-white p-4 rounded-2xl border-2 border-slate-200 border-b-[6px] shadow-sm">
                         <div className="flex items-center gap-2 mb-4">
                            <Database size={14} className="text-indigo-500" />
                            <h3 className="font-black text-slate-700 uppercase text-[8px] tracking-[0.2em]">Neural Citations</h3>
                         </div>
                         <div className="h-20 flex flex-col items-center justify-center opacity-30">
                            <Atom size={24} className="text-slate-300 animate-spin-slow" />
                         </div>
                     </div>
                </div>
            </div>
        </div>
    );
};
