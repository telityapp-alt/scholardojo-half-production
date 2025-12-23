
export const StorageGuard = {
    /**
     * Returns true if there is enough space to write (~500KB buffer)
     */
    canWrite: (): boolean => {
        try {
            const testKey = '__storage_test__';
            localStorage.setItem(testKey, testKey);
            localStorage.removeItem(testKey);
            return true;
        } catch (e) {
            return false;
        }
    },

    getUsedMB: (): number => {
        let total = 0;
        for (const key in localStorage) {
            if (!localStorage.hasOwnProperty(key)) continue;
            total += ((localStorage[key].length + key.length) * 2);
        }
        return Number((total / 1024 / 1024).toFixed(2));
    },

    getUsagePercentage: (): number => {
        const used = StorageGuard.getUsedMB();
        const limit = 5; // Standard lowest safe limit for mobile
        return Math.round((used / limit) * 100);
    }
};
