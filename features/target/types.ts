import { DomainType, GenericVaultItem, GenericProgram, TargetMilestone } from '../../core/contracts/entityMap';
import { AdmissionApp } from '../admission/types';
import { CurriculumMaster } from '../curriculum/types';

// Fix: Export TargetMilestone to resolve module export error in consuming widgets
export { TargetMilestone };

export type MilestoneActionType = 'NAVIGATE' | 'ACTION' | 'MODAL';

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
