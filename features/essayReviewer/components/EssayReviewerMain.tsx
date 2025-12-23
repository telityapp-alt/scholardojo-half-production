
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import CharacterCount from '@tiptap/extension-character-count';
import Underline from '@tiptap/extension-underline';
import { 
    BookOpen, MessageSquare, ShieldCheck, ChevronDown, 
    Save, Sparkles, BrainCircuit, Info, AlertCircle, 
    CheckCircle2, Bot, Send, ArrowRight, Target, PenTool,
    ChevronLeft, ListChecks, Wand2, Lightbulb, RefreshCw
} from 'lucide-react';
import { DuoButton } from '../../../components/DuoButton';
import { AIOrchestrator } from '../../../core/engines/aiOrchestrator';
import { EssayService } from '../services/essayService';
import { EssayMission } from '../types';
import confetti from 'canvas-confetti';

type SidebarTab = 'RECIPE' | 'BRAINSTORM' | 'REVIEW';

export const EssayReviewerMain: React.FC = () => {
    const { domain, detailId } = useParams<{ domain: string; detailId?: string }>();
    const navigate = useNavigate();

    const [mission, setMission] = useState<EssayMission | null>(null);
    const [activeTab, setActiveTab] = useState<SidebarTab>('RECIPE');
    const [isSaving, setIsSaving] = useState(false);
    const [wordCount, setWordCount] = useState(0);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            CharacterCount.configure(),
            Placeholder.configure({ placeholder: 'Paste your prompt analysis and start typing...' }),
        ],
        onUpdate: ({ editor }) => {
            setWordCount(editor.storage.characterCount.words());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-slate max-w-none focus:outline-none min-h-[800px] p-12 md:p-20 font-bold text-slate-800 text-xl leading-relaxed',
            },
        },
    });

    useEffect(() => {
        if (!detailId) return;
        const m = EssayService.getMissionById(detailId);
        if (m) setMission(m);
        else navigate(`/${domain}/workspace/essay-reviewer`);
    }, [detailId, domain]);

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            confetti({ particleCount: 30, spread: 30, origin: { y: 0.8 }, colors: ['#58cc02'] });
        }, 800);
    };

    if (!mission) return null;

    return (
        <div className="animate-in fade-in duration-500 pb-32 max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
                <DuoButton variant="navigation" startIcon={ChevronLeft} onClick={() => navigate(-1)}>
                    Mission Board
                </DuoButton>
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex flex-col items-end">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Active Word Count</p>
                        <p className="font-black text-slate-700 text-lg">{wordCount} / {mission.wordCount}</p>
                    </div>
                    <DuoButton themeColor="green" onClick={handleSave} isLoading={isSaving} startIcon={Save} className="!py-3 !px-8 !text-xs">
                        Commit Draft
                    </DuoButton>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-10 min-h-[90vh] items-start">
                <div className="flex-1 lg:max-w-[70%] w-full space-y-8">
                    <div className="bg-[#fff9f0] rounded-[40px] border-2 border-slate-200 border-b-[10px] p-8 md:p-10 relative overflow-hidden group shadow-md">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-30 pointer-events-none"></div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-500 border-b-4 border-orange-200 shadow-sm">
                                        <Target size={24} strokeWidth={3} />
                                    </div>
                                    <div>
                                        <h3 className="font-display font-black text-2xl text-slate-700 tracking-tight leading-none uppercase italic">The Objective</h3>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{mission.programName} Protocol</p>
                                    </div>
                                </div>
                                <div className="bg-orange-500 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border-b-4 border-orange-700 shadow-lg transform rotate-2">
                                    ~{mission.wordCount} Words Required
                                </div>
                            </div>
                            <p className="text-2xl md:text-3xl font-black text-slate-800 leading-[1.15] tracking-tight mb-4">
                                "{mission.title}"
                            </p>
                            <div className="flex items-center gap-2 text-slate-400 font-bold text-sm">
                                <Info size={16} /> 
                                <span>Sensei calibration: Focus on {mission.type.replace('_', ' ')} logic.</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-[48px] border-2 border-slate-200 border-b-[16px] overflow-hidden flex flex-col shadow-2xl relative">
                        <div className="p-4 border-b-2 border-slate-50 flex items-center justify-between bg-slate-50/50 sticky top-0 z-20 backdrop-blur-sm">
                            <div className="flex items-center gap-6 px-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-ping"></div>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Neural Sync Active</span>
                                </div>
                                <span className="w-px h-4 bg-slate-200"></span>
                                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Version 1.0.4-Strike</span>
                            </div>
                            <div className="flex gap-2 pr-2">
                                <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors"><Wand2 size={18}/></button>
                                <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors"><Lightbulb size={18}/></button>
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto min-h-[1000px] scrollbar-hide">
                            <EditorContent editor={editor} />
                        </div>
                        
                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30">
                            <div className="bg-slate-900/90 backdrop-blur-md px-6 py-3 rounded-full border-b-4 border-black text-white flex items-center gap-8 shadow-2xl border-white/10">
                                <div className="flex flex-col items-center">
                                    <span className="text-[7px] font-black text-sky-400 uppercase tracking-widest">Words</span>
                                    <span className="font-black text-lg leading-none">{wordCount}</span>
                                </div>
                                <div className="w-px h-6 bg-white/10"></div>
                                <div className="flex flex-col items-center">
                                    <span className="text-[7px] font-black text-sky-400 uppercase tracking-widest">Target</span>
                                    <span className="font-black text-lg leading-none">{mission.wordCount}</span>
                                </div>
                                <div className="w-px h-6 bg-white/10"></div>
                                <button onClick={handleSave} className="flex items-center gap-2 text-sky-400 font-black text-[10px] uppercase hover:text-white transition-all"><Save size={16}/> Save</button>
                            </div>
                        </div>
                    </div>
                </div>

                <aside className="w-full lg:w-[30%] flex flex-col gap-8 sticky top-4 h-fit">
                    <div className="bg-white p-2 rounded-[32px] border-2 border-slate-200 border-b-[8px] flex gap-2 shadow-sm shrink-0">
                        {[
                            { id: 'RECIPE', icon: BookOpen, label: 'Recipe' },
                            { id: 'BRAINSTORM', icon: BrainCircuit, label: 'Sensei' },
                            { id: 'REVIEW', icon: ShieldCheck, label: 'Audit' }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as SidebarTab)}
                                className={`
                                    flex-1 py-4 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all border-b-[5px] active:border-b-0 active:translate-y-[5px]
                                    ${activeTab === tab.id 
                                        ? 'bg-sky-100 border-sky-400 text-sky-600 shadow-sm scale-105' 
                                        : 'bg-transparent text-slate-300 border-transparent hover:bg-slate-50 hover:text-slate-500'}
                                `}
                            >
                                <tab.icon size={24} strokeWidth={3} className={activeTab === tab.id ? 'fill-sky-100' : ''} />
                                <span className="font-display font-black text-[9px] uppercase tracking-[0.2em] leading-none">{tab.label}</span>
                            </button>
                        ))}
                    </div>

                    <div className="bg-white rounded-[40px] border-2 border-slate-200 border-b-[12px] p-8 flex flex-col min-h-[550px] shadow-xl animate-in slide-in-from-right-6 duration-300 relative overflow-hidden">
                        {activeTab === 'RECIPE' && <RecipePanel mission={mission} />}
                        {activeTab === 'BRAINSTORM' && <BrainstormPanel mission={mission} />}
                        {activeTab === 'REVIEW' && <ReviewPanel editor={editor} mission={mission} />}
                    </div>

                    <div className="bg-slate-900 rounded-[32px] border-b-[10px] border-black p-6 text-white relative overflow-hidden group shadow-lg">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')] opacity-15"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-xl bg-sky-500 flex items-center justify-center border-b-2 border-sky-700 shadow-md animate-pulse"><Sparkles size={16} fill="currentColor" /></div>
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-sky-400">Elite Maneuver</span>
                            </div>
                            <p className="text-sm font-bold italic text-slate-300 leading-relaxed border-l-2 border-sky-500 pl-4">
                                "The first paragraph is your strike. If it doesn't hook the reader in 15 seconds, the mission fails."
                            </p>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

const RecipePanel: React.FC<{ mission: EssayMission }> = ({ mission }) => (
    <div className="space-y-10 animate-in fade-in">
        <div>
            <h3 className="font-display font-black text-2xl text-slate-700 uppercase italic mb-2 tracking-tighter">Mission Strategy</h3>
            <div className="w-12 h-1.5 bg-sky-400 rounded-full"></div>
        </div>
        
        <section className="space-y-4">
            <h4 className="font-black text-[10px] uppercase text-slate-400 tracking-[0.3em] flex items-center gap-2"><Target size={14} className="text-sky-500" /> Neural Directive</h4>
            <p className="text-base font-bold text-slate-600 leading-relaxed italic border-l-4 border-sky-100 pl-6">
                {mission.recipe.strategy}
            </p>
        </section>

        <section className="space-y-6">
            <h4 className="font-black text-[10px] uppercase text-slate-400 tracking-[0.3em]">Core Ingredients</h4>
            <div className="space-y-4">
                {mission.recipe.ingredients.map((item, i) => (
                    <div key={i} className="flex gap-4 p-4 bg-slate-50 rounded-2xl border-2 border-slate-100 group hover:border-sky-200 transition-all">
                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#58cc02] border-b-4 border-slate-200 shrink-0 group-hover:scale-110 transition-transform">
                            <CheckCircle2 size={20} strokeWidth={4} />
                        </div>
                        <div className="min-w-0">
                            <p className="font-black text-[11px] text-slate-800 leading-tight uppercase mb-1">{item.label}</p>
                            <p className="text-[11px] font-bold text-slate-400 leading-snug">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        <div className="mt-8 p-6 bg-green-50 rounded-[32px] border-4 border-green-100 border-b-[10px] relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform"><ShieldCheck size={64}/></div>
             <div className="flex items-start gap-4 relative z-10">
                <Sparkles size={24} className="text-green-600 shrink-0 mt-1 fill-current" />
                <div className="space-y-1">
                    <p className="font-black text-[10px] uppercase text-green-700 tracking-widest">Sensei's Secret</p>
                    <p className="text-xs font-bold text-green-800 leading-relaxed">
                        {mission.recipe.proTip}
                    </p>
                </div>
             </div>
        </div>
    </div>
);

const BrainstormPanel: React.FC<{ mission: EssayMission }> = ({ mission }) => {
    const [messages, setMessages] = useState<any[]>([
        { role: 'model', text: `Verified. I've analyzed the **${mission.programName}** requirements. What's your rough narrative arc?` }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (!input.trim() || loading) return;
        const userMsg = input;
        setInput('');
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setLoading(true);

        try {
            const res = await AIOrchestrator.generateContent({
                model: 'gemini-3-flash-preview',
                contents: `CONTEXT: ESSAY BRAINSTORM.\nMISSION: ${mission.title}\nPROGRAM: ${mission.programName}\nUSER IDEA: ${userMsg}`,
                config: { systemInstruction: "You are the Essay Sensei. Energetic, concise, Duolingo style. Turn vague ideas into sharp mission beats. Focus on the 'Strategy' in the recipe." }
            });
            setMessages(prev => [...prev, { role: 'model', text: res.text }]);
        } catch (e) {
            setMessages(prev => [...prev, { role: 'model', text: "Link lost. Strike again." }]);
        }
        setLoading(false);
    };

    return (
        <div className="flex flex-col h-[550px] animate-in fade-in">
            <div className="flex-1 overflow-y-auto space-y-5 pr-2 scrollbar-hide pb-6">
                {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[90%] p-5 rounded-[28px] border-2 border-b-[6px] shadow-lg ${m.role === 'user' ? 'bg-slate-900 border-black text-white rounded-tr-none' : 'bg-slate-50 border-slate-200 text-slate-700 rounded-tl-none'}`}>
                            <p className="text-sm font-bold leading-relaxed">{m.text}</p>
                        </div>
                    </div>
                ))}
                {loading && <div className="flex justify-start"><div className="bg-slate-100 p-4 rounded-2xl animate-pulse flex items-center gap-3 font-black text-[10px] uppercase text-slate-400"><RefreshCw className="animate-spin" size={14}/> Calibrating...</div></div>}
            </div>
            <div className="mt-auto pt-6 border-t-2 border-slate-100 relative">
                <textarea 
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                    placeholder="Briefly describe your idea..."
                    className="w-full p-6 bg-slate-50 border-2 border-slate-200 border-b-[8px] rounded-[32px] text-sm font-bold text-slate-700 outline-none focus:border-sky-400 focus:bg-white resize-none h-28 scrollbar-hide shadow-inner transition-all"
                />
                <button 
                    onClick={handleSend} 
                    disabled={!input.trim() || loading}
                    className="absolute bottom-10 right-4 w-12 h-12 bg-sky-500 text-white rounded-2xl border-b-[6px] border-sky-700 active:translate-y-[4px] active:border-b-0 transition-all flex items-center justify-center shadow-xl hover:brightness-110 disabled:opacity-50"
                >
                    <Send size={24} strokeWidth={3} />
                </button>
            </div>
        </div>
    );
};

const ReviewPanel: React.FC<{ editor: any; mission: EssayMission }> = ({ editor, mission }) => {
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const runReview = async () => {
        if (!editor || loading) return;
        setLoading(true);
        const text = editor.getText();
        try {
            const res = await AIOrchestrator.generateContent({
                model: 'gemini-3-pro-preview',
                contents: text,
                config: { 
                    systemInstruction: `You are the Dojo Auditor. Review this essay specifically for: ${mission.programName}. 
                        TARGET MISSION: ${mission.title}
                        WORD LIMIT: ${mission.wordCount}
                        LEGAL BLUEPRINT: ${mission.recipe.strategy}
                        Return JSON: { score (0-100), verdict, strengths: [], gaps: [] }`,
                    responseMimeType: "application/json"
                }
            });
            setResult(JSON.parse(res.text || '{}'));
            confetti({ particleCount: 100, spread: 70, origin: { x: 0.8, y: 0.6 } });
        } catch (e) {}
        setLoading(false);
    };

    return (
        <div className="space-y-8 overflow-y-auto scrollbar-hide max-h-[600px] animate-in fade-in">
            {!result ? (
                <div className="flex flex-col items-center justify-center py-20 text-center space-y-10">
                    <div className="relative">
                        <div className="w-24 h-24 bg-indigo-50 rounded-[40px] flex items-center justify-center text-indigo-200 border-4 border-dashed border-indigo-100 shadow-inner">
                            <ShieldCheck size={56} />
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-indigo-500 rounded-full border-4 border-white animate-pulse"></div>
                    </div>
                    <div>
                        <h4 className="font-black text-slate-800 uppercase tracking-widest text-lg italic">Auditor Idle</h4>
                        <p className="text-sm font-bold text-slate-400 mt-3 px-8 leading-relaxed">Submit your draft for a strategic strike audit. Gemini-3 will scan for weaknesses.</p>
                    </div>
                    <DuoButton 
                        themeColor="blue" 
                        onClick={runReview} 
                        isLoading={loading}
                        className="w-full !py-5 !text-lg !rounded-3xl shadow-xl"
                        startIcon={BrainCircuit}
                    >
                        Execute Quality Strike
                    </DuoButton>
                </div>
            ) : (
                <div className="animate-in slide-in-from-bottom-6 duration-500 space-y-10">
                    <div className="text-center relative">
                        <div className="absolute inset-0 bg-sky-500/5 blur-[40px] rounded-full"></div>
                        <div className="relative">
                            <div className="text-7xl font-black text-[#1cb0f6] leading-none tracking-tighter italic">{result.score}%</div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mt-3">Mission Match Rank</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3 px-1">
                             <CheckCircle2 size={20} className="text-[#58cc02]" strokeWidth={4} />
                             <h5 className="font-black text-xs uppercase text-slate-700 tracking-widest">Strike Successes</h5>
                        </div>
                        <div className="space-y-2">
                            {result.strengths?.map((s: string, i: number) => (
                                <div key={i} className="p-4 bg-green-50 rounded-2xl border-2 border-green-100 text-xs font-bold text-green-900 leading-tight">
                                    {s}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3 px-1">
                             <AlertCircle size={20} className="text-red-500" strokeWidth={4} />
                             <h5 className="font-black text-xs uppercase text-slate-700 tracking-widest">Gaps Detected</h5>
                        </div>
                        <div className="space-y-2">
                            {result.gaps?.map((g: string, i: number) => (
                                <div key={i} className="p-4 bg-red-50 rounded-2xl border-2 border-red-100 text-xs font-bold text-red-900 leading-tight">
                                    {g}
                                </div>
                            ))}
                        </div>
                    </div>

                    <button onClick={() => setResult(null)} className="w-full py-5 bg-slate-100 text-slate-400 rounded-2xl font-black text-xs uppercase tracking-[0.3em] border-b-4 border-slate-200 active:translate-y-1 active:border-b-0 transition-all">Re-initialize Audit</button>
                </div>
            )}
        </div>
    );
};
