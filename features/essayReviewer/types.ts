
import { DomainType } from '../../core/contracts/entityMap';

export type EssayType = 'PERSONAL' | 'MOTIVATION' | 'LEADERSHIP' | 'STUDY_PLAN' | 'IMPACT';

export interface EssayMission {
    id: string;
    programId: string;
    programName: string;
    domain: DomainType;
    title: string;
    type: EssayType;
    wordCount: number;
    difficulty: 'EASY' | 'NORMAL' | 'HARD';
    recipe: {
        strategy: string;
        ingredients: { label: string; desc: string }[];
        proTip: string;
    };
}
