
import React from 'react';
import { Zap, Shield } from 'lucide-react';

interface ProbabilityEngineProps {
    ratioString: string;
    probability: number;
    difficulty?: string;
}

export const ProbabilityEngine: React.FC<ProbabilityEngineProps> = ({ probability, difficulty = "NORMAL" }) => {
    const getColor = (p: number) => {
        if (p >= 80) return { bg: 'bg-green-500', light: 'bg-green-100', text: 'text-green-600' };
        if (p >= 50) return { bg: 'bg-yellow-400', light: 'bg-yellow-100', text: 'text-yellow-600' };
        return { bg: 'bg-red-500', light: 'bg-red-100', text: 'text-red-500' };
    };
    const theme = getColor(probability);

    return (
        <div className="bg-white rounded-[32px] border-2 border-slate-200 border-b-[8px] p-6 h-full flex flex-col justify-between relative overflow-hidden group hover:border-slate-300 transition-colors">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className={`p-1.5 rounded-lg ${theme.light} ${theme.text}`}><Zap className="w-4 h-4 fill-current stroke-[3px]" /></div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">AI Prediction</span>
                    </div>
                    <h3 className="font-black text-slate-700 text-xl leading-none">Acceptance Odds</h3>
                </div>
                <div className="flex flex-col items-end">
                    <div className="bg-slate-100 px-3 py-1 rounded-xl flex items-center gap-1.5 border border-slate-200 shadow-sm">
                        <Shield size={10} className="text-slate-400" />
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{difficulty}</span>
                    </div>
                </div>
            </div>
            <div className="flex-1 flex flex-col justify-center py-4">
                <div className="flex justify-between items-end mb-2 px-1">
                    <span className={`text-5xl font-black ${theme.text}`}>{probability}%</span>
                    <span className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">Confidence</span>
                </div>
                <div className="h-6 w-full bg-slate-100 rounded-full border-2 border-slate-200 overflow-hidden relative shadow-inner">
                    <div className="absolute inset-0 flex justify-between px-2 items-center z-10 opacity-30">
                        {[...Array(10)].map((_, i) => <div key={i} className="w-0.5 h-2 bg-slate-400 rounded-full"></div>)}
                    </div>
                    <div className={`h-full ${theme.bg} transition-all duration-1000 ease-out relative`} style={{ width: `${probability}%` }}>
                        <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/50"></div>
                    </div>
                </div>
            </div>
            {/* Target Benchmark Removed per Instruction */}
            <div className="mt-auto pt-4 flex items-center justify-center">
                 <p className="text-[8px] font-black text-slate-300 uppercase tracking-[0.3em]">Neural Odds Logic Active</p>
            </div>
        </div>
    );
};
