
import React, { useState } from 'react';
import { Lightbulb, RefreshCw, MessageSquare, Sparkles, Send } from 'lucide-react';
import { AIOrchestrator } from '../../../../core/engines/aiOrchestrator';
import { Editor } from '@tiptap/react';

export const AiSuggest: React.FC<{ editor: Editor | null }> = ({ editor }) => {
    const [loading, setLoading] = useState(false);
    const [suggestion, setSuggestion] = useState<string | null>(null);
    
    if (!editor) return null;

    const selection = editor.state.selection;
    const highlightedText = selection.empty ? "" : editor.state.doc.textBetween(selection.from, selection.to);

    const getSuggestion = async () => {
        setLoading(true);
        const context = editor.getText();
        const system = `You are the "Dojo Strategist". Provide one brilliant suggestion to improve this document. 
            Highlight: ${highlightedText || 'Full Document'}.
            Be specific. Suggest content that boosts the candidate's ranking.`;
        
        try {
            const res = await AIOrchestrator.generateContent({ 
                model: 'gemini-3-flash-preview', 
                contents: context, 
                config: { systemInstruction: system } 
            });
            setSuggestion(res.text || "Sensei is meditating.");
        } catch (e: any) { 
            setSuggestion(`Neural link lost: ${e.message}`); 
        }
        setLoading(false);
    };

    return (
        <div className="space-y-6">
            {!suggestion ? (
                <button onClick={getSuggestion} disabled={loading} className="w-full p-8 bg-white border-2 border-purple-200 border-b-[10px] rounded-[40px] flex flex-col items-center gap-4 hover:bg-purple-50 active:translate-y-2 transition-all group">
                    <div className="w-16 h-16 bg-purple-500 rounded-3xl flex items-center justify-center text-white border-b-4 border-purple-700 group-hover:scale-110 transition-transform">
                        {loading ? <RefreshCw className="animate-spin" /> : <Lightbulb size={32} />}
                    </div>
                    <span className="font-black text-purple-700 text-[11px] uppercase tracking-widest text-center">Get Strategic Suggestion</span>
                </button>
            ) : (
                <div className="bg-purple-50 p-6 rounded-[32px] border-2 border-purple-100 border-b-[8px] space-y-4 animate-in zoom-in-95">
                    <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black uppercase text-purple-500 tracking-widest flex items-center gap-2"><Sparkles size={12}/> Sensei Insight</span>
                        <button onClick={() => setSuggestion(null)} className="text-purple-300 hover:text-purple-600"><RefreshCw size={14}/></button>
                    </div>
                    <p className="text-sm font-bold text-slate-600 leading-relaxed italic">"{suggestion}"</p>
                    {highlightedText && (
                        <div className="p-3 bg-white rounded-xl border-2 border-purple-100">
                             <p className="text-[9px] font-black text-purple-300 uppercase mb-1">Target Context</p>
                             <p className="text-[10px] font-bold text-slate-400 truncate">{highlightedText}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
