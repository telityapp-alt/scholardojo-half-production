
import React, { useState } from 'react';
import { Upload, BrainCircuit, CheckCircle2, AlertCircle, Loader2, Sparkles, Database, FileText, Zap } from 'lucide-react';
import { MelyticsService } from '../services/melyticsService';
import { DomainType } from '../../../core/contracts/entityMap';

interface CvAnalyzerProps {
    domain: DomainType;
    onAnalysisComplete: (data: any) => void;
}

export const CvAnalyzer: React.FC<CvAnalyzerProps> = ({ domain, onAnalysisComplete }) => {
    const [analyzing, setAnalyzing] = useState(false);
    const [error, setError] = useState('');

    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setAnalyzing(true);
        setError('');

        try {
            const reader = new FileReader();
            reader.onload = async (event) => {
                const text = event.target?.result as string;
                if (!text || text.length < 50) {
                    setError("Input too light. Provide a full Resume text.");
                    setAnalyzing(false);
                    return;
                }
                const result = await MelyticsService.analyzeCv(text, domain);
                onAnalysisComplete(result);
                setAnalyzing(false);
            };
            reader.readAsText(file);
        } catch (err) {
            setError("Neural link interrupted. Try manual input.");
            setAnalyzing(false);
        }
    };

    return (
        <div className="bg-[#1cb0f6] rounded-[40px] border-b-[12px] border-[#1899d6] p-10 text-white relative overflow-hidden group shadow-2xl shadow-sky-900/10">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
            <div className="absolute top-0 right-0 p-8 opacity-5 text-white pointer-events-none group-hover:translate-x-5 transition-transform duration-1000">
                <FileText size={200} />
            </div>
            
            <div className="relative z-10 flex flex-col items-center text-center gap-8">
                <div className="w-24 h-24 bg-white/20 backdrop-blur-2xl rounded-[32px] flex items-center justify-center border-2 border-white/30 shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all shadow-2xl">
                    {analyzing ? <Loader2 size={48} className="animate-spin text-white" /> : <BrainCircuit size={48} className="text-white" />}
                </div>
                
                <div className="max-w-md">
                    <div className="inline-flex items-center gap-2 bg-yellow-400 text-yellow-900 px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest mb-4 border-b-2 border-yellow-600">
                        <Zap size={12} fill="currentColor" /> Neural Analysis V3
                    </div>
                    <h3 className="text-3xl font-black mb-3 leading-tight tracking-tight">
                        Boost Matrix with CV
                    </h3>
                    <p className="text-sky-100 text-base font-bold leading-relaxed opacity-90">
                        Upload your .txt resume to auto-populate your entire Melytics foundation with Gemini AI precision.
                    </p>
                </div>

                <div className="w-full">
                    <label className={`
                        cursor-pointer flex items-center justify-center gap-4 px-10 py-5 rounded-[28px] font-black uppercase text-base tracking-widest border-b-[8px] transition-all shadow-2xl
                        ${analyzing ? 'bg-sky-400 border-sky-600 opacity-50 cursor-not-allowed' : 'bg-white text-[#1cb0f6] border-sky-200 hover:bg-sky-50 active:border-b-0 active:translate-y-[8px]'}
                    `}>
                        {analyzing ? <Loader2 className="animate-spin w-6 h-6" /> : <Database size={24} strokeWidth={3} />}
                        {analyzing ? 'Extracting Matrix...' : 'Initialize Scan'}
                        <input type="file" className="hidden" accept=".txt" onChange={handleFile} disabled={analyzing} />
                    </label>
                </div>
            </div>

            {error && (
                <div className="mt-8 p-4 bg-red-500/30 border-2 border-white/20 rounded-2xl flex gap-3 items-center text-xs font-black uppercase tracking-[0.1em] animate-in zoom-in">
                    <AlertCircle size={20} /> {error}
                </div>
            )}
        </div>
    );
};
