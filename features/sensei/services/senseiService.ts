
import { DomainType } from '../../../core/contracts/entityMap';

export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
    timestamp: number;
}

export interface ChatSession {
    id: string;
    domain: DomainType;
    title: string;
    updatedAt: number;
    messages: ChatMessage[];
}

const STORAGE_KEY = 'dojo_sensei_compact_v1';

export const SenseiService = {
    getSessions: (): ChatSession[] => {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        return JSON.parse(raw).sort((a: any, b: any) => b.updatedAt - a.updatedAt);
    },

    saveSession: (session: ChatSession) => {
        const all = SenseiService.getSessions();
        const idx = all.findIndex(s => s.id === session.id);
        if (idx !== -1) all[idx] = session;
        else all.unshift(session);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(all.slice(0, 20))); // Limit history
        window.dispatchEvent(new Event('storage'));
    },

    deleteSession: (id: string) => {
        const all = SenseiService.getSessions().filter(s => s.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
        window.dispatchEvent(new Event('storage'));
    },

    getSystemInstruction: (domain: DomainType, lang: string) => {
        const personaMap = {
            [DomainType.STUDENT]: "Green Sensei. Energetic, focuses on hacks and motivation. Minimalist.",
            [DomainType.INTERN]: "Orange Sensei. Technical, career-obsessed, direct, tactical. Elite coding focused.",
            [DomainType.SCHOLAR]: "Blue Sensei. Intellectual, PhD/Grant expert, sophisticated but encouraging."
        };
        const persona = personaMap[domain] || personaMap[DomainType.STUDENT];
        return `${persona} Language: ${lang.toUpperCase()}. Format: Markdown. Be extremely concise but standout.`;
    }
};
