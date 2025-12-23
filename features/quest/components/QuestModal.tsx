import React, { useState, useEffect } from 'react';
import { X, Trash2, Plus, Check, Calendar, Building2, Globe, GraduationCap, LayoutTemplate } from 'lucide-react';
import { QuestCard, QuestSubtask } from '../types';

interface QuestModalProps {
    isOpen: boolean;
    onClose: () => void;
    quest?: QuestCard | null;
    columnId?: string;
    onSave: (quest: QuestCard) => void;
    onDelete?: (id: string) => void;
}

export const QuestModal: React.FC<QuestModalProps> = ({ isOpen, onClose, quest, columnId, onSave, onDelete }) => {
    const [formData, setFormData] = useState<Partial<QuestCard>>({
        title: '',
        deadline: '',
        priority: 'Medium',
        linkedEntity: { type: 'CUSTOM', name: '' },
        subtasks: []
    });
    const [newTaskText, setNewTaskText] = useState('');

    useEffect(() => {
        if (quest) {
            setFormData(JSON.parse(JSON.stringify(quest))); // Deep copy
        } else {
            setFormData({
                id: `q-${Date.now()}`,
                columnId: columnId || 'todo',
                title: '',
                deadline: '',
                priority: 'Medium',
                linkedEntity: { type: 'CUSTOM', name: '' },
                subtasks: [],
                tags: []
            });
        }
    }, [quest, columnId, isOpen]);

    if (!isOpen) return null;

    const handleSave = () => {
        if (!formData.title) return;
        onSave(formData as QuestCard);
        onClose();
    };

    const addSubtask = () => {
        if (!newTaskText.trim()) return;
        const newTask: QuestSubtask = { id: `st-${Date.now()}`, text: newTaskText, completed: false };
        setFormData(prev => ({ ...prev, subtasks: [...(prev.subtasks || []), newTask] }));
        setNewTaskText('');
    };

    const toggleSubtask = (id: string) => {
        setFormData(prev => ({
            ...prev,
            subtasks: prev.subtasks?.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
        }));
    };

    const removeSubtask = (id: string) => {
        setFormData(prev => ({
            ...prev,
            subtasks: prev.subtasks?.filter(t => t.id !== id)
        }));
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={onClose}></div>
            
            {/* Main Modal Card */}
            <div className="relative bg-white w-full max-w-lg rounded-[40px] border-2 border-slate-200 border-b-[8px] shadow-2xl p-0 overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
                
                {/* Header */}
                <div className="p-6 bg-slate-50 border-b-2 border-slate-100 flex justify-between items-center shrink-0">
                    <div>
                        <h3 className="font-black text-2xl text-slate-800 tracking-tight">{quest ? 'Edit Quest' : 'New Quest'}</h3>
                        <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">
                            {quest ? 'Update details' : 'Define your objective'}
                        </p>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="w-10 h-10 bg-white border-b-4 border-slate-200 rounded-xl flex items-center justify-center text-slate-400 hover:text-red-500 hover:border-red-200 transition-all active:border-b-0 active:translate-y-[4px]"
                    >
                        <X className="w-6 h-6 stroke-[3px]" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-8 overflow-y-auto flex-1">
                    
                    {/* 1. Title Input */}
                    <div>
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-3 ml-1">Quest Title</label>
                        <input 
                            value={formData.title}
                            onChange={e => setFormData({...formData, title: e.target.value})}
                            placeholder="e.g. Submit Harvard Application"
                            className="w-full p-4 bg-white border-2 border-slate-200 border-b-[6px] rounded-2xl font-black text-xl text-slate-700 outline-none focus:border-sky-500 focus:border-b-[6px] transition-all placeholder:text-slate-300"
                            autoFocus
                        />
                    </div>

                    {/* 2. Linked Entity (Context) */}
                    <div>
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-3 ml-1">Linked To</label>
                        <div className="flex gap-3">
                            <div className="relative w-1/3">
                                <select 
                                    value={formData.linkedEntity?.type}
                                    onChange={(e) => setFormData({
                                        ...formData, 
                                        linkedEntity: { ...formData.linkedEntity!, type: e.target.value as any }
                                    })}
                                    className="w-full p-3 pl-10 bg-slate-50 border-2 border-slate-200 rounded-xl font-bold text-sm text-slate-700 outline-none appearance-none focus:border-sky-500"
                                >
                                    <option value="CUSTOM">Custom</option>
                                    <option value="CAMPUS">Campus</option>
                                    <option value="PROGRAM">Program</option>
                                    <option value="SCHOLARSHIP">Scholarship</option>
                                </select>
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                                    {formData.linkedEntity?.type === 'CAMPUS' ? <Building2 className="w-4 h-4" /> :
                                     formData.linkedEntity?.type === 'PROGRAM' ? <Globe className="w-4 h-4" /> :
                                     formData.linkedEntity?.type === 'SCHOLARSHIP' ? <GraduationCap className="w-4 h-4" /> :
                                     <LayoutTemplate className="w-4 h-4" />}
                                </div>
                            </div>
                            <input 
                                value={formData.linkedEntity?.name}
                                onChange={e => setFormData({...formData, linkedEntity: {...formData.linkedEntity!, name: e.target.value}})}
                                placeholder="Name of Uni or Program..."
                                className="flex-1 p-3 bg-slate-50 border-2 border-slate-200 rounded-xl font-bold text-sm text-slate-700 outline-none focus:border-sky-500"
                            />
                        </div>
                    </div>

                    {/* 3. Details Row (Deadline & Priority) */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-3 ml-1">Deadline</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input 
                                    type="date"
                                    value={formData.deadline || ''}
                                    onChange={e => setFormData({...formData, deadline: e.target.value})}
                                    className="w-full p-3 pl-10 bg-slate-50 border-2 border-slate-200 rounded-xl font-bold text-sm text-slate-700 outline-none focus:border-sky-500"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-3 ml-1">Priority</label>
                            <div className="flex bg-slate-100 p-1 rounded-xl">
                                {['Low', 'Medium', 'High'].map(p => (
                                    <button
                                        key={p}
                                        onClick={() => setFormData({...formData, priority: p as any})}
                                        className={`flex-1 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${
                                            formData.priority === p 
                                            ? 'bg-white text-slate-800 shadow-sm' 
                                            : 'text-slate-400 hover:text-slate-600'
                                        }`}
                                    >
                                        {p}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 4. Subtasks */}
                    <div>
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-3 ml-1">Checklist</label>
                        <div className="space-y-3 mb-4">
                            {formData.subtasks?.map(task => (
                                <div key={task.id} className="flex items-center gap-3 p-3 bg-white border-2 border-slate-100 rounded-xl hover:border-sky-200 transition-colors group">
                                    <button 
                                        onClick={() => toggleSubtask(task.id)}
                                        className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors shrink-0 ${
                                            task.completed ? 'bg-green-500 border-green-500' : 'border-slate-300 bg-slate-50 group-hover:border-sky-400'
                                        }`}
                                    >
                                        {task.completed && <Check className="w-4 h-4 text-white stroke-[4px]" />}
                                    </button>
                                    <span className={`flex-1 text-sm font-bold ${task.completed ? 'text-slate-400 line-through' : 'text-slate-700'}`}>{task.text}</span>
                                    <button onClick={() => removeSubtask(task.id)} className="text-slate-300 hover:text-red-500 transition-colors p-1">
                                        <X className="w-4 h-4 stroke-[3px]" />
                                    </button>
                                </div>
                            ))}
                        </div>
                        
                        <div className="flex gap-3">
                            <input 
                                value={newTaskText}
                                onChange={e => setNewTaskText(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && addSubtask()}
                                placeholder="Add a subtask..."
                                className="flex-1 p-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-sm font-bold outline-none focus:border-sky-500 placeholder:text-slate-400"
                            />
                            <button 
                                onClick={addSubtask} 
                                className="bg-slate-800 hover:bg-slate-700 text-white p-3 rounded-xl shadow-lg transition-colors active:scale-95"
                            >
                                <Plus className="w-5 h-5 stroke-[3px]" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 bg-slate-50 border-t-2 border-slate-100 flex gap-4 shrink-0">
                    {quest && onDelete && (
                        <button 
                            onClick={() => { onDelete(quest.id); onClose(); }}
                            className="p-4 bg-white text-red-500 rounded-2xl hover:bg-red-50 border-b-4 border-slate-200 hover:border-red-200 active:border-b-0 active:translate-y-[4px] transition-all"
                        >
                            <Trash2 className="w-5 h-5 stroke-[3px]" />
                        </button>
                    )}
                    <button 
                        onClick={handleSave}
                        className="flex-1 py-4 bg-[#1cb0f6] hover:bg-[#1899d6] text-white rounded-2xl font-black text-lg border-b-[6px] border-[#1899d6] active:border-b-0 active:translate-y-[6px] transition-all uppercase tracking-widest shadow-xl shadow-sky-100"
                    >
                        Save Quest
                    </button>
                </div>
            </div>
        </div>
    );
};