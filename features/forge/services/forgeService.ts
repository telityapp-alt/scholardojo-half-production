
import { DomainType, ProgramTier, GenericProgram, GenericVaultItem } from '../../../core/contracts/entityMap';
import { GoogleGenAI, Type } from "@google/genai";

export interface MasterProgram {
    id: string;
    domain: DomainType;
    title: string;
    organizer: string;
    organizerLogo: string;
    coverImage: string;
    type: string;
    level: string;
    country: string;
    deadline: string;
    tier: ProgramTier;
    difficultyLevel: string;
    applyUrl: string;
    
    // Added for mapping support
    dojoRankRequired?: string;
    senseiProtocolQuote?: string;
    dossierRequirementKeys?: string[];

    // 1. Intel (Brief)
    intel: {
        description: string;
        highlights: string[];
        entryCriteria: string[];
        funding: string[];
        strategicWants: string[];
        fundingStatus: string;
        weights: { academic: number; assets: number; matrix: number };
        stats: any;
        partnerInstitutions: any[];
        timeline: any;
        financialValue: any;
        obligations: any;
    };

    // 2. Shadow Protocol (Keys)
    shadowProtocol: {
        expertVerdict: string;
        lethalMistakes: { title: string; reason: string }[];
        successVault: { id: string; title: string; category: string; previewUrl: string; senseiComment: string }[];
        alumniInsights: any[];
        ghostTasks: { label: string; importance: string }[];
    };

    // 3. Admission
    checklist: { id: string; label: string; estimate: string; subTasks: any[] }[];
    monthlyRoadmap: { month: string; tasks: string[] }[];

    // 4. Arsenal (Blueprints)
    blueprints: any[];

    // 5. Roadmap (Curriculum)
    curriculum: any;

    // 6. Arena
    arenaInstructions: string;
    battleQuestions: any[];
}

const STORE_KEY = 'dojo_forge_master_v6';

export const ForgeService = {
    getAll: (): MasterProgram[] => JSON.parse(localStorage.getItem(STORE_KEY) || '[]'),
    getById: (id: string) => ForgeService.getAll().find(p => p.id === id),
    save: (p: MasterProgram) => {
        const all = ForgeService.getAll();
        const idx = all.findIndex(x => x.id === p.id);
        if (idx !== -1) all[idx] = p; else all.unshift(p);
        localStorage.setItem(STORE_KEY, JSON.stringify(all));
        window.dispatchEvent(new Event('storage'));
    },
    delete: (id: string) => {
        const filtered = ForgeService.getAll().filter(p => p.id !== id);
        localStorage.setItem(STORE_KEY, JSON.stringify(filtered));
        window.dispatchEvent(new Event('storage'));
    },
    
    /**
     * Fix: Added forge method to resolve 'forge' does not exist on ForgeService error.
     * This method uses AI to extract a full MasterProgram from raw briefing text.
     */
    forge: async (input: string, domain: DomainType): Promise<MasterProgram> => {
        const schema = {
            type: Type.OBJECT,
            properties: {
                title: { type: Type.STRING },
                organizer: { type: Type.STRING },
                type: { type: Type.STRING },
                level: { type: Type.STRING },
                country: { type: Type.STRING },
                deadline: { type: Type.STRING },
                tier: { type: Type.STRING },
                difficultyLevel: { type: Type.STRING },
                applyUrl: { type: Type.STRING },
                dojoRankRequired: { type: Type.STRING },
                senseiProtocolQuote: { type: Type.STRING },
                intel: {
                    type: Type.OBJECT,
                    properties: {
                        description: { type: Type.STRING },
                        highlights: { type: Type.ARRAY, items: { type: Type.STRING } },
                        entryCriteria: { type: Type.ARRAY, items: { type: Type.STRING } },
                        funding: { type: Type.ARRAY, items: { type: Type.STRING } },
                        strategicWants: { type: Type.ARRAY, items: { type: Type.STRING } },
                        fundingStatus: { type: Type.STRING },
                        weights: { type: Type.OBJECT, properties: { academic: { type: Type.NUMBER }, assets: { type: Type.NUMBER }, matrix: { type: Type.NUMBER } } },
                        stats: { type: Type.OBJECT, properties: { awardeesPerYear: { type: Type.STRING }, acceptanceRate: { type: Type.STRING }, totalApplicants: { type: Type.NUMBER }, selectivityRatio: { type: Type.STRING }, targetKeywords: { type: Type.ARRAY, items: { type: Type.STRING } }, minGpa: { type: Type.NUMBER }, nationalityQuota: { type: Type.STRING } } },
                        partnerInstitutions: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, location: { type: Type.STRING }, rank: { type: Type.STRING }, deptStats: { type: Type.STRING } } } },
                        timeline: { type: Type.OBJECT, properties: { openDate: { type: Type.STRING }, docDeadline: { type: Type.STRING }, selectionPeriod: { type: Type.STRING }, resultEstimate: { type: Type.STRING }, interviewWindow: { type: Type.STRING } } },
                        financialValue: { type: Type.OBJECT, properties: { tuition: { type: Type.STRING }, living: { type: Type.STRING }, flights: { type: Type.STRING }, totalValue: { type: Type.STRING } } },
                        obligations: { type: Type.OBJECT, properties: { bondYears: { type: Type.NUMBER }, returnPolicy: { type: Type.STRING }, expectedContribution: { type: Type.STRING }, sanctionWarning: { type: Type.STRING } } }
                    }
                },
                shadowProtocol: {
                    type: Type.OBJECT,
                    properties: {
                        expertVerdict: { type: Type.STRING },
                        lethalMistakes: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { title: { type: Type.STRING }, reason: { type: Type.STRING } } } },
                        successVault: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { id: { type: Type.STRING }, title: { type: Type.STRING }, category: { type: Type.STRING }, previewUrl: { type: Type.STRING }, senseiComment: { type: Type.STRING } } } },
                        ghostTasks: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { label: { type: Type.STRING }, importance: { type: Type.STRING } } } }
                    }
                },
                checklist: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { id: { type: Type.STRING }, label: { type: Type.STRING }, estimate: { type: Type.STRING } } } },
                monthlyRoadmap: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { month: { type: Type.STRING }, tasks: { type: Type.ARRAY, items: { type: Type.STRING } } } } },
                arenaInstructions: { type: Type.STRING },
                battleQuestions: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { id: { type: Type.STRING }, text: { type: Type.STRING }, expectedPoints: { type: Type.ARRAY, items: { type: Type.STRING } } } } }
            }
        };
        const result = await ForgeService.callAI(`FORGE COMPLETE MASTER OBJECT FOR ${domain} MISSION:\n${input}`, schema);
        return {
            ...result,
            id: `p-${Date.now()}`,
            domain,
            organizerLogo: result.organizerLogo || 'https://cdn-icons-png.flaticon.com/512/1005/1005141.png',
            coverImage: result.coverImage || 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2940&auto=format&fit=crop',
            tier: result.tier || 'common',
            curriculum: result.curriculum || { units: [] },
            blueprints: result.blueprints || []
        };
    },

    callAI: async (prompt: string, schema: any) => {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-preview',
            contents: prompt,
            config: { 
                systemInstruction: "You are the Dojo Architect. Map data strictly to the schema. Output only valid JSON.",
                responseMimeType: "application/json",
                responseSchema: schema
            }
        });
        return JSON.parse(response.text || "{}");
    },

    getFlattenedPrograms: (domain: DomainType): GenericProgram[] => {
        return ForgeService.getAll().filter(p => p.domain === domain).map(p => ({
            id: p.id, domain: p.domain, hostId: p.id, hostName: p.organizer, title: p.title, description: p.intel.description,
            deadline: p.deadline, status: 'open', tier: p.tier, progress: 0, perks: p.intel.highlights, 
            tags: p.intel.stats?.targetKeywords || [], requirements: p.checklist, benefits: p.intel.funding, 
            category: p.type, link: p.applyUrl
        }));
    },

    getFlattenedVaultItems: (domain: DomainType): GenericVaultItem[] => {
        return ForgeService.getAll().filter(p => p.domain === domain).map(p => ({
            id: `v-${p.id}`, domain: p.domain, hostId: p.id, title: p.title, hostName: p.organizer,
            description: p.intel.description, category: p.type, matchScore: 95, deadline: p.deadline,
            tier: p.tier, tags: p.intel.stats?.targetKeywords || [], value: 0, valueLabel: 'Grant',
            location: p.country, requirements: p.checklist.map(c => ({ id: c.id, label: c.label, type: 'DOC', mandatory: true }))
        }));
    }
};
