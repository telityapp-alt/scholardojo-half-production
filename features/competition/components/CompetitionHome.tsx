
import React from 'react';
import { Swords, Trophy, Zap, Flame, Crown, Target, ArrowRight, BookOpen, Star, Filter } from 'lucide-react';
import { RegionLocked } from '../../../components/shared/RegionLocked';
import { useRegion } from '../../../core/hooks/useRegion';

export const CompetitionHome: React.FC = () => {
    const { regionId } = useRegion();
    const isIndo = regionId === 'id';
    
    if (!isIndo) return <RegionLocked featureName="Kompetisi Dojo" />;

    return (
        <div className="space-y-4 pb-20 animate-in fade-in duration-500 max-w-5xl mx-auto px-4">
            {/* HERO COMPACT */}
            <div className="bg-duo-red rounded-[28px] border-b-[8px] border-duo-redDark p-5 text-white relative overflow-hidden shadow-lg group">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
                <div className="relative z-10 flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl border-b-4 border-red-200 flex items-center justify-center text-duo-red shadow-lg shrink-0">
                        <Trophy size={24} strokeWidth={2.5} />
                    </div>
                    <div>
                        <h1 className="font-display font-black text-xl md:text-3xl tracking-tight leading-none mb-1">
                            Arena <span className="text-yellow-300">Kompetisi</span>
                        </h1>
                        <p className="text-[10px] font-bold text-red-50 opacity-90">Koleksi lomba elit & resep juara nasional.</p>
                    </div>
                </div>
            </div>

            {/* QUICK STATS - TIGHTER GRID */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {[
                    { icon: Flame, color: 'bg-orange-500', border: 'border-orange-700', label: 'STREAK', value: '14 Hari' },
                    { icon: Crown, color: 'bg-yellow-400', border: 'border-yellow-600', label: 'RANK', value: '#120' },
                    { icon: Zap, color: 'bg-red-500', border: 'border-red-700', label: 'POWER', value: '2.4k' },
                    { icon: Trophy, color: 'bg-sky-500', border: 'border-sky-700', label: 'WINS', value: '3' }
                ].map((stat, i) => (
                    <div key={i} className="bg-white rounded-xl border-2 border-slate-200 border-b-[4px] p-2.5 flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-lg border-b-2 flex items-center justify-center text-white shrink-0 ${stat.color} ${stat.border}`}>
                            <stat.icon size={14} strokeWidth={3} />
                        </div>
                        <div className="min-w-0">
                            <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest leading-none mb-0.5">{stat.label}</p>
                            <p className="font-black text-xs text-slate-700 leading-none truncate">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                <div className="lg:col-span-7 space-y-3">
                    <div className="flex items-center justify-between px-2">
                        <h2 className="font-display font-black text-sm text-slate-700 uppercase italic tracking-tight">Lomba Terkini</h2>
                        <button className="text-[8px] font-black uppercase text-sky-500 flex items-center gap-1">Filter <Filter size={8}/></button>
                    </div>
                    <div className="space-y-2">
                        {[
                            { title: "Hackathon Nasional Kominfo", host: "Kemenkominfo", prize: "Rp 50jt" },
                            { title: "Business Plan Competition UI", host: "FEB UI", prize: "Rp 15jt" },
                        ].map((lomba, i) => (
                            <div key={i} className="bg-white rounded-2xl border-2 border-slate-200 border-b-[4px] p-3 flex items-center justify-between group hover:border-red-300 transition-all cursor-pointer active:translate-y-[1px] active:border-b-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 bg-slate-50 rounded-lg border-b-2 border-slate-100 flex items-center justify-center text-slate-300 group-hover:text-red-500 group-hover:bg-red-50 transition-all">
                                        <Swords size={18} />
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="font-black text-xs text-slate-700 truncate">{lomba.title}</h4>
                                        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{lomba.host}</p>
                                    </div>
                                </div>
                                <div className="text-right shrink-0">
                                    <span className="bg-green-100 text-green-600 px-2 py-0.5 rounded text-[8px] font-black uppercase">{lomba.prize}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-5 space-y-3">
                     <h2 className="font-display font-black text-sm text-slate-700 uppercase italic tracking-tight px-2">Resep Juara</h2>
                     <div className="bg-slate-900 rounded-[28px] border-b-[8px] border-black p-4 text-white relative overflow-hidden shadow-md">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')] opacity-10"></div>
                        <div className="relative z-10 space-y-3">
                            {[
                                { icon: Star, title: "Formula Golden Hook", desc: "Opening presentasi memikat juri dalam 30 detik." },
                                { icon: BookOpen, title: "Anatomi Proposal Elit", desc: "Struktur proposal penembus babak final." }
                            ].map((tip, i) => (
                                <div key={i} className="flex gap-3 p-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all cursor-pointer group/tip">
                                    <div className="w-7 h-7 rounded-lg bg-red-500 border-b-2 border-red-800 flex items-center justify-center shrink-0 group-hover/tip:rotate-6 transition-transform">
                                        <tip.icon size={14} strokeWidth={3} />
                                    </div>
                                    <div className="min-w-0">
                                        <h5 className="font-black text-[10px] text-white mb-0.5 uppercase tracking-tight">{tip.title}</h5>
                                        <p className="text-[9px] font-bold text-slate-400 leading-snug">{tip.desc}</p>
                                    </div>
                                </div>
                            ))}
                            <button className="w-full py-2.5 bg-white text-slate-900 rounded-lg font-black text-[9px] uppercase tracking-[0.2em] border-b-2 border-slate-300 active:translate-y-1 active:border-b-0 transition-all">Buka Semua Resep</button>
                        </div>
                     </div>
                </div>
            </div>
        </div>
    );
};
