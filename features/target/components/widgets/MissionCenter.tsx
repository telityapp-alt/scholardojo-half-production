
import React, { useState, useEffect, useCallback } from 'react';
import { TargetAnalysis } from '../../types';
import { AdmissionChecklist } from '../../../admission/components/AdmissionChecklist';
import { CurriculumDetail } from '../../../curriculum/components/CurriculumDetail';
import { QuestModal } from '../../../quest/components/QuestModal';
import { getQuestsByDomain, createQuest, updateQuest } from '../../../../core/access/questAccess';
import { QuestCard } from '../../../quest/types';
import { 
    CheckSquare, Flag, Map, BookOpen, Plus, Zap, Check, ChevronDown
} from 'lucide-react';

type Tab = 'ADMISSION' | 'ROADMAP' | 'QUESTS';

export const MissionCenter: React.FC<{ analysis: TargetAnalysis, onTaskComplete?: () => void }> = ({ analysis, onTaskComplete }) => {
    const [activeTab, setActiveTab] = useState<Tab>('ADMISSION');
    const [quests, setQuests] = useState<QuestCard[]>([]);
    const [isQuestModalOpen, setIsQuestModalOpen] = useState(false);
    
    const targetId = analysis.scholarship.id;
    const domain = (analysis.admissionApp?.domain || 'student') as any;

    const loadQuests = useCallback(() => {
        const all = getQuestsByDomain(domain);
        // Filter quests by program name or targetId match
        setQuests(all.filter(q => 
            q.linkedEntity?.name.toLowerCase().includes(analysis.scholarship.name.toLowerCase()) ||
            q.id.includes(targetId)
        ));
    }, [domain, analysis.scholarship.name, targetId]);

    useEffect(() => {
        loadQuests();
        window.addEventListener('storage', loadQuests);
        return () => window.removeEventListener('storage', loadQuests);
    }, [loadQuests]);

    const TabButton = ({ id, label, icon: Icon }: any) => {
        const isActive = activeTab === id;
        return (
            <button 
                onClick={() => setActiveTab(id)} 
                className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl transition-all border-b-[6px] font-black uppercase text-[10px] tracking-widest
                    ${isActive 
                        ? `bg-white border-slate-200 text-slate-800 shadow-sm translate-y-[-2px]` 
                        : 'bg-transparent border-transparent text-slate-400 hover:bg-slate-100'}`}
            >
                <Icon size={18} strokeWidth={3} className={isActive ? 'text-[#1cb0f6]' : 'text-slate-300'} />
                {label}
            </button>
        );
    };

    return (
        <div className="flex flex-col min-h-[600px] animate-in fade-in duration-500">
            <div className="bg-slate-100 p-1.5 rounded-[32px] border-2 border-slate-200 flex gap-1 mb-8">
                <TabButton id="ADMISSION" label="Objectives" icon={CheckSquare} />
                <TabButton id="ROADMAP" label="Academy" icon={Map} />
                <TabButton id="QUESTS" label="Quests" icon={Flag} />
            </div>

            <div className="flex-1">
                {activeTab === 'ADMISSION' && (
                    <div className="space-y-6 animate-in slide-in-from-left-2">
                        <div className="bg-white rounded-[40px] border-2 border-slate-200 border-b-[12px] p-8 md:p-10 shadow-xl">
                            <AdmissionChecklist targetId={targetId} onProgressUpdate={onTaskComplete} />
                        </div>
                    </div>
                )}

                {activeTab === 'ROADMAP' && (
                    <div className="space-y-6 animate-in zoom-in-95">
                        <CurriculumDetail injectedId={targetId} hideHeader={true} />
                    </div>
                )}

                {activeTab === 'QUESTS' && (
                    <div className="space-y-6 animate-in slide-in-from-right-2">
                         <button 
                            onClick={() => setIsQuestModalOpen(true)} 
                            className="w-full py-6 bg-[#ff9600] text-white rounded-[32px] font-black text-xl border-b-[8px] border-[#cb7700] active:border-b-0 active:translate-y-[8px] transition-all flex items-center justify-center gap-3 shadow-xl"
                        >
                            <Plus size={28} strokeWidth={4} /> Create Side Quest
                        </button>
                        
                        <div className="mt-8 space-y-4">
                            {quests.map(q => (
                                <div key={q.id} className="bg-white p-5 rounded-3xl border-2 border-slate-200 border-b-[6px] flex items-center justify-between group hover:border-sky-300 transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-sky-400 group-hover:bg-sky-500 group-hover:text-white transition-all">
                                            <Flag size={20} strokeWidth={3} />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-slate-700 text-sm">{q.title}</h4>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{q.priority} Priority • {q.subtasks.filter(s => s.completed).length}/{q.subtasks.length} Done</p>
                                        </div>
                                    </div>
                                    <button className="w-10 h-10 rounded-xl bg-slate-50 text-slate-300 flex items-center justify-center group-hover:bg-sky-100 group-hover:text-sky-500 transition-all border-b-2">
                                        <ChevronDown size={18} strokeWidth={3}/>
                                    </button>
                                </div>
                            ))}
                            {quests.length === 0 && (
                                <div className="text-center py-20 bg-slate-50 rounded-[40px] border-4 border-dashed border-slate-100">
                                    <p className="font-black text-slate-300 uppercase tracking-widest text-xs">No Linked Quests Detected</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <QuestModal isOpen={isQuestModalOpen} onClose={() => setIsQuestModalOpen(false)} onSave={(q) => { createQuest({...q, domain}); loadQuests(); setIsQuestModalOpen(false); }} />
        </div>
    );
};
