
import { DomainType } from '../../../core/contracts/entityMap';

export interface ParentTemplate {
    id: string;
    label: string;
    icon: string;
}

export interface DojoTemplate {
    id: string;
    parentId: string; // References ParentTemplate
    domain: DomainType;
    title: string;
    desc: string;
    content: string; // The raw HTML code to inject
    complexity: 'COMMON' | 'ELITE';
}

export const PARENT_TEMPLATES: ParentTemplate[] = [
    { id: 'parent-cv', label: 'Curriculum Vitae', icon: 'Briefcase' },
    { id: 'parent-essay', label: 'Personal Essay', icon: 'FileText' },
    { id: 'parent-plan', label: 'Mission Plan', icon: 'Target' },
    { id: 'parent-lor', label: 'Referral Letter', icon: 'UserCheck' }
];

export const TEMPLATE_REGISTRY: DojoTemplate[] = [
    // --- SCHOLAR DOMAIN ---
    {
        id: 't-scholar-ivy', parentId: 'parent-essay', domain: DomainType.SCHOLAR, complexity: 'ELITE',
        title: 'Ivy League Narrative', desc: 'Optimized for high-prestige academic applications.',
        content: '<h1>Identity Statement</h1><p>Start your strike here...</p><h2>Research Synergies</h2>'
    },
    {
        id: 't-scholar-cv', parentId: 'parent-cv', domain: DomainType.SCHOLAR, complexity: 'ELITE',
        title: 'Academic Research CV', desc: 'Focuses on publications and lab history.',
        content: '<h1>[Full Name]</h1><p>Researcher</p><h2>Publications</h2>'
    },
    // --- INTERN DOMAIN ---
    {
        id: 't-intern-faang', parentId: 'parent-cv', domain: DomainType.INTERN, complexity: 'ELITE',
        title: 'FAANG Strike Resume', desc: 'Algorithmic focus for top-tier tech roles.',
        content: '<h1>[Name]</h1><p>Software Engineer</p><h2>Projects</h2><ul><li>Built [Project] using [Stack]</li></ul>'
    },
    {
        id: 't-intern-motlet', parentId: 'parent-essay', domain: DomainType.INTERN, complexity: 'COMMON',
        title: 'Direct Motivation Letter', desc: 'Punchy and professional corporate introduction.',
        content: '<h1>To the Hiring Matrix,</h1><p>I am obsessed with [Industry]...</p>'
    },
    // --- STUDENT DOMAIN ---
    {
        id: 't-student-comp', parentId: 'parent-cv', domain: DomainType.STUDENT, complexity: 'COMMON',
        title: 'Competition Profile', desc: 'Showcase your awards and project history.',
        content: '<h1>[Name]</h1><h2>Tournament History</h2>'
    }
];
