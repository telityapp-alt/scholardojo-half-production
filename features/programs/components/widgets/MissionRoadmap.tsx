
import React from 'react';
import { Zap, Swords, Trophy, Lock, Check, Star, Fingerprint, FileCheck, User, Cpu, Building } from 'lucide-react';

const ICONS: any = { 
    Zap, Swords, Trophy, Fingerprint, FileCheck, User, Cpu, Building 
};

export const MissionRoadmap: React.FC<{ steps: any[] }> = ({ steps }) => {
    return (
        <div className="flex flex-col items-center py-12 bg-slate-50 rounded-[32px] border-2 border-slate-200 border-b-[8px] relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/az-subtle.png')] opacity-10 pointer-events-none"></div>
            
            <div className="max-w-xs w-full space-y-16 relative z-10">
                {steps.map((step, idx) => {
                    const Icon = ICONS[step.icon] || Star;
                    // Alternating Offsets - Tighter
                    const xOffset = idx % 4 === 0 ? 0 : idx % 4 === 1 ? 40 : idx % 4 === 2 ? 0 : -40;

                    return (
                        <div key={step.id} className="relative flex flex-col items-center">
                            {/* Path Connector Line - Shorter */}
                            {idx < steps.length - 1 && (
                                <div className="absolute top-16 w-1 h-16 bg-slate-200 rounded-full overflow-hidden">
                                    {step.status === 'COMPLETED' && (
                                        <div className="h-full bg-[#58cc02] w-full animate-in slide-in-from-top duration-1000" />
                                    )}
                                </div>
                            )}

                            <div 
                                style={{ transform: `translateX(${xOffset}px)` }}
                                className="relative z-10"
                            >
                                <button
                                    className={`
                                        w-20 h-20 rounded-full border-b-[8px] flex items-center justify-center transition-all shadow-xl relative
                                        ${step.status === 'LOCKED' 
                                            ? 'bg-slate-200 border-slate-300 text-slate-400 cursor-not-allowed' 
                                            : step.status === 'COMPLETED'
                                            ? 'bg-yellow-400 border-yellow-600 text-white hover:brightness-110 active:border-b-0 active:translate-y-[8px]'
                                            : 'bg-[#58cc02] border-[#46a302] text-white animate-pulse-slow hover:brightness-110 active:border-b-0 active:translate-y-[8px]'}
                                    `}
                                >
                                    <Icon size={32} strokeWidth={4} />
                                    
                                    {step.status === 'COMPLETED' && (
                                        <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1.5 border-2 border-slate-200 text-[#58cc02]">
                                            <Check size={14} strokeWidth={5} />
                                        </div>
                                    )}
                                    {step.status === 'LOCKED' && (
                                        <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1.5 border-2 border-slate-200 text-slate-300">
                                            <Lock size={14} strokeWidth={4} />
                                        </div>
                                    )}
                                </button>
                                
                                <div className="absolute top-1/2 -translate-y-1/2 -right-32 w-28 hidden md:block">
                                     <p className={`font-black text-[10px] uppercase tracking-widest leading-tight ${step.status === 'LOCKED' ? 'text-slate-300' : 'text-slate-700'}`}>
                                        {step.title}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            <div className="mt-16 text-center relative z-10">
                <div className="w-24 h-24 bg-white rounded-[32px] border-2 border-slate-200 border-b-[10px] flex items-center justify-center mx-auto shadow-xl group hover:border-yellow-300 transition-all">
                    <Trophy size={40} className="text-slate-200 group-hover:text-yellow-400 transition-all duration-1000" strokeWidth={2.5} />
                </div>
                <p className="mt-5 font-black text-slate-300 uppercase tracking-[0.4em] text-[9px]">Peak Reached</p>
            </div>
        </div>
    );
};
