
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DomainType } from '../../../core/contracts/entityMap';
import { DOMAIN_CONFIGS } from '../../../core/contracts/domainConfig';
import { getVaultItemsByDomain } from '../../../core/access/vaultAccess';
import { GenericVaultItem } from '../../../core/contracts/entityMap';
import { VaultHeader } from './VaultHeader';
import { VaultFilter } from './VaultFilter';
import { VaultCard } from './VaultCard';
import { DuoCard } from '../../../components/DuoCard';
import { Loader2, Inbox } from 'lucide-react';
import { CommunityShortcutCard } from '../../community/components/CommunityShortcutCard';
import { useLanguage } from '../../../core/hooks/useLanguage';

export const VaultListView: React.FC = () => {
    const { domain } = useParams<{ domain: string }>();
    const { lang } = useLanguage();
    const domainEnum = Object.values(DomainType).find(d => d === domain) as DomainType || DomainType.STUDENT;
    const config = DOMAIN_CONFIGS[domainEnum];
    
    const [items, setItems] = useState<GenericVaultItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState<any>({});

    useEffect(() => {
        setLoading(true);
        // Explicitly fetch with lang dependency
        const data = getVaultItemsByDomain(domainEnum, lang);
        setItems(data);
        setLoading(false);
    }, [domainEnum, lang]); // Lang is now a strict dependency

    const filteredItems = items.filter(item => {
        if (search && !item.title.toLowerCase().includes(search.toLowerCase())) return false;
        if (filters.tier && filters.tier !== 'ALL' && item.tier !== filters.tier) return false;
        return true;
    });

    return (
        <div>
            <VaultHeader 
                search={search} 
                setSearch={setSearch} 
                title={config.vaultConfig.labelPlural} 
                subtitle={`Curated ${config.vaultConfig.itemLabel.toLowerCase()}s for ambitious ${domainEnum}s.`}
            />

            <VaultFilter onChange={setFilters} />

            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
                </div>
            ) : filteredItems.length === 0 ? (
                <div className="space-y-12">
                    <DuoCard className="text-center py-20 bg-slate-50 border-slate-200 border-dashed">
                        <Inbox className="w-16 h-16 mb-4 opacity-50 mx-auto text-slate-400" />
                        <h3 className="text-xl font-bold text-slate-400">No {config.vaultConfig.itemLabel}s Found</h3>
                        <p className="text-slate-400 mt-2 font-bold opacity-70">Try adjusting your filters.</p>
                    </DuoCard>
                    <CommunityShortcutCard />
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredItems.map(item => (
                            <div key={item.id} className="h-full">
                                <VaultCard item={item} domain={domainEnum} />
                            </div>
                        ))}
                    </div>
                    
                    <CommunityShortcutCard />
                </>
            )}
        </div>
    );
};
