
import { DomainType, GenericVaultItem, GenericProgram } from '../../core/contracts/entityMap';
import { AdmissionApp } from '../admission/types';
import { CurriculumMaster } from '../curriculum/types';

export type MilestoneActionType = 'NAVIGATE' | 'ACTION' | 'MODAL';

export interface TargetMilestone {
    id: string;
    title: string;
    desc: string;
    icon: string;
    status: 'LOCKED' | 'AVAILABLE' | 'COMPLETED';
    type: 'IDENTITY' | 'SKILL' | 'ADMISSION' | 'ARENA' | 'SUBMIT';
    linkPath: string;
    integrationKey: string;
}

export interface TargetAnalysis {
    scholarship: {
        id: string;
        name: string;
        organization: string;
        deadline: string;
        category: string;
        minGpa?: number;
        requirements?: any[];
        targetKeywords?: string[];
    };
    competition: {
        totalApplicants: number;
        userRank: number;
        percentile: number;
        ratioString: string;
        standingLabel: string;
    };
    prediction: {
        score: number;
        confidence: string;
        // Granular Breakdown for Fit Analysis
        breakdown: {
            academicBoost: number;
            assetBoost: number;
            matrixBoost: number;
            difficultyPenalty: number;
        };
    };
    missionStream: {
        stats: {
            nextMilestone: string;
        };
    };
    roadmap: TargetMilestone[];
    curriculum?: CurriculumMaster;
    admissionApp?: AdmissionApp;
}
