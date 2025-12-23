
import React, { useState, useEffect, useMemo } from 'react';
import { DossierService } from '../../target/services/dossierService';
import { CheckCircle2, FileText, AlertTriangle, ShieldCheck } from 'lucide-react';
import { UnifiedProgramService } from '../../programs/services/unifiedProgramService';
import { AdmissionPopup } from './AdmissionPopup';
import { useParams } from 'react-router-dom';

interface AdmissionChecklistProps {
    targetId: string;
    onProgressUpdate?: () => void;
}

export const AdmissionChecklist: React.FC<AdmissionChecklistProps> = ({ targetId, onProgressUpdate }) => {
    const { domain } = useParams<{ domain: string }>();
    const domainEnum = (domain as string) || 'scholar';

    const [ledger, setLedger] = useState<any>(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [pendingItem, setPendingItem] = useState<{ id: string; label: string } | null>(null);

    const refresh = () => {
        const data = DossierService.getLedger(targetId);
        setLedger(data);
    };

    useEffect(() => {
        refresh();
        window.addEventListener('storage', refresh);
        return () => window.removeEventListener('storage', refresh);
    }, [targetId]);

    const handleToggleAttempt = (id: string, label: string, currentStatus: string) => {
        if (currentStatus === 'COMPLETED' || currentStatus === 'AI_VERIFIED') {
            DossierService.toggleItem(targetId, id);
            if (onProgressUpdate) onProgressUpdate();
            refresh();
        } else {
            setPendingItem({ id, label });
            setShowConfirm(true);
        }
    };

    const handleFinalConfirm = () => {
        if (pendingItem) {
            DossierService.toggleItem(targetId, pendingItem.id);
            if (onProgressUpdate) onProgressUpdate();
            refresh();
        }
        setShowConfirm(false);
    };

    if (!ledger) return null;

    return (
        <div className="w-full space-y-4 animate-in fade-in duration-500">
            <AdmissionPopup 
                isOpen={showConfirm} 
                onClose={() => setShowConfirm(false)} 
                onConfirm={handleFinalConfirm}
                itemName={pendingItem?.label || ''}
                domain={domainEnum}
            />

            <div className="flex items-center justify-between px-1 gap-4 mb-2">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#58cc02] rounded-xl flex items-center justify-center text-white border-b-4 border-[#46a302] shadow-sm shrink-0">
                        <ShieldCheck size={20} strokeWidth={3} />
                    </div>
                    <div>
                        <h3 className="text-sm font-black text-slate-800 tracking-tight uppercase leading-none">Strike Protocol</h3>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Registry • {ledger.requirements.length} Units</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-3 bg-slate-100/50 px-3 py-2 rounded-2xl border border-slate-200">
                    <span className="font-black text-slate-700 text-[10px]">{ledger.progress}%</span>
                    <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-[#58cc02] transition-all duration-700" style={{ width: `${ledger.progress}%` }} />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-2">
                {ledger.requirements.map((req: any) => {
                    const isDone = req.status === 'COMPLETED' || req.status === 'AI_VERIFIED';

                    return (
                        <div 
                            key={req.id} 
                            onClick={() => handleToggleAttempt(req.id, req.label, req.status)} 
                            className={`
                                group flex items-center gap-3 p-3 rounded-2xl border-2 transition-all cursor-pointer 
                                active:translate-y-[2px] active:border-b-2
                                ${isDone 
                                    ? 'bg-white border-[#58cc02] border-b-[6px]' 
                                    : 'bg-white border-slate-200 border-b-[4px] hover:border-sky-300 hover:bg-slate-50/50'}
                            `}
                        >
                            <div className={`
                                w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border-b-[3px] transition-all
                                ${isDone 
                                    ? 'bg-[#58cc02] border-[#46a302] text-white' 
                                    : 'bg-slate-50 border-slate-200 text-slate-300 group-hover:bg-white group-hover:text-sky-500'}
                            `}>
                                {isDone ? <CheckCircle2 size={20} strokeWidth={4} /> : <FileText size={18} strokeWidth={3} />}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                                <h4 className={`font-black text-xs leading-tight truncate ${isDone ? 'text-slate-800' : 'text-slate-700'}`}>
                                    {req.label}
                                </h4>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <span className={`text-[8px] font-black uppercase tracking-wider ${isDone ? 'text-[#58cc02]' : 'text-slate-400'}`}>
                                        {isDone ? 'SYNCED' : 'PENDING'}
                                    </span>
                                </div>
                            </div>

                            <div className={`
                                w-6 h-6 rounded-lg transition-all flex items-center justify-center border-b-2 
                                ${isDone 
                                    ? 'bg-green-50 text-green-500 border-green-200' 
                                    : 'bg-slate-50 border-slate-200 text-slate-100 group-hover:bg-sky-100 group-hover:text-sky-500'}
                            `}>
                                <CheckCircle2 size={12} strokeWidth={5} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
