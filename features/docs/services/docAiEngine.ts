
import { UnifiedProgram } from "../../programs/types";
import { AIOrchestrator } from "../../../core/engines/aiOrchestrator";

export const DocAiEngine = {
    /**
     * Executes a high-fidelity audit using real program context via AIOrchestrator.
     */
    auditWithContext: async (content: string, program: UnifiedProgram, docType: string) => {
        const model = 'gemini-3-flash-preview';

        // Precise matching logic: find the correct brief for this artifact
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
            // SECURITY: Call centralized orchestrator
            const res = await AIOrchestrator.generateContent({
                model,
                contents: content,
                config: { systemInstruction }
            });
            return { verdict: res.text || "Neural link stable.", score: 85 };
        } catch (e) {
            return { error: "Neural link lost. Ensure the strike is valid." };
        }
    }
};
