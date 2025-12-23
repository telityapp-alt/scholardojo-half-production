
import React, { useState } from 'react';
import { MapPin, Globe, Crown } from 'lucide-react';
import { SuperDropdown } from '../../../components/ui/SuperDropdown';
import { useLanguage } from '../../../core/hooks/useLanguage';

interface VaultFilterProps {
    onChange: (filters: any) => void;
}

export const VaultFilter: React.FC<VaultFilterProps> = ({ onChange }) => {
    const { t } = useLanguage();
    const [filters, setFilters] = useState({
        citizenship: 'GLOBAL',
        destination: 'ALL',
        tier: 'ALL'
    });

    const update = (key: string, val: string) => {
        const newFilters = { ...filters, [key]: val };
        setFilters(newFilters);
        onChange(newFilters);
    };

    const CITIZENSHIPS = [
        { id: 'GLOBAL', label: t.vault.filters.global }, 
        { id: 'ID', label: 'Indonesia' }, 
        { id: 'US', label: 'United States' }
    ];
    
    const CONTINENTS = [
        { id: 'ALL', label: t.vault.filters.anywhere }, 
        { id: 'EU', label: 'Europe' }, 
        { id: 'NA', label: 'North America' }
    ];
    
    const PROGRAM_TIERS = [
        { id: 'ALL', label: t.vault.filters.all }, 
        { id: 'mythic', label: 'Top Tier' }, 
        { id: 'rare', label: 'Mid Tier' }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <SuperDropdown 
                label={t.vault.filters.citizenship} 
                icon={MapPin}
                options={CITIZENSHIPS}
                value={filters.citizenship}
                onChange={(val) => update('citizenship', val)}
            />
            <SuperDropdown 
                label={t.vault.filters.destination} 
                icon={Globe}
                options={CONTINENTS}
                value={filters.destination}
                onChange={(val) => update('destination', val)}
            />
            <SuperDropdown 
                label={t.vault.filters.collection} 
                icon={Crown}
                options={PROGRAM_TIERS}
                value={filters.tier}
                onChange={(val) => update('tier', val)}
            />
        </div>
    );
};
