
export const AtomicStorage = {
    /**
     * Save with a checksum-like verification to ensure no partial writes.
     */
    commit: (key: string, data: any) => {
        try {
            const payload = JSON.stringify({
                _v: Date.now(),
                _payload: data
            });
            
            // Write to staging first
            localStorage.setItem(`${key}_staging`, payload);
            
            // Verify write was successful by reading it back
            const verify = localStorage.getItem(`${key}_staging`);
            if (verify === payload) {
                // Safe to move to main key
                localStorage.setItem(key, payload);
                localStorage.removeItem(`${key}_staging`);
                return true;
            }
            return false;
        } catch (e) {
            console.error("[Atomic] Commit Failed", e);
            return false;
        }
    },

    /**
     * Specialized read that handles the atomic envelope.
     */
    pull: <T>(key: string, fallback: T): T => {
        const raw = localStorage.getItem(key);
        if (!raw) return fallback;
        
        try {
            const envelope = JSON.parse(raw);
            return envelope._payload as T;
        } catch (e) {
            // Fallback to staging if main is corrupted
            const staging = localStorage.getItem(`${key}_staging`);
            if (staging) {
                try { return JSON.parse(staging)._payload as T; } catch(err) { return fallback; }
            }
            return fallback;
        }
    }
};
