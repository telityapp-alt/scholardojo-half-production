
import { DomainType } from '../../core/contracts/entityMap';

export type DocCategory = 'CV' | 'ESSAY' | 'PORTFOLIO' | 'LOR' | 'PLAN';

export interface SuccessArtifact {
    id: string;
    title: string;
    description: string;
    url: string;
    alumniName: string;
    alumniYear: string;
    keyHighlight: string;
}

export interface DocumentBlueprint {
    id: string;
    programId: string;
    domain: DomainType;
    category: DocCategory;
    title: string;
    brief: string;
    
    // Core content requirements
    checkpoints: {
        id: string;
        label: string;
        reason: string;
        weight: number; // 0-10
    }[];

    keywords: string[];
    
    // Examples of success
    artifacts: SuccessArtifact[];
    
    // Neural configuration for AI
    aiContext: {
        tone: string;
        focus: string;
        rejectionTriggers: string[];
    };
}
