
import React from 'react';
import { X, CheckCircle2, Wand2, ShieldCheck, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    itemName: string;
    domain: string;
}

export const AdmissionPopup: React.FC<Props> = ({ isOpen, onClose, onConfirm, itemName, domain }) => {
    const navigate = useNavigate();
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[5000] flex items-center justify-center p-4 animate-in fade-in duration-300">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
            
            <div className="relative w-full max-w-md bg-white rounded-[48px] border-4 border-slate-200 border-b-[16px] shadow-[0_40px_100px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
                
                <div className="bg-[#1cb0f6] p-10 flex flex-col items-center justify-center text-white relative">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <div className="w-24 h-24 bg-white rounded-[32px] flex items-center justify-center text-[#1cb0f6] border-b-[8px] border-sky-100 shadow-2xl mb-6 relative z-10 animate-bounce-slow">
                        <ShieldCheck size={56} strokeWidth={3} />
                    </div>
                    <h3 className="text-3xl font-black tracking-tighter leading-tight text-center relative z-10 uppercase italic">Confirm Strike?</h3>
                    <button onClick={onClose} className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"><X size={28} strokeWidth={4}/></button>
                </div>

                <div className="p-8 space-y-8">
                    <div className="bg-slate-50 p-6 rounded-[32px] border-2 border-slate-100 space-y-6 text-center">
                        <p className="text-lg font-bold text-slate-500 leading-relaxed">
                            Finalizing <span className="text-slate-800 font-black italic">"{itemName}"</span>?
                        </p>
                        
                        <div className="bg-white p-5 rounded-2xl border-2 border-sky-100 flex items-center gap-4 group hover:border-sky-400 transition-all shadow-sm">
                            <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-500 flex items-center justify-center border-b-2 border-sky-100 shrink-0"><Sparkles size={24} fill="currentColor" /></div>
                            <div className="text-left">
                                <h4 className="font-black text-sky-700 text-[10px] uppercase tracking-widest">Sensei Blueprint</h4>
                                <p className="text-[11px] font-bold text-sky-600 leading-tight">Use Docs Dojo for an 89% better audit score.</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <button 
                            onClick={() => { navigate(`/${domain}/workspace/library`); onClose(); }}
                            className="w-full py-5 bg-[#ce82ff] text-white rounded-2xl font-black text-xl border-b-[8px] border-[#a855f7] hover:brightness-110 active:border-b-0 active:translate-y-[8px] transition-all flex items-center justify-center gap-4 shadow-xl"
                        >
                            <Wand2 size={24} strokeWidth={3} /> Docs Dojo
                        </button>
                        
                        <div className="flex gap-4">
                            <button onClick={onClose} className="flex-1 py-4 bg-white border-2 border-slate-200 border-b-[6px] rounded-2xl font-black text-sm uppercase tracking-widest text-slate-400 active:border-b-2 active:translate-y-[4px] transition-all">Cancel</button>
                            <button onClick={() => { onConfirm(); onClose(); }} className="flex-1 py-4 bg-[#58cc02] border-b-[8px] border-[#46a302] text-white rounded-2xl font-black text-sm uppercase tracking-widest active:border-b-0 active:translate-y-[8px] transition-all shadow-lg flex items-center justify-center gap-2">
                                <CheckCircle2 size={20} strokeWidth={4} /> Strike
                            </button>
                        </div>
                    </div>
                </div>
                
                <div className="bg-slate-50 py-3 border-t-2 border-slate-100 text-center">
                    <p className="text-[8px] font-black text-slate-300 uppercase tracking-[0.5em]">Registry Verification Protocol Active</p>
                </div>
            </div>
        </div>
    );
};
