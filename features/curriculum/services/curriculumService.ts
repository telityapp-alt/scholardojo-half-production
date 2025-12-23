
import { DomainType } from '../../../core/contracts/entityMap';
import { CurriculumMaster } from '../types';
import { UnifiedProgramService } from '../../programs/services/unifiedProgramService';

export const CurriculumService = {
    // Fix: getAll must be async because UnifiedProgramService.getAll is async
    getAll: async (domain: DomainType, lang: string = 'en'): Promise<CurriculumMaster[]> => {
        const programs = await UnifiedProgramService.getAll(domain);
        return programs.map(p => p.curriculum);
    },

    getById: (id: string, lang: string = 'en'): CurriculumMaster | null => {
        const program = UnifiedProgramService.getById(id);
        return program ? program.curriculum : null;
    }
};