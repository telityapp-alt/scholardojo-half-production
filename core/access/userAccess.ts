import { DomainType } from '../contracts/entityMap';

export interface UserProfile {
    id: string;
    name: string;
    avatarSeed: string;
    xp: number;
    league: 'Bronze' | 'Silver' | 'Gold' | 'Diamond';
    streak: number;
}

const MOCK_USER: UserProfile = {
    id: 'u1',
    name: 'Alex Student',
    avatarSeed: 'Felix',
    xp: 2450,
    league: 'Gold',
    streak: 12
};

export const getUserProfile = (domain: DomainType): UserProfile => {
    // In a real app, this might fetch different profiles per domain or a unified one.
    // Simulating domain-specific variations for demo purposes.
    if (domain === DomainType.INTERN) {
        return { ...MOCK_USER, name: 'Alex Intern', xp: 1200, league: 'Silver' };
    }
    if (domain === DomainType.SCHOLAR) {
        return { ...MOCK_USER, name: 'Dr. Alex', xp: 5000, league: 'Diamond', avatarSeed: 'Aneka' };
    }
    return MOCK_USER;
};

export const getXpHistory = (userId: string) => {
    // Returns last 7 days of XP
    return [
        { name: 'Mon', tasks: 120 },
        { name: 'Tue', tasks: 200 },
        { name: 'Wed', tasks: 150 },
        { name: 'Thu', tasks: 300 },
        { name: 'Fri', tasks: 250 },
        { name: 'Sat', tasks: 350 },
        { name: 'Sun', tasks: 100 },
    ];
};