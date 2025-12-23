
import { translateObjectWithAI } from '../../services/geminiService';
import { SupportedLanguage } from '../contracts/localization';

export const AI_TRANSLATION_CACHE_KEY = 'dojo_translation_vault';
const PENDING_TRANSLATIONS = new Set<string>();

interface TranslationVault {
    [lang: string]: {
        [key: string]: any;
    };
}

export const AITranslationEngine = {
    /**
     * Translates a data object using AI or returns cached version.
     * Guarded against redundant parallel calls.
     */
    transform: async (data: any, id: string, targetLang: SupportedLanguage): Promise<any> => {
        if (!data || targetLang === 'en') return data;

        const lockKey = `${id}_${targetLang}`;
        if (PENDING_TRANSLATIONS.has(lockKey)) return data;

        // 1. Get Vault from Storage
        const rawVault = localStorage.getItem(AI_TRANSLATION_CACHE_KEY);
        const vault: TranslationVault = rawVault ? JSON.parse(rawVault) : {};

        // 2. Check Cache
        if (vault[targetLang] && vault[targetLang][id]) {
            return vault[targetLang][id];
        }

        // 3. AI Transformation with Lock
        PENDING_TRANSLATIONS.add(lockKey);
        try {
            const translatedData = await translateObjectWithAI(data, targetLang);

            // 4. Update Vault
            if (!vault[targetLang]) vault[targetLang] = {};
            vault[targetLang][id] = translatedData;
            localStorage.setItem(AI_TRANSLATION_CACHE_KEY, JSON.stringify(vault));

            return translatedData;
        } catch (err) {
            console.error("[Dojo AI] Failed to transform", err);
            return data;
        } finally {
            PENDING_TRANSLATIONS.delete(lockKey);
        }
    }
};
