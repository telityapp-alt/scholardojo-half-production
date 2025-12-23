
import React, { useState } from 'react';
import { UnifiedProgram, SuccessVaultItem } from '../../types';
import { 
    Gem, FileText, MessageSquare, ShieldAlert, Sparkles, 
    ArrowRight, CheckCircle2, AlertTriangle, Lightbulb, 
    Ghost, Flame, Quote, Download, Eye, Star, Briefcase, GraduationCap,
    Lock, Search, Filter, MoveDown, Info, Zap, ShieldCheck, ClipboardList, TrendingUp,
    ListChecks, CheckSquare, Target, BookOpen, ExternalLink, ShieldCheck as ShieldIcon,
    Clock, X, Swords, Trophy, Activity, BadgeCheck
} from 'lucide-react';
import { DuoIcon } from '../../../../components/ui/DuoIcon';
import { PdfViewerModal } from '../../../../components/ui/PdfViewerModal';
import { DomainType } from '../../../../core/contracts/entityMap';

export const ShadowProtocolTab: React.FC<{ program: UnifiedProgram }> = ({ program }) => {
    const { shadowProtocol, checklist, domain } = program;
    const [vaultFilter, setVaultFilter] = useState<'ALL' | 'ESSAY' | 'CV' | 'PORTFOLIO'>('ALL');
    const [selectedDoc, setSelectedDoc] = useState<SuccessVaultItem | null>(null);

    const isIntern = domain === DomainType.INTERN;
    const isScholar = domain === DomainType.SCHOLAR;

    const getLabels = () => {
        if (isIntern) return { title: "Hiring Secrets", heroSub: "The Recruiter's Playbook", tips: "Corporate Playbook", mistakes: "Application Killers", ghost: "Ghost Tasks", units: "Core Hiring Units", cheat: "Tactical Cheat Sheet", boss: "Final Boss Tips" };
        if (isScholar) return { title: "Success Keys", heroSub: "Scholar's Blueprint", tips: "Scholar Treasure", mistakes: "Lethal Mistakes", ghost: "Ghost Tasks", units: "Mission Units", cheat: "Strike Cheat Sheet", boss: "Panel Boss Tips" };
        return { title: "Winning Keys", heroSub: "The Master Blueprint", tips: "Pro Tips", mistakes: "Common Failures", ghost: "Hidden Tasks", units: "Core Checklist", cheat: "Tactical Summary", boss: "Boss Tips" };
    };

    const labels = getLabels();

    if (!shadowProtocol) return null;

    const filteredVault = shadowProtocol.successVault?.filter(item => 
        vaultFilter === 'ALL' ? true : item.category === vaultFilter
    ) || [];

    const SectionHeader = ({ icon: Icon, title, sub, colorBg, colorIcon }: any) => (
        <div className="flex items-center gap-4 px-2 mb-8">
            <div className={`w-12 h-12 ${colorBg} rounded-2xl flex items-center justify-center ${colorIcon} border-b-4 border-black/10 shadow-lg transform rotate-2`}>
                <Icon size={24} strokeWidth={3} />
            </div>
            <div>
                <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight italic leading-none">{title}</h3>
                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">{sub}</p>
            </div>
        </div>
    );

    return (
        <div className="space-y-20 animate-in fade-in duration-700 pb-24">
            
            {/* 1. HERO VERDICT */}
            <section className="bg-slate-900 p-8 md:p-12 rounded-[48px] border-b-[16px] border-black text-white relative overflow-hidden group shadow-2xl">
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-[2000ms]"></div>
                 <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                    <div className="w-24 h-24 bg-yellow-400 rounded-[32px] border-b-[8px] border-yellow-600 flex items-center justify-center shadow-xl transform -rotate-3 shrink-0">
                        <Gem size={48} strokeWidth={2.5} className="text-yellow-900" />
                    </div>
                    <div className="flex-1">
                        <div className="inline-flex items-center gap-2 bg-yellow-500/20 backdrop-blur-md px-3 py-1 rounded-lg border border-yellow-500/30 mb-4">
                            <Sparkles size={12} className="text-yellow-400" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-300">{labels.heroSub}</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-none mb-4 italic text-white uppercase">{labels.title}</h2>
                        <p className="text-xl font-bold text-slate-400 leading-relaxed max-w-2xl italic">
                            "{shadowProtocol.expertVerdict}"
                        </p>
                    </div>
                 </div>
            </section>

            {/* 2. ELITE TIPS */}
            {shadowProtocol.eliteTips && (
                <section>
                    <SectionHeader icon={Star} title={labels.tips} sub="High-Value Intelligence" colorBg="bg-[#ff9600]" colorIcon="text-white" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {shadowProtocol.eliteTips.map(tip => (
                            <div key={tip.id} className="bg-white p-8 rounded-[40px] border-2 border-orange-100 border-b-[10px] relative overflow-hidden group hover:border-orange-300 transition-all shadow-sm">
                                <div className="absolute top-0 right-0 p-4 opacity-5 rotate-12 group-hover:scale-110 transition-transform"><Zap size={80} /></div>
                                <div className="flex justify-between mb-4">
                                    <span className={`px-2 py-0.5 rounded-lg text-[8px] font-black uppercase border-b-2 ${tip.priority === 'CRITICAL' ? 'bg-red-100 text-red-500 border-red-200' : 'bg-orange-100 text-orange-600 border-orange-200'}`}>{tip.priority}</span>
                                    {tip.source && <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Source: {tip.source}</span>}
                                </div>
                                <h4 className="text-xl font-black text-slate-800 mb-3">{tip.title}</h4>
                                <p className="text-sm font-bold text-slate-600 leading-relaxed italic border-l-4 border-orange-200 pl-4">"{tip.content}"</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* 3. COMPARISON MATRIX (TEMPLATE) */}
            {shadowProtocol.comparisonMatrix && (
                <section>
                    <SectionHeader icon={Activity} title="Tactical Analysis" sub="Direct Component Comparison" colorBg="bg-indigo-100" colorIcon="text-indigo-600" />
                    <div className="bg-white rounded-[40px] border-2 border-slate-200 border-b-[12px] overflow-hidden shadow-md">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50 border-b-2 border-slate-100">
                                    {shadowProtocol.comparisonMatrix.headers.map((h, i) => (
                                        <th key={i} className={`px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest ${i > 0 ? 'text-center' : ''}`}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {shadowProtocol.comparisonMatrix.rows.map((row, i) => (
                                    <tr key={i} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4 font-black text-xs text-slate-400 uppercase tracking-tight">{row.label}</td>
                                        {row.values.map((v, j) => (
                                            <td key={j} className="px-6 py-4 text-center">
                                                <span className={`inline-block px-3 py-1 rounded-xl text-xs font-bold ${j === 0 ? 'text-indigo-600 bg-indigo-50' : 'text-slate-500 bg-slate-50'}`}>
                                                    {v}
                                                </span>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            )}

            {/* 4. LETHAL MISTAKES & GHOST TASKS */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                <div className="lg:col-span-7 space-y-12">
                    <section>
                        <SectionHeader icon={ShieldAlert} title={labels.mistakes} sub="Fatal Vulnerabilities" colorBg="bg-red-100" colorIcon="text-red-500" />
                        <div className="space-y-4">
                            {shadowProtocol.lethalMistakes.map((m, i) => (
                                <div key={i} className="bg-white p-6 rounded-3xl border-2 border-red-100 border-b-[8px] hover:border-red-300 transition-all group shadow-sm">
                                    <div className="flex gap-5">
                                        <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-400 border-b-2 border-red-100 shrink-0 group-hover:bg-red-500 group-hover:text-white transition-all"><AlertTriangle size={20} /></div>
                                        <div className="flex-1">
                                            <h4 className="text-lg font-black text-slate-800 mb-2">{m.title}</h4>
                                            <p className="text-sm font-bold text-slate-500 leading-relaxed italic mb-4">"{m.reason}"</p>
                                            {m.fix && <div className="p-3 bg-green-50 rounded-xl border border-green-100"><p className="text-[10px] font-black text-green-700 uppercase mb-1">Dojo Override</p><p className="text-xs font-bold text-green-900 leading-tight">"{m.fix}"</p></div>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* CHEAT SHEET (TACTICAL MANEUVERS) */}
                    {shadowProtocol.cheatSheet && (
                        <section>
                            <SectionHeader icon={Zap} title="Combat maneuvers" sub="The Interview Cheat Sheet" colorBg="bg-yellow-100" colorIcon="text-yellow-600" />
                            <div className="grid grid-cols-1 gap-6">
                                <div className="bg-slate-900 p-8 rounded-[40px] border-b-[12px] border-black text-white relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform"><BadgeCheck size={100} /></div>
                                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <h4 className="font-black text-sky-400 uppercase text-xs tracking-widest flex items-center gap-2"><Target size={14}/> Pre-Interview</h4>
                                            {shadowProtocol.cheatSheet.preInterview.map((item, i) => (
                                                <div key={i} className="flex gap-3 items-center">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0"></div>
                                                    <p className="text-xs font-bold text-slate-300">{item}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="space-y-4">
                                            <h4 className="font-black text-green-400 uppercase text-xs tracking-widest flex items-center gap-2"><Sparkles size={14}/> Power Phrases</h4>
                                            {shadowProtocol.cheatSheet.powerPhrases.map((item, i) => (
                                                <div key={i} className="p-3 bg-white/5 border border-white/10 rounded-xl">
                                                    <p className="text-[11px] font-bold text-slate-200 leading-relaxed italic">"{item}"</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}
                </div>

                <div className="lg:col-span-5 space-y-12 sticky top-24">
                    <div className="bg-white p-8 rounded-[40px] border-2 border-slate-200 border-b-[12px] shadow-xl">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="w-14 h-14 bg-purple-100 rounded-[24px] border-b-4 border-purple-200 flex items-center justify-center text-purple-600 shadow-inner"><Ghost size={32} /></div>
                            <div>
                                <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">{labels.ghost}</h3>
                                <p className="text-[10px] font-black text-slate-400 uppercase mt-1">Off-the-record Actions</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            {shadowProtocol.ghostTasks.map((t, i) => (
                                <div key={i} className="flex flex-col p-5 bg-slate-50 rounded-[24px] border-2 border-slate-100 group hover:border-purple-200 transition-all">
                                    <div className="flex items-start gap-4 mb-2">
                                        <div className="w-5 h-5 rounded-full border-2 border-slate-300 bg-white flex items-center justify-center shrink-0 mt-1"><div className="w-2 h-2 rounded-full bg-slate-100 group-hover:bg-purple-400 transition-colors"></div></div>
                                        <div className="flex-1"><p className="font-black text-slate-700 text-sm leading-tight mb-1">{t.label}</p><span className={`text-[8px] font-black uppercase tracking-widest inline-block px-1.5 py-0.5 rounded ${t.importance === 'CRITICAL' ? 'bg-red-100 text-red-500' : 'bg-sky-100 text-sky-600'}`}>{t.importance}</span></div>
                                    </div>
                                    {t.desc && <p className="text-[10px] font-bold text-slate-400 pl-9 italic">"{t.desc}"</p>}
                                </div>
                            ))}
                        </div>
                    </div>

                    {shadowProtocol.alumniInsights && (
                        <div className="bg-white p-8 rounded-[40px] border-2 border-slate-200 border-b-[12px] shadow-sm">
                             <div className="flex items-center gap-3 mb-6"><DuoIcon icon={Quote} color="sky" size="sm" /><h3 className="font-black text-slate-700 uppercase text-xs tracking-widest">Alumni Reports</h3></div>
                             <div className="space-y-8">
                                {shadowProtocol.alumniInsights.map((a, i) => (
                                    <div key={i} className="relative pb-6 border-b-2 border-slate-50 last:border-0 last:pb-0">
                                        <p className="text-sm font-bold text-slate-500 italic leading-relaxed mb-4">"{a.insight}"</p>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-slate-100 overflow-hidden border-2 border-slate-200"><img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${a.name}`} alt="" /></div>
                                            <div><p className="font-black text-xs text-slate-700">{a.name}</p><p className="text-[8px] font-black text-sky-500 uppercase">{a.year} Awardee</p></div>
                                        </div>
                                    </div>
                                ))}
                             </div>
                        </div>
                    )}
                </div>
            </div>

            {/* 5. TREASURE VAULT */}
            {shadowProtocol.successVault && shadowProtocol.successVault.length > 0 && (
                <section>
                    <SectionHeader icon={Star} title="Artifact Vault" sub="Proven Success Documents" colorBg="bg-yellow-400" colorIcon="text-yellow-900" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {shadowProtocol.successVault.map((item) => (
                            <div key={item.id} className="bg-white rounded-[40px] border-2 border-slate-200 border-b-[12px] hover:border-yellow-400 transition-all group flex flex-col shadow-lg overflow-hidden">
                                 <div className="p-8 flex-1">
                                    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-yellow-500 transition-all mb-6">
                                        {item.category === 'ESSAY' ? <FileText size={28}/> : <Briefcase size={28}/>}
                                    </div>
                                    <h4 className="font-black text-slate-700 text-xl leading-tight mb-4 group-hover:text-slate-900">{item.title}</h4>
                                    <div className="p-4 bg-slate-50 rounded-2xl border-2 border-slate-100 group-hover:border-yellow-200 shadow-inner">
                                        <p className="text-xs font-bold text-slate-500 italic">"{item.senseiComment}"</p>
                                    </div>
                                 </div>
                                 <div className="p-6 bg-slate-50 border-t-2 border-slate-100 flex gap-3">
                                    <button onClick={() => setSelectedDoc(item)} className="flex-1 py-4 bg-white border-2 border-slate-200 border-b-[6px] rounded-2xl font-black text-xs uppercase text-slate-600 hover:bg-slate-100 transition-all">Study</button>
                                    <button onClick={() => window.open(item.previewUrl, '_blank')} className="w-14 h-14 bg-duo-green text-white border-b-8 border-duo-greenDark rounded-2xl flex items-center justify-center"><Download size={24} /></button>
                                 </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* 6. VERIFIED SOURCES */}
            {shadowProtocol.sources && (
                <section className="pt-20 border-t-4 border-slate-200 border-dashed">
                     <div className="bg-slate-100 p-8 rounded-[48px] border-2 border-slate-200 shadow-inner">
                        <div className="flex items-center gap-4 mb-8"><div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 border-b-4 border-slate-200"><ShieldIcon size={24} /></div><div><h4 className="text-lg font-black text-slate-700 uppercase italic">Verified Data Sources</h4><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Cross-referenced Authority Data</p></div></div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                            {shadowProtocol.sources.map((s, i) => (
                                <div key={i} className="flex items-center gap-2 p-3 bg-white rounded-xl border border-slate-200 text-[10px] font-black text-slate-500 uppercase tracking-tight truncate group hover:text-sky-500 transition-colors"><div className="w-1.5 h-1.5 rounded-full bg-sky-300"></div>{s}</div>
                            ))}
                        </div>
                     </div>
                </section>
            )}

            {selectedDoc && (
                <PdfViewerModal 
                    isOpen={!!selectedDoc} 
                    title={selectedDoc.title} 
                    url={selectedDoc.previewUrl} 
                    onClose={() => setSelectedDoc(null)} 
                />
            )}
        </div>
    );
};
