
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UnifiedProgramService } from '../services/unifiedProgramService';
import { UnifiedProgram } from '../types';
import { DomainType } from '../../../core/contracts/entityMap';
import { 
    ChevronLeft, Info, Map as MapIcon, Zap, Share2, Heart, 
    ShieldCheck, Rocket, Check, Globe, Target, FileCheck, Swords, Gem, FileText,
    Bot
} from 'lucide-react';
import { DuoButton } from '../../../components/DuoButton';
import { BriefingTab } from './detail/BriefingTab';
import { RoadmapTab } from './detail/RoadmapTab';
import { AdmissionTab } from './detail/AdmissionTab';
import { CommandTab } from './detail/CommandTab';
import { ArenaTab } from './detail/ArenaTab';
import { ShadowProtocolTab } from './detail/ShadowProtocolTab';
import { DocsTab } from './detail/DocsTab';
import { ProgramAiChat } from './detail/ProgramAiChat';
import { MissionOrchestrator } from '../../../core/access/missionOrchestrator';
import { SaveService } from '../../../core/access/saveAccess';
import confetti from 'canvas-confetti';

export const ProgramDetailView: React.FC = () => {
    const { detailId, domain } = useParams<{ detailId: string; domain: string }>();
    const navigate = useNavigate();
    const domainEnum = (domain as DomainType) || DomainType.STUDENT;
    
    const [program, setProgram] = useState<UnifiedProgram | null>(null);
    const [activeTab, setActiveTab] = useState<'INTEL' | 'SUCCESS' | 'ARENA' | 'DOCS' | 'COMMAND' | 'ADMISSION' | 'AICHAT'>('INTEL');
    const [isSecured, setIsSecured] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);

    useEffect(() => {
        if (!detailId) return;
        const p = UnifiedProgramService.getById(detailId);
        if (p) {
            setProgram(p);
            setIsSecured(UnifiedProgramService.isSecured(p.id));
            setIsBookmarked(SaveService.isSaved(p.id));
        }
    }, [detailId]);

    const handleToggleSecure = () => {
        if (!program) return;
        const status = MissionOrchestrator.secureTarget(program);
        setIsSecured(status);
        if (status) {
            confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#1cb0f6', '#ffffff', '#58cc02'] });
        }
    };

    const handleToggleBookmark = () => {
        if (!program) return;
        const status = SaveService.toggle(program, 'PROGRAM', domainEnum);
        setIsBookmarked(status);
    };

    if (!program) return null;

    return (
        <div className="animate-in slide-in-from-right duration-500 pb-24 max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
                <DuoButton variant="navigation" startIcon={ChevronLeft} onClick={() => navigate(-1)}>Back</DuoButton>
                <div className="flex gap-2">
                    <button 
                        onClick={handleToggleBookmark} 
                        className={`w-10 h-10 rounded-xl border-2 border-b-4 flex items-center justify-center transition-all shadow-sm active:translate-y-[2px] active:border-b-2
                            ${isBookmarked ? 'bg-pink-100 text-pink-500 border-pink-300' : 'bg-white text-slate-300 border-slate-100'}
                        `}
                    >
                        <Heart size={18} fill={isBookmarked ? "currentColor" : "none"} strokeWidth={3} />
                    </button>
                    <button 
                        onClick={handleToggleSecure} 
                        title="Secure to Workspace"
                        className={`w-10 h-10 rounded-xl border-2 border-b-4 flex items-center justify-center transition-all shadow-sm active:translate-y-[2px] active:border-b-2
                            ${isSecured ? 'bg-green-100 text-green-600 border-green-300' : 'bg-white text-slate-300 border-slate-100'}
                        `}
                    >
                        <ShieldCheck size={18} strokeWidth={3} />
                    </button>
                    <button className="w-10 h-10 bg-white rounded-xl border-2 border-slate-100 border-b-4 flex items-center justify-center text-slate-300 hover:text-sky-500 shadow-sm transition-all active:translate-y-[2px]"><Share2 size={18}/></button>
                </div>
            </div>

            <div className="bg-[#1cb0f6] rounded-[40px] border-b-[12px] border-[#1899d6] p-8 md:p-10 text-white relative overflow-hidden mb-10 shadow-2xl group">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-15 pointer-events-none group-hover:scale-110 transition-transform duration-700"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                    <div className="shrink-0">
                        <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-[32px] border-[6px] border-white/30 shadow-2xl flex items-center justify-center p-5 transform -rotate-2 group-hover:rotate-0 transition-all duration-700">
                             <img src={program.organizerLogo} className="w-full h-full object-contain" alt="Logo" />
                        </div>
                    </div>
                    <div className="text-center md:text-left flex-1 space-y-3">
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                            <span className="bg-black/20 backdrop-blur-md px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest border border-white/10">{program.type}</span>
                            <span className="bg-white/15 px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest border border-white/5 flex items-center gap-1.5"><Globe size={10} /> {program.country}</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-none drop-shadow-md">{program.title}</h1>
                        <p className="text-lg font-bold text-sky-50 flex items-center justify-center md:justify-start gap-2 opacity-95">
                            <ShieldCheck size={22} className="text-sky-200" /> {program.organizer}
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto bg-white p-1.5 rounded-3xl border-2 border-slate-200 border-b-[6px] flex gap-1.5 mb-12 shadow-xl sticky top-4 z-[100] overflow-x-auto no-scrollbar">
                {[
                    { id: 'INTEL', label: 'Briefing', icon: Info },
                    { id: 'SUCCESS', label: 'Keys', icon: Gem },
                    { id: 'AICHAT', label: 'Sensei AI', icon: Bot },
                    { id: 'COMMAND', label: 'Command', icon: Target },
                    { id: 'ARENA', label: 'Arena', icon: Swords },
                    { id: 'DOCS', label: 'Docs', icon: FileText },
                    { id: 'ADMISSION', label: 'Admission', icon: FileCheck },
                ].map((tab) => (
                    <button 
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex-1 flex flex-col items-center justify-center gap-1.5 py-3.5 px-4 rounded-2xl transition-all border-b-[5px] shrink-0
                            ${activeTab === tab.id 
                                ? tab.id === 'AICHAT' 
                                    ? 'bg-sky-500 border-sky-700 text-white translate-y-[-2px]'
                                    : tab.id === 'ARENA'
                                        ? 'bg-red-500 border-red-700 text-white translate-y-[-2px]'
                                        : tab.id === 'SUCCESS' || tab.id === 'DOCS'
                                            ? 'bg-yellow-100 text-yellow-600 border-yellow-400 translate-y-[-2px]'
                                            : tab.id === 'COMMAND'
                                                ? 'bg-indigo-100 text-indigo-600 border-indigo-400 translate-y-[-2px]'
                                                : 'bg-sky-100 text-sky-600 border-sky-400 translate-y-[-2px]' 
                                : 'bg-white text-slate-400 border-transparent hover:bg-slate-50'}`}
                    >
                        <tab.icon size={18} strokeWidth={activeTab === tab.id ? 4 : 2.5} />
                        <span className="text-[9px] font-black uppercase tracking-widest whitespace-nowrap">{tab.label}</span>
                    </button>
                ))}
            </div>

            <div className="min-h-[500px]">
                {activeTab === 'INTEL' && <BriefingTab program={program} />}
                {activeTab === 'SUCCESS' && <ShadowProtocolTab program={program} />}
                {activeTab === 'AICHAT' && <ProgramAiChat program={program} />}
                {activeTab === 'COMMAND' && <CommandTab program={program} domain={domainEnum} isSecured={isSecured} onSecure={handleToggleSecure} />}
                {activeTab === 'ARENA' && <ArenaTab program={program} domain={domainEnum} isSecured={isSecured} onSecure={handleToggleSecure} />}
                {activeTab === 'DOCS' && <DocsTab program={program} />}
                {activeTab === 'ADMISSION' && <AdmissionTab program={program} isSecured={isSecured} onSecure={handleToggleSecure} />}
            </div>
        </div>
    );
};
