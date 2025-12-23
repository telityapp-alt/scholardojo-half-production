
import { DomainType } from '../../../core/contracts/entityMap';
import { UserFoundation, ArenaLog, AuditRecord } from '../types';
import { GoogleGenAI, Type } from "@google/genai";
import { SafeAccess } from '../../../core/access/baseAccess';
import { ProfileAccess } from '../../../core/access/profileAccess';

const STORAGE_KEY = 'dojo_melytics_intelligence_v4';
const CACHE_KEY = 'dojo_ai_cache_fingerprints';

export const MelyticsService = {
    getFoundation: (domain: DomainType): UserFoundation => {
        const dna = ProfileAccess.getDNA(domain);
        const raw = localStorage.getItem(`${STORAGE_KEY}_${domain}`);
        const foundation = raw ? JSON.parse(raw) : {
            id: dna.id,
            domain,
            name: dna.name,
            avatarSeed: dna.avatarSeed,
            bio: dna.bio,
            arenaLogs: [],
            auditHistory: [],
            scores: dna.scores,
            aiSummary: 'Start a mission and enter the Arena to initialize your Neural Matrix.',
            lastUpdated: new Date().toISOString()
        };
        
        // Always sync basic identity from central DNA
        return {
            ...foundation,
            name: dna.name,
            avatarSeed: dna.avatarSeed,
            bio: dna.bio,
            scores: dna.scores 
        };
    },

    saveFoundation: (data: UserFoundation) => {
        const prunedData = {
            ...data,
            arenaLogs: data.arenaLogs.slice(0, 20),
            auditHistory: data.auditHistory.slice(0, 20)
        };
        
        SafeAccess.save(`${STORAGE_KEY}_${data.domain}`, prunedData);
        window.dispatchEvent(new Event('storage'));
    },

    analyzeCv: async (text: string, domain: DomainType) => {
        const fingerprint = SafeAccess.getFingerprint(text);
        
        const cacheRaw = localStorage.getItem(CACHE_KEY);
        const cache = cacheRaw ? JSON.parse(cacheRaw) : {};
        if (cache[fingerprint]) {
            return cache[fingerprint];
        }

        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const model = 'gemini-3-flash-preview';
        
        const systemInstruction = `Extract Ninja Matrix scores (0-100) and neural summary from Resume. Domain: ${domain}. NO DUMMY VALUES. If info missing, keep at 0.`;
        const responseSchema = {
            type: Type.OBJECT,
            properties: {
                scores: {
                    type: Type.OBJECT,
                    properties: {
                        technical: { type: Type.NUMBER }, leadership: { type: Type.NUMBER },
                        resilience: { type: Type.NUMBER }, academic: { type: Type.NUMBER },
                        fit: { type: Type.NUMBER }, impact: { type: Type.NUMBER }
                    }
                },
                aiSummary: { type: Type.STRING }
            }
        };

        try {
            const response = await ai.models.generateContent({
                model,
                contents: text,
                config: { systemInstruction, responseMimeType: "application/json", responseSchema }
            });
            const result = JSON.parse(response.text || "{}");
            
            cache[fingerprint] = result;
            localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
            
            return result;
        } catch (error) {
            console.error("AI Analysis failed", error);
            // Defaulting to 0 on error, not dummy
            return { scores: { technical: 0, leadership: 0, resilience: 0, academic: 0, fit: 0, impact: 0 }, aiSummary: "Neural link unstable." };
        }
    },

    addArenaLog: (domain: DomainType, log: ArenaLog, performanceBoost: Partial<UserFoundation['scores']>) => {
        const foundation = MelyticsService.getFoundation(domain);
        foundation.arenaLogs = [log, ...foundation.arenaLogs]; 
        
        // Use ProfileAccess to update central DNA scores
        ProfileAccess.updateScores(domain, performanceBoost);
        
        foundation.lastUpdated = new Date().toISOString();
        MelyticsService.saveFoundation(foundation);
    }
};
