
import { GoogleGenAI, Type } from "@google/genai";
import { ArenaQuestion, ArenaDifficulty } from '../types';
import { DomainType, GenericVaultItem, GenericProgram } from '../../../core/contracts/entityMap';

export const ArenaService = {
    generateBattleSet: async (
        domain: DomainType, 
        curriculumTitle: string, 
        targetItem: GenericVaultItem | GenericProgram | null,
        manualObjective: string,
        manualContext: string,
        difficulty: ArenaDifficulty,
        language: 'en' | 'id'
    ): Promise<ArenaQuestion[]> => {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        const boardContext = targetItem 
            ? `BOARD DATA: ${targetItem.title}. HOST: ${targetItem.hostName}. DESC: ${targetItem.description}.` 
            : "GENERAL DOJO CHALLENGE";

        const systemInstruction = `
            You are the "Arena Boss Architect". 
            Generate a set of 5 increasingly difficult interview questions.
            
            LANGUAGE: Respond strictly in ${language === 'id' ? 'BAHASA INDONESIA' : 'ENGLISH'}.
            
            MISSION CONTEXT:
            - Objective: ${manualObjective || 'Assessment'}
            - Reference: ${manualContext || 'No specific reference'}
            - Dojo Curriculum: ${curriculumTitle}
            - Linked Board Item: ${boardContext}
            
            LEVELING:
            - ${difficulty} Difficulty.
            - Ensure questions are sharp, technical, and high-pressure.
            
            Return JSON array of questions: { id, text, category, difficulty, expectedPoints }
        `;

        const responseSchema = {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    id: { type: Type.STRING },
                    text: { type: Type.STRING },
                    category: { type: Type.STRING },
                    difficulty: { type: Type.STRING },
                    expectedPoints: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: ["id", "text", "category", "difficulty", "expectedPoints"]
            }
        };

        try {
            const response = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: `Initiate battle set for ${language === 'id' ? 'misi' : 'mission'}: ${manualObjective || curriculumTitle}`,
                config: { systemInstruction, responseMimeType: "application/json", responseSchema }
            });
            return JSON.parse(response.text || "[]");
        } catch (e) {
            console.error("Arena Generation Error", e);
            throw e;
        }
    },

    evaluateAnswer: async (question: string, answer: string, expected: string[], language: 'en' | 'id'): Promise<{ score: number; feedback: string; weaknesses?: string[]; improvements?: string[] }> => {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const systemInstruction = `
            Evaluate answer in ${language === 'id' ? 'BAHASA INDONESIA' : 'ENGLISH'}. 
            Score 5-30 (Damage to Boss).
            High score for nuance/keywords: ${expected.join(', ')}.
            Feedback: Duo-style, punchy, energetic.
            
            CRITICAL: Identify exactly what's WRONG or MISSING in the answer.
            Return JSON: { 
                "score": number, 
                "feedback": string, 
                "weaknesses": string[], // List specific errors/lacks
                "improvements": string[] // List specific steps to fix
            }
        `;

        try {
            const response = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: `Q: ${question}\nUser: ${answer}`,
                config: { systemInstruction, responseMimeType: "application/json" }
            });
            return JSON.parse(response.text || '{"score": 10, "feedback": "Good hit!"}');
        } catch (e) {
            return { score: 10, feedback: language === 'id' ? "Serangan bagus!" : "Solid hit!" };
        }
    }
};
