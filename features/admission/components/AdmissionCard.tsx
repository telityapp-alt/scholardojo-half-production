
import React from 'react';
import { AdmissionApp } from '../types';
import { Target, CheckCircle2, ChevronRight, Clock } from 'lucide-react';

interface AdmissionCardProps {
    app: AdmissionApp;
    onClick: () => void;
}

export const AdmissionCard: React.FC<AdmissionCardProps> = ({ app, onClick }) => {
    const isComplete = app.progress === 100;

    return (
        <div 
            onClick={onClick}
            className={`
                group relative bg-white rounded-[24px] border-2 border-slate-200 border-b-[6px] p-4 cursor-pointer 
                hover:-translate-y-1 hover:border-b-[8px] 
                active:border-b-2 active:translate-y-[4px] 
                transition-all flex flex-col overflow-hidden h-fit
                ${isComplete ? 'border-green-200 border-b-green-400 hover:border-green-400' : 'hover:border-sky-300 hover:border-b-sky-500'}
            `}
        >
            {/* Main Info Row */}
            <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-slate-50 border-2 border-slate-100 p-1.5 flex items-center justify-center shrink-0 group-hover:bg-white transition-colors shadow-sm">
                    <img src={app.image} alt={app.name} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                        <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded-md border ${
                            isComplete ? 'bg-green-100 text-green-700 border-green-200' : 'bg-slate-100 text-slate-500 border-slate-200'
                        }`}>
                            {app.type}
                        </span>
                        {isComplete && <CheckCircle2 size={10} className="text-green-500" strokeWidth={3} />}
                    </div>
                    <h3 className="font-black text-slate-700 text-sm leading-tight truncate group-hover:text-sky-600 transition-colors">
                        {app.name}
                    </h3>
                </div>
            </div>

            {/* Compact Progress Row */}
            <div className="flex items-center gap-4">
                <div className="flex-1">
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-100">
                        <div 
                            className={`h-full rounded-full transition-all duration-1000 ${isComplete ? 'bg-[#58cc02]' : 'bg-[#1cb0f6]'}`} 
                            style={{ width: `${app.progress}%` }}
                        ></div>
                    </div>
                </div>
                <div className="shrink-0 flex items-center gap-1">
                    <span className={`text-[10px] font-black ${isComplete ? 'text-[#58cc02]' : 'text-slate-400'}`}>
                        {app.progress}%
                    </span>
                    <ChevronRight size={14} className="text-slate-300 group-hover:text-sky-500 transition-colors" strokeWidth={3} />
                </div>
            </div>

            {/* Hover Decor */}
            <div className="absolute -bottom-2 -right-2 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
                <Target size={64} strokeWidth={3} />
            </div>
        </div>
    );
};
