
import { DomainType } from './entityMap';
import { NavigationRegistry, ParentMenuConfig } from '../types/navigation';

const SHARED_PARENTS: ParentMenuConfig[] = [
  {
    id: 'discovery',
    label: 'Explore',
    icon: 'Compass',
    description: 'Find your target',
    color: 'blue', 
    defaultTab: 'programs',
    tabs: [
      { id: 'programs', label: 'Programs', icon: 'Briefcase', route: 'programs', levelRequired: 0, component: 'UnifiedProgramsView' },
      { id: 'community-board', label: 'Scout Hub', icon: 'Zap', route: 'community-board', levelRequired: 0, component: 'CommunityScoutHub' },
      { id: 'events', label: 'Events', icon: 'Calendar', route: 'events', levelRequired: 0, component: 'EventsView' },
      { id: 'hosts', label: 'Universities', icon: 'Building', route: 'hosts', levelRequired: 0, component: 'HostsView' }
    ]
  },
  {
    id: 'skillspace',
    label: 'Skillspace',
    icon: 'Dumbbell',
    description: 'Training grounds',
    color: 'green',
    defaultTab: 'curriculum',
    tabs: [
      { id: 'curriculum', label: 'Academy', icon: 'Library', route: 'curriculum', levelRequired: 0, component: 'CurriculumView' },
      { id: 'skills', label: 'Skill Path', icon: 'Zap', route: 'skills', levelRequired: 0, component: 'SkillsView' },
      { id: 'arena', label: 'Arena', icon: 'Swords', route: 'arena', levelRequired: 1, component: 'ArenaView' }
    ]
  },
  {
    id: 'workspace',
    label: 'Workspace',
    icon: 'Briefcase',
    description: 'Mission command',
    color: 'blue', 
    defaultTab: 'home',
    tabs: [
      { id: 'home', label: 'Home', icon: 'Home', route: 'home', levelRequired: 0, component: 'WorkspaceHome' },
      { id: 'target', label: 'My Programs', icon: 'BookOpen', route: 'target', levelRequired: 0, component: 'SecuredProgramsView' },
      { id: 'admission', label: 'Admission', icon: 'FileCheck', route: 'admission', levelRequired: 0, component: 'AdmissionView' },
      { id: 'essay-reviewer', label: 'Essay Dojo', icon: 'FileText', route: 'essay-reviewer', levelRequired: 0, component: 'EssayReviewer' },
      { id: 'quest', label: 'Quests', icon: 'Target', route: 'quest', levelRequired: 1, component: 'QuestView' },
      { id: 'plan', label: 'Timeline', icon: 'Calendar', route: 'plan', levelRequired: 0, component: 'PlanView' }
    ]
  }
];

const COMPETITION_PARENTS: ParentMenuConfig[] = [
  {
    id: 'workspace',
    label: 'Arena',
    icon: 'Swords',
    description: 'Battle Management',
    color: 'red',
    defaultTab: 'home',
    tabs: [
        { id: 'home', label: 'War Room', icon: 'Target', route: 'home', levelRequired: 0, component: 'CompetitionHome' },
        { id: 'essay-reviewer', label: 'Statement Forge', icon: 'FileText', route: 'essay-reviewer', levelRequired: 0, component: 'EssayReviewer' },
    ]
  }
];

const RESEARCH_PARENTS: ParentMenuConfig[] = [
    {
      id: 'workspace',
      label: 'The Lab',
      icon: 'Library',
      description: 'Science Management',
      color: 'blue',
      defaultTab: 'home',
      tabs: [
          { id: 'home', label: 'Observatory', icon: 'BookOpen', route: 'home', levelRequired: 0, component: 'ResearchHome' },
          { id: 'essay-reviewer', label: 'Manuscript Forge', icon: 'FileText', route: 'essay-reviewer', levelRequired: 0, component: 'EssayReviewer' },
      ]
    }
];

const DOCS_PARENT: ParentMenuConfig = {
  id: 'workspace',
  label: 'Studio',
  icon: 'FileText',
  description: 'Document Studio',
  color: 'purple',
  defaultTab: 'library',
  tabs: [
    { id: 'library', label: 'My Vault', icon: 'Library', route: 'library', levelRequired: 0, component: 'DocsHome' },
    { id: 'essay-reviewer', label: 'Artifact Forge', icon: 'FileText', route: 'essay-reviewer', levelRequired: 0, component: 'EssayReviewer' },
  ]
};

export const NAVIGATION_REGISTRY: NavigationRegistry = {
  parents: [...SHARED_PARENTS],
  domainOverrides: {
    [DomainType.STUDENT]: {
      parentLabels: { admin: 'Forge', skillspace: 'Training', workspace: 'Command', discovery: 'Explore', community: 'Network', progress: 'Growth' },
      tabLabels: { target: 'Program Saya', hosts: 'Organizers', programs: 'Competitions', admission: 'Desk', 'community-board': 'Scout Hub', arena: 'Interview Arena', skills: 'Skill Path', 'essay-reviewer': 'Essay Dojo' },
    },
    [DomainType.INTERN]: {
      parentLabels: { admin: 'Forge', skillspace: 'Training', workspace: 'Command', discovery: 'Explore', community: 'Network', progress: 'Tracker' },
      tabLabels: { target: 'Program Saya', hosts: 'Companies', programs: 'Roles', admission: 'Pipeline', 'community-board': 'Scout Hub', arena: 'Arena', skills: 'Skill Path', 'essay-reviewer': 'Statement Forge' }
    },
    [DomainType.SCHOLAR]: {
      parentLabels: { admin: 'Forge', skillspace: 'Training', workspace: 'Command', discovery: 'Explore', community: 'Network', progress: 'Readiness' },
      tabLabels: { target: 'Program Saya', hosts: 'Universities', programs: 'Scholarships', admission: 'Admission', 'community-board': 'Scout Hub', arena: 'Arena', skills: 'Skill Path', 'essay-reviewer': 'Essay Reviewer' }
    },
    [DomainType.DOCS]: {
        parentLabels: { admin: 'Forge', skillspace: 'Training', workspace: 'Studio', discovery: 'Explore', community: 'Network', progress: 'Stats' },
        tabLabels: { library: 'Document Vault', 'essay-reviewer': 'Artifact Forge' }
    },
    [DomainType.COMPETITION]: {
        parentLabels: { admin: 'Forge', skillspace: 'Training', workspace: 'War Room', discovery: 'Dex', community: 'Guild', progress: 'Rank' },
        tabLabels: { home: 'Arena Dashboard', 'essay-reviewer': 'Pitch Deck Forge' }
    },
    [DomainType.RESEARCH]: {
        parentLabels: { admin: 'Forge', skillspace: 'Academy', workspace: 'The Lab', discovery: 'Observatory', community: 'Peer Network', progress: 'Impact' },
        tabLabels: { home: 'Lab Central', 'essay-reviewer': 'Manuscript Forge' }
    }
  }
};

export const GET_DOMAIN_PARENTS = (domain: DomainType): ParentMenuConfig[] => {
    if (domain === DomainType.DOCS) return [DOCS_PARENT];
    if (domain === DomainType.COMPETITION) return COMPETITION_PARENTS;
    if (domain === DomainType.RESEARCH) return RESEARCH_PARENTS;
    return SHARED_PARENTS;
};
