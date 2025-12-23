
type DojoEvent = 'DNA_UPDATED' | 'QUEST_SYNC' | 'VAULT_CHANGE' | 'STORAGE_CRITICAL';

export const DojoEmitter = {
    listeners: {} as Record<string, Function[]>,

    subscribe: (event: DojoEvent, callback: Function) => {
        if (!DojoEmitter.listeners[event]) DojoEmitter.listeners[event] = [];
        DojoEmitter.listeners[event].push(callback);
        return () => {
            DojoEmitter.listeners[event] = DojoEmitter.listeners[event].filter(cb => cb !== callback);
        };
    },

    emit: (event: DojoEvent, data?: any) => {
        if (DojoEmitter.listeners[event]) {
            DojoEmitter.listeners[event].forEach(cb => cb(data));
        }
        // Also sync to other tabs for multi-window support
        if (event === 'DNA_UPDATED') {
            localStorage.setItem('dojo_ping', Date.now().toString());
        }
    }
};
