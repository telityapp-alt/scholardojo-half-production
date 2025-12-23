
import React from 'react';
import { UnifiedProgram } from '../../types';
import { TargetDashboard } from '../../../target/components/TargetDashboard';
import { DomainType } from '../../../../core/contracts/entityMap';
import { Lock, Rocket, Swords, Zap, Activity } from 'lucide-react';
import { DuoButton } from '../../../../components/DuoButton';

interface CommandTabProps {
    program: UnifiedProgram;
    domain: DomainType;
    isSecured: boolean;
    onSecure: () => void;
}

export const CommandTab: React.FC<CommandTabProps> = ({ program, domain, isSecured, onSecure }) => {
    return (
        <div className="relative animate-in fade-in duration-500 min-h-[700px] space-y-12">
            
            {/* FLOATING UNLOCK OVERLAY */}
            {!isSecured && (
                <div className="absolute inset-0 z-[60] flex flex-col items-center justify-start pt-48 px-6 pointer-events-auto">
                    <div className="relative z-10 w-full max-w-sm bg-white rounded-[40px] border-2 border-slate-200 border-b-[12px] p-10 shadow-[0_40px_120px_rgba(0,0,0,0.3)] animate-in slide-in-from-bottom-10 duration-500">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-24 h-24 bg-indigo-500 rounded-[32px] border-b-[10px] border-indigo-700 flex items-center justify-center text-white mb-8 shadow-xl transform rotate-3">
                                <Swords size={48} strokeWidth={3} />
                            </div>
                            
                            <h3 className="text-3xl font-black text-slate-800 tracking-tighter mb-3">Combat Intel Locked</h3>
                            <p className="text-slate-500 font-bold text-base mb-8 leading-relaxed">
                                Gain access to real-time rankings and acceptance probability by securing your ninja status for this target.
                            </p>

                            <div className="w-full grid grid-cols-2 gap-4 mb-8">
                                <div className="p-4 bg-slate-50 rounded-[24px] border-2 border-slate-100 flex flex-col items-center">
                                    <Activity className="w-5 h-5 text-slate-300 mb-2" />
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Rank</span>
                                    <span className="text-2xl font-black text-slate-300">#???</span>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-[24px] border-2 border-slate-100 flex flex-col items-center">
                                    <Zap className="w-5 h-5 text-slate-300 mb-2" />
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Acceptance</span>
                                    <span className="text-2xl font-black text-slate-300">??%</span>
                                </div>
                            </div>
                            
                            <DuoButton 
                                themeColor="indigo" 
                                fullWidth
                                onClick={onSecure}
                                endIcon={Rocket}
                                className="!py-6 !text-lg shadow-2xl shadow-indigo-100"
                            >
                                Unlock Command
                            </DuoButton>
                        </div>
                    </div>
                </div>
            )}

            {/* CONTENT: TARGET DASHBOARD ONLY */}
            <div className={`transition-all duration-1000 ${!isSecured ? 'pointer-events-none select-none opacity-40 blur-[4px]' : ''}`}>
                {/* Dashboard Matrix (Probabilities & Standings) */}
                <TargetDashboard injectedId={program.id} hideHeader={true} />
            </div>
        </div>
    );
};
