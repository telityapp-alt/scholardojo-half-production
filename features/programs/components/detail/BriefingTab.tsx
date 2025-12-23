
import React, { useState } from 'react';
import { UnifiedProgram, BriefingResource } from '../../types';
import { 
    Info, Layout, Coins, Users, Target, ShieldCheck, 
    FileText, CheckCircle2, Star, Calendar, 
    Zap, ClipboardList, Eye, Download, FileDown, 
    ShieldAlert, Heart, ArrowRight, AlertTriangle
} from 'lucide-react';
import { DuoIcon } from '../../../../components/ui/DuoIcon';
import { PdfViewerModal } from '../../../../components/ui/PdfViewerModal';
import { renderJuicyContent } from '../../../../core/engines/contentRenderer';
import { ScholarNewsSection } from './ScholarNewsSection';

export const BriefingTab: React.FC<{ program: UnifiedProgram }> = ({ program }) => {
    const { intel } = program;
    const [selectedResource, setSelectedResource] = useState<BriefingResource | null>(null);

    const CompactSection = ({ title, icon: Icon, color, children }: any) => (
        <div className="bg-white rounded-[32px] border-2 border-slate-200 border-b-[6px] overflow-hidden group hover:border-slate-300 transition-all flex flex-col shadow-sm">
            <div className={`p-4 flex items-center gap-3 border-b-2 border-slate-50 ${color.replace('bg-', 'text-')}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white border-b-4 border-black/10 ${color}`}>
                    <Icon size={20} strokeWidth={3} />
                </div>
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-700">{title}</h3>
            </div>
            <div className="p-5 flex-1 space-y-4">
                {children}
            </div>
        </div>
    );

    const BulletList = ({ items, icon: BulletIcon = CheckCircle2, iconColor = "text-sky-500" }: any) => (
        <div className="space-y-3">
            {items?.map((item: string, i: number) => (
                <div key={i} className="flex gap-3 items-start group/item">
                    <BulletIcon size={14} className={`${iconColor} shrink-0 mt-0.5 group-hover/item:scale-125 transition-transform`} strokeWidth={3} />
                    <p className="text-xs font-bold text-slate-500 leading-relaxed">{item}</p>
                </div>
            ))}
        </div>
    );

    return (
        <div className="space-y-12 animate-in fade-in duration-500 pb-20">
            
            {/* 1. NEWS GRID */}
            {intel.news && intel.news.length > 0 && (
                <ScholarNewsSection news={intel.news} />
            )}

            {/* 2. HERO DESCRIPTION */}
            <div className="bg-white p-6 md:p-10 rounded-[48px] border-2 border-slate-200 border-b-[10px] relative overflow-hidden shadow-sm">
                <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none"><Info size={180}/></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                        <DuoIcon icon={Info} color="blue" size="md" />
                        <h2 className="text-2xl font-black text-slate-800 uppercase italic tracking-tighter">Mission Blueprint</h2>
                    </div>
                    <p className="text-lg font-bold text-slate-600 leading-relaxed max-w-4xl italic">
                        {renderJuicyContent(intel.about || intel.description)}
                    </p>
                </div>
            </div>

            {/* 3. INFO GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <CompactSection title="Strike Scheme" icon={Layout} color="bg-sky-500">
                    <BulletList items={intel.scheme} icon={Zap} iconColor="text-sky-500" />
                </CompactSection>

                <CompactSection title="Inventory/Loot" icon={Coins} color="bg-green-500">
                    {intel.fundingComponents?.map((cat, i) => (
                        <div key={i} className="space-y-2">
                            <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{cat.category}</h4>
                            <div className="flex flex-wrap gap-1.5">
                                {cat.items.map((item, j) => (
                                    <span key={j} className="px-2.5 py-1 bg-green-50 text-green-600 rounded-lg text-[9px] font-black uppercase border border-green-100">{item}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </CompactSection>

                <CompactSection title="General Protocol" icon={Users} color="bg-purple-500">
                    <BulletList items={intel.generalRequirements} icon={ShieldCheck} iconColor="text-purple-500" />
                </CompactSection>

                <CompactSection title="Special Reqs" icon={Target} color="bg-red-500">
                    <BulletList items={intel.specificRequirements} icon={Star} iconColor="text-red-500" />
                </CompactSection>

                <CompactSection title="Restrictions" icon={ShieldAlert} color="bg-slate-800">
                    <BulletList items={intel.otherProvisions} icon={AlertTriangle} iconColor="text-slate-400" />
                </CompactSection>

                <CompactSection title="Mission Phases" icon={Zap} color="bg-orange-500">
                    <div className="space-y-3">
                        {intel.phases?.map((p, i) => (
                            <div key={i} className="flex justify-between items-center gap-4 p-3 bg-slate-50 rounded-2xl border-2 border-slate-100 hover:border-orange-200 transition-all">
                                <div className="min-w-0">
                                    <p className="text-[9px] font-black text-orange-600 uppercase tracking-widest truncate">{p.name}</p>
                                    <p className="text-[11px] font-bold text-slate-700 truncate">{p.date}</p>
                                </div>
                                <Calendar size={14} className="text-slate-300 shrink-0" />
                            </div>
                        ))}
                    </div>
                </CompactSection>
            </div>

            {/* 4. OFFICIAL REGISTRY TABLE */}
            {intel.officialDocumentList && (
                <section className="space-y-6">
                    <div className="flex items-center gap-4 px-2">
                        <div className="w-12 h-12 bg-[#58cc02] rounded-2xl flex items-center justify-center text-white border-b-4 border-[#46a302] shadow-lg">
                            <ClipboardList size={24} strokeWidth={3} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight italic">Official Registry</h3>
                            <p className="text-slate-400 font-bold text-sm">Mandatory dossiers for this mission.</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-[40px] border-2 border-slate-200 border-b-[12px] overflow-hidden shadow-md">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b-2 border-slate-100">
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Document</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Online Form</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Upload</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {intel.officialDocumentList.map((doc, idx) => (
                                        <tr key={doc.id} className={`group hover:bg-slate-50/50 transition-colors ${idx !== intel.officialDocumentList!.length - 1 ? 'border-b border-slate-100' : ''}`}>
                                            <td className="px-6 py-4">
                                                <p className="text-sm font-bold text-slate-700">{doc.name}</p>
                                                {doc.note && <p className="text-[10px] font-bold text-slate-400 mt-1 italic">*{doc.note}</p>}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {doc.isOnlineForm ? <CheckCircle2 size={18} className="text-sky-500 mx-auto" strokeWidth={3}/> : <span className="text-slate-200">—</span>}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {doc.isUpload ? <CheckCircle2 size={18} className="text-duo-green mx-auto" strokeWidth={3}/> : <span className="text-slate-200">—</span>}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            )}

            {/* 5. RESOURCE VAULT */}
            {intel.briefingResources && (
                <section className="space-y-6">
                    <div className="flex items-center gap-4 px-2">
                        <div className="w-12 h-12 bg-sky-500 rounded-2xl flex items-center justify-center text-white border-b-4 border-sky-700 shadow-lg">
                            <FileDown size={24} strokeWidth={3} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight italic">Mission resources</h3>
                            <p className="text-slate-400 font-bold text-sm">Downloadable intelligence artifacts.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {intel.briefingResources.map((res) => (
                            <div key={res.id} className="bg-white p-5 rounded-[32px] border-2 border-slate-200 border-b-[8px] flex items-center justify-between group hover:border-sky-400 transition-all shadow-sm">
                                <div className="flex items-center gap-4 min-w-0">
                                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 border-b-2 border-slate-100 group-hover:bg-sky-50 group-hover:text-sky-500 transition-all shrink-0">
                                        <FileText size={24} strokeWidth={2.5} />
                                    </div>
                                    <div className="truncate">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{res.type}</p>
                                        <h4 className="text-sm font-black text-slate-700 truncate">{res.title}</h4>
                                    </div>
                                </div>
                                <div className="flex gap-2 shrink-0">
                                    <button onClick={() => setSelectedResource(res)} className="w-10 h-10 rounded-xl bg-white border-2 border-slate-200 border-b-4 flex items-center justify-center text-slate-400 hover:text-sky-500 transition-all"><Eye size={18} strokeWidth={3}/></button>
                                    <button onClick={() => window.open(res.url, '_blank')} className="w-10 h-10 rounded-xl bg-slate-800 border-b-4 border-black flex items-center justify-center text-white transition-all"><Download size={18} strokeWidth={3}/></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* PDF MODAL */}
            {selectedResource && (
                <PdfViewerModal 
                    isOpen={!!selectedResource} 
                    url={selectedResource.url} 
                    title={selectedResource.title} 
                    onClose={() => setSelectedResource(null)} 
                />
            )}
        </div>
    );
};
