
import React, { useState, useEffect } from 'react';
import { DomainType } from '../../../core/contracts/entityMap';
import { ForgeService, MasterProgram } from '../services/forgeService';
import { 
    X, Info, Key, Target, FileText, ClipboardList, 
    Map, Swords, Save, ArrowLeft, Database, Image as ImageIcon
} from 'lucide-react';

// Modul-Modul Forge
import { BriefForge } from './sections/BriefForge';
import { KeysForge } from './sections/KeysForge';
import { CommandForge } from './sections/CommandForge';
import { ArsenalForge } from './sections/ArsenalForge';
import { AdmissionForge } from './sections/AdmissionForge';
import { RoadmapForge } from './sections/RoadmapForge';
import { ArenaForge } from './sections/ArenaForge';

interface Props {
    id: string;
    domain: DomainType;
    onClose: () => void;
}

export const ProgramForgeContainer: React.FC<Props> = ({ id, domain, onClose }) => {
    const [program, setProgram] = useState<MasterProgram>(() => {
        const existing = ForgeService.getById(id);
        if (existing) return existing;
        return {
            id, domain, title: '', organizer: '', organizerLogo: 'https://cdn-icons-png.flaticon.com/512/1005/1005141.png',
            type: 'Scholarship', level: 'Master', country: 'Global', deadline: '', tier: 'common', difficultyLevel: 'NORMAL', applyUrl: '',
            intel: { description: '', highlights: [], entryCriteria: [], funding: [], strategicWants: [], fundingStatus: 'FULL', weights: { academic: 40, assets: 40, matrix: 20 }, stats: {}, partnerInstitutions: [], timeline: {}, financialValue: {}, obligations: {} },
            shadowProtocol: { expertVerdict: '', lethalMistakes: [], successVault: [], alumniInsights: [], ghostTasks: [] },
            checklist: [], monthlyRoadmap: [], curriculum: null, arenaInstructions: '', battleQuestions: [], _rawMappingHistory: {}
        };
    });

    const [activeTab, setActiveTab] = useState<'BRIEF' | 'KEYS' | 'COMMAND' | 'ARSENAL' | 'ADMISSION' | 'ROADMAP' | 'ARENA'>('BRIEF');

    const updateProgram = (updates: Partial<MasterProgram>) => {
        setProgram(prev => {
            const next = { ...prev, ...updates };
            ForgeService.save(next);
            return next;
        });
    };

    const TABS = [
        { id: 'BRIEF', label: 'Briefing', icon: Info },
        { id: 'KEYS', label: 'Keys', icon: Key },
        { id: 'COMMAND', label: 'Command', icon: Target },
        { id: 'ARSENAL', label: 'Arsenal', icon: FileText },
        { id: 'ADMISSION', label: 'Admission', icon: ClipboardList },
        { id: 'ROADMAP', label: 'Roadmap', icon: Map },
        { id: 'ARENA', label: 'Arena', icon: Swords },
    ];

    return (
        <div className="min-h-screen bg-white flex flex-col animate-in slide-in-from-bottom-4 duration-500">
            {/* Minimalist Header */}
            <header className="p-6 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between sticky top-0 z-50 backdrop-blur-md">
                <div className="flex items-center gap-6">
                    <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-lg text-slate-400 transition-all"><ArrowLeft size={20} /></button>
                    <div>
                        <h1 className="text-xl font-bold text-slate-800">Architect: {program.title || 'Untitled Mission'}</h1>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Protocol Sync • {domain}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={onClose} className="px-6 py-2.5 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 flex items-center gap-2 transition-all">
                        <Save size={16} /> Save & Deploy
                    </button>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Minimalist Sidebar Tabs */}
                <aside className="w-64 border-r border-slate-200 bg-slate-50/30 p-4 space-y-1 overflow-y-auto">
                    <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Mission Nodes</p>
                    {TABS.map(tab => (
                        <button 
                            key={tab.id} 
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id ? 'bg-white border border-slate-200 text-slate-900 shadow-sm' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'}`}
                        >
                            <tab.icon size={16} className={activeTab === tab.id ? 'text-slate-900' : 'text-slate-400'} />
                            {tab.label}
                        </button>
                    ))}
                    
                    <div className="pt-10 space-y-4">
                        <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Base Assets</p>
                        <div className="px-3 space-y-4">
                            <div>
                                <label className="text-[10px] font-bold text-slate-500 block mb-2 uppercase">Organizer Logo</label>
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 border-2 border-slate-200 rounded-lg bg-white p-1 flex items-center justify-center overflow-hidden">
                                        <img src={program.organizerLogo} className="w-full h-full object-contain" />
                                    </div>
                                    <input 
                                        className="flex-1 text-[10px] p-2 bg-white border border-slate-200 rounded-md outline-none" 
                                        placeholder="URL..." 
                                        value={program.organizerLogo}
                                        onChange={e => updateProgram({ organizerLogo: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Content Area */}
                <main className="flex-1 overflow-y-auto p-12 bg-white scrollbar-hide">
                    <div className="max-w-4xl mx-auto space-y-12">
                        {activeTab === 'BRIEF' && <BriefForge program={program} onUpdate={updateProgram} />}
                        {activeTab === 'KEYS' && <KeysForge program={program} onUpdate={updateProgram} />}
                        {activeTab === 'COMMAND' && <CommandForge program={program} onUpdate={updateProgram} />}
                        {activeTab === 'ARSENAL' && <ArsenalForge program={program} onUpdate={updateProgram} />}
                        {activeTab === 'ADMISSION' && <AdmissionForge program={program} onUpdate={updateProgram} />}
                        {activeTab === 'ROADMAP' && <RoadmapForge program={program} onUpdate={updateProgram} />}
                        {activeTab === 'ARENA' && <ArenaForge program={program} onUpdate={updateProgram} />}
                    </div>
                </main>
            </div>
        </div>
    );
};
