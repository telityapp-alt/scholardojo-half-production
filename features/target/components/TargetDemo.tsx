
import React, { useState, useRef, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, RefreshCw, Trophy, MapPin, Target, Sparkles, Check, ArrowUp, Briefcase } from 'lucide-react';
import confetti from 'canvas-confetti';
import { LeaderboardWidget } from './widgets/LeaderboardWidget';
import { ProbabilityEngine } from './widgets/ProbabilityEngine';
import { ProfileSynapse } from './widgets/ProfileSynapse';
import { MissionCenter } from './widgets/MissionCenter';
import { getDemoDataByDomain } from '../mock/demoData';
import { MelyticsService } from '../../melytics/services/melyticsService';
import { DomainType } from '../../../core/contracts/entityMap';

export const TargetDemo: React.FC = () => {
    const { domain } = useParams<{ domain: string }>();
    const navigate = useNavigate();
    const domainEnum = (domain as DomainType) || DomainType.STUDENT;
    
    const baseData = getDemoDataByDomain(domainEnum);
    const [prob, setProb] = useState(baseData.prediction.score);
    const [percentile, setPercentile] = useState(baseData.competition.percentile);
    const [trend, setTrend] = useState<'STABLE' | 'UP'>('STABLE');
    const [isRankUp, setIsRankUp] = useState(false);
    const [rankStage, setRankStage] = useState<'HIDDEN' | 'APPEAR' | 'COUNTING' | 'GLORY'>('HIDDEN');

    const foundation = MelyticsService.getFoundation(domainEnum);
    const timerRef = useRef<any>(null);

    const isIntern = domainEnum === DomainType.INTERN;

    // Simulate Dynamic Analysis State for Demo
    const currentAnalysis = useMemo(() => ({
        ...baseData,
        prediction: {
            ...baseData.prediction,
            score: prob,
            breakdown: {
                academicBoost: Math.round(prob * 0.3),
                assetBoost: Math.round(prob * 0.25),
                matrixBoost: Math.round(prob * 0.25),
                difficultyPenalty: -10
            }
        },
        competition: {
            ...baseData.competition,
            percentile: percentile
        }
    }), [prob, percentile, baseData]);

    const handleTaskComplete = () => {
        setProb(prev => Math.min(99, prev + 15));
        setIsRankUp(true);
        setRankStage('APPEAR');
        setTimeout(() => {
            setRankStage('COUNTING');
            const targetPercentile = Math.max(1, Math.floor(percentile / 5));
            let current = percentile;
            if (timerRef.current) clearInterval(timerRef.current);
            timerRef.current = setInterval(() => {
                const diff = current - targetPercentile;
                const step = Math.max(1, Math.ceil(diff / 5)); 
                current -= step;
                setPercentile(current);
                if (current <= targetPercentile) {
                    clearInterval(timerRef.current);
                    setRankStage('GLORY');
                    setTrend('UP');
                    confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 }, colors: ['#1cb0f6', '#58cc02', '#fbbf24'], zIndex: 9999 });
                }
            }, 50); 
        }, 1500); 
    };

    return (
        <div className="relative animate-in fade-in duration-700 pb-32 max-w-7xl mx-auto px-4">
            <div className="bg-indigo-600 text-white px-4 py-2 text-center font-black text-xs uppercase tracking-widest fixed top-0 left-0 right-0 z-[100] shadow-md flex justify-center items-center gap-2">
                <Sparkles className="w-4 h-4 text-yellow-400 fill-yellow-400" /> Interactive {isIntern ? 'Career' : 'Fellowship'} Demo
            </div>
            
            <div className="flex justify-between items-center mb-8 pt-12">
                <button onClick={() => navigate(`/${domain}/workspace/target`)} className="group flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border-2 border-slate-200 border-b-[5px] text-slate-500 font-black uppercase text-xs tracking-widest hover:bg-slate-50 active:border-b-2">
                    <ArrowLeft size={18} strokeWidth={3} />
                    <span>Exit Demo Room</span>
                </button>
                <button onClick={() => { setProb(baseData.prediction.score); setPercentile(baseData.competition.percentile); setTrend('STABLE'); setRankStage('HIDDEN'); }} className="bg-white p-3 rounded-2xl border-2 border-slate-200 border-b-[5px] text-slate-400 hover:text-sky-500 transition-all">
                    <RefreshCw size={20} strokeWidth={3} />
                </button>
            </div>

            <div className="bg-white rounded-[40px] border-2 border-slate-200 border-b-[8px] p-8 mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-5"><Target size={250} className="text-slate-900" /></div>
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                    <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                            <div className="bg-indigo-500 text-white px-4 py-1.5 rounded-xl text-[10px] font-black uppercase border-b-4 border-indigo-700 shadow-sm flex items-center gap-2">
                                {isIntern ? <Briefcase size={12}/> : <Trophy size={12}/>}
                                {baseData.scholarship.category}
                            </div>
                            <div className="bg-slate-100 text-slate-500 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase border-2 border-slate-200 flex items-center gap-2">
                                <MapPin size={12} />
                                {baseData.scholarship.organization}
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-slate-800 leading-[0.95] tracking-tight mb-2">{baseData.scholarship.name}</h1>
                        <p className="text-slate-400 font-bold text-sm">Simulation Active • {isIntern ? 'Corporate' : 'Grant'} Logic Loaded</p>
                    </div>
                    <div className="flex items-stretch gap-4">
                        <div className="bg-slate-50 px-6 py-4 rounded-3xl border-2 border-slate-200 flex flex-col items-center justify-center min-w-[120px]">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Impact Chance</p>
                            <p className={`text-4xl font-black ${prob > 70 ? 'text-green-500' : 'text-yellow-500'}`}>{prob}%</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className={`transition-all ${isRankUp && rankStage !== 'GLORY' ? 'opacity-20 blur-sm pointer-events-none' : ''}`}>
                    <LeaderboardWidget 
                        user={{ name: foundation.name, avatarSeed: foundation.avatarSeed }} 
                        rank={baseData.competition.userRank} 
                        totalApplicants={baseData.competition.totalApplicants} 
                        percentile={percentile} 
                        standingLabel={percentile <= 10 ? 'Elite Standing' : 'Strong Candidate'}
                        trend={trend} 
                    />
                </div>
                <ProbabilityEngine ratioString={baseData.competition.ratioString} probability={prob} />
                <ProfileSynapse analysis={currentAnalysis} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8">
                    <MissionCenter analysis={currentAnalysis} onTaskComplete={handleTaskComplete} />
                </div>
                <div className="lg:col-span-4">
                    <div className="bg-slate-900 p-8 rounded-[40px] border-b-[12px] border-black text-white relative overflow-hidden group shadow-xl">
                         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-700"></div>
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-[#1cb0f6] rounded-2xl flex items-center justify-center border-b-4 border-[#1899d6] shadow-2xl mb-6">
                                <Sparkles size={32} />
                            </div>
                            <h4 className="font-black text-2xl mb-3 italic">Demo Intelligence</h4>
                            <p className="font-bold text-sky-100 text-sm leading-relaxed mb-6 opacity-90">
                                {isIntern 
                                    ? "Completing the 'Live Code Strike' will simulate a massive rank climb. It represents a 100% technical match."
                                    : "The 'Video Intro' task is high leverage. Try completing items in the Checklist to see the Probability update."}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {isRankUp && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-md animate-in fade-in duration-300"></div>
                    <div className={`relative w-full max-w-sm bg-white rounded-[40px] p-2 shadow-2xl border-4 border-white transition-all duration-700 transform ${rankStage === 'APPEAR' ? 'scale-90' : 'scale-110'}`}>
                        <div className="bg-white rounded-[32px] border-2 border-slate-200 border-b-[8px] p-8 text-center relative overflow-hidden">
                            <h3 className="text-xl font-black text-slate-400 uppercase tracking-widest mb-6">Standing Update</h3>
                            <div className="relative h-32 flex items-center justify-center mb-6">
                                <span className={`text-7xl font-black tracking-tighter ${rankStage === 'GLORY' ? 'text-[#58cc02]' : 'text-slate-800'}`}>Top {percentile}%</span>
                                {rankStage === 'COUNTING' && <ArrowUp className="absolute -right-10 top-1/2 -translate-y-1/2 w-8 h-8 text-green-500 animate-bounce" />}
                            </div>
                            <p className="font-bold text-slate-400 mb-8">{rankStage === 'APPEAR' ? "Analyzing Assets..." : rankStage === 'COUNTING' ? "Surpassing candidates..." : "Elite Status Secured!"}</p>
                            {rankStage === 'GLORY' && <button onClick={() => setIsRankUp(false)} className="w-full py-4 bg-[#58cc02] text-white rounded-2xl font-black text-xl border-b-[6px] border-[#46a302] active:border-b-0 active:translate-y-[6px] transition-all uppercase tracking-widest flex items-center justify-center gap-2"><Check className="w-6 h-6 stroke-[4px]" /> Continue</button>}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
