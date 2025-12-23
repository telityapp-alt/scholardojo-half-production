
import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { DomainType } from '../../../core/contracts/entityMap';
import { 
    Swords, Zap, Target, Search, BookOpen, Play, 
    Sparkles, Briefcase, X, Globe, Mic2, Gamepad2, 
    ShieldCheck, Bot, Database, Lock, PenTool, BrainCircuit,
    Plus, Hammer, Layout, AlertTriangle, ShieldAlert,
    CheckCircle2, Quote, Flame, Star, Gem, FileText,
    Activity
} from 'lucide-react';
import { BattleStage } from './BattleStage';
import { ArenaDemo } from './ArenaDemo';
import { ArenaDifficulty } from '../types';
import { UnifiedProgramService } from '../../programs/services/unifiedProgramService';
import { UnifiedProgram } from '../../programs/types';
import { useLanguage } from '../../../core/hooks/useLanguage';
import { DuoIcon } from '../../../components/ui/DuoIcon';

interface ArenaViewProps {
    lockedProgramId?: string; 
}

export const ArenaView: React.FC<ArenaViewProps> = ({ lockedProgramId }) => {
    const { domain } = useParams<{ domain: string }>();
    const domainEnum = (domain as DomainType) || DomainType.STUDENT;
    const { lang } = useLanguage();
    
    const [gameState, setGameState] = useState<'IDLE' | 'BATTLE' | 'DEMO'>('IDLE');
    
    // Config State
    const [availablePrograms, setAvailablePrograms] = useState<UnifiedProgram[]>([]);
    const [selectedProgram, setSelectedProgram] = useState<UnifiedProgram | null>(null);
    const [isCustomMode, setIsCustomMode] = useState(false);
    
    // Custom Forge State
    const [customTitle, setCustomTitle] = useState('');
    const [customBrief, setCustomBrief] = useState('');
    
    const [difficulty, setDifficulty] = useState<ArenaDifficulty>('BEGINNER');
    const [battleLang, setBattleLang] = useState<'en' | 'id'>(lang === 'id' ? 'id' : 'en');
    const [isVoiceOn, setIsVoiceOn] = useState(true);

    useEffect(() => {
        const load = async () => {
            const all = await UnifiedProgramService.getAll(domainEnum);
            const securedIds = JSON.parse(localStorage.getItem('dojo_secured_missions') || '[]');
            const secured = all.filter(p => securedIds.includes(p.id));
            setAvailablePrograms(secured);

            if (lockedProgramId) {
                const locked = all.find(p => p.id === lockedProgramId);
                if (locked) {
                    setSelectedProgram(locked);
                    setIsCustomMode(false);
                }
            } else if (secured.length > 0) {
                setSelectedProgram(secured[0]);
            } else {
                setIsCustomMode(true);
            }
        };
        load();
    }, [domainEnum, lockedProgramId]);

    const handleStartBattle = () => {
        if (!isCustomMode && !selectedProgram) return;
        if (isCustomMode && (!customTitle || !customBrief)) return;
        setGameState('BATTLE');
    };

    if (gameState === 'DEMO') {
        return <ArenaDemo onExit={() => setGameState('IDLE')} />;
    }

    if (gameState === 'BATTLE') {
        return (
            <BattleStage 
                domain={domainEnum} 
                difficulty={difficulty} 
                curriculum={selectedProgram?.curriculum || { title: 'Custom Training' } as any}
                targetItem={selectedProgram as any}
                manualObjective={isCustomMode ? customTitle : (selectedProgram?.title || '')}
                manualContext={isCustomMode ? customBrief : (selectedProgram?.intel.description || '')}
                language={battleLang}
                voiceEnabled={isVoiceOn}
                onExit={() => setGameState('IDLE')} 
            />
        );
    }

    return (
        <div className="max-w-7xl mx-auto space-y-6 pb-24 animate-in fade-in duration-700 px-4">
            {/* Header Hub - Compact */}
            <div className="bg-slate-900 rounded-[40px] border-b-[12px] border-black p-6 md:p-8 text-white relative overflow-hidden shadow-xl group">
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-[2000ms]"></div>
                 <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-[#1cb0f6] rounded-[24px] flex items-center justify-center border-b-[6px] border-[#1899d6] animate-pulse shadow-xl">
                            <Swords size={32} />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic leading-none">BATTLE <span className="text-[#1cb0f6]">ARENA</span></h1>
                            <p className="text-slate-400 font-bold text-sm mt-1">Specialized interview combat interface.</p>
                        </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                        <button 
                            onClick={() => setGameState('DEMO')}
                            className="bg-white/5 hover:bg-white/10 text-white px-6 py-4 rounded-[24px] font-black text-[10px] border-b-[4px] border-white/5 active:border-b-0 active:translate-y-[4px] transition-all flex items-center justify-center gap-2 uppercase tracking-[0.2em]"
                        >
                            <Gamepad2 size={18} /> Simulation
                        </button>
                        <button 
                            onClick={handleStartBattle}
                            disabled={isCustomMode ? (!customTitle || !customBrief) : !selectedProgram}
                            className="bg-[#58cc02] text-white px-10 py-4 rounded-[24px] font-black text-xl border-b-[8px] border-[#46a302] hover:brightness-110 active:border-b-0 active:translate-y-[8px] disabled:opacity-50 disabled:grayscale transition-all flex items-center gap-4 shadow-2xl"
                        >
                            STRIKE <Play size={24} fill="currentColor" />
                        </button>
                    </div>
                 </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* 1. Tactical Sidebar - Compact */}
                <div className="lg:col-span-3 flex flex-col space-y-4">
                    <div className="flex items-center gap-2 px-1 shrink-0">
                        <DuoIcon icon={BookOpen} color="blue" size="sm" />
                        <h3 className="font-black text-slate-500 text-xs uppercase tracking-widest italic">1. Tactical Base</h3>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto pr-2 space-y-2 max-h-[700px] scrollbar-hide pb-8">
                        {!lockedProgramId && (
                            <div 
                                onClick={() => { setIsCustomMode(true); setSelectedProgram(null); }}
                                className={`p-4 rounded-[28px] border-2 transition-all cursor-pointer flex items-center gap-4 group shadow-sm
                                    ${isCustomMode ? 'bg-purple-50 border-[#ce82ff] border-b-[8px]' : 'bg-white border-slate-200 border-b-[4px] hover:border-purple-200'}
                                `}
                            >
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border-b-4 ${isCustomMode ? 'bg-[#ce82ff] border-[#a855f7] text-white' : 'bg-slate-100 border-slate-200 text-slate-300'}`}>
                                    <Hammer size={24} strokeWidth={3} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className={`font-black text-sm truncate ${isCustomMode ? 'text-[#ce82ff]' : 'text-slate-700'}`}>Custom Forge</h4>
                                    <p className="text-slate-400 font-bold text-[8px] uppercase tracking-widest">Manual Input</p>
                                </div>
                            </div>
                        )}

                        {(lockedProgramId ? [selectedProgram].filter(Boolean) : availablePrograms).map(curr => (
                            <div 
                                key={curr!.id} 
                                onClick={() => { setSelectedProgram(curr); setIsCustomMode(false); }} 
                                className={`p-4 rounded-[28px] border-2 transition-all cursor-pointer flex items-center gap-4 group shadow-sm
                                    ${selectedProgram?.id === curr!.id ? 'bg-sky-50 border-[#1cb0f6] border-b-[8px]' : 'bg-white border-slate-200 border-b-[4px] hover:border-sky-200'}
                                `}
                            >
                                <div className="w-12 h-12 rounded-xl overflow-hidden bg-white shrink-0 border-2 border-slate-100 p-1 flex items-center justify-center">
                                    <img src={curr!.organizerLogo} className="w-full h-full object-contain" alt="" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className={`font-black text-sm truncate ${selectedProgram?.id === curr!.id ? 'text-[#1cb0f6]' : 'text-slate-700'}`}>{curr!.title}</h4>
                                    <p className="text-slate-400 font-bold text-[8px] uppercase tracking-widest">{curr!.organizer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 2. Strategy Panel - COMPACT & DEEP KEYS INTEGRATION */}
                <div className="lg:col-span-9 flex flex-col">
                    <div className="bg-white rounded-[40px] border-2 border-slate-200 border-b-[12px] p-6 md:p-8 shadow-lg flex-1 space-y-8 overflow-hidden relative">
                        <div className="flex items-center gap-2 mb-2">
                            <DuoIcon icon={Database} color="purple" size="sm" />
                            <h3 className="font-black text-slate-700 text-lg uppercase tracking-tight italic">2. Intel Strategic Store</h3>
                        </div>

                        {isCustomMode ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in slide-in-from-right duration-300">
                                <div className="space-y-4">
                                    <div className="relative">
                                        <PenTool className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                                        <input 
                                            value={customTitle}
                                            onChange={e => setCustomTitle(e.target.value)}
                                            placeholder="Mission Name..."
                                            className="w-full p-4 pl-12 bg-white border-2 border-slate-200 border-b-4 rounded-xl font-bold text-slate-700 text-sm outline-none focus:border-purple-400 shadow-inner"
                                        />
                                    </div>
                                    <textarea 
                                        value={customBrief}
                                        onChange={e => setCustomBrief(e.target.value)}
                                        placeholder="Paste briefing text here..."
                                        className="w-full h-56 p-6 bg-slate-900 border-4 border-slate-800 border-b-[10px] rounded-[32px] font-bold text-xs text-purple-400 outline-none focus:border-purple-500 transition-all resize-none shadow-xl"
                                    />
                                </div>
                                <div className="bg-slate-50 p-8 rounded-[32px] border-2 border-slate-100 border-b-[6px] flex flex-col items-center justify-center text-center space-y-4">
                                    <ShieldAlert size={40} className="text-slate-300" />
                                    <p className="text-slate-400 font-bold leading-relaxed text-sm max-w-[180px]">
                                        Custom Mode uses generic patterns based on input.
                                    </p>
                                </div>
                            </div>
                        ) : selectedProgram ? (
                            <div className="space-y-8 animate-in fade-in duration-500 overflow-y-auto max-h-[750px] pr-2 scrollbar-hide pb-10">
                                
                                {/* A. EXPERT VERDICT - BOSS VOICE */}
                                <div className="bg-slate-900 p-6 rounded-[32px] border-b-[8px] border-black text-white relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')] opacity-10"></div>
                                    <div className="relative z-10 flex gap-4 items-center">
                                        <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center text-yellow-900 border-b-2 border-yellow-600 shadow-md shrink-0"><Quote size={20} /></div>
                                        <p className="text-lg md:text-xl font-black italic tracking-tight leading-snug">
                                            "{selectedProgram.shadowProtocol.expertVerdict}"
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                                    {/* B. LETHAL MISTAKES - TIGHT GRID */}
                                    <div className="md:col-span-7 space-y-4">
                                        <div className="flex items-center gap-2 px-1">
                                            <AlertTriangle size={12} className="text-red-500" strokeWidth={4} />
                                            <h4 className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em]">Application Killers</h4>
                                        </div>
                                        <div className="grid grid-cols-1 gap-2">
                                            {selectedProgram.shadowProtocol.lethalMistakes.map((m, i) => (
                                                <div key={i} className="bg-white p-4 rounded-2xl border-2 border-red-50 hover:bg-red-50/50 flex gap-4 items-center transition-all group">
                                                    <div className="w-6 h-6 rounded-lg bg-red-100 flex items-center justify-center text-red-500 border-b-2 border-red-200 shrink-0 group-hover:bg-red-500 group-hover:text-white transition-all"><X size={12} strokeWidth={4} /></div>
                                                    <div className="min-w-0">
                                                        <p className="font-black text-slate-800 text-[11px] uppercase leading-none mb-1">{m.title}</p>
                                                        <p className="text-[10px] font-bold text-slate-400 truncate opacity-80 leading-none italic">"{m.reason}"</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* C. COMBAT MANEUVERS - TIGHT CARD */}
                                    <div className="md:col-span-5 space-y-4">
                                        <div className="flex items-center gap-2 px-1">
                                            <Flame size={12} className="text-orange-500" strokeWidth={4} />
                                            <h4 className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em]">Combat Maneuvers</h4>
                                        </div>
                                        <div className="bg-slate-50 rounded-[28px] border-2 border-slate-200 p-4 space-y-4">
                                            <div className="space-y-1.5">
                                                <p className="text-[8px] font-black text-sky-500 uppercase tracking-widest flex items-center gap-1.5"><Sparkles size={8} fill="currentColor"/> Power Phrases</p>
                                                {selectedProgram.shadowProtocol.cheatSheet?.powerPhrases.slice(0, 2).map((p, i) => (
                                                    <div key={i} className="bg-white p-2 rounded-xl border border-sky-100 text-[9px] font-bold text-slate-600 italic">"{p}"</div>
                                                ))}
                                            </div>
                                            <div className="pt-2 border-t border-slate-200/50 space-y-1.5">
                                                <p className="text-[8px] font-black text-red-400 uppercase tracking-widest flex items-center gap-1.5"><Lock size={8}/> Forbidden Phrases</p>
                                                {selectedProgram.shadowProtocol.cheatSheet?.forbiddenPhrases.slice(0, 1).map((p, i) => (
                                                    <div key={i} className="bg-white p-2 rounded-xl border border-red-50 text-[9px] font-bold text-red-400 italic">"{p}"</div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* D. SUCCESS ARTIFACTS - HORIZONTAL */}
                                <div className="space-y-3 pt-2 border-t-2 border-slate-50">
                                    <div className="flex items-center gap-2 px-1">
                                        <Gem size={12} className="text-sky-500" strokeWidth={4} />
                                        <h4 className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em]">Artifact Treasures</h4>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedProgram.shadowProtocol.successVault.map((item, i) => (
                                            <div key={i} className="bg-white px-4 py-3 rounded-2xl border-2 border-slate-100 border-b-4 flex items-center gap-3 group hover:border-yellow-400 transition-all flex-1 min-w-[200px]">
                                                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-yellow-400 group-hover:text-white border-b-2 border-slate-100 transition-all shrink-0">
                                                    {item.category === 'ESSAY' ? <FileText size={16}/> : <Briefcase size={16}/>}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="font-black text-slate-700 text-[10px] truncate leading-tight">{item.title}</p>
                                                    <p className="text-[7px] font-bold text-slate-400 uppercase tracking-widest truncate">{item.category}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="h-64 flex flex-col items-center justify-center bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200 opacity-50">
                                <Target size={48} className="text-slate-200 mb-2" />
                                <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Select a Mission</p>
                            </div>
                        )}

                        {/* Intensity & Controls - Footers */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t-2 border-slate-100 shrink-0">
                            <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-[20px] border border-slate-200">
                                <div className="p-2 bg-orange-100 text-orange-600 rounded-xl"><Activity size={14} strokeWidth={3} /></div>
                                <div className="flex gap-1 flex-1">
                                    {['BEGINNER', 'ELITE'].map(d => (
                                        <button 
                                            key={d} 
                                            onClick={() => setDifficulty(d as any)} 
                                            className={`flex-1 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${difficulty === d ? 'bg-white border-b-2 border-orange-400 text-orange-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                                        >
                                            {d}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button 
                                onClick={() => setIsVoiceOn(!isVoiceOn)} 
                                className={`w-full py-3 rounded-[20px] border-2 border-b-[6px] font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 active:translate-y-1 active:border-b-2 ${isVoiceOn ? 'bg-green-100 border-green-500 text-green-700' : 'bg-slate-50 border-slate-200 text-slate-400'}`}
                            >
                                <Mic2 size={14} strokeWidth={3} />
                                {isVoiceOn ? 'Voice Link Ready' : 'Silent Strike'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
