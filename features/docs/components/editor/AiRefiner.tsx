
import React, { useState } from 'react';
import { Wand2, RefreshCw, Type, Zap, X, Info } from 'lucide-react';
import { AIOrchestrator } from '../../../../core/engines/aiOrchestrator';
import { Editor } from '@tiptap/react';
import confetti from 'canvas-confetti';

export const AiRefiner: React.FC<{ editor: Editor | null }> = ({ editor }) => {
    const [loading, setLoading] = useState(false);
    
    if (!editor) return null;

    const selection = editor.state.selection;
    const hasSelection = !selection.empty;

    const handleRefine = async (mode: 'FORMAL' | 'PUNCHY' | 'SHORTER') => {
        const text = hasSelection ? editor.state.doc.textBetween(selection.from, selection.to) : editor.getText();
        if (!text) return;

        setLoading(true);
        const system = `You are the "Grammar Ninja". Refine this text to be ${mode}. 
            Return ONLY the refined text. No conversational filler. Keep technical context.`;
        
        try {
            const res = await AIOrchestrator.generateContent({ 
                model: 'gemini-3-flash-preview', 
                contents: text, 
                config: { systemInstruction: system } 
            });
            if (res.text) {
                if (hasSelection) {
                    editor.chain().focus().insertContent(res.text).run();
                } else {
                    editor.commands.setContent(res.text);
                }
                confetti({ particleCount: 40, spread: 60, origin: { x: 0.9, y: 0.5 } });
            }
        } catch (e) {}
        setLoading(false);
    };

    return (
        <div className="space-y-4 animate-in slide-in-from-right duration-400">
             <div className="p-4 bg-sky-50 rounded-2xl border-2 border-sky-100 flex items-center gap-3">
                <Info size={16} className="text-sky-500" />
                <p className="text-[10px] font-bold text-sky-700 leading-tight">
                    {hasSelection ? "Applying strike to selected text." : "No selection. Refiner will target entire document."}
                </p>
            </div>
            <div className="grid grid-cols-1 gap-2">
                {[
                    { id: 'FORMAL', label: 'Make Professional', icon: Type, color: 'sky' },
                    { id: 'PUNCHY', label: 'High Impact Strike', icon: Zap, color: 'orange' },
                    { id: 'SHORTER', label: 'Concise Mode', icon: X, color: 'red' }
                ].map(m => (
                    <button 
                        key={m.id}
                        onClick={() => handleRefine(m.id as any)}
                        disabled={loading}
                        className={`w-full p-4 rounded-2xl border-2 border-slate-200 border-b-[6px] hover:border-sky-400 bg-white flex items-center gap-4 transition-all active:translate-y-1 active:border-b-2 disabled:opacity-50`}
                    >
                        <div className={`w-10 h-10 rounded-xl bg-${m.color}-50 text-${m.color}-500 flex items-center justify-center border-b-2 border-${m.color}-100`}>
                            {loading ? <RefreshCw className="animate-spin" size={18}/> : <m.icon size={18} strokeWidth={3}/>}
                        </div>
                        <span className="font-black text-slate-700 text-[10px] uppercase tracking-widest">{m.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};
