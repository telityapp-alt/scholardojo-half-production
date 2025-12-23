
import React from 'react';
import { BookOpen, FlaskConical, Atom, Library, Share2, Target, ArrowRight, Database, Sparkles, Wand2, PenTool } from 'lucide-react';
import { RegionLocked } from '../../../components/shared/RegionLocked';

export const ResearchHome: React.FC = () => {
    const isIndo = localStorage.getItem('dojo_region') === 'id';
    
    if (!isIndo) return <RegionLocked featureName="Lab Riset & Skripsi" />;

    return (
        <div className="space-y-6 pb-24 animate-in fade-in duration-500 max-w-6xl mx-auto px-4">
            {/* HERO COMPACT */}
            <div className="bg-teal-500 rounded-[32px] border-b-[10px] border-teal-700 p-6 text-white relative overflow-hidden shadow-lg group">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-20 mix-blend-multiply"></div>
                <div className="relative z-10 flex items-center gap-6">
                    <div className="w-16 h-16 bg-white rounded-2xl border-b-4 border-teal-100 flex items-center justify-center text-teal-600 shadow-xl shrink-0 transform -rotate-2 group-hover:rotate-0 transition-transform">
                        <FlaskConical size={32} strokeWidth={2.5} />
                    </div>
                    <div>
                        <h1 className="font-display font-black text-2xl md:text-3xl tracking-tight uppercase leading-none mb-1">
                            LAB <span className="text-teal-900/50">RISET & SKRIPSI</span>
                        </h1>
                        <p className="text-xs font-bold text-teal-50 opacity-90">Asisten neural untuk manuskrip dan skripsi elit.</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* MAIN WORKBENCH (8 COL) */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="bg-white rounded-[32px] border-2 border-slate-200 border-b-[10px] p-6 shadow-sm overflow-hidden relative">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-teal-50 rounded-xl border-b-2 border-teal-100 flex items-center justify-center text-teal-600">
                                    <PenTool size={20} />
                                </div>
                                <h3 className="font-display font-black text-xl text-slate-800 uppercase italic">Draf Aktif</h3>
                            </div>
                            <span className="text-[9px] font-black uppercase text-teal-500 bg-teal-50 px-3 py-1 rounded-full border border-teal-100 tracking-widest">0 Manuskrip</span>
                        </div>

                        <div className="py-12 text-center flex flex-col items-center">
                            <div className="w-20 h-20 bg-slate-50 rounded-full border-2 border-dashed border-slate-200 flex items-center justify-center mb-6 text-slate-200">
                                 <Library size={40} />
                            </div>
                            <p className="text-slate-400 font-bold text-sm mb-8 italic">Belum ada draf dalam antrian penulisan.</p>
                            <button className="px-8 py-3 bg-teal-600 text-white rounded-2xl font-black text-xs border-b-[6px] border-teal-800 active:translate-y-1 active:border-b-0 transition-all uppercase tracking-[0.2em] shadow-md">
                                Inisialisasi Proyek Baru
                            </button>
                        </div>
                    </div>

                    {/* AI ASSISTANT GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div className="bg-white p-5 rounded-3xl border-2 border-slate-100 border-b-[6px] flex items-center gap-4 group hover:border-teal-300 transition-all cursor-pointer active:translate-y-1 active:border-b-2">
                             <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-500 border-b-2 border-teal-100 flex items-center justify-center shrink-0 group-hover:bg-teal-500 group-hover:text-white transition-all"><Wand2 size={24}/></div>
                             <div className="min-w-0"><h4 className="font-black text-sm text-slate-700 truncate">Generator Judul</h4><p className="text-[10px] font-bold text-slate-400 uppercase">Input Keyword</p></div>
                         </div>
                         <div className="bg-white p-5 rounded-3xl border-2 border-slate-100 border-b-[6px] flex items-center gap-4 group hover:border-teal-300 transition-all cursor-pointer active:translate-y-1 active:border-b-2">
                             <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-500 border-b-2 border-teal-100 flex items-center justify-center shrink-0 group-hover:bg-teal-500 group-hover:text-white transition-all"><Target size={24}/></div>
                             <div className="min-w-0"><h4 className="font-black text-sm text-slate-700 truncate">Analisis Celah Riset</h4><p className="text-[10px] font-bold text-slate-400 uppercase">Mapping AI</p></div>
                         </div>
                    </div>
                </div>

                {/* SIDEBAR INTELLIGENCE (4 COL) */}
                <div className="lg:col-span-4 space-y-6">
                     <div className="bg-slate-900 rounded-[32px] border-b-[10px] border-black p-6 text-white relative overflow-hidden group shadow-xl">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')] opacity-10"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-4">
                                <Sparkles size={16} className="text-teal-400" />
                                <h4 className="text-teal-400 font-black uppercase text-[10px] tracking-[0.3em]">Sensei Protocol</h4>
                            </div>
                            <p className="text-lg font-bold italic leading-tight text-slate-200">
                                "Publikasi riset elit membutuhkan skor kecocokan teknis di atas 95%. Mulai dengan tinjauan pustaka hari ini."
                            </p>
                        </div>
                     </div>

                     <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 border-b-[8px] shadow-sm">
                         <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-indigo-50 rounded-xl text-indigo-500 border-b-2 border-indigo-100"><Database size={18}/></div>
                            <h3 className="font-black text-slate-700 uppercase text-[10px] tracking-[0.2em]">Neural Citations</h3>
                         </div>
                         <div className="h-32 flex flex-col items-center justify-center opacity-30">
                            <Atom size={40} className="text-slate-300 animate-spin-slow mb-3" />
                            <p className="font-black text-[9px] uppercase tracking-widest text-slate-400">Menunggu Data</p>
                         </div>
                     </div>
                </div>
            </div>
        </div>
    );
};
