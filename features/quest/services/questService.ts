
import { AdmissionRequirement } from '../../admission/types';
import { createQuest, getQuestsByDomain } from '../../../core/access/questAccess';
import { DomainType } from '../../../core/contracts/entityMap';
import { QuestCard } from '../types';

export const QuestService = {
    getQuests: (domain: DomainType = DomainType.STUDENT) => {
        return getQuestsByDomain(domain);
    },

    createFromRequirement: async (req: AdmissionRequirement, appName: string, domain: DomainType): Promise<QuestCard> => {
        // AI Logic Simulation
        await new Promise(resolve => setTimeout(resolve, 800));

        const newQuest: QuestCard = {
            id: `q-link-${Date.now()}`,
            domain: domain, 
            columnId: 'todo',
            title: `${req.label}: ${appName}`,
            priority: 'High',
            linkedEntity: { type: 'PROGRAM', name: appName },
            subtasks: [
                { id: `st-${Date.now()}-1`, text: 'Gather supporting documents', completed: false },
                { id: `st-${Date.now()}-2`, text: 'Draft first version', completed: false },
                { id: `st-${Date.now()}-3`, text: 'Final review by Sensei', completed: false }
            ],
            tags: [req.type, 'Admission Link']
        };

        createQuest(newQuest);
        return newQuest;
    },

    createFromTrainingPlan: async (improvementText: string, domain: DomainType, targetTitle: string) => {
        const newQuest: QuestCard = {
            id: `q-training-${Date.now()}`,
            domain,
            columnId: 'todo',
            title: improvementText,
            priority: 'Medium',
            linkedEntity: { type: 'CUSTOM', name: `Battle: ${targetTitle}` },
            subtasks: [
                { id: `st-${Date.now()}-1`, text: 'Research missing keywords', completed: false },
                { id: `st-${Date.now()}-2`, text: 'Practice articulation', completed: false },
                { id: `st-${Date.now()}-3`, text: 'Retake Arena Battle', completed: false }
            ],
            tags: ['Arena Recovery']
        };

        createQuest(newQuest);
        return newQuest;
    }
};
