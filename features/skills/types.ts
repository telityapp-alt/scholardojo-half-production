
import { DomainType } from '../../core/contracts/entityMap';

export type SkillCategory = 'Technical' | 'Soft Skills' | 'Language' | 'Leadership' | 'Strategic';

export interface ContentBlock {
    type: 'TEXT' | 'IMAGE' | 'VIDEO' | 'PDF';
    content: string;
    title?: string;
    description?: string;
    metadata?: any; // For video/pdf extra settings
}

export interface SkillQuestion {
    id: string;
    type: 'MULTIPLE_CHOICE' | 'MATCHING';
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
}

export interface SkillStep {
    id: string;
    title: string;
    /* Fix: Added teaser property to SkillStep to support roadmap tooltips and fix service mapping errors */
    teaser: string;
    icon: string; 
    type: 'LESSON' | 'QUIZ' | 'CHALLENGE' | 'TREASURE';
    status: 'LOCKED' | 'AVAILABLE' | 'COMPLETED';
    slides: ContentBlock[]; // Multi-slide teaching content
    questions: SkillQuestion[];
    xpReward: number;
}

export interface SkillUnit {
    id: string;
    title: string;
    description: string;
    color: string; 
    steps: SkillStep[];
}

export interface SkillMaster {
    id: string;
    domain: DomainType;
    title: string;
    description: string;
    category: SkillCategory;
    image: string;
    tags: string[];
    units: SkillUnit[];
}

export interface UserSkillProgress {
    skillId: string;
    completedStepIds: string[];
    masteryStars: number;
}
