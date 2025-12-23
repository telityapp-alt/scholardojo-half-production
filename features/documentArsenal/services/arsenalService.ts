
import { DomainType } from '../../../core/contracts/entityMap';
import { DocumentBlueprint } from '../types';
import { Type } from "@google/genai";
import { AIOrchestrator } from '../../../core/engines/aiOrchestrator';

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
    }
];

export const ArsenalService = {
    getBlueprintsByProgram: (programId: string): DocumentBlueprint[] => {
        return MOCK_BLUEPRINTS.filter(b => b.programId === programId);
    },

    getBlueprintForRequirement: (programId: string, requirementId: string): DocumentBlueprint | undefined => {
        const programBlueprints = ArsenalService.getBlueprintsByProgram(programId);
        const exact = programBlueprints.find(b => b.id.includes(requirementId));
        if (exact) return exact;
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
            // SECURITY: Switched to AIOrchestrator
            const response = await AIOrchestrator.generateContent({
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
