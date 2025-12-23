
import React, { useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { DomainType } from '../../core/contracts/entityMap';
import { Target, Briefcase, FileText, CheckCircle2, Swords, FlaskConical, Lock, Loader2 } from 'lucide-react';
import { useRegion } from '../../core/hooks/useRegion';

export const EcosystemSwitcher: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { domain } = useParams<{ domain: string }>();
    const { regionId } = useRegion();
    const [isNavigating, setIsNavigating] = React.useState<string | null>(null);
    
    const currentDomain = (domain as DomainType) || DomainType.SCHOLAR;
    const isIndo = regionId === 'id';

    // RESET LOADING STATE ONCE URL CHANGES
    useEffect(() => {
        setIsNavigating(null);
    }, [location.pathname]);

    const ECOSYSTEMS = [
        { id: DomainType.SCHOLAR, label: 'Scholar Dojo', icon: Target, theme: { bg: 'bg-duo-blue', dark: 'border-duo-blueDark' }, locked: false },
        { id: DomainType.INTERN, label: 'Intern Dojo', icon: Briefcase, theme: { bg: 'bg-duo-orange', dark: 'border-orange-600' }, locked: false },
        { id: DomainType.COMPETITION, label: 'Tournament Arena', icon: Swords, theme: { bg: 'bg-duo-red', dark: 'border-duo-redDark' }, locked: !isIndo },
        { id: DomainType.RESEARCH, label: 'Research Lab', icon: FlaskConical, theme: { bg: 'bg-teal-500', dark: 'border-teal-700' }, locked: !isIndo },
        { id: DomainType.DOCS, label: 'Forge Studio', icon: FileText, theme: { bg: 'bg-duo-purple', dark: 'border-duo-purpleDark' }, locked: false },
    ];

    const handleSwitch = (eco: any) => {
        if (eco.id === currentDomain) return;
        if (eco.locked) return;

        // Start visual feedback
        setIsNavigating(eco.id);

        const path = eco.id === DomainType.DOCS 
            ? `/${eco.id}/workspace/library` 
            : `/${eco.id}/workspace/home`;
            
        // Small delay to allow pulse animation to trigger
        setTimeout(() => {
            navigate(path);
        }, 150);
    };

    return (
        <div className="fixed right-4 top-1/2 -translate-y-1/2 z-[99999] flex flex-col gap-3 items-end">
            {ECOSYSTEMS.map((eco) => {
                const isActive = currentDomain === eco.id;
                const isLoading = isNavigating === eco.id;
                
                return (
                    <div key={eco.id} className="group relative flex items-center justify-end">
                        {/* Tooltip Label - Lighter Font */}
                        <div className="mr-3 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none translate-x-2 group-hover:translate-x-0">
                            <div className="bg-slate-800 text-white px-3 py-1.5 rounded-xl text-[11px] font-bold tracking-tight whitespace-nowrap shadow-2xl border-b-4 border-black">
                                {eco.label}
                                {eco.locked && " (LOCKED)"}
                            </div>
                        </div>

                        <button
                            onClick={() => handleSwitch(eco)}
                            disabled={eco.locked || isLoading}
                            className={`
                                w-14 h-14 rounded-2xl border-2 transition-all duration-200 flex items-center justify-center relative shadow-xl
                                ${isActive 
                                    ? `${eco.theme.bg} ${eco.theme.dark} border-b-[8px] cursor-default scale-110` 
                                    : `bg-white border-slate-200 border-b-[6px] hover:border-slate-300 hover:-translate-y-1 active:border-b-2 active:translate-y-[4px]`}
                                ${eco.locked && !isActive ? 'grayscale opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                                ${isLoading ? 'animate-pulse' : ''}
                            `}
                        >
                            {isLoading ? (
                                <Loader2 size={24} className="animate-spin text-sky-500" strokeWidth={4} />
                            ) : (
                                <eco.icon 
                                    size={24} 
                                    strokeWidth={isActive ? 3 : 2.5} 
                                    className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'} 
                                />
                            )}
                            
                            {/* Indicators */}
                            {isActive && !isLoading && (
                                <div className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 border-2 border-slate-100 shadow-sm animate-in zoom-in">
                                    <CheckCircle2 size={12} className="text-duo-green" strokeWidth={4} />
                                </div>
                            )}
                            {eco.locked && !isActive && (
                                <div className="absolute -top-1 -right-1 bg-red-500 rounded-full p-1 border-2 border-white shadow-sm text-white">
                                    <Lock size={8} strokeWidth={3} />
                                </div>
                            )}
                        </button>
                    </div>
                );
            })}
        </div>
    );
};
