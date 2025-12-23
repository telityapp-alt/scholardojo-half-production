
import { DomainType } from '../../core/contracts/entityMap';

export type ArenaDifficulty = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'ELITE';

export interface ArenaQuestion {
    id: string;
    text: string;
    category: string;
    difficulty: ArenaDifficulty;
    expectedPoints: string[];
}

export interface BattleSession {
    id: string;
    domain: DomainType;
    targetTitle: string;
    difficulty: ArenaDifficulty;
    bossHp: number; // 0-100
    userHp: number; // 0-100
    currentRound: number;
    totalRounds: number;
    questions: ArenaQuestion[];
    history: { role: 'boss' | 'ninja'; text: string; score?: number }[];
    status: 'IDLE' | 'PREPARING' | 'ACTIVE' | 'VICTORY' | 'DEFEAT';
}

export interface ArenaConfig {
    curriculumId?: string;
    vaultItemId?: string;
    difficulty: ArenaDifficulty;
}
