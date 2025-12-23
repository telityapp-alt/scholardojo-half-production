
import { GoogleGenAI, GenerateContentParameters, GenerateContentResponse } from "@google/genai";
import { APP_CONFIG } from '../contracts/appConfig';

export const AIOrchestrator = {
    /**
     * Centralized execution for all Gemini calls.
     * Implements accurate token estimation and cost guards.
     */
    generateContent: async (params: GenerateContentParameters & { model: string }): Promise<GenerateContentResponse> => {
        // 1. Safety Check: Daily Neural Energy
        const now = new Date();
        const todayKey = now.toISOString().split('T')[0];
        
        const rawUsage = localStorage.getItem(APP_CONFIG.STORAGE_KEYS.AI_USAGE);
        let ledger = rawUsage ? JSON.parse(rawUsage) : { date: todayKey, usedTokens: 0 };

        if (ledger.date !== todayKey) {
            ledger = { date: todayKey, usedTokens: 0 };
        }

        if (ledger.usedTokens > APP_CONFIG.AI.DAILY_CHARACTER_LIMIT) {
            throw new Error("Sensei is resting. Daily neural energy depleted. Try again tomorrow.");
        }

        // 2. Initialize fresh client
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

        try {
            const response = await ai.models.generateContent(params);

            // 3. Record Usage
            const inputStr = typeof params.contents === 'string' ? params.contents : JSON.stringify(params.contents);
            const outputStr = response.text || "";
            const estimatedTokens = Math.round((inputStr.length + outputStr.length) * APP_CONFIG.AI.TOKEN_MULTIPLIER);
            
            ledger.usedTokens += estimatedTokens;
            localStorage.setItem(APP_CONFIG.STORAGE_KEYS.AI_USAGE, JSON.stringify(ledger));

            return response;
        } catch (error: any) {
            // Pruned console logs for production readiness
            throw error;
        }
    }
};
