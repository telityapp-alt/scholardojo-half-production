
import React, { useState } from 'react';
import { SkillMaster, SkillStep } from '../types';
import { X, Star, Lock, Trophy, Zap, GraduationCap, ChevronRight, Target } from 'lucide-react';
import { SkillService } from '../services/skillService';
import { SkillSession } from './SkillSession';

interface SkillPathProps {
    skill: SkillMaster;
    onClose: () => void;
}

export const SkillPath: React.FC<SkillPathProps> = ({ skill, onClose }) => {
    const progress = SkillService.getProgress(skill.id);
    const [activeStep, setActiveStep] = useState<SkillStep | null>(null);
    const [hoveredStepId, setHoveredStepId] = useState<string | null>(null);

    const getStepStatus = (stepId: string) => {
        if (progress.completedStepIds.includes(stepId)) return 'COMPLETED';
        const allSteps = skill.units.flatMap(u => u.steps);
        const currentIndex = allSteps.findIndex(s => s.id === stepId);
        if (currentIndex === 0) return 'AVAILABLE';
        const prevStep = allSteps[currentIndex - 1];
        if (progress.completedStepIds.includes(prevStep.id)) return 'AVAILABLE';
        return 'LOCKED';
    };

    const ICONS: any = { Zap, Star, User: GraduationCap, Shield: Target };

    if (activeStep) {
        return (
            <SkillSession 
                skillId={skill.id} 
                step={activeStep} 
                onClose={() => setActiveStep(null)} 
                onComplete={() => {
                    SkillService.completeStep(skill.id, activeStep.id);
                    setActiveStep(null);
                }} 
            />
        );
    }

    return (
        <div className="h-full flex flex-col bg-white border-l-4 border-slate-200 animate-in slide-in-from-right duration-500 overflow-hidden relative">
            {/* Header Area */}
            <div className="p-6 border-b-2 border-slate-100 flex items-center justify-between bg-white shrink-0 z-10">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-sky-50 rounded-2xl border-2 border-sky-100 flex items-center justify-center overflow-hidden">
                        <img src={skill.image} className="w-8 h-8 object-contain" alt="" />
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-slate-800 leading-none">{skill.title}</h2>
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mt-1">
                            {progress.completedStepIds.length} / {skill.units.flatMap(u => u.steps).length} Mastered
                        </p>
                    </div>
                </div>
                <button onClick={onClose} className="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all text-slate-400 hover:text-slate-600 flex items-center justify-center border-b-4 border-slate-200 active:translate-y-[2px] active:border-b-2">
                    <X size={20} strokeWidth={4} />
                </button>
            </div>

            {/* Path Content */}
            <div className="flex-1 overflow-y-auto px-6 py-8 scrollbar-hide bg-slate-50/50 relative">
                <div className="max-w-md mx-auto space-y-20 pb-20">
                    {skill.units.map((unit, uIdx) => (
                        <div key={unit.id} className="relative flex flex-col items-center">
                            
                            {/* UNIT HEADER */}
                            <div 
                                className="w-full p-6 rounded-[32px] border-b-[8px] text-white mb-16 shadow-lg relative overflow-hidden group"
                                style={{ backgroundColor: unit.color, borderBottomColor: 'rgba(0,0,0,0.15)' }}
                            >
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none group-hover:scale-110 transition-transform"></div>
                                <div className="relative z-10">
                                    <p className="text-[9px] font-black uppercase tracking-[0.3em] opacity-80 mb-1">Unit {uIdx + 1}</p>
                                    <h3 className="text-xl font-black uppercase tracking-tight leading-none mb-2">{unit.title}</h3>
                                    <p className="font-bold text-xs opacity-90 leading-tight line-clamp-2">{unit.description}</p>
                                </div>
                                <div className="absolute top-1/2 -translate-y-1/2 -right-4 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                                    <Trophy size={80} />
                                </div>
                            </div>

                            {/* SNAKE PATH */}
                            <div className="space-y-10 w-full flex flex-col items-center">
                                {unit.steps.map((step, sIdx) => {
                                    const status = getStepStatus(step.id);
                                    const Icon = ICONS[step.icon] || Zap;
                                    
                                    const offsets = [0, -40, 0, 40];
                                    const xOffset = offsets[sIdx % 4];

                                    return (
                                        <div 
                                            key={step.id} 
                                            className="relative flex flex-col items-center transition-all z-10"
                                            style={{ transform: `translateX(${xOffset}px)` }}
                                            onMouseEnter={() => setHoveredStepId(step.id)}
                                            onMouseLeave={() => setHoveredStepId(null)}
                                        >
                                            {/* TOOLTIP */}
                                            {hoveredStepId === step.id && (
                                                <div className="absolute bottom-[115%] w-60 bg-slate-800 text-white p-4 rounded-[28px] shadow-2xl animate-in zoom-in-95 duration-200 z-[100] border-2 border-slate-700">
                                                    <h5 className="font-black text-[10px] uppercase tracking-widest text-sky-400 mb-1">{step.title}</h5>
                                                    <p className="text-[11px] font-bold leading-relaxed text-slate-300">{step.teaser}</p>
                                                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-[10px] border-transparent border-t-slate-800"></div>
                                                </div>
                                            )}

                                            {/* STEP BUTTON */}
                                            <button
                                                onClick={() => status !== 'LOCKED' && setActiveStep(step)}
                                                disabled={status === 'LOCKED'}
                                                className={`
                                                    relative w-20 h-20 rounded-full border-b-[10px] flex items-center justify-center shadow-md transition-all
                                                    ${status === 'LOCKED' 
                                                        ? 'bg-slate-200 border-slate-300 text-slate-400 grayscale' 
                                                        : status === 'COMPLETED'
                                                        ? 'bg-yellow-400 border-yellow-600 text-white hover:-translate-y-1 hover:border-b-[12px]'
                                                        : 'bg-[#58cc02] border-[#46a302] text-white hover:brightness-110 active:border-b-0 active:translate-y-[10px]'}
                                                `}
                                            >
                                                <Icon size={32} strokeWidth={4} className={status === 'AVAILABLE' ? 'animate-bounce-slow' : ''} />
                                                
                                                {status === 'AVAILABLE' && (
                                                    <div className="absolute -inset-4 rounded-full border-4 border-[#58cc02] border-dashed animate-spin-slow opacity-20 pointer-events-none"></div>
                                                )}

                                                {status === 'LOCKED' && (
                                                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1.5 border-2 border-slate-200 shadow-sm">
                                                        <Lock size={10} className="text-slate-300" strokeWidth={4} />
                                                    </div>
                                                )}
                                            </button>

                                            <p className={`mt-3 font-black text-[9px] uppercase tracking-widest ${status === 'LOCKED' ? 'text-slate-300' : 'text-slate-700'}`}>
                                                {step.title}
                                            </p>

                                            {status === 'AVAILABLE' && !hoveredStepId && (
                                                <div className="absolute -top-12 bg-[#1cb0f6] text-white px-4 py-1.5 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl animate-bounce border-b-4 border-sky-700">
                                                    START
                                                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-[#1cb0f6]"></div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            {uIdx < skill.units.length - 1 && (
                                <div className="w-1 h-20 bg-slate-200 my-12 rounded-full"></div>
                            )}
                        </div>
                    ))}

                    {/* MASTERY PINNACLE */}
                    <div className="text-center pt-16">
                        <div className="relative inline-block group">
                            <div className="w-28 h-28 bg-white rounded-[40px] border-4 border-slate-200 border-b-[10px] flex items-center justify-center mx-auto shadow-xl transition-all group-hover:border-yellow-300 group-hover:border-b-yellow-500">
                                <Trophy size={56} className="text-slate-200 group-hover:text-yellow-400 group-hover:scale-110 transition-all duration-1000" strokeWidth={2} />
                            </div>
                        </div>
                        <h4 className="mt-6 font-black text-slate-400 uppercase tracking-[0.4em] text-[10px]">Peak of Mastery</h4>
                    </div>
                </div>
            </div>
        </div>
    );
};
