
import React from 'react';
import { UnifiedProgram } from '../../types';
import { Check, GraduationCap, CheckCircle2 } from 'lucide-react';
import { DuoButton } from '../../../../components/DuoButton';

interface StrikeTabProps {
    program: UnifiedProgram;
    checklistState: Record<string, boolean>;
    progress: number;
    onToggle: (id: string) => void;
}

export const StrikeTab: React.FC<StrikeTabProps> = ({ program, checklistState, progress, onToggle }) => {
    return (
        <div className="max-w-3xl mx-auto space-y-8 animate-in slide-in-from-right duration-500">
            <div className="bg-white p-8 md:p-10 rounded-[48px] border-2 border-slate-200 border-b-[12px] shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none">
                    <CheckCircle2 size={150} />
                </div>
                
                <div className="flex justify-between items-center mb-10 px-2 relative z-10">
                    <div>
                        <h3 className="text-2xl md:text-3xl font-black text-slate-800 italic uppercase leading-none mb-2">Strike Inventory</h3>
                        <p className="text-slate-400 font-bold text-xs uppercase tracking-widest opacity-80">Mission Asset Synchronization</p>
                    </div>
                    <div className="relative w-16 h-16 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="32" cy="32" r="28" stroke="#f1f5f9" strokeWidth="6" fill="transparent" />
                            <circle 
                                cx="32" cy="32" r="28" 
                                stroke="#58cc02" strokeWidth="6" fill="transparent" 
                                strokeDasharray={176}
                                strokeDashoffset={176 - (176 * progress) / 100}
                                strokeLinecap="round"
                                className="transition-all duration-1000"
                            />
                        </svg>
                        <span className="absolute text-[11px] font-black text-slate-700">{progress}%</span>
                    </div>
                </div>

                <div className="space-y-2 relative z-10">
                    {program.checklist.map((item) => (
                        <div 
                            key={item.id} 
                            onClick={() => onToggle(item.id)} 
                            className={`p-4 rounded-[24px] border-2 border-b-[5px] transition-all cursor-pointer flex items-center justify-between group active:translate-y-[2px] active:border-b-2 ${checklistState[item.id] ? 'bg-green-50 border-green-300 border-b-green-500' : 'bg-white border-slate-200 border-b-slate-300 hover:border-sky-300'}`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-xl border-b-4 flex items-center justify-center transition-all ${checklistState[item.id] ? 'bg-green-500 border-green-700 text-white shadow-lg' : 'bg-slate-50 border-slate-200 text-slate-300 group-hover:text-sky-400 group-hover:bg-white'}`}>
                                    {checklistState[item.id] ? <Check size={20} strokeWidth={5}/> : <GraduationCap size={20} strokeWidth={2.5}/>}
                                </div>
                                <div>
                                    <span className={`font-black text-base ${checklistState[item.id] ? 'text-green-800 line-through opacity-70' : 'text-slate-700'}`}>{item.label}</span>
                                    <div className="flex gap-2 mt-0.5">
                                        <span className="text-[8px] font-black uppercase text-slate-400 tracking-[0.2em]">{item.estimate}</span>
                                        <div className="w-1 h-1 rounded-full bg-slate-200 mt-1"></div>
                                        <span className="text-[8px] font-black uppercase text-sky-400 tracking-[0.2em]">Mandatory</span>
                                    </div>
                                </div>
                            </div>
                            <div className={`w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center ${checklistState[item.id] ? 'bg-green-500 border-green-600 text-white' : 'border-slate-100 bg-slate-50'}`}>
                                {checklistState[item.id] && <Check size={12} strokeWidth={5}/>}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-10 pt-8 border-t-2 border-slate-50">
                    <DuoButton themeColor="blue" variant="secondary" fullWidth className="!py-4 text-[10px] font-black uppercase tracking-[0.3em]">
                        Export Verification Ledger
                    </DuoButton>
                </div>
            </div>
        </div>
    );
};
