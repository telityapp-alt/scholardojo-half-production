
import { GoogleGenAI, GenerateContentParameters, GenerateContentResponse } from "@google/genai";

// DOJO AI GUARD: Character-based proxy for token management
const DAILY_LIMIT = 200000; 
const USAGE_KEY = 'dojo_ai_usage_ledger';

export const AIOrchestrator = {
    /**
     * Centralized execution for all Gemini calls.
     * Implements cost guards and usage tracking.
     */
    generateContent: async (params: GenerateContentParameters & { model: string }): Promise<GenerateContentResponse> => {
        // 1. Safety Check: Usage Limit
        const today = new Date().toDateString();
        const rawUsage = localStorage.getItem(USAGE_KEY);
        let ledger = rawUsage ? JSON.parse(rawUsage) : { date: today, used: 0 };

        if (ledger.date !== today) {
            ledger = { date: today, used: 0 };
        }

        if (ledger.used > DAILY_LIMIT) {
            console.error("[Dojo AI] Daily energy limit reached.");
            throw new Error("Sensei is resting. Daily neural energy depleted.");
        }

        // 2. Initialize fresh client for every call (prevents key race conditions)
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

        try {
            // 3. Execute Strike
            const response = await ai.models.generateContent(params);

            // 4. Record Usage (Approximate characters as tokens)
            const inputStr = typeof params.contents === 'string' ? params.contents : JSON.stringify(params.contents);
            const characters = inputStr.length + (response.text?.length || 0);
            
            ledger.used += characters;
            localStorage.setItem(USAGE_KEY, JSON.stringify(ledger));

            return response;
        } catch (error: any) {
            console.error("[Dojo AI] Neural Error:", error);
            throw error;
        }
    }
};
