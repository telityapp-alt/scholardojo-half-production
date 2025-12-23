import { DomainType } from '../contracts/entityMap';
import { QuestCard } from '../../features/quest/types';

// ---------------------------------------------------------------------------
// MOCK DATA: QUESTS (Isolated per Domain)
// ---------------------------------------------------------------------------

const MOCK_QUESTS: QuestCard[] = [
    // --- STUDENT DOMAIN QUESTS ---
    {
        id: 'q_st_1',
        domain: DomainType.STUDENT,
        columnId: 'todo',
        title: 'Complete Python Basics',
        priority: 'High',
        deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        linkedEntity: { type: 'PROGRAM', name: 'Code Academy' },
        subtasks: [
            { id: 'st1', text: 'Watch Module 1', completed: true },
            { id: 'st2', text: 'Submit Quiz', completed: false }
        ]
    },
    {
        id: 'q_st_2',
        domain: DomainType.STUDENT,
        columnId: 'progress',
        title: 'Hackathon Team Up',
        priority: 'Medium',
        linkedEntity: { type: 'CUSTOM', name: 'Global Hack' },
        subtasks: [
            { id: 'st3', text: 'Find teammates', completed: true }
        ]
    },

    // --- INTERN DOMAIN QUESTS ---
    {
        id: 'q_in_1',
        domain: DomainType.INTERN,
        columnId: 'todo',
        title: 'Update LinkedIn Profile',
        priority: 'High',
        deadline: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
        linkedEntity: { type: 'CUSTOM', name: 'Personal Branding' },
        subtasks: [
            { id: 'i1', text: 'Update Headline', completed: false },
            { id: 'i2', text: 'Add recent project', completed: false }
        ]
    },
    {
        id: 'q_in_2',
        domain: DomainType.INTERN,
        columnId: 'progress',
        title: 'TechCorp Application',
        priority: 'High',
        deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        linkedEntity: { type: 'PROGRAM', name: 'TechCorp Inc.' },
        subtasks: [
            { id: 'i3', text: 'Tailor Resume', completed: true },
            { id: 'i4', text: 'Draft Cover Letter', completed: false }
        ]
    },

    // --- SCHOLAR DOMAIN QUESTS ---
    {
        id: 'q_sc_1',
        domain: DomainType.SCHOLAR,
        columnId: 'todo',
        title: 'Literature Review: Climate',
        priority: 'Medium',
        deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        linkedEntity: { type: 'SCHOLARSHIP', name: 'Earth Institute' },
        subtasks: [
            { id: 'sc1', text: 'Read 5 papers', completed: false },
            { id: 'sc2', text: 'Summarize findings', completed: false }
        ]
    },
];

// ---------------------------------------------------------------------------
// DATA ACCESS METHODS
// ---------------------------------------------------------------------------

export const getQuestsByDomain = (domain: DomainType): QuestCard[] => {
    return MOCK_QUESTS.filter(q => q.domain === domain);
};

export const createQuest = (quest: QuestCard): void => {
    MOCK_QUESTS.push(quest);
};

export const updateQuest = (updatedQuest: QuestCard): void => {
    const index = MOCK_QUESTS.findIndex(q => q.id === updatedQuest.id);
    if (index !== -1) {
        MOCK_QUESTS[index] = updatedQuest;
    }
};

export const deleteQuest = (id: string): void => {
    const index = MOCK_QUESTS.findIndex(q => q.id === id);
    if (index !== -1) {
        MOCK_QUESTS.splice(index, 1);
    }
};