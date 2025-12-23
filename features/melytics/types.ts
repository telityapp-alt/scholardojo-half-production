
import { DomainType } from '../../core/contracts/entityMap';

export interface AuditRecord {
    id: string;
    timestamp: string;
    targetTitle: string;
    docLabel: string;
    score: number;
    verdict: string;
}

export interface ArenaLog {
    id: string;
    date: string;
    targetTitle: string;
    difficulty: string;
    avgScore: number;
    totalDamage: number;
    performanceLabel: string;
    bossFeedback: string;
    strengths: string[];
    weaknesses: string[];
    improvementSteps: string[];
}

export interface UserFoundation {
    id: string;
    domain: DomainType;
    name: string;
    avatarSeed: string;
    bio: string;
    arenaLogs: ArenaLog[];
    auditHistory: AuditRecord[]; // NEW: Records every AI document audit
    scores: {
        technical: number;
        leadership: number;
        resilience: number;
        academic: number;
        fit: number;
        impact: number;
    };
    aiSummary: string;
    lastUpdated: string;
}
