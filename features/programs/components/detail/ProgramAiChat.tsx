
import React, { useState, useRef, useEffect } from 'react';
import { UnifiedProgram } from '../../types';
import { 
    Bot, Send, Sparkles, Zap, ShieldCheck, 
    MessageSquare, RefreshCw, Mic, Target, 
    AlertCircle, Info, BrainCircuit, ChevronRight,
    Database, User, X, GraduationCap
} from 'lucide-react';
import { AIOrchestrator } from '../../../../core/engines/aiOrchestrator';
import { useLanguage } from '../../../../core/hooks/useLanguage';
import { ProfileAccess } from '../../../../core/access/profileAccess';

interface Props {
    program: UnifiedProgram;
}

interface Message {
    role: 'user' | 'model';
    text: string;
}

export const ProgramAiChat: React.FC<Props> = ({ program }) => {
    const { lang } = useLanguage();
    const [messages, setMessages] = useState<Message[]>([
        { role: 'model', text: `Verified. I am the **${program.organizer}** Sensei. Ask me anything about the **${program.title}** mission.` }
    ]);
    const [input, setInput] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const dna = ProfileAccess.getDNA(program.domain);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isThinking]);

    const handleSend = async (textOverride?: string) => {
        const text = textOverride || input;
        if (!text.trim() || isThinking) return;

        setInput('');
        setMessages(prev => [...prev, { role: 'user', text }]);
        setIsThinking(true);

        const systemInstruction = `
            You are the "Tactical Sensei" specifically for the program: ${program.title}. 
            Your personality is purely based on the ${program.domain.toUpperCase()} domain, but your knowledge is restricted to the specific mission data below.

            MISSION SOURCE OF TRUTH:
            - TITLE: ${program.title}
            - ORGANIZER: ${program.organizer}
            - TYPE: ${program.type}
            - ELIGIBILITY: ${JSON.stringify(program.intel.entryCriteria)}
            - FUNDING LOOT: ${JSON.stringify(program.intel.funding)}
            - STRATEGIC WANTS: ${JSON.stringify(program.intel.strategicWants)}
            - LETHAL MISTAKES (Shadow Protocol): ${JSON.stringify(program.shadowProtocol.lethalMistakes.map(m => m.title + ": " + m.reason))}
            - EXPERT VERDICT: ${program.shadowProtocol.expertVerdict}
            - ELITE TIPS: ${JSON.stringify(program.shadowProtocol.eliteTips?.map(t => t.title + ": " + t.content) || [])}

            CANDIDATE DNA (Context for tailored advice):
            - NAME: ${dna.name}
            - GPA: ${dna.currentGpa}/${dna.maxGpa}
            - POWER MATRIX: ${JSON.stringify(dna.scores)}

            RULES:
            1. DO NOT mention other programs (like LPDP if this is Gates, or vice-versa) unless relevant for comparison.
            2. ALWAYS use the provided MISSION SOURCE OF TRUTH to answer.
            3. Use high-impact Duolingo style: energetic, concise, and focused on "Battle Readiness".
            4. USE MARKDOWN (**bold** for emphasis).
            5. LANGUAGE: Strictly respond in ${lang === 'id' ? 'BAHASA INDONESIA' : 'ENGLISH'}.
            6. If info is missing in the source, tell the user to check the "Briefing" tab for official docs.
        `;

        try {
            const response = await AIOrchestrator.generateContent({
                model: 'gemini-3-flash-preview',
                contents: text,
                config: { systemInstruction }
            });

            setMessages(prev => [...prev, { role: 'model', text: response.text || "Neural link unstable." }]);
        } catch (e: any) {
            setMessages(prev => [...prev, { role: 'model', text: e.message || "Strike failed. Check connection." }]);
        } finally {
            setIsThinking(false);
        }
    };

    const QuickStrike = ({ label, icon: Icon, onClick }: any) => (
        <button 
            onClick={onClick}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border-2 border-slate-200 border-b-4 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:border-sky-400 hover:text-sky-600 transition-all active:translate-y-1 active:border-b-2 shadow-sm shrink-0"
        >
            <Icon size={12} strokeWidth={4} />
            {label}
        </button>
    );

    return (
        <div className="max-w-5xl mx-auto h-[800px] flex flex-col bg-white rounded-[48px] border-2 border-slate-200 border-b-[16px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-500">
            <div className="bg-white p-6 flex items-center justify-between border-b-2 border-slate-100 shrink-0 z-20">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#1cb0f6] rounded-2xl flex items-center justify-center text-white border-b-4 border-sky-700 shadow-md">
                        <Bot size={24} strokeWidth={2.5} />
                    </div>
                    <div>
                        <h3 className="text-slate-800 font-black text-lg tracking-tight uppercase italic leading-none">Sensei Protocol</h3>
                        <div className="flex items-center gap-2 mt-1">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                            <p className="text-slate-400 text-[9px] font-black uppercase tracking-[0.2em]">Locked on {program.id}</p>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 hidden md:flex items-center gap-2">
                        <ShieldCheck size={14} className="text-sky-500" strokeWidth={3} />
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Active Intelligence</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-slate-50/30 scrollbar-hide" ref={scrollRef}>
                {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                        <div className={`flex gap-4 max-w-[80%] ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border-b-4 shrink-0 shadow-sm
                                ${m.role === 'user' ? 'bg-slate-800 border-black text-white' : 'bg-[#1cb0f6] border-sky-700 text-white'}
                            `}>
                                {m.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                            </div>
                            <div className={`p-6 rounded-[32px] border-2 border-b-[8px] text-base font-bold leading-relaxed shadow-sm
                                ${m.role === 'user' 
                                    ? 'bg-white border-slate-200 text-slate-700 rounded-tr-none' 
                                    : 'bg-white border-sky-200 text-slate-700 rounded-tl-none'}
                            `}>
                                {m.text.split('\n').map((line, idx) => (
                                    <p key={idx} className={idx !== 0 ? 'mt-3' : ''}>
                                        {line.split('**').map((part, pIdx) => 
                                            pIdx % 2 === 1 ? <span key={pIdx} className="font-black text-slate-900">{part}</span> : part
                                        )}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
                {isThinking && (
                    <div className="flex justify-start animate-in fade-in">
                        <div className="flex gap-4 max-w-[80%]">
                            <div className="w-10 h-10 rounded-xl bg-[#1cb0f6] border-b-4 border-sky-700 flex items-center justify-center text-white shrink-0 shadow-lg">
                                <RefreshCw className="animate-spin" size={18} />
                            </div>
                            <div className="bg-white border-2 border-sky-100 border-b-[8px] p-6 rounded-[32px] rounded-tl-none flex gap-1.5 items-center shadow-sm">
                                <div className="w-2 h-2 bg-sky-400 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-sky-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                <div className="w-2 h-2 bg-sky-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="p-8 bg-white border-t-2 border-slate-100 shrink-0">
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-6 -mx-2 px-2">
                    <QuickStrike label="Peluang Lolos" icon={Target} onClick={() => handleSend(lang === 'id' ? "Berdasarkan DNA saya, apa peluang lolos saya di program ini?" : "Based on my DNA, what are my acceptance odds for this program?")} />
                    <QuickStrike label="Fatal Mistakes" icon={AlertCircle} onClick={() => handleSend(lang === 'id' ? "Kasih tau 3 kesalahan fatal yang paling dilarang di sini." : "Tell me 3 lethal mistakes strictly forbidden here.")} />
                    <QuickStrike label="Visi Dosen" icon={GraduationCap} onClick={() => handleSend(lang === 'id' ? "Jelaskan tentang komitmen mengabdi di kampus." : "Explain the educator commitment requirement.")} />
                    <QuickStrike label="Success Keys" icon={BrainCircuit} onClick={() => handleSend(lang === 'id' ? "Apa kunci sukses utama untuk beasiswa ini?" : "What is the ultimate success key for this scholarship?")} />
                </div>
                
                <div className="relative flex items-end gap-4">
                    <div className="relative flex-1 group">
                        <textarea 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                            placeholder={`Ask about the ${program.organizer} mission...`}
                            className="w-full pl-8 pr-12 py-6 bg-slate-50 border-2 border-slate-200 border-b-[8px] rounded-[32px] font-bold text-lg text-slate-700 outline-none focus:border-sky-400 focus:bg-white transition-all resize-none h-20 max-h-40 scrollbar-hide shadow-inner"
                        />
                        <button className="absolute right-6 bottom-7 text-slate-300 hover:text-sky-500 transition-colors">
                            <Mic size={24} strokeWidth={3} />
                        </button>
                    </div>
                    <button 
                        onClick={() => handleSend()}
                        disabled={!input.trim() || isThinking}
                        className={`h-20 w-20 rounded-[28px] flex items-center justify-center text-white border-b-[10px] transition-all active:translate-y-[10px] active:border-b-0 shadow-2xl
                            ${input.trim() ? 'bg-[#58cc02] border-[#46a302]' : 'bg-slate-200 border-slate-300 opacity-50'}
                        `}
                    >
                        <Send size={32} strokeWidth={3} />
                    </button>
                </div>
            </div>
        </div>
    );
};
