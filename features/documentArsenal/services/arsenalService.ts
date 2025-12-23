
import { DomainType } from '../../../core/contracts/entityMap';
import { DocumentBlueprint } from '../types';
import { GoogleGenAI, Type } from "@google/genai";

const MOCK_BLUEPRINTS: DocumentBlueprint[] = [
    {
        id: 'gates-personal-blueprint',
        programId: 'gates-cambridge-2025',
        domain: DomainType.SCHOLAR,
        category: 'ESSAY',
        title: 'Gates Personal Statement',
        brief: 'This is NOT a regular personal statement. It must bridge your research with a specific social impact mission.',
        checkpoints: [
            { id: 'cp1', label: 'The "Hook" (First 100 words)', reason: 'Must establish your leadership identity immediately.', weight: 10 },
            { id: 'cp2', label: 'Cambridge Alignment', reason: 'Why does this research MUST happen at Cambridge?', weight: 8 },
            { id: 'cp3', label: 'Home Country Commitment', reason: 'Concrete plans to return and create value.', weight: 9 }
        ],
        keywords: ['Systemic Change', 'Leadership', 'Equitable Access', 'Pioneer'],
        artifacts: [
            { 
                id: 'art-1', title: 'Winning STEM Gates Essay', description: 'Masterclass in balancing technical depth with empathy.', 
                url: 'https://www.africau.edu/images/default/sample.pdf', alumniName: 'Sarah J.', alumniYear: '2023', keyHighlight: 'Focus on "Rural Uplift" in paragraph 3.'
            }
        ],
        aiContext: {
            tone: 'Visionary, Humble, Academic',
            focus: 'Social Impact over personal gain',
            rejectionTriggers: ['Arrogance', 'Vague goals', 'Only focusing on GPA']
        }
    },
    {
        id: 'openai-technical-cv',
        programId: 'openai-fellow-2025',
        domain: DomainType.INTERN,
        category: 'CV',
        title: 'Elite Technical Resume (AI)',
        brief: 'Focus on GPU kernels, scaling laws, and Open Source contributions. Traditional SWE resumes will fail here.',
        checkpoints: [
            { id: 'tc1', label: 'Arxiv/Paper Links', reason: 'Theoretical grounding must be verifiable.', weight: 10 },
            { id: 'tc2', label: 'Contribution Metrics', reason: 'PRs to PyTorch or Transformers repo.', weight: 10 },
            { id: 'tc3', label: 'Compute Scale', reason: 'Have you worked with 100+ GPU clusters?', weight: 8 }
        ],
        keywords: ['CUDA', 'FlashAttention', 'Optimization', 'Large-scale'],
        artifacts: [
            { 
                id: 'art-2', title: 'OpenAI Fellow CV (2024)', description: 'Perfect structure for research fellows.', 
                url: 'https://www.africau.edu/images/default/sample.pdf', alumniName: 'Kevin X.', alumniYear: '2024', keyHighlight: 'Technical Stack integrated into Project section.'
            }
        ],
        aiContext: {
            tone: 'Scientific, Concise, Impact-driven',
            focus: 'Low-level AI implementation',
            rejectionTriggers: ['Vague descriptions', 'Prompt Engineering focus only']
        }
    }
];

export const ArsenalService = {
    getBlueprintsByProgram: (programId: string): DocumentBlueprint[] => {
        return MOCK_BLUEPRINTS.filter(b => b.programId === programId);
    },

    /**
     * Finds a specific blueprint for a requirement, either by exact matching or category.
     */
    getBlueprintForRequirement: (programId: string, requirementId: string): DocumentBlueprint | undefined => {
        const programBlueprints = ArsenalService.getBlueprintsByProgram(programId);
        
        // 1. Try exact match (e.g. 'cv' or 'essay_motlet')
        const exact = programBlueprints.find(b => b.id.includes(requirementId));
        if (exact) return exact;

        // 2. Try category match (CV, ESSAY, etc)
        const cat = requirementId.split('_')[0].toUpperCase();
        return programBlueprints.find(b => b.category === cat);
    },
    
    getAllBlueprints: (domain: DomainType): DocumentBlueprint[] => {
        return MOCK_BLUEPRINTS.filter(b => b.domain === domain);
    },

    getBlueprintById: (id: string): DocumentBlueprint | undefined => {
        return MOCK_BLUEPRINTS.find(b => b.id === id);
    },

    auditDocument: async (content: string, blueprint: DocumentBlueprint) => {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const model = 'gemini-3-flash-preview';

        const systemInstruction = `
            You are the "Dojo Strategic Auditor". 
            GOAL: Audit a user's ${blueprint.category} based on the "${blueprint.title}" Blueprint.
            
            STRICT BLUEPRINT PARAMETERS:
            Brief: ${blueprint.brief}
            Critical Checkpoints: ${blueprint.checkpoints.map(c => c.label).join(', ')}
            Elite Keywords: ${blueprint.keywords.join(', ')}
            Required Tone: ${blueprint.aiContext.tone}
            
            SCORING LOGIC (0-100):
            - REJECTION TRIGGERS: ${blueprint.aiContext.rejectionTriggers.join(', ')}. If found, cap score at 40.
            - MISSION ALIGNMENT: How well does this content reflect "${blueprint.brief}"?
            - TECHNICAL DEPTH: Does it hit the checkpoints?
            
            Return strictly JSON: 
            { 
                "score": number, 
                "heatmap": { "technical": number, "narrative": number, "clarity": number },
                "checkpointFeedback": [ { "id": string, "pass": boolean, "tip": string } ],
                "overallVerdict": string
            }
        `;

        try {
            const response = await ai.models.generateContent({
                model,
                contents: `DOCUMENT CONTENT:\n\n${content}`,
                config: { 
                    systemInstruction, 
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            score: { type: Type.NUMBER },
                            heatmap: { type: Type.OBJECT, properties: { technical: { type: Type.NUMBER }, narrative: { type: Type.NUMBER }, clarity: { type: Type.NUMBER } } },
                            checkpointFeedback: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { id: { type: Type.STRING }, pass: { type: Type.BOOLEAN }, tip: { type: Type.STRING } } } },
                            overallVerdict: { type: Type.STRING }
                        },
                        required: ["score", "heatmap", "checkpointFeedback", "overallVerdict"]
                    }
                }
            });
            return JSON.parse(response.text || "{}");
        } catch (e) {
            throw new Error("Audit Link Interrupted.");
        }
    }
};
