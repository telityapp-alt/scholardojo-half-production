
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowRight, Users, Zap, Globe } from 'lucide-react';
import { DomainType } from '../../../core/contracts/entityMap';
import { useLanguage } from '../../../core/hooks/useLanguage';

export const CommunityShortcutCard: React.FC = () => {
    const navigate = useNavigate();
    const { domain } = useParams<{ domain: string }>();
    const { t } = useLanguage();
    const currentDomain = (domain as DomainType) || DomainType.STUDENT;

    const handleGoToScout = () => {
        navigate(`/${currentDomain}/discovery/community-board`);
    };

    return (
        <div className="mt-8 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div 
                onClick={handleGoToScout}
                className="group relative bg-duo-blue rounded-[32px] border-b-[12px] border-duo-blueDark p-6 md:p-8 text-white cursor-pointer hover:brightness-105 active:border-b-0 active:translate-y-[12px] transition-all overflow-hidden shadow-xl flex flex-col md:flex-row items-center justify-between gap-6"
            >
                {/* Background Decorations */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
                <div className="absolute -right-16 -bottom-16 opacity-10 group-hover:rotate-6 transition-transform duration-1000">
                    <Globe className="w-64 h-64" />
                </div>

                <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                    {/* Icon Block - Smaller */}
                    <div className="shrink-0 w-16 h-16 bg-white rounded-2xl border-b-[6px] border-sky-100 flex items-center justify-center text-duo-blue shadow-lg transform -rotate-2 group-hover:rotate-0 transition-transform">
                        <Users size={32} strokeWidth={3} />
                    </div>

                    <div className="space-y-1.5">
                        <div className="inline-flex items-center gap-1.5 bg-black/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                            <Zap size={12} className="text-yellow-300 fill-yellow-300" />
                            <span className="text-[9px] font-black uppercase tracking-widest">{t.community.shortcut.network}</span>
                        </div>
                        <h2 className="text-xl md:text-3xl font-black tracking-tight leading-tight">
                            {t.community.shortcut.question} <span className="text-yellow-300">{t.community.shortcut.target}</span>?
                        </h2>
                        <p className="text-sm font-bold text-sky-50 opacity-90 max-w-lg">
                            {t.community.shortcut.desc}
                        </p>
                    </div>
                </div>

                <div className="relative z-10 shrink-0 w-full md:w-auto">
                    <button className="w-full md:w-auto bg-white text-duo-blue px-6 py-4 rounded-2xl font-black text-sm border-b-[6px] border-slate-200 group-hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-lg">
                        {t.community.shortcut.btn} <ArrowRight className="w-5 h-5 stroke-[4px] group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
};
