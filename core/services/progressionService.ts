
import { DomainType } from '../contracts/entityMap';
import { REWARDS } from '../engines/levelEngine';

const PROG_KEY = 'dojo_progression_v1';
const REWARD_COOLDOWNS = new Map<string, number>();

export interface DomainProgression {
    xp: number;
    gems: number;
    streak: number;
    lastActive: number;
}

const DEFAULT_PROG: DomainProgression = { xp: 0, gems: 0, streak: 0, lastActive: 0 };

export const ProgressionService = {
    getDomainData: (domain: DomainType): DomainProgression => {
        const raw = localStorage.getItem(`${PROG_KEY}_${domain}`);
        const data: DomainProgression = raw ? JSON.parse(raw) : { ...DEFAULT_PROG };
        
        const now = Date.now();
        const diff = now - data.lastActive;
        const oneDay = 24 * 60 * 60 * 1000;
        
        if (diff > oneDay * 2) {
            data.streak = 0;
        } else if (diff > oneDay) {
            data.streak += 1;
            // Atomic check for Daily Streak reward (once per 20h)
            const cooldownKey = `STREAK_${domain}`;
            const lastReward = REWARD_COOLDOWNS.get(cooldownKey) || 0;
            if (now - lastReward > 20 * 60 * 60 * 1000) {
                data.xp += REWARDS.DAILY_STREAK;
                REWARD_COOLDOWNS.set(cooldownKey, now);
            }
        }
        
        return data;
    },

    addXP: (domain: DomainType, amount: number, actionId: string = 'generic') => {
        // PRODUCTION GUARD: Anti-Spam (2s throttle per action)
        const now = Date.now();
        const cooldownKey = `${actionId}_${domain}`;
        const lastTime = REWARD_COOLDOWNS.get(cooldownKey) || 0;
        
        if (now - lastTime < 2000) {
            console.warn("[Progression] Strike throttled. Prevent spamming.");
            return 0;
        }
        
        REWARD_COOLDOWNS.set(cooldownKey, now);
        
        const data = ProgressionService.getDomainData(domain);
        data.xp += amount;
        data.lastActive = now;
        ProgressionService.save(domain, data);
        return data.xp;
    },

    addGems: (domain: DomainType, amount: number) => {
        const data = ProgressionService.getDomainData(domain);
        data.gems += amount;
        ProgressionService.save(domain, data);
        return data.gems;
    },

    save: (domain: DomainType, data: DomainProgression) => {
        localStorage.setItem(`${PROG_KEY}_${domain}`, JSON.stringify(data));
        window.dispatchEvent(new Event('storage'));
    }
};
