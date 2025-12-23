import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../core/contracts/entityMap';
import { DomainConfig } from '../core/contracts/domainConfig';
import { generateDomainAdvice } from '../services/geminiService';
import { DuoButton } from './DuoButton';
import { MessageCircle, X } from 'lucide-react';
import { DuoCard } from './DuoCard';

interface AiAssistantProps {
  config: DomainConfig;
}

export const AiAssistant: React.FC<AiAssistantProps> = ({ config }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'init', role: 'model', text: `Hi! I'm your ${config.name} coach. Ask me anything!` }
  ]);
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  useEffect(() => {
    setMessages([
        { id: 'init', role: 'model', text: `Hi! I'm your ${config.name} coach. Ask me anything!` }
    ]);
  }, [config]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsThinking(true);

    const responseText = await generateDomainAdvice(input, config);
    
    const aiMsg: ChatMessage = { 
        id: (Date.now() + 1).toString(), 
        role: 'model', 
        text: responseText 
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsThinking(false);
  };

  const getThemeStyles = () => {
    switch(config.theme) {
        case 'green': return { bg: 'bg-duo-green', border: 'border-duo-greenDark' };
        case 'blue': return { bg: 'bg-duo-blue', border: 'border-duo-blueDark' };
        case 'purple': return { bg: 'bg-duo-purple', border: 'border-duo-purpleDark' };
        default: return { bg: 'bg-duo-green', border: 'border-duo-greenDark' };
    }
  };

  const theme = getThemeStyles();

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-16 h-16 rounded-2xl ${theme.bg} text-white flex items-center justify-center border-b-[6px] ${theme.border} hover:scale-110 active:scale-95 active:border-b-0 active:translate-y-[6px] transition-all z-50 shadow-xl`}
      >
        <MessageCircle size={32} fill="currentColor" strokeWidth={3} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 md:w-96 h-[500px] z-50 flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-300">
      <DuoCard className="flex flex-col h-full !p-0 overflow-hidden shadow-2xl border-slate-300">
        {/* Header */}
        <div className={`${theme.bg} p-4 flex justify-between items-center border-b-[6px] ${theme.border}`}>
          <h3 className="text-white font-black text-lg uppercase tracking-wider">Dojo Coach</h3>
          <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white transition-colors">
            <X size={28} strokeWidth={4} />
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[85%] p-4 rounded-2xl text-sm font-bold shadow-sm border-b-4 ${
                  msg.role === 'user' 
                    ? 'bg-white text-slate-700 border-slate-200 rounded-tr-none' 
                    : `${theme.bg} text-white ${theme.border} rounded-tl-none`
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isThinking && (
             <div className="flex justify-start">
               <div className={`max-w-[85%] p-4 rounded-2xl rounded-tl-none ${theme.bg} ${theme.border} border-b-4 text-white text-sm font-bold`}>
                 <span className="animate-pulse">Thinking...</span>
               </div>
             </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t-2 border-slate-200 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask AI..."
            className="flex-1 bg-slate-100 border-2 border-slate-200 rounded-2xl px-4 py-3 text-slate-700 font-bold focus:outline-none focus:border-slate-400 focus:bg-white placeholder-slate-400 transition-colors"
          />
          <DuoButton themeColor={config.theme} onClick={handleSend} style={{ padding: '0 1rem'}}>
            Send
          </DuoButton>
        </div>
      </DuoCard>
    </div>
  );
};
