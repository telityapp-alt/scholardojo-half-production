
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { APP_CONFIG } from '../contracts/appConfig';

/**
 * AIOrchestrator
 * The absolute master gateway for all AI interactions in the Dojo.
 * Ensures security by being the ONLY place where GoogleGenAI is initialized.
 */
export const AIOrchestrator = {
    generateContent: async (params: { model: string; contents: any; config?: any }): Promise<GenerateContentResponse> => {
        // 1. Daily Neural Energy Check
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

        // 2. Encapsulated Initialization
        // process.env.API_KEY is handled externally.
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

        try {
            // 3. SDK Execution
            const response = await ai.models.generateContent({
                model: params.model,
                contents: params.contents,
                config: params.config
            });

            // 4. Token & Usage Analysis
            const inputStr = typeof params.contents === 'string' ? params.contents : JSON.stringify(params.contents);
            const outputStr = response.text || "";
            const estimatedTokens = Math.round((inputStr.length + outputStr.length) * APP_CONFIG.AI.TOKEN_MULTIPLIER);
            
            ledger.usedTokens += estimatedTokens;
            localStorage.setItem(APP_CONFIG.STORAGE_KEYS.AI_USAGE, JSON.stringify(ledger));

            return response;
        } catch (error: any) {
            // Check for requested entity not found error (API key selection state)
            if (error.message?.includes("Requested entity was not found")) {
                 console.error("[Neural Link] Key selection mismatch.");
            }
            throw error;
        }
    }
};
