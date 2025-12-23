
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BookOpen, Camera, GraduationCap, DollarSign, Plane, FileText, Zap, ArrowRight, Clock } from 'lucide-react';
import { DomainType, GenericProgram } from '../../../core/contracts/entityMap';
import { DOMAIN_CONFIGS } from '../../../core/contracts/domainConfig';
import { getHostById, getProgramsByHostId } from '../../../core/access/programAccess';
import { GenericHost } from '../../../core/contracts/entityMap';

// Sub Components
import { HostHero } from './detail/HostHero';
import { HostOverview } from './detail/HostOverview';
import { HostGallery } from './detail/HostGallery';
import { HostDepartments } from './detail/HostDepartments';
import { DuoButton } from '../../../components/DuoButton';
import { DuoIcon } from '../../../components/ui/DuoIcon';
import { useLanguage } from '../../../core/hooks/useLanguage';

export const HostDetail: React.FC = () => {
    const { domain, detailId } = useParams<{ domain: string; detailId: string }>();
    const navigate = useNavigate();
    const { lang } = useLanguage();
    const [host, setHost] = useState<GenericHost | null>(null);
    const [activePrograms, setActivePrograms] = useState<GenericProgram[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'PROGRAMS' | 'CAMPAIGNS' | 'VIBE'>('OVERVIEW');

    useEffect(() => {
        if (!detailId || !domain) return;
        setLoading(true);
        
        const domainEnum = domain as DomainType;
        const h = getHostById(detailId, domainEnum, lang);
        const p = getProgramsByHostId(detailId, domainEnum, lang);
        
        setHost(h);
        setActivePrograms(p);
        setLoading(false);
    }, [detailId, domain, lang]);

    if (loading) return <div className="p-10 text-center font-black text-slate-300 animate-pulse uppercase tracking-widest">Gathering Organization Intel...</div>;
    if (!host) return <div className="p-10 text-center font-black text-slate-300 uppercase tracking-widest">Organization Not Found</div>;

    const isIntern = domain === DomainType.INTERN;
    const isScholar = domain === DomainType.SCHOLAR;

    const TAB_LABELS = {
        DEPT: isIntern ? 'Teams' : isScholar ? 'Faculties' : 'Departments',
        FUNDING: isIntern ? 'Salary' : isScholar ? 'Scholarships' : 'Funding'
    };

    const TabButton = ({ id, label, icon: Icon }: { id: typeof activeTab, label: string, icon: any }) => {
        const isActive = activeTab === id;
        const color = isActive ? 'sky' : 'gray';
        return (
            <button
                onClick={() => setActiveTab(id)}
                className={`
                    flex-1 flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all border-b-[5px]
                    ${isActive 
                        ? 'bg-sky-100 text-sky-600 border-sky-400 active:border-b-0 active:translate-y-[5px]' 
                        : 'bg-white text-slate-400 border-slate-200 hover:bg-slate-50 hover:border-slate-300 active:border-b-0 active:translate-y-[5px]'
                    }
                `}
            >
                <Icon className={`w-4 h-4 stroke-[3px] ${isActive ? 'text-sky-600' : 'text-slate-400'}`} />
                {label}
            </button>
        );
    };

    return (
        <div className="animate-in slide-in-from-right duration-500 pb-20 max-w-6xl mx-auto px-4">
            
            <HostHero host={host} domain={domain!} />

            {/* JUICY TABS */}
            <div className="flex flex-col sm:flex-row gap-3 mb-10 p-1">
                <TabButton id="OVERVIEW" label="Overview" icon={BookOpen} />
                <TabButton id="CAMPAIGNS" label="Open Programs" icon={Zap} />
                <TabButton id="PROGRAMS" label={TAB_LABELS.DEPT} icon={GraduationCap} />
                <TabButton id="VIBE" label="Vibe" icon={Camera} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                <div className="lg:col-span-2 space-y-8 min-h-[500px]">
                    {activeTab === 'OVERVIEW' && <HostOverview host={host} />}
                    {activeTab === 'VIBE' && <HostGallery host={host} />}
                    {activeTab === 'PROGRAMS' && <HostDepartments host={host} />}
                    
                    {activeTab === 'CAMPAIGNS' && (
                        <div className="space-y-6 animate-in fade-in">
                            <h3 className="text-xl font-black text-slate-700 uppercase tracking-wide flex items-center gap-3">
                                <DuoIcon icon={Zap} color="orange" size="sm" /> 
                                Active Campaigns
                            </h3>
                            {activePrograms.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {activePrograms.map(prog => (
                                        <button 
                                            key={prog.id}
                                            onClick={() => navigate(`/${domain}/discovery/programs/${prog.id}`)}
                                            className="w-full text-left bg-white p-6 rounded-[32px] border-2 border-slate-200 border-b-[8px] hover:border-sky-300 hover:border-b-sky-500 hover:bg-sky-50 transition-all group relative overflow-hidden"
                                        >
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="w-12 h-12 rounded-2xl bg-sky-50 flex items-center justify-center text-sky-500 group-hover:bg-sky-500 group-hover:text-white transition-colors border-2 border-sky-100">
                                                    <Zap size={24} fill="currentColor" />
                                                </div>
                                                <span className="bg-green-100 text-green-700 text-[9px] font-black uppercase px-2 py-0.5 rounded-lg border border-green-200">Open</span>
                                            </div>
                                            <h4 className="text-xl font-black text-slate-700 group-hover:text-sky-600 mb-2 leading-tight">{prog.title}</h4>
                                            <div className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                                                <Clock size={12} /> Deadline: {new Date(prog.deadline).toLocaleDateString()}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-16 text-center bg-slate-50 rounded-[40px] border-4 border-dashed border-slate-200">
                                    <p className="font-black text-slate-300 uppercase tracking-widest">No Active Campaigns Found</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="space-y-6">
                     {host.funding && host.funding.length > 0 && (
                        <div className="bg-white p-6 rounded-[32px] border-2 border-slate-200 border-b-[12px]">
                            <h3 className="font-black text-slate-700 text-lg mb-6 flex items-center gap-3">
                                <DuoIcon icon={DollarSign} color="green" size="sm" />
                                {TAB_LABELS.FUNDING}
                            </h3>
                            <div className="space-y-4">
                                {host.funding.map((s, i) => (
                                    <div key={i} className="flex flex-col gap-1 pb-4 border-b-2 border-slate-100 last:border-0 last:pb-0">
                                        <div className="flex justify-between items-start">
                                            <p className="font-bold text-slate-700 text-sm leading-tight">{s.name}</p>
                                            <span className="text-[10px] font-black bg-green-100 text-green-600 px-2 py-0.5 rounded ml-2 whitespace-nowrap">
                                                {s.amount}
                                            </span>
                                        </div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-wide">{s.type}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6">
                                <DuoButton variant="secondary" fullWidth startIcon={FileText} themeColor="slate">Check Details</DuoButton>
                            </div>
                        </div>
                     )}

                     <div className="bg-[#1cb0f6] p-6 rounded-[32px] border-b-[12px] border-[#1899d6] text-white text-center shadow-xl">
                         <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border-2 border-white/30 backdrop-blur-md">
                            <Plane className="w-8 h-8 text-white stroke-[3px]" />
                         </div>
                         <h3 className="text-xl font-black mb-2">{isIntern ? 'Relocation?' : 'Study Abroad?'}</h3>
                         <p className="font-bold text-sky-100 text-xs mb-6 leading-relaxed">Calculate cost of living in {host.location ? host.location.split(',')[0] : 'the host city'}.</p>
                         <button className="w-full bg-white text-sky-500 py-3.5 rounded-2xl font-black text-sm uppercase tracking-widest border-b-[5px] border-sky-200 active:border-b-0 active:translate-y-[5px] transition-all">Use Calculator</button>
                     </div>
                </div>
            </div>
        </div>
    );
};
