import React from 'react';
import { GenericHost, HostStat } from '../../../../core/contracts/entityMap';
import { DollarSign, Globe, Trophy, Users, BookOpen, Star } from 'lucide-react';
import { DuoIcon, DuoColor } from '../../../../components/ui/DuoIcon';

interface HostOverviewProps {
    host: GenericHost;
}

export const HostOverview: React.FC<HostOverviewProps> = ({ host }) => {
    // Helper for dynamic icons
    const ICONS: any = {
        Users, Globe, Trophy, DollarSign, BookOpen, Star
    };

    const getStatColor = (tailwindClass?: string): DuoColor => {
        if (!tailwindClass) return 'gray';
        if (tailwindClass.includes('green')) return 'green';
        if (tailwindClass.includes('blue')) return 'blue';
        if (tailwindClass.includes('purple')) return 'purple';
        if (tailwindClass.includes('yellow')) return 'orange';
        if (tailwindClass.includes('red')) return 'red';
        return 'gray';
    };

    return (
        <div className="animate-in fade-in space-y-8">
            <div className="bg-white p-8 rounded-[32px] border-2 border-slate-200 border-b-[6px]">
                <div className="flex items-center gap-3 mb-4">
                    <DuoIcon icon={BookOpen} color="gray" size="sm" />
                    <h3 className="text-xl font-black text-slate-700 uppercase tracking-wide">About</h3>
                </div>
                <p className="text-slate-500 text-lg leading-relaxed font-bold">
                    {host.overview || "No overview available for this organization."}
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {(host.stats || []).map((stat: HostStat, i: number) => {
                    const Icon = ICONS[stat.icon] || Trophy;
                    const colorTheme = getStatColor(stat.color);
                    
                    return (
                        <div key={i} className="bg-white p-6 rounded-3xl border-2 border-slate-200 border-b-[6px] flex flex-col items-center text-center hover:-translate-y-1 hover:border-b-[8px] transition-all group">
                            <div className="mb-3">
                                <DuoIcon icon={Icon} color={colorTheme} size="lg" />
                            </div>
                            <p className="text-3xl font-black text-slate-700 mb-1 group-hover:scale-110 transition-transform">{stat.value}</p>
                            <p className="text-slate-400 font-black uppercase text-xs tracking-widest">{stat.label}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};