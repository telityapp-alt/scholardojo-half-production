import { TargetAnalysis } from '../types';
import { DomainType } from '../../../core/contracts/entityMap';

export const STUDENT_DEMO_DATA: TargetAnalysis = {
    scholarship: {
        id: 'demo_fellowship',
        name: 'The Dojo Fellowship',
        organization: 'Sensei Global',
        deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        category: 'Elite Fellowship',
        minGpa: 3.5,
        requirements: [
            { id: 'dr1', label: 'Innovation Statement', type: 'ESSAY', mandatory: true },
            { id: 'dr2', label: 'Technical Portfolio', type: 'DOC', mandatory: true },
            { id: 'dr3', label: 'Video Introduction', type: 'TASK', mandatory: true }
        ]
    },
    competition: {
        totalApplicants: 14200,
        userRank: 1420,
        percentile: 10,
        ratioString: '1:50',
        // Fix: Added missing required property 'standingLabel'
        standingLabel: 'Master Tier'
    },
    prediction: {
        score: 42,
        confidence: 'High',
        // Added missing breakdown property to satisfy TargetAnalysis interface
        breakdown: {
            academicBoost: 12,
            assetBoost: 10,
            matrixBoost: 20,
            difficultyPenalty: 0
        }
    },
    missionStream: {
        stats: {
            nextMilestone: 'Submit Video Intro'
        }
    },
    roadmap: [
        { id: 'm-id', title: 'Identity Scan', desc: "Analyze your student foundation.", icon: 'Fingerprint', status: 'COMPLETED', type: 'IDENTITY', linkPath: '/student/workspace/profile', integrationKey: 'melytics' },
        { id: 'm-skill', title: 'Academy Prep', desc: "Master the Fellowship curriculum.", icon: 'BookOpen', status: 'AVAILABLE', type: 'SKILL', linkPath: '/student/skillspace/curriculum', integrationKey: 'skillspace' },
        { id: 'm-arena', title: 'Arena Battle', desc: "Defeat the Sensei Global boss.", icon: 'Swords', status: 'LOCKED', type: 'ARENA', linkPath: '/student/skillspace/arena', integrationKey: 'arena' },
        { id: 'm-submit', title: 'Final Strike', desc: "Claim your spot.", icon: 'Target', status: 'LOCKED', type: 'SUBMIT', linkPath: '#', integrationKey: 'external' }
    ]
};

export const INTERN_DEMO_DATA: TargetAnalysis = {
    scholarship: {
        id: 'demo_intern_elite',
        name: 'Big Tech Elite Internship',
        organization: 'Aether Systems',
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        category: 'SWE Internship',
        minGpa: 3.0,
        requirements: [
            { id: 'ir1', label: 'Algorithmic Portfolio', type: 'DOC', mandatory: true },
            { id: 'ir2', label: 'System Design Pitch', type: 'ESSAY', mandatory: true },
            { id: 'ir3', label: 'Live Code Strike', type: 'TASK', mandatory: true }
        ]
    },
    competition: {
        totalApplicants: 8400,
        userRank: 420,
        percentile: 5,
        ratioString: '1:200',
        // Fix: Added missing required property 'standingLabel'
        standingLabel: 'Master Tier'
    },
    prediction: {
        score: 68,
        confidence: 'Extreme',
        // Added missing breakdown property to satisfy TargetAnalysis interface
        breakdown: {
            academicBoost: 25,
            assetBoost: 18,
            matrixBoost: 25,
            difficultyPenalty: 0
        }
    },
    missionStream: {
        stats: {
            nextMilestone: 'Deploy Live Code Strike'
        }
    },
    roadmap: [
        { id: 'mi-id', title: 'Matrix Sync', desc: "Align your tech stack with Aether.", icon: 'Fingerprint', status: 'COMPLETED', type: 'IDENTITY', linkPath: '/intern/workspace/profile', integrationKey: 'melytics' },
        { id: 'mi-skill', title: 'Leet Dojo', desc: "Grind the required algorithms.", icon: 'Zap', status: 'COMPLETED', type: 'SKILL', linkPath: '/intern/skillspace/curriculum', integrationKey: 'skillspace' },
        { id: 'mi-arena', title: 'System Battle', desc: "Face the CTO Boss simulation.", icon: 'Swords', status: 'AVAILABLE', type: 'ARENA', linkPath: '/intern/skillspace/arena', integrationKey: 'arena' },
        { id: 'mi-submit', title: 'Contract Sign', desc: "Deploy final application.", icon: 'Target', status: 'LOCKED', type: 'SUBMIT', linkPath: '#', integrationKey: 'external' }
    ]
};

export const getDemoDataByDomain = (domain: DomainType): TargetAnalysis => {
    if (domain === DomainType.INTERN) return INTERN_DEMO_DATA;
    return STUDENT_DEMO_DATA;
};