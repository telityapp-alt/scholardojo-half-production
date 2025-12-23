
import { DomainType } from '../../core/contracts/entityMap';
import { TargetMilestone } from '../target/types';

export type RequirementStatus = 'PENDING' | 'VERIFIED' | 'UPLOADED' | 'MISSING';
export type RequirementType = 'DOC' | 'ESSAY' | 'FIELD' | 'TASK';

export interface AdmissionRequirement {
    id: string;
    label: string;
    type: RequirementType;
    status: RequirementStatus;
    mandatory: boolean;
    notes?: string;
    category?: string;
    linkedQuestId?: string;
    
    // Neural Data
    brief?: string;             // Detailed instructions/expectations
    content?: string;           // The text content or value
    analysisScore?: number;     // 0-100 quality score
    analysisFeedback?: string[]; // AI-generated improvements
}

export interface AdmissionApp {
    id: string;
    domain: DomainType;
    targetId: string;
    name: string;
    type: 'CAMPUS' | 'COMPANY' | 'PROGRAM';
    image: string;
    progress: number;
    status: 'DRAFT' | 'SUBMITTED' | 'ACCEPTED';
    deadline: string;
    requirements: AdmissionRequirement[];
    roadmap?: TargetMilestone[];
}
