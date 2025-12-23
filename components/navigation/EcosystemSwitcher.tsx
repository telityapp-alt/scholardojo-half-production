
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DomainType } from '../../core/contracts/entityMap';
import { Target, Briefcase, FileText, CheckCircle2, Swords, FlaskConical } from 'lucide-react';

export const EcosystemSwitcher: React.FC = () => {
    const navigate = useNavigate();
    const { domain } = useParams<{ domain: string }>();
    const currentDomain = (domain as DomainType) || DomainType.SCHOLAR;

    const ECOSYSTEMS = [
        { id: DomainType.SCHOLAR, label: 'Scholar Dojo', icon: Target, theme: { bg: 'bg-duo-blue', dark: 'border-duo-blueDark' } },
        { id: DomainType.INTERN, label: 'Intern Dojo', icon: Briefcase, theme: { bg: 'bg-duo-orange', dark: 'border-orange-600' } },
        { id: DomainType.COMPETITION, label: 'Tournament Arena', icon: Swords, theme: { bg: 'bg-duo-red', dark: 'border-duo-redDark' } },
        { id: DomainType.RESEARCH, label: 'Research Lab', icon: FlaskConical, theme: { bg: 'bg-teal-500', dark: 'border-teal-700' } },
        { id: DomainType.DOCS, label: 'Forge Studio', icon: FileText, theme: { bg: 'bg-duo-purple', dark: 'border-duo-purpleDark' } },
    ];

    const handleSwitch = (d: DomainType) => {
        if (d === currentDomain) return;
        const path = d === DomainType.DOCS ? `/${d}/workspace/library` : `/${d}/workspace/home`;
        navigate(path);
    };

    return (
        <div className="fixed right-4 top-24 z-[5000] flex flex-col gap-3 items-end pointer-events-none">
            {ECOSYSTEMS.map((eco) => {
                const isActive = currentDomain === eco.id;
                
                return (
                    <div key={eco.id} className="pointer-events-auto group relative flex items-center justify-end">
                        <div className="mr-2 opacity-0 group-hover:opacity-100 group-hover:-translate-x-2 transition-all duration-300 pointer-events-none">
                            <div className="bg-white border-2 border-slate-200 border-b-4 px-4 py-2 rounded-2xl shadow-xl">
                                <span className="font-display font-black text-[10px] text-slate-700 whitespace-nowrap uppercase tracking-wider">
                                    {eco.label}
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={() => handleSwitch(eco.id)}
                            className={`
                                w-14 h-14 rounded-2xl border-2 transition-all duration-200 flex items-center justify-center relative
                                ${isActive 
                                    ? `${eco.theme.bg} ${eco.theme.dark} border-b-[8px] cursor-default scale-110 shadow-lg` 
                                    : `bg-white border-slate-200 border-b-[6px] hover:border-slate-300 hover:-translate-y-1 active:border-b-2 active:translate-y-[4px] shadow-md`}
                            `}
                        >
                            <eco.icon 
                                size={24} 
                                strokeWidth={3} 
                                className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'} 
                            />
                            {isActive && (
                                <div className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 border-2 border-slate-100 shadow-sm">
                                    <CheckCircle2 size={12} className="text-duo-green" strokeWidth={4} />
                                </div>
                            )}
                        </button>
                    </div>
                );
            })}
        </div>
    );
};
