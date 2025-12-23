import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Sparkles, MessageSquare, Zap, Trophy, History, X, User, Flame, Crown, Target } from 'lucide-react';
import { getChatResponse } from '../../../services/geminiService';

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface AICompanionProps {
  context: string;
  onClose: () => void;
  mode?: 'WIDGET' | 'PANEL'; // New Prop to control layout style
}

export const AICompanion: React.FC<AICompanionProps> = ({ context, onClose, mode = 'WIDGET' }) => {
  const [activeTab, setActiveTab] = useState<'CHAT' | 'QUESTS'>('CHAT');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hey! Sensei here. Ready to secure that funding? 🥋" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, activeTab]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    // Prepare history for API
    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const response = await getChatResponse(history, userMsg, context);
    
    setMessages(prev => [...prev, { role: 'model', text: response || "I'm meditating... try again." }]);
    setIsTyping(false);
  };

  const TabButton = ({ id, icon: Icon, label, color }: any) => (
      <button 
        onClick={() => setActiveTab(id)}
        className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase tracking-wider flex flex-col items-center justify-center gap-1 transition-all border-b-[4px] active:border-b-0 active:translate-y-[4px] ${
            activeTab === id 
            ? `${color} text-white border-transparent` 
            : 'bg-white text-slate-400 border-slate-200 hover:bg-slate-50'
        }`}
      >
          <Icon className="w-5 h-5 stroke-[3px]" />
          {label}
      </button>
  );

  // Dynamic Styles based on Mode
  // If PANEL, it fills the parent container (sidebar) completely.
  // If WIDGET, it floats (though this component assumes the parent wrapper handles floating logic now)
  const containerClasses = mode === 'WIDGET'
    ? "w-full h-full"
    : "w-full h-full rounded-[32px] border-b-[8px] shadow-lg";

  return (
    <div className={`bg-white flex flex-col overflow-hidden duration-300 ${containerClasses}`}>
      
      {/* Header Area */}
      <div className="bg-white p-4 border-b-2 border-slate-100 shrink-0 flex items-center justify-between z-20 relative">
          <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#1cb0f6] border-b-[4px] border-[#1899d6] flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.1))]"></div>
                  <Bot className="w-7 h-7 text-white relative z-10" />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-300 border-2 border-green-600 rounded-full animate-pulse z-20"></div>
              </div>
              <div>
                  <h3 className="font-black text-slate-700 text-lg leading-none">Sensei AI</h3>
                  <p className="text-[#1cb0f6] text-[10px] font-black uppercase tracking-widest mt-1">
                      Online • Mentor
                  </p>
              </div>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors flex items-center justify-center border-2 border-transparent hover:border-red-100 active:scale-95"
            title="Close Panel"
          >
              <X className="w-5 h-5 stroke-[3px]" />
          </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-slate-50/50 relative overflow-hidden flex flex-col">
          {activeTab === 'CHAT' && (
              <>
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-200" ref={scrollRef}>
                      <div className="text-center py-2">
                          <span className="bg-slate-100 text-slate-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Today</span>
                      </div>
                      {messages.map((m, i) => (
                          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                              <div className={`max-w-[85%] p-3 rounded-2xl text-sm font-bold leading-relaxed shadow-sm border-2 border-b-[4px] ${
                                  m.role === 'user' 
                                  ? 'bg-[#1cb0f6] text-white border-[#1899d6] rounded-tr-none' 
                                  : 'bg-white text-slate-600 border-slate-200 rounded-tl-none'
                              }`}>
                                  {m.text}
                              </div>
                          </div>
                      ))}
                      {isTyping && (
                          <div className="flex justify-start">
                              <div className="bg-white border-2 border-slate-200 p-3 rounded-2xl rounded-tl-none flex gap-1">
                                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-75"></span>
                                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150"></span>
                              </div>
                          </div>
                      )}
                  </div>

                  <div className="p-3 bg-white border-t-2 border-slate-100">
                      <div className="relative">
                          <input 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Ask for advice..."
                            className="w-full bg-slate-50 text-slate-700 pl-4 pr-12 py-3 rounded-xl border-2 border-slate-200 outline-none focus:border-sky-400 focus:bg-white transition-all font-bold placeholder:text-slate-400 border-b-[4px] text-sm"
                          />
                          <button 
                            onClick={handleSend}
                            disabled={!input.trim()}
                            className="absolute right-2 top-2 p-1.5 bg-[#1cb0f6] rounded-lg text-white hover:bg-[#1899d6] border-b-[4px] border-[#1899d6] active:border-b-0 active:translate-y-[4px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                              <Send className="w-4 h-4 stroke-[3px]" />
                          </button>
                      </div>
                  </div>
              </>
          )}

          {activeTab === 'QUESTS' && (
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {/* Minimized "Current Focus" Card */}
                  <div className="bg-white border-2 border-slate-200 border-b-[6px] rounded-2xl p-4 relative overflow-hidden group">
                      <div className="flex justify-between items-start mb-2">
                          <div>
                              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Context</p>
                              <h4 className="text-lg font-black text-slate-700">{context === 'dashboard' ? 'Daily Grind' : context.toUpperCase()}</h4>
                          </div>
                          <Trophy className="w-8 h-8 text-yellow-400 fill-yellow-400" />
                      </div>
                      
                      <div className="space-y-1">
                           <div className="flex justify-between text-[10px] font-black text-slate-400">
                               <span>Progress</span>
                               <span>70%</span>
                           </div>
                           <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-yellow-400 w-[70%] border-r-4 border-yellow-500"></div>
                           </div>
                      </div>
                  </div>

                  <div className="space-y-3">
                      <h4 className="text-slate-400 text-[10px] font-black uppercase tracking-widest px-1 mt-2">Recommended Actions</h4>
                      
                      {[
                          { icon: Zap, title: "Speed Run", desc: "Complete 3 tasks in 1 hour", xp: 50, color: "text-yellow-500 bg-yellow-100" },
                          { icon: History, title: "Review Past", desc: "Check yesterday's feedback", xp: 20, color: "text-sky-500 bg-sky-100" },
                          { icon: Sparkles, title: "Polish Essay", desc: "Use the AI editor once", xp: 100, color: "text-purple-500 bg-purple-100" }
                      ].map((quest, i) => (
                          <div key={i} className="bg-white border-2 border-slate-100 border-b-[4px] p-3 rounded-2xl flex items-center gap-3 hover:bg-slate-50 transition-colors cursor-pointer active:border-b-2 active:translate-y-[2px] group">
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${quest.color} shrink-0`}>
                                  <quest.icon className="w-5 h-5 stroke-[3px]" />
                              </div>
                              <div className="flex-1">
                                  <h5 className="text-slate-700 font-black text-xs">{quest.title}</h5>
                                  <p className="text-slate-400 text-[10px] font-bold">{quest.desc}</p>
                              </div>
                              <div className="text-right">
                                  <span className="block text-slate-700 font-black text-xs">+{quest.xp}</span>
                                  <span className="text-slate-300 text-[9px] font-black uppercase">XP</span>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          )}
      </div>

      {/* Tabs Footer */}
      <div className="p-2 bg-slate-50 border-t-2 border-slate-200 flex gap-2 shrink-0">
          <TabButton id="CHAT" icon={MessageSquare} label="Chat" color="bg-sky-500 border-sky-600" />
          <TabButton id="QUESTS" icon={Zap} label="Boost" color="bg-purple-500 border-purple-600" />
      </div>

    </div>
  );
};