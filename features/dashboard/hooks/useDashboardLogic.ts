
import { useState, useEffect, useCallback } from 'react';
import { DomainConfig } from '../../../core/contracts/domainConfig';
import { UserProfile } from '../../../core/access/userAccess';
import { getQuestsByDomain } from '../../../core/access/questAccess';
import { AdmissionService } from '../../admission/services/admissionService';
import { ProgressionService } from '../../../core/services/progressionService';
import { ProfileAccess } from '../../../core/access/profileAccess';
import { QuestCard } from '../../quest/types';
import { useStorageSync } from '../../../core/hooks/useStorageSync';

export function useDashboardLogic(config: DomainConfig) {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [stats, setStats] = useState({ activeQuests: 0, totalApps: 0, submittedApps: 0, xp: 0 });
    const [quests, setQuests] = useState<QuestCard[]>([]);
    const [xpHistory, setXpHistory] = useState<{name: string, tasks: number}[]>([]);
    const [loading, setLoading] = useState(true);

    const syncData = useCallback(() => {
        // 1. Core Progression Data
        const prog = ProgressionService.getDomainData(config.id);
        const dna = ProfileAccess.getDNA(config.id);

        const profile: UserProfile = {
            id: dna.id,
            name: dna.name,
            avatarSeed: dna.avatarSeed,
            xp: prog.xp,
            league: prog.xp > 5000 ? 'Diamond' : prog.xp > 2000 ? 'Gold' : prog.xp > 500 ? 'Silver' : 'Bronze',
            streak: prog.streak
        };

        setUser(profile);

        // 2. Quests
        const allQuests = getQuestsByDomain(config.id);
        const activeQuestsList = allQuests.filter(q => q.columnId !== 'done');
        const sortedQuests = [...activeQuestsList].sort((a, b) => {
            const prioMap = { 'High': 3, 'Medium': 2, 'Low': 1 };
            return prioMap[b.priority] - prioMap[a.priority];
        });
        setQuests(sortedQuests.slice(0, 3));

        // 3. Admission Stats
        const apps = AdmissionService.getApps(config.id);
        const submitted = apps.filter(a => a.status === 'SUBMITTED' || a.status === 'ACCEPTED').length;

        setStats({
            activeQuests: activeQuestsList.length,
            totalApps: apps.length,
            submittedApps: submitted,
            xp: prog.xp
        });

        // 4. XP History
        const historyData = (prog as any).history || [
            { date: 'Mon', xp: 0 }, { date: 'Tue', xp: 0 }, { date: 'Wed', xp: 0 },
            { date: 'Thu', xp: 0 }, { date: 'Fri', xp: 0 }, { date: 'Sat', xp: 0 }, { date: 'Sun', xp: 0 }
        ];
        setXpHistory(historyData.map((h: any) => ({ name: h.date, tasks: h.xp })));
    }, [config.id]);

    useEffect(() => {
        setLoading(true);
        syncData();
        const timer = setTimeout(() => setLoading(false), 400);
        return () => clearTimeout(timer);
    }, [syncData]);

    // Use centralized sync hook
    useStorageSync(syncData);

    return { user, stats, quests, xpHistory, loading };
}
