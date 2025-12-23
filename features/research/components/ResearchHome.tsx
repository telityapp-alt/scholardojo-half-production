
import React from 'react';
import { BookOpen, FlaskConical, Atom, Library, Share2, Target, ArrowRight, Database } from 'lucide-react';

export const ResearchHome: React.FC = () => {
    return (
        <div className="space-y-12 pb-32 animate-in fade-in duration-700 max-w-7xl mx-auto px-4">
            {/* RESEARCH HERO - PAPER STYLE */}
            <div className="bg-[#f0fdfa] rounded-[48px] border-2 border-teal-200 border-b-[12px] p-10 md:p-12 text-teal-900 relative overflow-hidden shadow-sm group">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-30 mix-blend-multiply pointer-events-none"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-400/5 rounded-full blur-[120px]"></div>

                <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                    <div className="w-44 h-44 bg-white rounded-[64px] border-2 border-teal-100 border-b-[12px] flex items-center justify-center shadow-xl transform rotate-2 group-hover:rotate-0 transition-transform duration-700">
                        <FlaskConical size={80} className="text-teal-500" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border-2 border-teal-200 border-b-4 font-black text-[10px] uppercase tracking-[0.3em] text-teal-600 mb-6">
                            Laboratory Protocol V4.2
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-[0.9] mb-6">
                            THE <span className="text-teal-500 underline decoration-teal-100 underline-offset-8">LAB.</span>
                        </h1>
                        <p className="text-xl font-bold text-teal-700/60 max-w-2xl leading-relaxed italic">
                            "Systematic inquiry is the forge of progress." Manage your manuscripts, citations, and funding blueprints.
                        </p>
                    </div>
                </div>
            </div>

            {/* ACADEMIC GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* PRIMARY OBSERVATION */}
                <div className="lg:col-span-8 bg-white rounded-[40px] border-2 border-slate-100 border-b-[12px] p-10 shadow-sm relative overflow-hidden">
                    <div className="flex items-center justify-between mb-12">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600 border-b-4 border-teal-100">
                                <BookOpen size={24} />
                            </div>
                            <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tighter italic">Active Manuscripts</h2>
                        </div>
                        <span className="text-[10px] font-black uppercase text-teal-400 bg-teal-50 px-3 py-1 rounded-full border border-teal-100 tracking-widest">0 Verified</span>
                    </div>

                    <div className="py-20 text-center flex flex-col items-center">
                        <div className="w-20 h-20 bg-slate-50 rounded-full border-2 border-dashed border-slate-200 flex items-center justify-center mb-6 text-slate-300">
                             <Library size={40} />
                        </div>
                        <p className="text-slate-400 font-bold text-lg mb-8 italic">No manuscripts in the publishing pipeline.</p>
                        <button className="px-8 py-4 bg-teal-600 text-white rounded-2xl font-black text-sm border-b-[6px] border-teal-800 active:translate-y-1 active:border-b-0 transition-all uppercase tracking-[0.2em] shadow-lg shadow-teal-900/10">
                            Initialize Project
                        </button>
                    </div>
                </div>

                {/* SIDEBAR INTELLIGENCE */}
                <div className="lg:col-span-4 space-y-8">
                     <div className="bg-white p-8 rounded-[40px] border-2 border-slate-100 border-b-[10px] shadow-sm">
                         <div className="flex items-center gap-3 mb-8">
                            <div className="p-2 bg-indigo-50 rounded-xl text-indigo-500"><Database size={20}/></div>
                            <h3 className="font-black text-slate-700 uppercase text-xs tracking-[0.2em]">Neural Citations</h3>
                         </div>
                         <div className="h-40 flex flex-col items-center justify-center opacity-30">
                            <Atom size={64} className="text-slate-300 animate-spin-slow mb-4" />
                            <p className="font-black text-xs uppercase tracking-widest">Awaiting Data</p>
                         </div>
                     </div>
                     
                     <div className="bg-slate-900 p-8 rounded-[40px] border-b-[16px] border-black text-white relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')] opacity-10"></div>
                        <div className="relative z-10">
                            <h4 className="text-teal-400 font-black uppercase text-[10px] tracking-[0.3em] mb-4">Sensei Protocol</h4>
                            <p className="text-lg font-bold italic leading-relaxed">
                                "Publishing elite research requires a 95% Match Score in the technical matrix. Start your literature review today."
                            </p>
                        </div>
                     </div>
                </div>
            </div>
        </div>
    );
};
