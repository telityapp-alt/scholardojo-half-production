
import { DomainType } from '../../../core/contracts/entityMap';
import { CurriculumMaster } from '../types';
import { MASSIVE_PROGRAMS_POOL } from '../../programs/data/massiveData';

export const CurriculumService = {
    /**
     * Pulls curricula directly from the massive pool to avoid 
     * service-level circular dependencies.
     */
    getAll: async (domain: DomainType, lang: string = 'en'): Promise<CurriculumMaster[]> => {
        // Simulate minor async delay for UI feel
        await new Promise(resolve => setTimeout(resolve, 100));
        return MASSIVE_PROGRAMS_POOL
            .filter(p => p.domain === domain)
            .map(p => p.curriculum);
    },

    getById: (id: string, lang: string = 'en'): CurriculumMaster | null => {
        const program = MASSIVE_PROGRAMS_POOL.find(p => p.id === id);
        return program ? program.curriculum : null;
    }
};
