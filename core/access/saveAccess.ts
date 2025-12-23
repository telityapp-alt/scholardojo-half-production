
import { DomainType, GenericProgram, GenericVaultItem, GenericEvent } from '../contracts/entityMap';

const SAVE_DB_KEY = 'dojo_saved_library_v1';

export type SavedItemType = 'PROGRAM' | 'VAULT' | 'EVENT' | 'COMMUNITY';

export interface SavedRecord {
    id: string;
    type: SavedItemType;
    domain: DomainType;
    timestamp: number;
    data: any; // Full snapshot of the item
}

export const SaveService = {
    getAll: (): SavedRecord[] => {
        const raw = localStorage.getItem(SAVE_DB_KEY);
        return raw ? JSON.parse(raw) : [];
    },

    getByDomain: (domain: DomainType): SavedRecord[] => {
        return SaveService.getAll().filter(r => r.domain === domain);
    },

    isSaved: (id: string): boolean => {
        return SaveService.getAll().some(r => r.id === id);
    },

    toggle: (item: any, type: SavedItemType, domain: DomainType): boolean => {
        const all = SaveService.getAll();
        const exists = all.find(r => r.id === item.id);
        let isNowSaved = false;

        if (exists) {
            const updated = all.filter(r => r.id !== item.id);
            localStorage.setItem(SAVE_DB_KEY, JSON.stringify(updated));
            isNowSaved = false;
        } else {
            const newRecord: SavedRecord = {
                id: item.id,
                type,
                domain,
                timestamp: Date.now(),
                data: item
            };
            all.unshift(newRecord);
            localStorage.setItem(SAVE_DB_KEY, JSON.stringify(all));
            isNowSaved = true;
        }

        // CRITICAL: Dispatch event so components like SavedLibrary know to update
        window.dispatchEvent(new Event('storage'));
        return isNowSaved;
    }
};
