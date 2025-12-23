import { DomainType, GenericHost, GenericVaultItem } from '../../../core/contracts/entityMap';
import { MOCK_HOSTS, MOCK_VAULT_ITEMS } from '../../../core/access/mockData';

// Adapts Core Data to Vision Board Needs
export const VisionService = {
    getHosts: async (domain: DomainType) => {
        // Simulate API
        await new Promise(r => setTimeout(r, 500));
        // Return hosts relevant to domain (or all if Student)
        if (domain === DomainType.STUDENT) return MOCK_HOSTS;
        return MOCK_HOSTS.filter(h => h.domain === domain);
    },
    
    getVaultItems: async (domain: DomainType) => {
        await new Promise(r => setTimeout(r, 500));
        if (domain === DomainType.STUDENT) return MOCK_VAULT_ITEMS;
        return MOCK_VAULT_ITEMS.filter(v => v.domain === domain);
    }
};