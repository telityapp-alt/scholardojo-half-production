
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
    PROGRESSION: {
        SYNC_THROTTLE_MS: 2000,
        LEVEL_FACTOR: 50,
    },
    TIMEZONE: 'UTC' // Standardized for daily resets
};
