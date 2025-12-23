
import React from 'react';
import { UserProfile } from '../../../../core/access/userAccess';
import { ArrowRight, Sparkles } from 'lucide-react';
import { DomainConfig } from '../../../../core/contracts/domainConfig';
import { useLanguage } from '../../../../core/hooks/useLanguage';

interface WelcomeHeaderProps {
    user: UserProfile | null;
    config: DomainConfig;
    onPrimaryAction: () => void;
}

export const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({ user, config, onPrimaryAction }) => {
    const { t } = useLanguage();
    
    const getTheme = () => {
        switch(config.theme) {
            case 'green': return { bg: 'bg-duo-green', border: 'border-duo-greenDark' };
            case 'orange': return { bg: 'bg-duo-orange', border: 'border-orange-600' };
            case 'blue': return { bg: 'bg-duo-blue', border: 'border-duo-blueDark' };
            default: return { bg: 'bg-duo-green', border: 'border-duo-greenDark' };
        }
    };
    const theme = getTheme();

    return (
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white p-6 md:p-8 rounded-[40px] border-2 border-slate-200 border-b-[10px] relative overflow-hidden group shadow-sm">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none group-hover:scale-105 transition-transform duration-1000"></div>
            
            <div className="flex items-center gap-6 relative z-10">
                <div className="w-20 h-20 rounded-[28px] bg-slate-100 border-2 border-slate-200 border-b-[6px] flex items-center justify-center overflow-hidden shrink-0 shadow-lg transform group-hover:rotate-2 transition-all duration-500">
                    {user?.avatarSeed ? (
                        <img 
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.avatarSeed}`} 
                            alt="Avatar" 
                            className="w-full h-full object-cover" 
                        />
                    ) : (
                        <span className="text-4xl">👋</span>
                    )}
                </div>
                <div>
                    <div className="flex items-center gap-2 mb-1.5">
                        <Sparkles size={14} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em]">{config.name} Command</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight leading-none">Welcome back, {user?.name.split(' ')[0]}</h1>
                    <p className="text-slate-400 font-bold text-sm mt-1.5 opacity-80">{t.dashboard.ready}</p>
                </div>
            </div>

            <button 
                onClick={onPrimaryAction}
                className={`w-full md:w-auto ${theme.bg} hover:brightness-110 text-white px-8 py-4 rounded-[24px] font-black text-base border-b-[6px] ${theme.border} active:border-b-0 active:translate-y-[6px] transition-all flex items-center justify-center gap-3 tracking-widest relative z-10 shadow-xl group/btn`}
            >
                Launch Explorer <ArrowRight className="w-5 h-5 stroke-[4px] group-hover/btn:translate-x-1 transition-transform" />
            </button>
        </div>
    );
};
