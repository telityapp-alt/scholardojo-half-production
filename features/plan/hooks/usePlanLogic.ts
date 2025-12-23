import { useState, useEffect } from 'react';
import { DomainConfig } from '../../../core/contracts/domainConfig';
import { CalendarItem } from '../types';
import { getEventsByDomain } from '../../../core/access/eventAccess';
import { getProgramsByDomain } from '../../../core/access/programAccess';
import { getVaultItemsByDomain } from '../../../core/access/vaultAccess';
import { getQuestsByDomain } from '../../../core/access/questAccess';

export function usePlanLogic(config: DomainConfig) {
    const [items, setItems] = useState<CalendarItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        
        // Simulate data fetching aggregation
        setTimeout(() => {
            const allItems: CalendarItem[] = [];

            // 1. Events (Mapped by Date)
            const events = getEventsByDomain(config.id);
            events.forEach(e => {
                allItems.push({
                    id: `evt-${e.id}`,
                    date: new Date(e.date),
                    type: 'EVENT',
                    title: e.title,
                    subtitle: e.time,
                    metadata: {
                        originalData: e,
                        color: config.theme === 'green' ? 'green' : 'purple', // Events usually purple/green
                        icon: 'Calendar',
                        status: e.category
                    }
                });
            });

            // 2. Programs (Mapped by Deadline)
            const programs = getProgramsByDomain(config.id);
            programs.forEach(p => {
                allItems.push({
                    id: `prog-${p.id}`,
                    date: new Date(p.deadline),
                    type: 'PROGRAM',
                    title: `${config.programConfig.entityLabel}: ${p.title}`,
                    subtitle: p.hostName,
                    metadata: {
                        originalData: p,
                        color: 'blue',
                        icon: 'Briefcase',
                        status: 'Deadline'
                    }
                });
            });

            // 3. Vault Items (Mapped by Deadline)
            const vaults = getVaultItemsByDomain(config.id);
            vaults.forEach(v => {
                allItems.push({
                    id: `vlt-${v.id}`,
                    date: new Date(v.deadline),
                    type: 'DEADLINE',
                    title: `Apply: ${v.title}`,
                    subtitle: v.hostName,
                    metadata: {
                        originalData: v,
                        color: 'red', // Deadlines are urgent
                        icon: 'Target',
                        status: 'Due'
                    }
                });
            });

            // 4. Quests (Fetched from QuestAccess)
            const quests = getQuestsByDomain(config.id);
            quests.forEach(q => {
                const total = q.subtasks.length;
                const completed = q.subtasks.filter(t => t.completed).length;
                
                // If quest has deadline, use it. If not, use today or ignore in calendar
                if (q.deadline) {
                    allItems.push({
                        id: `qst-${q.id}`,
                        date: new Date(q.deadline),
                        type: 'QUEST',
                        title: q.title,
                        subtitle: `${completed}/${total} Tasks`,
                        metadata: {
                            originalData: q,
                            color: 'orange',
                            icon: 'Zap',
                            status: q.columnId === 'done' ? 'Completed' : 'Active'
                        }
                    });
                }
            });

            setItems(allItems);
            setLoading(false);
        }, 500);
    }, [config.id]);

    return { items, loading };
}