import React from 'react';
import { useParams } from 'react-router-dom';
import { DomainType } from '../../../core/contracts/entityMap';
import { MOCK_HOSTS } from '../../../core/access/mockData';
import { DuoSearch } from '../../../components/ui/DuoSearch';
import { HostCard } from './HostCard';
import { DuoCard } from '../../../components/DuoCard';

export const HostsView: React.FC = () => {
    const { domain } = useParams<{ domain: string }>();
    const [searchQuery, setSearchQuery] = React.useState('');

    // Filter hosts by domain and search
    const filteredHosts = MOCK_HOSTS.filter(h => {
        if (h.domain !== domain) return false;
        if (searchQuery && !h.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    });

    return (
        <div className="space-y-8">
             {/* Header */}
             <div className="flex flex-col md:flex-row justify-between items-end border-b-2 border-slate-200 pb-6 gap-6">
                <div className="w-full md:w-auto">
                   <h2 className="text-3xl font-bold text-slate-700 capitalize">{domain === 'scholar' ? 'Universities' : domain === 'intern' ? 'Companies' : 'Organizations'}</h2>
                   <p className="text-slate-400 font-bold text-sm mt-1">
                        Find top rated partners in the {domain} ecosystem.
                   </p>
                </div>
                
                <div className="w-full md:w-96">
                    <DuoSearch 
                        value={searchQuery}
                        onChange={setSearchQuery}
                        placeholder="Search partners..."
                    />
                </div>
            </div>

            {/* Grid */}
            {filteredHosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredHosts.map(host => (
                        <div key={host.id} className="h-full">
                            <HostCard host={host} domain={domain!} />
                        </div>
                    ))}
                </div>
            ) : (
                <DuoCard className="text-center py-20 bg-slate-50 border-slate-200">
                    <h3 className="text-xl font-bold text-slate-400">No Hosts Found</h3>
                    <p className="text-slate-400 mt-2 font-bold">Try adjusting your search.</p>
                </DuoCard>
            )}
        </div>
    );
};