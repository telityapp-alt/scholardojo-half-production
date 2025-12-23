
import React from 'react';
import { BrainCircuit, Check, ArrowRight, BookOpen, AlertCircle, Zap, ShieldCheck, Database } from 'lucide-react';
import { TargetAnalysis } from '../../types';

interface ProfileSynapseProps {
    analysis: TargetAnalysis;
}

export const ProfileSynapse: React.FC<ProfileSynapseProps> = ({ analysis }) => {
    const { prediction, scholarship } = analysis;
    const { breakdown } = prediction;

    const BreakdownItem = ({ label, value, boost, icon: Icon, color }: any) => (
        <div className="bg-black/10 backdrop-blur-sm p-3 rounded-2xl border border-white/5 flex items-center justify-between group/item">
            <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl bg-white/10 ${color}`}>
                    <Icon size={14} strokeWidth={3} />
                </div>
                <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-sky-200 leading-none mb-1">{label}</p>
                    <p className="text-xs font-black text-white">{value}</p>
                </div>
            </div>
            <div className="text-right">
                <p className="text-[8px] font-black uppercase text-sky-300 opacity-60">Impact</p>
                <p className="text-xs font-black text-[#58cc02]">+{boost}%</p>
            </div>
        </div>
    );

    return (
        <div className="bg-[#1cb0f6] rounded-[32px] border-b-[8px] border-[#1899d6] p-6 text-white h-full flex flex-col relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')] opacity-10"></div>
            
            <div className="relative z-10 flex justify-between items-start mb-6">
                <div>
                    <div className="flex items-center gap-2 mb-1 text-sky-200">
                        <BrainCircuit className="w-4 h-4 stroke-[3px]" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Synergy Breakdown</span>
                    </div>
                    <h3 className="font-black text-2xl tracking-tighter italic leading-none">Fit Analysis</h3>
                </div>
                <div className="px-3 py-1 bg-white/20 rounded-xl border border-white/30 backdrop-blur-md">
                    <span className="font-black text-[10px] uppercase">Synced</span>
                </div>
            </div>

            <div className="relative z-10 flex-1 space-y-2.5">
                <BreakdownItem 
                    label="Academic Signal" 
                    value={`GPA Threshold: ${scholarship.minGpa}`}
                    boost={breakdown.academicBoost}
                    icon={BookOpen}
                    color="text-yellow-300"
                />
                
                <BreakdownItem 
                    label="Asset Synergy" 
                    value="Dossier Readiness"
                    boost={breakdown.assetBoost}
                    icon={Database}
                    color="text-green-300"
                />

                <BreakdownItem 
                    label="Matrix Power" 
                    value="DNA Alignment"
                    boost={breakdown.matrixBoost}
                    icon={Zap}
                    color="text-orange-300"
                />

                {breakdown.difficultyPenalty < 0 && (
                    <div className="bg-red-500/20 backdrop-blur-sm p-3 rounded-2xl border border-red-400/30 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-red-500/40 text-red-200">
                                <AlertCircle size={14} strokeWidth={3} />
                            </div>
                            <p className="text-[9px] font-black uppercase tracking-widest text-red-200">Global Competition</p>
                        </div>
                        <p className="text-xs font-black text-red-200">{breakdown.difficultyPenalty}%</p>
                    </div>
                )}
            </div>

            <button 
                onClick={() => document.getElementById('mission-dossier-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="relative z-10 w-full mt-6 bg-white text-[#1cb0f6] py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-sky-50 transition-all flex items-center justify-center gap-2 border-b-[5px] border-sky-100 active:border-b-0 active:translate-y-[5px] shadow-xl group/btn"
            >
                Deep Intelligence Report <ArrowRight size={16} strokeWidth={4} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
        </div>
    );
};
