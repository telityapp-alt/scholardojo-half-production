
import React, { useState, useEffect, useRef } from 'react';
import { 
    X, Send, Bot, Plus, Swords, Zap, GraduationCap, 
    MessageSquare, Sparkles, Mic, History, Trash2, 
    MoreHorizontal, Check, User, ExternalLink, RefreshCcw
} from 'lucide-react';
import { DomainType } from '../../../core/contracts/entityMap';
import { SenseiService, ChatSession, ChatMessage } from '../services/senseiService';
import { getChatResponse } from '../../../services/geminiService';
import { useLanguage } from '../../../core/hooks/useLanguage';

interface SenseiMasterViewProps {
    initialDomain: DomainType;
    onClose: () => void;
}

export const SenseiMasterView: React.FC<SenseiMasterViewProps> = ({ initialDomain, onClose }) => {
    const { lang } = useLanguage();
    const [selectedDomain, setSelectedDomain] = useState<DomainType>(initialDomain);
    const [sessions, setSessions] = useState<ChatSession[]>([]);
    const [activeSession, setActiveSession] = useState<ChatSession | null>(null);
    const [input, setInput] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const loaded = SenseiService.getSessions();
        setSessions(loaded);
        if (loaded.length > 0) {
            setActiveSession(loaded[0]);
            setSelectedDomain(loaded[0].domain);
        } else {
            handleNewChat(initialDomain);
        }
    }, []);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [activeSession?.messages, isThinking]);

    const handleNewChat = (domain: DomainType = selectedDomain) => {
        const newSession: ChatSession = {
            id: `s-${Date.now()}`,
            domain,
            title: 'New Mission',
            updatedAt: Date.now(),
            messages: [{ 
                role: 'model', 
                text: `Ready, Ninja. I am the **${domain.toUpperCase()}** Sensei. What's the objective?`,
                timestamp: Date.now() 
            }]
        };
        setActiveSession(newSession);
        setSessions(prev => [newSession, ...prev]);
        setSelectedDomain(domain);
        SenseiService.saveSession(newSession);
    };

    const handleSend = async (textOverride?: string) => {
        const text = textOverride || input;
        if (!text.trim() || !activeSession || isThinking) return;

        const userMsg: ChatMessage = { role: 'user', text, timestamp: Date.now() };
        const updatedMsgs = [...activeSession.messages, userMsg];
        
        const workingSession = { 
            ...activeSession, 
            messages: updatedMsgs,
            title: activeSession.messages.length <= 1 ? text.slice(0, 24) : activeSession.title,
            updatedAt: Date.now()
        };

        setActiveSession(workingSession);
        setInput('');
        setIsThinking(true);

        try {
            const apiHistory = updatedMsgs.map(m => ({ role: m.role, parts: [{ text: m.text }] }));
            const contextStr = SenseiService.getSystemInstruction(selectedDomain, lang);
            const response = await getChatResponse(apiHistory, text, contextStr);

            const finalSession = {
                ...workingSession,
                messages: [...updatedMsgs, { role: 'model' as const, text: response, timestamp: Date.now() }]
            };

            setActiveSession(finalSession);
            setSessions(prev => [finalSession, ...prev.filter(s => s.id !== finalSession.id)]);
            SenseiService.saveSession(finalSession);
        } catch (e) {
            console.error(e);
        } finally {
            setIsThinking(false);
        }
    };

    const themes = {
        [DomainType.STUDENT]: { color: '#58cc02', dark: '#46a302', light: 'bg-green-50', text: 'text-green-600', icon: Swords },
        [DomainType.INTERN]: { color: '#ff9600', dark: '#cb7700', light: 'bg-orange-50', text: 'text-orange-600', icon: Zap },
        [DomainType.SCHOLAR]: { color: '#1cb0f6', dark: '#1899d6', light: 'bg-sky-50', text: 'text-sky-600', icon: GraduationCap }
    };

    const theme = themes[selectedDomain];

    return (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-300">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}></div>
            
            <div className="relative w-full max-w-5xl h-[80vh] bg-white rounded-[40px] border-x-4 border-t-4 border-slate-200 border-b-[12px] shadow-2xl flex overflow-hidden animate-in zoom-in-95 duration-300">
                
                {/* COMPACT SIDEBAR */}
                <div className="hidden md:flex w-64 border-r-2 border-slate-100 flex-col bg-slate-50/50 shrink-0">
                    <div className="p-4 border-b-2 border-slate-100 bg-white">
                        <button 
                            onClick={() => handleNewChat()}
                            className="w-full py-2.5 bg-[#58cc02] text-white rounded-xl font-black text-xs uppercase tracking-widest border-b-[4px] border-[#46a302] hover:brightness-105 active:border-b-0 active:translate-y-[4px] transition-all flex items-center justify-center gap-2 shadow-sm"
                        >
                            <Plus size={16} strokeWidth={4} /> New Mission
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-3 space-y-1.5 scrollbar-hide">
                        <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest px-2 mb-2">History</p>
                        {sessions.map(s => {
                            const st = themes[s.domain];
                            const isAct = activeSession?.id === s.id;
                            return (
                                <button
                                    key={s.id}
                                    onClick={() => { setActiveSession(s); setSelectedDomain(s.domain); }}
                                    className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all border-2 ${isAct ? 'bg-white border-slate-200 border-b-4 shadow-sm' : 'border-transparent hover:bg-slate-100/80 text-slate-400'}`}
                                >
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border-b-2 ${st.text} bg-white shadow-sm`}>
                                        {React.createElement(st.icon, { size: 16 })}
                                    </div>
                                    <p className={`font-bold text-[11px] truncate text-left flex-1 ${isAct ? 'text-slate-700' : 'text-slate-400'}`}>{s.title}</p>
                                </button>
                            );
                        })}
                    </div>

                    {/* SELECTOR BAR */}
                    <div className="p-3 bg-white border-t-2 border-slate-100 space-y-2">
                        <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest ml-1">Switch Dojo</p>
                        <div className="flex gap-1.5">
                            {[DomainType.SCHOLAR, DomainType.INTERN, DomainType.STUDENT].map(d => (
                                <button 
                                    key={d} 
                                    onClick={() => { setSelectedDomain(d); handleNewChat(d); }}
                                    className={`flex-1 p-2 rounded-lg border-2 transition-all flex items-center justify-center ${selectedDomain === d ? 'border-slate-800 bg-slate-900 text-white' : 'border-transparent bg-slate-100 text-slate-400'}`}
                                    title={d}
                                >
                                    {React.createElement(themes[d].icon, { size: 14, strokeWidth: 3 })}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* COMPACT MAIN CHAT */}
                <div className="flex-1 flex flex-col bg-white overflow-hidden relative">
                    {/* Compact Header */}
                    <div className="px-5 py-4 border-b-2 border-slate-100 flex items-center justify-between bg-white/90 backdrop-blur-md z-20">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl border-b-[4px] flex items-center justify-center text-white shadow-lg transform -rotate-1" style={{ backgroundColor: theme.color, borderColor: theme.dark }}>
                                <Bot size={22} strokeWidth={2.5} />
                            </div>
                            <div>
                                <h2 className="text-sm font-black text-slate-800 leading-none">Sensei AI</h2>
                                <div className="flex items-center gap-1.5 mt-1">
                                    <span className={`text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-md border ${theme.text}`} style={{ borderColor: theme.color + '30', backgroundColor: theme.color + '10' }}>
                                        {selectedDomain} Dojo
                                    </span>
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                             <button onClick={() => handleNewChat()} className="md:hidden w-10 h-10 bg-slate-100 text-slate-400 rounded-xl flex items-center justify-center border-b-4 border-slate-200">
                                <Plus size={18} strokeWidth={4} />
                            </button>
                            <button onClick={onClose} className="w-10 h-10 bg-slate-100 text-slate-400 hover:text-red-500 rounded-xl flex items-center justify-center border-b-4 border-slate-200 active:translate-y-[2px] transition-all">
                                <X size={20} strokeWidth={4} />
                            </button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scrollbar-hide bg-slate-50/30">
                        {activeSession?.messages.map((m, i) => (
                            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-1 duration-300`}>
                                <div className={`group relative max-w-[85%] p-4 rounded-2xl border-2 border-b-[5px] transition-all ${
                                    m.role === 'user' 
                                    ? 'bg-slate-900 border-black text-white rounded-tr-none' 
                                    : 'bg-white border-slate-200 text-slate-700 rounded-tl-none shadow-sm'
                                }`}>
                                    <p className="text-[13px] font-bold leading-relaxed whitespace-pre-wrap">{m.text}</p>
                                    <p className={`text-[8px] font-black mt-2 opacity-30 uppercase tracking-widest ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
                                        {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                            </div>
                        ))}
                        {isThinking && (
                            <div className="flex justify-start">
                                <div className="bg-white border-2 border-slate-200 border-b-[4px] p-3 rounded-2xl rounded-tl-none flex items-center gap-2">
                                    <div className="flex gap-1">
                                        <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></div>
                                        <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                        <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={chatEndRef} />
                    </div>

                    {/* Compact Input */}
                    <div className="p-4 bg-white border-t-2 border-slate-100 shrink-0">
                         {activeSession?.messages.length === 1 && !isThinking && (
                            <div className="flex gap-2 overflow-x-auto pb-3 no-scrollbar">
                                {[
                                    `Top ${selectedDomain} hacks?`,
                                    "Explain the rules.",
                                    "Mastery check."
                                ].map((p, i) => (
                                    <button 
                                        key={i} 
                                        onClick={() => handleSend(p)}
                                        className="shrink-0 px-3 py-1.5 bg-slate-50 border-2 border-slate-100 border-b-2 rounded-lg text-[10px] font-black text-slate-400 hover:border-sky-300 hover:text-sky-600 transition-all active:translate-y-[1px]"
                                    >
                                        {p}
                                    </button>
                                ))}
                            </div>
                        )}
                        <div className="relative flex items-end gap-3 max-w-4xl mx-auto">
                            <div className="relative flex-1 group">
                                <textarea 
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                                    placeholder="Type your strategy..."
                                    className="w-full p-4 pr-12 bg-slate-100 border-2 border-slate-200 border-b-[6px] rounded-2xl outline-none focus:border-slate-800 focus:bg-white text-sm font-bold text-slate-700 transition-all resize-none h-14 overflow-hidden"
                                />
                                <button className="absolute right-3 top-3.5 text-slate-300 hover:text-sky-500 transition-colors">
                                    <Mic size={18} strokeWidth={3} />
                                </button>
                            </div>
                            <button 
                                onClick={() => handleSend()}
                                disabled={!input.trim() || isThinking}
                                className={`h-14 w-14 rounded-2xl flex items-center justify-center text-white border-b-4 transition-all active:translate-y-[4px] active:border-b-0 ${input.trim() ? 'bg-[#58cc02] border-[#46a302]' : 'bg-slate-200 border-slate-300 opacity-50'}`}
                            >
                                <Send size={20} strokeWidth={4} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
