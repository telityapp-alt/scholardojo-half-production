
import { GoogleGenAI, GenerateContentParameters, GenerateContentResponse } from "@google/genai";
import { APP_CONFIG } from '../contracts/appConfig';

const USAGE_KEY = 'dojo_ai_usage_ledger_v2';

export const AIOrchestrator = {
    /**
     * Centralized execution for all Gemini calls.
     * Implements accurate token estimation and cost guards.
     */
    generateContent: async (params: GenerateContentParameters & { model: string }): Promise<GenerateContentResponse> => {
        // 1. Safety Check: Daily Neural Energy
        const now = new Date();
        const todayKey = now.toISOString().split('T')[0]; // YYYY-MM-DD
        
        const rawUsage = localStorage.getItem(USAGE_KEY);
        let ledger = rawUsage ? JSON.parse(rawUsage) : { date: todayKey, usedTokens: 0 };

        // Reset if new day detected
        if (ledger.date !== todayKey) {
            ledger = { date: todayKey, usedTokens: 0 };
        }

        if (ledger.usedTokens > APP_CONFIG.AI.DAILY_CHARACTER_LIMIT) {
            console.error("[Dojo AI] Daily energy limit reached.");
            throw new Error("Sensei is resting. Daily neural energy depleted. Try again tomorrow.");
        }

        // 2. Initialize fresh client
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

        try {
            const response = await ai.models.generateContent(params);

            // 3. Record Usage with Improved Token Math
            const inputStr = typeof params.contents === 'string' ? params.contents : JSON.stringify(params.contents);
            const outputStr = response.text || "";
            
            // Estimated tokens (chars * multiplier)
            const estimatedTokens = Math.round((inputStr.length + outputStr.length) * APP_CONFIG.AI.TOKEN_MULTIPLIER);
            
            ledger.usedTokens += estimatedTokens;
            localStorage.setItem(USAGE_KEY, JSON.stringify(ledger));

            return response;
        } catch (error: any) {
            console.error("[Dojo AI] Neural Strike Failed:", error);
            throw error;
        }
    }
};
