
import React from 'react';
import { UnifiedProgram } from '../../types';
import { DomainType } from '../../../../core/contracts/entityMap';
import { Lock, Swords, Sparkles, Rocket } from 'lucide-react';
import { DuoButton } from '../../../../components/DuoButton';
import { ArenaView } from '../../../arena/components/ArenaView';

interface ArenaTabProps {
    program: UnifiedProgram;
    domain: DomainType;
    isSecured: boolean;
    onSecure: () => void;
}

export const ArenaTab: React.FC<ArenaTabProps> = ({ program, domain, isSecured, onSecure }) => {
    
    if (!isSecured) {
        return (
            <div className="relative flex flex-col items-center justify-start pt-32 px-6 pointer-events-auto min-h-[600px]">
                <div className="relative z-10 w-full max-w-sm bg-white rounded-[48px] border-2 border-slate-200 border-b-[16px] p-10 shadow-[0_40px_120px_rgba(0,0,0,0.2)] animate-in zoom-in-95 duration-500">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-24 h-24 bg-red-500 rounded-[32px] border-b-[10px] border-red-700 flex items-center justify-center text-white mb-8 shadow-xl transform -rotate-3 animate-bounce-slow">
                            <Lock size={48} strokeWidth={3} />
                        </div>
                        
                        <h3 className="text-3xl font-black text-slate-800 tracking-tighter mb-3">Arena Locked</h3>
                        <p className="text-slate-500 font-bold text-base mb-8 leading-relaxed">
                            Initialize mission security to calibrate the Boss simulation against this specific program briefing.
                        </p>

                        <div className="w-full bg-slate-50 p-5 rounded-3xl border-2 border-slate-100 flex items-center gap-4 mb-8 text-left group hover:border-red-200 transition-colors">
                            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center text-red-500 border-b-2 border-red-200 shrink-0">
                                <Swords size={20} strokeWidth={3} />
                            </div>
                            <div>
                                <h4 className="font-black text-slate-700 text-[10px] uppercase tracking-widest">Strike Protocol</h4>
                                <p className="text-[11px] font-bold text-slate-400 leading-tight">Boss Level: {program.difficultyLevel}</p>
                            </div>
                        </div>
                        
                        <DuoButton 
                            themeColor="blue" 
                            fullWidth
                            onClick={onSecure}
                            endIcon={Rocket}
                            className="!py-6 !text-lg shadow-2xl shadow-sky-100"
                        >
                            Secure Target
                        </DuoButton>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-20 left-1/2 -translate-x-1/2 -z-10 opacity-[0.03]">
                    <Swords size={400} />
                </div>
            </div>
        );
    }

    return (
        <div className="animate-in fade-in duration-700 space-y-12">
            {/* Header Brief for Arena */}
            <div className="bg-slate-900 rounded-[48px] border-b-[16px] border-black p-8 md:p-12 text-white relative overflow-hidden group shadow-2xl">
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')] opacity-20 pointer-events-none group-hover:scale-110 transition-transform duration-[3000ms]"></div>
                 <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="max-w-xl text-center md:text-left">
                        <div className="inline-flex items-center gap-2 bg-red-500/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-red-500/30 mb-6">
                            <Sparkles className="w-4 h-4 text-red-400 fill-red-400" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-300">Active Encounter</span>
                        </div>
                        <h4 className="text-3xl md:text-5xl font-black tracking-tighter leading-none mb-4 uppercase italic">
                            Mission <span className="text-red-500">Gauntlet</span>
                        </h4>
                        <p className="text-lg font-bold text-slate-400 leading-relaxed italic border-l-4 border-red-500 pl-6">
                            "{program.arenaInstructions || 'Standard interview combat logic loaded. High-pressure evaluation active.'}"
                        </p>
                    </div>
                    <div className="shrink-0 w-24 h-24 bg-red-500 rounded-3xl flex items-center justify-center text-white border-b-8 border-red-700 shadow-xl transform rotate-3 animate-pulse">
                        <Swords size={48} strokeWidth={3} />
                    </div>
                 </div>
            </div>

            {/* INJECTED UNIVERSAL ARENA VIEW - AUTO-LOCKED */}
            <ArenaView lockedProgramId={program.id} />
        </div>
    );
};
