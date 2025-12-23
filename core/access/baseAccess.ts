
/**
 * SafeAccess Core Layer
 * Terintegrasi dengan pola asinkron untuk persiapan migrasi ke Supabase/Cloud.
 */
export const SafeAccess = {
    _locks: new Set<string>(),

    /**
     * Fingerprint generator untuk tracking perubahan data unik.
     */
    getFingerprint: (str: string) => {
        let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
        for (let i = 0, ch; i < str.length; i++) {
            ch = str.charCodeAt(i);
            h1 = Math.imul(h1 ^ ch, 2654435761);
            h2 = Math.imul(h2 ^ ch, 1597334677);
        }
        h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
        h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
        return `fp_${(h2 >>> 0).toString(16)}${(h1 >>> 0).toString(16)}`;
    },

    /**
     * Save data dengan pola wrapper. 
     * Jika nanti menggunakan Supabase, ganti isi fungsi ini dengan call ke supabase.from().upsert()
     */
    save: async <T>(key: string, data: T): Promise<boolean> => {
        try {
            const envelope = {
                _updatedAt: Date.now(),
                _fingerprint: SafeAccess.getFingerprint(JSON.stringify(data)),
                _payload: data
            };
            
            // Local fallback (masih digunakan sampai Supabase Client diconfigure)
            localStorage.setItem(key, JSON.stringify(envelope));
            
            // Trigger global sync event
            window.dispatchEvent(new Event('storage'));
            return true;
        } catch (e) {
            console.error(`[Dojo Store] Save Error on key: ${key}`, e);
            return false;
        }
    },

    /**
     * Pull data dengan safety-catch.
     */
    pull: <T>(key: string, fallback: T): T => {
        const raw = localStorage.getItem(key);
        if (!raw) return fallback;
        try {
            const envelope = JSON.parse(raw);
            // Validasi struktur payload
            if (envelope && envelope._payload !== undefined) {
                return envelope._payload as T;
            }
            return fallback;
        } catch (e) {
            console.warn(`[Dojo Store] Data corrupted on key: ${key}. Using fallback.`);
            return fallback;
        }
    },

    acquireLock: (key: string): boolean => {
        if (SafeAccess._locks.has(key)) return false;
        SafeAccess._locks.add(key);
        return true;
    },

    releaseLock: (key: string) => {
        SafeAccess._locks.delete(key);
    }
};
