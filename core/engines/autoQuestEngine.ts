
import { DomainType } from '../contracts/entityMap';
import { UnifiedProgramService } from '../../features/programs/services/unifiedProgramService';
import { getQuestsByDomain, createQuest } from '../access/questAccess';
import { QuestCard } from '../../features/quest/types';

export const AutoQuestEngine = {
    /**
     * Ghost Protocol: Scans secured programs and ensures they are mapped as active Quests.
     */
    syncQuestsWithPrograms: (domain: DomainType) => {
        const securedIds: string[] = JSON.parse(localStorage.getItem('dojo_secured_missions') || '[]');
        const existingQuests = getQuestsByDomain(domain);

        securedIds.forEach(programId => {
            // Check if a quest for this program already exists in the board
            const hasQuest = existingQuests.some(q => 
                q.linkedEntity?.name.includes(programId) || q.id.includes(programId)
            );

            if (!hasQuest) {
                const program = UnifiedProgramService.getById(programId);
                if (!program) return;

                console.log(`%c[Ghost Protocol] Forging Mission: ${program.title}`, "color: #ff9600; font-weight: bold");
                
                // Forge the Quest Card from the Program Data
                const newQuest: QuestCard = {
                    id: `auto-${programId}-${Date.now()}`,
                    domain: domain,
                    columnId: 'todo',
                    title: `Strike: ${program.title}`,
                    priority: 'High',
                    linkedEntity: { type: 'PROGRAM', name: program.title },
                    subtasks: program.checklist.slice(0, 3).map((c, i) => ({
                        id: `st-${programId}-${i}`,
                        text: `Sync ${c.label}`,
                        completed: false
                    })),
                    deadline: program.deadline
                };
                
                createQuest(newQuest);
            }
        });

        // Trigger UI sync
        window.dispatchEvent(new Event('storage'));
    }
};
