import React from 'react';
import { Bot } from 'lucide-react';
import { DuoButton } from '../../../components/DuoButton';

interface ApplicationConfirmModalProps {
    isOpen: boolean;
    title: string;
    onConfirm: () => void;
    onCancel: () => void;
    isCreating: boolean;
    themeColor?: string;
}

export const ApplicationConfirmModal: React.FC<ApplicationConfirmModalProps> = ({ 
    isOpen, 
    title, 
    onConfirm, 
    onCancel, 
    isCreating,
    themeColor = 'green'
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={!isCreating ? onCancel : undefined}></div>
            <div className="relative w-full max-w-sm bg-white rounded-[32px] border-4 border-slate-200 shadow-2xl p-6 overflow-hidden animate-in zoom-in-95">
                
                <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-20 h-20 bg-[#1cb0f6] rounded-2xl flex items-center justify-center border-b-[6px] border-[#1899d6] shadow-lg mb-2">
                        <Bot className="w-10 h-10 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-black text-slate-800">Sensei Check</h3>
                    
                    <div className="bg-sky-50 p-4 rounded-2xl border-2 border-sky-100 text-sky-800 font-bold text-sm leading-relaxed">
                        "Do you want to start your application for <span className="text-slate-900 font-black">{title}</span>? I'll set up your workspace and tracking checklist."
                    </div>

                    <div className="grid grid-cols-2 gap-3 w-full pt-2">
                        <DuoButton 
                            onClick={onCancel}
                            disabled={isCreating}
                            variant="secondary"
                            themeColor="slate"
                        >
                            Cancel
                        </DuoButton>
                        <DuoButton 
                            onClick={onConfirm}
                            disabled={isCreating}
                            themeColor={themeColor}
                            isLoading={isCreating}
                        >
                            {isCreating ? 'Setting up...' : "Let's Go"}
                        </DuoButton>
                    </div>
                </div>
            </div>
        </div>
    );
};