
import { useMemo, useState } from 'react';
import { UnifiedProgram } from '../types';

export interface FilterFacet {
    id: string;
    label: string;
    options: string[];
}

export function useProgramFilters(programs: UnifiedProgram[]) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

    // 1. NEURAL CRAWLER: Extract every unique piece of metadata
    const facets = useMemo(() => {
        const facets: FilterFacet[] = [];

        // Dynamic "Mission Type" from data
        const types = [...new Set(programs.map(p => p.type))].filter(Boolean);
        if (types.length) facets.push({ id: 'type', label: 'Operation Type', options: types });

        // Dynamic "Tiers" from data
        const tiers = [...new Set(programs.map(p => p.tier))].filter(Boolean);
        if (tiers.length) facets.push({ id: 'tier', label: 'Mission Rank', options: tiers });

        // Dynamic "Keywords" (Deep Scan of Intel Stats)
        const allKeywords = programs.flatMap(p => p.intel.stats?.targetKeywords || []);
        const keywords = [...new Set(allKeywords)].filter(Boolean).slice(0, 12); // Limit for UI sanity
        if (keywords.length) facets.push({ id: 'keywords', label: 'Tactical Tags', options: keywords });

        // Dynamic "Country"
        const countries = [...new Set(programs.map(p => p.country))].filter(Boolean);
        if (countries.length) facets.push({ id: 'country', label: 'Deployment Area', options: countries });

        return facets;
    }, [programs]);

    // 2. FILTERING LOGIC: Cross-Facet AND/OR logic
    const filteredPrograms = useMemo(() => {
        return programs.filter(p => {
            // Text Search (Title, Organizer, Description)
            const searchStr = searchQuery.toLowerCase();
            const textMatch = !searchQuery || 
                p.title.toLowerCase().includes(searchStr) || 
                p.organizer.toLowerCase().includes(searchStr) ||
                p.intel.description.toLowerCase().includes(searchStr);

            if (!textMatch) return false;

            // Facet Matching
            // Fix: Cast activeOptions to string[] to resolve Property 'length' and 'includes' errors
            return Object.entries(selectedFilters).every(([facetId, activeOptions]) => {
                const options = activeOptions as string[];
                if (options.length === 0) return true;

                if (facetId === 'type') return options.includes(p.type);
                if (facetId === 'tier') return options.includes(p.tier);
                if (facetId === 'country') return options.includes(p.country);
                if (facetId === 'keywords') return p.intel.stats?.targetKeywords.some(tk => options.includes(tk));
                
                return true;
            });
        });
    }, [programs, searchQuery, selectedFilters]);

    const toggleOption = (facetId: string, option: string) => {
        setSelectedFilters(prev => {
            const current = prev[facetId] || [];
            const next = current.includes(option) 
                ? current.filter(o => o !== option) 
                : [...current, option];
            return { ...prev, [facetId]: next };
        });
    };

    const clearAll = () => {
        setSelectedFilters({});
        setSearchQuery('');
    };

    return {
        filteredPrograms,
        facets,
        searchQuery,
        setSearchQuery,
        selectedFilters,
        toggleOption,
        clearAll
    };
}