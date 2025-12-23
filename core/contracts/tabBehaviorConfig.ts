
import { DomainType } from './entityMap';

// Allows tabs to behave differently per domain (sorting, data source, filters)
export interface TabBehavior {
  dataSource: string;
  sortBy: string;
  filterDefaults: Record<string, any>;
  entityType?: string;
}

export const TAB_BEHAVIOR_CONFIG: Record<string, Record<DomainType, TabBehavior>> = {
  'curriculum': {
    [DomainType.STUDENT]: { dataSource: 'competitions', sortBy: 'popularity', filterDefaults: { type: 'academic' } },
    [DomainType.INTERN]: { dataSource: 'career_tracks', sortBy: 'demand', filterDefaults: { type: 'professional' } },
    [DomainType.SCHOLAR]: { dataSource: 'requirements', sortBy: 'university_rank', filterDefaults: { type: 'preparation' } },
    // Fix: Added missing behavior configuration for the DOCS domain
    [DomainType.DOCS]: { dataSource: 'templates', sortBy: 'prestige', filterDefaults: { type: 'document' } },
    // Fix: Added missing competition and research domain behaviors
    [DomainType.COMPETITION]: { dataSource: 'tournaments', sortBy: 'prizepool', filterDefaults: { type: 'battle' } },
    [DomainType.RESEARCH]: { dataSource: 'projects', sortBy: 'impact', filterDefaults: { type: 'manuscript' } }
  },
  'programs': {
    [DomainType.STUDENT]: { dataSource: 'api/programs', sortBy: 'deadline', filterDefaults: {}, entityType: 'competition' },
    [DomainType.INTERN]: { dataSource: 'api/programs', sortBy: 'salary', filterDefaults: {}, entityType: 'internship' },
    [DomainType.SCHOLAR]: { dataSource: 'api/programs', sortBy: 'prestige', filterDefaults: {}, entityType: 'scholarship' },
    // Fix: Added missing behavior configuration for the DOCS domain
    [DomainType.DOCS]: { dataSource: 'api/templates', sortBy: 'prestige', filterDefaults: {}, entityType: 'template' },
    // Fix: Added missing competition and research domain behaviors
    [DomainType.COMPETITION]: { dataSource: 'api/tournaments', sortBy: 'prizepool', filterDefaults: {}, entityType: 'tournament' },
    [DomainType.RESEARCH]: { dataSource: 'api/projects', sortBy: 'impact', filterDefaults: {}, entityType: 'project' }
  }
};
