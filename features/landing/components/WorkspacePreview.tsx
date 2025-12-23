
import React, { useState } from 'react';
import { ClipboardList, Map, Calendar, CheckCircle2, Circle, ArrowRight, Lock, Flag, Crown, Star, Clock } from 'lucide-react';

export const WorkspacePreview: React.FC = () => {
    const [activeTool, setActiveTool] = useState<'QUEST' | 'MAP' | 'PLAN'>('QUEST');
    const [completedTasks, setCompletedTasks] = useState<string[]>(['t1']);
    
    const toggleTask = (id: string) => {
        if (completedTasks.includes(id)) {
            setCompletedTasks(completedTasks.filter(t => t !== id));
        } else {
            setCompletedTasks([...completedTasks, id]);
        }
    };

    return (
        <section className="py-24 px-6 bg-white border-b-4 border-slate-200 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-2 rounded-full border-b-4 border-slate-700 shadow-xl mb-6">
                        <span className="animate-pulse">⚡</span>
                        <span className="font-black text-xs uppercase tracking-widest">The Workspace Engine</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-slate-800 mb-6 tracking-tight leading-tight">
                        Your Personal <span className="text-indigo-500 underline decoration-4 underline-offset-4 decoration-indigo-200">War Room.</span>
                    </h2>
                    <p className="text-xl font-bold text-slate-400 max-w-2xl mx-auto">
                        We don't just give you a list. We give you a military-grade command center to organize, strategize, and execute your winning campaign.
                    </p>
                </div>

                {/* Main Interactive Interface */}
                <div className="bg-slate-50 rounded-[40px] border-4 border-slate-200 p-2 md:p-4 shadow-2xl relative">
                    
                    {/* Toolbar */}
                    <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 sticky top-0 z-20 pt-4">
                        {[
                            { id: 'QUEST', label: 'Quest Board', icon: ClipboardList, color: 'bg-sky-500', border: 'border-sky-700' },
                            { id: 'MAP', label: 'Strategy Map', icon: Map, color: 'bg-purple-500', border: 'border-purple-700' },
                            { id: 'PLAN', label: 'Master Plan', icon: Calendar, color: 'bg-pink-500', border: 'border-pink-700' }
                        ].map(tool => (
                            <button
                                key={tool.id}
                                onClick={() => setActiveTool(tool.id as any)}
                                className={`
                                    px-6 py-4 rounded-2xl font-black uppercase text-xs md:text-sm tracking-widest flex items-center gap-3 transition-all border-b-[6px] active:border-b-0 active:translate-y-[6px]
                                    ${activeTool === tool.id 
                                        ? `${tool.color} ${tool.border} text-white shadow-lg scale-105` 
                                        : 'bg-white border-slate-200 text-slate-400 hover:bg-slate-100'
                                    }
                                `}
                            >
                                <tool.icon className={`w-5 h-5 ${activeTool === tool.id ? 'text-white' : 'text-slate-400'}`} strokeWidth={3} />
                                {tool.label}
                            </button>
                        ))}
                    </div>

                    {/* Interactive Area */}
                    <div className="bg-white rounded-[32px] border-2 border-slate-200 border-b-[8px] min-h-[500px] p-6 md:p-10 relative overflow-hidden">
                        
                        {activeTool === 'QUEST' && (
                            <div className="animate-in fade-in zoom-in-95 duration-500 h-full flex flex-col">
                                <div className="flex justify-between items-center mb-8">
                                    <div>
                                        <h3 className="text-3xl font-black text-slate-700 mb-1">Harvard Application</h3>
                                        <p className="text-sky-500 font-bold text-sm uppercase tracking-wider">Priority: High</p>
                                    </div>
                                    <div className="bg-sky-100 text-sky-600 px-4 py-2 rounded-xl font-black text-xs uppercase border-2 border-sky-200">
                                        {Math.round((completedTasks.length / 3) * 100)}% Done
                                    </div>
                                </div>

                                <div className="space-y-4 max-w-2xl mx-auto w-full">
                                    {[
                                        { id: 't1', text: "Request Official Transcripts", tag: "Admin" },
                                        { id: 't2', text: "Draft 'Leadership' Essay (500w)", tag: "Writing" },
                                        { id: 't3', text: "Email Professor for Reference", tag: "Social" }
                                    ].map(task => (
                                        <div 
                                            key={task.id}
                                            onClick={() => toggleTask(task.id)}
                                            className={`
                                                group flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all active:scale-95
                                                ${completedTasks.includes(task.id) 
                                                    ? 'bg-green-50 border-green-200 opacity-70' 
                                                    : 'bg-white border-slate-200 hover:border-sky-300 hover:shadow-md'
                                                }
                                            `}
                                        >
                                            <div className={`
                                                w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-colors
                                                ${completedTasks.includes(task.id) ? 'bg-green-500 border-green-500' : 'bg-white border-slate-300 group-hover:border-sky-400'}
                                            `}>
                                                {completedTasks.includes(task.id) && <CheckCircle2 className="w-5 h-5 text-white stroke-[4px]" />}
                                            </div>
                                            <div className="flex-1">
                                                <p className={`font-bold text-lg ${completedTasks.includes(task.id) ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                                                    {task.text}
                                                </p>
                                            </div>
                                            <span className="text-[10px] font-black text-slate-300 uppercase bg-slate-100 px-2 py-1 rounded-lg">
                                                {task.tag}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-auto pt-10 text-center">
                                    <p className="text-slate-400 font-bold text-sm mb-4">Click tasks to complete them. Feel the dopamine?</p>
                                    <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden border-2 border-slate-200 max-w-md mx-auto">
                                        <div 
                                            className="h-full bg-[#58cc02] transition-all duration-500 ease-out" 
                                            style={{ width: `${(completedTasks.length / 3) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTool === 'MAP' && (
                            <div className="animate-in fade-in zoom-in-95 duration-500 h-full flex flex-col items-center justify-center relative">
                                <div className="absolute top-6 left-6 bg-purple-100 text-purple-600 px-4 py-2 rounded-xl font-black text-xs uppercase border-2 border-purple-200">
                                    Chevening Roadmap
                                </div>

                                <div className="relative flex flex-col items-center gap-8 py-10">
                                    <div className="absolute top-10 bottom-10 left-1/2 w-2 bg-slate-200 -translate-x-1/2 -z-10 rounded-full"></div>

                                    {[
                                        { icon: Star, label: "Eligibility", status: "completed", color: "bg-green-500" },
                                        { icon: Lock, label: "Networking Essay", status: "active", color: "bg-white border-purple-500 text-purple-500" },
                                        { icon: Crown, label: "Interview Boss", status: "locked", color: "bg-slate-200 text-slate-400" }
                                    ].map((node, i) => (
                                        <div key={i} className="flex items-center gap-6 w-64 group cursor-pointer hover:scale-105 transition-transform">
                                            <div className={`
                                                w-20 h-20 rounded-full border-4 flex items-center justify-center shadow-xl z-10
                                                ${node.color} ${node.status === 'completed' ? 'border-green-600' : node.status === 'active' ? 'border-purple-200' : 'border-slate-300'}
                                            `}>
                                                <node.icon className="w-8 h-8 stroke-[3px]" />
                                            </div>
                                            <div className="bg-white p-3 rounded-2xl border-2 border-slate-200 border-b-4 shadow-sm">
                                                <p className="font-black text-slate-700 text-sm">{node.label}</p>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{node.status}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-slate-400 font-bold text-sm mt-4">Visual path to victory. Never get lost.</p>
                            </div>
                        )}

                        {activeTool === 'PLAN' && (
                            <div className="animate-in fade-in zoom-in-95 duration-500 h-full">
                                <div className="flex justify-between items-end mb-6">
                                    <h3 className="text-3xl font-black text-slate-700">October 2025</h3>
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                                        <span className="text-xs font-bold text-slate-400">Deadline</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-7 gap-2 md:gap-4 mb-4">
                                    {['S','M','T','W','T','F','S'].map((d,i) => (
                                        <div key={i} className="text-center font-black text-slate-300 text-xs">{d}</div>
                                    ))}
                                    {Array.from({length: 21}).map((_, i) => {
                                        const day = i + 1;
                                        const isDeadline = day === 15;
                                        const isToday = day === 12;
                                        return (
                                            <div 
                                                key={i} 
                                                className={`
                                                    aspect-square rounded-xl border-2 flex flex-col items-center justify-center relative cursor-pointer hover:scale-105 transition-all
                                                    ${isToday ? 'bg-slate-800 border-slate-900 text-white' : 'bg-white border-slate-200 text-slate-600'}
                                                    ${isDeadline ? 'bg-red-50 border-red-200' : ''}
                                                `}
                                            >
                                                <span className="font-bold text-sm">{day}</span>
                                                {isDeadline && <div className="w-2 h-2 bg-red-500 rounded-full mt-1 animate-pulse"></div>}
                                            </div>
                                        )
                                    })}
                                </div>
                                
                                <div className="bg-white border-2 border-slate-200 border-b-[6px] p-4 rounded-2xl flex items-center gap-4">
                                    <div className="bg-red-100 text-red-500 p-3 rounded-xl">
                                        <Flag className="w-6 h-6 stroke-[3px]" />
                                    </div>
                                    <div>
                                        <p className="font-black text-slate-700">Fulbright Submission</p>
                                        <p className="text-xs font-bold text-slate-400 flex items-center gap-1">
                                            <Clock className="w-3 h-3" /> Due in 3 days
                                        </p>
                                    </div>
                                    <button className="ml-auto bg-slate-100 text-slate-400 px-4 py-2 rounded-xl font-black text-xs uppercase hover:bg-slate-200">
                                        View
                                    </button>
                                </div>
                            </div>
                        )}

                    </div>

                    {/* Footer for the Tool Window */}
                    <div className="mt-8 text-center">
                        <p className="text-slate-500 font-bold text-lg mb-6">
                            ...and that's just the beginning. 
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            {['AI Essay Writer', 'Interview Simulator', 'CV Analysis', 'Budget Calculator', 'Scholarship Matcher'].map((feature, i) => (
                                <span key={i} className="px-4 py-2 bg-white rounded-xl border-2 border-slate-200 font-bold text-slate-400 text-xs uppercase tracking-widest shadow-sm">
                                    {feature}
                                </span>
                            ))}
                            <span className="px-4 py-2 bg-slate-100 rounded-xl border-2 border-slate-200 font-black text-slate-400 text-xs uppercase tracking-widest">
                                +10 More
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};
