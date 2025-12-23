
import React, { useState, useEffect, useRef } from 'react';
import { 
    Swords, Bot, User, Zap, Trophy, Heart, 
    MessageSquare, Sparkles, ChevronRight, Play, 
    X, Camera, Mic, ShieldCheck, Activity, Award,
    Volume2, VolumeX, AudioLines
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MelyticsService } from '../../melytics/services/melyticsService';
import { DomainType } from '../../../core/contracts/entityMap';
import { BattleAnalytics } from './BattleAnalytics';

const BATTLE_SCRIPT = [
    {
        round: 1,
        bossTalk: "So, you want the Global Excellence Scholarship? Start simple: Why should we invest in YOU specifically?",
        options: [
            { 
                text: "I have the highest GPA and I'm very hardworking.", 
                damage: 10, 
                bossReaction: "GPA is just a number here, Ninja. Give me more soul!",
                weaknesses: ["Generic answer", "Lacks specific impact data"],
                improvements: ["Quantify your results", "Connect personal values to the host mission"]
            },
            { 
                text: "My project in rural AI irrigation solved actual problems for 50 farmers.", 
                damage: 30, 
                bossReaction: "Impressive strike! Real impact is what we crave.",
                weaknesses: [],
                improvements: ["Continue citing specific numbers"]
            }
        ]
    },
    {
        round: 2,
        bossTalk: "Many have impact. But tell me about a time you FAILED. Did you crumble or evolve?",
        options: [
            { 
                text: "I never really fail because I plan everything perfectly.", 
                damage: 5, 
                bossReaction: "Dishonesty! Everyone fails. That's a weak defense.",
                weaknesses: ["Lack of self-awareness", "Defensive attitude"],
                improvements: ["Learn to embrace vulnerability", "Practice the STAR method for failure stories"]
            },
            { 
                text: "My first startup failed in 3 months. I learned that I ignored user feedback.", 
                damage: 35, 
                bossReaction: "CRITICAL HIT! Vulnerability is the mark of a leader.",
                weaknesses: [],
                improvements: ["Focus on the 'lessons learned' transition"]
            }
        ]
    },
    {
        round: 3,
        bossTalk: "Final Strike: If you win this loot, how will you expand the Dojo's footprint in your home country?",
        options: [
            { 
                text: "I will get a high-paying job and donate to the Dojo.", 
                damage: 15, 
                bossReaction: "Money is cheap. Influence is expensive.",
                weaknesses: ["Short-term thinking", "Lacks scalability"],
                improvements: ["Propose a systemic multiplier effect"]
            },
            { 
                text: "I will build a local mentor network to help 100 more Ninjas reach this Arena.", 
                damage: 40, 
                bossReaction: "THE ULTIMATE BLOW! You are a true Grandmaster.",
                weaknesses: [],
                improvements: ["Elaborate on the network infrastructure"]
            }
        ]
    }
];

interface ArenaDemoProps {
    onExit: () => void;
}

export const ArenaDemo: React.FC<ArenaDemoProps> = ({ onExit }) => {
    const [step, setStep] = useState(0); 
    const [bossHp, setBossHp] = useState(100);
    const [userHp, setUserHp] = useState(100);
    const [history, setHistory] = useState<{ role: 'boss' | 'ninja', text: string, score?: number, weaknesses?: string[], improvements?: string[] }[]>([]);
    const [showResults, setShowResults] = useState(false);
    const [isBossAttacking, setIsBossAttacking] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isBossSpeaking, setIsBossSpeaking] = useState(false);

    const speak = (text: string) => {
        if (isMuted) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(v => v.name.includes('Google US English') || v.lang === 'en-US');
        if (preferredVoice) utterance.voice = preferredVoice;
        utterance.rate = 0.95; 
        utterance.pitch = 0.8; 
        utterance.onstart = () => setIsBossSpeaking(true);
        utterance.onend = () => setIsBossSpeaking(false);
        window.speechSynthesis.speak(utterance);
    };

    useEffect(() => {
        const intro = BATTLE_SCRIPT[0].bossTalk;
        setHistory([{ role: 'boss', text: intro }]);
        const timer = setTimeout(() => speak(intro), 1000);
        return () => {
            clearTimeout(timer);
            window.speechSynthesis.cancel();
        };
    }, []);

    const handleStrike = (option: any) => {
        if (isBossAttacking) return;
        setHistory(prev => [...prev, { role: 'ninja', text: option.text }]);
        setIsBossAttacking(true);
        setTimeout(() => {
            setBossHp(prev => Math.max(0, prev - option.damage));
            
            const bossEntry = { 
                role: 'boss' as const, 
                text: option.bossReaction, 
                score: option.damage,
                weaknesses: option.weaknesses,
                improvements: option.improvements
            };
            
            setHistory(prev => [...prev, bossEntry]);
            speak(option.bossReaction);
            
            if (step === BATTLE_SCRIPT.length - 1) {
                setTimeout(() => {
                    const finalHistory = [...history, { role: 'ninja', text: option.text }, bossEntry];
                    const bossOnly = finalHistory.filter(h => h.role === 'boss' && h.score !== undefined);
                    const scores = bossOnly.map(h => h.score || 0);
                    const avg = scores.reduce((a, b) => a + b, 0) / (scores.length || 1);
                    
                    MelyticsService.addArenaLog(DomainType.SCHOLAR, {
                        id: `demo-${Date.now()}`,
                        date: new Date().toISOString(),
                        targetTitle: "Harvard Demo Simulation",
                        difficulty: 'ELITE',
                        avgScore: avg,
                        totalDamage: 100 - (bossHp - option.damage),
                        performanceLabel: avg > 30 ? 'Elite' : 'Solid',
                        bossFeedback: option.bossReaction,
                        strengths: ["Strong opening", "Clear impact numbers"],
                        weaknesses: bossOnly.flatMap(h => h.weaknesses || []),
                        improvementSteps: bossOnly.flatMap(h => h.improvements || [])
                    }, {
                        technical: avg * 0.8,
                        resilience: 15,
                        fit: avg * 0.5
                    });

                    setShowResults(true);
                }, 2000);
            } else {
                setTimeout(() => {
                    const nextStep = step + 1;
                    setStep(nextStep);
                    const nextTalk = BATTLE_SCRIPT[nextStep].bossTalk;
                    setHistory(prev => [...prev, { role: 'boss', text: nextTalk }]);
                    speak(nextTalk);
                    setIsBossAttacking(false);
                }, 2500);
            }
        }, 800);
    };

    if (showResults) {
        return (
            <BattleAnalytics 
                domain={DomainType.SCHOLAR}
                history={history}
                targetTitle="Harvard Demo Simulation"
                difficulty="ELITE"
                onExit={onExit}
            />
        );
    }

    return (
        <div className="fixed inset-0 z-[9999] bg-slate-900 flex flex-col p-4 md:p-8 overflow-hidden animate-in fade-in zoom-in duration-500">
            {/* HUD */}
            <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row gap-6 mb-8 relative z-50">
                <div className="flex-1 bg-black/40 backdrop-blur-xl p-6 rounded-[32px] border-2 border-white/10 border-b-[8px] relative overflow-hidden group">
                    <div className="flex justify-between items-end mb-3">
                        <div className="flex items-center gap-3">
                            <div className={`w-12 h-12 bg-red-500 rounded-xl border-b-4 border-red-800 flex items-center justify-center text-white shadow-lg ${isBossSpeaking ? 'animate-bounce' : ''}`}>
                                <Bot size={24} />
                            </div>
                            <div>
                                <h4 className="font-black text-white text-sm uppercase tracking-widest flex items-center gap-2">
                                    Harvard Gatekeeper
                                    {isBossSpeaking && <AudioLines className="w-4 h-4 text-red-400 animate-pulse" />}
                                </h4>
                                <p className="text-[10px] font-bold text-red-400 uppercase">Boss Level: Elite</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <button onClick={() => setIsMuted(!isMuted)} className="p-2 text-white/50 hover:text-white">
                                {isMuted ? <VolumeX size={20}/> : <Volume2 size={20}/>}
                            </button>
                            <span className="font-black text-white text-2xl">{bossHp}%</span>
                        </div>
                    </div>
                    <div className="h-4 bg-slate-800 rounded-full overflow-hidden p-1 border border-white/5">
                        <div className="h-full bg-gradient-to-r from-red-600 to-orange-400 rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(239,68,68,0.5)]" style={{ width: `${bossHp}%` }} />
                    </div>
                </div>

                <div className="flex-1 bg-white/10 backdrop-blur-xl p-6 rounded-[32px] border-2 border-white/10 border-b-[8px]">
                    <div className="flex justify-between items-end mb-3">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-[#58cc02] rounded-xl border-b-4 border-[#46a302] flex items-center justify-center text-white shadow-lg">
                                <User size={24} />
                            </div>
                            <div>
                                <h4 className="font-black text-white text-sm uppercase tracking-widest">You (Trial Ninja)</h4>
                                <p className="text-[10px] font-bold text-green-400 uppercase">Demo Simulation</p>
                            </div>
                        </div>
                        <span className="font-black text-white text-2xl">{userHp}%</span>
                    </div>
                    <div className="h-4 bg-slate-800 rounded-full overflow-hidden p-1 border border-white/5">
                        <div className="h-full bg-gradient-to-r from-green-500 to-lime-300 rounded-full transition-all duration-1000" style={{ width: `${userHp}%` }} />
                    </div>
                </div>
            </div>

            {/* Battle Stage */}
            <div className="max-w-6xl mx-auto w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch overflow-hidden">
                <div className="lg:col-span-5 flex flex-col gap-6">
                    <div className="flex-1 bg-slate-950 rounded-[40px] border-b-[16px] border-black relative overflow-hidden group shadow-2xl">
                         <div className="w-full h-full flex flex-col items-center justify-center text-slate-800">
                             <User size={120} strokeWidth={1} className="opacity-20 mb-4 group-hover:scale-110 transition-transform duration-1000" />
                             <p className="font-black text-[10px] uppercase tracking-[0.4em] text-slate-600">Simulated Link Active</p>
                         </div>
                         {isBossSpeaking && (
                             <div className="absolute inset-0 flex items-center justify-center z-15 pointer-events-none">
                                 <div className="flex items-end gap-1 h-20">
                                     {[1,2,3,4,5,6,7,8].map(i => (
                                         <div key={i} className="w-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.5)]" style={{ height: `${20 + Math.random() * 80}%`, animationDelay: `${i * 0.1}s` }} />
                                     ))}
                                 </div>
                             </div>
                         )}
                         <div className="absolute top-6 left-6 z-20 flex items-center gap-3">
                             <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                             <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 font-black text-[9px] text-white uppercase tracking-[0.2em]">DEMO BROADCAST</div>
                         </div>
                    </div>
                    <button onClick={onExit} className="py-4 bg-white/5 hover:bg-white/10 text-slate-500 font-black uppercase text-xs tracking-[0.3em] rounded-2xl border-2 border-white/5 transition-all">
                        Abort Simulation
                    </button>
                </div>

                <div className="lg:col-span-7 flex flex-col bg-white rounded-[40px] border-b-[16px] border-slate-200 overflow-hidden shadow-2xl animate-in slide-in-from-right duration-700">
                    <div className="bg-slate-50 p-4 border-b-2 border-slate-100 flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse"></div>
                            <span className="font-black text-[10px] uppercase tracking-widest text-slate-400">Tactical Feed • Round {step + 1}</span>
                         </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                         {history.map((m, i) => (
                             <div key={i} className={`flex ${m.role === 'boss' ? 'justify-start' : 'justify-end'} animate-in fade-in slide-in-from-bottom-2`}>
                                 <div className={`max-w-[85%] p-5 rounded-[28px] border-2 border-b-[6px] shadow-lg ${m.role === 'boss' ? 'bg-slate-900 border-black text-white rounded-tl-none' : 'bg-[#1cb0f6] border-[#1899d6] text-white rounded-tr-none'}`}>
                                     {m.score !== undefined && (
                                         <div className="mb-2 inline-flex items-center gap-1.5 bg-red-500 text-white px-2 py-0.5 rounded-lg text-[8px] font-black uppercase border-b-2 border-red-800 shadow-md">
                                             <Zap size={10} fill="currentColor" /> {m.score} DMG Hit
                                         </div>
                                     )}
                                     <p className="font-bold text-base leading-relaxed">{m.text}</p>
                                 </div>
                             </div>
                         ))}
                    </div>

                    <div className="p-6 bg-slate-50 border-t-2 border-slate-100">
                        <div className="space-y-3">
                            <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Choose Your Strike</p>
                            <div className="grid grid-cols-1 gap-3">
                                {BATTLE_SCRIPT[step].options.map((opt, i) => (
                                    <button 
                                        key={i}
                                        onClick={() => handleStrike(opt)}
                                        disabled={isBossAttacking}
                                        className="group w-full text-left bg-white p-5 rounded-2xl border-2 border-slate-200 border-b-[6px] hover:border-sky-400 hover:border-b-sky-600 hover:bg-sky-50 transition-all active:translate-y-[4px] flex items-center justify-between gap-4 disabled:opacity-50"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-sky-500 group-hover:text-white border-b-2">
                                                <Swords size={20} strokeWidth={2.5} />
                                            </div>
                                            <span className="font-bold text-slate-700 text-sm">{opt.text}</span>
                                        </div>
                                        <div className="shrink-0 flex items-center gap-1.5 bg-red-50 text-red-500 px-3 py-1 rounded-lg border border-red-100 font-black text-[10px] uppercase">
                                            <Zap size={10} fill="currentColor" /> {opt.damage} DMG
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
