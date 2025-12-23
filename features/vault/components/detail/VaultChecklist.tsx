
import React from 'react';
import { GenericVaultItem } from '../../../../core/contracts/entityMap';
import { DuoButton } from '../../../../components/DuoButton';
import { CheckCircle2, FileText, CheckSquare, ListTodo } from 'lucide-react';
import { DuoIcon } from '../../../../components/ui/DuoIcon';

interface VaultChecklistProps {
    item: GenericVaultItem;
    onStartApp: () => void;
    themeColor?: string;
}

export const VaultChecklist: React.FC<VaultChecklistProps> = ({ item, onStartApp, themeColor = 'blue' }) => {
    
    const checklist = item.requirements || [];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            <div className="bg-white p-6 md:p-8 rounded-[32px] border-2 border-slate-200 border-b-[8px]">
                <div className="flex items-center gap-3 mb-8">
                    <DuoIcon icon={ListTodo} color={themeColor as any} size="sm" />
                    <div>
                        <h3 className="font-black text-slate-700 text-lg uppercase tracking-tight">Admission Specs</h3>
                        <p className="text-slate-400 font-bold text-xs">A preview of your mission objectives.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                    {checklist.map((req) => (
                        <div key={req.id} className="flex items-center gap-4 p-4 rounded-2xl border-2 border-slate-100 bg-slate-50/50 opacity-80 group hover:opacity-100 transition-opacity">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border-b-2 bg-white border-slate-200 text-slate-300 group-hover:text-sky-400 transition-colors`}>
                                {req.type === 'document' ? <FileText size={20} /> : <CheckSquare size={20} />}
                            </div>
                            <div className="flex-1">
                                <p className="font-bold text-slate-600 text-sm leading-tight">{req.label}</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-[8px] font-black uppercase text-slate-300 tracking-widest">
                                        {req.type}
                                    </span>
                                    {req.mandatory && <span className="text-[7px] font-black uppercase text-red-400 tracking-widest bg-red-50 px-1.5 py-0.5 rounded border border-red-100">Required</span>}
                                </div>
                            </div>
                            <div className="w-5 h-5 rounded-full border-2 border-slate-200 bg-white"></div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 pt-8 border-t-2 border-slate-50 text-center">
                    <p className="text-slate-400 font-bold text-xs mb-4 uppercase tracking-widest opacity-60">Unlock interactive tracking</p>
                    <DuoButton 
                        themeColor={themeColor} 
                        fullWidth 
                        onClick={onStartApp}
                        className="!py-4 text-sm"
                    >
                        Start Your Application
                    </DuoButton>
                </div>
            </div>
        </div>
    );
};
