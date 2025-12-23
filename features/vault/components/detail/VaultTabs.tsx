
import React from 'react';
import { BookOpen, CheckCircle2, Map } from 'lucide-react';
import { useLanguage } from '../../../../core/hooks/useLanguage';

interface VaultTabsProps {
    activeTab: string;
    onTabChange: (tab: 'BRIEF' | 'ROADMAP' | 'CRITERIA') => void;
}

export const VaultTabs: React.FC<VaultTabsProps> = ({ activeTab, onTabChange }) => {
    const { t } = useLanguage();
    
    const tabs = [
        { id: 'BRIEF' as const, label: t.vaultDetail.tabs.brief, icon: BookOpen },
        { id: 'ROADMAP' as const, label: 'Roadmap', icon: Map },
        { id: 'CRITERIA' as const, label: t.vaultDetail.tabs.checklist, icon: CheckCircle2 },
    ];

    return (
        <div className="bg-slate-100 p-1 rounded-2xl flex gap-1 border-2 border-slate-200">
            {tabs.map(tab => {
                const isActive = activeTab === tab.id;
                return (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`
                            flex-1 py-2.5 px-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all
                            border-b-[4px] active:border-b-0 active:translate-y-[4px]
                            ${isActive 
                                ? 'bg-white text-slate-800 border-slate-300 shadow-sm' 
                                : 'bg-transparent text-slate-400 border-transparent hover:bg-slate-200/50 hover:text-slate-500'
                            }
                        `}
                    >
                        <tab.icon className={`w-3.5 h-3.5 stroke-[3px] ${isActive ? 'text-sky-500' : 'text-slate-300'}`} />
                        {tab.label}
                    </button>
                )
            })}
        </div>
    );
};
