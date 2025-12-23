import React from 'react';
import { MapPin } from 'lucide-react';
import { GenericHost, SuperTag } from '../../../core/contracts/entityMap';
import { useNavigate } from 'react-router-dom';
import { SuperTagBadge } from '../../../components/SuperTagBadge';

interface HostCardProps {
    host: GenericHost;
    domain: string;
}

export const HostCard: React.FC<HostCardProps> = ({ host, domain }) => {
    const navigate = useNavigate();

    // Theme logic similar to the requested snippet
    const getBorderColor = () => {
        if (host.tier === 'mythic') return 'border-red-200 hover:border-red-400';
        if (host.tier === 'rare') return 'border-sky-200 hover:border-sky-400';
        return 'border-slate-200 hover:border-indigo-400';
    };
    
    // Auto-generate tags based on host data
    const autoTags: SuperTag[] = (host.tags || []).map((t, i) => ({
        id: `ht-${i}`,
        label: t,
        variant: 'type',
        color: i === 0 ? 'bg-orange-100 text-orange-600 border-orange-200' : 'bg-slate-100 text-slate-600 border-slate-200',
        iconName: i === 0 ? 'star' : 'circle'
    }));

    return (
        <div 
            onClick={() => navigate(`/${domain}/discovery/hosts/${host.id}`)}
            className={`
                group bg-white rounded-[32px] border-2 ${getBorderColor()} border-b-[8px] 
                cursor-pointer hover:-translate-y-1 hover:border-b-[12px] 
                active:border-b-2 active:translate-y-[6px] 
                transition-all flex flex-col overflow-hidden relative h-full
            `}
        >
            {/* Image Header */}
            <div className="h-40 relative bg-slate-100">
                {host.detailImage ? (
                    <img src={host.detailImage} alt={host.name} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-slate-200"></div>
                )}
                
                {/* Location Badge Overlay */}
                <div className="absolute top-4 left-4">
                     <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-xl border-b-4 border-slate-200 text-slate-700 font-black text-xs uppercase tracking-wider flex items-center gap-1 shadow-sm">
                        <MapPin className="w-3 h-3 text-slate-400" /> {host.location ? host.location.split(',')[0] : 'Remote'}
                     </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-4">
                    <div className="w-16 h-16 bg-white rounded-2xl border-2 border-slate-200 border-b-4 p-2 -mt-12 relative z-10 shadow-sm flex items-center justify-center">
                        <img src={host.logoUrl} alt="Logo" className="w-full h-full object-contain" />
                    </div>
                    {host.acceptanceRate && (
                        <div className="text-right">
                            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Rate</p>
                            <p className="font-black text-slate-700 text-lg">{host.acceptanceRate}</p>
                        </div>
                    )}
                </div>

                <h3 className="text-2xl font-black text-slate-700 leading-tight mb-4 group-hover:text-indigo-600 transition-colors">
                    {host.name}
                </h3>

                {/* Super Tags Area */}
                <div className="flex flex-wrap gap-2 mt-auto">
                    {autoTags.slice(0, 3).map((tag, i) => (
                        <SuperTagBadge key={i} tag={tag} />
                    ))}
                </div>
            </div>
        </div>
    );
};