
import { DomainType, ThemeColor, ProgramTier } from './entityMap';

// ---------------------------------------------------------------------------
// DOMAIN CONTRACT LAYER
// Source of Truth. No "if (domain === ...)" allowed outside this config.
// ---------------------------------------------------------------------------

export interface DomainLabels {
  hostEntity: string; 
  program: string;    
  requirement: string;
  tracker: string;    
  currency: string;   
}

export interface VaultModuleConfig {
    label: string;
    labelPlural: string;
    itemLabel: string; // e.g. "Role", "Scholarship", "Track"
}

export interface ProgramModuleConfig {
  entityLabel: string;
  entityLabelPlural: string;
  hostLabel: string;
  trackLabel: string; // e.g. "Scheme", "Program Type"
  
  // Super Tag Rules
  tierLabels: Record<ProgramTier, string>;
  
  // Card Theme
  cardTheme: {
    primaryColor: string; // Tailwind color name (e.g. 'green')
    accentGradient: string; // Tailwind class
  };
  
  // Loot/Benefits terminology
  benefitTerms: {
    amount: string; // 'Salary', 'Funding', 'Prize'
    perks: string;  // 'Benefits', 'Coverage'
  };

  ctaLabels: {
    view: string;
    apply: string;
  };
}

export interface EventModuleConfig {
    label: string;
    labelPlural: string;
}

export interface DomainConfig {
  id: DomainType;
  name: string;
  theme: ThemeColor;
  labels: DomainLabels;
  description: string;
  mascot: string;
  
  // Module Specific Configs
  programConfig: ProgramModuleConfig;
  eventConfig: EventModuleConfig;
  vaultConfig: VaultModuleConfig;
}

// ---------------------------------------------------------------------------
// CONFIGURATIONS
// ---------------------------------------------------------------------------

export const STUDENT_CONFIG: DomainConfig = {
  id: DomainType.STUDENT,
  name: 'Student Dojo',
  theme: 'green',
  labels: { hostEntity: 'Organizer', program: 'Competition', requirement: 'Task', tracker: 'Progress', currency: 'XP' },
  description: 'Explore new skills and complete daily quests.',
  mascot: 'owl-green',
  programConfig: {
    entityLabel: 'Competition',
    entityLabelPlural: 'Competitions',
    hostLabel: 'Organizer',
    trackLabel: 'Track',
    tierLabels: { mythic: 'World Championship', rare: 'National', common: 'Local' },
    cardTheme: { primaryColor: 'green', accentGradient: 'from-duo-green to-emerald-500' },
    benefitTerms: { amount: 'Prize Pool', perks: 'Skills' },
    ctaLabels: { view: 'View Competition', apply: 'Join Now' }
  },
  eventConfig: { label: 'Campus Event', labelPlural: 'Campus Events' },
  vaultConfig: { label: 'Track Board', labelPlural: 'Track Board', itemLabel: 'Competition Track' }
};

export const INTERN_CONFIG: DomainConfig = {
  id: DomainType.INTERN,
  name: 'Intern Dojo',
  theme: 'orange', 
  labels: { hostEntity: 'Company', program: 'Internship', requirement: 'Role', tracker: 'Pipeline', currency: 'Skills' },
  description: 'Build your portfolio and land your dream job.',
  mascot: 'owl-orange',
  programConfig: {
    entityLabel: 'Internship',
    entityLabelPlural: 'Internships',
    hostLabel: 'Company',
    trackLabel: 'Scheme',
    tierLabels: { mythic: 'Fortune 500', rare: 'Unicorn', common: 'Startup' },
    cardTheme: { primaryColor: 'orange', accentGradient: 'from-duo-orange to-orange-600' },
    benefitTerms: { amount: 'Monthly Salary', perks: 'Perks' },
    ctaLabels: { view: 'View Role', apply: 'Apply Now' }
  },
  eventConfig: { label: 'Career Event', labelPlural: 'Career Events' },
  vaultConfig: { label: 'Intern Board', labelPlural: 'Intern Board', itemLabel: 'Role' }
};

export const SCHOLAR_CONFIG: DomainConfig = {
  id: DomainType.SCHOLAR,
  name: 'Scholar Dojo',
  theme: 'blue', 
  labels: { hostEntity: 'University', program: 'Grant', requirement: 'Board', tracker: 'Readiness', currency: 'Citations' },
  description: 'Manage research compliance and funding milestones.',
  mascot: 'owl-blue',
  programConfig: {
    entityLabel: 'Grant',
    entityLabelPlural: 'Grants',
    hostLabel: 'University',
    trackLabel: 'Degree Type',
    tierLabels: { mythic: 'Ivy League', rare: 'Top 100', common: 'Accredited' },
    cardTheme: { primaryColor: 'blue', accentGradient: 'from-duo-blue to-sky-600' },
    benefitTerms: { amount: 'Total Funding', perks: 'Coverage' },
    ctaLabels: { view: 'View Grant', apply: 'Submit Proposal' }
  },
  eventConfig: { label: 'Academic Session', labelPlural: 'Academic Sessions' },
  vaultConfig: { label: 'Scholar Board', labelPlural: 'Scholar Board', itemLabel: 'Scholarship' }
};

export const DOCS_CONFIG: DomainConfig = {
  id: DomainType.DOCS,
  name: 'Dojo Docs',
  theme: 'purple',
  labels: { hostEntity: 'Institution', program: 'Template', requirement: 'Page', tracker: 'Revision', currency: 'Ink' },
  description: 'Build elite CVs, Essays, and Plans.',
  mascot: 'owl-purple',
  programConfig: {
    entityLabel: 'Document',
    entityLabelPlural: 'Documents',
    hostLabel: 'Entity',
    trackLabel: 'Type',
    tierLabels: { mythic: 'Elite Template', rare: 'Pro Template', common: 'Basic' },
    cardTheme: { primaryColor: 'purple', accentGradient: 'from-duo-purple to-indigo-600' },
    benefitTerms: { amount: 'Impact', perks: 'Features' },
    ctaLabels: { view: 'Open Editor', apply: 'Use Template' }
  },
  eventConfig: { label: 'Writing Workshop', labelPlural: 'Workshops' },
  vaultConfig: { label: 'Template Vault', labelPlural: 'Vault', itemLabel: 'Template' }
};

export const COMPETITION_CONFIG: DomainConfig = {
  id: DomainType.COMPETITION,
  name: 'Competition Dojo',
  theme: 'red',
  labels: { hostEntity: 'Arena', program: 'Tournament', requirement: 'Strike', tracker: 'Bracket', currency: 'Crowns' },
  description: 'Enter the world stage. Compete, win, and claim your crowns.',
  mascot: 'owl-red',
  programConfig: {
    entityLabel: 'Tournament',
    entityLabelPlural: 'Tournaments',
    hostLabel: 'Arena',
    trackLabel: 'Bracket',
    tierLabels: { mythic: 'Global Grandmaster', rare: 'Pro Circuit', common: 'Open' },
    cardTheme: { primaryColor: 'red', accentGradient: 'from-duo-red to-rose-700' },
    benefitTerms: { amount: 'Prize Pool', perks: 'Rewards' },
    ctaLabels: { view: 'Enter Arena', apply: 'Register Now' }
  },
  eventConfig: { label: 'Live Battle', labelPlural: 'Live Battles' },
  vaultConfig: { label: 'Trophy Room', labelPlural: 'Vault', itemLabel: 'Tournament' }
};

export const RESEARCH_CONFIG: DomainConfig = {
  id: DomainType.RESEARCH,
  name: 'Research Dojo',
  theme: 'teal',
  labels: { hostEntity: 'Laboratory', program: 'Project', requirement: 'Citation', tracker: 'Manuscript', currency: 'Insights' },
  description: 'Pioneer the unknown. Publish elite research and lead innovations.',
  mascot: 'owl-teal',
  programConfig: {
    entityLabel: 'Project',
    entityLabelPlural: 'Projects',
    hostLabel: 'Lab',
    trackLabel: 'Discipline',
    tierLabels: { mythic: 'Breakthrough', rare: 'High Impact', common: 'Exploratory' },
    cardTheme: { primaryColor: 'teal', accentGradient: 'from-teal-500 to-emerald-700' },
    benefitTerms: { amount: 'Stipend', perks: 'Labs' },
    ctaLabels: { view: 'Open Lab', apply: 'Propose Now' }
  },
  eventConfig: { label: 'Colloquium', labelPlural: 'Colloquia' },
  vaultConfig: { label: 'Paper Library', labelPlural: 'Vault', itemLabel: 'Paper' }
};

export const DOMAIN_CONFIGS: Record<DomainType, DomainConfig> = {
  [DomainType.STUDENT]: STUDENT_CONFIG,
  [DomainType.INTERN]: INTERN_CONFIG,
  [DomainType.SCHOLAR]: SCHOLAR_CONFIG,
  [DomainType.DOCS]: DOCS_CONFIG,
  [DomainType.COMPETITION]: COMPETITION_CONFIG,
  [DomainType.RESEARCH]: RESEARCH_CONFIG,
};
