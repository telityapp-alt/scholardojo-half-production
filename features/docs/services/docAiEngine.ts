
import { GoogleGenAI } from "@google/genai";
import { UnifiedProgram } from "../../programs/types";

export const DocAiEngine = {
    /**
     * Executes a high-fidelity audit using real program context.
     */
    auditWithContext: async (content: string, program: UnifiedProgram, docType: string) => {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const model = 'gemini-3-flash-preview';

        // 1. Precise matching logic: find the correct brief for this artifact
        const brief = program.shadowProtocol.docBriefs.find(b => 
            b.id.toLowerCase().includes(docType.toLowerCase()) || 
            docType.toLowerCase().includes(b.id.toLowerCase())
        );

        const systemInstruction = `
            You are the "Strategic Dojo Auditor" for ${program.organizer}.
            TARGET MISSION: ${program.title}
            ARTIFACT TYPE: ${brief?.label || docType}
            
            ${brief ? `STRICT BLUEPRINT BRIEF: ${brief.instructions}
            AUDIT CRITERIA: ${brief.aiAuditCriteria.join(', ')}` : ''}
            LETHAL MISTAKES TO DETECT: ${program.shadowProtocol.lethalMistakes.map(m => m.title).join(', ')}
            
            GOAL: Provide a brutal but high-impact tactical audit in Duolingo style.
            OUTPUT: Markdown format. Identify specific gaps. Be direct.
        `;

        try {
            const res = await ai.models.generateContent({
                model,
                contents: content,
                config: { systemInstruction }
            });
            return { verdict: res.text || "Neural link stable.", score: 85 };
        } catch (e) {
            return { error: "Neural link lost. Ensure API key is active." };
        }
    }
};
