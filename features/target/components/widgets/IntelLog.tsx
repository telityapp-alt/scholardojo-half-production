
import React from 'react';
import { FileText, CheckCircle2, Database, Activity, Scale, GraduationCap, Briefcase, Lock } from 'lucide-react';
import { UserFoundation } from '../../../melytics/types';

interface IntelLogProps {
    foundation: UserFoundation;
}

export const IntelLog: React.FC<IntelLogProps> = ({ foundation }) => {
    // Calculate Strength based on field completion
    const fieldCount = foundation.fields.filter(f => !!f.value).length;
    const totalFields = foundation.fields.length || 1;
    const strengthScore = Math.min(100, Math.round((fieldCount / totalFields) * 100));

    // Extract key stats for visual
    const gpa = foundation.fields.find(f => f.key.toLowerCase().includes('gpa'))?.value || 'N/A';
    const level = foundation.fields.find(f => f.category === 'Academic')?.value || 'N/A';
    const focus = foundation.fields.find(f => f.category === 'Skills')?.value || 'General';

    return (
        <div className="space-y-6 animate-in slide-in-from-bottom-8 duration-700">
            <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-slate-800 rounded-xl text-white">
                    <Database className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight italic">Ranking Factors</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* 1. OPERATOR STATS */}
                <div className="bg-white p-6 rounded-[32px] border-2 border-slate-200 border-b-[8px] flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 border-2 border-indigo-200">
                            <Activity className="w-5 h-5 stroke-[3px]" />
                        </div>
                        <div>
                            <h4 className="font-black text-slate-700 text-sm uppercase tracking-wide">Operator Matrix</h4>
                            <p className="text-[10px] font-bold text-slate-400">Hard Stats</p>
                        </div>
                    </div>

                    <div className="space-y-4 flex-1">
                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border-2 border-slate-100">
                            <div className="flex items-center gap-3">
                                <Scale className="w-4 h-4 text-slate-400" />
                                <span className="font-bold text-slate-600 text-sm uppercase">GPA</span>
                            </div>
                            <span className="font-black text-slate-800 text-lg">{gpa}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border-2 border-slate-100">
                            <div className="flex items-center gap-3">
                                <GraduationCap className="w-4 h-4 text-slate-400" />
                                <span className="font-bold text-slate-600 text-sm uppercase">Focus</span>
                            </div>
                            <span className="font-black text-slate-800 text-sm uppercase truncate max-w-[100px]">{focus}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border-2 border-slate-100">
                            <div className="flex items-center gap-3">
                                <Briefcase className="w-4 h-4 text-slate-400" />
                                <span className="font-bold text-slate-600 text-sm uppercase">Status</span>
                            </div>
                            <span className="font-black text-slate-800 text-sm truncate max-w-[120px]">{level}</span>
                        </div>
                    </div>
                </div>

                {/* 2. PROFILE STRENGTH */}
                <div className="bg-white p-6 rounded-[32px] border-2 border-slate-200 border-b-[8px] flex flex-col h-full relative overflow-hidden">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-green-600 border-2 border-green-200">
                            <CheckCircle2 className="w-5 h-5 stroke-[3px]" />
                        </div>
                        <div>
                            <h4 className="font-black text-slate-700 text-sm uppercase tracking-wide">Signal Weight</h4>
                            <p className="text-[10px] font-bold text-slate-400">Match Accuracy</p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center py-4">
                        <div className="relative w-32 h-32 flex items-center justify-center mb-4">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="64" cy="64" r="56" stroke="#f1f5f9" strokeWidth="12" fill="transparent" />
                                <circle 
                                    cx="64" cy="64" r="56" 
                                    stroke={strengthScore > 80 ? '#22c55e' : strengthScore > 50 ? '#eab308' : '#ef4444'} 
                                    strokeWidth="12" 
                                    fill="transparent" 
                                    strokeDasharray={351}
                                    strokeDashoffset={351 - (351 * strengthScore) / 100}
                                    strokeLinecap="round"
                                    className="transition-all duration-1000 ease-out"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-3xl font-black text-slate-800">{strengthScore}</span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase">Score</span>
                            </div>
                        </div>
                        <p className="text-center text-xs font-bold text-slate-500 max-w-[200px] leading-relaxed">
                            {strengthScore > 70 
                                ? "Profile provides a strong signal for the ranking algorithm." 
                                : "Fill more Melytics fields to improve match reliability."}
                        </p>
                    </div>
                </div>

                {/* 3. LOG HISTORY */}
                <div className="bg-slate-900 p-6 rounded-[32px] border-b-[8px] border-slate-950 flex flex-col h-full text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10"><Lock className="w-32 h-32" /></div>
                    <div className="relative z-10 flex flex-col h-full">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white border border-white/20">
                                <FileText className="w-5 h-5 stroke-[3px]" />
                            </div>
                            <div>
                                <h4 className="font-black text-white text-sm uppercase tracking-wide">Arena Intel</h4>
                                <p className="text-[10px] font-bold text-slate-400">Battle Logs</p>
                            </div>
                        </div>
                        <div className="space-y-3 flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-700">
                            {foundation.arenaLogs.length === 0 ? (
                                <div className="text-center py-8 opacity-50"><p className="text-xs font-bold uppercase tracking-widest">Logs Empty</p></div>
                            ) : (
                                foundation.arenaLogs.map((log) => (
                                    <div key={log.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
                                        <div className="w-2 h-2 rounded-full bg-sky-500"></div>
                                        <p className="text-xs font-bold text-slate-200 truncate flex-1">{log.targetTitle}</p>
                                        <span className="text-[10px] font-black uppercase text-slate-500">{log.performanceLabel}</span>
                                    </div>
                                ))
                            )}
                        </div>
                        <div className="pt-4 mt-auto border-t border-white/10">
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest text-center">Encryption Enabled</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
