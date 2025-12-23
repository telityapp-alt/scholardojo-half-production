
import React, { useState } from 'react';
import { X, FileText, Link, Upload, Sparkles, BrainCircuit, AlertCircle, Search } from 'lucide-react';
import { DuoButton } from '../../../components/DuoButton';
import { scanBriefWithAI } from '../../../services/extractionService';
import { DomainType } from '../../../core/contracts/entityMap';

interface ScannerModalProps {
  domain: DomainType;
  onClose: () => void;
  onResult: (data: any) => void;
}

export const ScannerModal: React.FC<ScannerModalProps> = ({ domain, onClose, onResult }) => {
  const [step, setStep] = useState<'SELECT' | 'INPUT_TEXT' | 'INPUT_URL' | 'SCANNING'>('SELECT');
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const handleScan = async () => {
    if (!inputValue.trim()) return;
    setStep('SCANNING');
    setError('');
    try {
      const data = await scanBriefWithAI(inputValue, domain);
      onResult(data);
    } catch (e: any) {
      setError(e.message || "Dojo Sensei failed to read this.");
      setStep('INPUT_TEXT');
    }
  };

  const OptionCard = ({ icon: Icon, title, desc, onClick, color }: any) => (
    <button 
      onClick={onClick}
      className="group bg-white rounded-3xl border-2 border-slate-200 border-b-[8px] p-6 text-left hover:border-sky-400 hover:border-b-sky-500 transition-all active:border-b-2 active:translate-y-[6px]"
    >
      <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center mb-4 border-b-4 border-black/10`}>
        <Icon className="w-8 h-8 text-white stroke-[3px]" />
      </div>
      <h3 className="text-xl font-black text-slate-700 leading-tight mb-1">{title}</h3>
      <p className="text-slate-400 font-bold text-xs">{desc}</p>
    </button>
  );

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative w-full max-w-2xl bg-white rounded-[40px] border-4 border-slate-200 border-b-[12px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95">
        
        {/* Header */}
        <div className="p-6 bg-slate-50 border-b-2 border-slate-100 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center text-white border-b-4 border-indigo-700">
                  <BrainCircuit size={24} />
               </div>
               <h2 className="text-2xl font-black text-slate-800">Sensei AI Scanner</h2>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-xl text-slate-400 transition-colors">
               <X size={24} strokeWidth={3} />
            </button>
        </div>

        {/* Content */}
        <div className="p-8 flex-1 overflow-y-auto">
            {step === 'SELECT' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <OptionCard 
                        icon={FileText} 
                        title="Paste Brief" 
                        desc="Copy text from LinkedIn or WhatsApp" 
                        color="bg-duo-green"
                        onClick={() => setStep('INPUT_TEXT')}
                    />
                    <OptionCard 
                        icon={Link} 
                        title="Scrape Link" 
                        desc="Paste a URL and I will research it" 
                        color="bg-duo-blue"
                        onClick={() => setStep('INPUT_URL')}
                    />
                    <div className="md:col-span-2">
                        <div className="bg-slate-50 border-2 border-slate-200 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center group hover:bg-sky-50 hover:border-sky-300 transition-all cursor-pointer">
                            <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mb-4 group-hover:bg-sky-200 shadow-sm border-b-4 border-slate-300">
                                <Upload className="text-slate-400 group-hover:text-sky-600" />
                            </div>
                            <span className="font-black text-slate-400 group-hover:text-sky-600 uppercase tracking-widest text-xs">Upload PDF or Image</span>
                        </div>
                    </div>
                </div>
            )}

            {(step === 'INPUT_TEXT' || step === 'INPUT_URL') && (
                <div className="space-y-6 animate-in slide-in-from-right duration-300">
                    <div>
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 block ml-1">
                            {step === 'INPUT_TEXT' ? 'Briefing Content' : 'Website URL'}
                        </label>
                        {step === 'INPUT_TEXT' ? (
                            <textarea 
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Paste requirements, description, or flyer text here..."
                                className="w-full h-64 p-6 bg-slate-50 border-2 border-slate-200 border-b-4 rounded-3xl outline-none focus:border-sky-400 focus:bg-white font-bold text-slate-700 transition-all"
                            />
                        ) : (
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                                <input 
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="https://..."
                                    className="w-full p-5 pl-12 bg-slate-50 border-2 border-slate-200 border-b-4 rounded-2xl outline-none focus:border-sky-400 focus:bg-white font-bold text-slate-700 transition-all"
                                />
                            </div>
                        )}
                    </div>
                    {error && (
                        <div className="bg-red-50 p-4 rounded-2xl border-2 border-red-100 flex gap-3 items-center text-red-600 animate-bounce">
                             <AlertCircle size={20} />
                             <p className="font-bold text-sm">{error}</p>
                        </div>
                    )}
                    <div className="flex gap-4">
                        <DuoButton variant="secondary" themeColor="slate" onClick={() => setStep('SELECT')} className="px-8">
                            Back
                        </DuoButton>
                        <DuoButton 
                            fullWidth 
                            themeColor="green" 
                            disabled={!inputValue.trim()}
                            onClick={handleScan}
                            endIcon={Sparkles}
                        >
                            Analyze with AI
                        </DuoButton>
                    </div>
                </div>
            )}

            {step === 'SCANNING' && (
                <div className="py-20 flex flex-col items-center justify-center space-y-8 animate-in fade-in zoom-in duration-500">
                    <div className="relative">
                        <div className="w-32 h-32 rounded-full border-8 border-sky-100 flex items-center justify-center">
                            <Sparkles className="w-16 h-16 text-sky-500 animate-pulse" />
                        </div>
                        <div className="absolute inset-0 w-32 h-32 rounded-full border-t-8 border-sky-500 animate-spin"></div>
                    </div>
                    <div className="text-center">
                        <h3 className="text-2xl font-black text-slate-700">Sensei is Meditating...</h3>
                        <p className="text-slate-400 font-bold max-w-xs mt-2 mx-auto leading-relaxed">
                            I am extracting dates, organizers, and requirements from your briefing.
                        </p>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};
