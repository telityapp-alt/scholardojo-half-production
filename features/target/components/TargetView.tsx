
import React from 'react';
import { Target, ArrowRight, TrendingUp, Plus, Sparkles, ShieldCheck } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { AdmissionService } from '../../admission/services/admissionService';
import { DomainType } from '../../../core/contracts/entityMap';
import { getDemoDataByDomain } from '../mock/demoData';

interface TargetViewProps {
    onNavigate: (path: string) => void;
}

export const TargetView: React.FC<TargetViewProps> = ({ onNavigate }) => {
    const { domain } = useParams<{ domain: string }>();
    const domainEnum = (domain as DomainType) || DomainType.STUDENT;
    const apps = AdmissionService.getApps(domainEnum); 
    const demoData = getDemoDataByDomain(domainEnum);

    const isIntern = domainEnum === DomainType.INTERN;

    return (
        <div className="animate-in fade-in pb-20">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3">
                        <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-red-200">
                            <Target className="w-6 h-6 stroke-[3px]" />
                        </div>
                        Target Command
                    </h1>
                    <p className="text-slate-400 font-bold text-lg mt-1">Select an active campaign to strategize.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                
                {/* 1. DYNAMIC DEMO CARD */}
                <div 
                    onClick={() => onNavigate(`/${domain}/workspace/target/demo-room`)}
                    className="group bg-white rounded-[32px] border-4 border-indigo-400 border-b-[8px] p-6 cursor-pointer hover:-translate-y-2 hover:shadow-xl transition-all active:border-b-4 active:translate-y-[4px] relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 bg-indigo-500 text-white px-4 py-1 rounded-bl-2xl font-black text-xs uppercase tracking-widest z-20 flex items-center gap-1"><Sparkles className="w-3 h-3 fill-current" /> Demo</div>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <div className="flex justify-between items-start mb-6 relative z-10">
                        <div className="w-16 h-16 bg-indigo-100 rounded-2xl border-2 border-indigo-200 flex items-center justify-center p-2 shadow-sm">
                            <ShieldCheck className="w-8 h-8 text-indigo-600" />
                        </div>
                        <div className="bg-slate-900 text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase border border-slate-700 mt-8">
                            {isIntern ? 'Career Track' : 'Fellowship'}
                        </div>
                    </div>
                    <h3 className="text-xl font-black text-slate-800 mb-2 leading-tight group-hover:text-indigo-600 transition-colors relative z-10">
                        {demoData.scholarship.name}
                    </h3>
                    <div className="space-y-3 relative z-10 mb-6">
                        <div className="flex items-center justify-between text-xs font-bold text-slate-400 bg-slate-50 p-2 rounded-xl border border-slate-100">
                            <span className="flex items-center gap-1"><TrendingUp className="w-3 h-3" /> Win Prob.</span>
                            <span className="text-yellow-500 font-black">{demoData.prediction.score}%</span>
                        </div>
                    </div>
                    <div className="pt-4 border-t-2 border-slate-100 flex items-center justify-between group-hover:border-indigo-200 transition-colors relative z-10">
                        <span className="text-xs font-black text-slate-300 uppercase tracking-widest group-hover:text-indigo-400">Enter Simulation</span>
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center group-hover:bg-indigo-50 group-hover:text-white transition-all text-indigo-600"><ArrowRight className="w-4 h-4 stroke-[3px]" /></div>
                    </div>
                </div>

                {/* 2. REAL USER APPS */}
                {apps.map(app => (
                    <div key={app.id} onClick={() => onNavigate(`/${domain}/workspace/target/${app.targetId}`)} className="group bg-white rounded-[32px] border-2 border-slate-200 border-b-[8px] p-6 cursor-pointer hover:border-red-400 hover:border-b-red-500 transition-all active:border-b-2 active:translate-y-[6px] relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-0 group-hover:opacity-5 transition-opacity"></div>
                        <div className="flex justify-between items-start mb-6 relative z-10">
                            <div className="w-16 h-16 bg-white rounded-2xl border-2 border-slate-100 flex items-center justify-center p-2 shadow-sm"><img src={app.image} alt="" className="w-full h-full object-contain" /></div>
                            <div className="bg-slate-100 text-slate-500 px-3 py-1 rounded-lg text-[10px] font-black uppercase border border-slate-200 group-hover:bg-red-100 group-hover:text-red-600 transition-colors">{app.type}</div>
                        </div>
                        <h3 className="text-xl font-black text-slate-800 mb-2 leading-tight group-hover:text-red-600 transition-colors relative z-10 line-clamp-2">{app.name}</h3>
                        <div className="space-y-3 relative z-10 mb-6">
                            <div className="flex items-center justify-between text-xs font-bold text-slate-400 bg-slate-50 p-2 rounded-xl border border-slate-100">
                                <span className="flex items-center gap-1"><TrendingUp className="w-3 h-3" /> Win Prob.</span>
                                <span className="text-green-500 font-black">~{Math.min(98, 50 + app.progress / 2)}%</span>
                            </div>
                        </div>
                        <div className="pt-4 border-t-2 border-slate-100 flex items-center justify-between group-hover:border-red-100 transition-colors relative z-10">
                            <span className="text-xs font-black text-slate-300 uppercase tracking-widest group-hover:text-red-400">Enter Strategy</span>
                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-all"><ArrowRight className="w-4 h-4 stroke-[3px]" /></div>
                        </div>
                    </div>
                ))}
                
                <button onClick={() => onNavigate(`/${domain}/discovery/vault`)} className="group flex flex-col items-center justify-center rounded-[32px] border-4 border-dashed border-slate-200 hover:border-sky-400 hover:bg-sky-50 transition-all min-h-[280px]">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 group-hover:bg-sky-500 group-hover:text-white transition-colors mb-4"><Plus className="w-8 h-8 stroke-[4px]" /></div>
                    <span className="font-black text-slate-400 uppercase tracking-widest text-sm group-hover:text-sky-600">New Campaign</span>
                </button>
            </div>
        </div>
    );
};
