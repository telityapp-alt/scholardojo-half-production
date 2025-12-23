
import React, { useState } from 'react';
import { TargetMilestone } from '../../types';
/* Fix: Added CheckCircle2 to lucide-react imports */
import { 
    BookOpen, Zap, Swords, ShieldCheck, Target, Lock, 
    Check, Star, Fingerprint, FileCheck, ArrowRight, X, Sparkles,
    Brain, Trophy, ExternalLink, CheckCircle2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TargetRoadmapProps {
    milestones: TargetMilestone[];
}

const ICONS: any = { BookOpen, Zap, Swords, ShieldCheck, Target, Fingerprint, FileCheck };

export const TargetRoadmap: React.FC<TargetRoadmapProps> = ({ milestones }) => {
    const navigate = useNavigate();
    const [selectedMilestone, setSelectedMilestone] = useState<TargetMilestone | null>(null);

    return (
        <div className="flex flex-col items-center py-20 bg-slate-50/50 rounded-[40px] border-2 border-slate-200 border-b-[8px] relative overflow-hidden">
            {/* Background Texture for "Map" feeling */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/az-subtle.png')] opacity-20 pointer-events-none"></div>
            
            <div className="max-w-md w-full space-y-16 relative z-10">
                {milestones.map((m, idx) => {
                    const Icon = ICONS[m.icon] || Star;
                    
                    // Snake Pattern: Center -> Left -> Center -> Right
                    const offsets = [0, -60, 0, 60];
                    const xOffset = offsets[idx % 4];

                    return (
                        <div key={m.id} className="relative flex flex-col items-center">
                            {/* Step Bubble */}
                            <div 
                                style={{ transform: `translateX(${xOffset}px)` }}
                                className="relative z-10 group"
                            >
                                <button
                                    onClick={() => setSelectedMilestone(m)}
                                    className={`
                                        w-24 h-24 rounded-full border-b-[10px] flex items-center justify-center transition-all relative shadow-xl
                                        ${m.status === 'LOCKED' 
                                            ? 'bg-slate-200 border-slate-300 text-slate-400 cursor-not-allowed' 
                                            : m.status === 'COMPLETED'
                                            ? 'bg-yellow-400 border-yellow-600 text-white hover:brightness-110 active:border-b-0 active:translate-y-[10px]'
                                            : 'bg-[#58cc02] border-[#46a302] text-white animate-pulse-slow hover:brightness-110 active:border-b-0 active:translate-y-[10px]'}
                                    `}
                                >
                                    <Icon size={40} strokeWidth={3} />
                                    
                                    {m.status === 'COMPLETED' && (
                                        <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-2 border-4 border-slate-200 shadow-sm text-green-500">
                                            <Check size={14} strokeWidth={4} />
                                        </div>
                                    )}
                                    {m.status === 'LOCKED' && (
                                        <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-2 border-4 border-slate-200 shadow-sm text-slate-300">
                                            <Lock size={14} strokeWidth={4} />
                                        </div>
                                    )}
                                </button>
                                
                                <p className={`mt-4 font-black text-xs uppercase tracking-[0.2em] text-center w-32 -ml-4 ${m.status === 'LOCKED' ? 'text-slate-300' : 'text-slate-700'}`}>
                                    {m.title}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            <div className="mt-20 text-center relative z-10">
                <div className="w-28 h-28 bg-white rounded-[48px] border-4 border-slate-200 border-b-[12px] flex items-center justify-center mx-auto shadow-2xl group hover:border-yellow-300 transition-all">
                    <Trophy size={60} className="text-slate-200 group-hover:text-yellow-400 group-hover:scale-110 transition-all duration-1000" strokeWidth={2.5} />
                </div>
                <p className="mt-8 font-black text-slate-300 uppercase tracking-[0.5em] text-[10px]">Ecosystem Peak</p>
            </div>

            {/* INTEGRATED MODAL */}
            {selectedMilestone && (
                <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 animate-in fade-in duration-300">
                    <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={() => setSelectedMilestone(null)}></div>
                    <div className="relative w-full max-w-sm bg-white rounded-[40px] border-4 border-slate-200 border-b-[12px] shadow-2xl overflow-hidden animate-in zoom-in-95">
                        
                        {/* Header Image/Icon */}
                        <div className={`p-8 flex justify-center bg-slate-50 border-b-2 border-slate-100 relative`}>
                            <button onClick={() => setSelectedMilestone(null)} className="absolute top-4 right-4 p-2 text-slate-300 hover:text-slate-600 transition-colors"><X size={24}/></button>
                            <div className={`
                                w-24 h-24 rounded-[32px] border-b-[8px] flex items-center justify-center text-white shadow-xl
                                ${selectedMilestone.status === 'LOCKED' ? 'bg-slate-300 border-slate-400' : 'bg-[#1cb0f6] border-[#1899d6]'}
                            `}>
                                {React.createElement(ICONS[selectedMilestone.icon], { size: 48, strokeWidth: 3 })}
                            </div>
                        </div>

                        <div className="p-8 text-center space-y-4">
                            <h3 className="text-3xl font-black text-slate-800 leading-none">{selectedMilestone.title}</h3>
                            <p className="text-slate-500 font-bold text-base leading-relaxed">
                                {selectedMilestone.desc}
                            </p>
                            
                            <div className="bg-sky-50 rounded-2xl p-4 border-2 border-sky-100 flex items-center gap-3 text-left">
                                <Sparkles className="w-5 h-5 text-sky-500 shrink-0" />
                                <p className="text-[11px] font-bold text-sky-700 leading-tight">
                                    {selectedMilestone.status === 'LOCKED' 
                                        ? "Requirements not met. Complete previous steps to unlock this tactical phase." 
                                        : "Tactical mission ready. Deploy now to progress your target rank."}
                                </p>
                            </div>

                            <button 
                                onClick={() => {
                                    if (selectedMilestone.status !== 'LOCKED') {
                                        if (selectedMilestone.type === 'SUBMIT' && selectedMilestone.linkPath.startsWith('http')) {
                                            window.open(selectedMilestone.linkPath, '_blank');
                                        } else {
                                            navigate(selectedMilestone.linkPath);
                                        }
                                    }
                                }}
                                disabled={selectedMilestone.status === 'LOCKED'}
                                className={`
                                    w-full py-5 rounded-2xl font-black text-lg uppercase tracking-widest border-b-[6px] transition-all flex items-center justify-center gap-3
                                    ${selectedMilestone.status === 'LOCKED' 
                                        ? 'bg-slate-100 text-slate-300 border-slate-200 opacity-50' 
                                        : 'bg-[#58cc02] text-white border-[#46a302] hover:brightness-110 active:border-b-0 active:translate-y-[6px] shadow-xl shadow-green-100'}
                                `}
                            >
                                {selectedMilestone.type === 'SUBMIT' ? <><ExternalLink size={20}/> Go External</> : <><Zap size={20}/> Deploy Phase</>}
                            </button>
                            
                            {selectedMilestone.status === 'COMPLETED' && (
                                <p className="text-green-500 font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-1.5"><CheckCircle2 size={12}/> Mission Accomplished</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};