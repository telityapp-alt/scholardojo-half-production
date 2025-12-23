import React, { useEffect, useState } from 'react';
import { Building2 } from 'lucide-react';
import { GenericHost } from '../../../../core/contracts/entityMap';
import { MOCK_HOSTS } from '../../../../core/access/mockData';
import { HostCard } from '../../../host/components/HostCard';
import { DuoIcon } from '../../../../components/ui/DuoIcon';

interface VaultRelatedProps {
    tags: string[];
    domain: string;
    onNavigate: (path: string) => void;
}

export const VaultRelated: React.FC<VaultRelatedProps> = ({ tags, domain, onNavigate }) => {
    const [hosts, setHosts] = useState<GenericHost[]>([]);

    useEffect(() => {
        // Simulating tag matching
        // In real app, this goes to an API or Engine
        const matches = MOCK_HOSTS.filter(h => 
            h.domain === domain && 
            tags.some(t => h.tags?.includes(t) || h.location?.includes(t) || h.name.includes(t))
        );
        // Fallback for UI
        const displayHosts = matches.length > 0 ? matches : MOCK_HOSTS.filter(h => h.domain === domain);
        
        setHosts(displayHosts.slice(0, 2));
    }, [tags, domain]);

    if (hosts.length === 0) return null;

    return (
        <div className="mt-8 pt-8 border-t-2 border-slate-100">
            <h3 className="font-black text-slate-700 text-lg mb-6 flex items-center gap-3">
                <Building2 className="w-5 h-5 text-indigo-500" /> Applicable Partners
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {hosts.map(host => (
                    <div key={host.id} className="h-full">
                         <HostCard 
                            host={host} 
                            domain={domain} 
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};