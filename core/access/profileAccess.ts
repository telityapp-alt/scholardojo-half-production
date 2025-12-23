
import { DomainType } from '../contracts/entityMap';
import { SafeAccess } from './baseAccess';
import { DojoEmitter } from '../services/dojoEmitter';

export interface UserDNA {
    id: string;
    domain: DomainType;
    name: string;
    avatarSeed: string;
    bio: string;
    university: string;
    country: string;
    maxGpa: number;
    currentGpa: number;
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

const STORAGE_KEY = 'dojo_central_dna_v4';

const getCleanScores = (s: any): UserDNA['scores'] => ({
    technical: Math.max(0, Math.min(100, Number(s?.technical) || 0)),
    leadership: Math.max(0, Math.min(100, Number(s?.leadership) || 0)),
    resilience: Math.max(0, Math.min(100, Number(s?.resilience) || 0)),
    academic: Math.max(0, Math.min(100, Number(s?.academic) || 0)),
    fit: Math.max(0, Math.min(100, Number(s?.fit) || 0)),
    impact: Math.max(0, Math.min(100, Number(s?.impact) || 0)),
});

export const ProfileAccess = {
    getDNA: (domain: DomainType): UserDNA => {
        const validDomain = typeof domain === 'string' ? domain : DomainType.STUDENT;
        const key = `${STORAGE_KEY}_${validDomain}`;
        const data = SafeAccess.pull<UserDNA | null>(key, null);
        
        const domainUpper = validDomain.toUpperCase();
        
        const baseDNA: UserDNA = {
            id: `DNA-${domainUpper}-${Math.random().toString(36).substring(7).toUpperCase()}`,
            domain: validDomain as DomainType,
            name: 'Elite Candidate',
            avatarSeed: 'Felix',
            bio: 'Awaiting systematic calibration...',
            university: 'Awaiting Sync',
            country: 'Global',
            maxGpa: 4.0,
            currentGpa: 0.0,
            scores: { technical: 0, leadership: 0, resilience: 0, academic: 0, fit: 0, impact: 0 },
            aiSummary: "Start the Assessment Protocol to initialize your Neural Matrix scores.",
            lastUpdated: ''
        };

        if (!data) return baseDNA;

        return {
            ...baseDNA,
            ...data,
            currentGpa: Number(data.currentGpa) || 0,
            maxGpa: Number(data.maxGpa) || 4.0,
            scores: getCleanScores(data.scores)
        };
    },

    saveDNA: async (dna: UserDNA) => {
        const payload = {
            ...dna,
            currentGpa: Number(dna.currentGpa),
            maxGpa: Number(dna.maxGpa),
            scores: getCleanScores(dna.scores),
            lastUpdated: new Date().toISOString()
        };
        const key = `${STORAGE_KEY}_${dna.domain}`;
        await SafeAccess.save(key, payload);
        DojoEmitter.emit('DNA_UPDATED', payload);
    },

    updateScores: async (domain: DomainType, updates: Partial<UserDNA['scores']>) => {
        const dna = ProfileAccess.getDNA(domain);
        Object.entries(updates).forEach(([key, val]) => {
            const k = key as keyof UserDNA['scores'];
            const current = dna.scores[k] || 0;
            const boost = Number(val) || 0;
            // Diminishing returns logic
            const multiplier = (100 - current) / 100;
            dna.scores[k] = Math.min(100, Math.round(current + (boost * multiplier)));
        });
        await ProfileAccess.saveDNA(dna);
    }
};
