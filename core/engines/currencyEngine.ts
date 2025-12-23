
import { REGION_REGISTRY, RegionId } from '../contracts/regionConfig';

export const formatPrice = (usdAmount: number | undefined): string => {
    if (usdAmount === undefined || usdAmount === 0) return 'Fully Funded';
    
    const regionId = (localStorage.getItem('dojo_region') as RegionId) || 'global';
    const region = REGION_REGISTRY[regionId] || REGION_REGISTRY.global;
    
    const converted = usdAmount * region.currency.rate;
    
    return new Intl.NumberFormat(regionId === 'id' ? 'id-ID' : 'en-US', {
        style: 'currency',
        currency: region.currency.code,
        maximumFractionDigits: 0
    }).format(converted);
};
