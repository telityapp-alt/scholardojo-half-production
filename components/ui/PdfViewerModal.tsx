
import React from 'react';
import { X, Download, ExternalLink, FileText } from 'lucide-react';

interface PdfViewerModalProps {
    isOpen: boolean;
    url: string;
    title: string;
    onClose: () => void;
}

export const PdfViewerModal: React.FC<PdfViewerModalProps> = ({ isOpen, url, title, onClose }) => {
    if (!isOpen) return null;

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = url;
        link.download = `${title.replace(/\s+/g, '_')}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-0 md:p-6 animate-in fade-in duration-300">
            <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-md" onClick={onClose}></div>
            
            <div className="relative w-full max-w-6xl h-full md:h-[90vh] bg-white rounded-t-[40px] md:rounded-[48px] border-x-4 border-t-4 border-slate-200 border-b-[16px] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
                
                <div className="px-6 py-4 bg-white border-b-2 border-slate-100 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center text-red-500 border-b-4 border-red-200">
                            <FileText size={20} strokeWidth={3} />
                        </div>
                        <div className="min-w-0">
                            <h3 className="text-lg font-black text-slate-700 truncate max-w-[200px] md:max-w-md">{title}</h3>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mt-1">Dojo Artifact • Protected View</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button onClick={handleDownload} className="hidden md:flex w-10 h-10 bg-slate-50 text-slate-400 hover:text-sky-500 rounded-xl items-center justify-center transition-all border-b-2 border-slate-200"><Download size={18} strokeWidth={3} /></button>
                        <button onClick={() => window.open(url, '_blank')} className="w-10 h-10 bg-slate-50 text-slate-400 hover:text-indigo-500 rounded-xl flex items-center justify-center transition-all border-b-2 border-slate-200"><ExternalLink size={18} strokeWidth={3} /></button>
                        <button onClick={onClose} className="ml-2 w-10 h-10 bg-slate-100 text-slate-400 hover:text-red-500 rounded-xl flex items-center justify-center border-b-4 border-slate-300 active:translate-y-[2px]"><X size={20} strokeWidth={4} /></button>
                    </div>
                </div>

                <div className="flex-1 bg-slate-800 relative">
                    {/* PRODUCTION FIX: Added sandbox for security */}
                    <iframe 
                        src={`${url}#toolbar=0&navpanes=0&scrollbar=0`} 
                        className="w-full h-full border-none"
                        title={title}
                        sandbox="allow-scripts allow-same-origin"
                        referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-black/20 to-transparent pointer-events-none"></div>
                </div>

                <div className="px-6 py-4 bg-slate-50 border-t-2 border-slate-100 flex items-center justify-between shrink-0">
                    <p className="hidden md:block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Protected Property of Dojo Ninja Academy</p>
                    <button onClick={handleDownload} className="px-6 py-2.5 bg-[#58cc02] text-white rounded-xl font-black text-xs border-b-[4px] border-[#46a302] hover:brightness-110 active:border-b-0 active:translate-y-[4px] transition-all flex items-center gap-2">
                        <Download size={14} strokeWidth={4} /> Save Offline
                    </button>
                </div>
            </div>
        </div>
    );
};
