
import React, { useState, useEffect, useRef } from 'react';
import { 
    X, Camera, Mic, MicOff, CameraOff, Send, 
    Bot, Zap, Swords, Trophy, Loader2, Volume2, 
    VolumeX, Activity, ShieldCheck, User, Sparkles, AudioLines,
    Info
} from 'lucide-react';
import { ArenaService } from '../services/arenaService';
import { ArenaDifficulty, ArenaQuestion } from '../types';
import { DomainType, GenericVaultItem, GenericProgram } from '../../../core/contracts/entityMap';
import { CurriculumMaster } from '../../curriculum/types';
import { MelyticsService } from '../../melytics/services/melyticsService';
import { BattleAnalytics } from './BattleAnalytics';
import { ProgressionService } from '../../../core/services/progressionService';
import { REWARDS } from '../../../core/engines/levelEngine';
import confetti from 'canvas-confetti';

// Fix: Defined missing BattleStageProps interface
interface BattleStageProps {
    domain: DomainType;
    difficulty: ArenaDifficulty;
    curriculum: CurriculumMaster;
    targetItem: GenericVaultItem | GenericProgram | null;
    manualObjective: string;
    manualContext: string;
    language: 'en' | 'id';
    voiceEnabled: boolean;
    onExit: () => void;
}

export const BattleStage: React.FC<BattleStageProps> = ({ 
    domain, difficulty, curriculum, targetItem, 
    manualObjective, manualContext, language, voiceEnabled, onExit 
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const recognitionRef = useRef<any>(null);

    const [isListening, setIsListening] = useState(false);
    const [loading, setLoading] = useState(true);
    const [bossHp, setBossHp] = useState(100);
    const [userHp, setUserHp] = useState(100);
    const [currentRound, setCurrentRound] = useState(0);
    const [comboCount, setComboCount] = useState(0);
    const [questions, setQuestions] = useState<ArenaQuestion[]>([]);
    const [history, setHistory] = useState<{ role: 'boss' | 'ninja', text: string, score?: number, weaknesses?: string[], improvements?: string[] }[]>([]);
    const [input, setInput] = useState('');
    const [isEvaluating, setIsEvaluating] = useState(false);
    const [showResults, setShowResults] = useState(false);

    const speak = (text: string) => {
        if (!voiceEnabled) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        const voices = window.speechSynthesis.getVoices();
        const langCode = language === 'id' ? 'id-ID' : 'en-US';
        utterance.voice = voices.find(v => v.lang.startsWith(langCode)) || voices[0];
        utterance.rate = 1.1; 
        window.speechSynthesis.speak(utterance);
    };

    const toggleSpeech = () => {
        if (isListening) { 
            recognitionRef.current?.stop(); 
            setIsListening(false); 
        } else {
            const SpeechRecognitionConstructor = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
            if (!SpeechRecognitionConstructor || typeof SpeechRecognitionConstructor !== 'function') {
                console.warn("Speech recognition not supported in this environment.");
                return;
            }
            
            try {
                const recognition = new SpeechRecognitionConstructor();
                recognition.continuous = true;
                recognition.interimResults = true;
                recognition.lang = language === 'id' ? 'id-ID' : 'en-US';
                recognition.onresult = (e: any) => setInput(Array.from(e.results).map((r: any) => r[0].transcript).join(""));
                recognition.onend = () => setIsListening(false);
                recognitionRef.current = recognition;
                recognition.start();
                setIsListening(true);
            } catch (e) {
                console.error("Failed to initialize speech recognition:", e);
            }
        }
    };

    useEffect(() => {
        const init = async () => {
            setLoading(true);
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                streamRef.current = stream;
                if (videoRef.current) videoRef.current.srcObject = stream;
                const set = await ArenaService.generateBattleSet(domain, curriculum.title, targetItem, manualObjective, manualContext, difficulty, language);
                setQuestions(set);
                const intro = language === 'id' ? "Boss telah memasuki arena. Tunjukkan kemampuanmu!" : "The Boss has entered the arena. Show me your strength!";
                setHistory([{ role: 'boss', text: intro }]);
                speak(intro);
                setLoading(false);
            } catch (err) { onExit(); }
        };
        init();
        return () => {
            streamRef.current?.getTracks().forEach(t => t.stop());
            window.speechSynthesis.cancel();
            recognitionRef.current?.stop();
        };
    }, []);

    const handleSend = async () => {
        if (!input.trim() || isEvaluating) return;
        if (isListening) recognitionRef.current?.stop();
        const userMsg = input;
        setInput('');
        setHistory(prev => [...prev, { role: 'ninja', text: userMsg }]);
        setIsEvaluating(true);
        
        const result = await ArenaService.evaluateAnswer(questions[currentRound].text, userMsg, questions[currentRound].expectedPoints, language);
        
        const isStrongHit = result.score >= 20;
        const newCombo = isStrongHit ? comboCount + 1 : 0;
        setComboCount(newCombo);
        
        if (newCombo >= 2) {
            confetti({ particleCount: 40, spread: 20, colors: ['#fbbf24'], origin: { x: 0.8, y: 0.8 } });
        }

        setBossHp(prev => Math.max(0, prev - result.score));
        
        const multiplier = 1 + (newCombo * 0.2);
        ProgressionService.addXP(domain, Math.round(result.score * REWARDS.ARENA_DAMAGE * multiplier));

        const bossEntry = { role: 'boss' as const, text: result.feedback, score: result.score, weaknesses: result.weaknesses, improvements: result.improvements };
        setHistory(prev => [...prev, bossEntry]);
        speak(result.feedback);
        setIsEvaluating(false);

        if (currentRound < questions.length - 1) {
            setTimeout(() => { 
                setCurrentRound(prev => prev + 1); 
                const nextQ = questions[currentRound + 1]?.text;
                setHistory(prev => [...prev, { role: 'boss', text: nextQ }]);
                speak(nextQ); 
            }, 2500);
        } else {
            setTimeout(() => setShowResults(true), 2500);
        }
    };

    if (loading) return <div className="fixed inset-0 bg-slate-900 z-[9999] flex flex-col items-center justify-center animate-in fade-in duration-1000"><div className="w-32 h-32 bg-white rounded-[40px] border-b-[12px] border-slate-200 flex items-center justify-center text-indigo-600 animate-bounce"><Swords size={64} /></div><h2 className="text-white font-black text-2xl mt-8 tracking-widest uppercase">Preparing Arena...</h2></div>;
    
    if (showResults) return <BattleAnalytics domain={domain} history={history} targetTitle={manualObjective || curriculum.title} difficulty={difficulty} onExit={onExit} />;

    return (
        <div className="fixed inset-0 bg-[#f7f7f7] z-[9999] flex flex-col animate-in slide-in-from-bottom-12">
            <div className="max-w-6xl mx-auto w-full px-4 md:px-8 py-6 grid grid-cols-1 md:grid-cols-2 gap-6 shrink-0">
                <div className="bg-slate-900 p-6 rounded-[32px] border-b-[10px] border-black text-white relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent"></div>
                    <div className="relative z-10 flex justify-between items-center mb-3">
                        <div className="flex items-center gap-3">
                             <div className="w-10 h-10 bg-red-500 rounded-xl border-b-4 border-red-800 flex items-center justify-center shadow-lg"><Bot size={20}/></div>
                             <h4 className="font-black text-xs uppercase tracking-widest">BOSS HP</h4>
                        </div>
                        <span className="text-2xl font-black text-red-500">{bossHp}%</span>
                    </div>
                    <div className="h-4 bg-black rounded-full overflow-hidden p-1 border border-white/5">
                        <div className="h-full bg-gradient-to-r from-red-600 to-orange-400 rounded-full transition-all duration-1000" style={{ width: `${bossHp}%` }}></div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-[32px] border-2 border-slate-200 border-b-[10px] relative overflow-hidden">
                    <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-3">
                             <div className="w-10 h-10 bg-[#58cc02] rounded-xl border-b-4 border-[#46a302] flex items-center justify-center text-white shadow-lg"><User size={20}/></div>
                             <h4 className="font-black text-xs uppercase tracking-widest text-slate-400">YOUR HP</h4>
                        </div>
                        <div className="flex items-center gap-4">
                            {comboCount >= 2 && (
                                <div className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-lg font-black text-[10px] uppercase animate-bounce border-b-2 border-yellow-600">
                                    {comboCount}x COMBO!
                                </div>
                            )}
                            <span className="text-2xl font-black text-slate-700">{userHp}%</span>
                        </div>
                    </div>
                    <div className="h-4 bg-slate-100 rounded-full overflow-hidden p-1 border-2 border-slate-50">
                        <div className="h-full bg-gradient-to-r from-[#58cc02] to-lime-300 rounded-full transition-all duration-1000" style={{ width: `${userHp}%` }}></div>
                    </div>
                </div>
            </div>

            <div className="flex-1 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden px-4 md:px-8 pb-8">
                <div className="lg:col-span-7 bg-white rounded-[40px] border-2 border-slate-200 border-b-[16px] flex flex-col overflow-hidden shadow-xl">
                    <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide bg-slate-50/30">
                         {history.map((m, i) => (
                             <div key={i} className={`flex ${m.role === 'boss' ? 'justify-start' : 'justify-end'}`}>
                                 <div className={`max-w-[85%] p-5 rounded-[28px] border-2 border-b-[6px] shadow-lg ${m.role === 'boss' ? 'bg-slate-900 border-black text-white rounded-tl-none' : 'bg-[#1cb0f6] border-[#1899d6] text-white rounded-tr-none'}`}>
                                     {m.score !== undefined && (
                                         <div className="mb-2 inline-flex items-center gap-1.5 bg-red-500 text-white px-2 py-0.5 rounded-lg text-[8px] font-black uppercase border-b-2 border-red-800">
                                             <Zap size={10} fill="currentColor" /> {m.score} DMG
                                         </div>
                                     )}
                                     <p className="font-bold text-base leading-relaxed">{m.text}</p>
                                 </div>
                             </div>
                         ))}
                         {isEvaluating && (
                            <div className="flex justify-start">
                                <div className="bg-slate-900 border-2 border-black p-4 rounded-2xl rounded-tl-none flex gap-1">
                                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce"></div>
                                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                                </div>
                            </div>
                         )}
                    </div>
                    
                    <div className="p-6 bg-white border-t-2 border-slate-100 flex gap-4">
                        <textarea 
                            value={input} 
                            onChange={e => setInput(e.target.value)} 
                            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                            placeholder="Type your strike..." 
                            className="flex-1 p-5 rounded-2xl border-2 border-slate-200 border-b-[8px] font-bold text-lg outline-none resize-none h-24 focus:border-sky-400 focus:bg-sky-50 transition-all" 
                        />
                        <div className="flex flex-col gap-2">
                             <button 
                                onClick={toggleSpeech} 
                                className={`w-20 flex-1 rounded-[24px] border-b-[8px] flex flex-col items-center justify-center transition-all ${isListening ? 'bg-red-500 border-red-700 text-white animate-pulse' : 'bg-white border-slate-200 text-slate-300 hover:text-sky-500'}`}
                            >
                                <Mic size={32} strokeWidth={3}/>
                            </button>
                            <button 
                                onClick={handleSend}
                                disabled={!input.trim() || isEvaluating}
                                className={`w-20 flex-1 rounded-[24px] border-b-[8px] flex items-center justify-center text-white transition-all ${input.trim() ? 'bg-[#58cc02] border-[#46a302]' : 'bg-slate-200 border-slate-300 opacity-50'}`}
                            >
                                <Send size={24} strokeWidth={3} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-5 flex flex-col gap-6">
                    <div className="flex-1 bg-slate-950 rounded-[48px] border-b-[16px] border-black overflow-hidden relative shadow-2xl group">
                        <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover scale-x-[-1] opacity-80 group-hover:opacity-100 transition-opacity" />
                        
                        <div className="absolute inset-0 pointer-events-none border-[20px] border-black/20"></div>
                        
                        <div className="absolute top-6 left-6 flex items-center gap-3">
                             <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                             <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 font-black text-[9px] text-white uppercase tracking-[0.2em]">COMBAT LINKED</div>
                        </div>

                        <button onClick={onExit} className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-red-500 text-white rounded-2xl backdrop-blur-md transition-all flex items-center justify-center border-b-4 border-black/20 active:translate-y-1">
                            <X size={24} strokeWidth={3} />
                        </button>
                    </div>
                    
                    <div className="bg-white p-6 rounded-[32px] border-2 border-slate-200 border-b-[8px] flex items-center gap-4">
                        <div className="w-12 h-12 bg-sky-100 rounded-2xl flex items-center justify-center text-sky-500 border-b-2 border-sky-100 shrink-0">
                            <Info size={24} />
                        </div>
                        <p className="text-xs font-bold text-slate-500 leading-relaxed italic">
                            "Maintain eye contact with the Boss. It improves your Fit Matrix score in the background."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
