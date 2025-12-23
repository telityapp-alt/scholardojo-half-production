
import { DomainType, ProgramTier } from '../../core/contracts/entityMap';
import { CurriculumMaster } from '../curriculum/types';

export type ProgramDifficulty = 'EASY' | 'NORMAL' | 'HARD' | 'DIFFICULT';

export interface ScholarNewsItem {
    id: string;
    date: string;
    title: string;
    content: string;
    source?: string;
    isBreaking?: boolean;
    tags?: string[];
}

export interface OfficialDocItem {
    id: string;
    name: string;
    isOnlineForm: boolean;
    isUpload: boolean;
    note?: string;
}

export interface BriefingResource {
    id: string;
    title: string;
    url: string;
    type: 'GUIDEBOOK' | 'POLICY' | 'FAQ' | 'TEMPLATE';
}

export interface SuccessVaultItem {
    id: string;
    title: string;
    category: 'ESSAY' | 'CV' | 'PORTFOLIO';
    previewUrl: string;
    senseiComment: string;
    sector?: string;
    focus?: string;
    key?: string;
}

export interface DocBrief {
    id: string;
    label: string;
    instructions: string;
    aiAuditCriteria: string[];
    suggestedDojoTheme: string;
}

export interface ComparisonMatrix {
    title: string;
    headers: string[];
    rows: { label: string; values: string[] }[];
}

export interface ShadowProtocol {
    expertVerdict: string;
    lethalMistakes: { title: string; reason: string; example?: string; fix?: string }[];
    successVault: SuccessVaultItem[];
    alumniInsights: { name: string; year: string; insight: string; source?: string }[];
    ghostTasks: { label: string; importance: string; desc?: string; link?: string; format?: string }[];
    docBriefs: DocBrief[];
    eliteTips?: { id: string; title: string; content: string; priority: string; source?: string }[];
    comparisonMatrix?: ComparisonMatrix;
    cheatSheet?: {
        preInterview: string[];
        duringInterview: { type: 'DO' | 'DONT'; text: string }[];
        powerPhrases: string[];
        forbiddenPhrases: string[];
    };
    bossTips?: { id: string; title: string; content: string }[];
    sources?: string[];
}

export interface UnifiedProgram {
    id: string;
    domain: DomainType;
    title: string;
    organizer: string;
    organizerLogo: string;
    type: string; 
    level: string;
    country: string;
    deadline: string;
    matchScore: number;
    tier: ProgramTier;
    difficultyLevel: ProgramDifficulty;
    
    dojoRankRequired?: string;
    senseiProtocolQuote?: string;
    arenaInstructions?: string;
    dossierRequirementKeys?: string[];

    intel: {
        description: string;
        highlights: string[];
        
        about?: string;
        scheme?: string[];
        fundingComponents?: { category: string; items: string[] }[];
        generalRequirements?: string[];
        specificRequirements?: string[];
        otherProvisions?: string[];
        howToApply?: string[];
        phases?: { name: string; date: string; note?: string }[];
        sanctions?: string[];
        serviceCommitment?: string[];
        requiredDocuments?: { name: string; format: string }[];
        essayFormats?: { title: string; spec: string; prompts: string[] }[];
        
        officialDocumentList?: OfficialDocItem[];
        briefingResources?: BriefingResource[];

        entryCriteria: string[];
        funding: string[];
        strategicWants: string[];
        fundingStatus: 'FULL COVERAGE' | 'PARTIAL' | 'STIPEND ONLY';
        weights: { academic: number; assets: number; matrix: number };
        stats: {
            awardeesPerYear: string;
            acceptanceRate: string;
            totalApplicants: number;
            selectivityRatio: string;
            targetKeywords: string[]; 
            minGpa: number;
            nationalityQuota?: string;
            workExpPreference?: string;
            ageLimit?: string;
        };
        partnerInstitutions?: { name: string; location: string; rank: string; deptStats?: string }[];
        timeline: any;
        financialValue: any;
        news?: ScholarNewsItem[];
        destinations?: { eligibleMajors: string[]; targetCountries: string[]; loaStatus: string };
        documents?: any[];
        selectionPhases?: any[];
        obligations?: any;
        resources?: any;
        secretTips?: any;
    };

    shadowProtocol: ShadowProtocol;
    checklist: any[];
    curriculum: CurriculumMaster;
    applyUrl: string;
}
