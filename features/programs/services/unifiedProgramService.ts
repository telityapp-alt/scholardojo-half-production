
import { DomainType } from '../../../core/contracts/entityMap';
import { UnifiedProgram } from '../types';
import { MASSIVE_PROGRAMS_POOL } from '../data/massiveData';

const STORAGE_KEY = 'dojo_mission_state_v1';
const SECURED_KEY = 'dojo_secured_missions';

export const UnifiedProgramService = {
    /**
     * getAll - Wrap in Promise to mimic Supabase call structure.
     */
    getAll: async (domain: DomainType): Promise<UnifiedProgram[]> => {
        // Simulate Network Latency for "Duo-Feel" loading
        await new Promise(resolve => setTimeout(resolve, 300));
        return MASSIVE_PROGRAMS_POOL.filter(m => m.domain === domain);
    },
    
    getById: (id: string): UnifiedProgram | undefined => {
        return MASSIVE_PROGRAMS_POOL.find(m => m.id === id);
    },

    isSecured: (id: string) => JSON.parse(localStorage.getItem(SECURED_KEY) || '[]').includes(id),
    
    toggleSecure: (id: string) => {
        let secured = JSON.parse(localStorage.getItem(SECURED_KEY) || '[]');
        if (secured.includes(id)) {
            secured = secured.filter((sid: string) => sid !== id);
        } else {
            secured.push(id);
        }
        localStorage.setItem(SECURED_KEY, JSON.stringify(secured));
        window.dispatchEvent(new Event('storage'));
        return secured.includes(id);
    },

    getChecklistState: (id: string): Record<string, boolean> => JSON.parse(localStorage.getItem(`${STORAGE_KEY}_${id}`) || '{}'),
    saveChecklistState: (id: string, state: Record<string, boolean>) => localStorage.setItem(`${STORAGE_KEY}_${id}`, JSON.stringify(state))
};
