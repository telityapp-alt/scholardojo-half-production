
import { DomainType, ProgramTier } from '../../core/contracts/entityMap';

export interface CurriculumPoint {
    id: string;
    title: string;
    content: string;
    type: 'LOGIC' | 'TIP' | 'WARNING' | 'STEP';
}

export interface CurriculumChapter {
    id: string;
    title: string;
    description: string;
    icon: string; // Lucide icon name
    points: CurriculumPoint[];
    unlocked: boolean;
}

export interface CurriculumUnit {
    id: string;
    order: number;
    title: string;
    description: string;
    color: 'green' | 'blue' | 'purple' | 'orange' | 'red';
    chapters: CurriculumChapter[];
}

export interface CurriculumMaster {
    id: string;
    domain: DomainType;
    targetProgramId: string; // Connection to Program
    title: string;
    subtitle: string;
    tier: ProgramTier;
    image: string;
    author: string; // "Dojo Sensei" or "Community Elite"
    lastUpdated: string;
    totalUnits: number;
    completedUnits: number;
    units: CurriculumUnit[];
    tags: string[];
}
