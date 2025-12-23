
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DndContext, DragEndEvent, DragOverlay, PointerSensor, useSensor, useSensors, closestCorners } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { Column } from './Column';
import { QuestModal } from './QuestModal';
import { SortableQuestCard } from './QuestCard';
import { QuestAnalytics } from './QuestAnalytics';
import { QuestColumn, QuestCard } from '../types';
import { Plus } from 'lucide-react';
import { DuoButton } from '../../../components/DuoButton';
import { DomainType } from '../../../core/contracts/entityMap';
import { getQuestsByDomain, createQuest, updateQuest, deleteQuest } from '../../../core/access/questAccess';
import { ProgressionService } from '../../../core/services/progressionService';
import { REWARDS } from '../../../core/engines/levelEngine';
import confetti from 'canvas-confetti';

const DEFAULT_COLUMNS: QuestColumn[] = [
    { id: 'todo', title: 'To Do', color: 'sky' },
    { id: 'progress', title: 'In Progress', color: 'orange' },
    { id: 'done', title: 'Done', color: 'green' }
];

export const QuestView: React.FC = () => {
    const { domain } = useParams<{ domain: string }>();
    const currentDomain = Object.values(DomainType).find(d => d === domain) as DomainType || DomainType.STUDENT;

    const [columns, setColumns] = useState<QuestColumn[]>(DEFAULT_COLUMNS);
    const [quests, setQuests] = useState<QuestCard[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeQuest, setActiveQuest] = useState<QuestCard | null>(null);
    const [activeColumnId, setActiveColumnId] = useState<string>('todo');
    const [activeDragQuest, setActiveDragQuest] = useState<QuestCard | null>(null);

    useEffect(() => {
        setQuests(getQuestsByDomain(currentDomain));
    }, [currentDomain]);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveDragQuest(null);
        if (!over) return;

        const activeQuest = quests.find(q => q.id === active.id);
        if (!activeQuest) return;

        if (columns.some(c => c.id === over.id)) {
            if (activeQuest.columnId !== over.id) {
                const updated = { ...activeQuest, columnId: over.id as string };
                setQuests(prev => prev.map(q => q.id === active.id ? updated : q));
                updateQuest(updated);

                // REAL XP GAIN ON 'DONE'
                if (over.id === 'done') {
                    ProgressionService.addXP(currentDomain, REWARDS.QUEST_COMPLETED);
                    ProgressionService.addGems(currentDomain, 5);
                    confetti({ particleCount: 40, spread: 40, origin: { y: 0.8 }, colors: ['#58cc02'] });
                }
            }
            return;
        }
        
        const overQuest = quests.find(q => q.id === over.id);
        if (overQuest) {
            const activeIndex = quests.findIndex(q => q.id === active.id);
            const overIndex = quests.findIndex(q => q.id === over.id);
            if (quests[activeIndex].columnId !== quests[overIndex].columnId) {
                const updated = { ...quests[activeIndex], columnId: quests[overIndex].columnId };
                setQuests(prev => {
                    const next = [...prev];
                    next[activeIndex] = updated;
                    return arrayMove(next, activeIndex, overIndex);
                });
                updateQuest(updated);
                if (updated.columnId === 'done') {
                    ProgressionService.addXP(currentDomain, REWARDS.QUEST_COMPLETED);
                    ProgressionService.addGems(currentDomain, 5);
                }
            } else {
                setQuests(prev => arrayMove(prev, activeIndex, overIndex));
            }
        }
    };

    const handleToggleSubtask = (qId: string, sId: string) => {
        setQuests(prev => prev.map(q => {
            if (q.id === qId) {
                const sub = q.subtasks.find(s => s.id === sId);
                const updated = {
                    ...q,
                    subtasks: q.subtasks.map(s => s.id === sId ? { ...s, completed: !s.completed } : s)
                };
                updateQuest(updated);
                // REAL MICRO-XP GAIN
                if (!sub?.completed) ProgressionService.addXP(currentDomain, REWARDS.SUBTASK_COMPLETED);
                return updated;
            }
            return q;
        }));
    };

    const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

    return (
        <div className="flex flex-col pb-32">
            <div className="flex justify-between items-center mb-6 shrink-0">
                <div>
                    <h2 className="text-3xl font-black text-slate-700">Quest Board</h2>
                    <p className="text-slate-400 font-bold text-sm">Actionable tasks for {currentDomain}.</p>
                </div>
                <DuoButton onClick={() => setColumns([...columns, { id: `c-${Date.now()}`, title: 'New', color: 'pink' }])} variant="secondary" themeColor="slate" startIcon={Plus}>
                    New Column
                </DuoButton>
            </div>

            <DndContext sensors={sensors} collisionDetection={closestCorners} onDragStart={(e) => setActiveDragQuest(quests.find(q => q.id === e.active.id) || null)} onDragEnd={handleDragEnd}>
                <div className="overflow-x-auto pb-4">
                    <div className="flex h-[600px] gap-6 px-1">
                        {columns.map(col => (
                            <Column 
                                key={col.id}
                                column={col}
                                quests={quests.filter(q => q.columnId === col.id)}
                                onAddQuest={() => { setActiveColumnId(col.id); setActiveQuest(null); setIsModalOpen(true); }}
                                onDeleteColumn={() => setColumns(columns.filter(c => c.id !== col.id))}
                                onCardClick={(q) => { setActiveQuest(q); setIsModalOpen(true); }}
                                onToggleSubtask={handleToggleSubtask}
                            />
                        ))}
                    </div>
                </div>
                <DragOverlay>{activeDragQuest ? <SortableQuestCard quest={activeDragQuest} onClick={() => {}} onToggleSubtask={() => {}} /> : null}</DragOverlay>
            </DndContext>

            <QuestAnalytics quests={quests} />

            <QuestModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                quest={activeQuest}
                columnId={activeColumnId}
                onSave={(q) => {
                    const withDomain = { ...q, domain: currentDomain };
                    if (quests.some(ex => ex.id === q.id)) updateQuest(withDomain); else createQuest(withDomain);
                    setQuests(getQuestsByDomain(currentDomain));
                    setIsModalOpen(false);
                }}
                onDelete={(id) => { deleteQuest(id); setQuests(quests.filter(q => q.id !== id)); }}
            />
        </div>
    );
};
