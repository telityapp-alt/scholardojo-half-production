
/**
 * DOJO MASTER CONFIGURATION
 * Centralized source of truth for all system limits and multipliers.
 */
export const APP_CONFIG = {
    AI: {
        DAILY_CHARACTER_LIMIT: 200000,
        TOKEN_MULTIPLIER: 1.3, // Approximate chars to tokens for Gemini
        MAX_INPUT_CHARS: 30000,
    },
    STORAGE: {
        MAX_SIZE_MB: 5,
        CRITICAL_THRESHOLD: 85, // Percentage
    },
    STORAGE_KEYS: {
        SECURED_MISSIONS: 'dojo_secured_missions',
        LANG: 'dojo_lang',
        REGION: 'dojo_region',
        ADMISSION_REGISTRY: 'dojo_admission_registry_v4',
        FORGE_MASTER: 'dojo_forge_master_v6',
        USER_PROGRESS: 'dojo_progression_v1',
        CENTRAL_DNA: 'dojo_central_dna_v4',
        SKILL_MASTERY: 'dojo_skill_mastery_v1',
        SAVED_LIBRARY: 'dojo_saved_library_v1',
        AI_USAGE: 'dojo_ai_usage_ledger_v2',
        AI_CACHE: 'dojo_ai_cache_fingerprints',
        TRANSLATION_VAULT: 'dojo_translation_vault'
    },
    PROGRESSION: {
        SYNC_THROTTLE_MS: 2000,
        LEVEL_FACTOR: 50,
    },
    TIMEZONE: 'UTC' // Standardized for daily resets
};
