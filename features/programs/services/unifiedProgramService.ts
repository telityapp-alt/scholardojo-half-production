
import { DomainType } from '../../../core/contracts/entityMap';
import { UnifiedProgram } from '../types';
import { MASSIVE_PROGRAMS_POOL } from '../data/massiveData';
import { APP_CONFIG } from '../../../core/contracts/appConfig';

const STORAGE_KEY = 'dojo_mission_state_v1';
const SECURED_KEY = APP_CONFIG.STORAGE_KEYS.SECURED_MISSIONS;

export const UnifiedProgramService = {
    /**
     * getAll - Mimics async retrieval from the static pool.
     */
    getAll: async (domain: DomainType): Promise<UnifiedProgram[]> => {
        await new Promise(resolve => setTimeout(resolve, 200));
        return MASSIVE_PROGRAMS_POOL.filter(m => m.domain === domain);
    },
    
    getById: (id: string): UnifiedProgram | undefined => {
        return MASSIVE_PROGRAMS_POOL.find(m => m.id === id);
    },

    isSecured: (id: string) => {
        const secured = JSON.parse(localStorage.getItem(SECURED_KEY) || '[]');
        return secured.includes(id);
    },
    
    toggleSecure: (id: string) => {
        let secured = JSON.parse(localStorage.getItem(SECURED_KEY) || '[]');
        const isCurrentlySecured = secured.includes(id);
        
        if (isCurrentlySecured) {
            secured = secured.filter((sid: string) => sid !== id);
        } else {
            secured.push(id);
        }
        
        localStorage.setItem(SECURED_KEY, JSON.stringify(secured));
        window.dispatchEvent(new Event('storage'));
        return secured.includes(id);
    },

    getChecklistState: (id: string): Record<string, boolean> => 
        JSON.parse(localStorage.getItem(`${STORAGE_KEY}_${id}`) || '{}'),
        
    saveChecklistState: (id: string, state: Record<string, boolean>) => 
        localStorage.setItem(`${STORAGE_KEY}_${id}`, JSON.stringify(state))
};
