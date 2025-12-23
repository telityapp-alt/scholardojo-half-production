
import React, { useState } from 'react';
import { Target, ArrowRight, Building2, Heart } from 'lucide-react';
import { GenericVaultItem, DomainType } from '../../../core/contracts/entityMap';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../../core/hooks/useLanguage';
import { formatPrice } from '../../../core/engines/currencyEngine';
import { SaveService } from '../../../core/access/saveAccess';

interface VaultCardProps {
    item: GenericVaultItem;
    domain: DomainType;
}

export const VaultCard: React.FC<VaultCardProps> = ({ item, domain }) => {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const [isSaved, setIsSaved] = useState(() => SaveService.isSaved(item.id));
    
    const isMatch = item.matchScore >= 90;
    const isPrestige = item.tier === 'mythic';

    const cardStyle = isPrestige
        ? 'border-sky-200 border-b-sky-400 bg-sky-50/40 hover:border-sky-400 hover:border-b-sky-500 hover:bg-sky-50'
        : 'border-slate-200 border-b-slate-300 bg-white hover:border-indigo-300 hover:border-b-indigo-50';

    const handleSave = (e: React.MouseEvent) => {
        e.stopPropagation();
        const saved = SaveService.toggle(item, 'VAULT', domain);
        setIsSaved(saved);
    };

    return (
        <div
            onClick={() => navigate(`/${domain}/discovery/board/${item.id}`)}
            className={`
                group rounded-[32px] border-2 border-b-[8px] p-6 cursor-pointer 
                hover:-translate-y-1 hover:border-b-[12px] 
                active:border-b-2 active:translate-y-[6px] 
                transition-all flex flex-col relative overflow-hidden h-full 
                ${cardStyle}
            `}
        >
            <div className="absolute top-0 right-0 flex items-start gap-2 z-10">
                {isMatch && (
                    <div className="bg-yellow-400 text-yellow-900 text-[10px] font-black uppercase px-3 py-1 rounded-bl-xl shadow-sm flex items-center gap-1">
                        <Target className="w-3 h-3" /> {item.matchScore}% {t.vault.card.match}
                    </div>
                )}
                <button 
                    onClick={handleSave}
                    className={`mt-2 mr-2 p-2 rounded-xl border-2 border-b-4 transition-all active:border-b-0 active:translate-y-[4px] ${isSaved ? 'bg-pink-100 border-pink-200 text-pink-500' : 'bg-white/80 border-slate-100 text-slate-300 hover:text-pink-400'}`}
                >
                    <Heart size={16} fill={isSaved ? "currentColor" : "none"} strokeWidth={3} />
                </button>
            </div>

            <div className="flex items-start gap-4 mb-4 mt-1">
                <div className="w-14 h-14 rounded-2xl bg-white border-2 border-slate-100 flex items-center justify-center overflow-hidden shrink-0 shadow-sm text-slate-300">
                    <Building2 className="w-6 h-6" />
                </div>
                
                <div className="flex-1 min-w-0">
                    <h3 className={`text-xl font-black leading-tight transition-colors line-clamp-2 ${isPrestige ? 'text-slate-800' : 'text-slate-700 group-hover:text-indigo-600'}`}>
                        {item.title}
                    </h3>
                    <p className="text-slate-400 font-bold text-xs tracking-wide flex items-center gap-1 mt-1 truncate">
                        {item.hostName}
                    </p>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
                {item.tags.slice(0, 4).map((tag, i) => (
                    <span key={i} className="inline-flex items-center px-3 py-1.5 rounded-xl border-b-2 border-slate-200 bg-slate-100 text-slate-500 font-bold text-[10px] tracking-wide">
                        {tag}
                    </span>
                ))}
            </div>

            <div className={`flex items-center justify-between pt-4 border-t-2 transition-colors mt-auto ${isPrestige ? 'border-sky-100' : 'border-slate-50'}`}>
                <div className="text-xs font-black text-slate-400 uppercase tracking-widest">
                    {formatPrice(item.value)}
                </div>
                <div className={`flex items-center gap-2 font-black text-xs uppercase tracking-widest group-hover:gap-3 transition-all ${isPrestige ? 'text-sky-600' : 'text-indigo-500'}`}>
                    {t.vault.card.view} <ArrowRight className="w-4 h-4 stroke-[3px]" />
                </div>
            </div>
        </div>
    );
};
