
export type RegionId = 'global' | 'id' | 'ms' | 'in' | 'br';

export interface RegionConfig {
    id: RegionId;
    label: string;
    flag: string;
    currency: {
        code: string;
        symbol: string;
        rate: number; // Against USD for simple mock conversion
    };
    defaultLang: string;
}

export const REGION_REGISTRY: Record<RegionId, RegionConfig> = {
    global: {
        id: 'global',
        label: 'Global',
        flag: '🌐',
        currency: { code: 'USD', symbol: '$', rate: 1 },
        defaultLang: 'en'
    },
    id: {
        id: 'id',
        label: 'Indonesia',
        flag: '🇮🇩',
        currency: { code: 'IDR', symbol: 'Rp', rate: 15000 },
        defaultLang: 'id'
    },
    ms: {
        id: 'ms',
        label: 'Malaysia',
        flag: '🇲🇾',
        currency: { code: 'MYR', symbol: 'RM', rate: 4.7 },
        defaultLang: 'ms'
    },
    in: {
        id: 'in',
        label: 'India',
        flag: '🇮🇳',
        currency: { code: 'INR', symbol: '₹', rate: 83 },
        defaultLang: 'hi'
    },
    br: {
        id: 'br',
        label: 'Brazil',
        flag: '🇧🇷',
        currency: { code: 'BRL', symbol: 'R$', rate: 5 },
        defaultLang: 'pt-br'
    }
};
