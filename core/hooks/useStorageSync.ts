
import { useEffect } from 'react';

/**
 * useStorageSync
 * Universal hook for components that need to react to storage changes.
 * Ensures strict removal of listeners to prevent memory leaks.
 */
export function useStorageSync(onSync: () => void) {
    useEffect(() => {
        const handleSync = (e: StorageEvent | Event) => {
            // Check if it's a real storage event or our manual trigger
            onSync();
        };

        window.addEventListener('storage', handleSync);
        return () => {
            window.removeEventListener('storage', handleSync);
        };
    }, [onSync]);
}
