
import React from 'react';
import { UnifiedProgram } from '../../types';
import { Lock, Rocket, Target, ClipboardList } from 'lucide-react';
import { DuoButton } from '../../../../components/DuoButton';
import { AdmissionChecklist } from '../../../admission/components/AdmissionChecklist';

interface AdmissionTabProps {
    program: UnifiedProgram;
    isSecured: boolean;
    onSecure: () => void;
}

export const AdmissionTab: React.FC<AdmissionTabProps> = ({ program, isSecured, onSecure }) => {
    return (
        <div className="max-w-4xl mx-auto relative animate-in slide-in-from-right duration-500 min-h-[600px]">
            {!isSecured && (
                <div className="absolute inset-x-0 top-0 bottom-0 z-[60] flex flex-col items-center justify-start pt-32 px-6 pointer-events-auto">
                    <div className="relative z-10 w-full max-w-sm bg-white rounded-[40px] border-2 border-slate-200 border-b-[12px] p-10 shadow-[0_40px_100px_rgba(0,0,0,0.3)] animate-in zoom-in-95 duration-300 text-center">
                        <div className="w-24 h-24 bg-yellow-400 rounded-[32px] border-b-[10px] border-yellow-600 flex items-center justify-center text-white mx-auto mb-8 shadow-xl">
                            <Lock size={48} strokeWidth={3} />
                        </div>
                        <h3 className="text-3xl font-black text-slate-800 tracking-tight mb-3">Ledger Locked</h3>
                        <p className="text-slate-500 font-bold text-base mb-8">Secure this target to your Desk to activate the full Strike Registry.</p>
                        <DuoButton themeColor="blue" fullWidth onClick={onSecure} endIcon={Rocket} className="!py-6 shadow-2xl">Secure Target</DuoButton>
                    </div>
                </div>
            )}

            <div className={`space-y-12 transition-all duration-1000 ${!isSecured ? 'pointer-events-none select-none opacity-40 blur-[4px]' : ''}`}>
                <div className="bg-white rounded-[40px] border-2 border-slate-200 border-b-[12px] p-8 md:p-12 shadow-xl">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-14 h-14 bg-indigo-100 rounded-[28px] flex items-center justify-center text-indigo-600 border-b-4 border-indigo-200">
                            <ClipboardList size={32} strokeWidth={3} />
                        </div>
                        <div>
                            <h3 className="text-3xl font-black text-slate-800 italic uppercase tracking-tighter">Full Mission Ledger</h3>
                            <p className="text-slate-400 font-bold text-sm">Unified Strike Objectives</p>
                        </div>
                    </div>
                    <AdmissionChecklist targetId={program.id} />
                </div>
            </div>
        </div>
    );
};
