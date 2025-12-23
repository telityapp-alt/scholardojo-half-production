import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Flag, Clock, Check, Building2, Globe, GraduationCap, Link2 } from 'lucide-react';
import { QuestCard } from '../types';

interface QuestCardProps {
    quest: QuestCard;
    onClick: () => void;
    onToggleSubtask: (subtaskId: string) => void;
}

export const SortableQuestCard: React.FC<QuestCardProps> = ({ quest, onClick, onToggleSubtask }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ 
        id: quest.id,
        data: { type: 'Quest', quest }
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.3 : 1,
    };

    // Derived State
    const completedTasks = quest.subtasks.filter(t => t.completed).length;
    const totalTasks = quest.subtasks.length;
    const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

    // Helper for Linked Entity Icon
    const renderLinkedIcon = () => {
        if (!quest.linkedEntity) return <Link2 className="w-3 h-3" />;
        switch (quest.linkedEntity.type) {
            case 'CAMPUS': return <Building2 className="w-3 h-3 text-purple-500" />;
            case 'PROGRAM': return <Globe className="w-3 h-3 text-pink-500" />;
            case 'SCHOLARSHIP': return <GraduationCap className="w-3 h-3 text-green-500" />;
            default: return <Link2 className="w-3 h-3 text-slate-400" />;
        }
    };

    return (
        <div 
            ref={setNodeRef} 
            style={style}
            onClick={onClick}
            className="group bg-white rounded-2xl border-2 border-slate-200 border-b-[6px] hover:border-sky-300 hover:border-b-sky-500 active:border-b-2 active:translate-y-[4px] transition-all cursor-pointer relative mb-4 overflow-hidden"
        >
            {/* 1. Header: Title & Drag Handle */}
            <div className="p-4 pb-2 flex justify-between items-start gap-3">
                <div className="flex-1 min-w-0">
                    {/* Linked Entity Badge */}
                    {quest.linkedEntity && (
                        <div className="flex items-center gap-1.5 mb-1.5 opacity-80">
                            {renderLinkedIcon()}
                            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wide truncate">
                                {quest.linkedEntity.name}
                            </span>
                        </div>
                    )}
                    <h4 className="font-black text-slate-700 text-lg leading-tight truncate">{quest.title}</h4>
                </div>
                
                <div {...attributes} {...listeners} className="cursor-grab p-1 text-slate-300 hover:text-slate-500 -mr-2 -mt-2">
                    <GripVertical className="w-5 h-5" />
                </div>
            </div>

            {/* 2. Tasks Preview (Interactive) */}
            {quest.subtasks.length > 0 && (
                <div className="px-4 py-2 space-y-2">
                    {quest.subtasks.slice(0, 3).map(task => (
                        <div 
                            key={task.id} 
                            className="flex items-start gap-2 group/task"
                            onClick={(e) => { e.stopPropagation(); onToggleSubtask(task.id); }}
                        >
                            <div className={`w-4 h-4 rounded border-2 mt-0.5 flex items-center justify-center transition-colors shrink-0 ${
                                task.completed 
                                ? 'bg-green-500 border-green-500' 
                                : 'border-slate-300 bg-white group-hover/task:border-sky-400'
                            }`}>
                                {task.completed && <Check className="w-3 h-3 text-white stroke-[4px]" />}
                            </div>
                            <span className={`text-xs font-bold leading-tight ${task.completed ? 'text-slate-400 line-through' : 'text-slate-600'}`}>
                                {task.text}
                            </span>
                        </div>
                    ))}
                    {quest.subtasks.length > 3 && (
                        <p className="text-[10px] font-black text-slate-400 pl-6">+{quest.subtasks.length - 3} more...</p>
                    )}
                </div>
            )}

            {/* 3. Footer: Metadata */}
            <div className="px-4 py-3 mt-2 flex items-center justify-between border-t-2 border-slate-100 bg-slate-50/50">
                <div className={`flex items-center gap-1.5 px-2 py-1 rounded-lg border-2 text-[10px] font-black uppercase ${
                    quest.priority === 'High' ? 'bg-red-50 text-red-500 border-red-100' :
                    quest.priority === 'Medium' ? 'bg-orange-50 text-orange-500 border-orange-100' :
                    'bg-slate-100 text-slate-500 border-slate-200'
                }`}>
                    <Flag className="w-3 h-3 fill-current" /> {quest.priority}
                </div>

                {quest.deadline && (
                    <div className="flex items-center gap-1 text-slate-400 text-[10px] font-black uppercase">
                        <Clock className="w-3 h-3" />
                        {new Date(quest.deadline).toLocaleDateString(undefined, {month:'short', day:'numeric'})}
                    </div>
                )}
            </div>
            
            {/* 4. Progress Bar (Visual Flair) */}
            {totalTasks > 0 && (
                <div className="h-1.5 w-full bg-slate-100 relative">
                    <div 
                        className="h-full bg-[#58cc02] transition-all duration-500 ease-out" 
                        style={{width: `${progress}%`}}
                    ></div>
                </div>
            )}
        </div>
    );
};