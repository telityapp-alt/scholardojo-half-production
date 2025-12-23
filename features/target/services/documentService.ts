
import { Type } from "@google/genai";
import { AdmissionRequirement } from "../../admission/types";
import { AIOrchestrator } from "../../../core/engines/aiOrchestrator";

export const DocumentService = {
    analyzeContent: async (req: AdmissionRequirement, missionName: string): Promise<{ score: number, feedback: string[], status: string }> => {
        const model = 'gemini-3-flash-preview';

        const systemInstruction = `
            You are the "Dojo Admissions Officer". Your job is to strictly evaluate if a user's document content meets the "Mission Brief".
            MISSION: ${missionName}
            REQUIREMENT: ${req.label}
            BRIEF (Expectations): ${req.brief || 'General professional standard'}
            
            Be brutal. If the content is short or generic, give a low score (under 50).
            If it's good but missing format details, mark as "Qualified" (score 70-85).
            If it's elite and perfectly matches the brief, mark as "Standout" (score 90+).
            
            Return JSON: { "score": number, "feedback": string[], "status": "DRAFT" | "QUALIFIED" | "STANDOUT" }
        `;

        try {
            // SECURITY: Using centralized AIOrchestrator
            const response = await AIOrchestrator.generateContent({
                model,
                contents: `USER DOCUMENT CONTENT:\n\n${req.content || ''}`,
                config: { 
                    systemInstruction, 
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            score: { type: Type.NUMBER },
                            feedback: { type: Type.ARRAY, items: { type: Type.STRING } },
                            status: { type: Type.STRING }
                        },
                        required: ["score", "feedback", "status"]
                    }
                }
            });

            return JSON.parse(response.text || "{}");
        } catch (e) {
            console.error("AI Analysis Failed", e);
            throw e;
        }
    }
};
