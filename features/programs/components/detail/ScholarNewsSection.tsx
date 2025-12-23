import React from 'react';
import { ScholarNewsItem } from '../../types';
import { Newspaper, Zap, ExternalLink, Clock, Sparkles, TrendingUp } from 'lucide-react';

interface Props {
    news: ScholarNewsItem[];
}

export const ScholarNewsSection: React.FC<Props> = ({ news }) => {
    if (!news || news.length === 0) return null;

    // Separate breaking news for a slightly larger highlight
    const breakingNews = news.find(n => n.isBreaking) || news[0];
    const sideNews = news.filter(n => n.id !== breakingNews.id).slice(0, 3);

    return (
        <section className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
            {/* DUO SECTION HEADER - SLIGHTLY LARGER */}
            <div className="flex items-center gap-4 px-2">
                <div className="w-12 h-12 bg-slate-900 rounded-[20px] border-b-[6px] border-black flex items-center justify-center text-white shadow-xl transform -rotate-1 group-hover:rotate-0 transition-transform">
                    <Newspaper size={24} strokeWidth={3} />
                </div>
                <div>
                    <h2 className="text-2xl font-black text-slate-800 tracking-tighter uppercase italic leading-none">Intelligence Radar</h2>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1.5">Live Mission Intelligence Feed</p>
                </div>
            </div>

            {/* NEWSPAPER CARD - INCREASED PADDING AND TEXT SCALE */}
            <div className="bg-[#fffbf0] rounded-[48px] border-2 border-slate-200 border-b-[16px] shadow-2xl p-8 md:p-10 relative overflow-hidden group">
                {/* Paper Texture Overlay */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-30 pointer-events-none mix-blend-multiply z-0"></div>
                
                <div className="relative z-10 space-y-8">
                    {/* Header: Masthead */}
                    <div className="border-b-4 border-slate-800 pb-4 flex justify-between items-end">
                        <div className="flex flex-col">
                            <span className="font-black text-[9px] uppercase tracking-[0.5em] text-slate-400 leading-none">The Daily Dojo</span>
                            <h3 className="font-black text-2xl text-slate-800 italic leading-none mt-2 uppercase tracking-tighter">STRATEGIC EDITION 2026</h3>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="font-black text-[9px] uppercase text-slate-400 tracking-widest">VOL. 26 • VERIFIED INTEL</span>
                            <div className="flex items-center gap-1.5 text-sky-500 font-black text-[10px] uppercase mt-1">
                                <TrendingUp size={12} strokeWidth={3} /> Trending
                            </div>
                        </div>
                    </div>

                    {/* Main Content Layout - Better Spacing */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                        {/* Main Pillar (Breaking News) */}
                        <div className="md:col-span-7 space-y-4 border-r-2 border-slate-100 pr-0 md:pr-10">
                            <div className="inline-flex items-center gap-2 bg-red-600 text-white px-3 py-1.5 rounded-xl font-black text-[10px] uppercase tracking-widest border-b-4 border-red-800 shadow-lg animate-pulse">
                                <Zap size={12} fill="currentColor" /> BREAKING INTEL
                            </div>
                            <h4 className="text-3xl font-black text-slate-900 leading-[0.95] tracking-tighter uppercase">
                                {breakingNews.title}
                            </h4>
                            <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-y-2 border-slate-100 py-3">
                                <span className="flex items-center gap-1.5"><Clock size={12}/> {breakingNews.date}</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
                                <span className="text-sky-500 font-black bg-sky-50 px-2 py-0.5 rounded-md border border-sky-100">{breakingNews.source}</span>
                            </div>
                            <p className="text-base font-bold text-slate-600 leading-relaxed first-letter:text-5xl first-letter:font-black first-letter:text-slate-900 first-letter:mr-3 first-letter:float-left first-letter:leading-none">
                                {breakingNews.content}
                            </p>
                        </div>

                        {/* Sidebar Column (Bulletins) */}
                        <div className="md:col-span-5 space-y-6">
                            <h5 className="font-black text-xs uppercase tracking-[0.4em] text-sky-600 mb-4 flex items-center gap-2">
                                <Sparkles size={16} fill="currentColor" /> SHORT BRIEFS
                            </h5>
                            <div className="space-y-6">
                                {sideNews.map(item => (
                                    <div key={item.id} className="pb-5 border-b-2 border-slate-100 last:border-0 group cursor-default">
                                        <h6 className="font-black text-lg text-slate-800 leading-tight mb-2 group-hover:text-sky-600 transition-colors uppercase tracking-tighter line-clamp-2">{item.title}</h6>
                                        <p className="text-sm font-bold text-slate-500 leading-relaxed line-clamp-3 mb-3">{item.content}</p>
                                        <div className="flex items-center justify-between mt-3">
                                            <div className="flex gap-1.5">
                                                {item.tags?.slice(0, 1).map(t => (
                                                    <span key={t} className="text-[8px] font-black text-slate-400 border-2 border-slate-100 px-2 py-0.5 rounded-lg uppercase tracking-tighter">{t}</span>
                                                ))}
                                            </div>
                                            <span className="text-[9px] font-black text-sky-400 uppercase tracking-widest flex items-center gap-1"><ExternalLink size={10}/> {item.source}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            {/* NEW: RECRUITMENT CALLOUT BOX */}
                            <div className="mt-8 p-6 bg-slate-900 rounded-[32px] border-b-[8px] border-black text-white relative overflow-hidden">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')] opacity-10"></div>
                                <div className="relative z-10 text-center">
                                    <p className="text-[10px] font-black uppercase text-sky-400 tracking-widest mb-2">Sensei Protocol</p>
                                    <p className="text-xs font-bold italic text-slate-300">"Data intel diperbarui setiap 24 jam. Siapkan dokumen sebelum tenggat Januari."</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};