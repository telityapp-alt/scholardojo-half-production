
import { useState, useCallback } from 'react';
import { RegionId, REGION_REGISTRY, RegionConfig } from '../contracts/regionConfig';
import { SupportedLanguage } from '../contracts/localization';

export function useRegion() {
    const [regionId, setRegionId] = useState<RegionId>(() => {
        // DEFAULT SET TO 'id' FOR INDONESIA ECOSYSTEM PRIORITY
        return (localStorage.getItem('dojo_region') as RegionId) || 'id';
    });
    
    const [isSwitching, setIsSwitching] = useState(false);

    const switchRegion = useCallback((newRegionId: RegionId) => {
        if (newRegionId === regionId) return;
        
        const config = REGION_REGISTRY[newRegionId];
        setIsSwitching(true);
        
        // 1. ATOMIC PERSISTENCE
        localStorage.setItem('dojo_region', newRegionId);
        localStorage.setItem('dojo_lang', config.defaultLang);
        
        setRegionId(newRegionId);

        // 2. GLOBAL OVERLAY SYNC
        setTimeout(() => {
            setIsSwitching(false);
        }, 1200);
    }, [regionId]);

    const activeRegion: RegionConfig = REGION_REGISTRY[regionId] || REGION_REGISTRY.global;

    return { 
        regionId, 
        activeRegion, 
        switchRegion, 
        isSwitching,
        allRegions: Object.values(REGION_REGISTRY)
    };
}
