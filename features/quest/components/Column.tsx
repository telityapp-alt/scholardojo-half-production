import React from 'react';
import { useSortable, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Plus, Trash2 } from 'lucide-react';
import { QuestColumn, QuestCard } from '../types';
import { SortableQuestCard } from './QuestCard';

interface ColumnProps {
    column: QuestColumn;
    quests: QuestCard[];
    onAddQuest: () => void;
    onDeleteColumn: () => void;
    onCardClick: (q: QuestCard) => void;
    onToggleSubtask: (qId: string, sId: string) => void;
}

export const Column: React.FC<ColumnProps> = ({ column, quests, onAddQuest, onDeleteColumn, onCardClick, onToggleSubtask }) => {
    const { setNodeRef } = useSortable({
        id: column.id,
        data: { type: 'Column', column }
    });

    const headerColors: any = {
        sky: 'bg-sky-100 text-sky-600 border-sky-200',
        orange: 'bg-orange-100 text-orange-600 border-orange-200',
        green: 'bg-green-100 text-green-600 border-green-200',
        purple: 'bg-purple-100 text-purple-600 border-purple-200',
        pink: 'bg-pink-100 text-pink-600 border-pink-200',
    };

    return (
        <div ref={setNodeRef} className="flex flex-col min-w-[340px] w-[340px] h-full rounded-[24px] bg-slate-100/80 border-2 border-slate-200/60 p-3">
            {/* Column Header */}
            <div className={`p-4 rounded-2xl border-b-4 mb-3 flex justify-between items-center ${headerColors[column.color] || headerColors.sky}`}>
                <div className="flex items-center gap-2">
                    <span className="font-black text-sm uppercase tracking-wider">{column.title}</span>
                    <span className="bg-white/40 px-2 py-0.5 rounded-md text-xs font-black">{quests.length}</span>
                </div>
                {/* Prevent deleting core columns if needed, logic handled by parent mostly */}
                {column.id !== 'todo' && column.id !== 'done' && (
                    <button onClick={onDeleteColumn} className="p-1.5 hover:bg-white/20 rounded-lg transition-colors text-current">
                        <Trash2 className="w-4 h-4" />
                    </button>
                )}
            </div>

            {/* Droppable Area */}
            <div className="flex-1 overflow-y-auto px-1 pb-4 scrollbar-thin scrollbar-thumb-slate-300">
                <SortableContext items={quests.map(q => q.id)} strategy={verticalListSortingStrategy}>
                    {quests.map(quest => (
                        <SortableQuestCard 
                            key={quest.id} 
                            quest={quest} 
                            onClick={() => onCardClick(quest)}
                            onToggleSubtask={(sId) => onToggleSubtask(quest.id, sId)}
                        />
                    ))}
                </SortableContext>
                
                {/* New "Add Quest" Button Design */}
                <button 
                    onClick={onAddQuest}
                    className="w-full py-4 mt-2 rounded-2xl border-2 border-dashed border-slate-300 text-slate-400 font-black uppercase text-xs tracking-widest hover:border-sky-400 hover:text-sky-500 hover:bg-sky-50/50 transition-all flex items-center justify-center gap-2 group active:scale-[0.98]"
                >
                    <div className="w-6 h-6 rounded-full bg-slate-200 group-hover:bg-sky-200 flex items-center justify-center transition-colors">
                        <Plus className="w-4 h-4 text-white group-hover:text-sky-600 stroke-[4px]" />
                    </div>
                    Add New Quest
                </button>
            </div>
        </div>
    );
};