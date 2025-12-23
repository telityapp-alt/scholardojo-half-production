
import React from 'react';
import { CurriculumDetail } from '../../../curriculum/components/CurriculumDetail';
import { Target, Map as MapIcon, ShieldCheck } from 'lucide-react';

export const RoadmapTab: React.FC<{ programId: string }> = ({ programId }) => {
    return (
        <div className="space-y-12 animate-in zoom-in-95 duration-500">
            {/* Roadmap Strategy Intro */}
            <div className="bg-white p-8 rounded-[40px] border-2 border-slate-200 border-b-[12px] flex flex-col md:flex-row items-center gap-8 shadow-sm">
                <div className="w-16 h-16 bg-sky-100 rounded-[24px] flex items-center justify-center text-sky-600 border-b-4 border-sky-200 shrink-0">
                    <MapIcon size={32} strokeWidth={2.5} />
                </div>
                <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight italic">Mission Academy</h3>
                    <p className="text-slate-500 font-bold text-base leading-relaxed">
                        Complete these structured academy units to maximize your suitablity matrix before entering the Arena.
                    </p>
                </div>
                <div className="px-6 py-3 bg-[#58cc02] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest border-b-4 border-[#46a302] shadow-lg flex items-center gap-2">
                    <ShieldCheck size={14} /> Path Verified
                </div>
            </div>

            {/* Injected Master Curriculum */}
            <CurriculumDetail injectedId={programId} hideHeader={true} />
        </div>
    );
};
