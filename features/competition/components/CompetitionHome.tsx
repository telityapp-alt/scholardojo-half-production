
import React from 'react';
import { Swords, Trophy, Zap, Flame, Crown, Target, ArrowRight, BookOpen, Star, Filter } from 'lucide-react';
import { RegionLocked } from '../../../components/shared/RegionLocked';

export const CompetitionHome: React.FC = () => {
    const isIndo = localStorage.getItem('dojo_region') === 'id';
    
    if (!isIndo) return <RegionLocked featureName="Kompetisi Dojo" />;

    return (
        <div className="space-y-6 pb-24 animate-in fade-in duration-500 max-w-6xl mx-auto px-4">
            {/* HERO COMPACT */}
            <div className="bg-duo-red rounded-[32px] border-b-[10px] border-duo-redDark p-6 text-white relative overflow-hidden shadow-lg group">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
                <div className="relative z-10 flex items-center gap-6">
                    <div className="w-16 h-16 bg-white rounded-2xl border-b-4 border-red-200 flex items-center justify-center text-duo-red shadow-xl shrink-0">
                        <Trophy size={32} strokeWidth={2.5} />
                    </div>
                    <div>
                        <h1 className="font-display font-black text-2xl md:text-3xl tracking-tight uppercase leading-none mb-1">
                            ARENA <span className="text-yellow-300">KOMPETISI</span>
                        </h1>
                        <p className="text-xs font-bold text-red-50 opacity-90">Koleksi lomba elit & resep juara nasional.</p>
                    </div>
                </div>
            </div>

            {/* QUICK STATS - TIGHTER GRID */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                    { icon: Flame, color: 'bg-orange-500', border: 'border-orange-700', label: 'STREAK', value: '14 Hari' },
                    { icon: Crown, color: 'bg-yellow-400', border: 'border-yellow-600', label: 'RANK', value: '#120' },
                    { icon: Zap, color: 'bg-red-500', border: 'border-red-700', label: 'POWER', value: '2.4k' },
                    { icon: Trophy, color: 'bg-sky-500', border: 'border-sky-700', label: 'WINS', value: '3' }
                ].map((stat, i) => (
                    <div key={i} className="bg-white rounded-2xl border-2 border-slate-200 border-b-[6px] p-3 flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg border-b-2 flex items-center justify-center text-white shrink-0 ${stat.color} ${stat.border}`}>
                            <stat.icon size={16} strokeWidth={3} />
                        </div>
                        <div className="min-w-0">
                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
                            <p className="font-black text-sm text-slate-700 leading-none truncate">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* LIST LOMBA (7 COL) */}
                <div className="lg:col-span-7 space-y-4">
                    <div className="flex items-center justify-between px-2">
                        <h2 className="font-display font-black text-lg text-slate-700 uppercase italic tracking-tight">Lomba Terkini</h2>
                        <button className="text-[9px] font-black uppercase text-sky-500 flex items-center gap-1">Filter <Filter size={10}/></button>
                    </div>
                    
                    <div className="space-y-3">
                        {[
                            { title: "Hackathon Nasional Kominfo", host: "Kemenkominfo", prize: "Rp 50jt", tag: "Tech" },
                            { title: "Business Plan Competition UI", host: "FEB UI", prize: "Rp 15jt", tag: "Business" },
                        ].map((lomba, i) => (
                            <div key={i} className="bg-white rounded-2xl border-2 border-slate-200 border-b-[6px] p-4 flex items-center justify-between group hover:border-red-300 transition-all cursor-pointer active:translate-y-[2px] active:border-b-2">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-slate-50 rounded-xl border-b-2 border-slate-100 flex items-center justify-center text-slate-300 group-hover:text-red-500 group-hover:bg-red-50 transition-all">
                                        <Swords size={20} />
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="font-black text-sm text-slate-700 truncate">{lomba.title}</h4>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{lomba.host}</p>
                                    </div>
                                </div>
                                <div className="text-right shrink-0">
                                    <span className="bg-green-100 text-green-600 px-2 py-0.5 rounded text-[9px] font-black uppercase">{lomba.prize}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* TIPS & RESEP (5 COL) */}
                <div className="lg:col-span-5 space-y-4">
                     <h2 className="font-display font-black text-lg text-slate-700 uppercase italic tracking-tight px-2">Resep Juara</h2>
                     <div className="bg-slate-900 rounded-[32px] border-b-[10px] border-black p-5 text-white relative overflow-hidden group shadow-md">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')] opacity-10"></div>
                        <div className="relative z-10 space-y-4">
                            {[
                                { icon: Star, title: "Formula Golden Hook", desc: "Cara membuat opening presentasi yang memikat juri dalam 30 detik." },
                                { icon: BookOpen, title: "Anatomi Proposal Elit", desc: "Struktur proposal yang selalu tembus babak final." }
                            ].map((tip, i) => (
                                <div key={i} className="flex gap-4 p-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all cursor-pointer group/tip">
                                    <div className="w-8 h-8 rounded-lg bg-red-500 border-b-2 border-red-800 flex items-center justify-center shrink-0 group-hover/tip:rotate-6 transition-transform">
                                        <tip.icon size={16} strokeWidth={3} />
                                    </div>
                                    <div className="min-w-0">
                                        <h5 className="font-black text-xs text-white mb-1 uppercase tracking-tight">{tip.title}</h5>
                                        <p className="text-[10px] font-bold text-slate-400 leading-snug">{tip.desc}</p>
                                    </div>
                                </div>
                            ))}
                            <button className="w-full py-3 bg-white text-slate-900 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] border-b-4 border-slate-300 active:translate-y-1 active:border-b-0 transition-all">Buka Semua Resep</button>
                        </div>
                     </div>
                </div>
            </div>
        </div>
    );
};
